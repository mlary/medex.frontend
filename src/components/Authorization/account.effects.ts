import { createEffect, createEvent, createStore } from 'effector';
import connectLocalStorage from 'effector-localstorage';
import { IJwtRequest, IJwtResponse } from '../../services/UserService/models/JwtToken';
import { UserDto, UserRegistrationDto } from '../../services/UserService/models/User';
import UserService from '../../services/UserService/UserService';

export interface Account {
  currentUser: Nullable<UserDto>;
  isAuthorized: boolean;
  signupSuccessed?: boolean;
}

const accountLocalStorage = connectLocalStorage('account');
export const fetchCurrentUser = createEffect({
  handler: async (): Promise<Nullable<UserDto>> => {
    try {
      const result = await UserService.current();
      return result;
    } catch {
      return null;
    }
  },
});

export const authorize = createEffect({
  handler: async (params: IJwtRequest): Promise<Nullable<IJwtResponse>> => {
    try {
      const result = await UserService.authorize(params);
      return result;
    } catch {
      return null;
    }
  },
});

export const signup = createEffect({
  handler: async (params: UserRegistrationDto): Promise<Nullable<IJwtResponse>> => {
    try {
      const result = await UserService.signup(params);
      return result;
    } catch {
      return null;
    }
  },
});

export const logout = createEvent();

export const setAthorizationToken = (data: IJwtResponse) => {
  window.localStorage.setItem('AUTH_TOKEN', data.token);
};
export const $account = createStore<Account>(
  accountLocalStorage.init({ currentUser: null, isAuthorized: false } as Account),
  {
    name: 'account',
  }
)
  .on(authorize.done, (state, payload) => {
    if (payload.result) {
      setAthorizationToken(payload.result);
      return { ...state, isAuthorized: true };
    }
    return state;
  })
  .on(signup.done, (state, payload) => {
    if (payload.result) {
      setAthorizationToken(payload.result);
      return { ...state, isAuthorized: true, signupSuccessed: true };
    }
    return state;
  })
  .on(fetchCurrentUser.done, (state, payload) => ({
    ...state,
    currentUser: payload.result,
    isAuthorized: true,
    signupSuccessed: false,
  }))
  .on(logout, (state) => {
    window.localStorage.removeItem('AUTH_TOKEN');
    return { ...state, currentUser: null, isAuthorized: false };
  });

$account.watch(accountLocalStorage);

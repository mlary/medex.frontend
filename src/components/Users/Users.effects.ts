import { createGridCache } from './../../utils/GridCache';
import { createEffect, createEvent, createStore } from 'effector';
import { PageWrapper } from '../../models/PageWrapper';
import { UserDto, UserFilterContext } from '../../services/UserService/models';
import UserService from '../../services/UserService';
import { PageContext } from '../../models/PageContext';
import { SortTypes } from '../../constants/sortTypes';
import { SortDescriptor } from '../../models/FilterContext/SortDescriptor';

export interface ExtendedUserRow extends UserDto {
  index: number;
}
export interface UserListProps {
  page: PageWrapper<ExtendedUserRow>;
  filterContext: UserFilterContext;
  take: number;
  skip: number;
  sortList: SortDescriptor[];
  loading: boolean;
}
export const sortUsers = createEvent<SortDescriptor[]>();
export const setUsersFilter = createEvent<UserFilterContext>();

export const setUsersPageData = createEvent<UpdatePageProps<ExtendedUserRow>>();

export const fetchUsers = createEffect({
  handler: async (params: PageContext<UserFilterContext>): Promise<PageWrapper<UserDto>> => {
    try {
      const result = await UserService.page(params);
      return result;
    } catch {
      return {
        count: 0,
        data: [],
        offset: 0,
        totalCount: -1,
      };
    }
  },
});
export const usersCache = createGridCache<ExtendedUserRow>();
const initState = {
  page: {
    count: 0,
    data: [],
    offset: 0,
    totalCount: 0,
  },
  filterContext: {},
  skip: 0,
  sortList: [{ field: 'name', direction: SortTypes.ASC }],
  take: 100,
  loading: false,
};
export interface UpdatePageProps<T> {
  skip: number;
  take: number;
  data: T[];
}
export const $users = createStore<UserListProps>(initState);

$users
  .on(setUsersFilter, (state, payload) => {
    usersCache.clear();
    return { ...state, filterContext: payload };
  })
  .on(sortUsers, (state, payload) => {
    usersCache.clear();
    return { ...state, sortList: payload };
  })
  .on(setUsersPageData, (state, payload) => {
    const newState = { ...state };
    newState.page.data = payload.data;
    newState.skip = payload.skip;
    newState.take = payload.take;
    return newState;
  })
  .on(fetchUsers.done, (state, payload) => {
    const { result } = payload;
    if (payload.result.totalCount >= 0) {
      const newState = { ...state };
      const { skip, take } = payload.params;
      newState.skip = skip;
      newState.take = take;
      const rows = result.data.map<ExtendedUserRow>((row, index) => ({
        ...row,
        index: result.offset + index + 1,
      }));
      newState.page = { ...result, data: rows };
      newState.loading = false;
      usersCache.setRows(skip, take, rows);
      return newState;
    } else {
      return { ...state, loading: false };
    }
  });

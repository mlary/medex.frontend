import { createEvent, createStore } from 'effector';
import connectLocalStorage from 'effector-localstorage';

export interface INavigationState {
  opened: boolean;
}
export const toggleNavigationPanelState = createEvent();
const naviagationLocalStorage = connectLocalStorage('navigation');

export const $navigation = createStore<INavigationState>(
  naviagationLocalStorage.init({ opened: false } as INavigationState),
  { name: 'navigation' }
).on(toggleNavigationPanelState, (state, payload) => ({ ...state, opened: !state.opened }));
$navigation.watch(naviagationLocalStorage);
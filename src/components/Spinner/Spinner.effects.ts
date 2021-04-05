import {
  createStore, createEvent,
} from 'effector';

export const $spinner = createStore(0, {
  name: "loading",
});
export const clearLoading = createEvent();
export const addLoading = createEvent();
export const removeLoading = createEvent();
$spinner.on(clearLoading, () => 0)
  .on(addLoading, (state) => state + 1)
  .on(removeLoading, (state) => state - 1);
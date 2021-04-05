import { createStore, createEvent } from 'effector';

export type TableHeaderAdnvancedProps = {
  anchorElement: Nullable<Element>;
};

export const toggleHeaderCellMenu = createEvent<Nullable<Element>>();
export const $tableHeaderStore = createStore<TableHeaderAdnvancedProps>({
  anchorElement: null,
});
$tableHeaderStore.on(toggleHeaderCellMenu, (state, payload) => ({ ...state, anchorElement: payload }));

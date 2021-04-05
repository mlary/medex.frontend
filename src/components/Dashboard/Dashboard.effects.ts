import { createGridCache } from './../../utils/GridCache';
import { createEffect, createEvent, createStore } from 'effector';
import { PageWrapper } from '../../models/PageWrapper';
import { PriceItemDto } from '../../services/PriceItemService/models/PriceItem';
import PriceItemService from '../../services/PriceItemService';
import { PageContext } from '../../models/PageContext';
import { PriceItemFilterContext } from '../../services/PriceItemService/models/PriceItemFilterContext';
import { SortTypes } from '../../constants/sortTypes';
import { SortDescriptor } from '../../models/FilterContext/SortDescriptor';

export interface ExtendedPriceItemRow extends PriceItemDto {
  index: number;
}
export interface DashboardProps {
  page: PageWrapper<ExtendedPriceItemRow>;
  filterContext: PriceItemFilterContext;
  take: number;
  skip: number;
  sortList: SortDescriptor[];
  loading: boolean;
}
export const sortPriceItems = createEvent<SortDescriptor[]>();
export const updateFilter = createEvent<PriceItemFilterContext>();

export const updatePageData = createEvent<UpdatePageProps<ExtendedPriceItemRow>>();

export const fetchPriceItems = createEffect({
  handler: async (params: PageContext<PriceItemFilterContext>): Promise<PageWrapper<PriceItemDto>> => {
    try {
      const result = await PriceItemService.page(params);
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
export const dashboardCach = createGridCache<ExtendedPriceItemRow>();
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
export const $dashboard = createStore<DashboardProps>(initState);

$dashboard
  .on(updateFilter, (state, payload) => {
    dashboardCach.clear();
    return { ...state, filterContext: payload };
  })
  .on(sortPriceItems, (state, payload) => {
    dashboardCach.clear();
    return { ...state, sortList: payload };
  })
  .on(updatePageData, (state, payload) => {
    const newState = { ...state };
    newState.page.data = payload.data;
    newState.skip = payload.skip;
    newState.take = payload.take;
    return newState;
  })
  .on(fetchPriceItems.done, (state, payload) => {
    const { result } = payload;
    if (payload.result.totalCount >= 0) {
      const newState = { ...state };
      const { skip, take } = payload.params;
      newState.skip = skip;
      newState.take = take;
      const rows = result.data.map<ExtendedPriceItemRow>((row, index) => ({
        ...row,
        index: result.offset + index + 1,
      }));
      newState.page = { ...result, data: rows };
      newState.loading = false;
      dashboardCach.setRows(skip, take, rows);
      return newState;
    } else {
      return { ...state, loading: false };
    }
  });

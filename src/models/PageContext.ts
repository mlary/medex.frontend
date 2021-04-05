import { SortDescriptor } from './FilterContext/SortDescriptor';

export interface PageContext<Tfilter> {
  take: number;
  skip: number;
  filter?: Tfilter;
  sortList?: Array<SortDescriptor>;
}

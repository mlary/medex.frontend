export interface PageWrapper<T> {
  totalCount: number;
  offset: number;
  count: number;
  data: Array<T>;
}

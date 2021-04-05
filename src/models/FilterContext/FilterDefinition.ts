import { FilterRange } from "./FilterRange";
import { FilterOperator } from "../../constants/filterOperator";

export interface FilterDefinition<T> {
  value?: T;
  values?: Array<T>;
  operator?: FilterOperator;
  range?: FilterRange<T>;
}

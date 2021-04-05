import { IFilterContext } from './../../../models/FilterContext/IFilterConext';
import { FilterDefinition } from '../../../models/FilterContext/FilterDefinition';

export interface PriceItemFilterContext extends IFilterContext {
  product?: FilterDefinition<string>;
  manufacturer?: FilterDefinition<string>;
  groupName?: FilterDefinition<string>;
  distributor?: FilterDefinition<string>;
  country?: FilterDefinition<string>;
  interName?: FilterDefinition<string>;
  publicDate?: FilterDefinition<string>;
  costInEuro?: FilterDefinition<number>;
  cost?: FilterDefinition<number>;
  costInDollar?: FilterDefinition<number>;
}

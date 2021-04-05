import { IFilterContext } from './../../../models/FilterContext/IFilterConext';
import { FilterDefinition } from '../../../models/FilterContext/FilterDefinition';

export interface PriceFilterContext extends IFilterContext {  
  publicDate?: FilterDefinition<string>;  
}

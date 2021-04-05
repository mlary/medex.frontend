import { FilterDefinition } from '../../../models/FilterContext/FilterDefinition';
import { IFilterContext } from '../../../models/FilterContext/IFilterConext';

export interface UserFilterContext extends IFilterContext {
  login?: FilterDefinition<string>;
  lastName?: FilterDefinition<string>;
  fullName?: FilterDefinition<string>;
  firstName?: FilterDefinition<string>;
  middleName?: FilterDefinition<string>;
  phone?: FilterDefinition<string>;
  createdOn?: FilterDefinition<string>;
  userRole?: FilterDefinition<number>;
}

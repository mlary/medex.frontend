import { SortTypes } from '../../constants/sortTypes';

export interface SortDescriptor {
  field: string;
  direction: SortTypes;
}

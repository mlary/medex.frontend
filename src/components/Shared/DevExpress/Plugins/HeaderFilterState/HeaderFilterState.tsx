import React from 'react';
import { Getter, Plugin, Action } from '@devexpress/dx-react-core';
import { FilterDefinition } from '../../../../../models/FilterContext/FilterDefinition';

export interface ColumnFilterStateProps<T> {
  columnName: string;
  filter?: FilterDefinition<T>;
}
export interface FilterStateProps {
  filters: ColumnFilterStateProps<unknown>[];
  onFilterChanged: (columnFilter: ColumnFilterStateProps<unknown>) => void;
}

const HeaderFilterState = (props: FilterStateProps) => {
  return (
    <Plugin name="HeaderFilterState">
      <Getter name="filters" value={props.filters} />
      <Action name="changeFilter" action={props.onFilterChanged} />
    </Plugin>
  );
};
export default HeaderFilterState;

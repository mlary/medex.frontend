import React from 'react';
import { Plugin, Template, Getters } from '@devexpress/dx-react-core';

export interface FilterTypeProviderProps {
  columns: string[];
  expressionOptions: FilterExpressionProps<unknown>;
}
export interface FilterExpressionProps<T> {
  getItemValue: (item: any) => string;
  getItemId: (item: any) => any;
  getAllItems: () => any[];
}

const FilterTypeProvider = (props: FilterTypeProviderProps) => {
  const { columns, expressionOptions } = props;
  return (
    <Plugin name="FilterTypeProvider" key={columns.join('_')}>
      <Template
        name="filterTypeProviderExpressionActions"
        predicate={({ column }: Getters) => columns.includes(column)}
      >
        {() => expressionOptions}
      </Template>
    </Plugin>
  );
};
export default FilterTypeProvider;

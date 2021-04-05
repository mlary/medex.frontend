import { DashboardColumns } from './columns';
import { useStore } from 'effector-react';
import { $dictionaries } from '../Dictionaries/Dictionaries.effects';
import { FilterExpressionProps } from '../Shared/DevExpress/Plugins/FilterTypeProvider/FilterTypeProvider';
import { uniq } from 'lodash';

export const useDashboardFilterOptions = () => {
  const { productNames, distributors, manufacturers, groupNames, interNames, countries } = useStore($dictionaries);
  const filterColumnsExpressions = [
    {
      column: DashboardColumns.name,
      expression: ({
        getAllItems: () => productNames,
        getItemId: (item) => item,
        getItemValue: (item) => item,
      } as FilterExpressionProps<string>) as FilterExpressionProps<unknown>,
    },
    {
      column: DashboardColumns.country,
      expression: ({
        getAllItems: () => countries,
        getItemId: (item) => item,
        getItemValue: (item) => item,
      } as FilterExpressionProps<string>) as FilterExpressionProps<unknown>,
    },
    {
      column: DashboardColumns.distributor,
      expression: ({
        getAllItems: () => uniq(distributors.map((row) => row.name)),
        getItemId: (item) => item,
        getItemValue: (item) => item,
      } as FilterExpressionProps<string>) as FilterExpressionProps<unknown>,
    },
    {
      column: DashboardColumns.manufacturer,
      expression: ({
        getAllItems: () => uniq(manufacturers.map((row) => row.name)),
        getItemId: (item) => item,
        getItemValue: (item) => item,
      } as FilterExpressionProps<string>) as FilterExpressionProps<unknown>,
    },
    {
      column: DashboardColumns.groupName,
      expression: ({
        getAllItems: () => uniq(groupNames.map((row) => row.name)),
        getItemId: (item) => item,
        getItemValue: (item) => item,
      } as FilterExpressionProps<string>) as FilterExpressionProps<unknown>,
    },
    {
      column: DashboardColumns.interName,
      expression: ({
        getAllItems: () => uniq(interNames.map((row) => row.name)),
        getItemId: (item) => item,
        getItemValue: (item) => item,
      } as FilterExpressionProps<string>) as FilterExpressionProps<unknown>,
    },
  ];
  return filterColumnsExpressions;
};

import { JointPriceColumns } from './columns';
import { useStore } from 'effector-react';
import { $dictionaries } from '../Dictionaries/Dictionaries.effects';
import { FilterExpressionProps } from '../Shared/DevExpress/Plugins/FilterTypeProvider/FilterTypeProvider';
import { uniq } from 'lodash';

export const useJointPriceFilterOptions = () => {
  const { productNames, distributors, manufacturers, groupNames, interNames, countries } = useStore($dictionaries);
  const filterColumnsExpressions = [
    {
      column: JointPriceColumns.name,
      expression: ({
        getAllItems: () => productNames,
        getItemId: (item) => item,
        getItemValue: (item) => item,
      } as FilterExpressionProps<string>) as FilterExpressionProps<unknown>,
    },
    {
      column: JointPriceColumns.country,
      expression: ({
        getAllItems: () => countries,
        getItemId: (item) => item,
        getItemValue: (item) => item,
      } as FilterExpressionProps<string>) as FilterExpressionProps<unknown>,
    },
    {
      column: JointPriceColumns.distributor,
      expression: ({
        getAllItems: () => uniq(distributors.map((row) => row.name)),
        getItemId: (item) => item,
        getItemValue: (item) => item,
      } as FilterExpressionProps<string>) as FilterExpressionProps<unknown>,
    },
    {
      column: JointPriceColumns.manufacturer,
      expression: ({
        getAllItems: () => uniq(manufacturers.map((row) => row.name)),
        getItemId: (item) => item,
        getItemValue: (item) => item,
      } as FilterExpressionProps<string>) as FilterExpressionProps<unknown>,
    },
    {
      column: JointPriceColumns.groupName,
      expression: ({
        getAllItems: () => uniq(groupNames.map((row) => row.name)),
        getItemId: (item) => item,
        getItemValue: (item) => item,
      } as FilterExpressionProps<string>) as FilterExpressionProps<unknown>,
    },
    {
      column: JointPriceColumns.interName,
      expression: ({
        getAllItems: () => uniq(interNames.map((row) => row.name)),
        getItemId: (item) => item,
        getItemValue: (item) => item,
      } as FilterExpressionProps<string>) as FilterExpressionProps<unknown>,
    },
  ];
  return filterColumnsExpressions;
};

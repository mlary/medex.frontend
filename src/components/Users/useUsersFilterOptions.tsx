import { UserColumns } from './columns';
import { FilterExpressionProps } from '../Shared/DevExpress/Plugins/FilterTypeProvider/FilterTypeProvider';
import { useTranslation } from 'react-i18next';
import { EnumUserRoles } from '../../constants/enumUserRoles';

export const useUserFilterOptions = () => {
  const { t } = useTranslation();
  const roles = [
    { id: EnumUserRoles.Administrator, name: t('Administrator') },
    { id: EnumUserRoles.Client, name: t('Client') },
    { id: EnumUserRoles.Guest, name: t('Guest') },
    { id: EnumUserRoles.Markerter, name: t('Markerter') },
  ];
  const filterColumnsExpressions = [
    {
      column: UserColumns.userRole,
      expression: ({
        getAllItems: () => roles,
        getItemId: (item) => item.id,
        getItemValue: (item) => item.name,
      } as FilterExpressionProps<string>) as FilterExpressionProps<unknown>,
    },
  ];
  return filterColumnsExpressions;
};

import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Column } from '@devexpress/dx-react-grid';
import { UserDto } from '../../services/UserService/models';
import { ExtendedUserRow } from './Users.effects';
import { format } from 'date-fns';
import { EnumFilterTypes } from '../../constants/enumFilterTypes';
import { UserColumns } from './columns';
import { DATE_DOT_FORMAT } from '../../constants';
import { EnumUserRoles } from '../../constants/enumUserRoles';

export const useUserColumns = () => {
  const { t } = useTranslation();
  const columns = useMemo<Column[]>(
    () => [
      {
        name: 'id',
        width: 100,
        title: t('id'),
        getCellValue: (row: ExtendedUserRow) => row.index,
      },
      {
        name: UserColumns.fullName,
        width: 300,
        title: t('Fullname'),
        filterType: EnumFilterTypes.STRING,
        getCellValue: (row: ExtendedUserRow) => `${row.lastName} ${row.firstName} ${row.middleName}`,
      },
      {
        name: UserColumns.login,
        width: 300,
        title: t('Login'),
        filterType: EnumFilterTypes.STRING,
        getCellValue: (row: UserDto) => row.login,
      },
      {
        name: UserColumns.userRole,
        width: '20%',
        title: t('Role'),
        filterType: EnumFilterTypes.STRING,
        hasAdvancedFilter: true,
        getCellValue: (row: UserDto) => {
          switch (row.userRole) {
            case EnumUserRoles.Administrator:
              return t('Administrator');
            case EnumUserRoles.Client:
              return t('Client');
            case EnumUserRoles.Markerter:
              return t('Markerter');
            default:
              return t('Guest');
          }
        },
      },
      {
        name: UserColumns.createdOn,
        width: 250,
        title: t('Registered at'),
        filterType: EnumFilterTypes.DATE,
        getCellValue: (row: UserDto) => (row.createdOn ? format(new Date(row.createdOn), DATE_DOT_FORMAT) : '-'),
      },
      {
        name: UserColumns.phone,
        width: 200,
        title: t('Phone'),
        filterType: EnumFilterTypes.STRING,
        getCellValue: (row: UserDto) => row.phone,
      },
      {
        name: 'actions',
        width: '5%',
        title: t('Actions'),
      },
    ],
    [t]
  );
  return { columns };
};

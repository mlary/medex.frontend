import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Column } from '@devexpress/dx-react-grid';
import { PriceItemDto } from '../../services/PriceItemService/models/PriceItem';
import { ExtendedPriceItemRow } from './Dashboard.effects';
import { format } from 'date-fns';
import { EnumFilterTypes } from '../../constants/enumFilterTypes';
import { DashboardColumns } from './columns';
import { DATE_DOT_FORMAT } from '../../constants';

export const useDashboardColumns = () => {
  const { t } = useTranslation();
  const columns = useMemo<Column[]>(
    () => [
      {
        name: 'id',
        width: 120,
        title: t('id'),
        getCellValue: (row: ExtendedPriceItemRow) => row.index,
      },
      {
        name: DashboardColumns.name,
        width: 300,
        title: t('Name'),
        filterType: EnumFilterTypes.STRING,
        getCellValue: (row: PriceItemDto) => row.name,
        hasAdvancedFilter: true,
      },
      {
        name: DashboardColumns.publicDate,
        width: 200,
        title: t('Publish date'),
        filterType: EnumFilterTypes.DATE,
        getCellValue: (row: PriceItemDto) => (row.publicDate ? format(new Date(row.publicDate), DATE_DOT_FORMAT) : '-'),
      },
      {
        name: DashboardColumns.interName,
        width: 270,
        title: t('International name'),
        filterType: EnumFilterTypes.STRING,
        getCellValue: (row: PriceItemDto) => row.interName,
        hasAdvancedFilter: true,
      },
      {
        name: DashboardColumns.cost,
        width: '10%',
        title: t('Cost'),
        filterType: EnumFilterTypes.NUMBER,
        getCellValue: (row: PriceItemDto) => {
          if (!row.cost) {
            return '-';
          } else if (row.cost === -1) {
            return t('negotiable');
          } else if (row.cost === -2) {
            return t('expected');
          }
          return row.cost.toLocaleString('ru-ru') + ' ' + t('UZS');
        },
      },
      {
        name: DashboardColumns.costInDollar,
        width: '10%',
        title: t('Cost ') + '$',
        filterType: EnumFilterTypes.NUMBER,
        getCellValue: (row: PriceItemDto) => {
          if (!row.costInDollar) {
            return '-';
          } else if (row.costInDollar === -1) {
            return t('negotiable');
          } else if (row.costInDollar === -2) {
            return t('expected');
          }
          return row.costInDollar.toLocaleString('ru-ru') + ' ' + t('$');
        },
      },
      {
        name: DashboardColumns.costInEuro,
        width: '10%',
        title: t('Cost ') + '€',
        filterType: EnumFilterTypes.NUMBER,
        getCellValue: (row: PriceItemDto) => {
          if (!row.costInEuro) {
            return '-';
          } else if (row.costInEuro === -1) {
            return t('negotiable');
          } else if (row.costInEuro === -2) {
            return t('expected');
          }
          return row.costInEuro.toLocaleString('ru-ru') + ' ' + t('€');
        },
      },
      {
        name: DashboardColumns.distributor,
        width: 200,
        title: t('Distributor'),
        filterType: EnumFilterTypes.STRING,
        getCellValue: (row: PriceItemDto) => row.distributor,
        hasAdvancedFilter: true,
      },
      {
        name: DashboardColumns.manufacturer,
        width: 200,
        title: t('Manufacturer'),
        filterType: EnumFilterTypes.STRING,
        getCellValue: (row: PriceItemDto) => row.manufacturer,
        hasAdvancedFilter: true,
      },
      {
        name: DashboardColumns.country,
        width: 200,
        title: t('Country'),
        filterType: EnumFilterTypes.STRING,
        getCellValue: (row: PriceItemDto) => row.country,
        hasAdvancedFilter: true,
      },

      {
        name: DashboardColumns.groupName,
        width: 200,
        title: t('Group'),
        filterType: EnumFilterTypes.STRING,
        getCellValue: (row: PriceItemDto) => row.groupName,
        hasAdvancedFilter: true,
      },
    ],
    [t]
  );
  return { columns };
};

import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Column } from '@devexpress/dx-react-grid';
import { PriceItemDto } from '../../services/PriceItemService/models/PriceItem';
import { ExtendedPriceItemRow } from './SummaryPriceList.effects';
import { EnumFilterTypes } from '../../constants/enumFilterTypes';
import { JointPriceColumns } from './columns';

export const useJointPriceColumns = () => {
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
        name: JointPriceColumns.name,
        width: 300,
        title: t('Name'),
        filterType: EnumFilterTypes.STRING,
        getCellValue: (row: PriceItemDto) => row.name,
        hasAdvancedFilter: true,
      },
      {
        name: JointPriceColumns.interName,
        width: 270,
        title: t('International name'),
        filterType: EnumFilterTypes.STRING,
        getCellValue: (row: PriceItemDto) => row.interName,
        hasAdvancedFilter: true,
      },
      {
        name: JointPriceColumns.cost,
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
        name: JointPriceColumns.costInDollar,
        width: '10%',
        title: t('Cost $'),
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
        name: JointPriceColumns.costInEuro,
        width: '10%',
        title: t('Cost €'),
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
        name: JointPriceColumns.distributor,
        width: 200,
        title: t('Distributor'),
        filterType: EnumFilterTypes.STRING,
        getCellValue: (row: PriceItemDto) => row.distributor,
        hasAdvancedFilter: true,
      },
      {
        name: JointPriceColumns.manufacturer,
        width: 200,
        title: t('Manufacturer'),
        filterType: EnumFilterTypes.STRING,
        getCellValue: (row: PriceItemDto) => row.manufacturer,
        hasAdvancedFilter: true,
      },
      {
        name: JointPriceColumns.country,
        width: 200,
        title: t('Country'),
        filterType: EnumFilterTypes.STRING,
        getCellValue: (row: PriceItemDto) => row.country,
        hasAdvancedFilter: true,
      },
      {
        name: JointPriceColumns.groupName,
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

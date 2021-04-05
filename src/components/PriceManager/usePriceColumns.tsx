import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Column } from '@devexpress/dx-react-grid';
import { format } from 'date-fns';
import { EnumFilterTypes } from '../../constants/enumFilterTypes';
import { PriceColumns } from './columns';
import { Price } from '../../services/PriceService/models/Price';
import { EnumPriceStatusCode } from '../../constants/enumPriceStatusCodes';

export const usePriceColumns = () => {
  const { t } = useTranslation();
  const columns = useMemo<Column[]>(
    () => [
      {
        name: PriceColumns.publicDate,
        width: '20%',
        title: t('Publish date'),
        getCellValue: (row: Price) => (row.publicDate ? format(new Date(row.publicDate), 'yyyy-MM-dd') : '-'),
      },
      {
        name: PriceColumns.dollarRate,
        width: '20%',
        title: t('Dollar rate'),
        filterType: EnumFilterTypes.NUMBER,
        getCellValue: (row: Price) => row.dollarRate,
      },
      {
        name: PriceColumns.euroRate,
        width: '20%',
        title: t('Euro rate'),
        filterType: EnumFilterTypes.NUMBER,
        getCellValue: (row: Price) => row.euroRate,
      },
      {
        name: PriceColumns.status,
        width: '20%',
        title: t('Status'),
        getCellValue: (row: Price) => {
          switch (row.status) {
            case EnumPriceStatusCode.new:
              return t('new');
            case EnumPriceStatusCode.active:
              return t('active');
            case EnumPriceStatusCode.empty:
              return t('empty');
            case EnumPriceStatusCode.errorProcessing:
              return t('error processing');
            case EnumPriceStatusCode.processing:
              return t('processing');
            default:
              return t('unknown');
          }
        },
      },
      {
        name: PriceColumns.documentId,
        width: '20%',
        title: t('Document'),
        filterType: EnumFilterTypes.STRING,
      },
    ],
    [t]
  );
  return { columns };
};

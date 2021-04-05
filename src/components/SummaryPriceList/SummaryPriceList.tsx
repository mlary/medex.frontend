import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Grid,
  TableHeaderRow,
  VirtualTable,
  TableColumnResizing,
  TableSummaryRow,
} from '@devexpress/dx-react-grid-material-ui';
import { SortingState, Sorting, VirtualTableState, SummaryState, CustomSummary } from '@devexpress/dx-react-grid';
import { useTranslation } from 'react-i18next';
import { useJointPriceColumns } from './useSummaryPriceListColumns';
import { JointPriceColumns } from './columns';
import { useJointPriceFilterOptions } from './useSummaryPriceListFilterOptions';

import { Box, Button, createStyles, makeStyles, Paper, SvgIcon, Tooltip, Typography } from '@material-ui/core';
import { useStore } from 'effector-react';
import {
  $summaryPriceList,
  fetchPriceItems,
  sortPriceItems,
  updatePageData,
  updateFilter,
  summaryPriceListCache,
} from './SummaryPriceList.effects';
import { SortTypes } from '../../constants/sortTypes';
import AppLayout from '../Shared/AppLayout';
import AppHeader from '../Shared/AppLayout/AppHeader';
import AppContent from '../Shared/AppLayout/AppContent';
import TableHeaderCellFilter from '../Shared/DevExpress/Plugins/TableHeaderCellFilter';
import HeaderContent from '../Shared/DevExpress/Templates/HeaderContent';
import HeaderFilterState from '../Shared/DevExpress/Plugins/HeaderFilterState';
import { ColumnFilterStateProps } from '../Shared/DevExpress/Plugins/HeaderFilterState/HeaderFilterState';
import FilterTypeProvider from '../Shared/DevExpress/Plugins/FilterTypeProvider/FilterTypeProvider';
import { FilterDefinition } from '../../models/FilterContext/FilterDefinition';
import PriceService from '../../services/PriceService';
import { Price } from '../../services/PriceService/models/Price';
import { format } from 'date-fns';
import { DATE_DOT_FORMAT } from '../../constants';
import XLSX from 'xlsx';
import { ReactComponent as ExcelIcon } from '../../assets/icons/excel.svg';
import PriceItemService from '../../services/PriceItemService';
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {},
    container: {
      padding: theme.spacing(1),
    },
    actionsWrapper: {
      paddingBottom: theme.spacing(1),
    },
  })
);
const PAGE_SIZE = 100;
const SummaryPriceList = () => {
  const { t } = useTranslation();

  const { columns } = useJointPriceColumns();
  const filterColumnsExpressions = useJointPriceFilterOptions();
  const { sortList, page, loading, skip, filterContext } = useStore($summaryPriceList);
  const [lastPrice, setLastPrice] = useState<Price | undefined>();
  const classes = useStyles();
  const title = useMemo(
    () =>
      `${t('Last summary price list')} ${
        lastPrice?.publicDate !== undefined ? format(new Date(lastPrice.publicDate), DATE_DOT_FORMAT) : ''
      }`,
    [t, lastPrice]
  );

  const mapCost = (cost: number) => {
    if (!cost) {
      return '-';
    } else if (cost === -1) {
      return t('negotiable');
    } else if (cost === -2) {
      return t('expected');
    }
    return cost;
  };

  const handleExport = async () => {
    try {
      const result = await PriceItemService.pageByLastPriceList({
        filter: filterContext,
        sortList,
        skip: 0,
        take: page.totalCount,
      });
      const columnNames = columns.map((x) => x.title ?? x.name);
      const mapResults = result.data.map((x, index) => [
        index + 1,
        x.name,
        x.interName,
        mapCost(x.cost),
        mapCost(x.costInDollar),
        mapCost(x.costInEuro),
        x.distributor,
        x.manufacturer,
        x.country,
        x.groupName,
      ]);
      mapResults.splice(0, 0, columnNames);
      const ws = XLSX.utils.json_to_sheet(mapResults, { skipHeader: true });
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, `${t('Last summary price list')}`);
      XLSX.writeFile(wb, `${format(new Date(), 'yyyy-MM-dd-HH-mm-ss')}.xlsx`);
    } catch (e) {}
  };

  const fetchPrice = async () => {
    try {
      const price = await PriceService.fetchLast();
      setLastPrice(price);
    } catch {}
  };
  useEffect(() => {
    fetchPrice();
  }, []);

  const sorting = useMemo<Sorting[]>(
    () =>
      sortList.map((sort) => ({
        columnName: sort.field,
        direction: sort.direction === SortTypes.DESC ? 'desc' : 'asc',
      })),
    [sortList]
  );
  const activeFilter = useMemo<ColumnFilterStateProps<unknown>[]>(() => {
    return [
      {
        columnName: JointPriceColumns.name,
        filter: filterContext.product,
      },
      {
        columnName: JointPriceColumns.groupName,
        filter: filterContext.groupName,
      },
      {
        columnName: JointPriceColumns.manufacturer,
        filter: filterContext.manufacturer,
      },
      {
        columnName: JointPriceColumns.interName,
        filter: filterContext.interName,
      },
      {
        columnName: JointPriceColumns.country,
        filter: filterContext.country,
      },
      {
        columnName: JointPriceColumns.distributor,
        filter: filterContext.distributor,
      },
      {
        columnName: JointPriceColumns.publicDate,
        filter: filterContext.publicDate,
      },
      {
        columnName: JointPriceColumns.cost,
        filter: filterContext.cost,
      },
      {
        columnName: JointPriceColumns.costInDollar,
        filter: filterContext.costInDollar,
      },
      {
        columnName: JointPriceColumns.costInEuro,
        filter: filterContext.costInEuro,
      },
    ];
  }, [filterContext]);

  const handleSorting = useCallback((params: Sorting[]) => {
    summaryPriceListCache.clear();
    console.log('handle sort');
    sortPriceItems(
      params.map((sort) => ({
        field: sort.columnName,
        direction: sort.direction === 'desc' ? SortTypes.DESC : SortTypes.ASC,
      }))
    );
  }, []);

  useEffect(() => {
    handleFetch(0, PAGE_SIZE);
  }, [filterContext]);

  const handleFilterChanged = (columnFilter: ColumnFilterStateProps<unknown>) => {
    const newPageFilterContext = { ...filterContext };
    summaryPriceListCache.clear();
    switch (columnFilter.columnName) {
      case JointPriceColumns.publicDate: {
        newPageFilterContext.publicDate = columnFilter.filter as FilterDefinition<string> | undefined;
        break;
      }
      case JointPriceColumns.name: {
        newPageFilterContext.product = columnFilter.filter as FilterDefinition<string> | undefined;
        break;
      }
      case JointPriceColumns.groupName: {
        newPageFilterContext.groupName = columnFilter.filter as FilterDefinition<string> | undefined;
        break;
      }
      case JointPriceColumns.interName: {
        newPageFilterContext.interName = columnFilter.filter as FilterDefinition<string> | undefined;
        break;
      }
      case JointPriceColumns.distributor: {
        newPageFilterContext.distributor = columnFilter.filter as FilterDefinition<string> | undefined;
        break;
      }
      case JointPriceColumns.manufacturer: {
        newPageFilterContext.manufacturer = columnFilter.filter as FilterDefinition<string> | undefined;
        break;
      }
      case JointPriceColumns.country: {
        newPageFilterContext.country = columnFilter.filter as FilterDefinition<string> | undefined;
        break;
      }
      case JointPriceColumns.cost: {
        newPageFilterContext.cost = columnFilter.filter as FilterDefinition<number> | undefined;
        break;
      }
      case JointPriceColumns.costInDollar: {
        newPageFilterContext.costInDollar = columnFilter.filter as FilterDefinition<number> | undefined;
        break;
      }
      case JointPriceColumns.costInEuro: {
        newPageFilterContext.costInEuro = columnFilter.filter as FilterDefinition<number> | undefined;
        break;
      }
    }
    updateFilter(newPageFilterContext);
  };

  const handleFetch = (skip: number, take: number) => {
    console.log(`skip:${skip}, take:${take}`);
    const rowsLength = summaryPriceListCache.getLength(skip, take);
    if (rowsLength === take) {
      const rows = summaryPriceListCache.getRows(skip, take);
      console.log('update');
      updatePageData({ skip, take, data: rows });
    } else {
      fetchPriceItems({
        skip,
        take,
        sortList,
        filter: filterContext,
      });
    }
  };

  const hasAccessExcel = useMemo(() => !page || page?.totalCount <= 0 || page.totalCount > 1000, []);

  return (
    <AppLayout>
      <AppHeader>
        <Typography variant="h2" color="inherit">
          {title}
        </Typography>
      </AppHeader>
      <AppContent>
        <Box className={classes.actionsWrapper}>
          {
            <Tooltip title={t('You can export no more than 1000')?.toString()}>
              <Button
                disabled={hasAccessExcel}
                variant="contained"
                onClick={handleExport}
                endIcon={
                  <SvgIcon>
                    <ExcelIcon />
                  </SvgIcon>
                }
              >
                {t('Export to Excel')}
              </Button>
            </Tooltip>
          }
          <Typography color="secondary" component="span">
            {t('Excel export is available only for the number of records no more than 1000')}{' '}
          </Typography>
        </Box>
        <Paper className={classes.root}>
          <Box className={classes.container}>
            <Grid rows={page.data} columns={columns} getRowId={(row) => row.id}>
              <VirtualTableState
                getRows={handleFetch}
                totalRowCount={page.totalCount}
                pageSize={PAGE_SIZE}
                skip={skip}
                loading={loading}
                infiniteScrolling={false}
              />
              <VirtualTable height={window.innerHeight >= 600 ? 'calc(100vh - 180px)' : '100vh'} />
              <TableColumnResizing
                resizingMode="nextColumn"
                defaultColumnWidths={columns.map((column) => ({
                  columnName: column.name,
                  width: column.width,
                }))}
              />
              <SortingState sorting={sorting} onSortingChange={handleSorting} />
              <SummaryState totalItems={[{ columnName: 'id', type: 'count' }]} />
              <CustomSummary totalValues={[page.totalCount]} />
              <TableHeaderRow showSortingControls contentComponent={HeaderContent} />
              {filterColumnsExpressions.map((option) => (
                <FilterTypeProvider
                  key={`filter-type-provider-${option.column}`}
                  columns={[option.column]}
                  expressionOptions={option.expression}
                />
              ))}

              <HeaderFilterState filters={activeFilter} onFilterChanged={handleFilterChanged} />
              <TableHeaderCellFilter />
              <TableSummaryRow />
            </Grid>
          </Box>
        </Paper>
      </AppContent>
    </AppLayout>
  );
};
export default SummaryPriceList;

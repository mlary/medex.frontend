import React, { useCallback, useEffect, useMemo } from 'react';
import {
  Grid,
  TableHeaderRow,
  VirtualTable,
  TableColumnResizing,
  TableSummaryRow,
} from '@devexpress/dx-react-grid-material-ui';
import { SortingState, Sorting, VirtualTableState, SummaryState, CustomSummary } from '@devexpress/dx-react-grid';
import { useTranslation } from 'react-i18next';
import { useDashboardColumns } from './useDashboardColumns';
import { DashboardColumns } from './columns';
import { useDashboardFilterOptions } from './useDashboardFilterOptions';

import { Box, Button, createStyles, makeStyles, Paper, SvgIcon, Tooltip, Typography } from '@material-ui/core';
import { useStore } from 'effector-react';
import {
  $dashboard,
  fetchPriceItems,
  sortPriceItems,
  updatePageData,
  updateFilter,
  dashboardCach,
} from './Dashboard.effects';
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
import XLSX from 'xlsx';
import PriceItemService from '../../services/PriceItemService';
import { ReactComponent as ExcelIcon } from '../../assets/icons/excel.svg';
import format from 'date-fns/format';

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
const Dashboard = () => {
  const { t } = useTranslation();
  const { columns } = useDashboardColumns();
  const filterColumnsExpressions = useDashboardFilterOptions();
  const { sortList, page, loading, skip, filterContext } = useStore($dashboard);
  const classes = useStyles();
  const sorting = useMemo<Sorting[]>(
    () =>
      sortList.map((sort) => ({
        columnName: sort.field,
        direction: sort.direction === SortTypes.DESC ? 'desc' : 'asc',
      })),
    [sortList]
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
      const result = await PriceItemService.page({
        filter: filterContext,
        sortList,
        skip: 0,
        take: page.totalCount,
      });
      const columnNames = columns.map((x) => x.title ?? x.name);
      const mapResults = result.data.map((x, index) => [
        index + 1,
        x.name,
        x.publicDate,
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
      XLSX.utils.book_append_sheet(wb, ws, `${t('price list')}`);
      XLSX.writeFile(wb, `${format(new Date(), 'yyyy-MM-dd-HH-mm-ss')}.xlsx`);
    } catch (e) {}
  };

  const activeFilter = useMemo<ColumnFilterStateProps<unknown>[]>(() => {
    return [
      {
        columnName: DashboardColumns.name,
        filter: filterContext.product,
      },
      {
        columnName: DashboardColumns.groupName,
        filter: filterContext.groupName,
      },
      {
        columnName: DashboardColumns.manufacturer,
        filter: filterContext.manufacturer,
      },
      {
        columnName: DashboardColumns.interName,
        filter: filterContext.interName,
      },
      {
        columnName: DashboardColumns.country,
        filter: filterContext.country,
      },
      {
        columnName: DashboardColumns.distributor,
        filter: filterContext.distributor,
      },
      {
        columnName: DashboardColumns.publicDate,
        filter: filterContext.publicDate,
      },
      {
        columnName: DashboardColumns.cost,
        filter: filterContext.cost,
      },
      {
        columnName: DashboardColumns.costInDollar,
        filter: filterContext.costInDollar,
      },
      {
        columnName: DashboardColumns.costInEuro,
        filter: filterContext.costInEuro,
      },
    ];
  }, [filterContext]);

  const handleSorting = useCallback((params: Sorting[]) => {
    console.log('handle sort');
    dashboardCach.clear();
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
    dashboardCach.clear();
    const newPageFilterContext = { ...filterContext };
    switch (columnFilter.columnName) {
      case DashboardColumns.publicDate: {
        newPageFilterContext.publicDate = columnFilter.filter as FilterDefinition<string> | undefined;
        break;
      }
      case DashboardColumns.name: {
        newPageFilterContext.product = columnFilter.filter as FilterDefinition<string> | undefined;
        break;
      }
      case DashboardColumns.groupName: {
        newPageFilterContext.groupName = columnFilter.filter as FilterDefinition<string> | undefined;
        break;
      }
      case DashboardColumns.interName: {
        newPageFilterContext.interName = columnFilter.filter as FilterDefinition<string> | undefined;
        break;
      }
      case DashboardColumns.distributor: {
        newPageFilterContext.distributor = columnFilter.filter as FilterDefinition<string> | undefined;
        break;
      }
      case DashboardColumns.manufacturer: {
        newPageFilterContext.manufacturer = columnFilter.filter as FilterDefinition<string> | undefined;
        break;
      }
      case DashboardColumns.country: {
        newPageFilterContext.country = columnFilter.filter as FilterDefinition<string> | undefined;
        break;
      }
      case DashboardColumns.cost: {
        newPageFilterContext.cost = columnFilter.filter as FilterDefinition<number> | undefined;
        break;
      }
      case DashboardColumns.costInEuro: {
        newPageFilterContext.costInEuro = columnFilter.filter as FilterDefinition<number> | undefined;
        break;
      }
      case DashboardColumns.costInDollar: {
        newPageFilterContext.costInDollar = columnFilter.filter as FilterDefinition<number> | undefined;
        break;
      }
    }
    updateFilter(newPageFilterContext);
  };

  const handleFetch = (skip: number, take: number) => {
    console.log(`skip:${skip}, take:${take}`);
    const rowsLength = dashboardCach.getLength(skip, take);
    if (rowsLength === take) {
      const rows = dashboardCach.getRows(skip, take);
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

  return (
    <AppLayout>
      <AppHeader>
        <Typography variant="h2" color="inherit">
          {t('Dashboard')}
        </Typography>
      </AppHeader>
      <AppContent>
        <Box className={classes.actionsWrapper}>
          {
            <Tooltip title={t('You can export no more than 1000')?.toString()}>
              <Button
                disabled={!page || page.totalCount === 0 || page.totalCount > 1000}
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
              <VirtualTable height={window.innerHeight > 768 ? 'calc(100vh - 180px)' : '100vh'} />
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
export default Dashboard;

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
import { useUserColumns } from './useUsersColumns';
import { UserColumns } from './columns';
import { useUserFilterOptions } from './useUsersFilterOptions';
import EditUserForm from './EditUserForm';

import {
  Box,
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  Paper,
  SvgIcon,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { useStore } from 'effector-react';
import {
  $users,
  fetchUsers,
  sortUsers,
  setUsersPageData,
  setUsersFilter,
  usersCache,
  ExtendedUserRow,
} from './Users.effects';
import { SortTypes } from '../../constants/sortTypes';
import AppLayout from '../Shared/AppLayout';
import AppHeader from '../Shared/AppLayout/AppHeader';
import AppContent from '../Shared/AppLayout/AppContent';
import ActionDataProvider from '../Shared/DevExpress/DataProviders/ActionDataProvider';
import TableHeaderCellFilter from '../Shared/DevExpress/Plugins/TableHeaderCellFilter';
import HeaderContent from '../Shared/DevExpress/Templates/HeaderContent';
import HeaderFilterState from '../Shared/DevExpress/Plugins/HeaderFilterState';
import { ColumnFilterStateProps } from '../Shared/DevExpress/Plugins/HeaderFilterState/HeaderFilterState';
import FilterTypeProvider from '../Shared/DevExpress/Plugins/FilterTypeProvider/FilterTypeProvider';
import { FilterDefinition } from '../../models/FilterContext/FilterDefinition';
import XLSX from 'xlsx';
import UserService from '../../services/UserService';
import { ReactComponent as ExcelIcon } from '../../assets/icons/excel.svg';
import format from 'date-fns/format';
import { EnumUserRoles } from '../../constants/enumUserRoles';

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
const Users = () => {
  const { t } = useTranslation();
  const { columns } = useUserColumns();
  const [selectedUser, setSelectedUser] = useState<ExtendedUserRow | undefined>();
  const filterColumnsExpressions = useUserFilterOptions();
  const { sortList, page, loading, skip, filterContext } = useStore($users);
  const classes = useStyles();
  const sorting = useMemo<Sorting[]>(
    () =>
      sortList.map((sort) => ({
        columnName: sort.field,
        direction: sort.direction === SortTypes.DESC ? 'desc' : 'asc',
      })),
    [sortList]
  );

  const mapRole = (role: EnumUserRoles) => {
    switch (role) {
      case EnumUserRoles.Administrator:
        return t('Administrator');
      case EnumUserRoles.Client:
        return t('Client');
      case EnumUserRoles.Markerter:
        return t('Markerter');
      default:
        return t('Guest');
    }
  };
  const handleExport = async () => {
    try {
      const result = await UserService.page({
        filter: filterContext,
        sortList,
        skip: 0,
        take: page.totalCount,
      });
      const columnNames = columns.map((x) => x.title ?? x.name);
      const mapResults = result.data.map((x, index) => [
        index + 1,
        `${x.lastName} ${x.firstName} ${x.middleName}`,
        x.login,
        mapRole(x.userRole),
        x.createdOn,
        x.phone,
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
        columnName: UserColumns.fullName,
        filter: filterContext.fullName,
      },
      {
        columnName: UserColumns.login,
        filter: filterContext.login,
      },
      {
        columnName: UserColumns.phone,
        filter: filterContext.phone,
      },
      {
        columnName: UserColumns.createdOn,
        filter: filterContext.createdOn,
      },
      {
        columnName: UserColumns.userRole,
        filter: filterContext.userRole,
      },
    ];
  }, [filterContext]);

  const handleSorting = useCallback((params: Sorting[]) => {
    console.log('handle sort');
    usersCache.clear();
    sortUsers(
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
    usersCache.clear();
    const newPageFilterContext = { ...filterContext };
    switch (columnFilter.columnName) {
      case UserColumns.createdOn: {
        newPageFilterContext.createdOn = columnFilter.filter as FilterDefinition<string> | undefined;
        break;
      }
      case UserColumns.fullName: {
        newPageFilterContext.fullName = columnFilter.filter as FilterDefinition<string> | undefined;
        break;
      }
      case UserColumns.login: {
        newPageFilterContext.login = columnFilter.filter as FilterDefinition<string> | undefined;
        break;
      }
      case UserColumns.phone: {
        newPageFilterContext.phone = columnFilter.filter as FilterDefinition<string> | undefined;
        break;
      }
      case UserColumns.userRole: {
        newPageFilterContext.userRole = columnFilter.filter as FilterDefinition<number> | undefined;
        break;
      }
    }
    setUsersFilter(newPageFilterContext);
  };

  const handleFetch = (skip: number, take: number) => {
    console.log(`skip:${skip}, take:${take}`);
    const rowsLength = usersCache.getLength(skip, take);
    if (rowsLength === take) {
      const rows = usersCache.getRows(skip, take);
      console.log('update');
      setUsersPageData({ skip, take, data: rows });
    } else {
      fetchUsers({
        skip,
        take,
        sortList,
        filter: filterContext,
      });
    }
  };
  const handleUserEdit = (user?: ExtendedUserRow) => {
    setSelectedUser(user);
  };
  const handleSubmit = async (data: ExtendedUserRow) => {
    await UserService.changeRole(data);
    setSelectedUser(undefined);
  };
  const handleEditFormClose = () => setSelectedUser(undefined);

  return (
    <AppLayout>
      <AppHeader>
        <Typography variant="h2" color="inherit">
          {t('Users')}
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
              <ActionDataProvider<ExtendedUserRow> onEdit={handleUserEdit} />
              <TableSummaryRow />
            </Grid>
          </Box>
        </Paper>
        {selectedUser && (
          <Dialog onClose={handleEditFormClose} open={Boolean(selectedUser)} fullWidth>
            <DialogTitle>{t('Edit user')}</DialogTitle>
            <DialogContent dividers>
              <EditUserForm onSubmit={handleSubmit} data={selectedUser} />
            </DialogContent>
            <DialogActions>
              <Button type="submit" form="editUserForm" color="primary">
                {t('Save changes')}
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </AppContent>
    </AppLayout>
  );
};
export default Users;

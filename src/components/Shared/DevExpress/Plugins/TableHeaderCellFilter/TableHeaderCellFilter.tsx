import React, { useState } from 'react';
import { Actions, Getters, Plugin, Template, TemplateConnector } from '@devexpress/dx-react-core';
import FilterListIcon from '@material-ui/icons/FilterList';
import { Box, createStyles, IconButton, makeStyles } from '@material-ui/core';
import { ColumnFilterStateProps } from '../HeaderFilterState/HeaderFilterState';
import { Column } from '@devexpress/dx-react-grid';
import { toggleHeaderCellMenu } from './TableHeaderCellFilter.effects';
import { TemplatePopover } from './TemplatePopover';

interface TableHeaderCellFilterProps {}
const useStyles = makeStyles((theme) =>
  createStyles({
    filterIcon: {
      padding: theme.spacing(1),
    },
  })
);

const getFilter = (column: Column, { filters }: Getters): ColumnFilterStateProps<unknown> | undefined => {
  const columnFilterProps = (filters as ColumnFilterStateProps<unknown>[]).find((columnFilter) => {
    const result = columnFilter.columnName === column.name;
    return result;
  });
  return columnFilterProps;
};

type TableHeaderCellAfterProps = { column: Column };
const TableHeaderCellFilter = (props: TableHeaderCellFilterProps) => {
  const [selectedColumn, setSelectedColumn] = useState<Column | undefined>();
  const [columnFilterState, setColumnFilterState] = useState<ColumnFilterStateProps<unknown> | undefined>();
  const classes = useStyles();

  const renderFilterButtons = (column: Column, getters: Getters, actions: Actions) => {
    const columnFilter = getFilter(column, getters);
    const handleFilterClick = (e: React.MouseEvent<Element>, column: Column) => {
      toggleHeaderCellMenu(e.currentTarget);
      setSelectedColumn(column);
      if (columnFilter) {
        setColumnFilterState(columnFilter);
      } else {
        setColumnFilterState({ columnName: column.name });
      }
    };
    if (!column.filterType) {
      return null;
    }
    return (
      <Box className={classes.filterIcon}>
        <IconButton>
          <FilterListIcon
            color={
              columnFilter?.filter?.value || columnFilter?.filter?.values || columnFilter?.filter?.range
                ? 'secondary'
                : 'inherit'
            }
            onClick={(e) => {
              handleFilterClick(e, column);
            }}
          />
          {/* )} */}
        </IconButton>
      </Box>
    );
  };
  return (
    <Plugin name="TableHeaderCellFilter" dependencies={[{ name: 'HeaderFilterState' }]}>
      <Template name="tableHeaderCellAfter">
        {({ column }: TableHeaderCellAfterProps) => (
          <TemplateConnector>{(getters, actions) => renderFilterButtons(column, getters, actions)}</TemplateConnector>
        )}
      </Template>
      <TemplateConnector>
        {(getters, actions) => (
          <TemplatePopover
            filterState={columnFilterState}
            column={selectedColumn}
            onFilterChanged={(columnFilter: ColumnFilterStateProps<unknown>) => {
              actions.changeFilter(columnFilter);
              toggleHeaderCellMenu(null);
              setSelectedColumn(undefined);
              setColumnFilterState(undefined);
            }}
            onClose={() => {
              toggleHeaderCellMenu(null);
              setSelectedColumn(undefined);
              setColumnFilterState(undefined);
            }}
          />
        )}
      </TemplateConnector>
    </Plugin>
  );
};
export default TableHeaderCellFilter;

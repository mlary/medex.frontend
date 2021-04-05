import React from 'react';
import { Template, TemplatePlaceholder } from '@devexpress/dx-react-core';
import { ColumnFilterStateProps } from '../HeaderFilterState/HeaderFilterState';
import { Column } from '@devexpress/dx-react-grid';
import { EnumFilterTypes } from '../../../../../constants/enumFilterTypes';
import { useStore } from 'effector-react';
import { $tableHeaderStore, toggleHeaderCellMenu } from './TableHeaderCellFilter.effects';
import { Box, createStyles, IconButton, makeStyles, Popover } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/CloseOutlined';
import { FilterString } from '../../Filter/FilterString/FilterString';
import { FilterDate } from '../../Filter/FilterDate/FilterDate';
import { FilterNumber } from '../../Filter/FilterNumber/FilterNumber';

import { FilterDefinition } from '../../../../../models/FilterContext/FilterDefinition';
export type TemplatePopoverProps = {
  column?: Column;
  filterState?: ColumnFilterStateProps<unknown>;
  onFilterChanged: (columnFilter: ColumnFilterStateProps<unknown>) => void;
  onClose: () => void;
};
const useStyles = makeStyles((theme) =>
  createStyles({
    actions: {
      position: 'relative',
    },
    closeButton: {
      position: 'absolute',
      top: theme.spacing(-1.5),
      right: theme.spacing(-1.5),
    },
    content: {
      height: 'auto',
      width: 324,
      padding: theme.spacing(2),
    },
  })
);
export const TemplatePopover = (props: TemplatePopoverProps) => {
  const { filterState, onFilterChanged, column, onClose } = props;
  const { anchorElement } = useStore($tableHeaderStore);
  const classes = useStyles();

  const renderFilter = () => {
    if (column && filterState) {
      switch (column.filterType) {
        case EnumFilterTypes.BOOLEAN:
          return <Box>{`${column.name} Boolean`}</Box>;
        case EnumFilterTypes.NUMBER:
          return (
            <FilterNumber
              columnName={column.name}
              onClear={() => {
                onFilterChanged({
                  columnName: column.name,
                });
              }}
              onSubmit={(filter) => {
                onFilterChanged({
                  columnName: column.name,
                  filter,
                });
              }}
              filter={filterState.filter as FilterDefinition<number>}
            />
          );
        case EnumFilterTypes.DATE:
          return (
            <FilterDate
              columnName={column.name}
              onClear={() => {
                onFilterChanged({
                  columnName: column.name,
                });
              }}
              onSubmit={(filter) => {
                onFilterChanged({
                  columnName: column.name,
                  filter,
                });
              }}
              filter={filterState.filter as FilterDefinition<string>}
            />
          );
        case EnumFilterTypes.STRING:
          return (
            <FilterString
              columnName={column.name}
              onClear={() => {
                onFilterChanged({
                  columnName: column.name,
                });
              }}
              onSubmit={(filter) => {
                onFilterChanged({
                  columnName: column.name,
                  filter,
                });
              }}
              filter={filterState.filter as FilterDefinition<string>}
              hasAdvancedFilter={column.hasAdvancedFilter}
            />
          );
        default:
          return null;
      }
    }
  };
  const handleClose = () => {
    toggleHeaderCellMenu(null);
    onClose();
  };
  return (
    <Template name={'table'}>
      <TemplatePlaceholder />
      <Popover open={Boolean(anchorElement)} anchorEl={anchorElement} onClose={handleClose}>
        <Box className={classes.actions}>
          <IconButton onClick={handleClose} className={classes.closeButton}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box className={classes.content}>{renderFilter()}</Box>
      </Popover>
    </Template>
  );
};

import React, { useMemo, useState } from 'react';
import { Box, Button, createStyles, Grid, makeStyles } from '@material-ui/core';
import { FilterDefinition } from '../../../../../models/FilterContext/FilterDefinition';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { useTranslation } from 'react-i18next';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { isValid, format } from 'date-fns';
import { DATE_DOT_FORMAT, DEFAULT_DATE_FORMAT } from '../../../../../constants';
interface FilterStringProps {
  filter?: FilterDefinition<string>;
  columnName: string;
  hasAdvancedFilter?: boolean;
  onSubmit: (filter?: FilterDefinition<string>) => void;
  onClear: () => void;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    bottom: {
      padding: theme.spacing(1, 2, 0, 2),
      borderTop: `1px solid ${theme.palette.divider}`,
    },
    buttonWrapper: {
      padding: theme.spacing(1),
    },
    listbox: {
      boxSizing: 'border-box',
      '& ul': {
        padding: 0,
        margin: 0,
      },
    },
    tooltip: {
      fontSize: 14,
    },
  })
);
export const FilterDate = (props: FilterStringProps) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { filter, onSubmit, onClear } = props;
  const [filterState, setFilterState] = useState<FilterDefinition<string> | undefined>(filter);
  const handleFromDateChanged = (date: MaterialUiPickersDate) => {
    setFilterState({
      ...filterState,
      range: {
        ...filterState?.range,
        gte: date && isValid(date) ? format(date, DEFAULT_DATE_FORMAT) : date ? 'Inivalid date' : undefined,
      },
    });
  };

  const handleToDateChanged = (date: MaterialUiPickersDate) => {
    setFilterState({
      ...filterState,
      range: {
        ...filterState?.range,
        lte: date && isValid(date) ? format(date, DEFAULT_DATE_FORMAT) : date ? 'Inivalid date' : undefined,
      },
    });
  };

  const isRangeInvalid = useMemo<boolean>(() => {
    const gteValid = filterState?.range?.gte ? isValid(new Date(filterState.range.gte)) : true;
    const lteValid = filterState?.range?.lte ? isValid(new Date(filterState.range.lte)) : true;
    return !gteValid || !lteValid;
  }, [filterState]);

  const handleSubmit = () => {
    onSubmit(filterState);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <KeyboardDatePicker
          disableToolbar
          invalidDateMessage={t('Date is invalid')}
          variant="inline"
          format={DATE_DOT_FORMAT}
          margin="normal"
          id="date-frpm"
          label={t('Date from')}
          value={filterState?.range?.gte ?? null}
          onChange={handleFromDateChanged}
          KeyboardButtonProps={{
            'aria-label': t('change date'),
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <KeyboardDatePicker
          disableToolbar
          invalidDateMessage={t('Date is invalid')}
          variant="inline"
          format={DATE_DOT_FORMAT}
          margin="normal"
          defaultValue={null}
          id="date-to"
          label={t('Date to')}
          value={filterState?.range?.lte ?? null}
          onChange={handleToDateChanged}
          KeyboardButtonProps={{
            'aria-label': t('change date'),
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <Box className={classes.bottom} display="flex" alignItems="flex-end" justifyContent="flex-end">
          <Box className={classes.buttonWrapper}>
            <Button color="primary" variant="contained" onClick={handleSubmit} disabled={isRangeInvalid}>
              {t('Accept')}
            </Button>
          </Box>
          <Box className={classes.buttonWrapper}>
            <Button color="default" variant="contained" onClick={onClear}>
              {t('Clear')}
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

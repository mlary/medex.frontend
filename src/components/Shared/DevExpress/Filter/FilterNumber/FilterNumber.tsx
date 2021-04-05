import React, { useState } from 'react';
import { Box, Button, createStyles, Grid, makeStyles, TextField } from '@material-ui/core';
import { FilterDefinition } from '../../../../../models/FilterContext/FilterDefinition';
import { useTranslation } from 'react-i18next';

interface FilterStringProps {
  filter?: FilterDefinition<number>;
  columnName: string;
  onSubmit: (filter?: FilterDefinition<number>) => void;
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
export const FilterNumber = (props: FilterStringProps) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { filter, onSubmit, onClear } = props;
  const [filterState, setFilterState] = useState<FilterDefinition<number> | undefined>(filter);
  const handleFromChanged = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setFilterState({
      ...filterState,
      range: {
        ...filterState?.range,
        gte: Number.parseFloat(e.target.value),
      },
    });
  };
  const handleToChanged = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setFilterState({
      ...filterState,
      range: {
        ...filterState?.range,
        lte: Number.parseFloat(e.target.value),
      },
    });
  };
  const handleSubmit = () => {
    onSubmit(filterState);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          autoComplete="off"
          label={t('Value from')}
          name="value"
          type="number"
          fullWidth
          placeholder={t('Enter value')}
          value={filterState?.range?.gte}
          onChange={handleFromChanged}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          autoComplete="off"
          label={t('Value To')}
          name="value"
          type="number"
          fullWidth
          placeholder={t('Enter value')}
          value={filterState?.range?.lte}
          onChange={handleToChanged}
        />
      </Grid>

      <Grid item xs={12}>
        <Box className={classes.bottom} display="flex" alignItems="flex-end" justifyContent="flex-end">
          <Box className={classes.buttonWrapper}>
            <Button color="primary" variant="contained" onClick={handleSubmit}>
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

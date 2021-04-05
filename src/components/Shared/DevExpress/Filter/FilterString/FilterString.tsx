import React, { useState } from 'react';
import { Box, Button, createStyles, Grid, makeStyles, TextField, Tooltip, Typography } from '@material-ui/core';
import { FilterDefinition } from '../../../../../models/FilterContext/FilterDefinition';
import { Autocomplete } from '@material-ui/lab';
import { ListboxComponent } from '../../../VirtualListBox/VirtualListBox';
import { TemplatePlaceholder } from '@devexpress/dx-react-core';
import { FilterExpressionProps } from '../../Plugins/FilterTypeProvider/FilterTypeProvider';
import { useTranslation } from 'react-i18next';
import { FilterOperator } from '../../../../../constants/filterOperator';

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
export const FilterString = (props: FilterStringProps) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { filter, columnName, hasAdvancedFilter, onSubmit, onClear } = props;
  const [filterState, setFilterState] = useState<FilterDefinition<string> | undefined>(filter);
  const handleValueChanged = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setFilterState({ ...filterState, value: e.target.value, operator: FilterOperator.CONTAINS });
  };
  const handleValuesChanged = (event: React.ChangeEvent<{}>, values: any[]) => {
    setFilterState({ ...filterState, values });
  };
  const handleSubmit = () => {
    onSubmit(filterState);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          autoComplete="off"
          label={t('Condition filter')}
          name="value"
          fullWidth
          placeholder={'Contains'}
          value={filterState?.value}
          onChange={handleValueChanged}
        />
      </Grid>
      {hasAdvancedFilter && (
        <Grid item xs={12}>
          <TemplatePlaceholder name="filterTypeProviderExpressionActions" params={{ column: columnName }}>
            {(params: FilterExpressionProps<unknown>) => (
              <Autocomplete
                multiple
                disableCloseOnSelect={true}
                value={filterState?.values}
                onChange={handleValuesChanged}
                disableListWrap
                classes={classes}
                getOptionLabel={(option) => params.getItemValue(option)}
                ListboxComponent={ListboxComponent as React.ComponentType<React.HTMLAttributes<HTMLElement>>}
                options={params.getAllItems()}
                renderInput={(params) => (
                  <TextField
                    label={t('Value filter')}
                    {...params}
                    placeholder={t('Select options')}
                    variant="outlined"
                  />
                )}
                renderOption={(option) => (
                  <Tooltip title={params.getItemValue(option)} className={classes.tooltip}>
                    <Typography noWrap>{params.getItemValue(option)}</Typography>
                  </Tooltip>
                )}
              />
            )}
          </TemplatePlaceholder>
        </Grid>
      )}

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

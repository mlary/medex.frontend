import React, { useEffect, useState } from 'react';
import { Grid, TableHeaderRow, Table } from '@devexpress/dx-react-grid-material-ui';
import { IntegratedSorting, IntegratedSummary, SortingState, SummaryState } from '@devexpress/dx-react-grid';
import { useTranslation } from 'react-i18next';
import { usePriceColumns } from './usePriceColumns';
import { PriceColumns } from './columns';
import AddIcon from '@material-ui/icons/Add';
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
  Typography,
} from '@material-ui/core';
import { useStore } from 'effector-react';
import { $prices, fetchPrices } from './Prices.effects';
import AppLayout from '../Shared/AppLayout';
import AppHeader from '../Shared/AppLayout/AppHeader';
import AppContent from '../Shared/AppLayout/AppContent';
import HeaderContent from '../Shared/DevExpress/Templates/HeaderContent';
import { Price } from '../../services/PriceService/models/Price';
import { EditPriceForm } from './EditPriceForm';
import PriceService from '../../services/PriceService';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {},
    container: {
      padding: theme.spacing(1),
      height: 'calc(100vh - 200px)',
      overflowY: 'auto',
    },
    actionBar: {
      paddingBottom: theme.spacing(1),
    },
  })
);
const PriceManager = () => {
  const classes = useStyles();
  const { data: gridData } = useStore($prices);
  const { columns } = usePriceColumns();
  const [isEditFormOpened, setIsEditFormOpened] = useState<boolean>(false);
  const [selectedPrice, setSelectedPrice] = useState<Price | undefined>();
  const { t } = useTranslation();
  const refreshPriceLists = () => {
    fetchPrices();
  };
  const handleFormClose = () => {
    setIsEditFormOpened(false);
    setSelectedPrice(undefined);
  };
  const handleAddPriceClick = () => {
    setSelectedPrice(undefined);
    setIsEditFormOpened(true);
  };

  const handleSubmit = async (price: Price) => {
    if (selectedPrice) {
      await PriceService.update(price);
    } else {
      await PriceService.add(price);
    }
    setIsEditFormOpened(false);
    fetchPrices();
  };

  useEffect(() => {
    refreshPriceLists();
  }, []);

  return (
    <AppLayout>
      <AppHeader>
        <Typography variant="h2" color="inherit">
          {t('Manage price lists')}
        </Typography>
      </AppHeader>
      <AppContent>
        <Box className={classes.actionBar}>
          <Button startIcon={<AddIcon />} onClick={handleAddPriceClick} color="primary">
            {t('Add new')}
          </Button>
        </Box>
        <Paper className={classes.root}>
          <Box className={classes.container}>
            <Grid rows={gridData} columns={columns} getRowId={(row) => row.id}>
              <SortingState defaultSorting={[{ columnName: PriceColumns.publicDate, direction: 'desc' }]} />
              <IntegratedSorting />
              <SummaryState totalItems={[{ columnName: 'id', type: 'count' }]} />
              <IntegratedSummary />
              <Table />
              <TableHeaderRow showSortingControls contentComponent={HeaderContent} />
            </Grid>
          </Box>
        </Paper>
      </AppContent>
      <Dialog onClose={handleFormClose} open={isEditFormOpened}>
        <DialogTitle>{selectedPrice ? t('Edit price') : t('Add new price')}</DialogTitle>
        <DialogContent dividers>
          <EditPriceForm onSubmit={handleSubmit} priceData={selectedPrice} />
        </DialogContent>
        <DialogActions>
          <Button type="submit" form="editPriceForm" color="primary">
            {t('Save changes')}
          </Button>
        </DialogActions>
      </Dialog>
    </AppLayout>
  );
};
export default PriceManager;

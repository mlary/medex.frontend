import React, { useMemo, useState } from 'react';
import { Grid, TextField, Typography } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import DocumentInput from '../Shared/DocumentInput';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { Price } from '../../services/PriceService/models/Price';
import { DocumentDto } from '../../services/DocumentService/models/DocumentDto';
import { format } from 'date-fns';
import { DEFAULT_DATE_FORMAT, DATE_DOT_FORMAT } from '../../constants';
import { useTranslation } from 'react-i18next';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

export interface EditPriceFormProps {
  priceData?: Price;
  onSubmit: (data: Price) => void;
}

export const EditPriceForm = (props: EditPriceFormProps) => {
  const { onSubmit, priceData } = props;
  const { t } = useTranslation();
  const [document, setDocument] = useState<DocumentDto | undefined>(priceData?.document);
  const { handleSubmit, register, errors, control } = useForm<Price>({ defaultValues: priceData });
  const isEditing = useMemo(() => priceData?.id && priceData?.id > 0, [priceData]);

  return (
    <form
      id="editPriceForm"
      onSubmit={handleSubmit((e) => {
        onSubmit({
          ...priceData,
          ...e,
          dollarRate: e.dollarRate ? Number.parseFloat(e.dollarRate?.toString()) : 0,
          euroRate: e.euroRate ? Number.parseFloat(e.euroRate?.toString()) : 0,
        });
      })}
    >
      <Grid container spacing={1}>
        {!isEditing && (
          <Grid item lg={12}>
            <Controller
              name="documentId"
              control={control}
              rules={{
                required: t('Enter document')?.toString(),
              }}
              render={({ value, onChange }) => (
                <DocumentInput
                  name={'file'}
                  accept=".csv"
                  documents={document ? [document] : []}
                  onAdd={(doc) => {
                    setDocument(doc);
                    onChange(doc.id);
                  }}
                />
              )}
            />
            {errors.publicDate && (
              <Typography component="span" color="error">
                {errors.documentId?.message}
              </Typography>
            )}
          </Grid>
        )}
        <Grid item lg={12}>
          <Controller
            as={KeyboardDatePicker}
            name="publicDate"
            label={t('Publish date')}
            control={control}
            clearable
            id="public-date"
            disableToolbar
            variant="inline"
            margin="normal"
            fullWidth
            value={null}
            inputVariant="outlined"
            format={DATE_DOT_FORMAT}
            onChange={(date: MaterialUiPickersDate) => (date ? format(date, DEFAULT_DATE_FORMAT) : undefined)}
            rules={{ required: true }}
          />
          {errors.publicDate && (
            <Typography component="span" color="error">
              {t('Enter Publish date')}
            </Typography>
          )}
        </Grid>
        <Grid item lg={12}>
          <TextField
            name="dollarRate"
            label={t('Dollar rate')}
            variant="outlined"
            fullWidth
            inputRef={register({
              required: t('Please dollar rate')?.toString(),
              min: 0,
            })}
            type="number"
          />
          {errors.dollarRate && (
            <Typography component="span" color="error">
              {errors?.dollarRate?.message}
            </Typography>
          )}
        </Grid>
        <Grid item lg={12}>
          <TextField
            name="euroRate"
            fullWidth
            variant="outlined"
            label={t('Euro rate')}
            inputRef={register({
              required: t('Enter euro rate')?.toString(),
              min: 0,
            })}
            type="number"
          />
          {errors.euroRate && (
            <Typography component="span" color="error">
              {errors?.euroRate?.message}
            </Typography>
          )}
        </Grid>
      </Grid>
    </form>
  );
};

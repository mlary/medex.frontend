import { Grid, MenuItem, Select } from '@material-ui/core';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import useRoles from './useRoles';
import { ExtendedUserRow } from './Users.effects';
interface EditUserFormProps {
  onSubmit: (data: ExtendedUserRow) => void;
  data: ExtendedUserRow;
}
const EditUserForm = (props: EditUserFormProps) => {
  const { data: userData, onSubmit } = props;
  const { handleSubmit, control, errors } = useForm<ExtendedUserRow>({ defaultValues: userData });
  const { roles } = useRoles();
  return (
    <form
      id="editUserForm"
      onSubmit={handleSubmit((e) => {
        onSubmit({
          ...userData,
          ...e,
        });
      })}
    >
      <Grid container spacing={1}>
        <Grid item lg={12}>
          <Controller
            name={'userRole'}
            control={control}
            render={({ value, onChange }) => (
              <Select
                fullWidth={true}
                value={value}
                onChange={(e) => {
                  onChange(e.target.value);
                }}
              >
                {roles.map((role) => (
                  <MenuItem value={role.id}>{role.name}</MenuItem>
                ))}
              </Select>
            )}
          />
        </Grid>
      </Grid>
    </form>
  );
};
export default EditUserForm;

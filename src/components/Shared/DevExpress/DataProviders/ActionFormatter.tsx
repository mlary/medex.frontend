import { IconButton } from '@material-ui/core';
import React from 'react';
import { ActionTypeProviderProps } from './ActionTypeFormatterProps';
import { KnownValueFormatterProps } from './KnownValueFormatterProps';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
type ActionFormatterProps<T> = KnownValueFormatterProps<T> & ActionTypeProviderProps<T>;
const ActionFotmatter = <T extends unknown>(props: ActionFormatterProps<T>) => {
  const { value, onEdit, onDelete, row } = props;
  return (
    <>
      {onEdit && row && (
        <IconButton onClick={() => onEdit(row)}>
          <EditOutlinedIcon />
        </IconButton>
      )}
      {onDelete && row && (
        <IconButton onClick={() => onDelete(row)}>
          <DeleteOutlineIcon />
        </IconButton>
      )}
    </>
  );
};
export default ActionFotmatter;

import React from 'react';
import { DataTypeProvider } from '@devexpress/dx-react-grid';
import ActionFotmatter from './ActionFormatter';
import { ActionTypeProviderProps } from './ActionTypeFormatterProps';

const ActionDataProvider = <T extends unknown>(props: ActionTypeProviderProps<T>) => (
  <DataTypeProvider formatterComponent={(params) => <ActionFotmatter<T> {...props} {...params} />} for={['actions']} />
);
export default ActionDataProvider;

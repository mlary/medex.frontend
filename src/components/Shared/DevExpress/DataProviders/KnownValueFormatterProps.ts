import { DataTypeProvider } from '@devexpress/dx-react-grid';

export interface KnownValueFormatterProps<T> extends DataTypeProvider.ValueFormatterProps {
  row?: T;
}

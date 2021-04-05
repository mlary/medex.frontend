declare global {
  declare module '@devexpress/dx-react-grid' {
    interface Column {
      filterType?: string;
      width: string | number;
      hasAdvancedFilter?: boolean;
    }
  }
}

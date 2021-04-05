export interface ActionTypeProviderProps<T> {
  onEdit?: (data: T) => void;
  onAdd?: (data: T) => void;
  onDelete?: (data: T) => void;
}

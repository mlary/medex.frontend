export interface ResponseWrapper<T> {
  errors?: string[];
  success: boolean;
  data: T;
}

import { EnumPriceStatusCode } from '../../../constants/enumPriceStatusCodes';
import { DocumentDto } from '../../DocumentService/models/DocumentDto';

export interface Price {
  createdOn?: string;
  publicDate?: string;
  dollarRate?: number;
  euroRate?: number;
  status?: EnumPriceStatusCode;
  documentId?: number;
  document?: DocumentDto;
  id?: number;
}
export interface PriceUpdateDto {
  publicDate?: string;
  dollarRate?: number;
  euroRate?: number;
  status?: EnumPriceStatusCode;
}

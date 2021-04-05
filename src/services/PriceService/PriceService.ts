import { ResponseWrapper } from '../../models/ResponseWrapper';
import { BaseService } from '../ServiceBase';
import { Price, PriceUpdateDto } from './models/Price';

class PriceService extends BaseService {
  protected static BASE_URL = '/prices';

  public static async fetch(): Promise<Price[]> {
    try {
      const resp = await this.get<ResponseWrapper<Price[]>>('');
      return resp.data.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  public static async add(price: Price): Promise<Price> {
    try {
      const resp = await this.post<ResponseWrapper<Price>>('', price);
      return resp.data.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  public static async update(price: PriceUpdateDto): Promise<Price> {
    try {
      const resp = await this.put<ResponseWrapper<Price>>('', price);
      return resp.data.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  public static async fetchLast(): Promise<Price> {
    try {
      const resp = await this.get<ResponseWrapper<Price>>('/last');
      return resp.data.data;
    } catch (e) {
      throw new Error(e);
    }
  }
}
export default PriceService;

import { ResponseWrapper } from '../../models/ResponseWrapper';
import { BaseService } from '../ServiceBase';
import { Product } from './models/Product';

class ProductService extends BaseService {
  protected static BASE_URL = '/products';

  public static async fetch(): Promise<Product[]> {
    try {
      const resp = await this.get<ResponseWrapper<Product[]>>('');
      return resp.data.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  public static async fetchNames(): Promise<string[]> {
    try {
      const resp = await this.get<ResponseWrapper<string[]>>('/names');
      return resp.data.data;
    } catch (e) {
      throw new Error(e);
    }
  }
}
export default ProductService;

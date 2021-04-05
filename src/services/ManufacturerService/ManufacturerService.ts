import { ResponseWrapper } from '../../models/ResponseWrapper';
import { BaseService } from '../ServiceBase';
import { Manufacturer } from './models/Manufacturer';

class ManufacturerService extends BaseService {
  protected static BASE_URL = '/manufacturers';

  public static async fetch(): Promise<Manufacturer[]> {
    try {
      const resp = await this.get<ResponseWrapper<Manufacturer[]>>('');
      return resp.data.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  public static async fetchCountries(): Promise<string[]> {
    try {
      const resp = await this.get<ResponseWrapper<string[]>>('/countries');
      return resp.data.data;
    } catch (e) {
      throw new Error(e);
    }
  }
}
export default ManufacturerService;

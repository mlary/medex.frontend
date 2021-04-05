import { ResponseWrapper } from '../../models/ResponseWrapper';
import { BaseService } from '../ServiceBase';
import { Distributor } from './models/Distributor';

class DistributorService extends BaseService {
  protected static BASE_URL = '/distributors';

  public static async fetch(): Promise<Distributor[]> {
    try {
      const resp = await this.get<ResponseWrapper<Distributor[]>>('');
      return resp.data.data;
    } catch (e) {
      throw new Error(e);
    }
  }
}
export default DistributorService;

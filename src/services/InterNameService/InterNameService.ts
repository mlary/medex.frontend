import { ResponseWrapper } from '../../models/ResponseWrapper';
import { BaseService } from '../ServiceBase';
import { InterName } from './models/InterName';

class InterNameService extends BaseService {
  protected static BASE_URL = '/interNames';

  public static async fetch(): Promise<InterName[]> {
    try {
      const resp = await this.get<ResponseWrapper<InterName[]>>('');
      return resp.data.data;
    } catch (e) {
      throw new Error(e);
    }
  }
}
export default InterNameService;

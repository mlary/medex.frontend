import { ResponseWrapper } from '../../models/ResponseWrapper';
import { BaseService } from '../ServiceBase';
import { PharmGroup } from './models/PharmGroup';

class PharmGroupService extends BaseService {
  protected static BASE_URL = '/pharmGroups';

  public static async fetch(): Promise<PharmGroup[]> {
    try {
      const resp = await this.get<ResponseWrapper<PharmGroup[]>>('');
      return resp.data.data;
    } catch (e) {
      throw new Error(e);
    }
  }
}
export default PharmGroupService;

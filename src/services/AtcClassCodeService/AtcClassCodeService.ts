import { ResponseWrapper } from '../../models/ResponseWrapper';
import { BaseService } from '../ServiceBase';
import { AtcClassCode } from './models/AtcClassCode';

class AtcClassCodeService extends BaseService {
  protected static BASE_URL = '/atcClassCodes';

  public static async fetch(): Promise<AtcClassCode[]> {
    try {
      const resp = await this.get<ResponseWrapper<AtcClassCode[]>>('');
      return resp.data.data;
    } catch (e) {
      throw new Error(e);
    }
  }
}
export default AtcClassCodeService;

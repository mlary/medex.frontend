import { ResponseWrapper } from '../../models/ResponseWrapper';
import { BaseService } from '../ServiceBase';
import { GroupName } from './models/GroupName';

class GroupNameService extends BaseService {
  protected static BASE_URL = '/groupNames';

  public static async fetch(): Promise<GroupName[]> {
    try {
      const resp = await this.get<ResponseWrapper<GroupName[]>>('');
      return resp.data.data;
    } catch (e) {
      throw new Error(e);
    }
  }
}
export default GroupNameService;

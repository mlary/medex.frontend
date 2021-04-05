import { UserFilterContext } from './models/UserFilterContext';
import { PageContext } from '../../models/PageContext';
import { PageWrapper } from '../../models/PageWrapper';
import { ResponseWrapper } from '../../models/ResponseWrapper';
import { BaseService } from '../ServiceBase';
import { IJwtRequest, IJwtResponse } from './models/JwtToken';
import { UserDto, UserRegistrationDto } from './models/User';

class UserService extends BaseService {
  protected static BASE_URL = '/users';

  public static async authorize(data: IJwtRequest): Promise<IJwtResponse> {
    try {
      const resp = await this.post<ResponseWrapper<IJwtResponse>>('/authenticate', data);
      return resp.data.data;
    } catch (e) {
      throw new Error(e);
    }
  }
  public static async signup(data: UserRegistrationDto): Promise<IJwtResponse> {
    try {
      const resp = await this.post<ResponseWrapper<IJwtResponse>>('/signup', data);
      return resp.data.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  public static async changeRole(data: UserDto): Promise<UserDto> {
    try {
      const resp = await this.put<ResponseWrapper<UserDto>>('/changeRole', data);
      return resp.data.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  public static async current(): Promise<UserDto> {
    try {
      const resp = await this.get<ResponseWrapper<UserDto>>('/current');
      return resp.data.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  public static async page(params: PageContext<UserFilterContext>): Promise<PageWrapper<UserDto>> {
    try {
      const resp = await this.post<ResponseWrapper<PageWrapper<UserDto>>>('/page', params);
      return resp.data.data;
    } catch (e) {
      throw new Error(e);
    }
  }
}
export default UserService;

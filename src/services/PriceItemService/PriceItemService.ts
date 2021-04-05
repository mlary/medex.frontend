import { ResponseWrapper } from '../../models/ResponseWrapper';
import { BaseService } from '../ServiceBase';
import { PriceItemDto } from './models/PriceItem';
import { PriceItemFilterContext } from './models/PriceItemFilterContext';
import { PageWrapper } from '../../models/PageWrapper';
import { PageContext } from '../../models/PageContext';

class PriceItemService extends BaseService {
  protected static BASE_URL = '/priceItems';

  public static async page(params: PageContext<PriceItemFilterContext>): Promise<PageWrapper<PriceItemDto>> {
    try {
      const resp = await this.post<ResponseWrapper<PageWrapper<PriceItemDto>>>('/page', params);
      return resp.data.data;
    } catch (e) {
      throw new Error(e);
    }
  }
  public static async pageByLastPriceList(
    params: PageContext<PriceItemFilterContext>
  ): Promise<PageWrapper<PriceItemDto>> {
    try {
      const resp = await this.post<ResponseWrapper<PageWrapper<PriceItemDto>>>('/pageByLastPriceList', params);
      return resp.data.data;
    } catch (e) {
      throw new Error(e);
    }
  }
}
export default PriceItemService;

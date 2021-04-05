import { createEffect, createStore } from 'effector';
import { Price } from '../../services/PriceService/models/Price';
import PriceService from '../../services/PriceService';

export interface PricesProps {
  data: Price[];        
}


export const fetchPrices = createEffect({
  handler: async (): Promise<Price[]> => {
    try {
      const result = await PriceService.fetch();
      return result;
    } catch {
      return [];
    }
  },
});
const initState:PricesProps = {
    data: [],
};

export const $prices = createStore<PricesProps>(initState);

$prices 
  .on(fetchPrices.done, (state, payload) => {
    const { result } = payload;
    return {...state, data: result};
  });

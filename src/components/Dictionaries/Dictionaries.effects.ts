import { Distributor } from './../../services/DistributorService/models/Distributor';
import { GroupName } from './../../services/GroupNameService/models/GroupName';
import { Manufacturer } from './../../services/ManufacturerService/models/Manufacturer';
import { InterName } from './../../services/InterNameService/models/InterName';
import InterNameService from './../../services/InterNameService';
import GroupNameService from './../../services/GroupNameService';
import ManufacturerService from './../../services/ManufacturerService';
import DistributorService from './../../services/DistributorService';
import ProductService from './../../services/ProductService';

import { createEffect, createStore } from 'effector';

export interface DictionariesProps {
  interNames: InterName[];
  manufacturers: Manufacturer[];
  groupNames: GroupName[];
  distributors: Distributor[];
  productNames: string[];
  countries: string[];
}

const initState: DictionariesProps = {
  distributors: [],
  groupNames: [],
  interNames: [],
  manufacturers: [],
  productNames: [],
  countries: [],
};

export const fetchDictionaries = () => {
  fetchCountries();
  fetchDistributors();
  fetchManufacturers();
  fetchGroupNames();
  fetchInterNames();
  fetchProductNames();
};
export const fetchInterNames = createEffect({
  handler: async (): Promise<InterName[]> => {
    try {
      const result = await InterNameService.fetch();
      return result;
    } catch {
      return [];
    }
  },
});
export const fetchCountries = createEffect({
  handler: async (): Promise<string[]> => {
    try {
      const result = await ManufacturerService.fetchCountries();
      return result;
    } catch {
      return [];
    }
  },
});
export const fetchManufacturers = createEffect({
  handler: async (): Promise<Manufacturer[]> => {
    try {
      const result = await ManufacturerService.fetch();
      return result;
    } catch {
      return [];
    }
  },
});

export const fetchDistributors = createEffect({
  handler: async (): Promise<Distributor[]> => {
    try {
      const result = await DistributorService.fetch();
      return result;
    } catch {
      return [];
    }
  },
});

export const fetchGroupNames = createEffect({
  handler: async (): Promise<GroupName[]> => {
    try {
      const result = await GroupNameService.fetch();
      return result;
    } catch {
      return [];
    }
  },
});

export const fetchProductNames = createEffect({
  handler: async (): Promise<string[]> => {
    try {
      const result = await ProductService.fetchNames();
      return result;
    } catch {
      return [];
    }
  },
});

export const $dictionaries = createStore<DictionariesProps>(initState);

$dictionaries
  .on(fetchDistributors.done, (state, payload) => {
    return { ...state, distributors: payload.result };
  })
  .on(fetchManufacturers.done, (state, payload) => {
    return { ...state, manufacturers: payload.result };
  })
  .on(fetchProductNames.done, (state, payload) => {
    return { ...state, productNames: payload.result };
  })
  .on(fetchInterNames.done, (state, payload) => {
    return { ...state, interNames: payload.result };
  })
  .on(fetchGroupNames.done, (state, payload) => {
    return { ...state, groupNames: payload.result };
  })
  .on(fetchCountries.done, (state, payload) => {
    return { ...state, countries: payload.result };
  });

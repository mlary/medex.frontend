import { Distributor } from './../../services/DistributorService/models/Distributor';
import { GroupName } from './../../services/GroupNameService/models/GroupName';
import { Manufacturer } from './../../services/ManufacturerService/models/Manufacturer';
import { PharmGroup } from './../../services/PharmGroupService/models/PharmGroup';
import { InterName } from './../../services/InterNameService/models/InterName';
import { AtcClassCode } from './../../services/AtcClassCodeService/models/AtcClassCode';
import InterNameService from './../../services/InterNameService';
import GroupNameService from './../../services/GroupNameService';
import ManufacturerService from './../../services/ManufacturerService';
import DistributorService from './../../services/DistributorService';
import ProductService from './../../services/ProductService';
import PharmGroupService from './../../services/PharmGroupService';
import AtcClassCodeService from './../../services/AtcClassCodeService';


import { createEffect, createStore } from 'effector';

export interface DictionariesProps {
  interNames: InterName[];
  manufacturers: Manufacturer[];
  groupNames: GroupName[];
  distributors: Distributor[];
  productNames: string[];
  countries: string[];
  pharmGroups: PharmGroup[];
  atcClassCodes: AtcClassCode[];
}

const initState: DictionariesProps = {
  distributors: [],
  groupNames: [],
  interNames: [],
  manufacturers: [],
  productNames: [],
  countries: [],
  pharmGroups: [],
  atcClassCodes: [],
};

export const fetchDictionaries = () => {
  fetchCountries();
  fetchDistributors();
  fetchManufacturers();
  fetchGroupNames();
  fetchInterNames();
  fetchProductNames();
  fetchPharmGroups();
  fetchAtcClassCodes();
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

export const fetchPharmGroups = createEffect({
  handler: async (): Promise<PharmGroup[]> => {
    try {
      const result = await PharmGroupService.fetch();
      return result;
    } catch {
      return [];
    }
  },
});

export const fetchAtcClassCodes = createEffect({
  handler: async (): Promise<PharmGroup[]> => {
    try {
      const result = await AtcClassCodeService.fetch();
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
  .on(fetchAtcClassCodes.done, (state, payload) => {
    return { ...state, atcClassCodes: payload.result };
  })
  .on(fetchPharmGroups.done, (state, payload) => {
    return { ...state, pharmGroups: payload.result };
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

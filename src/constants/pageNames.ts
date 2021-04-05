import compact from 'lodash/compact';

export const LOGIN: string = 'login';
export const SIGNUP: string = 'signup';
export const NOT_FOUND: string = 'notfound';
export const DASHBOARD: string = 'dashboard';
export const SUMMARY_PRICE_LIST: string = 'general-price-list';
export const USERS: string = 'users';
export const PRODUCTS: string = 'products';
export const DISTRIBUTORS: string = 'distributors';
export const MANAGE_PRICE_LIST: string = 'manage-price-lists';
export const SETTINGS: string = 'settings';
export const STATISTIC: string = 'statistic';

export const getRoute = (pages: string[] | string): string => {
  if (pages instanceof Array) {
    return `/${compact(pages).join('/')}`;
  }
  return `/${pages}`;
};

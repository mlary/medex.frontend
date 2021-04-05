import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig, Method } from 'axios';
import { v4 as uuidv4 } from 'uuid';
import NotificationTypes from '../constants/notificationTypes';
import { addLoading, removeLoading } from '../components/Spinner/Spinner.effects';
import { addIntenalNotification } from '../components/Notifications/InternalNotifications/InternalNotification.effects';
import { logout } from '../components/Authorization/account.effects';
export class Result<T> {
  public value: T;

  public errors: string[];

  constructor(value: T, ...errors: string[]) {
    this.value = value;
    this.errors = errors[0] === undefined || errors[0] === null ? [] : errors;
  }
}

enum Urls {
  dev = 'https://localhost:5001',
  stage = 'http://app.svodniyprice.uz:8080',
  prod = 'https://localhost:5001',
}

const setServerUrl = (): Urls => {
  switch (process.env.REACT_APP_BUILD) {
    case 'prod':
      return Urls.prod;
    case 'stage':
      return Urls.stage;
    default:
      return Urls.dev;
  }
};

const SERVER_URL = setServerUrl();

export const api: AxiosInstance = axios.create({
  baseURL: `${SERVER_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'X-Requested-With': 'XMLHttpRequest',
    Authorization: `Bearer ${window.localStorage.getItem('AUTH_TOKEN')}`,
  },
});
api.interceptors.request.use((request) => {
  request.headers['Authorization'] = `Bearer ${window.localStorage.getItem('AUTH_TOKEN')}`;
  return request;
});
api.interceptors.response.use(
  (response): AxiosPromise<Result<any>> => {
    removeLoading();
    if (response.status === 204) {
      Promise.reject(response);
    }
    if (response.data && response.data.success === false) {
      addIntenalNotification({
        code: response.status,
        id: uuidv4(),
        message: response.data.message,
        type: NotificationTypes.error,
      });
      return Promise.reject(response.data.message);
    }
    return Promise.resolve(response);
  },
  (error) => {
    removeLoading();
    const message =
      error.response && error.response.data && error.response.data
        ? error.response.data.code || error.response.data.error || error.response.data.message
        : undefined;

    if (error.response === undefined) {
      addIntenalNotification({
        id: uuidv4(),
        code: 503,
        message: message || 'Server is temporarily unavailable',
        type: NotificationTypes.error,
      });
    } else {
      if (error.response.status === 400) {
        addIntenalNotification({
          id: uuidv4(),
          code: 400,
          message: message || 'Bad request',
          type: NotificationTypes.error,
        });
      } else if (error.response.status === 404) {
        addIntenalNotification({
          id: uuidv4(),
          code: 404,
          message: message || 'Not found',
          type: NotificationTypes.error,
        });
      } else if (error.response.status === 403) {
        addIntenalNotification({
          id: uuidv4(),
          code: 404,
          message: message || 'Permission denied',
          type: NotificationTypes.error,
        });
      } else if (error.response.status === 401) {
        if (!error.request?.headers?.temp) {
          logout();
        }
      } else if (error.response.status === 409) {
        addIntenalNotification({
          id: uuidv4(),
          code: 409,
          message: message || 'Request conflict with current server state',
          type: NotificationTypes.error,
        });
      } else {
        addIntenalNotification({
          id: uuidv4(),
          code: 500,
          message,
          type: NotificationTypes.error,
        });
      }
      return Promise.reject(error.response);
    }
    return Promise.reject(error);
  }
);

export const setAuthorizationToken = (token: string) => {
  api.defaults.headers.Authorization = `Bearer ${token}`;
};
export abstract class BaseService {
  protected static BASE_URL: string = '';

  protected static getUrl(url: string): string {
    return `${this.BASE_URL}${url}`;
  }

  protected static async http(method: Method, url: string, data?: any, options: AxiosRequestConfig = {}): Promise<any> {
    addLoading();
    const response = await api.request({
      method,
      url: `${SERVER_URL}/api/v1${this.getUrl(url)}`,
      data,
      ...options,
    });
    return response;
  }

  protected static get<T>(url: string, data?: any, options?: AxiosRequestConfig): AxiosPromise<T> {
    return this.http('GET', url, data, options);
  }

  protected static post<T>(url: string, data?: any, options?: AxiosRequestConfig): AxiosPromise<T> {
    return this.http('POST', url, data, options);
  }

  protected static put<T>(url: string, data?: any, options?: AxiosRequestConfig): AxiosPromise<T> {
    return this.http('PUT', url, data, options);
  }

  protected static delete<T>(url: string, data?: any, options?: AxiosRequestConfig): AxiosPromise<T> {
    return this.http('DELETE', url, data, options);
  }
}

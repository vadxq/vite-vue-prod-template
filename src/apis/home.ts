import request from '@/utils/http';
import { AxiosPromise } from 'axios';

/**
 * @description 获取
 */
export const fetch = (): AxiosPromise<unknown> => {
  return request.get(`/api/get`);
};

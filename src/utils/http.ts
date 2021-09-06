import axios, { AxiosInstance, AxiosRequestConfig, Method } from 'axios';
import { getToken, getApiUrl } from '@/utils/util';
// import router from '@/routes/index';
import { HTTP_STATUS, CLIENT_CONFIG } from './config';

const service: AxiosInstance = axios.create({
  // baseURL: process.env.VUE_APP_ENV === 'development' ? '/api' : computedBaseUrl(),
  timeout: 600000 // 请求超时时间
});

// respone响应拦截器
service.interceptors.response.use(
  (res) => {
    // 只要请求成功，不管返回什么状态码，都走这个回调
    if (res.status === HTTP_STATUS.NOT_FOUND) {
      return Promise.reject('请求资源不存在');
    } else if (res.status === HTTP_STATUS.BAD_GATEWAY) {
      return Promise.reject('服务端出现了问题');
    } else if (res.status === HTTP_STATUS.FORBIDDEN) {
      return Promise.reject('没有权限访问');
    } else if (res.status === HTTP_STATUS.AUTHENTICATE) {
      return Promise.reject('需要鉴权');
    } else if (res.status === HTTP_STATUS.SUCCESS) {
      return res.data;
    }
  },
  (error) => {
    console.log('---axioa==error:', error);
    // router.push('/500');
    return Promise.reject(error);
  }
);

/**
 * @description httpRequest，封装网络请求
 */
class httpRequest {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  baseOptions(params: any, method: Method = 'GET') {
    const { url, data, token } = params;
    let contentType = 'application/json';
    contentType = params.contentType || contentType;
    const originToken = token ? token : getToken();
    const option: AxiosRequestConfig = {
      url: getApiUrl(url),
      // url,
      data: method === 'GET' ? '' : data,
      params: method === 'GET' ? data : '',
      method,
      headers: {
        'content-type': contentType,
        token: originToken,
        clientVersion: CLIENT_CONFIG.clientVersion,
        clientType: CLIENT_CONFIG.clientType
      }
    };

    return service(option);
  }

  get(url: string, data = {}, token?: string) {
    const option = { url, data, token };
    return this.baseOptions(option);
  }

  post(url: string, data = {}, contentType?: string, token?: string) {
    const params = { url, data, contentType, token };
    return this.baseOptions(params, 'POST');
  }

  put(url: string, data = {}) {
    const option = { url, data };
    return this.baseOptions(option, 'PUT');
  }

  delete(url: string, data = {}) {
    const option = { url, data };
    return this.baseOptions(option, 'DELETE');
  }
}

export default new httpRequest();

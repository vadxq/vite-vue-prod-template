/**
 * @description 获取API URL前缀，根据环境进行判断
 */
export const getBaseUrl = (url: string): string => {
  let BASE_URL = '';
  if (process.env.NODE_ENV === 'development') {
    // 开发环境 - 根据请求不同返回不同的BASE_URL
    if (url.includes('/api/')) {
      BASE_URL = 'http://test-api.vadxq.com';
    } else if (url.includes('/other-api/')) {
      BASE_URL = 'http://test-other-api.vadxq.com';
    } else {
      BASE_URL = 'http://test-api.vadxq.com';
    }
  } else if (process.env.NODE_ENV === 'mock') {
    BASE_URL = '';
  } else {
    // 生产环境
    if (url.includes('/api/')) {
      BASE_URL = 'https://api.vadxq.com';
    } else if (url.includes('/other-api/')) {
      BASE_URL = 'https://other-api.vadxq.com';
    } else {
      BASE_URL = 'https://api.vadxq.com';
    }
    // 用于将api地址转换成https
    BASE_URL = BASE_URL.replace('http://', 'https://');
  }
  return BASE_URL;
};

/**
 * @description 获取API URL，根据环境进行判断
 */
export const getApiUrl = (originUrl: string): string => {
  const baseUrl: string = getBaseUrl(originUrl);
  let url: string = originUrl;
  if (process.env.NODE_ENV === 'development') {
    // 开发环境 - 根据请求不同返回不同的BASE_URL
    if (originUrl.includes('/api/')) {
      url = url.split('/api')[1];
    }
    if (originUrl.includes('/web-api/')) {
      url = url.split('/web-api')[1];
    }
  } else if (process.env.NODE_ENV === 'mock') {
    url = originUrl;
  } else {
    // 生产环境
    if (originUrl.includes('/api/')) {
      url = url.split('/api')[1];
    }
    if (originUrl.includes('/web-api/')) {
      url = url.split('/web-api')[1];
    }
  }
  return baseUrl + url;
};

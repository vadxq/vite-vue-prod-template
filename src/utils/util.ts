export const getApiUrl = (url: string): string => {
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

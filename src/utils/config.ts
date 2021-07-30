/**
 * @description 定义http status参数
 */
export const HTTP_STATUS: {
  SUCCESS: number;
  CREATED: number;
  ACCEPTED: number;
  CLIENT_ERROR: number;
  AUTHENTICATE: number;
  FORBIDDEN: number;
  NOT_FOUND: number;
  SERVER_ERROR: number;
  BAD_GATEWAY: number;
  SERVICE_UNAVAILABLE: number;
  GATEWAY_TIMEOUT: number;
} = {
  SUCCESS: 200,
  CREATED: 201,
  ACCEPTED: 202,
  CLIENT_ERROR: 400,
  AUTHENTICATE: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504
};

export const CLIENT_CONFIG: {
  clientType: string;
  clientVersion: string;
} = {
  clientType: 'web',
  clientVersion: '0.0.1'
};

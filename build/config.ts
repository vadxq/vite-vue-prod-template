import * as pkg from '../package.json';

export const projectBasePath: string = pkg.name + '/' + pkg.version + '/';

export const baseConfig: {
  name: string;
  index: string;
  indexOut: string;
  createdTime: string;
  publicPath: string;
  output: string;
} = {
  name: projectBasePath,
  index: 'index.html',
  indexOut: './index.html',
  createdTime: '2021-05-26',
  publicPath: '/',
  output: '../dist'
};

export const cdnConfig: {
  host: string;
  bucket: string;
  ak: string;
  sk: string;
  zone: string; // 空间，华东 z0，华南 z2
} = {
  host: 'https://cdn.vadxq.com/', // 一定要带/
  bucket: 'cdn-fe',
  ak: '',
  sk: '',
  zone: 'z0'
};

// sentry 配置
export const sentryConfig: {
  dsn: string;
  tracesSampleRate: number;
  release: string;
  environment: string;
} = {
  dsn: '',
  release: `${process.env.NODE_ENV}-${pkg.version}`,
  tracesSampleRate: 1.0,
  environment:
    process.env.NODE_ENV === 'prod'
      ? 'production'
      : process.env.NODE_ENV === 'test'
      ? 'test'
      : process.env.NODE_ENV === 'test1'
      ? 'test1'
      : process.env.NODE_ENV === 'grey'
      ? 'grey'
      : 'local'
};

import { ConfigEnv, UserConfigExport } from 'vite';
import vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy';
import { resolve } from 'path';
import eslint from '@rollup/plugin-eslint';
import { projectBasePath, cdnConfig } from './build/config';
import vueJsx from '@vitejs/plugin-vue-jsx';
// import * as pkg from './package.json';
import { viteMockServe } from 'vite-plugin-mock';
import { viteVConsole } from 'vite-plugin-vconsole';

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  return {
    resolve: {
      alias: [{ find: '@', replacement: resolve(__dirname, './src') }]
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/reset.scss";@import "@/styles/variables.scss";`
        }
      }
    },
    base:
      mode === 'prod'
        ? `${cdnConfig.host}${projectBasePath}`
        : mode === 'test'
        ? '/'
        : mode === 'test1'
        ? '/'
        : mode === 'grey'
        ? '/'
        : './',
    plugins: [
      vue(),
      vueJsx(),
      viteMockServe({
        mockPath: 'mocks',
        supportTs: true,
        localEnabled: command === 'serve' && mode === 'mock',
        prodEnabled: false
        //  这样可以控制关闭mock的时候不让mock打包到最终代码内
        // injectCode: `
        //   import { setupProdMockServer } from './mockProdServer';
        //   setupProdMockServer();
        // `
      }),
      viteVConsole({
        entry: resolve(__dirname, './src/main.ts'),
        localEnabled: true,
        enabled:
          command !== 'serve' &&
          (mode === 'test' || mode === 'test1' || mode === 'alpha'),
        config: {
          maxLogNumber: 1000,
          theme: 'light'
        }
      }),
      {
        ...eslint({
          include: 'src/**/*.+(js|jsx|ts|tsx|vue)'
        }),
        enforce: 'pre'
      },
      legacy({
        targets: ['defaults', 'not IE 11', '> 0.25%, not dead'],
        renderLegacyChunks: true,
        polyfills: [
          'es.symbol',
          'es.array.filter',
          'es.promise',
          'es.promise.finally',
          'es/map',
          'es/set',
          'es.array.for-each',
          'es.object.define-properties',
          'es.object.define-property',
          'es.object.get-own-property-descriptor',
          'es.object.get-own-property-descriptors',
          'es.object.keys',
          'es.object.to-string',
          'web.dom-collections.for-each',
          'esnext.global-this',
          'esnext.string.match-all'
        ],
        modernPolyfills: ['es.promise.finally']
      })
    ],
    server: {
      host: '0.0.0.0',
      port: 3000,
      open: true,
      proxy: {
        '/api': {
          target:
            mode === 'alpha'
              ? 'http://alpha-api.vadxq.com'
              : mode === 'test'
              ? 'http://test-api.vadxq.com'
              : mode === 'test1'
              ? 'http://test1-api.vadxq.com'
              : mode === 'grey'
              ? 'https://api.vadxq.com'
              : mode === 'prod'
              ? 'https://api.vadxq.com'
              : 'http://0.0.0.0:3000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
        '/ohter-api': {
          target: 'http://other-api.vadxq.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/ohter-api/, '')
        }
      }
    },
    build: {
      target: 'es2015',
      outDir: './dist/',
      cssCodeSplit: true
    }
  };
};

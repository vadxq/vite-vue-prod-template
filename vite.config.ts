import { baseConfig, cdnUrl, projectBasePath } from './src/config/build';
import { ConfigEnv, splitVendorChunkPlugin, UserConfigExport } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import eslintPlugin from 'vite-plugin-eslint';
import legacy from '@vitejs/plugin-legacy';
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
          additionalData: `@import "@/styles/reset.scss";@import "@/styles/variables.scss";@import "@/styles/tailwindcss.scss";`
        }
      }
    },
    base:
      mode === 'prod'
        ? `${cdnUrl}${projectBasePath}`
        : mode === 'test'
          ? baseConfig.publicPath + '/'
          : mode === 'grey'
            ? baseConfig.publicPath + '/'
            : './',
    plugins: [
      vue(),
      vueJsx(),
      viteMockServe({
        mockPath: 'mocks',
        enable: command === 'serve' && mode === 'mock'
        //  这样可以控制关闭mock的时候不让mock打包到最终代码内
        // injectCode: `
        //   import { setupProdMockServer } from './mockProdServer';
        //   setupProdMockServer();
        // `
      }),
      legacy({
        targets: ['defaults', 'not IE 11']
      }),
      viteVConsole({
        entry: [resolve(__dirname, './src/main.ts')], // entry file
        enabled:
          (command === 'build' && mode === 'test') || command === 'serve', // build production
        config: {
          maxLogNumber: 1000,
          theme: 'light'
        }
      }),
      eslintPlugin(),
      splitVendorChunkPlugin()
    ],
    server: {
      host: '0.0.0.0',
      port: 8000,
      open: true,
      proxy: {
        '/api': {
          target:
            mode === 'alpha'
              ? 'http://alpha-api.vadxq.com'
              : mode === 'test'
                ? 'http://test-api.vadxq.com'
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
      cssCodeSplit: true,
      modulePreload: {
        polyfill: true
      },
      minify: 'terser',
      cssMinify: true,
      sourcemap: command !== 'serve' ? false : true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (
                id
                  .toString()
                  .split('node_modules/')[1]
                  .split('/')[0]
                  .toString()
                  .includes('pnpm')
              ) {
                return id
                  .toString()
                  .split('node_modules/')[1]
                  .split('/')[1]
                  .toString();
              }
              return id
                .toString()
                .split('node_modules/')[1]
                .split('/')[0]
                .toString();
            }
          }
        }
      }
    }
  };
};

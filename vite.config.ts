import { ConfigEnv, UserConfigExport } from 'vite';
import vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy';
import { resolve } from 'path';
import eslint from '@rollup/plugin-eslint';
import { viteMockServe } from 'vite-plugin-mock';

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
    plugins: [
      vue(),
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
      {
        ...eslint({
          include: 'src/**/*.+(js|jsx|ts|tsx|vue)'
        }),
        enforce: 'pre'
      },
      legacy({
        targets: ['defaults', 'not IE 11']
      })
    ],
    build: {
      target: 'es2015',
      outDir: './dist/',
      cssCodeSplit: true
    }
  };
};

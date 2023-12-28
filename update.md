# 更新记录

## 2023-12-28

- 将vite嵌入全局style变更为在main文件引入。为了减少升级vite导致的配置问题

## 2023-12-15

- 安全更新！默认关闭source Map，上传配置分开配置！打包关键配置和客户端配置分离，不被引用到
- 更新tsconfig配置，适配vite5
- 去除兼容性配置，只保留@vitejs/plugin-legacy默认配置。考虑到现在移动端Android6应该几乎没有了，不需要去兼容这些老旧设备了
- 修改vite打包配置项，优化打包
- 添加tailwind css
- 更新依赖

```bash
dependencies:
- @sentry/tracing 7.81.1
+ @sentry/tracing 7.88.0
- @sentry/vue 7.81.1
+ @sentry/vue 7.88.0
- vue 3.3.8
+ vue 3.3.11

devDependencies:
- @types/node 20.9.3
+ @types/node 20.10.4
- @typescript-eslint/eslint-plugin 6.12.0
+ @typescript-eslint/eslint-plugin 6.14.0
- @typescript-eslint/parser 6.12.0
+ @typescript-eslint/parser 6.14.0
- @vitejs/plugin-legacy 4.1.1,
+ @vitejs/plugin-legacy 5.2.0,
- @vitejs/plugin-vue 4.5.0
+ @vitejs/plugin-vue 4.5.2
- @vue/compiler-sfc 3.3.8
+ @vue/compiler-sfc 3.3.11
- @vue/eslint-config-typescript 11.0.3
+ @vue/eslint-config-typescript 12.0.0
- cssnano 6.0.1
+ cssnano 6.0.2
- eslint 8.54.0
+ eslint 8.55.0
- eslint-plugin-vue 9.18.1
+ eslint-plugin-vue 9.19.2
- eslint-plugin-import 2.29.0
+ eslint-plugin-import 2.29.1
- husky 6.0.0
+ husky 8.0.3
- lint-staged 10.5.4
+ lint-staged 15.2.0
- postcss 8.4.31
+ postcss 8.4.32
- prettier 3.1.0
+ prettier 3.1.1
- pretty-quick 3.1.3
- qiniu 7.10.0
+ qiniu 7.10.1
- stylelint 15.11.0
+ stylelint 16.0.2
- stylelint-config-recommended 13.0.0
+ stylelint-config-recommended 14.0.0
- stylelint-config-recommended-scss 13.1.0
+ stylelint-config-recommended-scss 14.0.0
- stylelint-config-standard-scss 11.1.0
+ stylelint-config-standard-scss 12.0.0
- stylelint-order 6.0.3
+ stylelint-order 6.0.4
- tailwindcss 3.3.5
+ tailwindcss 3.3.6
+ terser 5.26.0
- ts-node 10.9.1
+ ts-node 10.9.2
- typescript 5.3.2
+ typescript 5.3.3
- vite-plugin-mock 2.9.8
+ vite-plugin-mock 3.0.0
- vue-tsc 0.0.24
+ vue-tsc 1.8.25
- vite 5.0.1
+ vite 5.0.9
```

## 2023-11-22

- 更新至vite5
- postcss配置更新：vite内联了postcss，并不需要额外的创建 postcss.config.js文件
- 自适应方案变更，使用viewport来替代rem方案，新增postcss-px-to-viewport，去除lib-flexible。(这里是默认注释，有需求可以打开)
  - postcss-px-to-viewport 对内联css样式，外联css样式，内嵌css样式有效，对js动态css无效。 所以要动态改变css展示效果的话，要使用静态的class定义变化样式，通过js改变dom元素的class实现样式变化
- autoprefixer移除，使用postcss-preset-env替代
- 删除了注释的vuex示例
- 依赖包更新
- vite配置的弃用，见vite官方文档：https://cn.vitejs.dev/guide/troubleshooting
  - Vite CJS Node API deprecated：查找警告`VITE_CJS_TRACE=true vite dev`
- stylelint规则变更，更新适配至stylelint v15版本
- eslint规则变更，适配最新版
- 新增vscode自动保存格式化和检测规则

```js
// 新依赖
  "dependencies": {
    "@sentry/tracing": "^7.81.1",
    "@sentry/vue": "^7.81.1",
    "axios": "^1.6.2",
    "pinia": "^2.1.7",
    "vue": "^3.3.8",
    "vue-router": "^4.2.5"
  },
  "devDependencies": {
    "@commitlint/cli": "^18.4.3",
    "@commitlint/config-conventional": "^18.4.3",
    "@tailwindcss/aspect-ratio": "^0.4.2",
    "@tailwindcss/forms": "^0.5.7",
    "@tailwindcss/line-clamp": "^0.4.4",
    "@tailwindcss/typography": "^0.5.10",
    "@types/node": "^20.9.3",
    "@typescript-eslint/eslint-plugin": "^6.12.0",
    "@typescript-eslint/parser": "^6.12.0",
    "@vitejs/plugin-legacy": "^4.1.1",
    "@vitejs/plugin-vue": "^4.5.0",
    "@vitejs/plugin-vue-jsx": "^3.1.0",
    "@vue/compiler-sfc": "^3.3.8",
    "@vue/eslint-config-prettier": "^8.0.0",
    "@vue/eslint-config-typescript": "^11.0.3",
    "conventional-changelog-cli": "^4.1.0",
    "cssnano": "^6.0.1",
    "eslint": "^8.54.0",
    "eslint-import-resolver-typescript": "^3.6.1",
    "eslint-plugin-import": "^2.29.0",
    "eslint-plugin-prettier": "^5.0.1",
    "eslint-plugin-tailwindcss": "^3.13.0",
    "eslint-plugin-vue": "^9.18.1",
    "husky": "^6.0.0",
    "lint-staged": "^10.5.4",
    "mockjs": "^1.1.0",
    "postcss": "^8.4.31",
    "postcss-html": "^1.5.0",
    "postcss-import": "^15.1.0",
    "postcss-plugin-px2rem": "^0.8.1",
    "postcss-preset-env": "^9.3.0",
    "postcss-px-to-viewport": "^1.1.1",
    "postcss-scss": "^4.0.9",
    "prettier": "^3.1.0",
    "pretty-quick": "^3.1.3",
    "qiniu": "^7.10.0",
    "sass": "^1.69.5",
    "stylelint": "^15.11.0",
    "stylelint-config-html": "^1.1.0",
    "stylelint-config-recommended": "^13.0.0",
    "stylelint-config-recommended-scss": "^13.1.0",
    "stylelint-config-recommended-vue": "^1.5.0",
    "stylelint-config-standard-scss": "^11.1.0",
    "stylelint-order": "^6.0.3",
    "tailwind-variants": "^0.1.18",
    "tailwindcss": "^3.3.5",
    "ts-node": "^10.9.1",
    "typescript": "^5.3.2",
    "vconsole": "^3.15.1",
    "vite": "^5.0.1",
    "vite-plugin-eslint": "^1.8.1",
    "vite-plugin-mock": "^2.9.8",
    "vite-plugin-vconsole": "^2.0.1",
    "vue-eslint-parser": "^9.3.2",
    "vue-tsc": "^0.0.24"
  },
```

```js
// 旧依赖
"dependencies": {
  "@sentry/tracing": "^6.12.0",
  "@sentry/vue": "^6.12.0",
  "axios": "^0.21.1",
  "lib-flexible": "^0.3.2",
  "pinia": "^2.0.0",
  "vue": "^3.0.5",
  "vue-router": "^4.0.4"
},
"devDependencies": {
  "@commitlint/cli": "^12.1.1",
  "@commitlint/config-conventional": "^12.1.1",
  "@types/node": "^15.0.3",
  "@typescript-eslint/eslint-plugin": "^4.22.0",
  "@typescript-eslint/parser": "^4.22.0",
  "@vitejs/plugin-legacy": "^1.3.2",
  "@vitejs/plugin-vue": "^1.2.2",
  "@vitejs/plugin-vue-jsx": "^1.1.4",
  "@vue/compiler-sfc": "^3.0.5",
  "@vue/eslint-config-prettier": "^6.0.0",
  "@vue/eslint-config-typescript": "^7.0.0",
  "autoprefixer": "^10.2.5",
  "commitizen": "^4.2.4",
  "conventional-changelog-cli": "^2.1.1",
  "cz-customizable": "^6.3.0",
  "eslint": "^7.25.0",
  "eslint-plugin-prettier": "^3.4.0",
  "eslint-plugin-vue": "^7.9.0",
  "husky": "^6.0.0",
  "lint-staged": "^10.5.4",
  "mockjs": "^1.1.0",
  "postcss": "^8.2.15",
  "postcss-plugin-px2rem": "^0.8.1",
  "prettier": "^2.2.1",
  "qiniu": "^7.4.0",
  "sass": "^1.32.12",
  "stylelint": "^13.13.0",
  "stylelint-config-standard": "^22.0.0",
  "ts-node": "^10.2.1",
  "typescript": "^4.2.0",
  "vconsole": "^3.6.1",
  "vite": "^2.2.3",
  "vite-plugin-eslint": "^1.3.0",
  "vite-plugin-mock": "^2.5.0",
  "vite-plugin-vconsole": "^1.1.1",
  "vue-tsc": "^0.0.24"
}
```
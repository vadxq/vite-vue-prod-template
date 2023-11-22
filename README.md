# Vue 3 + Typescript + Vite

> Vue3 工程化项目实践demo

## intro

- 编程语言：TypeScript 5.3.2
- 构建工具：Vite 5
- 前端框架：Vue 3.3.8
- 路由工具：Vue Router 4.2.5
- 状态管理：Pinia 2.1.7
- CSS：Sass + Postcss
- HTTP 工具：Axios
- MOCK: mockjs + vite plugins
- Git Hook 工具：Husky + Lint-staged
- 代码规范：EditorConfig + Prettier + ESLint
- 提交规范：Commitlint

## 初始化项目

```bash
npx degit https://github.com/vadxq/vite-vue-prod-template ./demo
```

## 参考ppt https://ppt.vadxq.com/vite-build-intro.html#slide=1

## 更新日志

2023年11月重新更新优化本仓库

- 支持vite v5版本
- postcss配置更新：vite内联了postcss，可以不需要额外的创建 postcss.config.js文件
- vite配置的弃用，在v5版本警示，v6版本会被移除
  - Vite CJS Node API deprecated：查找警告`VITE_CJS_TRACE=true vite dev`
- 自适应方案变更，使用viewport来替代rem方案，新增postcss-px-to-viewport，去除lib-flexible。(这里是默认注释，有需求可以打开)
  - postcss-px-to-viewport 对内联css样式，外联css样式，内嵌css样式有效，对js动态css无效。 所以要动态改变css展示效果的话，要使用静态的class定义变化样式，通过js改变dom元素的class实现样式变化
- autoprefixer移除，使用postcss-preset-env替代
- 删除了注释的vuex示例
- 增加tailwindcss
- stylelint规则变更，更新适配至stylelint v15版本
- eslint规则变更，适配最新版
- 新增vscode自动保存格式化和检测规则
- 依赖包更新

详见[更新日志](./update.md)

之前版本请看分支v1.0.0

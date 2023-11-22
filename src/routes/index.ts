import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { baseConfig } from '../../build/config';
import Layout from '@/layouts/index.vue';
import Home from '@/views/home/homePage.vue';
import NotFound from '@/views/4xx/404.vue';

// 为了兼容性处理，不建议使用动态加载。如果不考虑兼容性，则可以使用以下方法引入
// component: () => import('@/views/home/index.vue')
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'layout',
    component: Layout,
    children: [
      {
        path: '/',
        name: '首页',
        component: Home
      }
    ]
  },
  {
    path: '/404',
    name: 'notFound',
    component: NotFound
  }
];

// // 自由处理嵌套路由
// const modulesPage = import.meta.glob('/src/views/**/index.vue');
// for (const path in modulesPage) {
//   const name = (/views\/(.*)\/index.vue/.exec(path) as any[])[1];
//   routes.push({
//     path: '/' + name,
//     component: modulesPage[path],
//     name
//   });
// }

routes.push({
  name: 'NotFound',
  path: '/:path(.*)+',
  redirect: () => '/'
});

const router = createRouter({
  history: createWebHistory(baseConfig.publicPath),
  routes
});

// 路由拦截
router.beforeEach((to, from, next) => {
  console.log('进入路由拦截');
  if (to.path === '/login') {
    next();
  } else {
    next();
  }
  // 若么有登录跳登录 demo
  // if (!getCookie('token')) {
  //   next('/login')
  // } else {
  //   next()
  // }
});

// 在这里控制了路由变化后的页面交互状态
router.afterEach((to, from) => {
  const toDepth = to.path.split('/').length;
  const fromDepth = from.path.split('/').length;
  to.meta.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
});

export default router;

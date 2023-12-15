import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { baseConfig } from '@/config/build';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'layout',
    component: () => import('@/layouts/layoutPage.vue'),
    children: [
      {
        path: '/',
        name: '首页',
        component: () => import('@/views/home/homePage.vue')
      }
    ]
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
router.beforeEach((to, _from, next) => {
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

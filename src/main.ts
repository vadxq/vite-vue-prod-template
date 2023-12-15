import { createApp } from 'vue';
import App from './App.vue';
import router from '@/routes/index';
import { createPinia } from 'pinia';
import sentry from './utils/sentry';

const app = createApp(App);

if (process.env.NODE_ENV === 'prod') {
  sentry(app, router);
}

app.use(createPinia());
app.use(router);
app.mount('#app');

export default app;

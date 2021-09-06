import { createApp } from 'vue';
import App from './App.vue';
import router from '@/routes/index';
import store from '@/store';
import 'lib-flexible';
import sentry from './utils/sentry';

const app = createApp(App);

if (process.env.NODE_ENV === 'prod') {
  sentry(app, router);
}

app.use(store);
app.use(router);
app.mount('#app');

export default app;

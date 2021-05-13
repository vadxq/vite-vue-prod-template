import { createApp } from 'vue';
import App from './App.vue';
import router from '@/routes/index';
import store from '@/store';
import 'lib-flexible';

const app = createApp(App);

app.use(store);
app.use(router);
app.mount('#app');

export default app;

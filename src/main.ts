import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import RRVUI from '../../rrvui';

createApp(App).use(router).use(RRVUI).mount('#app');

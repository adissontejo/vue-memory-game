import { createApp } from 'vue';

import { key, store } from './store';
import { router } from './router';
import App from './App.vue';

const app = createApp(App);

app.use(router);

app.use(store, key);

app.mount('#app');

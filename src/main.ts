import { createApp } from 'vue';
import { createPinia } from 'pinia';
import InlineSvg from 'vue-inline-svg';

import { router } from './router';
import App from './App.vue';

const pinia = createPinia();

const app = createApp(App);

app.use(pinia);

app.use(router);

app.component('inline-svg', InlineSvg);

app.mount('#app');

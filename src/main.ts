import { createApp } from 'vue';

import { Home } from './pages';
import { key, store } from './store';

const app = createApp(Home);

app.use(store, key);

app.mount('#app');

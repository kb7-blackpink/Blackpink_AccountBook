import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './main.css';
import './assets/styles/global.css';

import App from './App.vue';
import router from './router';

import '@/plugins/chart.js';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');

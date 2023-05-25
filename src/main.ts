import { createApp } from 'vue';
import App from './App.vue';

import './index.css';
import "vue-awesome-paginate/dist/style.css";

import { store } from './vuex/store';
import { router } from './router/router';
import VueAwesomePaginate from 'vue-awesome-paginate';

createApp(App).use(store).use(router).use(VueAwesomePaginate).mount('#app');

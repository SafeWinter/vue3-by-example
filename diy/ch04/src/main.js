import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';

import HomePage from './components/HomePage';
import PhotoFormPage from './components/PhotoFormPage';
import SearchPage from './components/SearchPage';

const routes = [
  { path: '/', component: HomePage },
  { path: '/add-photo-form', component: PhotoFormPage },
  {
    path: '/edit-photo-form/:id',
    component: () => import('./components/PhotoFormPage.vue'),
  },
  { path: '/search', component: SearchPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount('#app');

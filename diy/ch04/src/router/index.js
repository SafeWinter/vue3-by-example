import { createRouter, createWebHistory } from 'vue-router';
import PhotoFormPage from '@/views/PhotoFormView.vue';

const routes = [
  { path: '/', component: () => import('@/views/HomeView.vue') },
  { path: '/add-photo-form', component: PhotoFormPage },
  {
    path: '/edit-photo-form/:id',
    component: PhotoFormPage,
  },
  {
    path: '/search',
    component: () => import('@/views/SearchView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

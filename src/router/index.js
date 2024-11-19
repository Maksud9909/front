import { createRouter, createWebHistory } from 'vue-router';
import ProductList from '../components/ProductList.vue';
import ProductTypeList from '../components/ProductTypeList.vue';
import ProductStatusList from '../components/ProductStatusList.vue';

const routes = [
  { path: '/', redirect: '/products' },
  { path: '/products', component: ProductList },
  { path: '/types', component: ProductTypeList },
  { path: '/statuses', component: ProductStatusList },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

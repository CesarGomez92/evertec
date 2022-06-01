import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import DetailView from '@/views/DetailView.vue'
import OrderStatusView from '@/views/OrderStatusView.vue'
import OrderListView from '@/views/OrderListView.vue'

export const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/detail',
    name: 'detail-view',
    component: DetailView,
  },
  {
    path: '/status',
    name: 'order-status',
    component: OrderStatusView,
  },
  {
    path: '/order-list',
    name: 'order-list',
    component: OrderListView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

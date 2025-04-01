import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserDetail from '../components/UserDetail.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/user/:userId',
      name: 'userDetail',
      component: UserDetail,
      props: route => ({ user: { id: route.params.userId, name: 'John Doe', email: 'john@example.com' } }) // Simulación de datos
    }
  ],
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import BookingView from '../views/BookingView.vue'
import MyBookingsView from '../views/MyBookingsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/booking', // ➔ La nouvelle route
      name: 'booking',
      component: BookingView
    },
    {
      path: '/my-bookings',
      name: 'my-bookings',
      component: MyBookingsView
    },
  ]
})

export default router
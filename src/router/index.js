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
      component: HomeView,
      // On ajoute les titres désirés dans la propriété 'meta'
      meta: { title: 'AutoClean Pro' }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { title: 'Connexion - AutoClean Pro' }
    },
    {
      path: '/booking',
      name: 'booking',
      component: BookingView,
      meta: { title: 'AutoClean Pro - Réservation' }
    },
    {
      path: '/my-bookings',
      name: 'my-bookings',
      component: MyBookingsView,
      meta: { title: 'AutoClean Pro - Mes RDV' }
    }
  ]
})

router.beforeEach((to, from, next) => {
  // On récupère le titre défini dans la meta, sinon on met un titre par défaut
  document.title = to.meta.title || 'AutoClean Pro'
  next() // On autorise le changement de page
})

export default router
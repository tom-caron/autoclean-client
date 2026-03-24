<template>
  <nav class="bg-primary text-gray-800 shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        
        <div class="flex-shrink-0 flex items-center">
          <router-link to="/" class="text-2xl font-black tracking-wider text-gray-900">
            💧 AutoClean
          </router-link>
        </div>

        <div class="hidden sm:flex sm:items-center sm:space-x-4">
          <router-link to="/" class="hover:bg-secondary px-3 py-2 rounded-md font-medium transition text-gray-900">Accueil</router-link>
          
          <template v-if="authStore.isAuthenticated">
            <router-link to="/my-bookings" class="hover:bg-secondary px-3 py-2 rounded-md font-medium transition text-gray-900">
              Mes RDV
            </router-link>
            
            <span class="text-sm font-bold text-gray-700 italic">
              Bonjour, {{ authStore.user?.firstName }}
            </span>
            
            <button @click="handleLogout" class="bg-white/50 hover:bg-white text-gray-900 px-4 py-2 rounded-md font-medium transition shadow-sm border border-gray-200">
              Déconnexion
            </button>
          </template>

          <router-link v-else to="/login" class="bg-tertiary hover:bg-white text-gray-900 px-4 py-2 rounded-md font-bold transition shadow-sm">
            Se connecter
          </router-link>
        </div>

        <div class="flex items-center sm:hidden">
          <button @click="isOpen = !isOpen" class="text-gray-800 hover:text-gray-600 focus:outline-none">
            <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-if="!isOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div v-show="isOpen" class="sm:hidden bg-secondary border-t border-primary">
      <div class="px-2 pt-2 pb-4 space-y-2 shadow-inner">
        <router-link to="/" @click="isOpen = false" class="block px-3 py-3 rounded-md text-lg font-medium hover:bg-primary">
          Accueil
        </router-link>
        
        <template v-if="authStore.isAuthenticated">
          <router-link to="/my-bookings" @click="isOpen = false" class="block px-3 py-3 rounded-md text-lg font-medium hover:bg-primary">
            Mes RDV
          </router-link>
          
          <div class="px-3 py-2 text-sm font-bold text-gray-700 border-b border-primary/30">
             👤 {{ authStore.user?.firstName }} {{ authStore.user?.lastName }}
          </div>
          
          <button @click="handleLogout" class="w-full text-left block px-3 py-3 rounded-md text-lg font-medium text-red-700 hover:bg-primary">
            Déconnexion
          </button>
        </template>

        <router-link v-else to="/login" @click="isOpen = false" class="block px-3 py-3 rounded-md text-lg font-bold bg-tertiary text-center shadow">
          Se connecter
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const isOpen = ref(false)
const router = useRouter()
const authStore = useAuthStore()

onMounted(async () => {
  if (authStore.token && !authStore.user) {
    await authStore.fetchProfile()
  }
})

const handleLogout = () => {
  authStore.logout()
  isOpen.value = false
  router.push('/')
}
</script>
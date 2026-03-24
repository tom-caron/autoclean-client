<template>
  <div class="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-extrabold text-gray-900">Mes Réservations</h1>
        <router-link to="/booking" class="bg-primary hover:bg-secondary text-gray-900 px-4 py-2 rounded-lg font-bold text-sm transition shadow-sm">
          + Nouveau RDV
        </router-link>
      </div>

      <div v-if="isLoading" class="flex justify-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>

      <div v-else-if="bookings.length === 0" class="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
        <p class="text-4xl mb-4">🚗</p>
        <h2 class="text-xl font-bold text-gray-800">Aucune réservation pour le moment</h2>
        <p class="text-gray-500 mt-2">Votre historique de lavage apparaîtra ici.</p>
      </div>

      <div v-else class="space-y-4">
        <div v-for="booking in bookings" :key="booking._id" 
             class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition duration-300">
          
          <div class="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            <div class="flex items-start gap-4">
              <div class="bg-blue-50 p-3 rounded-lg text-2xl">🧼</div>
              <div>
                <h3 class="font-bold text-gray-900 text-lg">{{ booking.service.name }}</h3>
                <p class="text-sm text-gray-500 font-medium">📍 {{ booking.agency.name }}</p>
                <div class="flex items-center gap-2 mt-1">
                  <span class="text-xs font-bold text-tertiary">⏱️ {{ booking.totalDurationMinutes }} min</span>
                  <span class="text-xs text-gray-400">•</span>
                  <span class="text-xs font-bold text-gray-700">{{ booking.totalPrice }} €</span>
                </div>
              </div>
            </div>

            <div class="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 border-t sm:border-t-0 pt-4 sm:pt-0">
              <div class="text-right">
                <p class="font-black text-gray-900">{{ formatDate(booking.date) }}</p>
                <p class="text-primary font-bold">{{ formatTime(booking.date) }}</p>
              </div>
              
              <span :class="getStatusClass(booking.status)" class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {{ formatStatus(booking.status) }}
              </span>
            </div>

          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const bookings = ref([])
const isLoading = ref(true)

const fetchMyBookings = async () => {
  try {
    const response = await api.get('/bookings/my-bookings')
    // On trie pour avoir les plus récents en haut
    bookings.value = response.data.data.sort((a, b) => new Date(b.date) - new Date(a.date))
  } catch (error) {
    console.error("Erreur lors de la récupération des réservations", error)
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchMyBookings)

// Fonctions utilitaires pour le formatage
const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

const formatTime = (dateStr) => {
  return new Date(dateStr).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }).replace(':', 'h')
}

const formatStatus = (status) => {
  const map = { 'Pending': 'En attente', 'Confirmed': 'Confirmé', 'InProgress': 'En cours', 'Completed': 'Terminé', 'Cancelled': 'Annulé' }
  return map[status] || status
}

const getStatusClass = (status) => {
  const map = {
    'Pending': 'bg-yellow-100 text-yellow-700',
    'Confirmed': 'bg-green-100 text-green-700',
    'InProgress': 'bg-blue-100 text-blue-700',
    'Completed': 'bg-gray-100 text-gray-700',
    'Cancelled': 'bg-red-100 text-red-700'
  }
  return map[status] || 'bg-gray-100 text-gray-600'
}
</script>
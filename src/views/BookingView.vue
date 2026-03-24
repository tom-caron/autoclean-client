<template>
  <div class="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
      
      <div class="text-center mb-10">
        <h1 class="text-3xl font-extrabold text-gray-900">Votre Réservation</h1>
        <p class="mt-2 text-gray-600">Plus que quelques étapes avant un véhicule étincelant.</p>
      </div>

      <div class="mb-8">
        <div class="flex items-center justify-between relative">
          <div class="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 z-0"></div>
          <div class="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-primary z-0 transition-all duration-300" :style="{ width: ((store.step - 1) / 3) * 100 + '%' }"></div>
          
          <div v-for="i in 4" :key="i" 
               class="relative z-10 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300"
               :class="store.step >= i ? 'bg-primary text-gray-900' : 'bg-gray-200 text-gray-500'">
            {{ i }}
          </div>
        </div>
        <div class="flex justify-between mt-2 text-xs font-medium text-gray-500">
          <span>Agence</span>
          <span>Prestation</span>
          <span>Date & Heure</span>
          <span>Validation</span>
        </div>
      </div>

      <div class="bg-white shadow-lg rounded-2xl p-6 sm:p-10 border border-gray-100">
        
        <div v-if="store.step === 1" class="animate-fade-in">
          <h2 class="text-xl font-bold mb-6 text-gray-800">1. Choisissez votre agence</h2>
          
          <div v-if="isLoading" class="text-center py-10">
            <p class="text-primary font-bold animate-pulse">Chargement des agences...</p>
          </div>

          <div v-else-if="errorMessage" class="p-4 bg-red-50 text-red-600 rounded-lg text-center">
            {{ errorMessage }}
          </div>

          <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button 
              v-for="agency in agencies" 
              :key="agency._id"
              @click="store.setAgency({ id: agency._id, name: agency.name })" 
              class="p-4 border-2 border-gray-100 rounded-xl hover:border-secondary hover:bg-secondary/10 transition text-left focus:outline-none focus:ring-2 focus:ring-primary group">
              
              <div class="flex items-center justify-between">
                <h3 class="font-bold text-lg text-gray-900 group-hover:text-primary transition">{{ agency.name }}</h3>
                <span class="text-2xl">📍</span>
              </div>
              <p class="text-sm text-gray-500 mt-1">{{ agency.address.street }}, {{ agency.address.city }}</p>
              <p class="text-xs text-tertiary mt-2 font-medium">📞 {{ agency.phone }}</p>
            </button>
          </div>
        </div>

        <div v-if="store.step === 2" class="animate-fade-in">
          <h2 class="text-xl font-bold mb-2 text-gray-800">2. Choisissez votre lavage</h2>
          <p class="text-sm text-gray-500 mb-6">Agence sélectionnée : <span class="font-bold text-primary">{{ store.selectedAgency?.name }}</span></p>

          <h3 class="font-bold text-gray-700 mb-3 border-b pb-2">Nos Prestations (Requis)</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <button 
              v-for="prestation in prestations" 
              :key="prestation._id"
              @click="store.setService(prestation)"
              :class="store.selectedService?._id === prestation._id ? 'border-primary bg-primary/10 ring-2 ring-primary' : 'border-gray-200 hover:border-secondary'"
              class="p-4 border-2 rounded-xl text-left transition duration-200 focus:outline-none relative">
              
              <div v-if="store.selectedService?._id === prestation._id" class="absolute top-2 right-2 text-primary">
                ✅
              </div>

              <h4 class="font-bold text-gray-900">{{ prestation.name }}</h4>
              <p class="text-xs text-gray-500 mt-1 h-8">{{ prestation.description }}</p>
              <div class="mt-3 flex justify-between items-center text-sm font-medium">
                <span class="text-gray-900">{{ prestation.price }} €</span>
                <span class="text-tertiary">⏱️ {{ prestation.durationMinutes }} min</span>
              </div>
            </button>
          </div>

          <h3 class="font-bold text-gray-700 mb-3 border-b pb-2">Options supplémentaires (Facultatif)</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <button 
              v-for="option in options" 
              :key="option._id"
              @click="store.toggleOption(option)"
              :class="store.selectedOptions.some(o => o._id === option._id) ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-secondary'"
              class="p-3 border-2 rounded-xl flex items-center justify-between transition duration-200 focus:outline-none">
              
              <div class="flex items-center space-x-3">
                <div class="w-5 h-5 rounded border flex items-center justify-center" 
                     :class="store.selectedOptions.some(o => o._id === option._id) ? 'bg-primary border-primary text-white' : 'border-gray-300'">
                  <span v-if="store.selectedOptions.some(o => o._id === option._id)">✓</span>
                </div>
                <div class="text-left">
                  <h4 class="font-bold text-sm text-gray-900">{{ option.name }}</h4>
                  <span class="text-xs text-gray-500">+ {{ option.durationMinutes }} min</span>
                </div>
              </div>
              <span class="font-bold text-sm">+ {{ option.price }} €</span>
            </button>
          </div>

          <div class="flex justify-between mt-8 pt-4 border-t">
            <button @click="store.prevStep()" class="px-6 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition">Retour</button>
            
            <button 
              @click="store.nextStep()" 
              :disabled="!store.selectedService"
              :class="!store.selectedService ? 'bg-gray-300 cursor-not-allowed text-gray-500' : 'bg-primary text-gray-900 hover:bg-secondary shadow'"
              class="px-6 py-2 font-bold rounded-lg transition">
              Choisir la date
            </button>
          </div>
        </div>

        <div v-if="store.step === 3" class="animate-fade-in">
          <h2 class="text-xl font-bold mb-2 text-gray-800">3. Choisissez votre créneau</h2>
          
          <div class="bg-blue-50 text-blue-800 p-3 rounded-lg mb-6 text-sm flex items-center">
            <span class="mr-2">⏱️</span> 
            Durée estimée de l'intervention : <strong>{{ store.totalDuration }} minutes</strong>
          </div>

          <div class="mb-8">
            <label class="block text-sm font-bold text-gray-700 mb-2">Sélectionnez une date :</label>
            <input 
              type="date" 
              :min="minDate"
              :value="store.selectedDate"
              @change="fetchSlots"
              class="w-full sm:w-1/2 p-3 border-2 border-gray-200 rounded-xl focus:ring-primary focus:border-primary text-gray-700 font-medium"
            />
          </div>

          <div v-if="store.selectedDate" class="animate-fade-in border-t pt-6">
            <h3 class="font-bold text-gray-700 mb-4">Créneaux disponibles le {{ new Date(store.selectedDate).toLocaleDateString('fr-FR') }}</h3>
            
            <div v-if="isLoadingSlots" class="text-center py-4 text-primary font-medium animate-pulse">
              Recherche des disponibilités...
            </div>
            
            <div v-else-if="availableSlots.length === 0" class="text-center py-6 bg-gray-50 rounded-xl text-gray-500">
              L'agence est fermée ou complète à cette date. Veuillez essayer un autre jour.
            </div>
            
            <div v-else class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              <button 
                v-for="slot in availableSlots" 
                :key="slot"
                @click="store.setTimeSlot(slot)"
                :class="store.selectedTimeSlot === slot ? 'bg-primary text-gray-900 ring-2 ring-primary shadow-md font-bold' : 'bg-white border-2 border-gray-100 text-gray-600 hover:border-secondary hover:text-primary'"
                class="py-2 px-1 rounded-lg text-sm transition duration-200 focus:outline-none">
                {{ slot }}
              </button>
            </div>
          </div>

          <div class="flex justify-between mt-8 pt-4 border-t">
            <button @click="store.prevStep()" class="px-6 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition">Retour</button>
            
            <button 
              @click="store.nextStep()" 
              :disabled="!store.selectedTimeSlot"
              :class="!store.selectedTimeSlot ? 'bg-gray-300 cursor-not-allowed text-gray-500' : 'bg-primary text-gray-900 hover:bg-secondary shadow'"
              class="px-6 py-2 font-bold rounded-lg transition">
              Résumé
            </button>
          </div>
        </div>

        <div v-if="store.step === 4" class="animate-fade-in">
          <h2 class="text-xl font-bold mb-6 text-gray-800">4. Résumé de votre commande</h2>
          
          <div class="bg-gray-50 p-6 rounded-2xl border border-gray-200 shadow-sm mb-8">
            <div class="flex flex-col sm:flex-row justify-between border-b border-gray-200 pb-4 mb-4 gap-4">
              <div>
                <p class="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Lieu du rendez-vous</p>
                <p class="font-bold text-gray-900 text-lg">{{ store.selectedAgency?.name }}</p>
              </div>
              <div class="sm:text-right">
                <p class="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Date et Heure</p>
                <p class="font-bold text-primary text-lg">
                  {{ new Date(store.selectedDate).toLocaleDateString('fr-FR') }} à {{ store.selectedTimeSlot }}
                </p>
              </div>
            </div>

            <div class="py-2">
              <p class="text-xs text-gray-500 uppercase tracking-wider font-bold mb-2">Détail de la prestation</p>
              
              <div class="flex justify-between items-center mb-2">
                <p class="font-bold text-gray-800">{{ store.selectedService?.name }}</p>
                <p class="font-medium text-gray-900">{{ store.selectedService?.price }} €</p>
              </div>
              
              <div v-for="option in store.selectedOptions" :key="option._id" class="flex justify-between items-center text-sm text-gray-600 mb-1 ml-4 border-l-2 border-primary pl-2">
                <p>+ {{ option.name }}</p>
                <p>{{ option.price }} €</p>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-gray-200 flex justify-between items-end">
              <div>
                <p class="text-sm text-gray-500">Durée estimée : <span class="font-bold">{{ store.totalDuration }} min</span></p>
              </div>
              <div class="text-right">
                <p class="text-sm text-gray-500 font-bold mb-1">Total à régler sur place</p>
                <p class="text-3xl font-black text-gray-900">{{ store.totalPrice }} €</p>
              </div>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-4 border-t">
            <button @click="store.prevStep()" class="w-full sm:w-auto px-6 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition order-2 sm:order-1">
              Modifier mes choix
            </button>
            
            <button @click="submitBooking" class="w-full sm:w-auto px-8 py-3 bg-gray-900 text-white font-bold rounded-lg shadow-lg hover:bg-primary hover:text-gray-900 transition-colors duration-300 order-1 sm:order-2 flex items-center justify-center gap-2">
              <span>Confirmer le rendez-vous</span>
              <span>🚗</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useBookingStore } from '../stores/bookingStore'
import api from '../services/api'

const store = useBookingStore()

const agencies = ref([])
const prestations = ref([])
const options = ref([])
const isLoading = ref(true)
const errorMessage = ref('')

// Variables pour la gestion des créneaux (Étape 3)
const availableSlots = ref([])
const isLoadingSlots = ref(false)

// On empêche de choisir une date dans le passé
const minDate = new Date().toISOString().split('T')[0]

// Fonction déclenchée quand l'utilisateur choisit une date
const fetchSlots = async (event) => {
  const dateStr = event.target.value
  store.setDate(dateStr)

  if (!dateStr) return

  isLoadingSlots.value = true
  try {
    // ➔ On utilise le Getter totalDuration de Pinia !
    const response = await api.get('/bookings/available-slots', {
      params: {
        agencyId: store.selectedAgency.id,
        date: dateStr,
        duration: store.totalDuration
      }
    })
    availableSlots.value = response.data.data
  } catch (error) {
    console.error(error)
    availableSlots.value = [] // En cas d'erreur ou de fermeture, on vide
  } finally {
    isLoadingSlots.value = false
  }
}

import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const submitBooking = async () => {
  // 1. SÉCURITÉ : Si pas connecté, on redirige vers le login
  if (!authStore.isAuthenticated) {
    alert("Vous devez être connecté pour réserver. Nous vous redirigeons vers la page de connexion.")
    router.push('/login')
    return
  }

  try {
    isLoadingSlots.value = true // On réutilise le loader pour le bouton

    // 2. Préparation de la date ISO
    const [hours, minutes] = store.selectedTimeSlot.split(':')
    const finalDate = new Date(store.selectedDate)
    finalDate.setHours(hours, minutes, 0, 0)

    // 3. Préparation du payload pour l'API
    const payload = {
      agencyId: store.selectedAgency.id,
      serviceId: store.selectedService._id,
      optionIds: store.selectedOptions.map(opt => opt._id),
      date: finalDate.toISOString()
    }

    // 4. ENVOI RÉEL À L'API
    // Axios va automatiquement ajouter le Token "Bearer ..." grâce à notre intercepteur !
    const response = await api.post('/bookings', payload)

    if (response.data.success) {
      alert("🚀 Félicitations ! Votre réservation est confirmée.")
      
      // 5. On vide le store Pinia pour la prochaine fois
      store.resetBooking()
      
      // 6. Redirection vers l'accueil ou un futur espace "Mes réservations"
      router.push('/')
    }

  } catch (error) {
    console.error("Erreur API :", error.response?.data)
    const message = error.response?.data?.message || "Une erreur est survenue."
    alert(`Désolé, la réservation a échoué : ${message}`)
  } finally {
    isLoadingSlots.value = false
  }
}

onMounted(async () => {
  try {
    // On fait les 3 requêtes en même temps pour aller plus vite (Promise.all)
    const [resAgencies, resPrestations, resOptions] = await Promise.all([
      api.get('/agencies'),
      api.get('/prestations'),
      api.get('/options')
    ])
    
    agencies.value = resAgencies.data.data
    prestations.value = resPrestations.data.data
    options.value = resOptions.data.data
  } catch (error) {
    console.error(error)
    errorMessage.value = "Impossible de charger les données du catalogue."
  } finally {
    isLoading.value = false
  }
})
</script>

<style scoped>
/* Petite animation d'apparition douce quand on change d'étape */
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
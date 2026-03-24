<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        {{ isLogin ? 'Bon retour parmi nous' : 'Créer un compte' }}
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Ou 
        <button @click="isLogin = !isLogin" class="font-medium text-primary hover:text-secondary transition">
          {{ isLogin ? 'créer un nouveau compte client' : 'se connecter à un compte existant' }}
        </button>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100">
        
        <div v-if="errorMessage" class="mb-4 bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center">
          {{ errorMessage }}
        </div>

        <form class="space-y-6" @submit.prevent="handleSubmit">
          
          <div v-if="!isLogin" class="grid grid-cols-2 gap-4 animate-fade-in">
            <div>
              <label class="block text-sm font-medium text-gray-700">Prénom</label>
              <input v-model="form.firstName" type="text" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Nom</label>
              <input v-model="form.lastName" type="text" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
            </div>
            <div class="col-span-2">
              <label class="block text-sm font-medium text-gray-700">Téléphone</label>
              <input v-model="form.phone" type="tel" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Adresse email</label>
            <input v-model="form.email" type="email" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Mot de passe</label>
            <input v-model="form.password" type="password" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
          </div>

          <div>
            <button type="submit" :disabled="isLoading" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-gray-900 bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition disabled:opacity-50">
              <span v-if="isLoading">Chargement...</span>
              <span v-else>{{ isLogin ? 'Se connecter' : "S'inscrire" }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const isLogin = ref(true)
const isLoading = ref(false)
const errorMessage = ref('')

const form = reactive({
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  password: ''
})

const handleSubmit = async () => {
  isLoading.value = true
  errorMessage.value = ''
  
  try {
    if (isLogin.value) {
      await authStore.login(form.email, form.password)
    } else {
      await authStore.register(form)
    }
    
    // Si tout se passe bien, on redirige vers l'accueil (ou vers le tunnel de réservation !)
    router.push('/booking')
    
  } catch (error) {
    console.error(error)
    // On affiche le message d'erreur envoyé par ton API (ex: "Email déjà utilisé" ou "Mot de passe incorrect")
    errorMessage.value = error.response?.data?.message || "Une erreur est survenue."
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
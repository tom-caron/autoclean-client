import { defineStore } from 'pinia'
import api from '../services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    // On initialise le token avec ce qu'il y a dans le localStorage (pour rester connecté après un F5)
    token: localStorage.getItem('token') || null,
    user: null,
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.token, // Renvoie true si un token existe
  },
  
  actions: {
    async login(email, password) {
    const response = await api.post('/auth/login', { email, password })
    this.token = response.data.token
    localStorage.setItem('token', this.token)
    await this.fetchProfile() 
    },

    async register(userData) {
      // 1. On crée le compte
      await api.post('/auth/register', userData)
      // 2. On connecte l'utilisateur automatiquement après l'inscription
      await this.login(userData.email, userData.password)
    },

async fetchProfile() {
  if (!this.token) return
  try {
    const response = await api.get('/auth/me')
    
    // ➔ CORRECTION ICI : Ton API renvoie { success: true, user: { ... } }
    this.user = response.data.user 
    
    console.log("Profil récupéré :", this.user.firstName) // Juste pour vérifier dans ta console
  } catch (error) {
    console.error("Erreur fetchProfile :", error)
    this.logout()
  }
},

// Assure-toi aussi que le login fait la même chose si l'API renvoie la même structure
    async login(email, password) {
        const response = await api.post('/auth/login', { email, password })
        this.token = response.data.token
        localStorage.setItem('token', this.token)
        
        // Si le login renvoie déjà l'utilisateur, on le stocke, sinon on appelle fetchProfile
        if (response.data.user) {
            this.user = response.data.user
        } else {
            await this.fetchProfile()
        }
    },

    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
    }
  }
})
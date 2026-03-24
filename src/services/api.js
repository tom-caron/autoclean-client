import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

// NOUVEAU : L'intercepteur de requêtes
api.interceptors.request.use((config) => {
  // On va chercher le token dans le stockage local du navigateur
  const token = localStorage.getItem('token')
  if (token) {
    // Si on l'a, on l'ajoute dans le header Authorization (Format Bearer)
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

export default api
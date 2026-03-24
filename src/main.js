import { createApp } from 'vue'
import { createPinia } from 'pinia' // ➔ Ajoute cet import
import './style.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia() // ➔ Initialise Pinia

app.use(pinia)  // ➔ Active Pinia
app.use(router)
app.mount('#app')
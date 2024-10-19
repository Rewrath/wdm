import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

const app = createApp(App)

app.mount('#app')

// Add this for debugging
app.config.errorHandler = (err, vm, info) => {
  console.error('Vue Error:', err, info)
}
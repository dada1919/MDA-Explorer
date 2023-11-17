import './assets/main.css'
import 'virtual:uno.css'
import { createApp } from 'vue'
// import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)

// app.use(ElementPlus, { size: 'small', zIndex: 3000 })

app.mount('#app')

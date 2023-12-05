import './assets/main.css'
import 'virtual:uno.css'
import { createApp } from 'vue'
// import { createPinia } from 'pinia'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

// app.use(ElementPlus, { size: 'small', zIndex: 3000 })
app.use(ElementPlus)
app.mount('#app')

import './assets/main.css'
import 'virtual:uno.css'
import { createApp } from 'vue'
// import { createPinia } from 'pinia'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import axios from 'axios';
// import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/reset.css';


const app = createApp(App)
// app.use(ElementPlus, { size: 'small', zIndex: 3000 })
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.use(ElementPlus)

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)
// pinia.reset() 
app.use(pinia);
// app.use(Antd)

if (process.env.NODE_ENV === 'development') {
  if ('__VUE_DEVTOOLS_GLOBAL_HOOK__' in window) {
  // 这里__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue赋值一个createApp实例
    window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app
  }
  app.config.devtools = true
}

app.mount('#app')

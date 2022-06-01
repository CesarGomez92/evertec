import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/index.css'

createApp(App)
  .provide('$P', window.P)
  .use(store)
  .use(router)
  .mount('#app')

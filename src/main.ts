import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { MotionPlugin } from '@vueuse/motion'
import 'remixicon/fonts/remixicon.css'

const app = createApp(App)
app.use(MotionPlugin);
app.use(router)   
app.mount('#app') 

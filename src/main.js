import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from "element-plus"
import 'element-plus/lib/theme-chalk/index.css';
// import '@/styles/index.scss'
import {mask} from 'vue-the-mask'
createApp(App).use(store).directive('mask',mask ).use(router).use(ElementPlus).mount('#app')

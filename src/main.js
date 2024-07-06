import { createApp } from 'vue'
import './style.css'
import router from './router'
import store from './store'
import App from './App.vue'
import axios from 'axios';

import VueToast  from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

createApp(App)
    .use(VueToast)
    .use(router)
    .use(store)
    .mount('#app')

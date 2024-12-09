import './assets/css/main.css'
import './style.css'
import 'animate.css';
import { createApp } from 'vue'
import App from './App.vue'
import store from './store';
import router from './router';
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

createApp(App)
    .use(store)
    .use(router)
    .use(Toast, {
        position: 'top-right',
        timeout: 3000,
        closeOnClick: true,
    })
    .mount('#app')

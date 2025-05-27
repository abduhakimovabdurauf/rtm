import axios from 'axios'
import router from '../router'

const settingsAxios = axios.create({
    baseURL:import.meta.env.VITE_API_URL
})

settingsAxios.interceptors.response.use( null, error =>{
    if(error.response.status === 401 ){
        console.log('status=401');
        router.push('/login')
        // store.dispatch('auth/logout')
        
        // store.commit("auth/LOGOUT")
    }
    return Promise.reject(error)
});

export default settingsAxios
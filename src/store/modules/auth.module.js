import axios from "../../axios/settings.js";
import { useToast } from "vue-toastification";

const toast = useToast();

export default {
    namespaced: true,
    state() {
        return {
            token: localStorage.getItem("jwt-token"),
        };
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
            localStorage.setItem("jwt-token", token);
        },
        LOGOUT(state) {
            state.token = null;
            localStorage.removeItem("jwt-token");
            localStorage.removeItem("user");
        },
        SET_USER(payload) {
            localStorage.setItem("user",JSON.stringify(payload));
            console.log(payload)
        }
    },
    actions: {
        async login({ commit }, payload) {
            try {
                const url = `${import.meta.env.VITE_API_URL}/login`;
                const response = await axios.post(url, payload);
                console.log(response)
                const token = response?.data?.token;
                commit("setToken", token);
                // commit("SET_USER", response.data.user);
                localStorage.setItem("user",JSON.stringify(response.data.user));
                console.log(response.data.user);
                toast.success(response.data.message || "Login successful!");
            } catch (e) {
                console.error(e.message);
                toast.error(e.response?.data?.message || "Login failed!");
            }
        },
        async logout({ commit, state }) {
            try {
                const url = `${import.meta.env.VITE_API_URL}/logout`;
                const response = await axios.post(url, {}, {
                    headers: { Authorization: `Bearer ${state.token}` },
                });
                commit("LOGOUT");
                toast.success(response.data.message);
            } catch (e) {
                console.error(e.message);
                toast.error(e.response?.data?.message || "Logout failed!");
            }
        },
    },
    getters: {
        token: (state) => state.token,
        isAuthenticated: (state) => !!state.token,
    },
};

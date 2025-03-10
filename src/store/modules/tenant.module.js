import axios from "@/axios/settings.js";
import { useToast } from "vue-toastification";

const toast = useToast();
const API_URL = `${import.meta.env.VITE_API_URL}/tenants`;

export default {
    namespaced: true,
    state: () => ({
        tenants: []
    }),
    mutations: {
        SET_TENANTS(state, tenants) {
            state.tenants = tenants;
        },
        ADD_TENANT(state, payload) {
            state.tenants.push(payload);
        },
        UPDATE_TENANT(state, payload) {
            const index = state.tenants.findIndex((u) => u.id === payload.id);
            if (index !== -1) state.tenants.splice(index, 1, payload);
        },
        DELETE_TENANT(state, tenantId) {
            state.tenants = state.tenants.filter((tenant) => tenant.id !== tenantId);
        },
    },
    actions: {
        async getAllTenants({ commit },payload) {
            // commit("SET_LOADING", true, { root: true });
            try {
                const response = await axios.get(API_URL, {
                    params: {
                        page: payload.page,
                        per_page: payload.perPage,
                        sortBy: payload.sortBy,
                        orderBy: payload.orderBy,
                        key_word: payload.key
                    },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
                    },
                });
                commit("SET_TENANTS", response.data.tenants.data);
                return response.data.tenants;
            } catch (e) {
                toast.error(e.response?.data?.message || "Ijarachi malumotlarni olishda xatolik!");
            } finally {
                commit("SET_LOADING", false, { root: true });
                commit("SET_SORTLOADING", false, { root: true });
            }
        },
        async getTenantById({ commit }, Id) {
            commit("SET_LOADING", true, { root: true });
            try {
                const response = await axios.get(`${API_URL}/${Id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
                    },
                });
                return response.data;
            } catch (e) {
                toast.error(e.response?.data?.message || "Ijarachilar malumotlarini olishda xatolik!");
            } finally {
                commit("SET_LOADING", false, { root: true });
                commit("closeSidebar", false, { root: true });
            }
        },
        async addTenant({ commit }, payload) {
            commit("SET_LOADING", true, { root: true });
            try {
                const response = await axios.post(API_URL, payload, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
                    },
                });
                commit("ADD_TENANT", response.data.data);
                toast.success(response.data.message);
            } catch (e) {
                toast.error(e.response?.data?.message || "Ijarachi qo'shishda xatolik!");
            } finally {
                commit("SET_LOADING", false, { root: true });
                commit("closeSidebar", false, { root: true });
            }
        },
        async updateTenant({ commit }, payload) {
            commit("SET_LOADING", true, { root: true });
            try {
                const response = await axios.post(`${API_URL}/${payload.id}`, payload, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
                    },
                });
                commit("UPDATE_TENANT", response.data.tenant);
                toast.success(response.data.message);
            } catch (e) {
                toast.error(e.response?.data?.message || "Ijarachi malumotlarini yangilashda xatolik!");
            } finally {
                commit("SET_LOADING", false, { root: true });
                commit("closeSidebar", false, { root: true });
            }
        },
        async deleteTenant({ commit }, Id) {
            commit("SET_LOADING", true, { root: true });
            try {
                const response= await axios.delete(`${API_URL}/${Id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("jwt-token")}` },
                });
                commit("DELETE_TENANT  ", Id);
                toast.success(response.data.message);
            } catch (e) {
                toast.error(e.response?.data?.message || "Ijarachi malumotlarini o'chirishda xatolik!");
            } finally {
                commit("SET_LOADING", false, { root: true });
                commit("closeSidebar", false, { root: true });
            }
        },
    },
    getters: {
        tenants(state) {
            return state.tenants
        }
    }
};

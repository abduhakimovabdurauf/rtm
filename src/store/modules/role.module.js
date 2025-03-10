import axios from "@/axios/settings.js";
import { useToast } from "vue-toastification";

const toast = useToast();

const API_URL = `${import.meta.env.VITE_API_URL}/roles`;

export default {
    namespaced: true,
    state() {
        return {
            roles: [],
        };
    },
    mutations: {
        SET_ROLES(state, roles) {
            state.roles = roles;
        },
        ADD_ROLE(state, role) {
            state.roles.unshift(role);
        },
        UPDATE_ROLE(state, updatedRole) {
            const index = state.roles.findIndex((r) => r.id === updatedRole.id);
            if (index !== -1) state.roles.splice(index, 1, updatedRole);
        },
        DELETE_ROLE(state, roleId) {
            state.roles = state.roles.filter((role) => role.id !== roleId);
        },
    },
    actions: {
        async getAllRoles({ commit }) {
            try {
                const response = await axios.get(API_URL, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
                    },
                });
                commit("SET_ROLES", response.data.data);
                return response.data;
            } catch (e) {
                toast.error(e.response?.data?.message || "Lavozimlar ro‘yxatini olishda xatolik!");
            } finally {
                commit("SET_LOADING", false, { root: true });
            }
        },

        async addRole({ commit }, role) {

            commit("SET_LOADING", true, { root: true });
            try {
                const response = await axios.post(API_URL, role, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
                    },
                });
                commit("ADD_ROLE", response.data.data);
                toast.success(response.data.message);
            } catch (e) {
                toast.error(e.response?.data?.message || "Lavozim qo‘shishda xatolik!");
            } finally {
                commit("SET_LOADING", false, { root: true });
                commit("closeSidebar", false, { root: true });
            }
        },

        async updateRole({ commit }, updatedRole) {
            try {
                const response = await axios.post(`${API_URL}/${updatedRole.id}`, updatedRole, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
                    },
                });
                commit("UPDATE_ROLE", response.data.data);
                toast.success(response?.data?.message);
            } catch (e) {
                toast.error(e.response?.data?.message || "Lavozim o‘zgartirishda xatolik!");
            }
        },

        async deleteRole({ commit }, roleId) {
            if (!confirm("Siz rostdan ham bu rolni o‘chirib yubormoqchimisiz?")) {
                return;
            }
            try {
                await axios.delete(`${API_URL}/${roleId}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("jwt-token")}` },
                });
                commit("DELETE_ROLE", roleId);
                toast.success("Lavozim muvaffaqiyatli o‘chirildi!");
            } catch (e) {
                toast.error(e.response?.data?.message || "Lavozimni o‘chirishda xatolik!");
            }
        },
    },
    getters: {
        roles: (state) => state.roles,
        roleById: (state) => (id) => state.roles.find(role => role.id === id),
    },
};
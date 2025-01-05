import axios from "@/axios/settings.js";
import { useToast } from "vue-toastification";

const toast = useToast();

const API_URL = `${import.meta.env.VITE_API_URL}/roles`;

export default {
    namespaced: true,
    state() {
        return {
            roles: [],
            role: [],
        };
    },
    mutations: {
        SET_ROLES(state, role) {
            state.roles = role;
        },
        ADD_ROLE(state, course) {
            state.roles.push(course);
        },
        UPDATE_ROLE(state, updatedRole) {
            const index = state.roles.findIndex((c) => c.id === updatedRole.id);
            if (index !== -1) state.roles.splice(index, 1, updatedRole);
        },
        DELETE_ROLE(state, roleId) {
            state.courses = state.roles.filter((course) => course.id !== roleId);
        },
    },
    actions: {
        async getAllRoles({ commit }) {
            // commit("SET_LOADING", true, { root: true });
            try {
                const response = await axios.get(API_URL, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
                    },
                });

                commit("SET_ROLES", response.data.data);
                return response.data.total;
            } catch (e) {
                console.log(e)
                toast.error(e.response?.data?.message || "Lavozimlar royhatini olishda xatolik!");
            } finally {
                commit("SET_LOADING", false, { root: true });
            }
        },

        async getRoleById({ commit }, roleId) {
            commit("SET_LOADING", true, { root: true });
            try {
                const response = await axios.get(`${API_URL}/${roleId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
                    },
                });
                return response.data;
            } catch (e) {
                toast.error(e.response?.data?.message || "Lavozimlar royhatini olishda xatolik!");
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
                console.log(response)
                commit("ADD_ROLE", response.data.data);
                toast.success(response.data.message);
            } catch (e) {
                console.error(e)
                toast.error(e.response?.data?.message || "Lavozim qoshishda xatolik!");
            } finally {
                commit("SET_LOADING", false, { root: true });
            }
        },

        async updateRole({ commit }, updatedRole) {
            commit("SET_LOADING", true, { root: true });
            try {
                updatedRole._method = "PUT";
                const response = await axios.post(`${API_URL}/${updatedRole.id}`, updatedRole, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
                    },
                });
                commit("UPDATE_ROLE", response.data.data);
                toast.success(response?.data?.message);
            } catch (e) {
                toast.error(e.response?.data?.message || "Lavozim ozgartirishda xatolik!");
                console.error(e)
            } finally {
                commit("SET_LOADING", false, { root: true });
            }
        },

        async deleteRole({ commit }, roleId) {
            if (!confirm("Siz rostdanxam bu rolni o'chirib yubormoqchimisiz?")) {
                return;
            }

            commit("SET_LOADING", true, { root: true });
            try {
                const response = await axios.delete(`${API_URL}/${roleId}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("jwt-token")}` },
                });
                commit("DELETE_COURSE", roleId);
                toast.success(response?.data?.message);
            } catch (e) {
                toast.error(e.response?.data?.message || "lavozim ni ochirishda xatolik!");
            } finally {
                commit("SET_LOADING", false, { root: true });
            }
        },
    },
    getters: {
        roles(state) {
            return state.roles
        }
    }
};

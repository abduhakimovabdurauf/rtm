import axios from "@/axios/settings.js";
import { useToast } from "vue-toastification";

const toast = useToast();

const API_URL = `${import.meta.env.VITE_API_URL}/permissions`;

export default {
    namespaced: true,
    state() {
        return {
            permissions: [],
            permission: [],
        };
    },
    mutations: {
        SET_PERMISSIONS(state, permission) {
            state.permissions = permission;
        },
        ADD_PERMISSION(state, course) {
            state.permissions.push(course);
        },
        UPDATE_PERMISSIONS(state, updatedPermission) {
            const index = state.permissions.findIndex((c) => c.id === updatedPermission.id);
            if (index !== -1) state.permissions.splice(index, 1, updatedPermission);
        },
        DELETE_PERMISSIONS(state, permissionId) {
            state.courses = state.permissions.filter((course) => course.id !== permissionId);
        },
    },
    actions: {
        async getAllPermissions({ commit }) {
            // commit("SET_LOADING", true, { root: true });
            try {
                const response = await axios.get(API_URL, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
                    },
                });
                commit("SET_PERMISSIONS", response.data.data);
                return response.data;
            } catch (e) {
                toast.error(e.response?.data?.message || "Huquqlar royhatini olishda xatolik!");
            } finally {
                commit("SET_LOADING", false, { root: true });
            }
        },

        async getPermissionById({ commit }, permissionId) {
            commit("SET_LOADING", true, { root: true });
            try {
                const response = await axios.get(`${API_URL}/${permissionId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
                    },
                });
                return response.data;
            } catch (e) {
                toast.error(e.response?.data?.message || "Huquq royhatini olishda xatolik!");
            } finally {
                commit("SET_LOADING", false, { root: true });
                commit("closeSidebar", false, { root: true });
            }
        },

        async addPermission({ commit }, permission) {
            commit("SET_LOADING", true, { root: true });
            try {
                const response = await axios.post(API_URL, permission, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
                    },
                });
                commit("ADD_PERMISSION", response.data.data);
                toast.success(response.data.message);
            } catch (e) {
                toast.error(e.response?.data?.message || "Huquq qoshishda xatolik!");
            } finally {
                commit("SET_LOADING", false, { root: true });
                commit("closeSidebar", false, { root: true });
            }
        },

        async updatePermission({ commit }, updatedPermission) {
            commit("SET_LOADING", true, { root: true });
            try {
                updatedPermission._method = "PUT";
                const response = await axios.post(`${API_URL}/${updatedPermission.id}`, updatedPermission, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
                    },
                });
                commit("UPDATE_PERMISSIONS", response.data.data);
                toast.success(response?.data?.message);
            } catch (e) {
                toast.error(e.response?.data?.message || "Huquq ozgartirishda xatolik!");
            } finally {
                commit("SET_LOADING", false, { root: true });
                commit("closeSidebar", false, { root: true });
            }
        },

        async deletePermission({ commit }, permissionId) {
            if (!confirm("Siz rostdanxam bu huquqni o'chirib yubormoqchimisiz?")) {
                return;
            }

            commit("SET_LOADING", true, { root: true });
            try {
                const response = await axios.delete(`${API_URL}/${permissionId}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("jwt-token")}` },
                });
                commit("DELETE_COURSE", permissionId);
                toast.success(response?.data?.message);
            } catch (e) {
                toast.error(e.response?.data?.message || "lavozim ni ochirishda xatolik!");
            } finally {
                commit("SET_LOADING", false, { root: true });
                commit("closeSidebar", false, { root: true });
            }
        },
    },
    getters: {
        permissions(state) {
            return state.permissions
        }
    }
};

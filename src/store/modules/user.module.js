import axios from "@/axios/settings.js";
import { useToast } from "vue-toastification";

const toast = useToast();
const API_URL = `${import.meta.env.VITE_API_URL}/users`;

export default {
    namespaced: true,
    state: () => ({
        users: [],
        user: {},
    }),
    mutations: {
        SET_USERS(state, users) {
            state.users = users;
        },
        ADD_USER(state, user) {
            state.users.unshift(user);
        },
        UPDATE_USER(state, updatedUser) {
            const index = state.users.findIndex((u) => u.id === updatedUser.id);
            if (index !== -1) state.users.splice(index, 1, updatedUser);
        },
        DELETE_USER(state, userId) {
            state.users = state.users.filter((user) => user.id !== userId);
        },
    },
    actions: {
        async getAllUsers({ commit },payload) {
            // commit("SET_LOADING", true, { root: true });
            try {
                const response = await axios.get(API_URL, {
                    params: {
                        page: payload?.page,
                        per_page: payload?.perPage,
                        sortBy: payload?.sortBy,
                        orderBy: payload?.orderBy,
                    },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
                    },
                });
                commit("SET_USERS", response.data.data);
                return response.data;
            } catch (e) {
                toast.error(e.response?.data?.message || "Xodim malumotlarni olishda xatolik!");
            } finally {
                commit("SET_LOADING", false, { root: true });
            }
        },
        async getBranchTeachers({},branchId) {
            console.log('id: ', branchId);
            
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/branches/${branchId}/teachers`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
                    },
                });
                console.log('teachers: ',response.data)
                return response.data.teachers;
                
            } catch (e) {
                console.log(e);
            }
        },
        async getUserById({ commit }, userId) {
            try {
                const response = await axios.get(`${API_URL}/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
                    },
                });
                console.log(response.data)
                return response.data;
            } catch (e) {
                toast.error(e.response?.data?.message || "Xodim malumotlari olishda xatolik!");
            } finally {
                commit("SET_LOADING", false, { root: true });
            }
        },
        async addUser({ commit }, user) {
            commit("SET_LOADING", true, { root: true });
            console.log('taken data: ', user)
            try {
                const response = await axios.post(API_URL, user, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
                    },
                });
                commit("ADD_USER", response.data.user);

                toast.success('Xodim muvaffaqiyatli qo\'shildi!');
            } catch (e) {
                toast.error(e.response?.data?.message || "Xodim qo'shishda xatolik!");
            } finally {
                commit("SET_LOADING", false, { root: true });
                commit("closeSidebar", false, { root: true });
            }
        },
        async updateUser({ commit }, user) {
            commit("SET_LOADING", true, { root: true });
            console.log('taken data: ', user)
            try {
                const response = await axios.post(`${API_URL}/${user.id}`, user, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
                    },
                });
                console.log('resonse: ', response);
                commit("UPDATE_USER", response.data.user);
                toast.success(`Xodim muvaffaqiyatli o'zgartirildi!`);
                return response
            } catch (e) {
                toast.error(e.response?.data?.message || "Xodim yangilashda xatolik!");
                console.log(e)
            } finally {
                commit("SET_LOADING", false, { root: true });
                commit("closeSidebar", false, { root: true });
            }
        },
        async deleteUser({ commit }, userId) {
            commit("SET_LOADING", true, { root: true });
            try {
                const response= await axios.delete(`${API_URL}/${userId}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("jwt-token")}` },
                });
                commit("DELETE_USER", userId);
                toast.success(`Xodim muvaffaqiyatli o'chirildi!`);
            } catch (e) {
                toast.error(e.response?.data?.message || "Xodim o'chirishda xatolik!");
            } finally {
                commit("SET_LOADING", false, { root: true });
                commit("closeSidebar", false, { root: true });
            }
        },
    },
    getters: {
        users(state) {
            return state.users
        }
    }
};

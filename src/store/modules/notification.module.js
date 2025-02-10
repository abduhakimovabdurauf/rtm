import axios from "@/axios/settings.js";
import { useToast } from "vue-toastification";

const toast = useToast();

const API_URL = `${import.meta.env.VITE_API_URL}/notifications`;

export default {
    namespaced: true,
    state() {
        return {
            notifications: [],
            token: localStorage.getItem("jwt-token"),
        };
    },
    mutations: {
        SET_NOTIFICATIONS(state, notifications) {
            state.notifications = notifications;
        },
        ADD_NOTIFICATION(state, group) {
            state.notifications.push(group);
        },
        UPDATE_NOTIFICATION(state, updatedNotification) {
            const index = state.notifications.findIndex((c) => c.id === updatedNotification.id);
            if (index !== -1) state.notifications.splice(index, 1, updatedNotification);
        },
        DELETE_NOTIFICATION(state, Id) {
            state.notifications = state.notifications.filter((group) => group.id !== Id);
        },
    },
    actions: {
        async getAllNotifications({ commit }, payload) {
            // commit("SET_LOADING", true, { root: true });
            try {
                const response = await axios.get(API_URL, {
                    params: {
                        page: payload.page,
                        per_page: payload.perPage,
                        sortBy: payload.sortBy,
                        orderBy: payload.orderBy,
                    },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
                    },
                });
                console.log('notifications',response)
                commit("SET_NOTIFICATIONS", response.data.data);
                return response.data.total;
            } catch (e) {
                toast.error(e.response?.data?.message || "Bildirishnoma malumotlarini olishda xatolik!");
            } finally {
                commit("SET_LOADING", false, { root: true });
            }
        },

        async getNotificationById({ commit }, Id) {
            console.log('Id',Id)
            try {
                const response = await axios.get(`${API_URL}/${Id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
                    },
                });
                // console.log('response: ',response)
                return response.data;
            } catch (e) {
                toast.error(e.response?.data?.message || "Failed to fetch group!");
            }
        },

        async addNotification({ commit }, payload) {
            commit("SET_LOADING", true, { root: true });
            try {
                const response = await axios.post(API_URL, payload, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
                    },
                });
                commit("ADD_NOTIFICATION", response.data.group);
                toast.success(response.data.message);
            } catch (e) {
                toast.error(e.response?.data?.message || "Kurs qoshishda xatolik!");
            } finally {
                commit("SET_LOADING", false, { root: true });
                commit("closeSidebar", false, { root: true });
            }
        },

        async updateNotification({ commit }, payload) {
            commit("SET_LOADING", true, { root: true });
            try {
                const response = await axios.post(`${API_URL}/${payload.id}`, payload, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
                    },
                });
                commit("UPDATE_NOTIFICATION", response.data.notification);
                toast.success(response?.data?.message);
            } catch (e) {
                toast.error(e.response?.data?.message || "Bildirishnoma malumotlarini o`zgartirishda xatolik!");
                console.log(e)
            } finally {
                commit("SET_LOADING", false, { root: true });
                commit("closeSidebar", false, { root: true });
            }
        },

        async deleteNotification({ commit }, Id) {
            if (!confirm("Siz rostdanxam bu Bildirishnoma malumotlarni o'chirib yubormoqchimisiz o'chirib yubormoqchimisiz??")) {
                return;
            }
            commit("SET_LOADING", true, { root: true });
            try {
                const response = await axios.delete(`${API_URL}/${Id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("jwt-token")}` },
                });
                commit("DELETE_NOTIFICATION", Id);
                toast.success(response?.data?.message);
            } catch (e) {
                toast.error(e.response?.data?.message || "Failed to delete group!");
            } finally {
                commit("SET_LOADING", false, { root: true });
                commit("closeSidebar", false, { root: true });
            }
        },
    },
    getters: {
        notifications(state) {
            return state.notifications
        }
    }
};

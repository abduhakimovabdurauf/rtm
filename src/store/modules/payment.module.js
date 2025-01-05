import axios from "@/axios/settings.js";
import { useToast } from "vue-toastification";

const toast = useToast();

const API_URL = `${import.meta.env.VITE_API_URL}/payments`;

export default {
    namespaced: true,
    state() {
        return {
            payments: [],
            token: localStorage.getItem("jwt-token"),
        };
    },
    mutations: {
        SET_PAYMENTS(state, payments) {
            state.payments = payments;
        },
        ADD_PAYMENT(state, group) {
            state.payments.push(group);
        },
        UPDATE_PAYMENT(state, updatedPayment) {
            const index = state.payments.findIndex((c) => c.id === updatedPayment.id);
            if (index !== -1) state.payments.splice(index, 1, updatedPayment);
        },
        DELETE_PAYMENT(state, Id) {
            state.payments = state.payments.filter((group) => group.id !== Id);
        },
    },
    actions: {
        async getAllPayments({ commit }, payload) {
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
                console.log('payments',response)
                commit("SET_PAYMENTS", response.data.data);
                return response.data.total;
            } catch (e) {
                toast.error(e.response?.data?.message || "Tolov malumotlarini olishda xatolik!");
            } finally {
                commit("SET_LOADING", false, { root: true });
            }
        },

        async getPaymentById({ commit }, Id) {
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

        async addPayment({ commit }, payload) {
            commit("SET_LOADING", true, { root: true });
            try {
                const response = await axios.post(API_URL, payload, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
                    },
                });
                commit("ADD_PAYMENT", response.data.group);
                toast.success(response.data.message);
            } catch (e) {
                toast.error(e.response?.data?.message || "Kurs qoshishda xatolik!");
            } finally {
                commit("SET_LOADING", false, { root: true });
            }
        },

        async updatePayment({ commit }, payload) {
            commit("SET_LOADING", true, { root: true });
            try {
                const response = await axios.post(`${API_URL}/${payload.id}`, payload, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
                    },
                });
                commit("UPDATE_PAYMENT", response.data.payment);
                toast.success(response?.data?.message);
            } catch (e) {
                toast.error(e.response?.data?.message || "Tolov malumotlarini o`zgartirishda xatolik!");
                console.log(e)
            } finally {
                commit("SET_LOADING", false, { root: true });
            }
        },

        async deletePayment({ commit }, Id) {
            if (!confirm("Siz rostdanxam bu tolov malumotlarni o'chirib yubormoqchimisiz o'chirib yubormoqchimisiz??")) {
                return;
            }
            commit("SET_LOADING", true, { root: true });
            try {
                const response = await axios.delete(`${API_URL}/${Id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("jwt-token")}` },
                });
                commit("DELETE_PAYMENT", Id);
                toast.success(response?.data?.message);
            } catch (e) {
                toast.error(e.response?.data?.message || "Failed to delete group!");
            } finally {
                commit("SET_LOADING", false, { root: true });
            }
        },
    },
    getters: {
        payments(state) {
            return state.payments
        }
    }
};

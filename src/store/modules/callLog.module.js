import axios from "@/axios/settings.js";
import { useToast } from "vue-toastification";

const toast = useToast();

const API_URL = `${import.meta.env.VITE_API_URL}/call_logs`;

export default {
    namespaced: true,
    state() {
        return {
            callLogs: [],
        };
    },
    mutations: {
        SET_CALLLOGS(state, callLogs) {
            state.callLogs = callLogs;
        },
        ADD_CALLLOG(state, callLog) {
            if (!Array.isArray(state.callLogs)) {
                state.callLogs = [];
            }
            state.callLogs.unshift(callLog);
        },

        DELETE_CALLLOG(state, callLogId) {
            state.callLogs = state.callLogs.filter((callLog) => callLog.id !== callLogId);
        },
    },
    actions: {
        async getAllCallLogs({ commit }) {
            try {
                const response = await axios.get(API_URL, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
                    },
                });
                console.log(response)
                commit("SET_CALLLOGS", response?.data?.call_logs.data);
                return response.data.call_logs;
            } catch (e) {
                toast.error(e.response?.data?.message || "Qo'ngiroqlar jurnalilar ro‘yxatini olishda xatolik!");
            } finally {
                commit("SET_LOADING", false, { root: true });
            }
        },

        async addCallLog({ commit }, callLog) {

            commit("SET_LOADING", true, { root: true });
            try {
                const response = await axios.post(API_URL, callLog, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
                    },
                });
                console.log(response)
                commit("ADD_CALLLOG", response?.data?.call_log);
                toast.success(response.data.message);

            } catch (e) {
                toast.error(e.response?.data?.message || "Qo'ngiroqlar jurnali qo‘shishda xatolik!");
                console.log(e)
            } finally {
                commit("SET_LOADING", false, { root: true });
                commit("closeSidebar", false, { root: true });
            }
        },

        async deleteCallLog({ commit }, callLogId) {
            if (!confirm("Siz rostdan ham bu qongiroq tarihini o‘chirib yubormoqchimisiz?")) {
                return;
            }
            try {
                await axios.delete(`${API_URL}/${callLogId}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("jwt-token")}` },
                });
                commit("DELETE_CALLLOG", callLogId);
                toast.success("Qo'ngiroqlar jurnali muvaffaqiyatli o‘chirildi!");
            } catch (e) {
                toast.error(e.response?.data?.message || "Qo'ngiroqlar jurnalini o‘chirishda xatolik!");
            }
        },
    },
    getters: {
        callLogs: (state) => state.callLogs,
        callLogById: (state) => (id) => state.callLogs.find(callLog => callLog.id === id),
    },
};
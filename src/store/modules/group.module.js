import axios from "@/axios/settings.js";
import { useToast } from "vue-toastification";

const toast = useToast();

const API_URL = `${import.meta.env.VITE_API_URL}/groups`;

export default {
    namespaced: true,
    state() {
        return {
            groups: [],
            token: localStorage.getItem("jwt-token"),
        };
    },
    mutations: {
        SET_GROUPS(state, groups) {
            state.groups = groups;
        },
        ADD_GROUP(state, group) {
            state.groups.unshift(group);
        },
        UPDATE_GROUP(state, updatedGroup) {
            const index = state.groups.findIndex((c) => c.id === updatedGroup.id);
            if (index !== -1) state.groups.splice(index, 1, updatedGroup);
        },
        DELETE_GROUP(state, Id) {
            state.groups = state.groups.filter((group) => group.id !== Id);
        },
    },
    actions: {
        async getAllGroups({ commit }, payload) {
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
                commit("SET_GROUPS", response.data.data);
                return response.data;
            } catch (e) {
                toast.error(e.response?.data?.message || "Guruhlar malumotlarini olishda xatolik!");
            } finally {
                commit("SET_LOADING", false, { root: true });
            }
        },

        async getGroupById({ commit }, Id) {
            // commit("SET_LOADING", true, { root: true });
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
            } finally {
                commit("SET_LOADING", false, { root: true });
                commit("closeSidebar", false, { root: true });
            }
        },

        async addGroup({ commit }, group) {
            // commit("SET_LOADING", true, { root: true });
            try {
                const response = await axios.post(API_URL, group, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
                    },
                });
                commit("ADD_GROUP", response.data.group);
                console.log(response)
                toast.success(response.data.message);
            } catch (e) {
                toast.error(e.response?.data?.message || "Kurs qoshishda xatolik!");
                console.error(e)
            } finally {
                commit("SET_LOADING", false, { root: true });
                commit("closeSidebar", false, { root: true });
            }
        },

        async updateGroup({ commit }, payload) {
            console.log('updatedGroup: ', payload)
            try {
                const response = await axios.post(`${API_URL}/${payload.id}`, payload, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
                    },
                });
                commit("UPDATE_GROUP", response.data.group);
                toast.success(response?.data?.message);
            } catch (e) {
                toast.error(e.response?.data?.message || "Kursni o`zgartirishda xatolik!");
                console.log(e)
            } finally {
                commit("SET_LOADING", false, { root: true });
                commit("closeSidebar", false, { root: true });
            }
        },

        async deleteGroup({ commit }, Id) {
            if (!confirm("Siz rostdanxam bu kursni o'chirib yubormoqchimisiz??")) {
                return;
            }
            // commit("SET_LOADING", true, { root: true });
            try {
                const response = await axios.delete(`${API_URL}/${Id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("jwt-token")}` },
                });
                commit("DELETE_GROUP", Id);
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
        groups(state) {
            return state.groups
        }
    }
};

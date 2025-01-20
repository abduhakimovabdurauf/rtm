import axios from "@/axios/settings.js";
import { useToast } from "vue-toastification";

const toast = useToast();

const API_URL = `${import.meta.env.VITE_API_URL}/branches`;

export default {
    namespaced: true,
    state() {
        return {
            branches: [],
            branch: [],
        };
    },
    mutations: {
        SET_BRANCH(state, branch) {
            state.branch = branch;
        },
        SET_BRANCHES(state, branches) {
            state.branches = branches;
        },
        ADD_BRANCH(state, branch) {
            if (!Array.isArray(state.branches)) {
                state.branches = [];
            }
            state.branches.push(branch);
        },
        UPDATE_BRANCH(state, updatedBranch) {
            const index = state.branches.findIndex((c) => c.id === updatedBranch.id);
            if (index !== -1) state.branches.splice(index, 1, updatedBranch);
        },
        DELETE_BRANCH(state, branchId) {
            state.branches = state.branches.filter((branch) => branch.id !== branchId);
        },
    },
    actions: {
        async getAllBranches({ commit }) {
            try {
                const response = await axios.get(API_URL, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
                    },
                });
                console.log('branches : ',response)
                commit("SET_BRANCHES", response.data.data);
                return response.data
            } catch (e) {
                console.error(e)
                toast.error(e.response?.data?.message || "Filial malumotlarini olishda xatolik!");
            } finally {
                commit("SET_LOADING", false, { root: true });
            }
        },

        async getBranchById({ commit }, branchId) {
            commit("SET_LOADING", true, { root: true });
            try {
                const response = await axios.get(`${API_URL}/${branchId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
                    },
                });

                return response.data
            } catch (e) {
                toast.error(e.response?.data?.message || "Filial malumotini olishda xatolik!");
            } finally {
                commit("SET_LOADING", false, { root: true });
            }
        },

        async addBranch({ commit }, branch) {
            commit("SET_LOADING", true, { root: true });
            try {
                const response = await axios.post(API_URL, branch, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
                    },
                });
                console.log("added",response)
                commit("ADD_BRANCH", response.data.branch);
                toast.success(response.data.message);
            } catch (e) {
                console.error(e)
                toast.error(e.response?.data?.message || "Filial malumotlarini qoshishda xatolik!");
            } finally {
                commit("SET_LOADING", false, { root: true });
            }
        },

        async updateBranch({ commit }, updatedBranch) {
            commit("SET_LOADING", true, { root: true });
            try {
                const response = await axios.post(`${API_URL}/${updatedBranch.id}`, updatedBranch, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
                    },
                });
                commit("UPDATE_BRANCH", response.data);
                toast.success(response?.data?.message);
            } catch (e) {
                toast.error(e.response?.data?.message || "Filial malumotlarini ozgartirishda xatolik!");
            } finally {
                commit("SET_LOADING", false, { root: true });
            }
        },

        async deleteBranch({ commit }, branchId) {
            if (!confirm("Siz rostdanxam bu filialni o'chirib yubormoqchimisiz??")) {
                return;
            }
            commit("SET_LOADING", true, { root: true });
            try {
                const response = await axios.delete(`${API_URL}/${branchId}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("jwt-token")}` },
                });
                commit("DELETE_BRANCH", branchId);
                toast.success(response?.data?.message);
            } catch (e) {
                toast.error(e.response?.data?.message || "Filial malumotlarini ochirishda xatolik!");
            } finally {
                commit("SET_LOADING", false, { root: true });
            }
        },
    },
    getters: {
        branches(state) {
            return state.branches
        }
    }
};

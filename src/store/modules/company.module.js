import axios from "@/axios/settings.js";
import { useToast } from "vue-toastification";

const toast = useToast();

const API_URL = `${import.meta.env.VITE_API_URL}/companies`;

export default {
    namespaced: true,
    state() {
        return {
            companies: [],
            company: [],
        };
    },
    mutations: {
        SET_COMPANY(state, company) {
            state.company = company;
        },
        SET_COMPANIES(state, companies) {
            state.companies = companies;
        },
        ADD_COMPANY(state, company) {
            if (!Array.isArray(state.companies)) {
                state.companies = [];
            }
            state.companies.push(company);
        },
        UPDATE_COMPANY(state, updatedCompany) {
            const index = state.companies.findIndex((c) => c.id === updatedCompany.id);
            if (index !== -1) state.companies.splice(index, 1, updatedCompany);
        },
        DELETE_COMPANY(state, companyId) {
            state.companies = state.companies.filter((company) => company.id !== companyId);
        },
    },
    actions: {
        async getAllCompanies({ commit }) {
            try {
                const response = await axios.get(API_URL, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
                    },
                });
                console.log('companies : ',response)
                commit("SET_COMPANIES", response.data.data);
                return response.data
            } catch (e) {
                console.error(e)
                toast.error(e.response?.data?.message || "Kompaniyalar malumotlarini olishda xatolik!");
            } finally {
                commit("SET_LOADING", false, { root: true });
            }
        },

        async getCompanyById({ commit }, companyId) {
            commit("SET_LOADING", true, { root: true });
            try {
                const response = await axios.get(`${API_URL}/${companyId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
                    },
                });

                return response.data
            } catch (e) {
                toast.error(e.response?.data?.message || "Kompaniyalar malumotini olishda xatolik!");
            } finally {
                commit("SET_LOADING", false, { root: true });
            }
        },

        async addCompany({ commit }, company) {
            commit("SET_LOADING", true, { root: true });
            try {
                const response = await axios.post(API_URL, company, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
                    },
                });
                console.log("added",response)
                commit("ADD_COMPANY", response.data.company);
                toast.success(response.data.message);
            } catch (e) {
                console.error(e)
                toast.error(e.response?.data?.message || "Kompaniya malumotlarini qoshishda xatolik!");
            } finally {
                commit("SET_LOADING", false, { root: true });
            }
        },

        async updateCompany({ commit }, updatedCompany) {
            commit("SET_LOADING", true, { root: true });
            try {
                const response = await axios.post(`${API_URL}/${updatedCompany.id}`, updatedcompany, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
                    },
                });
                commit("UPDATE_COMPANY", response.data);
                toast.success(response?.data?.message);
            } catch (e) {
                toast.error(e.response?.data?.message || "Kompaniya malumotlarini ozgartirishda xatolik!");
            } finally {
                commit("SET_LOADING", false, { root: true });
            }
        },

        async deleteCompany({ commit }, companyId) {
            if (!confirm("Siz rostdanxam bu kompaniyani o'chirib yubormoqchimisiz??")) {
                return;
            }
            commit("SET_LOADING", true, { root: true });
            try {
                const response = await axios.delete(`${API_URL}/${companyId}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("jwt-token")}` },
                });
                commit("DELETE_COMPANY", companyId);
                toast.success(response?.data?.message);
            } catch (e) {
                toast.error(e.response?.data?.message || "Kompaniya malumotlarini ochirishda xatolik!");
            } finally {
                commit("SET_LOADING", false, { root: true });
            }
        },
    },
    getters: {
        companies(state) {
            return state.companies
        }
    }
};

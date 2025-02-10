import axios from "@/axios/settings.js";
import { useToast } from "vue-toastification";

const toast = useToast();
const API_URL = `${import.meta.env.VITE_API_URL}/students`;

export default {
    namespaced: true,
    state: () => ({
        students: []
    }),
    mutations: {
        SET_STUDENTS(state, students) {
            state.students = students;
        },
        ADD_STUDENT(state, payload) {
            state.students.push(payload);
        },
        UPDATE_STUDENT(state, payload) {
            const index = state.students.findIndex((u) => u.id === payload.id);
            if (index !== -1) state.students.splice(index, 1, payload);
        },
        DELETE_STUDENT(state, studentId) {
            state.students = state.students.filter((student) => student.id !== studentId);
        },
    },
    actions: {
        async getAllStudents({ commit },payload) {
            // commit("SET_LOADING", true, { root: true });
            try {
                const response = await axios.get(API_URL, {
                    params: {
                        page: payload.page,
                        per_page: payload.perPage,
                        sortBy: payload.sortBy,
                        orderBy: payload.orderBy,
                        key_word: payload.key
                    },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
                    },
                });
                commit("SET_STUDENTS", response.data.students.data);
                console.log("o'quvchilar",response)
                return response.data.students;
            } catch (e) {
                console.log('oquvchilar',e)
                toast.error(e.response?.data?.message || "Oquvchi malumotlarni olishda xatolik!");
            } finally {
                commit("SET_LOADING", false, { root: true });
                commit("SET_SORTLOADING", false, { root: true });
            }
        },
        async getStudentById({ commit }, Id) {
            commit("SET_LOADING", true, { root: true });
            try {
                const response = await axios.get(`${API_URL}/${Id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
                    },
                });
                return response.data;
            } catch (e) {
                toast.error(e.response?.data?.message || "Failed to fetch course!");
            } finally {
                commit("SET_LOADING", false, { root: true });
            }
        },
        async addStudent({ commit }, payload) {
            commit("SET_LOADING", true, { root: true });
            try {
                const response = await axios.post(API_URL, payload, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
                    },
                });
                commit("ADD_STUDENT", response.data.data);
                toast.success(response.data.message);
            } catch (e) {
                console.log(e)
                toast.error(e.response?.data?.message || "Xodim qo'shishda xatolik!");
            } finally {
                commit("SET_LOADING", false, { root: true });
                commit("closeSidebar", false, { root: true });
            }
        },
        async updateStudent({ commit }, payload) {
            commit("SET_LOADING", true, { root: true });
            try {
                const response = await axios.post(`${API_URL}/${payload.id}`, payload, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
                    },
                });
                commit("UPDATE_STUDENT", response.data.student);
                toast.success(response.data.message);
            } catch (e) {
                console.error(e)
                toast.error(e.response?.data?.message || "Oquvchi malumotlarini yangilashda xatolik!");
            } finally {
                commit("SET_LOADING", false, { root: true });
                commit("closeSidebar", false, { root: true });
            }
        },
        async deleteStudent({ commit }, Id) {
            commit("SET_LOADING", true, { root: true });
            try {
                const response= await axios.delete(`${API_URL}/${Id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("jwt-token")}` },
                });
                commit("DELETE_STUDENT  ", Id);
                toast.success(response.data.message);
            } catch (e) {
                toast.error(e.response?.data?.message || "O`quvchi malumotlarini o'chirishda xatolik!");
            } finally {
                commit("SET_LOADING", false, { root: true });
                commit("closeSidebar", false, { root: true });
            }
        },
    },
    getters: {
        students(state) {
            return state.students
        }
    }
};

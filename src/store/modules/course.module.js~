import axios from "@/axios/settings.js";
import { useToast } from "vue-toastification";

const toast = useToast();

const API_URL = `${import.meta.env.VITE_API_URL}/courses`;

export default {
    namespaced: true,
    state() {
        return {
            courses: [],
            course: [],
            token: localStorage.getItem("jwt-token"),
        };
    },
    mutations: {
        SET_COURSES(state, courses) {
            state.courses = courses;
        },
        ADD_COURSE(state, course) {
            state.courses.unshift(course);
        },
        UPDATE_COURSE(state, updatedCourse) {
            const index = state.courses.findIndex((c) => c.id === updatedCourse.id);
            if (index !== -1) state.courses.splice(index, 1, updatedCourse);
        },
        DELETE_COURSE(state, courseId) {
            state.courses = state.courses.filter((course) => course.id !== courseId);
        },
    },
    actions: {
        async getAllCourses({ commit }, payload) {
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
                commit("SET_COURSES", response.data.data);
                return response.data;
            } catch (e) {
                toast.error(e.response?.data?.message || "Kurslarni olishda xatolik!");
            } finally {
                commit("SET_LOADING", false, { root: true });
            }
        },

        async getCourseById({ commit }, courseId) {
            commit("SET_LOADING", true, { root: true });
            try {
                const response = await axios.get(`${API_URL}/${courseId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
                    },
                });
                return response.data;
            } catch (e) {
                toast.error(e.response?.data?.message || "Failed to fetch course!");
            } finally {
                commit("SET_LOADING", false, { root: true });
                commit("closeSidebar", false, { root: true });
            }
        },

        async addCourse({ commit }, course) {
            commit("SET_LOADING", true, { root: true });
            try {
                const response = await axios.post(API_URL, course, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
                    },
                });
                commit("ADD_COURSE", response.data.course);
                toast.success(response.data.message);
            } catch (e) {
                toast.error(e.response?.data?.message || "Kurs qoshishda xatolik!");
            } finally {
                commit("SET_LOADING", false, { root: true });
                commit("closeSidebar", false, { root: true });
            }
        },

        async updateCourse({ commit }, payload) {
            commit("SET_LOADING", true, { root: true });
            try {
                const response = await axios.post(`${API_URL}/${payload.id}`, payload, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
                    },
                });
                commit("UPDATE_COURSE", response.data.course);
                toast.success(response?.data?.message);
            } catch (e) {
                toast.error(e.response?.data?.message || "Kursni o`zgartirishda xatolik!");
            } finally {
                commit("SET_LOADING", false, { root: true });
                commit("closeSidebar", false, { root: true });
            }
        },

        async deleteCourse({ commit }, courseId) {
            if (!confirm("Siz rostdanxam bu kursni o'chirib yubormoqchimisiz??")) {
                return;
            }
            commit("SET_LOADING", true, { root: true });
            try {
                const response = await axios.delete(`${API_URL}/${courseId}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("jwt-token")}` },
                });
                commit("DELETE_COURSE", courseId);
                toast.success(response?.data?.message);
            } catch (e) {
                toast.error(e.response?.data?.message || "Failed to delete course!");
            } finally {
                commit("SET_LOADING", false, { root: true });
                commit("closeSidebar", false, { root: true });
            }
        },
    },
    getters: {
        courses(state) {
            return state.courses
        }
    }
};

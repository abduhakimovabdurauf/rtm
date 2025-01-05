import axios from "@/axios/settings.js";
import { useToast } from "vue-toastification";

const toast = useToast();

const API_URL = `${import.meta.env.VITE_API_URL}/tasks`;

export default {
    namespaced: true,
    state() {
        return {
            tasks: [],
            task: [],
        };
    },
    mutations: {
        SET_TASK(state, task) {
            state.task = task;
        },
        SET_TASKS(state, tasks) {
            state.tasks = tasks;
        },
        ADD_TASK(state, task) {
            if (!Array.isArray(state.tasks)) {
                state.tasks = [];
            }
            state.tasks.push(task);
        },
        UPDATE_TASK(state, updatedTask) {
            const index = state.tasks.findIndex((c) => c.id === updatedTask.id);
            if (index !== -1) state.tasks.splice(index, 1, updatedTask);
        },
        DELETE_TASK(state, taskId) {
            state.tasks = state.tasks.filter((task) => task.id !== taskId);
        },
    },
    actions: {
        async getAllTasks({ commit }) {
            // commit("SET_LOADING", true, { root: true });
            try {
                const response = await axios.get(API_URL, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
                    },
                });
                console.log('tasks : ',response)
                commit("SET_TASKS", response.data.data);
                return response.data
            } catch (e) {
                console.error(e)
                toast.error(e.response?.data?.message || "Topshiriqlar royhatini olishda xatolik!");
            } finally {
                commit("SET_LOADING", false, { root: true });
            }
        },

        async getTaskById({ commit }, taskId) {
            commit("SET_LOADING", true, { root: true });
            try {
                const response = await axios.get(`${API_URL}/${taskId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
                    },
                });

                return response.data
            } catch (e) {
                toast.error(e.response?.data?.message || "Topshiriqlar malumotlarini olishda xatolik!");
            } finally {
                commit("SET_LOADING", false, { root: true });
            }
        },

        async addTask({ commit }, task) {
            commit("SET_LOADING", true, { root: true });
            try {
                const response = await axios.post(API_URL, task, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
                    },
                });
                console.log("added",response)
                commit("ADD_TASK", response.data.task);
                commit("closeSidebar");
                toast.success(response.data.message);
            } catch (e) {
                console.error(e)
                toast.error(e.response?.data?.message || "Topshiriq malumotlarini qoshishda xatolik!");
            } finally {
                commit("SET_LOADING", false, { root: true });
            }
        },

        async updateTask({ commit }, updatedTask) {
            commit("SET_LOADING", true, { root: true });
            try {
                const response = await axios.post(`${API_URL}/${updatedTask.id}`, updatedTask, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
                    },
                });
                commit("UPDATE_TASK", response.data);
                toast.success(response?.data?.message);
            } catch (e) {
                toast.error(e.response?.data?.message || "Topshiriq malumotlarini ozgartirishda xatolik!");
            } finally {
                commit("SET_LOADING", false, { root: true });
            }
        },

        async deleteTask({ commit }, taskId) {
            if (!confirm("Siz rostdanxam bu topshiriqni o'chirib yubormoqchimisiz??")) {
                return;
            }
            commit("SET_LOADING", true, { root: true });
            try {
                const response = await axios.delete(`${API_URL}/${taskId}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("jwt-token")}` },
                });
                commit("DELETE_TASK", taskId);
                toast.success(response?.data?.message);
            } catch (e) {
                toast.error(e.response?.data?.message || "Topshiriq malumotlarini ochirishda xatolik!");
            } finally {
                commit("SET_LOADING", false, { root: true });
            }
        },
    },
    getters: {
        tasks(state) {
            return state.tasks
        }
    }
};

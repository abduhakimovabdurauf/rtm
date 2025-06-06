import axios from "@/axios/settings.js";
import { useToast } from "vue-toastification";

const toast = useToast();

const API_URL = `${import.meta.env.VITE_API_URL}/rooms`;

export default {
    namespaced: true,
    state() {
        return {
            rooms: [],
            room: [],
        };
    },
    mutations: {
        SET_ROOM(state, room) {
            state.room = room;
        },
        SET_ROOMS(state, rooms) {
            state.rooms = rooms;
        },
        ADD_ROOM(state, room) {
            if (!Array.isArray(state.rooms)) {
                state.rooms = [];
            }
            state.rooms.unshift(room);
        },
        UPDATE_ROOM(state, updatedRoom) {
            const index = state.rooms.findIndex((c) => c.id === updatedRoom.id);
            if (index !== -1) state.rooms.splice(index, 1, updatedRoom);
        },
        DELETE_ROOM(state, roomId) {
            state.rooms = state.rooms.filter((room) => room.id !== roomId);
        },
    },
    actions: {
        async getAllRooms({ commit }) {
            // commit("SET_LOADING", true, { root: true });
            try {
                const response = await axios.get(API_URL, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
                    },
                });
                commit("SET_ROOMS", response.data.rooms.data);
                return response.data.rooms
            } catch (e) {
                toast.error(e.response?.data?.message || "Xonalarni olishda xatolik!");
            } finally {
                commit("SET_LOADING", false, { root: true });
            }
        },

        async getRoomById({ commit }, roomId) {
            commit("SET_LOADING", true, { root: true });
            try {
                const response = await axios.get(`${API_URL}/${roomId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
                    },
                });

                return response.data
            } catch (e) {
                toast.error(e.response?.data?.message || "Xonalarni olishda xatolik!");
            } finally {
                commit("SET_LOADING", false, { root: true });
            }
        },

        async addRoom({ commit }, room) {
            commit("SET_LOADING", true, { root: true });
            try {
                const response = await axios.post(API_URL, room, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
                    },
                });
                commit("ADD_ROOM", response.data.room);
                toast.success(response.data.message);
            } catch (e) {
                toast.error(e.response?.data?.message || "Xona qoshishda xatolik!");
            } finally {
                commit("SET_LOADING", false, { root: true });
                commit("closeSidebar", false, { root: true });
            }
        },

        async updateRoom({ commit }, updatedRoom) {
            commit("SET_LOADING", true, { root: true });
            try {
                const response = await axios.post(`${API_URL}/${updatedRoom.id}`, updatedRoom, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
                    },
                });
                commit("UPDATE_ROOM", response.data.room);
                toast.success(response?.data?.message);
            } catch (e) {
                toast.error(e.response?.data?.message || "Xonani ozgartirishda xatolik!");
            } finally {
                commit("SET_LOADING", false, { root: true });
                commit("closeSidebar", false, { root: true });
            }
        },

        async deleteRoom({ commit }, roomId) {
            if (!confirm("Siz rostdanxam bu xonani o'chirib yubormoqchimisiz??")) {
                return;
            }
            commit("SET_LOADING", true, { root: true });
            try {
                const response = await axios.delete(`${API_URL}/${roomId}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("jwt-token")}` },
                });
                commit("DELETE_ROOM", roomId);
                toast.success(response?.data?.message);
            } catch (e) {
                toast.error(e.response?.data?.message || "Xonani ochirishda xatolik!");
            } finally {
                commit("SET_LOADING", false, { root: true });
                commit("closeSidebar", false, { root: true });
            }
        },
    },
    getters: {
        rooms(state) {
            return state.rooms
        }
    }
};

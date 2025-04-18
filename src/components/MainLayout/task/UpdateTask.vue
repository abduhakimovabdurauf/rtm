<template>
  <div>
    <form @submit.prevent="handleSubmit" class="overflow-scroll pb-2">

      <div>
        <label for="title" class="block text-sm font-medium text-gray-700">Nomi</label>
        <input
            type="text"
            id="title"
            v-model="form.title"
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label for="text" class="block text-sm font-medium text-gray-700">Matn</label>
        <input
            type="text"
            id="text"
            v-model="form.text"
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label for="deadline" class="block text-sm font-medium text-gray-700">Muhlat</label>
        <input
            type="date"
            id="deadline"
            v-model="form.deadline"
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
        <select
            id="status"
            v-model="form.status"
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="completed">Bajarildi</option>
          <option value="pending">Bajarilmoqda</option>
          <option value="inactive">Faol emas</option>
        </select>
      </div>

      <div>
        <label for="description" class="block text-sm font-medium text-gray-700">Tavsif</label>
        <textarea
            id="description"
            v-model="form.description"
            rows="4"
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        ></textarea>
      </div>

      <div class="flex justify-between items-center">
        <button
            type="submit"
            :disabled="!isFormChanged"
            class="w-full px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-2 mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Saqlash
        </button>
      </div>
    </form>
  </div>
</template>


<script>
import { ref, watch, computed } from 'vue';
import { useStore } from 'vuex';

export default {
  props: {
    taskId: {
      type: Number,
      required: true,
    },
  },
  emits: ['close'],
  setup(props,{ emit }) {
    const store = useStore();

    const selectedTask = computed(() =>
        store.state.task.tasks.find((task) => task.id === props.taskId)
    );

    const form = ref({
      title: '',
      text: '',
      deadline: '',
      description: '',
      id: props.taskId,
      status: '',
    });

    const initialForm = ref({});

    watch(
        selectedTask,
        (task) => {
          if (task) {
            form.value = { ...task };
            initialForm.value = { ...task };
          }
        },
        { immediate: true }
    );

    const isFormChanged = computed(() => {
      const { title, text, deadline, description } = form.value;
      const { title: initTitle, text: initText, deadline: initDeadline, description: initDescription } = initialForm.value;

      return (
          title !== initTitle ||
          text !== initText ||
          deadline !== initDeadline ||
          description !== initDescription
      );
    });

    const handleSubmit = () => {
      const updatedTask = {
        ...form.value,
        id: props.taskId,
      };
      store.dispatch('task/updateTask', updatedTask);
      closeModal();
    };

    function closeModal() {
      emit('close');
    }

    return {
      form,
      handleSubmit,
      isFormChanged,
    };
  },
};
</script>

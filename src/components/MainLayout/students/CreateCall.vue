<template>
  <form @submit.prevent="handleSubmit">
    <div class="mb-4">
      <label for="status" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Holat</label>
      <select
          v-model="newCallLog.status"
          id="status"
          class="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
      >
        <option value="answered">Javob berildi</option>
        <option value="no_answer">Javob berilmadi</option>
        <option value="busy">Band</option>
        <option value="call_back">Qaytarildi</option>
      </select>
    </div>

    <div class="mb-4">
      <label for="notes" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Eslatmalar</label>
      <textarea
          v-model="newCallLog.notes"
          id="notes"
          rows="3"
          class="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
      >

      </textarea>
    </div>
    <div class="flex justify-end">
      <button
          type="submit"
          class="w-full bg-blue-600 text-white px-4 py-2 mb-14 rounded-lg"
      >
        Qo'shish
      </button>
    </div>
  </form>
</template>

<script>
import { reactive } from 'vue';
import { useStore } from 'vuex';
import Multiselect from '@vueform/multiselect';
import '@vueform/multiselect/themes/default.css';

export default {
  components: {
    Multiselect,
  },
  props: {
    branchId:{
      type: Number,
      required: true
    },
    studentId: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const store = useStore();
    const activeUser = JSON.parse(localStorage.getItem("user"));

    const newCallLog = reactive({
      branch_id: props.branchId,
      user_id: activeUser.id,
      student_id: props.studentId,
      notes: "",
      status: 'answered',
    });


    const handleSubmit = async () => {
      console.log('branchId: ', newCallLog.branch_id);
      const formData = new FormData();
      formData.append("branch_id", newCallLog.branch_id);
      formData.append("user_id", newCallLog.user_id);
      formData.append("student_id", newCallLog.student_id);
      formData.append("status", newCallLog.status);

      await store.dispatch('callLog/addCallLog', formData);
      Object.keys(newCallLog).forEach((key) => {
        newCallLog[key] = key === 'status' ? 'active' : '';
      });
    };

    return {
      newCallLog,
      handleSubmit,
    };
  },
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="mb-4">
      <label for="branch_id" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Filial ID</label>
      <div v-if="branches==null">
        <span class="text-gray-600">Malumotlar yuklanmoqda...</span>
      </div>
      <select
          id="branch_id"
          required
          v-else-if="branches && branches.data && branches.data.length > 0"
          v-model="newCourse.branch_id"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <option v-for="branch in branches.data" :key="branch.id" :value="branch.id">
          {{ branch.name }}
        </option>
      </select>

      <div v-else>
        <span class="text-gray-600">Malumotlar mavjud emas! :(</span>
      </div>
    </div>


    <div class="mb-4">
      <label for="student_id" class="block text-sm font-medium text-gray-700 dark:text-gray-300">O'quvchi ID</label>
      <div v-if="students==null">
        <span class="text-gray-600">Malumotlar yuklanmoqda...</span>
      </div>

      <Multiselect
          v-model="newCourse.student_id"
          :options="studentsList"
          label="full_name"
          :searchable="true"
          :close-on-select="true"
          v-else-if="students && students.data && students.data.length > 0"
          placeholder="O'quvchini tanlang..."
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />

      <div v-else>
        <span class="text-gray-600">Malumotlar mavjud emas! :(</span>
      </div>
    </div>

    <div class="mb-4">
      <label for="status" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Holat</label>
      <select
          v-model="newCourse.status"
          id="status"
          class="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
      >
        <option value="answered">Javob berildi</option>
        <option value="no_answer">Javob berilmadi</option>
        <option value="busy">Band</option>
        <option value="call_back">Javob berilmadi</option>
      </select>
    </div>

    <div class="flex justify-end">
      <button
          type="submit"
          :disabled="!isFormValid"
          class="w-full bg-blue-600 text-white px-4 py-2 mb-14 rounded-lg"
          :class="{ 'opacity-50 cursor-not-allowed': !isFormValid }"
      >
        Qo'shish
      </button>
    </div>
  </form>
</template>

<script>
import {reactive, computed, ref, onMounted} from 'vue';
import { useStore } from 'vuex';
import Multiselect from '@vueform/multiselect';
import '@vueform/multiselect/themes/default.css';

export default {
  components: {
    Multiselect,
  },
  setup() {
    const store = useStore();
    const activeUser = JSON.parse(localStorage.getItem("user"))
    const newCourse = reactive({
      branch_id: '',
      user_id: activeUser.id,
      student_id: '',
      status: 'answered',
    });
    const branches = ref(null);
    const students = ref(null)
    const fetchData = async () => {
      try {
        branches.value = await store.dispatch("branch/getAllBranches");
        newCourse.branch_id = branches.value.data[0].id;
        students.value = await store.dispatch("student/getAllStudents", {
          page: 1,
        });
        newCourse.student_id = students.value.data[0].id;
        // console.log(branches.value)

        newCourse.branch_id = branches.value.data[0].id;
      } catch (error) {
        console.error("Xatolik yuz berdi:", error);
      }
    };

    const studentsList = computed(() => {
      if (!students.value || !students.value.data) return [];
      return students.value.data.map(student => ({
        value: student.id,
        full_name: student.full_name,
      }));
    });

    onMounted(fetchData);



    const isFormValid = computed(() => {
      return (
          newCourse.branch_id &&
          newCourse.status &&
          newCourse.student_id
      );
    });


    const handleSubmit = async () => {
      try {
        if (!isFormValid.value) return;
        const formData = new FormData();
        Object.entries(newCourse).forEach(([key, value]) => {
          formData.append(key, value);
        });
        await store.dispatch('callLog/addCallLog', formData);
        Object.keys(newCourse).forEach((key) => {
          newCourse[key] = key === 'status' ? 'active' : '';
        });
      } catch (e) {
        console.error(e);
      }
    };

    return {
      newCourse,
      handleSubmit,
      isFormValid,
      branches,
      students,
      studentsList,
    };
  },
};
</script>

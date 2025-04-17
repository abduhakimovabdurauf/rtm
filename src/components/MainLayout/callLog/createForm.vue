<template>
  <form @submit.prevent="handleSubmit">
    <div class="mb-4">
      <label for="branch_id" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Filial</label>
      <div v-if="branches == null">
        <span class="text-gray-600">Ma'lumotlar yuklanmoqda...</span>
      </div>
      <select
          id="branch_id"
          required
          v-else-if="branches && branches.data && branches.data.length > 0"
          v-model="selectedBranchId"
          @change="fetchBranchStudents"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <option v-for="branch in branches.data" :key="branch.id" :value="branch.id">
          {{ branch.name }}
        </option>
      </select>

      <div v-else>
        <span class="text-gray-600">Ma'lumotlar mavjud emas! :(</span>
      </div>
    </div>

    <div class="mb-4">
      <label for="student_id" class="block text-sm font-medium text-gray-700 dark:text-gray-300">O'quvchi ID</label>
      <div v-if="students == null">
        <span class="text-gray-600">Ma'lumotlar yuklanmoqda...</span>
      </div>

      <Multiselect
          v-model="newCallLog.student_id"
          :options="studentsList"
          label="full_name"
          :searchable="true"
          :close-on-select="true"
          v-else-if="students && students.length > 0"
          placeholder="O'quvchini tanlang..."
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />

      <div v-else-if="!selectedBranchId">
        O'quvchini tanlash uchun avval filialni tanlang!
      </div>

      <div v-else>
        <span class="text-gray-600">Bu Filial da o'quvchilar yo'q :(</span>
      </div>
    </div>

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
import { reactive, computed, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import Multiselect from '@vueform/multiselect';
import '@vueform/multiselect/themes/default.css';

export default {
  components: {
    Multiselect,
  },
  setup() {
    const store = useStore();
    const activeUser = JSON.parse(localStorage.getItem("user"));

    const selectedBranchId = ref('');
    const newCallLog = reactive({
      branch_id: '',
      user_id: activeUser.id,
      student_id: '',
      notes: '',
      status: 'answered',
    });

    const branches = ref(null);
    const students = ref([]);

    const fetchBranches = async () => {
      try {
        branches.value = await store.dispatch("branch/getAllBranches");
        if (branches.value.data.length > 0) {
          selectedBranchId.value = branches.value.data[0].id;
          await fetchBranchStudents();
        }
      } catch (error) {
        console.error("Xatolik yuz berdi:", error);
      }
    };

    const fetchBranchStudents = async () => {
      newCallLog.branch_id = selectedBranchId.value;
      try {
        if (!selectedBranchId.value) return;
        const response = await store.dispatch("branch/getBranchById", selectedBranchId.value);
        students.value = response.students || [];
      } catch (error) {
        console.error("Xatolik yuz berdi:", error);
      }
    };

    onMounted(fetchBranches);

    const studentsList = computed(() => {
      return students.value.map(student => ({
        value: student?.id,
        full_name: student?.full_name,
      }));
    });

    const isFormValid = computed(() => {
      return newCallLog.branch_id && newCallLog.status && newCallLog.student_id;
    });


    const handleSubmit = async () => {
        // if (!isFormValid.value) return;
      console.log('branchId: ', newCallLog.branch_id);
      const formData = new FormData();
      formData.append("branch_id", newCallLog.branch_id);
      formData.append("user_id", newCallLog.user_id);
      formData.append("student_id", newCallLog.student_id);
      formData.append("notes", newCallLog.notes);
      formData.append("status", newCallLog.status);

      await store.dispatch('callLog/addCallLog', formData);
        Object.keys(newCallLog).forEach((key) => {
          newCallLog[key] = key === 'status' ? 'active' : '';
        });
    };

    return {
      newCallLog,
      handleSubmit,
      isFormValid,
      branches,
      students,
      studentsList,
      selectedBranchId,
      fetchBranchStudents,
    };
  },
};
</script>
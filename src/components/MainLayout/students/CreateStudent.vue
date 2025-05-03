  <template>
    <form @submit.prevent="handleSubmit">

      <div class="mb-4">
        <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Ismi</label>
        <input
            v-model="newStudent.full_name"
            type="text"
            id="name"
            class="block w-full p-2 mt-1 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      <div class="mb-4">
        <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Telefon</label>
        <input
            v-model="newStudent.phone"
            @input="newStudent.phone = formatPhone(newStudent.phone)"
            type="tel"
            id="phone"
            maxlength="14"
            autocomplete="off"
            class="block w-full p-2 mt-1 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div class="mb-4">
        <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Ota-Ona telefoni</label>
        <input
            v-model="newStudent.parent_phone"
            @input="newStudent.parent_phone = formatPhone(newStudent.parent_phone)"
            type="text"
            id="phone"
            maxlength="14"
            class="block w-full p-2 mt-1 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <label for="crmdigital" class="inline-flex items-center mb-2 cursor-pointer">
        <input
          type="checkbox"
          :checked="newStudent.crmdigital === '1'"
          id="crmdigital"
          @change="newStudent.crmdigital = $event.target.checked ? '1' : '0'"
          class="sr-only peer"
        />

        <div class="relative w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
        <span class="text-sm font-medium text-gray-900 ms-3 dark:text-gray-300">Tizimga kiritilganmi ?</span>
      </label>

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Filial</label>
        <select
            v-if="branches?.data?.length"
            v-model="newStudent.branch_id"
            class="w-full p-2 mt-1 text-gray-700 bg-gray-100 border rounded-md dark:bg-gray-800 dark:text-gray-300 focus:ring focus:ring-blue-500"
        >
          <option v-for="branch in branches.data" :key="branch.id" :value="branch.id">
            {{ branch.name }}
          </option>
        </select>
      </div>


      <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Kurslar</label>
      <div v-if="courses?.data?.length" class="flex flex-wrap gap-3">
        <div v-for="course in courses.data" :key="course.id" class="flex items-center p-2 space-x-2 bg-gray-100 rounded-md shadow-sm dark:bg-gray-800">
          <input
              type="checkbox"
              :id="'course_' + course.id"
              :value="course.id"
              v-model="newStudent.courses"
              class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
          <label :for="'course_' + course.id" class="cursor-pointer text-sm text-gray-700 dark:text-gray-300 truncate max-w-[150px]">
            {{ course.name }}
          </label>
        </div>
      </div>
    </div>



      <label for="showOptional" class="inline-flex items-center mb-2 cursor-pointer">
        <input type="checkbox" id="showOptional" v-model="showOptionalFields" class="sr-only peer">
        <div class="relative w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
        <span class="text-sm font-medium text-gray-900 ms-3 dark:text-gray-300">Qo‘shimcha ma’lumotlar</span>
      </label>


      <div v-if="showOptionalFields">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <input
              v-model="newStudent.email"
              type="email"
              id="email"
              class="block w-full p-2 mt-1 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div class="mb-4">
          <label for="address" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Manzili</label>
          <input
              v-model="newStudent.address"
              type="text"
              id="address"
              class="block w-full p-2 mt-1 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div class="mb-4">
          <label for="links" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Havolalar</label>
          <input
              v-model="newStudent.links"
              type="text"
              id="links"
              class="block w-full p-2 mt-1 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div class="mb-4">
          <label for="birthday" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tug'ilgan sana</label>
          <Datepicker v-model="newStudent.birthday" />
        </div>

        <div class="mb-4">
          <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tavsif</label>
          <textarea
              v-model="newStudent.description"
              id="description"
              rows="3"
              class="block w-full p-2 mt-1 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          ></textarea>
        </div>
        <div class="mb-4">
          <label for="from" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Dan</label>
          <select
              v-model="newStudent.from"
              id="gender"
              class="block w-full p-2 mt-1 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="tanish">tanish</option>
            <option value="maktab">maktab</option>
            <option value="telegram">telegram</option>
            <option value="instagram">instagram</option>
            <option value="facebook">facebook</option>
            <option value="ota-onam">ota-onam</option>
            <option value="tashqi reklama">tashqi reklama</option>
          </select>
        </div>
        <div class="mb-4">
          <label for="gender" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Jinsi</label>
          <select
              v-model="newStudent.gender"
              id="gender"
              class="block w-full p-2 mt-1 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="man">Erkak</option>
            <option value="woman">Ayol</option>
          </select>
        </div>

        <div class="mb-4">
          <label for="image" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Rasm Yuklash</label>
          <input
              type="file"
              id="image"
              multiple
              ref="image"
              accept="image/*"
              @change="handleImageUpload"
              class="block w-full p-2 mt-1 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>





      <div class="flex justify-end mb-20">
        <button
            type="submit"
            :disabled="!isFormValid"
            class="w-full px-4 py-2 text-white bg-blue-600 rounded-lg"
            :class="{ 'opacity-50 cursor-not-allowed': !isFormValid }"
        >
          Qo'shish
        </button>
      </div>
    </form>
  </template>
  <script>
  import {reactive, computed, onMounted, ref} from 'vue';
  import { useStore } from 'vuex';
  import Datepicker from '@vuepic/vue-datepicker'
  import '@vuepic/vue-datepicker/dist/main.css'
  export default {
    emits: ['close'],
    components: {
      Datepicker
    },
    setup(_, { emit }) {
      const store = useStore();
      const activeUser = JSON.parse(localStorage.getItem("user"))
      const newStudent = reactive({
        full_name: '',
        branch_id: '',
        email: '',
        phone: '',
        address: '',
        links: '',
        birthday: '',
        gender: 'man',
        from: 'tanish',
        status: 'active',
        parent_phone: '',
        crmdigital: '0',
        description: '',
        images: [],
        courses: [],
        user_id: activeUser.id,
      });
      
      const branches = ref(null);
      const courses = ref(null)
      const fetchData = async () => {
        try {
          branches.value = await store.dispatch("branch/getAllBranches");
          newStudent.branch_id = branches?.value?.data[0].id
          courses.value = await store.dispatch("course/getAllCourses");
        } catch (error) {
          console.error("Xatolik yuz berdi:", error);
        }
      };

      onMounted(fetchData);
      const isFormValid = computed(() => {
        return (
            newStudent.full_name.trim() &&
            newStudent.phone.trim()
        );
      });

      const formatDate = (field) => {
        const value = this.newStudent[field];
        if (value) {
          const [year, month, day] = value.split('-');
          this.newStudent[field] = `${year}-${month}-${day}`;
        }
      }

      const convertImagesToBase64 = (files) => {
        return Promise.all(
            files.map(file => {
              return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result); // Base64 string
                reader.onerror = error => reject(error);
                reader.readAsDataURL(file);
              });
            })
        );
      };

      const formatPhone = (value) => {
        let digits = value.replace(/\D/g, '');
        let match = digits.match(/^(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})$/);

        if (!match) return value;

        return !match[2]
            ? match[1]
            : `(${match[1]}) ${match[2]}${match[3] ? '-' + match[3] : ''}${match[4] ? '-' + match[4] : ''}`;
      };



      const handleSubmit = async () => {
        try {
          let imagesBase64 = [];

          if (newStudent.images && newStudent.images.length > 0) {
            imagesBase64 = await convertImagesToBase64(newStudent.images);
          }

          const payload = {
            branch_id: newStudent.branch_id,
            courses:JSON.stringify(newStudent.courses),
            full_name: newStudent.full_name,
            parent_phone: newStudent.parent_phone,
            crmdigital:newStudent.crmdigital,
            email: newStudent.email,
            phone: newStudent.phone,
            description: newStudent.description,
            address: newStudent.address,
            birthday: newStudent.birthday,
            gender: newStudent.gender,
            from: newStudent.from,
            links: newStudent.links,
            status: newStudent.status,
            user_id: newStudent.user_id,
            images: imagesBase64
          };
          console.log('submitted data: ', payload);
          await store.dispatch('student/addStudent', payload);

          console.log(payload);
          closeModal();

          newStudent.full_name = '';
          newStudent.email = '';
          newStudent.phone = '';
          newStudent.address = '';
          newStudent.links = '';
          newStudent.birthday = '';
          newStudent.from = '';
          newStudent.gender = '';
          newStudent.work_start = '';
          newStudent.work_end = '';
          newStudent.status = 'active';
          newStudent.description = '';
          newStudent.images = null;
        } catch (e) {
          console.error(e);
        }
      };

      const showOptionalFields = ref(false);

      const handleImageUpload = (event) => {
        const files = event.target.files;
        if (files.length) {
          newStudent.images = Array.from(files);
        }
      };


      function closeModal() {
        emit('close');
      }

      return {
        newStudent,
        handleSubmit,
        closeModal,
        handleImageUpload,
        formatDate,
        formatPhone,
        isFormValid,
        branches,
        showOptionalFields,
        courses,
      };
    },
  };
  </script>
<template>
  <div>
    <form class="overflow-scroll pb-2">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Nomi</label>
        <input
            type="text"
            id="name"
            v-model="course?.name"
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label for="duration" class="block text-sm font-medium text-gray-700">Davomiyligi</label>
        <input
            type="number"
            id="duration"
            v-model="course?.duration"
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label for="price" class="block text-sm font-medium text-gray-700">Narxi</label>
        <input
            type="number"
            id="price"
            v-model="course?.price"
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
        <input
            type="text"
            v-model="course?.status"
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            id="status"
        >
      </div>

      <div>
        <label for="description" class="block text-sm font-medium text-gray-700">Tavsif</label>
        <textarea
            id="description"
            v-model="course?.description"
            rows="4"
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        ></textarea>
      </div>
      <div>
        <div class="mt-2">
          <img
              class="w-28"
              :src="course?.image ? 'http://192.168.11.71:8000/storage/' + course.image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFrS3DfXBwOlJdjx8cnKEiSIxaPPnoMOgOvGbhNGz_7rY0DiQUcAcMkiCf_5kkpkH7E18&usqp=CAU'"
              alt="Course Image"
          />

        </div>
      </div>
    </form>
  </div>
</template>

<script>
import {useStore} from "vuex";
import {computed, onMounted} from "vue";

export default {
  props: {
    courseId: Number,
  },
  setup(props) {
    const store = useStore()
    const course = computed(() => store.state.course.selectedCourse);

    onMounted(async () => {
      await store.dispatch('course/getCourseById', props.courseId);
    });


    return {
      course,
    }
  }
}
</script>
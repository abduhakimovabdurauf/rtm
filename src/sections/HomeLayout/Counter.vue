<template>
  <div class="flex flex-col justify-evenly items-center p-5 mt-8" id="about">
    <h1 class="text-4xl w-11/12 mb-8 text-[#2c3e50] text-left font-bold">Biz haqimizda raqamlarda</h1>
    <div class="flex justify-between flex-wrap w-11/12">
      <div class="bg-[#fcf8f8] rounded-lg m-2 text-center cursor-pointer flex-1 pt-5 h-[220px] w-[280px] min-w-[250px] transition-shadow duration-300 hover:shadow-md" ref="pupilCount">
        <img src="../../assets/images/counter/pupil.png" class="w-14 h-14 mb-3 mx-auto">
        <p ref="pupilCountValue" class="text-3xl font-bold text-[#2c3e50] mb-1">0</p>
        <p class="text-lg text-[#2c3e50]">O'quvchilar soni</p>
      </div>
      <div class="bg-[#fcf8f8] rounded-lg m-2 text-center cursor-pointer flex-1 pt-5 h-[220px] w-[280px] min-w-[250px] transition-shadow duration-300 hover:shadow-md" ref="gradCount">
        <img src="../../assets/images/counter/grad.png" class="w-14 h-14 mb-3 mx-auto">
        <p ref="gradCountValue" class="text-3xl font-bold text-[#2c3e50] mb-1">0</p>
        <p class="text-lg text-[#2c3e50]">Bitiruvchilar soni</p>
      </div>
      <div class="bg-[#fcf8f8] rounded-lg m-2 text-center cursor-pointer flex-1 pt-5 h-[220px] w-[280px] min-w-[250px] transition-shadow duration-300 hover:shadow-md" ref="teacherCount">
        <img src="../../assets/images/counter/teacher.png" class="w-14 h-14 mb-3 mx-auto">
        <p ref="teacherCountValue" class="text-3xl font-bold text-[#2c3e50] mb-1">0</p>
        <p class="text-lg text-[#2c3e50]">Bizning jamoa</p>
      </div>
      <div class="bg-[#fcf8f8] rounded-lg m-2 text-center cursor-pointer flex-1 pt-5 h-[220px] w-[280px] min-w-[250px] transition-shadow duration-300 hover:shadow-md" ref="coursesCount">
        <img src="../../assets/images/counter/courses.png" class="w-14 h-14 mb-3 mx-auto">
        <p ref="coursesCountValue" class="text-3xl font-bold text-[#2c3e50] mb-1">0</p>
        <p class="text-lg text-[#2c3e50]">Kurslar soni</p>
      </div>
    </div>
  </div>
</template>

<script>
import { startCounter } from '@/counter.js'

export default {
  data() {
    return {
      hasStartedCounting: false,
    };
  },
  mounted() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.startCounting();
        }
      });
    });

    observer.observe(this.$el);
  },
  methods: {
    startCounting() {
      if (this.hasStartedCounting) {
        this.resetCounts();
      }
      this.hasStartedCounting = true;
      startCounter(this.$refs.pupilCountValue, 250, 2000);
      startCounter(this.$refs.gradCountValue, 3200, 2000);
      startCounter(this.$refs.teacherCountValue, 30, 2000);
      startCounter(this.$refs.coursesCountValue, 12, 2000);
    },
    resetCounts() {
      this.$refs.pupilCountValue.textContent = 0;
      this.$refs.gradCountValue.textContent = 0;
      this.$refs.teacherCountValue.textContent = 0;
      this.$refs.coursesCountValue.textContent = 0;
      this.hasStartedCounting = false;
    }
  }
};
</script>

<style scoped>
/* Maxsus styling kerak bo'lmasa, hammasini Tailwind bilan bajardingiz */
</style>

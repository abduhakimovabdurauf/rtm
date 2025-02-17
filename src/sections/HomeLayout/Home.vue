<template>
  <div class="home content flex justify-center w-full h-[590px]">
    <div class="home__row flex flex-col justify-end items-start w-[90%] h-full">
      <p class="home__subtitle text-base font-medium leading-5 animate__animated animate__bounceInLeft" :class="{ 'animate__animated animate__bounceInLeft': isMounted }">
        Raqamli Texnologiyalar Markazi
      </p>
      <h1 class="home__title text-left w-full max-w-[700px] h-[110px] text-[65px] leading-[65px] mt-2 relative font-bold">
        {{ displayedTitle }}
        <span class="cursor inline-block opacity-100 transition-opacity duration-300" :class="{ 'active': isCursorActive }">|</span>  
      </h1>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import 'animate.css';

export default {
  setup(props, { emit }) {
    const title = "Kelajakka ishonchli qadam!";
    const displayedTitle = ref("");
    const currentIndex = ref(0);
    const isCursorActive = ref(true);
    const isMounted = ref(false);

    onMounted(() => {
      setTimeout(() => {
        startAnimation();
      }, 1600);
      blinkCursor();
      emit('loaded');
      isMounted.value = true;
      setInterval(() => {
        startAnimation();
      }, 10000);
    });

    const startAnimation = () => {
      displayedTitle.value = "";
      currentIndex.value = 0;
      animateText();
    };

    const animateText = () => {
      if (currentIndex.value < title.length) {
        displayedTitle.value += title[currentIndex.value];
        currentIndex.value++;
        setTimeout(animateText, 85);
      }
    };

    const blinkCursor = () => {
      setInterval(() => {
        isCursorActive.value = !isCursorActive.value;
      }, 500);
    };

    return {
      displayedTitle,
      isCursorActive,
      isMounted
    };
  },
};
</script>

<style scoped>
.cursor.active {
  opacity: 1;
}

.cursor:not(.active) {
  opacity: 0;
}
</style>

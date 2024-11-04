<template>
  <button v-show="showButton" @click="scrollToTop" class="scroll-to-top">
    <svg class="progress-circle" width="70" height="70" viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="20" class="circle-bg" />
      <circle cx="25" cy="25" r="20" class="circle-progress" :style="circleStyle" />
    </svg>
    <i class='bx bx-up-arrow-alt'></i>
  </button>
</template>

<script>
import {computed, onMounted, ref} from "vue";

export default {
  setup() {
    const showButton = ref(false);
    const scrollPercent = ref(0);

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollPercent.value = (scrollTop / documentHeight) * 100;

      showButton.value = scrollTop > 300;
    };

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
    });

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };

    const circleStyle = computed(() => {
      const radius = 20;
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - (scrollPercent.value / 100) * circumference;

      return {
        strokeDasharray: `${circumference} ${circumference}`,
        strokeDashoffset: offset,
      };
    });

    return {
      showButton,
      scrollToTop,
      circleStyle,
    }
  }
}
</script>

<style scoped>
.scroll-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 70px;
  height: 70px;
  background-color: #fff;
  color: #046b00;
  border: none;
  border-radius: 50%;
  font-size: 25px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.4);
  opacity: 1;
  transition: opacity 0.3s ease;
  z-index: 1000;
}

.scroll-to-top:hover {
  opacity: 1;
}

.scroll-to-top:focus {
  outline: none;
}

.progress-circle {
  position: absolute;
  top: 0;
  left: 0;
  transform: rotate(-90deg);
}

.circle-bg {
  fill: none;
  stroke-width: 4;
}

.circle-progress {
  fill: none;
  stroke: #00ff00;
  stroke-width: 4;
  stroke-linecap: round;
  stroke-dasharray: 126;
  stroke-dashoffset: 126;
  transition: stroke-dashoffset 0.25s;
}
</style>
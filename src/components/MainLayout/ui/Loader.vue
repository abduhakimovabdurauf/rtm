<template>
  <div class="w-full h-full z-50 top-0 left-32 flex fixed justify-center items-center bg-gray-100 dark:bg-gray-900">
    <div class="loader mx-auto"></div>
  </div>
</template>


<style scoped>
.loader {
  width: 80px;
  aspect-ratio: 1;
  display: grid;
  border-radius: 50%;
  background:
      linear-gradient(0deg ,rgb(0 0 0 / 50%) 30%, transparent 0 70%, rgb(0 0 0 / 100%) 0) 50%/8% 100%,
      linear-gradient(90deg, rgb(0 0 0 / 25%) 30%, transparent 0 70%, rgb(0 0 0 / 75%) 0) 50%/100% 8%;
  background-repeat: no-repeat;
  animation: l23 1s infinite steps(12);
}

/* Dark mode uchun */
.dark .loader {
  background:
      linear-gradient(0deg ,rgb(255 255 255 / 50%) 30%, transparent 0 70%, rgb(255 255 255 / 100%) 0) 50%/8% 100%,
      linear-gradient(90deg, rgb(255 255 255 / 25%) 30%, transparent 0 70%, rgb(255 255 255 / 75%) 0) 50%/100% 8%;
  background-repeat: no-repeat;
}



.loader::before,
.loader::after {
  content: "";
  grid-area: 1/1;
  border-radius: 50%;
  background: inherit;
  opacity: 0.915;
  transform: rotate(30deg);
}
.loader::after {
  opacity: 0.83;
  transform: rotate(60deg);
}

@keyframes l23 {
  100% { transform: rotate(1turn); }
}
</style>

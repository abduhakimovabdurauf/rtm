<template>
  <div class="h-screen bg-gray-100 flex items-center justify-center">
    <div class="text-center">
      <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/error-404-page-not-available-illustration-download-in-svg-png-gif-file-formats--found-pack-science-technology-illustrations-7706458.png"
          alt="Page Not Found"
          class="w-64 mx-auto mb-6"
      />
      <p class="text-2xl text-gray-600 mb-6">Sahifa mavjud emas!</p>
      <button
          @click="goBack"
          class="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
      >
        Ortga
      </button>
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";

export default {
  name: 'NotFoundPage',
  setup() {
    const goBack = () => {
      if (window.history.length > 1) {
        window.history.back(); // Brauzer tarixidagi oldingi sahifaga qaytadi
      } else {
        window.location.href = '/'; // Tarix bo'sh bo'lsa bosh sahifaga qaytadi
      }
    };

    onMounted(() => {
      console.log('404 - Page Not Found');
    });

    return { goBack };
  },
};
</script>

<style>
/* Maxsus fon uslubi qo'shildi */
body {
  font-family: 'Arial', sans-serif;
}
</style>

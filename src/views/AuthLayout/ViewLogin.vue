<template>
  <div class="flex min-h-screen">
    <!-- Left Side -->
    <div class="flex flex-col items-center w-full pt-12 xl:w-1/3 bg-red">
      <div class="w-9/12 max-w-xs sm:max-w-sm">
        <img class="w-24 cursor-pointer" src="@/assets/images/dark-logo.svg" alt="logo">
      </div>
      <h2 class="w-9/12 max-w-xs mt-2 mb-2 text-lg font-semibold text-gray-600 sm:max-w-sm">Kirish</h2>
      <p class="w-9/12 max-w-xs mb-6 text-sm text-slate-500 sm:max-w-sm">Hisobingizga kirish uchun email va parolni kiriting.</p>

      <form class="w-9/12 max-w-xs sm:max-w-sm" @submit.prevent="submit">
        <div class="mb-4">
          <label class="block mb-2 text-sm font-medium text-slate-500" for="email">Email</label>
          <input
              type="email"
              v-model="email"
              class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Emailingizni kiriting"
              id="email"
              autocomplete="off"
              :class="{ 'border-red-500': emailError }"
              @blur="emailBlur"
          />
          <small v-if="emailError" class="text-red-500">{{ emailError }}</small>
        </div>
        <div class="mb-4">
          <label class="block mb-2 text-sm font-medium text-slate-500" for="password">Parol</label>
          <input
              type="password"
              v-model="password"
              class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Parolingizni kiriting"
              id="password"
              autocomplete="off"
              :class="{ 'border-red-500': passwordError }"
              @blur="passwordBlur"
          />
          <small v-if="passwordError" class="text-red-500">{{ passwordError }}</small>
        </div>
        <button
            type="submit"
            class="w-full py-2 text-white transition bg-blue-500 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            :disabled="isSubmitting || tryCount"
        >
          <i class='bx bx-log-in'></i>  Kirish
        </button>
        <p v-if="isSubmitting">Kirilmoqda...</p>
      </form>

      <div class="flex flex-col justify-center w-9/12 max-w-xs mt-6 sm:max-w-sm">
        <p class="mt-4 font-medium text-slate-500">Orqali Kiring</p>
        <div class="flex mt-4">
          <button class="w-full p-2 text-red-500 duration-300 bg-white border border-red-500 rounded hover:bg-red-500 hover:text-white">
            <i class='bx bxl-google'></i>oogle
          </button>
        </div>
      </div>
    </div>

    <!-- Right Side -->
    <div class="hidden bg-center bg-cover xl:flex lg:w-2/3 banner-block">
      <div class="flex items-center w-full h-full p-8 bg-black bg-opacity-50 absolute z-50"></div>
    </div>
  </div>
</template>

<script>
import {useLoginForm} from '@/use/login-form.js'
export default {
  setup(){


    return {
      ...useLoginForm()
    }
  }
}
</script>

<style scoped>
.banner-block {
  background-image: url("@/assets/images/login-banner.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
</style>

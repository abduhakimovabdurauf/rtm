<template>
  <div class="py-6 px-0 max-w-md mx-auto bg-white rounded-lg shadow-md mt-10">
    <div class="flex justify-center mb-4">
      <img
          :src="user.images ? 'https:/api.mrtm.uz' + user.images[0] : 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png'"
          alt="User Image"
          class="w-24 h-24 rounded-full object-cover"
      />
    </div>

    <div class="text-center space-y-4">
      <h2 class="text-xl font-bold text-gray-800">{{ user.full_name }}</h2>

      <p class="text-gray-600">
        <span class="font-medium text-gray-800">Email: </span>{{ user.email }}
      </p>

      <p class="text-gray-600">
        <span class="font-medium text-gray-800">Address: </span>{{ user.address }}
      </p>

      <p class="text-gray-600">
        <span class="font-medium text-gray-800">Birthday: </span>{{ user.birthday }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    const user = JSON.parse(localStorage.getItem("user"));

    return {
      user,
    };
  },
};
</script>


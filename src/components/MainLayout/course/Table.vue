<template>
  <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-600 shadow-md rounded-lg overflow-hidden">
    <slot />
    <tbody class="bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300 divide-y divide-gray-200 dark:divide-gray-700">
      <tr
          v-for="course in item"
          :key="course.id"
          class="hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200 cursor-pointer"
      >
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
          {{ course.name }}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm">{{ course.duration }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm">${{ course.price }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm">{{ course.teacher }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium" colspan="1">
          <a href="#" class="transition text-white bg-blue-500 hover:bg-blue-600 dark:text-gray-400 p-3 py-2 rounded duration-200">
            Ozgartirish
          </a>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ['item'],
  setup(prop){
    const item = prop.item

    return {
      item
    }
  }
}
</script>
<script>
import { ref, onMounted, computed } from 'vue';

export default {
  setup() {
    const salesData = ref([120, 150, 180, 200, 250]);
    const userGrowth = ref([5, 8, 15, 17, 15, 20, 30, 35]);
    const employees = ref([
      { name: 'Asrorov Sanjarbek', role: 'Developer, SEO', performance: 97 },
      { name: 'Turg`unov Salohiddin', role: 'SEO', performance: 25 },
      { name: 'Nuriddinov Azizbek', role: 'Manager', performance: 85 },
    ]);

    const branches = ref([
      { name: 'Main', students: 500, revenue: 30000 },
      { name: 'COHUB 1', students: 300, revenue: 5000 },
      { name: 'COHUB 2', students: 200, revenue: 3000 }
    ]);

    const darkMode = ref(localStorage.getItem('theme') === 'dark');

    const toggleDarkMode = () => {
      darkMode.value = !darkMode.value;
      localStorage.setItem('theme', darkMode.value ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', darkMode.value);
    };

    onMounted(() => {
      document.documentElement.classList.toggle('dark', darkMode.value);

      new Chart(document.getElementById('barChart'), {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
          datasets: [{
            label: 'Sales',
            data: salesData.value,
            backgroundColor: 'rgba(54, 162, 235, 0.5)'
          }]
        }
      });

      new Chart(document.getElementById('pieChart'), {
        type: 'pie',
        data: {
          labels: ['Active', 'Inactive'],
          datasets: [{
            data: [70, 30],
            backgroundColor: ['#4CAF50', '#FF5733']
          }]
        }
      });

      new Chart(document.getElementById('lineChart'), {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
          datasets: [{
            label: 'User Growth',
            data: userGrowth.value,
            borderColor: 'rgba(255, 99, 132, 1)',
            fill: false
          }]
        }
      });
    });

    return { salesData, userGrowth, employees, branches, darkMode, toggleDarkMode };
  }
};
</script>

<template>
  <div class="p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Boshqaruv paneli</h1>
    </div>

    <div class="flex flex-col lg:flex-row gap-4 mb-6">
      <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex-1 min-w-[300px]">
        <h2 class="text-lg font-semibold mb-2">Xodimlar</h2>
        <div class="space-y-2">
          <div v-for="employee in employees" :key="employee.name" class="flex justify-between border-b pb-2 border-gray-300 dark:border-gray-700">
            <span class="text-gray-800 dark:text-gray-200 font-medium">{{ employee.name }}</span>
            <span class="text-gray-600 dark:text-gray-400">{{ employee.role }}</span>
            <span class="text-gray-800 dark:text-gray-100 font-bold">{{ employee.performance }}%</span>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex-1 min-w-[300px]">
        <h2 class="text-lg font-semibold mb-2">Filiallar</h2>
        <div class="space-y-2">
          <div v-for="branch in branches" :key="branch.name" class="flex justify-between border-b pb-2 border-gray-300 dark:border-gray-700">
            <span class="text-gray-800 dark:text-gray-200 font-medium">{{ branch.name }}</span>
            <span class="text-gray-600 dark:text-gray-400">O‘quvchilar: {{ branch.students }}</span>
            <span class="text-gray-800 dark:text-gray-100 font-bold">Daromad: ${{ branch.revenue }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col md:flex-row gap-6">
      <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex-1 min-w-[300px]">
        <h2 class="text-lg font-semibold mb-2">Savdo ma'lumotlari</h2>
        <canvas id="barChart"></canvas>
      </div>
      <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex-1 min-w-[300px]">
        <h2 class="text-lg font-semibold mb-2">Foydalanuvchi statistikasi</h2>
        <canvas id="pieChart"></canvas>
      </div>
    </div>

    <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mt-6 min-w-[300px]">
      <h2 class="text-lg font-semibold mb-2">O'quvchi o‘sishi</h2>
      <canvas id="lineChart"></canvas>
    </div>
  </div>
</template>

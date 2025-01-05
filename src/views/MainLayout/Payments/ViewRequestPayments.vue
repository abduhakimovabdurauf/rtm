<template>
  <!--    <div v-if="data" class="space-y-6 w-1/3 p-6 bg-white rounded-xl mt-6">-->
  <!--      <h1>Tolov malumoti</h1>-->
  <!--      <div class="flex justify-between items-center border-b p-2 duration-300 hover:bg-gray-200">-->
  <!--        <span class="text-sm text-gray-500">Oquvchi ismi:</span>-->
  <!--        <span class="text-lg font-semibold text-gray-900">{{ data.student.full_name }}</span>-->
  <!--      </div>-->

  <!--      <div class="flex justify-between items-center border-b p-2 duration-300 hover:bg-gray-200">-->
  <!--        <span class="text-sm text-gray-500">Summasi:</span>-->
  <!--        <span class="text-lg font-semibold text-gray-900">{{ data.summa }}</span>-->
  <!--      </div>-->

  <!--      <div class="flex justify-between items-start border-b p-2 duration-300 hover:bg-gray-200">-->
  <!--        <span class="text-sm text-gray-500">Sanasi:</span>-->
  <!--        <span class="text-lg font-medium text-gray-700 max-w-md leading-relaxed">{{ data.payment_date }}</span>-->
  <!--      </div>-->

  <!--      <div class="flex justify-between items-center border-b p-2 duration-300 hover:bg-gray-200">-->
  <!--        <span class="text-sm text-gray-500">Chegirma:</span>-->
  <!--        <span class="text-lg font-semibold text-gray-900">{{ data.discount }}</span>-->
  <!--      </div>-->

  <!--      <div class="flex justify-between items-center border-b p-2 duration-300 hover:bg-gray-200">-->
  <!--        <span class="text-sm text-gray-500">Status:</span>-->
  <!--        <span-->
  <!--            :class="data.status === 'active' ? 'text-green-600' : 'text-red-600'"-->
  <!--            class="text-lg font-semibold">-->
  <!--          {{ data.status === 'active' ? 'Faol' : 'Faol emas' }}-->
  <!--        </span>-->
  <!--      </div>-->

  <!--    </div>-->

  <div class="border-test modal-content">
    <img src="/public/RTM Logo.png" class="mx-auto w-[100px]" alt="Logo" width="100px">

    <div class="title">"Raqamli Texnologiyalar Markazi Direksiyasi" MCHJ</div>
    <div class="address">Farg`ona v, Marg`ilon sh,<br>Hiyobon k, 65-uy</div>
    <div class="divider"></div>
    <div class="body" v-if="data">
      <div class="tolov"><span>Kvitansiya ID:</span><span class="numb">{{ data.id }}</span></div>
      <div><span>O'quvchi:</span><span>{{ data.student.full_name }}</span></div>
      <div><span>Kurs nomi:</span><span>Frontend</span></div>
      <div><span>Summa:</span><span class="numb">{{ data.summa }}</span></div>
      <div><span>Chegirma:</span><span class="numb">{{ data.discount ? data.discount : '0 %' }}</span></div>
      <div><span>O'qituvchi:</span><span>Asrorov Sanjarbek</span></div>
      <div><span>Sana:</span><span>{{ data.payment_date }}</span></div>
    </div>
    <div class="divider"></div>
    <div class="body">
      <div>
			<span class="logo">
        <img src="/public/instagram.png" alt="Instagram">
        <img src="/public/telegram.png" alt="Telegram">
        <img src="/public/facebook.png" alt="Facebook">
			</span>
        <span>@rtm_margilan</span>
      </div>
    </div>
    <div>
      <span>73-254-24-04, 99-642-24-04</span>
    </div>
    <br>
    <br>
    <br>
    <br>
    <br>
  </div>

</template>

<script>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";

export default {
  props: {
    id: {
      type: Number,
      required: true,
    }
  },
  setup(props) {
    const store = useStore();
    const data = ref(null);
    const payments = ref(null)
    onMounted(async () => {
      try {
        const response = await store.dispatch('payment/getPaymentById', props.id);
        if (response) {
          data.value = response;
          payments.value= response.payments
          console.log(data.value)
        } else {
          console.error("Ma'lumot topilmadi.");
        }
      } catch (error) {
        console.error("Ma'lumot yuklashda xatolik:", error);
      }
    });

    const isPrimitiveOrFormatted = (value) => {
      if (
          value === null ||
          ["string", "number", "boolean", "undefined"].includes(typeof value)
      ) {
        return true;
      }

      try {
        const parsed = JSON.parse(value);
        return typeof parsed !== "object" || parsed === null;
      } catch (e) {
        return false;
      }
    };

    const formatKey = (key) => {
      return key.replace('_', ' ').replace(/\b\w/g, char => char.toUpperCase());
    };

    const formatData = (value, key) => {
      try {
        const parsedValue = JSON.parse(value);
        if (typeof parsedValue === "object" && parsedValue !== null) {
          return "Ma'lumot mavjud emas";
        }
      } catch (e) {

      }

      if (key === 'status') {
        return value === 'active' ? 'Faol' : 'Faol emas';
      }
      if (key === 'birthday' || key === 'work_start' || key === 'work_end') {
        return new Date(value).toLocaleDateString();
      }
      return value || "Ma'lumot mavjud emas";
    };

    return {
      data,
      isPrimitiveOrFormatted,
      formatKey,
      formatData,
      payments,
    };
  },
};
</script>

<style scoped>
*{
  text-align: center;
  font-size: 13px;
  font-family: 'Types New Roman', serif;
}
.border-test{
  width: 250px;
  padding: 14px;
}
.border-test .body div{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
.title{
  font-size: 15px;
}
.address{
  font-size: 13px;
}
.numb{
  font-size: 15px;
}
.border-test .body .logo{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.border-test .body div .logo img{
  width: 20px;
  margin-left: 2px;
}

/* Divider border uchun */
.divider {
  border-top: 1px solid #ccc;
  margin: 10px 0;
}
</style>


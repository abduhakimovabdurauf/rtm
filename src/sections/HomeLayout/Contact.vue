<template>
  <div class="scroll" id="contact"></div>
  <div class="contact">
    <div class="contact__content">
      <div class="card">
        <p class="contact__title">
            Bizga o'z ma'lumotlaringizni yuboring!
        </p>
        <p class="contact__subtitle">
            Va biz siz bilan bog'lanamiz.
        </p>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="name">Ismingiz:</label>
            <input
              type="text"
              id="name"
              v-model="name"
              required
              @input="validateName"
              autocomplete="off"
              :class="{ 'is-invalid': nameError }"
            />
            <span v-if="nameError" class="error">{{ nameError }}</span>
          </div>
          <div class="form-group">
            <label for="phone">Telefon raqamingiz:</label>
            <input
              type="tel"
              id="phone"
              v-model="phone"
              required
              @input="validatePhone"
              autocomplete="off"
              :class="{ 'is-invalid': phoneError }"
            />
            <span v-if="phoneError" class="error">{{ phoneError }}</span>
          </div>
          <button type="submit" :disabled="isFormInvalid || isLoading">
            {{ isLoading ? 'Yuborilmoqda...' : 'Yuborish' }}
          </button>
        </form>
      </div>

      <div class="map">
        <iframe 
            src="https://yandex.uz/map-widget/v1/?ll=71.717096%2C40.441112&mode=search&oid=169800192245&ol=biz&z=17.51" 
            width="100%" height="460"
            frameborder="0" 
            allowfullscreen
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  setup() {
    const name = ref('');
    const phone = ref('');
    const nameError = ref('');
    const phoneError = ref('');
    const isLoading = ref(false);

    const isFormInvalid = computed(() => {
      return nameError.value || phoneError.value || !name.value || !phone.value;
    });

    const validateName = () => {
      const regex = /^[a-zA-Zа-яА-ЯёЁ]+$/;
      nameError.value = name.value && !regex.test(name.value)
        ? 'Ism faqat harflardan iborat bo\'lishi kerak.'
        : '';
    };

    const validatePhone = () => {
      const regex = /^\d{9,}$/;
      phoneError.value = phone.value && !regex.test(phone.value)
        ? 'Telefon raqami kamida 9 ta raqamdan iborat bo\'lishi kerak.'
        : '';
    };

    const submitForm = async () => {
      if (!isFormInvalid.value) {
        isLoading.value = true;
        const message = `*Yangi xabar*\n\n*Ism:* ${name.value}\n*Telefon raqami:* ${phone.value}`;
        
        try {
          await sendToTelegram(message);
          resetForm();
          Swal.fire({
            title: 'Muvaffaqiyatli yuborildi!',
            text: 'Biz siz bilan tez orada bog`lanamiz',
            icon: 'success',
            confirmButtonText: 'OK',
          });
        } 
        catch (error) {
          console.error('Telegramga yuborishda xato:', error);
          Swal.fire({
            title: 'Xato!',
            text: 'Xato yuz berdi, qayta urinib ko\'ring.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        } finally {
          isLoading.value = false;
        }
      }
    };

    const sendToTelegram = async (message) => {
      const botToken = '7914376040:AAHsepu5hk5DS1FEMayEGFaCChscxq4dCpI';
      const chatId = '-1002422917982';
      const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

      await axios.post(url, {
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      });
    };

    const resetForm = () => {
      name.value = '';
      phone.value = '';
      nameError.value = '';
      phoneError.value = '';
    };

    return {
      name,
      phone,
      nameError,
      phoneError,
      isFormInvalid,
      isLoading,
      validateName,
      validatePhone,
      submitForm,
    };
  },
};
</script>

<style scoped>
.scroll {
  width: 100%;
  height: 70px;
}
.contact {
  max-width: 1000px;
  margin: 50px auto;
  margin-top: 0px;
  padding: 30px;
  background-color: #fff;
}

.card {
  width: 48%;
  padding: 40px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

.map {
  border-radius: 10px;
}

.contact__title, .contact__subtitle {
  text-align: left;
  color: #333;
}

.contact__title {
  font-size: 24px;
  margin-bottom: 10px;
}

.contact__subtitle {
  font-size: 16px;
  margin-bottom: 30px;
  color: #666;
}

.contact__content {
  display: flex;
  gap: 30px;
  justify-content: space-between;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #4CAF50;
  outline: none;
}

input.is-invalid {
  border-color: #e74c3c;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #4CAF50;
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:disabled {
  background-color: #999;
  cursor: not-allowed;
}

button:not(:disabled):hover {
  background-color: #45a049;
}

.map {
  flex: 1;
  border-radius: 10px;
  overflow: hidden;
}

.error {
  color: #e74c3c;
  font-size: 14px;
  margin-top: 5px;
}

@media screen and (max-width: 768px) {
  .card  {
    width: 100%;
  }

  .contact__content {
    flex-direction: column;
  }
}

@media screen and (max-width: 600px) {
  .contact__title {
    font-size: 18px;
    width: 100%;
  }

  .map iframe{
    height: 300px !important;
  }
}
</style>

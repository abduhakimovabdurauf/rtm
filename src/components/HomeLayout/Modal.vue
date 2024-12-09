<template>
  <div class="modal" v-if="isOpen" @click.self="close">
    <div class="modal__content">
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
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  props: {
    isOpen: Boolean,
    courseName: String
  },
  data() {
    return {
      name: '',
      phone: '',
      nameError: '',
      phoneError: '',
      isLoading: false,
    };
  },
  computed: {
    isFormInvalid() {
      return this.nameError || this.phoneError || !this.name || !this.phone;
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
    validateName() {
      const nameRegex = /^[A-Za-zА-Яа-яёЁ]{3,}$/;
      if (!nameRegex.test(this.name)) {
        this.nameError = 'Ism kamida 3 ta xarflardan bo\'lishi kerak.';
      } else {
        this.nameError = '';
      }
    },
    validatePhone() {
      const phoneRegex = /^[0-9]{9,}$/;
      if (!phoneRegex.test(this.phone)) {
        this.phoneError = 'Telefon raqamida kamida 9 ta raqam bo\'lishi kerak.';
      } else {
        this.phoneError = '';
      }
    },
    async submitForm() {
      this.isLoading = true;

      const message = `*Kurs:* ${this.courseName}\n*Ism:* ${this.name}\n*Telefon:* ${this.phone}`;
      const token = '7914376040:AAHsepu5hk5DS1FEMayEGFaCChscxq4dCpI';
      const chatId = '-1002422917982';
      const url = `https://api.telegram.org/bot${token}/sendMessage`;

      try {
        await axios.post(url, {
          chat_id: chatId,
          text: message,
          parse_mode: 'Markdown',
        });

        this.resetForm();
        this.close();

        await Swal.fire({
          icon: 'success',
          title: 'Xabar muvaffaqiyatli yuborildi!',
          text: 'Tez orada siz bilan bog`lanamiz',
          confirmButtonText: 'OK',
        });
      } 
      catch (error) {
        console.error('Xabar yuborishda xatolik:', error);
        await Swal.fire({
          icon: 'error',
          title: 'Xatolik!',
          text: 'Xabar yuborishda xatolik yuz berdi. Iltimos, qayta urinib ko‘ring.',
          confirmButtonText: 'OK',
        });
      } finally {
        this.isLoading = false;
      }
    },
    resetForm() {
      this.name = '';
      this.phone = '';
      this.nameError = '';
      this.phoneError = '';
    },
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn 0.3s;
  z-index: 99999999999999999999999999999999999999999999999999;
}

.modal__content {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 350px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.card {
  width: 100%;
  padding: 10px;
  border-radius: 10px;
}

.contact__title,
.contact__subtitle {
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

.error {
  color: #e74c3c;
  font-size: 14px;
  margin-top: 5px;
}
</style>

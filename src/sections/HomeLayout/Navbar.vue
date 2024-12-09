<template>
  <nav
    :class="['navbar content', { 
      'scrolled': isScrolled, 
      'slide-in': isMounted,
      'animate__animated animate__fadeInDown': isMounted
    }]"
  >
    <div class="navbar-row">
      <div class="navbar-brand">
        <a href="#">
          <img src="../../assets/images/logo.svg" alt="Logo">
        </a>
      </div>

      <button @click="toggleMenu" class="hamburger__menyu">
        <i v-if="isActive" class='bx bx-x'></i>
        <i v-else class='bx bx-menu'></i>
      </button>

      <ul class="menyu" :class="{ 'is-active': isActive }">
        <li>
          <a href="#" class="menyu__item animated-link" @click.prevent="scrollToSection('about')">
            Biz Haqimizda
          </a>
        </li>
        <li>
          <a href="#" class="menyu__item animated-link" @click.prevent="scrollToSection('why')">
            Nega biz
          </a>
        </li>
        <li>
          <a href="#" class="menyu__item animated-link" @click.prevent="scrollToSection('courses')">
            Kurslar
          </a>
        </li>
        <li>
          <a href="#" class="menyu__item animated-link" @click.prevent="scrollToSection('events')">
            Tadbirlar
          </a>
        </li>
        <li>
          <a href="#" class="menyu__item animated-link" @click.prevent="scrollToSection('contact')">
            Bo'glanish
          </a>
        </li>
        <router-link to="/login">
          <button
              class="relative group overflow-hidden text-white font-medium translate-y-1 py-2 px-6 rounded-md shadow-md bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500 ease-out hover:scale-105 hover:shadow-lg focus:ring-2 focus:ring-green-300 active:scale-95"
          >
            <span
                class="absolute inset-0 w-full h-full bg-gradient-to-r from-white/20 via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-in-out"
            ></span>
            <span class="relative z-10">Kirish</span>
          </button>
        </router-link>
      </ul>
    </div>
  </nav>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import 'animate.css';

export default {
  setup() {
    const isScrolled = ref(false);
    const isActive = ref(false);
    const isMounted = ref(false);
    const toggleMenu = () => {
      isActive.value = !isActive.value;
    };

    const handleScroll = () => {
      isScrolled.value = window.scrollY > 50;
    };

    const scrollToSection = (sectionId) => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        isActive.value = false;
      }
    };

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
      isMounted.value = true;
    });

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    return {
      isScrolled,
      isActive,
      toggleMenu,
      isMounted,
      scrollToSection
    };
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: center;
  padding: 1rem;
  width: 100%;
  background-color: rgba(44, 62, 80, 0);
  position: fixed;
  transition: all 0.5s;
  z-index: 11111;
}

.navbar-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
}

.navbar.scrolled {
  background-color: #2c3e50;
}

.navbar.menyu.is-active {
  background-color: #2c3e50;
}

.navbar-brand a {
  width: 150px;
  height: 30px;
  color: #ecf0f1;
  font-size: 1.5rem;
  text-decoration: none;
  font-weight: bold;
}

.navbar-brand a img {
  width: 150px;
  height: 80px;
  transform: scale(1.4);
}

.animated-link {
  position: relative;
  text-decoration: none;
}

.animated-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2.5px;
  bottom: -1px;
  left: 50%;
  background-color: currentColor;
  transition: width 0.5s ease, left 0.5s ease;
}

.animated-link:hover::after {
  width: 100%;
  left: 0;
}

.menyu {
  width: 45%;
  display: flex;
  justify-content: space-between;
  text-align: center;
  align-items: flex-end;
  list-style: none;
  transition: all 0.3s ease;
}

.menyu__item {
  font-size: 18px;
  color: #ecf0f1;
  text-decoration: none;
  margin: 10px 0;
  transition: color 0.3s ease;
}

.menyu__item:hover {
  color: #1abc9c;
}

.hamburger__menyu {
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 50%;
  font-size: 40px;
  background-color: red;
  color: white;
  border: none;
  display: none;
  background: none;
  cursor: pointer;
  transition: transform 0.3s ease;
  position: relative;
  z-index: 999999999999999;
}

.hamburger__menyu:hover {
  transform: scale(1.1);
}

@media screen and (max-width: 1290px) {
  .menyu {
    width: 65% !important;
  }
}

@media screen and (max-width: 1000px) {
  .hamburger__menyu {
    display: flex;
  }

  .menyu {
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    flex-direction: column;
    height: 100vh;
    align-items: flex-start;
    justify-content: flex-start;
    width: 300px !important;
    background: #2c3e50;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 11111;
    padding-top: 30px;
    padding-left: 10px;
    line-height: 50px;
  }

  .menyu.is-active {
    transform: translateX(0);
  }
}

</style>
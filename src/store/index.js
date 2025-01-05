import { createStore, createLogger } from 'vuex';
import auth from "./modules/auth.module.js";
import course from "./modules/course.module.js";
import role from "./modules/role.module.js";
import room from "./modules/room.module.js";
import user from "./modules/user.module.js";
import student from "./modules/student.module.js";
import group from "./modules/group.module.js";
import payment from "./modules/payment.module.js";
import task from "./modules/task.module.js";
import discount from "./modules/discount.module.js";
import aktImg from '../assets/images/akt.svg';
import foundationImg from '../assets/images/found.svg';
import robotImg from '../assets/images/ROBOT.svg';
import graphicImg from '../assets/images/GIRAFIK.svg';
import modelingImg from '../assets/images/3d.svg';
import uxuiImg from '../assets/images/uxui.svg';
import motionImg from '../assets/images/MOTIN.svg';
import frontendImg from '../assets/images/FRONTEND.svg';
import pythonImg from '../assets/images/PHYTON.svg';
import flutterImg from '../assets/images/FLUT.svg';
import englishImg from '../assets/images/INGLIZ TILI.svg';
import russianImg from '../assets/images/RUS.svg';

const plugins = []
if(process.env.NODE_ENV==='development'){
  plugins.push(createLogger())
}

const store = createStore({
  plugins,
  state: {
    selectedCategory: 'all',
    isSidebarOpen: false,
    sidebarValues: null,
    courses: [
      {
        id: 1,
        title: 'AKT',
        duration: '3 oy',
        price: '250 000 UZS',
        image: aktImg,
        category: 'Savodhonlik',
        description: {
          title: "KOMPYUTER SAVODXONLIGI",
          course_plan: {
            heading: "Kurs rejasi",
            modules: [
              "Office dasturlari (Microsoft Word, Excel, PowerPoint)",
              "Google Suit (Google Sheets, Docs, Slides)",
              "Typing Master",
              "Canva Online platformasi",
              "Notion"
            ]
          },
          course_benefits: {
            heading: "Kurs afzalliklari",
            benefits: [
              "Kursimizni muvaffaqiyatli tamomlagan o'quvchi kompyuterdan qiyinchiliksiz foydalana oladi",
              "Darslar eng so'nggi texnologiyalarga asoslanib dars o'tiladi",
              "Darsdan tashqari vaqtlarda markazga kelib, o'z ustlarida ishlashlari mumkin"
            ]
          },
          course_duration: {
            heading: "Kurs davomiyligi",
            details: [
              "3 oy mobaynida",
              "Haftada 3 kun",
              "2 soat"
            ]
          },
        },
      },
      {
        id: 2,
        title: 'Foundation (C++)',
        duration: '3 oy',
        price: '400 000 UZS',
        image: foundationImg,
        category: 'Savodhonlik',
        description: {
          title: "FOUNDATION (C++)",
          course_plan: {
            heading: "Kurs rejasi",
            modules: [
              "Code Blocks dasturini o'rganish",
              "C++ dasturlash tili asoslarini o'rganish",
              "Dasturlashdagi ko'nikmalarni rivojlantirish",
              "C++ va boshqa dasturlash tillarini farqini o'rganish"
            ]
          },
          course_benefits: {
            heading: "Kurs afzalliklari",
            benefits: [
              "Bu kursda o'quvchi dasturlashning boshlang'ich bilimlariga ega bo'ladi",
              "“Kelajakda o'zidan dasturchi chiqadimi-yo'qmi?” shu savolga javob oladi va dasturlash sohalaridan birini tanlaydi"
            ]
          },
          course_duration: {
            heading: "Kurs davomiyligi",
            details: [
              "3 oy mobaynida",
              "Haftada 3 kun",
              "2 soat"
            ]
          },
        },
      },
      {
        id: 3,
        title: 'Robototexnika',
        duration: '5 oy',
        price: '500 000 UZS',
        image: robotImg,
        category: 'Programming',
        description: {
          title: "ROBOTO TEXNIKA",
          course_plan: {
            heading: "Kurs rejasi",
            modules: [
              "Qurilmalar yaratish",
              "Elektronika, Mexanizmlar yaratish",
              "Arduino va Raspberry Pi platformalari",
              "Elektronika mexanika va sxemotexnika asoslari"
            ]
          },
          course_benefits: {
            heading: "Kurs afzalliklari",
            benefits: [
              "20% nazariy 80% amaliyot",
              "Lego va elektron qurilmalar yaratiladi",
              "O'quvchilar darsda kompyuter, internet va kerakli jihozlar bilan ta'minlanadi",
              "Darsdan tashqari vaqtlarda markazga kelib, o'z ustlarida ishlashlari mumkin"
            ]
          },
          course_duration: {
            heading: "Kurs davomiyligi",
            details: [
              "4 oy mobaynida",
              "Haftada 3 kun",
              "1.5 soat"
            ]
          },
        },
      },
      {
        id: 4,
        title: 'Grafik dizayn',
        duration: '6 oy',
        price: '750 000 UZS',
        image: graphicImg,
        category: 'Design',
        description: {
          title: "GRAFIK DIZAYN",
          course_plan: {
            heading: "Kurs rejasi",
            modules: [
              "Dizayn asoslari",
              "Ranglar psixologiyasi",
              "Adobe Photoshop va Adobe Illustrator dasturlari yordamida real loyihalar asosida dizaynlar tayyorlash"
            ]
          },
          course_benefits: {
            heading: "Kurs afzalliklari",
            benefits: [
              "Mijoz bilan ishlash ko'nikmalari",
              "Bozor talabiga mos barcha dizaynlar tayyorlanadi (SMD, Poligrafik...)",
              "Logo va Brending boshlang'ich asoslari",
              "Portfolio uchun bir-biridan qiziq, kreativ va yoqimli dizaynlar"
            ]
          },
          course_duration: {
            heading: "Kurs davomiyligi",
            details: [
              "6 oy mobaynida",
              "Haftada 3 kun",
              "2 soatdan"
            ]
          }
        },
      },
      {
        id: 5,
        title: '3D Modeling',
        duration: '3 oy',
        price: '750 000 UZS',
        image: modelingImg,
        category: 'Design',
        description: {
          title: "3DS MAX",
          course_plan: {
            heading: "Kurs rejasi",
            modules: [
              "Modelling asoslari",
              "Editable Spline usulida modellashtirish",
              "Freelance birjalar",
              "Rendering, Lighting, Vizualizatsiya (corona render) asoslari",
              "Editable Poly usulida modellashtirish"
            ]
          },
          course_benefits: {
            heading: "Kurs afzalliklari",
            benefits: [
              "Ustoz nazoratida amaliyot qilish",
              "Freelance birjalarda daromad topish",
              "Real loyihalar orqali tajribani oshirish"
            ]
          },
          course_duration: {
            heading: "Kurs davomiyligi",
            details: [
              "3 oy mobaynida",
              "Haftada 3 kun",
              "2 soatdan"
            ]
          }
        },
      },
      {
        id: 6,
        title: 'UX/UI',
        duration: '5 oy',
        price: '750 000 UZS',
        image: uxuiImg,
        category: 'Design',
        description: {
          title: "UI/UX DIZAYN",
          course_plan: {
            heading: "Kurs rejasi",
            modules: [
              "Dizayn asoslari; Figma va Adobe Photoshop dasturlari yordamida real loyihalar asosida web sayt hamda mobil ilovalar uchun foydalanuvchilarga tushunarli, qulay bo'lgan dizaynlar tayyorlash",
              "Ranglar psixologiyasi"
            ]
          },
          course_benefits: {
            heading: "Kurs afzalliklari",
            benefits: [
              "Frilans saytlardan birinchi buyurtmani olib, uni topshirishgacha bo'lgan jarayonda yordam beramiz",
              "Bozor talabiga mos barcha dizaynlar tayyorlanadi",
              "Portfolio uchun bir-biridan qiziq, kreativ va yoqimli dizaynlar"
            ]
          },
          course_duration: {
            heading: "Kurs davomiyligi",
            details: [
              "5 oy mobaynida",
              "Haftada 3 kun",
              "2 soatdan"
            ]
          }
        },
      },
      {
        id: 7,
        title: 'Motion dizayn',
        duration: '5 oy',
        price: '750 000 UZS',
        image: motionImg,
        category: 'Design',
        description: {
          title: "MOTION DIZAYN",
          course_plan: {
            heading: "Kurs rejasi",
            modules: [
              "After Effects, Premier Pro, (Media Encoder, Photoshop, Illustrator) dasturlaridan foydalanish",
              "Motion dizayn asoslari, 3D loyihalar bilan ishlash",
              "Logo va SMM post animatsiyalari, Tracking"
            ]
          },
          course_benefits: {
            heading: "Kurs afzalliklari",
            benefits: [
              "O'rganayotgan davrdayoq daromad qilish imkoniyati",
              "Juda katta talabdagi IT sohasi",
              "Real loyihalar asosida portfolio uchun animatsiyalar"
            ]
          },
          course_duration: {
            heading: "Kurs davomiyligi",
            details: [
              "4 oy mobaynida",
              "Haftada 3 kun",
              "2 soatdan"
            ]
          }
        },
      },
      {
        id: 8,
        title: 'Frontend',
        duration: '9 oy',
        price: '590 000 UZS',
        image: frontendImg,
        category: 'Programming',
        description: {
          title: "VEB (FRONTEND) DASTURLASH",
          course_plan: {
            heading: "Kurs rejasi",
            modules: [
              "HTML, CSS, SCSS, GIT, BOOTSTRAP",
              "Javascript, jQuery, WowJS, Charts",
              "VueJS V3, VueX, VueRouter",
              "Composition API",
              "Firebase"
            ]
          },
          course_benefits: {
            heading: "Kurs afzalliklari",
            benefits: [
              "O'quv rejamiz dunyo bo'yicha standarti bo'lgan roadmap.sh/frontend saytida olingan",
              "Har bir modulda loyihalar qilinadi va shaxsiy portfolio 'GitHub'ga qo'yiladi",
              "Vue – React hamda Angular frameworklaridan o'rganish oson"
            ]
          },
          course_duration: {
            heading: "Kurs davomiyligi",
            details: [
              "6+ oy mobaynida",
              "Haftada 3 kun",
              "1.5 - 2 soatdan"
            ]
          }
        },
      },
      {
        id: 9,
        title: 'Python',
        duration: '6 oy',
        price: '590 000 UZS',
        image: pythonImg,
        category: 'Programming',
        description: {
          
        },
      },
      {
        id: 10,
        title: 'Flutter',
        duration: '6 oy',
        price: '590 000 UZS',
        image: flutterImg,
        category: 'Programming',
        description: 'Flutter kursi mobil ilovalar yaratish uchun zamonaviy dasturlash texnologiyalarini o\'rganishga yordam beradi.',
      },
      {
        id: 11,
        title: 'Ingliz tili',
        duration: '6 oy',
        price: '250 000 UZS',
        image: englishImg,
        category: 'Lang',
        description: 'Ingliz tili kursi o\'quvchilarga ingliz tilida muloqot qilish va yozish qobiliyatlarini rivojlantirishga yordam beradi.',
      },
      {
        id: 12,
        title: 'Rus tili',
        duration: '6 oy',
        price: '250 000 UZS',
        image: russianImg,
        category: 'Lang',
        description: 'Rus tili kursi o\'quvchilarga rus tilini o\'rganishga va amaliy muloqotda foydalanishga yordam beradi.',
      },
    ],
    message: null,
    loading: false
  },
  getters: {
    isLoading: (state) => state.loading,
    getCourses: (state) => {
      if (state.selectedCategory === 'all') {
        return state.courses;
      }
      return state.courses.filter(course => course.category === state.selectedCategory);
    },
    getCourseById: (state) => (id) => state.courses.find(course => course.id === id),
    isSidebarOpen: (state) => state.isSidebarOpen,
  },
  mutations: {
    setCategory(state, category) {
      state.selectedCategory = category;
    },
    setSidebar(state, payload) {
      state.isSidebarOpen = payload;
    },
    SET_LOADING(state, status) {
      state.loading = status;
    },
    closeSidebar(state) {
      state.isSidebarOpen = false;
    }
  },
  actions: {
    setMessage({commit}, message){
      commit('setMessage',message)
      setTimeout(() => {
        commit('removeMessage')

      }, 5000);
    },
    toggleSidebar({ commit },isOpen) {
      commit('setSidebar',isOpen);
    },
  },
  modules: {
    auth,
    course,
    role,
    room,
    user,
    student,
    group,
    payment,
    task,
    discount,
  }
});

export default store;

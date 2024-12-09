<template>
  <section class="top__section">
      <Navbar/>
      <Home/>
    </section>

    <section class="content__section">
      <Counter/>
      <Why id="why"/>
      <Courses id="courses"/>
      <Gallery/>
      <Contact  id="contact"/>
    </section>
    
    <footer class="bottom__section">
      <Footer />
    </footer>
</template>

<script>
import Navbar from '../../sections/HomeLayout/Navbar.vue';
import Home from '../../sections/HomeLayout/Home.vue';
import Why from '../../sections/HomeLayout/Why.vue';
import Courses from '../../sections/HomeLayout/Courses.vue';
import Gallery from '../../sections/HomeLayout/Gallery.vue';
import Counter from '../../sections/HomeLayout/Counter.vue';
import Contact from '../../sections/HomeLayout/Contact.vue';
import Footer from '../../sections/HomeLayout/Footer.vue';

export default {
  components: {
    Navbar,
    Home,
    Why,
    Courses,
    Gallery,
    Counter,
    Contact,
    Footer
  }
};
</script>zz



<template>
  <transition
      name="modal"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
  >
    <div v-if="isVisible" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" @click="closeModal">
      <div
          class="bg-white rounded-lg transform transition-transform p-1 pt-3 duration-300 mx-auto"
          :class="{'scale-100': isVisible, 'scale-95': !isVisible}"
          :style="{ maxWidth: '90%', width: contentWidth, height:contentHeight, maxHeight: '390px' }"
          @click.stop
      >
        <slot></slot>
      </div>
    </div>
  </transition>
</template>


<script setup>
import { defineProps, defineEmits, ref, onMounted } from 'vue';

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['update:isVisible']);

const closeModal = () => {
  emit('update:isVisible', false);
};

const contentWidth = ref('auto');
const contentHeight = ref('auto');
onMounted(() => {
  const slotContent = document.querySelector('.modal-content');
  if (slotContent) {
    contentWidth.value = `${slotContent.offsetWidth}px`;
    contentHeight.value = `${slotContent.offsetHeight}px`;
  }
});

const beforeEnter = (el) => {
  el.style.opacity = 0;
  el.style.transform = 'scale(0.95)';
};

const enter = (el, done) => {
  el.offsetHeight; // Trigger reflow
  el.style.transition = 'opacity 0.3s, transform 0.3s';
  el.style.opacity = 1;
  el.style.transform = 'scale(1)';
  done();
};

const leave = (el, done) => {
  el.style.transition = 'opacity 0.3s, transform 0.3s';
  el.style.opacity = 0;
  el.style.transform = 'scale(0.95)';
  done();
};
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.modal-enter, .modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>

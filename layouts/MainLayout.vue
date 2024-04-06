<template>
  <q-layout class="layout" view="iHh Lpr lFf">
    <MainLayoutHeader @toggle="leftDrawerOpen = !leftDrawerOpen" />
    <MainDrawer v-model="leftDrawerOpen" />
    <q-page-container >
      <router-view  v-slot="{ Component }">
        <transition name="slide-fade" mode="out-in">
          <component class="content" :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MainLayoutHeader from '../components/Layouts/Main/MainHeader.vue'
import MainDrawer from 'src/components/Layouts/Main/MainDrawer.vue';

// states
const leftDrawerOpen = ref(false)

</script>

<style lang="scss">
.layout {
  @apply bg-surface;

  .content {
    @apply ml-3 mr-6 my-6  ;
  }
}

.slide-fade-enter {
  transform: translateX(10px);
  opacity: 0;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.2s ease;
}

.slide-fade-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}
</style>

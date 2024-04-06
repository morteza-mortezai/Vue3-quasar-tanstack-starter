<template>
  <q-layout  class="layout">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
</script>
<style lang="scss" scoped>
.layout{
  @apply bg-surface ;
}
</style>

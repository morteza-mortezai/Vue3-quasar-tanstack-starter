<template>
  <div class="page">
    <q-btn label="hello" color="primary" unelevated></q-btn>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// import { useQuery } from '@tanstack/vue-query'
// import useAuth from '../service/auth'
import textInput from './textInput.vue';
// const auth=useAuth()
const text = ref('545')
// const { isPending, isError, data, error } = useQuery({
//   queryKey: ['auth'],
//   queryFn: () => auth.login({email:'',password:''}),
// })

</script>

<style scoped>
/* @unocss; */
.page {
  @apply frame;
}
</style>

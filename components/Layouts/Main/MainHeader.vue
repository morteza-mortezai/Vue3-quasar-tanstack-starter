<template>
  <q-header bordered class="header">
    <q-toolbar>
      <!-- left -->
      <img class="logo" src="/images/logo/rentrax-logo-black.svg">
      <!-- toggle -->
      <q-btn class="toggle" dense flat round icon="menu" @click="toggleLeftDrawer" />
      <q-space class="space" />
      <!-- right -->
      <!-- dark mode -->
      <q-toggle class="dark" v-model="isDark" keep-color unchecked-icon="dark_mode" checked-icon="light_mode"
        color="green" @update:model-value="ontoggle" />
      <!-- right menu -->
      <q-btn class="profile" unelevated round icon="more_vert">
        <q-menu max-width="500px">
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup>
              <q-item-section avatar>
                <q-icon name="sym_o_person" />
              </q-item-section>
              <q-item-section>Profile</q-item-section>
              <q-item-section side>
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item @click="logout" clickable v-close-popup>
              <q-item-section avatar>
                <q-icon name="sym_o_logout" />
              </q-item-section>
              <q-item-section>Logout</q-item-section>
              <q-item-section side>
              </q-item-section>
            </q-item>
          </q-list>

        </q-menu>
      </q-btn>
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar'

// init
const $q = useQuasar()
const router = useRouter()

// states
const leftDrawerOpen = ref(false)
const emit = defineEmits<{
  toggle: [value: boolean]
}>()
const isDark = ref(false)

// methods
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
  emit('toggle', leftDrawerOpen.value)
}
function logout() {
  $q.sessionStorage.remove('access_key')
  router.push({ name: 'loginPage' })
}
function ontoggle(value: boolean) {
  const html = document.querySelector('html');
  if (value) {
    $q.dark.set(true)
    html?.classList.add('dark');
    $q.localStorage.set('isDark', true)
  } else {
    html?.classList.remove('dark');
    $q.localStorage.remove('isDark')
    $q.dark.set(false)
  }
}
function init() {
  const isDarkStorage = $q.localStorage.getItem('isDark') ? true : false
  console.log('isDarkStorage', isDarkStorage)
  $q.dark.set(isDarkStorage)
  isDark.value = isDarkStorage
}
init()
</script>

<style scoped lang="scss">
.header {
  @apply frame rounded-none text-dark shadow md:px-6;

  .logo {
    @apply order-2 md:order-1 py-4 w-[8rem];

  }

  .toggle {
    @apply order-1 md:order-2 md:ml-[10rem];
  }

  .space {
    @apply order-3;
  }

  .dark {
    @apply order-4;
  }

  .profile {
    @apply order-5;
  }
}

.toolbar {}
</style>

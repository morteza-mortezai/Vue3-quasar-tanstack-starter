<template>
  <q-drawer show-if-above v-model="leftDrawerOpen" side="left" class="drawer">
    <div class="wrap">
      <div class="inner">
        <div v-if=1 class="list" dense1>
          <!-- items -->
          <div class="item" v-for="m in menuItems" :key="m.title">
            <div class="title">
              {{ m.title }}
            </div>
            <!-- children -->
            <div class="children">
              <router-link class="child" v-for="child in m.children" :to="{ name: child.to }" :key="child.title">
                <div class="avatar">
                  <q-icon :name="child.icon" size1="1rem" />
                </div>
                <div class="child-title">{{ child.title }}</div>
              </router-link>
            </div>
          </div>

          <!-- <q-separator spaced /> -->
        </div>
      </div>
    </div>
    <!-- </dic> -->
  </q-drawer>

</template>

<script setup lang="ts">

// model
const leftDrawerOpen = defineModel({ required: false, default: false })
const menuItems = [
  {
    title: 'Home', children: [

      { title: 'Dashboard', to: 'homePage', icon: 'sym_o_home' },
      { title: 'Action', to: 'homePage2', icon: 'sym_o_thumb_up' },
    ]
  },
  {
    title: 'Report', children: [

      { title: 'Dashboard', to: 'homePage', icon: 'sym_o_home' },
      { title: 'Action', to: 'homePage2', icon: 'sym_o_thumb_up' },
    ]
  },
  {
    title: 'Configuration', children: [

      { title: 'Dashboard', to: 'homePage', icon: 'sym_o_home' },
      { title: 'Action', to: 'homePage2', icon: 'sym_o_thumb_up' },
    ]
  },
  {
    title: 'Payment', children: [

      { title: 'Dashboard', to: 'homePage', icon: 'sym_o_home' },
      { title: 'Action', to: 'homePage2', icon: 'sym_o_thumb_up' },
    ]
  },
  {
    title: 'Auth', children: [

      { title: 'Login', to: 'loginPage', icon: 'sym_o_home' },
      { title: 'Register', to: 'registerPage', icon: 'sym_o_thumb_up' },
      { title: 'Forgot', to: 'forgotPasswordPage', icon: 'sym_o_thumb_up' },
    ]
  },
]

</script>

<style lang="scss">
.drawer {
  @apply bg-surface;

  .wrap {
    @apply pl-5 pr-3 py-6 h-full;

    .inner {
      @apply frame p-5 h-full;

      .list {
        .item {
          .title {
            @apply uppercase mb-2 font-semibold;
          }

          .children {
            @apply mb-2 text-stone;

            .child {
              @apply flex gap-2 py-[0.4rem] px-4 rounded-lg;

              &:hover {
                @apply bg-sky;
              }

              .avatar {}

              .child-title {
                @apply capitalize;
              }

              &.router-link-active {
                @apply text-primary font-semibold;

                .q-icon {
                  @apply font-bold text-primary;
                }
              }
            }
          }
        }


      }
    }

  }

}
</style>

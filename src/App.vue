<template>
  <v-app>
    <navDrawer app />
    <v-content>
      <transition name="fade">
        <router-view/>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
import navDrawer from '@/components/navDrawer.vue'
export default {
  name: 'App',
  components: {
    navDrawer
  },
  data: () => ({
    //
  })
}
</script>

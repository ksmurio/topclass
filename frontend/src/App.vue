<template>
  <v-app>
    <Navbar v-if=" !hidenavbar"/>
    <v-main>
        <router-view></router-view>      
    </v-main>
  </v-app>
</template>

<style scoped>

</style>

<script setup>
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import { computed } from 'vue'

const route = useRoute()
const hidenavbar = computed(() =>
    route.path === '/' || route.path === '/register' || route.path === '/login'
  )

</script>


<template>
  <div>
    <HeaderComponent/>
    <main>
      <router-view :key="$route.path"></router-view>
    </main>
    <FooterComponent/>
  </div>
</template>
<script setup>
import HeaderComponent from '@/components/HeaderPage.vue'
import FooterComponent from '@/components/FooterPage.vue'
</script>
<style scoped>

</style>
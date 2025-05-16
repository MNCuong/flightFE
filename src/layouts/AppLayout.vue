<template>
  <HeaderComponent />
  <main>
    <router-view />
    <ChatBox />

  </main>

  <FooterComponent />
</template>
<script setup>
import ChatBox from '@/components/ChatBox.vue';
import HeaderComponent from '@/components/HeaderPage.vue'
import FooterComponent from '@/components/FooterPage.vue'
</script>

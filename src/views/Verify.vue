<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card mt-5">
          <div class="card-body">
            <h2 class="text-center mb-4">Xác thực tài khoản</h2>
            <div v-if="loading" class="text-center">
              Đang xác thực...
            </div>
            <div v-if="message" class="text-center">
              <p>{{ message }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '../services/api';  // Đảm bảo đã có api service

const route = useRoute();
const router = useRouter();
const loading = ref(true);
const message = ref('');

onMounted(async () => {
  const { userId, token } = route.query;

  if (userId && token) {
    try {
      const response = await api.get('/auth/verify', {
        params: { userId, token },
      });

      message.value = response.data;
      setTimeout(() => {
        router.push('/login');
      }, 2000);

    } catch (error) {
      message.value = error.response?.data || 'Xác thực thất bại!';
      setTimeout(() => {
        router.push('/register');
      }, 2000);
    } finally {
      loading.value = false;
    }
  } else {
    message.value = 'Thông tin xác thực không hợp lệ!';
    loading.value = false;
  }
});
</script>

<style scoped>
/* Bạn có thể thêm các style riêng của bạn vào đây */
</style>

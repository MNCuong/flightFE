<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card mt-5">
          <div class="card-body">
            <h2 class="text-center mb-4">Đăng ký tài khoản</h2>
            <form @submit.prevent="register">
              <!-- Email -->
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input v-model="email" id="email" type="email" class="form-control" required />
              </div>

              <!-- Password -->
              <div class="mb-3">
                <label for="password" class="form-label">Mật khẩu</label>
                <input v-model="password" id="password" type="password" class="form-control" required />
              </div>

              <!-- Phone number -->
              <div class="mb-3">
                <label for="phone_number" class="form-label">Số điện thoại</label>
                <input v-model="phone_number" id="phone_number" type="text" class="form-control" required />
              </div>

              <!-- Full Name -->
              <div class="mb-3">
                <label for="full_name" class="form-label">Họ và tên</label>
                <input v-model="full_name" id="full_name" type="text" class="form-control" required />
              </div>

              <!-- Submit button -->
              <button type="submit" class="btn btn-primary w-100">Đăng ký</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal component -->
    <VerifyModal :visible="isVerifyModalVisible" :email="email" @update:visible="isVerifyModalVisible = $event" @verified="goToLogin" />
  </div>
</template>

<script setup>
import VerifyModal from '../components/VerifyModal.vue'
import { useRouter } from 'vue-router'
import api from '../services/api'
import { ref } from 'vue'

const isVerifyModalVisible = ref(false)
const router = useRouter()

const email = ref('')
const password = ref('')
const phone_number = ref('')
const full_name = ref('')

const goToLogin = () => {
  isVerifyModalVisible.value = false
  router.push('/login')
}

const register = async () => {
  try {
    const payload = {
      full_name: full_name.value,
      email: email.value,
      phone_number: phone_number.value,
      password: password.value,
    };

    const res = await api.post('/user/register', payload);

    if (res.status === 200) {
      isVerifyModalVisible.value = true
    } else {
      alert('Đăng ký thất bại!');
    }

  } catch (error) {
    console.error('Đăng ký lỗi:', error);
    alert('Đăng ký thất bại!');
  }
};
</script>

<style scoped>
</style>

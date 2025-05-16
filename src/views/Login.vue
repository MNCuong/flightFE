<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card class="mt-5">
          <v-card-title class="justify-center">
            <h2>Đăng nhập</h2>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field
                  v-model="email"
                  label="Email"
                  type="email"
                  required
              ></v-text-field>

              <v-text-field
                  v-model="password"
                  label="Mật khẩu"
                  type="password"
                  required
              ></v-text-field>

              <v-checkbox
                  v-model="rememberMe"
                  label="Ghi nhớ đăng nhập"
              ></v-checkbox>

              <v-btn
                  type="submit"
                  color="primary"
                  block
                  class="mt-4"
              >
                Đăng nhập
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script setup>
import {onMounted, ref} from 'vue'
import {useRouter} from 'vue-router'
import api from '../services/api.js'
import {jwtDecode} from 'jwt-decode';

const router = useRouter()
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const refresh_token = ref('')

onMounted(() => {
  const savedEmail = localStorage.getItem('rememberedEmail')
  const savedPassword = localStorage.getItem('rememberedPassword')
  if (savedEmail && savedPassword) {
    email.value = savedEmail
    password.value = savedPassword
    rememberMe.value = true
  }
})
const login = async () => {
  try {
    const payload = {
      email: email.value,
      password: password.value
    };
    console.log("Payload gửi đi:", payload);

    const res = await api.post('/auth/login', payload);
    const data = res?.data?.data;
    if (!data) {
      console.error("No data returned from server");
      return;
    }

    const token = data.token;
    const refreshToken = data.refresh_token;
    localStorage.setItem('token', token);
    localStorage.setItem('refresh_token', refreshToken);

    const decoded = jwtDecode(token);
    console.log("Decoded JWT:", decoded);

    const roles = decoded.roles || [];
    const isAdmin = roles.includes('ADMIN');

    if (isAdmin) {
      alert('Trang này chỉ dành cho khách hàng. Vui lòng đăng nhập lại với quyền khách hàng.');
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      router.push('/login');
      return;
    }

    if (rememberMe.value) {
      localStorage.setItem('rememberedEmail', email.value);
      localStorage.setItem('rememberedPassword', password.value);
    } else {
      localStorage.removeItem('rememberedEmail');
      localStorage.removeItem('rememberedPassword');
    }
    alert("Đăng nhập thành công");

    router.push('/');
  } catch (error) {
    console.error('Lỗi đăng nhập:', error.response?.data || error.message);
    alert('Đăng nhập thất bại!');
  }
};
</script>
<style scoped>
</style>

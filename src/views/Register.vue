<template>
  <v-container fluid class="register-container d-flex align-center justify-center">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="5" lg="4">
        <v-card class="pa-8 elevation-12 rounded-xl">
          <v-card-title class="justify-center mb-6 primary--text">
            <h2 class="text-center font-weight-bold">Đăng ký tài khoản</h2>
          </v-card-title>
          <v-card-text>
            <v-form ref="formRef" @submit.prevent="register" v-slot="{ valid }">
              <!-- Full name -->
              <v-text-field
                  v-model="full_name"
                  label="Họ và tên"
                  variant="outlined"
                  rounded="lg"
                  density="comfortable"
                  prepend-inner-icon="mdi-account"
                  :rules="[v => !!v || 'Họ và tên là bắt buộc']"
                  required
                  clearable
                  class="mb-6"
              />

              <!-- Email -->
              <v-text-field
                  v-model="email"
                  label="Email"
                  type="email"
                  variant="outlined"
                  rounded="lg"
                  density="comfortable"
                  prepend-inner-icon="mdi-email"
                  :rules="[v => !!v || 'Email là bắt buộc', v => /.+@.+\..+/.test(v) || 'Email không hợp lệ']"
                  required
                  clearable
                  class="mb-6"
              />

              <!-- Phone number -->
              <v-text-field
                  v-model="phone_number"
                  label="Số điện thoại"
                  variant="outlined"
                  rounded="lg"
                  density="comfortable"
                  prepend-inner-icon="mdi-phone"
                  :rules="[v => !!v || 'Số điện thoại là bắt buộc', v => /^[0-9]{9,15}$/.test(v) || 'Số điện thoại không hợp lệ']"
                  required
                  clearable
                  class="mb-6"
              />

              <!-- Password -->
              <v-text-field
                  v-model="password"
                  label="Mật khẩu"
                  type="password"
                  variant="outlined"
                  rounded="lg"
                  density="comfortable"
                  prepend-inner-icon="mdi-lock"
                  :rules="[v => !!v || 'Mật khẩu là bắt buộc', v => v.length >= 6 || 'Mật khẩu ít nhất 6 ký tự']"
                  required
                  clearable
                  class="mb-6"
              />


              <v-btn
                  type="submit"
                  :loading="isLoading"
                  color="primary"
                  block
                  class="mt-4 rounded-lg text-white text-base font-weight-medium"
                  elevation="2"
              >
                <template #default>
                  <v-icon start>mdi-account-plus-outline</v-icon>
                  Đăng ký
                </template>
              </v-btn>

              <v-btn
                  color="secondary"
                  block
                  class="mt-2 rounded-lg text-white text-base font-weight-medium"
                  elevation="2"
                  @click="goToLogin1"
              >
              <template #default>
                <v-icon start>mdi-login</v-icon>
                Đăng nhập
              </template>
              </v-btn>

            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Modal xác thực -->
    <VerifyModal
        :visible="isVerifyModalVisible"
        :email="email"
        @update:visible="isVerifyModalVisible = $event"
        @verified="goToLogin"
    />
    <v-dialog v-model="dialog" max-width="420" transition="dialog-bottom-transition">
      <v-card class="rounded-xl pa-5">
        <div class="d-flex align-center mb-3">
          <v-avatar size="36" class="me-3" color="red-lighten-4">
            <v-icon color="red-darken-2">mdi-alert-circle</v-icon>
          </v-avatar>
          <span class="text-h6 font-weight-medium">Lỗi</span>
        </div>

        <v-alert
            :type="dialogType"
            variant="tonal"
            border="start"
            color="red-darken-1"
            class="rounded-lg mb-4"
            icon="mdi-close-circle"
            prominent
        >
          <div class="text-body-1">{{ dialogMessage }}</div>
        </v-alert>

        <v-card-actions class="justify-end mt-2">
          <v-btn
              color="primary"
              variant="flat"
              class="text-white text-capitalize rounded-lg px-5 py-2"
              @click="dialog = false"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'
import VerifyModal from '../components/VerifyModal.vue'

const email = ref('')
const password = ref('')
const phone_number = ref('')
const full_name = ref('')
const isLoading = ref(false)
const isVerifyModalVisible = ref(false)
const formRef = ref(null)
const dialog = ref(false)
const dialogMessage = ref('')
const dialogType = ref('error')
const router = useRouter()
const goToLogin1 = () => {
  router.push('/login')
}

const goToLogin = () => {
  isVerifyModalVisible.value = false
  router.push('/login')
}

const register = async () => {
  if (!formRef.value?.validate()) return

  isLoading.value = true
  try {
    const payload = {
      full_name: full_name.value,
      email: email.value,
      phone_number: phone_number.value,
      password: password.value,
    }

    const res = await api.post('/user/register', payload)

    if (res.status === 200) {
      isVerifyModalVisible.value = true
      dialogMessage.value = error
      dialogType.value = 'error'
      dialog.value = true
    } else {
      dialogMessage.value = 'Đăng ký thất bại.'
      dialogType.value = 'error'
      dialog.value = true    }
  } catch (error) {
    console.error('Đăng ký lỗi:', error)
    dialogMessage.value = error
    dialogType.value = 'error'
    dialog.value = true
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.register-container {
  min-height: 100vh;
  background: linear-gradient(to right, #74ebd5, #9face6);
}

.primary--text {
  color: #1976d2 !important; /* màu primary Vuetify */
}

.v-card {
  background: #fff;
  box-shadow: 0 12px 20px -10px rgba(25, 118, 210, 0.3);
  transition: box-shadow 0.3s ease;
}

.v-card:hover {
  box-shadow: 0 20px 40px -12px rgba(25, 118, 210, 0.45);
}

.v-text-field input {
  font-size: 1rem;
}

.v-btn {
  font-weight: 600;
  font-size: 1.1rem;
  text-transform: none;
}
.v-alert .v-alert__content {
  font-size: 15px;
  line-height: 1.6;
}
</style>

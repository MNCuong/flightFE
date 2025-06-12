<template>
  <v-container fluid class="login-container d-flex align-center justify-center">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="5" lg="4">
        <v-card class="pa-6 elevation-12 rounded-xl">
          <v-card-title class="justify-center mb-4">
            <h2 class="text-center font-weight-bold">Đăng nhập</h2>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login" ref="form">
              <v-text-field
                  v-model="email"
                  label="Email"
                  variant="outlined"
                  rounded="lg"
                  required
                  :rules="[v => !!v || 'Email là bắt buộc', v => /.+@.+\..+/.test(v) || 'Email không hợp lệ']"
                  density="comfortable"
                  prepend-inner-icon="mdi-email"
              />
              <br>
              <v-text-field
                  v-model="password"
                  label="Mật khẩu"
                  type="password"
                  required
                  variant="outlined"
                  rounded="lg"
                  :rules="[v => !!v || 'Mật khẩu là bắt buộc', v => v.length >= 6 || 'Mật khẩu ít nhất 6 ký tự']"
                  density="comfortable"
                  prepend-inner-icon="mdi-lock"
              />


              <v-row align="center" class="mt-2">
                <v-checkbox
                    v-model="rememberMe"
                    label="Ghi nhớ đăng nhập"
                    hide-details
                    density="compact"
                    color="primary"
                    class="pa-0 ma-0"
                    style="margin-left: -8px;"
                />
              </v-row>


              <v-row align="center" justify="space-between" class="mt-4">
                <v-col cols="6">
                  <v-btn
                      type="submit"
                      :loading="isLoading"
                      color="primary"
                      block
                      class="rounded-lg text-white text-base font-weight-medium"
                      elevation="2"
                  >
                    <template #default>
                      <v-icon start>mdi-login</v-icon>
                      Đăng nhập
                    </template>
                  </v-btn>
                </v-col>

                <v-col cols="6">
                  <v-btn
                      color="secondary"
                      block
                      class="rounded-lg text-white text-base font-weight-medium"
                      elevation="2"
                      @click="goToHome"
                  >
                    <template #default>
                      <v-icon start>mdi-home</v-icon>
                      Trang chủ
                    </template>
                  </v-btn>
                </v-col>
              </v-row>
              <!--              <v-row>-->
              <!--                <v-col cols="12" sm="6" md="12">-->
              <!--                  <v-btn-->
              <!--                      color="red darken-1"-->
              <!--                      dark-->
              <!--                      elevation="2"-->
              <!--                      style="border-radius: 4px;"-->
              <!--                      block-->
              <!--                      @click="loginGoogle"-->
              <!--                  >-->
              <!--                    <v-icon left>mdi-google</v-icon>-->
              <!--                    -Login with Google-->
              <!--                  </v-btn>-->
              <!--                </v-col>-->
              <!--              </v-row>-->
              <!--              <v-row>-->
              <!--                <v-col cols="12" sm="6" md="12">-->
              <!--                  <v-btn-->
              <!--                      color="blue darken-1"-->
              <!--                      dark-->
              <!--                      elevation="2"-->
              <!--                      style="border-radius: 4px;"-->
              <!--                      block-->
              <!--                      @click="loginFacebook"-->
              <!--                  >-->
              <!--                    <v-icon left>mdi-facebook</v-icon>-->
              <!--                   -Login with Facebook-->
              <!--                  </v-btn>-->
              <!--                </v-col>-->
              <!--              </v-row>-->
<!--              <v-row>-->
<!--                <v-col cols="6" sm="6" md="6">-->
<!--                  <GoogleLogin-->
<!--                      :client-id="clientId"-->
<!--                      :callback="handleCredentialResponse"-->
<!--                  />-->
<!--                </v-col>-->
<!--                <v-col cols="6" sm="6" md="6">-->
<!--                <FaceBookLogin-->
<!--                    :client-id="clientId"-->
<!--                    :callback="handleCredentialResponse"-->
<!--                />-->
<!--              </v-col>-->
<!--              </v-row>-->
              <v-row justify="center" class="mt-2">
                <v-col cols="6" class="text-center">
                  <a href="javascript:void(0)" @click="openForgotPasswordDialog" class="text-decoration-none"
                     style="color: #1976d2;">
                    Quên mật khẩu?
                  </a>


                </v-col>

              </v-row>


            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
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
    <v-dialog v-model="successDialog" max-width="420" transition="dialog-bottom-transition">
      <v-card class="rounded-xl pa-5">
        <div class="d-flex align-center mb-3">
          <v-avatar size="36" class="me-3" color="green-lighten-4">
            <v-icon color="green-darken-2">mdi-check-circle</v-icon>
          </v-avatar>
          <span class="text-h6 font-weight-medium">Thành công</span>
        </div>

        <v-alert
            type="success"
            variant="tonal"
            border="start"
            color="green-darken-1"
            class="rounded-lg mb-4"
            icon="mdi-check-circle"
            prominent
        >
          <div class="text-body-1">{{ successMessage }}</div>
        </v-alert>

        <v-card-actions class="justify-end mt-2">
          <v-btn
              color="primary"
              variant="flat"
              class="text-white text-capitalize rounded-lg px-5 py-2"
              @click="successDialog = false"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="forgotPasswordDialog" max-width="420" transition="dialog-bottom-transition">
      <v-card class="rounded-xl pa-5">
        <v-card-title class="text-h6 font-weight-bold text-center mb-2">Khôi phục mật khẩu</v-card-title>
        <v-card-text>
          <v-text-field
              v-model="forgotEmail"
              label="Nhập email của bạn"
              variant="outlined"
              prepend-inner-icon="mdi-email"
              :rules="[v => !!v || 'Email là bắt buộc', v => /.+@.+\..+/.test(v) || 'Email không hợp lệ']"
          />
        </v-card-text>

        <v-card-actions class="justify-end">
          <v-btn variant="text" @click="forgotPasswordDialog = false">Hủy</v-btn>
          <v-btn color="primary" @click="checkEmail" :loading="forgotLoading">
            Gửi
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="resetPasswordDialog" max-width="420">
      <v-card class="rounded-xl pa-5">
        <v-card-title class="text-h6 font-weight-bold text-center mb-2">Đặt lại mật khẩu</v-card-title>
        <v-card-text>
          <v-text-field
              v-model="newPassword"
              label="Mật khẩu mới"
              type="password"
              variant="outlined"
              prepend-inner-icon="mdi-lock"
              :rules="[v => !!v || 'Mật khẩu là bắt buộc', v => v.length >= 6 || 'Ít nhất 6 ký tự']"
          />
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="resetPasswordDialog = false">Hủy</v-btn>
          <v-btn color="primary" @click="resetPassword" :loading="resetLoading">Xác nhận</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


  </v-container>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import {useRouter} from 'vue-router'
import api from '../services/api.js'
import {jwtDecode} from 'jwt-decode'
import {GoogleLogin} from 'vue3-google-login'

const forgotPasswordDialog = ref(false)
const forgotEmail = ref('')
const forgotLoading = ref(false)

const resetPasswordDialog = ref(false)
const newPassword = ref('')
const resetLoading = ref(false)
const router = useRouter()
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const isLoading = ref(false)
const dialog = ref(false)
const dialogMessage = ref('')
const dialogType = ref('error')
const successDialog = ref(false)
const successMessage = ref('Mật khẩu đã được cập nhật. Vui lòng đăng nhập lại.')
let lockTimeStr = ref('')
let lockTime = ref('')
let unlockTime = ref('')
const countdown = ref('')
const remainingTime = ref(0)
const timer = ref(null)

const goToHome = () => {
  router.push('/')
}

const openForgotPasswordDialog = () => {
  forgotPasswordDialog.value = true
  forgotEmail.value = ''
}


const clientId = '196248230427-brrau4oanuoggse5pvnft7lchqj6vf49.apps.googleusercontent.com'

const handleCredentialResponse = (response) => {
  console.log('Google ID token:', response.credential)

  fetch('http://localhost:5000/api/auth/google', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: response.credential
    })
  })
      .then(res => res.json())
      .then(data => {
        console.log('Backend response:', data)
      })
}
const loginGoogle = () => {
  window.location.href = 'http://localhost:5000/oauth2/authorization/google';
}
const loginFacebook = () => {
  window.location.href = 'http://localhost:5000/oauth2/authorization/google';
}


const checkEmail = async () => {
  if (!forgotEmail.value || !/.+@.+\..+/.test(forgotEmail.value)) {
    dialogMessage.value = 'Vui lòng nhập email hợp lệ.'
    dialogType.value = 'error'
    dialog.value = true
    return
  }

  forgotLoading.value = true
  const email = forgotEmail.value?.trim()
  try {
    console.log("data: ", forgotEmail.value)
    const res = await api.post(`/user/forgot-password/${encodeURIComponent(email)}`)
    if (res.data.code === '200') {
      forgotPasswordDialog.value = false
      resetPasswordDialog.value = true
    } else {
      dialogMessage.value = 'Không tìm thấy tài khoản với email này.'
      dialogType.value = 'error'
      dialog.value = true
    }
  } catch (err) {
    dialogMessage.value = err
    dialogType.value = 'error'
    dialog.value = true
  } finally {
    forgotLoading.value = false
  }
}

const resetPassword = async () => {
  if (!newPassword.value || newPassword.value.length < 6) {
    dialogMessage.value = 'Mật khẩu mới ít nhất 6 ký tự.'
    dialogType.value = 'error'
    dialog.value = true
    return
  }

  resetLoading.value = true
  try {
    const res = await api.post('/user/reset-password', {
      email: forgotEmail.value,
      newPassword: newPassword.value,
    })

    resetPasswordDialog.value = false
    successMessage.value = 'Mật khẩu đã được cập nhật. Vui lòng đăng nhập lại.'
    successDialog.value = true

  } catch (err) {
    dialogMessage.value = 'Không thể đặt lại mật khẩu.'
    dialogType.value = 'error'
    dialog.value = true
  } finally {
    resetLoading.value = false
  }
}
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
  isLoading.value = true
  try {
    const payload = {
      email: email.value,
      password: password.value,
    }

    const res = await api.post('/auth/login', payload)
    const data = res?.data?.data
    if (!data) {
      dialogMessage.value = 'Sai email hoặc mật khẩu.'
      dialogType.value = 'error'
      dialog.value = true

      return
    }

    const token = data.token
    const refreshToken = data.refresh_token
    localStorage.setItem('token', token)
    localStorage.setItem('refresh_token', refreshToken)

    const decoded = jwtDecode(token)
    const roles = decoded.roles || []

    if (roles.includes('ADMIN')) {
      dialogMessage.value = 'Trang này chỉ dành cho khách hàng. Vui lòng đăng nhập lại.'
      dialogType.value = 'error'
      dialog.value = true

      localStorage.removeItem('token')
      localStorage.removeItem('refresh_token')
      await router.push('/login')
      return
    }

    if (rememberMe.value) {
      localStorage.setItem('rememberedEmail', email.value)
      localStorage.setItem('rememberedPassword', password.value)
    } else {
      localStorage.removeItem('rememberedEmail')
      localStorage.removeItem('rememberedPassword')
    }

    await router.push('/')
  } catch (err) {
    if (err.response.data.data.lock_time != null) {
      lockTimeStr = err.response.data.data.lock_time;
      lockTime = new Date(lockTimeStr);
      unlockTime = new Date(lockTime.getTime() + 15 * 60000);
      dialogMessage.value = handleLockCountdown(unlockTime)
    }
    {
      dialogMessage.value = err.response.data.message
      dialogType.value = 'error'
      dialog.value = true
      console.log(err.response.data.message)
    }

    // handleLockCountdown(unlockTime)
  } finally {
    isLoading.value = false
  }
}
const handleLockCountdown = (unlockTimeStr) => {
  const unlockDate = new Date(unlockTimeStr)
  const now = new Date()
  remainingTime.value = Math.floor((unlockDate - now) / 1000)

  if (remainingTime.value > 0) {
    updateCountdownDisplay()
    if (timer.value) {
      clearInterval(timer.value)
    }

    timer.value = setInterval(() => {
      remainingTime.value -= 1
      updateCountdownDisplay()

      if (remainingTime.value <= 0) {
        clearInterval(timer.value)
        dialog.value = false
      }
    }, 1000)

    dialogMessage.value = `Tài khoản của bạn đang bị khóa. Vui lòng thử lại sau ${countdown.value}`
    dialogType.value = 'error'
    dialog.value = true
  }
}

const updateCountdownDisplay = () => {
  const minutes = Math.floor(remainingTime.value / 60)
  const seconds = remainingTime.value % 60
  countdown.value = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  dialogMessage.value = `Tài khoản của bạn đang bị khóa. Vui lòng thử lại sau ${countdown.value}`
}

</script>

<style scoped>
.login-container {
  min-height: 100vh;
  background: linear-gradient(to right, #74ebd5, #9face6);
}

.v-alert .v-alert__content {
  font-size: 15px;
  line-height: 1.6;
}

</style>

<template>
  <div v-if="visible" class="modal-backdrop">
    <div class="modal-dialog">
      <h5 class="modal-title">Xác thực email</h5>
      <p class="modal-content">
        <span v-if="isLoading">
          <i class="fas fa-spinner fa-spin"></i> Đang kiểm tra...
        </span>
        <span v-else>
          Chúng tôi đã gửi một email xác thực đến địa chỉ <b>{{ email }}</b>.<br/>
          Vui lòng kiểm tra hộp thư đến và nhấp vào liên kết xác thực để hoàn tất đăng ký.
        </span>
      </p>

    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, onBeforeUnmount} from 'vue'
import api from '../services/api'

const props = defineProps({
  visible: Boolean,
  email: String
})
const emit = defineEmits(['update:visible', 'verified'])

let interval = null
let isLoading = ref(false)

const startPolling = () => {
  interval = setInterval(checkVerification, 5000)
}
const stopPolling = () => {
  clearInterval(interval)
  interval = null
}

const checkVerification = async () => {
  try {
    isLoading.value = true  // Bắt đầu loading
    const res = await api.get('/user/is-verified', {
      params: {email: props.email}
    })
    if (res.status === 200 && res.data === true) {
      emit('update:visible', false)
      emit('verified')
      stopPolling()
    }
  } catch (error) {
    console.error('Lỗi xác thực:', error)
  } finally {
    isLoading.value = false  // Kết thúc loading
  }
}

onMounted(() => {
  if (props.visible) startPolling()
})
onBeforeUnmount(() => stopPolling())
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050;
  opacity: 0;
  animation: fadeIn 0.3s forwards;
}

.modal-dialog {
  background: #fff;
  padding: 30px;
  border-radius: 15px;
  width: 450px;
  max-width: 90%;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  animation: slideUp 0.3s ease-out;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}

.modal-content {
  font-size: 1rem;
  color: #555;
  line-height: 1.5;
  margin-bottom: 20px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
}

button {
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 25px;
  border: none;
  transition: background-color 0.3s, transform 0.2s;
}

button:hover {
  background-color: #28a745;
  transform: translateY(-2px);
}

button:focus {
  outline: none;
}

button i {
  margin-right: 8px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(30px);
  }
  to {
    transform: translateY(0);
  }
}
</style>

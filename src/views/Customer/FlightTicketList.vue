<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">Lịch sử đặt vé</h2>

    <div v-for="(transaction, index) in transactions" :key="index" class="border p-4 rounded-xl mb-4 shadow">
      <h3 class="font-semibold text-lg mb-2">Giao dịch #{{ transaction.transactionId }}</h3>
      <p>Ngày giao dịch: {{ transaction.transactionDate }}</p>
      <p>Phương thức: {{ transaction.paymentMethod }}</p>
      <p>Trạng thái: <span :class="transaction.status === 'SUCCESS' ? 'text-green-600' : 'text-red-600'">{{ transaction.status }}</span></p>
      <p>Tổng tiền: {{ transaction.amount.toLocaleString() }} VND</p>

      <div class="mt-4">
        <h4 class="font-semibold">Danh sách vé:</h4>
        <table class="w-full table-auto border-collapse mt-2">
          <thead>
          <tr class="bg-gray-200">
            <th class="border p-2">Ghế</th>
            <th class="border p-2">Hạng</th>
            <th class="border p-2">Loại chuyến</th>
            <th class="border p-2">Giá</th>
            <th class="border p-2">Tên hành khách</th>
            <th class="border p-2">CMND/Hộ chiếu</th>
            <th class="border p-2">Quốc tịch</th>
            <th class="border p-2">Email</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(ticket, i) in transaction.tickets" :key="i">
            <td class="border p-2">{{ ticket.seatNumber }}</td>
            <td class="border p-2">{{ ticket.classType }}</td>
            <td class="border p-2">{{ ticket.tripType }}</td>
            <td class="border p-2">{{ ticket.price.toLocaleString() }} VND</td>
            <td class="border p-2">{{ ticket.passenger.fullName }}</td>
            <td class="border p-2">{{ ticket.passenger.identification }}</td>
            <td class="border p-2">{{ ticket.passenger.nationality }}</td>
            <td class="border p-2">{{ ticket.passenger.email }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from '@/services/api.js'

const transactions = ref([])
const page = ref(0)
const size = ref(5)

const fetchHistory = async () => {
  try {
    const res = await axios.get('/payment/grouped-by-transaction', {
      params: {
        page: page.value,
        size: size.value
      }
    })
    transactions.value = res.data.data
  } catch (error) {
    console.error('Lỗi khi lấy lịch sử giao dịch:', error)
  }
}


onMounted(() => {
  fetchHistory()
})
</script>

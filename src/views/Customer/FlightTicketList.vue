<template>
  <section class="about-banner relative text-white text-center py-5 bg-primary">
    <div class="container">
      <h1 class="mb-2">Lịch sử đặt vé</h1>
      <p class="breadcrumb">
        <a href="/" class="text-white text-decoration-underline">Trang chủ</a>
        <span class="mx-2">→</span>
        <a href="/flight-ticket-list" class="text-white text-decoration-underline">Lịch sử đặt vé</a>
      </p>
    </div>
  </section>

  <section class="container my-5">
    <p v-if="allTransactions.length === 0 && loaded" class="text-center text-muted">
      Bạn chưa đặt vé nào. Vui lòng đặt vé để xem lịch sử.
    </p>


    <div class="row g-4" v-else>
      <div v-for="(transaction, index) in pagedTransactions" :key="transaction.transactionNo" class="col-12">
        <div class="card shadow-sm border rounded-4 p-4">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <div>
              <h6>📌 Mã giao dịch: <strong>{{ transaction.transactionNo }}</strong></h6>
              <small class="text-muted">🕓 Ngày đặt: {{ transaction.transactionDate }}</small>
            </div>
            <button class="btn btn-outline-primary btn-sm rounded-pill" @click="toggleDetails(index)">
              {{ transaction.showDetails ? 'Ẩn chi tiết' : 'Hiện chi tiết' }}
            </button>
          </div>

          <div v-if="transaction.showDetails" class="mt-3 border-top pt-3">
            <div v-for="(ticket, idx) in transaction.tickets" :key="idx" class="border rounded-3 p-3 mb-3">
              <div class="row">
                <div class="col-md-6">
                  <p>💺 <strong>Ghế:</strong> {{ ticket.seatNumber }}</p>
                  <p>👤 <strong>Hành khách:</strong> {{ ticket.passengerName }} / {{ ticket.classType }}</p>
                  <p>🗓️ <strong>Ngày bay:</strong> {{ transaction.transactionDate }}</p>
                </div>
                <div class="col-md-6">
                  <p>⏰ <strong>Giờ bay:</strong> {{ transaction.flight.departureTime }}</p>
                  <p>🛫 <strong>Đi:</strong> {{ transaction.flight.departureAirport }}</p>
                  <p>🛬 <strong>Đến:</strong> {{ transaction.flight.arrivalAirport }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <v-divider></v-divider>
      </div>
    </div>

    <!-- Phân trang -->
    <div class="d-flex justify-content-center align-items-center mt-4" v-if="totalPages > 1">
      <button class="btn btn-outline-secondary me-2" @click="prevPage" :disabled="page === 0">
        ◀ Trang trước
      </button>
      <span>Trang <strong>{{ page + 1 }}</strong> / {{ totalPages }}</span>
      <button class="btn btn-outline-secondary ms-2" @click="nextPage" :disabled="page >= totalPages - 1">
        Trang sau ▶
      </button>
    </div>

  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import api from '@/services/api'
import {formatDate} from "vue3-date-time-picker/src/Vue3DatePicker/utils/date-utils.js";

const allTransactions = ref([]) // chứa toàn bộ dữ liệu từ API
const page = ref(0)
const pageSize = 5
const loaded = ref(false)

// Dữ liệu hiển thị hiện tại (theo trang)
const pagedTransactions = computed(() => {
  const start = page.value * pageSize
  return allTransactions.value.slice(start, start + pageSize)
})

const totalPages = computed(() => {
  return Math.ceil(allTransactions.value.length / pageSize)
})

const fetchGroupedTickets = async () => {
  try {

    const res = await api.get('/ticket/grouped-by-transaction')
    console.log(res.data.data)
    allTransactions.value = res.data.data.map(t => ({
      ...t,
      showDetails: false
    }))
    loaded.value = true
  } catch (err) {
    console.error('Lỗi khi lấy lịch sử đặt vé:', err)
  }
}

const toggleDetails = index => {
  const globalIndex = page.value * pageSize + index
  allTransactions.value[globalIndex].showDetails = !allTransactions.value[globalIndex].showDetails
}

const prevPage = () => {
  if (page.value > 0) page.value--
}

const nextPage = () => {
  if (page.value < totalPages.value - 1) page.value++
}

onMounted(fetchGroupedTickets)
</script>


<style scoped>
.container {
  max-width: 800px;
  margin: auto;
  padding: 1rem;
}

.ticket-card {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: #f9f9f9;
}

.ticket-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ticket-details {
  margin-top: 1rem;
  padding-left: 1rem;
  border-left: 3px solid #007BFF;
}

button {
  padding: 6px 12px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.ticket-details {
  margin-top: 1rem;
  padding: 1rem;
  border-left: 4px solid #007BFF;
  background-color: #f0f8ff;
  border-radius: 8px;
}

.detail-row {
  display: flex;
  margin-bottom: 0.5rem;
}

.label {
  width: 150px;
  font-weight: 600;
  color: #333;
}

.value {
  flex: 1;
  color: #444;
}

.passenger-list {
  margin: 0;
  padding-left: 1.2rem;
  list-style-type: disc;
}

.ticket-details-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding: 1rem;
  border-left: 4px solid #007BFF;
  background-color: #f0f8ff;
  border-radius: 8px;
  margin-top: 1rem;
}

.detail-column {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.detail-row {
  display: flex;
  align-items: center;
}

.label {
  width: 120px;
  font-weight: 600;
  color: #333;
}

.value {
  flex: 1;
  color: #444;
}

.passenger-list {
  margin: 0;
  padding-left: 1rem;
  list-style-type: disc;
}

@media (max-width: 768px) {
  .ticket-details-grid {
    grid-template-columns: 1fr;
  }
}
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
}

.pagination button {
  padding: 6px 12px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

</style>

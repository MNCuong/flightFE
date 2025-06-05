<template>
  <div>
    <div v-if="flights.length === 0">Không có chuyến bay phù hợp</div>
    <div v-else class="row">
      <div v-for="flight in flights" :key="flight.id" class="col-md-6 mb-3">
        <div class="card p-3">
          <h5>{{ flight.flightCode }}</h5>
          <p><strong>Khởi hành:</strong> {{ flight.departureAirport }} - {{ formatTime(flight.departureTime) }}</p>
          <p><strong>Đến:</strong> {{ flight.arrivalAirport }} - {{ formatTime(flight.arrivalTime) }}</p>
          <p><strong>Giá vé:</strong> {{ formatCurrency(flight.priceEconomy) }}</p>
          <button
              :class="['btn', selectedFlight?.id === flight.id ? 'btn-success' : 'btn-outline-primary']"
              @click="$emit('select', flight)"
          >
            {{ selectedFlight?.id === flight.id ? 'Bỏ chọn' : label }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  flights: Array,
  selectedFlight: Object,
  label: String,
});

const formatTime = (time) => {
  return new Date(time).toLocaleString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

const formatCurrency = (val) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
};
</script>

<style scoped>
.card {
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0,0,0,0.1);
}
</style>

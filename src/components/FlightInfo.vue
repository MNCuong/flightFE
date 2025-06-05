<template>
  <div>
    <h4>{{ flight.flightCode }}</h4>
    <p>Khởi hành: {{ flight.departureAirport }} - {{ formatTime(flight.departureTime) }}</p>
    <p>Đến: {{ flight.arrivalAirport }} - {{ formatTime(flight.arrivalTime) }}</p>
    <p>Giá vé: {{ formatCurrency(flight.priceEconomy) }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  flight: Object
});

const formatTime = (time) => new Date(time).toLocaleString('vi-VN', {
  hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric'
});
const formatCurrency = (val) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
</script>

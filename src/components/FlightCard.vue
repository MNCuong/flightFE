<template>
  <div class="flight-card" @click="select">
    ✈️ {{ flight.airline }} | {{ flight.departureTime }} - {{ flight.arrivalTime }}
    <br />
    💵 Giá: {{ flight.price }} VND
  </div>
</template>

<script setup>
defineProps(['flight'])
const emit = defineEmits(['select'])

const select = () => emit('select', flight)
</script>
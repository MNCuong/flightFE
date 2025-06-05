<template>
  <section class="relative about-banner">
    <div class="overlay overlay-bg">
    </div>
    <div class="container">
      <div class="row d-flex align-items-center justify-content-center">
        <div class="about-content col-lg-12">
          <h1 class="text-white">
            Nhập thông tin hành khách và chọn ghế          </h1>
          <p class="text-white link-nav">
            <a href="index.html">
              Trang Chủ
            </a>
            <span class="lnr lnr-arrow-right">
                        </span>
            <a href="contact.html">
              Nhập thông tin hành khách và chọn ghế            </a>
          </p>
        </div>
      </div>
    </div>
  </section>
  <div class="container mt-5">
<v-row>
    <!-- Thông tin chuyến đi -->
    <div v-if="departureFlight" class="mb-4">
      <h4>Chuyến đi: {{ departureFlight.flightCode }}</h4>
      <p><strong>Khởi hành:</strong> {{ departureFlight.departureAirport }} - {{ formatTime(departureFlight.departureTime) }}</p>
      <p><strong>Đến:</strong> {{ departureFlight.arrivalAirport }} - {{ formatTime(departureFlight.arrivalTime) }}</p>

      <h5>Chọn ghế ngồi chuyến đi</h5>
      <div class="seat-selection" style="max-width: 330px;">
        <div v-for="(rowSeats, rowIndex) in groupedDepartureSeats" :key="'dep-row-' + rowIndex" class="d-flex">
          <button
              v-for="seat in rowSeats"
              :key="'dep-' + seat"
              :class="['btn', selectedDepartureSeat === seat ? 'btn-primary' : 'btn-outline-primary']"
              @click="selectedDepartureSeat = seat"
              type="button"
              class="m-1"
              style="width: 45px; height: 45px; font-weight: bold;"
          >
            {{ seat }}
          </button>
        </div>
      </div>

    </div>

    <hr v-if="returnFlight" />

    <div v-if="returnFlight" class="mb-4">
      <h4>Chuyến về: {{ returnFlight.flightCode }}</h4>
      <p><strong>Khởi hành:</strong> {{ returnFlight.departureAirport }} - {{ formatTime(returnFlight.departureTime) }}</p>
      <p><strong>Đến:</strong> {{ returnFlight.arrivalAirport }} - {{ formatTime(returnFlight.arrivalTime) }}</p>

      <h5>Chọn ghế ngồi chuyến về</h5>
      <div class="seat-selection" style="max-width: 330px;">
        <div v-for="(rowSeats, rowIndex) in groupedReturnSeats" :key="'ret-row-' + rowIndex" class="d-flex">
          <button
              v-for="seat in rowSeats"
              :key="'ret-' + seat"
              :class="['btn', selectedReturnSeat === seat ? 'btn-primary' : 'btn-outline-primary']"
              @click="selectedReturnSeat = seat"
              type="button"
              class="m-1"
              style="width: 45px; height: 45px; font-weight: bold;"
          >
            {{ seat }}
          </button>
        </div>
      </div>

    </div>
</v-row>
    <hr />

    <h4>Thông tin hành khách</h4>
    <form @submit.prevent="submitBooking" novalidate>
      <div class="mb-3">
        <label for="fullname" class="form-label">Họ tên</label>
        <input
            id="fullname"
            type="text"
            v-model="passenger.fullname"
            class="form-control"
            placeholder="Nhập họ tên"
            required
        />
      </div>

      <div class="mb-3">
        <label for="phone" class="form-label">Số điện thoại</label>
        <input
            id="phone"
            type="tel"
            v-model="passenger.phone"
            class="form-control"
            placeholder="Nhập số điện thoại"
            required
        />
      </div>

      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input
            id="email"
            type="email"
            v-model="passenger.email"
            class="form-control"
            placeholder="Nhập email"
            required
        />
      </div>

      <button type="submit" class="btn btn-success w-100">Xác nhận đặt vé</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from '../../services/api.js';
import { computed } from 'vue';

const route = useRoute();
const router = useRouter();

const departureFlightId = route.query.departureFlightId;
const returnFlightId = route.query.returnFlightId;

const departureFlight = ref(null);
const returnFlight = ref(null);


const selectedDepartureSeat = ref(null);
const selectedReturnSeat = ref(null);

const groupedDepartureSeats = computed(() => {
  const seatsPerRow = 6;
  const rows = [];
  for (let i = 0; i < departureSeats.value.length; i += seatsPerRow) {
    rows.push(departureSeats.value.slice(i, i + seatsPerRow));
  }
  return rows;
});

const groupedReturnSeats = computed(() => {
  const seatsPerRow = 6;
  const rows = [];
  for (let i = 0; i < returnSeats.value.length; i += seatsPerRow) {
    rows.push(returnSeats.value.slice(i, i + seatsPerRow));
  }
  return rows;
});

const passenger = ref({
  fullname: '',
  phone: '',
  email: '',
});

const formatTime = (datetime) => {
  return new Date(datetime).toLocaleString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

const departureSeats = ref([]);
const returnSeats = ref([]);
function generateSeats(totalSeats) {
  const columns = ['A', 'B', 'C', 'D', 'E', 'F'];
  const seats = [];
  for (let i = 1; seats.length < totalSeats; i++) {
    for (let col of columns) {
      if (seats.length >= totalSeats) break;
      seats.push(i + col);
    }
  }
  return seats;
}

onMounted(async () => {
  if (departureFlightId) {
    const res1 = await axios.get(`/flights/flight/${departureFlightId}`);
    departureFlight.value = res1.data.data;

    const seatsRes = res1.data.data.seats;
    departureSeats.value = generateSeats(seatsRes);
  }

  if (returnFlightId) {
    const res2 = await axios.get(`/flights/flight/${returnFlightId}`);
    returnFlight.value = res2.data.data;

    const seatsRes = res2.data.data.seats;
    returnSeats.value =  generateSeats(seatsRes);
  }
});

const submitBooking = async () => {
  if (!selectedDepartureSeat.value) {
    alert('Vui lòng chọn ghế cho chuyến đi');
    return;
  }
  if (returnFlight.value && !selectedReturnSeat.value) {
    alert('Vui lòng chọn ghế cho chuyến về');
    return;
  }
  if (!passenger.value.fullname || !passenger.value.phone || !passenger.value.email) {
    alert('Vui lòng điền đầy đủ thông tin hành khách');
    return;
  }

  const bookingData = {
    departureFlightId,
    returnFlightId: returnFlightId || null,
    departureSeat: selectedDepartureSeat.value,
    returnSeat: selectedReturnSeat.value || null,
    passenger: passenger.value,
  };

  try {
    const res = await axios.post('/bookings', bookingData);
    alert('Đặt vé thành công!');
    router.push({ name: 'Home' }); // hoặc trang khác bạn muốn
  } catch (error) {
    alert('Đặt vé thất bại. Vui lòng thử lại.');
  }
};
</script>

<style scoped>
.seat-selection button {
  width: 50px;
  height: 50px;
  font-weight: bold;
}
</style>

<template>
  <section class="about-banner position-relative bg-primary py-5 mb-5">
    <div class="overlay position-absolute top-0 start-0 w-100 h-100" style="background: rgba(0,0,0,0.45);"></div>
    <div class="container position-relative text-center text-white">
      <h1 class="fw-bold display-5">Thông tin cá nhân</h1>
      <p class="link-nav fs-6 mt-3">
        <a href="index.html" class="text-white text-decoration-none">Home</a>
        <span class="mx-2">›</span>
        <a href="/user-info" class="text-white text-decoration-none">Thông tin cá nhân</a>
      </p>
    </div>
  </section>

  <div class="container">
    <h2>Chuyến bay: {{ flightCode }}</h2>

    <div class="grid grid-cols-6 gap-4 my-4">
      <button
          v-for="seat in seatList"
          :key="seat"
          :disabled="isDisabled(seat)"
          @click="toggleSeat(seat)"
          :class="seatClass(seat)"
      >
        {{ seat }}
      </button>


    </div>

    <!--    <div class="mt-4">-->
    <!--      <button @click="submitHold" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">-->
    <!--        Giữ ghế-->
    <!--      </button>-->
    <!--      <button @click="submitRelease" class="bg-red-600 text-white px-4 py-2 rounded ml-2 hover:bg-red-700">-->
    <!--        Bỏ giữ-->
    <!--      </button>-->
    <!--    </div>-->
  </div>
</template>

<script setup>
import {ref, onMounted, onBeforeUnmount, reactive} from 'vue';
import {Client} from '@stomp/stompjs';
import axios from '@/services/api.js';
import {jwtDecode} from 'jwt-decode';

const flightCode = 'VN123';

let email = 'anonymous';

const token = localStorage.getItem('token');

if (token) {
  try {
    const decoded = jwtDecode(token);
    // Giả sử token có dạng { sub: 'user@example.com', ... }
    email = decoded.sub || decoded.sub || 'anonymous';
  } catch (e) {
    console.error('Invalid token', e);
  }
}
const seatList = [
  'A1', 'A2', 'A3', 'A4', 'A5', 'A6',
  'B1', 'B2', 'B3', 'B4', 'B5', 'B6',
];

const heldSeats = reactive({});
const selectedSeats = reactive(new Set());

let stompClient = null;
function seatClass(seat) {
  const info = heldSeats[seat];

  if (info && info.email !== email) {
    return 'seat disabled-seat';
  }

  if (info && info.email === email) {
    return 'seat my-seat';
  }

  if (selectedSeats.has(seat)) {
    return 'seat selected-seat';
  }

  return 'seat available-seat';
}

function isDisabled(seat) {
  const info = heldSeats[seat];
  return info && info.email !== email;
}

async function toggleSeat(seat) {
  const info = heldSeats[seat];

  if (info && info.email !== email) return;

  if (info && info.email === email) {
    const payload = {flightCode, seatCodes: [seat]};
    await axios.post('/seats/release', payload);
    delete heldSeats[seat];
    selectedSeats.delete(seat);
    return;
  }

  const payload = {flightCode, seatCodes: [seat]};
  await axios.post('/seats/hold', payload);
  heldSeats[seat] = {email};
  selectedSeats.add(seat);
  console.log("payload: ",payload)
}

function connectWebSocket() {
  stompClient = new Client({
    webSocketFactory: () => new WebSocket('ws://localhost:5000/bookingBE-MNC/ws'),
    debug: str => console.log(str),
    reconnectDelay: 5000,
  });

  stompClient.onConnect = () => {
    stompClient.subscribe(`/topic/seats/${flightCode}`, message => {
      const data = JSON.parse(message.body);
      const {type, seatCodes, email: fromUser} = data;

      seatCodes.forEach(code => {
        if (type === 'HOLD') {
          heldSeats[code] = {email: fromUser};
          if (fromUser === email) selectedSeats.add(code);
        } else if (type === 'RELEASE') {
          delete heldSeats[code];
          if (fromUser === email) selectedSeats.delete(code);
        }
      });
    });

    axios.get(`/seats/held`, {params: {flightCode}}).then(res => {
      console.log("User: ",email);
      for (const [seat, info] of Object.entries(res.data)) {
        heldSeats[seat] = info;
        console.log("Userádsadsad: ",info.email);

        if (info.email === email) selectedSeats.add(seat);
      }
    });
  };

  stompClient.activate();
}

onMounted(connectWebSocket);
onBeforeUnmount(() => {
  if (stompClient) stompClient.deactivate();
});

</script>
<style>
.seat {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  color: #000;
}

.disabled-seat {
  background-color: #ef3232;
  color: #fff;
  cursor: not-allowed;
}

.my-seat {
  background-color: #ee2b2b;
  color: #fff;
}

.selected-seat {
  background-color: #5bc0de;
  color: #fff;
}

.available-seat:hover {
  background-color: #f0f0f0;
}

</style>
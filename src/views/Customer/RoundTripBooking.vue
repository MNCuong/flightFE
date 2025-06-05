<template>
  <section class="about-banner relative">
    <div class="overlay overlay-bg"></div>
    <div class="container">
      <div class="row d-flex align-items-center justify-content-center">
        <div class="about-content col-lg-12 text-center">
          <h1 class="text-white banner-title">Tìm kiếm</h1>
          <p class="text-white link-nav">
            <a href="index.html" class="link-home">Trang chủ</a>
            <span class="lnr lnr-arrow-right mx-2"></span>
            <a href="/search-flight" class="link-current">Tìm kiếm</a>
          </p>
        </div>
      </div>
    </div>
  </section>

  <v-container class="booking-form" fluid>
    <v-row class="flights-container" align="center" justify="center" dense>
      <v-col v-if="departureFlight" cols="12" md="5">
        <v-card class="flight-box" outlined elevation="4">
          <v-card-title class="flight-title">
            <h3>Chuyến đi</h3>
          </v-card-title>
          <v-card-text>
            <FlightInfo :flight="departureFlight"/>
            <v-btn
                color="secondary"
                class="mt-4 btn-seat"
                elevation="2"
                @click="openDepartureSeatDialog"
            >
              Chọn ghế chuyến đi
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col
          cols="12"
          md="2"
          class="d-flex justify-center align-center transfer-icon"
      >
        ⇄
      </v-col>

      <v-col v-if="returnFlight" cols="12" md="5">
        <v-card class="flight-box" outlined elevation="4">
          <v-card-title class="flight-title">
            <h3>Chuyến về</h3>
          </v-card-title>
          <v-card-text>
            <FlightInfo :flight="returnFlight"/>
            <v-btn
                color="secondary"
                class="mt-4 btn-seat"
                elevation="2"
                v-if="returnFlight"
                @click="openReturnSeatDialog"
            >
              Chọn ghế chuyến về
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-form @submit.prevent="submitBooking" ref="bookingForm" class="mt-6">
      <h3 class="mb-4 passenger-info-title">Thông tin hành khách</h3>
      <v-btn
          color="secondary"
          class="mb-4"
          @click="addPassenger"
          elevation="2"
      >
        Thêm hành khách
      </v-btn>

      <div
          v-for="(passenger, index) in passengers"
          :key="index"
          class="mb-6 passenger-info-item"
      >
        <v-card outlined elevation="1" class="pa-4">
          <div class="d-flex justify-space-between align-center mb-2">
            <h4 class="mb-2">Thông tin hành khách {{ index + 1 }}</h4>
            <v-btn
                icon
                variant="plain"
                size="small"
                class="click-area"
                v-if="passengers.length > 1"
                @click="removePassenger(index)"
                title="Xóa hành khách"
            >
              <v-icon small color="black">mdi-close</v-icon>
            </v-btn>

          </div>

          <v-row dense>
            <v-col cols="12" md="4">
              <v-text-field
                  v-model="passenger.name"
                  label="Tên hành khách"
                  required
                  outlined
                  dense
                  variant="outlined"
                  rounded="lg"
                  prepend-inner-icon="mdi-account"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                  v-model="passenger.email"
                  label="Email"
                  type="email"
                  required
                  outlined
                  dense
                  variant="outlined"
                  rounded="lg"
                  prepend-inner-icon="mdi-email"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                  v-model="passenger.nationality"
                  label="Quốc tịch"
                  type="Quốc tịch"
                  required
                  outlined
                  dense
                  variant="outlined"
                  rounded="lg"
                  prepend-inner-icon="mdi-email"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row dense>
            <v-col cols="12" md="4">
              <v-text-field
                  v-model="passenger.phone"
                  label="Số điện thoại"
                  required
                  outlined
                  dense
                  variant="outlined"
                  rounded="lg"
                  prepend-inner-icon="mdi-phone"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                  v-model="passenger.idNumber"
                  label="CCCD / Hộ chiếu"
                  outlined
                  dense
                  variant="outlined"
                  rounded="lg"
                  prepend-inner-icon="mdi-card-account-details"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                  v-model="passenger.dateOfBirth"
                  label="Ngày sinh"
                  type="date"
                  required
                  outlined
                  dense
                  variant="outlined"
                  rounded="lg"
                  prepend-inner-icon="mdi-email"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
      </div>


      <v-btn
          type="submit"
          color="primary"
          class="confirm-btn"
          large
          elevation="3"
      >
        Xác nhận đặt vé
      </v-btn>
    </v-form>

<!--    <v-alert-->
<!--        v-if="message"-->
<!--        type="info"-->
<!--        class="mt-5"-->
<!--        border="left"-->
<!--        colored-border-->
<!--        elevation="2"-->
<!--        dense-->
<!--    >-->
<!--      {{ message }}-->
<!--    </v-alert>-->

    <v-alert
        v-if="message"
        type="info"
        class="mt-5"
        border="left"
        colored-border
        elevation="2"
        dense
    >
      {{ message }}
    </v-alert>
  </v-container>

  <SeatSelectionModal
      v-model="seatModalVisible"
      :flightId="departureFlight?.id"
      :selected="selectedSeats"
      @confirm="handleOnSeatsConfirmed"
  />

  <SeatSelectionModal
      v-if="returnFlight"
      v-model="showReturnModal"
      :flightId="returnFlight?.id"
      :selected="returnSelectedSeats"
      @confirm="handleReturnSeatsSelected"

  />
</template>
<script setup>
import {ref, onMounted, reactive} from 'vue';
import axios from '../../services/api.js';
import FlightInfo from '@/components/FlightInfo.vue';
import {useRoute} from 'vue-router';
import SeatSelectionModal from '@/components/SeatSelectionModal.vue';
const passengerNumber = ref(1);

const passengers = ref([
  {name: '', email: '', phone: ''}
]);

function addPassenger() {
  passengers.value.push({name: '', email: '', phone: ''});
}

function removePassenger(index) {
  if (passengers.value.length > 1) {
    passengers.value.splice(index, 1);
  }
}

const showDepartureModal = ref(false);
const departureSelectedSeats = ref([]);
const route = useRoute();
const departureFlight = ref(null);
const returnFlight = ref(null);
const passengerName = ref('');
const email = ref('');
const phone = ref('');
const message = ref('');
const seatList = ref('');
const bookedSeats = ref([]);
const selectedSeats = ref([]);
const seatDialog = ref(false);
const ticketList = ref([]);
const selectedFlightLabel = ref('');
const selectedFlightType = ref('');
const seatModalVisible = ref(false)
const selectedFlightId = ref(null)
const showReturnModal = ref(false);
const returnSelectedSeats = ref([]);

const handleReturnSeatsSelected = (seats) => {
  returnSelectedSeats.value = seats
  showReturnModal.value = false
}
const handleOnSeatsConfirmed = (seats) => {
  departureSelectedSeats.value = seats
  showDepartureModal.value = false
}

function generateSeats(totalSeats) {
  const seatsPerRow = 6;
  const seatLetters = ['A', 'B', 'C', 'D', 'E', 'F'];
  const rows = Math.ceil(totalSeats / seatsPerRow);
  const seats = [];

  for (let row = 1; row <= rows; row++) {
    for (let i = 0; i < seatsPerRow; i++) {
      const seatNumber = `${row}${seatLetters[i]}`;
      seats.push(seatNumber);
      if (seats.length >= totalSeats) break;
    }
  }
  return seats;
}

const openDepartureSeatDialog = async () => {
  if (!departureFlight.value) return;

  try {
    const resFlight = await axios.get(`/flights/flight/${departureFlight.value.id}`);
    const totalSeats = resFlight.data.data.seats || 0;
    seatList.value = generateSeats(totalSeats); // Tạo danh sách ghế dạng ['1A', '1B', ...]
    const resTickets = await axios.get(`/ticket/flight/${departureFlight.value.id}`);
    bookedSeats.value = resTickets.data.data.map(ticket => ticket.seatNumber);
    selectedSeats.value = bookedSeats.value
    seatModalVisible.value = true;
  } catch (error) {
    console.error('Lỗi lấy dữ liệu ghế chuyến đi:', error);
  }
};

const openReturnSeatDialog = async () => {
  if (!returnFlight.value) return;

  try {

    const resFlight = await axios.get(`/flights/flight/${returnFlight.value.id}`);
    const totalSeats = resFlight.data.data.seats || 0;
    seatList.value = generateSeats(totalSeats);
    const resTickets = await axios.get(`/ticket/flight/${returnFlight.value.id}`);
    bookedSeats.value = resTickets.data.data.map(ticket => ticket.seatNumber);
    selectedSeats.value = [...bookedSeats.value]
    showReturnModal.value = true;
  } catch (error) {
    console.error('Lỗi lấy dữ liệu ghế chuyến về:', error);
  }
};

const showSeatModal = (flightId) => {
  selectedFlightId.value = flightId
  seatModalVisible.value = true
}

const onSeatsConfirmed = (seats) => {
  if (seatModalVisible.value) {
    departureSelectedSeats.value = seats;
  } else if (showReturnModal.value) {
    returnSelectedSeats.value = seats;
  }
};

// const openSeatDialog = async (type) => {
//   selectedFlightType.value = type;
//   selectedFlightLabel.value = type === 'departure' ? 'Chuyến đi' : 'Chuyến về';
//   const flightId = type === 'departure' ? departureFlight.value?.id : returnFlight.value?.id;
// console.log("flightId",flightId);
//   if (flightId) {
//     const res = await axios.get(`/flights/flight//${flightId}`);
//     const resTicket = await axios.get(`/flights/flight//${flightId}`);
//     seatList.value = res.data.seats;
//     ticketList.value = res.data.seatNumber;
//     selectedSeats.value = [];
//     seatDialog.value = true;
//   }
// };

const toggleSeat = (seatNumber) => {
  if (selectedSeats.value.includes(seatNumber)) {
    selectedSeats.value = selectedSeats.value.filter(s => s !== seatNumber);
  } else {
    selectedSeats.value.push(seatNumber);
  }
};


const confirmSeatSelection = () => {
  if (selectedFlightType.value === 'departure') {
    departureSelectedSeats.value = [...selectedSeats.value];
  } else {
    returnSelectedSeats.value = [...selectedSeats.value];
  }
  seatDialog.value = false;
};


const fetchFlightById = async (id) => {
  const res = await axios.get(`/flights/flight/${id}`);
  return res.data.data;
};

onMounted(async () => {
  const departureId = route.query.departureFlightId;
  const returnId = route.query.returnFlightId;
  const number = parseInt(route.query.passengerNumber) || 1;
  passengerNumber.value = number;

  passengers.value = Array.from({ length: number }, () => ({
    name: '',
    email: '',
    phone: ''
  }));

  if (departureId) {
    departureFlight.value = await fetchFlightById(departureId);
  }
  if (returnId) {
    returnFlight.value = await fetchFlightById(returnId);
  }
});

const submitBooking = async () => {
  if (!passengerName.value || !email.value || !phone.value) {
    message.value = 'Vui lòng nhập đầy đủ thông tin hành khách.';
    return;
  }
  for (const p of passengers.value) {
    if (!p.name || !p.email || !p.phone) {
      message.value = 'Vui lòng nhập đầy đủ thông tin hành khách.';
      return;
    }
  }

  try {
    const bookingData = {
      departureFlightId: departureFlight.value.id,
      returnFlightId: returnFlight.value?.id || null,
      passengerName: passengerName.value,
      email: email.value,
      phone: phone.value,
      departureSeats: departureSelectedSeats.value,
      returnSeats: returnSelectedSeats.value,
      passengers: passengers.value
    };

    const res = await axios.post('/bookings', bookingData);
    message.value = 'Đặt vé thành công! Mã đặt vé của bạn: ' + res.data.data.bookingCode;

    // Có thể redirect đến trang lịch sử vé hoặc trang xác nhận khác
  } catch (error) {
    message.value = 'Đặt vé thất bại, vui lòng thử lại.';
    console.error(error);
  }
};
</script>

<style scoped>
.booking-form {
  max-width: 900px;
  margin: 0 auto;
  padding: 1rem;
}

.about-banner {
  background: url('/images/banner-search.jpg') center center/cover no-repeat;
  min-height: 180px;
  position: relative;
  display: flex;
  align-items: center;
}

.overlay-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.55);
  z-index: 0;
}

.about-content {
  position: relative;
  z-index: 1;
}

.banner-title {
  font-weight: 700;
  font-size: 3rem;
  letter-spacing: 1px;
  margin-bottom: 0.3rem;
}

.link-nav a {
  color: #f1f1f1;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.3s ease;
}

.link-nav a:hover {
  color: #ffca28;
}

.link-nav .lnr-arrow-right {
  font-size: 1.2rem;
  vertical-align: middle;
}

/* Booking form */
.booking-form {
  max-width: 900px;
  margin: 3rem auto;
  padding: 0 1rem;
}

/* Flight card */
.flight-box {
  border-radius: 12px;
  box-shadow: 0 2px 10px rgb(0 0 0 / 0.1);
  transition: box-shadow 0.3s ease;
}

.flight-box:hover {
  box-shadow: 0 6px 20px rgb(0 0 0 / 0.15);
}

.flight-title {
  font-weight: 600;
  color: #1976d2;
  border-bottom: 2px solid #1976d2;
  padding-bottom: 0.5rem;
  margin-bottom: 0;
}

/* Seat selection button */
.btn-seat {
  width: 100%;
  font-weight: 600;
  letter-spacing: 0.05em;
  transition: background-color 0.3s ease;
}

.btn-seat:hover {
  background-color: #115293 !important;
}

/* Center transfer icon */
.transfer-icon {
  font-size: 3rem;
  color: #1976d2;
  user-select: none;
}

/* Passenger info section */
.passenger-info-title {
  font-weight: 700;
  color: #333;
  letter-spacing: 0.05em;
  text-align: center;
}

/* Confirm button */
.confirm-btn {
  display: block;
  margin: 0 auto;
  padding: 1rem 3rem;
  font-weight: 700;
  padding: 18px;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgb(25 118 210 / 0.4);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

}

.confirm-btn:hover:not(:disabled) {
  background-color: #145aaf !important;
  box-shadow: 0 6px 20px rgb(20 90 175 / 0.6);
}

.passenger-info-item {
  position: relative;
}

.passenger-info-item v-btn {
  position: absolute;
  top: 0;
  right: 0;
}

</style>

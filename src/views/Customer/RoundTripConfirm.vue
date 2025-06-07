<template>
  <v-container class="pa-6">
    <v-row class="justify-center align-center mb-6">
      <v-col cols="5">
        <v-card class="pa-4" outlined>
          <h4>Thông tin chuyến đi</h4>
          <!-- Trong phần "Thông tin chuyến đi" -->
          <p><strong>Hãng bay:</strong> {{ departureFlight?.airlineName }}</p>
          <p><strong>Mã chuyến bay:</strong> {{ departureFlight?.flightCode }}</p>
          <p><strong>Thời gian:</strong> {{ departureFlight?.departureTime }} - {{ departureFlight?.arrivalTime }}</p>
          <p><strong>Từ:</strong> {{ departureFlight?.departureAirport }}</p>
          <p><strong>Đến:</strong> {{ departureFlight?.arrivalAirport }}</p>

        </v-card>
      </v-col>

      <v-col cols="2" class="text-center">
        <v-icon size="48">mdi-swap-horizontal</v-icon>
      </v-col>

      <v-col cols="5">
        <v-card class="pa-4" outlined>
          <h4>Thông tin chuyến về</h4>
          <!-- Trong phần "Thông tin chuyến veer" -->
          <p><strong>Hãng bay:</strong> {{ returnFlight?.airlineName }}</p>
          <p><strong>Mã chuyến bay:</strong> {{ returnFlight?.flightCode }}</p>
          <p><strong>Thời gian:</strong> {{ returnFlight?.departureTime }} - {{ returnFlight?.arrivalTime }}</p>
          <p><strong>Từ:</strong> {{ returnFlight?.departureAirport }}</p>
          <p><strong>Đến:</strong> {{ returnFlight?.arrivalAirport }}</p>



        </v-card>
      </v-col>
    </v-row>

    <!-- PHẦN 2: Thông tin tổng quan -->
    <v-row class="justify-center mb-6">
      <v-col cols="12" md="6">
        <v-card class="pa-4" outlined>
          <h4 class="text-center text-primary mb-4">🧾 Xác nhận thông tin</h4>

          <p>💼 Vé Business: {{ totalBusinessTickets }}</p>
          <p>💺 Vé Economy: {{ totalEconomyTickets }}</p>
          <p>💰 Tổng tiền: {{ formatCurrency(totalAmount) }}</p>
          <hr/>
          <p class="text-center fs-5 mb-4">
            <strong class="text-dark">Tổng tiền: </strong>
            <span class="text-success">{{ totalAmount.toLocaleString() }} VNĐ</span>
          </p>
          <div class="d-flex justify-content-between">
            <button class="btn btn-outline-secondary btn-lg px-4" @click="goBack">← Quay lại</button>
            <button class="btn btn-primary btn-lg px-4" @click="confirmBooking">✅ Xác nhận</button>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- PHẦN 3: Thông tin hành khách -->
    <v-row>
      <v-col cols="12">
        <v-card class="pa-6" outlined>
          <h4 class="mb-6">Thông tin hành khách</h4>
          <v-row>
            <v-col
                v-for="(passenger, index) in passengers"
                :key="index"
                cols="12"
                sm="6"
                md="6"
            >
              <v-card class="pa-6" outlined>
                <h5>Hành khách {{ index + 1 }}</h5>
                <p><strong>Họ tên:</strong> {{ passenger.name }}</p>
                <p><strong>Email:</strong> {{ passenger.email }}</p>
                <p><strong>Giới tính:</strong> {{ passenger.gender === 0 ? 'Nam' : 'Nữ' }}</p>
                <p><strong>Quốc tịch:</strong> {{ passenger.nationality }}</p>
                <p><strong>CCCD/Hộ chiếu:</strong> {{ passenger.nationalId }}</p>
                <p><strong>Ngày sinh:</strong> {{ passenger.dateOfBirth }}</p>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted,computed,watchEffect } from 'vue';
import api from '@/services/api.js';

const passengers = ref([]);
const bookingData = ref({});
const departureFlight = ref(null);
const returnFlight = ref(null);
const selectedSeatsReturn = ref([]);
const selectedSeatsDeparture = ref([]);
const businessPriceDeparture = ref(0);
const economyPriceDeparture = ref(0);
const businessPriceReturn = ref(0);
const economyPriceReturn = ref(0);
function goBack() {
  window.history.back();
}
onMounted(async () => {
  const stored = localStorage.getItem('bookingDataRoundTrip');
  if (stored) {
    const parsed = JSON.parse(stored);
    passengers.value = parsed.passengers || [];
    selectedSeatsReturn.value = parsed.returnSeats || [];
    selectedSeatsDeparture.value = parsed.departureSeats || [];
    bookingData.value = parsed;
    console.log("data: ",parsed)

    try {
      const depRes = await api.get(`/flights/flight/${parsed.departureFlightId}`);
      departureFlight.value = depRes.data.data;
      businessPriceDeparture.value = depRes.data.data.priceBusiness;
      economyPriceDeparture.value = depRes.data.data.priceEconomy;
      console.log("data: ",depRes.data.data)
    } catch (e) {
      console.error('Lỗi khi lấy thông tin chuyến đi:', e);
    }

    if (parsed.returnFlightId) {
      try {
        const retRes = await api.get(`/flights/flight/${parsed.returnFlightId}`);
        returnFlight.value = retRes.data.data;
        businessPriceReturn.value = retRes.data.data.priceBusiness;
        economyPriceReturn.value = retRes.data.data.priceEconomy;
        console.log("dat1: ",retRes.data.data)

      } catch (e) {
        console.error('Lỗi khi lấy thông tin chuyến về:', e);
      }
    }
  }
});

function getSeatClass(seat) {
  if (!seat) return 'Economy';
  const seatNumberStr = seat.match(/^\d+/);
  if (!seatNumberStr) return 'Economy';
  const seatNumber = parseInt(seatNumberStr[0], 10);
  return (seatNumber >= 1 && seatNumber <= 5) ? 'Business' : 'Economy';
}

function createTicketInfoList(seats, businessPrice, economyPrice) {
  if (!seats || seats.length === 0) return [];

  return seats.map(seat => {
    const type = getSeatClass(seat);
    const price = type === 'Business' ? businessPrice : economyPrice;
    return {
      number: seat,
      type: type,
      price: price
    };
  });
}




async function confirmBooking() {
  try {
    const paymentPayload = {
      amount_raw: totalAmount.value,
      bankCode: '',
      bookingId: [bookingData.value.departureFlightId, bookingData.value.returnFlightId],
      typeService: 'PLANE',
    };

    const response = await api.post('/payment/pay', paymentPayload);

    localStorage.setItem('bookingData', JSON.stringify(bookingData.value));
    console.log("sda",bookingData.value)
    localStorage.setItem('paymentPayload', JSON.stringify(paymentPayload));

    console.log('bookingData1:', bookingData.value);
    console.log('paymentPayload1:', JSON.stringify(paymentPayload));
    if (response.data && response.data.data) {
      window.location.href = response.data.data;
    } else {
      alert('Không nhận được URL thanh toán từ VNPAY');
    }
  } catch (error) {
    console.error('Lỗi khi gọi thanh toán:', error);
    alert('Thanh toán thất bại. Vui lòng thử lại.');
  }
}


const formatCurrency = (value) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
  }).format(value);
};
function countBusinessAndEconomy(seats) {
  let business = 0;
  let economy = 0;

  seats.forEach(seat => {
    const seatNumberStr = seat.match(/^\d+/);
    if (seatNumberStr) {
      const seatNumber = parseInt(seatNumberStr[0], 10);
      if (seatNumber >= 1 && seatNumber <= 5) {
        business++;
      } else {
        economy++;
      }
    } else {
      economy++;
    }
  });

  return { business, economy };
}
const totalBusinessTickets = computed(() => {
  return countBusinessAndEconomy(selectedSeatsDeparture.value).business
      + countBusinessAndEconomy(selectedSeatsReturn.value).business;
});

const totalEconomyTickets = computed(() => {
  return countBusinessAndEconomy(selectedSeatsDeparture.value).economy
      + countBusinessAndEconomy(selectedSeatsReturn.value).economy;
});
const countBusinessTicketsDeparture = computed(() => {
  return countBusinessAndEconomy(selectedSeatsDeparture.value).business;
});

const countEconomyTicketsDeparture = computed(() => {
  return countBusinessAndEconomy(selectedSeatsDeparture.value).economy;
});
const countBusinessTicketsReturn = computed(() => {
  return countBusinessAndEconomy(selectedSeatsReturn.value).business;
});

const countEconomyTicketsReturn = computed(() => {
  return countBusinessAndEconomy(selectedSeatsReturn.value).economy;
});
const totalAmountDeparture = computed(() => {
  return countBusinessTicketsDeparture.value * businessPriceDeparture.value
      + countEconomyTicketsDeparture.value * economyPriceDeparture.value;
});

const totalAmountReturn = computed(() => {
  return countBusinessTicketsReturn.value * businessPriceReturn.value
      + countEconomyTicketsReturn.value * economyPriceReturn.value;
});

const totalAmount = computed(() => {
  return totalAmountDeparture.value + totalAmountReturn.value;
});

</script>

<style scoped>
h4 {
  font-weight: bold;
}
</style>

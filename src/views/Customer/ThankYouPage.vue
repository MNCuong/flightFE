<template>
  <section class="about-banner relative">
    <div class="overlay overlay-bg">
    </div>
    <div class="container">
      <div class="row d-flex align-items-center justify-content-center">
        <div class="about-content col-lg-12">
          <h1 class="text-white">
            Thanh toán
          </h1>
          <p class="text-white link-nav">
            <a href="index.html">
              Home
            </a>
            <span class="lnr lnr-arrow-right">
                                          </span>
            <a href="/insurance">
              Thanh toán
            </a>
          </p>
        </div>
      </div>
    </div>
  </section>

  <v-container class="mt-10" max-width="600">
    <v-card elevation="3" class="pa-6">
      <div v-if="isLoading" class="text-center">
        <v-alert type="info" border="left" colored-border elevation="2" dense class="mb-4">
          <v-icon left color="blue lighten-1" size="28">mdi-timer-sand</v-icon>
          Đang xử lý kết quả thanh toán...
        </v-alert>
      </div>

      <div v-else-if="success" class="text-center">
        <v-alert type="success" border="left" colored-border elevation="2" dense class="mb-4">
          <v-icon left color="green darken-2" size="28">mdi-check-circle</v-icon>
          Thanh toán thành công! Đang chuyển hướng sau
          <span class="font-weight-bold mx-1 countdown">{{ countdown }}</span> giây...
        </v-alert>
        <v-progress-linear
            :value="(countdown / countdownStart) * 100"
            color="green"
            height="8"
            rounded
            class="mb-2"
            striped
            indeterminate
        ></v-progress-linear>
      </div>

      <div v-else class="text-center">
        <v-alert type="error" border="left" colored-border elevation="2" dense class="mb-4">
          <v-icon left color="red darken-2" size="28">mdi-alert-circle</v-icon>
          Thanh toán thất bại. Mã lỗi: <span class="font-weight-bold">{{ responseCode }}</span>
        </v-alert>
        <v-btn color="primary" class="mt-4" large rounded @click="goBack">
          <v-icon left>mdi-arrow-left</v-icon> Quay lại
        </v-btn>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import axios from '../../services/api';

export default {
  data() {
    return {
      isLoading: true,
      success: false,
      responseCode: null,
      countdown: 5,
      countdownInterval: null,
      countdownStart: 5,
      bookingDataRequest: null,
      bookingData: null,
      paymentPayload: null,
    };
  },
  methods: {
    goBack() {
      this.$router.push('/');
    },
    startCountdown() {
      this.countdownInterval = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--;
        } else {
          clearInterval(this.countdownInterval);
          this.$router.push('/flight-ticket-list');
        }
      }, 1000);
    },

    async saveBookingInformation() {
      try {
        const response = await axios.post('/passengers/booking', this.bookingDataRequest);
        console.log('Booking saved:', response);
      } catch (error) {
        console.error('Lỗi khi lưu thông tin đặt vé:', error);
      }
    },

    async savePaymentData(paymentData) {
      try {
        const response = await axios.get("/payment/vnpay_return", {params: paymentData});
        console.log("Thông tin giao dịch đã được lưu:", response.data);
      } catch (error) {
        console.error("Lỗi khi lưu giao dịch:", error);
        throw error;
      }
    },
  },

  async mounted() {
    const query = this.$route.query;
    this.responseCode = query.vnp_ResponseCode;

    try {
      this.bookingData = JSON.parse(localStorage.getItem('bookingData'));
    } catch (error) {
      console.error('Lỗi khi parse bookingData:', error);
      this.bookingData = null;
    }

    try {
      this.paymentPayload = JSON.parse(localStorage.getItem('paymentPayload') || 'null');
    } catch (error) {
      console.error('Lỗi khi parse paymentPayload:', error);
      this.paymentPayload = null;
    }

    if (this.responseCode === '00' || this.responseCode === '200') {
      this.success = true;

      this.bookingDataRequest = {
        departureFlightId: this.bookingData?.departureFlightId || null,
        departureSeats: this.bookingData?.departureSeats || [],
        returnFlightId: this.bookingData?.returnFlightId || null,
        returnSeats: this.bookingData?.returnSeats || [],
        flightId: this.paymentPayload?.bookingId || null,
        passengerInfos: this.bookingData?.passengers || [],
        totalAmount: parseInt(query.vnp_Amount) / 1000,
        transactionNo: query.vnp_TransactionNo,
        paymentStatus: 'Success',
      };

      // Tạo paymentData từ params URL
      const params = new URLSearchParams(window.location.search);
      let paymentData = {};
      params.forEach((value, key) => {
        paymentData[key] = value;
      });

      try {
        await this.savePaymentData(paymentData);
        await this.saveBookingInformation();
        this.startCountdown();
      } catch (error) {
        console.error('Lỗi trong quá trình lưu dữ liệu:', error);
      }
    } else {
      this.success = false;
    }

    this.isLoading = false;
  },
};
</script>

<style scoped>


.overlay-bg {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.65);
  z-index: 1;
}

.about-banner .container {
  position: relative;
  z-index: 2;
}

.text-white-70 {
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.3s ease;
}

.text-white-70:hover {
  color: #ffffff;
  text-decoration: underline;
  cursor: pointer;
}

.breadcrumb {
  --bs-breadcrumb-divider: '>';
  font-size: 1rem;
  font-weight: 500;
}

.countdown {
  color: #2e7d32; /* xanh hợp với thành công */
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: 1px;
}

.v-alert {
  font-size: 1.15rem;
  font-weight: 500;
}

.v-btn {
  font-weight: 600;
  font-size: 1.1rem;
}

@media (max-width: 600px) {
  .about-banner .display-2 {
    font-size: 2.5rem;
  }
}
</style>

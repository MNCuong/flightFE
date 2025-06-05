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

  <v-container class="text-center mt-5">
    <div v-if="isLoading">
      <v-alert type="info" border="left" colored-border elevation="2">
        Đang xử lý kết quả thanh toán...
      </v-alert>
    </div>
    <div v-else-if="success">
      <v-alert type="success" border="left" colored-border elevation="2">
        Thanh toán thành công! Đang chuyển hướng sau {{ countdown }} giây...
      </v-alert>
    </div>
    <div v-else>
      <v-alert type="error" border="left" colored-border elevation="2">
        Thanh toán thất bại. Mã lỗi: {{ responseCode }}
      </v-alert>
      <v-btn color="primary" class="mt-3" @click="goBack">Quay lại</v-btn>
    </div>
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
      countdown: 3,
      countdownInterval: null,
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
      console.log('Booking data:', this.bookingDataRequest);
      try {
        const response = await axios.post('/passengers/booking', this.bookingDataRequest);
        console.log('this.bookingDataRequest:', this.bookingDataRequest);
        console.log('response:', response);
      } catch (error) {
        console.error('Lỗi khi lưu thông tin đặt vé:', error);
      }
    },

    async savePaymentData(paymentData) {
      try {
        const response = await axios.get("/payment/vnpay_return", { params: paymentData });
        console.log("Thông tin giao dịch đã được lưu:", response.data);
      } catch (error) {
        console.error("Lỗi khi lưu giao dịch:", error);
        throw error;
      }
    },
  },

  async mounted() {
    const query = this.$route.query;
    console.log("response:0000 ", query);
    this.responseCode = query.vnp_ResponseCode;
    console.log('Response Code:', this.responseCode);
    try {
      this.bookingData = JSON.parse(localStorage.getItem('bookingData') || '[]');
    } catch (error) {
      console.error('Lỗi khi parse bookingData:', error);
      this.bookingData = [];
    }

    try {
      this.paymentPayload = JSON.parse(localStorage.getItem('paymentPayload') || '[]');
    } catch (error) {
      console.error('Lỗi khi parse paymentPayload:', error);
      this.paymentPayload = [];
    }

    console.log('paymentPayload:', JSON.stringify(this.paymentPayload, null, 2));
    console.log('bookingData:', JSON.stringify(this.bookingData, null, 2));
    console.log('bookingData:', this.responseCode);

    if (this.responseCode === '00' || this.responseCode === '200') {
      this.success = true;
      this.startCountdown();

      const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats') || '[]');
      console.log('paymentPayload:', this.paymentPayload);
      console.log('bookingDataada:', this.bookingData);
      const passengers = this.bookingData.map(info => {
        return {
          ...info,
          passenger: {
            ...info.passenger,
            gender: info.passenger.gender === "Nam"
          }
        };
      });
      this.bookingDataRequest = {
        flightId: this.paymentPayload.bookingId,
        passengerInfos: this.bookingData,
        selectedSeats: selectedSeats,
        totalAmount: parseInt(query.vnp_Amount)/1000,
        transactionNo: query.vnp_TransactionNo,
        paymentStatus: 'Success',
      };

      const params = new URLSearchParams(window.location.search);
      let paymentData = {};
      params.forEach((value, key) => {
        paymentData[key] = value;
      });
      console.log('paymentData:', paymentData);

      try {
        await this.savePaymentData(paymentData);
        localStorage.removeItem('flight');
        localStorage.removeItem('totalAmount');
        localStorage.removeItem('paymentPayload');
        localStorage.removeItem('selectedSeats');
        localStorage.removeItem('bookingData');

        console.log('bookingDataRequest:', this.bookingDataRequest);

        await this.saveBookingInformation();

      } catch (error) {
        console.error('Lỗi trong quá trình lưu dữ liệu:', error);
      }

    } else {
      this.success = false;
    }

    this.isLoading = false;
  }
};
</script>

<style scoped>
.text-success {
  color: green;
}

.text-danger {
  color: red;
}
</style>

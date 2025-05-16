<template>
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
      bookingData: null,
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
    saveBookingInformation() {
      console.log('Booking data:', this.bookingData);

      axios.post('/booking-flight/order-ticket', this.bookingData)
          .then(response => {
            console.log('Thông tin đặt vé đã được lưu:', response.data);
          })
          .catch(error => {
            console.error('Lỗi khi lưu thông tin đặt vé:', error);
          });
    },
    savePaymentData(paymentData) {
      axios
          .get("/payment/vnpay_return", {params: paymentData})
          .then((response) => {
            console.log("Thông tin giao dịch đã được lưu:", response.data);
          })
          .catch((error) => {
            console.error("Lỗi khi lưu giao dịch:", error);
          });
    },
  },
  mounted() {
    const query = this.$route.query;
    this.responseCode = query.vnp_ResponseCode;
    console.log('Response Code:', this.responseCode);

    if (this.responseCode === '00' || this.responseCode === '200') {
      this.success = true;
      this.startCountdown();

      const flight = JSON.parse(localStorage.getItem('flight'));
      const passengerInfos = JSON.parse(localStorage.getItem('passengerInfos') || '[]');
      const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats') || '[]');
      console.log('Flight data:', flight);

      this.bookingData = {
        flightId: flight?.id,
        passengerInfos: passengerInfos,
        selectedSeats: selectedSeats,
        totalAmount: parseInt(query.vnp_Amount),
        transactionId: query.vnp_TxnRef,
        paymentStatus: 'Success',
      };

      this.saveBookingInformation();

      const params = new URLSearchParams(window.location.search);
      let paymentData = {};
      params.forEach((value, key) => {
        paymentData[key] = value;
      });

      this.savePaymentData(paymentData);

      localStorage.removeItem('flight');
      localStorage.removeItem('totalAmount');
      localStorage.removeItem('searchParams');
      localStorage.removeItem('selectedSeats');
      localStorage.removeItem('passengerInfos');
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

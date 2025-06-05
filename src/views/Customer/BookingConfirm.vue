<template>
  <section class="about-banner relative">
    <div class="overlay overlay-bg"></div>
    <div class="container">
      <div class="row d-flex align-items-center justify-content-center">
        <div class="about-content col-lg-12">
          <h1 class="text-white">Giới thiệu</h1>
          <p class="text-white link-nav">
            <a href="/">Trang chủ</a>
            <span class="lnr lnr-arrow-right"></span>
            <a href="/about">Giới thiệu</a>
          </p>
        </div>
      </div>
    </div>
  </section>
  <div class="container mt-4 px-4">
    <div class="row gy-4">
      <!-- Thông tin chuyến bay + hành khách -->
      <div class="col-md-8">
        <!-- Thông tin chuyến bay -->
        <div class="card flight-card shadow-lg border-0 p-4 mb-4">
          <h5 class="card-title text-primary mb-3">✈️ Thông tin chuyến bay</h5>
          <ul class="list-unstyled mb-0">
            <li><strong>Hãng bay:</strong> {{ flight.airline?.name }} - {{ flight.flightDetails?.number }}
            </li>
            <li><strong>Tuyến bay:</strong> {{ routeLabel }}</li>
            <li><strong>🕓 Giờ đi:</strong> {{ formatTime(flight.departureTime) }}</li>
            <li><strong>🕘 Giờ đến:</strong> {{ formatTime(flight.arrivalTime) }}</li>
            <li><strong>💺 Giá Economy:</strong> {{ flight.priceEconomy?.toLocaleString() }} VNĐ</li>
            <li><strong>💼 Giá Business:</strong> {{ flight.priceBusiness?.toLocaleString() }} VNĐ</li>
          </ul>
        </div>

        <!-- Thông tin hành khách -->
        <div class="card shadow-sm border-0 p-4 mb-4">
          <h5 class="text-primary mb-4">👥 Thông tin hành khách</h5>

          <div v-for="item in bookingData" :key="item.passenger.number"
               class="passenger-info mb-4 p-3 rounded shadow-sm">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <h6 class="mb-0">Ghế {{ item.passenger.number }}</h6>
              <span class="badge bg-secondary">{{ getPassengerType(item.passenger) }}</span>
            </div>

            <div class="row">
              <div class="col-md-6">
                <p><strong>Họ tên:</strong> {{ item.passenger.fullName }}</p>
                <p><strong>Ngày sinh:</strong> {{ item.passenger.birthDate }}</p>
                <p><strong>Giới tính:</strong> {{ item.passenger.gender === 0 ? 'Nữ' : 'Nam' }}</p>
              </div>
              <div class="col-md-6">
                <p><strong>Quốc tịch:</strong> {{ item.passenger.nationality }}</p>
                <p><strong>CCCD:</strong> {{ item.passenger.nationalId }}</p>
                <p><strong>💵 Giá tiền:</strong> {{ item.price.toLocaleString() }} VNĐ</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Xác nhận đặt vé -->
      <div class="col-md-4">
        <div class="card summary-card shadow-lg border-0 p-4">
          <h4 class="text-center text-primary mb-4">🧾 Xác nhận thông tin</h4>
          <div class="mb-3">
            <p v-if="adultCount > 0"><strong>👨 Người lớn:</strong> {{ adultCount }}</p>
            <p v-if="childCount > 0"><strong>🧒 Trẻ em:</strong> {{ childCount }}</p>
            <p v-if="infantCount > 0"><strong>👶 Em bé:</strong> {{ infantCount }}</p>
            <p><strong>💼 Vé Business:</strong> {{ businessTicketCount }}</p>
            <p><strong>💺 Vé Economy:</strong> {{ economyTicketCount }}</p>
            <p><strong>💰 Tổng tiền:</strong> {{ totalAmount.toLocaleString() }} VNĐ</p>

          </div>
          <hr/>
          <p class="text-center fs-5 mb-4">
            <strong class="text-dark">Tổng tiền:</strong>
            <span class="text-success">{{ totalAmount.toLocaleString() }} VNĐ</span>
          </p>
          <div class="d-flex justify-content-between">
            <button class="btn btn-outline-secondary btn-lg px-4" @click="goBack">← Quay lại</button>
            <button class="btn btn-primary btn-lg px-4" @click="confirmBooking">✅ Xác nhận</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container-fluid mt-4 px-4">
    <div class="row gy-4">
      <div class="col-md-12">
        <h5 class="text-primary mb-3">📝 Ghi chú</h5>
        <p>1. Vui lòng kiểm tra kỹ thông tin trước khi xác nhận đặt vé.</p>
        <p>2. Nếu có bất kỳ thay đổi nào về thông tin hành khách, vui lòng liên hệ với chúng tôi.</p>
        <p>3. Chúng tôi cam kết bảo mật thông tin cá nhân của bạn.</p>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../services/api'

const savedParams = JSON.parse(localStorage.getItem('searchParams'));

export default {
  data() {
    return {
      flight: {},
      selectedSeats: [],
      passengerInfos: [],
      bookingData: [],
      totalAmount: 0,
      adultCount: 0,
      childCount: 0,
      infantCount: 0,
      routeLabel: '',

    };
  },
  computed: {
    businessTicketCount() {
      return this.bookingData.filter(item => item.type?.toLowerCase() === 'business').length;
    },

    economyTicketCount() {
      return this.bookingData.filter(item => item.type?.toLowerCase() === 'economy' || item.type?.toLowerCase() === 'economy').length;
    },

    adultCount() {
      return this.bookingData.reduce((count, item) => {
        const age = this.getAge(item.passenger.birthDate);
        return age >= 18 ? count + 1 : count;
      }, 0);
    },
    childCount() {
      return this.bookingData.reduce((count, item) => {
        const age = this.getAge(item.passenger.birthDate);
        return age >= 2 && age < 18 ? count + 1 : count;
      }, 0);
    },
    infantCount() {
      return this.bookingData.reduce((count, item) => {
        const age = this.getAge(item.passenger.birthDate);
        return age < 2 ? count + 1 : count;
      }, 0);
    },
    totalAmount() {
      this.totalAmount = this.bookingData.reduce((sum, item) => sum + (item.price || 0), 0);
      return this.bookingData.reduce((sum, item) => sum + (item.price || 0), 0);
    }
  },
  methods: {
    async fetchFlightDetails() {
      try {
        const response = await api.get(`/flights/flight/${this.$route.params.id}`)
        this.flight = response.data.data
        // this.calculateTotalAmount()
        this.calculatePassengerTypes()
        console.log('Thông tin chuyến bay:', this.flight)
      } catch (error) {
        console.error('Lỗi khi lấy thông tin chuyến bay:', error)
      }
    },
    formatTime(datetime) {
      return new Date(datetime).toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit'
      })
    },
    goBack() {
      this.$router.push(`/flight-details/${this.$route.params.id}`);
    },
    // calculateTotalAmount() {
    //     let economyCount = this.getTicketCount('economy')
    //     let businessCount = this.getTicketCount('business')

    //     this.totalAmount = (economyCount * this.flight.priceEconomy) +
    //         (businessCount * this.flight.priceBusiness)
    // },
    async confirmBooking() {
      try {
        const paymentPayload = {
          amount_raw: this.totalAmount.toString(),
          bankCode: '',
          bookingId: this.flight.id.toString(),
          typeService: 'PLANE',
        };
        console.log("abc: ", paymentPayload);

        const response = await api.post('/payment/pay', paymentPayload);
        localStorage.setItem('bookingData', JSON.stringify(this.bookingData));
        localStorage.setItem('paymentPayload', JSON.stringify(paymentPayload));
        console.log('bookingData:', JSON.stringify(this.bookingData));
        console.log('paymentPayload:', JSON.stringify(paymentPayload));

        if (response.data && response.data.data) {
          window.location.href = response.data.data;
        } else {
          alert('Không nhận được URL thanh toán từ VNPAY');
        }
      } catch (error) {
        console.error('Lỗi khi gọi thanh toán:', error);
        alert('Thanh toán thất bại. Vui lòng thử lại.');
      }
    },
    getTicketCount(ticketType) {
      return this.selectedSeats.filter(seat => {
        const type = seat.type?.toLowerCase()
        return (ticketType === 'economy' && type === 'economy') ||
            (ticketType === 'business' && type === 'business')
      }).length
    },

    calculatePassengerTypes() {
      this.adultCount = 0;
      this.childCount = 0;
      this.infantCount = 0;

      this.selectedSeats.forEach(seat => {
        const age = this.passengerInfos[seat.number].age;
        if (age >= 18) {
          this.adultCount++;
        } else if (age >= 2 && age < 18) {
          this.childCount++;
        } else {
          this.infantCount++;
        }
      });
    },
    getPassengerType(passenger) {
      if (!passenger || !passenger.birthDate) return '';
      const birthDate = new Date(passenger.birthDate);
      const ageDifMs = Date.now() - birthDate.getTime();
      const ageDate = new Date(ageDifMs);
      const age = Math.abs(ageDate.getUTCFullYear() - 1970);

      if (age >= 18) return 'Người lớn';
      else if (age >= 2) return 'Trẻ em';
      else return 'Em bé';
    },
    getAge(birthDate) {
      if (!birthDate) return 0;
      const birth = new Date(birthDate);
      const diffMs = Date.now() - birth.getTime();
      const ageDt = new Date(diffMs);
      return Math.abs(ageDt.getUTCFullYear() - 1970);
    }
  },
  mounted() {

    // console.log("Selected Seats:", selectedSeats);
    console.log("Passenger Infos:", this.bookingData);

    const savedParams = JSON.parse(localStorage.getItem('searchParams'));
    if (savedParams?.routeDisplay) {
      this.routeLabel = savedParams.routeDisplay;
    }

  }
  ,

  created() {
    if (this.$route.query.bookingData) {
      try {
        this.bookingData = JSON.parse(this.$route.query.bookingData);
      } catch (error) {
        console.error('Lỗi khi parse bookingData:', error);
      }
    }
    this.fetchFlightDetails()
  }
}
</script>

<style lang="scss">
.container-fluid {
  max-width: 1200px;
  margin: 0 auto;
}

.card {
  border-radius: 8px;
}

.flight-info {
  font-size: 1rem;
  line-height: 1.6;
}

.passenger-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: start;
}

.passenger-info {
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: calc(33.33% - 20px);
  /* 3 ô trong mỗi hàng */
  box-sizing: border-box;
}

.passenger-info p {
  margin: 5px 0;
}

.text-primary {
  color: #007bff !important;
}

.mt-4 {
  margin-top: 1.5rem !important;
}

.btn-lg {
  font-size: 1.1rem;
  padding: 10px 20px;
}

@media (max-width: 768px) {
  .passenger-info {
    width: 100%;
  }
}

.highlight-total {
  color: #FF5733;
  font-size: 1.2rem;
  font-weight: bold;
  background-color: #f8f9fa;
  padding: 5px 10px;
  border-radius: 5px;
}

.flight-card ul {
  line-height: 1.7;
}

.summary-card p {
  margin-bottom: 8px;
}

.summary-card .fs-5 {
  font-weight: 600;
}

.card-title {
  font-weight: 600;
}

.passenger-info {
  padding: 12px;
  background-color: #f8f9fa;
  border-radius: 6px;
}

.passenger-info {
  width: 48%;
  /* Chiếm 50% chiều rộng của phần tử cha */
  box-sizing: border-box;
  /* Đảm bảo padding không làm thay đổi tổng chiều rộng */
}
</style>

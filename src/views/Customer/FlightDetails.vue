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
  <div class="container-fluid mt-2 px-0">
    <div class="row">
      <!-- Thông tin chi tiết chuyến bay -->
      <v-card class="pa-4 mb-4" elevation="4">
        <v-card-title class="text-h6">VietNam Airline - {{ flight.flightCode }}</v-card-title>
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="6" v-if="flight.aircraft">
              <strong>Máy bay:</strong> {{ flight.aircraft }}
            </v-col>
            <v-col cols="12" md="6">
              <strong>Tuyến bay:</strong> {{ routeLabel }}
            </v-col>

            <v-col cols="12" md="6" v-if="flight.priceEconomy">
              <strong>Giá Economic:</strong> {{ flight.priceEconomy.toLocaleString() }} VNĐ
            </v-col>
            <v-col cols="12" md="6" v-if="flight.departureTime">
              <strong>Giờ đi:</strong> {{ formatTime(flight.departureTime) }}
            </v-col>

            <v-col cols="12" md="6" v-if="flight.priceBusiness">
              <strong>Giá Business:</strong> {{ flight.priceBusiness.toLocaleString() }} VNĐ
            </v-col>
            <v-col cols="12" md="6" v-if="flight.arrivalTime">
              <strong>Giờ đến:</strong> {{ formatTime(flight.arrivalTime) }}
            </v-col>

            <v-col cols="12" md="6">
              <strong>Số ghế:</strong> {{ flight.availableSeats }}/{{ flight.seats }}
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- Danh sách ghế ngồi -->
      <div class="col-md-6">
        <div class="card p-5 shadow-sm">
          <h5></h5>
          <p v-if="flight.seats"><strong>Tổng số ghế:</strong> {{ flight.seats }}</p>

          <div v-if="paginatedSeats.length > 0">
            <div v-for="(row, rowIndex) in paginatedSeats" :key="rowIndex" class="mb-3">
              <div class="d-flex justify-content-between">
                <!-- Nhóm 3 ghế bên trái -->
                <div class="d-flex">
                  <button v-for="seat in row.slice(0, 3)" :key="seat.number"
                          class="btn btn-sm seat-button mx-1" :class="[
                                            seat.selected
                                                ? 'btn-seat-selected'
                                                : seat.isBooked
                                                    ? 'btn-seat-booked'
                                                    : seat.type === 'Business'
                                                        ? 'btn-seat-business'
                                                        : 'btn-seat-economic'
                                        ]" @click="toggleSeat(seat)">
                    <i class="fas fa-chair me-1"></i> {{ seat.number }}
                  </button>

                </div>
                <!-- Nhóm 3 ghế bên phải -->
                <div class="d-flex">
                  <button v-for="seat in row.slice(3, 6)" :key="seat.number"
                          class="btn btn-sm seat-button mx-1" :class="[
                                            seat.selected
                                                ? 'btn-seat-selected'
                                                : seat.isBooked
                                                    ? 'btn-seat-booked'
                                                    : seat.type === 'Business'
                                                        ? 'btn-seat-business'
                                                        : 'btn-seat-economic'
                                        ]" @click="toggleSeat(seat)">
                    <i class="fas fa-chair me-1"></i> {{ seat.number }}
                  </button>

                </div>
              </div>
            </div>
            <!-- Pagination -->
            <div class="mt-3 d-flex justify-content-between">
              <button class="btn btn-outline-primary" :disabled="currentPage === 1"
                      @click="changePage(currentPage - 1)">Trang trước
              </button>
              <span>Trang {{ currentPage }} / {{ totalPages }}</span>
              <button class="btn btn-outline-primary" :disabled="currentPage === totalPages"
                      @click="changePage(currentPage + 1)">Trang sau
              </button>
            </div>
          </div>

          <div v-else>
            <p>Không có ghế nào để hiển thị.</p>
          </div>
        </div>
        <ErrorModal ref="errorModal" :message="errorMessage"/>

      </div>
    </div>


  </div>
</template>

<script>
import api from '../../services/api'
import ErrorModal from '../../components/ErrorModal.vue'
import {useRoute} from 'vue-router';
import {ref} from 'vue'


const route = useRoute();
const savedParams = JSON.parse(localStorage.getItem('searchParams'));

const visible = ref(false)
const message = ref('')


export default {
  components: {
    ErrorModal
  },
  data() {
    return {
      flight: {},
      seatLayout: [],
      selectedSeats: [],
      currentPage: 1,
      seatsPerPage: 18,
      passengerInfos: {},
      routeLabel: '',
      errorMessage: ''

    }
  },
  methods: {

    async bookTickets() {
      if (this.selectedSeats.length === 0) {
        this.$refs.errorModal.openModal('Vui lòng chọn ít nhất 1 ghế!');
        return;
      }
      const hasAdult = Object.values(this.passengerInfos).some(info => {
        const age = this.getAge(info.birthDate);
        return age >= 18;
      });

      if (!hasAdult) {
        this.$refs.errorModal.openModal('Cần ít nhất một hành khách trên 18 tuổi để đặt vé.');
        return;
      }
      let totalAmount = 0;
      Object.keys(this.passengerInfos).forEach(seatNumber => {
        const info = this.passengerInfos[seatNumber];
        const age = this.getAge(info.birthDate);
        const basePrice = info.ticketType === "Business" ? this.flight.priceBusiness : this.flight.priceEconomy;

        let price = basePrice;

        if (age < 2) {
          price = basePrice * 0.1;
        } else if (age < 12) {
          price = basePrice * 0.75;
        }

        this.passengerInfos[seatNumber].price = price;
        totalAmount += price;
      });

      localStorage.setItem('selectedSeats', JSON.stringify(this.selectedSeats))
      localStorage.setItem('passengerInfos', JSON.stringify(this.passengerInfos))
      localStorage.setItem('totalAmount', totalAmount)
      console.log('totalAmount:', totalAmount)
      if (JSON.parse(localStorage.getItem('selectedSeats')).length === 0) {
        alert('Không có ghế nào được chọn!')
        // this.$router.push('/seat-selection')
        return
      }
      this.$router.push(`/booking-confirm/${this.flight.id}`);
    },

    async fetchFlightDetails() {
      try {
        const response = await api.get(`/flights/flight/${this.$route.params.id}`)
        this.flight = response.data.data

        const capacity = this.flight.seats || 0
        const seatsPerRowLetters = ['A', 'B', 'C', 'D', 'E', 'F']
        const numRows = Math.ceil(capacity / seatsPerRowLetters.length)
        const layout = []

        // for (let i = 1; i <= numRows; i++) {
        //     const row = seatsPerRowLetters.map(letter => ({
        //         number: `${i}${letter}`,
        //         isBooked: false,
        //         selected: false
        //     }))
        //     layout.push(row)
        // }
        console.log("data", response.data.data);
        for (let i = 1; i <= numRows; i++) {
          const row = seatsPerRowLetters.map(letter => {
            const seatNumber = `${i}${letter}`;
            const isBusiness = i >= 1 && i <= 5;

            return {
              number: seatNumber,
              isBooked: false,
              selected: false,
              type: isBusiness ? 'Business' : 'Economic'
            };
          });
          layout.push(row);
        }

        this.seatLayout = layout
      } catch (error) {
        console.error('Lỗi khi lấy thông tin chuyến bay:', error)
      }
    },
    toggleSeat(seat) {
      if (seat.isBooked) return
      if (seat.selected) {
        seat.selected = false
        delete this.passengerInfos[seat.number];
      } else {
        if (this.selectedSeats.length < 5) {
          seat.selected = true;
          this.passengerInfos[seat.number] = {
            fullName: '',
            email: '',
            phone: '',
            birthDate: '',
            gender: '',
            nationality: '',
            nationalId: '',
            personalCode: '',
            ticketType: seat.type,
            age: null
          };
        } else {
          this.$refs.errorModal.openModal('Bạn chỉ có thể chọn tối đa 5 ghế!');
          return
        }
      }
      this.selectedSeats = this.seatLayout.flat().filter(s => s.selected)
    },
    getAge(birthDate) {
      if (!birthDate) return null;
      const today = new Date();
      const dob = new Date(birthDate);
      let age = today.getFullYear() - dob.getFullYear();
      const m = today.getMonth() - dob.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
      return age;
    },
    updateAge(seatNumber) {
      const info = this.passengerInfos[seatNumber];
      if (info && info.birthDate) {
        const age = this.getAge(info.birthDate);
        this.passengerInfos[seatNumber].age = age;
      }
    },

    getPassengerType(age) {
      if (age < 2) return "Em bé(Dưới 2 tuổi)";
      else if (age < 12) return "Trẻ em(2-12 tuổi)";
      else return "Người lớn(Trên 12 tuổi)";
    },
    calculatePrice(seatNumber) {
      const info = this.passengerInfos[seatNumber];
      const age = this.getAge(info.birthDate);
      const basePrice =
          info.ticketType === "Business"
              ? this.flight.priceBusiness
              : this.flight.priceEconomy;

      if (age < 2) return basePrice * 0.1;
      if (age < 12) return basePrice * 0.75;
      return basePrice;
    },
    formatTime(datetime) {
      return new Date(datetime).toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit'
      })
    },
    changePage(page) {
      if (page < 1 || page > this.totalPages) return
      this.currentPage = page
    }

  },

  computed: {

    paginatedSeats() {
      const start = (this.currentPage - 1) * this.seatsPerPage
      const end = start + this.seatsPerPage
      return this.seatLayout.slice(start, end)
    },
    totalPages() {
      return Math.ceil(this.seatLayout.length / this.seatsPerPage)
    }
  },
  mounted() {
    const savedParams = JSON.parse(localStorage.getItem('searchParams'));
    if (savedParams?.routeDisplay) {
      this.routeLabel = savedParams.routeDisplay;
    }
    console.log(this.routeLabel);
  },

  created() {
    this.fetchFlightDetails()
  }

}
</script>

<style scoped>
.btn.disabled {
  pointer-events: none;
}

.seat-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-weight: 500;
}

.btn-seat-selected {
  background-color: #28a745;
  color: white;
  border-color: #28a745;
}

.btn-seat-booked {
  background-color: #6c757d;
  color: white;
  border-color: #6c757d;
  pointer-events: none;
}

.btn-seat-business {
  background-color: rgba(0, 123, 255, 0.3);
  /* xanh dương nhạt */
  color: #004085;
  border-color: rgba(0, 123, 255, 0.5);
}

.btn-seat-economic {
  background-color: rgba(255, 193, 7, 0.3);
  /* vàng nhạt */
  color: #856404;
  border-color: rgba(255, 193, 7, 0.5);
}

.text-info {
  font-weight: 500;
}
</style>
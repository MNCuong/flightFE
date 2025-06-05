<template>
  <section class="about-banner relative">
    <div class="overlay overlay-bg"></div>
    <div class="container">
      <div class="row d-flex align-items-center justify-content-center">
        <div class="about-content col-lg-12">
          <h1 class="text-white">Gi?i thi?u</h1>
          <p class="text-white link-nav">
            <a href="/">Trang ch?</a>
            <span class="lnr lnr-arrow-right"></span>
            <a href="/about">Gi?i thi?u</a>
          </p>
        </div>
      </div>
    </div>
  </section>
  <div class="container-fluid mt-2 px-0">
    <div class="row">
      <!-- Thông tin chi ti?t chuy?n bay - C?t bên trái -->
      <div class="col-lg-4">
        <v-card class="pa-4 mb-4" elevation="4">
          <v-card-title class="text-h6">VietNam Airline - {{ flight.flightCode }}</v-card-title>
          <v-card-text>
            <strong>Tuyến bay:</strong> {{ routeLabel }}<br>
            <strong>Giá Economy:</strong> {{ flight.priceEconomy }} VNÐ<br>
            <strong>Giá Business:</strong> {{ flight.priceBusiness }} VNÐ
          </v-card-text>
        </v-card>
        <v-btn color="primary" class="mt-3" @click="submitBooking">Ð?t vé</v-btn>

        <!-- Khung thông tin khách hàng cho m?i gh? -->
        <div class="customer-info-wrapper" v-if="selectedSeats.length > 0">
          <h3 class="section-title">Thông tin hành khách</h3>

          <div class="customer-info-container">
            <div class="customer-info-card" v-for="seat in selectedSeats" :key="seat.number">
              <div class="seat-header">
                <h6 class="">Ghế: {{ seat.number }}</h6>
              </div>

              <div class="seat-form">
                <!-- Cột trái -->
                <div class="form-column">
                  <div class="form-group">
                    <label for="fullName">Họ và tên</label>
                    <input type="text" id="fullName" v-model="seat.passenger.fullName" placeholder="Nhập họ và tên"/>
                  </div>

                  <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" v-model="seat.passenger.email" placeholder="Nhập email"/>
                  </div>

                  <div class="form-group">
                    <label for="nationality">Quốc tịch</label>
                    <input type="text" id="nationality" v-model="seat.passenger.nationality"
                           placeholder="Nhập quốc tịch"/>
                  </div>
                </div>

                <!-- Cột phải -->
                <div class="form-column">
                  <div class="form-group" v-if="seat.passenger.isInternational">
                    <label for="passportNumber">Số hộ chiếu</label>
                    <input type="text" id="passportNumber" v-model="seat.passenger.passportNumber"
                           placeholder="Nhập số hộ chiếu"/>
                  </div>

                  <div class="form-group" v-else>
                    <label for="nationalId">CMND/CCCD</label>
                    <input type="text" id="nationalId" v-model="seat.passenger.nationalId"
                           placeholder="Nhập CMND/CCCD"/>
                  </div>

                  <div class="form-group">
                    <label for="birthDate">Ngày sinh</label>
                    <input type="date" id="birthDate" v-model="seat.passenger.birthDate"/>
                  </div>

                  <div class="form-group">
                    <label for="gender">Giới tính</label>
                    <select id="gender" v-model="seat.passenger.gender">
                      <option value="" disabled>Chọn giới tính</option>
                      <option value="0">Nam</option>
                      <option value="1">Nữ</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>


      <!-- C?t trái: Danh sách gh? -->
      <div class="col-lg-6" style="padding-right: 0px">
        <div class="container-seat">
          <div v-for="row in seatRows" :key="row.rowNumber" class="seat-row d-flex align-items-center mb-2">
            <div v-for="group in seatGroups" :key="group.join('-')" class="seat-group d-flex mx-3">
              <div v-for="seat in row.seats.filter(s => group.includes(s.number.slice(-1)))"
                   :key="seat.number"
                   class="seat-button"
                   :class="[
             seat.selected ? 'btn-seat-selected' :
             seat.isBooked ? 'btn-seat-booked' :
             seat.type === 'Business' ? 'btn-seat-business' : 'btn-seat-economy'
           ]"
                   @click="toggleSeat(seat)"
              >
                {{ seat.number }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- C?t ph?i: Legend -->
      <div class="col-lg-2">
        <div class="legend-container">
          <h4>Chú thích:</h4>
          <div class="legend-item">
            <span class="seat-button btn-seat-business"></span> Hạng thương gia
          </div>
          <div class="legend-item">
            <span class="seat-button btn-seat-economy"></span> Hạng phổ thông
          </div>
          <div class="legend-item">
            <span class="seat-button btn-seat-booked"></span> Ðã đặt
          </div>
          <div class="legend-item">
            <span class="seat-button btn-seat-selected"></span> Ðang chọn
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../services/api';
import {ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';

export default {
  data() {
    return {
      flight: {},
      seatLayout: [],
      selectedSeats: [],
      bookedSeats: [],
      routeLabel: '',
      tripType: 'oneWay',
      seatGroups: [
        ['A', 'B', 'C'],
        ['D', 'E', 'F'],
        ['G', 'H', 'I'],

      ]

    };

  },
  computed: {
    seatRows() {
      const rowsMap = {};
      this.seatLayout.forEach(seat => {
        const rowNumber = seat.number.match(/\d+/)[0];
        if (!rowsMap[rowNumber]) rowsMap[rowNumber] = [];
        rowsMap[rowNumber].push(seat);
      });

      const seatOrder = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
      const sortedRows = Object.keys(rowsMap)
          .sort((a, b) => a - b)
          .map(rowNumber => {
            const seats = rowsMap[rowNumber];
            seats.sort((a, b) => {
              return seatOrder.indexOf(a.number.slice(-1)) - seatOrder.indexOf(b.number.slice(-1));
            });
            return {rowNumber, seats};
          });

      return sortedRows;
    }
  },

  methods: {
    async fetchTicket() {
      try {
        const response = await api.get(`/ticket/flight/${this.$route.params.id}`);
        this.bookedSeats = response.data.data.map(ticket => ticket.seatNumber);

        this.seatLayout.forEach(seat => {
          seat.isBooked = this.bookedSeats.includes(seat.number);
          if (seat.isBooked) seat.selected = false;
        });
      } catch (error) {
        console.error('Error fetching flight details:', error);
      }
    },

    async fetchFlightDetails() {
      try {
        const response = await api.get(`/flights/flight/${this.$route.params.id}`);
        this.flight = response.data.data;

        const capacity = this.flight.seats;
        const seatLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
        const seatsPerRow = seatLetters.length;
        const fullRows = Math.floor(capacity / seatsPerRow);
        const remainingSeats = capacity % seatsPerRow;

        const seatLayout = [];

        for (let row = 1; row <= fullRows; row++) {
          for (let col = 0; col < seatsPerRow; col++) {
            const seatNumber = `${row}${seatLetters[col]}`;
            const isBusiness = row <= 5;

            seatLayout.push({
              number: seatNumber,
              isBooked: false,
              selected: false,
              type: isBusiness ? 'Business' : 'Economy',
              passenger: {
                fullName: '',
                passportNumber: '',
                nationalId: '',
                nationality: '',
                email: '',
                birthDate: null,
                gender: '',
                isInternational: false,
                number: seatNumber,
                type: isBusiness ? 'Business' : 'Economy',
                price: '',
              }
            });
          }
        }

        if (remainingSeats > 0) {
          const lastRow = fullRows + 1;
          for (let col = 0; col < remainingSeats; col++) {
            const seatNumber = `${lastRow}${seatLetters[col]}`;
            const isBusiness = lastRow <= 5;

            seatLayout.push({
              number: seatNumber,
              isBooked: false,
              selected: false,
              type: isBusiness ? 'Business' : 'Economy',
              passenger: {
                fullName: '',
                passportNumber: '',
                nationalId: '',
                nationality: '',
                email: '',
                birthDate: null,
                gender: '',
                isInternational: false,
                number: seatNumber,
                type: isBusiness ? 'Business' : 'Economy',
              }
            });
          }
        }
        this.seatLayout = seatLayout;
        await this.fetchTicket();
      } catch (error) {
        console.error('Error fetching flight details:', error);
      }
    },

    toggleSeat(seat) {
      if (seat.isBooked) return;

      seat.selected = !seat.selected;

      if (seat.selected) {
        this.selectedSeats.push(seat);
      } else {
        this.selectedSeats = this.selectedSeats.filter(s => s.number !== seat.number);
      }
    },

    submitBooking() {
      if (this.selectedSeats.length === 0) {
        alert("Vui lòng chọn ít nhất một ghế!");
        return;
      }

      const bookingData = this.selectedSeats.map(seat => {
        const price = seat.type === 'Business' ? this.flight.priceBusiness : this.flight.priceEconomy;
        return {
          // type: seat.type,
          // seatNumber: seat.number,
          passenger: {...seat.passenger},
          price: price,
          tripType: this.tripType
        };
      });


      this.$router.push({
        name: "booking-confirm",
        params: {id: this.flight.id},
        query: {bookingData: JSON.stringify(bookingData)}
      });
    }
  },

  created() {
    this.fetchFlightDetails();
  },
  watch: {
    selectedSeats: {
      handler() {
        this.selectedSeats.forEach(seat => {
          seat.passenger.isInternational = seat.passenger.nationality.toLowerCase() !== 'vietnam' && seat.passenger.nationality !== '';
        });
      },
      deep: true
    }
  }

};
</script>

<style scoped>
.container-seat {
  max-width: 600px;
  margin: auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  background-color: #ffffff !important;
}

.seat-row {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 10px;
}

.seat-group {
  gap: 8px;
}

.seat-button {
  width: 40px;
  height: 40px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
}

.aisle {
  width: 40px;
  height: 40px;
}


.btn-seat-selected {
  background-color: #28a745;
  color: white;
}

.btn-seat-booked {
  background-color: #6c757d;
  color: white;
  cursor: not-allowed;
  pointer-events: none;
  opacity: 0.7;
}


.btn-seat-business {
  background-color: #007bff;
  color: white;
}

.btn-seat-economy {
  background-color: #ffc107;
  color: white;
}

.seat-button {
  width: 40px;
  height: 40px;
  margin-bottom: 8px;
  font-weight: 600;
  border-radius: 6px;
  border: none;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease;
  user-select: none;
}


.seat-button:not(.btn-seat-booked):hover {
  filter: brightness(90%);
}

.container-seat {
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.legend-container {
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-left: 20px;
}

.legend-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.legend-item .seat-button {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}

.seat-group {
  display: flex;
  gap: 10px;
}

.seat-button {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 5px;
  font-weight: bold;
}

.btn-seat-business {
  background-color: #FFD700;
  color: #000;
}

.btn-seat-economy {
  background-color: #3498db;
  color: #fff;
}

.btn-seat-booked {
  background-color: #c5c5c5;
  color: #fff;
  cursor: not-allowed;
}

.btn-seat-selected {
  background-color: #2ecc71;
  color: #fff;
}

.customer-info-wrapper {
  margin-top: 20px;
}

.section-title {
  font-size: 1.5rem;
  margin-bottom: 16px;
  color: #333;
  font-weight: bold;
}

.customer-info-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.customer-info-card {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: calc(50% - 20px);
  min-width: 100%;
  margin-bottom: 16px;
}

.seat-header {
  background-color: #007bff;
  color: #fff;
  padding: 8px;
  border-radius: 6px;
  text-align: center;
  font-weight: bold;
  margin-bottom: 12px;
}

.seat-form {
  display: flex;
  gap: 16px;
}

.form-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 600;
  color: #555;
  margin-bottom: 6px;
}

.form-group input,
.form-group select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0px 0px 4px rgba(0, 123, 255, 0.3);
}


</style>
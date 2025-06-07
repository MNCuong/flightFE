<template>
  <section class="about-banner relative">
    <div class="overlay overlay-bg"></div>
    <div class="container">
      <div class="row d-flex align-items-center justify-content-center">
        <div class="about-content col-lg-12">
          <h1 class="text-white">Chi tiết chuyến bay</h1>
          <p class="text-white link-nav">
            <a href="/">Trang chủ</a>
            <span class="lnr lnr-arrow-right"></span>
            <a href="/">Chi tiết chuyến bay</a>
          </p>
        </div>
      </div>
    </div>
  </section>
  <div class="container mt-2 px-0"><br>
    <div class="row">
      <!-- Cột trái: Thông tin chuyến bay -->
      <div class="col-lg-6">
        <v-card class="pa-4 mb-4 rounded-lg elevation-5">
          <v-card-title class="text-h6">
            ✈️ VietNam Airline - <strong class="ml-2">{{ flight.flightCode }}</strong>
          </v-card-title>

          <v-divider class="my-2"></v-divider>

          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-icon color="blue" class="mr-1">mdi-airplane-takeoff</v-icon>
                <strong>Tuyến bay:</strong> {{ routeLabel }}
              </v-col>
              <v-col cols="12">
                <v-icon color="green" class="mr-1">mdi-seat-recline-normal</v-icon>
                <strong>Giá Economy:</strong> {{ flight.priceEconomy }} VNĐ
              </v-col>
              <v-col cols="12">
                <v-icon color="purple" class="mr-1">mdi-seat</v-icon>
                <strong>Giá Business:</strong> {{ flight.priceBusiness }} VNĐ
              </v-col>
            </v-row>

            <v-btn color="primary" block class="mt-4" @click="submitBooking">
              <v-icon left>mdi-ticket-confirmation</v-icon>
              Đặt vé
            </v-btn>
          </v-card-text>
        </v-card>
      </div>

      <!-- Cột giữa: Chú thích -->
      <div class="col-lg-6">
        <v-card class="pa-4 mb-4 rounded-lg elevation-5">
          <v-card-title class="text-h6">🎨 Chú thích ghế</v-card-title>

          <v-divider class="my-2"></v-divider>

          <v-card-text>
            <v-row dense>
              <v-col cols="6" class="d-flex align-center mb-2">
                <v-avatar size="24" class="mr-2" color="purple"/>
                <span>Hạng thương gia</span>
              </v-col>

              <v-col cols="6" class="d-flex align-center mb-2">
                <v-avatar size="24" class="mr-2" color="green"/>
                <span>Hạng phổ thông</span>
              </v-col>

              <v-col cols="6" class="d-flex align-center mb-2">
                <v-avatar size="24" class="mr-2" color="grey"/>
                <span>Đã đặt</span>
              </v-col>

              <v-col cols="6" class="d-flex align-center mb-2">
                <v-avatar size="24" class="mr-2" color="red"/>
                <span>Đang chọn</span>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </div>

    </div>
    <hr>
    <div class="row">
      <div class="col-lg-6">
        <div class="customer-info-wrapper" v-if="selectedSeats.length > 0">
          <h3 class="section-title">Thông tin hành khách</h3>

          <div class="customer-info-container">
            <div class="customer-info-card" v-for="seat in selectedSeats" :key="seat.number">
<!--              <div class="seat-header">-->
<!--                <h6>Ghế: {{ seat.number }}</h6>-->
<!--              </div>-->

              <div class="seat-form d-flex">
                <!-- Cột trái -->
                <div class="form-column">
                  <div class="form-group">
                    <v-text-field
                        v-model="seat.passenger.fullName"
                        label="Tên hành khách"
                        required
                        outlined
                        dense
                        variant="outlined"
                        rounded="lg"
                        prepend-inner-icon="mdi-account"
                    ></v-text-field>
                  </div>

                  <div class="form-group">
                    <v-text-field
                        v-model="seat.passenger.email"
                        label="Email"
                        type="email"
                        required
                        outlined
                        dense
                        variant="outlined"
                        rounded="lg"
                        prepend-inner-icon="mdi-email"
                    ></v-text-field>
                  </div>

                  <div class="form-group">
                    <v-text-field
                        v-model="seat.passenger.nationality"
                        label="Quốc tịch"
                        type="Quốc tịch"
                        required
                        outlined
                        dense
                        variant="outlined"
                        rounded="lg"
                        prepend-inner-icon="mdi-flag"
                    ></v-text-field>
                  </div>
                </div>

                <div class="form-column">
                  <div class="form-group" v-if="seat.passenger.isInternational">
                    <v-col cols="12" md="4">
                      <v-select
                          v-model="seat.passenger.gender"
                          :items="genderOptions"
                          label="Giới tính"
                          item-title="label"
                          item-value="value"
                          required
                          outlined
                          dense
                          variant="outlined"
                          rounded="lg"
                          prepend-inner-icon="mdi-gender-male-female"
                      />
                    </v-col>
                  </div>

                  <div class="form-group" v-else>
                    <v-text-field
                        v-model="seat.passenger.nationalId"
                        label="CCCD / Hộ chiếu"
                        outlined
                        dense
                        variant="outlined"
                        rounded="lg"
                        prepend-inner-icon="mdi-card-account-details"
                    ></v-text-field>
                  </div>

                  <div class="form-group">
                    <v-text-field
                        v-model="seat.passenger.dateOfBirth"
                        label="Ngày sinh"
                        type="date"
                        required
                        outlined
                        dense
                        variant="outlined"
                        rounded="lg"
                        prepend-inner-icon="mdi-calendar"
                    ></v-text-field>
                  </div>

                  <div class="form-group">
                    <v-select
                        v-model="seat.passenger.gender"
                        :items="genderOptions"
                        label="Giới tính"
                        item-title="label"
                        item-value="value"
                        required
                        outlined
                        dense
                        variant="outlined"
                        rounded="lg"
                        prepend-inner-icon="mdi-gender-male-female"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div class="col-lg-6">
        <div class="seat-layout d-flex justify-content-center">
          <!-- Khối ghế trái -->
          <div class="seat-block">
            <div v-for="(row, rowIndex) in seatRows" :key="'left-' + rowIndex" class="seat-row">
              <div
                  v-for="seat in row.seats.filter(s => ['A', 'B', 'C'].includes(s.number.slice(-1)))"
                  :key="seat.number"
                  :class="[
        'seat-icon',
        seat.selected ? 'selected' :
        seat.isBooked ? 'booked' :
        seat.type === 'Business' ? 'business' : 'economy'
      ]"
                  @click="toggleSeat(seat)"
                  title="Ghế {{ seat.number }}"
                  style="cursor: pointer; user-select: none; display: flex; flex-direction: column; align-items: center;"
              >
                <v-icon large>mdi-seat-recline-normal</v-icon>
                <span class="seat-number" style="margin-top: 4px;">{{ seat.number }}</span>
              </div>
            </div>
          </div>


          <div class="aisle"></div>

          <!-- Khối ghế giữa -->
          <div class="seat-block">
            <div v-for="(row, rowIndex) in seatRows" :key="'middle-' + rowIndex" class="seat-row">
              <div v-for="seat in row.seats.filter(s => ['D', 'E', 'F'].includes(s.number.slice(-1)))"
                   :key="seat.number"
                   :class="[
        'seat-icon',
        seat.selected ? 'selected' :
        seat.isBooked ? 'booked' :
        seat.type === 'Business' ? 'business' : 'economy'
      ]"
                   @click="toggleSeat(seat)"
                   title="Ghế {{ seat.number }}"
                   style="cursor: pointer; user-select: none; display: flex; flex-direction: column; align-items: center;"
              >
                <v-icon large>mdi-seat-recline-normal</v-icon>
                <span class="seat-number" style="margin-top: 4px;">{{ seat.number }}</span>
              </div>
            </div>
          </div>

          <div class="aisle"></div>

          <!-- Khối ghế phải -->
          <div class="seat-block">
            <div v-for="(row, rowIndex) in seatRows" :key="'right-' + rowIndex" class="seat-row">
              <div v-for="seat in row.seats.filter(s => ['G', 'H', 'I'].includes(s.number.slice(-1)))"
                   :key="seat.number"
                   :class="[
        'seat-icon',
        seat.selected ? 'selected' :
        seat.isBooked ? 'booked' :
        seat.type === 'Business' ? 'business' : 'economy'
      ]"
                   @click="toggleSeat(seat)"
                   title="Ghế {{ seat.number }}"
                   style="cursor: pointer; user-select: none; display: flex; flex-direction: column; align-items: center;"
              >
                <v-icon large>mdi-seat-recline-normal</v-icon>
                <span class="seat-number" style="margin-top: 4px;">{{ seat.number }}</span>
              </div>
            </div>
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
      genderOptions: [
        { label: 'Nam', value: 0 },
        { label: 'Nữ', value: 1 }
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
              type: isBusiness ? 'Business' : 'Economy',
              passenger: {
                name: '',
                email: '',
                gender: '',
                nationality: '',
                dateOfBirth: '',
                nationalId: '',
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
                name: '',
                passportNumber: '',
                nationalId: '',
                nationality: '',
                email: '',
                dateOfBirth: null,
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

      const passengerInfos = this.selectedSeats.map(seat => ({
        ...seat.passenger
      }));

      const totalAmount = this.selectedSeats.reduce((sum, seat) => {
        const price = seat.type === 'Business' ? this.flight.priceBusiness : this.flight.priceEconomy;
        return sum + price;
      }, 0);

      const departureFlightId = this.tripType === 'oneWay' ? this.flight.id : null;
      const returnFlightId = this.tripType === 'roundTrip' ? null : null;

      const departureSeats = this.tripType === 'oneWay'
          ? this.selectedSeats.map(seat => seat.number)
          : this.selectedSeats.filter(s => s.isReturn !== true).map(seat => seat.number);

      const returnSeats = this.tripType === 'roundTrip'
          ? this.selectedSeats.filter(s => s.isReturn === true).map(seat => seat.number)
          : [];

      const bookingData = {
        departureFlightId: departureFlightId,
        departureSeats: departureSeats,
        passengers: passengerInfos,

      };
      console.log("bookingDataRoundTrip: ", bookingData);

      this.$router.push({
        name: "booking-confirm",
        query: {
          bookingData: JSON.stringify(bookingData)
        }
      });
    },
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
.seat-row {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 10px;
}

.aisle {
  width: 40px;
  height: 40px;
}

.legend-item .seat-button {
  width: 30px;
  height: 30px;
  margin-right: 10px;
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

.seat-layout {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.seat-block {
  display: flex;
  flex-direction: column;
}

.seat-row {
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
}


.aisle {
  width: 30px;
}
.customer-info-wrapper {
  padding: 16px;
}

.section-title {
  font-size: 20px;
  margin-bottom: 12px;
  font-weight: 600;
  color: #333;
}

.customer-info-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.customer-info-card {
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  padding: 16px;
}

.seat-header h6 {
  margin: 0 0 12px;
  color: #1976d2;
  font-weight: 600;
}

.seat-form {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.form-column {
  flex: 1;
  min-width: 180px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
}

.form-group label {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
}

.form-group input,
.form-group select {
  padding: 6px 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
}
.seat-icon {
  width: 50px;
  height: 50px;
  min-width: 50px;
  font-size: 14px;
  padding: 0;
  text-align: center;
  justify-content: center;
  border: 2px solid transparent;
  border-radius: 8px;
  transition: all 0.3s ease;
  color: #555;
  background-color: white;
  user-select: none;
}

.seat-icon.selected {
  border-color: #f44336;
  background-color: #f5a9a9;
  color: #f44336;
  font-weight: bold;
}

.seat-icon.booked {
  color: grey;
  background-color: white;
  cursor: default;
  border-color: #a8a8a8;

}

.seat-icon.business {
  color: #a85de3;
  border-color: #d9bffd;

}

.seat-icon.economy {
  color: #35d73a;
  border-color: #a9f8ae;

}

.seat-icon:hover:not(.booked):not(.selected) {
  border-color: #f44336;
  color: #f44336;
  background-color: #fbbbbb;
}

</style>
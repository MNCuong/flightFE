<template>
  <section class="about-banner relative">
    <div class="overlay overlay-bg">
    </div>
    <div class="container">
      <div class="row d-flex align-items-center justify-content-center">
        <div class="about-content col-lg-12">
          <h1 class="text-white">
            Tìm kiếm
          </h1>
          <p class="text-white link-nav">
            <a href="index.html">
              Trang chủ
            </a>
            <span class="lnr lnr-arrow-right">
                                          </span>
            <a href="/search-flight">
              Tìm kiếm
            </a>
          </p>
        </div>
      </div>
    </div>
  </section>
  <div v-if="!isLoading">
    <section class="about-info-area section-gap">
      <div class="container">
        <div class="row">
          <div class="col-lg-4">
            <form class="form-wrap bg-light p-4 rounded shadow-sm" @submit.prevent="searchFlight">
              <select class="form-control mb-3" v-model="departure" required>
                <option value="" disabled selected>Nơi đi</option>
                <option v-for="location in locations" :key="location" :value="location">{{ location }}</option>
              </select>

              <select class="form-control mb-3" v-model="arrival" required>
                <option value="" disabled selected>Nơi đến</option>
                <option v-for="location in locations" :key="location" :value="location">{{ location }}</option>
              </select>

              <Datepicker
                  v-if="tripType === 'roundTrip'"
                  v-model="dateRange"
                  :range="true"
                  placeholder="Chọn ngày đi và ngày về"
                  :multi-calendars="true"
                  :columns="2"
                  :format="'dd/MM/yyyy'"
                  class="mb-3"
              />

              <Datepicker
                  v-else
                  v-model="startDate"
                  placeholder="Ngày khởi hành"
                  :format="'dd/MM/yyyy'"
                  class="mb-3"
              />

              <input
                  v-if="tripType === 'roundTrip'"
                  class="form-control mb-3"
                  v-model="passengerNumber"
                  type="number"
                  min="1"
                  placeholder="Số hành khách"
                  required
              />

              <select class="form-control mb-4" v-model="tripType">
                <option value="oneWay">Một chiều</option>
                <option value="roundTrip">Khứ hồi</option>
              </select>

              <button type="submit" class="btn btn-primary w-100 py-3 font-weight-bold btn-search">
                Tìm chuyến bay
              </button>
            </form>
          </div>
          <div class="col-lg-8">
            <!-- Nav tabs -->
            <ul class="nav nav-tabs mb-4">
              <li class="nav-item">
                <button
                    class="nav-link"
                    :class="{ active: activeTab === 'departure' }"
                    @click="activeTab = 'departure'"
                    type="button"
                >
                  Chuyến đi
                </button>
              </li>
              <li class="nav-item" v-if="tripType === 'roundTrip'">
                <button
                    class="nav-link"
                    :class="{ active: activeTab === 'return' }"
                    @click="activeTab = 'return'"
                    type="button"
                >
                  Chuyến về
                </button>
              </li>
            </ul>

            <!-- Tab nội dung -->
            <div v-if="activeTab === 'departure'">
              <div v-if="flights.length > 0">
                <div class="row">
                  <div v-for="flight in flights" :key="flight.id" class="col-md-6 mb-4">
                    <div
                        class="card flight-card h-100 border-0 rounded-4 shadow-sm"
                        :class="{ 'border-primary': selectedDepartureFlight?.id === flight.id }"
                    >
                      <div class="card-body d-flex flex-column">
                        <h5 class="card-title text-primary fw-bold">{{ flight.flightCode }}</h5>
                        <p class="card-text text-muted mb-1">
                          <strong>Khởi hành:</strong> {{ flight.departureAirport }} - {{ formatTime(flight.departureTime) }}
                        </p>
                        <p class="card-text text-muted mb-1">
                          <strong>Đến:</strong> {{ flight.arrivalAirport }} - {{ formatTime(flight.arrivalTime) }}
                        </p>
                        <p class="card-text text-success fw-bold mb-3">
                          <strong>Giá vé:</strong> {{ formatCurrency(flight.priceEconomy) }}
                        </p>
                        <button
                            class="btn mt-auto"
                            :class="selectedDepartureFlight?.id === flight.id ? 'btn-success' : 'btn-outline-primary'"
                            @click="selectDepartureFlight(flight)"
                        >
                          {{ selectedDepartureFlight?.id === flight.id ? 'Bỏ chọn' : 'Chọn chuyến đi' }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="text-center text-muted my-5">
                Không có chuyến bay phù hợp cho chuyến đi.
              </div>
            </div>

            <div v-if="activeTab === 'return' && tripType === 'roundTrip'">
              <div v-if="returnFlights.length > 0">
                <div class="row">
                  <div v-for="flight in returnFlights" :key="flight.id" class="col-md-6 mb-4">
                    <div
                        class="card flight-card h-100 border-0 rounded-4 shadow-sm"
                        :class="{ 'border-primary': selectedReturnFlight?.id === flight.id }"
                    >
                      <div class="card-body d-flex flex-column">
                        <h5 class="card-title text-primary fw-bold">{{ flight.flightCode }}</h5>
                        <p class="card-text text-muted mb-1">
                          <strong>Khởi hành:</strong> {{ flight.departureAirport }} - {{ formatTime(flight.departureTime) }}
                        </p>
                        <p class="card-text text-muted mb-1">
                          <strong>Đến:</strong> {{ flight.arrivalAirport }} - {{ formatTime(flight.arrivalTime) }}
                        </p>
                        <p class="card-text text-success fw-bold mb-3">
                          <strong>Giá vé:</strong> {{ formatCurrency(flight.priceEconomy) }}
                        </p>
                        <button
                            class="btn mt-auto"
                            :class="selectedReturnFlight?.id === flight.id ? 'btn-success' : 'btn-outline-primary'"
                            @click="selectReturnFlight(flight)"
                        >
                          {{ selectedReturnFlight?.id === flight.id ? 'Bỏ chọn' : 'Chọn chuyến về' }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="text-center text-muted my-5">
                Không có chuyến bay phù hợp cho chuyến về.
              </div>
            </div>

            <div class="text-center mt-4">
              <button
                  class="btn btn-success btn-lg px-5 fw-bold"
                  :disabled="tripType === 'roundTrip' ? !(selectedDepartureFlight && selectedReturnFlight) : !selectedDepartureFlight"
                  @click="bookRoundTrip"
              >
                Đặt vé
              </button>
            </div>
          </div>        </div>
      </div>
    </section>
  </div>
  <LoadingSpinner v-else/>

  <p v-if="departure === arrival && departure" class="alert alert-danger mt-2">
    Nơi đi và nơi đến không được trùng nhau.
  </p>


</template>

<script setup>
import {ref, onMounted, watch} from 'vue';
import axios from '../../services/api.js';
import {useRoute, useRouter} from 'vue-router';
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const isLoading = ref(false);
const today = new Date();
const dateRange = ref([today, today]);
const route = useRoute();
const router = useRouter();
// const passengerNumber = ref('');

const departure = ref(route.query.departure || '');
const arrival = ref(route.query.arrival || '');
const startDate = ref(route.query.startDate || '');
const returnDate = ref(route.query.returnDate || '');
const tripType = ref(route.query.tripType || 'oneWay');
const passengerNumber = ref(route.query.passengerNumber || '');
const activeTab = ref('departure');
const flights = ref([]);
const returnFlights = ref([]);
const locations = ref([]);

const selectedDepartureFlight = ref(null);
const selectedReturnFlight = ref(null);

const searchFlight = async () => {
  if (!departure.value || !arrival.value || !startDate.value) return;
  if (departure.value === arrival.value) return;

  const params = {
    departure: departure.value,
    arrival: arrival.value,
    startDate: startDate.value,
    returnDate: returnDate.value,
    tripType: tripType.value,
  };

  // Tạo URL query string từ params để log
  const queryString = new URLSearchParams(params).toString();
  const fullUrl = `/flights/search-flight?${queryString}`;
  console.log('Calling API:', fullUrl);

  try {
    isLoading.value = true;
    const response = await axios.get('/flights/search-flight', {params});

    flights.value = response.data.data.departureFlights?.content || [];
    returnFlights.value = response.data.data.returnFlights?.content || [];

    selectedDepartureFlight.value = null;
    selectedReturnFlight.value = null;
  } catch (error) {
    console.error('Error:', error);
  } finally {
    isLoading.value = false;
  }
};


const fetchAirports = async () => {
  try {
    const res = await axios.get('/airport-info/list');
    locations.value = res.data.data.map(item => item.city);
  } catch (err) {
    console.error(err);
  }
};

const selectDepartureFlight = (flight) => {
  if (selectedDepartureFlight.value?.id === flight.id) {
    selectedDepartureFlight.value = null;
  } else {
    selectedDepartureFlight.value = flight;
  }
};

const selectReturnFlight = (flight) => {
  if (selectedReturnFlight.value?.id === flight.id) {
    selectedReturnFlight.value = null;
  } else {
    selectedReturnFlight.value = flight;
  }
};


const bookRoundTrip = () => {
  const departureId = selectedDepartureFlight.value?.id;
  const returnId = selectedReturnFlight.value?.id || null;

  if (tripType.value === 'oneWay') {
    if (departureId) {
      router.push({
        path: `/flight-details/${departureId}`,
        query: {
          tripType: tripType.value
        }
      });
    }
  } else if (tripType.value === 'roundTrip') {
    if (departureId && returnId) {
      router.push({
        path: '/round-trip-booking',
        query: {
          departureFlightId: departureId,
          returnFlightId: returnId,
          passengerNumber: passengerNumber.value,
          tripType: tripType.value

        }
      });
    }
  }
};

onMounted(() => {
  fetchAirports();

  // Chuẩn hóa startDate và returnDate từ query hoặc dateRange
  if (route.query.dateRange) {
    try {
      const arr = JSON.parse(route.query.dateRange);
      if (Array.isArray(arr) && arr.length === 2) {
        const start = new Date(arr[0]);
        const end = new Date(arr[1]);
        if (!isNaN(start) && !isNaN(end)) {
          dateRange.value = [start, end];
          startDate.value = start.toISOString().slice(0, 10);
          returnDate.value = end.toISOString().slice(0, 10);
        }
      }
    } catch (e) {
      console.error('Lỗi parse dateRange:', e);
    }
  } else {
    if (route.query.startDate) {
      const start = new Date(route.query.startDate);
      if (!isNaN(start)) {
        startDate.value = start.toISOString().slice(0, 10);
      }
    }
    if (route.query.returnDate) {
      const end = new Date(route.query.returnDate);
      if (!isNaN(end)) {
        returnDate.value = end.toISOString().slice(0, 10);
      }
    }
  }

  if (departure.value && arrival.value && startDate.value) {
    searchFlight();
  }
});

const formatTime = (dateTime) => {
  return new Date(dateTime).toLocaleString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(value);
};
watch(startDate, (newVal) => {
  if (newVal) {
    const d = new Date(newVal);
    if (!isNaN(d)) {
      startDate.value = d.toISOString().slice(0, 10);
    }
  }
});


watch(returnDate, (newVal) => {
  if (newVal) {
    const d = new Date(newVal);
    if (!isNaN(d)) {
      returnDate.value = d.toISOString().slice(0, 10);
    }
  }
  // searchFlight();
});

// Nếu bạn dùng dateRange (đối với chuyến khứ hồi)
watch(dateRange, (newRange) => {
  if (Array.isArray(newRange) && newRange.length === 2) {
    const [start, end] = newRange;
    if (start && end && !isNaN(new Date(start)) && !isNaN(new Date(end))) {
      startDate.value = new Date(start).toISOString().slice(0, 10);
      returnDate.value = new Date(end).toISOString().slice(0, 10);
    }
  }
});


// Watch các input khác cũng tương tự
watch([departure, arrival, tripType, passengerNumber], () => {
  // searchFlight();
});
</script>

<style scoped>
.flight-item {
  background: #f8f9fa;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 8px;
  border: 1px solid #ddd;
}
.form-wrap {
  max-width: 100%;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.form-wrap:hover {
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
}

.form-control {
  border-radius: 12px;
  height: 45px;
  padding-left: 15px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-control:focus {
  border-color: #3f51b5;
  box-shadow: 0 0 8px rgba(63, 81, 181, 0.3);
  outline: none;
}

.btn-search {
  background: linear-gradient(45deg, #3f51b5, #5a67d8);
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  transition: background 0.3s ease;
}

.btn-search:hover {
  background: linear-gradient(45deg, #5a67d8, #3f51b5);
}

.mb-3 {
  margin-bottom: 1rem !important;
}

.mb-4 {
  margin-bottom: 1.5rem !important;
}
.flight-card {
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
  cursor: pointer;
}
.flight-card:hover {
  box-shadow: 0 8px 20px rgba(63, 81, 181, 0.2);
}
.flight-card.border-primary {
  border-width: 2px !important;
}
.card-title {
  font-size: 1.25rem;
}
.btn {
  border-radius: 10px;
  font-weight: 600;
  padding: 0.5rem 1rem;
  transition: background-color 0.3s ease;
}
.btn-outline-primary:hover {
  background-color: #3f51b5;
  color: #fff;
}
.btn-success {
  background-color: #4caf50;
  border-color: #4caf50;
}
</style>

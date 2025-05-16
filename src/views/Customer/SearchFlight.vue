<template>
  <section class="about-banner relative">
    <div class="overlay overlay-bg"></div>
    <div class="container">
      <div class="row d-flex align-items-center justify-content-center">
        <div class="about-content col-lg-12">
          <h1 class="text-white">Tìm kiếm</h1>
          <p class="text-white link-nav">
            <a href="/">Trang chủ</a>
<!--            <span class="lnr lnr-arrow-right"></span>-->
<!--            <a href="/search">Tìm kiếm</a>-->
          </p>
        </div>
      </div>
    </div>
  </section>

  <section class="about-info-area section-gap">
    <div class="container">
      <div class="row">
        <!-- Form tìm kiếm chuyến bay bên trái -->
        <div class="col-lg-4">
          <form class="form-wrap" @submit.prevent="searchFlight">
            <select class="form-control" v-model="departure" @blur="updatePlaceholder" @focus="clearPlaceholder">
              <option value="" disabled selected>Nơi đi</option>
              <option v-for="location in locations" :key="location" :value="location">
                {{ location }}
              </option>
            </select>

            <select class="form-control" v-model="arrival" @blur="updatePlaceholder" @focus="clearPlaceholder">
              <option value="" disabled selected>Nơi đến</option>
              <option v-for="location in locations" :key="location" :value="location">
                {{ location }}
              </option>
            </select>

            <input class="form-control" name="start" v-model="startDate" @blur="updatePlaceholder"
              @focus="clearPlaceholder" placeholder="Ngày khởi hành" type="date" />

            <button type="submit" class="primary-btn text-uppercase">Tìm kiếm chuyến bay</button>
          </form>
        </div>

        <!-- Kết quả chuyến bay bên phải -->
        <div class="col-lg-8">
          <div v-if="flights.length > 0">
            <h3>Kết quả tìm kiếm</h3>
            <div v-for="flight in paginatedFlights" :key="flight.id" class="flight-item">
              <h4>
                <!-- Hiển thị tên hãng và logo -->
                <img v-if="flight.airline.name === 'Vietnam Airlines'" src="@/assets/logoflight/vnairline.png"
                  alt="Vietnam Airlines" class="airline-logo" />
                <img v-if="flight.airline.name === 'Bamboo Airways'" src="@/assets/logoflight/bambo.png"
                  alt="Bamboo Airways" class="airline-logo" />
                {{ flight.airline.name }} ({{ flight.flightDetails.codeshared.flightNumber }})
              </h4>
              <p><strong>Khởi hành:</strong> {{ flight.departureAirport.airport }} - {{ formatTime(flight.departureTime)
              }}</p>
              <p><strong>Đến:</strong> {{ flight.arrivalAirport.airport }} - {{ formatTime(flight.arrivalTime) }}</p>
              <p><strong>Giá vé (Economy):</strong> {{ flight.priceEconomy | currency }}</p>
              <!-- <p><strong>Giá vé (Business):</strong> {{ flight.priceBusiness | currency }}</p> -->

              <!-- Nút đặt vé -->
              <button class="primary-btn" @click="bookFlight(flight)">Đặt vé</button>
            </div>

            <!-- Phân trang -->
            <div class="pagination" v-if="totalPages > 1">
              <button @click="prevPage" :disabled="currentPage === 1">Trước</button>
              <span>Trang {{ currentPage }} / {{ totalPages }}</span>
              <button @click="nextPage" :disabled="currentPage === totalPages">Sau</button>
            </div>

          </div>
          <div v-else>
            <p>Không có chuyến bay nào phù hợp.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, watch, onMounted,computed } from 'vue';
import axios from '../../services/api.js';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const departure = ref(route.query.departure || '');
const arrival = ref(route.query.arrival || '');
const startDate = ref(route.query.startDate || '');

const flights = ref([]);
const locations = ref([]);

const searchFlight = async () => {
  console.log("Tìm kiếm chuyến bay...");
  // if (hasError.value) {
  //   return;
  // }

  try {
    // if (departure.value === arrival.value || arrival.value === departure.value) {
    //   errorModal.value.openModal('Không thể chọn nơi đi và nơi đến giống nhau!');
    //   hasError.value = true;
    //   return;
    // }
    if (!departure.value || !arrival.value || !startDate.value) {
      console.error("Thiếu thông tin để tìm kiếm");
      return;
    }

    // // Gọi API tìm chuyến bay
    // const response = await axios.get('/flights/search-flight', {
    //   params: {
    //     departure: departure.value,
    //     arrival: arrival.value,
    //     date: startDate.value
    //   }
    // });

    const matchedDeparture =  departure.value ;
    const matchedArrival = arrival.value;

    const routeDisplay = `${matchedDeparture} → ${matchedArrival}`;


    // Gọi API tìm chuyến bay
    const response = await axios.get('/flights/search-flight', {
      params: {
        departure: departure.value,
        arrival: arrival.value,
        date: startDate.value,
        page: currentPage.value - 1,
        size: pageSize,
      }
    });

    const responseFlights = response.data.data?.content || [];
    flights.value = responseFlights.map(flight => ({
      ...flight,
      routeDisplay
    }));

    console.log(responseFlights);
    const searchParams = {departure: departure.value, arrival: arrival.value, routeDisplay};
    console.log(searchParams);
    localStorage.setItem('searchParams', JSON.stringify(searchParams));
    updateStartDateInURL();

  } catch (error) {
    console.error('Lỗi khi gọi API:', error);
  }
};
const fetchAirports = async () => {
  try {
    const response = await axios.get('/airport-info/list');
    if (response.data && response.data.data) {
      locations.value = response.data.data;
      locations.value = response.data.data.map(item => item.city);
      console.log("abc", response.data.data);
    }
  } catch (error) {
    console.error('Lỗi khi gọi API lấy sân bay:', error);
  }
};
const updateStartDateInURL = () => {
  router.push({
    path: '/search-flight',
    query: {
      departure: departure.value,
      arrival: arrival.value,
      startDate: startDate.value,
    }
  });
};


onMounted(() => {
  if (departure.value && arrival.value && startDate.value) {
    searchFlight();
  }
  fetchAirports();

});


function formatTime(dateTime) {
  return new Date(dateTime).toLocaleString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}
function formatCurrency(value) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
}
const bookFlight = (flight) => {
  router.push({name: 'flight-details', params: {id: flight.id}});
};

</script>

<style scoped>
.container {
  margin-top: 20px;
}

.form-wrap {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.primary-btn {
  margin-top: 20px;
}

.flight-item {
  background-color: #f9f9f9;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.flight-item h4 {
  margin-bottom: 10px;
}

.flight-item p {
  margin: 5px 0;
}

.airline-logo {
  width: 50px;
  height: auto;
  margin-right: 10px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.pagination button {
  padding: 5px 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>

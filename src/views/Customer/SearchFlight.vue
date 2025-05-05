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

  <section class="about-info-area section-gap">
    <div class="container">
      <div class="row">
        <!-- Form tìm kiếm chuyến bay bên trái -->
        <div class="col-lg-4">
          <form class="form-wrap" @submit.prevent="searchFlight">
            <select class="form-control" v-model="departure" @blur="updatePlaceholder" @focus="clearPlaceholder">
              <option value="" disabled selected>Nơi đi</option>
              <option v-for="location in locations" :key="location.code" :value="location.code">
                {{ location.name }}
              </option>
            </select>

            <select class="form-control" v-model="arrival" @blur="updatePlaceholder" @focus="clearPlaceholder">
              <option value="" disabled selected>Nơi đến</option>
              <option v-for="location in locations" :key="location.code" :value="location.code">
                {{ location.name }}
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

const route = useRoute(); // Để lấy các query params từ URL
const router = useRouter(); // Để lấy các query params từ URL

// Các tham số cần thiết cho việc tìm kiếm
const departure = ref(route.query.departure || ''); // Lấy giá trị từ query param hoặc mặc định rỗng
const arrival = ref(route.query.arrival || '');
const startDate = ref(route.query.startDate || '');

const flights = ref([]);
const locations = ref([
  { name: "Hà Nội", code: "HAN" },
  { name: "TP.HCM", code: "SGN" },
  { name: "Đà Nẵng", code: "DAD" },
  { name: "Nha Trang", code: "CXR" },
  { name: "Phú Quốc", code: "PQC" },
  { name: "Hải Phòng", code: "HPH" },
  { name: "Quy Nhơn", code: "UIH" },
  { name: "Cần Thơ", code: "VCA" },
  { name: "Vinh", code: "VII" },
  { name: "Thanh Hóa", code: "THD" },
]);

// Hàm gọi API để tìm chuyến bay
const searchFlight = async () => {
  console.log("Tìm kiếm chuyến bay...");
  try {
    if (!departure.value || !arrival.value || !startDate.value) {
      console.error("Thiếu thông tin để tìm kiếm");
      return;
    }

    // Gọi API tìm chuyến bay
    const response = await axios.get('/flights/search-flight', {
      params: {
        departure: departure.value,
        arrival: arrival.value,
        date: startDate.value
      }
    });

    flights.value = response.data.data || [];
  } catch (error) {
    console.error('Lỗi khi gọi API:', error);
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
// Theo dõi sự thay đổi của ngày khởi hành
watch(startDate, () => {
  updateStartDateInURL(); // Cập nhật URL khi ngày khởi hành thay đổi
});

// Gọi API chỉ lần đầu khi trang load
onMounted(() => {
  if (departure.value && arrival.value && startDate.value) {
  searchFlight();
}

});


// Định dạng thời gian cho chuyến bay
const formatTime = (datetime) => {
  return new Date(datetime).toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

const flightsPerPage = 5;
const currentPage = ref(1);

const paginatedFlights = computed(() => {
  const start = (currentPage.value - 1) * flightsPerPage;
  const end = start + flightsPerPage;
  return flights.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(flights.value.length / flightsPerPage);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const bookFlight = (flight) => {
  router.push({ name: 'flight-details', params: { id: flight.id } });
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

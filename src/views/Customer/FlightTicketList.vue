<template>
  <section class="flight-history container">
    <h1>📜 Danh sách vé đã đặt</h1>

    <div
      v-for="(ticket, index) in tickets"
      :key="index"
      class="ticket-card"
    >
      <div class="ticket-header">
        <div>
          🧾 Mã đặt: <strong>{{ ticket.idBooking }}</strong><br />
          🕓 Thời gian đặt: {{ ticket.bookingTime || 'Không rõ' }}
        </div>
        <button @click="toggleDetails(index)">
          {{ ticket.showDetails ? 'Ẩn chi tiết' : 'Hiện chi tiết' }}
        </button>
      </div>

      <div v-if="ticket.showDetails" class="ticket-details">
        <p><strong>Số hiệu chuyến bay:</strong> {{ ticket.idBooking }}</p>
        <p><strong>Số ghế:</strong> {{ ticket.seatNumbers.join(', ') }}</p>
        <p><strong>Hành khách:</strong></p>
        <ul>
          <li v-for="(name, idx) in ticket.passengerNames" :key="idx">
            {{ name }}
          </li>
        </ul>
        <p><strong>Ngày bay:</strong> {{ ticket.flightDate }}</p>
        <p><strong>Giờ bay:</strong> {{ ticket.arrivalTime }}</p>
        <p><strong>Sân bay đi:</strong> {{ ticket.departureAirport }}</p>
        <p><strong>Sân bay đến:</strong> {{ ticket.arrivalAirport }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from 'vue';
import { jwtDecode } from 'jwt-decode';
import api from '../../services/api';

export default {
  setup() {
    const tickets = ref([]);

    const groupTicketsByBookingId = (rawTickets) => {
      const grouped = {};

      rawTickets.forEach(ticket => {
        const {
          idBooking, seatNumber, passengerName,
          flightDate, arrivalTime,
          departureAirport, arrivalAirport,
          bookingTime // ← thêm nếu có
        } = ticket;

        if (!grouped[idBooking]) {
          grouped[idBooking] = {
            idBooking,
            seatNumbers: [seatNumber],
            passengerNames: [passengerName],
            flightDate,
            arrivalTime,
            departureAirport,
            arrivalAirport,
            bookingTime: bookingTime || null,
            showDetails: false
          };
        } else {
          grouped[idBooking].seatNumbers.push(seatNumber);
          grouped[idBooking].passengerNames.push(passengerName);
        }
      });

      return Object.values(grouped);
    };

    const toggleDetails = (index) => {
      tickets.value[index].showDetails = !tickets.value[index].showDetails;
    };

    onMounted(async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Bạn chưa đăng nhập!');
        window.location.href = '/login';
        return;
      }

      const decoded = jwtDecode(token);
      const email = decoded.sub;

      try {
        const response = await api.get('/customer/booking/list-ticket-booking', {
          params: { email }
        });

        if (response.data.code !== '200') {
          alert('Không có vé nào được đặt!');
          return;
        }

        const grouped = groupTicketsByBookingId(response.data.data || []);
        tickets.value = grouped;
      } catch (err) {
        console.error("Lỗi axios:", err);
        alert('Không thể lấy dữ liệu vé');
      }
    });

    return {
      tickets,
      toggleDetails
    };
  }
};
</script>



<style scoped>
.container {
  max-width: 800px;
  margin: auto;
  padding: 1rem;
}

.ticket-card {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: #f9f9f9;
}

.ticket-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ticket-details {
  margin-top: 1rem;
  padding-left: 1rem;
  border-left: 3px solid #007BFF;
}

button {
  padding: 6px 12px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>


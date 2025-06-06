<template>
  <section class="about-banner relative">
    <div class="overlay overlay-bg"></div>
    <div class="container">
      <div class="row d-flex align-items-center justify-content-center">
        <div class="about-content col-lg-12">
          <h1 class="text-white">Lịch sử đặt vé</h1>
          <p class="text-white link-nav">
            <a href="/">Trang chủ</a>
            <span class="lnr lnr-arrow-right"></span>
            <a href="/flight-ticket-list">Lịch sử đặt vé</a>
          </p>
        </div>
      </div>
    </div>
  </section>
  <section class="flight-history container">
    <h1>📜 Danh sách vé đã đặt</h1>

    <!-- Nếu không có vé -->
    <p v-if="tickets.length === 0">Bạn chưa đặt vé nào, vui lòng đặt vé.</p>

    <!-- Nếu có vé -->
    <div v-for="(ticket, index) in tickets" :key="index" class="ticket-card">
      <div class="ticket-header">
        <div>
          🧾 Mã đặt: <strong>{{ ticket.transactionId }}</strong><br />
          🕓 Thời gian đặt: {{ ticket.createAt || 'Không rõ' }}
        </div>
        <button @click="toggleDetails(index)">
          {{ ticket.showDetails ? 'Ẩn chi tiết' : 'Hiện chi tiết' }}
        </button>
      </div>

      <div v-if="ticket.showDetails" class="ticket-details">
        <div class="detail-row">
          <span class="label">📌 Mã đặt chỗ:</span>
          <span class="value">{{ ticket.idBooking }}</span>
        </div>

        <div class="detail-row">
          <span class="label">💺 Số ghế:</span>
          <span class="value">{{ ticket.seatNumbers.join(', ') }}</span>
        </div>

        <div class="detail-row">
          <span class="label">👤 Hành khách:</span>
          <span class="value">
            <ul class="passenger-list">
              <li v-for="(name, idx) in ticket.passengerNames" :key="idx">
                {{ name }}
              </li>
            </ul>
          </span>
        </div>

        <div class="detail-row">
          <span class="label">🗓️ Ngày bay:</span>
          <span class="value">{{ ticket.flightDate }}</span>
        </div>

        <div class="detail-row">
          <span class="label">⏰ Giờ bay:</span>
          <span class="value">{{ ticket.arrivalTime }}</span>
        </div>

        <div class="detail-row">
          <span class="label">🛫 Sân bay đi:</span>
          <span class="value">{{ ticket.departureAirport }}</span>
        </div>

        <div class="detail-row">
          <span class="label">🛬 Sân bay đến:</span>
          <span class="value">{{ ticket.arrivalAirport }}</span>
        </div>
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
        const transactionId = ticket.transactionNo || 'Không rõ';
        const idBooking = ticket.id;

        if (!grouped[transactionId]) {
          grouped[transactionId] = {
            idBooking: `${idBooking}`,
            seatNumbers: [ticket.seatNumber],
            passengerNames: [ticket.passengerFullName],
            flightDate: ticket.createdAt ? ticket.createdAt.split('T')[0] : 'Không rõ',
            arrivalTime: ticket.checkinDate ? ticket.checkinDate.split('T')[1] : 'Chưa checkin',
            departureAirport: ticket.flightCode,
            arrivalAirport: ticket.flightCode,
            bookingTime: ticket.createdAt || 'Không rõ',
            showDetails: false,
            transactionId: transactionId,
            createAt: ticket.createdAt || 'Không rõ'
          };
        } else {
          grouped[transactionId].seatNumbers.push(ticket.seatNumber);
          grouped[transactionId].passengerNames.push(ticket.passengerFullName);
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

      try {
        const response = await api.get('/passengers/ticket', {
          params: {
            page: 0,
            size: 10
          }
        });

        if (response.data.code !== '200') {
          alert('Không có vé nào được đặt!');
          return;
        }

        const ticketData = response.data.data;

        const grouped = groupTicketsByBookingId(ticketData);
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
.ticket-details {
  margin-top: 1rem;
  padding: 1rem;
  border-left: 4px solid #007BFF;
  background-color: #f0f8ff;
  border-radius: 8px;
}

.detail-row {
  display: flex;
  margin-bottom: 0.5rem;
}

.label {
  width: 150px;
  font-weight: 600;
  color: #333;
}

.value {
  flex: 1;
  color: #444;
}

.passenger-list {
  margin: 0;
  padding-left: 1.2rem;
  list-style-type: disc;
}

</style>

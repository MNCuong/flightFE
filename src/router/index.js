import { createRouter, createWebHistory } from 'vue-router';
import { jwtDecode } from 'jwt-decode';

// Import Layouts

import App from '@/views/App.vue';
import AppLayout from '@/layouts/AppLayout.vue';
// Import Customer Views
import Home from '@/views/Customer/Home.vue';
import About from '@/views/Customer/About.vue';
import Contact from '@/views/Customer/Contact.vue';
import BlogHome from '@/views/Customer/BlogHome.vue';
import BlogSingle from '@/views/Customer/BlogSingle.vue';
import Hotels from '@/views/Customer/Hotels.vue';
import Packages from '@/views/Customer/Packages.vue';
import Insurance from '@/views/Customer/Insurance.vue';
import Elements from '@/views/Customer/Elements.vue';
import FlightTicketList from '@/views/Customer/FlightTicketList.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import SearchFlight from '@/views/Customer/SearchFlight.vue';
import FlightDetails from '@/views/Customer/FlightDetails.vue';
import BookingConfirm from '@/views/Customer/BookingConfirm.vue';
import ThankYou from '@/views/Customer/ThankYouPage.vue'
import UserInfo from '@/views/Customer/UserInfo.vue'
import Verify from '@/views/Verify.vue'
import CustomerSupportChat from "@/views/Customer/CustomerSupportChat.vue";
import RoundTripBooking from "@/views/Customer/RoundTripBooking.vue";
import PassengerInfo from "@/views/Customer/PassengerInfo.vue";
import Test from "@/views/test.vue"
import nhap from "@/views/Customer/nhap.vue"

// import FlightTicketDetails from '@/views/Customer/FlightTicketDetails.vue';
import path from 'path';
import AuthLayout from '@/layouts/AuthLayout.vue';

const routes = [
  // Layout chính cho người dùng
  {
    path: '/',
    component: AppLayout,
    children: [
      { path: '', component: Home },
      { path: 'about', component: About },
      { path: 'contact', component: Contact },
      { path: 'blog-home', component: BlogHome },
      { path: 'blog-single', component: BlogSingle },
      { path: 'hotels', component: Hotels },
      { path: 'packages', component: Packages },
      { path: 'insurance', component: Insurance },
      { path: 'elements', component: Elements },
      { path: 'flight-ticket-list', component: FlightTicketList },
      { path: 'search-flight', component: SearchFlight, name: 'search-flight' },
      { path: 'flight-details/:id', component: FlightDetails, name: 'flight-details' },
      { path: 'booking-confirm/:id', component: BookingConfirm, name: 'booking-confirm' },
      { path: 'thank-you', component: ThankYou, name: 'thank-you' },
      { path: 'user-info', component: UserInfo, name: 'user-info' },
      { path: 'verify', component: Verify, name: 'verify' },
      { path: 'customer-support-chat', component: CustomerSupportChat, name: 'customer-support-chat' },
      { path: 'round-trip-booking', component: RoundTripBooking, name: 'round-trip-booking' },
      { path: 'passenger-info', component: PassengerInfo, name: 'passenger-info' },
      { path: 'test', component: Test, name: 'test' },
      { path: 'show-info', component: nhap, name: 'nhap' },
    ]
  },

  // Layout riêng cho Login/Register
  {
    path: '/',
    component: AuthLayout,
    children: [
      { path: 'login', component: Login },
      { path: 'register', component: Register },
    ]
  }
];


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

// Set title & Auth Guard
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Flights App';

  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refresh_token');
    if (!token || !refreshToken) {
      return next({ path: '/login' });
    }

    try {
      const decoded = jwtDecode(token);
      const roles = decoded.roles || [];
      if (!to.meta.roles || to.meta.roles.some(role => roles.includes(role))) {
        return next();
      } else {
        return next({ path: '/' });
      }
    } catch (error) {
      console.error('Lỗi giải mã token:', error);
      return next({ path: '/' });
    }
  } else {
    next();
  }
});

export default router;

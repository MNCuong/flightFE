import { createRouter, createWebHistory } from 'vue-router';
import { jwtDecode } from 'jwt-decode';

// Import Layouts

import AppLayout from '@/views/App.vue';
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

// import FlightTicketDetails from '@/views/Customer/FlightTicketDetails.vue';
import path from 'path';
const routes = [
  // Customer routes
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
      { path: 'login', component: Login },
      { path: 'register', component: Register },
      { path: 'flight-details/:id', component: FlightDetails, name: 'flight-details' },
      { path: 'booking-confirm/:id', component: BookingConfirm, name: 'booking-confirm' },
      { path: 'thank-you', component: ThankYou, name: 'thank-you' },

    ]


  },

  // Login (outside admin)


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

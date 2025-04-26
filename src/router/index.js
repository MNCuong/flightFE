import { createRouter, createWebHistory } from 'vue-router';
import { jwtDecode } from 'jwt-decode';

// Import Layouts
import FullLayout from '@/layouts/full/FullLayout.vue';
import BlankLayout from '@/layouts/blank/BlankLayout.vue';
import AppLayout from '@/views/App.vue';

// Import Admin Views
import Dashboard from '@/views/Admin/dashboard/index.vue';
import Alerts from '@/views/Admin/ui-components/Alerts.vue';
import Buttons from '@/views/Admin/ui-components/Buttons.vue';
import Cards from '@/views/Admin/ui-components/Cards.vue';
import Tables from '@/views/Admin/ui-components/Tables.vue';
import Icons from '@/views/Admin/pages/Icons.vue';
import SamplePage from '@/views/Admin/pages/SamplePage.vue';

// Import Auth Views
import Login from '@/views/Admin/authentication/BoxedLogin.vue';
import Register from '@/views/Admin/authentication/BoxedRegister.vue';
import ErrorPage from '@/views/Admin/authentication/Error.vue';

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
      { path: 'elements', component: Elements }
    ]
  },

  // Login (outside admin)
  {
    path: '/login',
    component: Login
  },

  // Admin routes
  {
    path: '/main',
    meta: { requiresAuth: true },
    redirect: '/main/',
    component: FullLayout,
    children: [
      { path: '', name: 'Dashboard', component: Dashboard },
      { path: 'ui/alerts', name: 'Alert', component: Alerts },
      { path: 'ui/buttons', name: 'Buttons', component: Buttons },
      { path: 'ui/cards', name: 'Cards', component: Cards },
      { path: 'ui/tables', name: 'Tables', component: Tables },
      { path: 'icons', name: 'Icons', component: Icons },
      { path: 'sample-page', name: 'Starter', component: SamplePage }
    ]
  },

  // Auth routes (register)
  {
    path: '/auth',
    component: BlankLayout,
    meta: { requiresAuth: false },
    children: [
      { path: 'login', name: 'AuthLogin', component: Login },
      { path: 'register', name: 'Register', component: Register }
    ]
  },

  // 404 Error route
  {
    path: '/:pathMatch(.*)*',
    component: ErrorPage
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

import { createApp } from 'vue'
import App from './views/App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/assets/css/main.css'
//
import '@/assets/css/bootstrap/bootstrap.css'
import '@/assets/css/bootstrap/bootstrap-grid.css'
import '@/assets/css/bootstrap/bootstrap-reboot.css'
//
import '@/assets/css/animate.min.css'
import '@/assets/css/font-awesome.min.css'
import '@/assets/css/jquery-ui.css'
import '@/assets/css/linearicons.css'
import '@/assets/css/magnific-popup.css'
import '@/assets/css/nice-select.css'
import '@/assets/css/owl.carousel.css'
// import '@/assets/scss/bootstrap.scss'
// import '@/assets/scss/main.scss'

import 'jquery'
import 'popper.js'
import 'bootstrap'
import '@assets/js/main.js'

import '@assets/js/hoverIntent.js'
import '@assets/js/jquery-ui.js'
import '@assets/js/mail-script.js'


const app = createApp(App)
app.use(router)
app.mount('#app')

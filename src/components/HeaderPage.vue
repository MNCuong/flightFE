<template>
  <header id="header">
    <div class="header-top">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 col-sm-6 col-6 header-top-left">
            <ul>
              <li><a href="#">Ghé Thăm</a></li>
              <li><a href="#">Mua Vé</a></li>
            </ul>
          </div>
          <div class="col-lg-6 col-sm-6 col-6 header-top-right">
            <div class="header-social">
              <a href="#"><i class="fa fa-facebook"></i></a>
              <a href="#"><i class="fa fa-twitter"></i></a>
              <a href="#"><i class="fa fa-dribbble"></i></a>
              <a href="#"><i class="fa fa-behance"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container main-menu">
      <div class="row align-items-center justify-content-between d-flex">
        <div id="logo">
          <router-link to="/">
            <img :src="logoUrl" alt="logo"/>
          </router-link>
        </div>
        <nav id="nav-menu-container">
          <ul class="nav-menu">
            <li><router-link to="/">Trang Chủ</router-link></li>
            <li><router-link to="/about">Giới Thiệu</router-link></li>
            <li><router-link to="/packages">Gói Dịch Vụ</router-link></li>
            <li><router-link to="/hotels">Khách Sạn</router-link></li>
            <li><router-link to="/insurance">Bảo Hiểm</router-link></li>
            <li><router-link to="/contact">Liên Hệ</router-link></li>

            <template v-if="!isLoggedIn">
              <li><router-link to="/login">Đăng nhập</router-link></li>
              <li><router-link to="/register">Đăng ký</router-link></li>
            </template>

            <template v-else>
              <li class="menu-has-children">
                <a href="#">
                  <i class="fa fa-user"></i> <span style="margin-left: 5px;">Tài khoản</span>
                </a>
                <ul class="dropdown-menu dropdown-menu-left
                 custom-dropdown" aria-labelledby="userDropdown">
                  <li>
                    <router-link to="/flight-ticket-list">Lịch sử đặt vé</router-link>
                  </li>
                  <li>
                    <a href="#" @click.prevent="logout">Đăng xuất</a>
                  </li>
                </ul>
              </li>
            </template>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
  data() {
    return {
      logoUrl: new URL("@/assets/img/logo.png", import.meta.url).href,
      isLoggedIn: false,
    };
  },
  mounted() {
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      const token = localStorage.getItem('token');
      this.isLoggedIn = !!token;
    },
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      alert('Đăng xuất thành công!');
      this.isLoggedIn = false;
      this.$router.push('/');
    }
  }
};

</script>


<style scoped>
/* Add your scoped styles if needed */
</style>

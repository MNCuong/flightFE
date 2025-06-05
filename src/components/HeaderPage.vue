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
            <li>
              <router-link to="/">Trang Chủ</router-link>
            </li>
            <li>
              <router-link to="/search-flight">Tìm kiếm chuyến bay</router-link>
            </li>
            <li>
              <router-link to="/about">Giới Thiệu</router-link>
            </li>
            <li>
              <router-link to="/packages">Gói Dịch Vụ</router-link>
            </li>
<!--            <li>-->
<!--              <router-link to="/insurance">Bảo Hiểm</router-link>-->
<!--            </li>-->
            <li>
              <router-link to="/contact">Liên Hệ</router-link>
            </li>
<!--            <li>-->
<!--              <router-link to="/customer-support-chat">Hỗ trợ</router-link>-->
<!--            </li>-->
<!--            <li>-->
<!--              <router-link to="/test">test</router-link>-->
<!--            </li>-->

            <template v-if="!isLoggedIn">
              <li>
                <router-link to="/login">Đăng nhập</router-link>
              </li>
              <li>
                <router-link to="/register">Đăng ký</router-link>
              </li>
            </template>

            <template v-else>

              <li class="menu-has-children notification-wrapper">
                <a href="#">
                  <i class="fa fa-bell"></i>
                  <span v-if="unreadCount > 0" class="badge">{{ unreadCount }}</span>
                </a>
                <ul v-if="showNotifications" class="dropdown-menu custom-dropdown" style="display: block;">
                  <li v-if="notifications.length === 0">
                    <span>Không có thông báo</span>
                  </li>
                  <li v-for="(notif, index) in notifications" :key="index" :class="{ unread: !notif.read }">
                    <a href="#" @click.prevent="markAsRead(index)">
                      {{ notif.message }}
                      <small v-if="!notif.read" style="color: blue; margin-left: 5px;">(Đánh dấu đã đọc)</small>
                    </a>
                  </li>
                </ul>
              </li>
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
                    <router-link to="/user-info">Thông tin cá nhân</router-link>
                  </li>
                  <li><a href="#" @click.prevent="toggleChangePassword">Đổi mật khẩu</a>
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
    <ChangePassword :showModal="showChangePassword" @close="toggleChangePassword"/>
  </header>
</template>

<script>
import ChangePassword from '@/components/ChangePassword.vue'

export default {
  name: "HeaderComponent",
  data() {
    return {
      logoUrl: new URL("@/assets/img/logo.png", import.meta.url).href,
      isLoggedIn: false, showChangePassword: false,
      showNotifications: false,
      notifications: [],
      unreadCount: 0

    };
  },
  components: {
    ChangePassword,

  },
  mounted() {
    this.checkLogin();
    window.addEventListener("storage", this.onStorageChange);
  },

  beforeUnmount() {
    window.removeEventListener("storage", this.onStorageChange);
  },
  methods: {
    checkLogin() {
      const token = localStorage.getItem('token');
      this.isLoggedIn = !!token;
      if (this.isLoggedIn) {
        this.fetchNotifications();
      }
    },
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      alert('Đăng xuất thành công!');
      this.isLoggedIn = false;
      this.$router.push('/');
    },
    toggleChangePassword() {
      this.showChangePassword = !this.showChangePassword;
    },

    fetchNotifications() {
      // Giả lập lấy từ server
      const saved = JSON.parse(localStorage.getItem("notifications")) || [];

      this.notifications = saved.length
          ? saved
          : [
            {message: "Chào mừng bạn đến với hệ thống!", read: false},
            {message: "Vé của bạn đã được xác nhận!", read: false},
          ];

      this.unreadCount = this.notifications.filter(n => !n.read).length;
    },
    toggleNotification() {
      this.showNotifications = !this.showNotifications;
    },
    markAsRead(index) {
      this.notifications[index].read = true;
      this.unreadCount = this.notifications.filter(n => !n.read).length;

      // Lưu lại trạng thái
      localStorage.setItem("notifications", JSON.stringify(this.notifications));
    }
  }

};

</script>


<style scoped>
.notification-wrapper {
  position: relative;
}

.badge {
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
  position: absolute;
  top: 0;
  right: 0;
}

.unread {
  font-weight: bold;
}.notification-wrapper {
   position: relative;
 }

.custom-dropdown {
  position: absolute;
  right: 0;
  top: 30px;
  background: white;
  padding: 10px;
  border: 1px solid #ccc;
  z-index: 10;
  width: 250px;
}


</style>

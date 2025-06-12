<template>
  <section class="about-banner position-relative bg-primary py-5 mb-5">
    <div class="overlay position-absolute top-0 start-0 w-100 h-100" style="background: rgba(0,0,0,0.45);"></div>
    <div class="container position-relative text-center text-white">
      <h1 class="fw-bold display-5">Thông tin cá nhân</h1>
      <p class="link-nav fs-6 mt-3">
        <a href="index.html" class="text-white text-decoration-none">Home</a>
        <span class="mx-2">›</span>
        <a href="/user-info" class="text-white text-decoration-none">Thông tin cá nhân</a>
      </p>
    </div>
  </section>

  <div class="container profile-container mb-5">
    <div v-if="loading" class="text-center fs-5 text-secondary py-5">Đang tải...</div>
    <div v-if="error" class="alert alert-danger shadow-sm rounded-3">{{ error }}</div>

    <div v-if="user" class="card shadow-lg rounded-4 p-5 mx-auto" style="max-width: 720px; background: #f9faff;">
      <div class="profile-header mb-4 border-bottom border-2 pb-3">
        <h3 class="fw-semibold text-primary">👤 Thông tin cơ bản</h3>
      </div>

      <div class="row mb-4 align-items-center">
        <label class="col-md-4 fw-semibold fs-6 text-secondary">Họ và tên:</label>
        <div class="col-md-8">
          <input v-model="user.fullName" type="text" class="form-control form-control-lg shadow-sm" />
        </div>
      </div>

      <div class="row mb-4 align-items-center">
        <label class="col-md-4 fw-semibold fs-6 text-secondary">Email:</label>
        <div class="col-md-8">
          <input v-model="user.email" type="email" class="form-control form-control-lg shadow-sm" disabled />
        </div>
      </div>

      <div class="row mb-4 align-items-center">
        <label class="col-md-4 fw-semibold fs-6 text-secondary">Số điện thoại:</label>
        <div class="col-md-8">
          <input v-model="user.phone" type="text" class="form-control form-control-lg shadow-sm" />
        </div>
      </div>

      <div class="row mb-4 align-items-center">
        <label class="col-md-4 fw-semibold fs-6 text-secondary">Vai trò:</label>
        <div class="col-md-8">
          <span class="badge bg-primary fs-6 py-2 px-3 shadow-sm">{{ user.roles }}</span>
        </div>
      </div>

      <div class="row mb-4 align-items-center">
        <label class="col-md-4 fw-semibold fs-6 text-secondary">Trạng thái xác minh:</label>
        <div class="col-md-8">
          <span
              :class="user.verified
              ? 'badge bg-success fs-6 py-2 px-3 shadow-sm'
              : 'badge bg-warning text-dark fs-6 py-2 px-3 shadow-sm'">
            {{ user.verified ? 'Đã xác minh' : 'Chưa xác minh' }}
          </span>
        </div>
      </div>

      <div class="row mb-5 align-items-center">
        <label class="col-md-4 fw-semibold fs-6 text-secondary">Ngày tạo tài khoản:</label>
        <div class="col-md-8">
          <span class="fs-6 text-muted">{{ formatDate(user.createdAt) }}</span>
        </div>
      </div>

      <div v-if="user.userProfile" class="mt-5">
        <div class="profile-header mb-4 border-bottom border-2 pb-3">
          <h3 class="fw-semibold text-primary">📜 Thông tin hồ sơ</h3>
        </div>

        <div class="row mb-4 align-items-center">
          <label class="col-md-4 fw-semibold fs-6 text-secondary">Địa chỉ:</label>
          <div class="col-md-8">
            <input v-model="user.userProfile.address" type="text" class="form-control form-control-lg shadow-sm" />
          </div>
        </div>

        <div class="row mb-4 align-items-center">
          <label class="col-md-4 fw-semibold fs-6 text-secondary">Ngày sinh:</label>
          <div class="col-md-8">
            <input v-model="user.userProfile.birthDate" type="date" class="form-control form-control-lg shadow-sm" />
          </div>
        </div>

        <div class="row mb-4 align-items-center">
          <label class="col-md-4 fw-semibold fs-6 text-secondary">Giới tính:</label>
          <div class="col-md-8">
            <select v-model="user.userProfile.gender" class="form-select form-select-lg shadow-sm">
              <option value="Male">Nam</option>
              <option value="Female">Nữ</option>
              <option value="Other">Khác</option>
            </select>
          </div>
        </div>
      </div>

      <div class="text-center mt-5">
        <button class="btn btn-primary btn-lg px-5 shadow-sm" @click="saveProfile">
          Lưu thay đổi
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/services/api.js';

export default {
  data() {
    return {
      user: null,
      loading: true,
      error: null,
    };
  },
  created() {
    this.fetchUserData();
  },
  methods: {
    async fetchUserData() {
      try {
        const response = await axios.get('/user/user-profile');
        this.user = response.data.data;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.error = error.response?.data?.message || 'Đã xảy ra lỗi khi tải thông tin người dùng.';
      }
    },
    formatDate(date) {
      if (!date) return '';
      const options = {year: 'numeric', month: 'long', day: 'numeric'};
      return new Date(date).toLocaleDateString('vi-VN', options);
    },

    async saveProfile() {
      try {
        this.loading = true;

        const response = await axios.put('/user/user-profile', this.user);

        this.user = response.data.data;

        this.loading = false;
        alert('Lưu thông tin thành công!');
      } catch (error) {
        this.loading = false;
        console.error('Lỗi khi lưu thông tin:', error);
        alert(error.response?.data?.message || 'Đã xảy ra lỗi khi lưu thông tin!');
      }
    },

  },
};
</script>

<style scoped>
.about-banner {
  min-height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.link-nav a:hover {
  text-decoration: underline;
  color: #dbe9ff !important;
}

.profile-container {
  min-height: 450px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.profile-header h3 {
  font-weight: 700;
  color: #0d6efd;
  letter-spacing: 0.05em;
}

input.form-control-lg,
select.form-select-lg {
  border-radius: 0.5rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

input.form-control-lg:focus,
select.form-select-lg:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 8px rgba(13, 110, 253, 0.3);
}

button.btn-primary {
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}

button.btn-primary:hover {
  background-color: #084298;
  border-color: #06357a;
  box-shadow: 0 0 12px rgba(8, 66, 152, 0.7);
}
</style>

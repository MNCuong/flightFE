<template>
  <section class="about-banner position-relative bg-primary py-5 mb-5">
    <div class="overlay position-absolute top-0 start-0 w-100 h-100" style="background: rgba(0,0,0,0.4);"></div>
    <div class="container position-relative text-center text-white">
      <h1 class="fw-bold">Thông tin cá nhân</h1>
      <p class="link-nav fs-6 mt-2">
        <a href="index.html" class="text-white text-decoration-none">Home</a>
        <span class="mx-2">›</span>
        <a href="/user-info" class="text-white text-decoration-none">Thông tin cá nhân</a>
      </p>
    </div>
  </section>

  <div class="container profile-container mb-5">
    <div v-if="loading" class="text-center fs-5 text-secondary">Đang tải...</div>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <div v-if="user" class="card shadow-sm rounded-4 p-4 mx-auto" style="max-width: 720px;">
      <div class="profile-header mb-4 border-bottom pb-2">
        <h3 class="fw-semibold">👤 Thông tin cơ bản</h3>
      </div>

      <div class="row mb-3 align-items-center">
        <label class="col-md-4 fw-semibold">Họ và tên:</label>
        <div class="col-md-8">
          <input v-model="user.fullName" type="text" class="form-control form-control-lg" />
        </div>
      </div>

      <div class="row mb-3 align-items-center">
        <label class="col-md-4 fw-semibold">Email:</label>
        <div class="col-md-8">
          <input v-model="user.email" type="email" class="form-control form-control-lg" disabled />
        </div>
      </div>

      <div class="row mb-3 align-items-center">
        <label class="col-md-4 fw-semibold">Số điện thoại:</label>
        <div class="col-md-8">
          <input v-model="user.phone" type="text" class="form-control form-control-lg" />
        </div>
      </div>

      <div class="row mb-3 align-items-center">
        <label class="col-md-4 fw-semibold">Vai trò:</label>
        <div class="col-md-8">
          <span class="badge bg-primary fs-6 py-2 px-3">{{ user.roles }}</span>
        </div>
      </div>

      <div class="row mb-3 align-items-center">
        <label class="col-md-4 fw-semibold">Trạng thái xác minh:</label>
        <div class="col-md-8">
          <span :class="user.verified ? 'badge bg-success fs-6 py-2 px-3' : 'badge bg-warning text-dark fs-6 py-2 px-3'">
            {{ user.verified ? 'Đã xác minh' : 'Chưa xác minh' }}
          </span>
        </div>
      </div>

      <div class="row mb-4 align-items-center">
        <label class="col-md-4 fw-semibold">Ngày tạo tài khoản:</label>
        <div class="col-md-8">
          <span class="fs-6 text-muted">{{ formatDate(user.createdAt) }}</span>
        </div>
      </div>

      <div v-if="user.userProfile" class="mt-4">
        <div class="profile-header mb-3 border-bottom pb-2">
          <h3 class="fw-semibold">📜 Thông tin hồ sơ</h3>
        </div>

        <div class="row mb-3 align-items-center">
          <label class="col-md-4 fw-semibold">Địa chỉ:</label>
          <div class="col-md-8">
            <input v-model="user.userProfile.address" type="text" class="form-control form-control-lg" />
          </div>
        </div>

        <div class="row mb-3 align-items-center">
          <label class="col-md-4 fw-semibold">Ngày sinh:</label>
          <div class="col-md-8">
            <input v-model="user.userProfile.birthDate" type="date" class="form-control form-control-lg" />
          </div>
        </div>

        <div class="row mb-3 align-items-center">
          <label class="col-md-4 fw-semibold">Giới tính:</label>
          <div class="col-md-8">
            <select v-model="user.userProfile.gender" class="form-select form-select-lg">
              <option value="Male">Nam</option>
              <option value="Female">Nữ</option>
              <option value="Other">Khác</option>
            </select>
          </div>
        </div>
      </div>

      <div class="text-center mt-4">
        <button class="btn btn-primary btn-lg px-5" @click="saveProfile">
          Lưu thay đổi
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/services/api.js';
import {jwtDecode} from 'jwt-decode';

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
        console.log('Response:', response.data);

        this.user = response.data.data;
        console.log('Thông tin người dùng:', this.user);
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

    // Điều hướng tới trang chỉnh sửa thông tin
    editProfile() {
      this.$router.push('/edit-profile');
    },
  },
};
</script>

<style scoped>
.about-banner {
  min-height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.link-nav a:hover {
  text-decoration: underline;
}

.profile-container {
  min-height: 400px;
}

.profile-header h3 {
  font-weight: 600;
  color: #333;
}

input.form-control-lg,
select.form-select-lg {
  border-radius: 0.375rem;
  transition: border-color 0.3s ease;
}

input.form-control-lg:focus,
select.form-select-lg:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

button.btn-primary:hover {
  background-color: #0b5ed7;
  border-color: #0a58ca;
  box-shadow: 0 0 8px rgba(11, 94, 215, 0.6);
}

</style>
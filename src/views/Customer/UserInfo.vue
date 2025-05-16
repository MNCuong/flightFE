<template>
    <div class="container mt-5">
        <h1 class="text-center">Thông tin cá nhân</h1>
        <div v-if="loading" class="text-center">Đang tải...</div>
        <div v-if="error" class="alert alert-danger">{{ error }}</div>

        <div v-if="user" class="card shadow-sm p-4 mt-4">
            <div class="row mb-3">
                <div class="col-md-4">
                    <strong>Họ và tên:</strong>
                </div>
                <div class="col-md-8">
                    <input v-model="user.fullName" type="text" class="form-control" />
                </div>
            </div>

            <div class="row mb-3">
                <div class="col-md-4">
                    <strong>Email:</strong>
                </div>
                <div class="col-md-8">
                    <input v-model="user.email" type="email" class="form-control" disabled />
                </div>
            </div>

            <div class="row mb-3">
                <div class="col-md-4">
                    <strong>Số điện thoại:</strong>
                </div>
                <div class="col-md-8">
                    <input v-model="user.phone" type="text" class="form-control" />
                </div>
            </div>

            <div class="row mb-3">
                <div class="col-md-4">
                    <strong>Vai trò:</strong>
                </div>
                <div class="col-md-8">
                    <input v-model="user.roles" type="text" class="form-control" />
                </div>
            </div>

            <div class="row mb-3">
                <div class="col-md-4">
                    <strong>Trạng thái xác minh:</strong>
                </div>
                <div class="col-md-8">
                    <input v-model="user.verified" type="checkbox" class="form-check-input" />
                </div>
            </div>

            <div class="row mb-3">
                <div class="col-md-4">
                    <strong>Ngày tạo tài khoản:</strong>
                </div>
                <div class="col-md-8">
                    <input v-model="user.createdAt" type="date" class="form-control" />
                </div>
            </div>

            <div v-if="user.userProfile" class="row mb-3">
                <div class="col-md-4">
                    <strong>Thông tin hồ sơ:</strong>
                </div>
                <div class="col-md-8">
                    <input v-model="user.userProfile.address" type="text" class="form-control" placeholder="Địa chỉ" />
                    <input v-model="user.userProfile.birthDate" type="date" class="form-control" />
                    <input v-model="user.userProfile.gender" type="text" class="form-control" placeholder="Giới tính" />
                </div>
            </div>

            <div class="text-center mt-4">
                <button class="btn btn-primary" @click="saveProfile">Lưu thay đổi</button>
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

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

                // const token = localStorage.getItem('token');
                // if (!token) {
                //     alert('Bạn chưa đăng nhập!');
                //     window.location.href = '/login';
                //     return;
                // }

                // const decoded = jwtDecode(token);
                // const email = decoded.sub;
                const token = localStorage.getItem('token');
                console.log('Token:', token);
                if (token != null) {
                    const response = await axios.get('/user/user-profile');
                    console.log('Response:', response);

                    this.user = response.data.data;
                    console.log('Thông tin người dùng:', this.user);
                    this.loading = false;
                }
                else {
                    this.error = 'Không tìm thấy token xác thực!';
                    this.loading = false;
                }
            } catch (error) {
                this.loading = false;
                this.error = error.response?.data?.message || 'Đã xảy ra lỗi khi tải thông tin người dùng.';
            }
        },


        formatDate(date) {
            if (!date) return '';
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
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
.card {
    background-color: #fff;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}
</style>
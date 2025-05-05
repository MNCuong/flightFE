<template>
    <div class="text-center mt-5">
        <div v-if="isLoading">
            <p>Đang xử lý kết quả thanh toán...</p>
        </div>
        <div v-else-if="success">
            <p class="text-success">Thanh toán thành công! Đang chuyển hướng sau {{ countdown }} giây...</p>
        </div>
        <div v-else>
            <p class="text-danger">Thanh toán thất bại. Mã lỗi: {{ responseCode }}</p>
            <button class="btn btn-primary mt-3" @click="goBack">Quay lại</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isLoading: true,
            success: false,
            responseCode: null,
            countdown: 3,
            countdownInterval: null,
        };
    },
    methods: {
        goBack() {
            this.$router.push('/');
        },
        startCountdown() {
            this.countdownInterval = setInterval(() => {
                if (this.countdown > 0) {
                    this.countdown--;
                } else {
                    clearInterval(this.countdownInterval);
                    this.$router.push('/flight-ticket-list'); 
                }
            }, 1000);
        },
    },
    mounted() {
        const query = this.$route.query;
        this.responseCode = query.vnp_ResponseCode;

        if (this.responseCode === '00') {
            this.success = true;
            this.startCountdown();

        } else {
            this.success = false;
        }

        this.isLoading = false;
    },
};
</script>

<style scoped>
.text-success {
    color: green;
}

.text-danger {
    color: red;
}
</style>
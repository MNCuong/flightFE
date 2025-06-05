<template>
  <section class="about-banner relative">
    <div class="overlay overlay-bg">
    </div>
    <div class="container">
      <div class="row d-flex align-items-center justify-content-center">
        <div class="about-content col-lg-12">
          <h1 class="text-white">
            Tìm kiếm
          </h1>
          <p class="text-white link-nav">
            <a href="index.html">
              Trang chủ
            </a>
            <span class="lnr lnr-arrow-right">
                                          </span>
            <a href="/search-flight">
              Tìm kiếm
            </a>
          </p>
        </div>
      </div>
    </div>
  </section>

  <div>
    <input v-model="name" placeholder="Tên hành khách" />
    <input v-model="bookingCode" placeholder="Mã đặt" />
    <button @click="fetchQRCode">Tạo QR code</button>
    <div v-if="qrCodeUrl">
      <img :src="qrCodeUrl" alt="QR Code" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      bookingCode: '',
      qrCodeUrl: null,
    };
  },
  methods: {
    base64EncodeUnicode(str) {
      return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
          (match, p1) => String.fromCharCode('0x' + p1)
      ));
    },
    async fetchQRCode() {
      if (!this.name || !this.bookingCode) {
        alert('Vui lòng nhập đủ thông tin');
        return;
      }

      const dataObj = {
        name: this.name,
        bookingCode: this.bookingCode,
      };

      const jsonStr = JSON.stringify(dataObj);

      // Mã hóa base64 Unicode
      const base64Data = this.base64EncodeUnicode(jsonStr);

      // Tạo URL chứa tham số data = base64Data
      const url = `http://localhost:5173/show-info?data=${encodeURIComponent(base64Data)}`;

      try {
        // Gửi URL đó lên backend để tạo QR code
        const response = await fetch(`http://localhost:5000/bookingBE-MNC/api/v1/qrcode?text=${encodeURIComponent(url)}`);

        if (!response.ok) throw new Error('Lấy QR code thất bại');

        const blob = await response.blob();
        this.qrCodeUrl = URL.createObjectURL(blob);
      } catch (error) {
        alert(error.message);
      }
    }
  },
};
</script>

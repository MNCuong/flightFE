<template>
  <footer class="footer-area section-gap">
    <div class="container">
      <div class="row">
        <div class="col-lg-3 col-md-6 col-sm-6">
          <div class="single-footer-widget">
            <h6>Về Chúng Tôi</h6>
            <p>
              Thế giới đã trở nên quá nhanh khiến mọi người không muốn dừng lại để đọc một trang thông tin...
            </p>
          </div>
        </div>

        <div class="col-lg-3 col-md-6 col-sm-6">
          <div class="single-footer-widget">
            <h6>Liên Kết</h6>
            <div class="row">
              <div class="col">
                <ul>
                  <li><router-link to="/">Trang Chủ</router-link></li>
                  <li><a href="#">Tính Năng</a></li>
                  <li><a href="#">Dịch Vụ</a></li>
                  <li><a href="#">Dự Án</a></li>
                </ul>
              </div>
              <div class="col">
                <ul>
                  <li><a href="#">Đội Ngũ</a></li>
                  <li><a href="#">Bảng Giá</a></li>
                  <li><a href="#">Tin Tức</a></li>
                  <li><a href="#">Liên Hệ</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-3 col-md-6 col-sm-6">
          <div class="single-footer-widget">
            <h6>Bản Tin</h6>
            <p>Dành cho các chuyên gia kinh doanh đang phân vân giữa giá OEM cao và chất lượng in ấn đồ họa trung bình.</p>
            <form
              class="subscription relative"
              action="https://spondonit.us12.list-manage.com/subscribe/post?u=1462626880ade1ac87bd9c93a&amp;id=92a4423d01"
              method="get"
              target="_blank"
            >
              <div class="input-group d-flex flex-row">
                <input
                  name="EMAIL"
                  placeholder="Địa Chỉ Email"
                  required
                  type="email"
                  @focus="onFocus"
                  @blur="onBlur"
                />
                <button class="btn bb-btn">
                  <span class="lnr lnr-location"></span>
                </button>
              </div>
              <div class="mt-10 info"></div>
            </form>
          </div>
        </div>

        <div class="col-lg-3 col-md-6 col-sm-6">
          <div class="single-footer-widget mail-chimp">
            <h6 class="mb-20">Ảnh Instagram</h6>
            <ul class="instafeed d-flex flex-wrap">
              <li><img alt="" :src="getImg('i1.jpg')" /></li>
              <li><img alt="" :src="getImg('i2.jpg')" /></li>
              <li><img alt="" :src="getImg('i3.jpg')" /></li>
              <li><img alt="" :src="getImg('i4.jpg')" /></li>
              <li><img alt="" :src="getImg('i5.jpg')" /></li>
              <li><img alt="" :src="getImg('i6.jpg')" /></li>
              <li><img alt="" :src="getImg('i7.jpg')" /></li>
              <li><img alt="" :src="getImg('i8.jpg')" /></li>
            </ul>
          </div>
        </div>
      </div>

      <div class="row footer-bottom d-flex justify-content-between align-items-center">
        <p class="col-lg-8 col-sm-12 footer-text m-0">
          Bản quyền © {{ new Date().getFullYear() }} Đã đăng ký bản quyền | Mẫu này được tạo
          <i aria-hidden="true" class="fa fa-heart-o"></i>
          bởi <a href="https://colorlib.com" target="_blank">Colorlib</a>
        </p>
        <div class="col-lg-4 col-sm-12 footer-social">
          <a href="#"><i class="fa fa-facebook"></i></a>
          <a href="#"><i class="fa fa-twitter"></i></a>
          <a href="#"><i class="fa fa-dribbble"></i></a>
          <a href="#"><i class="fa fa-behance"></i></a>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  name: "Footer",
  methods: {
    onFocus(event) {
      event.target.placeholder = "";
    },
    onBlur(event) {
      event.target.placeholder = "Email Address";
    },
    getImg(fileName) {
      return new URL(`@/assets/img/${fileName}`, import.meta.url).href;
    },
  },
};
</script>

<style scoped>
/* Add your scoped styles here */
</style>

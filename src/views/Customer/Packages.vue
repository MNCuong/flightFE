<template>
  <div>
    <!-- Banner Area -->
    <section class="about-banner relative">
      <div class="overlay overlay-bg"></div>
      <div class="container">
        <div class="row d-flex align-items-center justify-content-center">
          <div class="about-content col-lg-12">
            <h1 class="text-white">Insurance</h1>
            <p class="text-white link-nav">
              <router-link to="/">Home</router-link>
              <span class="lnr lnr-arrow-right"></span>
              <router-link to="/insurance">Insurance</router-link>
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Insurance One Area -->
    <section class="insurence-one-area section-gap">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 insurence-left">
            <img alt="Insurance 1" class="img-fluid img-one"
                 src="@/assets/img/insurence/i1.jpg"/>
          </div>
          <div class="col-lg-6 insurence-right">
            <h6 class="text-uppercase">Need to know</h6>
            <h1>Insurance for journey</h1>
            <p>
              Here, I focus on a range of items and features that we use in life
              without
              giving them a second thought...
            </p>
            <div class="list-wrap">
              <ul>
                <li>Strategic approach towards redesigning brand.</li>
                <li>Logo design strategy ensures a perfectly crafted logo.</li>
                <li>Branding that stands out in the crowd.</li>
                <li>Modern and evergreen logo for your business.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Insurance Two Area -->
    <section class="insurence-two-area pb-120">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 insurence-left">
            <h6 class="text-uppercase">Need to know</h6>
            <h1>Insurance for journey</h1>
            <p>
              Here, I focus on a range of items and features that we use in life
              without
              giving them a second thought...
            </p>
            <div class="list-wrap">
              <ul>
                <li>Strategic approach towards redesigning brand.</li>
                <li>Logo design strategy ensures a perfectly crafted logo.</li>
                <li>Branding that stands out in the crowd.</li>
                <li>Modern and evergreen logo for your business.</li>
              </ul>
            </div>
          </div>
          <div class="col-lg-6 insurence-right">
            <img alt="Insurance 2" class="img-fluid img-two"
                 src="@/assets/img/insurence/i2.jpg"/>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Bạn có thể thêm logic vào đây nếu cần
</script>

<style scoped>
/* Bạn có thể thêm hoặc import CSS tùy vào dự án */
</style>
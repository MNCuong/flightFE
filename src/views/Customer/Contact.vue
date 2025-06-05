<template>
  <section class="relative about-banner">
    <div class="overlay overlay-bg">
    </div>
    <div class="container">
      <div class="row d-flex align-items-center justify-content-center">
        <div class="about-content col-lg-12">
          <h1 class="text-white">
            Liên Hệ
          </h1>
          <p class="text-white link-nav">
            <a href="index.html">
              Trang Chủ
            </a>
            <span class="lnr lnr-arrow-right">
                        </span>
            <a href="contact.html">
              Liên Hệ
            </a>
          </p>
        </div>
      </div>
    </div>
  </section>

  <section class="contact-page-area section-gap">
    <div class="container">
      <div class="row">
<!--        <div class="map-wrap" id="map" style="width:100%; height: 445px;">-->
<!--        </div>-->
        <div class="col-lg-4 d-flex flex-column address-wrap">
          <div class="single-contact-address d-flex flex-row">
            <div class="icon">
                            <span class="lnr lnr-home">
                            </span>
            </div>
            <div class="contact-details">
              <h5>
                Binghamton, New York
              </h5>
              <p>
                4343 Hinkle Deegan Lake Road
              </p>
            </div>
          </div>
          <div class="single-contact-address d-flex flex-row">
            <div class="icon">
                            <span class="lnr lnr-phone-handset">
                            </span>
            </div>
            <div class="contact-details">
              <h5>
                00 (958) 9865 562
              </h5>
              <p>
                Thứ 2 đến Thứ 6, 9h sáng đến 6h chiều
              </p>
            </div>
          </div>
          <div class="single-contact-address d-flex flex-row">
            <div class="icon">
                            <span class="lnr lnr-envelope">
                            </span>
            </div>
            <div class="contact-details">
              <h5>
                support@colorlib.com
              </h5>
              <p>
                Gửi câu hỏi cho chúng tôi bất cứ lúc nào!
              </p>
            </div>
          </div>
        </div>
        <div class="col-lg-8">
          <form @submit.prevent="submitForm" class="form-area contact-form text-right" >
            <div class="row">
              <div class="col-lg-6 form-group">
                <input v-model="form.name" class="common-input mb-20 form-control" name="name"
                       placeholder="Nhập tên của bạn" required type="text"/>
                <input v-model="form.email" class="common-input mb-20 form-control" name="email"
                       placeholder="Nhập địa chỉ email" required type="email"/>
                <input v-model="form.subject" class="common-input mb-20 form-control" name="subject"
                       placeholder="Nhập tiêu đề" required type="text"/>
              </div>
              <div class="col-lg-6 form-group">
        <textarea v-model="form.message" class="common-textarea form-control" name="message"
                  placeholder="Nhập nội dung" required></textarea>
              </div>
              <div class="col-lg-12">
                <div class="alert-msg text-left text-success" v-if="successMessage">{{ successMessage }}</div>
                <div class="alert-msg text-left text-danger" v-if="errorMessage">{{ errorMessage }}</div>
                <button class="genric-btn primary" style="float: right;">
                  Gửi tin nhắn
                </button>
              </div>
            </div>
          </form>        </div>
      </div>
    </div>
  </section>
</template>
<script>
import axios from '@/services/api.js';

export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        subject: '',
        message: ''
      },
      successMessage: '',
      errorMessage: '',
      isSubmitting: false
    };
  },
  methods: {
    resetForm() {
      this.form = {
        name: '',
        email: '',
        subject: '',
        message: ''
      };
    },

    async sendContactForm(formData) {
      try {
        const response = await axios.post('/contact', formData);
        console.log("data",formData);
        console.log("response",response.data.data);
        return response.data;
      } catch (error) {
        throw error.response?.data?.message || error.message || 'Gửi thất bại';
      }
    },

    async submitForm() {
      this.isSubmitting = true;
      this.successMessage = '';
      this.errorMessage = '';

      try {
        await this.sendContactForm(this.form);
        this.successMessage = 'Tin nhắn của bạn đã được gửi!';
        this.resetForm();
      } catch (errorMsg) {
        this.errorMessage = `Không thể gửi tin nhắn. ${errorMsg}`;
        console.error('Lỗi gửi form liên hệ:', errorMsg);
      } finally {
        this.isSubmitting = false;
      }
    }
  }
};
</script>

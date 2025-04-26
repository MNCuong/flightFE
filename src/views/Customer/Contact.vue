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
        <div class="map-wrap" id="map" style="width:100%; height: 445px;">
        </div>
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
          <form action="mail.php" class="form-area contact-form text-right" id="myForm" method="post">
            <div class="row">
              <div class="col-lg-6 form-group">
                <input class="common-input mb-20 form-control" name="name"
                       onblur="this.placeholder = 'Nhập tên của bạn'" onfocus="this.placeholder = ''"
                       placeholder="Nhập tên của bạn" required type="text"/>
                <input class="common-input mb-20 form-control" name="email"
                       onblur="this.placeholder = 'Nhập địa chỉ email'" onfocus="this.placeholder = ''"
                       pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$"
                       placeholder="Nhập địa chỉ email" required type="email"/>
                <input class="common-input mb-20 form-control" name="subject"
                       onblur="this.placeholder = 'Nhập tiêu đề'" onfocus="this.placeholder = ''"
                       placeholder="Nhập tiêu đề" required type="text"/>
              </div>
              <div class="col-lg-6 form-group">
                                <textarea class="common-textarea form-control" name="message"
                                          onblur="this.placeholder = 'Nhập nội dung'" onfocus="this.placeholder = ''"
                                          placeholder="Nhập nội dung" required></textarea>
              </div>
              <div class="col-lg-12">
                <div class="alert-msg" style="text-align: left;">
                </div>
                <button class="genric-btn primary" style="float: right;">
                  Gửi tin nhắn
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
<script type="text/javascript">
</script>
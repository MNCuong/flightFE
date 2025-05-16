<template>


  <section class="banner-area relative">
    <div class="overlay overlay-bg">
    </div>
    <div class="container">
      <div class="row fullscreen align-items-center justify-content-between">
        <div class="col-lg-6 col-md-6 banner-left">
          <h6 class="text-white">
            Tránh xa cuộc sống đơn điệu </h6>
          <h1 class="text-white">
            Magical Travel
          </h1>
          <p class="text-white">
            Nếu bạn đang xem các băng trống trên web, bạn có thể rất bối rối về sự khác biệt về giá. Bạn có thể thấy một
            số với giá thấp nhất là 0,17 mỗi cái.
          </p>
          <a class="primary-btn text-uppercase" href="#">
            Bắt đầu
          </a>
        </div>
        <div class="col-lg-4 col-md-6 banner-right">
          <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item">
              <a aria-controls="flight" aria-selected="true"
                 class="nav-link active" data-toggle="tab" href="#flight"
                 id="flight-tab" role="tab">
                Flights
              </a>
            </li>
            <li class="nav-item">
              <a aria-controls="hotel" aria-selected="false" class="nav-link"
                 data-toggle="tab" href="#hotel" id="hotel-tab"
                 role="tab">
                Hotels
              </a>
            </li>
            <!--            <li class="nav-item">-->
            <!--              <a aria-controls="holiday" aria-selected="false"-->
            <!--                 class="nav-link" data-toggle="tab" href="#holiday"-->
            <!--                 id="holiday-tab" role="tab">-->
            <!--                Holidays-->
            <!--              </a>-->
            <!--            </li>-->
          </ul>
          <div class="tab-content" id="myTabContent">
            <div aria-labelledby="flight-tab" class="tab-pane fade show active" id="flight" role="tabpanel">
              <form class="form-wrap" @submit.prevent="searchFlight"> <!-- Ngăn reload khi submit -->
                <select class="form-control" name="departure" v-model="departure" @blur="updatePlaceholder" @focus="clearPlaceholder">
                  <option value="" disabled >Nơi đi</option>
                  <option v-for="location in locations" :label="location.city" :value="location.city">{{
                      location.name
                    }}
                  </option>
                </select>

                <select class="form-control" name="arrival" v-model="arrival" @blur="updatePlaceholder" @focus="clearPlaceholder">
                  <option value="" disabled >Nơi đến</option>
                  <option v-for="location in locations" :label="location.city" :value="location.city">{{
                      location.name
                    }}
                  </option>
                </select>

                <input class="form-control"
                       name="start"
                       v-model="startDate"
                       @blur="updatePlaceholder"
                       @focus="clearPlaceholder"
                       placeholder="Ngày khởi hành"
                       type="date"/>
                <!--                <Datepicker v-model="startDate" placeholder="Ngày khởi hành" :format="'yyyy-MM-dd'" class="form-control"/>-->

                <button type="submit" class="primary-btn text-uppercase"> <!-- Sử dụng type="submit" -->
                  Tìm kiếm chuyến bay
                </button>
              </form>
            </div>
<!--            <div aria-labelledby="hotel-tab" class="tab-pane fade" id="hotel"-->
<!--                 role="tabpanel">-->
<!--              <form class="form-wrap">-->
<!--                <input class="form-control" name="name"-->
<!--                       onblur="this.placeholder = 'From '"-->
<!--                       onfocus="this.placeholder = ''"-->
<!--                       placeholder="From " type="text"/>-->
<!--                <input class="form-control" name="to"-->
<!--                       onblur="this.placeholder = 'To '"-->
<!--                       onfocus="this.placeholder = ''"-->
<!--                       placeholder="To " type="text"/>-->
<!--                <input class="form-control date-picker" name="start"-->
<!--                       onblur="this.placeholder = 'Start '"-->
<!--                       onfocus="this.placeholder = ''"-->
<!--                       placeholder="Start " type="text"/>-->
<!--                <input class="form-control date-picker" name="return"-->
<!--                       onblur="this.placeholder = 'Return '"-->
<!--                       onfocus="this.placeholder = ''"-->
<!--                       placeholder="Return " type="text"/>-->
<!--                <input class="form-control" max="20" min="1"-->
<!--                       name="adults"-->
<!--                       onblur="this.placeholder = 'Adults '"-->
<!--                       onfocus="this.placeholder = ''"-->
<!--                       placeholder="Adults " type="number"/>-->
<!--                <input class="form-control" max="20" min="1"-->
<!--                       name="child"-->
<!--                       onblur="this.placeholder = 'Child '"-->
<!--                       onfocus="this.placeholder = ''"-->
<!--                       placeholder="Child " type="number"/>-->
<!--                <a class="primary-btn text-uppercase" href="#">-->
<!--                  Search Hotels-->
<!--                </a>-->
<!--              </form>-->
<!--            </div>-->

          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="popular-destination-area section-gap">
    <div class="container">
      <div class="row d-flex justify-content-center">
        <div class="menu-content pb-70 col-lg-8">
          <div class="title text-center">
            <h1 class="mb-10">
              Điểm đến tiềm năng
            </h1>
            <p>
              Tất cả chúng ta đều sống trong một thời đại thuộc về những người trẻ tuổi. Cuộc sống đang trở nên cực kỳ
              nhanh chóng.
            </p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4">
          <div class="single-destination relative">
            <div class="thumb relative">
              <div class="overlay overlay-bg">
              </div>
              <img alt="" class="img-fluid" src="@/assets/img/d1.jpg"/>
            </div>
            <div class="desc">
              <a class="price-btn" href="#">
                $150
              </a>
              <h4>
                Mountain River
              </h4>
              <p>
                Paraguay
              </p>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="single-destination relative">
            <div class="thumb relative">
              <div class="overlay overlay-bg">
              </div>
              <img alt="" class="img-fluid" src="@/assets/img/d2.jpg"/>
            </div>
            <div class="desc">
              <a class="price-btn" href="#">
                $250
              </a>
              <h4>
                Dream City
              </h4>
              <p>
                Paris
              </p>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="single-destination relative">
            <div class="thumb relative">
              <div class="overlay overlay-bg">
              </div>
              <img alt="" class="img-fluid" src="@/assets/img/d3.jpg"/>
            </div>
            <div class="desc">
              <a class="price-btn" href="#">
                $350
              </a>
              <h4>
                Cloud Mountain
              </h4>
              <p>
                Sri Lanka
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="price-area section-gap">
    <div class="container">
      <div class="row d-flex justify-content-center">
        <div class="menu-content pb-70 col-lg-8">
          <div class="title text-center">
            <h1 class="mb-10">
              Chúng tôi cung cấp giá cả phải chăng </h1>
            <p>
              Giáo dục tốt, những người trí thức, đặc biệt là các nhà khoa học mọi lúc thể hiện đáng kể.
            </p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4">
          <div class="single-price">
            <h4>
              Gói giá rẻ
            </h4>
            <ul class="price-list">
              <li class="d-flex justify-content-between align-items-center">
                                                                <span>
                                                                        New York
                                                                </span>
                <a class="price-btn" href="#">
                  $1500
                </a>
              </li>
              <li class="d-flex justify-content-between align-items-center">
                                                                <span>
                                                                        Maldives
                                                                </span>
                <a class="price-btn" href="#">
                  $1500
                </a>
              </li>
              <li class="d-flex justify-content-between align-items-center">
                                                                <span>
                                                                        Sri Lanka
                                                                </span>
                <a class="price-btn" href="#">
                  $1500
                </a>
              </li>
              <li class="d-flex justify-content-between align-items-center">
                                                                <span>
                                                                        Nepal
                                                                </span>
                <a class="price-btn" href="#">
                  $1500
                </a>
              </li>
              <li class="d-flex justify-content-between align-items-center">
                                                                <span>
                                                                        Thiland
                                                                </span>
                <a class="price-btn" href="#">
                  $1500
                </a>
              </li>
              <li class="d-flex justify-content-between align-items-center">
                                                                <span>
                                                                        Singapore
                                                                </span>
                <a class="price-btn" href="#">
                  $1500
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="single-price">
            <h4>
              Gói sang trọng
            </h4>
            <ul class="price-list">
              <li class="d-flex justify-content-between align-items-center">
                                                                <span>
                                                                        New York
                                                                </span>
                <a class="price-btn" href="#">
                  $1500
                </a>
              </li>
              <li class="d-flex justify-content-between align-items-center">
                                                                <span>
                                                                        Maldives
                                                                </span>
                <a class="price-btn" href="#">
                  $1500
                </a>
              </li>
              <li class="d-flex justify-content-between align-items-center">
                                                                <span>
                                                                        Sri Lanka
                                                                </span>
                <a class="price-btn" href="#">
                  $1500
                </a>
              </li>
              <li class="d-flex justify-content-between align-items-center">
                                                                <span>
                                                                        Nepal
                                                                </span>
                <a class="price-btn" href="#">
                  $1500
                </a>
              </li>
              <li class="d-flex justify-content-between align-items-center">
                                                                <span>
                                                                        Thiland
                                                                </span>
                <a class="price-btn" href="#">
                  $1500
                </a>
              </li>
              <li class="d-flex justify-content-between align-items-center">
                                                                <span>
                                                                        Singapore
                                                                </span>
                <a class="price-btn" href="#">
                  $1500
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="single-price">
            <h4>
              Gói cắm trại
            </h4>
            <ul class="price-list">
              <li class="d-flex justify-content-between align-items-center">
                                                                <span>
                                                                        New York
                                                                </span>
                <a class="price-btn" href="#">
                  $1500
                </a>
              </li>
              <li class="d-flex justify-content-between align-items-center">
                                                                <span>
                                                                        Maldives
                                                                </span>
                <a class="price-btn" href="#">
                  $1500
                </a>
              </li>
              <li class="d-flex justify-content-between align-items-center">
                                                                <span>
                                                                        Sri Lanka
                                                                </span>
                <a class="price-btn" href="#">
                  $1500
                </a>
              </li>
              <li class="d-flex justify-content-between align-items-center">
                                                                <span>
                                                                        Nepal
                                                                </span>
                <a class="price-btn" href="#">
                  $1500
                </a>
              </li>
              <li class="d-flex justify-content-between align-items-center">
                                                                <span>
                                                                        Thiland
                                                                </span>
                <a class="price-btn" href="#">
                  $1500
                </a>
              </li>
              <li class="d-flex justify-content-between align-items-center">
                                                                <span>
                                                                        Singapore
                                                                </span>
                <a class="price-btn" href="#">
                  $1500
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="other-issue-area section-gap">
    <div class="container">
      <div class="row d-flex justify-content-center">
        <div class="menu-content pb-70 col-lg-9">
          <div class="title text-center">
            <h1 class="mb-10">
              Các vấn đề khác mà chúng tôi có thể giúp bạn </h1>
            <p>
              Tất cả chúng ta đều sống trong một thời đại thuộc về những người trẻ tuổi. Cuộc sống đó là.
            </p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-3 col-md-6">
          <div class="single-other-issue">
            <div class="thumb">
              <img alt="" class="img-fluid" src="@/assets/img/o1.jpg"/>
            </div>
            <a href="#">
              <h4>
                Thuê một chiếc xe hơi
              </h4>
            </a>
            <p>

            </p>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div class="single-other-issue">
            <div class="thumb">
              <img alt="" class="img-fluid" src="@/assets/img/o2.jpg"/>
            </div>
            <a href="#">
              <h4>
                Đặt chỗ đi du lịch
              </h4>
            </a>
            <p>

            </p>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div class="single-other-issue">
            <div class="thumb">
              <img alt="" class="img-fluid" src="@/assets/img/o3.jpg"/>
            </div>
            <a href="#">
              <h4>

              </h4>
            </a>
            <p>

            </p>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div class="single-other-issue">
            <div class="thumb">
              <img alt="" class="img-fluid" src="@/assets/img/o4.jpg"/>
            </div>
            <a href="#">
              <h4>
                Trải nghiệm ẩm thực
              </h4>
            </a>
            <p>

            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="testimonial-area section-gap">
    <div class="container">
      <div class="row d-flex justify-content-center">
        <div class="menu-content pb-70 col-lg-8">
          <div class="title text-center">
            <h1 class="mb-10">
              Chứng thực từ khách hàng của chúng tôi
            </h1>
            <p>

            </p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="active-testimonial">
          <div class="single-testimonial item d-flex flex-row">
            <div class="thumb">
              <img alt="" class="img-fluid" src="@/assets/img/elements/user1.png"/>
            </div>
            <div class="desc">
              <p>
                Do you want to be even more successful? Learn to love
                learning and growth. The more effort you put into
                improving your skills, the bigger the payoff you.
              </p>
              <h4>
                Harriet Maxwell
              </h4>
              <div class="star">
                                                                <span class="fa fa-star checked">
                                                                </span>
                <span class="fa fa-star checked">
                                                                </span>
                <span class="fa fa-star checked">
                                                                </span>
                <span class="fa fa-star checked">
                                                                </span>
                <span class="fa fa-star">
                                                                </span>
              </div>
            </div>
          </div>
          <div class="single-testimonial item d-flex flex-row">
            <div class="thumb">
              <img alt="" class="img-fluid" src="@/assets/img/elements/user2.png"/>
            </div>
            <div class="desc">
              <p>
                A purpose is the eternal condition for success. Every
                former smoker can tell you just how hard it is to stop
                smoking cigarettes. However.
              </p>
              <h4>
                Carolyn Craig
              </h4>
              <div class="star">
                                                                <span class="fa fa-star checked">
                                                                </span>
                <span class="fa fa-star checked">
                                                                </span>
                <span class="fa fa-star checked">
                                                                </span>
                <span class="fa fa-star">
                                                                </span>
                <span class="fa fa-star">
                                                                </span>
              </div>
            </div>
          </div>
          <div class="single-testimonial item d-flex flex-row">
            <div class="thumb">
              <img alt="" class="img-fluid" src="@/assets/img/elements/user1.png"/>
            </div>
            <div class="desc">
              <p>
                Do you want to be even more successful? Learn to love
                learning and growth. The more effort you put into
                improving your skills, the bigger the payoff you.
              </p>
              <h4>
                Harriet Maxwell
              </h4>
              <div class="star">
                                                                <span class="fa fa-star checked">
                                                                </span>
                <span class="fa fa-star checked">
                                                                </span>
                <span class="fa fa-star checked">
                                                                </span>
                <span class="fa fa-star checked">
                                                                </span>
                <span class="fa fa-star">
                                                                </span>
              </div>
            </div>
          </div>
          <div class="single-testimonial item d-flex flex-row">
            <div class="thumb">
              <img alt="" class="img-fluid" src="@/assets/img/elements/user2.png"/>
            </div>
            <div class="desc">
              <p>
                A purpose is the eternal condition for success. Every
                former smoker can tell you just how hard it is to stop
                smoking cigarettes. However.
              </p>
              <h4>
                Carolyn Craig
              </h4>
              <div class="star">
                                                                <span class="fa fa-star checked">
                                                                </span>
                <span class="fa fa-star checked">
                                                                </span>
                <span class="fa fa-star checked">
                                                                </span>
                <span class="fa fa-star">
                                                                </span>
                <span class="fa fa-star">
                                                                </span>
              </div>
            </div>
          </div>
          <div class="single-testimonial item d-flex flex-row">
            <div class="thumb">
              <img alt="" class="img-fluid" src="@/assets/img/elements/user1.png"/>
            </div>
            <div class="desc">
              <p>
                Do you want to be even more successful? Learn to love
                learning and growth. The more effort you put into
                improving your skills, the bigger the payoff you.
              </p>
              <h4>
                Harriet Maxwell
              </h4>
              <div class="star">
                                                                <span class="fa fa-star checked">
                                                                </span>
                <span class="fa fa-star checked">
                                                                </span>
                <span class="fa fa-star checked">
                                                                </span>
                <span class="fa fa-star checked">
                                                                </span>
                <span class="fa fa-star">
                                                                </span>
              </div>
            </div>
          </div>
          <div class="single-testimonial item d-flex flex-row">
            <div class="thumb">
              <img alt="" class="img-fluid" src="@/assets/img/elements/user2.png"/>
            </div>
            <div class="desc">
              <p>
                A purpose is the eternal condition for success. Every
                former smoker can tell you just how hard it is to stop
                smoking cigarettes. However.
              </p>
              <h4>
                Carolyn Craig
              </h4>
              <div class="star">
                                                                <span class="fa fa-star checked">
                                                                </span>
                <span class="fa fa-star checked">
                                                                </span>
                <span class="fa fa-star checked">
                                                                </span>
                <span class="fa fa-star">
                                                                </span>
                <span class="fa fa-star">
                                                                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="home-about-area">
    <div class="container-fluid">
      <div class="row align-items-center justify-content-end">
        <div class="col-lg-6 col-md-12 home-about-left">
          <h1>
            Không tìm thấy gói của bạn? <br/>


            Hãy hỏi chúng tôi.
            <br/>
            Chúng tôi sẽ làm cho nó cho bạn
          </h1>
          <p>

          </p>
          <a class="primary-btn text-uppercase" href="#">
            yêu cầu về giá
          </a>
        </div>
        <div class="col-lg-6 col-md-12 home-about-right no-padding">
          <img alt="" class="img-fluid" src="@/assets/img/about-img.jpg"/>
        </div>
      </div>
    </div>
  </section>

  <section class="recent-blog-area section-gap">
    <div class="container">
      <div class="row d-flex justify-content-center">
        <div class="menu-content pb-60 col-lg-9">
          <div class="title text-center">
            <h1 class="mb-10">
              Các bài viết mới nhất
            </h1>
            <p>

            </p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="active-recent-blog-carusel">
          <div class="single-recent-blog-post item">
            <div class="thumb">
              <img alt="" class="img-fluid" src="@/assets/img/b1.jpg"/>
            </div>
            <div class="details">
              <div class="tags">
                <ul>
                  <li>
                    <a href="#">
                      Travel
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Life Style
                    </a>
                  </li>
                </ul>
              </div>
              <a href="#">
                <h4 class="title">
                  Low Cost Advertising
                </h4>
              </a>
              <p>
                Acres of Diamonds… you’ve read the famous story, or at
                least had it related to you. A farmer.
              </p>
              <h6 class="date">
                31st January,2018
              </h6>
            </div>
          </div>
          <div class="single-recent-blog-post item">
            <div class="thumb">
              <img alt="" class="img-fluid" src="@/assets/img/b2.jpg"/>
            </div>
            <div class="details">
              <div class="tags">
                <ul>
                  <li>
                    <a href="#">
                      Travel
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Life Style
                    </a>
                  </li>
                </ul>
              </div>
              <a href="#">
                <h4 class="title">
                  Creative Outdoor Ads
                </h4>
              </a>
              <p>
                Acres of Diamonds… you’ve read the famous story, or at
                least had it related to you. A farmer.
              </p>
              <h6 class="date">
                31st January,2018
              </h6>
            </div>
          </div>
          <div class="single-recent-blog-post item">
            <div class="thumb">
              <img alt="" class="img-fluid" src="@/assets/img/b3.jpg"/>
            </div>
            <div class="details">
              <div class="tags">
                <ul>
                  <li>
                    <a href="#">
                      Travel
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Life Style
                    </a>
                  </li>
                </ul>
              </div>
              <a href="#">
                <h4 class="title">
                  It's Classified How To Utilize Free
                </h4>
              </a>
              <p>
                Acres of Diamonds… you’ve read the famous story, or at
                least had it related to you. A farmer.
              </p>
              <h6 class="date">
                31st January,2018
              </h6>
            </div>
          </div>
          <div class="single-recent-blog-post item">
            <div class="thumb">
              <img alt="" class="img-fluid" src="@/assets/img/b1.jpg"/>
            </div>
            <div class="details">
              <div class="tags">
                <ul>
                  <li>
                    <a href="#">
                      Travel
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Life Style
                    </a>
                  </li>
                </ul>
              </div>
              <a href="#">
                <h4 class="title">
                  Low Cost Advertising
                </h4>
              </a>
              <p>
                Acres of Diamonds… you’ve read the famous story, or at
                least had it related to you. A farmer.
              </p>
              <h6 class="date">
                31st January,2018
              </h6>
            </div>
          </div>
          <div class="single-recent-blog-post item">
            <div class="thumb">
              <img alt="" class="img-fluid" src="@/assets/img/b2.jpg"/>
            </div>
            <div class="details">
              <div class="tags">
                <ul>
                  <li>
                    <a href="#">
                      Travel
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Life Style
                    </a>
                  </li>
                </ul>
              </div>
              <a href="#">
                <h4 class="title">
                  Creative Outdoor Ads
                </h4>
              </a>
              <p>
                Acres of Diamonds… you’ve read the famous story, or at
                least had it related to you. A farmer.
              </p>
              <h6 class="date">
                31st January,2018
              </h6>
            </div>
          </div>
          <div class="single-recent-blog-post item">
            <div class="thumb">
              <img alt="" class="img-fluid" src="@/assets/img/b3.jpg"/>
            </div>
            <div class="details">
              <div class="tags">
                <ul>
                  <li>
                    <a href="#">
                      Travel
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Life Style
                    </a>
                  </li>
                </ul>
              </div>
              <a href="#">
                <h4 class="title">
                  It's Classified How To Utilize Free
                </h4>
              </a>
              <p>
                Acres of Diamonds… you’ve read the famous story, or at
                least had it related to you. A farmer.
              </p>
              <h6 class="date">
                31st January,2018
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>


</template>


<script>
import axios from '../../services/api.js';
export default {
  data() {
    return {
      departure: '',
      arrival: '',
      startDate: '',
      locations: [],
      page: 0,
      size: 10

    };
  },
  methods: {
    searchFlight() {
      this.$router.push({
        name: 'search-flight',
        query: {
          departure: this.departure,
          arrival: this.arrival,
          startDate: this.startDate,
          page:this.page,
          size:this.size
        }
      });
    },

    updatePlaceholder(event) {
      if (event.target.name === 'departure') {
        event.target.placeholder = 'Nơi đi';
      } else if (event.target.name === 'arrival') {
        event.target.placeholder = 'Nơi đến';
      } else if (event.target.name === 'start') {
        event.target.placeholder = 'Ngày khởi hành';
      }
    },


    clearPlaceholder(event)
      {
        event.target.placeholder = '';
      }
    },

  mounted() {
    axios.get('/airport-info/list')
        .then(response => {
          this.locations = response.data.data;
          console.log("abc",this.locations);
          const cities = this.locations.map(location => location.city);
          const code = this.locations.map(location => location.code);
          console.log("Cities:", cities);
          console.log("Cities:", this.locations.code);
        })
        .catch(error => {
          console.error('Lỗi khi lấy dữ liệu sân bay:', error);
        });
  }
  };

</script>
<style scoped>
/* Style cho form nếu cần */
</style>
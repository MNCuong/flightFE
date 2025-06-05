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
              <a class="nav-link active"
                 id="flight-tab"
                 data-toggle="tab"
                 href="#flight"
                 role="tab"
                 aria-controls="flight"
                 aria-selected="true"
                 @click="tripType = 'oneWay'"
              >
                Một chiều
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link"
                 id="roundTrip-tab"
                 data-toggle="tab"
                 href="#roundTrip"
                 role="tab"
                 aria-controls="roundTrip"
                 aria-selected="false"
                 @click="tripType = 'roundTrip'"
              >
                Khứ hồi
              </a>
            </li>
          </ul>
          <div class="tab-content" id="myTabContent">
            <form class="form-wrap space-y-4" @submit.prevent="searchFlight">
              <select v-model="departure" class="form-control rounded-md border p-2">
                <option value="" disabled>Nơi đi</option>
                <option v-for="location in locations" :key="location.code" :value="location.city">
                  {{ location.city }}
                </option>
              </select>

              <select v-model="arrival" class="form-control rounded-md border p-2">
                <option value="" disabled>Nơi đến</option>
                <option v-for="location in locations" :key="location.code" :value="location.city">
                  {{ location.city }}
                </option>
              </select>

              <Datepicker
                  v-if="tripType === 'roundTrip'"
                  v-model="dateRange"
                  :range="true"
                  placeholder="Chọn ngày đi và ngày về"
                  :multi-calendars="true"
                  :columns="2"
                  :format="'dd/MM/yyyy'"
              />

              <Datepicker
                  v-else
                  v-model="startDate"
                  placeholder="Ngày khởi hành"
                  :format="'dd/MM/yyyy'"
              />
              <input
                  v-if="tripType === 'roundTrip'"
                  class="form-control"
                  v-model="passengerNumber"
                  type="text"
                  placeholder="Số hành khách"
              />
              <button type="submit" class="primary-btn text-uppercase">
                Tìm kiếm chuyến bay
              </button>
            </form>

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


<script setup>
import {ref, onMounted, watch} from 'vue'
import {useRouter} from 'vue-router'
import axios from '../../services/api.js'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const router = useRouter()

const tripType = ref('oneWay')
const departure = ref('')
const arrival = ref('')
const startDate = ref('')
const returnDate = ref('')
const passengerNumber = ref('')
const locations = ref([])
const page = ref(0)
const size = ref(10)

const today = new Date();
const dateRange = ref([today, today]);

function formatDateToDMY(date) {
  if (!date) return ''
  const d = new Date(date)
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  return `${day}-${month}-${year}`
}

const searchFlight = () => {
  const query = {
    departure: departure.value,
    arrival: arrival.value,
    tripType: tripType.value,
    page: page.value,
    size: size.value,
  }

  const [start, end] = dateRange.value

  if (tripType.value === 'roundTrip') {
    if (start && end) {
      console.log("thanh cong");
      query.dateRange = JSON.stringify([
        start.toISOString(),
        end.toISOString(),
      ])
      query.passengerNumber= passengerNumber.value
    }
    console.log("tha bai");

  } else {
    if (startDate.value) {
      query.startDate = startDate.value
    }
  }

  console.log('startDate:', dateRange.value);
  console.log('returnDate:', dateRange.value);
  // return;

  router.push({
    name: 'search-flight',
    query
  })
}
const token=localStorage.getItem('token')

onMounted(async () => {
    console.log('Không có token! Không gọi API.', token)



  try {
    const response = await axios.get('/airport-info/list')
    locations.value = response.data.data
    console.log('Danh sách sân bay1:', locations.value)
  } catch (error) {
    console.error('Lỗi khi gọi API:', error)
  }
})
watch(dateRange, ([start, end]) => {
  startDate.value = start;
  returnDate.value = end;
});

</script>
<style scoped>
/* Style cho form nếu cần */
</style>
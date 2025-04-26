<template>


  <section class="banner-area relative">
    <div class="overlay overlay-bg">
    </div>
    <div class="container">
      <div class="row fullscreen align-items-center justify-content-between">
        <div class="col-lg-6 col-md-6 banner-left">
          <h6 class="text-white">
            Away from monotonous life
          </h6>
          <h1 class="text-white">
            Magical Travel
          </h1>
          <p class="text-white">
            If you are looking at blank cassettes on the web, you may be very
            confused at the difference in price. You may see some for as low as $.17
            each.
          </p>
          <a class="primary-btn text-uppercase" href="#">
            Get Started
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
            <li class="nav-item">
              <a aria-controls="holiday" aria-selected="false"
                 class="nav-link" data-toggle="tab" href="#holiday"
                 id="holiday-tab" role="tab">
                Holidays
              </a>
            </li>
          </ul>
          <div class="tab-content" id="myTabContent">
            <div aria-labelledby="flight-tab" class="tab-pane fade show active"
                 id="flight" role="tabpanel">
              <form class="form-wrap">
                <input class="form-control" name="name"
                       onblur="this.placeholder = 'From '"
                       onfocus="this.placeholder = ''"
                       placeholder="From " type="text"/>
                <input class="form-control" name="to"
                       onblur="this.placeholder = 'To '"
                       onfocus="this.placeholder = ''"
                       placeholder="To " type="text"/>
                <input class="form-control date-picker" name="start"
                       onblur="this.placeholder = 'Start '"
                       onfocus="this.placeholder = ''"
                       placeholder="Start " type="text"/>
                <input class="form-control date-picker" name="return"
                       onblur="this.placeholder = 'Return '"
                       onfocus="this.placeholder = ''"
                       placeholder="Return " type="text"/>
                <input class="form-control" max="20" min="1"
                       name="adults"
                       onblur="this.placeholder = 'Adults '"
                       onfocus="this.placeholder = ''"
                       placeholder="Adults " type="number"/>
                <input class="form-control" max="20" min="1"
                       name="child"
                       onblur="this.placeholder = 'Child '"
                       onfocus="this.placeholder = ''"
                       placeholder="Child " type="number"/>
                <a class="primary-btn text-uppercase" href="#">
                  Search flights
                </a>
              </form>
            </div>
            <div aria-labelledby="hotel-tab" class="tab-pane fade" id="hotel"
                 role="tabpanel">
              <form class="form-wrap">
                <input class="form-control" name="name"
                       onblur="this.placeholder = 'From '"
                       onfocus="this.placeholder = ''"
                       placeholder="From " type="text"/>
                <input class="form-control" name="to"
                       onblur="this.placeholder = 'To '"
                       onfocus="this.placeholder = ''"
                       placeholder="To " type="text"/>
                <input class="form-control date-picker" name="start"
                       onblur="this.placeholder = 'Start '"
                       onfocus="this.placeholder = ''"
                       placeholder="Start " type="text"/>
                <input class="form-control date-picker" name="return"
                       onblur="this.placeholder = 'Return '"
                       onfocus="this.placeholder = ''"
                       placeholder="Return " type="text"/>
                <input class="form-control" max="20" min="1"
                       name="adults"
                       onblur="this.placeholder = 'Adults '"
                       onfocus="this.placeholder = ''"
                       placeholder="Adults " type="number"/>
                <input class="form-control" max="20" min="1"
                       name="child"
                       onblur="this.placeholder = 'Child '"
                       onfocus="this.placeholder = ''"
                       placeholder="Child " type="number"/>
                <a class="primary-btn text-uppercase" href="#">
                  Search Hotels
                </a>
              </form>
            </div>
            <div aria-labelledby="holiday-tab" class="tab-pane fade" id="holiday"
                 role="tabpanel">
              <form class="form-wrap">
                <input class="form-control" name="name"
                       onblur="this.placeholder = 'From '"
                       onfocus="this.placeholder = ''"
                       placeholder="From " type="text"/>
                <input class="form-control" name="to"
                       onblur="this.placeholder = 'To '"
                       onfocus="this.placeholder = ''"
                       placeholder="To " type="text"/>
                <input class="form-control date-picker" name="start"
                       onblur="this.placeholder = 'Start '"
                       onfocus="this.placeholder = ''"
                       placeholder="Start " type="text"/>
                <input class="form-control date-picker" name="return"
                       onblur="this.placeholder = 'Return '"
                       onfocus="this.placeholder = ''"
                       placeholder="Return " type="text"/>
                <input class="form-control" max="20" min="1"
                       name="adults"
                       onblur="this.placeholder = 'Adults '"
                       onfocus="this.placeholder = ''"
                       placeholder="Adults " type="number"/>
                <input class="form-control" max="20" min="1"
                       name="child"
                       onblur="this.placeholder = 'Child '"
                       onfocus="this.placeholder = ''"
                       placeholder="Child " type="number"/>
                <a class="primary-btn text-uppercase" href="#">
                  Search Holidays
                </a>
              </form>
            </div>
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
              Popular Destinations
            </h1>
            <p>
              We all live in an age that belongs to the young at heart. Life
              that is becoming extremely fast, day.
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
              We Provide Affordable Prices
            </h1>
            <p>
              Well educated, intellectual people, especially scientists at all
              times demonstrate considerably.
            </p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4">
          <div class="single-price">
            <h4>
              Cheap Packages
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
              Luxury Packages
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
              Camping Packages
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
              Other issues we can help you with
            </h1>
            <p>
              We all live in an age that belongs to the young at heart. Life
              that is.
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
                Rent a Car
              </h4>
            </a>
            <p>
              The preservation of human life is the ultimate value, a pillar
              of ethics and the foundation.
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
                Cruise Booking
              </h4>
            </a>
            <p>
              I was always somebody who felt quite sorry for myself, what I
              had not got compared.
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
                To Do List
              </h4>
            </a>
            <p>
              The following article covers a topic that has recently moved to
              center stage–at least it seems.
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
                Food Features
              </h4>
            </a>
            <p>
              There are many kinds of narratives and organizing principles.
              Science is driven by evidence.
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
              Testimonial from our Clients
            </h1>
            <p>
              The French Revolution constituted for the conscience of the
              dominant aristocratic class a fall from
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
            Did not find your Package?
            <br/>
            Feel free to ask us.
            <br/>
            We‘ll make it for you
          </h1>
          <p>
            inappropriate behavior is often laughed off as “boys will be boys,”
            women face higher conduct standards especially in the workplace. That’s
            why it’s crucial that, as women, our behavior on the job is beyond
            reproach. inappropriate behavior is often laughed.
          </p>
          <a class="primary-btn text-uppercase" href="#">
            request custom price
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
              Latest from Our Blog
            </h1>
            <p>
              With the exception of Nietzsche, no other madman has contributed
              so much to human sanity as has.
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
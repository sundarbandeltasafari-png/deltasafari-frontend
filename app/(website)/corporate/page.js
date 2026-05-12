import SwiperSlideWrapper from '@/components/website/common/SwiperSlideWrapper'
import SwiperWrapper from '@/components/website/common/SwiperWrapper'
import Faq from '@/components/website/home/Faq';
import SwiperWrapperPackage from '@/components/website/package/SwiperWrapperPackage';
import React from 'react'

function page() {
  const packageData = [
    {
      "id": 1,
      "badge": "Hot Sale!",
      "gallery": [
        "assets/img/home1/tour-package-img2.jpg",
        "assets/img/home1/tour-package-img10.jpg",
        "assets/img/home1/tour-package-img11.jpg"
      ],
      "title": "Mystic Mountains Retreat",
      "detailsUrl": "travel-package-details.html",
      "location": {
        "name": "Montmartre",
        "url": "travel-package-01.html"
      },
      "duration": "07 Days",
      "price": "599",
      "priceLabel": "Per Person"
    },
    {
      "id": 2,
      "badge": "Trending",
      "gallery": [
        "assets/img/home1/tour-package-img3.jpg"
      ],
      "title": "Azure Coast Adventure",
      "detailsUrl": "travel-package-details.html",
      "location": {
        "name": "Portofino",
        "url": "travel-package-02.html"
      },
      "duration": "05 Days",
      "price": "450",
      "priceLabel": "Per Person"
    },
    {
      "id": 3,
      "badge": "Best Seller",
      "gallery": [
        "assets/img/home1/tour-package-img6.jpg",
        "assets/img/home1/tour-package-img15.jpg",
        "assets/img/home1/tour-package-img16.jpg"
      ],
      "title": "Golden Sands Expedition",
      "detailsUrl": "travel-package-details.html",
      "location": {
        "name": "Dubai",
        "url": "travel-package-03.html"
      },
      "duration": "10 Days",
      "price": "1200",
      "priceLabel": "Per Person"
    }
  ];
  const hotelCities = [
    {
      "name": "Delhi",
      "image": "https://images.emtcontent.com/hotel-img/del-sm.webp",
      "categories": [
        "Hotels",
        "Budget Hotels",
        "3 Star Hotels",
        "4 Star Hotels",
        "5 Star Hotels"
      ]
    },
    {
      "name": "Goa",
      "image": "https://images.emtcontent.com/hotel-img/goa-sm.webp",
      "categories": [
        "Hotels",
        "Budget Hotels",
        "3 Star Hotels",
        "4 Star Hotels",
        "5 Star Hotels"
      ]
    },
    {
      "name": "Mumbai",
      "image": "https://images.emtcontent.com/hotel-img/mumb-sm.webp",
      "categories": [
        "Hotels",
        "Budget Hotels",
        "3 Star Hotels",
        "4 Star Hotels",
        "5 Star Hotels"
      ]
    },
    {
      "name": "Shimla",
      "image": "https://images.emtcontent.com/hotel-img/shimla-sm.webp",
      "categories": [
        "Hotels",
        "Budget Hotels",
        "3 Star Hotels",
        "4 Star Hotels",
        "5 Star Hotels"
      ]
    },
    {
      "name": "Manali",
      "image": "https://images.emtcontent.com/hotel-img/manali-sm.webp",
      "categories": [
        "Hotels",
        "Budget Hotels",
        "3 Star Hotels",
        "4 Star Hotels",
        "5 Star Hotels"
      ]
    },
    {
      "name": "Hyderabad",
      "image": "https://images.emtcontent.com/hotel-img/hyd-sm.webp",
      "categories": [
        "Hotels",
        "Budget Hotels",
        "3 Star Hotels",
        "4 Star Hotels",
        "5 Star Hotels"
      ]
    },
    {
      "name": "Chennai",
      "image": "https://images.emtcontent.com/hotel-img/chennai-sm.webp",
      "categories": [
        "Hotels",
        "Budget Hotels",
        "3 Star Hotels",
        "4 Star Hotels",
        "5 Star Hotels"
      ]
    },
    {
      "name": "Kolkata",
      "image": "https://images.emtcontent.com/hotel-img/kolkata-sm.webp",
      "categories": [
        "Hotels",
        "Budget Hotels",
        "3 Star Hotels",
        "4 Star Hotels",
        "5 Star Hotels"
      ]
    },
    {
      "name": "Jaipur",
      "image": "https://images.emtcontent.com/hotel-img/jaipur-sm.webp",
      "categories": [
        "Hotels",
        "Budget Hotels",
        "3 Star Hotels",
        "4 Star Hotels",
        "5 Star Hotels"
      ]
    },
    {
      "name": "Pune",
      "image": "https://images.emtcontent.com/hotel-img/pune-sm.webp",
      "categories": [
        "Hotels",
        "Budget Hotels",
        "3 Star Hotels",
        "4 Star Hotels",
        "5 Star Hotels"
      ]
    },
    {
      "name": "Gurugram",
      "image": "https://images.emtcontent.com/hotel-img/gurgrm-sm.webp",
      "categories": [
        "Hotels",
        "Budget Hotels",
        "3 Star Hotels",
        "4 Star Hotels",
        "5 Star Hotels"
      ]
    },
    {
      "name": "Ahmedabad",
      "image": "https://images.emtcontent.com/hotel-img/ahmd-sm.webp",
      "categories": [
        "Hotels",
        "Budget Hotels",
        "3 Star Hotels",
        "4 Star Hotels",
        "5 Star Hotels"
      ]
    }
  ]
  return (
    <>
      <div className="home2-banner-section package-section breadcrumb-section" style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(assets/img/home3/banner-img2.jpg)" }}>
        <div className="container">
          <div className="banner-content">
            <h1>Corporate Packages</h1>
            <p>Highlights convenience and simplicity, Best for agencies with online & mobile-friendly services.</p>
          </div>
        </div>
      </div>
      <div className="filter-wrapper filter-wrapper-package mb-50">
        <div className="container">
          <div className="filter-input-wrap package m-auto p-0">
            <form className="filter-input show">
              <div className="single-search-box" style={{ border: "none", borderRight: "2px solid #dcdcdc", borderRadius: 0 }}>
                <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <path d="M12.5944 8.99987C12.5944 10.988 10.9826 12.5998 8.99443 12.5998C7.00627 12.5998 5.39465 10.988 5.39465 8.99987C5.39465 7.0117 7.00627 5.40009 8.99443 5.40009C10.9826 5.40009 12.5944 7.0117 12.5944 8.99987Z"></path>
                    <path d="M17.4601 8.4599H16.2564C15.9858 4.86535 13.1291 2.00812 9.53458 1.7372V0.539976C9.53458 0.241723 9.29268 0 8.9946 0C8.69635 0 8.45462 0.241723 8.45462 0.539976V1.7372C4.85986 2.00812 2.00297 4.86535 1.73235 8.4599H0.540018C0.241723 8.4599 0 8.7017 0 8.99987C0 9.29813 0.241723 9.53985 0.539976 9.53985H1.73239C2.00297 13.1344 4.85991 15.9916 8.45441 16.2625V17.4601C8.45441 17.7583 8.69614 18 8.99439 18C9.29251 18 9.53428 17.7583 9.53428 17.4601V16.2625C13.1289 15.9918 15.9858 13.1346 16.2564 9.53985H17.4601C17.7583 9.53985 18 9.29813 18 8.99987C18 8.70175 17.7583 8.4599 17.4601 8.4599ZM8.99443 15.2096C5.56504 15.2094 2.78509 12.4291 2.78509 8.9997C2.78522 5.57014 5.56554 2.7902 8.99494 2.7902C12.4245 2.7902 15.2046 5.57048 15.2046 8.99987C15.2005 12.428 12.4225 15.2058 8.99443 15.2096Z"></path>
                  </g>
                </svg>
                <div className="custom-select-dropdown destination-dropdown">
                  <input type="text" value="Where are you going?" />
                  <div className="input-field-value">
                    <div className="destination">
                      <h6>Bali Paradaise</h6>
                      <span>Indonesia</span>
                    </div>
                  </div>
                </div>
                <div className="custom-select-wrap">
                  <div className="custom-select-search-area">
                    <i className="bx bx-search"></i>
                    <input type="text" placeholder="Type Your Destination" />
                  </div>
                  <ul className="option-list-destination">
                    <li>
                      <div className="destination">
                        <h6>Bali Paradaise</h6>
                        <span>Indonesia</span>
                      </div>
                      <div className="tour">
                        <span>50 <br /> Tour</span>
                      </div>
                    </li>
                    <li>
                      <div className="destination">
                        <h6>Kolkata</h6>
                        <span>West Bengal</span>
                      </div>
                      <div className="tour">
                        <span>50 <br /> Tour</span>
                      </div>
                    </li>
                    <li>
                      <div className="destination">
                        <h6>POKHARA</h6>
                        <span>Nepal</span>
                      </div>
                      <div className="tour">
                        <span>30 <br /> Tour</span>
                      </div>
                    </li>
                    <li>
                      <div className="destination">
                        <h6>Himachal</h6>
                        <span>India</span>
                      </div>
                      <div className="tour">
                        <span>30 <br /> Tour</span>
                      </div>
                    </li>
                    <li>
                      <div className="destination">
                        <h6>Sao Paulo</h6>
                        <span>Brazil</span>
                      </div>
                      <div className="tour">
                        <span>20 <br /> Tour</span>
                      </div>
                    </li>
                    <li>
                      <div className="destination">
                        <h6>Bangkok</h6>
                        <span>Thailand</span>
                      </div>
                      <div className="tour">
                        <span>40 <br /> Tour</span>
                      </div>
                    </li>
                    <li>
                      <div className="destination">
                        <h6>Barcelona</h6>
                        <span>Spain</span>
                      </div>
                      <div className="tour">
                        <span>20 <br /> Tour</span>
                      </div>
                    </li>
                    <li>
                      <div className="destination">
                        <h6>Burj Khalifa</h6>
                        <span>Dubai</span>
                      </div>
                      <div className="tour">
                        <span>35 <br /> Tour</span>
                      </div>
                    </li>
                    <li>
                      <div className="destination">
                        <h6>New York</h6>
                        <span>United States</span>
                      </div>
                      <div className="tour">
                        <span>45 <br /> Tour</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="single-search-box" style={{ border: "none" }}>
                <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <path d="M19.3024 4.186H10C9.81501 4.186 9.63755 4.1125 9.50671 3.98166C9.37587 3.85082 9.30237 3.67336 9.30237 3.48833C9.30237 3.30329 9.37587 3.12583 9.50671 2.99499C9.63755 2.86415 9.81501 2.79065 10 2.79065H19.3024C19.4874 2.79065 19.6649 2.86415 19.7957 2.99499C19.9266 3.12583 20.0001 3.30329 20.0001 3.48833C20.0001 3.67336 19.9266 3.85082 19.7957 3.98166C19.6649 4.1125 19.4874 4.186 19.3024 4.186ZM17.4419 7.90695H10C9.81501 7.90695 9.63755 7.83344 9.50671 7.7026C9.37587 7.57176 9.30237 7.39431 9.30237 7.20927C9.30237 7.02424 9.37587 6.84678 9.50671 6.71594C9.63755 6.5851 9.81501 6.5116 10 6.5116H17.4419C17.627 6.5116 17.8044 6.5851 17.9353 6.71594C18.0661 6.84678 18.1396 7.02424 18.1396 7.20927C18.1396 7.39431 18.0661 7.57176 17.9353 7.7026C17.8044 7.83344 17.627 7.90695 17.4419 7.90695ZM19.3024 13.4884H10C9.81501 13.4884 9.63755 13.4149 9.50671 13.284C9.37587 13.1532 9.30237 12.9757 9.30237 12.7907C9.30237 12.6057 9.37587 12.4282 9.50671 12.2974C9.63755 12.1665 9.81501 12.093 10 12.093H19.3024C19.4874 12.093 19.6649 12.1665 19.7957 12.2974C19.9266 12.4282 20.0001 12.6057 20.0001 12.7907C20.0001 12.9757 19.9266 13.1532 19.7957 13.284C19.6649 13.4149 19.4874 13.4884 19.3024 13.4884ZM17.4419 17.2093H10C9.81501 17.2093 9.63755 17.1358 9.50671 17.005C9.37587 16.8741 9.30237 16.6967 9.30237 16.5116C9.30237 16.3266 9.37587 16.1491 9.50671 16.0183C9.63755 15.8875 9.81501 15.814 10 15.814H17.4419C17.627 15.814 17.8044 15.8875 17.9353 16.0183C18.0661 16.1491 18.1396 16.3266 18.1396 16.5116C18.1396 16.6967 18.0661 16.8741 17.9353 17.005C17.8044 17.1358 17.627 17.2093 17.4419 17.2093Z"></path>
                    <path d="M3.48826 8.83719C5.41485 8.83719 6.97665 7.27538 6.97665 5.3488C6.97665 3.42222 5.41485 1.86041 3.48826 1.86041C1.56168 1.86041 -0.00012207 3.42222 -0.00012207 5.3488C-0.00012207 7.27538 1.56168 8.83719 3.48826 8.83719Z"></path>
                    <path d="M3.48826 18.1396C5.41485 18.1396 6.97665 16.5778 6.97665 14.6512C6.97665 12.7246 5.41485 11.1628 3.48826 11.1628C1.56168 11.1628 -0.00012207 12.7246 -0.00012207 14.6512C-0.00012207 16.5778 1.56168 18.1396 3.48826 18.1396Z"></path>
                  </g>
                </svg>
                <div className="custom-select-dropdown">
                  <input type="text" value="Family Tour" />
                  <span>Category</span>
                </div>
                <div className="custom-select-wrap two">
                  <ul className="option-list">
                    <li className="single-item">
                      <h6>Family Tour</h6>
                    </li>
                    <li className="single-item">
                      <h6>Honeymoon Tour</h6>
                    </li>
                    <li className="single-item">
                      <h6>Group Tour</h6>
                    </li>
                    <li className="single-item">
                      <h6>Adventure Tour</h6>
                    </li>
                    <li className="single-item">
                      <h6>Solo Tour</h6>
                    </li>
                  </ul>
                </div>
              </div>
              <button type="submit" style={{ width: "300px", borderRadius: "0px 10px 10px 0px" }} className="primary-btn1">
                <span>
                  <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                    <g>
                      <path d="M17.7799 16.746L14.6861 13.7226L14.6137 13.6126C14.4774 13.4781 14.2936 13.4028 14.1022 13.4028C13.9107 13.4028 13.7269 13.4781 13.5906 13.6126C10.9613 16.0246 6.91095 16.1554 4.12376 13.9188C1.33658 11.6821 0.680209 7.7696 2.58814 4.77921C4.49607 1.78882 8.37732 0.64519 11.6585 2.10734C14.9396 3.56949 16.5993 7.18566 15.539 10.555C15.5016 10.675 15.4972 10.8029 15.5262 10.9251C15.5552 11.0474 15.6166 11.1597 15.7039 11.2501C15.7921 11.3421 15.9027 11.4097 16.0248 11.4463C16.1469 11.4829 16.2764 11.4872 16.4007 11.4589C16.5243 11.4317 16.6387 11.3725 16.7323 11.2872C16.8258 11.202 16.8954 11.0936 16.934 10.973C18.1996 6.97472 16.2878 2.6716 12.434 0.848041C8.58017 -0.975514 3.94271 0.225775 1.52009 3.67706C-0.902526 7.12835 -0.382565 11.7918 2.74388 14.6518C5.87033 17.5118 10.6646 17.7083 14.0273 15.1173L16.7667 17.7955C16.9042 17.9276 17.0875 18.0014 17.2782 18.0014C17.4689 18.0014 17.6522 17.9276 17.7897 17.7955C17.8568 17.7298 17.9101 17.6513 17.9465 17.5648C17.9829 17.4782 18.0016 17.3852 18.0016 17.2913C18.0016 17.1974 17.9829 17.1045 17.9465 17.0179C17.9101 16.9313 17.8568 16.8529 17.7897 16.7872L17.7799 16.746Z"></path>
                    </g>
                  </svg>
                  SEARCH
                </span>
                <span>
                  <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                    <g>
                      <path d="M17.7799 16.746L14.6861 13.7226L14.6137 13.6126C14.4774 13.4781 14.2936 13.4028 14.1022 13.4028C13.9107 13.4028 13.7269 13.4781 13.5906 13.6126C10.9613 16.0246 6.91095 16.1554 4.12376 13.9188C1.33658 11.6821 0.680209 7.7696 2.58814 4.77921C4.49607 1.78882 8.37732 0.64519 11.6585 2.10734C14.9396 3.56949 16.5993 7.18566 15.539 10.555C15.5016 10.675 15.4972 10.8029 15.5262 10.9251C15.5552 11.0474 15.6166 11.1597 15.7039 11.2501C15.7921 11.3421 15.9027 11.4097 16.0248 11.4463C16.1469 11.4829 16.2764 11.4872 16.4007 11.4589C16.5243 11.4317 16.6387 11.3725 16.7323 11.2872C16.8258 11.202 16.8954 11.0936 16.934 10.973C18.1996 6.97472 16.2878 2.6716 12.434 0.848041C8.58017 -0.975514 3.94271 0.225775 1.52009 3.67706C-0.902526 7.12835 -0.382565 11.7918 2.74388 14.6518C5.87033 17.5118 10.6646 17.7083 14.0273 15.1173L16.7667 17.7955C16.9042 17.9276 17.0875 18.0014 17.2782 18.0014C17.4689 18.0014 17.6522 17.9276 17.7897 17.7955C17.8568 17.7298 17.9101 17.6513 17.9465 17.5648C17.9829 17.4782 18.0016 17.3852 18.0016 17.2913C18.0016 17.1974 17.9829 17.1045 17.9465 17.0179C17.9101 16.9313 17.8568 16.8529 17.7897 16.7872L17.7799 16.746Z"></path>
                    </g>
                  </svg>
                  SEARCH
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="destination-page package-head-card pt-80 mb-100 mt-5">
        <div className="container">
          <div className="row gy-md-5 gy-4">
            <div className="col-lg-3 col-md-4 col-sm-6 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms" style={{ visibility: "visible", animationDuration: "1500ms", animationDelay: "200ms" }}>
              <div className="destination-card2 position-relative">
                <a href="destination-details.html" className="destination-img">
                  <img src="assets/img/home2/destination-img1.jpg" alt="" />
                </a>
                <div className="destination-content position-absolute bottom-0">
                  <h5><a href="destination-details.html">Great Wall of China</a></h5>
                  <p className='text-start'>View More <i className="fa-solid fa-arrow-right"></i></p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 wow animate fadeInDown" data-wow-delay="400ms" data-wow-duration="1500ms" style={{ visibility: "visible", animationDuration: "1500ms", animationDelay: "400ms" }}>
              <div className="destination-card2 position-relative">
                <a href="destination-details.html" className="destination-img">
                  <img src="assets/img/home2/destination-img2.jpg" alt="" />
                </a>
                <div className="destination-content position-absolute bottom-0">
                  <h5><a href="destination-details.html">Rome, Itlay</a></h5>
                  <p className='text-start'>View More <i className="fa-solid fa-arrow-right"></i></p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 wow animate fadeInDown" data-wow-delay="600ms" data-wow-duration="1500ms" style={{ visibility: "visible", animationDuration: "1500ms", animationDelay: "600ms" }}>
              <div className="destination-card2 position-relative">
                <a href="destination-details.html" className="destination-img">
                  <img src="assets/img/home2/destination-img3.jpg" alt="" />
                </a>
                <div className="destination-content position-absolute bottom-0">
                  <h5><a href="destination-details.html">Machu Picchu of Peru</a></h5>
                  <p className='text-start'>View More <i className="fa-solid fa-arrow-right"></i></p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 wow animate fadeInDown" data-wow-delay="800ms" data-wow-duration="1500ms" style={{ visibility: "visible", animationDuration: "1500ms", animationDelay: "800ms" }}>
              <div className="destination-card2 position-relative">
                <a href="destination-details.html" className="destination-img">
                  <img src="assets/img/home2/destination-img4.jpg" alt="" />
                </a>
                <div className="destination-content position-absolute bottom-0">
                  <h5><a href="destination-details.html">Great Temple Jordan</a></h5>
                  <p className='text-start'>View More <i className="fa-solid fa-arrow-right"></i></p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 wow animate fadeInDown animated" data-wow-delay="800ms" data-wow-duration="1500ms" style={{ visibility: "visible", animationDuration: "1500ms", animationDelay: "800ms" }}>
              <div className="destination-card2 position-relative">
                <a href="destination-details.html" className="destination-img">
                  <img src="assets/img/home2/destination-img5.jpg" alt="" />
                </a>
                <div className="destination-content position-absolute bottom-0">
                  <h5><a href="destination-details.html">Athens Greece</a></h5>
                  <p className='text-start'>View More <i className="fa-solid fa-arrow-right"></i></p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 wow animate fadeInDown animated" data-wow-delay="600ms" data-wow-duration="1500ms" style={{ visibility: "visible", animationDuration: "1500ms", animationDelay: "600ms" }}>
              <div className="destination-card2 position-relative">
                <a href="destination-details.html" className="destination-img">
                  <img src="assets/img/home2/destination-img6.jpg" alt="" />
                </a>
                <div className="destination-content position-absolute bottom-0">
                  <h5><a href="destination-details.html">Switzerland</a></h5>
                  <p className='text-start'>View More <i className="fa-solid fa-arrow-right"></i></p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 wow animate fadeInDown animated" data-wow-delay="400ms" data-wow-duration="1500ms" style={{ visibility: "visible", animationDuration: "1500ms", animationDelay: "400ms" }}>
              <div className="destination-card2 position-relative">
                <a href="destination-details.html" className="destination-img">
                  <img src="assets/img/home2/destination-img7.jpg" alt="" />
                </a>
                <div className="destination-content position-absolute bottom-0">
                  <h5><a href="destination-details.html">Norway</a></h5>
                  <p className='text-start'>View More <i className="fa-solid fa-arrow-right"></i></p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 wow animate fadeInDown animated" data-wow-delay="200ms" data-wow-duration="1500ms" style={{ visibility: "visible", animationDuration: "1500ms", animationDelay: "200ms" }}>
              <div className="destination-card2 position-relative">
                <a href="destination-details.html" className="destination-img">
                  <img src="assets/img/home2/destination-img8.jpg" alt="" />
                </a>
                <div className="destination-content position-absolute bottom-0">
                  <h5><a href="destination-details.html">Paris, France</a></h5>
                  <p className='text-start'>View More <i className="fa-solid fa-arrow-right"></i></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="home3-about-section">
        <div className="container">
          <div className="about-wrapper">
            <div className="row align-items-center justify-content-between">
              <div className="col-xl-6 col-lg-7 wow animate fadeInLeft" data-wow-delay="200ms" data-wow-duration="1500ms" style={{ visibility: "visible", animationDuration: "1500ms", animationDelay: "200ms"}}>
                <div className="about-content">
                  <div className="section-title">
                    <h2>Why We’re Best Agency</h2>
                    <h4>Welcome to Delta Safari Travel Agency – Your Gateway to Unforgettable Journeys!</h4>
                    <p>Delta Safari Travel Agency is a trusted name in the travel industry, offering seamless travel planning, personalized itineraries, and unforgettable adventures. With years of experience and a network of global partners, we ensure a hassle-free and memorable journey for every traveler.</p>
                    <a href="/" className='btn btn-primary p-4 gap-2' style={{width: "fit-content", color: "#fff"}}>
                      Get your custom package
                      <svg width="10" height="10" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg" style={{ stroke: "#fff !important"}}>
                        <path d="M1 9L9 1M9 1C7.22222 1.33333 3.33333 2 1 1M9 1C8.66667 2.66667 8 6.33333 9 9" strokeWidth="1.5" strokeLinecap="round"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-5 d-lg-block d-none wow animate fadeInRight" data-wow-delay="200ms" data-wow-duration="1500ms" style={{ visibility: "visible", animationDuration: "1500ms", animationDelay: "200ms"}}>
                <div className="about-img">
                  <img src="assets/img/home3/about-img.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="destination-dt-travel-season-section mb-50" id="scroll-section">
        <div className="container">
          <h2 className='mt-4 mb-3'>Book your Destinations</h2>
          <div className="row g-1">
            {hotelCities.map((city, index) => {
              return <div key={index} className="col-6 col-md-6 col-lg-4 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms" style={{ visibility: "visible", animationDuration: "1500ms", animationDelay: "200ms" }}>
                <div className="hotel-card row m-2">
                  <div className="hotel-img-wrap p-0 col-md-5">
                    <a href="/" className="hotel-img">
                      <img src={city.image} alt={city.name} style={{ height: "90px", width: "100%" }} />
                    </a>
                  </div>
                  <div className="hotel-content col-md-7 pb-0 pt-2">
                    <div className="location-area flex-column mb-0 gap-1">
                      <div className="location w-100 mb-2">
                        <svg width="25" height="25" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6.83615 0C3.77766 0 1.28891 2.48879 1.28891 5.54892C1.28891 7.93837 4.6241 11.8351 6.05811 13.3994C6.25669 13.6175 6.54154 13.7411 6.83615 13.7411C7.13076 13.7411 7.41561 13.6175 7.6142 13.3994C9.04821 11.8351 12.3834 7.93833 12.3834 5.54892C12.3834 2.48879 9.89464 0 6.83615 0ZM7.31469 13.1243C7.18936 13.2594 7.02008 13.3342 6.83615 13.3342C6.65222 13.3342 6.48295 13.2594 6.35761 13.1243C4.95614 11.5959 1.69584 7.79515 1.69584 5.54896C1.69584 2.7134 4.00067 0.406933 6.83615 0.406933C9.67164 0.406933 11.9765 2.7134 11.9765 5.54896C11.9765 7.79515 8.71617 11.5959 7.31469 13.1243Z"></path>
                          <path d="M6.83618 8.54554C8.4624 8.54554 9.7807 7.22723 9.7807 5.60102C9.7807 3.9748 8.4624 2.65649 6.83618 2.65649C5.20997 2.65649 3.89166 3.9748 3.89166 5.60102C3.89166 7.22723 5.20997 8.54554 6.83618 8.54554Z"></path>
                        </svg>
                        <a style={{ fontSize: "19px" }} href="/">{city.name}</a>
                      </div>
                      <ul className="hotel-feature-list mb-0">
                        {/* {city.categories.map((cat, index) => {
                                                    return <li key={index}>
                                                        <a>{cat}</a>
                                                    </li>
                                                })} */}
                        <li>
                          <span>Best Packages</span>
                        </li>
                        <li>
                          <span>Affortable Packages</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            })};
          </div>
          <div className="btn-and-price-area mt-4 d-flex justify-content-center">
            <a href="hotel-details.html" className="primary-btn1">
              <span>
                View More
                <svg width="10" height="10" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.73535 1.14746C9.57033 1.97255 9.32924 3.26406 9.24902 4.66797C9.16817 6.08312 9.25559 7.5453 9.70214 8.73633C9.84754 9.12406 9.65129 9.55659 9.26367 9.70215C8.9001 9.83849 8.4969 9.67455 8.32812 9.33398L8.29785 9.26367L8.19921 8.98438C7.73487 7.5758 7.67054 5.98959 7.75097 4.58203C7.77875 4.09598 7.82525 3.62422 7.87988 3.17969L1.53027 9.53027C1.23738 9.82317 0.762615 9.82317 0.469722 9.53027C0.176829 9.23738 0.176829 8.76262 0.469722 8.46973L6.83593 2.10254C6.3319 2.16472 5.79596 2.21841 5.25 2.24902C3.8302 2.32862 2.2474 2.26906 0.958003 1.79102L0.704097 1.68945L0.635738 1.65527C0.303274 1.47099 0.157578 1.06102 0.310542 0.704102C0.463655 0.347333 0.860941 0.170391 1.22363 0.28418L1.29589 0.310547L1.48828 0.387695C2.47399 0.751207 3.79966 0.827571 5.16601 0.750977C6.60111 0.670504 7.97842 0.428235 8.86132 0.262695L9.95312 0.0585938L9.73535 1.14746Z"></path>
                </svg>
              </span>
              <span>
                View More
                <svg width="10" height="10" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.73535 1.14746C9.57033 1.97255 9.32924 3.26406 9.24902 4.66797C9.16817 6.08312 9.25559 7.5453 9.70214 8.73633C9.84754 9.12406 9.65129 9.55659 9.26367 9.70215C8.9001 9.83849 8.4969 9.67455 8.32812 9.33398L8.29785 9.26367L8.19921 8.98438C7.73487 7.5758 7.67054 5.98959 7.75097 4.58203C7.77875 4.09598 7.82525 3.62422 7.87988 3.17969L1.53027 9.53027C1.23738 9.82317 0.762615 9.82317 0.469722 9.53027C0.176829 9.23738 0.176829 8.76262 0.469722 8.46973L6.83593 2.10254C6.3319 2.16472 5.79596 2.21841 5.25 2.24902C3.8302 2.32862 2.2474 2.26906 0.958003 1.79102L0.704097 1.68945L0.635738 1.65527C0.303274 1.47099 0.157578 1.06102 0.310542 0.704102C0.463655 0.347333 0.860941 0.170391 1.22363 0.28418L1.29589 0.310547L1.48828 0.387695C2.47399 0.751207 3.79966 0.827571 5.16601 0.750977C6.60111 0.670504 7.97842 0.428235 8.86132 0.262695L9.95312 0.0585938L9.73535 1.14746Z"></path>
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
      <div class="counter-section three mb-100">
        <div class="container">
            <div class="counter-wrapper">
                <div class="row gy-md-5 gy-4">
                    <div class="col-lg-3 col-sm-6 divider">
                        <div class="single-counter">
                            <div class="icon">
                                <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                                    <g>
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M35.1966 14.0534C33.8857 15.335 35.766 18.0985 32.8457 19.8988C31.163 20.9363 33.7846 23.0083 32.8457 25.4319C32.71 25.7821 32.6822 26.1354 32.8773 26.5159C30.5771 28.2863 27.6959 29.3391 24.5687 29.3391C23.7375 29.3391 22.9237 29.2647 22.1336 29.1222L21.8303 30.1785C22.7333 30.3481 23.65 30.4332 24.5688 30.4329C32.7027 30.4329 39.2969 23.8387 39.2969 15.7048C39.2969 7.57078 32.7027 0.976562 24.5687 0.976562C21.3909 0.976562 18.3189 1.99375 15.7737 3.89172C17.6817 6.83133 17.6435 10.6945 15.6768 13.5961C16.4166 14.8922 17.48 14.9306 17.8917 15.091C19.4605 15.7026 20.6402 19.327 21.6223 20.4914C23.0257 19.6812 24.5496 19.4225 26.1246 19.9163C25.8647 18.6391 24.3696 17.1974 23.915 16.7966C22.2954 15.3688 22.9755 14.6734 24.2509 14.3203C25.7184 13.914 27.9738 13.9606 28.4207 13.8655C29.4674 13.6428 29.769 12.9067 28.9684 12.2127C28.0286 11.3982 26.383 10.502 25.9999 9.77289C25.4703 8.76453 25.855 8.46367 26.5383 8.25234C27.9267 7.82297 30.5473 7.7625 29.2365 2.89047C33.8039 4.55453 37.168 8.55633 38.0013 13.3565C36.474 13.3478 35.6469 13.6131 35.1966 14.0534ZM5.7618 33.1994L1.25 29.5201L2.89703 28.428L7.30883 30.018L22.4759 21.2613C24.9906 19.8095 29.9753 21.7883 25.2034 24.5434L21.7355 26.5456L18.5105 37.7772L16.352 39.0234L16.5029 29.5227C16.5029 29.5227 7.45062 34.5123 5.7618 33.1994ZM8.3975 0.976562C12.6468 0.976562 16.0919 4.42156 16.0919 8.67094C16.0919 12.9203 12.6469 16.3653 8.3975 16.3653C4.1482 16.3653 0.703125 12.9202 0.703125 8.67094C0.703125 4.42164 4.1482 0.976562 8.3975 0.976562ZM3.70508 13.313C4.02734 11.0097 6.00547 9.2368 8.39758 9.2368C10.7898 9.2368 12.7676 11.0096 13.0898 13.313C14.2695 12.1207 14.998 10.4809 14.998 8.67094C14.998 5.02539 12.043 2.07031 8.39742 2.07031C4.75195 2.07031 1.79688 5.02539 1.79688 8.67094C1.79688 10.4809 2.52547 12.1206 3.70508 13.313ZM6.2075 5.78453C6.2075 6.99414 7.18805 7.97469 8.39766 7.97469C9.60727 7.97469 10.5878 6.99414 10.5878 5.78453C10.5878 4.57523 9.60727 3.59469 8.39766 3.59469C7.18805 3.59477 6.2075 4.57523 6.2075 5.78453ZM7.18609 23.1477L9.34461 21.9014L16.2167 23.6122L12.1948 25.9342L7.18609 23.1477ZM12.2191 21.4898C11.5646 20.0952 11.1529 18.5991 11.0016 17.0659C10.6499 17.1749 10.2917 17.2615 9.92906 17.3254C10.0726 18.6399 10.3935 19.9289 10.8832 21.1573L12.2191 21.4898Z"></path>
                                    </g>
                                </svg>
                            </div>
                            <div class="content">
                                <div class="number">
                                    <h2 class="counter">25</h2>
                                    <span>K+</span>
                                </div>
                                <span>Tour Completed</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-sm-6 divider d-flex justify-content-lg-center">
                        <div class="single-counter">
                            <div class="icon orange">
                                <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M31.2455 23.2699V20.3215H31.6986C33.1326 20.3215 34.2971 19.1571 34.2971 17.7288C34.2971 16.2949 33.1326 15.1304 31.6986 15.1304H26.9722V10.6621H32.9434C33.2647 10.6621 33.517 10.4096 33.517 10.0885C33.5173 10.0131 33.5026 9.93836 33.4739 9.86865C33.4451 9.79894 33.4029 9.7356 33.3496 9.68229C33.2963 9.62897 33.2329 9.58673 33.1632 9.558C33.0935 9.52927 33.0188 9.51461 32.9434 9.51486H28.4062C28.1079 5.12682 24.4541 1.64502 19.9858 1.64502C16.2631 1.64502 13.0165 4.03119 11.9151 7.58752C11.5882 8.64299 12.0413 9.77291 13.0165 10.3351V15.1304H8.28997C7.94852 15.1296 7.61028 15.1963 7.29467 15.3266C6.97906 15.4569 6.6923 15.6483 6.45085 15.8897C6.20941 16.1312 6.01804 16.4179 5.88773 16.7335C5.75743 17.0492 5.69075 17.3874 5.69153 17.7288C5.69153 19.1571 6.85591 20.3215 8.28997 20.3215H8.74317V23.2699C5.69161 24.7899 3.7356 27.916 3.7356 31.3519V35.2008C3.7356 36.9388 5.15239 38.3556 6.89044 38.3556H33.1098C34.8479 38.3556 36.2647 36.9388 36.2647 35.2008V31.3519C36.2646 27.916 34.3029 24.7899 31.2455 23.2699ZM14.1636 10.6621H25.825V15.3484C25.825 16.9372 24.15 19.1571 21.2247 21.44C20.874 21.7159 20.4406 21.8659 19.9943 21.8659C19.5481 21.8659 19.1147 21.7159 18.764 21.44C18.0756 20.9066 17.2095 20.1724 16.4065 19.3463L16.4007 19.3406C15.2018 18.1017 14.1636 16.6562 14.1636 15.3484V10.6621ZM22.2572 22.0882V23.832C22.2572 25.0824 21.2418 26.0977 19.9972 26.0977C18.718 26.0977 17.7315 25.0595 17.7315 23.832V22.0825C19.3318 23.3674 20.7773 23.2756 22.2572 22.0882ZM10.441 37.2084H6.89036C5.78333 37.2084 4.88278 36.3078 4.88278 35.2008V31.3519C4.88278 28.0135 7.02231 24.876 10.441 23.8205V37.2084ZM28.4004 37.2084H11.5882V23.5624C11.9725 23.505 12.3683 23.4649 12.7698 23.4649H16.5843V23.832C16.5843 25.6904 18.0814 27.2449 19.9972 27.2449C21.8786 27.2449 23.4044 25.7134 23.4044 23.832V23.4649H27.2246C27.6261 23.4649 28.0161 23.505 28.4004 23.5624V37.2084ZM35.1173 35.2008C35.1173 36.3078 34.2168 37.2084 33.1097 37.2084H29.5476V23.8205C32.9319 24.8645 35.1173 27.9677 35.1173 31.3519V35.2008Z"></path>
                                </svg>
                            </div>
                            <div class="content">
                                <div class="number">
                                    <h2 class="counter">11</h2>
                                    <span>+</span>
                                </div>
                                <span>Travel Experience</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-sm-6 divider d-flex justify-content-lg-center">
                        <div class="single-counter">
                            <div class="icon blue">
                                <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M33.807 14.7236C34.1149 14.7236 34.4055 14.5816 34.5951 14.3389C34.7845 14.0963 34.8522 13.7801 34.7777 13.4814L33.5218 8.45996C33.4104 8.01501 33.0108 7.70316 32.5521 7.70312H7.44759C6.98894 7.70325 6.58924 8.01505 6.47786 8.45996L5.22298 13.4814C5.14839 13.7801 5.21519 14.0962 5.40462 14.3389C5.59413 14.5816 5.88477 14.7236 6.19271 14.7236H33.807ZM8.22884 9.70312H31.7708L32.5267 12.7236H7.47298L8.22884 9.70312Z"></path>
                                    <g>
                                        <path d="M32.5523 9.70312L32.6666 9.69629C32.9311 9.66579 33.1746 9.5307 33.3404 9.31836C33.5297 9.07576 33.5966 8.7595 33.5221 8.46094V8.45898C33.5218 8.45808 33.5215 8.45677 33.5211 8.45508C33.5201 8.45119 33.5181 8.4451 33.5162 8.4375C33.5124 8.42222 33.5069 8.3994 33.4996 8.37012C33.485 8.31155 33.4638 8.2261 33.4371 8.11914C33.3836 7.90517 33.308 7.60465 33.2213 7.25781C33.0478 6.56387 32.8279 5.68486 32.6431 4.94531V4.94434C32.4848 4.31231 32.1538 3.73685 31.6871 3.28223C31.2202 2.82757 30.6357 2.51167 29.9996 2.37012C28.4597 2.02776 26.0134 1.48428 23.9527 1.02637C22.9225 0.797444 21.9885 0.589755 21.3121 0.439453C20.9741 0.364352 20.7006 0.302796 20.5113 0.260742C20.4167 0.239712 20.3424 0.223966 20.2926 0.212891C20.2677 0.207377 20.2487 0.203026 20.2359 0.200195C20.2296 0.198795 20.2245 0.197978 20.2213 0.197266C20.22 0.196986 20.2191 0.196454 20.2183 0.196289H20.2174V0.195312L19.9996 1.17188L20.2164 0.195312C20.0737 0.163681 19.9255 0.163608 19.7828 0.195312V0.196289H19.7818C19.781 0.19647 19.7795 0.196909 19.7779 0.197266C19.7747 0.197983 19.7695 0.198819 19.7633 0.200195C19.7505 0.203033 19.7313 0.207414 19.7066 0.212891C19.6568 0.223964 19.5833 0.239766 19.4888 0.260742C19.2996 0.302802 19.0253 0.364299 18.6871 0.439453C18.0106 0.589764 17.0765 0.797469 16.0465 1.02637C13.9859 1.48426 11.5404 2.02777 10.0006 2.37012C9.3644 2.51166 8.77998 2.82754 8.31307 3.28223C7.84622 3.73689 7.51439 4.31221 7.35604 4.94434V4.94531C7.17126 5.68483 6.95232 6.56392 6.77889 7.25781C6.6922 7.60465 6.61655 7.90516 6.56307 8.11914C6.53634 8.22605 6.51521 8.31155 6.50057 8.37012C6.49325 8.3994 6.48778 8.42222 6.48397 8.4375C6.48206 8.44514 6.48006 8.45118 6.47908 8.45508C6.47866 8.45676 6.47834 8.45807 6.47811 8.45898V8.46094C6.40352 8.75959 6.47032 9.07571 6.65975 9.31836C6.84925 9.56107 7.1399 9.70312 7.44783 9.70312H32.5523ZM9.29647 5.43066C9.36464 5.15852 9.50758 4.91057 9.70858 4.71484C9.90944 4.51927 10.1605 4.38324 10.4342 4.32227C11.9738 3.97996 14.4195 3.43641 16.4801 2.97852C17.5104 2.74956 18.4452 2.54192 19.1217 2.3916C19.4596 2.31652 19.7332 2.25591 19.9224 2.21387C19.9498 2.2078 19.9758 2.20254 19.9996 2.19727C20.0234 2.20257 20.0493 2.20776 20.0767 2.21387C20.266 2.25593 20.5402 2.31644 20.8785 2.3916C21.555 2.54191 22.4889 2.74959 23.5191 2.97852C25.5797 3.4364 28.0252 3.97993 29.565 4.32227C29.8389 4.3832 30.0906 4.51911 30.2916 4.71484C30.4923 4.91038 30.6345 5.15789 30.7027 5.42969L31.2711 7.70312H8.72811C8.89992 7.01569 9.11516 6.15629 9.29647 5.43066Z"></path>
                                        <path d="M29.414 22.2549C32.009 22.2549 33.3588 21.5394 34.5917 20.8818C35.7122 20.2843 36.7162 19.7441 38.8281 19.7441C39.2325 19.7441 39.5971 19.5006 39.7519 19.127C39.9066 18.7533 39.8211 18.3231 39.5351 18.0371L34.5146 13.0166C34.3272 12.8292 34.0726 12.7238 33.8076 12.7236H6.19232C5.92722 12.7237 5.67275 12.8291 5.48529 13.0166L0.464781 18.0371C0.178812 18.3231 0.0932664 18.7533 0.247984 19.127C0.402765 19.5006 0.76735 19.7441 1.17181 19.7441C3.2837 19.7441 4.28768 20.2842 5.40814 20.8818C6.64113 21.5394 7.99084 22.2549 10.5859 22.2549C13.1809 22.2549 14.5306 21.5394 15.7636 20.8818C16.8841 20.2843 17.8881 19.7441 19.9999 19.7441C22.1118 19.7442 23.1158 20.2842 24.2363 20.8818C25.4693 21.5394 26.819 22.2549 29.414 22.2549ZM29.414 20.2549C27.3021 20.2549 26.2982 19.7148 25.1777 19.1172C23.9447 18.4596 22.5949 17.7442 19.9999 17.7441C17.4049 17.7441 16.0552 18.4596 14.8222 19.1172C13.7017 19.7148 12.6978 20.2549 10.5859 20.2549C8.47392 20.2549 7.47004 19.7148 6.34955 19.1172C5.52404 18.6769 4.6457 18.2131 3.37689 17.9531L6.60638 14.7236H33.3925L36.622 17.9531C35.3537 18.2132 34.4756 18.677 33.6503 19.1172C32.5298 19.7148 31.5259 20.2549 29.414 20.2549Z"></path>
                                        <path d="M19.9994 39.8271C20.7113 39.8273 21.4074 39.6171 21.9994 39.2217C22.5913 38.8262 23.0532 38.2641 23.3256 37.6064L23.4183 37.3564C23.6126 36.7678 23.6521 36.1373 23.5306 35.5264C23.3918 34.8282 23.0486 34.1869 22.5453 33.6836L21.4135 32.5527L32.2064 21.7598C32.5969 21.3693 32.5969 20.7362 32.2064 20.3457C31.8404 19.9797 31.2613 19.9563 30.8685 20.2764L30.7924 20.3457L19.9994 31.1387L9.2074 20.3457C8.81687 19.9552 8.18386 19.9552 7.79333 20.3457C7.4029 20.7362 7.40284 21.3693 7.79333 21.7598L18.5853 32.5527L17.4545 33.6836C16.9511 34.1869 16.608 34.8282 16.4691 35.5264C16.3302 36.2246 16.4017 36.9487 16.6742 37.6064C16.9466 38.2641 17.4085 38.8262 18.0004 39.2217C18.5921 39.617 19.2877 39.8272 19.9994 39.8271ZM19.9994 37.8281C19.6831 37.8281 19.3737 37.7343 19.1107 37.5586C18.8807 37.4048 18.6955 37.1942 18.5717 36.9482L18.5219 36.8408C18.4008 36.5487 18.3694 36.2271 18.431 35.917C18.4927 35.6068 18.6449 35.3213 18.8685 35.0977L19.9994 33.9668L21.1312 35.0977C21.3548 35.3212 21.507 35.606 21.5687 35.916C21.6227 36.1874 21.6052 36.468 21.5189 36.7295L21.4779 36.8408C21.3569 37.133 21.1519 37.3829 20.889 37.5586C20.6261 37.7343 20.3166 37.8281 20.0004 37.8281H19.9994Z"></path>
                                    </g>
                                </svg>
                            </div>
                            <div class="content">
                                <div class="number">
                                    <h2 class="counter">19</h2>
                                    <span>+</span>
                                </div>
                                <span>Happy Traveler</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-sm-6 d-flex justify-content-lg-end">
                        <div class="single-counter">
                            <div class="icon green">
                                <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.8103 12.7792C16.8338 12.7695 17.3916 12.5363 17.6746 12.881C17.7321 12.9515 17.803 13.0099 17.8831 13.0529C17.9633 13.0959 18.0512 13.1225 18.1417 13.1314C18.2323 13.1402 18.3236 13.131 18.4106 13.1043C18.4976 13.0776 18.5784 13.0339 18.6483 12.9758C18.7901 12.8593 18.8798 12.6913 18.8977 12.5087C18.9156 12.3261 18.8602 12.1439 18.7438 12.0021C17.9784 11.0699 16.7743 11.2754 16.2463 11.5149C16.0805 11.59 15.9512 11.7276 15.8866 11.8977C15.822 12.0679 15.8274 12.2567 15.9016 12.4228C16.0539 12.7716 16.4622 12.9287 16.8103 12.7792ZM21.7902 13.1343C21.8925 13.1344 21.9936 13.1118 22.0861 13.0681C22.1786 13.0244 22.2603 12.9608 22.3252 12.8817C22.6054 12.5405 23.1522 12.764 23.1888 12.7799C23.3553 12.8485 23.5418 12.8495 23.709 12.7828C23.8762 12.7161 24.0108 12.5868 24.0842 12.4225C24.1577 12.2582 24.1642 12.0718 24.1025 11.9027C24.0408 11.7336 23.9156 11.5953 23.7535 11.5169C23.2248 11.2775 22.0214 11.072 21.256 12.0041C21.1728 12.1054 21.1202 12.2281 21.1041 12.3581C21.088 12.4881 21.1092 12.62 21.1652 12.7384C21.2212 12.8568 21.3097 12.9569 21.4203 13.027C21.531 13.097 21.6592 13.1342 21.7902 13.1343ZM17.5819 18.1156C17.5176 18.1798 17.4665 18.2561 17.4317 18.34C17.3969 18.424 17.379 18.514 17.379 18.6049C17.379 18.6957 17.3969 18.7857 17.4317 18.8697C17.4665 18.9536 17.5176 19.0299 17.5819 19.0941C18.2483 19.7606 19.1245 20.0941 19.9999 20.0941C20.8753 20.0941 21.7515 19.7606 22.4179 19.0941C22.4822 19.0299 22.5331 18.9536 22.5679 18.8696C22.6027 18.7857 22.6206 18.6957 22.6206 18.6049C22.6206 18.514 22.6027 18.424 22.5679 18.3401C22.5331 18.2561 22.4822 18.1798 22.4179 18.1156C22.3536 18.0513 22.2774 18.0004 22.1934 17.9656C22.1095 17.9308 22.0195 17.9129 21.9286 17.9129C21.8378 17.9129 21.7478 17.9308 21.6638 17.9656C21.5799 18.0004 21.5036 18.0513 21.4394 18.1156C21.0571 18.4964 20.5395 18.7103 19.9999 18.7103C19.4603 18.7103 18.9427 18.4964 18.5605 18.1156C18.4962 18.0513 18.42 18.0002 18.336 17.9654C18.2521 17.9306 18.1621 17.9127 18.0712 17.9127C17.9803 17.9127 17.8903 17.9306 17.8063 17.9654C17.7224 18.0002 17.6461 18.0513 17.5819 18.1156Z"></path>
                                    <path d="M36.4363 18.8368C36.0709 18.5907 35.6501 18.4391 35.2117 18.3957C34.7732 18.3522 34.3309 18.4182 33.9242 18.5877L29.4536 20.4285C28.6301 19.8126 27.6058 19.4735 26.4086 19.4112C26.6923 18.7399 26.8515 17.9994 26.8723 17.2313C26.9138 17.2382 26.9484 17.2382 26.9899 17.2382C27.7719 17.2382 29.0591 16.9199 29.4882 14.9268C30.6993 14.387 32.0072 13.5012 32.1595 12.1932C32.2771 11.0998 31.5643 10.0063 30.028 8.94059C29.9242 8.87831 29.8481 8.80911 29.7789 8.72606C29.6612 8.60149 29.5712 8.41464 29.509 8.18627L28.7685 4.95443C28.3671 2.58764 24.464 1.48729 21.2598 0.982098C20.4363 0.85753 19.5643 0.85753 18.7338 0.982098C15.5366 1.48729 11.6335 2.58764 11.2459 4.9129L10.4985 8.15859C10.4432 8.34544 10.367 8.60149 10.2978 8.69146C10.2909 8.69838 10.284 8.71222 10.2771 8.71914C10.2425 8.76066 10.1456 8.82987 9.97258 8.94752C8.43625 10.0063 7.72344 11.0998 7.84801 12.1932C7.99334 13.5081 9.3013 14.387 10.5124 14.9268C10.9414 16.9199 12.2286 17.2382 13.0037 17.2382C13.0522 17.2382 13.0868 17.2382 13.1283 17.2313C13.1491 17.9994 13.3082 18.7399 13.592 19.4112C12.3947 19.4735 11.3705 19.8126 10.547 20.4285L6.07638 18.5877C5.24593 18.2417 4.31167 18.3385 3.56426 18.8368C3.19907 19.0824 2.90004 19.4142 2.69363 19.8029C2.48722 20.1915 2.3798 20.6251 2.38087 21.0652V25.6673C2.38087 26.5946 2.84454 27.4389 3.62655 27.9303C4.06253 28.2071 4.5608 28.3455 5.05215 28.3455C5.44662 28.3455 5.84108 28.2624 6.21479 28.0825L8.27708 27.0998C8.31168 27.515 8.34628 27.7849 8.36012 27.8403C7.78572 28.5185 7.4051 29.3766 7.28745 30.3178L6.91375 33.3005C6.86524 33.7277 6.93978 34.1598 7.12859 34.546C7.3174 34.9322 7.61262 35.2564 7.9795 35.4804C11.9103 37.8749 15.9588 39.0998 20.0003 39.1137C24.0418 39.0998 28.0903 37.8749 32.028 35.4735C32.7754 35.0168 33.1906 34.1586 33.0799 33.2936L32.7131 30.3178C32.5955 29.3766 32.2148 28.5185 31.6405 27.8403C31.6543 27.7434 31.6958 27.4874 31.7235 27.0998L33.7858 28.0825C34.1595 28.2624 34.554 28.3455 34.9484 28.3455C35.4398 28.3455 35.938 28.2071 36.374 27.9303C37.156 27.4389 37.6197 26.5946 37.6197 25.6673V21.0652C37.6197 20.1655 37.1768 19.3351 36.4363 18.8368ZM29.1629 22.0479C30.3325 23.4251 30.4086 25.5981 30.3463 26.8022C30.3271 26.7881 30.3062 26.7765 30.284 26.7676C30.284 26.7676 24.9069 24.0687 24.5193 23.868C24.1733 23.6604 23.848 23.1552 23.5851 22.4631C24.374 22.0479 25.0591 21.4735 25.5989 20.7745H26.0003C27.3982 20.7745 28.4363 21.1967 29.1629 22.0479ZM20.7754 21.7711H19.2252C16.6231 21.7711 14.4985 19.6465 14.4985 17.0444V11.1621C15.765 10.4908 20.4363 8.42156 25.502 11.1621V17.0444C25.502 19.6465 23.3775 21.7711 20.7754 21.7711ZM23.2252 24.5669C23.156 24.8922 22.0557 25.4597 20.0003 25.4597C17.9518 25.4597 16.8515 24.8991 16.7823 24.5669C17.2044 24.1102 17.502 23.5219 17.7096 22.9545C18.1941 23.079 18.7062 23.1552 19.2252 23.1552H20.7754C21.2944 23.1552 21.8065 23.079 22.291 22.9545C22.5055 23.5219 22.81 24.1102 23.2252 24.5669ZM28.1872 14.3524C27.9657 15.8818 27.2806 15.8887 26.8861 15.8541V13.2036L27.066 13.1136C27.6335 12.8299 27.9865 12.8299 28.0764 12.8922C28.0903 12.906 28.3671 13.1205 28.1872 14.3524ZM13.1145 15.8541C12.7338 15.8887 12.0349 15.8956 11.8134 14.3524C11.6335 13.1205 11.9103 12.906 11.9241 12.8922C12.0141 12.823 12.3601 12.8299 12.9276 13.1067L13.1145 13.2036V15.8541ZM13.4466 10.1655C13.239 10.297 13.1145 10.5185 13.1145 10.7537V11.6811C12.111 11.3074 11.4743 11.5081 11.1075 11.778C10.6785 12.0894 10.4363 12.6015 10.3878 13.3074C9.68884 12.8991 9.2667 12.4493 9.22517 12.0409C9.16289 11.5081 9.7096 10.8091 10.81 10.0479C10.9622 9.94406 11.1006 9.84025 11.2252 9.71568C16.8169 6.29007 23.5712 6.30391 28.8723 9.76412C28.9899 9.87485 29.1007 9.98558 29.2391 10.0825C30.291 10.8091 30.8377 11.5081 30.7823 12.034C30.7339 12.4493 30.3117 12.8922 29.6128 13.3074C29.5574 12.6015 29.3221 12.0894 28.893 11.778C28.5263 11.5081 27.8965 11.3074 26.8861 11.6811V10.7537C26.8854 10.633 26.8531 10.5145 26.7924 10.4101C26.7317 10.3057 26.6447 10.219 26.5401 10.1586C19.8619 6.26931 13.7027 10.0063 13.4466 10.1655ZM10.8376 22.0479C11.5643 21.1967 12.6023 20.7745 14.0003 20.7745H14.4017C14.9439 21.4755 15.6307 22.0514 16.4155 22.4631C16.1664 23.1413 15.8342 23.6534 15.4812 23.868C15.1006 24.0617 9.71652 26.7676 9.71652 26.7676C9.69576 26.7745 9.675 26.7884 9.65424 26.8022C9.59196 25.605 9.66116 23.4251 10.8376 22.0479ZM10.8446 35.4597C10.1117 35.1059 9.39576 34.7179 8.69922 34.2971C8.40856 34.1171 8.24939 33.7988 8.29092 33.4666L8.6577 30.4908C8.79611 29.4043 9.43279 28.4562 10.3324 28.0064C10.6992 27.8195 11.0383 27.6465 11.3636 27.4874C10.72 29.4666 10.7684 33.4182 10.8446 35.4597ZM24.6231 36.8991L24.5401 37.1552C23.0314 37.5289 21.5159 37.7227 20.0003 37.7296C18.4916 37.7227 16.9691 37.5289 15.4605 37.1552L15.3705 36.8784C14.1733 33.5012 15.0383 28.3247 15.4674 26.2624C15.5643 25.8264 15.6266 25.5704 15.6266 25.5635C15.6404 25.5012 15.6404 25.4458 15.6404 25.3835C15.8688 25.7434 16.2909 26.1171 17.0591 26.4008C17.848 26.6846 18.893 26.8438 20.0003 26.8438C21.7235 26.8438 23.675 26.4493 24.3602 25.3974C24.3602 25.4527 24.3602 25.5081 24.374 25.5635C24.374 25.5704 24.4363 25.8265 24.5332 26.2555C24.9622 28.3247 25.8273 33.5012 24.6231 36.8991ZM31.7097 33.4666C31.7512 33.7988 31.592 34.1171 31.3014 34.2971C30.5885 34.7261 29.8757 35.1067 29.156 35.4597C29.2321 33.4182 29.2806 29.4458 28.637 27.4874C28.9622 27.6465 29.3013 27.8195 29.6681 27.9995C30.5678 28.4562 31.2045 29.4043 31.3429 30.4908L31.7097 33.4666Z"></path>
                                    <path d="M23.8481 14.6088C23.8481 15.114 23.4329 15.5292 22.9277 15.5292C22.4225 15.5292 22.0142 15.114 22.0142 14.6088C22.0142 14.1036 22.4225 13.6953 22.9277 13.6953C23.4329 13.6953 23.8481 14.1036 23.8481 14.6088ZM17.9865 14.6088C17.9865 15.114 17.5782 15.5292 17.073 15.5292C16.5678 15.5292 16.1526 15.114 16.1526 14.6088C16.1526 14.1036 16.5678 13.6953 17.073 13.6953C17.5782 13.6953 17.9865 14.1036 17.9865 14.6088Z"></path>
                                </svg>
                            </div>
                            <div class="content">
                                <div class="number">
                                    <h2 class="counter">97</h2>
                                    <span>%</span>
                                </div>
                                <span>Retention Rate</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
      <div className="destination-dt-travel-season-section mb-100" id="scroll-section">
        <div className="container">
          <div className="section-title mb-30 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms" style={{ visibility: "visible", animationDuration: "1500ms", animationDelay: "200ms" }}>
            <h2>Best Package For You</h2>
            <p className='m-0'>A curated list of the most popular travel packages based on different destinations.</p>
          </div>
          <div className="row g-4">
            <div className="col-6 col-md-6 col-lg-4 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms" style={{ visibility: "visible", animationDuration: "1500ms", animationDelay: "200ms" }}>
              <div className="travel-season-card">
                <div className="travel-season-top-area gap-3 position-relative">
                  <div className="travel-season-img">
                    <img src="assets/img/innerpages/travel-season-img1.jpg" alt="" />
                  </div>
                  <div className="travel-season-content">
                    <h6>Spring (March–May)</h6>
                    <span style={{ fontSize: '14px' }}>Weather: 12–20°C / 53–68°F</span>
                    <button className='btn btn-primary pacBookBtn'>
                      Book Now <i className="fa-solid fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-6 col-lg-4 wow animate fadeInDown" data-wow-delay="400ms" data-wow-duration="1500ms" style={{ visibility: "visible", animationDuration: "1500ms", animationDelay: "400ms" }}>
              <div className="travel-season-card">
                <div className="travel-season-top-area gap-3 position-relative">
                  <div className="travel-season-img">
                    <img src="assets/img/innerpages/travel-season-img2.jpg" alt="" />
                  </div>
                  <div className="travel-season-content">
                    <h6>Summer (June–August)</h6>
                    <span style={{ fontSize: '14px' }}>Weather: 20–30°C / 68–86°F</span>
                    <button className='btn btn-primary pacBookBtn'>
                      Book Now <i className="fa-solid fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-6 col-lg-4 wow animate fadeInDown" data-wow-delay="600ms" data-wow-duration="1500ms" style={{ visibility: "visible", animationDuration: "1500ms", animationDelay: "600ms" }}>
              <div className="travel-season-card">
                <div className="travel-season-top-area gap-3 position-relative">
                  <div className="travel-season-img">
                    <img src="assets/img/innerpages/travel-season-img3.jpg" alt="" />
                  </div>
                  <div className="travel-season-content">
                    <h6>Autumn (Sep to Nov)</h6>
                    <span style={{ fontSize: '14px' }}>Weather: 0–18°C / 50–64°F</span>
                    <button className='btn btn-primary pacBookBtn'>
                      Book Now <i className="fa-solid fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-6 col-lg-4 wow animate fadeInDown" data-wow-delay="600ms" data-wow-duration="1500ms" style={{ visibility: "visible", animationDuration: "1500ms", animationDelay: "600ms" }}>
              <div className="travel-season-card">
                <div className="travel-season-top-area gap-3 position-relative">
                  <div className="travel-season-img">
                    <img src="assets/img/innerpages/travel-season-img4.jpg" alt="" />
                  </div>
                  <div className="travel-season-content">
                    <h6>Winter (Dec to Feb)</h6>
                    <span style={{ fontSize: '14px' }}>Weather: 3–8°C / 37–46°F</span>
                    <button className='btn btn-primary pacBookBtn'>
                      Book Now <i className="fa-solid fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-6 col-lg-4 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms" style={{ visibility: "visible", animationDuration: "1500ms", animationDelay: "200ms" }}>
              <div className="travel-season-card">
                <div className="travel-season-top-area gap-3 position-relative">
                  <div className="travel-season-img">
                    <img src="assets/img/innerpages/travel-season-img1.jpg" alt="" />
                  </div>
                  <div className="travel-season-content">
                    <h6>Spring (March–May)</h6>
                    <span style={{ fontSize: '14px' }}>Weather: 12–20°C / 53–68°F</span>
                    <button className='btn btn-primary pacBookBtn'>
                      Book Now <i className="fa-solid fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-6 col-lg-4 wow animate fadeInDown" data-wow-delay="400ms" data-wow-duration="1500ms" style={{ visibility: "visible", animationDuration: "1500ms", animationDelay: "400ms" }}>
              <div className="travel-season-card">
                <div className="travel-season-top-area gap-3 position-relative">
                  <div className="travel-season-img">
                    <img src="assets/img/innerpages/travel-season-img2.jpg" alt="" />
                  </div>
                  <div className="travel-season-content">
                    <h6>Summer (June–August)</h6>
                    <span style={{ fontSize: '14px' }}>Weather: 20–30°C / 68–86°F</span>
                    <button className='btn btn-primary pacBookBtn'>
                      Book Now <i className="fa-solid fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="home2-service-section mb-100">
        <div className="container">
          <div className="service-wrapper two">
            <div className="row justify-content-center wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms" style={{ visibility: "visible", animationDuration: "1500ms", animationDelay: "200ms" }}>
              <div className="col-lg-9">
                <div className="section-title">
                  <h2>Delta Safari – Your Journey, Our Priority!</h2>
                  <svg height="6" viewBox="0 0 872 6" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 2.5L0 0.113249V5.88675L5 3.5V2.5ZM867 3.5L872 5.88675V0.113249L867 2.5V3.5ZM4.5 3.5H867.5V2.5H4.5V3.5Z"></path>
                  </svg>
                </div>
              </div>
            </div>
            <ul className="service-list wow animate fadeInUp" data-wow-delay="200ms" data-wow-duration="1500ms" style={{ visibility: "visible", animationDuration: "1500ms", animationDelay: "200ms" }}>
              <li className="single-service">
                <div className="icon">
                  <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                    <g>
                      <path d="M27.2713 21.3914L13.5213 10.1414C13.4297 10.0664 13.3187 10.0188 13.2012 10.0044C13.0836 9.98999 12.9644 10.0092 12.8574 10.0599C12.7504 10.1106 12.66 10.1906 12.5968 10.2907C12.5335 10.3908 12.4999 10.5068 12.5 10.6252V29.3752C12.5001 29.5093 12.5433 29.6398 12.6233 29.7474C12.7033 29.8551 12.8157 29.9341 12.9441 29.9729C13.0724 30.0117 13.2099 30.0083 13.3361 29.963C13.4623 29.9177 13.5706 29.833 13.645 29.7214L18.46 22.5002H26.875C27.004 22.5003 27.1298 22.4605 27.2353 22.3862C27.3407 22.312 27.4207 22.207 27.4641 22.0855C27.5075 21.9641 27.5122 21.8322 27.4777 21.7079C27.4432 21.5836 27.3711 21.4731 27.2713 21.3914Z"></path>
                      <path d="M9.75999 19.3751C4.93499 17.5201 2.51999 12.0851 4.37499 7.26008C6.22999 2.43508 11.665 0.020083 16.49 1.87508C21.315 3.73008 23.73 9.16633 21.875 13.9901C21.8203 14.1437 21.8278 14.3126 21.8958 14.4607C21.9639 14.6089 22.0871 14.7246 22.2393 14.7831C22.3915 14.8417 22.5605 14.8384 22.7103 14.7741C22.8601 14.7098 22.9789 14.5895 23.0412 14.4388C25.1437 8.97008 22.4062 2.81008 16.9387 0.707583C11.4712 -1.39492 5.31124 1.34258 3.20874 6.81008C1.10624 12.2788 3.84374 18.4388 9.31124 20.5413C9.46607 20.6008 9.63819 20.5965 9.78981 20.5292C9.94143 20.462 10.0602 20.3373 10.12 20.1826C10.1787 20.0277 10.1738 19.8559 10.1064 19.7047C10.0389 19.5534 9.91442 19.4349 9.75999 19.3751Z"></path>
                    </g>
                  </svg>
                </div>
                <div className="content">
                  <h4>One Click Booking</h4>
                  <p>You can hassle-free and fast tour &amp; travel package booking by Delta Safari.</p>
                </div>
              </li>
              <li className="single-service">
                <div className="icon">
                  <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.4896 4.14404C19.8384 3.81275 19.0419 4.07233 18.7107 4.72379L8.87091 24.0772C8.53971 24.7285 8.79929 25.5249 9.45066 25.8561C9.63601 25.9507 9.84112 26 10.0492 26C10.5313 26 10.996 25.7356 11.2296 25.2763L21.0694 5.92297C21.4006 5.27161 21.141 4.47523 20.4896 4.14404ZM13.4243 10.5172C13.4243 7.75042 11.1733 5.49943 8.40653 5.49943C5.63991 5.49943 3.38892 7.75042 3.38892 10.5172C3.38892 13.2839 5.63991 15.5349 8.40662 15.5349C11.1734 15.5349 13.4243 13.2839 13.4243 10.5172ZM8.40662 12.8889C7.09894 12.8889 6.03496 11.8249 6.03496 10.5172C6.03496 9.20945 7.09894 8.14548 8.40662 8.14548C9.71438 8.14548 10.7784 9.20937 10.7784 10.5172C10.7783 11.8249 9.71438 12.8889 8.40662 12.8889ZM21.5934 14.4653C18.8266 14.4653 16.5756 16.7163 16.5756 19.483C16.5756 22.2497 18.8265 24.5007 21.5934 24.5007C24.3601 24.5007 26.6111 22.2498 26.6111 19.483C26.6111 16.7162 24.3602 14.4653 21.5934 14.4653ZM21.5934 21.8546C20.2856 21.8546 19.2216 20.7906 19.2216 19.4829C19.2216 18.1752 20.2856 17.1113 21.5934 17.1113C22.901 17.1113 23.965 18.1752 23.965 19.4829C23.965 20.7906 22.9011 21.8546 21.5934 21.8546Z"></path>
                  </svg>
                </div>
                <div className="content">
                  <h4>Deals &amp; Discounts</h4>
                  <p>Agencies have special discounts on flights, hotels, &amp; packages.</p>
                </div>
              </li>
              <li className="single-service">
                <div className="icon">
                  <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M15 0C21.4662 0 26.7081 5.24194 26.7081 11.7081C26.7081 18.1743 21.4662 23.4163 15 23.4163C8.53375 23.4163 3.29187 18.1743 3.29187 11.7081C3.29187 5.24194 8.53375 0 15 0ZM23.7899 20.886C22.1639 22.4438 20.1246 23.5736 17.8531 24.0947L19.8539 28.7401L22.0141 25.2591L26.0274 26.081L23.7899 20.886ZM12.758 24.2191C10.4637 23.8108 8.38243 22.7867 6.69112 21.324L3.97262 27.1631L8.00831 26.4579L10.0666 30L12.758 24.2191ZM15.1981 7.58544C15.1294 7.40431 14.8707 7.40431 14.8019 7.58544L13.7848 10.2644C13.7706 10.3033 13.7451 10.337 13.7117 10.3613C13.6782 10.3856 13.6383 10.3994 13.597 10.4009L10.7348 10.5404C10.5401 10.5498 10.4604 10.7951 10.6124 10.9172L12.8459 12.7124C12.8785 12.7379 12.9027 12.7726 12.9154 12.8119C12.9282 12.8512 12.929 12.8934 12.9177 12.9332L12.1659 15.6984C12.1147 15.8865 12.3233 16.0381 12.4864 15.9313L14.8839 14.3618C14.9182 14.3387 14.9586 14.3264 15 14.3264C15.0413 14.3264 15.0817 14.3387 15.116 14.3618L17.5136 15.9313C17.6767 16.0381 17.8853 15.8865 17.8341 15.6984L17.0823 12.9333C17.071 12.8935 17.0717 12.8513 17.0845 12.8119C17.0973 12.7726 17.1215 12.738 17.154 12.7125L19.3876 10.9172C19.5395 10.7951 19.4598 10.5499 19.2652 10.5404L16.403 10.4009C16.3617 10.3994 16.3218 10.3856 16.2883 10.3613C16.2549 10.337 16.2294 10.3033 16.2152 10.2645L15.1981 7.58544ZM16.1065 3.43C15.4404 2.93137 14.5596 2.93137 13.8935 3.43C12.1593 4.72812 12.5526 4.58494 10.3897 4.70525C9.55893 4.75144 8.88418 5.31763 8.69443 6.12775C8.20037 8.23687 8.40962 7.87438 6.83012 9.35688C6.22343 9.92631 6.0705 10.7937 6.44587 11.5363C7.42312 13.4695 7.35043 13.0574 7.09337 15.2083C6.99462 16.0344 7.43506 16.7972 8.19987 17.1248C10.1912 17.9776 9.87056 17.7085 11.0562 19.5215C11.5116 20.2179 12.3392 20.5191 13.1357 20.2784C15.2093 19.6517 14.7908 19.6517 16.8644 20.2784C17.6609 20.5191 18.4886 20.2178 18.9439 19.5215C20.1296 17.7086 19.809 17.9776 21.8002 17.1248C22.5651 16.7972 23.0055 16.0344 22.9067 15.2083C22.6497 13.0573 22.577 13.4695 23.5542 11.5363C23.9296 10.7937 23.7766 9.92631 23.17 9.35688C21.5904 7.87444 21.7997 8.23687 21.3057 6.12775C21.1159 5.31763 20.4412 4.7515 19.6104 4.70525C17.4474 4.58494 17.8407 4.72806 16.1065 3.43Z"></path>
                  </svg>
                </div>
                <div className="content">
                  <h4>Local Guidance</h4>
                  <p>Travel agencies have experienced professionals guidance.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Faq />
    </>
  )
}

export default page
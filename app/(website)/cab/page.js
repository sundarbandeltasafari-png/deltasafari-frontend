import Faq from '@/components/website/home/Faq'
import React from 'react'

function page() {
  const hotelCities = [
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
      <div className="home9-banner-section mb-100">
        <div className="home2-banner-section breadcrumb-section" style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(https://www.shutterstock.com/image-photo/santa-marta-colombia-nov-14-600nw-2708784205.jpg)" }}>
          <div className="container">
            <div className="banner-content">
              <h1>Cabs</h1>
              <p>Highlights convenience and simplicity, Best for agencies with online & mobile-friendly services.</p>
            </div>
          </div>
        </div>
        <div className="filter-wrapper">
          <div className="container d-flex justify-content-center">
            <div className="filter-input-wrap hotel p-0">
              <form className="filter-input show">
                <div className="single-search-box pt-4">
                  <p className='m-0 position-absolute' style={{ top: 0, left: "10px", color: "gray", fontWeight: 700 }}>From</p>
                  <div className='d-flex gap-2 mt-1'>
                    <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                      <g>
                        <path d="M12.5944 8.99987C12.5944 10.988 10.9826 12.5998 8.99443 12.5998C7.00627 12.5998 5.39465 10.988 5.39465 8.99987C5.39465 7.0117 7.00627 5.40009 8.99443 5.40009C10.9826 5.40009 12.5944 7.0117 12.5944 8.99987Z"></path>
                        <path d="M17.4601 8.4599H16.2564C15.9858 4.86535 13.1291 2.00812 9.53458 1.7372V0.539976C9.53458 0.241723 9.29268 0 8.9946 0C8.69635 0 8.45462 0.241723 8.45462 0.539976V1.7372C4.85986 2.00812 2.00297 4.86535 1.73235 8.4599H0.540018C0.241723 8.4599 0 8.7017 0 8.99987C0 9.29813 0.241723 9.53985 0.539976 9.53985H1.73239C2.00297 13.1344 4.85991 15.9916 8.45441 16.2625V17.4601C8.45441 17.7583 8.69614 18 8.99439 18C9.29251 18 9.53428 17.7583 9.53428 17.4601V16.2625C13.1289 15.9918 15.9858 13.1346 16.2564 9.53985H17.4601C17.7583 9.53985 18 9.29813 18 8.99987C18 8.70175 17.7583 8.4599 17.4601 8.4599ZM8.99443 15.2096C5.56504 15.2094 2.78509 12.4291 2.78509 8.9997C2.78522 5.57014 5.56554 2.7902 8.99494 2.7902C12.4245 2.7902 15.2046 5.57048 15.2046 8.99987C15.2005 12.428 12.4225 15.2058 8.99443 15.2096Z"></path>
                      </g>
                    </svg>
                    <div className="custom-select-dropdown destination-dropdown">
                      <input type="text" readOnly="" value="Where are you going?" />
                      <div className="input-field-value">
                        <div className="destination">
                          <h6>Kolkata</h6>
                          <span>West Bengal</span>
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
                            <h6>Kolkata</h6>
                            <span>West Bengal</span>
                          </div>
                          <div className="tour">
                            <span>50 <br /> Tour</span>
                          </div>
                        </li>
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
                </div>
                <div className="single-search-box pt-4">
                  <p className='m-0 position-absolute' style={{ top: 0, left: "10px", color: "gray", fontWeight: 700 }}>To</p>
                  <div className='d-flex gap-2 mt-1'>
                    <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                      <g>
                        <path d="M12.5944 8.99987C12.5944 10.988 10.9826 12.5998 8.99443 12.5998C7.00627 12.5998 5.39465 10.988 5.39465 8.99987C5.39465 7.0117 7.00627 5.40009 8.99443 5.40009C10.9826 5.40009 12.5944 7.0117 12.5944 8.99987Z"></path>
                        <path d="M17.4601 8.4599H16.2564C15.9858 4.86535 13.1291 2.00812 9.53458 1.7372V0.539976C9.53458 0.241723 9.29268 0 8.9946 0C8.69635 0 8.45462 0.241723 8.45462 0.539976V1.7372C4.85986 2.00812 2.00297 4.86535 1.73235 8.4599H0.540018C0.241723 8.4599 0 8.7017 0 8.99987C0 9.29813 0.241723 9.53985 0.539976 9.53985H1.73239C2.00297 13.1344 4.85991 15.9916 8.45441 16.2625V17.4601C8.45441 17.7583 8.69614 18 8.99439 18C9.29251 18 9.53428 17.7583 9.53428 17.4601V16.2625C13.1289 15.9918 15.9858 13.1346 16.2564 9.53985H17.4601C17.7583 9.53985 18 9.29813 18 8.99987C18 8.70175 17.7583 8.4599 17.4601 8.4599ZM8.99443 15.2096C5.56504 15.2094 2.78509 12.4291 2.78509 8.9997C2.78522 5.57014 5.56554 2.7902 8.99494 2.7902C12.4245 2.7902 15.2046 5.57048 15.2046 8.99987C15.2005 12.428 12.4225 15.2058 8.99443 15.2096Z"></path>
                      </g>
                    </svg>
                    <div className="custom-select-dropdown destination-dropdown">
                      <input type="text" readOnly="" value="Where are you going?" />
                      <div className="input-field-value">
                        <div className="destination">
                          <h6>Kolkata</h6>
                          <span>West Bengal</span>
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
                            <h6>Kolkata</h6>
                            <span>West Bengal</span>
                          </div>
                          <div className="tour">
                            <span>50 <br /> Tour</span>
                          </div>
                        </li>
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
                </div>
                <div className="single-search-box date-field pt-4" style={{ borderRight: "0px" }}>
                  <p className='m-0 position-absolute' style={{ top: 0, left: "10px", color: "gray", fontWeight: 700 }}>Pickup Date & Time</p>
                  <div className='d-flex gap-2 mt-1'>
                    <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                      <g>
                        <path d="M16.125 1.28394H14.8913V2.43609C14.9509 2.57307 14.9755 2.72275 14.9629 2.87163C14.9502 3.0205 14.9007 3.16388 14.8188 3.28883C14.7368 3.41379 14.6251 3.51638 14.4936 3.58736C14.3622 3.65834 14.2151 3.69547 14.0657 3.6954C13.9163 3.69533 13.7692 3.65807 13.6378 3.58697C13.5064 3.51587 13.3948 3.41318 13.313 3.28815C13.2312 3.16312 13.1818 3.0197 13.1693 2.87081C13.1567 2.72193 13.1815 2.57227 13.2413 2.43534V1.28409H11.5136V2.43609C11.5733 2.57304 11.598 2.72272 11.5854 2.87159C11.5728 3.02047 11.5234 3.16388 11.4415 3.28887C11.3597 3.41386 11.248 3.5165 11.1165 3.58754C10.9851 3.65858 10.838 3.69577 10.6886 3.69577C10.5392 3.69577 10.3922 3.65858 10.2607 3.58754C10.1293 3.5165 10.0176 3.41386 9.93572 3.28887C9.85387 3.16388 9.80441 3.02047 9.79183 2.87159C9.77924 2.72272 9.80391 2.57304 9.86363 2.43609V1.28394H8.13638V2.43609C8.19609 2.57304 8.22076 2.72272 8.20818 2.87159C8.19559 3.02047 8.14613 3.16388 8.06428 3.28887C7.98242 3.41386 7.87073 3.5165 7.73929 3.58754C7.60784 3.65858 7.46079 3.69577 7.31138 3.69577C7.16197 3.69577 7.01491 3.65858 6.88346 3.58754C6.75202 3.5165 6.64033 3.41386 6.55848 3.28887C6.47662 3.16388 6.42716 3.02047 6.41457 2.87159C6.40199 2.72272 6.42666 2.57304 6.48638 2.43609V1.28394H4.75875V2.43519C4.81852 2.57212 4.84327 2.72178 4.83075 2.87066C4.81823 3.01955 4.76884 3.16297 4.68704 3.288C4.60524 3.41303 4.49359 3.51572 4.36219 3.58682C4.23078 3.65792 4.08373 3.69518 3.93432 3.69525C3.78491 3.69532 3.63784 3.65819 3.50636 3.58721C3.37489 3.51623 3.26315 3.41364 3.18124 3.28868C3.09932 3.16373 3.0498 3.02035 3.03715 2.87148C3.02449 2.7226 3.0491 2.57292 3.10875 2.43594V1.28394H1.875C1.37772 1.28394 0.900806 1.48148 0.549175 1.83311C0.197544 2.18474 0 2.66165 0 3.15894L0 16.0964C4.97191e-05 16.5937 0.19761 17.0706 0.54923 17.4222C0.90085 17.7738 1.37773 17.9714 1.875 17.9714H16.125C16.6223 17.9714 17.0992 17.7738 17.4508 17.4222C17.8024 17.0706 18 16.5937 18 16.0964V3.15894C18 2.66165 17.8025 2.18474 17.4508 1.83311C17.0992 1.48148 16.6223 1.28394 16.125 1.28394ZM17.25 15.9089C17.25 16.257 17.1117 16.5909 16.8656 16.837C16.6194 17.0832 16.2856 17.2214 15.9375 17.2214H2.0625C1.7144 17.2214 1.38056 17.0832 1.13442 16.837C0.888281 16.5909 0.75 16.257 0.75 15.9089V6.34644C0.75 5.99834 0.888281 5.6645 1.13442 5.41836C1.38056 5.17222 1.7144 5.03394 2.0625 5.03394H15.9375C16.2856 5.03394 16.6194 5.17222 16.8656 5.41836C17.1117 5.6645 17.25 5.99834 17.25 6.34644V15.9089Z"></path>
                        <path d="M14.6287 0.591064C14.6287 0.280404 14.3769 0.0285645 14.0662 0.0285645C13.7556 0.0285645 13.5037 0.280404 13.5037 0.591064V2.84106C13.5037 3.15172 13.7556 3.40356 14.0662 3.40356C14.3769 3.40356 14.6287 3.15172 14.6287 2.84106V0.591064Z"></path>
                        <path d="M11.2512 0.591064C11.2512 0.280404 10.9994 0.0285645 10.6887 0.0285645C10.3781 0.0285645 10.1262 0.280404 10.1262 0.591064V2.84106C10.1262 3.15172 10.3781 3.40356 10.6887 3.40356C10.9994 3.40356 11.2512 3.15172 11.2512 2.84106V0.591064Z"></path>
                        <path d="M7.87378 0.591064C7.87378 0.280404 7.62194 0.0285645 7.31128 0.0285645C7.00062 0.0285645 6.74878 0.280404 6.74878 0.591064V2.84106C6.74878 3.15172 7.00062 3.40356 7.31128 3.40356C7.62194 3.40356 7.87378 3.15172 7.87378 2.84106V0.591064Z"></path>
                        <path d="M4.49628 0.591064C4.49628 0.280404 4.24444 0.0285645 3.93378 0.0285645C3.62312 0.0285645 3.37128 0.280404 3.37128 0.591064V2.84106C3.37128 3.15172 3.62312 3.40356 3.93378 3.40356C4.24444 3.40356 4.49628 3.15172 4.49628 2.84106V0.591064Z"></path>
                        <path d="M5.57379 12.859C5.57379 11.841 6.19393 11.266 6.94745 10.9237C6.31772 10.5738 5.93327 9.97518 5.93327 9.23362C5.93327 7.84346 7.14253 6.93768 9.03335 6.93768C10.665 6.93768 12.0754 7.71146 12.0754 9.2562C12.0754 10.0578 11.5991 10.5852 11.0117 10.8392C11.8151 11.133 12.4262 11.8054 12.4262 12.8442C12.4262 14.553 10.7024 15.3177 8.95704 15.3177C7.14785 15.3177 5.57379 14.5132 5.57379 12.859ZM10.4611 12.8062C10.4611 12.1583 10.0752 11.6429 8.99162 11.6429C7.89793 11.6429 7.50868 12.1281 7.50868 12.7625C7.50868 13.578 8.28429 13.9316 8.9993 13.9316C9.72377 13.9316 10.4611 13.636 10.4611 12.8062ZM7.83377 9.24273C7.83377 9.7755 8.13992 10.2237 9.04127 10.2237C9.88592 10.2237 10.171 9.82871 10.171 9.25623C10.171 8.62605 9.6497 8.29207 8.99612 8.29207C8.39034 8.29203 7.83377 8.57565 7.83377 9.24273Z"></path>
                      </g>
                    </svg>
                    <div className="custom-select-dropdown">
                      <input type="text" name="inOut" readOnly="" value="Sep 12 - Sep 20" />
                      <div className="selected-date"><div className="selected-date"><h6>7 May</h6><span>Thursday 2026</span></div></div>
                    </div>
                  </div>
                </div>
                <button type="submit" className="primary-btn1 search-btn">
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
      </div>
      <div class="home9-travel-package-section mb-50 mt-5">
        <div class="container">
          <div class="row justify-content-start mb-50 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms" style={{ visibility: "visible", animationDuration: "1500ms", animationDelay: "200ms" }}>
            <div class="col-xl-6 col-lg-8">
              <div class="section-title text-start">
                <h2>Exclusive Cab Offers</h2>
                <p>A curated list of the most popular travel packages based on different destinations.</p>
              </div>
            </div>
          </div>
          <div class="row gy-lg-5 gy-4">
            <div class="col-lg-4 col-md-6 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms" style={{ visibility: "visible", animationDuration: "1500ms", animationDelay: "200ms" }}>
              <div class="package-card2">
                <div class="package-img-wrap">
                  <a href="travel-package-details.html" class="package-img">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV8w40s0Yjw4SZwwaeCR_aMklIgmRFfxt3hw&s" alt="" />
                  </a>
                  <div class="batch">
                    <span class="yellow-bg">Private Tour</span>
                  </div>
                </div>
                <div class="package-content">
                  <p>Get flat 10% OFF* on ride with outstation one way or round trip cab bookings</p>
                  <div className='d-flex justify-content-between'>
                    <div>
                      <i class="fa-regular fa-calendar"></i>
                      <span>Valid till : 30th Jun 2026</span>
                    </div>
                    <div className='d-flex gap-2 align-items-center copy-div'>
                      <span>DTSCAB10</span>
                      <i class="fa-regular fa-copy"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-6 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms" style={{ visibility: "visible", animationDuration: "1500ms", animationDelay: "200ms" }}>
              <div class="package-card2">
                <div class="package-img-wrap">
                  <a href="travel-package-details.html" class="package-img">
                    <img src="https://www.jaipurcitycab.in/images/car2.png" alt="" />
                  </a>
                  <div class="batch">
                    <span class="yellow-bg">Group Tour</span>
                  </div>
                </div>
                <div class="package-content">
                  <p>Get flat 10% OFF* on ride with outstation one way or round trip cab bookings</p>
                  <div className='d-flex justify-content-between'>
                    <div>
                      <i class="fa-regular fa-calendar"></i>
                      <span>Valid till : 30th Jun 2026</span>
                    </div>
                    <div className='d-flex gap-2 align-items-center copy-div'>
                      <span>DTSCAB10</span>
                      <i class="fa-regular fa-copy"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-6 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms" style={{ visibility: "visible", animationDuration: "1500ms", animationDelay: "200ms" }}>
              <div class="package-card2">
                <div class="package-img-wrap">
                  <a href="travel-package-details.html" class="package-img">
                    <img src="https://rajputanacabs.b-cdn.net/wp-content/uploads/2021/01/Maruti-Dzire-Car-view.jpg" alt="" />
                  </a>
                  <div class="batch">
                    <span>Sale on!</span>
                  </div>
                </div>
                <div class="package-content">
                  <p>Get flat 10% OFF* on ride with outstation one way or round trip cab bookings</p>
                  <div className='d-flex justify-content-between'>
                    <div>
                      <i class="fa-regular fa-calendar"></i>
                      <span>Valid till : 30th Jun 2026</span>
                    </div>
                    <div className='d-flex gap-2 align-items-center copy-div'>
                      <span>DTSCAB10</span>
                      <i class="fa-regular fa-copy"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="destination-dt-travel-season-section mb-100 mt-5" id="scroll-section">
        <div className="container">
          <h2 className='mt-4 mb-3'>City To City-Outstation Cabs</h2>
          <p>Enjoy Best Price Guarantee, professional services, timely pick-up & drop-off and more!</p>
          <button className='btn btn-primary mb-3'>
            Book Now
          </button>
          <div className="row g-1">
            {hotelCities.map((city, index) => {
              return <div key={index} className="col-lg-4 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms" style={{ visibility: "visible", animationDuration: "1500ms", animationDelay: "200ms" }}>
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
                      <div className='bottom-direction position-absolute'>
                        <i class="fa-solid fa-arrow-turn-down"></i>
                      </div>
                      <ul className="hotel-feature-list mb-0">
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
        </div>
      </div>
      <Faq />
    </>
  )
}

export default page
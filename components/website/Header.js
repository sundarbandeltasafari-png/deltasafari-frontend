"use client"
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function Header({ siteSettings }) {
  const pathname = usePathname();
  const route = useRouter();
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  useEffect(() => {
    setOpenMobileMenu(false)
  }, [pathname])
  return (
    <>
      <div id="magic-cursor">
        <div id="ball"></div>
      </div>

      <div className="progress-wrap">
        <svg className="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
          <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
        </svg>
        <svg className="arrow" width="22" height="25" viewBox="0 0 24 23" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0.556131 11.4439L11.8139 0.186067L13.9214 2.29352L13.9422 20.6852L9.70638 20.7061L9.76793 8.22168L3.6064 14.4941L0.556131 11.4439Z" />
          <path d="M23.1276 11.4999L16.0288 4.40105L15.9991 10.4203L20.1031 14.5243L23.1276 11.4999Z" />
        </svg>
      </div>

      <header className="header-area d-flex style-2">
        <div className="container-fluid d-flex flex-nowrap align-items-center justify-content-between">
          <div className="logo-and-menu-area">
            <Link href="/" className="header-logo">
              <img src={siteSettings?.site_logo ? process.env.NEXT_PUBLIC_SERVER_URL + siteSettings?.site_logo : process.env.NEXT_PUBLIC_PUBLIC_URL + "assets/img/logo_DS.png"} alt="Logo" />
            </Link>
            <div className={`main-menu ${openMobileMenu && 'show-menu'}`}>
              <div className="mobile-logo-area d-md-none d-flex align-items-center justify-content-between">
                <a href="index.html" className="mobile-logo-wrap">
                  <img src={siteSettings?.site_logo ? process.env.NEXT_PUBLIC_SERVER_URL + siteSettings?.site_logo : process.env.NEXT_PUBLIC_PUBLIC_URL + "assets/img/logo_DS.png"} alt="Logo" />
                </a>
                <div className="menu-close-btn" onClick={() => { setOpenMobileMenu(!openMobileMenu) }}>
                  <i className="bi bi-x"></i>
                </div>
              </div>
              <ul className="menu-list">
                <li className={pathname == "/" ? "menu-item-has-children d-flex align-items-center active" : 'menu-item-has-children d-flex align-items-center'}>
                  <i class="fa-regular fa-house"></i>
                  <Link href="/" className="drop-down">
                    Home
                  </Link>
                </li>
                <li className={pathname.includes("/package") ? "menu-item-has-children  d-flex align-items-center position-inherit active" : 'menu-item-has-children  d-flex align-items-center position-inherit'}>
                  <i class="fa-solid fa-suitcase-rolling"></i>
                  <Link href="/package" className="drop-down">
                    Package
                  </Link>
                </li>
                <li className={pathname.includes("/corporate") ? "menu-item-has-children  d-flex align-items-center position-inherit active" : 'menu-item-has-children  d-flex align-items-center position-inherit'}>
                  <i className="fa-solid fa-clipboard-user"></i>
                  <Link href="/corporate" className="drop-down">
                    Corporate
                  </Link>
                </li>
                <li className={pathname.includes("/hotel") ? "menu-item-has-children  d-flex align-items-center position-inherit active" : 'menu-item-has-children  d-flex align-items-center position-inherit'}>
                  <i className="fa-solid fa-hotel"></i>
                  <Link href="/hotel" className="drop-down">
                    Hotel
                  </Link>
                </li>
                <li className={pathname.includes("/cab") ? "menu-item-has-children  d-flex align-items-center position-inherit active" : 'menu-item-has-children  d-flex align-items-center position-inherit'}>
                  <i className="fa-solid fa-taxi"></i>
                  <Link href="/cab" className="drop-down">
                    Cab
                  </Link>
                </li>
                <li className={pathname.includes("/referal") ? "menu-item-has-children  d-flex align-items-center position-inherit active" : 'menu-item-has-children  d-flex align-items-center position-inherit'}>
                  <i className="fa-regular fa-handshake"></i>
                  <Link href="/referal" className="drop-down">
                    Referal
                  </Link>
                </li>
                <li className={pathname.includes("/contact") ? "menu-item-has-children  d-flex align-items-center position-inherit active" : 'menu-item-has-children  d-flex align-items-center position-inherit'}>
                  <i className="fa-solid fa-headset"></i>
                  <Link href="/contact" className="drop-down">
                    Contact Us
                  </Link>
                </li>
              </ul>
              <div className="contact-area mb-3 d-md-none d-flex">
                <div className="icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <g>
                      <path d="M15.5646 11.7424L13.3317 9.50954C12.5343 8.7121 11.1786 9.03111 10.8596 10.0678C10.6204 10.7855 9.82296 11.1842 9.10526 11.0247C7.51037 10.626 5.35726 8.55261 4.95854 6.87797C4.71931 6.16024 5.19778 5.36279 5.91548 5.12359C6.95216 4.80461 7.27113 3.44895 6.47369 2.65151L4.24084 0.418659C3.60288 -0.139553 2.64595 -0.139553 2.08774 0.418659L0.572591 1.93381C-0.942555 3.5287 0.73208 7.75516 4.48007 11.5032C8.22807 15.2512 12.4545 17.0056 14.0494 15.4106L15.5646 13.8955C16.1228 13.2575 16.1228 12.3006 15.5646 11.7424Z"></path>
                    </g>
                  </svg>
                </div>
                <div className="content">
                  <span>Need Help?</span>
                  <a href={`tel:${siteSettings?.contacts?.phone_1 ? siteSettings?.contacts?.phone_1?.replaceAll(" ", "") : siteSettings?.contacts?.phone_2?.replaceAll(" ", "")}`}>{siteSettings?.contacts?.phone_1 ? siteSettings?.contacts?.phone_1?.replaceAll(" ", "") : siteSettings?.contacts?.phone_2?.replaceAll(" ", "")}</a>
                </div>
              </div>
              <a className="primary-btn1 login-btn black-bg d-md-none d-flex">
                <span>
                  <svg width="15" height="15" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
                    <g>
                      <path d="M7.50105 7.78913C9.64392 7.78913 11.3956 6.03744 11.3956 3.89456C11.3956 1.75169 9.64392 0 7.50105 0C5.35818 0 3.60652 1.75169 3.60652 3.89456C3.60652 6.03744 5.35821 7.78913 7.50105 7.78913ZM14.1847 10.9014C14.0827 10.6463 13.9467 10.4082 13.7936 10.1871C13.0113 9.0306 11.8038 8.2653 10.4433 8.07822C10.2732 8.06123 10.0861 8.09522 9.95007 8.19727C9.23578 8.72448 8.38546 8.99658 7.50108 8.99658C6.61671 8.99658 5.76638 8.72448 5.05209 8.19727C4.91603 8.09522 4.72895 8.04421 4.5589 8.07822C3.19835 8.2653 1.97387 9.0306 1.20857 10.1871C1.05551 10.4082 0.919443 10.6633 0.817424 10.9014C0.766415 11.0034 0.783407 11.1225 0.834416 11.2245C0.970484 11.4626 1.14054 11.7007 1.2936 11.9048C1.53168 12.2279 1.78679 12.517 2.07592 12.7891C2.31401 13.0272 2.58611 13.2483 2.85824 13.4694C4.20177 14.4728 5.81742 15 7.48409 15C9.15076 15 10.7664 14.4728 12.1099 13.4694C12.382 13.2653 12.6541 13.0272 12.8923 12.7891C13.1644 12.517 13.4365 12.2279 13.6746 11.9048C13.8446 11.6837 13.9977 11.4626 14.1338 11.2245C14.2188 11.1225 14.2358 11.0034 14.1847 10.9014Z"></path>
                    </g>
                  </svg>
                  Login or Signup
                </span>
              </a>
            </div>
          </div>
          <div className="main-menu">
            <div className="mobile-logo-area d-md-none d-flex align-items-center justify-content-between">
              <Link href="/" className="mobile-logo-wrap">
                <img src={siteSettings?.site_logo ? process.env.NEXT_PUBLIC_SERVER_URL + siteSettings?.site_logo : process.env.NEXT_PUBLIC_PUBLIC_URL + "assets/img/logo_DS.png"} alt="Logo" />
              </Link>
              <div className="menu-close-btn">
                <i className="bi bi-x"></i>
              </div>
            </div>
            <ul className="menu-list">
              <li className={pathname == "/" ? "active" : ''}>
                <Link href="/">
                  <i className="fa-regular fa-house"></i>
                  <span>
                    Home
                  </span>
                </Link>
              </li>
              <li className={pathname.includes("/package") ? "active" : ''}>
                <Link href="/package" >
                  <i className="fa-solid fa-suitcase-rolling"></i>
                  Package
                </Link>
              </li>
              <li className={pathname.includes("/corporate") ? "active" : ''}>
                <Link href="/corporate" >
                  <i className="fa-solid fa-clipboard-user"></i>
                  <span>
                    Corporate
                  </span>
                </Link>
              </li>
              <li className={pathname.includes("/hotel") ? "active" : ''}>
                <Link href="/hotel" >
                  <i className="fa-solid fa-hotel"></i>
                  Hotel
                </Link>
              </li>
              <li className={pathname.includes("/cab") ? "active" : ''}>
                <Link href="/cab" >
                  <i className="fa-solid fa-taxi"></i>
                  Cab's
                </Link>
              </li>
              <li className={pathname.includes("/referal") ? "active" : ''}>
                <Link href="/referal" >
                  <i className="fa-regular fa-handshake"></i>
                  Referal
                </Link>
              </li>
              <li className={pathname.includes("/contact") ? "active" : ''}>
                <Link href="/contact" >
                  <i className="fa-solid fa-headset"></i>
                  Contacts Us
                </Link>
              </li>
            </ul>
            <a className="primary-btn1 login-btn black-bg d-md-none d-flex">
              <span>
                <svg width="15" height="15" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <path
                      d="M7.50105 7.78913C9.64392 7.78913 11.3956 6.03744 11.3956 3.89456C11.3956 1.75169 9.64392 0 7.50105 0C5.35818 0 3.60652 1.75169 3.60652 3.89456C3.60652 6.03744 5.35821 7.78913 7.50105 7.78913ZM14.1847 10.9014C14.0827 10.6463 13.9467 10.4082 13.7936 10.1871C13.0113 9.0306 11.8038 8.2653 10.4433 8.07822C10.2732 8.06123 10.0861 8.09522 9.95007 8.19727C9.23578 8.72448 8.38546 8.99658 7.50108 8.99658C6.61671 8.99658 5.76638 8.72448 5.05209 8.19727C4.91603 8.09522 4.72895 8.04421 4.5589 8.07822C3.19835 8.2653 1.97387 9.0306 1.20857 10.1871C1.05551 10.4082 0.919443 10.6633 0.817424 10.9014C0.766415 11.0034 0.783407 11.1225 0.834416 11.2245C0.970484 11.4626 1.14054 11.7007 1.2936 11.9048C1.53168 12.2279 1.78679 12.517 2.07592 12.7891C2.31401 13.0272 2.58611 13.2483 2.85824 13.4694C4.20177 14.4728 5.81742 15 7.48409 15C9.15076 15 10.7664 14.4728 12.1099 13.4694C12.382 13.2653 12.6541 13.0272 12.8923 12.7891C13.1644 12.517 13.4365 12.2279 13.6746 11.9048C13.8446 11.6837 13.9977 11.4626 14.1338 11.2245C14.2188 11.1225 14.2358 11.0034 14.1847 10.9014Z" />
                  </g>
                </svg>
                Login or Signup
              </span>
            </a>
          </div>
          <div className="nav-right d-flex flex-column gap-1 align-items-end">
            <div className='d-flex gap-3'>
              <div className="btn-group customer-service-header">
                <a className="dropdown-toggle header-dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="fa-solid fa-headset"></i>
                  <span>Customer Service</span>
                </a>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-lg-start" style={{ width: "max-content" }}>
                  <div className='d-flex gap-2 align-items-center p-2 cursor-pointer'>
                    <i className="fa-solid fa-phone-volume" style={{ fontSize: "25px" }}></i>
                    <div>
                      <h6 className='m-0'>Call Support</h6>
                      <a style={{ fontSize: "14px" }} href={`tel:${siteSettings?.contacts?.phone_1 ? siteSettings?.contacts?.phone_1?.replaceAll(" ", "") : siteSettings?.contacts?.phone_2?.replaceAll(" ", "")}`}>{siteSettings?.contacts?.phone_1 ? siteSettings?.contacts?.phone_1?.replaceAll(" ", "") : siteSettings?.contacts?.phone_2?.replaceAll(" ", "")}</a>
                    </div>
                  </div>
                  <div className='d-flex gap-2 align-items-center p-2 cursor-pointer'>
                    <i className="fa-solid fa-envelope" style={{ fontSize: "25px" }}></i>
                    <div>
                      <h6 className='m-0'>Mail Support</h6>
                      <span style={{ fontSize: "14px" }} href={`mailto:${siteSettings?.contacts?.email}`}>{siteSettings?.contacts?.email}</span>
                    </div>
                  </div>
                </ul>
              </div>
              <div className="btn-group">
                <a className="dropdown-toggle header-dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="fa-solid fa-language"></i>
                  <span>Language</span>
                </a>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-lg-start">
                  <div className='d-flex gap-2 align-items-center p-2 cursor-pointer'>
                    <div>
                      <h6 className='m-0'>English</h6>
                    </div>
                  </div>
                  <div className='d-flex gap-2 align-items-center p-2 cursor-pointer'>
                    <div>
                      <h6 className='m-0'>Hindi</h6>
                    </div>
                  </div>
                  <div className='d-flex gap-2 align-items-center p-2 cursor-pointer'>
                    <div>
                      <h6 className='m-0'>Bengali</h6>
                    </div>
                  </div>
                </ul>
              </div>
            </div>
            <a className="primary-btn1 login-btn black-bg ">
              <span>
                <svg width="15" height="15" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <path
                      d="M7.50105 7.78913C9.64392 7.78913 11.3956 6.03744 11.3956 3.89456C11.3956 1.75169 9.64392 0 7.50105 0C5.35818 0 3.60652 1.75169 3.60652 3.89456C3.60652 6.03744 5.35821 7.78913 7.50105 7.78913ZM14.1847 10.9014C14.0827 10.6463 13.9467 10.4082 13.7936 10.1871C13.0113 9.0306 11.8038 8.2653 10.4433 8.07822C10.2732 8.06123 10.0861 8.09522 9.95007 8.19727C9.23578 8.72448 8.38546 8.99658 7.50108 8.99658C6.61671 8.99658 5.76638 8.72448 5.05209 8.19727C4.91603 8.09522 4.72895 8.04421 4.5589 8.07822C3.19835 8.2653 1.97387 9.0306 1.20857 10.1871C1.05551 10.4082 0.919443 10.6633 0.817424 10.9014C0.766415 11.0034 0.783407 11.1225 0.834416 11.2245C0.970484 11.4626 1.14054 11.7007 1.2936 11.9048C1.53168 12.2279 1.78679 12.517 2.07592 12.7891C2.31401 13.0272 2.58611 13.2483 2.85824 13.4694C4.20177 14.4728 5.81742 15 7.48409 15C9.15076 15 10.7664 14.4728 12.1099 13.4694C12.382 13.2653 12.6541 13.0272 12.8923 12.7891C13.1644 12.517 13.4365 12.2279 13.6746 11.9048C13.8446 11.6837 13.9977 11.4626 14.1338 11.2245C14.2188 11.1225 14.2358 11.0034 14.1847 10.9014Z" />
                  </g>
                </svg>
                Login or Signup
              </span>
            </a>
            <div className="login-input-box">
              <div className='d-flex gap-2 align-items-center p-2 cursor-pointer' onClick={() => { route.push('/login') }}>
                <i className="fa-regular fa-user" style={{ fontSize: "25px" }}></i>
                <div>
                  <h6 className='m-0'>Customer Login</h6>
                  <span style={{ fontSize: "14px" }}>Login and check bookings</span>
                </div>
              </div>
              <div className='d-flex gap-2 align-items-center p-2 cursor-pointer' onClick={() => { route.push('/login') }}>
                <i className="fa-solid fa-briefcase" style={{ fontSize: "25px" }}></i>
                <div>
                  <h6 className='m-0'>Corporate Login</h6>
                  <span style={{ fontSize: "14px" }}>Login corporate account</span>
                </div>
              </div>
              <div className='d-flex gap-2 align-items-center p-2 cursor-pointer' onClick={() => { route.push('/login') }}>
                <i className="fa-solid fa-user-shield" style={{ fontSize: "25px" }}></i>
                <div>
                  <h6 className='m-0'>Agent Login</h6>
                  <span style={{ fontSize: "14px" }}>Login your agent account</span>
                </div>
              </div>
            </div>
            <div className="sidebar-button mobile-menu-btn" onClick={() => { setOpenMobileMenu(!openMobileMenu) }}>
              <svg width="20" height="18" viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1.29445 2.8421H10.5237C11.2389 2.8421 11.8182 2.2062 11.8182 1.42105C11.8182 0.635903 11.2389 0 10.5237 0H1.29445C0.579249 0 0 0.635903 0 1.42105C0 2.2062 0.579249 2.8421 1.29445 2.8421Z">
                </path>
                <path
                  d="M1.23002 10.421H18.77C19.4496 10.421 20 9.78506 20 8.99991C20 8.21476 19.4496 7.57886 18.77 7.57886H1.23002C0.550421 7.57886 0 8.21476 0 8.99991C0 9.78506 0.550421 10.421 1.23002 10.421Z">
                </path>
                <path
                  d="M18.8052 15.1579H10.2858C9.62563 15.1579 9.09094 15.7938 9.09094 16.5789C9.09094 17.3641 9.62563 18 10.2858 18H18.8052C19.4653 18 20 17.3641 20 16.5789C20 15.7938 19.4653 15.1579 18.8052 15.1579Z">
                </path>
              </svg>
            </div>
          </div>
        </div>
      </header>
      <div className="mobile-bottom-nav justify-content-around align-items-center fixed-bottom bg-white border-top py-2 pt-3 shadow-lg">

        {/* Home */}
        <Link
          href="/"
          className={`nav-item d-flex flex-column align-items-center text-decoration-none ${pathname === "/" ? "active" : ""}`}
        >
          <i className="fa-regular fa-house mb-1 fs-5"></i>
          <span className="nav-label">Home</span>
        </Link>

        {/* Package */}
        <Link
          href="/package"
          className={`nav-item d-flex flex-column align-items-center text-decoration-none ${pathname.includes("/package") ? "active" : ""}`}
        >
          <i className="fa-solid fa-suitcase-rolling mb-1 fs-5"></i>
          <span className="nav-label">Package</span>
        </Link>

        {/* Corporate */}
        <Link
          href="/corporate"
          className={`nav-item d-flex flex-column align-items-center text-decoration-none ${pathname.includes("/corporate") ? "active" : ""}`}
        >
          <i className="fa-solid fa-clipboard-user mb-1 fs-5"></i>
          <span className="nav-label">Corporate</span>
        </Link>

        {/* Refer */}
        <Link
          href="/referal"
          className={`nav-item d-flex flex-column align-items-center text-decoration-none ${pathname.includes("/referal") ? "active" : ""}`}
        >
          <i className="fa-regular fa-handshake mb-1 fs-5"></i>
          <span className="nav-label">Referal</span>
        </Link>

        {/* Profile / Login */}
        <Link
          href="/login"
          className={`nav-item d-flex flex-column align-items-center text-decoration-none ${pathname.includes("/login") ? "active" : ""}`}
        >
          <i className="fa-regular fa-user mb-1 fs-5"></i>
          <span className="nav-label">Profile</span>
        </Link>

      </div>
    </>
  )
}

export default Header
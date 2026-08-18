"use client"
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { axiosGet } from '@/libs/axiosHelper'
import { getUserDetailsURL } from '@/routes/authRoutes'
import { setUser } from '@/services/reducers/userAuthSlice'

function SideBar() {
    const route = useRouter()
    const pathname = usePathname()
    const dispatch = useDispatch()
    const { user, token } = useSelector((state) => state.userAuth || {})
    const [isMobileOpen, setIsMobileOpen] = useState(false)

    useEffect(() => {
        if (token) {
            axiosGet(getUserDetailsURL, token).then((res) => {
                if (res?.status && res?.userDetails) {
                    dispatch(setUser({ user: res.userDetails, token }));
                }
            }).catch(() => {});
        }
    }, [token, dispatch]);

    // Auto-close on page/tab navigation
    useEffect(() => {
        setIsMobileOpen(false);
    }, [pathname]);

    // Handle ESC key and body scroll lock when mobile drawer is open
    useEffect(() => {
        if (isMobileOpen) {
            document.body.style.overflow = 'hidden';
            const handleKeyDown = (e) => {
                if (e.key === 'Escape') setIsMobileOpen(false);
            };
            window.addEventListener('keydown', handleKeyDown);
            return () => {
                document.body.style.overflow = '';
                window.removeEventListener('keydown', handleKeyDown);
            };
        } else {
            document.body.style.overflow = '';
        }
    }, [isMobileOpen]);

    const DEFAULT_AVATAR = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='50' fill='%23e2e8f0'/><circle cx='50' cy='38' r='20' fill='%2394a3b8'/><path d='M 18 86 C 18 64 34 56 50 56 C 66 56 82 64 82 86 Z' fill='%2394a3b8'/></svg>";

    const profilePic = user?.profile_pic 
        ? (user.profile_pic.startsWith('http') ? user.profile_pic : process.env.NEXT_PUBLIC_SERVER_URL + user.profile_pic)
        : DEFAULT_AVATAR;

    const userType = Number(user?.user_type) || 1;
    const userRoleLabel = userType === 2 ? "Corporate Enterprise" : userType === 3 ? "Certified Agent Partner" : "Customer Member";

    const navigateTo = (path) => {
        setIsMobileOpen(false);
        route.push(path);
    };

    return (
        <>
            {/* MOBILE SCREEN TOP TRIGGER BAR (HAMBURGER) */}
            <div className="col-12 d-lg-none mb-3">
                <div className="d-flex align-items-center justify-content-between bg-white p-2.5 px-3 rounded-4 shadow-sm border">
                    <div className="d-flex align-items-center gap-2.5">
                        <img 
                            src={profilePic} 
                            className="rounded-circle border border-2 border-danger-subtle shadow-2xs" 
                            style={{ width: "38px", height: "38px", objectFit: "cover" }}
                            alt="Profile Avatar"
                        />
                        <div>
                            <span className="fw-extrabold text-dark text-xs d-block lh-1 mb-1">
                                {user?.first_name ? `${user.first_name} ${user?.last_name || ''}`.trim() : "Valued User"}
                            </span>
                            <span className="badge bg-danger-subtle text-danger text-3xs font-semibold px-2 py-0.5 rounded-pill">
                                {userRoleLabel}
                            </span>
                        </div>
                    </div>
                    <button 
                        type="button" 
                        onClick={() => setIsMobileOpen(true)}
                        className="btn btn-danger btn-sm py-1.5 px-3 rounded-pill fw-bold text-xs d-flex align-items-center gap-1.5 shadow-sm"
                        style={{ backgroundColor: '#ff5c41', border: 'none' }}
                        aria-label="Open dashboard navigation menu"
                    >
                        <i className="fa-solid fa-bars"></i>
                        <span>Menu</span>
                    </button>
                </div>
            </div>

            {/* MOBILE OFF-CANVAS BACKDROP */}
            {isMobileOpen && (
                <div 
                    className="sidebar-backdrop d-lg-none"
                    onClick={() => setIsMobileOpen(false)}
                ></div>
            )}

            {/* MAIN DASHBOARD SIDEBAR (Static on Desktop, Left Off-canvas Drawer on Mobile) */}
            <div className={`col-lg-4 col-xl-3 mb-4 user-sidebar-wrapper ${isMobileOpen ? 'sidebar-open' : ''}`}>
                <div className="dashboard-sidebar">
                    {/* MOBILE DRAWER HEADER */}
                    <div className="d-flex d-lg-none align-items-center justify-content-between pb-3 mb-3 border-bottom">
                        <div className="d-flex align-items-center gap-2">
                            <i className="fa-solid fa-compass text-danger fs-5"></i>
                            <span className="fw-extrabold text-dark text-sm">Dashboard Menu</span>
                        </div>
                        <button 
                            type="button" 
                            onClick={() => setIsMobileOpen(false)}
                            className="btn btn-light btn-sm rounded-circle d-flex align-items-center justify-content-center border"
                            style={{ width: "32px", height: "32px" }}
                            aria-label="Close menu"
                        >
                            <i className="fa-solid fa-xmark fs-6 text-dark"></i>
                        </button>
                    </div>

                    <div className="user-nav-card text-center p-3">
                        <img 
                            src={profilePic} 
                            className="rounded-circle mb-3 border border-3 border-white shadow-sm" 
                            style={{ width: "90px", height: "90px", objectFit: "cover" }}
                            alt={user?.first_name ? `${user.first_name} ${user.last_name || ''} Profile Avatar` : "Delta Safari User Profile"}
                        />
                        <h5 className="fw-bold m-0 text-dark">
                            {user?.first_name ? `${user.first_name} ${user?.last_name || ''}` : "Valued User"}
                        </h5>
                        <p className="text-muted small m-0 mt-1">{userRoleLabel}</p>
                    </div>
                    <div className="nav flex-column nav-pills mt-2" id="v-pills-tab" role="tablist">
                        <button className={`nav-link ${pathname === '/profile' ? 'active' : ''}`} onClick={() => navigateTo('/profile')} type="button">
                            <i className={`fa-solid ${userType === 2 ? 'fa-building' : userType === 3 ? 'fa-user-shield' : 'fa-user'} me-2`}></i> 
                            {userType === 2 ? 'Corporate Dashboard' : userType === 3 ? 'Agent Dashboard' : 'User Profile'}
                        </button>

                        <button className={`nav-link ${pathname === '/editprofile' ? 'active' : ''}`} onClick={() => navigateTo('/editprofile')} type="button">
                            <i className="fa-regular fa-pen-to-square me-2"></i> Edit Profile
                        </button>

                        <button className={`nav-link ${pathname === '/settings' ? 'active' : ''}`} onClick={() => navigateTo('/settings')} type="button">
                            <i className="fa-solid fa-sliders me-2"></i> Account Settings
                        </button>

                        <button className={`nav-link ${pathname === '/savedtour' ? 'active' : ''}`} onClick={() => navigateTo('/savedtour')} type="button">
                            <i className="fa-solid fa-heart me-2 text-danger"></i> Saved Packages
                        </button>

                        <button className={`nav-link ${pathname === '/bookings' ? 'active' : ''}`} onClick={() => navigateTo('/bookings')} type="button">
                            <i className="fa-solid fa-suitcase me-2"></i> 
                            {userType === 2 ? 'Employee Bookings' : userType === 3 ? 'Client Bookings' : 'My Bookings'}
                        </button>

                        <button className={`nav-link ${pathname === '/customized-packages' ? 'active' : ''}`} onClick={() => navigateTo('/customized-packages')} type="button">
                            <i className="fa-solid fa-wand-magic-sparkles me-2 text-warning"></i> Customized Packages
                        </button>

                        {/* Wallet and Withdraw (Customer & Agent Only - Corporate has NO wallet) */}
                        {(userType === 1 || userType === 3) && (
                            <button className={`nav-link ${pathname === '/wallet' ? 'active' : ''}`} onClick={() => navigateTo('/wallet')} type="button">
                                <i className="fa-solid fa-wallet me-2"></i> 
                                {userType === 3 ? 'Commission Wallet' : 'Wallet Overview'}
                            </button>
                        )}

                        {(userType === 1 || userType === 3) && (
                            <button className={`nav-link ${pathname === '/withdraw' ? 'active' : ''}`} onClick={() => navigateTo('/withdraw')} type="button">
                                <i className="fa-solid fa-money-bill-transfer me-2"></i> 
                                {userType === 3 ? 'Payout Withdraw' : 'Withdraw Cash'}
                            </button>
                        )}

                        {/* Customer-only Refer & Earn Program */}
                        {userType === 1 && (
                            <button className={`nav-link ${pathname === '/myreferal' ? 'active' : ''}`} onClick={() => navigateTo('/myreferal')} type="button">
                                <i className="fa-solid fa-gift me-2"></i> Refer & Earn
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SideBar
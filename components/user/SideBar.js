"use client"
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { axiosGet } from '@/libs/axiosHelper'
import { getUserDetailsURL } from '@/routes/authRoutes'
import { setUser } from '@/services/reducers/userAuthSlice'

function SideBar() {
    const route = useRouter()
    const pathname = usePathname()
    const dispatch = useDispatch()
    const { user, token } = useSelector((state) => state.userAuth || {})

    useEffect(() => {
        if (token) {
            axiosGet(getUserDetailsURL, token).then((res) => {
                if (res?.status && res?.userDetails) {
                    dispatch(setUser({ user: res.userDetails, token }));
                }
            }).catch(() => {});
        }
    }, [token, dispatch]);

    const DEFAULT_AVATAR = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='50' fill='%23e2e8f0'/><circle cx='50' cy='38' r='20' fill='%2394a3b8'/><path d='M 18 86 C 18 64 34 56 50 56 C 66 56 82 64 82 86 Z' fill='%2394a3b8'/></svg>";

    const profilePic = user?.profile_pic 
        ? (user.profile_pic.startsWith('http') ? user.profile_pic : process.env.NEXT_PUBLIC_SERVER_URL + user.profile_pic)
        : DEFAULT_AVATAR;

    const userType = Number(user?.user_type) || 1;
    const userRoleLabel = userType === 2 ? "Corporate Enterprise" : userType === 3 ? "Certified Agent Partner" : "Customer Member";

    return (
        <div className="col-lg-4 col-xl-3 mb-4">
            <div className="dashboard-sidebar">
                <div className="user-nav-card text-center p-3">
                    <img 
                        src={profilePic} 
                        className="rounded-circle mb-3 border border-3 border-white shadow-sm" 
                        style={{ width: "90px", height: "90px", objectFit: "cover" }}
                        alt="User Profile"
                    />
                    <h5 className="fw-bold m-0 text-dark">
                        {user?.first_name ? `${user.first_name} ${user?.last_name || ''}` : "Valued User"}
                    </h5>
                    <p className="text-muted small m-0 mt-1">{userRoleLabel}</p>
                </div>
                <div className="nav flex-column nav-pills mt-2" id="v-pills-tab" role="tablist">
                    <button className={`nav-link ${pathname === '/profile' ? 'active' : ''}`} onClick={() => { route.push('/profile') }} type="button">
                        <i className={`fa-solid ${userType === 2 ? 'fa-building' : userType === 3 ? 'fa-user-shield' : 'fa-user'} me-2`}></i> 
                        {userType === 2 ? 'Corporate Dashboard' : userType === 3 ? 'Agent Dashboard' : 'User Profile'}
                    </button>

                    <button className={`nav-link ${pathname === '/editprofile' ? 'active' : ''}`} onClick={() => { route.push('/editprofile') }} type="button">
                        <i className="fa-regular fa-pen-to-square me-2"></i> Edit Profile
                    </button>

                    <button className={`nav-link ${pathname === '/settings' ? 'active' : ''}`} onClick={() => { route.push('/settings') }} type="button">
                        <i className="fa-solid fa-sliders me-2"></i> Account Settings
                    </button>

                    {userType === 1 && (
                        <button className={`nav-link ${pathname === '/savedtour' ? 'active' : ''}`} onClick={() => { route.push('/savedtour') }} type="button">
                            <i className="fa-regular fa-heart me-2"></i> Saved Tours
                        </button>
                    )}

                    <button className={`nav-link ${pathname === '/bookings' ? 'active' : ''}`} onClick={() => { route.push('/bookings') }} type="button">
                        <i className="fa-solid fa-suitcase me-2"></i> 
                        {userType === 2 ? 'Employee Bookings' : userType === 3 ? 'Client Bookings' : 'My Bookings'}
                    </button>

                    <button className={`nav-link ${pathname === '/wallet' ? 'active' : ''}`} onClick={() => { route.push('/wallet') }} type="button">
                        <i className="fa-solid fa-wallet me-2"></i> 
                        {userType === 3 ? 'Commission Wallet' : 'Wallet Overview'}
                    </button>

                    {(userType === 1 || userType === 3) && (
                        <button className={`nav-link ${pathname === '/withdraw' ? 'active' : ''}`} onClick={() => { route.push('/withdraw') }} type="button">
                            <i className="fa-solid fa-money-bill-transfer me-2"></i> 
                            {userType === 3 ? 'Payout Withdraw' : 'Withdraw Cash'}
                        </button>
                    )}

                    {(userType === 1 || userType === 3) && (
                        <button className={`nav-link ${pathname === '/myreferal' ? 'active' : ''}`} onClick={() => { route.push('/myreferal') }} type="button">
                            <i className="fa-solid fa-gift me-2"></i> 
                            {userType === 3 ? 'Agent Referral Tools' : 'Refer & Earn'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SideBar
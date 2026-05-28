"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

function SideBar() {
    const route = useRouter()
    return (
        <>
            <div className="col-lg-4 col-xl-3 mb-4">
                <div className="dashboard-sidebar">
                    <div className="user-nav-card">
                        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80" className="rounded-circle mb-3" alt="User Profile Image"/>
                            <h5 className="fw-bold m-0 text-dark">Alex Morgan</h5>
                            <p className="text-muted small m-0">Premium Globetrotter Member</p>
                    </div>
                    <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                        <button className="nav-link active" onClick={()=>{route.push('/profile')}} id="profile-tab" data-bs-toggle="pill" data-bs-target="#profile-panel" type="button" role="tab"><i className="fa-regular fa-user"></i> User Profile</button>
                        <button className="nav-link"  onClick={()=>{route.push('/editprofile')}}  id="edit-profile-tab" data-bs-toggle="pill" data-bs-target="#edit-profile-panel" type="button" role="tab"><i className="fa-regular fa-pen-to-square"></i> Edit Profile</button>
                        <button className="nav-link"  onClick={()=>{route.push('/savedtour')}}  id="saved-post-tab" data-bs-toggle="pill" data-bs-target="#saved-post-panel" type="button" role="tab"><i className="fa-regular fa-heart"></i> Saved Tours</button>
                        <button className="nav-link"  onClick={()=>{route.push('/settings')}}  id="settings-tab" data-bs-toggle="pill" data-bs-target="#settings-panel" type="button" role="tab"><i className="fa-solid fa-sliders"></i> Account Settings</button>
                        <button className="nav-link" onClick={()=>{route.push('/bookings')}} id="bookings-tab" data-bs-toggle="pill" data-bs-target="#bookings-panel" type="button" role="tab" aria-selected="true"><i className="fa-solid fa-suitcase"></i> My Bookings</button>
                        <button className="nav-link" onClick={()=>{route.push('/wallet')}} id="wallet-tab" data-bs-toggle="pill" data-bs-target="#wallet-panel" type="button" role="tab" aria-selected="false" tabindex="-1"><i className="fa-solid fa-wallet"></i> Wallet Overview</button>
                        <button className="nav-link" onClick={()=>{route.push('/withdraw')}} id="withdraw-tab" data-bs-toggle="pill" data-bs-target="#withdraw-panel" type="button" role="tab" aria-selected="false" tabindex="-1"><i className="fa-solid fa-money-bill-transfer"></i> Withdraw Cash</button>
                        <button className="nav-link" onClick={()=>{route.push('/myreferal')}} id="refer-tab" data-bs-toggle="pill" data-bs-target="#refer-panel" type="button" role="tab" aria-selected="false" tabindex="-1"><i className="fa-solid fa-gift"></i> Refer &amp; Earn</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SideBar
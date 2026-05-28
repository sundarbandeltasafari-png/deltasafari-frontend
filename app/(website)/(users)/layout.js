import React from 'react'
import "./users.css"
import SideBar from '@/components/user/SideBar'
function layout({ children }) {
    return (
        <div className="container pb-5">
            <div className="row mb-5 mt-5">
                <SideBar />
                {children}
            </div>
        </div>
    )
}

export default layout
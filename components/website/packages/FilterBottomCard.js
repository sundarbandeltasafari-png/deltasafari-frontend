import React from 'react'

function FilterBottomCard() {
    return (
        <div className="filter-wrapper bottom-card">
            <div className="container">
                <div className="filter-input-wrap m-auto d-flex justify-content-evenly gap-2 flex-wrap"
                    style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", maxWidth: "700px", borderRadius: "30px", padding: "10px" }}>
                    <div className="d-flex justify-content-between">
                        <div className="d-flex justify-content-between gap-2 align-items-center">
                            <img src={process.env.NEXT_PUBLIC_PUBLIC_URL+'assets/images/package/group-departure.png'} alt="" />
                            <p className="m-0">Group Departure</p>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div className="d-flex justify-content-between gap-2 align-items-center">
                            <img src={process.env.NEXT_PUBLIC_PUBLIC_URL+'assets/images/package/honeymoon.png'} alt="" />
                            <p className="m-0">Honeymoon</p>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div className="d-flex justify-content-between gap-2 align-items-center">
                            <img src={process.env.NEXT_PUBLIC_PUBLIC_URL+'assets/images/package/pilgrimage.png'} alt="" />
                            <p className="m-0">Pilgrimage</p>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div className="d-flex justify-content-between gap-2 align-items-center">
                            <img src={process.env.NEXT_PUBLIC_PUBLIC_URL+'assets/images/package/luxury.png'} alt="" />
                            <p className="m-0">Luxury</p>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div className="d-flex justify-content-between gap-2 align-items-center">
                            <img src={process.env.NEXT_PUBLIC_PUBLIC_URL+'assets/images/package/advanture.png'} alt="" />
                            <p className="m-0">Adventure</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterBottomCard
import React from 'react'

function TopDestination({ topDesination }) {
    const topdest = [...topDesination].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
    return (
        <>
            <div className="home5-destination-section mb-60 pt-3">
                <div className="container">
                    <div className="row justify-content-start mb-50 wow animate fadeInDown" data-wow-delay="200ms"
                        data-wow-duration="1500ms"
                        style={{ visibility: "visible", animationDuration: "1500m", animatiDDelay: "200s" }}>
                        <div className="col-xl-6 col-lg-8">
                            <div className="section-title text-start">
                                <h2>Top Destinations</h2>
                                <p className="m-0 mt-2">Travel beyond boundaries with incredible savings</p>
                            </div>
                        </div>
                    </div>
                    <div className="row g-xl-4 g-lg-3 gy-4 m-0">
                        <div className='col-lg-5 col-md-12'>
                            <div className="row g-xl-4 g-lg-3 gy-4">
                                {
                                    topdest?.map((elem, index) => {
                                        return index < 3 && <div className={`col-md-${index == 0 ? 12 : 6} my-1 px-1 wow animate fadeInDown`} data-wow-delay="200ms" data-wow-duration="1500ms"
                                            style={{ visibility: "visible", animationDuration: "1500m", animatiDDelay: "200s" }}>
                                            <div className="destination-card2 four">
                                                <div className="destination-img">
                                                    <img src={process.env.NEXT_PUBLIC_SERVER_URL + elem?.image} alt={elem?.name} />
                                                </div>
                                                <div className="destination-content-wrap">
                                                    <div className="destination-content">
                                                        <h5><a href={"/destination/" + elem?.slug}>{elem?.name}</a></h5>
                                                        <span>{elem?.showing_text}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    })
                                }

                                {/* <div className="col-md-6 my-1 px-1 wow animate fadeInDown" data-wow-delay="400ms" data-wow-duration="1500ms"
                                    style={{ visibility: "visible", animationDuration: "1500ms", animationDelay: "400ms" }}>
                                    <div className="destination-card2 four">
                                        <div className="destination-img">
                                            <img src="assets/img/home5/destination-img2.jpg" alt="" />
                                        </div>
                                        <div className="destination-content-wrap">
                                            <div className="destination-content">
                                                <h5><a href="destination-details.html">Great Wall of China</a></h5>
                                                <span>4 Nights / 5 Days</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 my-1 px-1 wow animate fadeInDown" data-wow-delay="600ms" data-wow-duration="1500ms"
                                    style={{ visibility: "visible", animationDuration: "1500ms", animationDelay: "600ms" }}>
                                    <div className="destination-card2 four">
                                        <div className="destination-img">
                                            <img src="assets/img/home5/destination-img3.jpg" alt="" />
                                        </div>
                                        <div className="destination-content-wrap">
                                            <div className="destination-content">
                                                <h5><a href="destination-details.html">Great Temple Jordan</a></h5>
                                                <span>3 Nights / 4 Days</span>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                        <div className="col-lg-3 my-1 px-1 col-md-4 wow animate fadeInDown" data-wow-delay="600ms" data-wow-duration="1500ms"
                            style={{ visibility: "visible", animationDuration: "1500ms", animationDelay: "600ms" }}>
                            {topdest.length > 2 && <div className="destination-card2 four h-100">
                                <div className="destination-img h-100">
                                    <img src={process.env.NEXT_PUBLIC_SERVER_URL + topdest[3].image} alt={topdest[3].name} className='h-100' style={{ objectFit: "cover", maxHeight: '100%' }} />
                                </div>
                                <div className="destination-content-wrap">
                                    <div className="destination-content">
                                        <h5><a href={"/destination/" + topdest[3]?.slug}>{topdest[3].name}</a></h5>
                                        <span>{topdest[3].show_text}</span>
                                    </div>
                                </div>
                            </div>}
                        </div>
                        <div className='col-lg-4 col-md-8'>
                            <div className="row g-xl-4 g-lg-3 gy-4">
                                {
                                    topdest?.map((elem, index) => {
                                        return (index > 3 && index < 6) && <div className="col-md-12 my-1 px-1 wow animate fadeInDown" data-wow-delay="400ms" data-wow-duration="1500ms"
                                            style={{ visibility: "visible", animationDuration: "1500ms", animationDelay: "400ms" }}>
                                            <div className="destination-card2 four">
                                                <div className="destination-img">
                                                    <img src={process.env.NEXT_PUBLIC_SERVER_URL + elem?.image} alt={elem?.name} />
                                                </div>
                                                <div className="destination-content-wrap">
                                                    <div className="destination-content">
                                                        <h5><a href={"/destination/" + elem?.slug}>{elem?.name}</a></h5>
                                                        <span>{elem?.showing_text}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TopDestination
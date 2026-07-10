import React from 'react'
import SwiperWraperHolidayPackages from './swiper/SwiperWraperHolidayPackages'
import axios from 'axios';
import { getHomePackagesUrl } from '@/routes/settingsRoute';

async function HolidayPackages() {
    let international = [];
    let domestic = [];
    try {
        const response = await axios.get(getHomePackagesUrl);
        if (response.data?.status) {
            domestic = response.data?.domestic
            international = response.data?.international
        }
    } catch (error) {
        international = [];
        domestic = [];
    }
    return (
        <>
            <div className="home1-destination-section mb-100">
                <div className="container">
                    <div className="row justify-content-start mb-3 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
                        <div className="col-lg-10">
                            <div className="section-title text-start">
                                <h2>Handpicked Holiday Packages</h2>
                                <p className="m-0">Indulge in unforgettable adventure with special tour plans.</p>
                            </div>
                            <ul className="nav mt-2 nav-pills justify-content-start" id="pills-tab" role="tablist">
                                {domestic && domestic.length > 0 && <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="pills-europe-tab" data-bs-toggle="pill" data-bs-target="#pills-europe" type="button" role="tab" aria-controls="pills-europe" aria-selected="true">Domestic</button>
                                </li>}
                                {international && international.length > 0 && <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="pills-asia-tab" data-bs-toggle="pill" data-bs-target="#pills-asia" type="button" role="tab" aria-controls="pills-asia" aria-selected="false">International</button>
                                </li>}

                            </ul>
                        </div>
                    </div>
                    <div className="tab-content" id="pills-tabContent">
                        <div className="tab-pane fade show active" id="pills-europe" role="tabpanel" aria-labelledby="pills-europe-tab">
                            {domestic && domestic.length > 0 &&  <SwiperWraperHolidayPackages data={domestic} />}
                        </div>
                        <div className="tab-pane fade" id="pills-asia" role="tabpanel" aria-labelledby="pills-asia-tab">
                            {international && international.length > 0 && <SwiperWraperHolidayPackages data={international} />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HolidayPackages
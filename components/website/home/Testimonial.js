import React from 'react'
import SwiperWraperTesimonial from './swiper/SwiperWraperTesimonial'

function Testimonial() {
    const googleReviewLink = "https://www.google.com/search?sca_esv=daf998d8db52a0ce&rlz=1C1VDKB_enIN1113IN1113&sxsrf=APpeQntp-t_yMMgAImxLsS2tuHfHW1MNeg:1785735587595&si=APenkKm7iecQ4G6P-TsbSMFKIQtv3EFIqRAFw-i8uEbk55Z-_-FV_l4Qf9ZlDtQv7uS0PbVZ5NTsRwV5rY_L9DBfXAG2MtfNLX3REBrkwGzb_rg9tZSQq3v8SBGRNGhLBeRyKMsFVqOf&q=Delta+Safari+Reviews&sa=X&ved=2ahUKEwiC4_G634OWAxUljeEIHd_dI_QQ0bkNegQINxAH&biw=1536&bih=730&dpr=1.25";

    const testimonialData = [
        {
            "id": 1,
            "title": "Service Was Too Awesome",
            "description": "Service was too awesome, everything part by part included which they were informed by whatsapp. Management was good.\nAlso nasir vaya behaviour was too good",
            "rating": 5,
            "date": "15 Jan 2026",
            "googleReviewUrl": googleReviewLink,
            "author": {
                "name": "Nil Sarkar",
                "role": "Google Reviewer",
                "image": "assets/img/home1/nil-sarkar.jpg"
            }
        },
        {
            "id": 2,
            "title": "Darun Experience!",
            "description": "Darun experience khub bhalo bebohar khawa dawa ta to kono kotha hobe na sob kichu time to time sobai aste paren darun poriseba nice hotel everything is very nice and stop behaviour very nice people Thank Delta Tourism ❤️",
            "rating": 5,
            "date": "08 Feb 2026",
            "googleReviewUrl": googleReviewLink,
            "author": {
                "name": "Nitish Roy",
                "role": "Google Reviewer",
                "image": "assets/img/home1/nitish-roy.jpg"
            }
        },
        {
            "id": 3,
            "title": "Such A Great Hospitality",
            "description": "Such a great hospitality, I will give no 1 rank in case of Sundarban travel packages....I will recommend everyone to make a such trip from delta safari",
            "rating": 5,
            "date": "22 Mar 2026",
            "googleReviewUrl": googleReviewLink,
            "author": {
                "name": "Indranil Halder",
                "role": "Google Reviewer",
                "image": "assets/img/home1/indranil-halder.jpg"
            }
        },
        {
            "id": 4,
            "title": "Very Good Service 10/10",
            "description": "Very good service,,, well maintained.. very polite behaviour,, we enjoyed very much , and have lots of fun and listened so much cool and horrifying stories about sundarban and tiger attacks.. and food also so so good and comfortable.. 10/10",
            "rating": 5,
            "date": "14 Apr 2026",
            "googleReviewUrl": googleReviewLink,
            "author": {
                "name": "Ayon Mondal",
                "role": "Google Reviewer",
                "image": "assets/img/home1/ayon-mondal.jpg"
            }
        },
        {
            "id": 5,
            "title": "Hardworking & Reliable Service",
            "description": "Before starting his own travel business, he worked as an employee at Sundarban Bubai Travels. When he left to start his own venture, I initially had some doubts about whether he would be able to organize tours professionally. However, after referring several guests to him, I received excellent feedback from all of them regarding his service, planning, and hospitality.\n\nDuring his time at our organization, he played a major role in organizing many successful trips. Based on my experience, he is hardworking, reliable, and capable of managing tours smoothly. I would confidently recommend his services to anyone looking for a well-organized and memorable travel experience.",
            "rating": 5,
            "date": "05 May 2026",
            "googleReviewUrl": googleReviewLink,
            "author": {
                "name": "Buddhiswar Nayek",
                "role": "Google Reviewer",
                "image": "assets/img/home1/buddhiswar-nayek.jpg"
            }
        },
        {
            "id": 6,
            "title": "Truly Memorable Trip!",
            "description": "Our Sundarban trip with Delta Safari was truly memorable! The journey was comfortable, the resort was clean, and the food was super tasty — especially the fresh fish dishes. The boat safari was the highlight, and the team made sure we enjoyed every moment. Great hospitality and service! 👍",
            "rating": 5,
            "date": "18 Jun 2026",
            "googleReviewUrl": googleReviewLink,
            "author": {
                "name": "Santanu Saha",
                "role": "Google Reviewer",
                "image": "assets/img/home1/santanu-saha.jpg"
            }
        }
    ]

    return (
        <>
            <div className="home2-testimonial-section">
                <div className="container">
                    <div className="row justify-content-between align-items-center mb-50 wow animate fadeInDown" data-wow-delay="200ms"
                        data-wow-duration="1500ms">
                        <div className="col-xl-6 col-lg-8">
                            <div className="section-title text-start">
                                <h2>Hear It from Travelers</h2>
                                <p className="m-0">We go beyond just booking trips—we create unforgettable travel experiences that match your
                                    dreams!</p>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-4 d-flex justify-content-lg-end mt-3 mt-lg-0">
                            <a 
                                href={googleReviewLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill shadow-sm"
                                style={{ 
                                    textDecoration: 'none', 
                                    fontWeight: '600', 
                                    backgroundColor: '#ffffff', 
                                    border: '1px solid #2196f3', 
                                    color: '#2196f3',
                                    transition: 'all 0.2s ease-in-out'
                                }}
                            >
                                <img src="https://cdn.trustindex.io/assets/platform/Google/icon.svg" alt="Google" style={{ width: '20px', height: '20px' }} />
                                <span>View Google Reviews</span>
                            </a>
                        </div>
                    </div>
                    <div className="row mb-40">
                        <div className="col-lg-12">
                            <SwiperWraperTesimonial data={testimonialData} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Testimonial
import { formatDate } from '@/libs/timeHelper';
import { urlEncode } from '@/libs/urlHelper';
import { homePostsUrl } from '@/routes/homeRoutes';
import axios from 'axios';
import Link from 'next/link';
import React from 'react'
import SwiperWrapperBlog from './swiper/SwiperWrapperBlog';

async function HomeBlog() {
    let posts = null;
    try {
        const response = await axios.get(homePostsUrl);
        if (response.data?.status) {
            posts = response.data?.posts;
        }
    } catch (error) {
        posts = null;
    }

    return (
        <>
            {posts && posts.length > 0 && <div className="home2-blog-section mb-3 mt-2">
                <div className="container">
                    <div className="row justify-content-start mb-50 wow animate fadeInDown" data-wow-delay="200ms"
                        data-wow-duration="1500ms">
                        <div className="col-xl-6 col-lg-8">
                            <div className="section-title text-start">
                                <h2>Travel Inspirations</h2>
                                <p className="m-0">A curated list of the most popular travel packages based on different destinations.</p>
                            </div>
                        </div>
                    </div>
                    <div className="g-4 mb-40">
                        <SwiperWrapperBlog data={posts} />
                    </div>
                </div>
            </div>}
        </>
    )
}

export default HomeBlog
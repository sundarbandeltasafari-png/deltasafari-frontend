import { formatDate } from '@/libs/timeHelper';
import { urlEncode } from '@/libs/urlHelper';
import { homePostsUrl } from '@/routes/homeRoutes';
import axios from 'axios';
import Link from 'next/link';
import React from 'react'

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
            <div className="home2-blog-section mb-100 mt-5">
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
                    <div className="row g-4 mb-40">
                        {
                            posts && posts.length > 0 && posts?.map((post, index) => {
                                return <div key={index} className="col-lg-3 col-md-6 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
                                    <div className="blog-card2">
                                        <div className="blog-img-wrap">
                                            <Link href={"/blogs/" + post?.slug + "-" + urlEncode(post?.id)} className="blog-img">
                                                <img src={process.env.NEXT_PUBLIC_SERVER_URL + post?.featured_image} alt="" />
                                            </Link>
                                            <div className="blog-date">
                                               {formatDate(post?.created_at)?.split(',')[0]?.split(" ")[1]}<span>{formatDate(post?.created_at)?.split(',')[0]?.split(" ")[0]}.</span>
                                            </div>
                                        </div>
                                        <div className="blog-content">
                                            <Link href={"/blogs/category/" + post?.category_slug + "-" + urlEncode(post?.category_id)} className="location">
                                                {post?.category_name}
                                            </Link>
                                            <h4>
                                                <Link className='twoline' href={"/blogs/" + post?.slug + "-" + urlEncode(post?.id)}>
                                                    {post?.title}
                                                </Link>
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeBlog
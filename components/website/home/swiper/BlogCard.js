import { formatDate } from '@/libs/timeHelper'
import { urlEncode } from '@/libs/urlHelper'
import Link from 'next/link'
import React from 'react'

function BlogCard({ post }) {
    return (
        <div className="wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
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
    )
}

export default BlogCard
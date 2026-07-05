'use client';

import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import BlogCard from './BlogCard';
import Loading from '../common/Loading';
import { getAllBlogsUrl } from '@/routes/commonRoutes';
import { axiosNormalGet } from '@/libs/axiosHelper';

export default function InfiniteScrollBlogComponent({ blogs, slug }) {
    const [items, setItems] = useState(blogs);
    const [loading, setLoading] = useState(false);
    const [endNews, setEndNews] = useState(false)

    const { ref, inView } = useInView({
        threshold: 0.5,
    });

    
    const loadMoreItems = async () => {
        if (loading) return;
        setLoading(true);
        let detectcat = false;
        if (slug) {
            if(slug?.split("-").length > 1){
                let postId = slug?.split("-")[slug?.split("-").length - 1];
                if(Number.isInteger(postId)){
                    detectcat = true;
                }
            }else{
                detectcat = true;
            }
        }
        axiosNormalGet(`${getAllBlogsUrl}?id=${items[items?.length - 1]?.id}${detectcat ? '&cat='+slug : ''}`).then((res) => {
            if (res?.status && res?.blogs.length > 0) {
                setItems((prev) => [...prev, ...res?.blogs]);
            } else {
                setEndNews(true)
            }
        }).catch((err) => {
            console.log("Infinity scroll news error: " + err.message);
        }).finally(() => {
            setLoading(false);
        })
    };

    // Trigger loadMoreItems whenever the loading element comes into view
    useEffect(() => {
        if (inView && !endNews) {
            loadMoreItems();
        }
    }, [inView]);

    return (
        <>
            {items.length > 0 && items.map((post, index) => {
                return <BlogCard blog={post} key={index} />
            })
            }
            {/* Attach the ref to this element at the bottom */}
            {!endNews && <div ref={ref} className="p-4 text-center">
                {loading ?
                    <div className='d-flex gap-2'>
                        <Loading />
                    </div>
                    :
                    <span class="badge rounded-pill text-bg-secondary">Scroll down to load more</span>
                }
            </div>}
        </>
    );
}
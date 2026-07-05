import React, { cache } from 'react';
import "../page.css"
import BlogCard from '@/components/blog/BlogCard';
import { getAllBlogsUrl, getParticularBlogUrl, getTotalCategoryBlogsUrl, getTrendingBlogsUrl } from '@/routes/commonRoutes';
import { notFound, redirect } from 'next/navigation';
import axios from 'axios';
import InfiniteScrollBlogComponent from '@/components/blog/InfiniteScrollBlogComponent';
import Link from 'next/link';
import { urlEncode } from '@/libs/urlHelper';
import BlogSearch from '@/components/blog/BlogSearch';
import BlogSearchResults from '@/components/blog/BlogSearchResults';
import BlogShareCard from '@/components/blog/BlogShareCard';

const getPostData = cache(async (slug) => {
    let particularBlog = null;
    let postId = null
    let allCatBlogs = [];
    if (slug?.split("-").length > 1) {
        const postSlug = slug;
        postId = postSlug?.split("-")[postSlug?.split("-").length - 1];
    }

    if (!postId) {
        const response = await axios.get(`${getAllBlogsUrl}?cat=${slug}`);
        if (response.data?.status) {
            allCatBlogs = response.data?.blogs || null
        }
    } else {
        const response = await axios.get(`${getParticularBlogUrl}?id=${postId}`);
        if (response.data?.status) {
            particularBlog = response.data?.blog || null
        }
    }
    return { particularBlog: particularBlog, allCatBlogs: allCatBlogs };
});

// 2. Metadata uses the cached function
export async function generateMetadata({ params }) {
    const { slug } = await params;
    const { particularBlog, allCatBlogs } = await getPostData(slug);

    if (particularBlog) {
        const cleanImagePath = particularBlog.featured_image.replace(/\\/g, '/');
        const imageUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}${cleanImagePath}`;
        const cleanSummary = particularBlog.summary.replace(/\r\n/g, ' ');

        return {
            title: particularBlog.title,
            description: cleanSummary,
            keywords: particularBlog.post_tags,
            openGraph: {
                title: particularBlog.title,
                description: cleanSummary,
                url: `${process.env.NEXT_PUBLIC_PUBLIC_URL}blogs/${encodeURI(particularBlog?.slug + "-" + urlEncode(particularBlog?.id))}`,
                images: [{ url: imageUrl, width: 1200, height: 630 }],
                type: 'article',
            },
            twitter: {
                card: 'summary_large_image',
                title: particularBlog.title,
                description: cleanSummary,
                images: [imageUrl],
            },
        };
    }

}


export default async function page({ params }) {
    const { slug } = await params;
    const { particularBlog, allCatBlogs } = await getPostData(slug);
    let catBlogs = [];
    let trendingBlogs = [];

    try {
        const tresponse = await axios.get(getTotalCategoryBlogsUrl);
        if (tresponse.data?.status) {
            catBlogs = tresponse.data?.catBlogs || []
        }
        const trresponse = await axios.get(getTrendingBlogsUrl);
        if (trresponse.data?.status) {
            trendingBlogs = trresponse.data?.blogs.length > 0 ? trresponse.data?.blogs : []
        }
    } catch (error) {
        redirect('/error');
    }

    if (!particularBlog && !allCatBlogs && allCatBlogs.length == 0) {
        notFound()
    }

    let newBlogs = allCatBlogs || []
    const nextBlogs = newBlogs.length > 0 ? newBlogs.slice(3) : [];
    const updatedBlogs = newBlogs.length> 0 ? allCatBlogs.slice(0, 3) : [];

    return (
        <div className="bg-light py-5 pt-0">
            <div className='page-header-div'>
                <img src={process.env.NEXT_PUBLIC_PUBLIC_URL + 'assets/images/pagebg.jpg'} />
                <h1 className='mb-5'>Travel Inspiration</h1>
            </div>
            <div className="container">

                <div className="row flex-wrap g-4">
                    {/* LEFT: Blog Post Feed List */}
                    <div className="col-lg-8">
                        {particularBlog ?
                            <div className="d-flex flex-column gap-5">
                                <div class="inspiration-details">
                                    <h1>{particularBlog?.title}</h1>
                                    <span class="line-break"></span>
                                    <p>{particularBlog?.summary}</p>
                                    <span class="line-break"></span>
                                    <span class="line-break"></span>
                                    <div class="inspiration-image mb-50">
                                        <img src={process.env.NEXT_PUBLIC_SERVER_URL + particularBlog?.featured_image} alt="" />
                                    </div>
                                    {particularBlog?.content && <div className='content' style={{ marginBottom: '45px' }} dangerouslySetInnerHTML={{ __html: particularBlog?.content }} />}
                                    <div class="tag-and-social-area">
                                        <div class="tag-area">
                                            <h6>Tag:</h6>
                                            <ul class="tag-list">
                                                {
                                                    particularBlog?.post_tags.length > 0 && particularBlog?.post_tags?.map((tag, index) => (
                                                        <li key={index}><a>{tag}</a></li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                        <div class="social-area">
                                            <h6>Share:</h6>
                                            <BlogShareCard url={`${encodeURI(particularBlog.slug + '-' + urlEncode(particularBlog.id))}`} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="d-flex flex-column gap-5">
                                {updatedBlogs.map((blog, index) => (
                                    <BlogCard blog={blog} key={index} />
                                ))}
                                {updatedBlogs.length > 0 && <InfiniteScrollBlogComponent blogs={nextBlogs} slug={slug} />}
                            </div>
                        }
                    </div>

                    {/* RIGHT SIDEBAR: Sticky Layout */}
                    <div className="col-lg-4">
                        <aside className="" >
                            <div className="d-flex flex-column gap-4">

                                {/* Widget 1: Search */}
                                <BlogSearch />

                                {/* Widget 2: Categories */}
                                <div className="card border-0 shadow-sm p-4 bg-white">
                                    <h4 className="fw-bold mb-3 h5 border-start  ps-2">Categories</h4>
                                    <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
                                        {catBlogs.map((cat, i) => (
                                            <li key={i}>
                                                <Link href={"/blogs/" + encodeURI(cat.slug)} className="d-flex justify-content-between align-items-center text-decoration-none text-secondary py-1 hover-link">
                                                    <span>{cat?.name}</span>
                                                    <span className="badge bg-light text-dark border rounded-pill">{cat?.total_blogs}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Widget 3: Popular Packages / Recent Posts */}
                                <div className="card border-0 shadow-sm p-4 bg-white">
                                    <h4 className="fw-bold mb-3 h5 border-start  ps-2">Trending Insights</h4>
                                    <div className="d-flex flex-column gap-3">
                                        {trendingBlogs.map((item, index) => (
                                            <BlogSearchResults item={item} key={index} />
                                        ))}
                                    </div>
                                </div>

                                {/* Widget 4: Tags */}
                                {/* <div className="card border-0 shadow-sm p-4 bg-white">
                                    <h4 className="fw-bold mb-3 h5 border-start  ps-2">Popular Tags</h4>
                                    <div className="d-flex flex-wrap gap-2">
                                        {['Tours', 'Hotels', 'Visa', 'Experience', 'Maldives Tour', 'Paris Tour', 'Guidance', 'Budgeting'].map((tag, i) => (
                                            <a key={i} href="#" className="btn btn-light btn-sm text-secondary border rounded-pill px-3 py-1 text-xs">
                                                {tag}
                                            </a>
                                        ))}
                                    </div>
                                </div> */}

                            </div>
                        </aside>
                    </div>

                </div>
            </div>
        </div>
    );
}
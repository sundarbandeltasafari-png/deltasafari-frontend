import React from 'react';
import "./page.css"
import BlogCard from '@/components/blog/BlogCard';
import { getAllBlogsUrl, getTotalCategoryBlogsUrl, getTrendingBlogsUrl } from '@/routes/commonRoutes';
import { notFound, redirect } from 'next/navigation';
import axios from 'axios';
import InfiniteScrollBlogComponent from '@/components/blog/InfiniteScrollBlogComponent';
import Link from 'next/link';
import BlogSearch from '@/components/blog/BlogSearch';
import BlogSearchResults from '@/components/blog/BlogSearchResults';


export default async function page() {
  let blogs = [];
  let catBlogs = [];
  let trendingBlogs = [];
  try {
    const response = await axios.get(getAllBlogsUrl);
    if (response.data?.status) {
      blogs = response.data?.blogs || []
    } else {
      redirect('/error');
    }
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

  

  if (!blogs) {
    notFound()
  }


  let newBlogs = blogs
  const nextBlogs = newBlogs.length > 0 ? newBlogs.slice(3) : [];
  const updatedBlogs = blogs.slice(0, 3);

  return (
    <div className="bg-light py-5 pt-0">
      <div className='page-header-div'>
        <img src={process.env.NEXT_PUBLIC_PUBLIC_URL + 'assets/images/pagebg.jpg'} />
        <h1 className='mb-5'>Travel Inspiration</h1>
      </div>
      <div className="container">

        <div className="row flex-wrap-reverse g-4">
          {/* LEFT: Blog Post Feed List */}
          <div className="col-lg-8">
            <div className="d-flex flex-column gap-5">
              {updatedBlogs.map((blog, index) => (
                <BlogCard blog={blog} key={index} />
              ))}
              {updatedBlogs.length > 0 && <InfiniteScrollBlogComponent blogs={nextBlogs} />}
            </div>
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
                    {trendingBlogs.map((item, i) => (
                      <BlogSearchResults item={item} key={i} />
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
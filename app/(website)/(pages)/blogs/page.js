'use client';

import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

// Initial Mock Data mirroring GoFly Travel Inspiration layout
const INITIAL_BLOGS = [
  {
    id: 1,
    title: '10 Essential Tips for Solo Travelers in Southeast Asia',
    category: 'Travel Guide',
    date: 'June 24, 2026',
    author: 'Selina Henry',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Explore the world with care, enriched by culture and confidence. Solo traveling can be intimidating, but these tips will make it seamless...',
  },
  {
    id: 2,
    title: 'The Ultimate Guide to Luxury Cruising in the Mediterranean',
    category: 'Luxury Tour',
    date: 'June 20, 2026',
    author: 'James Bonde',
    image: 'https://images.unsplash.com/photo-1500835556837-99ac94a94552?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Luxury cruises and organized tours gained popularity, especially among the elite. Discover how to plan your perfect summer vacation across Europe...',
  },
];

export default function page() {
  const [blogs, setBlogs] = useState(INITIAL_BLOGS);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Setup the Intersection Observer trigger for infinite scroll
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView && !loading && hasMore) {
      loadMoreBlogs();
    }
  }, [inView]);

  // Simulate API pagination fetch
  const loadMoreBlogs = () => {
    setLoading(true);
    setTimeout(() => {
      const nextBlogs = [
        {
          id: blogs.length + 1,
          title: `Discovering Hidden Gems: Off the Beaten Path in ${blogs.length % 2 === 0 ? 'Japan' : 'Switzerland'}`,
          category: 'Adventure',
          date: 'June 18, 2026',
          author: 'Robert Kcarery',
          image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
          excerpt: 'We specialize in crafting personalized journeys that suit every traveler\'s dream. Break away from standard itineraries...',
        },
        {
          id: blogs.length + 2,
          title: 'How to Budget and Save Money Avoid Hidden Tourist Traps',
          category: 'Budget Travel',
          date: 'June 15, 2026',
          author: 'Selina Henry',
          image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80',
          excerpt: 'Avoid hidden fees & tourist traps. Check out multi-destination & budget-friendly options to make your travel affordable...',
        }
      ];

      setBlogs((prev) => [...prev, ...nextBlogs]);
      setPage((prev) => prev + 1);
      setLoading(false);

      // Stop fetching after page 4 for mockup demonstration
      if (page >= 4) {
        setHasMore(false);
      }
    }, 1200);
  };

  return (
    <div className="bg-light py-5">
      <div className="container">
        {/* Page Header */}
        <div className="text-center mb-5">
          <h1 className="fw-bold text-dark display-5">Travel Inspiration</h1>
          <p className="text-muted">A curated list of the most popular travel packages and guides based on different destinations.</p>
        </div>

        <div className="row g-4">
          {/* LEFT: Blog Post Feed List */}
          <div className="col-lg-8">
            <div className="d-flex flex-column gap-5">
              {blogs.map((blog) => (
                <article key={blog.id} className="card border-0 shadow-sm overflow-hidden h-100 bg-white">
                  <div className="position-relative overflow-hidden" style={{ maxHeight: '420px' }}>
                    <img 
                      src={blog.image} 
                      alt={blog.title} 
                      className="card-img-top w-100 object-fit-cover transition-all"
                      style={{ height: '350px', objectPosition: 'center' }}
                    />
                    <span className="position-absolute top-0 start-0 m-3 bg-warning text-dark px-3 py-1 fw-semibold rounded-pill text-uppercase small">
                      {blog.category}
                    </span>
                  </div>
                  <div className="card-body p-4 p-md-5">
                    {/* Meta Data */}
                    <div className="d-flex align-items-center gap-3 text-muted mb-3 small fw-medium">
                      <span><i className="bi bi-calendar3 me-1"></i> {blog.date}</span>
                      <span>•</span>
                      <span><i className="bi bi-person me-1"></i> By {blog.author}</span>
                    </div>
                    {/* Title */}
                    <h2 className="card-title h3 fw-bold text-dark mb-3 lh-sm hover-text-warning">
                      <a href="#" className="text-decoration-none text-dark">{blog.title}</a>
                    </h2>
                    {/* Description */}
                    <p className="card-text text-secondary mb-4">{blog.excerpt}</p>
                    {/* Action */}
                    <a href="#" className="btn btn-outline-dark fw-semibold px-4 py-2 rounded-pill">
                      Read Details <i className="bi bi-arrow-right ms-2"></i>
                    </a>
                  </div>
                </article>
              ))}

              {/* Infinite Scroll Trigger Box */}
              <div ref={ref} className="text-center py-4">
                {loading && (
                  <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Loading content...</span>
                  </div>
                )}
                {!hasMore && <p className="text-muted fw-medium">You have caught up with all inspirations!</p>}
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR: Sticky Layout */}
          <div className="col-lg-4">
            <aside className="" >
              <div className="d-flex flex-column gap-4">
                
                {/* Widget 1: Search */}
                <div className="sticky-top card border-0 shadow-sm p-4 bg-white" style={{ top: '10%', zIndex: 10 }}>
                  <h4 className="fw-bold mb-3 h5 border-start  ps-2">Quick Search</h4>
                  <div className="input-group">
                    <input type="text" className="form-control border-end-0 py-2" placeholder="Search destination..." />
                    <button className="btn btn-warning px-3" type="button">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Widget 2: Categories */}
                <div className="card border-0 shadow-sm p-4 bg-white">
                  <h4 className="fw-bold mb-3 h5 border-start  ps-2">Categories</h4>
                  <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
                    {[
                      { name: 'Family Tour', count: '06' },
                      { name: 'Honeymoon Tour', count: '05' },
                      { name: 'Adventure Tour', count: '10' }
                    ].map((cat, i) => (
                      <li key={i}>
                        <a href="#" className="d-flex justify-content-between align-items-center text-decoration-none text-secondary py-1 hover-link">
                          <span>{cat.name}</span>
                          <span className="badge bg-light text-dark border rounded-pill">{cat.count}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Widget 3: Popular Packages / Recent Posts */}
                <div className="card border-0 shadow-sm p-4 bg-white">
                  <h4 className="fw-bold mb-3 h5 border-start  ps-2">Recent Insights</h4>
                  <div className="d-flex flex-column gap-3">
                    {[
                      { title: 'Thailand Tour Premium Package', price: '$190.00', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=120&q=80' },
                      { title: 'Switzerland Wonders Journey', price: '$345.00', img: 'https://images.unsplash.com/photo-1500835556837-99ac94a94552?auto=format&fit=crop&w=120&q=80' },
                      { title: 'Bali Hidden Paradise Escape', price: '$148.00', img: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=120&q=80' }
                    ].map((item, i) => (
                      <div key={i} className="d-flex align-items-center gap-3">
                        <img src={item.img} alt="" className="rounded object-fit-cover" style={{ width: '70px', height: '70px' }} />
                        <div>
                          <h6 className="mb-1 fw-semibold small-title line-clamp-2"><a href="#" className="text-decoration-none text-dark">{item.title}</a></h6>
                          <span className="text-warning fw-bold small">{item.price} / person</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Widget 4: Tags */}
                <div className="card border-0 shadow-sm p-4 bg-white">
                  <h4 className="fw-bold mb-3 h5 border-start  ps-2">Popular Tags</h4>
                  <div className="d-flex flex-wrap gap-2">
                    {['Tours', 'Hotels', 'Visa', 'Experience', 'Maldives Tour', 'Paris Tour', 'Guidance', 'Budgeting'].map((tag, i) => (
                      <a key={i} href="#" className="btn btn-light btn-sm text-secondary border rounded-pill px-3 py-1 text-xs">
                        {tag}
                      </a>
                    ))}
                  </div>
                </div>

              </div>
            </aside>
          </div>

        </div>
      </div>

      {/* Basic Hover Custom Styling Injector */}
      <style jsx global>{`
        .hover-text-warning a:hover {
          color: #ffc107 !important;
          transition: color 0.2s ease-in-out;
        }
        .hover-link:hover {
          color: #ffc107 !important;
          padding-left: 4px;
          transition: all 0.2s ease-in-out;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;  
          overflow: hidden;
        }
        .card-img-top {
          transition: transform 0.5s ease;
        }
        .card:hover .card-img-top {
          transform: scale(1.04);
        }
      `}</style>
    </div>
  );
}
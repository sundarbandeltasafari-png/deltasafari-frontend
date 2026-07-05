import { urlEncode } from '@/libs/urlHelper'
import Link from 'next/link'
import React from 'react'

function BlogCard({ blog }) {
    return (
        <article key={blog.id} className="d-flex flex-row card border-0 shadow-sm overflow-hidden h-100 bg-white" style={{ maxHeight: '285px' }}>
            <div className="col-md-4 position-relative overflow-hidden">
                <Link href={"/blogs/"+encodeURI(`${blog.slug}-${urlEncode(blog.id)}`)} >
                    <img
                        src={process.env.NEXT_PUBLIC_SERVER_URL+blog.featured_image}
                        alt={blog.title}
                        className="card-img-top w-100 object-fit-cover transition-all"
                        style={{ height: '300px', objectPosition: 'center' }}
                    />
                </Link>
                <span className="position-absolute top-0 start-0 m-3 bg-warning text-dark px-3 py-1 fw-semibold rounded-pill text-uppercase small">
                    {blog.category_name}
                </span>
            </div>
            <div className="col-md-8 card-body p-2 ps-3">
                {/* Meta Data */}
                <div className="d-flex align-items-center gap-3 text-muted mb-2 small fw-medium">
                    <span><i className="bi bi-calendar3 me-1"></i> {blog.updated_at}</span>
                    <span>•</span>
                    <span><i className="bi bi-person me-1"></i> By Deltasafari</span>
                </div>
                {/* Title */}
                 <Link href={"/blogs/"+encodeURI(`${blog.slug}-${blog.id}`)} >
                    <h2 className="card-title h3 fw-bold text-dark mb-2 lh-sm hover-text-warning twoline">
                        <h6 className="text-decoration-none text-dark">{blog.title}</h6>
                    </h2>
                 </Link>
                {/* Description */}
                <p className="card-text text-secondary mb-2 threeline">{blog.summary}</p>
                {/* Action */}
                <Link href={"/blogs/"+encodeURI(`${blog.slug}-${blog.id}`)} className="btn btn-outline-dark fw-semibold px-4 py-2 rounded-pill">
                    Read Details <i className="bi bi-arrow-right ms-2"></i>
                </Link>
            </div>
        </article>
    )
}

export default BlogCard
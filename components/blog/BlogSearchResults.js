import { urlEncode } from '@/libs/urlHelper'
import Link from 'next/link'
import React from 'react'

function BlogSearchResults({ item }) {
    return (
        <>
            {item && <Link href={"/blogs/" + encodeURI(`${item.slug}-${urlEncode(item.id)}`)}  className="d-flex align-items-center gap-3">
                <img src={process.env.NEXT_PUBLIC_SERVER_URL + item.featured_image} alt="" className="rounded object-fit-cover" style={{ width: '70px', height: '70px' }} />
                <div>
                    <h6 className="mb-0 fw-semibold small-title line-clamp-2"><h5 className="text-decoration-none text-dark twoline">{item.title}</h5></h6>
                    <span className="text-warning fw-bold small">{item.category_name}</span>
                </div>
            </Link>}
        </>
    )
}

export default BlogSearchResults
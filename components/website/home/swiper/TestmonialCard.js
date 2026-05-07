import React from 'react'

function TestmonialCard({ pkg }) {
    return (
        <>
            <div className="testimonial-card three">
                <div className='d-flex justify-content-between'>
                    <div className="author-area mt-0 mb-3">
                        <div className="author-img">
                            <img src={pkg?.author?.image} alt={pkg?.author?.name} />
                        </div>
                        <div className="author-info">
                            <h5>{pkg?.author?.name}</h5>
                            <span>10 Hour ago</span>
                        </div>
                    </div>
                    <div style={{width: "40px"}}>
                        <img src={"	https://cdn.trustindex.io/assets/platform/Google/icon.svg"} alt={pkg?.author?.name} />
                    </div>
                </div>
                <h5>{pkg?.title}</h5>
                <ul className="rating-area trustpilot">
                    {
                        Array(pkg.rating).fill(0).map((data, index) => <li key={index}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-star w-3.5 h-3.5 fill-yellow-500 stroke-yellow-500" aria-hidden="true"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" style={{ color: "#f0b100" }}></path></svg>
                        </li>)
                    }
                </ul>
                <p>{pkg?.description}</p>
            </div>
        </>
    )
}

export default TestmonialCard
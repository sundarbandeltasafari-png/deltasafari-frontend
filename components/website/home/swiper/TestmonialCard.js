import React from 'react'

const DEFAULT_GOOGLE_REVIEW_URL = "https://www.google.com/search?sca_esv=daf998d8db52a0ce&rlz=1C1VDKB_enIN1113IN1113&sxsrf=APpeQntp-t_yMMgAImxLsS2tuHfHW1MNeg:1785735587595&si=APenkKm7iecQ4G6P-TsbSMFKIQtv3EFIqRAFw-i8uEbk55Z-_-FV_l4Qf9ZlDtQv7uS0PbVZ5NTsRwV5rY_L9DBfXAG2MtfNLX3REBrkwGzb_rg9tZSQq3v8SBGRNGhLBeRyKMsFVqOf&q=Delta+Safari+Reviews&sa=X&ved=2ahUKEwiC4_G634OWAxUljeEIHd_dI_QQ0bkNegQINxAH&biw=1536&bih=730&dpr=1.25";

function TestmonialCard({ pkg }) {
    const googleReviewUrl = pkg?.googleReviewUrl || DEFAULT_GOOGLE_REVIEW_URL;

    const maxLen = 145;
    const descriptionText = pkg?.description || "";
    const isLong = descriptionText.length > maxLen;
    const displayText = isLong ? descriptionText.substring(0, maxLen).trim() + "..." : descriptionText;

    return (
        <a 
            href={googleReviewUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="testimonial-card-link"
            style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}
        >
            <div className="testimonial-card three" style={{ cursor: 'pointer', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div className='d-flex justify-content-between align-items-center'>
                    <div className="author-area mt-0 mb-1">
                        <div className="author-img">
                            <img 
                                src={pkg?.author?.image} 
                                alt={pkg?.author?.name} 
                                onError={(e) => {
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(pkg?.author?.name || 'User')}&background=4285F4&color=fff&rounded=true&bold=true`;
                                }}
                            />
                        </div>
                        <div className="author-info">
                            <h5>{pkg?.author?.name}</h5>
                            <span>{pkg?.date || pkg?.time || "15 Feb 2026"}</span>
                        </div>
                    </div>
                    <div style={{width: "40px"}}>
                        <img src={"https://cdn.trustindex.io/assets/platform/Google/icon.svg"} alt="Google Review" />
                    </div>
                </div>
                {pkg?.title && <h5>{pkg?.title}</h5>}
                <ul className="rating-area trustpilot">
                    {
                        Array(pkg?.rating || 5).fill(0).map((data, index) => (
                            <li key={index}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star w-3.5 h-3.5 fill-yellow-500 stroke-yellow-500" aria-hidden="true"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" style={{ color: "#f0b100" }}></path></svg>
                            </li>
                        ))
                    }
                </ul>
                <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, lineHeight: '1.45', fontSize: '14px' }}>
                        {displayText}{' '}
                        <span style={{ color: '#ef6614', fontWeight: '600', fontSize: '13px', display: 'inline' }}>
                            show more
                        </span>
                    </p>
                </div>
            </div>
        </a>
    )
}

export default TestmonialCard
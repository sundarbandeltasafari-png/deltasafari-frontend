import Link from 'next/link';

function HiddenGemsCard({ pkg }) {
    const linkUrl = pkg?.link || `/packages/name-${encodeURIComponent(pkg?.title || '')}`;
    return (
        <div className="destination-gem-item">
            <Link 
                href={linkUrl} 
                className="d-block position-relative rounded-4 overflow-hidden shadow-sm hover-lift text-decoration-none"
                style={{ height: '220px', background: '#f1f5f9' }}
            >
                <img 
                    src={pkg?.image?.startsWith('http') || pkg?.image?.startsWith('/') ? pkg.image : `/${pkg.image}`} 
                    alt={pkg?.title || 'Hidden Gem Destination'} 
                    className="w-100 h-100 object-fit-cover transition-all"
                    style={{ transition: 'transform 0.4s ease' }}
                    onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/assets/images/noimage.jpg';
                    }}
                />
                <div 
                    className="position-absolute bottom-0 start-0 w-100 p-3 d-flex flex-column justify-content-end"
                    style={{ 
                        background: 'linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.3) 60%, transparent 100%)',
                        height: '65%' 
                    }}
                >
                    <h5 className="text-white m-0 text-truncate" style={{ fontSize: '16px' }}>
                        {pkg?.title}
                    </h5>
                    <span className="text-white-50 mt-0.5" style={{ fontSize: '12px' }}>
                        Starting From {pkg?.currency || '₹'}{pkg?.price?.toLocaleString('en-IN')}
                    </span>
                </div>
            </Link>
        </div>
    );
}

export default HiddenGemsCard;
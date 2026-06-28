function HiddenGemsCard({pkg}) {
    return (
        <>
            <div className="destination-card2 hidden-gems five">
                <a href={pkg?.link} className="destination-img">
                    <img src={pkg?.image} alt={pkg?.title} />
                </a>
                <div className="destination-content">
                    <h5><a href={pkg?.link}>{pkg?.title}</a></h5>
                    <span>Starting From {pkg?.currency}{pkg?.price}</span>
                </div>
            </div>
        </>
    )
}

export default HiddenGemsCard
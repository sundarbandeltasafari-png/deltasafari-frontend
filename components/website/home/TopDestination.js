import React from 'react'

function TopDestination({ topDesination }) {
    const topdest = [...topDesination].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
    return (
        <>
            <div className="home5-destination-section mb-60 pt-0">
      <div className="container">
        {/* Section Title */}
        <div 
          className="row justify-content-start mb-4 wow animate fadeInDown" 
          data-wow-delay="200ms"
          data-wow-duration="1500ms"
          style={{ visibility: "visible", animationDuration: "1500ms", animationDelay: "200ms" }}
        >
          <div className="col-xl-6 col-lg-8">
            <div className="section-title text-start">
              <h2>Top Destinations</h2>
              <p className="m-0">Travel beyond boundaries with incredible savings</p>
            </div>
          </div>
        </div>

        {/* Mosaic Grid / Flex Layout Container */}
        <div className="destination-mosaic-grid">
          {topdest.map((elem, index) => {
            if (index >= 6) return null;

            // Map array indices to descriptive class names
            const layoutClasses = [
              "area-andaman",  // index 0 -> Top Left
              "area-manali",   // index 1 -> Bottom Left 1
              "area-gujarat",  // index 2 -> Bottom Left 2
              "area-thailand", // index 3 -> Center Tall
              "area-vietnam",  // index 4 -> Top Right
              "area-malaysia"  // index 5 -> Bottom Right
            ];

            return (
              <div 
                key={index} 
                className={`mosaic-item ${layoutClasses[index]} wow animate fadeInDown`} 
                data-wow-delay="200ms" 
                data-wow-duration="1500ms"
                style={{ visibility: "visible", animationDuration: "1500ms", animationDelay: "200ms" }}
              >
                <div className="destination-card2 four h-100 d-flex flex-column position-relative overflow-hidden rounded-4">
                  <div className="destination-img w-100 h-100">
                    <img 
                      src={process.env.NEXT_PUBLIC_SERVER_URL + elem?.image} 
                      alt={elem?.name} 
                      className="w-100 h-100"
                      style={{ objectFit: "cover", display: "block" }}
                    />
                  </div>
                  <div className="destination-content-wrap">
                    <div className="destination-content">
                      <h5>
                        <a href={"/destination/" + elem?.slug}>{elem?.name}</a>
                      </h5>
                      <span>{elem?.showing_text || elem?.show_text}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
            </div>
        </>
    )
}

export default TopDestination
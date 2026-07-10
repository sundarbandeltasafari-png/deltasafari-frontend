const PACKAGES = [
  {
    title: "Sundarban Team Offsite",
    location: "Sundarban, West Bengal",
    duration: "2N / 3D",
    image: "https://sundarbandeltasafari.com/assets/img/home9/destination-img1.jpg",
    tags: ["Boat Stay", "Team Building", "Mangrove Safari"],
    note: "Best for teams of 20–80",
  },
  {
    title: "Darjeeling Leadership Retreat",
    location: "Darjeeling, West Bengal",
    duration: "3N / 4D",
    image: "https://sundarbandeltasafari.com/assets/img/home9/destination-img7.jpg",
    tags: ["Offsite Venue", "Hill Views", "Workshop Ready"],
    note: "Best for teams of 15–50",
  },
  {
    title: "Digha Coastal Conference",
    location: "Digha, West Bengal",
    duration: "2N / 3D",
    image: "https://sundarbandeltasafari.com/assets/img/home2/destination-img4.jpg",
    tags: ["Banquet Hall", "Beach Evening", "AV Setup"],
    note: "Best for 50–300 delegates",
  },
  {
    title: "Gangtok Incentive Trip",
    location: "Gangtok, Sikkim",
    duration: "4N / 5D",
    image: "https://sundarbandeltasafari.com/assets/img/home9/destination-img3.jpg",
    tags: ["Reward Travel", "Adventure Add-ons", "Scenic"],
    note: "Best for top-performer groups",
  },
  {
    title: "Kolkata City Client Visit",
    location: "Kolkata, West Bengal",
    duration: "1N / 2D",
    image: "https://sundarbandeltasafari.com/assets/img/home9/destination-img6.jpg",
    tags: ["Airport Transfers", "Fine Dining", "Business Hotels"],
    note: "Best for client & partner visits",
  },
  {
    title: "Assam Tea Trail Offsite",
    location: "Assam",
    duration: "5N / 6D",
    image: "https://sundarbandeltasafari.com/assets/img/home9/destination-img8.jpg",
    tags: ["Nature Immersion", "Team Building", "Wellness"],
    note: "Best for teams of 20–60",
  },
];

export default function PackagesGrid() {
  return (
    <section id="packages" className="ds-section ds-bg-sand">
      <div className="container ds-container">
        <div className="row justify-content-between align-items-end mb-5">
          <div className="col-lg-7">
            <span className="ds-eyebrow">Package Ideas, Not Fixed Menus</span>
            <h2 className="mt-2 mb-0">Starting points for your itinerary</h2>
          </div>
          <div className="col-lg-4">
            <p className="ds-lead mb-0">
              These are starting frameworks — every route, stay category and inclusion is
              adjusted once we know your team size and dates. Pricing is shared only in your
              personal proposal, never listed here.
            </p>
          </div>
        </div>

        <div className="row g-4">
          {PACKAGES.map((pkg) => (
            <div className="col-md-6 col-lg-4" key={pkg.title}>
              <div className="ds-pkg-card">
                <div className="ds-pkg-media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={pkg.image} alt={pkg.title} loading="lazy" />
                  <span className="ds-pkg-badge">{pkg.location}</span>
                  <span className="ds-pkg-duration">{pkg.duration}</span>
                </div>
                <div className="ds-pkg-body">
                  <h5>{pkg.title}</h5>
                  <p className="ds-pkg-loc">{pkg.note}</p>
                  <div className="ds-pkg-tags">
                    {pkg.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                  <div className="ds-pkg-cta">
                    <span className="ds-quote-note">Quote shared privately</span>
                    <a href="#enquiry-form">
                      Get Custom Quote <i className="bi bi-arrow-up-right" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

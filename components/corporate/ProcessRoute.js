const STEPS = [
  {
    title: "Share Your Requirement",
    text: "Fill the form below with company details, team size and preferred days.",
  },
  {
    title: "We Design a Route",
    text: "Our corporate desk drafts an itinerary and shares it with a private quote.",
  },
  {
    title: "Fine-Tune Together",
    text: "Adjust stays, meals or activities until the plan fits your budget and goals.",
  },
  {
    title: "Confirm & Travel",
    text: "We lock logistics, share the final schedule, and your team just shows up.",
  },
];

export default function ProcessRoute() {
  return (
    <section className="ds-section">
      <div className="container ds-container">
        <div className="text-center mb-5">
          <span className="ds-eyebrow justify-content-center">How It Works</span>
          <h2 className="mt-2">From enquiry to embarkation</h2>
        </div>

        <div className="ds-route-wrap">
          <div className="ds-route-line" />
          <div className="row g-4">
            {STEPS.map((s, i) => (
              <div className="col-6 col-lg-3" key={s.title}>
                <div className="ds-route-step">
                  <div className="ds-route-num">{i + 1}</div>
                  <h5>{s.title}</h5>
                  <p>{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

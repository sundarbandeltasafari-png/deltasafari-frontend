const FAQS = [
  {
    q: "Why don't you list prices for corporate packages?",
    a: "Corporate trips vary too much on team size, season, stay category and add-ons for a single listed price to be accurate. We quote after understanding your headcount, dates and preferences, so the number you receive is one you can actually plan around.",
  },
  {
    q: "What is the minimum group size for a corporate package?",
    a: "We typically work with groups of 15 and above, though smaller leadership retreats and client visits are considered case by case — just mention your team size in the form.",
  },
  {
    q: "Can you handle mixed groups with different dietary or room preferences?",
    a: "Yes. The wizard form lets you note male/female headcount and any special requirements, and our team follows up to confirm rooming, meals and accessibility needs before finalising the plan.",
  },
  {
    q: "Do you provide GST invoices for reimbursement?",
    a: "Yes, all corporate bookings are issued with GST-compliant invoices so your finance or admin team can process them without extra follow-up.",
  },
  {
    q: "How soon will we receive a proposal after submitting the form?",
    a: "Our corporate desk typically responds with an initial itinerary and quote within 48 working hours of receiving your requirements.",
  },
];

export default function CorporateFaq() {
  return (
    <section className="ds-section ds-bg-sand">
      <div className="container ds-container">
        <div className="row">
          <div className="col-lg-5 mb-4 mb-lg-0">
            <span className="ds-eyebrow">Questions &amp; Answers</span>
            <h2 className="mt-2">Corporate booking, clarified</h2>
            <p className="ds-lead">
              Still unsure about something? Our corporate travel desk is happy to walk you
              through it on a call.
            </p>
            <a href="tel:+918208159654" className="btn btn-ds-outline">
              <i className="bi bi-telephone me-2" />
              Call +91 82081 59654
            </a>
          </div>
          <div className="col-lg-7">
            <div className="accordion ds-accordion" id="corporateFaq">
              {FAQS.map((f, i) => (
                <div className="accordion-item" key={f.q}>
                  <h2 className="accordion-header">
                    <button
                      className={`accordion-button ${i !== 0 ? "collapsed" : ""}`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#faq-${i}`}
                      aria-expanded={i === 0 ? "true" : "false"}
                      aria-controls={`faq-${i}`}
                    >
                      {f.q}
                    </button>
                  </h2>
                  <div
                    id={`faq-${i}`}
                    className={`accordion-collapse collapse ${i === 0 ? "show" : ""}`}
                    data-bs-parent="#corporateFaq"
                  >
                    <div className="accordion-body">{f.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

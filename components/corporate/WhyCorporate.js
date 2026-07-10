const BENEFITS = [
  {
    icon: "bi-person-workspace",
    title: "Dedicated Trip Manager",
    text: "One point of contact from first enquiry to the last day of travel — no call centre hand-offs.",
  },
  {
    icon: "bi-sliders",
    title: "Built Around Headcount",
    text: "Itineraries, transport and rooming are planned around your exact male/female split and group size.",
  },
  {
    icon: "bi-people",
    title: "Team-Building Add-Ons",
    text: "Optional activities like bonfire nights, boat games and workshop spaces for offsites and retreats.",
  },
  {
    icon: "bi-receipt",
    title: "GST Invoicing",
    text: "Company-ready invoices and paperwork so your finance team can process it without back-and-forth.",
  },
  {
    icon: "bi-shield-check",
    title: "On-Ground Safety Desk",
    text: "Local guides, verified stays and a 24/7 helpline for every corporate group we host.",
  },
  {
    icon: "bi-calendar2-week",
    title: "Flexible Scheduling",
    text: "Weekday offsites, long weekends or multi-city conferences — we work around your calendar.",
  },
];

export default function WhyCorporate() {
  return (
    <section className="ds-section">
      <div className="container ds-container">
        <div className="row justify-content-between align-items-end mb-5">
          <div className="col-lg-7">
            <span className="ds-eyebrow">Why Companies Choose Us</span>
            <h2 className="mt-2 mb-0">A travel desk that plans around your team, not a catalogue</h2>
          </div>
          <div className="col-lg-4">
            <p className="ds-lead mb-0">
              Every corporate trip starts with a conversation about your people and purpose —
              team offsite, client visit, incentive trip or annual meet — before we talk logistics.
            </p>
          </div>
        </div>

        <div className="row g-4">
          {BENEFITS.map((b) => (
            <div className="col-md-6 col-lg-4" key={b.title}>
              <div className="ds-benefit-card">
                <div className="ds-benefit-icon">
                  <i className={`bi ${b.icon}`} />
                </div>
                <h5>{b.title}</h5>
                <p>{b.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import CorporateHero from "@/components/corporate/CorporateHero";
import WhyCorporate from "@/components/corporate/WhyCorporate";
import PackagesGrid from "@/components/corporate/PackagesGrid";
import ProcessRoute from "@/components/corporate/ProcessRoute";
import CorporateWizardForm from "@/components/corporate/CorporateWizardForm";
import CorporateFaq from "@/components/corporate/CorporateFaq";
import CtaBand from "@/components/corporate/CtaBand";
import './page.css'

export const metadata = {
  title: "Corporate Travel Packages | Delta Safari",
  description:
    "Customised corporate offsites, MICE trips and team tours. Share your team size and dates and get a private, custom quote — no fixed pricing listed.",
};

export default function CorporatePackagePage() {
  return (
    <>
      <CorporateHero />
      <WhyCorporate />
      <PackagesGrid />
      <ProcessRoute />

      <section className="ds-section ds-bg-sand">
        <div className="container ds-container">
          <div className="text-center mb-5">
            <span className="ds-eyebrow justify-content-center">Build Your Package</span>
            <h2 className="mt-2">Get a custom corporate quote in 5 steps</h2>
            <p className="ds-lead mx-auto" style={{ maxWidth: 640 }}>
              No prices to compare here — just tell us about your company and your team, and
              we&apos;ll come back with an itinerary and quote made specifically for you.
            </p>
          </div>
          <CorporateWizardForm />
        </div>
      </section>

      <CorporateFaq />
      <CtaBand />
    </>
  );
}

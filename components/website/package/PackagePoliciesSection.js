"use client";

import React, { useState } from 'react';
import { parseSafeJSON } from '@/libs/packageHelper';

export default function PackagePoliciesSection({ policies = [] }) {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div id="policies" className="card border-0 shadow-sm bg-white rounded-4 p-4 mb-4 scroll-margin-top">
      <h3 className="h5 fw-bold text-dark mb-3 d-flex align-items-center gap-2">
        <i className="bi bi-shield-lock-fill text-danger"></i> Terms, Cancellation & Policies
      </h3>

      <div className="accordion accordion-flush" id="policyAccordion">
        {policies && policies.length > 0 ? (
          policies.map((policy, index) => (
            <div key={index} className="accordion-item border rounded-3 mb-2 overflow-hidden">
              <h2 className="accordion-header" id={`heading${index}`}>
                <button
                  className={`accordion-button text-dark fw-bold text-xs ${openFaq === index ? '' : 'collapsed'}`}
                  type="button"
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                >
                  {policy.title}
                </button>
              </h2>
              <div className={`accordion-collapse collapse ${openFaq === index ? 'show' : ''}`}>
                <div className="accordion-body text-xs text-secondary bg-light">
                  <ul className="ps-3 mb-0">
                    {parseSafeJSON(policy.bullets).map((bullet, idx) => (
                      <li key={idx} className="mb-1">{bullet}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))
        ) : (
          <>
            <div className="border rounded-3 p-3 bg-light mb-2">
              <h5 className="fw-bold text-dark text-xs mb-1">Cancellation &amp; Refund Policy</h5>
              <p className="text-secondary text-2xs mb-0">Full refund available up to 7 days prior to departure date. 50% refund between 3 to 7 days.</p>
            </div>
            <div className="border rounded-3 p-3 bg-light">
              <h5 className="fw-bold text-dark text-xs mb-1">Important Travel Guidelines</h5>
              <p className="text-secondary text-2xs mb-0">Government photo ID proof (Aadhaar / Voter ID / Passport) is mandatory for boat safari permits.</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

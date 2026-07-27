'use client';
import React from 'react';

export default function CtaBand({ onRequestCall }) {
  return (
    <section className="ds-section pt-0">
      <div className="container ds-container">
        <div className="ds-cta-band">
          <div className="row align-items-center g-4">
            <div className="col-lg-8">
              <h3 className="mb-2">Planning travel for more than 100 people?</h3>
              <p className="mb-0">
                For large conferences and multi-city programmes, our senior corporate desk can
                jump on a call directly — skip the queue and speak with a planner today.
              </p>
            </div>
            <div className="col-lg-4 text-lg-end d-flex flex-wrap gap-2 justify-content-lg-end">
              <button
                type="button"
                onClick={onRequestCall}
                className="btn btn-ds-primary shadow-sm"
              >
                <i className="bi bi-telephone-fill me-2" />
                Request Callback
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


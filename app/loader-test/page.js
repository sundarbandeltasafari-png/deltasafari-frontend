"use client"
import React, { useState } from 'react';
import Loading from '@/components/common/Loading';
import LoadingComponent from '@/components/common/LoadingComponent';

export default function LoaderTestPage() {
  const [size, setSize] = useState(140);

  return (
    <div className="container py-5 text-center" style={{ minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <div className="card shadow-sm border-0 rounded-4 p-5 bg-white max-w-3xl mx-auto">
        <h2 className="fw-bold mb-3 text-dark">Loader Component Preview</h2>
        <p className="text-muted mb-4">
          Viewing <code>/loader-test</code> route. Displaying large loader (140px default) with centered <code>assets/img/loading-icon.png</code> and thin spinning ring.
        </p>

        <div className="mb-5 d-flex justify-content-center align-items-center gap-2 flex-wrap">
          <span className="fw-semibold text-secondary me-2">Select Size:</span>
          <button className={`btn btn-sm ${size === 100 ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={() => setSize(100)}>Medium (100px)</button>
          <button className={`btn btn-sm ${size === 140 ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={() => setSize(140)}>Large (140px)</button>
          <button className={`btn btn-sm ${size === 180 ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={() => setSize(180)}>Extra Large (180px)</button>
        </div>

        <div className="row g-4 justify-content-center">
          <div className="col-md-6">
            <div className="p-4 border rounded-4 bg-light">
              <h6 className="fw-bold text-uppercase text-secondary mb-3" style={{ letterSpacing: '0.5px' }}>Loading.js</h6>
              <div className="py-4 d-flex align-items-center justify-content-center">
                <Loading size={size} />
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="p-4 border rounded-4 bg-light">
              <h6 className="fw-bold text-uppercase text-secondary mb-3" style={{ letterSpacing: '0.5px' }}>LoadingComponent.js</h6>
              <div className="py-4 d-flex align-items-center justify-content-center">
                <LoadingComponent size={size} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

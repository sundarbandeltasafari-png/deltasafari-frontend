"use client"
import React from 'react';

function Loading({ size = 140 }) {
  const innerImgSize = Math.round(size * 0.6);

  return (
    <>
      <style>{`
        @keyframes spinAroundThin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .active-thin-spinner {
          animation: spinAroundThin 0.85s linear infinite !important;
        }
      `}</style>

      <div className="d-flex align-items-center justify-content-center p-3 w-100 h-100" style={{ minHeight: '200px' }}>
        <div 
          className="position-relative d-flex align-items-center justify-content-center" 
          style={{ width: `${size}px`, height: `${size}px` }}
        >
          {/* Thin Spinning Circular Outer Ring */}
          <div
            className="active-thin-spinner"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              border: '2.5px solid rgba(239, 102, 20, 0.2)',
              borderTop: '2.5px solid #ef6614',
              boxSizing: 'border-box'
            }}
          />
          
          {/* Centered Image Icon */}
          <img
            src="/assets/img/loading-icon.png"
            alt="Loading..."
            style={{
              width: `${innerImgSize}px`,
              height: `${innerImgSize}px`,
              objectFit: 'contain',
              borderRadius: '50%',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 2
            }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/assets/img/fav-icon.png";
            }}
          />
        </div>
      </div>
    </>
  );
}

export default Loading;
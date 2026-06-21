'use client'; // Required for Next.js App Router to handle clicks and state

import { useState } from 'react';

export default function ShareButton({ title, text, url }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    // Fallback to current window location if no explicit URL is passed
    const shareUrl = url || window.location.href; 
    const shareData = {
      title: title || document.title,
      text: text || 'Check this out!',
      url: shareUrl,
    };

    // 1. Check if the browser supports native Web Share API
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        console.log('Shared successfully!');
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Error sharing:', err);
        }
      }
    } else {
      // 2. Fallback: Copy to clipboard if Web Share API isn't supported
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset toast after 2 seconds
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block', marginLeft: '10px' }}>
      <button
        onClick={handleShare}
        style={{
          background: '#ff5c41',
          color: '#fff',
          border: 'none',
          padding: '0px 10px',
          borderRadius: '6px',
          fontWeight: '600',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '12px'
        }}
      >
        <i className="bi bi-share-fill"></i> {/* Assuming bootstrap icons are used */}
        {copied ? 'Link Copied!' : 'Share'}
      </button>

      {/* Mini fallback notification indicator */}
      {copied && (
        <span
          style={{
            position: 'absolute',
            bottom: '-35px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#0A132C',
            color: '#fff',
            fontSize: '12px',
            padding: '4px 8px',
            borderRadius: '4px',
            whiteSpace: 'nowrap',
          }}
        >
          Copied to clipboard!
        </span>
      )}
    </div>
  );
}
'use client'; // Required for Next.js App Router to handle clicks and state

import { useState } from 'react';

export default function ShareButton({ title, text, url, className, style, wrapperStyle }) {
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

  const defaultClassName = "btn btn-outline-warning rounded-pill px-3 py-2 text-xs font-bold d-flex align-items-center gap-1 shadow-2xs";
  const defaultStyle = { color: '#EF9720', borderColor: '#EF9720', backgroundColor: '#fffaf4' };

  return (
    <div style={{ position: 'relative', display: 'inline-block', marginLeft: '5px', ...wrapperStyle }}>
      <button
        onClick={handleShare}
        className={className !== undefined ? className : defaultClassName}
        style={style !== undefined ? style : defaultStyle}
      >
        <i className="bi bi-share-fill"></i>
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
            zIndex: 1000
          }}
        >
          Copied to clipboard!
        </span>
      )}
    </div>
  );
}
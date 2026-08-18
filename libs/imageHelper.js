/**
 * Image Alt Helper for Delta Safari
 * Formats clean, SEO-rich, descriptive alt tags for all images
 * whether derived from entity titles (package, city, blog, etc.) or image file names.
 */

export function formatAltFromFilename(filename) {
  if (!filename || typeof filename !== 'string') return 'Delta Safari';
  
  // Extract basename without directory path
  let name = filename.split(/[\\/]/).pop();
  
  // Remove file extension (.jpg, .png, .webp, .svg, etc.)
  name = name.replace(/\.[a-zA-Z0-9]+$/, '');
  
  // Strip trailing unique timestamp hashes (e.g., -1781759432-1234 or -1781759432022-350749301)
  name = name.replace(/[-_]\d{8,}(?:[-_]\d+)?$/g, '');
  
  // If the remaining string is purely numbers or too short
  if (/^\d+$/.test(name) || name.trim().length < 2) {
    return 'Delta Safari Tour & Travel';
  }
  
  // Convert hyphens and underscores to spaces
  name = name.replace(/[-_]+/g, ' ').trim();
  
  // Title Case each word
  const titleCased = name
    .split(' ')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
    
  return titleCased ? `${titleCased} - Delta Safari` : 'Delta Safari Tour Package';
}

export function getImageAlt(imageSrcOrAsset, fallbackTitle = '', defaultContext = 'Delta Safari') {
  // 1. If explicit title/name is passed
  if (fallbackTitle && typeof fallbackTitle === 'string' && fallbackTitle.trim()) {
    const cleanTitle = fallbackTitle.trim();
    if (cleanTitle.toLowerCase().includes('delta safari')) {
      return cleanTitle;
    }
    return `${cleanTitle} - Delta Safari`;
  }
  
  // 2. If an object is passed (e.g. asset with path or title)
  if (imageSrcOrAsset && typeof imageSrcOrAsset === 'object') {
    if (imageSrcOrAsset.title || imageSrcOrAsset.name || imageSrcOrAsset.alt) {
      return getImageAlt(null, imageSrcOrAsset.title || imageSrcOrAsset.name || imageSrcOrAsset.alt, defaultContext);
    }
    if (imageSrcOrAsset.path) {
      return formatAltFromFilename(imageSrcOrAsset.path);
    }
  }
  
  // 3. If string image path is passed
  if (typeof imageSrcOrAsset === 'string' && imageSrcOrAsset.trim()) {
    return formatAltFromFilename(imageSrcOrAsset);
  }
  
  return `${defaultContext} - Sundarban Wildlife Tours & Holiday Packages`;
}

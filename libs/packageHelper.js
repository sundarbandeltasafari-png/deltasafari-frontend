import { cache } from 'react';
import axios from 'axios';
import { getParticularPackageUrl } from '@/routes/serviceRoutes';
import { urlDecode } from '@/libs/urlHelper';

export function parsePackageRouteParam(urlOrSlug) {
  if (!urlOrSlug) return { cleanSlug: null, pkgId: null, raw: '' };

  let raw = '';
  if (Array.isArray(urlOrSlug)) {
    raw = urlOrSlug[urlOrSlug.length - 1];
  } else if (typeof urlOrSlug === 'string') {
    const segments = urlOrSlug.split('/');
    raw = segments[segments.length - 1];
  }

  const parts = raw.split('-');
  let pkgId = null;
  let cleanSlug = raw;

  if (parts.length > 1) {
    const possibleId = parts[parts.length - 1];
    try {
      const decoded = urlDecode(possibleId);
      if (decoded && !isNaN(decoded) && Number(decoded) > 0) {
        pkgId = possibleId;
        cleanSlug = parts.slice(0, -1).join('-');
      }
    } catch (e) {
      // not an encoded id
    }
  }

  return { cleanSlug, pkgId, raw };
}

export function resolveFullImageUrl(rawPath, serverUrl, siteUrl) {
  if (!rawPath || typeof rawPath !== 'string') return null;
  let trimmed = rawPath.trim().replace(/\\/g, '/');

  trimmed = trimmed.replace(/https?:\/\/serverds\.deltasafari\.in/gi, 'https://serverds.sundarbandeltasafari.com');

  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }

  const cleanPath = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;

  if (cleanPath.startsWith('/assets/')) {
    const cleanSiteUrl = (siteUrl || 'https://deltasafari.in').replace(/\/+$/, '');
    return `${cleanSiteUrl}${cleanPath}`;
  }

  const cleanServerUrl = (serverUrl || 'https://serverds.sundarbandeltasafari.com')
    .replace(/https?:\/\/serverds\.deltasafari\.in/gi, 'https://serverds.sundarbandeltasafari.com')
    .replace(/\/+$/, '');

  return `${cleanServerUrl}${cleanPath}`;
}

export function getOgImageUrl(pkg, serverUrl, siteUrl) {
  let rawImagePath = null;

  if (pkg?.og_image) {
    rawImagePath = pkg.og_image;
  } else if (pkg?.featured_image) {
    rawImagePath = pkg.featured_image;
  }

  if (!rawImagePath && Array.isArray(pkg?.assets) && pkg.assets.length > 0) {
    const primary = pkg.assets.find((a) => (a.type == 1 || a.type === null || a.type === undefined) && a.path) || pkg.assets.find((a) => a.type != 2 && a.path) || pkg.assets[0];
    if (primary && primary.path) rawImagePath = primary.path;
  }

  if (!rawImagePath && pkg?.path) {
    rawImagePath = pkg.path;
  }

  if (!rawImagePath && (pkg?.banner_path || pkg?.image)) {
    rawImagePath = pkg.banner_path || pkg.image;
  }

  const resolved = resolveFullImageUrl(rawImagePath, serverUrl, siteUrl);
  if (resolved) return resolved;

  const defaultSite = (siteUrl || process.env.NEXT_PUBLIC_PUBLIC_URL || 'https://deltasafari.in').replace(/\/+$/, '');
  return `${defaultSite}/assets/img/logo_DS.png`;
}

export function parseSafeJSON(dataStr) {
  try {
    if (!dataStr) return [];
    if (Array.isArray(dataStr)) return dataStr;
    return JSON.parse(dataStr);
  } catch (e) {
    return [];
  }
}

export function getFormattedDescription(desc) {
  if (!desc) return '';
  if (typeof desc === 'object' && desc?.type === 'Buffer' && Array.isArray(desc?.data)) {
    desc = Buffer.from(desc.data).toString('utf8');
  } else if (typeof desc === 'object' && Buffer.isBuffer(desc)) {
    desc = desc.toString('utf8');
  }
  if (typeof desc !== 'string') return String(desc || '');
  const hasHtml = /<[a-z][\s\S]*>/i.test(desc);
  if (hasHtml) {
    return desc;
  }
  return desc
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line !== '')
    .map((line) => `<p>${line}</p>`)
    .join('');
}

export function getItineraryDays(packageDetails) {
  if (packageDetails?.itinerary && Array.isArray(packageDetails.itinerary) && packageDetails.itinerary.length > 0) {
    return packageDetails.itinerary;
  }
  if (packageDetails?.itinararys && Array.isArray(packageDetails.itinararys) && packageDetails.itinararys.length > 0) {
    return packageDetails.itinararys;
  }
  if (packageDetails?.itineraries && Array.isArray(packageDetails.itineraries) && packageDetails.itineraries.length > 0) {
    return packageDetails.itineraries;
  }

  const days = packageDetails?.duration_days || 3;
  const defaultDays = [
    {
      dayNumber: 1,
      title: `Day 1: Arrival & Scenic Cruise to ${packageDetails?.to_destination_name || 'Sundarban'}`,
      description: `Departure from Kolkata/Canning to Godkhali Jetty. Board the comfortable safari boat with welcome beverages. Sail along the scenic rivers into the tranquil Sundarban mangroves. Check-in at Eco-Resort / Boat cabin. Evening experience includes local Baul folk music, evening tea, and snacks.`
    },
    {
      dayNumber: 2,
      title: `Day 2: Core Mangrove Forest & Watchtower Safari`,
      description: `Full day boat safari through the Sajnekhali Tiger Reserve. Visit Sajnekhali Watch Tower & Interpretation Centre, Sudhanyakhali Watch Tower, and Dobanki Canopy Walk. Enjoy delicious traditional fresh Hilsa / Fish lunch served on board. Keep an eye out for Royal Bengal Tigers, Estuarine Crocodiles, and rare birds.`
    },
    {
      dayNumber: 3,
      title: `Day 3: Village Tour, Craft Exploration & Return`,
      description: `Morning visit to a traditional riverine village to witness honey-collecting culture and local lifestyle. Breakfast served on board as you cruise through Panchamukhi (5 Rivers Junction). Sail back to Godkhali Jetty and transfer back with memorable experiences.`
    }
  ];

  return defaultDays.slice(0, Math.max(days, 1));
}

/**
 * Cached package fetch for SSR & metadata deduplication
 */
export const fetchPackageDetails = cache(async (urlOrSlug) => {
  if (!urlOrSlug) return null;

  const rawPath = Array.isArray(urlOrSlug) ? urlOrSlug.join('/') : (typeof urlOrSlug === 'string' ? urlOrSlug : '');
  const { cleanSlug, pkgId, raw } = parsePackageRouteParam(urlOrSlug);

  let serverUrl = (process.env.NEXT_PUBLIC_SERVER_URL || '')
    .replace(/https?:\/\/serverds\.deltasafari\.in/gi, 'https://serverds.sundarbandeltasafari.com')
    .replace(/\/+$/, '');

  if (!serverUrl) {
    serverUrl = 'https://serverds.sundarbandeltasafari.com';
  }

  const candidateEndpoints = [
    getParticularPackageUrl,
    `${serverUrl}/service/getParticularPackage`,
    'https://serverds.sundarbandeltasafari.com/service/getParticularPackage'
  ].filter((url, idx, arr) => url && typeof url === 'string' && arr.indexOf(url) === idx);

  const queries = [];
  if (cleanSlug) {
    queries.push(`slug=${encodeURIComponent(cleanSlug)}${pkgId ? `&id=${encodeURIComponent(pkgId)}` : ''}`);
  }
  if (raw && raw !== cleanSlug) {
    queries.push(`slug=${encodeURIComponent(raw)}`);
  }
  if (pkgId) {
    queries.push(`id=${encodeURIComponent(pkgId)}`);
  }
  if (rawPath && rawPath !== raw && rawPath !== cleanSlug) {
    queries.push(`slug=${encodeURIComponent(rawPath)}`);
  }
  try {
    const decodedSlug = decodeURIComponent(cleanSlug || raw);
    if (decodedSlug && decodedSlug !== cleanSlug && decodedSlug !== raw) {
      queries.push(`slug=${encodeURIComponent(decodedSlug)}`);
    }
  } catch (e) {}

  for (const endpoint of candidateEndpoints) {
    for (const q of queries) {
      try {
        const fullUrl = endpoint.includes('?') ? `${endpoint}&${q}` : `${endpoint}?${q}`;
        const response = await axios.get(fullUrl, { timeout: 6000 });
        if (response.data?.status && response.data?.package) {
          return response.data.package;
        }
      } catch (err) {
        // Try next query or endpoint
      }
    }
  }

  return null;
});

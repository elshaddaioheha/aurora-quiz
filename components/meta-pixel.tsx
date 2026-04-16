'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    fbq?: ((...args: unknown[]) => void) & { q?: unknown[][]; loaded?: boolean; version?: string; push?: (...args: unknown[]) => void };
    _fbq?: typeof window.fbq;
    __metaPixelInitialized?: boolean;
  }
}

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

function initializeMetaPixel(pixelId: string) {
  if (typeof window === 'undefined' || window.__metaPixelInitialized) {
    return;
  }

  window.fbq = function fbq(...args: unknown[]) {
    window.fbq?.q?.push(args);
  } as Window['fbq'];

  window.fbq.q = window.fbq.q || [];
  window._fbq = window.fbq;

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(script);

  window.fbq('init', pixelId);
  window.fbq('track', 'PageView');
  window.__metaPixelInitialized = true;
}

export function trackMetaEvent(eventName: string, parameters?: Record<string, unknown>) {
  if (typeof window === 'undefined' || !window.fbq) {
    return;
  }

  window.fbq('track', eventName, parameters || {});
}

export default function MetaPixel() {
  useEffect(() => {
    if (!META_PIXEL_ID) {
      return;
    }

    initializeMetaPixel(META_PIXEL_ID);
  }, []);

  return null;
}
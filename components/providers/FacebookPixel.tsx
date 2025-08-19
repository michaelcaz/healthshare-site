'use client';

import React, { useEffect } from 'react';

export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

declare global {
  interface Window {
    fbq?: (
      action: string,
      event?: string,
      params?: Record<string, any>
    ) => void;
    _fbq?: any;
    __FB_PIXEL_INITIALIZED?: boolean;
  }
}

export function FacebookPixel() {
  useEffect(() => {
    // Only run in production and if FB_PIXEL_ID exists
    if (process.env.NODE_ENV !== 'production' || !FB_PIXEL_ID) {
      return;
    }

    // Check if Facebook Pixel is already loaded
    if (typeof window !== 'undefined' && !window.fbq) {
      // Load the Facebook Pixel script
      (function(f: any, b: Document, e: string, v: string, n: any, t: any, s: any) {
        if (f.fbq) return;
        n = f.fbq = function() {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js', null, null, null);

      // Initialize the pixel
      window.fbq('init', FB_PIXEL_ID);
      window.fbq('track', 'PageView');
    }
  }, []); // Empty dependency array ensures this only runs once

  if (process.env.NODE_ENV !== 'production' || !FB_PIXEL_ID) {
    return null;
  }

  return (
    <noscript>
      <img
        height="1"
        width="1"
        style={{ display: 'none' }}
        src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
        alt=""
      />
    </noscript>
  );
}

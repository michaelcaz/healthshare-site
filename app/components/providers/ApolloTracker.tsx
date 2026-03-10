'use client'

import Script from 'next/script'

const APOLLO_APP_ID = '69a8afa5cd0c200021fa3804'

export function ApolloTracker() {
  return (
    <Script id="apollo-website-tracker" strategy="afterInteractive">
      {`
        function initApollo(){
          var n=Math.random().toString(36).substring(7),
              o=document.createElement("script");
          o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n;
          o.async=true;
          o.defer=true;
          o.onload=function(){
            window.trackingFunctions.onLoad({appId:"${APOLLO_APP_ID}"});
          };
          document.head.appendChild(o);
        }
        initApollo();
      `}
    </Script>
  )
}

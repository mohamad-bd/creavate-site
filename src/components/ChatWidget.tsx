'use client';
import { useEffect } from 'react';

declare global {
  interface Window {
    Tawk_API?: any;
    Tawk_LoadStart?: Date;
  }
}

export default function ChatWidget() {
  useEffect(() => {
    // Tawk.to script loader
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://embed.tawk.to/68a74485fcd547192ddebbb4/1j36m7act';
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    
    // Initialize Tawk.to
    script.onload = () => {
      if (window.Tawk_API) {
        window.Tawk_API.onLoad = function() {
          // Customize chat widget
          window.Tawk_API.setAttributes({
            'name': 'Website Visitor',
            'email': '',
            'phone': '',
            'company': 'Creavate'
          });
          
          // Set custom colors to match your brand
          window.Tawk_API.customStyle = {
            visibility: {
              desktop: {
                positionCorner: 'bottom-right',
                positionOffsetCorner: 'bottom-right',
                position: 'bottom-right'
              },
              mobile: {
                positionCorner: 'bottom-right',
                positionOffsetCorner: 'bottom-right',
                position: 'bottom-right'
              }
            }
          };
        };
      }
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return null; // This component doesn't render anything visible
}

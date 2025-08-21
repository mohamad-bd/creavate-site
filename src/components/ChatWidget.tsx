'use client';
import { useEffect } from 'react';

type TawkAttributes = Record<string, string>;

type TawkAPI = {
  onLoad?: () => void;
  setAttributes?: (attrs: TawkAttributes) => void;
  customStyle?: Record<string, unknown>;
} & Record<string, unknown>;

declare global {
  interface Window {
    Tawk_API?: TawkAPI;
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
        window.Tawk_API.onLoad = function () {
          // Customize chat widget
          window.Tawk_API?.setAttributes?.({
            name: 'Website Visitor',
            email: '',
            phone: '',
            company: 'Creavate',
          });

          // Optional style overrides
          window.Tawk_API!.customStyle = {
            visibility: {
              desktop: {
                positionCorner: 'bottom-right',
                positionOffsetCorner: 'bottom-right',
                position: 'bottom-right',
              },
              mobile: {
                positionCorner: 'bottom-right',
                positionOffsetCorner: 'bottom-right',
                position: 'bottom-right',
              },
            },
          } as Record<string, unknown>;
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

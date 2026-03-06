
import React, { useEffect, useRef, useState } from 'react';

const PUBLISHER_ID = 'ca-pub-9543073887536718';

interface AdUnitProps {
  placement: 'home_top' | 'home_bottom' | 'article_top' | 'article_middle' | 'article_bottom' | 'sidebar' | 'generic';
  className?: string;
  uniqueKey?: string | number;
}

const AdUnit: React.FC<AdUnitProps> = React.memo(({ placement, className = "", uniqueKey }) => {
  const adRef = useRef<HTMLModElement>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Map placement to standard AdSense slot IDs
  const getSlotId = () => {
    switch (placement) {
      case 'article_middle': return '1641433819';
      default: return '7317709042';
    }
  };

  useEffect(() => {
    setHasLoaded(false);
  }, [uniqueKey, placement]);

  useEffect(() => {
    if (typeof window === 'undefined' || hasLoaded) return;

    const slotId = getSlotId();
    
    const pushAd = () => {
      try {
        const adsbygoogle = (window as any).adsbygoogle || [];
        if (adRef.current && adRef.current.innerHTML.trim() === "") {
          adsbygoogle.push({});
          setHasLoaded(true);
        }
      } catch (e) {
        console.error("AdSense push error:", e);
      }
    };

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) {
          pushAd();
          observer.disconnect();
        }
      }
    });

    if (adRef.current) {
      observer.observe(adRef.current);
    }

    return () => observer.disconnect();
  }, [hasLoaded, placement]);

  // Use fixed minimum heights to prevent CLS
  const minHeight = placement === 'sidebar' ? '300px' : '100px';

  return (
    <div className={`ad-container w-full flex justify-center items-center my-8 overflow-hidden transition-all duration-700 ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ 
          display: 'block', 
          width: '100%', 
          minHeight: minHeight,
          textAlign: 'center',
          backgroundColor: 'rgba(0,0,0,0.02)',
          borderRadius: '1.5rem'
        }}
        data-ad-client={PUBLISHER_ID}
        data-ad-slot={getSlotId()}
        data-ad-format="auto"
        data-full-width-responsive="true"
        data-ad-layout={placement === 'article_middle' ? 'in-article' : undefined}
      ></ins>
    </div>
  );
});

export default AdUnit;

'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import ReactGA from 'react-ga4';

// Component that uses useSearchParams
function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    
    // Send pageview with updated URL
    ReactGA.send({
      hitType: 'pageview',
      page: url,
    });
  }, [pathname, searchParams]);

  return null;
}

export default function GoogleAnalytics() {
  useEffect(() => {
    // Initialize GA4 with your measurement ID
    ReactGA.initialize('G-9D0C7RYSL3');
  }, []);

  return (
    <Suspense fallback={null}>
      <AnalyticsTracker />
    </Suspense>
  );
} 
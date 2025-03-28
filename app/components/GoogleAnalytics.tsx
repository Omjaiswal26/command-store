'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import ReactGA from 'react-ga4';

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Initialize GA4 with your measurement ID
    ReactGA.initialize('G-9D0C7RYSL3');
  }, []);

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
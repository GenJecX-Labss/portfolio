'use client';

import { useEffect } from 'react';
import { metricsApi } from '@/lib/api';

/**
 * Analytics Provider
 * 
 * Automatically tracks page views on route changes.
 */
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Track initial page view
    const path = window.location.pathname;
    metricsApi.trackPageView(path).catch(console.error);

    // Track route changes using popstate event
    const handleRouteChange = () => {
      const newPath = window.location.pathname;
      metricsApi.trackPageView(newPath).catch(console.error);
    };

    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  return <>{children}</>;
}

export default AnalyticsProvider;

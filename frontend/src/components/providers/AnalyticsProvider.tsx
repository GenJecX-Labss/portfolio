'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { metricsApi } from '@/lib/api';

/**
 * Analytics Provider
 * 
 * Automatically tracks page views on route changes.
 */
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    metricsApi.trackPageView(pathname).catch(console.error);
  }, [pathname]);

  return <>{children}</>;
}

export default AnalyticsProvider;

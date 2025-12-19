/**
 * Custom React Hooks for API calls
 * 
 * Provides reusable hooks for data fetching with loading/error states.
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { projectsApi } from './projects';
import { researchApi } from './research';
import { auditsApi } from './audits';
import { contactApi } from './contact';
import { metricsApi } from './metrics';
import type {
  ProjectListResponse,
  ProjectPublicResponse,
  ResearchPublicResponse,
  AuditRequestCreate,
  AuditRequestSubmissionResponse,
  ContactCreate,
  ContactSubmissionResponse,
} from './types';

// ============================================================================
// HOOK TYPES
// ============================================================================

interface UseQueryResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

interface UseMutationResult<TData, TVariables> {
  mutate: (variables: TVariables) => Promise<TData>;
  data: TData | null;
  loading: boolean;
  error: Error | null;
  reset: () => void;
}

// ============================================================================
// PROJECT HOOKS
// ============================================================================

/**
 * Fetch list of projects
 */
export function useProjects(params?: {
  skip?: number;
  limit?: number;
  category?: string;
}): UseQueryResult<ProjectListResponse[]> {
  const [data, setData] = useState<ProjectListResponse[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await projectsApi.getProjects(params);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch projects'));
    } finally {
      setLoading(false);
    }
  }, [params?.skip, params?.limit, params?.category]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, refetch: fetch };
}

/**
 * Fetch featured projects
 */
export function useFeaturedProjects(limit = 6): UseQueryResult<ProjectListResponse[]> {
  const [data, setData] = useState<ProjectListResponse[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await projectsApi.getFeaturedProjects(limit);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch featured projects'));
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, refetch: fetch };
}

/**
 * Fetch single project by slug
 */
export function useProject(slug: string): UseQueryResult<ProjectPublicResponse> {
  const [data, setData] = useState<ProjectPublicResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(async () => {
    if (!slug) return;
    try {
      setLoading(true);
      setError(null);
      const result = await projectsApi.getProject(slug);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch project'));
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, refetch: fetch };
}

// ============================================================================
// RESEARCH HOOKS
// ============================================================================

/**
 * Fetch list of research
 */
export function useResearch(params?: {
  skip?: number;
  limit?: number;
  research_type?: string;
}): UseQueryResult<ResearchPublicResponse[]> {
  const [data, setData] = useState<ResearchPublicResponse[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await researchApi.getResearch(params);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch research'));
    } finally {
      setLoading(false);
    }
  }, [params?.skip, params?.limit, params?.research_type]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, refetch: fetch };
}

/**
 * Fetch featured research
 */
export function useFeaturedResearch(limit = 5): UseQueryResult<ResearchPublicResponse[]> {
  const [data, setData] = useState<ResearchPublicResponse[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await researchApi.getFeaturedResearch(limit);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch featured research'));
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, refetch: fetch };
}

// ============================================================================
// AUDIT HOOKS
// ============================================================================

/**
 * Submit audit request mutation
 */
export function useSubmitAuditRequest(): UseMutationResult<
  AuditRequestSubmissionResponse,
  AuditRequestCreate
> {
  const [data, setData] = useState<AuditRequestSubmissionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback(async (variables: AuditRequestCreate) => {
    try {
      setLoading(true);
      setError(null);
      const result = await auditsApi.submitRequest(variables);
      setData(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to submit audit request');
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { mutate, data, loading, error, reset };
}

// ============================================================================
// CONTACT HOOKS
// ============================================================================

/**
 * Submit contact form mutation
 */
export function useSubmitContact(): UseMutationResult<
  ContactSubmissionResponse,
  ContactCreate
> {
  const [data, setData] = useState<ContactSubmissionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback(async (variables: ContactCreate) => {
    try {
      setLoading(true);
      setError(null);
      const result = await contactApi.submitContact(variables);
      setData(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to submit contact form');
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { mutate, data, loading, error, reset };
}

// ============================================================================
// ANALYTICS HOOKS
// ============================================================================

/**
 * Track page view on mount
 */
export function usePageView(path?: string) {
  useEffect(() => {
    const trackPath = path || (typeof window !== 'undefined' ? window.location.pathname : '');
    if (trackPath) {
      metricsApi.trackPageView(trackPath).catch(console.error);
    }
  }, [path]);
}

/**
 * Get tracking functions
 */
export function useAnalytics() {
  const trackEvent = useCallback(
    async (eventType: string, eventName: string, metadata?: Record<string, unknown>) => {
      try {
        await metricsApi.trackEvent({
          event_type: eventType as any,
          event_name: eventName,
          metadata,
        });
      } catch (err) {
        console.error('Failed to track event:', err);
      }
    },
    []
  );

  const trackCtaClick = useCallback(async (ctaName: string) => {
    try {
      await metricsApi.trackCtaClick(ctaName);
    } catch (err) {
      console.error('Failed to track CTA click:', err);
    }
  }, []);

  return { trackEvent, trackCtaClick };
}

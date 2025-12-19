/**
 * Metrics/Analytics API Service
 * 
 * API methods for tracking user interactions.
 */

import { apiClient } from './client';
import { ENDPOINTS } from './config';
import type {
  MetricEventCreate,
  MessageResponse,
} from './types';

// Generate or get session ID
function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  
  let sessionId = sessionStorage.getItem('genjecx_session_id');
  
  if (!sessionId) {
    sessionId = `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('genjecx_session_id', sessionId);
  }
  
  return sessionId;
}

export const metricsApi = {
  /**
   * Track a custom event
   */
  async trackEvent(data: MetricEventCreate): Promise<MessageResponse> {
    const eventData = {
      ...data,
      session_id: data.session_id || getSessionId(),
    };
    
    return apiClient.post<MessageResponse>(ENDPOINTS.METRICS_TRACK, eventData);
  },

  /**
   * Track page view (simplified)
   */
  async trackPageView(path: string): Promise<MessageResponse> {
    const sessionId = getSessionId();
    
    return apiClient.post<MessageResponse>(ENDPOINTS.METRICS_PAGE_VIEW, null, {
      params: { path, session_id: sessionId },
    });
  },

  /**
   * Track project view
   */
  async trackProjectView(projectId: number): Promise<MessageResponse> {
    return this.trackEvent({
      event_type: 'project_view',
      event_name: 'project_view',
      resource_type: 'project',
      resource_id: projectId,
    });
  },

  /**
   * Track research download
   */
  async trackResearchDownload(researchId: number): Promise<MessageResponse> {
    return this.trackEvent({
      event_type: 'research_download',
      event_name: 'research_download',
      resource_type: 'research',
      resource_id: researchId,
    });
  },

  /**
   * Track CTA click
   */
  async trackCtaClick(ctaName: string, metadata?: Record<string, unknown>): Promise<MessageResponse> {
    return this.trackEvent({
      event_type: 'cta_click',
      event_name: ctaName,
      path: typeof window !== 'undefined' ? window.location.pathname : undefined,
      metadata,
    });
  },
};

export default metricsApi;

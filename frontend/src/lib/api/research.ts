/**
 * Research API Service
 * 
 * API methods for research content.
 */

import { apiClient } from './client';
import { ENDPOINTS } from './config';
import type {
  ResearchPublicResponse,
  ResearchListResponse,
  MessageResponse,
} from './types';

export const researchApi = {
  /**
   * Get list of public research
   */
  async getResearch(params?: {
    skip?: number;
    limit?: number;
    research_type?: string;
  }): Promise<ResearchPublicResponse[]> {
    return apiClient.get<ResearchPublicResponse[]>(ENDPOINTS.RESEARCH, { params });
  },

  /**
   * Get featured research
   */
  async getFeaturedResearch(limit: number = 5): Promise<ResearchPublicResponse[]> {
    return apiClient.get<ResearchPublicResponse[]>(ENDPOINTS.RESEARCH_FEATURED, {
      params: { limit },
    });
  },

  /**
   * Search research
   */
  async searchResearch(
    query: string,
    params?: { skip?: number; limit?: number }
  ): Promise<ResearchPublicResponse[]> {
    return apiClient.get<ResearchPublicResponse[]>(ENDPOINTS.RESEARCH_SEARCH, {
      params: { q: query, ...params },
    });
  },

  /**
   * Get single research by slug
   */
  async getResearchBySlug(slug: string): Promise<ResearchPublicResponse> {
    return apiClient.get<ResearchPublicResponse>(`${ENDPOINTS.RESEARCH}/${slug}`);
  },

  /**
   * Track research download
   */
  async trackDownload(researchId: number): Promise<MessageResponse> {
    return apiClient.post<MessageResponse>(
      `${ENDPOINTS.RESEARCH}/${researchId}/download`
    );
  },
};

export default researchApi;

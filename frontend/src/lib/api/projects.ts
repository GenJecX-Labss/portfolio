/**
 * Projects API Service
 * 
 * API methods for portfolio projects.
 */

import { apiClient } from './client';
import { ENDPOINTS } from './config';
import type {
  ProjectListResponse,
  ProjectPublicResponse,
  MessageResponse,
} from './types';

export const projectsApi = {
  /**
   * Get list of public projects
   */
  async getProjects(params?: {
    skip?: number;
    limit?: number;
    category?: string;
  }): Promise<ProjectListResponse[]> {
    return apiClient.get<ProjectListResponse[]>(ENDPOINTS.PROJECTS, { params });
  },

  /**
   * Get featured projects
   */
  async getFeaturedProjects(limit: number = 6): Promise<ProjectListResponse[]> {
    return apiClient.get<ProjectListResponse[]>(ENDPOINTS.PROJECTS_FEATURED, {
      params: { limit },
    });
  },

  /**
   * Get all project categories
   */
  async getCategories(): Promise<string[]> {
    return apiClient.get<string[]>(ENDPOINTS.PROJECTS_CATEGORIES);
  },

  /**
   * Search projects
   */
  async searchProjects(
    query: string,
    params?: { skip?: number; limit?: number }
  ): Promise<ProjectListResponse[]> {
    return apiClient.get<ProjectListResponse[]>(ENDPOINTS.PROJECTS_SEARCH, {
      params: { q: query, ...params },
    });
  },

  /**
   * Get single project by slug
   */
  async getProject(slug: string): Promise<ProjectPublicResponse> {
    return apiClient.get<ProjectPublicResponse>(`${ENDPOINTS.PROJECTS}/${slug}`);
  },

  /**
   * Track project view
   */
  async trackView(projectId: number): Promise<MessageResponse> {
    return apiClient.post<MessageResponse>(
      `${ENDPOINTS.PROJECTS}/${projectId}/view`
    );
  },
};

export default projectsApi;

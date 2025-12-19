/**
 * Audit Request API Service
 * 
 * API methods for audit/review service requests.
 */

import { apiClient } from './client';
import { ENDPOINTS } from './config';
import type {
  AuditRequestCreate,
  AuditRequestSubmissionResponse,
  AuditTypeInfo,
} from './types';

export const auditsApi = {
  /**
   * Submit an audit request
   */
  async submitRequest(data: AuditRequestCreate): Promise<AuditRequestSubmissionResponse> {
    return apiClient.post<AuditRequestSubmissionResponse>(
      ENDPOINTS.AUDIT_REQUEST,
      data
    );
  },

  /**
   * Get available audit types
   */
  async getAuditTypes(): Promise<{ audit_types: AuditTypeInfo[] }> {
    return apiClient.get<{ audit_types: AuditTypeInfo[] }>(ENDPOINTS.AUDIT_TYPES);
  },

  /**
   * Check status of an audit request
   */
  async checkStatus(
    requestId: number,
    email: string
  ): Promise<{
    id: number;
    company_name: string;
    audit_type: string;
    status: string;
    created_at: string;
    scheduled_date?: string;
  }> {
    return apiClient.get(`${ENDPOINTS.AUDIT_STATUS}/${requestId}`, {
      params: { email },
    });
  },
};

export default auditsApi;

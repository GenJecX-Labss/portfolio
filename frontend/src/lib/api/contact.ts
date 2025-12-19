/**
 * Contact API Service
 * 
 * API methods for contact form submissions.
 */

import { apiClient } from './client';
import { ENDPOINTS } from './config';
import type {
  ContactCreate,
  ContactSubmissionResponse,
  ContactTypeInfo,
} from './types';

export const contactApi = {
  /**
   * Submit contact form
   */
  async submitContact(data: ContactCreate): Promise<ContactSubmissionResponse> {
    return apiClient.post<ContactSubmissionResponse>(
      ENDPOINTS.CONTACT_SUBMIT,
      data
    );
  },

  /**
   * Get available contact types
   */
  async getContactTypes(): Promise<{ contact_types: ContactTypeInfo[] }> {
    return apiClient.get<{ contact_types: ContactTypeInfo[] }>(ENDPOINTS.CONTACT_TYPES);
  },
};

export default contactApi;

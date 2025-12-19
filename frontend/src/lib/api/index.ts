/**
 * API Module Index
 * 
 * Re-exports all API services and types for convenient imports.
 */

// Core
export { apiClient, ApiError } from './client';
export { API_URL, API_BASE_URL, ENDPOINTS } from './config';

// Services
export { projectsApi } from './projects';
export { researchApi } from './research';
export { auditsApi } from './audits';
export { contactApi } from './contact';
export { metricsApi } from './metrics';

// Hooks
export {
  useProjects,
  useFeaturedProjects,
  useProject,
  useResearch,
  useFeaturedResearch,
  useSubmitAuditRequest,
  useSubmitContact,
  usePageView,
  useAnalytics,
} from './hooks';

// Types
export type {
  // Common
  MessageResponse,
  ErrorResponse,
  PaginatedResponse,
  
  // Projects
  ProjectCategory,
  ProjectStatus,
  ProjectVisibility,
  ProjectListResponse,
  ProjectPublicResponse,
  
  // Research
  ResearchType,
  ResearchStatus,
  ResearchPublicResponse,
  ResearchListResponse,
  
  // Audits
  AuditType,
  AuditRequestStatus,
  AuditRequestCreate,
  AuditRequestSubmissionResponse,
  AuditTypeInfo,
  
  // Contact
  ContactType,
  ContactCreate,
  ContactSubmissionResponse,
  ContactTypeInfo,
  
  // Metrics
  MetricEventType,
  MetricEventCreate,
  
  // Health
  HealthResponse,
} from './types';

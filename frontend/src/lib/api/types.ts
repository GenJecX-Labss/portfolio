/**
 * API Types
 * 
 * TypeScript interfaces matching backend Pydantic schemas.
 */

// ============================================================================
// COMMON TYPES
// ============================================================================

export interface MessageResponse {
  message: string;
  success: boolean;
}

export interface ErrorResponse {
  detail: string;
  error_code?: string;
  request_id?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
}

// ============================================================================
// PROJECT TYPES
// ============================================================================

export type ProjectCategory = 
  | 'computer_vision'
  | 'nlp'
  | 'reinforcement_learning'
  | 'generative_ai'
  | 'time_series'
  | 'optimization'
  | 'other';

export type ProjectStatus = 'draft' | 'published' | 'archived';

export type ProjectVisibility = 'public' | 'private' | 'showcase';

export interface ProjectListResponse {
  id: number;
  title: string;
  slug: string;
  description: string;
  category: ProjectCategory;
  tags: string[];
  thumbnail_url?: string;
  featured: boolean;
  view_count: number;
  created_at: string;
}

export interface ProjectPublicResponse {
  id: number;
  title: string;
  slug: string;
  description: string;
  long_description?: string;
  category: ProjectCategory;
  tags: string[];
  tech_stack: string[];
  thumbnail_url?: string;
  images: string[];
  demo_url?: string;
  video_url?: string;
  github_url?: string;
  published_at?: string;
}

// ============================================================================
// RESEARCH TYPES
// ============================================================================

export type ResearchType = 
  | 'paper'
  | 'technical_report'
  | 'architecture_diagram'
  | 'case_study'
  | 'white_paper';

export type ResearchStatus = 'draft' | 'under_review' | 'published' | 'archived';

export interface ResearchPublicResponse {
  id: number;
  title: string;
  slug: string;
  abstract: string;
  content?: string;
  research_type: ResearchType;
  authors: string[];
  affiliations: string[];
  keywords: string[];
  topics: string[];
  publication_venue?: string;
  publication_date?: string;
  doi?: string;
  arxiv_id?: string;
  pdf_url?: string;
  external_url?: string;
  github_url?: string;
  citation_count: number;
  published_at?: string;
}

export interface ResearchListResponse {
  id: number;
  title: string;
  slug: string;
  abstract: string;
  research_type: ResearchType;
  authors: string[];
  keywords: string[];
  featured: boolean;
  view_count: number;
  publication_date?: string;
  created_at: string;
}

// ============================================================================
// AUDIT TYPES
// ============================================================================

export type AuditType = 
  | 'ml_model_review'
  | 'architecture_review'
  | 'code_review'
  | 'performance_audit'
  | 'security_audit'
  | 'custom';

export type AuditRequestStatus = 
  | 'pending'
  | 'qualified'
  | 'scheduled'
  | 'in_progress'
  | 'completed'
  | 'rejected';

export interface AuditRequestCreate {
  company_name: string;
  contact_name: string;
  contact_email: string;
  contact_phone?: string;
  company_website?: string;
  audit_type: AuditType;
  project_description: string;
  current_challenges?: string;
  desired_outcomes?: string;
  tech_stack?: string[];
  team_size?: number;
  project_stage?: string;
  preferred_timeline?: string;
  budget_range?: string;
  urgency_notes?: string;
}

export interface AuditRequestSubmissionResponse {
  success: boolean;
  message: string;
  request_id?: number;
}

export interface AuditTypeInfo {
  id: string;
  name: string;
  description: string;
}

// ============================================================================
// CONTACT TYPES
// ============================================================================

export type ContactType = 
  | 'general'
  | 'audit_request'
  | 'partnership'
  | 'employment'
  | 'press';

export interface ContactCreate {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  contact_type: ContactType;
  subject: string;
  message: string;
}

export interface ContactSubmissionResponse {
  success: boolean;
  message: string;
}

export interface ContactTypeInfo {
  id: string;
  name: string;
  description: string;
}

// ============================================================================
// METRICS TYPES
// ============================================================================

export type MetricEventType = 
  | 'page_view'
  | 'project_view'
  | 'research_download'
  | 'audit_request_view'
  | 'contact_form_view'
  | 'cta_click';

export interface MetricEventCreate {
  event_type: MetricEventType;
  event_name: string;
  path?: string;
  resource_type?: string;
  resource_id?: number;
  metadata?: Record<string, unknown>;
  session_id?: string;
  user_id?: string;
}

// ============================================================================
// HEALTH TYPES
// ============================================================================

export interface HealthResponse {
  status: string;
  environment: string;
  version: string;
}

/**
 * API Configuration
 * 
 * Central configuration for API endpoints and settings.
 */

// API Base URL - uses environment variable or defaults to localhost
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// API Version
export const API_VERSION = 'v1';

// Full API URL
export const API_URL = `${API_BASE_URL}/api/${API_VERSION}`;

// API Endpoints
export const ENDPOINTS = {
  // Projects
  PROJECTS: '/projects',
  PROJECTS_FEATURED: '/projects/featured',
  PROJECTS_CATEGORIES: '/projects/categories',
  PROJECTS_SEARCH: '/projects/search',
  
  // Research
  RESEARCH: '/research',
  RESEARCH_FEATURED: '/research/featured',
  RESEARCH_SEARCH: '/research/search',
  
  // Audits
  AUDITS: '/audits',
  AUDIT_REQUEST: '/audits/request',
  AUDIT_TYPES: '/audits/types',
  AUDIT_STATUS: '/audits/check-status',
  
  // Contact
  CONTACT: '/contact',
  CONTACT_SUBMIT: '/contact/submit',
  CONTACT_TYPES: '/contact/types',
  
  // Metrics
  METRICS: '/metrics',
  METRICS_TRACK: '/metrics/track',
  METRICS_PAGE_VIEW: '/metrics/page-view',
  
  // Health
  HEALTH: '/health',
} as const;

// Request timeout in milliseconds
export const REQUEST_TIMEOUT = 30000;

// Default headers
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

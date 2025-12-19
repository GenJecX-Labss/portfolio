/**
 * API Client
 * 
 * Core HTTP client for making API requests.
 */

import { API_URL, DEFAULT_HEADERS, REQUEST_TIMEOUT } from './config';
import type { ErrorResponse } from './types';

// Custom API error class
export class ApiError extends Error {
  status: number;
  data?: ErrorResponse;

  constructor(message: string, status: number, data?: ErrorResponse) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

// Request options type
interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
  timeout?: number;
}

/**
 * Build URL with query parameters
 */
function buildUrl(endpoint: string, params?: Record<string, string | number | boolean | undefined>): string {
  const url = new URL(`${API_URL}${endpoint}`);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }
  
  return url.toString();
}

/**
 * Make API request with timeout and error handling
 */
async function request<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { params, timeout = REQUEST_TIMEOUT, ...fetchOptions } = options;
  
  const url = buildUrl(endpoint, params);
  
  // Create abort controller for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers: {
        ...DEFAULT_HEADERS,
        ...fetchOptions.headers,
      },
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    // Handle non-2xx responses
    if (!response.ok) {
      let errorData: ErrorResponse | undefined;
      
      try {
        errorData = await response.json();
      } catch {
        // Response body is not JSON
      }
      
      throw new ApiError(
        errorData?.detail || `Request failed with status ${response.status}`,
        response.status,
        errorData
      );
    }
    
    // Handle empty responses (204 No Content)
    if (response.status === 204) {
      return {} as T;
    }
    
    return response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error instanceof ApiError) {
      throw error;
    }
    
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new ApiError('Request timed out', 408);
      }
      throw new ApiError(error.message, 0);
    }
    
    throw new ApiError('Unknown error occurred', 0);
  }
}

/**
 * API Client methods
 */
export const apiClient = {
  /**
   * GET request
   */
  get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return request<T>(endpoint, {
      ...options,
      method: 'GET',
    });
  },
  
  /**
   * POST request
   */
  post<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T> {
    return request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  },
  
  /**
   * PUT request
   */
  put<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T> {
    return request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  },
  
  /**
   * PATCH request
   */
  patch<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T> {
    return request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  },
  
  /**
   * DELETE request
   */
  delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return request<T>(endpoint, {
      ...options,
      method: 'DELETE',
    });
  },
};

export default apiClient;

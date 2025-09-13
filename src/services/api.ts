import { 
  UserProfile, 
  InternshipRecommendationRequest, 
  InternshipRecommendationResponse,
  AdminDashboardData,
  ApiResponse 
} from '@/types/api';

// Configure your backend API base URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

class ApiService {
  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Submit user profile and get recommendations
  async getRecommendations(
    request: InternshipRecommendationRequest
  ): Promise<ApiResponse<InternshipRecommendationResponse>> {
    return this.request<InternshipRecommendationResponse>('/recommendations', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  // Get user's previous submissions
  async getUserHistory(userId: string): Promise<ApiResponse<UserProfile[]>> {
    return this.request<UserProfile[]>(`/users/${userId}/history`);
  }

  // Save user profile
  async saveUserProfile(profile: UserProfile): Promise<ApiResponse<UserProfile>> {
    return this.request<UserProfile>('/users/profile', {
      method: 'POST',
      body: JSON.stringify(profile),
    });
  }

  // Admin: Get dashboard data
  async getAdminDashboard(): Promise<ApiResponse<AdminDashboardData>> {
    return this.request<AdminDashboardData>('/admin/dashboard');
  }

  // Admin: Get all submissions
  async getAllSubmissions(
    page: number = 1, 
    limit: number = 20
  ): Promise<ApiResponse<{ submissions: UserProfile[]; total: number }>> {
    return this.request(`/admin/submissions?page=${page}&limit=${limit}`);
  }

  // Health check
  async healthCheck(): Promise<ApiResponse<{ status: string }>> {
    return this.request<{ status: string }>('/health');
  }
}

export const apiService = new ApiService();
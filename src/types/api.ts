// API types for backend integration
export interface UserProfile {
  userId: string; // From existing PM scheme DB
  education: string;
  skills: string[];
  preferredLocation: string;
  interests: string[];
  cgpa?: number;
  experience?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InternshipRecommendationRequest {
  userId: string;
  education: string;
  skills: string[];
  preferredLocation: string;
  interests: string[];
  cgpa?: number;
  experience?: string;
}

export interface InternshipRecommendationResponse {
  recommendations: Array<{
    id: string;
    title: string;
    company: string;
    location: string;
    duration: string;
    stipend: string;
    description: string;
    requirements: string[];
    skills: string[];
    sector: string;
    matchScore: number;
    applicationDeadline: string;
    startDate: string;
    type: "remote" | "onsite" | "hybrid";
    companySize: string;
    benefits: string[];
  }>;
  totalCount: number;
  processingTime: number;
}

export interface AdminDashboardData {
  totalSubmissions: number;
  totalUsers: number;
  popularSkills: Array<{
    skill: string;
    count: number;
  }>;
  locationDistribution: Array<{
    location: string;
    count: number;
  }>;
  sectorDistribution: Array<{
    sector: string;
    count: number;
  }>;
  recentSubmissions: Array<{
    id: string;
    userId: string;
    userName: string;
    submittedAt: string;
    skills: string[];
    location: string;
  }>;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
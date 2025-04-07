// import { auth } from './firebase'; // Assuming firebase.ts is in the same lib directory - Removed unused import

// Define Job type based on backend JobRead model
export interface Job {
    id: string; // UUID
    title: string;
    description?: string | null;
    location?: string | null;
    location_type?: string | null;
    seniority_level?: string | null;
    created_by_user_id: string;
    created_at: string; // datetime
    candidate_count: number;
    average_score?: number | null;
    screening_link?: string | null;
}

// Type for creating a job (Matches backend JobCreate)
export interface JobCreateData {
  title: string;
  description?: string | null;
  location?: string | null;
  location_type?: string | null;
  seniority_level?: string | null;
}

// Types for Candidate Creation
export interface CandidateCreateData {
    full_name: string;
    phone_number: string;
    email?: string | null; // Optional email
}

// Type for reading candidate data (Matches backend CandidateRead)
export interface CandidateReadData extends CandidateCreateData {
    id: string; // Assuming UUID is string on frontend
    job_id: string;
    created_at: string; // Assuming datetime is string on frontend
    updated_at?: string | null;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
    const idToken = localStorage.getItem('idToken');
    if (!idToken) {
        throw new Error('No ID token found');
    }

    const headers = new Headers(options.headers);
    headers.set('Authorization', `Bearer ${idToken}`);
    headers.set('Content-Type', 'application/json');

    const response = await fetch(url, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'Failed to parse error response' }));
        console.error(`API Error (${response.status}):`, errorData);
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }
    return response;
}

// Function to get jobs
export const getJobsApi = async (): Promise<Job[]> => {
    const response = await fetchWithAuth(`${API_BASE_URL}/api/v1/jobs/`);
    return await response.json();
};

// Function to create a job
export const createJobApi = async (jobData: JobCreateData): Promise<Job> => {
    const response = await fetchWithAuth(`${API_BASE_URL}/api/v1/jobs/`, {
        method: 'POST',
        body: JSON.stringify(jobData),
    });
    return await response.json();
};

// Function to create a candidate for a specific job
export const createCandidateApi = async (jobId: string, candidateData: CandidateCreateData): Promise<CandidateReadData> => {
    const response = await fetchWithAuth(`${API_BASE_URL}/api/v1/candidates/${jobId}`, {
        method: 'POST',
        body: JSON.stringify(candidateData),
    });
    return await response.json();
};

// Add more API functions here as needed (getJobById, updateJob, deleteJob, etc.) 
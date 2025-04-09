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

// Updated CandidateReadData to include status and score
export interface CandidateReadData extends CandidateCreateData {
    id: string;
    job_id: string;
    created_at: string;
    updated_at?: string | null;
    status: string; // Added status
    score?: number | null; // Added score (use number for float)
}

export interface JobQuestion {
    id: string; // UUID as string
    job_id: string; // UUID as string
    question_text: string;
    created_at: string; // ISO date string
    updated_at?: string | null; // ISO date string or null
}

export interface JobQuestionCreateData {
    question_text: string;
}

export interface JobUpdateData {
    title?: string | null;
    description?: string | null;
    location?: string | null;
    location_type?: string | null; // Send enum value as string
    seniority_level?: string | null; // Send enum value as string
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

// Function to fetch a single job by ID
export const getJobDetailsApi = async (jobId: string, token: string): Promise<Job> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/jobs/${jobId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'Failed to fetch job details' }));
        console.error('Error fetching job details:', errorData);
        throw new Error(errorData.detail || 'Failed to fetch job details');
    }
    return await response.json();
};

// Function to fetch candidates for a specific job
export const getCandidatesForJobApi = async (jobId: string, token: string): Promise<CandidateReadData[]> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/jobs/${jobId}/candidates`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'Failed to fetch candidates' }));
        console.error('Error fetching candidates:', errorData);
        throw new Error(errorData.detail || 'Failed to fetch candidates');
    }
    return await response.json();
};

export const getJobQuestionsApi = async (jobId: string, token: string): Promise<JobQuestion[]> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/jobs/${jobId}/questions`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'Failed to fetch job questions' }));
        console.error('Error fetching job questions:', errorData);
        throw new Error(errorData.detail || 'Failed to fetch job questions');
    }
    return await response.json();
};

export const createJobQuestionApi = async (jobId: string, questionData: JobQuestionCreateData, token: string): Promise<JobQuestion> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/jobs/${jobId}/questions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(questionData),
    });
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'Failed to create job question' }));
        console.error('Error creating job question:', errorData);
        throw new Error(errorData.detail || 'Failed to create job question');
    }
    return await response.json();
};

export const deleteJobQuestionApi = async (jobId: string, questionId: string, token: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/jobs/${jobId}/questions/${questionId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        // Handle 204 No Content success case gracefully
        if (response.status === 204) {
             console.log(`Question ${questionId} deleted successfully.`);
             return;
        }
        const errorData = await response.json().catch(() => ({ detail: 'Failed to delete job question' }));
        console.error('Error deleting job question:', errorData);
        throw new Error(errorData.detail || 'Failed to delete job question');
    }
     console.log(`Question ${questionId} deleted successfully (status ${response.status}).`);
     // Even if status is 200 or other success codes, we might not have a body.
     // For DELETE, often 204 No Content is expected on success.
};

// Function to update a job
export const updateJobApi = async (jobId: string, jobData: JobUpdateData, token: string): Promise<Job> => {
    // Filter out null/undefined values if backend expects only provided fields
    const updatePayload: Partial<JobUpdateData> = {};
    for (const key in jobData) {
        if (jobData[key as keyof JobUpdateData] !== null && jobData[key as keyof JobUpdateData] !== undefined) {
            updatePayload[key as keyof JobUpdateData] = jobData[key as keyof JobUpdateData];
        }
    }
    // Ensure at least one field is being updated if backend requires it (currently does)
    if (Object.keys(updatePayload).length === 0) {
        // You might want to handle this differently, maybe return current job data or throw
        console.warn("Update called with no changes.");
        // Depending on how you want the flow, you might skip the API call
        // For now, let's allow the backend to handle the "no data" case (which raises 400)
        // throw new Error("No fields provided for update."); 
    }

    const response = await fetch(`${API_BASE_URL}/api/v1/jobs/${jobId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatePayload),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'Failed to update job' }));
        console.error('Error updating job:', errorData);
        throw new Error(errorData.detail || 'Failed to update job');
    }
    return await response.json();
};

// Add more API functions here as needed (getJobById, updateJob, deleteJob, etc.) 
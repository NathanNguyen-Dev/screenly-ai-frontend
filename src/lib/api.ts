import { auth } from './firebase'; // Assuming firebase.ts is in the same lib directory

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'; // Use env var or default

async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
    const user = auth.currentUser;
    if (!user) {
        throw new Error('User not authenticated. Cannot make API call.');
    }

    try {
        const token = await user.getIdToken(true); // Force refresh token if needed

        const headers = {
            ...options.headers,
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json', // Default to JSON content type
            'Accept': 'application/json',       // Expect JSON response
        };

        const response = await fetch(`${API_BASE_URL}${url}`, {
            ...options,
            headers,
        });

        return response; // Return the raw response for flexibility

    } catch (error) {
        console.error('API Fetch Error:', error);
        // Re-throw the error so the calling function can handle it
        throw error;
    }
}

// Specific API functions
export const createJobApi = async (jobData: { 
    title: string; 
    description?: string | null; // Allow null
    location?: string | null; // Allow null
    location_type?: string | null; // Add optional field (string from UI)
    seniority_level?: string | null; // Add optional field (string from UI)
}) => {
    const response = await fetchWithAuth('/api/v1/jobs/', {
        method: 'POST',
        body: JSON.stringify(jobData), // Send the whole object
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'Failed to parse error response' }));
        console.error('Create Job API Error:', response.status, errorData);
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }
    return response.json(); // Parse JSON response on success
};

export const getJobsApi = async () => {
    const response = await fetchWithAuth('/api/v1/jobs/', {
        method: 'GET',
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'Failed to parse error response' }));
        console.error('Get Jobs API Error:', response.status, errorData);
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }
    return response.json(); // Parse JSON response on success
};

// Add more API functions here as needed (getJobById, updateJob, deleteJob, etc.) 
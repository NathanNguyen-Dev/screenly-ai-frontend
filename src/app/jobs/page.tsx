'use client';

import React, { useState, useEffect, useCallback } from 'react';
import withAuth from '@/components/withAuth';
// import { useAuth } from '@/contexts/AuthContext'; // Removed unused import
import { User } from 'firebase/auth';
import CreateJobModal from '@/components/CreateJobModal';
import AppLayout from '@/components/AppLayout'; // Import the new layout
import Link from 'next/link'; // Import Link
import { getJobsApi, createJobApi } from '@/lib/api'; // Import API functions

// Placeholder Icons
const PlusIcon = () => (
  <svg className="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
);
const ExternalLinkIcon = () => (
  <svg className="w-4 h-4 ml-1 text-gray-400 group-hover:text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
);

// Define a type for the Job data
interface Job {
  id: string;
  title: string;
  description?: string | null;
  location?: string | null;
  location_type?: string | null;
  seniority_level?: string | null;
  created_by_user_id: string;
  created_at: string; // Or Date
  candidate_count: number;
  average_score?: number | null;
  screening_link?: string | null;
}

interface JobsPageProps {
  user: User;
}

const JobsPage: React.FC<JobsPageProps> = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]); // Use updated Job interface
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [selectedJobs, setSelectedJobs] = useState<Set<string>>(new Set());
  const [apiError, setApiError] = useState<string | null>(null); // State for API errors

  // Function to fetch jobs, wrapped in useCallback
  const fetchJobs = useCallback(async () => {
    setLoadingJobs(true);
    setApiError(null);
    console.log("Fetching jobs...");
    try {
      const fetchedJobs = await getJobsApi();
      console.log("Fetched jobs:", fetchedJobs);
      setJobs(fetchedJobs);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
      setApiError(error instanceof Error ? error.message : "Failed to load jobs.");
      setJobs([]); // Clear jobs on error
    } finally {
      setLoadingJobs(false);
    }
  }, []); // Empty dependency array means this function instance is stable

  // Fetch jobs on initial component mount
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]); // Include fetchJobs in dependency array

  const handleCreateJobSubmit = async (jobData: {
      title: string;
      description?: string | null;
      location?: string | null;
      location_type?: string | null;
      seniority_level?: string | null;
  }) => {
    console.log("Submitting new job:", jobData);
    setApiError(null);
    try {
      const newJob = await createJobApi(jobData);
      console.log("Job created successfully:", newJob);
      fetchJobs(); 
    } catch (error) {
      console.error("Failed to create job:", error);
      throw error; 
    }
  };

  const handleSelectJob = (jobId: string) => {
    setSelectedJobs(prev => {
      const newSelection = new Set(prev);
      if (newSelection.has(jobId)) {
        newSelection.delete(jobId);
      } else {
        newSelection.add(jobId);
      }
      return newSelection;
    });
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedJobs(new Set(jobs.map(job => job.id)));
    } else {
      setSelectedJobs(new Set());
    }
  };

  const isAllSelected = jobs.length > 0 && selectedJobs.size === jobs.length;

  const formatRelativeTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Invalid date'; // Handle cases where dateString is not parseable
      }
      const now = new Date();
      const diffSeconds = Math.round((now.getTime() - date.getTime()) / 1000);
      const diffMinutes = Math.round(diffSeconds / 60);
      const diffHours = Math.round(diffMinutes / 60);
      const diffDays = Math.round(diffHours / 24);

      if (diffSeconds < 60) return `less than a minute ago`;
      if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
      if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } catch (e) {
      console.error("Error formatting date:", dateString, e);
      return "Error formatting date";
    }
  };

  // Helper to format display values (like location type, seniority)
  const formatDisplay = (value: string | null | undefined) => {
      if (!value) return '-';
      return value.charAt(0).toUpperCase() + value.slice(1).replace('-',' ');
  }

  return (
    <AppLayout user={user}> { /* Use the AppLayout */}
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Job Listings</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusIcon />
          Add Job
        </button>
      </div>

      {/* Action bar for selected items */} 
      {selectedJobs.size > 0 && (
        <div className="mb-4 p-3 bg-indigo-50 border border-indigo-200 rounded-md flex items-center space-x-3">
           <button className="px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700">
             Archive Selected
           </button>
           <span className="text-sm text-gray-600">{selectedJobs.size} job(s) selected</span>
        </div>
      )}

      {/* API Error Display */} 
      {apiError && (
          <div className="mb-4 p-4 text-sm text-red-700 bg-red-100 border border-red-400 rounded" role="alert">
              <span className="font-medium">Error:</span> {apiError}
          </div>
      )}

      {/* Jobs Table/List */} 
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-3 w-12 text-center">
                   <input
                      type="checkbox"
                      className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      checked={isAllSelected}
                      onChange={handleSelectAll}
                      aria-label="Select all jobs"
                      disabled={jobs.length === 0}
                    />
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Posted
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Job Title
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Level
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Screening Link
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Candidates
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Average Score
                </th>
                 <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                 </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loadingJobs ? (
                 <tr>
                   <td colSpan={10} className="px-6 py-4 text-center text-gray-500">
                     Loading jobs...
                   </td>
                 </tr>
              ) : jobs.length === 0 && !apiError ? (
                <tr>
                   <td colSpan={10} className="px-6 py-4 text-center text-gray-500">
                     No jobs found. Add your first job!
                   </td>
                 </tr>
              ) : (
                jobs.map((job) => (
                  <tr key={job.id} className={`${selectedJobs.has(job.id) ? 'bg-indigo-50' : 'hover:bg-gray-50'}`}>
                    <td className="px-4 py-4 text-center">
                       <input
                          type="checkbox"
                          className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          checked={selectedJobs.has(job.id)}
                          onChange={() => handleSelectJob(job.id)}
                          aria-label={`Select job ${job.title}`}
                        />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatRelativeTime(job.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <Link href={`/jobs/${job.id}`} className="hover:text-indigo-600">
                          {job.title}
                       </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {job.location || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                       {formatDisplay(job.location_type)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                       {formatDisplay(job.seniority_level)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                       {job.screening_link ? (
                         <a href={job.screening_link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 group">
                           Screen
                           <ExternalLinkIcon />
                         </a>
                       ) : '-'}
                    </td>
                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                       {job.candidate_count}
                    </td>
                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                       {job.average_score?.toFixed(2) ?? '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                       <Link href={`/jobs/${job.id}`} className="text-indigo-600 hover:text-indigo-900">
                           View
                        </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal remains the same */}
      <CreateJobModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateJobSubmit}
      />
    </AppLayout>
  );
};

export default withAuth(JobsPage); 
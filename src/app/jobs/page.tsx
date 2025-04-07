'use client';

import React, { useState, useEffect, useCallback } from 'react';
import withAuth from '@/components/withAuth';
// import { useAuth } from '@/contexts/AuthContext'; // Removed unused import
import { User } from 'firebase/auth';
import CreateJobModal from '@/components/CreateJobModal';
// import CreateCandidateModal from '@/components/CreateCandidateModal'; // Removed modal import
import AppLayout from '@/components/AppLayout'; // Import the new layout
import Link from 'next/link'; // Import Link
import { getJobsApi, createJobApi, Job } from '@/lib/api'; // Removed Candidate types/API
import { Button } from "@/components/ui/button"; // Changed import to Shadcn Button

// Placeholder Icons
const PlusIcon = () => (
  <svg className="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
);
const ExternalLinkIcon = () => (
  <svg className="w-4 h-4 ml-1 text-gray-400 group-hover:text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
);
const UserAddIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
  </svg>
);

// Define a type for the Job data
// interface Job { ... }

interface JobsPageProps {
  user: User;
}

const JobsPage: React.FC<JobsPageProps> = ({ user }) => {
  // State for Modals
  const [isCreateJobModalOpen, setIsCreateJobModalOpen] = useState(false);
  // Removed Candidate Modal state
  // const [isCreateCandidateModalOpen, setIsCreateCandidateModalOpen] = useState(false);
  // const [jobIdForCandidate, setJobIdForCandidate] = useState<string | null>(null);

  // State for Data & UI
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [selectedJobs, setSelectedJobs] = useState<Set<string>>(new Set());
  const [apiError, setApiError] = useState<string | null>(null);

  // Fetch Jobs Logic
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
  }, []);

  // Fetch jobs on initial component mount
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]); // Include fetchJobs in dependency array

  // Submit Handler for Creating Jobs
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
      await createJobApi(jobData);
      fetchJobs(); 
    } catch (error) {
      console.error("Failed to create job:", error);
      throw error; 
    }
  };

  // Removed Candidate Submit Handler
  // const handleCreateCandidateSubmit = async (...) => { ... };

  // Selection Handlers
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

      if (diffSeconds < 60) return `just now`;
      if (diffMinutes < 60) return `${diffMinutes}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      return `${diffDays}d ago`;
    } catch (e) {
      console.error("Error formatting date:", dateString, e);
      return "Error";
    }
  };

  // Helper to format display values (like location type, seniority)
  const formatDisplay = (value: string | null | undefined): string => {
      if (!value) return '-';
      return value.charAt(0).toUpperCase() + value.slice(1).replace(/[-_]/g, ' ');
  }

  return (
    <AppLayout user={user}> { /* Use the AppLayout */}
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Job Listings</h1>
        <Button onClick={() => setIsCreateJobModalOpen(true)}>
          <PlusIcon />
          <span className="ml-2">Add Job</span>
        </Button>
      </div>

      {/* Action bar for selected items */} 
      {selectedJobs.size > 0 && (
        <div className="mb-4 p-3 bg-indigo-50 border border-indigo-200 rounded-md flex items-center space-x-3">
           <Button size="sm" variant="destructive">
             Archive Selected ({selectedJobs.size})
           </Button>
           {/* Add other bulk actions here */}
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
                      className="bg-white rounded border-gray-300 dark:border-gray-600 text-indigo-600 shadow-sm focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:ring-offset-0 dark:bg-gray-700 dark:checked:bg-indigo-600"
                      checked={isAllSelected}
                      onChange={handleSelectAll}
                      aria-label="Select all jobs"
                      disabled={jobs.length === 0 || loadingJobs}
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
                  Candidates
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Average Score
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Screening Link
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
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
                          className="bg-white rounded border-gray-300 dark:border-gray-600 text-indigo-600 shadow-sm focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:ring-offset-0 dark:bg-gray-700 dark:checked:bg-indigo-600"
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                       {job.candidate_count}
                    </td>
                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                       {job.average_score?.toFixed(2) ?? '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                       {job.screening_link ? (
                         <Link href={job.screening_link} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-900 group inline-flex items-center">
                           View Link <ExternalLinkIcon />
                         </Link>
                       ) : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-1">
                      <Link
                        href={`/jobs/${job.id}/add-candidate`}
                        passHref
                        legacyBehavior
                      >
                        <Button
                            size="sm"
                            variant="outline"
                            aria-label={`Add candidate to ${job.title}`}
                            title="Add Candidate"
                            className="h-8 w-8 p-0 text-foreground/70 hover:text-foreground"
                        >
                           <span className="sr-only">Add Candidate</span>
                            <UserAddIcon />
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */} 
      <CreateJobModal
        isOpen={isCreateJobModalOpen}
        onClose={() => setIsCreateJobModalOpen(false)}
        onSubmit={handleCreateJobSubmit}
      />

      {/* Removed CreateCandidateModal instance */}
      {/* <CreateCandidateModal ... /> */}
    </AppLayout>
  );
};

export default withAuth(JobsPage); 
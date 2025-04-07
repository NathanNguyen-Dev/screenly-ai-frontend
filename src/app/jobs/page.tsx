'use client';

import React, { useState, useEffect } from 'react';
import withAuth from '@/components/withAuth';
// import { useAuth } from '@/contexts/AuthContext'; // Removed unused import
import { User } from 'firebase/auth';
import CreateJobModal from '@/components/CreateJobModal';
import AppLayout from '@/components/AppLayout'; // Import the new layout
import Link from 'next/link'; // Import Link

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
  location?: string;
  created_at: string; // Or Date
  candidate_count: number;
  average_score?: number | null;
  screening_link?: string;
}

interface JobsPageProps {
  user: User;
}

const JobsPage: React.FC<JobsPageProps> = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [_jobs, _setJobs] = useState<Job[]>([]); // Renamed as setJobs is unused directly
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [selectedJobs, setSelectedJobs] = useState<Set<string>>(new Set());

  // TODO: Implement actual API call to fetch jobs here
  useEffect(() => {
    // API call logic will go here when ready
    // Example: const fetchedJobs = await api.getJobs();
    // _setJobs(fetchedJobs); // Use _setJobs here when ready
    // For now, just set loading to false after a delay
    const timer = setTimeout(() => {
       _setJobs([]); // Explicitly set empty array using the setter
       setLoadingJobs(false);
    }, 500);
    return () => clearTimeout(timer); // Cleanup timer
    // Add _setJobs to dependency array if ESLint warns, though it should be stable
  }, []); // Removed dependency _setJobs, as it's stable

  const handleCreateJobSubmit = async (title: string, description: string) => {
    console.log("Creating job with:", { title, description });
    // TODO: Replace with actual API call to backend (e.g., await api.createJob(...))
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
    console.log("Job creation API call finished (simulated).");
    // TODO: Refetch jobs list after successful creation 
    // Example: fetchJobs(); 
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
      setSelectedJobs(new Set(_jobs.map(job => job.id))); // Use _jobs here
    } else {
      setSelectedJobs(new Set());
    }
  };

  const isAllSelected = _jobs.length > 0 && selectedJobs.size === _jobs.length; // Use _jobs here

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffSeconds = Math.round((now.getTime() - date.getTime()) / 1000);
    const diffMinutes = Math.round(diffSeconds / 60);
    const diffHours = Math.round(diffMinutes / 60);
    const diffDays = Math.round(diffHours / 24);

    if (diffSeconds < 60) return `less than a minute ago`;
    if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

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
                      disabled={_jobs.length === 0} // Use _jobs
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
                   <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                     Loading jobs...
                   </td>
                 </tr>
              ) : _jobs.length === 0 ? (
                <tr>
                   <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                     No jobs found. Add your first job!
                   </td>
                 </tr>
              ) : (
                _jobs.map((job) => ( // Use _jobs
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
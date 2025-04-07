'use client';

import React, { useState } from 'react';
import withAuth from '@/components/withAuth'; // Import the HOC
import { useAuth } from '@/contexts/AuthContext'; // Import useAuth
import { User } from 'firebase/auth';
import CreateJobModal from '@/components/CreateJobModal'; // Import the modal

interface JobsPageProps {
  user: User; // Passed by withAuth HOC
}

const JobsPage: React.FC<JobsPageProps> = ({ user }) => {
  const { logout } = useAuth(); // Get logout function from context
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  // TODO: Fetch jobs from the backend API
  // TODO: Implement UI for displaying jobs and creating new ones

  const handleLogout = async () => {
    try {
      await logout();
      // Redirect happens automatically via AuthContext/withAuth HOC
    } catch (error) {
      console.error("Logout failed:", error);
      // Optionally show an error message to the user
    }
  };

  // Placeholder function for job creation submission
  const handleCreateJobSubmit = async (title: string, description: string) => {
    console.log("Creating job with:", { title, description });
    // TODO: Replace with actual API call to backend
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    // If API call fails, throw an error to show in modal:
    // throw new Error("API Error");
    console.log("Job created (simulated).");
    // TODO: Refetch jobs list after successful creation
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Jobs Dashboard</h1>
        <div className="flex items-center"> {/* Container for buttons */}
          <span className="text-sm text-gray-600 mr-4">Welcome, {user.email}!</span> {/* Display user email */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 mr-4 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Logout
          </button>
          <button
            onClick={() => setIsModalOpen(true)} // Open modal on click
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create New Job
          </button>
        </div>
      </header>

      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Your Jobs</h2>
        {/* TODO: Display list of jobs here */}
        <p>Job list will appear here...</p>
      </div>

      {/* Render the modal */}
      <CreateJobModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateJobSubmit}
      />
    </div>
  );
};

// Wrap the component with the HOC to protect it
export default withAuth(JobsPage); 
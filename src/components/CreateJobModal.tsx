'use client';

import React, { useState, FormEvent } from 'react';

// Define Enums/Types matching backend (or import if defined centrally)
const locationTypes = ["on-site", "remote", "hybrid"] as const; // Use 'as const' for type safety
type LocationType = typeof locationTypes[number];
const seniorityLevels = ["intern", "junior", "mid-level", "senior", "lead", "principal"] as const;
type SeniorityLevel = typeof seniorityLevels[number];

interface CreateJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  // Update onSubmit signature
  onSubmit: (data: {
    title: string;
    description?: string | null;
    location?: string | null;
    location_type?: LocationType | null;
    seniority_level?: SeniorityLevel | null;
  }) => Promise<void>;
}

const CreateJobModal: React.FC<CreateJobModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [locationType, setLocationType] = useState<LocationType>(locationTypes[1]); // Default: remote
  const [seniorityLevel, setSeniorityLevel] = useState<SeniorityLevel>(seniorityLevels[2]); // Default: mid-level
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      // Ensure location is only sent if needed
      const submitLocation = (locationType === 'on-site' || locationType === 'hybrid') ? location : null;
      
      await onSubmit({ 
        title, 
        description: description || null, // Send null if empty
        location: submitLocation, 
        location_type: locationType, 
        seniority_level: seniorityLevel 
      });
      
      // Reset form 
      setTitle(''); 
      setDescription('');
      setLocation('');
      setLocationType(locationTypes[1]);
      setSeniorityLevel(seniorityLevels[2]);
      onClose();
    } catch (err) {
      console.error("Failed to create job:", err);
      setError(err instanceof Error ? err.message : "Failed to create job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  // Helper to format enum/string values for display in dropdowns
  const formatDisplay = (value: string) => value.charAt(0).toUpperCase() + value.slice(1).replace('-',' ');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-xl m-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-gray-200 sticky top-0 bg-white px-1 pt-1">
          <h3 className="text-lg font-semibold text-gray-900">Create New Job</h3>
           <button
            onClick={onClose}
            className="text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-200 hover:text-gray-900"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Title */}
          <div>
            <label htmlFor="jobTitle" className="block mb-1 text-sm font-medium text-gray-900">Job Title</label>
            <input
               type="text"
              id="jobTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., Software Engineer"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="jobDescription" className="block mb-1 text-sm font-medium text-gray-900">Description <span className="text-gray-400">(Optional)</span></label>
            <textarea
              id="jobDescription"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter job details..."
             />
          </div>

          {/* Location Type Dropdown */}
          <div>
            <label htmlFor="locationType" className="block mb-1 text-sm font-medium text-gray-900">Location Type</label>
            <select
              id="locationType"
              value={locationType}
              onChange={(e) => setLocationType(e.target.value as LocationType)}
              required
              className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            >
              {locationTypes.map(type => (
                <option key={type} value={type}>{formatDisplay(type)}</option>
              ))}
            </select>
          </div>
          
           {/* Specific Location (shown for on-site/hybrid) */}
           {(locationType === 'on-site' || locationType === 'hybrid') && (
               <div>
                <label htmlFor="jobLocation" className="block mb-1 text-sm font-medium text-gray-900">Specific Location</label>
                <input
                  type="text"
                  id="jobLocation"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g., City, State or Area"
                  required={locationType === 'on-site' || locationType === 'hybrid'} // Explicitly match render condition
                />
              </div>
           )}

          {/* Seniority Level Dropdown */}
          <div>
            <label htmlFor="seniorityLevel" className="block mb-1 text-sm font-medium text-gray-900">Seniority Level</label>
            <select
              id="seniorityLevel"
              value={seniorityLevel}
              onChange={(e) => setSeniorityLevel(e.target.value as SeniorityLevel)}
              required
              className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            >
              {seniorityLevels.map(level => (
                <option key={level} value={level}>{formatDisplay(level)}</option>
              ))}
            </select>
          </div>

          {/* Error Display */}
          {error && (
            <div className="p-3 text-sm text-red-700 bg-red-100 border border-red-400 rounded">
              {error}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end pt-4 border-t border-gray-200 sticky bottom-0 bg-white px-1 pb-1">
             <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 mr-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJobModal; 
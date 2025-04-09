'use client';

import React, { useState, useEffect, useCallback, FormEvent } from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import AppLayout from '@/components/AppLayout';
import Link from 'next/link';
import { 
    getJobDetailsApi, 
    getCandidatesForJobApi, 
    getJobQuestionsApi,
    createJobQuestionApi,
    deleteJobQuestionApi,
    updateJobApi,
    Job, 
    CandidateReadData, 
    JobQuestion,
    JobUpdateData
} from '@/lib/api';

// Import Shadcn components
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge"; // For status display
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Added
import { toast } from "sonner"; // Import toast from sonner
import { Label } from "@/components/ui/label"; // Added
import { Textarea } from "@/components/ui/textarea"; // Added
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Added
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog"; // Added Dialog components

// Icons
const ArrowLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
    </svg>
);
const UserAddIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
  </svg>
);
const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>
  );
const EditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
    </svg>
);

// Helper to format display values
const formatDisplay = (value: string | null | undefined): string => {
    if (!value) return '-';
    return value.charAt(0).toUpperCase() + value.slice(1).replace(/[-_]/g, ' ');
}

// Helper to format status badges
const getStatusBadgeVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status?.toLowerCase()) {
        case 'completed': return 'default'; // Or success if you add a green variant
        case 'in_progress':
        case 'initiated':
        case 'ringing': return 'secondary';
        case 'failed':
        case 'busy': return 'destructive';
        case 'pending':
        case 'no_answer': return 'outline';
        default: return 'outline';
    }
}

// Enums for dropdowns (mirroring backend)
const locationTypes = ["on-site", "remote", "hybrid"];
const seniorityLevels = ["intern", "junior", "mid-level", "senior", "lead", "principal"];

export default function JobDetailPage() {
    const { user, getIdToken } = useAuth();
    const params = useParams();
    const jobId = params.jobId as string;

    const [job, setJob] = useState<Job | null>(null);
    const [candidates, setCandidates] = useState<CandidateReadData[]>([]);
    const [questions, setQuestions] = useState<JobQuestion[]>([]);
    const [newQuestionText, setNewQuestionText] = useState("");
    const [loading, setLoading] = useState(true);
    const [loadingQuestions, setLoadingQuestions] = useState(true);
    const [submittingQuestion, setSubmittingQuestion] = useState(false);
    const [deletingQuestionId, setDeletingQuestionId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // State for Edit Modal
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editFormData, setEditFormData] = useState<Partial<JobUpdateData>>({});
    const [isSubmittingEdit, setIsSubmittingEdit] = useState(false);

    const fetchData = useCallback(async () => {
        if (!jobId || !getIdToken) return;
        setLoading(true);
        setLoadingQuestions(true);
        setError(null);
        try {
            const token = await getIdToken();
            if (!token) throw new Error("Authentication token not available.");

            const [jobDetails, candidatesList, questionsList] = await Promise.all([
                getJobDetailsApi(jobId, token),
                getCandidatesForJobApi(jobId, token),
                getJobQuestionsApi(jobId, token)
            ]);
            setJob(jobDetails);
            setCandidates(candidatesList);
            setQuestions(questionsList);
            // Initialize edit form data when job data is fetched
            setEditFormData({ 
                title: jobDetails?.title,
                description: jobDetails?.description,
                location: jobDetails?.location,
                location_type: jobDetails?.location_type,
                seniority_level: jobDetails?.seniority_level
            });
        } catch (err: unknown) {
            console.error("Failed to fetch job data:", err);
            const message = err instanceof Error ? err.message : "An unknown error occurred";
            setError(message);
            setJob(null);
            setCandidates([]);
            setQuestions([]);
        } finally {
            setLoading(false);
            setLoadingQuestions(false);
        }
    }, [jobId, getIdToken]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Handler for input changes in the edit form
    const handleEditFormChange = (field: keyof JobUpdateData, value: string | null) => {
        setEditFormData(prev => ({
            ...prev,
            [field]: value === '' ? null : value // Treat empty string as null for optional fields
        }));
    };

    // Handler for submitting the job update
    const handleUpdateJob = async (event: FormEvent) => {
        event.preventDefault();
        if (!jobId || !getIdToken || !job) return;

        setIsSubmittingEdit(true);
        setError(null);

        // Construct the update payload - only include fields that actually changed
        const changes: JobUpdateData = {};
        let hasChanges = false;
        (Object.keys(editFormData) as Array<keyof JobUpdateData>).forEach(key => {
            const currentValue = editFormData[key] ?? null; // Treat undefined as null
            const originalValue = job[key] ?? null;
            // Need careful comparison, especially for optional fields
            if (currentValue !== originalValue) {
                changes[key] = currentValue;
                hasChanges = true;
            }
        });

        if (!hasChanges) {
            toast.info("No changes detected.");
            setIsEditModalOpen(false);
            setIsSubmittingEdit(false);
            return;
        }

        try {
            const token = await getIdToken();
            if (!token) throw new Error("Authentication token not available.");

            const updatedJob = await updateJobApi(jobId, changes, token);
            setJob(updatedJob); // Update the main job state
            // Update edit form data as well to reflect saved state
            setEditFormData({ 
                title: updatedJob.title,
                description: updatedJob.description,
                location: updatedJob.location,
                location_type: updatedJob.location_type,
                seniority_level: updatedJob.seniority_level
            });
            setIsEditModalOpen(false); // Close modal
            toast.success("Job updated successfully.");
        } catch (err) {
            console.error("Failed to update job:", err);
            const message = err instanceof Error ? err.message : "Failed to update job";
            setError(`Error updating job: ${message}`);
            toast.error(`Error: ${message}`);
        } finally {
            setIsSubmittingEdit(false);
        }
    };

    const handleCreateQuestion = async () => {
        if (!newQuestionText.trim() || !jobId || !getIdToken) return;
        setSubmittingQuestion(true);
        setError(null);
        try {
            const token = await getIdToken();
            if (!token) throw new Error("Authentication token not available.");
            const newQuestion = await createJobQuestionApi(jobId, { question_text: newQuestionText }, token);
            setQuestions(prev => [...prev, newQuestion]);
            setNewQuestionText("");
            toast.success("Question added successfully.");
        } catch (err) {
            console.error("Failed to create question:", err);
            const message = err instanceof Error ? err.message : "Failed to add question";
            setError(`Error adding question: ${message}`);
            toast.error(`Error: ${message}`);
        } finally {
            setSubmittingQuestion(false);
        }
    };

    const handleDeleteQuestion = async (questionId: string) => {
        if (!jobId || !questionId || !getIdToken) return;
        setDeletingQuestionId(questionId);
        setError(null);
        try {
            const token = await getIdToken();
            if (!token) throw new Error("Authentication token not available.");
            await deleteJobQuestionApi(jobId, questionId, token);
            setQuestions(prev => prev.filter(q => q.id !== questionId));
            toast.success("Question deleted.");
        } catch (err) {
            console.error("Failed to delete question:", err);
            const message = err instanceof Error ? err.message : "Failed to delete question";
            setError(`Error deleting question: ${message}`);
            toast.error(`Error: ${message}`);
        } finally {
            setDeletingQuestionId(null);
        }
    };

    // Reset form data when modal is opened/closed
    useEffect(() => {
        if (isEditModalOpen && job) {
            // Reset form to current job details when modal opens
            setEditFormData({ 
                title: job.title,
                description: job.description,
                location: job.location,
                location_type: job.location_type,
                seniority_level: job.seniority_level
            });
        } else {
            // Optionally clear form data when closing, though resetting on open is safer
        }
    }, [isEditModalOpen, job]);

    if (!user) { return <div>Loading user...</div>; }

    return (
        <AppLayout user={user}>
            <div className="container mx-auto py-8 px-4 md:px-0">
                {/* Back Link */} 
                <Link href="/jobs" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
                    <ArrowLeftIcon />
                    <span className="ml-1">Back to Jobs List</span>
                </Link>

                {loading && <p>Loading job details...</p>}
                {error && (
                    <p className="p-4 text-sm text-destructive rounded-lg bg-destructive/10 mb-4" role="alert">
                        <span className="font-medium">Error:</span> {error}
                    </p>
                )}

                {!loading && job && (
                    <div className="space-y-6">
                        {/* Job Information Card */} 
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-2xl font-bold">{job.title}</CardTitle>
                                {/* --- Edit Job Button Trigger --- */} 
                                <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" size="sm">
                                            <EditIcon />
                                            <span className="ml-1">Edit Job</span>
                                        </Button>
                                    </DialogTrigger>
                                    {/* --- Edit Job Modal Content --- */} 
                                    <DialogContent className="sm:max-w-[600px]">
                                        <DialogHeader>
                                            <DialogTitle>Edit Job Details</DialogTitle>
                                        </DialogHeader>
                                        <form onSubmit={handleUpdateJob} className="grid gap-4 py-4">
                                            {/* Title */}
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="edit-title" className="text-right">Title</Label>
                                                <Input 
                                                    id="edit-title" 
                                                    value={editFormData.title || ''} 
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEditFormChange('title', e.target.value)}
                                                    className="col-span-3" 
                                                    required 
                                                />
                                            </div>
                                            {/* Description */}
                                            <div className="grid grid-cols-4 items-start gap-4">
                                                <Label htmlFor="edit-description" className="text-right pt-2">Description</Label>
                                                <Textarea 
                                                    id="edit-description"
                                                    value={editFormData.description || ''}
                                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleEditFormChange('description', e.target.value)}
                                                    className="col-span-3"
                                                    rows={5}
                                                />
                                            </div>
                                            {/* Location Type */}
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="edit-location-type" className="text-right">Type</Label>
                                                <Select 
                                                    value={editFormData.location_type || undefined}
                                                    onValueChange={(value: string) => handleEditFormChange('location_type', value)}
                                                >
                                                    <SelectTrigger id="edit-location-type" className="col-span-3">
                                                        <SelectValue placeholder="Select type..." />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {locationTypes.map(type => (
                                                            <SelectItem key={type} value={type}>{formatDisplay(type)}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                             {/* Location (Conditional) */}
                                             {(editFormData.location_type === 'on-site' || editFormData.location_type === 'hybrid') && (
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="edit-location" className="text-right">Location</Label>
                                                    <Input 
                                                        id="edit-location"
                                                        value={editFormData.location || ''}
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEditFormChange('location', e.target.value)}
                                                        className="col-span-3"
                                                        placeholder="e.g., Sydney CBD"
                                                        required={editFormData.location_type === 'on-site' || editFormData.location_type === 'hybrid'}
                                                    />
                                                </div>
                                             )}
                                            {/* Seniority Level */}
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="edit-seniority" className="text-right">Level</Label>
                                                <Select 
                                                    value={editFormData.seniority_level || undefined}
                                                    onValueChange={(value: string) => handleEditFormChange('seniority_level', value)}
                                                >
                                                    <SelectTrigger id="edit-seniority" className="col-span-3">
                                                        <SelectValue placeholder="Select level..." />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {seniorityLevels.map(level => (
                                                            <SelectItem key={level} value={level}>{formatDisplay(level)}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <DialogFooter>
                                                <DialogClose asChild>
                                                    <Button type="button" variant="outline">Cancel</Button>
                                                </DialogClose>
                                                <Button type="submit" disabled={isSubmittingEdit}>
                                                    {isSubmittingEdit ? "Saving..." : "Save Changes"}
                                                </Button>
                                            </DialogFooter>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                {job.description && <p className="text-muted-foreground">{job.description}</p>}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                    <div>
                                        <span className="font-medium text-muted-foreground">Location:</span> {formatDisplay(job.location) || '-'}
                                    </div>
                                    <div>
                                        <span className="font-medium text-muted-foreground">Type:</span> {formatDisplay(job.location_type)}
                                    </div>
                                    <div>
                                        <span className="font-medium text-muted-foreground">Level:</span> {formatDisplay(job.seniority_level)}
                                    </div>
                                    <div>
                                        <span className="font-medium text-muted-foreground">Candidates:</span> {job.candidate_count}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Screening Questions Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Screening Questions</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {loadingQuestions && <p>Loading questions...</p>}
                                {!loadingQuestions && (
                                    <div className="space-y-4">
                                        {questions.length === 0 ? (
                                            <p className="text-sm text-muted-foreground">No screening questions added yet.</p>
                                        ) : (
                                            <ul className="space-y-2">
                                                {questions.map((question) => (
                                                    <li key={question.id} className="flex items-center justify-between text-sm p-2 border rounded">
                                                        <span>{question.question_text}</span>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => handleDeleteQuestion(question.id)}
                                                            disabled={deletingQuestionId === question.id}
                                                            aria-label={`Delete question: ${question.question_text}`}
                                                        >
                                                            {deletingQuestionId === question.id ? (
                                                                <span className="text-xs">Deleting...</span>
                                                            ) : (
                                                                <TrashIcon />
                                                            )}
                                                        </Button>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                        {/* Add New Question Form */} 
                                        <div className="flex items-center space-x-2 pt-4 border-t mt-4">
                                            <Input
                                                type="text"
                                                placeholder="Add a new screening question..."
                                                value={newQuestionText}
                                                onChange={(e) => setNewQuestionText(e.target.value)}
                                                disabled={submittingQuestion}
                                                className="flex-grow"
                                            />
                                            <Button
                                                onClick={handleCreateQuestion}
                                                disabled={!newQuestionText.trim() || submittingQuestion}
                                            >
                                                {submittingQuestion ? "Adding..." : "Add Question"}
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Candidates Table Card */} 
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle>Candidates</CardTitle>
                                <Link href={`/jobs/${jobId}/add-candidate`} passHref legacyBehavior>
                                    <Button size="sm">
                                        <UserAddIcon />
                                        <span className="ml-2">Add Candidate</span>
                                    </Button>
                                </Link>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Phone</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Score</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {candidates.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                                                    No candidates added yet.
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            candidates.map((candidate) => (
                                                <TableRow key={candidate.id}>
                                                    <TableCell className="font-medium">{candidate.full_name}</TableCell>
                                                    <TableCell>{candidate.phone_number}</TableCell>
                                                    <TableCell>{candidate.email || '-'}</TableCell>
                                                    <TableCell>
                                                        <Badge variant={getStatusBadgeVariant(candidate.status)}>
                                                            {formatDisplay(candidate.status)}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="text-right">{candidate.score?.toFixed(1) ?? '-'}</TableCell>
                                                    <TableCell className="text-right">
                                                        {/* Add action buttons here: Start Call, View Results, etc. */} 
                                                        {(candidate.status === 'pending' || candidate.status === 'failed') && (
                                                            <Button size="sm" variant="outline">Start Call</Button>
                                                        )}
                                                        {candidate.status === 'completed' && (
                                                            <Button size="sm" variant="secondary">View Results</Button>
                                                        )}
                                                        {/* Add other actions like Delete candidate later */}
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </AppLayout>
    );
} 
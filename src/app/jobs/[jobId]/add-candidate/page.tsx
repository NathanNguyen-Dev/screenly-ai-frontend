'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
// Shadcn UI Imports
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { createCandidateApi, CandidateCreateData } from '@/lib/api';
import AppLayout from '@/components/AppLayout';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

// Placeholder Icon for back button
const ArrowLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
    </svg>
);

export default function AddCandidatePage() {
    const { user } = useAuth();
    const router = useRouter();
    const params = useParams();
    const jobId = params.jobId as string;

    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!jobId) {
            setError('Error: Job ID is missing from URL.');
            return;
        }
        if (!fullName.trim() || !phoneNumber.trim()) {
            setError('Full Name and Phone Number are required.');
            return;
        }

        setIsLoading(true);
        setError(null);
        const candidateData: CandidateCreateData = {
            full_name: fullName.trim(),
            phone_number: phoneNumber.trim(),
            email: email.trim() || null,
        };

        try {
            await createCandidateApi(jobId, candidateData);
            console.log('Candidate created successfully!');
            router.push(`/jobs/${jobId}`);
        } catch (err: unknown) {
            console.error("Error submitting candidate:", err);
            const errorMessage = err instanceof Error ? err.message : 'Failed to create candidate. Please try again.';
            setError(errorMessage);
            setIsLoading(false);
        }
    };

    // Ensure user is loaded before rendering layout/page
    if (!user) {
        // Or render a loading state consistent with your app
        return <div>Loading user...</div>; 
    }

    return (
        <AppLayout user={user}>
            <div className="max-w-2xl mx-auto py-8">
                <Link href={jobId ? `/jobs/${jobId}` : '/jobs'} className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
                    <ArrowLeftIcon />
                    <span className="ml-1">Back to Job</span>
                </Link>

                <form onSubmit={handleSubmit}>
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle>Add Candidate</CardTitle>
                            <CardDescription>Enter the candidate&apos;s details below.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {error && (
                                <p className="p-3 text-sm text-destructive rounded-lg bg-destructive/10" role="alert">
                                    <span className="font-medium">Error:</span> {error}
                                </p>
                            )}
                            <div className="grid w-full items-center gap-1.5">
                                <Label htmlFor="fullName">Full Name</Label>
                                <Input
                                    id="fullName"
                                    placeholder="Candidate full name"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    required
                                    disabled={isLoading}
                                    aria-invalid={!!error && !fullName.trim()}
                                />
                            </div>
                            <div className="grid w-full items-center gap-1.5">
                                <Label htmlFor="phoneNumber">Phone Number</Label>
                                <Input
                                    id="phoneNumber"
                                    placeholder="Candidate phone number"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    required
                                    disabled={isLoading}
                                    aria-invalid={!!error && !phoneNumber.trim()}
                                />
                            </div>
                            <div className="grid w-full items-center gap-1.5">
                                <Label htmlFor="email">Email (Optional)</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Candidate email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={isLoading}
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end space-x-2">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => router.back()}
                                disabled={isLoading}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? 'Adding...' : 'Add Candidate'}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </AppLayout>
    );
} 
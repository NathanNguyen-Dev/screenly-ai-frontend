'use client';

import React from 'react';
import withAuth from '@/components/withAuth';
import AppLayout from '@/components/AppLayout';
import { User } from 'firebase/auth';

interface DashboardPageProps {
    user: User;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ user }) => {
    return (
        <AppLayout user={user}>
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <div className="mt-4 bg-white p-6 rounded shadow-md">
                <p>Dashboard content will go here.</p>
                {/* Add charts, summaries, etc. later */}
            </div>
        </AppLayout>
    );
};

export default withAuth(DashboardPage); 
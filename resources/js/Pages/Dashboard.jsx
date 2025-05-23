import { useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ user }) {
    // Auto-redirect based on user role type
    useEffect(() => {
        if (user.role_type === 'vendor') {
            window.location.href = '/vendor';
        } else if (user.role_type === 'user') {
            // // Redirect regular users to YouTube
            // window.location.href = 'https://youtube.com';
        } else if (user.role_type === 'admin') {
            // Keep admin on dashboard or redirect to admin panel

            window.location.href = '/admin';
        }
    }, [user]);


}

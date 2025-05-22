import { useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ user }) {
    // Auto-redirect if user is vendor
    useEffect(() => {
        if (user.role_type === 'vendor') {
            window.location.href = '/vendor'; // Or use Inertia's router if needed
        }
    }, [user]);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-bold mb-2">User Details</h3>
                            <ul className="mb-4 space-y-1">
                                <li><strong>Name:</strong> {user.name}</li>
                                <li><strong>Email:</strong> {user.email}</li>
                                <li><strong>Phone:</strong> {user.phone}</li>
                                <li><strong>Address:</strong> {user.address}</li>
                                <li><strong>Country:</strong> {user.country}</li>
                                <li><strong>Role:</strong> {user.role_type}</li>
                            </ul>

                            {/* The buttons are now optional since vendor is auto-redirected */}
                            <div className="mt-4 space-x-4">
                                {user.role_type === 'user' && (
                                    <button
                                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                        onClick={() => alert('User Dashboard coming soon')}
                                    >
                                        User Dashboard
                                    </button>
                                )}

                                {user.role_type === 'admin' && (
                                    <button
                                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                        onClick={() => alert('Admin Panel coming soon')}
                                    >
                                        Admin Panel
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

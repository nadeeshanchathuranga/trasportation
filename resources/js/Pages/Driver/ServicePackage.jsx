import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function ServicePackage({ user, driver }) {
    return (
        <AuthenticatedLayout user={user}>
            <Head title="Driver Service Package" />

            <div className="max-w-4xl mx-auto mt-10 bg-white p-8 shadow rounded">
                <h1 className="text-2xl font-bold text-green-700 mb-4">
                    Welcome, {driver.user?.name || 'Driver'}!
                </h1>

                <p className="text-gray-700 mb-6">
                    Your driver account is <strong className="text-green-600">accepted</strong>. Below you'll find details or options related to service packages.
                </p>

                {/* Example content */}
                <div className="bg-gray-100 p-4 rounded">
                    <p>This is where you can display available service packages, pricing, subscriptions, or any relevant features.</p>
                </div>

                <div className="mt-6">
                    <a href="/" className="text-blue-600 underline hover:text-blue-800">
                        Go to Home
                    </a>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

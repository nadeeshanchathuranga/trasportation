import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const Dashboard = ({ auth, freightCompany }) => {
    if (freightCompany.status === 'pending') {
        return (
            <AuthenticatedLayout>
                <Head title="Freight Dashboard" />
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                <div className="text-center">
                                    <h2 className="text-2xl font-semibold mb-4">Welcome, {freightCompany.business_name}</h2>
                                    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
                                        <p className="font-bold">Your registration is pending approval</p>
                                        <p>Please wait while our administrators review your application. We will notify you once your account has been approved.</p>
                                    </div>
                                    <div className="mt-6">
                                        <h3 className="text-lg font-semibold mb-2">What happens next?</h3>
                                        <ul className="list-disc list-inside text-gray-600">
                                            <li>Our team will review your submitted documents</li>
                                            <li>We will verify your business information</li>
                                            <li>You will receive an email notification once approved</li>
                                            <li>After approval, you'll have full access to all features</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }

    if (freightCompany.status === 'rejected') {
        return (
            <AuthenticatedLayout>
                <Head title="Freight Dashboard" />
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                <div className="text-center">
                                    <h2 className="text-2xl font-semibold mb-4">Welcome, {freightCompany.business_name}</h2>
                                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
                                        <p className="font-bold">Your registration has been rejected</p>
                                        <p>Please contact our support team for more information about the rejection.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }

    return (
        <AuthenticatedLayout>
            <Head title="Freight Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-semibold">Welcome, {freightCompany.business_name}</h2>
                                <div className="flex items-center space-x-4">
                                    {freightCompany.logo && (
                                        <img
                                            src={freightCompany.logo}
                                            alt="Company Logo"
                                            className="h-12 w-12 rounded-full object-cover"
                                        />
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Company Information Card */}
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <h3 className="text-lg font-semibold mb-4">Company Information</h3>
                                    <div className="space-y-2">
                                        <p><span className="font-medium">Business Type:</span> {freightCompany.business_type}</p>
                                        <p><span className="font-medium">Registration Number:</span> {freightCompany.registration_number}</p>
                                        <p><span className="font-medium">Location:</span> {freightCompany.location}</p>
                                        <p><span className="font-medium">Email:</span> {freightCompany.email}</p>
                                        <p><span className="font-medium">Phone:</span> {freightCompany.phone}</p>
                                    </div>
                                </div>

                                {/* Services Card */}
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <h3 className="text-lg font-semibold mb-4">Services Offered</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {freightCompany.service_types.map((service, index) => (
                                            <span
                                                key={index}
                                                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                                            >
                                                {service}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Vehicle Types Card */}
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <h3 className="text-lg font-semibold mb-4">Vehicle Types</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {freightCompany.vehicle_types.map((vehicle, index) => (
                                            <span
                                                key={index}
                                                className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                                            >
                                                {vehicle}
                                            </span>
                                        ))}
                                    </div>
                                    {freightCompany.capacity_range && (
                                        <div className="mt-4">
                                            <p className="font-medium">Capacity Range:</p>
                                            <p className="text-gray-600">{freightCompany.capacity_range}</p>
                                        </div>
                                    )}
                                </div>

                                {/* Documents Card */}
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <h3 className="text-lg font-semibold mb-4">Documents</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="font-medium">Business Certificate</p>
                                            <a
                                                href={freightCompany.business_certificate}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline"
                                            >
                                                View Certificate
                                            </a>
                                        </div>
                                        <div>
                                            <p className="font-medium">Tax Document</p>
                                            <a
                                                href={freightCompany.tax_document}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline"
                                            >
                                                View Tax Document
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Status Card */}
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <h3 className="text-lg font-semibold mb-4">Account Status</h3>
                                    <div className="flex items-center">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                freightCompany.status === 'approved'
                                                    ? 'bg-green-100 text-green-800'
                                                    : freightCompany.status === 'pending'
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}
                                        >
                                            {freightCompany.status.charAt(0).toUpperCase() + freightCompany.status.slice(1)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Dashboard; 
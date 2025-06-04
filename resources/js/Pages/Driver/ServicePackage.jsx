import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head ,Link } from '@inertiajs/react';
import {  } from '@inertiajs/react';

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
<div className="mt-6 grid grid-cols-2 gap-4">
    <Link
        href={route('driver.service_package_form')}
        className="inline-block text-center bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition duration-200"
    >
        Enter Package
    </Link>


    <Link
        href={route('driver.service_package.view')}
        className="inline-block text-center bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition duration-200"
    >
     Package View
    </Link>

    <Link
        href={route('driver.date_range_booking.view')}
        className="inline-block text-center bg-orange-600 text-white px-5 py-2 rounded hover:bg-orange-700 transition duration-200"
    >
        Date Range Booking
    </Link>



       <Link
        href={route('driver.booking.view')}
        className="inline-block text-center bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700 transition duration-200"
    >
     Booking View
    </Link>


       <Link
        href={route('driver.payout')}
        className="inline-block text-center bg-rose-600 text-white px-5 py-2 rounded hover:bg-rose-700 transition duration-200"
    >
    Driver Payout
    </Link>



</div>


            </div>
        </AuthenticatedLayout>
    );
}

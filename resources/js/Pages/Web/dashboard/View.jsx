import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function View({ auth }) {
    const user = auth.user;

    return (
        <AuthenticatedLayout user={user}>
            <Head title="User Dashboard" />

            <div className="max-w-3xl mx-auto mt-10 bg-white p-8 shadow rounded">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    Welcome, {user?.name} 👋
                </h1>

                <p className="text-gray-600 mb-6">
                    You are logged in as <span className="font-semibold">{user?.role_type}</span>.
                </p>

                <div className="bg-blue-100 p-4 rounded">
                    <p>This is your personal dashboard. You can manage your profile, view activity, or access available features based on your role.</p>
                </div>

            <div className="mt-6 flex flex-wrap gap-4">
  <Link
    href={route('user.fight_view')} // Replace with your actual route name
    className="inline-block text-center bg-rose-600 text-white px-5 py-2 rounded hover:bg-rose-700 transition duration-200"
  >
    Flights Section
  </Link>

  <Link
    href={route('user.booking_view')} // Replace with your actual route name
    className="inline-block text-center bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition duration-200"
  >
    Booking Summary
  </Link>
</div>

            </div>
        </AuthenticatedLayout>
    );
}

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react'; // ✅ Import Link

export default function Dashboard() {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h2 className="text-lg font-bold mb-4">Admin Dashboard</h2>

                        {/* ✅ Vendor List Link */}
                        <Link
                            href={route('vendor.list')}
                            className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            View Vendor List
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

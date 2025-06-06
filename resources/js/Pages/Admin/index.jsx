import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard() {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h2 className="text-lg font-bold mb-4">Admin Dashboard</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                            {/* Total Vendors */}
                            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-red-500">
                                <h3 className="text-lg font-semibold mb-1">Total Vendors</h3>
                                <Link
                                    href={route("vendor.list")}
                                    className="text-sm text-blue-600 hover:underline mt-2 block"
                                >
                                    View Vendor List
                                </Link>
                            </div>

                            {/* Total Drivers */}
                            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
                                <h3 className="text-lg font-semibold mb-1">Total Drivers</h3>
                                <Link
                                    href={route("driver.list")}
                                    className="text-sm text-blue-600 hover:underline mt-2 block"
                                >
                                    View Driver List
                                </Link>
                            </div>

                            {/* Service Packages */}
                            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-yellow-500">
                                <h3 className="text-lg font-semibold mb-1">Service Packages</h3>
                                <Link
                                    href="/admin/packages"
                                    className="text-sm text-blue-600 hover:underline mt-2 block"
                                >
                                    View Service Packages
                                </Link>
                            </div>

                            {/* Complaints */}
                            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
                                <h3 className="text-lg font-semibold mb-1">Total Complaints</h3>
                                <Link
                                    href="/complaints"
                                    className="text-sm text-blue-600 hover:underline mt-2 block"
                                >
                                    View all complaints
                                </Link>
                            </div>

                            {/* Activity Logs */}
                            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
                                <h3 className="text-lg font-semibold mb-1">Total Activities</h3>
                                <Link
                                    href={route("admin.activity-logs")}
                                    className="text-sm text-blue-600 hover:underline mt-2 block"
                                >
                                    View all activities
                                </Link>
                            </div>

                            {/* Courier Pickups */}
                            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-purple-500">
                                <h3 className="text-lg font-semibold mb-1">Courier Pickups</h3>
                                <Link
                                    href={route("admin.couriers")}
                                    className="text-sm text-blue-600 hover:underline mt-2 block"
                                >
                                    Manage Courier Pickups
                                </Link>
                            </div>

                            {/* Flight Search */}
                            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-rose-500">
                                <h3 className="text-lg font-semibold mb-1">Flight Search</h3>
                                <Link
                                    href={route("admin.flight_list")}
                                    className="text-sm text-blue-600 hover:underline mt-2 block"
                                >
                                    View Flight List
                                </Link>
                            </div>

                            {/* Warehouse Management */}
                            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
                                <h3 className="text-lg font-semibold mb-1">Warehouse Management</h3>
                                <Link
                                    href={route("vendor.warehouses.index")}
                                    className="text-sm text-blue-600 hover:underline mt-2 block"
                                >
                                    View Warehouse List
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

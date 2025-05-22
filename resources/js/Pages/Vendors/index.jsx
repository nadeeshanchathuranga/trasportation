import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';

export default function VendorDashboard({ user, vehicleCategories }) {
    const { flash } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        user_id: user.id,
        business_name: '',
        business_registration_no: '',
        registration_document: null,
        business_logo: null,
        category_id: '',
        no_of_vehicles: '',
        air_certificate: null,
        meritime_lisence: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('vendor.store'), {
            onSuccess: () => {
                reset(); // Reset all fields including text and selects
                // Reset file inputs manually (Inertia doesn't auto-clear them)
                document.querySelectorAll('input[type="file"]').forEach((input) => {
                    input.value = null;
                });
            }
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <>
                    <h2 className="text-xl font-semibold text-gray-800">Vendor Dashboard</h2>
                    <p>Welcome, {user.name}! This is your vendor panel.</p>
                </>
            }
        >
            <Head title="Vendor Dashboard" />

            {/* Flash message */}
            {flash?.success && (
                <div className="mb-4 max-w-4xl mx-auto bg-green-100 text-green-800 p-4 rounded shadow">
                    ✅ {flash.success}
                </div>
            )}
            {flash?.error && (
                <div className="mb-4 max-w-4xl mx-auto bg-red-100 text-red-800 p-4 rounded shadow">
                    ❌ {flash.error}
                </div>
            )}

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8 bg-white p-6 rounded shadow">
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <input type="hidden" name="user_id" value={data.user_id} />

                            {[
                                { label: 'Business Name', key: 'business_name' },
                                { label: 'Registration No', key: 'business_registration_no' },
                                { label: 'No. of Vehicles', key: 'no_of_vehicles', type: 'number' },
                            ].map(({ label, key, type = 'text' }) => (
                                <div key={key}>
                                    <label className="block text-sm font-medium">{label}</label>
                                    <input
                                        type={type}
                                        value={data[key]}
                                        onChange={(e) => setData(key, e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded"
                                    />
                                    {errors[key] && <p className="text-red-600 text-sm">{errors[key]}</p>}
                                </div>
                            ))}

                            {/* Select Category */}
                            <div>
                                <label className="block text-sm font-medium">Vehicle Category</label>
                                <select
                                    value={data.category_id}
                                    onChange={(e) => setData('category_id', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded"
                                >
                                    <option value="">-- Select Category --</option>
                                    {vehicleCategories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.category_id && <p className="text-red-600 text-sm">{errors.category_id}</p>}
                            </div>

                            {/* File Fields */}
                            {[
                                { label: 'Registration Document', key: 'registration_document' },
                                { label: 'Business Logo', key: 'business_logo' },
                                { label: 'Air Certificate', key: 'air_certificate' },
                                { label: 'Meritime License', key: 'meritime_lisence' },
                            ].map(({ label, key }) => (
                                <div key={key}>
                                    <label className="block text-sm font-medium">{label}</label>
                                    <input
                                        type="file"
                                        onChange={(e) => setData(key, e.target.files[0])}
                                        className="mt-1 block w-full"
                                    />
                                    {errors[key] && <p className="text-red-600 text-sm">{errors[key]}</p>}
                                </div>
                            ))}
                        </div>

                        <div className="mt-6">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                disabled={processing}
                            >
                                {processing ? 'Submitting...' : 'Submit Vendor Info'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

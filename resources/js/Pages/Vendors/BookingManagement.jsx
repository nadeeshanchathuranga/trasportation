import { usePage } from '@inertiajs/react';
import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function BookingManagement() {
  const { props } = usePage();
  const successMessage = props.flash?.success;

  return (
    <AuthenticatedLayout>
      <div className="min-h-screen bg-gray-400 py-10 px-4">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="bg-gray-200 rounded-2xl shadow-md p-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            {successMessage && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                ✅ {successMessage}
              </div>
            )}
            <h1 className="text-3xl font-bold text-gray-800">Booking Management Section</h1>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

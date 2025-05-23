import { usePage, Link } from '@inertiajs/react';
import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function VendorDashboard() {
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
            <h1 className="text-3xl font-bold text-gray-800">Vendor Dashboard</h1>
          </div>

          {/* Responsive grid layout */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/vehicles">
              <div className="rounded-3xl overflow-hidden shadow-lg bg-gray-200">
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2 bg-slate-300 p-4 rounded-2xl">
                    Go to Vehicle Management Section
                  </div>
                  <p className="text-gray-700 text-base">
                    Manage your registered vehicles, add new ones, and check availability.
                  </p>
                </div>
              </div>
            </Link>

            <Link href="/booking-management">
              <div className="rounded-3xl overflow-hidden shadow-lg bg-gray-200">
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2 bg-orange-300 p-4 rounded-2xl">
                    Go to Booking Management Section
                  </div>
                  <p className="text-gray-700 text-base">
                    View and manage bookings, accept or reject reservations, and more.
                  </p>
                </div>
              </div>
            </Link>

            <Link href="/earning-management">
              <div className="rounded-3xl overflow-hidden shadow-lg bg-gray-200">
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2 bg-green-300 p-4 rounded-2xl">
                    Earnings / Payouts
                  </div>
                  <p className="text-gray-700 text-base">
                    Track your earnings, request payouts, and view payment history.
                  </p>
                </div>
              </div>
            </Link>

            <Link href="#">
              <div className="rounded-3xl overflow-hidden shadow-lg bg-gray-200">
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2 bg-red-300 p-4 rounded-2xl">
                    Promotions & Discounts
                  </div>
                  <p className="text-gray-700 text-base">
                    Create offers and manage discounts to attract more bookings.
                  </p>
                </div>
              </div>
            </Link>

            <Link href="#">
              <div className="rounded-3xl overflow-hidden shadow-lg bg-gray-200">
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2 bg-purple-300 p-4 rounded-2xl">
                    Reports & Analytics
                  </div>
                  <p className="text-gray-700 text-base">
                    Analyze your business performance, view trends, and optimize operations.
                  </p>
                </div>
              </div>
            </Link>

            <Link href="#">
              <div className="rounded-3xl overflow-hidden shadow-lg bg-gray-200">
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2 bg-blue-300 p-4 rounded-2xl">
                    Reviews & Ratings
                  </div>
                  <p className="text-gray-700 text-base">
                    Read customer reviews and see your overall vendor rating.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

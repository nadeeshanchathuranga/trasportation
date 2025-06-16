import React from 'react';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import { Link } from '@inertiajs/react';

export default function BookingPage() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-between">
      <Header />

      <main className="py-12 px-4 sm:px-8 lg:px-20">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
          Choose Your Vehicle Type
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Land Vehicle */}
          <Link href="/vehicle-bookings/bookings/land" className="transform transition hover:scale-105">
            <div className="bg-white rounded-2xl shadow-md hover:shadow-lg overflow-hidden">
              <div className="h-40 bg-gradient-to-r from-green-200 to-green-100 flex items-center justify-center">
                <span className="text-2xl font-bold text-green-800">Land Vehicles</span>
              </div>
              <div className="px-6 py-4">
                <p className="text-gray-600 text-sm">
                  Includes cars, trucks, buses, and motorcycles—ideal for road transportation, personal or commercial use.
                </p>
              </div>
            </div>
          </Link>

          {/* Water Vehicle */}
          <Link href="/vehicle-bookings/bookings/sea" className="transform transition hover:scale-105">
            <div className="bg-white rounded-2xl shadow-md hover:shadow-lg overflow-hidden">
              <div className="h-40 bg-gradient-to-r from-blue-200 to-blue-100 flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-800">Water Vehicles</span>
              </div>
              <div className="px-6 py-4">
                <p className="text-gray-600 text-sm">
                  Boats and yachts designed for water navigation and leisure trips over lakes, rivers, or oceans.
                </p>
              </div>
            </div>
          </Link>

          {/* Air Vehicle */}
          <Link href="/vehicle-bookings/bookings/air" className="transform transition hover:scale-105">
            <div className="bg-white rounded-2xl shadow-md hover:shadow-lg overflow-hidden">
              <div className="h-40 bg-gradient-to-r from-purple-200 to-purple-100 flex items-center justify-center">
                <span className="text-2xl font-bold text-purple-800">Air Vehicles</span>
              </div>
              <div className="px-6 py-4">
                <p className="text-gray-600 text-sm">
                  Aircraft such as helicopters or private jets for fast and flexible air travel.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

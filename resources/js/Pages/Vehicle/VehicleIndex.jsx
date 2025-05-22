import { usePage, Link } from '@inertiajs/react';
import React from 'react';

export default function VehicleIndex() {
  const { props } = usePage();
  const successMessage = props.flash?.success;

  return (
    <div className="min-h-screen bg-gray-500 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8 space-y-4">

        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">🚗 Vehicles</h1>
          <a href="/vehicles/create">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200">
              + Register New Vehicle
            </button>
          </a>
        </div>

        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            ✅ {successMessage}
          </div>
        )}

      </div>
    </div>
  );
}

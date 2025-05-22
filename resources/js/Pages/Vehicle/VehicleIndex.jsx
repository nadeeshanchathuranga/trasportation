import { usePage, Link } from '@inertiajs/react';
import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function VehicleIndex() {
  const { props } = usePage();
  const successMessage = props.flash?.success;
  const { vehicles, landVehicles, airVehicles, seaVehicles } = props.data || {};

  const renderTable = (title, items, isNested = false) => (
    <div className="bg-gray-300 shadow-md rounded-xl p-6 mt-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">#</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Model</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Category</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Vehicle No</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Capacity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {items?.length > 0 ? (
              items.map((item, index) => {
                const vehicle = isNested ? item.vehicle : item;
                return (
                  <tr key={vehicle?.id || index}>
                    <td className="px-4 py-2 text-sm">{index + 1}</td>
                    <td className="px-4 py-2 text-sm">{vehicle?.model || 'N/A'}</td>
                    <td className="px-4 py-2 text-sm">{vehicle?.category || 'N/A'}</td>
                    <td className="px-4 py-2 text-sm">{vehicle?.vehicle_no || 'N/A'}</td>
                    <td className="px-4 py-2 text-sm">{vehicle?.passenger_capacity || 'N/A'}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td className="px-4 py-2 text-sm text-center" colSpan="5">No vehicles available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <AuthenticatedLayout>
      <div className="min-h-screen bg-gray-400 py-10 px-4">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex justify-between items-center bg-gray-200 rounded-2xl shadow-md p-6">
            <h1 className="text-3xl font-bold text-gray-800">🚗 Vehicle Management</h1>
            <Link href="/vehicles/create">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200">
                + Register New Vehicle
              </button>
            </Link>
          </div>

          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              ✅ {successMessage}
            </div>
          )}

          {renderTable("All Registered Vehicles", vehicles)}
          {renderTable("Land Vehicles", landVehicles, true)}
          {renderTable("Air Vehicles", airVehicles, true)}
          {renderTable("Sea Vehicles", seaVehicles, true)}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

import React from 'react';
import { usePage, router } from '@inertiajs/react';

const DriverBookingView = () => {
  const { bookings, flash } = usePage().props;

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this booking?')) {
      router.delete(route('driver.booking.delete', id));
    }
  };

  const handleAccept = (id) => {
    router.put(route('driver.booking.accept', id));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">My Driver Bookings</h1>

      {flash.message && (
        <div className="mb-4 bg-green-100 text-green-800 px-4 py-2 rounded">
          {flash.message}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">#</th>
              <th className="p-2 border">Start Date</th>
              <th className="p-2 border">End Date</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={booking.id} className="text-center border-t">
                <td className="p-2 border">{index + 1}</td>
                <td className="p-2 border">{booking.start_date}</td>
                <td className="p-2 border">{booking.end_date}</td>
                <td className="p-2 border">{booking.description || '-'}</td>
                <td className="p-2 border capitalize text-sm font-semibold">
                  <span className={`inline-block px-2 py-1 rounded ${
                    booking.status === 'pending'
                      ? 'bg-yellow-200 text-yellow-800'
                      : booking.status === 'confirmed'
                      ? 'bg-green-200 text-green-800'
                      : 'bg-red-200 text-red-800'
                  }`}>
                    {booking.status}
                  </span>
                </td>
                <td className="p-2 border space-x-2">
                  {booking.status !== 'confirmed' && (
                    <button
                      onClick={() => handleAccept(booking.id)}
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    >
                      Accept
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(booking.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                  {/* Optional edit button here */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DriverBookingView;

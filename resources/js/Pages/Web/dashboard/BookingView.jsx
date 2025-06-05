import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const BookingView = ({ auth, bookings }) => {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Booking Summary" />

      <div className="max-w-6xl mx-auto mt-10 bg-white p-6 shadow rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Booking Summary</h1>

        {bookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">#</th>
                  <th className="px-4 py-2 border">Airline</th>
                  <th className="px-4 py-2 border">Seat</th>
                  <th className="px-4 py-2 border">Price</th>
                  <th className="px-4 py-2 border">Tax</th>
                  <th className="px-4 py-2 border">Baggage</th>
                  <th className="px-4 py-2 border">Departure</th>
                  <th className="px-4 py-2 border">Arrival</th>
                  <th className="px-4 py-2 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{index + 1}</td>
                    <td className="px-4 py-2 border">{booking.flight?.airline ?? 'N/A'}</td>
                    <td className="px-4 py-2 border">{booking.seat_number}</td>
                    <td className="px-4 py-2 border">LKR {booking.price.toLocaleString()}</td>
                    <td className="px-4 py-2 border">LKR {booking.tax.toLocaleString()}</td>
                    <td className="px-4 py-2 border">{booking.baggage}</td>
                    <td className="px-4 py-2 border">{booking.departure_time}</td>
                    <td className="px-4 py-2 border">{booking.arrival_time ?? 'N/A'}</td>
                    <td className="px-4 py-2 border capitalize">{booking.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 italic">No bookings found.</p>
        )}
      </div>
    </AuthenticatedLayout>
  );
};

export default BookingView;

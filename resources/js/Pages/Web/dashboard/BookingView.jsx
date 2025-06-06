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
            {user_type === 'user' && (
  <th className="px-4 py-2 border">E-Ticket</th>
)}
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
    {user_type === 'user' && (
  <td className="px-4 py-2 border capitalize">
    {(booking.status === 'completed' || booking.status === 'confirmed') ? (
      <a
        href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-green-600 rounded hover:bg-green-700 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        PDF
      </a>
    ) : (
      <span className="text-gray-400 italic">Pending</span>
    )}
  </td>
)}


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

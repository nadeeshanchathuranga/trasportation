import { usePage } from '@inertiajs/react';
import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CalendarView from './CalendarView';

export default function BookingManagement() {
  const { props } = usePage();
  const successMessage = props.flash?.success;

  return (
    <AuthenticatedLayout>
      <div className="min-h-screen bg-gray-400 py-10 px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            {successMessage && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded w-full">
                ✅ {successMessage}
              </div>
            )}
            <h1 className="text-3xl font-bold text-gray-800">📦 Booking Management</h1>
          </div>

          {/* All Bookings Section */}
          <Section title="📃 All Vehicle Bookings">
            <BookingsTable
              bookings={[
                {
                  id: 1,
                  customer: 'Neranda Dilhara',
                  type: 'Land',
                  model: 'Toyota Voxy',
                  pickup: 'Kurunegala',
                  dropoff: 'Kaduwela',
                  date: '23-05-2025',
                  status: 'Confirmed',
                  actions: ['View', 'Start Trip', 'Mark as Completed', 'Cancel'],
                },
              ]}
            />
          </Section>

          {/* Pending Requests */}
          <Section title="🕓 Pending Booking Requests">
            <BookingsTable
              bookings={[
                {
                  id: 2,
                  customer: 'Neranda Dilhara',
                  type: 'Land',
                  model: 'Toyota Voxy',
                  pickup: 'Kurunegala',
                  dropoff: 'Kaduwela',
                  date: '23-05-2025',
                  status: 'Pending',
                  actions: ['Accept', 'Reject'],
                },
              ]}
            />
          </Section>

          {/* Completed Bookings */}
          <Section title="✅ Completed Bookings">
            <BookingsTable
              bookings={[
                {
                  id: 3,
                  customer: 'Neranda Dilhara',
                  type: 'Land',
                  model: 'Toyota Voxy',
                  pickup: 'Kurunegala',
                  dropoff: 'Kaduwela',
                  date: '23-05-2025',
                  status: 'Completed',
                  actions: [],
                },
              ]}
            />
          </Section>

          {/* Booking Calendar */}
          <Section title="📅 Booking Calendar View">
            <CalendarView />
          </Section>

          {/* History */}
          <Section title="📋 Booking History">
            <p className="text-gray-700">
              View completed, canceled, or expired bookings. Add filters for date range, vehicle, and status. Export functionality (PDF/CSV) can be added for convenience.
            </p>
          </Section>

          {/* Payments */}
          <Section title="💳 Payment & Invoicing">
            <p className="text-gray-700">
              Track booking payments. Show paid/unpaid status, generate invoices, and link to the vendor earnings section.
            </p>
          </Section>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

// Reusable section component
const Section = ({ title, children }) => (
  <div className="bg-white rounded-xl shadow p-6 space-y-4">
    <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
    <div>{children}</div>
  </div>
);

// Reusable bookings table
const BookingsTable = ({ bookings }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full table-auto border-collapse">
      <thead>
        <tr className="bg-gray-300 text-left text-sm text-gray-600">
          <th className="p-2">#</th>
          <th className="p-2">Customer</th>
          <th className="p-2">Type</th>
          <th className="p-2">Model</th>
          <th className="p-2">Pickup</th>
          <th className="p-2">Dropoff</th>
          <th className="p-2">Date</th>
          <th className="p-2">Status</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody className="text-sm text-gray-700">
        {bookings.map((booking, index) => (
          <tr key={booking.id} className="border-b hover:bg-gray-100">
            <td className="p-2">{index + 1}</td>
            <td className="p-2">{booking.customer}</td>
            <td className="p-2">{booking.type}</td>
            <td className="p-2">{booking.model}</td>
            <td className="p-2">{booking.pickup}</td>
            <td className="p-2">{booking.dropoff}</td>
            <td className="p-2">{booking.date}</td>
            <td className="p-2 font-medium">{booking.status}</td>
            <td className="p-2 space-x-2">
              {booking.actions.map((action, idx) => (
                <button
                  key={idx}
                  className="bg-blue-500 text-white px-3 py-1 text-xs rounded hover:bg-blue-700 transition"
                >
                  {action}
                </button>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

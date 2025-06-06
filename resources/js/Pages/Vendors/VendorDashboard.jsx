import { usePage, Link } from '@inertiajs/react';
import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function VendorDashboard() {
  const { props } = usePage();
  const successMessage = props.flash?.success;

  return (
    <AuthenticatedLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-500 to-gray-600 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header section */}
          <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 text-white">Vendor Dashboard</h1>
              <p className="text-gray-500 mt-1">Manage your vehicle rental business</p>
            </div>

            {successMessage && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-lg flex items-center space-x-2 animate-fade-in">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>{successMessage}</span>
              </div>
            )}
          </div>

          {/* Dashboard cards grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Vehicle Management",
                description: "Manage your registered vehicles, add new ones, and check availability.",
                href: "/vehicles",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                ),
                color: "bg-indigo-100 text-indigo-600"
              },
              {
                title: "Booking Management",
                description: "View and manage bookings, accept or reject reservations, and more.",
                href: "/booking-management",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                  </svg>
                ),
                color: "bg-amber-100 text-amber-600"
              },
              {
                title: "Earnings & Payouts",
                description: "Track your earnings, request payouts, and view payment history.",
                href: "/earning-management",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                color: "bg-emerald-100 text-emerald-600"
              },
              {
                title: "Booking Session Management",
                description: "View and manage bookings, accept or reject reservations, and more.",
                href: "/bookingsession-management",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear-fill" viewBox="0 0 16 16">
                     <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
                  </svg>
                ),
                color: "bg-amber-100 text-amber-600"
              },
              {
                title: "Promotions & Discounts",
                description: "Create offers and manage discounts to attract more bookings.",
                href: "/promotion-management",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" />
                  </svg>
                ),
                color: "bg-rose-100 text-rose-600"
              },
              {
                title: "Reports & Analytics",
                description: "Analyze your business performance, view trends, and optimize operations.",
                href: "/report-management",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
                color: "bg-violet-100 text-violet-600"
              },
              {
                title: "Reviews & Ratings",
                description: "Read customer reviews and see your overall vendor rating.",
                href: "/review-management",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                ),
                color: "bg-blue-100 text-blue-600"
              },
              {
                title: "Warehouse Management",
                description: "Manage your warehouse spaces, including availability and pricing.",
                href: "/warehouses",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18v18H3V3z" />
                  </svg>
                ),
                color: "bg-green-100 text-green-600"
              }
            ].map((card, index) => (
              <Link
                href={card.href}
                key={index}
                className="group transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="h-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 group-hover:shadow-md group-hover:border-transparent">
                  <div className="p-6">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${card.color}`}>
                      {card.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{card.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{card.description}</p>
                    <div className="mt-4 flex items-center text-sm font-medium text-indigo-600 group-hover:text-indigo-700 transition-colors">
                      View section
                      <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

import React from 'react';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import { Link } from '@inertiajs/react';

export default function landIndex({ vehicles = [], landVehicleDetails = [] }) {
  const hasData = vehicles.length > 0 && landVehicleDetails.length > 0;

  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Land Vehicles</h1>

        {!hasData ? (
          <p className="text-center text-gray-600">No land vehicles available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {landVehicleDetails.map((land) => {
              const vehicle = vehicles.find(v => v.id === land.vehicle_id);
              if (!vehicle) return null;

              return (
                <div key={vehicle.id} className="border rounded-lg shadow-md p-4">
                  <img
                    src={`/storage/${vehicle.cover_image}`}
                    alt={vehicle.model}
                    className="w-full h-48 object-cover rounded mb-4"
                  />
                  <h2 className="text-xl font-semibold">{vehicle.model}</h2>
                  <p><strong>Brand:</strong> {vehicle.brand?.name}</p>
                  <p><strong>Vehicle No:</strong> {vehicle.vehicle_no}</p>
                  <p><strong>Year:</strong> {vehicle.manufracture_year}</p>
                  <p><strong>Color:</strong> {vehicle.color}</p>
                  <p><strong>Passenger Capacity:</strong> {vehicle.passenger_capacity}</p>
                  <p><strong>Current Mileage:</strong> {vehicle.currect_milage} km</p>
                  <p><strong>Condition:</strong> {vehicle.condition}</p>
                  <p><strong>Ownership Type:</strong> {vehicle.ownership_type}</p>
                  <p><strong>Description:</strong> {vehicle.description}</p>
                  <p><strong>Insurance:</strong> {vehicle.insuarance_provider_name}</p>
                  <p><strong>Engine Type:</strong> {land.engine_type}</p>
                  <p><strong>Transmission:</strong> {land.transmission}</p>

                  <Link href={`/vehicle-bookings/bookings/land/${vehicle.id}`}>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4">
                      Book Now
                    </button>
                  </Link>

                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

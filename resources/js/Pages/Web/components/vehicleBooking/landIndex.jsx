import React from 'react';
import { motion } from 'framer-motion';
import { Car, Calendar, Palette, Users, Gauge, Shield, Settings, Wrench } from 'lucide-react';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import { Link } from '@inertiajs/react';

export default function LandIndex({ vehicles = [], landVehicleDetails = [] }) {
  const hasData = vehicles.length > 0 && landVehicleDetails.length > 0;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const VehicleCard = ({ vehicle, landDetails }) => (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: -8,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
      }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
    >
      {/* Image Container with Gradient Overlay */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={`/storage/app/public/vehicle_images/${vehicle.cover_image}`}
          alt={vehicle.model}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Floating Badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-gray-800">
          {vehicle.condition}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            {vehicle.model}
          </h3>
          <div className="flex items-center gap-2 text-gray-600">
            <Car className="w-4 h-4" />
            <span className="font-medium">{vehicle.brand?.name}</span>
            <span className="text-gray-400">•</span>
            <span className="text-sm">{vehicle.vehicle_no}</span>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-blue-500" />
            <span className="text-gray-600">{vehicle.manufracture_year}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Users className="w-4 h-4 text-green-500" />
            <span className="text-gray-600">{vehicle.passenger_capacity} seats</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Gauge className="w-4 h-4 text-orange-500" />
            <span className="text-gray-600">{vehicle.currect_milage} km</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Palette className="w-4 h-4 text-purple-500" />
            <span className="text-gray-600">{vehicle.color}</span>
          </div>
        </div>

        {/* Technical Details */}
        <div className="space-y-2 pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Engine</span>
            </div>
            <span className="font-medium text-gray-900">{landDetails.engine_type}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Wrench className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Transmission</span>
            </div>
            <span className="font-medium text-gray-900">{landDetails.transmission}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Insurance</span>
            </div>
            <span className="font-medium text-gray-900">{vehicle.insuarance_provider_name}</span>
          </div>
        </div>

        {/* Description */}
        {vehicle.description && (
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
            {vehicle.description}
          </p>
        )}

        {/* Ownership Badge */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {vehicle.ownership_type}
          </span>
        </div>

        {/* Book Button */}
        <Link href={`/vehicle-bookings/bookings/land/${vehicle.id}`}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Book Now
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Land Vehicles
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our premium fleet of land vehicles, perfect for your travel needs
          </p>
        </motion.div>

        {/* Content */}
        {!hasData ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Car className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Vehicles Available
              </h3>
              <p className="text-gray-600">
                We're currently updating our fleet. Please check back soon for available vehicles.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
          >
            {landVehicleDetails.map((land) => {
              const vehicle = vehicles.find(v => v.id === land.vehicle_id);
              if (!vehicle) return null;

              return (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  landDetails={land}
                />
              );
            })}
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
}

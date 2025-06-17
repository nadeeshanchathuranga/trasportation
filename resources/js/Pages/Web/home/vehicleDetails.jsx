import React, { useMemo } from "react";
import { usePage } from "@inertiajs/react";
import Header from "../layouts/Header";
import FilterSidebar from "../components/vehicleList/FilterSidebar";
import VehicleImageGallery from "../components/vehicleDetails/VehicleImageGallery";
import VehicleInformation from "../components/vehicleDetails/VehicleInformation";
import bg from "../assets/rentAVehicle/bg/bg.png";

const VehicleDetails = () => {
  const { props } = usePage();
  const { vehicle } = props;

  const memoizedVehicle = useMemo(() => {
    if (!vehicle) return null;
    return {
      ...vehicle,
      name: vehicle.model || vehicle.name,
      price: vehicle.price,
      image: vehicle.image
    };
  }, [vehicle]);

  if (!memoizedVehicle) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">No vehicle selected</p>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div
        className="main-content flex"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "calc(100vh - 80px)",
        }}
      >
        <FilterSidebar searchParams={props.searchParams || {}} />
        <div className="vehicle-list-container flex-1 p-4 flex">
          <VehicleImageGallery vehicle={memoizedVehicle} />
          <VehicleInformation
            vehicle={memoizedVehicle}
            searchParams={props.searchParams || {}}
          />
          <div
            className="bottom-placeholder mt-8 bg-gray-200 rounded-md"
            style={{ height: "300px" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;

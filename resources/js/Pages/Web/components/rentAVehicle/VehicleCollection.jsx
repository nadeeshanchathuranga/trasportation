import React, { useState } from "react";
import { router } from "@inertiajs/react";

import car1 from "../../assets/rentAVehicle/collection/car1.png";
import car2 from "../../assets/rentAVehicle/collection/car2.png";
import car3 from "../../assets/rentAVehicle/collection/car3.png";
import car4 from "../../assets/rentAVehicle/collection/car4.png";
import info from "../../assets/rentAVehicle/collection/info.png";

import heartFill from '../../assets/rentAVehicle/collection/heartFill.png'
import heart from '../../assets/rentAVehicle/collection/heart.png'

const VehicleCollection = () => {
  const [likedVehicles, setLikedVehicles] = useState({});

  const toggleLike = (vehicleName) => {
    setLikedVehicles(prev => ({
      ...prev,
      [vehicleName]: !prev[vehicleName]
    }));
  };

  const handleViewDetails = (vehicle) => {
    router.visit('/vehicleDetails', {
      data: {
        vehicle: vehicle,
        searchParams: {}
      }
    });
  };

  const handleViewMore = () => {
    router.visit('/vehicleList');
  };

  const vehicles = [
    {
      name: "HYUNDAI TUCSON",
      price: 89,
      image: car1,
      info: info,
    },
    {
      name: "TOYOTA CAMRY",
      price: 75,
      image: car2,
      info: info,
    },
    {
      name: "HONDA CR-V",
      price: 82,
      image: car3,
      info: info,
    },
    {
      name: "BMW X5",
      price: 120,
      image: car4,
      info: info,
    },
    {
      name: "MERCEDES C-CLASS",
      price: 110,
      image: car1,
      info: info,
    },
    {
      name: "AUDI Q5",
      price: 115,
      image: car2,
      info: info,
    },
    {
      name: "LEXUS RX",
      price: 105,
      image: car3,
      info: info,
    },
    {
      name: "MERCEDES C-CLASS",
      price: 110,
      image: car1,
      info: info,
    },
  ];

  return (
    <div className="w-full py-12">
      <div className="container mx-auto">
        <h2 className="bebas-neue text-[40px] font-[400] text-center mb-8">
          OUR <span className="text-[#0955AC]">IMPRESSIVE COLLECTION </span> OF
          VEHICLES
        </h2>
        <p className="poppins text-[#0F0F0F80] text-[15px] text-center mb-10">
          Ranging from elegant sedans to powerful vehicles, all carefully
          selected to provide our customers <br /> with the ultimate driving
          experience.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[50px] justify-items-center">
          {vehicles.map((vehicle, index) => (
            <div
              key={index}
              className="bg-white shadow-md overflow-hidden h-auto w-[286px] py-5"
            >
              <div className="flex items-center justify-center mt-5">
                <img
                  src={vehicle.info}
                  alt={vehicle.info}
                  className="h-[36px] w-[207px]"
                />
              </div>

              <div className="flex items-center justify-center">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className=""
                />
              </div>
              <div className="p-2 flex flex-col items-center justify-center">
                <h3 className="bebas-neue text-[30px] font-[400]">
                  {vehicle.name.split(" ").map((word, i) => (
                    <span key={i} className={i === 1 ? "text-[#0955AC]" : ""}>
                      {word}{" "}
                    </span>
                  ))}
                </h3>
                <p className="poppins font-[700] text-[25px]">
                  {vehicle.price}.00
                  <span className="text-[#00000080] text-[10px] font-[600]"> /day</span>
                </p>
                <div className="flex gap-2 mt-4">
                  <button 
                    onClick={() => handleViewDetails(vehicle)}
                    className="bebas-neue bg-[#0955AC] hover:bg-white hover:text-black text-white text-[9px] font-[400] py-2 px-4 rounded w-[194px] h-[30px] cursor-pointer"
                  >
                    View Details
                  </button>
                  <button 
                    onClick={() => toggleLike(vehicle.name)}
                    className={`bebas-neue border-[1.5px] border-[#0955AC] text-[9px] font-[400] p-1 rounded-[4px] h-[30px] w-[30px] cursor-pointer flex items-center justify-center ${
                      likedVehicles[vehicle.name] 
                        ? 'bg-white text-[#0955AC]' 
                        : 'bg-white text-[#0955AC]'
                    }`}
                  >
                    <span className="w-[16px] h-[13px] flex items-center justify-center">
                      <img 
                        src={likedVehicles[vehicle.name] ? heartFill : heart} 
                        alt="heart"
                        className="w-full h-full object-contain"
                      />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <button 
            onClick={handleViewMore}
            className="bg-[#0955AC] border-[2px] border-[#0955AC] text-white text-[16px] font-[700] py-2 px-6 rounded-[9px] cursor-pointer">
            VIEW MORE
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleCollection;

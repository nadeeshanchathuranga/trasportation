import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import car1 from "../../assets/rentAVehicle/collection/car1.png";
import car2 from "../../assets/rentAVehicle/collection/car2.png";
import car3 from "../../assets/rentAVehicle/collection/car3.png";
import car4 from "../../assets/rentAVehicle/collection/car4.png";
import info from "../../assets/rentAVehicle/collection/info.png";

import heartFill from '../../assets/rentAVehicle/collection/heartFill.png'
import heart from '../../assets/rentAVehicle/collection/heart.png'

const VehicleListContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [likedVehicles, setLikedVehicles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const itemsPerPage = 6;

  const vehicles = useMemo(() => [
    {
      name: "HYUNDAI TUCSON",
      price: 89,
      image: car1,
      info: info,
      brand: "Hyundai",
      bodyType: "suv"
    },
    {
      name: "TOYOTA CAMRY",
      price: 75,
      image: car2,
      info: info,
      brand: "Toyota",
      bodyType: "sedan"
    },
    {
      name: "HONDA CR-V",
      price: 82,
      image: car3,
      info: info,
      brand: "Honda",
      bodyType: "suv"
    },
    {
      name: "BMW X5",
      price: 120,
      image: car4,
      info: info,
      brand: "BMW",
      bodyType: "suv"
    },
    {
      name: "MERCEDES C-CLASS",
      price: 110,
      image: car1,
      info: info,
      brand: "Mercedes-Benz",
      bodyType: "sedan"
    },
    {
      name: "AUDI Q5",
      price: 115,
      image: car2,
      info: info,
      brand: "Audi",
      bodyType: "suv"
    },
    {
      name: "LEXUS RX",
      price: 105,
      image: car3,
      info: info,
      brand: "Lexus",
      bodyType: "suv"
    },
    {
      name: "TESLA MODEL 3",
      price: 130,
      image: car1,
      info: info,
      brand: "Tesla",
      bodyType: "sedan"
    },
    {
      name: "FORD MUSTANG",
      price: 95,
      image: car2,
      info: info,
      brand: "Ford",
      bodyType: "coupe"
    },
    {
      name: "VOLKSWAGEN GOLF",
      price: 85,
      image: car3,
      info: info,
      brand: "Volkswagen",
      bodyType: "compact"
    },
    {
      name: "KIA SPORTAGE",
      price: 88,
      image: car4,
      info: info,
      brand: "KIA",
      bodyType: "suv"
    },
    {
      name: "CHEVROLET CAMARO",
      price: 100,
      image: car1,
      info: info,
      brand: "Chevrolet",
      bodyType: "coupe"
    }
  ], []);

  useEffect(() => {
    const searchParams = location.state?.searchParams;
    let filtered = [...vehicles];

    if (searchParams?.brand) {
      filtered = filtered.filter(vehicle => 
        vehicle.brand.toLowerCase() === searchParams.brand.toLowerCase()
      );
    }

    if (searchParams?.bodyType) {
      filtered = filtered.filter(vehicle => 
        vehicle.bodyType.toLowerCase() === searchParams.bodyType.toLowerCase()
      );
    }

    setFilteredVehicles(filtered);
    setCurrentPage(1);
  }, [location.state, vehicles]);

  const toggleLike = (vehicleName) => {
    setLikedVehicles(prev => 
      prev.includes(vehicleName)
        ? prev.filter(name => name !== vehicleName)
        : [...prev, vehicleName]
    );
  };

  const handleViewDetails = (vehicle) => {
    navigate('/vehicleDetails', { state: { vehicle } });
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentVehicles = filteredVehicles.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="w-full py-12 px-40 ">
      <div className="container mx-auto">
        <p className="bebas-neue text-[40px] font-[400] mb-10">
          we found <span className="text-[#0955AC]">{filteredVehicles.length} cars </span>for you
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-15 justify-items-center">
          {currentVehicles.map((vehicle, index) => (
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
                <img src={vehicle.image} alt={vehicle.name} className="" />
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
                  <span className="text-[#00000080] text-[10px] font-[600]">
                    {" "}
                    /day
                  </span>
                </p>
                <div className="flex items-center gap-2 mt-4">
                  <button 
                    onClick={() => handleViewDetails(vehicle)}
                    className="bebas-neue bg-[#0955AC] hover:bg-white hover:text-black text-white text-[9px] font-[400] py-2 px-4 rounded-[4px] w-[194px] h-[30px] cursor-pointer">
                    View Details
                  </button>
                  <div className="border-[1.5px] border-[#0955AC] rounded p-1 w-[30px] h-[30px] flex items-center justify-center">
                    <img
                      src={likedVehicles.includes(vehicle.name) ? heartFill : heart}
                      alt="like"
                      className="h-[13px] w-[16px] cursor-pointer"
                      onClick={() => toggleLike(vehicle.name)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-end mt-8 gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`w-[40px] h-[40px] flex items-center justify-center border border-gray-300 rounded-[4px] ${
              currentPage === 1
                ? 'opacity-50 cursor-not-allowed'
                : '!bg-[#F4F3F3] text-[#000000]'
            }`}
          >
            &lt;
          </button>
          
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`w-[40px] h-[40px] flex items-center justify-center border rounded-[4px] text-[16px] ${
                currentPage === index + 1
                  ? '!bg-[#F4F3F3] text-[#000000] border-[#0955AC]'
                  : '!bg-[#F4F3F3] text-[#000000] border-gray-300'
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`w-[40px] h-[40px] flex items-center justify-center border border-gray-300 rounded-[4px] ${
              currentPage === totalPages
                ? 'opacity-50 cursor-not-allowed'
                : '!bg-[#F4F3F3] text-[#000000]'
            }`}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleListContent;
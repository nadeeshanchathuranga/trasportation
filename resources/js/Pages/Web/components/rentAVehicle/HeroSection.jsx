import React, { useState } from "react";
import carImage from "../../assets/rentAVehicle/car.png";
import calendarBlue from "../../assets/vehicleList/calendarBlue.png"
import locationBlue from "../../assets/vehicleList/locationBlue.png"



const HeroSection = ({ formData, onFormChange, onSubmit }) => {
  const [expandedImage, setExpandedImage] = useState("other");

  const handleImageClick = (imageType) => {
    setExpandedImage(imageType);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    onFormChange({
      ...formData,
      [id]: value
    });
  };

  const handleCalendarClick = (inputId) => {
    document.getElementById(inputId).showPicker();
  };

  return (
    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between min-h-screen px-4 md:px-16 gap-8 overflow-hidden">
      <div className="text-black text-left p-8 md:p-0 w-full md:max-w-4xl md:w-1/3 flex-shrink-0 mt-8">
        <div className="w-[50px] h-[5px] bg-[#000000] mb-6 rounded-sm"></div>
        <h1 className="bebas-neue text-[32px] sm:text-[38px] md:text-[45px]/[58px] font-[400] mb-4">
          FROM <span className="text-[#0955AC]">ROADS </span>TO{" "}
          <span className="text-[#0955AC]">SKIES</span> TO{" "}
          <span className="text-[#0955AC]">SEAS</span> - <br className="hidden sm:block" />
          RENT WITH EASE.
        </h1>
        <p className="poppins text-[10px]/[20px] md:text-[15px] font-[400] text-[#00000099] text-justify mb-10 md:mb-20">
          We bring together the world's most diverse vehicle rentals <br className="hidden sm:block" /> on
          one platform from daily car hires and charter flights <br className="hidden sm:block" /> to
          private boat journeys.
        </p>

        {/* Search Form */}
        <form onSubmit={onSubmit} className="figtree bg-white p-4 sm:p-6 rounded-[15px] shadow-2xl shadow-[#00000040] w-full 2xl:w-[505px] h-auto text-[#286BB6] text-[13px] font-[400]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Pick-up Location */}
            <div>
              <label htmlFor="pickupLocation" className="block mb-1">
                Pick-up Location
              </label>
              <div className="relative flex items-center">
                <img src={locationBlue} className="absolute inset-y-5 left-0 flex items-center pl-3 pointer-events-none" alt="location" />
                <input
                  type="text"
                  id="pickupLocation"
                  value={formData.pickupLocation}
                  onChange={handleInputChange}
                  placeholder="Search a location"
                  className="shadow-sm appearance-none w-full border-[1px] border-[#0000001A] rounded-[8px] p-[16px] leading-tight focus:outline-none focus:shadow-outline pl-12 placeholder:text-[#286BB6]"
                />
              </div>
            </div>
            {/* Pick-up Date */}
            <div>
              <label htmlFor="pickupDate" className="block mb-1">
                Pick-up Date
              </label>
              <div className="relative flex items-center">
                <input
                  type="date"
                  id="pickupDate"
                  value={formData.pickupDate}
                  onChange={handleInputChange}
                  className="shadow-sm w-full border-[#0000001A] rounded-[8px] p-[16px] leading-tight focus:outline-none focus:shadow-outline pr-12 [&::-webkit-calendar-picker-indicator]:hidden"
                />
                <img 
                  src={calendarBlue} 
                  className="absolute inset-y-5 right-0 flex items-center pr-3 cursor-pointer" 
                  alt="calendar" 
                  onClick={() => handleCalendarClick('pickupDate')}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Drop-off Location */}
            <div>
              <label htmlFor="dropoffLocation" className="block mb-1">
                Drop-off Location
              </label>
              <div className="relative flex items-center">
                <img src={locationBlue} className="absolute inset-y-5 left-0 flex items-center pl-3 pointer-events-none" alt="location" />
                <input
                  type="text"
                  id="dropoffLocation"
                  value={formData.dropoffLocation}
                  onChange={handleInputChange}
                  placeholder="Search a location"
                  className="shadow-sm w-full border-[#0000001A] rounded-[8px] p-[16px] leading-tight focus:outline-none focus:shadow-outline pl-12 placeholder:text-[#286BB6]"
                />
              </div>
            </div>
            {/* Drop-off Date */}
            <div>
              <label htmlFor="dropoffDate" className="block mb-1">
                Drop-off Date
              </label>
              <div className="relative flex items-center">
                <input
                  type="date"
                  id="dropoffDate"
                  value={formData.dropoffDate}
                  onChange={handleInputChange}
                  className="shadow-sm border-[#0000001A] rounded-[8px] p-[16px] w-full leading-tight focus:outline-none focus:shadow-outline pr-12 [&::-webkit-calendar-picker-indicator]:hidden"
                />
                <img 
                  src={calendarBlue} 
                  className="absolute inset-y-5 right-0 flex items-center pr-3 cursor-pointer" 
                  alt="calendar" 
                  onClick={() => handleCalendarClick('dropoffDate')}
                />
              </div>
            </div>
          </div>

          {/* Find a Vehicle Button */}
          <button 
            type="submit"
            className="bg-[#0955AC] text-white font-bold h-[56px] w-full rounded-[8px] focus:outline-none focus:shadow-outline cursor-pointer"
          >
            Find a Vehicle
          </button>
        </form>
      </div>

      {/* Images Section */}
      <div className="bebas-neue hidden md:flex flex-row items-stretch h-[500px] lg:h-[680px] gap-4 w-full md:w-2/3 flex-shrink-0 mt-8 md:mt-20 md:ml-8 lg:ml-40">
        <div
          className={`relative h-full overflow-hidden rounded-[25px] shadow-lg transition-all duration-300 ease-in-out cursor-pointer flex-shrink-0 ${
            expandedImage === "other"
              ? "flex-grow"
              : expandedImage
              ? "w-[180px] lg:w-[220px]"
              : "w-[400px] lg:w-[559px]"
          }`}
          onClick={() => handleImageClick("other")}
        >
          <img
            src={carImage}
            alt="Land Vehicle"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#00000066]"></div>
          <div className={`absolute inset-0 flex items-center justify-center`}>
            <span
              className={`text-white text-[24px] lg:text-[32px] font-[400] rotate-[270deg] ${
                expandedImage === "other" ? "hidden" : ""
              }`}
            >
              LAND VEHICLE
            </span>
          </div>
        </div>
        <div
          className={`relative h-full overflow-hidden rounded-[25px] shadow-lg transition-all duration-300 ease-in-out cursor-pointer flex-shrink-0 ${
            expandedImage === "water"
              ? "flex-grow"
              : expandedImage
              ? "w-[180px] lg:w-[220px]"
              : "w-[400px] lg:w-[559px]"
          }`}
          onClick={() => handleImageClick("water")}
        >
          <img
            src={carImage}
            alt="Water Vehicle"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#00000066]"></div>
          <div className={`absolute inset-0 flex items-center justify-center`}>
            <span
              className={`text-white text-[24px] lg:text-[32px] font-[400] rotate-[270deg] whitespace-nowrap ${
                expandedImage === "water" ? "hidden" : ""
              }`}
            >
              WATER VEHICLE
            </span>
          </div>
        </div>
        <div
          className={`relative h-full overflow-hidden rounded-[25px] shadow-lg transition-all duration-300 ease-in-out cursor-pointer flex-shrink-0 ${
            expandedImage === "air"
              ? "flex-grow"
              : expandedImage
              ? "w-[180px] lg:w-[220px]"
              : "w-[400px] lg:w-[559px]"
          }`}
          onClick={() => handleImageClick("air")}
        >
          <img
            src={carImage}
            alt="Air Vehicle"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#00000066]"></div>
          <div className={`absolute inset-0 flex items-center justify-center`}>
            <span
              className={`text-white text-[24px] lg:text-[32px] font-[400] rotate-[270deg] mr-[20px] lg:mr-[30px] ${
                expandedImage === "air" ? "hidden" : ""
              }`}
            >
              AIR VEHICLE
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

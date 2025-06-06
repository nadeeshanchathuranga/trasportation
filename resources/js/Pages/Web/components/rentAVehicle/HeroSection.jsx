import React, { useState } from "react";
import carImage from "../../assets/rentAVehicle/car.png";

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

  return (
    <div className="relative z-10 flex items-center justify-between h-full px-4 md:px-16 gap-8 overflow-hidden">
      <div className="text-black text-left p-8 md:p-0 max-w-4xl w-1/3 flex-shrink-0 mt-8">
        <div className="w-[50px] h-[5px] bg-[#000000] mb-6 rounded-sm"></div>
        <h1 className="bebas-neue text-[38px] md:text-[45px]/[58px] font-[400] mb-4">
          FROM <span className="text-[#0955AC]">ROADS </span>TO{" "}
          <span className="text-[#0955AC]">SKIES</span> TO{" "}
          <span className="text-[#0955AC]">SEAS</span> - <br />
          RENT WITH EASE.
        </h1>
        <p className="poppins text-[10px]/[20px] md:text-[15px] font-[400] text-[#00000099] text-justify mb-20">
          We bring together the world's most diverse vehicle rentals <br /> on
          one platform from daily car hires and charter flights <br /> to
          private boat journeys.
        </p>

        {/* Search Form */}
        <form onSubmit={onSubmit} className="figtree bg-white p-6 rounded-[15px] shadow-[0_0_10px_#00000040] h-[292px] text-[#286BB6] text-[16px] font-[400]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Pick-up Location */}
            <div>
              <label htmlFor="pickupLocation" className="block mb-1">
                Pick-up Location
              </label>
              <input
                type="text"
                id="pickupLocation"
                value={formData.pickupLocation}
                onChange={handleInputChange}
                placeholder="Search a location"
                className="appearance-none w-full border-[1px] border-[#0000001A] rounded-[8px] p-[16px] leading-tight focus:outline-none focus:shadow-outline placeholder:text-[#286BB6]"
                
              />
            </div>
            {/* Pick-up Date */}
            <div className="">
              <label htmlFor="pickupDate" className="block mb-1">
                Pick-up Date
              </label>
              <input
                type="text"
                id="pickupDate"
                value={formData.pickupDate}
                onChange={handleInputChange}
                placeholder="12/12/2023"
                className="w-full border-[1px] border-[#0000001A] rounded-[8px] p-[16px] leading-tight focus:outline-none focus:shadow-outline placeholder:text-[#286BB6]"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Drop-off Location */}
            <div className="">
              <label htmlFor="dropoffLocation" className="block mb-1">
                Drop-off Location
              </label>
              <input
                type="text"
                id="dropoffLocation"
                value={formData.dropoffLocation}
                onChange={handleInputChange}
                placeholder="Search a location"
                className="w-full border-[1px] border-[#0000001A] rounded-[8px] p-[16px] leading-tight focus:outline-none focus:shadow-outline placeholder:text-[#286BB6]"
                
              />
            </div>
            {/* Drop-off Date */}
            <div>
              <label htmlFor="dropoffDate" className="block mb-1">
                Drop-off Date
              </label>
              <input
                type="text"
                id="dropoffDate"
                value={formData.dropoffDate}
                onChange={handleInputChange}
                placeholder="12/12/2023"
                className="border-[1px] border-[#0000001A] rounded-[8px] p-[16px] w-full leading-tight focus:outline-none focus:shadow-outline placeholder:text-[#286BB6]"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                
              />
            </div>
          </div>

          {/* Find a Vehicle Button */}
          <button 
            type="submit"
            className="bg-[#0955AC] text-white font-bold h-[56px] w-full max-w-[459px] rounded-[8px] focus:outline-none focus:shadow-outline cursor-pointer hover:bg-[#07448a] transition-colors"
          >
            Find a Vehicle
          </button>
        </form>
      </div>

      {/* Images Section */}
      <div className="bebas-neue hidden md:flex flex-row items-stretch h-[680px] gap-4 w-2/3 flex-shrink-0 mt-20 ml-40">
        <div
          className={`relative h-full overflow-hidden rounded-[25px] shadow-lg transition-all duration-300 ease-in-out cursor-pointer flex-shrink-0 ${
            expandedImage === "other"
              ? "flex-grow"
              : expandedImage
              ? "w-[220px]"
              : "w-[559px]"
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
              className={`text-white text-[32px] font-[400] rotate-[270deg] ${
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
              ? "w-[220px]"
              : "w-[559px]"
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
              className={`text-white text-[32px] font-[400] rotate-[270deg] whitespace-nowrap ${
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
              ? "w-[220px]"
              : "w-[559px]"
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
              className={`text-white text-[32px] font-[400] rotate-[270deg] mr-[30px] ${
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

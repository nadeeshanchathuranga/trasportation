import React from "react";
import happy from "../../assets/rentAVehicle/HowItWorks/happy.png";
import calendar from "../../assets/rentAVehicle/HowItWorks/calendar.png";
import search from "../../assets/rentAVehicle/HowItWorks/search.png";

import jeep from "../../assets/rentAVehicle/HowItWorks/jeep.png";

const HowItWorks = () => {
  return (
    <div className="w-full py-12">
      <div className="container mx-auto px-4">
        <h2 className="bebas-neue text-[40px] font-[400] text-center mb-8">
          HOW IT <span className="text-[#0955AC]">WORKS</span>
        </h2>
        <p className="figtree text-center text-[15px] font-[400] text-[#0F0F0F80] mb-20">
          Renting a luxury car has never been easier. Our streamlined process
          makes it simple for you to book and confirm <br /> your vehicle of
          choice online
        </p>
        <div className="flex flex-col md:flex-row items-center gap-8 relative">
          {/* Steps */}
          <div className="md:w-1/2 w-full space-y-6 relative z-10 md:-mr-32">
            {/* Step 1 */}
            <div className="flex items-center gap-4 bg-[#FFFFFF] p-6 rounded-[24px] shadow">
              <div className="bg-[#F5F5F5] p-5 w-[57px] h-[106px] rounded-[16px] flex justify-center items-center">
                <img
                  src={search}
                  alt="Search Icon"
                  className="flex-shrink-0 h-[24px] w-[24px] object-contain"
                />
              </div>
              <div>
                <h3 className="figtree text-[24px] font-[700] mb-3">
                  Browse and select
                </h3>
                <p className="figtree text-[#000000] text-[18px] font-[400]">
                  Choose from our wide range of premium cars, select the pickup
                  and return dates and locations that suit you best.
                </p>
              </div>
            </div>
            {/* Step 2 */}
            <div className="flex items-center gap-4 bg-[#FFFFFF] p-6 rounded-[24px] shadow">
              <div className="bg-[#F5F5F5] p-5 w-[57px] h-[106px] rounded-[16px] flex justify-center items-center">
                <img
                  src={calendar}
                  alt="Calendar Icon"
                  className="flex-shrink-0 h-[24px] w-[24px] object-contain"
                />
              </div>
              <div>
                <h3 className="figtree text-[24px] font-[700] mb-3">
                  Book and confirm
                </h3>
                <p className="figtree text-[#000000] text-[18px] font-[400]">
                  Book your desired car with just a few clicks and receive an
                  instant confirmation via email or SMS.
                </p>
              </div>
            </div>
            {/* Step 3 */}
            <div className="flex items-center gap-4 bg-[#FFFFFF] p-6 rounded-[24px] shadow">
              <div className="bg-[#F5F5F5] w-[57px] h-[106px] p-5 rounded-[16px] flex justify-center items-center">
                <img
                  src={happy}
                  alt="Location Icon"
                  className="flex-shrink-0 h-[24px] w-[24px] object-contain"
                />
              </div>
              <div>
                <h3 className="figtree text-[24px] font-[700] mb-3">
                  Enjoy your ride
                </h3>
                <p className="figtree text-[#000000] text-[18px] font-[400]">
                  Pick up your car at the designated location and enjoy your
                  premium driving experience with our top-quality service.
                </p>
              </div>
            </div>
          </div>
          {/* Image Placeholder */}
          <div
            className="md:w-2/3 w-[782px] h-[638px] rounded-[24px] shadow flex items-center justify-center bg-no-repeat bg-[#F5F5F5]"
            style={{
              backgroundImage: `url(${jeep})`,
              height: "600px",
              width: "700px",
              backgroundPosition: "right",
            }}
          >
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;

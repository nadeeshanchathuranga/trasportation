import React from "react";
import proPic from "../../assets/landVehicleDetails/proPic.svg";
import star from "../../assets/landVehicleDetails/star.svg";
import tag from "../../assets/landVehicleDetails/tag.svg";
import clock from "../../assets/landVehicleDetails/clock.svg"

const VehicleSearch = () => {
    return (
        <div className="poppins w-auto xl:w-[440px] xl:h-[1134px] bg-[#F4F3F3] rounded-[19px] flex flex-col gap-10 py-10 px-20">
            <div className="text-[25px] font-[700]">
                <h1>
                    $620{" "}
                    <span className="text-[10px] text-[#00000080]">/day</span>
                </h1>
                <h1 className="text-[10px] font-[600] text-[#00000080] py-4">
                    Total before taxes
                </h1>
                <div className=" w-auto md:w-[346px] h-[1px] bg-[#0000001F]" />
            </div>
            <form className="text-[10px] text-[#00000080] font-[600]">
                <div>
                    {/* Pick-up Location */}
                    <div>
                        <label htmlFor="pickupLocation" className="block mb-3">
                            Pick-up Location
                        </label>
                        <input
                            type="text"
                            id="pickupLocation"
                            // value={formData.pickupLocation}
                            // onChange={handleInputChange}
                            placeholder="Hudson Rd, Colombo 03"
                            className="appearance-none w-full h-[35px] border-[1px] border-[#00000042] bg-[#F4F3F3] rounded-[5px] mb-3 py-3 leading-tight focus:outline-none focus:shadow-outline placeholder:text-[#000000D9] placeholder:text-[12px] placeholder:font-[600]"
                        />
                    </div>
                    {/* Pick-up Date */}
                    <div className="flex flex-row gap-5">
                        <div>
                            <label htmlFor="pickupDate" className="block mb-3">
                                Pick-up Date
                            </label>
                            <input
                                type="text"
                                id="pickupDate"
                                // value={formData.pickupDate}
                                // onChange={handleInputChange}
                                placeholder="23 / 07 / 2025"
                                className="w-full border-[1px] border-[#00000042] bg-[#F4F3F3] rounded-[5px] mb-3 py-3 leading-tight focus:outline-none focus:shadow-outline placeholder:text-[#000000D9]"
                                onFocus={(e) => (e.target.type = "date")}
                                onBlur={(e) => (e.target.type = "text")}
                            />
                        </div>
                        <div className="relative">
                            <label htmlFor="pickupTime" className="block mb-3">
                                Pick-up Time
                            </label>
                            <input
                                type="text"
                                id="pickupDate"
                                // value={formData.pickupDate}
                                // onChange={handleInputChange}
                                placeholder="10 : 00 AM"
                                className="w-full relative border-[1px] border-[#00000042] bg-transparent rounded-[5px] mb-3 py-3 leading-tight focus:outline-none focus:shadow-outline placeholder:text-[#000000D9]"
                                onFocus={(e) => (e.target.type = "text")}
                                onBlur={(e) => (e.target.type = "text")}
                            />
                            <img src={clock} className="hidden sm:block absolute top-11 left-40 z-10" />
                        </div>
                    </div>
                </div>

                <div>
                    {/* Drop-off Location */}
                    <div>
                        <label htmlFor="dropoffLocation" className="block mb-3">
                            Drop-off Location
                        </label>
                        <input
                            type="text"
                            id="dropoffLocation"
                            // value={formData.dropoffLocation}
                            // onChange={handleInputChange}
                            placeholder="Hudson Rd, Colombo 03"
                            className="w-full border-[1px] border-[#00000042] bg-[#F4F3F3] rounded-[5px] mb-3 py-3 leading-tight focus:outline-none focus:shadow-outline placeholder:text-[#000000D9]"
                        />
                    </div>
                    {/* Drop-off Date */}
                    <div className="flex flex-row gap-5">
                        <div>
                            <label htmlFor="dropoffDate" className="block mb-3">
                                Drop-off Date
                            </label>
                            <input
                                type="text"
                                id="dropoffDate"
                                // value={formData.dropoffDate}
                                // onChange={handleInputChange}
                                placeholder="23 / 07 / 2025"
                                className="border-[1px] border-[#00000042] bg-[#F4F3F3] rounded-[5px] mb-3 py-3  w-full leading-tight focus:outline-none focus:shadow-outline placeholder:text-[#000000D9]"
                                onFocus={(e) => (e.target.type = "date")}
                                onBlur={(e) => (e.target.type = "text")}
                            />
                            
                        </div>
                        <div className="relative">
                            <label htmlFor="pickupTime" className="block mb-3">
                                Drop-off Time
                            </label>
                            <input
                                type="text"
                                id="pickupTime"
                                // value={formData.pickupDate}
                                // onChange={handleInputChange}
                                placeholder="10 : 00 AM"
                                className="w-full border-[1px] border-[#00000042] bg-[#F4F3F3] rounded-[5px] mb-3 py-3 leading-tight focus:outline-none focus:shadow-outline placeholder:text-[#000000D9]"
                                onFocus={(e) => (e.target.type = "text")}
                                onBlur={(e) => (e.target.type = "text")}
                            />
                            <img src={clock} className="hidden sm:block absolute top-11 left-40 z-10" />
                        </div>
                    </div>
                </div>
            </form>

            <div className="poppins text-[12px] w-full h-auto md:h-[423px] bg-[#0955AC0D] rounded-[5px] flex flex-col py-10 px-10">
                <h1 className="font-[600] mb-5 text-[#000000D9]">
                    Pricing Breakdown
                </h1>
                <div className="w-full h-[1px] bg-[#CDD0D4]" />
                <div className="flex flex-col md:flex-row justify-between w-full px-5 py-5 font-[500]">
                    <div>
                        <h1 className="text-[#000000CC]">Rental Price</h1>
                        <div className="flex flex-row gap-3 text-[#00000061]">
                            <h1>$620/day</h1>
                            <h1 className="text-[#0955AC]">(x7 days)</h1>
                        </div>
                    </div>
                    <div className="text-[#000000CC]">$3450</div>
                </div>
                <div className="flex flex-col md:flex-row justify-between w-full px-5 font-[500]">
                    <div>
                        <h1 className="text-[#000000CC]">3+ day discount</h1>
                        <div className="flex flex-row gap-3 text-[#00000061]">
                            <h1>Extended trip scount</h1>
                            <h1 className="text-[#0955AC]">(50%)</h1>
                        </div>
                    </div>
                    <div className="text-[#000000CC]">-$345</div>
                </div>
                <div className="flex flex-col md:flex-row justify-between w-full px-5 py-5 font-[500]">
                    <div>
                        <h1 className="text-[#000000CC]">Refundable deposit</h1>
                        <div className="flex flex-row gap-3 text-[#00000061]">
                            <h1>Refunded by</h1>
                            <h1 className="text-[#0955AC]">Oct 14th</h1>
                        </div>
                    </div>
                    <div className="text-[#000000CC]">-$500</div>
                </div>
                <div className="w-full h-[1px] bg-[#CDD0D4]" />

















                <div className="flex flex-col md:flex-row justify-between w-full px-5 py-5 font-[500]">
                    <div>
                        <h1 className="text-[#000000CC]">Total Price Due</h1>
                        <div className="flex flex-row gap-3 text-[#00000061]">
                            <h1>$500 Refunded by</h1>
                            <h1 className="text-[#0955AC]">Oct 14th</h1>
                        </div>
                    </div>
                    <div className="text-[#000000CC]">$4567</div>
                </div>

                <div className="relative flex flex-col md:flex-row items-start justify-start px-5">
                    <span className="absolute top-[5px] left-[20px] w-[2px] h-[2px] bg-[#FF0000] rounded-full" />
                    <p className="text-[8.5px] text-[#00000061] ml-4">
                        {" "}
                        Your total rent amount will be calculated <br />{" "}
                        depending on the pick-up and drop-off dates
                    </p>
                </div>

                <div className="flex justify-center items-center">
                    <div className=" w-auto md:w-[261px] h-[29px] bg-[#0955AC] rounded-[5px] mt-10 flex items-center justify-center text-[12px] font-[700] text-[#FFFFFF] cursor-pointer">
                        CONTINUE TO CHECKOUT
                    </div>
                </div>
            </div>
            <div className="poppins w-full md:h-[160px] bg-[#0955AC0D] rounded-[5px] py-7 px-12">
                <div className="flex flex-col md:flex-row justify-start gap-5">
                    <img src={proPic} />
                    <div className="flex flex-col items-start justify-center">
                        <div className="flex flex-row gap-2 justify-center items-center">
                            {" "}
                            <h1 className="text-[15px] font-[700]">
                                Steve Gibson
                            </h1>
                            <img src={tag} />
                        </div>
                        <div className="flex flex-row gap-3 justify-center items-center">
                            {" "}
                            <img src={star} />
                            <h1 className="text-[12px] font-[500] text-[#00000080]">
                                80 Reviews
                            </h1>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center items-center mt-10">
                    <div className="text-[9px] flex flex-col md:flex-row gap-4">
                        <div className="w-[123px] h-[29px] bg-[#0955AC] text-[#FFFFFF] font-[700] rounded-[5px] flex justify-center items-center cursor-pointer">
                            CONTACT NUMBER
                        </div>
                        <div className="w-[123px] h-[29px] border-[1.5px] border-[#0955AC] text-[#0955AC] font-[700] rounded-[5px] flex justify-center items-center cursor-pointer">
                            VIEW PROFILE
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VehicleSearch;

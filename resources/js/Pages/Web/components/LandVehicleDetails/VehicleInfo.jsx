import React from "react";
import wishlist from "../../assets/landVehicleDetails/whishlist.svg";
import share from "../../assets/landVehicleDetails/share.svg";
import star from "../../assets/driverBooking/star.svg";

import miles from "../../assets/landVehicleDetails/carSpec/miles.svg";
import fuel from "../../assets/landVehicleDetails/carSpec/fuel.svg";
import gear from "../../assets/landVehicleDetails/carSpec/gear.svg";
import seats from "../../assets/landVehicleDetails/carSpec/seats.svg";
import model from "../../assets/landVehicleDetails/carSpec/model.svg";
import doors from "../../assets/landVehicleDetails/carSpec/doors.svg";
import airBag from "../../assets/landVehicleDetails/carSpec/airBag.svg";
import liters from "../../assets/landVehicleDetails/carSpec/liters.svg";

import meter from "../../assets/landVehicleDetails/carSpec/meter.svg";
import badge from "../../assets/landVehicleDetails/carSpec/badge.svg";
import fuelTwo from "../../assets/landVehicleDetails/carSpec/fuelTwo.svg";

const VehicleInfo = () => {
    return (
        <div className="poppins w-full h-auto">
            <h1 className="text-[12px] font-[600] text-[#00000080]">
                Lamborghini
            </h1>
            <div className="flex flex-col md:flex-row justify-between">
                <div className="flex flex-col md:flex-row gap-5">
                    <h1 className="bebas-neue text-[30px]">
                        Lamborghini <span className="text-[#0955AC]">urus</span>{" "}
                        (2020)
                    </h1>

                    <div className="flex flex-row items-center gap-2">
                        <div className="w-[10px] h-[10px] rounded-full bg-[#3C9A34]" />
                        <h1 className="text-[#3C9A34] text-[10px]">
                            Available
                        </h1>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-5">
                    <div className=" w-[81px] h-[25px] rounded-[4px] border-[1px] border-[#00000030] bg-[#EAE9E8] flex flex-row justify-center items-center gap-3">
                        <img src={share} />
                        <h1>Share</h1>
                    </div>
                    <div className=" w-[81px] h-[25px] rounded-[4px] border-[1px] border-[#00000030] bg-[#0000003B] flex flex-row justify-center items-center gap-3">
                        <img src={wishlist} />
                        <h1>Wishlist</h1>
                    </div>
                </div>
            </div>

            <div className="flex flex-row gap-5 text-[12px] font-[600]">
                <img src={star} />
                <h1>4.8</h1>
                <h1 className="underline">44 Reviews</h1>
            </div>

            <div className="py-10">
                <div className="flex flex-col md:flex-row md:gap-20 px-20 text-[12px] font-[600] text-[#00000080] border-b-[2px] border-[#0000001F]">
                    <h1 className="border-b-[2px] pb-5 w-[92px] flex justify-center items-center border-[#0955AC] text-[#0955AC]">
                        Car Details
                    </h1>
                    <h1 className="border-b-[2px] pb-5 w-[92px] flex justify-center items-center">
                        Policies{" "}
                    </h1>
                    <h1 className="border-b-[2px] pb-5 w-[92px] flex justify-center items-center">
                        Reviews
                    </h1>
                    <h1 className="border-b-[2px] pb-5 w-[92px] flex justify-center items-center">
                        Image Gallery
                    </h1>
                </div>
            </div>

            <div className="flex flex-col gap-5">
                <h1 className="text-[15px] font-[600]">Description</h1>
                <p className="text-[14px]/[33px] font-[400] text-justify px-5">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec semper eu risus ut ornare. In bibendum tempus sapien,
                    tristique consectetur purus pellentesque ac. Quisque
                    facilisis laoreet feugiat. Sed dapibus volutpat ex, eget
                    iaculis nunc tincidunt sit amet. Quisque congue sapien nec
                    aliquet faucibus. Morbi lectus eros, accumsan eget malesuada
                    et, fermentum eget nisl. Fusce vel placerat libero. Integer
                    convallis sodales libero, vitae tristique massa hendrerit
                    in.
                </p>
            </div>

            <div className="py-10">
                <h1 className="text-[15px] font-[600]">Car Specifications</h1>
                <div className="py-10 text-[12px] font-[700]">
                    <div className="flex flex-col justify-center items-center gap-10">
                        <div className="flex flex-col xl:flex-row gap-10 justify-center items-center">
                            <div className="w-[187px] h-[81px] border-[1px] border-[#0000002B] bg-[#E7E6E6] rounded-[10px] flex flex-row justify-center items-center gap-5 px-5 py-5">
                                <img src={miles} />
                                <h1>62,500</h1>
                            </div>
                            <div className="w-[187px] h-[81px] border-[1px] border-[#0000002B] bg-[#E7E6E6] rounded-[10px] flex flex-row justify-center items-center gap-5 px-5 py-5">
                                <img src={fuel} />
                                <h1>Petrol</h1>
                            </div>
                            <div className="w-[187px] h-[81px] border-[1px] border-[#0000002B] bg-[#E7E6E6] rounded-[10px] flex flex-row justify-center items-center gap-5 px-5 py-5">
                                <img src={gear} />
                                <h1>Manual</h1>
                            </div>
                            <div className="w-[187px] h-[81px] border-[1px] border-[#0000002B] bg-[#E7E6E6] rounded-[10px] flex flex-row justify-center items-center gap-5 px-5 py-5">
                                <img src={seats} />
                                <h1>05 Seats</h1>
                            </div>
                        </div>
                        <div className="flex flex-col xl:flex-row justify-center items-center gap-10">
                            <div className="w-[187px] h-[81px] border-[1px] border-[#0000002B] bg-[#E7E6E6] rounded-[10px] flex flex-row justify-center items-center gap-5 px-5 py-5">
                                <img src={airBag} />
                                <h1>03 Air Bags</h1>
                            </div>
                            <div className="w-[187px] h-[81px] border-[1px] border-[#0000002B] bg-[#E7E6E6] rounded-[10px] flex flex-row justify-center items-center gap-5 px-5 py-5">
                                <img src={model} />
                                <h1>Lamborghini</h1>
                            </div>
                            <div className="w-[187px] h-[81px] border-[1px] border-[#0000002B] bg-[#E7E6E6] rounded-[10px] flex flex-row justify-center items-center gap-5 px-5 py-5">
                                <img src={doors} />
                                <h1>04 Doors</h1>
                            </div>
                            <div className="w-[187px] h-[81px] border-[1px] border-[#0000002B] bg-[#E7E6E6] rounded-[10px] flex flex-row justify-center items-center gap-5 px-5 py-5">
                                <img src={liters} />
                                <h1>3.5 L</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="">
                <h1 className="text-[15px] font-[600]">
                    Milage / Insurance Coverage{" "}
                </h1>
                <div className="flex flex-col xl:flex-row justify-center items-center gap-10 py-10">
                    <div className="w-[256px] h-[125px] bg-[#0000001C] border-[1px] border-[#0000001C] rounded-[10px] flex flex-col justify-center items-center gap-3 text-[12px] font-[700] p-3.5">
                        <img src={meter} />
                        <h1>300 mile</h1>
                        <h1 className="font-[400] text-[#0000008C]">
                            $3.50 /additional mile
                        </h1>
                    </div>
                    <div className="w-[256px] h-[125px] bg-[#0000001C] border-[1px] border-[#0000001C] rounded-[10px] flex flex-col justify-center items-center gap-3 text-[12px] font-[700] p-3.5">
                        <img src={badge} />
                        <h1>Full Coverage</h1>
                        <h1 className="font-[400] text-[#0000008C]">
                            Motor Plus in Sri Lanka
                        </h1>
                    </div>
                    <div className="w-[256px] h-[125px] bg-[#0000001C] border-[1px] border-[#0000001C] rounded-[10px] flex flex-col justify-center items-center gap-3 text-[12px] font-[700] p-3.5">
                        <img src={fuelTwo} />
                        <h1>Fuel Policy</h1>
                        <h1 className="font-[400] text-[#0000008C]">
                            Premium only (95 octane*)
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VehicleInfo;

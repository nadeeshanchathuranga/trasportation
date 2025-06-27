import React from "react";
import car from "../../assets/vehicleCheckout/car.svg";
import icon1 from "../../assets/vehicleCheckout/icon1.svg";
import icon2 from "../../assets/vehicleCheckout/icon2.svg";
import icon3 from "../../assets/vehicleCheckout/icon3.svg";
import icon4 from "../../assets/vehicleCheckout/icon4.svg";

const VehicleCheckoutContent = () => {
    return (
        <div>
            <div className="flex flex-row px-10 py-10 gap-10">
                <div>
                  <div></div>
                    <div
                        className="w-[874px] h-[428px] bg-[#FFFFFF]"
                        style={{
                            boxShadow: "4px 4px 4px #0000001A",
                        }}
                    ></div>
                </div>

                <div className="flex flex-col gap-10">
                    {/* right side mini card 1 */}
                    <div
                        className="w-[459px] h-auto bg-[#F4F3F3] rounded-[10px] px-5"
                        style={{
                            boxShadow: "4px 4px 4px #0000001A",
                        }}
                    >
                        {/* upper section */}
                        <div className="flex flex-row gap-3 items-center border-b-[1px] pb-5 border-[#00000026]">
                            <img src={car} />
                            <div className="flex flex-col gap-3">
                                <h1 className="figtree text-[20px] font-[700] ">
                                    Lamborghini urus (2020)
                                </h1>
                                <div className="poppins flex flex-row gap-5 text-[9px] text-[#000000B2] font-[500]">
                                    <div className="flex flex-col gap-2 justify-center items-center">
                                        <img
                                            src={icon1}
                                            className="size-[17px]"
                                        />
                                        <h1>4,000</h1>
                                    </div>
                                    <div className="flex flex-col gap-2 justify-center items-center">
                                        <img
                                            src={icon2}
                                            className="size-[17px]"
                                        />
                                        <h1>Auto</h1>
                                    </div>
                                    <div className="flex flex-col gap-2 justify-center items-center">
                                        <img
                                            src={icon3}
                                            className="size-[17px]"
                                        />
                                        <h1>4 Person</h1>
                                    </div>
                                    <div className="flex flex-col gap-2 justify-center items-center">
                                        <img
                                            src={icon4}
                                            className="size-[17px]"
                                        />
                                        <h1>Electric</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* end */}
                        {/* bottom section */}
                        <div className="py-10 px-20">
                            <div className="flex flex-row gap-5 justify-center items-start">
                                <div className="flex flex-col items-center mt-2">
                                    <div className="size-[17px] bg-[#0955AC] rounded-full"></div>
                                    <div className="h-[77px] w-[1.5px] bg-[#0955AC]"></div>
                                    <div className="size-[17px] bg-[#0955AC] rounded-full"></div>
                                </div>
                                <div className="figtree flex flex-col gap-10 text-[14px] font-[500] text-[#00000080]">
                                    <div>
                                        <h1 className="text-[16px] font-[700] text-[#000000]">
                                            Pick up: Hudson Rd, Colombo 03
                                        </h1>
                                        <h1>Pick-up Date : June 23rd, 2025</h1>
                                        <h1>Pick-up Time : 10 : 00 AM</h1>
                                    </div>
                                    <div>
                                        <h1 className="text-[16px] font-[700] text-[#000000]">
                                            Drop off: Hudson Rd, Colombo 03
                                        </h1>
                                        <h1>Drop-off Date : June 23rd, 2025</h1>
                                        <h1>Drop-off Time : 10 : 00 AM</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* end */}
                    </div>
                    {/* right side mini card 2 */}
                    <div
                        className="poppins w-[459px] h-[590px] bg-[#F4F3F3] rounded-[10px] px-10 py-10"
                        style={{
                            boxShadow: "4px 4px 4px #0000001A",
                        }}
                    >
                        <h1 className="font-[600] text-[20px]">
                            Payment Details
                        </h1>

                        <div className="px-10 py-5">
                            <div className="poppins text-[12px] w-full h-auto bg-[#0955AC0D] rounded-[5px] flex flex-col py-10 px-10">
                                <h1 className="font-[600] mb-5 text-[#000000D9]">
                                    Pricing Breakdown
                                </h1>
                                <div className="w-full h-[1px] bg-[#CDD0D4]" />
                                <div className="flex flex-col md:flex-row justify-between w-full px-5 py-5 font-[500]">
                                    <div>
                                        <h1 className="text-[#000000CC]">
                                            Rental Price
                                        </h1>
                                        <div className="flex flex-row gap-3 text-[#00000061]">
                                            <h1>$620/day</h1>
                                            <h1 className="text-[#0955AC]">
                                                (x7 days)
                                            </h1>
                                        </div>
                                    </div>
                                    <div className="text-[#000000CC]">
                                        $3450
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row justify-between w-full px-5 font-[500]">
                                    <div>
                                        <h1 className="text-[#000000CC]">
                                            3+ day discount
                                        </h1>
                                        <div className="flex flex-row gap-3 text-[#00000061]">
                                            <h1>Extended trip scount</h1>
                                            <h1 className="text-[#0955AC]">
                                                (50%)
                                            </h1>
                                        </div>
                                    </div>
                                    <div className="text-[#000000CC]">
                                        -$345
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row justify-between w-full px-5 py-5 font-[500]">
                                    <div>
                                        <h1 className="text-[#000000CC]">
                                            Refundable deposit
                                        </h1>
                                        <div className="flex flex-row gap-3 text-[#00000061]">
                                            <h1>Refunded by</h1>
                                            <h1 className="text-[#0955AC]">
                                                Oct 14th
                                            </h1>
                                        </div>
                                    </div>
                                    <div className="text-[#000000CC]">
                                        -$500
                                    </div>
                                </div>
                                <div className="w-full h-[1px] bg-[#CDD0D4]" />

                                <h1 className="font-[600] mt-5 text-[#000000D9]">
                                    Add Extras
                                </h1>

                                {/* checkbox section */}
                                <div className="flex flex-col justify-center text-[12px] font-[500] mt-5">
                                    <div className="flex flex-row justify-between w-full px-5">
                                        <div className="flex flex-row justify-center items-center gap-4">
                                            <h1>Child Seat</h1>
                                        </div>
                                        <h1>$155</h1>
                                    </div>
                                </div>

                                <div className="w-full h-[1px] bg-[#CDD0D4] mt-5" />

                                <div className="flex flex-col md:flex-row justify-between w-full px-5 py-5 font-[500]">
                                    <div>
                                        <h1 className="text-[#000000CC]">
                                            Advance Payment
                                        </h1>
                                        <div className="flex flex-row gap-3 text-[#00000061] mt-3">
                                            <h1>First payment </h1>
                                            <h1 className="text-[#0955AC]">
                                                (20%)
                                            </h1>
                                        </div>
                                    </div>
                                    <div className="text-[#000000CC] text-[12px] font-[500]">
                                        $1567
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row justify-between w-full px-5 pb-5 font-[500]">
                                    <div>
                                        <h1 className="text-[#000000CC]">
                                            Total Price Due
                                        </h1>
                                        <div className="flex flex-row gap-3 text-[#00000061] mt-3">
                                            <h1>$500 Refunded by</h1>
                                            <h1 className="text-[#0955AC]">
                                                July 27th
                                            </h1>
                                        </div>
                                    </div>
                                    <div className="text-[#000000CC] text-[16px] font-[700]">
                                        $4567
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VehicleCheckoutContent;

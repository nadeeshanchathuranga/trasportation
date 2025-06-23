import React from "react";
import search from "../../../assets/vendors/dashboard/searchIcon.svg";
import settings from "../../../assets/vendors/dashboard/settings.svg";
import proPic from "../../../assets/vendors/dashboard/proPic.svg";

import dollarIcon from "../../../assets/vendors/dashboard/icons/dollarIcon.svg";
import carIcon from "../../../assets/vendors/dashboard/icons/carIcon.svg";
import bookingIcon from "../../../assets/vendors/dashboard/icons/bookingIcon.svg";
import wheelIcon from "../../../assets/vendors/dashboard/icons/wheelIcon.svg";
import upArrow from "../../../assets/vendors/dashboard/icons/upArrow.svg";
import miniDownArrow from "../../../assets/vendors/dashboard/icons/miniDownArrow.svg";
import BookingOverviewBarChart from "./BookingOverviewBarChart";
import EarningSummaryChart from "./EarningSummaryChart";

const bookingData = [
    { name: "Jan", bookings: 450 },
    { name: "Feb", bookings: 670 },
    { name: "Mar", bookings: 540 },
    { name: "Apr", bookings: 900 },
    { name: "May", bookings: 800 },
    { name: "Jun", bookings: 200 },
    { name: "Jul", bookings: 340 },
    { name: "Aug", bookings: 859 },
    { name: "Sep", bookings: 670 },
    { name: "Oct", bookings: 570 },
    { name: "Nov", bookings: 400 },
    { name: "Dec", bookings: 900 },
];
const maxBookings = 1000;

const DashContent = () => {
    return (
        <div className="w-full h-auto pr-20 py-10">
            {/* Header section */}
            <div className="flex flex-row gap-5 justify-between items-center">
                <h1 className="figtree text-[35px] font-[700]">Dashboard</h1>
                <div className="flex flex-row gap-5">
                    <div className="size-[60px] rounded-[10px] bg-[#E8EBEF] flex justify-center items-center">
                        <img src={search} />
                    </div>
                    <div className="size-[60px] rounded-[10px] bg-[#E8EBEF] flex justify-center items-center">
                        <img src={settings} />
                    </div>
                    <div className="size-[60px] rounded-[10px] bg-[#E8EBEF] flex justify-center items-center">
                        <img src={settings} />
                    </div>
                    <div className="size-[60px] rounded-[10px] bg-[#E8EBEF] flex justify-center items-center">
                        <img src={proPic} />
                    </div>

                    <div className="figtree flex flex-col justify-center items-start">
                        <h1 className="text-[20px] font-[700]">Steve Gibson</h1>
                        <h1 className="text-[16px] font-[600] text-[#7B7B7A]">
                            Vendor
                        </h1>
                    </div>
                </div>
            </div>

            {/* end of header section */}

            <div className="flex flex-col gap-5 py-10">
                <div className="flex flex-row gap-5">
                    {/* mini left section */}
                    <div className="flex flex-col gap-5">
                        {/* mini 4 cards */}
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-row gap-5">
                                {/* card 1 */}
                                <div className="w-[360px] h-[91px] bg-[#FFFFFF] rounded-[8px] flex justify-between items-center gap-2 px-5 py-2">
                                    <div className="flex flex-row gap-5 justify-center items-center">
                                        <div className="size-[50px] bg-[#D8E4F2] rounded-full flex justify-center items-center">
                                            <img src={dollarIcon} />
                                        </div>
                                        <div>
                                            <h1 className="text-[16px] font-[500] text-[#7B7B7A]">
                                                Total Revenue
                                            </h1>
                                            <h1 className="text-[26px] font-[700]">
                                                $8,450
                                            </h1>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 items-end text-[14px] font-[500]">
                                        <div className="w-[81px] h-[26px] bg-[#D8E4F2] rounded-[5px] flex flex-row justify-center items-center">
                                            <img
                                                src={upArrow}
                                                className="size-[19px]"
                                            />
                                            <h1 className="">+2.86%</h1>
                                        </div>
                                        <h1 className="text-[#7B7B7A]">
                                            from last week
                                        </h1>
                                    </div>
                                </div>
                                {/* end of card 1 */}

                                {/* card 2 */}
                                <div className="w-[360px] h-[91px] bg-[#FFFFFF] rounded-[8px] flex justify-between items-center gap-2 px-5 py-2">
                                    <div className="flex flex-row gap-5 justify-center items-center">
                                        <div className="size-[50px] bg-[#D8E4F2] rounded-full flex justify-center items-center">
                                            <img src={bookingIcon} />
                                        </div>
                                        <div>
                                            <h1 className="text-[16px] font-[500] text-[#7B7B7A]">
                                                New Bookings
                                            </h1>
                                            <h1 className="text-[26px] font-[700]">
                                                350
                                            </h1>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 items-end text-[14px] font-[500]">
                                        <div className="w-[81px] h-[26px] bg-[#D8E4F2] rounded-[5px] flex flex-row justify-center items-center">
                                            <img
                                                src={upArrow}
                                                className="size-[19px]"
                                            />
                                            <h1 className="">+1.73%</h1>
                                        </div>
                                        <h1 className="text-[#7B7B7A]">
                                            from last week
                                        </h1>
                                    </div>
                                </div>
                                {/* end of card 2 */}
                            </div>
                            <div className="flex flex-row gap-5">
                                {/* card 3 */}
                                <div className="w-[360px] h-[91px] bg-[#FFFFFF] rounded-[8px] flex justify-between items-center gap-2 px-5 py-2">
                                    <div className="flex flex-row gap-5 justify-center items-center">
                                        <div className="size-[50px] bg-[#D8E4F2] rounded-full flex justify-center items-center">
                                            <img src={wheelIcon} />
                                        </div>
                                        <div>
                                            <h1 className="text-[16px] font-[500] text-[#7B7B7A]">
                                                Rented Cars
                                            </h1>
                                            <h1 className="text-[26px] font-[700]">
                                                24 Units
                                            </h1>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 items-end text-[14px] font-[500]">
                                        <div className="w-[81px] h-[26px] bg-[#FF888880] rounded-[5px] flex flex-row justify-center items-center">
                                            <img
                                                src={upArrow}
                                                className="size-[19px] rotate-180"
                                            />
                                            <h1 className="">+2.86%</h1>
                                        </div>
                                        <h1 className="text-[#7B7B7A]">
                                            from last week
                                        </h1>
                                    </div>
                                </div>
                                {/* end of card 3 */}
                                {/* card 4 */}
                                <div className="w-[360px] h-[91px] bg-[#FFFFFF] rounded-[8px] flex justify-between items-center gap-2 px-5 py-2">
                                    <div className="flex flex-row gap-5 justify-center items-center">
                                        <div className="size-[50px] bg-[#D8E4F2] rounded-full flex justify-center items-center">
                                            <img src={carIcon} />
                                        </div>
                                        <div>
                                            <h1 className="text-[16px] font-[500] text-[#7B7B7A]">
                                                Total Revenue
                                            </h1>
                                            <h1 className="text-[26px] font-[700]">
                                                89 Units
                                            </h1>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 items-end text-[14px] font-[500]">
                                        <div className="w-[81px] h-[26px] bg-[#D8E4F2] rounded-[5px] flex flex-row justify-center items-center">
                                            <img
                                                src={upArrow}
                                                className="size-[19px]"
                                            />
                                            <h1 className="">+2.86%</h1>
                                        </div>
                                        <h1 className="text-[#7B7B7A]">
                                            from last week
                                        </h1>
                                    </div>
                                </div>
                                {/* end of card 4 */}
                            </div>
                        </div>
                        {/* end of 4 mini cards */}
                        {/* 2nd card */}
                        <div className="w-[742px] h-auto bg-[#FFFFFF] flex flex-col justify-center items-center rounded-[10px] py-10 px-10">
                            {/* Booking Overview header and dropdown */}
                            <div className="flex flex-row items-center justify-between mb-16 w-full">
                                <h1 className="text-[24px] font-[700]">
                                    Booking Overview
                                </h1>
                                <div className="w-[113px] h-[33px] bg-[#D9D9D94F] rounded-[6px] flex flex-row justify-center items-center gap-3">
                                    <h1 className="text-[#00000080] font-[600] text-[14px]">
                                        This Year
                                    </h1>
                                    <img src={miniDownArrow} />
                                </div>
                            </div>
                            {/* Booking Overview Bar Chart */}
                            <BookingOverviewBarChart />
                        </div>
                        <div className="w-[742px] h-[381px] bg-[#FFFFFF] rounded-[10px] py-10 px-10">
                            <div className="flex flex-row items-center justify-between mb-12 w-full">
                                <h1 className="text-[24px] font-[700]">
                                    Earning Summary
                                </h1>
                                <div className="w-[132px] h-[33px] bg-[#D9D9D94F] rounded-[6px] flex flex-row justify-center items-center gap-3">
                                    <h1 className="text-[#00000080] font-[600] text-[14px]">
                                        Last 8 monts
                                    </h1>
                                    <img src={miniDownArrow} />
                                </div>
                            </div>
                            <EarningSummaryChart />
                        </div>
                    </div>
                    {/* mini right section */}
                    <div className="flex flex-col gap-5">
                        <div className="w-[349px] h-[206px] bg-[#D8E4F2] rounded-[10px]"></div>
                        <div className="w-[349px] h-[427px] bg-[#FFFFFF] rounded-[10px]"></div>
                        <div className="w-[349px] h-[335px] bg-[#FFFFFF] rounded-[10px]"></div>
                    </div>
                </div>

                <div className="w-full h-[619px] bg-[#FFFFFF] rounded-[10px]"></div>

                <div className="flex flex-row gap-5">
                    <div className="w-[553px] h-[858px] bg-[#FFFFFF] rounded-[10px]"></div>
                    <div className="w-[553px] h-[858px] bg-[#0F0F0F08] rounded-[10px]"></div>
                </div>
            </div>
        </div>
    );
};

export default DashContent;

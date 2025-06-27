import React from "react";
import search from "../../../assets/vendors/dashboard/searchIcon.svg";
import settings from "../../../assets/vendors/dashboard/settings.svg";
import bell from "../../../assets/vendors/dashboard/bell.svg";
import proPic from "../../../assets/vendors/dashboard/proPic.svg";

import dollarIcon from "../../../assets/vendors/dashboard/icons/dollarIcon.svg";
import carIcon from "../../../assets/vendors/dashboard/icons/carIcon.svg";
import icon from "../../../assets/vendors/dashboard/icons/icon.svg"
import icon2 from "../../../assets/vendors/dashboard/icons/icon2.svg"
import bookingIcon from "../../../assets/vendors/dashboard/icons/bookingIcon.svg";
import wheelIcon from "../../../assets/vendors/dashboard/icons/wheelIcon.svg";
import upArrow from "../../../assets/vendors/dashboard/icons/upArrow.svg";
import miniDownArrow from "../../../assets/vendors/dashboard/icons/miniDownArrow.svg";
import BookingOverviewBarChart from "./BookingOverviewBarChart";
import EarningSummaryChart from "./EarningSummaryChart";
import RealStatusPieChart from "./RealStatusPieChart";
import CarBookingTable from "./CarBookingTable";

import car from "../../../assets/vendors/dashboard/icons/car.svg";
import date from "../../../assets/vendors/dashboard/icons/date.svg";
import clock from "../../../assets/vendors/dashboard/icons/clock.svg";

import filterIcon from "../../../assets/vendors/dashboard/icons/filterIcon.svg";
import miniSearchIcon from "../../../assets/vendors/dashboard/icons/miniSearchIcon.svg";

import car1 from "../../../assets/vendors/dashboard/icons/car1.svg";
// import car2 from "../../../assets/vendors/dashboard/icons/car2.svg";
import car3 from "../../../assets/vendors/dashboard/icons/car3.svg";

import cal from "../../../assets/vendors/dashboard/icons/cal.svg";

const carTypes = [
    { name: "Hatchback", percent: 45, img: car1 },
    { name: "SUV", percent: 75, img: car3 },
    { name: "Hatchback", percent: 15, img: car1 },
    { name: "SUV", percent: 75, img: car3 },
    { name: "SUV", percent: 75, img: car3 },
    { name: "SUV", percent: 45, img: car3 },
];

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
                        <img src={bell} />
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
                <div className="flex flex-col xl:flex-row gap-5">
                    {/* mini left section */}
                    <div className="flex flex-col gap-5">
                        {/* mini 4 cards */}
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-row gap-5">
                                {/* card 1 */}
                                <div
                                    className="w-[360px] h-[91px] bg-[#FFFFFF] rounded-[8px] flex justify-between items-center gap-2 px-5 py-2"
                                    style={{
                                        boxShadow: "4px 4px 4px #0000001A",
                                    }}
                                >
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
                                <div
                                    className="w-[360px] h-[91px] bg-[#FFFFFF] rounded-[8px] flex justify-between items-center gap-2 px-5 py-2"
                                    style={{
                                        boxShadow: "4px 4px 4px #0000001A",
                                    }}
                                >
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
                                <div
                                    className="w-[360px] h-[91px] bg-[#FFFFFF] rounded-[8px] flex justify-between items-center gap-2 px-5 py-2"
                                    style={{
                                        boxShadow: "4px 4px 4px #0000001A",
                                    }}
                                >
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
                                <div
                                    className="w-[360px] h-[91px] bg-[#FFFFFF] rounded-[8px] flex justify-between items-center gap-2 px-5 py-2"
                                    style={{
                                        boxShadow: "4px 4px 4px #0000001A",
                                    }}
                                >
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
                        <div
                            className="w-[742px] h-auto bg-[#FFFFFF] flex flex-col justify-center items-center rounded-[10px] py-10 px-10"
                            style={{ boxShadow: "4px 4px 4px #0000001A" }}
                        >
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
                        <div
                            className="w-[742px] h-[381px] bg-[#FFFFFF] rounded-[10px] py-10 px-10"
                            style={{ boxShadow: "4px 4px 4px #0000001A" }}
                        >
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
                        <div
                            className="w-[349px] h-[206px] bg-[#D8E4F2] flex flex-col px-10 py-5 rounded-[10px]"
                            style={{ boxShadow: "4px 4px 4px #0000001A" }}
                        >
                            <h1 className="text-[24px] font-[700] mb-3">
                                Car Availability
                            </h1>

                            <div className="flex flex-col gap-3">
                                <div className="w-[283px] h-[35px] flex flex-row justify-center items-center gap-2 rounded-[6px] px-3 py-2 bg-[#FFFFFF] placeholder:text-[#7B7B7ACC] placeholder:text-[14px] placeholder:font-[500]">
                                    <img src={car} className="size-[20px]" />
                                    <input
                                        type="text"
                                        className="w-full outline-none bg-transparent shadow-none focus:ring-0 border-none"
                                        placeholder="Car Type"
                                    />
                                    <img src={miniDownArrow} />
                                </div>

                                <div className="flex flex-row gap-3">
                                    <div className="w-[137px] h-[35px] bg-[#FFFFFF] rounded-[6px] flex flex-row justify-center items-center gap-2 py-2 px-3">
                                        <img
                                            src={date}
                                            className="size-[20px]"
                                        />
                                        <input
                                            type="text"
                                            className="w-full outline-none bg-transparent shadow-none focus:ring-0 border-none"
                                            placeholder="Car Type"
                                        />
                                    </div>
                                    <div className="w-[137px] h-[35px] bg-[#FFFFFF] rounded-[6px]">
                                        <div className="w-[137px] h-[35px] bg-[#FFFFFF] rounded-[6px] flex flex-row justify-center gap-2 items-center py-2 px-3">
                                            <img
                                                src={clock}
                                                className="size-[16px]"
                                            />
                                            <input
                                                type="text"
                                                className="w-full outline-none bg-transparent shadow-none focus:ring-0 border-none"
                                                placeholder="Car Type"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <button className="w-[283px] h-[40px] bg-[#0955AC] rounded-[6px] flex justify-center items-center text-[16px] font-[700] text-[#FFFFFF] cursor-pointer">
                                    Check Availability
                                </button>
                            </div>
                        </div>
                        <div
                            className="w-[349px] h-[427px] bg-[#FFFFFF] rounded-[10px] py-5 px-10"
                            style={{ boxShadow: "4px 4px 4px #0000001A" }}
                        >
                            <div className="flex flex-row items-center justify-between w-full">
                                <h1 className="text-[24px] font-[700]">
                                    Real Status
                                </h1>
                                <div className="w-[113px] h-[33px] bg-[#D9D9D94F] rounded-[6px] flex flex-row justify-center items-center gap-3">
                                    <h1 className="text-[#00000080] font-[600] text-[14px]">
                                        This Week
                                    </h1>
                                    <img src={miniDownArrow} />
                                </div>
                            </div>
                            <RealStatusPieChart />
                        </div>

                        {/* Reminder section  */}
                        <div
                            className="w-[349px] h-[335px] bg-[#FFFFFF] rounded-[10px] py-5 px-10"
                            style={{ boxShadow: "4px 4px 4px #0000001A" }}
                        >
                            <div className="flex flex-row items-center justify-between w-full">
                                <h1 className="text-[24px] font-[700]">
                                    Reminders
                                </h1>
                                <div className="w-[39px] h-[33px] bg-[#D9D9D94F] rounded-[6px] flex justify-center items-center gap-3 text-[#00000080] font-[600] text-[30px]">
                                    +
                                </div>
                            </div>
                            <div className="py-10 flex flex-col justify-center items-center gap-2">
                                <div className="w-[286px] h-[68px] bg-[#D8E4F2] rounded-[10px] flex flex-row justify-center items-center gap-5 px-3 py-2">
                                    <div className="size-[24px] border-[1px] border-[#FF0000] rounded-full bg-[#FFFFFF] flex justify-center items-center text-[18px] font-[600] text-[#FF0000]">
                                        !
                                    </div>
                                    <h1 className="text-[14px] font-[500] w-[199px]">
                                        Update the car rental plans for the
                                        upcoming sessions.
                                    </h1>
                                </div>
                                <div className="w-[286px] h-[68px] bg-[#D8E4F2] rounded-[10px] flex flex-row justify-center items-center gap-5 px-3 py-2">
                                    <div className="size-[24px] border-[1px] border-[#FF0000] rounded-full bg-[#FFFFFF] flex justify-center items-center text-[18px] font-[600] text-[#FF0000]">
                                        !
                                    </div>
                                    <h1 className="text-[14px] font-[500] w-[199px]">
                                        Update the car rental plans for the
                                        upcoming sessions.
                                    </h1>
                                </div>
                                <div className="w-[286px] h-[68px] bg-[#D8E4F2] rounded-[10px] flex flex-row justify-center items-center gap-5 px-3 py-2">
                                    <div className="size-[24px] border-[1px] border-[#FF0000] rounded-full bg-[#FFFFFF] flex justify-center items-center text-[18px] font-[600] text-[#FF0000]">
                                        !
                                    </div>
                                    <h1 className="text-[14px] font-[500] w-[199px]">
                                        Update the car rental plans for the
                                        upcoming sessions.
                                    </h1>
                                </div>
                            </div>
                        </div>
                        {/* end */}
                    </div>
                </div>

                {/* car booking section */}

                <div
                    className="w-full h-auto bg-[#FFFFFF] rounded-[10px] py-10 px-10"
                    style={{ boxShadow: "4px 4px 4px #0000001A" }}
                >
                    <div className="flex flex-row justify-between">
                        <h1 className="text-[24px] font-[700]">Car Booking</h1>
                        <div className="flex flex-row gap-5">
                            <div className="w-[253px] h-[35px] bg-[#F3F3F3] rounded-[6px] flex flex-row justify-center items-center py-2 px-5">
                                <img src={miniSearchIcon} />
                                <input
                                    type="text"
                                    className="w-full outline-none bg-transparent shadow-none focus:ring-0 border-none placeholder:text-[#7B7B7ACC]"
                                    placeholder="Search client name, car, etc."
                                />
                            </div>
                            <div className="w-[125px] h-[35px] bg-[#F3F3F3] rounded-[6px] flex flex-row items-center justify-between py-2 px-5">
                                <img src={filterIcon} className="size-[12px]" />
                                <h1 className="text-[14px] font-[500] text-[#7B7B7ACC]">
                                    Filter
                                </h1>
                                <img src={miniDownArrow} />
                            </div>
                        </div>
                    </div>

                    <CarBookingTable />
                </div>
                {/* end */}

                <div className="flex flex-col xl:flex-row gap-5">
                    <div
                        className="w-[553px] h-[858px] bg-[#FFFFFF] rounded-[10px] px-10 py-10"
                        style={{ boxShadow: "4px 4px 4px #0000001A" }}
                    >
                        <div className="flex flex-row justify-between items-center">
                            <h1 className="text-[24px] font-[700]">
                                Car types
                            </h1>
                            <h1 className="text-[24px] font-[700]">...</h1>
                        </div>

                        <div className="mt-10 flex flex-col gap-5">
                            {carTypes.map((type, idx) => (
                                <div
                                    key={idx}
                                    className="w-full h-[107px] border-[1px] border-[#00000080] rounded-[9px] flex flex-row"
                                >
                                    <img
                                        src={type.img}
                                        className="h-[107px] w-[172px]"
                                    />
                                    <div className="flex flex-col justify-center gap-3 w-full px-5">
                                        <div className="flex flex-row justify-between items-center text-[15px] font-[500]">
                                            <h1 className="text-[#00000080]">
                                                {type.name}
                                            </h1>
                                            <h1 className="pr-5">
                                                {type.percent}%
                                            </h1>
                                        </div>
                                        <div className="w-full h-[20px] rounded-[4px] bg-[#D8E4F2] relative overflow-hidden">
                                            <div
                                                className="h-full rounded-[4px] absolute top-0 left-0"
                                                style={{
                                                    width: `${type.percent}%`,
                                                    backgroundColor:
                                                        type.percent <= 20
                                                            ? "#F51D1D"
                                                            : "#0955AC",
                                                    transition: "width 0.5s",
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div
                        className="w-[553px] h-[858px] bg-[#0F0F0F08] rounded-[10px] px-10 py-10"
                        style={{ boxShadow: "4px 4px 4px #0000001A" }}
                    >
                        <div className="flex flex-row justify-between items-center">
                            <h1 className="text-[24px] font-[700]">
                                Recent Activities
                            </h1>
                            <h1 className="text-[24px] font-[700]">...</h1>
                        </div>
                        <h1 className="text-[20px] font-[600] text-[#0F0F0F80] py-3">
                            Today
                        </h1>

                        <div className="flex flex-row justify-center items-start gap-10">
                            <div className="flex flex-col items-center py-5">
                                <div className="size-[60px] bg-[#FFFFFF] rounded-full flex justify-center items-center">
                                    <img src={cal} />
                                </div>
                                <div className="w-[2px] h-[54px] bg-[#00000054]"></div>
                                <div className="size-[60px] bg-[#FFFFFF] rounded-full flex justify-center items-center">
                                <img src={icon} />
                                </div>
                            </div>
                            <div className="flex flex-col py-5 gap-10 text-[20px] font-[700]">
                                <div>
                                    <h1>
                                        Alice Johnson completed a booking for
                                        Toyota Corolla (KX 2345)
                                    </h1>
                                    <h1 className="font-[600] text-[#0F0F0F80]">
                                        10:45 AM
                                    </h1>
                                </div>
                                <div>
                                    <h1>
                                        Bob Smith's booking for Toyota Corolla
                                        (KX 2345) is pending payment
                                    </h1>
                                    <h1 className="font-[600] text-[#0F0F0F80]">
                                        15:45 PM
                                    </h1>
                                </div>
                            </div>
                        </div>

                        <h1 className="text-[20px] font-[600] text-[#0F0F0F80] py-3">
                            Yesterday
                        </h1>
                        <div className="flex flex-row justify-center items-start gap-10">
                            <div className="flex flex-col items-center py-5">
                                <div className="size-[60px] bg-[#FFFFFF] rounded-full flex justify-center items-center">
                                <img src={icon2} />
                                </div>
                                <div className="w-[2px] h-[54px] bg-[#00000054]"></div>
                                <div className="size-[60px] bg-[#FFFFFF] rounded-full flex justify-center items-center">
                                    <img src={carIcon} />
                                </div>
                                <div className="w-[2px] h-[54px] bg-[#00000054]"></div>
                                <div className="size-[60px] bg-[#FFFFFF] rounded-full flex justify-center items-center">
                                <img src={icon} />
                                </div>
                            </div>
                            <div className="flex flex-col py-5 gap-10 text-[20px] font-[700]">
                                <div>
                                    <h1>
                                        Alice Johnson completed a booking for
                                        Toyota Corolla (KX 2345)
                                    </h1>
                                    <h1 className="font-[600] text-[#0F0F0F80]">
                                        10:45 AM
                                    </h1>
                                </div>
                                <div>
                                    <h1>
                                        Bob Smith's booking for Toyota Corolla
                                        (KX 2345) is pending payment
                                    </h1>
                                    <h1 className="font-[600] text-[#0F0F0F80]">
                                        15:45 PM
                                    </h1>
                                </div>
                                <div>
                                    <h1>
                                        Bob Smith's booking for Toyota Corolla
                                        (KX 2345) is pending payment
                                    </h1>
                                    <h1 className="font-[600] text-[#0F0F0F80]">
                                        15:45 PM
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashContent;

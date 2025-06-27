import React from "react";
import search from "../../../assets/vendors/dashboard/searchIcon.svg";
import settings from "../../../assets/vendors/dashboard/settings.svg";
import bell from "../../../assets/vendors/dashboard/bell.svg";
import proPic from "../../../assets/vendors/dashboard/proPic.svg";

import proPicTwo from "../../../assets/vendors/tracking/proPic.svg";
import car1 from "../../../assets/vendors/dashboard/icons/car1.svg";

import leftArrow from "../../../assets/vendors/calendar/leftArrow.svg";
import miniDownArrow from "../../../assets/vendors/calendar/miniDown.svg";

import CalendarMonthPicker from "./CalendarMonthPicker";

// Define days, times, and events for the calendar
const days = [
  { label: "Mon", date: 14 },
  { label: "Tue", date: 15 },
  { label: "Wed", date: 16 },
  { label: "Thu", date: 17 },
  { label: "Fri", date: 18 },
  { label: "Sat", date: 19 },
  { label: "Sun", date: 20 },
];

const times = [
  "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"
];

const events = [
  // Monday
  { day: 0, time: "8:00 AM", title: "BMW LX3", person: "Steve Gibson", status: "done" },
  { day: 0, time: "12:00 PM", title: "BMW LX3", person: "Steve Gibson", status: "done" },
  { day: 0, time: "3:00 PM", title: "BMW LX3", person: "Steve Gibson", status: "done" },
  // Tuesday
  { day: 1, time: "9:00 AM", title: "BMW LX3", person: "Steve Gibson", status: "cancelled" },
  { day: 1, time: "1:00 PM", title: "BMW LX3", person: "Steve Gibson", status: "cancelled" },
  // Wednesday
  { day: 2, time: "8:00 AM", title: "BMW LX3", person: "Steve Gibson", status: "done" },
  // Thursday
  { day: 3, time: "9:30 AM", title: "BMW LX3", person: "Steve Gibson", status: "done" },
  { day: 3, time: "9:30 AM", title: "Toyota Vezel", person: "Steve Gibson", status: "done" },
  { day: 3, time: "12:30 PM", title: "BMW LX3", person: "Steve Gibson", status: "done" },
  { day: 3, time: "1:00 PM", title: "BMW LX3", person: "Steve Gibson", status: "cancelled" },
  { day: 3, time: "1:00 PM", title: "Toyota Vezel", person: "Steve Gibson", status: "cancelled" },
  // Friday
  { day: 4, time: "8:00 AM", title: "BMW LX3", person: "Steve Gibson", status: "done" },
  { day: 4, time: "11:00 AM", title: "BMW LX3", person: "Steve Gibson", status: "cancelled" },
  // Saturday
  { day: 5, time: "9:00 AM", title: "BMW LX3", person: "Steve Gibson", status: "done" },
  // Sunday
  { day: 6, time: "8:00 AM", title: "BMW LX3", person: "Steve Gibson", status: "cancelled" },
  { day: 6, time: "1:00 PM", title: "BMW LX3", person: "Steve Gibson", status: "cancelled" },
  { day: 6, time: "4:00 PM", title: "BMW LX3", person: "Steve Gibson", status: "done" },
];

const CalendarContent = () => {
    return (
        <div className="w-full h-auto pr-20 py-10">
            {/* Header section */}
            <div className="flex flex-row gap-5 justify-between items-center">
                <h1 className="figtree text-[35px] font-[700]">Calendar</h1>
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

            <div className="mt-10 flex flex-row gap-5">
                <div
                    className="w-[428px] h-[428px] bg-[#FFFFFF] rounded-[10px] flex flex-col justify-between px-8 py-10"
                    style={{
                        boxShadow: "4px 4px 4px #0000001A",
                    }}
                >
                    <div className="flex flex-row gap-2 justify-center items-center w-full h-[175px] bg-[#E5E5E5] rounded-[10px] px-5 py-5">
                        <img src={proPicTwo} className="size-[90px]" />
                        <div className="flex flex-col gap-3">
                            <h1 className="text-[18px] font-[700]">
                                Steve Gibson
                            </h1>
                            <div className="flex flex-row gap-10 text-[16px] font-[500]">
                                <div className="flex flex-col gap-3 text-[#00000080]">
                                    <h1>Start Date</h1>
                                    <h1>End Date</h1>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <h1>25th June 2025</h1>
                                    <h1>27th June 2025</h1>
                                </div>
                            </div>
                            <h1 className="text-[16px] font-[600] text-[#0955AC]">
                                Client request a child safety seat.
                            </h1>
                        </div>
                    </div>

                    <div className="flex flex-row gap-2 justify-center items-center w-full h-[175px] bg-[#E5E5E5] rounded-[10px] px-5 py-5">
                        <img src={car1} className="size-[90px]" />
                        <div className="flex flex-col gap-2">
                            <h1 className="text-[18px] font-[700]">BMW LX3</h1>
                            <div className="flex flex-row gap-10 text-[16px] font-[500]">
                                <div className="flex flex-col gap-2 text-[#00000080]">
                                    <h1>Car Type</h1>
                                    <h1>Car Number</h1>
                                    <h1>Transmission</h1>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h1>SUV</h1>
                                    <h1>CBL 3245</h1>
                                    <h1>Automatic</h1>
                                </div>
                            </div>
                            <h1 className="text-[16px] font-[600] text-[#0955AC]">
                                Client request a child safety seat.
                            </h1>
                        </div>
                    </div>
                </div>
                <div
                    className="w-[349px] h-[428px] bg-[#FFFFFF] rounded-[10px] px-10 py-10"
                    style={{
                        boxShadow: "4px 4px 4px #0000001A",
                    }}
                >
                    {/* Reminder section  */}
                    <div className="flex flex-row items-center justify-between w-full">
                        <h1 className="text-[24px] font-[700]">Reminders</h1>
                        <div className="w-[39px] h-[33px] bg-[#D9D9D94F] rounded-[6px] flex justify-center items-center gap-3 text-[#00000080] font-[600] text-[30px]">
                            +
                        </div>
                    </div>
                    <div className="py-5 flex flex-col justify-center items-center gap-5">
                        <div className="w-[286px] h-[68px] bg-[#D8E4F2] rounded-[10px] flex flex-row justify-center items-center gap-5 px-3 py-2">
                            <div className="size-[24px] border-[1px] border-[#FF0000] rounded-full bg-[#FFFFFF] flex justify-center items-center text-[18px] font-[600] text-[#FF0000]">
                                !
                            </div>
                            <h1 className="text-[14px] font-[500] w-[199px]">
                                Update the car rental plans for the upcoming
                                sessions.
                            </h1>
                        </div>
                        <div className="w-[286px] h-[68px] bg-[#D8E4F2] rounded-[10px] flex flex-row justify-center items-center gap-5 px-3 py-2">
                            <div className="size-[24px] border-[1px] border-[#FF0000] rounded-full bg-[#FFFFFF] flex justify-center items-center text-[18px] font-[600] text-[#FF0000]">
                                !
                            </div>
                            <h1 className="text-[14px] font-[500] w-[199px]">
                                Update the car rental plans for the upcoming
                                sessions.
                            </h1>
                        </div>
                        <div className="w-[286px] h-[68px] bg-[#D8E4F2] rounded-[10px] flex flex-row justify-center items-center gap-5 px-3 py-2">
                            <div className="size-[24px] border-[1px] border-[#FF0000] rounded-full bg-[#FFFFFF] flex justify-center items-center text-[18px] font-[600] text-[#FF0000]">
                                !
                            </div>
                            <h1 className="text-[14px] font-[500] w-[199px]">
                                Update the car rental plans for the upcoming
                                sessions.
                            </h1>
                        </div>
                        <div className="w-[286px] h-[68px] bg-[#D8E4F2] rounded-[10px] flex flex-row justify-center items-center gap-5 px-3 py-2">
                            <div className="size-[24px] border-[1px] border-[#FF0000] rounded-full bg-[#FFFFFF] flex justify-center items-center text-[18px] font-[600] text-[#FF0000]">
                                !
                            </div>
                            <h1 className="text-[14px] font-[500] w-[199px]">
                                Update the car rental plans for the upcoming
                                sessions.
                            </h1>
                        </div>
                    </div>
                    {/* end */}
                </div>
                <div
                    className="w-[315px] h-[428px] bg-[#FFFFFF] rounded-[10px] flex justify-center items-center px-5 py-5"
                    style={{
                        boxShadow: "4px 4px 4px #0000001A",
                    }}
                >

                  <CalendarMonthPicker />
                  
                </div>
            </div>

            <div
                className="w-full h-auto bg-[#FFFFFF] rounded-[10px] mt-10 py-10"
                style={{
                    boxShadow: "4px 4px 4px #0000001A",
                }}
            >
                <div className="px-20 flex flex-row items-center justify-between">
                    <div className="flex flex-row justify-center items-center gap-6">
                        <div className="w-[75px] h-[35px] bg-[#F3F3F3] rounded-[6px] text-[14px] font-[500] text-[#00000080] flex justify-center items-center">
                            Today
                        </div>
                        <div className="flex flex-row justify-center items-center gap-2">
                            <div className="size-[35px] bg-[#F3F3F3] rounded-[6px] flex justify-center items-center">
                                <img src={leftArrow} />
                            </div>
                            <div className="size-[35px] bg-[#F3F3F3] rounded-[6px] flex justify-center items-center">
                                <img src={leftArrow} className="rotate-180" />
                            </div>
                        </div>
                        <h1 className="text-[18px] font-[700]">
                            September 2025
                        </h1>
                    </div>
                    <div className="flex flex-row justify-center items-center gap-5">
                        <div className="flex flex-row justify-center items-center text-[#0955AC] text-[14px] font-[700]">
                            <div className="w-[85px] h-[35px] bg-[#F3F3F3] rounded-l-[6px] flex justify-center items-center">
                                All
                            </div>
                            <div className="w-[85px] h-[35px] bg-[#F3F3F3] flex justify-center items-center">
                                Pickup
                            </div>
                            <div className="w-[85px] h-[35px] bg-[#F3F3F3] rounded-r-[6px] flex justify-center items-center">
                                Return
                            </div>
                        </div>
                        <div className="w-[96px] h-[35px] bg-[#F3F3F3] rounded-[6px] text-[14px] font-[500] text-[#00000080] flex justify-center items-center gap-3">
                            <h1>Week</h1>
                            <img src={miniDownArrow} />
                        </div>
                    </div>
                </div>

                <div className="flex flex-row gap-10 justify-start items-center px-20 py-5">
                    <div className="flex flex-row justify-start items-center gap-5 ">
                        <div className="size-[16px] bg-[#C5E6F9] rounded-[4px]" />
                        <h1 className=" text-[#00000080] font-[600] text-[16px]">
                            Done
                        </h1>
                    </div>
                    <div className="flex flex-row justify-start items-center gap-5">
                        <div className="size-[16px] bg-[#FFDBDF] rounded-[4px]" />
                        <h1 className=" text-[#00000080] font-[600] text-[16px]">
                            Cancelled
                        </h1>
                    </div>
                </div>

                <div className="grid grid-cols-8 border-t border-l border-[#00000026]">
                  {/* Header Row */}
                  <div className="border-b border-r border-[#00000026] bg-white flex justify-center items-center text-[#00000080] text-[14px] font-[500]">UTC +1</div>
                  {days.map((day) => (
                    <div key={day.date} className="border-b border-r border-[#00000026] flex flex-col items-center py-2">
                      <span className="font-[700] text-[24px]">{day.date}</span>
                      <span className="text-[14px] font-[500] text-[#00000080]">{day.label}</span>
                    </div>
                  ))}

                  {/* Time Rows */}
                  {times.map((time, rowIdx) => (
                    <React.Fragment key={time}>
                      {/* Time column */}
                      <div className="relative border-[#00000026] bg-[#FFFFFF] h-[80px] text-[14px] text-[#7B7B7A] font-[500]">
                        <div className="absolute bottom-[0px] left-1/2 -translate-x-1/2 mb-1">
                          {time}
                        </div>
                      </div>
                      {/* Day columns */}
                      {days.map((day, colIdx) => {
                        // Find all events for this cell
                        const cellEvents = events.filter(
                          (e) => e.day === colIdx && e.time === time
                        );
                        return (
                          <div
                            key={colIdx}
                            className="border-b border-r border-l border-[#00000026] relative h-[100px] flex flex-col items-center justify-center gap-1"
                          >
                            {cellEvents.map((event, idx) => (
                              <div
                                key={idx}
                                className="w-[122px] h-[90px] rounded-[12px] px-3 py-2 flex flex-col justify-center items-center bg-[#C5E6F9]"
                              >
                                {/* Time */}
                                <span className="w-full text-start text-[12px] font-[500] text-[#000000B2] tracking-wide mb-1">
                                  {event.time.replace(":", " : ")}
                                </span>
                                {/* Car Name */}
                                <span className="w-full text-left font-[500] text-[16px] text-[#000000B2]">
                                  {event.title}
                                </span>
                                {/* Avatar and Name */}
                                <div className="flex flex-row items-start w-full mt-auto">
                                  <img
                                    src={proPicTwo}
                                    alt="avatar"
                                    className="w-7 h-7 rounded-full object-cover mr-2"
                                  />
                                  <span className="text-[12px] font-[500] text-[#000000B2]">{event.person}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        );
                      })}
                    </React.Fragment>
                  ))}
                </div>
            </div>
        </div>
    );
};

export default CalendarContent;

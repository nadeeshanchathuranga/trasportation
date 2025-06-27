import React from "react";
import miniUp from "../../../assets/vendors/dashboard/icons/miniUp.svg";
import miniDown from "../../../assets/vendors/dashboard/icons/miniDown.svg";

const CarBookingTable = () => {
    return (
        <div className="py-10">
            {/* table headings */}
            <div className="grid grid-cols-8 bg-[#D8E4F2] h-[42px] justify-center items-center rounded-[8px] text-[14px] font-[600] px-10">
                <div className="flex flex-row gap-2 items-center">
                    <h1>Book id</h1>
                    <div className="flex flex-col justify-center items-center">
                        <img src={miniUp} className="w-[6px] h-[4px]" />
                        <img src={miniDown} className="w-[6px] h-[4px]" />
                    </div>
                </div>
                <div className="flex flex-row gap-2 items-center">
                    <h1>Booking Date</h1>
                    <div className="flex flex-col justify-center items-center">
                        <img src={miniUp} className="w-[6px] h-[4px]" />
                        <img src={miniDown} className="w-[6px] h-[4px]" />
                    </div>
                </div>
                <div className="flex flex-row gap-2 items-center">
                    <h1>Client Name</h1>
                    <div className="flex flex-col justify-center items-center">
                        <img src={miniUp} className="w-[6px] h-[4px]" />
                        <img src={miniDown} className="w-[6px] h-[4px]" />
                    </div>
                </div>
                <div className="flex flex-row gap-2 items-center">
                    <h1>Car Model</h1>
                    <div className="flex flex-col justify-center items-center">
                        <img src={miniUp} className="w-[6px] h-[4px]" />
                        <img src={miniDown} className="w-[6px] h-[4px]" />
                    </div>
                </div>
                <div className="flex flex-row gap-2 items-center">
                    <h1>Plan</h1>
                    <div className="flex flex-col justify-center items-center">
                        <img src={miniUp} className="w-[6px] h-[4px]" />
                        <img src={miniDown} className="w-[6px] h-[4px]" />
                    </div>
                </div>
                <div className="flex flex-row gap-2 items-center">
                    <h1>Date</h1>
                    <div className="flex flex-col justify-center items-center">
                        <img src={miniUp} className="w-[6px] h-[4px]" />
                        <img src={miniDown} className="w-[6px] h-[4px]" />
                    </div>
                </div>
                <div className="flex flex-row gap-2 items-center ml-10">
                    <h1>Payment</h1>
                    <div className="flex flex-col justify-center items-center">
                        <img src={miniUp} className="w-[6px] h-[4px]" />
                        <img src={miniDown} className="w-[6px] h-[4px]" />
                    </div>
                </div>
                <div className="flex flex-row gap-2 items-center">
                    <h1>Status</h1>
                    <div className="flex flex-col justify-center items-center">
                        <img src={miniUp} className="w-[6px] h-[4px]" />
                        <img src={miniDown} className="w-[6px] h-[4px]" />
                    </div>
                </div>
            </div>

            {/* 1st row */}
            <div className="grid grid-cols-8 border-b-[1.5px] border-[#00000033] h-[100px] justify-center items-center text-[15px] font-[500] px-10">
                <div>C-JV1001</div>
                <div>May 4, 2025</div>
                <div>Steve Gibson</div>
                <div>
                    <h1>Honda Civic</h1>
                    <div className="w-[87px] h-[22px] rounded-[4px] bg-[#D9D9D957] border-[1.5px] border-[#0000004D] flex justify-center items-center text-[#00000099] text-[13px]">
                        CBK - 1475
                    </div>
                </div>
                <div>7 days</div>
                <div className="text-[14px] font-[500] text-[#939392]">
                    <div className="flex flex-row gap-2 justify-start items-center">
                        <h1>Start</h1>
                        <div className="w-[72px] h-[19px] border-[0.5px] bg-[#D9D9D957] border-[#0000004D] text-[10px] font-[500] text-[#00000099] flex justify-center items-center rounded-[4px]">
                            May 10, 2025
                        </div>
                    </div>
                    <div className="flex flex-row gap-4 justify-start items-center">
                        <h1>End</h1>
                        <div className="w-[72px] h-[19px] border-[0.5px] bg-[#D9D9D957] border-[#0000004D] text-[10px] font-[500] text-[#00000099] flex justify-center items-center rounded-[4px]">
                            May 17, 2025
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <h1>$450</h1>
                    <div className=" w-[66px] h-[19px] border-[0.5px] border-[#3B8F314D] bg-[#ACE19957] rounded-[4px] text-[10px] text-[#00000099] font-[500] flex justify-center items-center">
                        Paid
                    </div>
                </div>
                <div className="w-[72px] h-[19px] bg-[#FFCD29] border-[1px] border-[#0000004D] rounded-[4px] flex justify-center items-center text-[10px] font-[700]">
                    Ongoing
                </div>
            </div>

            {/* 2nd row */}
            <div className="grid grid-cols-8 border-b-[1.5px] border-[#00000033] h-[100px] justify-center items-center text-[15px] font-[500] px-10">
                <div>C-JV1001</div>
                <div>May 4, 2025</div>
                <div>Steve Gibson</div>
                <div>
                    <h1>Honda Civic</h1>
                    <div className="w-[87px] h-[22px] rounded-[4px] bg-[#D9D9D957] border-[1.5px] border-[#0000004D] flex justify-center items-center text-[#00000099] text-[13px]">
                        CBK - 1475
                    </div>
                </div>
                <div>7 days</div>
                <div className="text-[14px] font-[500] text-[#939392]">
                    <div className="flex flex-row gap-2 justify-start items-center">
                        <h1>Start</h1>
                        <div className="w-[72px] h-[19px] border-[0.5px] bg-[#D9D9D957] border-[#0000004D] text-[10px] font-[500] text-[#00000099] flex justify-center items-center rounded-[4px]">
                            May 10, 2025
                        </div>
                    </div>
                    <div className="flex flex-row gap-4 justify-start items-center">
                        <h1>End</h1>
                        <div className="w-[72px] h-[19px] border-[0.5px] bg-[#D9D9D957] border-[#0000004D] text-[10px] font-[500] text-[#00000099] flex justify-center items-center rounded-[4px]">
                            May 17, 2025
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <h1>$50</h1>
                    <div className=" w-[66px] h-[19px] border-[0.5px] border-[#FF6060] bg-[#FF60608C] rounded-[4px] text-[10px] text-[#00000099] font-[500] flex justify-center items-center">
                        Pending
                    </div>
                </div>
                <div className="w-[72px] h-[19px] bg-[#FFCD29] border-[1px] border-[#0000004D] rounded-[4px] flex justify-center items-center text-[10px] font-[700]">
                    Ongoing
                </div>
            </div>

            {/* 3rd row */}
            <div className="grid grid-cols-8 border-b-[1.5px] border-[#00000033] h-[100px] justify-center items-center text-[15px] font-[500] px-10">
                <div>C-JV1001</div>
                <div>May 4, 2025</div>
                <div>Steve Gibson</div>
                <div>
                    <h1>Honda Civic</h1>
                    <div className="w-[87px] h-[22px] rounded-[4px] bg-[#D9D9D957] border-[1.5px] border-[#0000004D] flex justify-center items-center text-[#00000099] text-[13px]">
                        CBK - 1475
                    </div>
                </div>
                <div>7 days</div>
                <div className="text-[14px] font-[500] text-[#939392]">
                    <div className="flex flex-row gap-2 justify-start items-center">
                        <h1>Start</h1>
                        <div className="w-[72px] h-[19px] border-[0.5px] bg-[#D9D9D957] border-[#0000004D] text-[10px] font-[500] text-[#00000099] flex justify-center items-center rounded-[4px]">
                            May 10, 2025
                        </div>
                    </div>
                    <div className="flex flex-row gap-4 justify-start items-center">
                        <h1>End</h1>
                        <div className="w-[72px] h-[19px] border-[0.5px] bg-[#D9D9D957] border-[#0000004D] text-[10px] font-[500] text-[#00000099] flex justify-center items-center rounded-[4px]">
                            May 17, 2025
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <h1>$450</h1>
                    <div className=" w-[66px] h-[19px] border-[0.5px] border-[#3B8F314D] bg-[#ACE19957] rounded-[4px] text-[10px] text-[#00000099] font-[500] flex justify-center items-center">
                        Paid
                    </div>
                </div>
                <div className="w-[72px] h-[19px] border-[1px] border-[#FFCD29] rounded-[4px] flex justify-center items-center text-[10px] font-[700] text-[#FFCD29]">
                    Returned
                </div>
            </div>

            {/* 4th row */}
            <div className="grid grid-cols-8 border-b-[1.5px] border-[#00000033] h-[100px] justify-center items-center text-[15px] font-[500] px-10">
                <div>C-JV1001</div>
                <div>May 4, 2025</div>
                <div>Steve Gibson</div>
                <div>
                    <h1>Honda Civic</h1>
                    <div className="w-[87px] h-[22px] rounded-[4px] bg-[#D9D9D957] border-[1.5px] border-[#0000004D] flex justify-center items-center text-[#00000099] text-[13px]">
                        CBK - 1475
                    </div>
                </div>
                <div>7 days</div>
                <div className="text-[14px] font-[500] text-[#939392]">
                    <div className="flex flex-row gap-2 justify-start items-center">
                        <h1>Start</h1>
                        <div className="w-[72px] h-[19px] border-[0.5px] bg-[#D9D9D957] border-[#0000004D] text-[10px] font-[500] text-[#00000099] flex justify-center items-center rounded-[4px]">
                            May 10, 2025
                        </div>
                    </div>
                    <div className="flex flex-row gap-4 justify-start items-center">
                        <h1>End</h1>
                        <div className="w-[72px] h-[19px] border-[0.5px] bg-[#D9D9D957] border-[#0000004D] text-[10px] font-[500] text-[#00000099] flex justify-center items-center rounded-[4px]">
                            May 17, 2025
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <h1>$450</h1>
                    <div className=" w-[66px] h-[19px] border-[0.5px] border-[#3B8F314D] bg-[#ACE19957] rounded-[4px] text-[10px] text-[#00000099] font-[500] flex justify-center items-center">
                        Paid
                    </div>
                </div>
                <div className="w-[72px] h-[19px] bg-[#FFCD29] border-[1px] border-[#0000004D] rounded-[4px] flex justify-center items-center text-[10px] font-[700]">
                    Ongoing
                </div>
            </div>

            {/* 5th row */}
            <div className="grid grid-cols-8 h-[100px] justify-center items-center text-[15px] font-[500] px-10">
                <div>C-JV1001</div>
                <div>May 4, 2025</div>
                <div>Steve Gibson</div>
                <div>
                    <h1>Honda Civic</h1>
                    <div className="w-[87px] h-[22px] rounded-[4px] bg-[#D9D9D957] border-[1.5px] border-[#0000004D] flex justify-center items-center text-[#00000099] text-[13px]">
                        CBK - 1475
                    </div>
                </div>
                <div>7 days</div>
                <div className="text-[14px] font-[500] text-[#939392]">
                    <div className="flex flex-row gap-2 justify-start items-center">
                        <h1>Start</h1>
                        <div className="w-[72px] h-[19px] border-[0.5px] bg-[#D9D9D957] border-[#0000004D] text-[10px] font-[500] text-[#00000099] flex justify-center items-center rounded-[4px]">
                            May 10, 2025
                        </div>
                    </div>
                    <div className="flex flex-row gap-4 justify-start items-center">
                        <h1>End</h1>
                        <div className="w-[72px] h-[19px] border-[0.5px] bg-[#D9D9D957] border-[#0000004D] text-[10px] font-[500] text-[#00000099] flex justify-center items-center rounded-[4px]">
                            May 17, 2025
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <h1>$450</h1>
                    <div className=" w-[66px] h-[19px] border-[0.5px] border-[#3B8F314D] bg-[#ACE19957] rounded-[4px] text-[10px] text-[#00000099] font-[500] flex justify-center items-center">
                        Paid
                    </div>
                </div>
                <div className="w-[72px] h-[19px] bg-[#FFCD29] border-[1px] border-[#0000004D] rounded-[4px] flex justify-center items-center text-[10px] font-[700]">
                    Ongoing
                </div>
            </div>
        </div>
    );
};

export default CarBookingTable; 
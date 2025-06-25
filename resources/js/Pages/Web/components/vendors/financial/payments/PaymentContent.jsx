import React from "react";
import search from "../../../../assets/vendors/dashboard/searchIcon.svg";
import settings from "../../../../assets/vendors/dashboard/settings.svg";
import bell from "../../../../assets/vendors/dashboard/bell.svg";
import proPic from "../../../../assets/vendors/dashboard/proPic.svg";

import upArrow from "../../../../assets/vendors/dashboard/icons/upArrow.svg";

import wallet from "../../../../assets/financial/expenses/wallet.svg";
import income from "../../../../assets/financial/expenses/income.svg";
import expenses from "../../../../assets/financial/expenses/expenses.svg";

import dotThree from "../../../../assets/financial/expenses/dots3.svg";

import filterIcon from "../../../../assets/vendors/dashboard/icons/filterIcon.svg";
import miniSearchIcon from "../../../../assets/vendors/dashboard/icons/miniSearchIcon.svg";
import miniDownArrow from "../../../../assets/vendors/dashboard/icons/miniDownArrow.svg";

import downloadLogo from "../../../../assets/financial/expenses/download.svg";
import calendar from "../../../../assets/financial/expenses/cal.svg";

import miniUp from "../../../../assets/vendors/dashboard/icons/miniUp.svg";
import miniDown from "../../../../assets/vendors/dashboard/icons/miniDown.svg";

const PaymentContent = () => {
    return (
        <div className="flex flex-col gap-10 w-full h-auto pr-20 py-10">
            {/* Header section */}
            <div className="flex flex-row gap-5 justify-between items-center">
                <h1 className="figtree text-[35px] font-[700]">Payment</h1>
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

            {/* mini 4 cards */}
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
                            <img src={wallet} />
                        </div>
                        <div>
                            <h1 className="text-[16px] font-[500] text-[#7B7B7A]">
                                Balance
                            </h1>
                            <h1 className="text-[26px] font-[700]">$8,450</h1>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 items-end text-[14px] font-[500]">
                        <div className="w-[81px] h-[26px] bg-[#D8E4F2] rounded-[5px] flex flex-row justify-center items-center">
                            <img src={upArrow} className="size-[19px]" />
                            <h1 className="">+2.86%</h1>
                        </div>
                        <h1 className="text-[#7B7B7A]">from last week</h1>
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
                            <img src={income} />
                        </div>
                        <div>
                            <h1 className="text-[16px] font-[500] text-[#7B7B7A]">
                                Income
                            </h1>
                            <h1 className="text-[26px] font-[700]">$25,700</h1>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 items-end text-[14px] font-[500]">
                        <div className="w-[81px] h-[26px] bg-[#D8E4F2] rounded-[5px] flex flex-row justify-center items-center">
                            <img src={upArrow} className="size-[19px]" />
                            <h1 className="">+1.73%</h1>
                        </div>
                        <h1 className="text-[#7B7B7A]">from last week</h1>
                    </div>
                </div>
                {/* end of card 2 */}

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
                                <img src={expenses} />
                            </div>
                            <div>
                                <h1 className="text-[16px] font-[500] text-[#7B7B7A]">
                                    Expenses
                                </h1>
                                <h1 className="text-[26px] font-[700]">
                                    $14,756
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
                            <h1 className="text-[#7B7B7A]">from last week</h1>
                        </div>
                    </div>
                    {/* end of card 3 */}
                </div>
            </div>
        </div>
    );
};

export default PaymentContent;

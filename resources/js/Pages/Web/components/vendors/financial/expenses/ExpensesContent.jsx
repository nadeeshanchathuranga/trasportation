import React, { useState } from "react";
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

import CashflowChart from "./CashflowChart";
import ExpensesPieChart from "./ExpensesPieChart";

const ExpensesContent = () => {
    const expensesData = [
        {
            name: "Oil Change",
            category: {
                label: "Vehicle Maintenance",
                width: "w-[133px]",
                color: "#2E4683",
            },
            quantity: 12,
            amount: "$100",
            date: "2025.08.10",
            status: {
                label: "Completed",
                border: "#50AE31",
                bg: "#6DB4464D",
                text: "#50AE31",
            },
        },
        {
            name: "Fuel Purchase",
            category: { label: "Fuel", width: "w-[58px]", color: "#2E4683" },
            quantity: 12,
            amount: "$2000",
            date: "2025.08.10",
            status: {
                label: "Completed",
                border: "#50AE31",
                bg: "#6DB4464D",
                text: "#50AE31",
            },
        },
        {
            name: "Insurance Payment",
            category: {
                label: "Insurance",
                width: "w-[82px]",
                color: "#39CEF3",
            },
            quantity: 12,
            amount: "$1500",
            date: "2025.08.10",
            status: {
                label: "Pending",
                border: "#F0BB0D",
                bg: "#FFCD294D",
                text: "#F0BB0D",
            },
        },
        {
            name: "Vehicle Maintenance",
            category: {
                label: "Insurance",
                width: "w-[82px]",
                color: "#39CEF3",
            },
            quantity: 12,
            amount: "$1500",
            date: "2025.08.10",
            status: {
                label: "Pending",
                border: "#F0BB0D",
                bg: "#FFCD294D",
                text: "#F0BB0D",
            },
        },
        {
            name: "Tire Replacement",
            category: {
                label: "Insurance",
                width: "w-[82px]",
                color: "#39CEF3",
            },
            quantity: 12,
            amount: "$1500",
            date: "2025.08.10",
            status: {
                label: "Pending",
                border: "#F0BB0D",
                bg: "#FFCD294D",
                text: "#F0BB0D",
            },
        },
        {
            name: "Staff Salary",
            category: {
                label: "Insurance",
                width: "w-[82px]",
                color: "#39CEF3",
            },
            quantity: 12,
            amount: "$1500",
            date: "2025.08.10",
            status: {
                label: "Pending",
                border: "#F0BB0D",
                bg: "#FFCD294D",
                text: "#F0BB0D",
            },
        },
        {
            name: "Vehicle Maintenance",
            category: {
                label: "Insurance",
                width: "w-[82px]",
                color: "#39CEF3",
            },
            quantity: 12,
            amount: "$1500",
            date: "2025.08.10",
            status: {
                label: "Pending",
                border: "#F0BB0D",
                bg: "#FFCD294D",
                text: "#F0BB0D",
            },
        },
        {
            name: "Staff Salary",
            category: {
                label: "Insurance",
                width: "w-[82px]",
                color: "#39CEF3",
            },
            quantity: 12,
            amount: "$1500",
            date: "2025.08.10",
            status: {
                label: "Pending",
                border: "#F0BB0D",
                bg: "#FFCD294D",
                text: "#F0BB0D",
            },
        },
        {
            name: "Fuel Purchase",
            category: {
                label: "Insurance",
                width: "w-[82px]",
                color: "#39CEF3",
            },
            quantity: 12,
            amount: "$1500",
            date: "2025.08.10",
            status: {
                label: "Pending",
                border: "#F0BB0D",
                bg: "#FFCD294D",
                text: "#F0BB0D",
            },
        },
        {
            name: "Insurance Payment",
            category: {
                label: "Insurance",
                width: "w-[82px]",
                color: "#39CEF3",
            },
            quantity: 12,
            amount: "$1500",
            date: "2025.08.10",
            status: {
                label: "Pending",
                border: "#F0BB0D",
                bg: "#FFCD294D",
                text: "#F0BB0D",
            },
        },
    ];

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const perPageOptions = [5, 10, 20, 50];
    const totalPages = Math.ceil(expensesData.length / itemsPerPage);
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const currentExpenses = expensesData.slice(startIdx, endIdx);

    const goToPage = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    // Helper for pagination numbers with ellipsis
    const getPageNumbers = () => {
        const pages = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, '...', totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }
        return pages;
    };

    // Reset to first page when itemsPerPage changes
    React.useEffect(() => {
        setCurrentPage(1);
    }, [itemsPerPage]);

    return (
        <div className="flex flex-col gap-10 w-full h-auto pr-20 py-10">
            {/* Header section */}
            <div className="flex flex-row gap-5 justify-between items-center">
                <h1 className="figtree text-[35px] font-[700]">Expenses</h1>
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

            {/* bar chart and pie chart section */}

            <div className="flex flex-row gap-8">
                <div
                    className="w-[741px] h-[426px] bg-[#FFFFFF] rounded-[10px]"
                    style={{
                        boxShadow: "4px 4px 4px #0000001A",
                    }}
                >
                    <CashflowChart />
                </div>
                <div
                    className="w-[349px] h-[426px] bg-[#FFFFFF] flex flex-col justify-center items-center rounded-[10px] px-10 py-5"
                    style={{
                        boxShadow: "4px 4px 4px #0000001A",
                    }}
                >
                    <div className="w-full flex flex-row justify-between items-center ">
                        <h2 className="text-[24px] font-bold mb-2 w-full text-left">
                            Expenses Breakdown
                        </h2>

                        <img src={dotThree} />
                    </div>

                    <ExpensesPieChart />
                </div>
            </div>

            {/* end */}

            {/* Transaction table */}
            <div
                className="w-full h-auto bg-[#FFFFFF] rounded-[10px] px-10 py-10"
                style={{
                    boxShadow: "4px 4px 4px #0000001A",
                }}
            >
                {/* card header */}
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
                            <input
                                type="text"
                                className="w-full outline-none bg-transparent shadow-none focus:ring-0 border-none placeholder:text-[#7B7B7ACC]"
                                placeholder="Status"
                            />
                            <img src={miniDownArrow} />
                        </div>
                        <div className="w-[139px] h-[35px] bg-[#F3F3F3] rounded-[6px] flex flex-row items-center justify-between py-2 px-5">
                            <img src={calendar} className="size-[17px]" />
                            <input
                                type="text"
                                className="w-full outline-none bg-transparent shadow-none focus:ring-0 border-none placeholder:text-[#7B7B7ACC]"
                                placeholder="25th May"
                            />
                            <img src={miniDownArrow} />
                        </div>
                        <button className="w-[125px] h-[35px] bg-[#0955AC] text-[14px] rounded-[6px] text-[#FFFFFF] font-[700] flex justify-center items-center gap-3">
                            <img src={downloadLogo} />
                            <h1>Download</h1>
                        </button>
                    </div>
                </div>
                {/* end */}

                {/* expenses table */}
                {/* table headings */}
                <div className="figtree grid grid-cols-9 bg-[#D8E4F2] h-[42px] justify-center items-center rounded-[8px] text-[14px] font-[600] px-10 mt-10">
                    <div className="flex flex-row gap-5 items-center col-span-2">
                        <input
                            type="checkbox"
                            className="size-[20px] rounded-[4px] bg-[#CCCCCC73]"
                        />
                        <h1>Expenses</h1>
                        <div className="flex flex-col justify-center items-center">
                            <img src={miniUp} className="w-[6px] h-[4px]" />
                            <img src={miniDown} className="w-[6px] h-[4px]" />
                        </div>
                    </div>
                    <div className="flex flex-row gap-2 items-center col-span-2">
                        <h1>Category</h1>
                        <div className="flex flex-col justify-center items-center">
                            <img src={miniUp} className="w-[6px] h-[4px]" />
                            <img src={miniDown} className="w-[6px] h-[4px]" />
                        </div>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                        <h1>Quantity</h1>
                        <div className="flex flex-col justify-center items-center">
                            <img src={miniUp} className="w-[6px] h-[4px]" />
                            <img src={miniDown} className="w-[6px] h-[4px]" />
                        </div>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                        <h1>Amount</h1>
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
                    <div className="flex flex-row gap-2 items-center">
                        <h1>Status</h1>
                        <div className="flex flex-col justify-center items-center">
                            <img src={miniUp} className="w-[6px] h-[4px]" />
                            <img src={miniDown} className="w-[6px] h-[4px]" />
                        </div>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                        <h1>Action</h1>
                        <div className="flex flex-col justify-center items-center">
                            <img src={miniUp} className="w-[6px] h-[4px]" />
                            <img src={miniDown} className="w-[6px] h-[4px]" />
                        </div>
                    </div>
                </div>
                {/* end */}

                {/* expenses rows */}
                {currentExpenses.map((expense, idx) => (
                    <div
                        key={expense.name + startIdx + idx}
                        className="grid grid-cols-9 text-[15px] font-[500] px-10 h-[100px] border-b-[1.5px] border-[#00000033] items-center"
                    >
                        <div className="flex flex-row gap-5 col-span-2">
                            <input
                                type="checkbox"
                                className="size-[20px] rounded-[4px] bg-[#CCCCCC73]"
                            />
                            <h1>{expense.name}</h1>
                        </div>
                        <div className={`col-span-2`}>
                            <div
                                className={` ${expense.category.width} h-[20px] bg-[#E8E8E8] rounded-[4px] text-[10px] flex flex-row justify-start items-center gap-3 px-2`}
                            >
                                <div
                                    className="size-[10px] rounded-[2px]"
                                    style={{
                                        backgroundColor: expense.category.color,
                                    }}
                                ></div>
                                <h1>{expense.category.label}</h1>
                            </div>
                        </div>
                        <div className="">{expense.quantity}</div>
                        <div>{expense.amount}</div>
                        <div>{expense.date}</div>
                        <div>
                            <div
                                className="w-[72px] h-[20px] border-[1.5px] text-[10px] flex justify-center items-center rounded-[4px]"
                                style={{
                                    borderColor: expense.status.border,
                                    background: expense.status.bg,
                                    color: expense.status.text,
                                }}
                            >
                                {expense.status.label}
                            </div>
                        </div>
                        <div className="flex flex-row justify-center items-center gap-2">
                            <div className="w-[54px] h-[20px] border-[1px] border-[#0955AC] rounded-[4px] text-[10px] text-[#0955AC] font-500 flex justify-center items-center cursor-pointer">
                                Edit
                            </div>
                            <div className="w-[54px] h-[20px] border-[1px] border-[#FF0000] rounded-[4px] text-[10px] text-[#FF0000] font-500 flex justify-center items-center cursor-pointer">
                                Delete
                            </div>
                        </div>
                    </div>
                ))}
                {/* end */}

                {/* Pagination Controls and Results per page inline */}
                <div className="flex justify-between items-center gap-2 mt-20">
                    {/* Left: Results per page */}
                    <div className="flex items-center">
                        <span className="mr-3 text-[#00000080] text-[15px]">Results per page</span>
                        <select
                            className="rounded px-3 py-1 font-[600] text-[16px] bg-[#F4F3F3] border-[1px] border-[#BEBEBE] w-[71px] h-[40px] focus:outline-none"
                            value={itemsPerPage}
                            onChange={e => setItemsPerPage(Number(e.target.value))}
                        >
                            {perPageOptions.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </div>
                    {/* Right: Pagination */}
                    <div className="flex items-center gap-2">
                        <button
                            className="px-3 py-1 size-[40px] rounded-[4px] bg-[#F4F3F3] disabled:opacity-50"
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <span className="text-lg">&#60;</span>
                        </button>
                        {getPageNumbers().map((num, idx) =>
                            num === '...'
                                ? <span key={idx} className="px-2">...</span>
                                : <button
                                    key={num}
                                    className={`px-3 py-1 text-[16px] font-[600] rounded-[4px] size-[40px] bg-[#F4F3F3] ${currentPage === num ? ' text-[#0955AC] font-[600] border-[2px] border-[#0955AC]' : 'bg-[#F4F3F3]'}`}
                                    onClick={() => goToPage(num)}
                                >
                                    {num}
                                </button>
                        )}
                        <button
                            className="px-3 py-1 size-[40px] rounded-[4px] bg-[#F4F3F3] disabled:opacity-50"
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            <span className="text-lg">&#62;</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExpensesContent;

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

const PaymentContent = () => {
    const transactions = [
        {
            id: "JV-L001",
            client: "Bob Smith",
            car: "Tucson Hyundai",
            rentPerDay: "$100",
            days: "03",
            amount: "$100",
            dueDate: "2025.08.10",
            status: "Completed",
            statusColor: "#50AE31",
            statusBg: "#6DB4464D",
        },
        {
            id: "JV-L002",
            client: "Alice Jhonson",
            car: "Tucson Hyundai",
            rentPerDay: "$2000",
            days: "04",
            amount: "$2000",
            dueDate: "2025.08.10",
            status: "Pending",
            statusColor: "#F0BB0D",
            statusBg: "#FFCD294D",
        },
        {
            id: "JV-L003",
            client: "Alice Jhonson",
            car: "Tucson Hyundai",
            rentPerDay: "$2000",
            days: "04",
            amount: "$2000",
            dueDate: "2025.08.10",
            status: "Pending",
            statusColor: "#F0BB0D",
            statusBg: "#FFCD294D",
        },
        {
            id: "JV-L004",
            client: "Bob Smith",
            car: "Tucson Hyundai",
            rentPerDay: "$100",
            days: "03",
            amount: "$100",
            dueDate: "2025.08.10",
            status: "Completed",
            statusColor: "#50AE31",
            statusBg: "#6DB4464D",
        },
        {
            id: "JV-L005",
            client: "Bob Smith",
            car: "Tucson Hyundai",
            rentPerDay: "$100",
            days: "03",
            amount: "$100",
            dueDate: "2025.08.10",
            status: "Completed",
            statusColor: "#50AE31",
            statusBg: "#6DB4464D",
        },
        {
            id: "JV-L006",
            client: "Bob Smith",
            car: "Tucson Hyundai",
            rentPerDay: "$100",
            days: "03",
            amount: "$100",
            dueDate: "2025.08.10",
            status: "Completed",
            statusColor: "#50AE31",
            statusBg: "#6DB4464D",
        },
        {
            id: "JV-L007",
            client: "Bob Smith",
            car: "Tucson Hyundai",
            rentPerDay: "$100",
            days: "03",
            amount: "$100",
            dueDate: "2025.08.10",
            status: "Completed",
            statusColor: "#50AE31",
            statusBg: "#6DB4464D",
        },
        {
            id: "JV-L008",
            client: "Bob Smith",
            car: "Tucson Hyundai",
            rentPerDay: "$100",
            days: "03",
            amount: "$100",
            dueDate: "2025.08.10",
            status: "Completed",
            statusColor: "#50AE31",
            statusBg: "#6DB4464D",
        },
        {
            id: "JV-L009",
            client: "Bob Smith",
            car: "Tucson Hyundai",
            rentPerDay: "$100",
            days: "03",
            amount: "$100",
            dueDate: "2025.08.10",
            status: "Completed",
            statusColor: "#50AE31",
            statusBg: "#6DB4464D",
        },
        {
            id: "JV-L0010",
            client: "Bob Smith",
            car: "Tucson Hyundai",
            rentPerDay: "$100",
            days: "03",
            amount: "$100",
            dueDate: "2025.08.10",
            status: "Completed",
            statusColor: "#50AE31",
            statusBg: "#6DB4464D",
        },
        {
            id: "JV-L0011",
            client: "Bob Smith",
            car: "Tucson Hyundai",
            rentPerDay: "$100",
            days: "03",
            amount: "$100",
            dueDate: "2025.08.10",
            status: "Completed",
            statusColor: "#50AE31",
            statusBg: "#6DB4464D",
        },
        {
            id: "JV-L0012",
            client: "Bob Smith",
            car: "Tucson Hyundai",
            rentPerDay: "$100",
            days: "03",
            amount: "$100",
            dueDate: "2025.08.10",
            status: "Completed",
            statusColor: "#50AE31",
            statusBg: "#6DB4464D",
        },
        {
            id: "JV-L0013",
            client: "Bob Smith",
            car: "Tucson Hyundai",
            rentPerDay: "$100",
            days: "03",
            amount: "$100",
            dueDate: "2025.08.10",
            status: "Completed",
            statusColor: "#50AE31",
            statusBg: "#6DB4464D",
        },
        {
            id: "JV-L0014",
            client: "Bob Smith",
            car: "Tucson Hyundai",
            rentPerDay: "$100",
            days: "03",
            amount: "$100",
            dueDate: "2025.08.10",
            status: "Completed",
            statusColor: "#50AE31",
            statusBg: "#6DB4464D",
        },
        {
            id: "JV-L0015",
            client: "Bob Smith",
            car: "Tucson Hyundai",
            rentPerDay: "$100",
            days: "03",
            amount: "$100",
            dueDate: "2025.08.10",
            status: "Completed",
            statusColor: "#50AE31",
            statusBg: "#6DB4464D",
        },
        
    ];
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [selectedRows, setSelectedRows] = useState(new Set());
    const perPageOptions = [5, 10, 20, 50];
    const totalPages = Math.ceil(transactions.length / itemsPerPage);
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const currentTransactions = transactions.slice(startIdx, endIdx);

    const goToPage = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

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

    const handleRowSelection = (rowIndex) => {
        const actualIndex = startIdx + rowIndex;
        const newSelectedRows = new Set(selectedRows);
        
        if (newSelectedRows.has(actualIndex)) {
            newSelectedRows.delete(actualIndex);
        } else {
            newSelectedRows.add(actualIndex);
        }
        
        setSelectedRows(newSelectedRows);
    };

    const handleSelectAll = () => {
        if (selectedRows.size === currentTransactions.length) {
            setSelectedRows(new Set());
        } else {
            const allCurrentIndices = currentTransactions.map((_, index) => startIdx + index);
            setSelectedRows(new Set(allCurrentIndices));
        }
    };

    React.useEffect(() => {
        setCurrentPage(1);
    }, [itemsPerPage]);

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

            <div
                className="w-full h-auto bg-[#FFFFFF] rounded-[10px] px-10 py-10"
                style={{
                    boxShadow: "4px 4px 4px #0000001A",
                }}
            >
                {/* card header */}
                <div className="flex flex-row justify-between">
                    <h1 className="text-[24px] font-[700]">Recent Transactions</h1>
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
                    <div className="flex flex-row gap-3 items-center">
                        <input
                            type="checkbox"
                            className="size-[20px] rounded-[4px] bg-[#CCCCCC73]"
                            checked={selectedRows.size === currentTransactions.length && currentTransactions.length > 0}
                            onChange={handleSelectAll}
                        />
                        <h1>Invoice Id</h1>
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
                    <div className="flex flex-row gap-2 items-center ml-5">
                        <h1>Rent Per Day</h1>
                        <div className="flex flex-col justify-center items-center">
                            <img src={miniUp} className="w-[6px] h-[4px]" />
                            <img src={miniDown} className="w-[6px] h-[4px]" />
                        </div>
                    </div>
                    <div className="flex flex-row gap-2 items-center ml-10">
                        <h1>Days</h1>
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
                        <h1>DueDate</h1>
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
                {currentTransactions.map((txn, idx) => (
                    <div
                        key={startIdx + idx}
                        className="grid grid-cols-9 h-[100px] justify-center items-center text-[15px] font-[500] px-10 border-b-[1.5px] border-[#00000033]"
                        style={{
                            backgroundColor: selectedRows.has(startIdx + idx) ? '#CCCCCC4F' : 'transparent'
                        }}
                    >
                        <div className="flex flex-row items-center gap-5">
                            <input
                                type="checkbox"
                                className="size-[20px] rounded-[4px] bg-[#CCCCCC73]"
                                checked={selectedRows.has(startIdx + idx)}
                                onChange={() => handleRowSelection(idx)}
                            />
                            <h1>{txn.id}</h1>
                        </div>
                        <div className="">{txn.client}</div>
                        <div>{txn.car}</div>
                        <div className="ml-5">{txn.rentPerDay}</div>
                        <div className="ml-10">{txn.days}</div>
                        <div>{txn.amount}</div>
                        <div>{txn.dueDate}</div>
                        <div>
                            <div
                                className="w-[72px] h-[20px] text-[10px] font-[700] rounded-[4px] flex justify-center items-center"
                                style={{
                                    border: `1px solid ${txn.statusColor}`,
                                    background: txn.statusBg,
                                    color: txn.statusColor,
                                }}
                            >
                                {txn.status}
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

export default PaymentContent;

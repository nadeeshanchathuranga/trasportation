import React, { useState } from "react";
import { router, usePage, Link } from "@inertiajs/react";
import downArrow from "../assets/rentAVehicle/header/downArrow.png";

const Header = () => {
    const { auth } = usePage().props;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = (e) => {
        e.preventDefault();
        router.post("/logout");
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="relative z-20 w-full h-auto py-[5px] sm:py-[10px] bg-white shadow-md">
            <div className="poppins font-[500] px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-4 flex items-center justify-between">
                {/* Logo */}
                <div
                    onClick={() => router.visit("/")}
                    className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[25px] font-[700] text-black text-center cursor-pointer hover:text-[#0955AC] transition-colors"
                >
                    COMPANY <br />
                    <span className="text-[#0955AC]">LOGO</span>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={toggleMobileMenu}
                    className="md:hidden p-1 sm:p-2 text-gray-600 hover:text-[#0955AC] focus:outline-none"
                >
                    <svg
                        className="w-5 h-5 sm:w-6 sm:h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        {isMobileMenuOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        )}
                    </svg>
                </button>

                {/* Navigation */}
                <nav className={`${isMobileMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row absolute md:relative top-full left-0 right-0 md:top-auto bg-white md:bg-transparent shadow-lg md:shadow-none p-3 sm:p-4 md:p-0 items-start md:items-center justify-center space-y-3 sm:space-y-4 md:space-y-0 md:space-x-4 lg:space-x-8 xl:space-x-12 text-[#00000080] text-[14px] sm:text-[15px] cursor-pointer w-full md:w-auto`}>
                    <a
                        href="#"
                        className="hover:text-[#0955AC] flex items-center h-full w-full md:w-auto"
                    >
                        About Us
                    </a>
                    <a
                        href="#"
                        className="text-[#0955AC] border-b-[6px] border-[#0955AC] flex items-center h-full gap-1 w-full md:w-auto"
                    >
                        Rent a Vehicle{" "}
                        <img
                            src={downArrow}
                            alt="dropdown"
                            className="w-[8px] h-[5px]"
                        />
                    </a>
                    <a
                        href="#"
                        className="hover:text-[#0955AC] flex items-center h-full gap-1 w-full md:w-auto"
                    >
                        Book a Ticket{" "}
                        <img
                            src={downArrow}
                            alt="dropdown"
                            className="w-[8px] h-[5px]"
                        />
                    </a>
                    <div className="relative group">
                        <Link
                            href="/courier-service"
                            className="hover:text-[#0955AC] flex items-center h-full gap-1 w-full md:w-auto"
                        >
                            Courier Service{" "}
                            <img
                                src={downArrow}
                                alt="dropdown"
                                className="w-[8px] h-[5px]"
                            />
                        </Link>
                        <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                            <Link
                                href="/track"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#0955AC]"
                            >
                                Track Courier
                            </Link>
                            <Link
                                href="/couriers/create"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#0955AC]"
                            >
                                Book Courier
                            </Link>
                        </div>
                    </div>
                    <a
                        href="#"
                        className="hover:text-[#0955AC] flex items-center h-full w-full md:w-auto"
                    >
                        Drivers
                    </a>
                    <a
                        href="#"
                        className="hover:text-[#0955AC] flex items-center h-full w-full md:w-auto"
                    >
                        Our Services
                    </a>
                    <a
                        href="#"
                        className="hover:text-[#0955AC] flex items-center h-full w-full md:w-auto"
                    >
                        FAQ
                    </a>
                    <a
                        href="#"
                        className="hover:text-[#0955AC] flex items-center h-full w-full md:w-auto"
                    >
                        Contact Us
                    </a>
                </nav>

                {/* Right Side (User Action Buttons) */}
                <div className="hidden md:flex items-center space-x-2 lg:space-x-3 xl:space-x-4">
                    {auth?.user ? (
                        <>
                            {/* Dashboard Links Based on Role */}
                            {auth.user.role_type === "driver" && (
                                <Link
                                    href="/driver/dashboard"
                                    className="bg-yellow-600 hover:bg-yellow-700 px-2 md:px-3 lg:px-4 py-2 rounded text-white text-[9px] md:text-[10px] lg:text-[12px] font-medium"
                                >
                                    Driver Dashboard
                                </Link>
                            )}

                            {auth.user.role_type === "user" && (
                                <Link
                                    href="/user/view"
                                    className="bg-yellow-600 hover:bg-yellow-700 px-2 md:px-3 lg:px-4 py-2 rounded text-white text-[9px] md:text-[10px] lg:text-[12px] font-medium"
                                >
                                    User Dashboard
                                </Link>
                            )}

                            {["admin", "superadmin"].includes(
                                auth.user.role_type
                            ) && (
                                <Link
                                    href="/admin"
                                    className="rounded-[9px] bg-[#0955AC] border-[2px] border-[#0955AC] px-2 md:px-3 lg:px-4 py-2 text-white text-[8px] md:text-[9px] lg:text-[10px] font-[700] text-center"
                                >
                                    Admin Dashboard
                                </Link>
                            )}

                            {auth.user.role_type === "freight" && (
                                <Link
                                    href="/freight/dashboard"
                                    className="rounded-[9px] bg-[#0955AC] border-[2px] border-[#0955AC] px-2 md:px-3 lg:px-4 py-2 text-white text-[8px] md:text-[9px] lg:text-[10px] font-[700] text-center"
                                >
                                    Freight Dashboard
                                </Link>
                            )}

                            {/* Profile Initial */}
                            <div className="flex items-center gap-1 lg:gap-2 cursor-pointer">
                                <div className="h-[22px] w-[22px] md:h-[24px] md:w-[24px] lg:h-[28px] lg:w-[28px] border-[1px] border-black rounded-full flex justify-center items-center text-[11px] md:text-[12px] lg:text-[14px]">
                                    {auth.user.name.charAt(0).toUpperCase()}
                                </div>
                                <img
                                    src={downArrow}
                                    alt="dropdown"
                                    className="w-[8px] h-[5px]"
                                />
                            </div>

                            {/* Logout */}
                            <button
                                onClick={handleLogout}
                                className="bg-red-700 w-[80px] md:w-[90px] lg:w-[105px] h-[35px] md:h-[40px] lg:h-[45px] hover:bg-red-700 px-2 md:px-3 lg:px-4 py-2 rounded-[9px] text-white text-[9px] md:text-[10px] lg:text-[12px] font-[700]"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="h-[35px] md:h-[40px] lg:h-[45px] border-[2px] border-[#0955AC] rounded-[9px] hover:bg-[#0955AC] px-2 md:px-3 lg:px-4 py-2 text-[#0955AC] text-[9px] md:text-[10px] lg:text-[12px] font-[700] hover:text-[white] flex justify-center items-center"
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="bg-[#0955AC] h-[35px] md:h-[40px] lg:h-[45px] rounded-[9px] border-[2px] border-[#0955AC] px-2 md:px-3 lg:px-4 py-2 text-white font-[700] text-[9px] md:text-[10px] lg:text-[12px] flex justify-center items-center"
                            >
                                Register
                            </Link>
                            <Link
                                href="/freight/register"
                                className="rounded-[9px] bg-[#0955AC] border-[2px] border-[#0955AC] px-2 md:px-3 lg:px-4 py-2 text-white text-[8px] md:text-[9px] lg:text-[10px] font-[700] text-center h-[50px] md:h-[55px] lg:h-[65px] flex justify-center items-center"
                            >
                                Register as <br/>Freight
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile User Actions */}
                <div className="md:hidden flex items-center space-x-1 sm:space-x-2">
                    {auth?.user ? (
                        <div className="flex items-center gap-1 sm:gap-2">
                            <div className="h-[24px] w-[24px] sm:h-[28px] sm:w-[28px] border-[1px] border-black rounded-full flex justify-center items-center text-[12px] sm:text-[14px]">
                                {auth.user.name.charAt(0).toUpperCase()}
                            </div>
                            <button
                                onClick={handleLogout}
                                className="bg-red-700 px-2 sm:px-3 py-1 rounded-[9px] text-white text-[9px] sm:text-[10px] font-[700]"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-1 sm:space-x-2">
                            <Link
                                href="/login"
                                className="border-[2px] border-[#0955AC] rounded-[9px] px-2 sm:px-3 py-1 text-[#0955AC] text-[9px] sm:text-[10px] font-[700] whitespace-nowrap"
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="bg-[#0955AC] rounded-[9px] border-[2px] border-[#0955AC] px-2 sm:px-3 py-1 text-white text-[9px] sm:text-[10px] font-[700] whitespace-nowrap"
                            >
                                Register
                            </Link>
                            <Link
                                href="/freight/register"
                                className="bg-[#0955AC] rounded-[9px] border-[2px] border-[#0955AC] px-2 sm:px-3 py-1 text-white text-[9px] sm:text-[10px] font-[700] whitespace-nowrap"
                            >
                                Freight
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;

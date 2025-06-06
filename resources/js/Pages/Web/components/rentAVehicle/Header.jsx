import React from 'react';
import { router } from '@inertiajs/react';

import downArrow from "../../assets/rentAVehicle/header/downArrow.png"

const Header = () => {
  return (
    <header className="relative z-20 w-full h-[120px] py-[10px] bg-white shadow-md">
      <div className="poppins font-[500] px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => router.visit('/')} 
          className="text-[25px] font-[700] text-black text-center cursor-pointer hover:text-[#0955AC] transition-colors"
        >
          COMPANY <br/> <span className="text-[#0955AC]">LOGO</span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center justify-center space-x-12 text-[#00000080] text-[15px] cursor-pointer w-full">
          <a href="#" className="hover:text-[#0955AC] flex items-center h-full">About Us</a>
          <a href="#" className="text-[#0955AC] border-b-[6px] border-[#0955AC] flex items-center h-full gap-1">Rent a Vehicle <img src={downArrow} alt="dropdown" className="w-[8px] h-[5px]" /></a>
          <a href="#" className="hover:text-[#0955AC] flex items-center h-full gap-1">Book a Ticket <img src={downArrow} alt="dropdown" className="w-[8px] h-[5px]" /></a>
          <a href="#" className="hover:text-[#0955AC] flex items-center h-full gap-1">Courier Service <img src={downArrow} alt="dropdown" className="w-[8px] h-[5px]" /></a>
          <a href="#" className="hover:text-[#0955AC] flex items-center h-full">Drivers</a>
          <a href="#" className="hover:text-[#0955AC] flex items-center h-full">Our Services</a>
          <a href="#" className="hover:text-[#0955AC] flex items-center h-full">FAQ</a>
          <a href="#" className="hover:text-[#0955AC] flex items-center h-full">Contact Us</a>
        </nav>

        {/* Login/Register/User Icon */}
        <div className="flex items-center space-x-4">
          <button className="border-[2px] border-[#0955AC] text-[#0955AC] px-4 py-1 md:w-[105px] md:h-[45px] rounded-[9px] hover:bg-[#0955AC] hover:text-white text-[15px] font-[700] cursor-pointer">LOGIN</button>
          <button className="bg-[#0955AC] md:w-[105px] md:h-[45px] text-white px-4 py-1 rounded-[9px] hover:bg-[#0955AC] text-[15px] font-[700] cursor-pointer">REGISTER</button>
          {/* User Icon Placeholder */}
          <div className="flex items-center gap-1">
            <div className="h-[28px] w-[28px] border-[1px] border-black rounded-full"></div>
            <img src={downArrow} alt="dropdown" className="w-[8px] h-[5px]" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 
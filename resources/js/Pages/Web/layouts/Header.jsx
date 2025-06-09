import React from 'react';
import { router, usePage, Link } from '@inertiajs/react';
import downArrow from "../assets/rentAVehicle/header/downArrow.png";

const Header = () => {
  const { auth } = usePage().props;

  const handleLogout = (e) => {
    e.preventDefault();
    router.post('/logout');
  };

  return (
    <header className="relative z-20 w-full h-[120px] py-[10px] bg-white shadow-md">
      <div className="poppins font-[500] px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => router.visit('/')}
          className="text-[25px] font-[700] text-black text-center cursor-pointer hover:text-[#0955AC] transition-colors"
        >
          COMPANY <br /><span className="text-[#0955AC]">LOGO</span>
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

        {/* Right Side (User Action Buttons) */}
        <div className="flex items-center space-x-4">
          {auth?.user ? (
            <>
              {/* Dashboard Links Based on Role */}
              {auth.user.role_type === 'driver' && (
                <Link
                  href="/driver/dashboard"
                  className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded text-white font-medium"
                >
                  Driver Dashboard
                </Link>
              )}

              {auth.user.role_type === 'user' && (
                <Link
                  href="/user/view"
                  className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded text-white font-medium"
                >
                  User Dashboard
                </Link>
              )}

              {['admin', 'superadmin'].includes(auth.user.role_type) && (
                <Link
                  href="/admin"
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-medium"
                >
                  Admin Dashboard
                </Link>
              )}

              {auth.user.role_type === 'freight' && (
                <Link
                  href="/freight/dashboard"
                  className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-white font-medium"
                >
                  Freight Dashboard
                </Link>
              )}

              {/* Profile Initial */}
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="h-[28px] w-[28px] border border-black rounded-full flex items-center justify-center">
                  {auth.user.name.charAt(0).toUpperCase()}
                </div>
                <img src={downArrow} alt="dropdown" className="w-[8px] h-[5px]" />
              </div>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="bg-white w-[105px] h-[45px] hover:bg-red-700 px-4 py-2 rounded text-white font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className=" h-[45px] w-[105px] border-[2px] border-[#0955AC] rounded-[9px] hover:bg-[#0955AC] px-4 py-2 text-[#0955AC] text-[15px] font-[700] hover:text-[white] flex justify-center items-center"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-[#0955AC] w-[105px] h-[45px] rounded-[9px] border-[2px] border-[#0955AC] px-4 py-2 text-white font-[700] text-[15px] flex justify-center items-center"
              >
                Register
              </Link>
              <Link
                href="/freight/register"
                className="rounded-[9px] bg-[#0955AC] border-[2px] border-[#0955AC] px-4 py-2 text-white text-[10px] font-[700] text-center h-[45px] w-[105]"
              >
                Register as Freight
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

import React from 'react';
import { router, usePage } from '@inertiajs/react';

import downArrow from "../assets/rentAVehicle/header/downArrow.png"

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
          {auth?.user ? (
            <>
              {/* User Dashboard Links based on role */}
              {auth.user.role_type === 'driver' && (
                <button 
                  onClick={() => router.visit('/driver/dashboard')}
                  className="bg-[#0955AC] text-white px-4 py-1 rounded-[9px] hover:bg-[#0955AC]/90 text-[15px] font-[700] cursor-pointer"
                >
                  Driver Dashboard
                </button>
              )}
              
              {auth.user.role_type === 'user' && (
                <button 
                  onClick={() => router.visit('/view')}
                  className="bg-[#0955AC] text-white px-4 py-1 rounded-[9px] hover:bg-[#0955AC]/90 text-[15px] font-[700] cursor-pointer"
                >
                  User Dashboard
                </button>
              )}
              
              {['admin', 'superadmin'].includes(auth.user.role_type) && (
                <button 
                  onClick={() => router.visit('/admin')}
                  className="bg-[#0955AC] text-white px-4 py-1 rounded-[9px] hover:bg-[#0955AC]/90 text-[15px] font-[700] cursor-pointer"
                >
                  Admin Dashboard
                </button>
              )}
              
              {auth.user.role_type === 'freight' && (
                <button 
                  onClick={() => router.visit('/freight/dashboard')}
                  className="bg-[#0955AC] text-white px-4 py-1 rounded-[9px] hover:bg-[#0955AC]/90 text-[15px] font-[700] cursor-pointer"
                >
                  Freight Dashboard
                </button>
              )}

              {/* User Profile Dropdown */}
              <div className="flex items-center gap-1 cursor-pointer">
                <div className="h-[28px] w-[28px] border-[1px] border-black rounded-full flex items-center justify-center">
                  {auth.user.name.charAt(0).toUpperCase()}
                </div>
                <img src={downArrow} alt="dropdown" className="w-[8px] h-[5px]" />
              </div>

<<<<<<< HEAD
              {/* Logout Button */}
              <button 
                onClick={handleLogout}
                className="border-[2px] border-red-500 text-red-500 px-4 py-1 rounded-[9px] hover:bg-red-500 hover:text-white text-[15px] font-[700] cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => router.visit('/login')}
                className="border-[2px] border-[#0955AC] text-[#0955AC] px-4 py-1 md:w-[105px] md:h-[45px] rounded-[9px] hover:bg-[#0955AC] hover:text-white text-[15px] font-[700] cursor-pointer"
              >
                LOGIN
              </button>
              <button 
                onClick={() => router.visit('/register')}
                className="bg-[#0955AC] md:w-[105px] md:h-[45px] text-white px-4 py-1 rounded-[9px] hover:bg-[#0955AC]/90 text-[15px] font-[700] cursor-pointer"
              >
                REGISTER
              </button>
            </>
          )}
        </div>
=======

       {/* User Dashboard */}
  {auth.user.role_type === 'user' && (
    <Link
      href="/user/view"
      className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded text-white font-medium"
    >
      User Dashboard
    </Link>
  )}

  {/* Admin or Superadmin Dashboard */}
  {['admin', 'superadmin'].includes(auth.user.role_type) && (
    <Link
      href="/admin"
      className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-medium"
    >
      Admin Dashboard
    </Link>
  )}

            {/* Show freight company dashboard link if role is 'freight' */}
            {auth.user.role_type === 'freight' && (
              <Link
                href="/freight/dashboard"
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-medium"
              >
                Freight Dashboard
              </Link>
            )}


            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white font-medium"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-medium"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white font-medium"
            >
              Register
            </Link>
            <Link
              href="/freight/register"
              className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-white font-medium"
            >
              Register as Freight
            </Link>
          </>
        )}
>>>>>>> 12af4525e6c33eaf1044536fa13dc4fd15db7b4a
      </div>
=========
       <div className="space-x-4">
  {auth?.user ? (
    <>
      <span className="mr-2">Hello, {auth.user.name}</span>

      {/* ✅ Show driver dashboard link if role is 'driver' */}
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
          user Dashboard
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



      {/* You can add similar links for admin/vendor here if needed */}

      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white font-medium"
      >
        Logout
      </button>
    </>
  ) : (
    <>
      <Link
        href="/login"
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-medium"
      >
        Login
      </Link>
      <Link
        href="/register"
        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white font-medium"
      >
        Register
      </Link>
    </>
  )}
</div>


    </header>
  );
};

export default Header; 
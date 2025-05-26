import React from 'react';
import { Link, usePage, router } from '@inertiajs/react';

const Header = () => {
  const { auth } = usePage().props;

  const handleLogout = (e) => {
    e.preventDefault();
    router.post('/logout');
  };

  return (
    <header className="bg-gray-800 text-white py-4 px-6 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold">World 2025</h1>

      <div className="space-x-4">
        {auth?.user ? (
          <>
            <span className="mr-2">Hello, {auth.user.name}</span>
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

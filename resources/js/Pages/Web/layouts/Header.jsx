import React from 'react';
import { Link } from '@inertiajs/react';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white py-4 px-6 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold">  World 2025</h1>

      <div className="space-x-4">
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
      </div>
    </header>
  );
};

export default Header;

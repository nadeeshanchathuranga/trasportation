import React from 'react';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';

const HomePage = () => {
  return (
    <>
      <Header />

      <main className="px-6 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          Welcome Lead Dashboard
        </h1>

        <p className="text-center text-gray-600">
          Stay updated with contestant rankings, event highlights, and news from Hyderabad.
        </p>




  <div class="grid grid-cols-1 lg:grid-cols-5 gap-6">

    <aside class="lg:col-span-1 bg-white p-4 rounded shadow">
      <h2 class="font-bold text-lg mb-2">Vehicle Type</h2>
      <ul class="space-y-1">
        <li><input type="checkbox" /> <label>Economy</label></li>
        <li><input type="checkbox" /> <label>Standard</label></li>
        <li><input type="checkbox" /> <label>Luxury</label></li>
        <li><input type="checkbox" /> <label>Convertible</label></li>
        <li><input type="checkbox" /> <label>SUV</label></li>
        <li><input type="checkbox" /> <label>Minivan</label></li>
      </ul>

      <h2 class="font-bold text-lg mt-6 mb-2">Capacity</h2>
      <ul class="space-y-1">
        <li><input type="checkbox" /> <label>2 Seats</label></li>
        <li><input type="checkbox" /> <label>4 Seats</label></li>
        <li><input type="checkbox" /> <label>5 Seats</label></li>
        <li><input type="checkbox" /> <label>7 Seats</label></li>
      </ul>

      <h2 class="font-bold text-lg mt-6 mb-2">Price per Day</h2>
      <ul class="space-y-1">
        <li><input type="checkbox" /> <label>Under $25</label></li>
        <li><input type="checkbox" /> <label>$25 - $50</label></li>
        <li><input type="checkbox" /> <label>$50 - $75</label></li>
        <li><input type="checkbox" /> <label>$75 - $100</label></li>
        <li><input type="checkbox" /> <label>$100+</label></li>
      </ul>

      <h2 class="font-bold text-lg mt-6 mb-2">Mileage / KM</h2>
      <ul class="space-y-1">
        <li><input type="checkbox" /> <label>Unlimited</label></li>
        <li><input type="checkbox" /> <label>Limited</label></li>
      </ul>
    </aside>


    <main class="lg:col-span-4">

      <div class="bg-white p-4 rounded shadow mb-6 grid grid-cols-1 md:grid-cols-5 gap-4">
        <input type="text" placeholder="Pick-up Location" class="border rounded px-3 py-2 col-span-1" />
        <input type="date" class="border rounded px-3 py-2 col-span-1" />
        <input type="text" placeholder="Drop-off Location" class="border rounded px-3 py-2 col-span-1" />
        <input type="date" class="border rounded px-3 py-2 col-span-1" />
        <button class="bg-blue-600 text-white px-4 py-2 rounded col-span-1">Search</button>
      </div>


      <div class="mb-4 text-xl font-semibold">
        We found <span class="text-blue-600 font-bold">423 cars</span> for you
      </div>


      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

        <div class="bg-white rounded shadow p-4 text-center">
          <img src="https://www.hyundaiusa.com/images/vehicles/2022/tucson/overview/2022-Hyundai-Tucson-SEL-Silver.png" alt="Car" class="mx-auto h-40 object-contain mb-4"/>
          <h3 class="font-bold text-lg">HYUNDAI TUCSON</h3>
          <p class="text-gray-600 font-semibold text-xl mt-2 mb-4">$89.00</p>
          <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium">Rent Now</button>
        </div>

     
        <div class="bg-white rounded shadow p-4 text-center">
          <img src="https://www.hyundaiusa.com/images/vehicles/2022/tucson/overview/2022-Hyundai-Tucson-SEL-Silver.png" alt="Car" class="mx-auto h-40 object-contain mb-4"/>
          <h3 class="font-bold text-lg">HYUNDAI TUCSON</h3>
          <p class="text-gray-600 font-semibold text-xl mt-2 mb-4">$89.00</p>
          <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium">Rent Now</button>
        </div>


      </div>
    </main>
  </div>

  </main>

      <Footer />
    </>
  );
};

export default HomePage;

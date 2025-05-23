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
      </main>

      <Footer />
    </>
  );
};

export default HomePage;

import React, { useState } from "react";
import { router } from "@inertiajs/react";
import Header from "../layouts/Header";
import HeroSection from "../components/rentAVehicle/HeroSection";
import RentByBrands from "../components/rentAVehicle/RentByBrands";
import RentByBodyType from "../components/rentAVehicle/RentByBodyType";
import VehicleCollection from "../components/rentAVehicle/VehicleCollection";
import PopularRentals from "../components/rentAVehicle/PopularRentals";
import HowItWorks from "../components/rentAVehicle/HowItWorks";
import Footer from "../layouts/Footer";
import bg from "../assets/rentAVehicle/bg/bg.png";
import "../../../../css/app.css";

const HomePage = ({ auth }) => {
    const [formData, setFormData] = useState({
        pickupLocation: "",
        pickupDate: "",
        dropoffLocation: "",
        dropoffDate: "",
    });

    const handleFormChange = (newData) => {
        setFormData(newData);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!auth || !auth.user) {
            alert("You must be registered and logged in to find a vehicle.");
            window.location.href = "/register";
            return;
        }
        router.visit("/couriers", {
            data: { 
                searchParams: formData,
                method: 'get'
            }
        });
    };

    return (
        <div
            className="relative w-full min-h-screen"
            style={{
                backgroundImage: `url(${bg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <Header />
            <HeroSection
                formData={formData}
                onFormChange={handleFormChange}
                onSubmit={handleFormSubmit}
            />
            <RentByBrands />
            <RentByBodyType />
            <VehicleCollection />
            <PopularRentals />
            <HowItWorks />
            <Footer />
        </div>
    );
};

export default HomePage;

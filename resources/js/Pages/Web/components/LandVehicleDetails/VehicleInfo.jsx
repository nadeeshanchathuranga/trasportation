import React, { useState } from "react";

import ReviewSection from "../vehicleDetails/ReviewSection";

import wishlist from "../../assets/landVehicleDetails/whishlist.svg";
import share from "../../assets/landVehicleDetails/share.svg";
import star from "../../assets/driverBooking/star.svg";

import miles from "../../assets/landVehicleDetails/carSpec/miles.svg";
import fuel from "../../assets/landVehicleDetails/carSpec/fuel.svg";
import gear from "../../assets/landVehicleDetails/carSpec/gear.svg";
import seats from "../../assets/landVehicleDetails/carSpec/seats.svg";
import model from "../../assets/landVehicleDetails/carSpec/model.svg";
import doors from "../../assets/landVehicleDetails/carSpec/doors.svg";
import airBag from "../../assets/landVehicleDetails/carSpec/airBag.svg";
import liters from "../../assets/landVehicleDetails/carSpec/liters.svg";

import proPic from "../../assets/landVehicleDetails/proPic.svg";
import tag from "../../assets/landVehicleDetails/tag.svg";
import car from "../../assets/landVehicleDetails/car.svg";

import starSec from "../../assets/landVehicleDetails/starsSec.svg";

const VehicleInfo = () => {
    const [selectedTab, setSelectedTab] = useState("car-details");
    return (
        <div className="poppins w-full h-auto">
            <h1 className="text-[12px] font-[600] text-[#00000080]">
                Lamborghini
            </h1>
            <div className="flex flex-col md:flex-row justify-between">
                <div className="flex flex-col md:flex-row gap-5">
                    <h1 className="bebas-neue text-[30px]">
                        Lamborghini <span className="text-[#0955AC]">urus</span>{" "}
                        (2020)
                    </h1>

                    <div className="flex flex-row items-center gap-2">
                        <div className="w-[10px] h-[10px] rounded-full bg-[#3C9A34]" />
                        <h1 className="text-[#3C9A34] text-[10px]">
                            Available
                        </h1>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-5">
                    <div className=" w-[81px] h-[25px] rounded-[4px] border-[1px] border-[#00000030] bg-[#EAE9E8] flex flex-row justify-center items-center gap-3">
                        <img src={share} />
                        <h1>Share</h1>
                    </div>
                    <div className=" w-[81px] h-[25px] rounded-[4px] border-[1px] border-[#00000030] bg-[#0000003B] flex flex-row justify-center items-center gap-3">
                        <img src={wishlist} />
                        <h1>Wishlist</h1>
                    </div>
                </div>
            </div>

            <div className="flex flex-row gap-5 text-[12px] font-[600]">
                <img src={star} />
                <h1>4.8</h1>
                <h1 className="underline">44 Reviews</h1>
            </div>

            <div className="py-10">
                <div className="flex flex-col md:flex-row md:gap-20 px-20 text-[12px] font-[600] text-[#00000080] border-b-[2px] border-[#0000001F]">
                    <h1
                        className={`border-b-[2px] pb-5 w-[92px] flex justify-center items-center cursor-pointer ${
                            selectedTab === "car-details"
                                ? "border-[#0955AC] text-[#0955AC]"
                                : ""
                        }`}
                        onClick={() => setSelectedTab("car-details")}
                    >
                        Car Details
                    </h1>
                    <h1
                        className={`border-b-[2px] pb-5 w-[92px] flex justify-center items-center cursor-pointer ${
                            selectedTab === "policies"
                                ? "border-[#0955AC] text-[#0955AC]"
                                : ""
                        }`}
                        onClick={() => setSelectedTab("policies")}
                    >
                        Policies
                    </h1>
                    <h1
                        className={`border-b-[2px] pb-5 w-[92px] flex justify-center items-center cursor-pointer ${
                            selectedTab === "reviews"
                                ? "border-[#0955AC] text-[#0955AC]"
                                : ""
                        }`}
                        onClick={() => setSelectedTab("reviews")}
                    >
                        Reviews
                    </h1>
                    <h1
                        className={`border-b-[2px] pb-5 w-[92px] flex justify-center items-center cursor-pointer ${
                            selectedTab === "gallery"
                                ? "border-[#0955AC] text-[#0955AC]"
                                : ""
                        }`}
                        onClick={() => setSelectedTab("gallery")}
                    >
                        Image Gallery
                    </h1>
                </div>
            </div>

            {/* Tab Content */}
            {selectedTab === "car-details" && (
                <>
                    <div className="flex flex-col gap-5">
                        <h1 className="text-[15px] font-[600]">Description</h1>
                        <p className="text-[14px]/[33px] font-[400] text-justify px-5">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Donec semper eu risus ut ornare. In bibendum
                            tempus sapien, tristique consectetur purus
                            pellentesque ac. Quisque facilisis laoreet feugiat.
                            Sed dapibus volutpat ex, eget iaculis nunc tincidunt
                            sit amet. Quisque congue sapien nec aliquet
                            faucibus. Morbi lectus eros, accumsan eget malesuada
                            et, fermentum eget nisl. Fusce vel placerat libero.
                            Integer convallis sodales libero, vitae tristique
                            massa hendrerit in.
                        </p>
                    </div>
                    {/*  Specs*/}
                    <div className="py-10">
                        <h1 className="text-[15px] font-[600]">
                            Car Specifications
                        </h1>
                        <div className="py-10 text-[12px] font-[700]">
                            <div className="flex flex-col justify-center items-center gap-10">
                                <div className="flex flex-col xl:flex-row gap-10 justify-center items-center">
                                    <div className="w-[187px] h-[81px] border-[1px] border-[#0000002B] bg-[#E7E6E6] rounded-[10px] flex flex-row justify-center items-center gap-5 px-5 py-5">
                                        <img src={miles} />
                                        <h1>62,500</h1>
                                    </div>
                                    <div className="w-[187px] h-[81px] border-[1px] border-[#0000002B] bg-[#E7E6E6] rounded-[10px] flex flex-row justify-center items-center gap-5 px-5 py-5">
                                        <img src={fuel} />
                                        <h1>Petrol</h1>
                                    </div>
                                    <div className="w-[187px] h-[81px] border-[1px] border-[#0000002B] bg-[#E7E6E6] rounded-[10px] flex flex-row justify-center items-center gap-5 px-5 py-5">
                                        <img src={gear} />
                                        <h1>Manual</h1>
                                    </div>
                                    <div className="w-[187px] h-[81px] border-[1px] border-[#0000002B] bg-[#E7E6E6] rounded-[10px] flex flex-row justify-center items-center gap-5 px-5 py-5">
                                        <img src={seats} />
                                        <h1>05 Seats</h1>
                                    </div>
                                </div>
                                <div className="flex flex-col xl:flex-row justify-center items-center gap-10">
                                    <div className="w-[187px] h-[81px] border-[1px] border-[#0000002B] bg-[#E7E6E6] rounded-[10px] flex flex-row justify-center items-center gap-5 px-5 py-5">
                                        <img src={airBag} />
                                        <h1>03 Air Bags</h1>
                                    </div>
                                    <div className="w-[187px] h-[81px] border-[1px] border-[#0000002B] bg-[#E7E6E6] rounded-[10px] flex flex-row justify-center items-center gap-5 px-5 py-5">
                                        <img src={model} />
                                        <h1>Lamborghini</h1>
                                    </div>
                                    <div className="w-[187px] h-[81px] border-[1px] border-[#0000002B] bg-[#E7E6E6] rounded-[10px] flex flex-row justify-center items-center gap-5 px-5 py-5">
                                        <img src={doors} />
                                        <h1>04 Doors</h1>
                                    </div>
                                    <div className="w-[187px] h-[81px] border-[1px] border-[#0000002B] bg-[#E7E6E6] rounded-[10px] flex flex-row justify-center items-center gap-5 px-5 py-5">
                                        <img src={liters} />
                                        <h1>3.5 L</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="poppins">
                        <h1 className="text-[20px] font-[600] mb-10">
                            Warranty
                        </h1>
                        <p className="text-[14px] font-[400]">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Donec semper eu risus ut ornare. In bibendum
                            tempus sapien,{" "}
                        </p>
                        <div className="flex flex-col justify-center gap-10 py-10">
                            {/* 1st row */}
                            <div className="flex flex-col md:flex-row lg:gap-40">
                                <div className="flex flex-row items-start gap-3">
                                    <img src={car} />
                                    <div className="flex flex-col gap-2 text-[14px]">
                                        <h1 className="font-[700]">
                                            Bumper - to - Bumper
                                        </h1>
                                        <h1 className="font-[400]">
                                            48 months / 50,000 miles
                                        </h1>
                                    </div>
                                </div>
                                <div className="flex flex-row items-start gap-3">
                                    <img src={car} />
                                    <div className="flex flex-col gap-2 text-[14px]">
                                        <h1 className="font-[700]">
                                            Bumper - to - Bumper
                                        </h1>
                                        <h1 className="font-[400]">
                                            48 months / 50,000 miles
                                        </h1>
                                    </div>
                                </div>
                            </div>

                            {/* 2nd row */}
                            <div className="flex flex-col md:flex-row lg:gap-40">
                                <div className="flex flex-row items-start gap-3">
                                    <img src={car} />
                                    <div className="flex flex-col gap-2 text-[14px]">
                                        <h1 className="font-[700]">
                                            Bumper - to - Bumper
                                        </h1>
                                        <h1 className="font-[400]">
                                            48 months / 50,000 miles
                                        </h1>
                                    </div>
                                </div>
                                <div className="flex flex-row items-start gap-3">
                                    <img src={car} />
                                    <div className="flex flex-col gap-2 text-[14px]">
                                        <h1 className="font-[700]">
                                            Bumper - to - Bumper
                                        </h1>
                                        <h1 className="font-[400]">
                                            48 months / 50,000 miles
                                        </h1>
                                    </div>
                                </div>
                            </div>

                            {/* 3rd row */}
                            <div className="flex flex-col md:flex-row lg:gap-40">
                                <div className="flex flex-row items-start gap-3">
                                    <img src={car} />
                                    <div className="flex flex-col gap-2 text-[14px]">
                                        <h1 className="font-[700]">
                                            Bumper - to - Bumper
                                        </h1>
                                        <h1 className="font-[400]">
                                            48 months / 50,000 miles
                                        </h1>
                                    </div>
                                </div>
                                <div className="flex flex-row items-start gap-3">
                                    <img src={car} />
                                    <div className="flex flex-col gap-2 text-[14px]">
                                        <h1 className="font-[700]">
                                            Bumper - to - Bumper
                                        </h1>
                                        <h1 className="font-[400]">
                                            48 months / 50,000 miles
                                        </h1>
                                    </div>
                                </div>
                            </div>

                            {/* 4th row */}
                            <div className="flex flex-col md:flex-row lg:gap-40">
                                <div className="flex flex-row items-start gap-3">
                                    <img src={car} />
                                    <div className="flex flex-col gap-2 text-[14px]">
                                        <h1 className="font-[700]">
                                            Bumper - to - Bumper
                                        </h1>
                                        <h1 className="font-[400]">
                                            48 months / 50,000 miles
                                        </h1>
                                    </div>
                                </div>
                                <div className="flex flex-row items-start gap-3">
                                    <img src={car} />
                                    <div className="flex flex-col gap-2 text-[14px]">
                                        <h1 className="font-[700]">
                                            Bumper - to - Bumper
                                        </h1>
                                        <h1 className="font-[400]">
                                            48 months / 50,000 miles
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="poppins w-full py-7">
                        <h1 className="text-[20px] font-[600] mb-10">
                            Owners Info
                        </h1>
                        <div className="flex flex-col md:flex-row justify-start items-center gap-20">
                            <div className="flex flex-col md:flex-row justify-start items-center gap-5">
                                <img src={proPic} />
                                <div className="flex flex-col items-start justify-center">
                                    <div className="flex flex-row gap-2 justify-center items-center">
                                        {" "}
                                        <h1 className="text-[15px] font-[700]">
                                            Steve Gibson
                                        </h1>
                                        <img src={tag} />
                                    </div>
                                    <div>
                                        <div className="flex flex-row gap-3 justify-center items-center">
                                            {" "}
                                            <img
                                                src={star}
                                                className="w-[16px]"
                                            />
                                            <h1 className="text-[14px] font-[400]">
                                                4.0
                                            </h1>
                                            <h1 className="text-[12px] font-[500] text-[#949699]">
                                                (180 Reviews)
                                            </h1>
                                        </div>
                                        <h1 className="text-[14px] font-[400] text-[#949699]">
                                            Joined 7 moths ago
                                        </h1>
                                    </div>
                                </div>
                            </div>
                            <div className="text-[9px] flex flex-col md:flex-row gap-4">
                                <div className="w-[123px] h-[29px] bg-[#0955AC] text-[#FFFFFF] font-[700] rounded-[5px] flex justify-center items-center cursor-pointer">
                                    CONTACT NUMBER
                                </div>
                                <div className="w-[123px] h-[29px] border-[1.5px] border-[#0955AC] bg-[#E8EBEF] text-[#0955AC] font-[700] rounded-[5px] flex justify-center items-center cursor-pointer">
                                    VIEW PROFILE
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
            {selectedTab === "policies" && (
                <>
                    <div className="poppins text-[14px] font-[400] text-justify p-3 md:p-0">
                        <h1 className="text-[20px] font-[600]">
                            Added Important Information
                        </h1>
                        <p className="pt-10">
                            This document contains the information you and
                            additional drivers need to know about your rental.
                            You should read this document together with the
                            rental terms and conditions. You can find a sample
                            of the rental terms and conditions by going
                            to www.avis.ch. If you received a booking
                            confirmation email it may contain a link to this
                            sample. Please note the sample rental terms and
                            conditions are an indication of the terms of the
                            contract and may not contain the exact terms you
                            will be asked to sign when you pick up the vehicle.
                        </p>
                        <p className="py-10">
                            It is important to us that you enjoy your experience
                            with us and have all the information you need. It
                            might take you a little time now but it could save
                            you time later.
                        </p>
                        <h1 className="text-[#F50505] font-[600] mb-2">
                            Important to Know
                        </h1>
                        <p>
                            The company that provides you with a rental vehicle
                            is Avis Budget Autovermietung AG, Hofwisenstrasse
                            36, 8153 Rümlang, CH. This may not be the same one
                            that you made your booking with. The prices in this
                            document are subject to change – but they’ll give
                            you a good idea of what to expect. For exact prices,
                            please contact the rental location or contact the
                            Reservations team. All prices include VAT, where
                            it’s charged.
                        </p>

                        <p className="text-[#F23E3E] mt-10">
                            To make a booking, change a booking or tell us about
                            an issue while you’re renting, contact the rental
                            station or the Reservations team:
                        </p>
                        <div className="flex flex-col gap-2 py-2">
                            <div className="flex flex-row gap-2 items-center">
                                <div className="w-[3px] h-[3px] bg-[#000000] rounded-full" />
                                <h1>
                                    Fill in the online form which can be found
                                    at www.avis.ch/en/ and click on “Contact Us”
                                </h1>
                            </div>
                            <div className="flex flex-row gap-2 items-center">
                                <div className="w-[3px] h-[3px] bg-[#000000] rounded-full" />
                                <h1>
                                    Call on 0848 81 18 18 (CHF 0.08 min), from
                                    outside Sri Lanka: +94 77 300 1234
                                </h1>
                            </div>
                            <div className="flex flex-row gap-2 items-center">
                                <div className="w-[3px] h-[3px] bg-[#000000] rounded-full" />
                                <h1>
                                    Lines are open 8.00 am to 6.00 pm CET,
                                    Monday to Friday.
                                </h1>
                            </div>
                        </div>

                        <div className="py-10">
                            <h1>
                                You will find the contact details for the rental
                                station on your rental agreement.
                            </h1>
                            <h1 className="text-[#F50505] mt-2">
                                To tell us about an issue after you’ve returned
                                the vehicle, please contact the customer service
                                team:
                            </h1>
                            <div className="flex flex-col gap-2 py-2">
                                <div className="flex flex-row gap-2 items-center">
                                    <div className="w-[3px] h-[3px] bg-[#000000] rounded-full" />
                                    <h1>Email: customer.service@avis.ch</h1>
                                </div>
                                <div className="flex flex-row gap-2 items-center">
                                    <div className="w-[3px] h-[3px] bg-[#000000] rounded-full" />
                                    <h1>
                                        Fill in the online form which can be
                                        found at www.avis.ch/en/ and click on
                                        “Contact Us”
                                    </h1>
                                </div>
                                <div className="flex flex-row gap-2 items-center">
                                    <div className="w-[3px] h-[3px] bg-[#000000] rounded-full" />
                                    <h1>
                                        Call on 044 809 19 01, from outside
                                        Switzerland: +41 (0) 44 809 19 01.
                                    </h1>
                                </div>
                                <div className="flex flex-row gap-2 items-center">
                                    <div className="w-[3px] h-[3px] bg-[#000000] rounded-full" />
                                    <h1>
                                        Lines are open 9.00 am to 5.00 pm CET,
                                        Monday to Friday.
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* 2 section */}
                    <div className="text-[14px] flex flex-col gap-8">
                        <div>
                            <h1 className="text-[20px] font-[600] pb-8">
                                Age Information
                            </h1>
                            <h1 className="text-[#F50505]">
                                How old do you need to be to drive a rental
                                vehicle?
                            </h1>

                            <p className="mt-2 mb-5">
                                To drive our vehicles, you – and all of your
                                drivers - need to be at least 21 years old and
                                have held a full, valid driving license for at
                                least ½ year at the start of your rental. Higher
                                as well as lower minimum age limits as well as a
                                minimum holding period of 3 years may apply to
                                certain vehicles.
                            </p>
                        </div>

                        <div>
                            <h1 className="text-[#F50505]">
                                How do you know if there are minimum age
                                restrictions on my rental?
                            </h1>

                            <p className="mt-2 mb-5">
                                When you book, you’ll be told if there are any
                                minimum age restrictions for the vehicle you
                                request. If you’re not sure, please check your
                                booking confirmation email – or call the
                                Reservations team.
                            </p>
                        </div>

                        <div>
                            <h1 className="text-[#F50505]">
                                If you under 25; do you need to pay a young
                                driver surcharge?
                            </h1>

                            <p className="mt-2">
                                If you – or any of your drivers – are under 25
                                when you pick up the vehicle, you will each have
                                to pay a young driver surcharge. The cost for
                                this will depend on where you’re picking the
                                vehicle up from – but you can expect it to be
                                between CHF 20.00 and CHF 24.00 per day.
                            </p>
                            <p className="">
                                If you rent the vehicle for more than 10 days,
                                you’ll only be charged for a maximum of 10 days
                                and get cover for the duration of your rental,
                                up to 28 days.
                            </p>
                        </div>

                        <div>
                            <h1 className="text-[#F50505]">
                                Maximum age restrictions
                            </h1>

                            <p className="mt-2">
                                As long as you hold a full, valid driving
                                licence for at least ½ year or 3 years with
                                regard to certain vehicles.
                            </p>
                        </div>

                        <div>
                            <h1 className="text-[20px] font-[600] mt-10 pb-8">
                                Driving license and ID requirements
                            </h1>
                            <h1 className="text-[#F50505]">
                                How old do you need to be to drive a rental
                                vehicle?
                            </h1>

                            <p className="mt-2 mb-10">
                                To drive our vehicles, you – and all of your
                                drivers - need to be at least 21 years old and
                                have held a full, valid driving licence for at
                                least ½ year at the start of your rental. Higher
                                as well as lower minimum age limits as well as a
                                minimum holding period of 3 years may apply to
                                certain vehicles.
                            </p>

                            <h1 className="text-[#F50505]">
                                How do you know if there are minimum age
                                restrictions on my rental?
                            </h1>

                            <p className="mt-2 mb-5">
                                When you book, you’ll be told if there are any
                                minimum age restrictions for the vehicle you
                                request. If you’re not sure, please check your
                                booking confirmation email – or call the
                                Reservations team.
                            </p>
                        </div>
                    </div>
                </>
            )}
            {selectedTab === "reviews" && (
                <>
                    <div className="poppins">
                        <div className="flex flex-row gap-5 items-center">
                            <h1 className="text-[20px] font-[700]">Review</h1>
                            <div className="w-[44px] h-[28px] bg-[#0955AC] rounded-[4px] flex justify-center items-center text-[14px] font-[700] text-[#FFFFFF]">
                                13
                            </div>
                        </div>
                        <div className="flex flex-row gap-8 items-center mb-10">
                            <div>
                                <h1 className="text-[50px] font-[700]">4.5</h1>
                                <img src={starSec} />
                                <h1 className="text-[#90A3BF] mt-2">10,356</h1>
                            </div>
                            <div className="flex flex-col gap-2 mt-5">
                                <div className="flex flex-row justify-center items-center gap-3">
                                    <h1 className="text-[8px] font-[600]">5</h1>
                                    <div className="w-[274px] h-[9px] bg-[#D9D9D9] rounded-[10px]" />
                                </div>
                                <div className="flex flex-row justify-center items-center gap-3">
                                    <h1 className="text-[8px] font-[600]">4</h1>
                                    <div className="w-[274px] h-[9px] bg-[#D9D9D9] rounded-[10px]" />
                                </div>
                                <div className="flex flex-row justify-center items-center gap-3">
                                    <h1 className="text-[8px] font-[600]">3</h1>
                                    <div className="w-[274px] h-[9px] bg-[#D9D9D9] rounded-[10px]" />
                                </div>
                                <div className="flex flex-row justify-center items-center gap-3">
                                    <h1 className="text-[8px] font-[600]">2</h1>
                                    <div className="w-[274px] h-[9px] bg-[#D9D9D9] rounded-[10px]" />
                                </div>
                                <div className="flex flex-row justify-center items-center gap-3">
                                    <h1 className="text-[8px] font-[600]">1</h1>
                                    <div className="w-[274px] h-[9px] bg-[#D9D9D9] rounded-[10px]" />
                                </div>
                            </div>
                        </div>

                        <ReviewSection/>
                    </div>
                </>
            )}
            {selectedTab === "gallery" && (
                <div className="py-10 px-5">
                    <h1 className="text-[15px] font-[600] mb-4">
                        Image Gallery
                    </h1>
                    <p className="text-[14px] font-[400]">
                        Gallery images will be shown here. (Replace with real
                        content.)
                    </p>
                </div>
            )}
        </div>
    );
};

export default VehicleInfo;

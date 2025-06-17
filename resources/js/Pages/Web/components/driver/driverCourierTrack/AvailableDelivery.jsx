import React from "react";
import filter from "../../../assets/driver/filter.png";
import downArrow from "../../../assets/driver/downArrow.png";
import redo from "../../../assets/driver/redo.png";

const AvailableDelivery = () => {
    // Sample data array - you can replace this with your actual data source
    const deliveryData = [
        {
            id: "00001",
            client: "Christine Brooks",
            address: "089 Kutch Green 448",
            price: "N 4500",
            type: "Foodstuff",
            mode: "Motorbike"
        },
        {
            id: "00002",
            client: "John Smith",
            address: "123 Main Street",
            price: "N 3200",
            type: "Electronics",
            mode: "Car"
        },
        {
            id: "00003",
            client: "Sarah Johnson",
            address: "456 Oak Avenue",
            price: "N 1800",
            type: "Documents",
            mode: "Bicycle"
        }
        // Add more delivery entries here
    ];

    return (
        <div className="bg-[#0955AC24]">
            <div className="flex flex-col justify-center items-center text-[14px] py-20">
                <h1 className="bebas-neue text-[40px]/[130%] font-[400]">
                    Available{" "}
                    <span className="text-[#0955AC]"> Deliveries</span>{" "}
                </h1>
                <p className="text-center text-[14px]/[33px] pb-20 md:pb-0 px-10 md:px-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec semper eu risus ut ornare. In bibendum <br /> tempus
                    sapien, tristique consectetur purus pellentesque ac
                </p>

                <div className="flex flex-col xl:gap-10 py-10">
                    <div className="gilroy-medium xl:w-[818px] xl:h-[70px] bg-[#F9F9FB] border-[0.6px] border-[#D5D5D5] rounded-[10px] flex flex-row justify-start items-center text-[14px] font-[400]">
                        <div className="border-r-[0.3px] border-[#979797] h-[70px] w-[70px] px-3 flex justify-evenly items-center">
                            <img src={filter} />
                        </div>

                        <div className="border-r-[0.3px] border-[#979797] h-[70px] w-[100px] px-3 flex justify-evenly items-center">
                            <h1>Filter By</h1>
                        </div>

                        <div className="border-r-[0.3px] border-[#979797] h-[70px] w-[120px] px-3 flex justify-evenly items-center ">
                            <h1>Price</h1>
                            <img src={downArrow} />
                        </div>

                        <div className="border-r-[0.3px] border-[#979797] h-[70px] w-[200px] px-3 flex justify-evenly items-center ">
                            <h1>Package Type</h1>
                            <img src={downArrow} />
                        </div>

                        <div className="border-r-[0.3px] border-[#979797] h-[70px] w-[200px] px-3 flex justify-evenly items-center ">
                            <h1>Delivery mode</h1>
                            <img src={downArrow} />
                        </div>

                        <div className="h-[70px] w-[200px] px-3 flex justify-evenly items-center">
                            <img src={redo} />
                            <h1 className="text-[#EA0234]">Reset Filter</h1>
                        </div>
                    </div>
                    <div className="xl:w-[1141px] bg-[#FFFFFF] border-[0.3px] border-[#B9B9B9] rounded-[14px]">
                        <div className="grid grid-cols-6 py-5">
                            {/* Headings */}
                            <div className="gilroy-bold border-b-[0.6px] h-[49px] flex items-center">
                                <h1 className="pl-10">ID</h1>
                            </div>
                            <div className="gilroy-bold border-b-[0.6px] h-[49px] flex items-center">
                                <h1 className="pl-10">CLIENT</h1>
                            </div>
                            <div className="gilroy-bold border-b-[0.6px] h-[49px] flex items-center">
                                <h1 className="pl-10">DELIVERY ADDRESS</h1>
                            </div>
                            <div className="gilroy-bold border-b-[0.6px] h-[49px] flex items-center">
                                <h1 className="pl-10">PRICE</h1>
                            </div>
                            <div className="gilroy-bold border-b-[0.6px] h-[49px] flex items-center">
                                <h1 className="pl-10">TYPE</h1>
                            </div>
                            <div className="gilroy-bold border-b-[0.6px] h-[49px] flex items-center">
                                <h1 className="pl-10">MODE</h1>
                            </div>

                            {/* Data rows using .map() */}
                            {deliveryData.map((delivery, index) => (
                                <React.Fragment key={delivery.id}>
                                    <div className="gilroy-medium border-b-[0.6px] h-[69px] flex items-center">
                                        <h1 className="pl-10">{delivery.id}</h1>
                                    </div>
                                    <div className="gilroy-medium border-b-[0.6px] h-[69px] flex items-center">
                                        <h1 className="pl-10">{delivery.client}</h1>
                                    </div>
                                    <div className="gilroy-medium border-b-[0.6px] h-[69px] flex items-center">
                                        <h1 className="pl-10">{delivery.address}</h1>
                                    </div>
                                    <div className="gilroy-medium border-b-[0.6px] h-[69px] flex items-center">
                                        <h1 className="pl-10">{delivery.price}</h1>
                                    </div>
                                    <div className="gilroy-medium border-b-[0.6px] h-[69px] flex items-center">
                                        <h1 className="pl-10">{delivery.type}</h1>
                                    </div>
                                    <div className="gilroy-medium border-b-[0.6px] h-[69px] flex items-center">
                                        <div className="w-[93px] h-[27px] text-[#00B69B] rounded-[4.5px] flex justify-center items-center ml-10 text-[12px] bg-green-200">
                                            <h1>{delivery.mode}</h1>
                                        </div>
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AvailableDelivery;

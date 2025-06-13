import React from "react";
import dropDown from "../../assets/courierService/dropDown.png"

const FAQ = () => {
    return (
        <div className="bg-[#E7E7E7] py-20 px-20">
            <div className="flex flex-col justify-center items-center">
                <h1 className="bebas-neue text-[40px]/[130%] font-[400]">
                    <span className="text-[#0955AC]"> frequently</span> asked{" "}
                    <span className="text-[#0955AC]"> questions</span>
                </h1>
                <div className="flex flex-row">
                  <div className="flex flex-col gap-10 justify-center items-center px-12">
                    <h1>General</h1>
                    <h1>Clients</h1>
                    <h1>Riders</h1>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex flex-row">
                      <h1>How do i create an accout with this?</h1>
                      <img src={dropDown} />
                    </div>
                    <div className="flex flex-row">
                      <h1>How do i create an accout with this?</h1>
                      <img src={dropDown} />
                    </div>

                  </div>
                </div>
            </div>
        </div>
    );
};

export default FAQ;



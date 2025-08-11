import React from "react";
import bg2 from "../../assets/landingPages/bg2.svg";
import blog1 from "../../assets/landingPages/blog1.svg";
import blog2 from "../../assets/landingPages/blog2.svg";
import blog3 from "../../assets/landingPages/blog3.svg";

import orangeRightArrow from "../../assets/landingPages/orangeRightArrow.svg";

const Blog = () => {
    return (
        <div
            className="h-screen w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${bg2})` }}
        >
            <div className="poppins py-10 px-20">
                {/* heading */}
                <div className="flex flex-row justify-center items-center gap-5">
                    <div className="w-[112px] h-[1.8px] bg-[#FF7003]" />
                    <h1 className="text-[#FF7003] text-[40px] font-[600] uppercase">
                        OUR BLOG
                    </h1>
                    <div className="w-[112px] h-[1.8px] bg-[#FF7003]" />
                </div>
                <div className="flex flex-row justify-end mt-10">
                    <div className="flex flex-row gap-5 justify-center items-center cursor-pointer">
                        <h1 className="text-[14px] font-[700] text-[#FF7003]">
                            See all
                        </h1>
                        <img
                            src={orangeRightArrow}
                            className="w-[13px] h-[17px]"
                        />
                    </div>
                </div>
                {/* blog content */}
                <div className="flex flex-row justify-between items-center py-10">
                    {/* Blog 1 */}
                    <div
                        className="xl:h-[518px] xl:w-[400px] bg-cover bg-center flex flex-col justify-end px-8 py-8"
                        style={{ backgroundImage: `url(${blog1})` }}
                    >
                        <div className="px-[5px]">
                            <h1 className="xl:text-[24px] text-[15px] font-[700]">
                                Lorem Ipsum Dolor Sit Amet
                            </h1>
                            <p className="xl:text-[12px]/[23px] text-[8px] font-[400] text-justify mt-3">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Donec semper eu risus ut
                                ornare. In bibendum tempus sapien, tristique
                                consectetu
                            </p>
                            <div className="flex flex-row justify-between items-center mt-20">
                                <h1 className="text-[12px] font-[500]">
                                    15 min - 01 JUN 23{" "}
                                </h1>
                                <div className="xl:w-[129px] xl:h-[38px] border-[1px] border-[#F0EBE1] rounded-[24px] flex justify-center items-center font-[700] xl:text-[14px] text-[8px] uppercase cursor-pointer px-2 py-2">
                                    read more
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Blog 2 */}
                    <div
                        className="xl:h-[518px] xl:w-[400px] bg-cover bg-center flex flex-col justify-end px-8 py-8"
                        style={{ backgroundImage: `url(${blog2})` }}
                    >
                        <div className="px-[5px]">
                            <h1 className="xl:text-[24px] text-[15px] font-[700]">
                                Lorem Ipsum Dolor Sit Amet
                            </h1>
                            <p className="xl:text-[12px]/[23px] text-[8px] font-[400] text-justify mt-3">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Donec semper eu risus ut
                                ornare. In bibendum tempus sapien, tristique
                                consectetu
                            </p>
                            <div className="flex flex-row justify-between items-center mt-20">
                                <h1 className="text-[12px] font-[500]">
                                    15 min - 01 JUN 23{" "}
                                </h1>
                                <div className="xl:w-[129px] xl:h-[38px] border-[1px] border-[#F0EBE1] rounded-[24px] flex justify-center items-center font-[700] xl:text-[14px] text-[8px] uppercase cursor-pointer px-2 py-2">
                                    read more
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Blog 3 */}
                    <div
                        className="xl:h-[518px] xl:w-[400px] bg-cover bg-center flex flex-col justify-end px-8 py-8"
                        style={{ backgroundImage: `url(${blog3})` }}
                    >
                        <div className="px-[5px]">
                            <h1 className="xl:text-[24px] text-[15px] font-[700]">
                                Lorem Ipsum Dolor Sit Amet
                            </h1>
                            <p className="xl:text-[12px]/[23px] text-[8px] font-[400] text-justify mt-3">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Donec semper eu risus ut
                                ornare. In bibendum tempus sapien, tristique
                                consectetu
                            </p>
                            <div className="flex flex-row justify-between items-center mt-20">
                                <h1 className="text-[12px] font-[500]">
                                    15 min - 01 JUN 23{" "}
                                </h1>
                                <div className="xl:w-[129px] xl:h-[38px] border-[1px] border-[#F0EBE1] rounded-[24px] flex justify-center items-center font-[700] xl:text-[14px] text-[8px] uppercase cursor-pointer px-2 py-2">
                                    read more
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center items-center">
                    <h1 className="text-[20px] font-[300]">
                        From renting vehicles and warehouses to booking your
                        next trip or sending parcels, we’ve got you covered.
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default Blog;

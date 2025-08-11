import React from "react";
import box from "../../assets/landingPages/box.svg";

const Why = () => {
    return (
        <div>
            <div className="poppins py-10 px-10">
                {/* heading */}
                <div className="flex flex-row justify-center items-center gap-5">
                    <div className="w-[112px] h-[1.8px] bg-[#FF7003]" />
                    <h1 className="text-[#FF7003] text-[40px] font-[600] uppercase">
                        Why choose us
                    </h1>
                    <div className="w-[112px] h-[1.8px] bg-[#FF7003]" />
                </div>
                <div className="flex justify-center items-center">
                    <p className="text-[17px]/[33px] text-[#F5B7877D] text-center font-[500] w-[937px]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Donec semper eu risus ut ornare. In.Lorem ipsum dolor
                        sit amet, Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit. Donec semper eu risus{" "}
                    </p>
                </div>

                {/* card section */}
                <div className="py-10 px-20 flex flex-col gap-10">
                    {/* 1st row */}
                    <div className="flex flex-row gap-10 justify-center items-center">
                        {/* card 1 */}
                        <div className="xl:w-[370px] xl:h-[296px] border-[1px] border-[#FFFFFF] rounded-[10px] px-10 py-5 flex flex-col gap-2">
                            <img src={box} className="size-[56px]" />
                            <h1 className="text-[22px] font-[600]">
                                Lorem Ipsum
                            </h1>
                            <p className="text-[12px]/[33px] text-[#FFFFFFA6] font-[500] text-justify">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Donec semper eu risus ut
                                ornare. In.Lorem ipsum dolor sit amet, Lorem
                                ipsum dolor sit amet, consectetur adipiscing
                                elit. Donec semper eu risus{" "}
                            </p>
                        </div>
                        {/* card 2 */}
                        <div className="xl:w-[370px] xl:h-[296px] border-[1px] border-[#FFFFFF] rounded-[10px] px-10 py-5 flex flex-col gap-2">
                            <img src={box} className="size-[56px]" />
                            <h1 className="text-[22px] font-[600]">
                                Lorem Ipsum
                            </h1>
                            <p className="text-[12px]/[33px] text-[#FFFFFFA6] font-[500] text-justify">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Donec semper eu risus ut
                                ornare. In.Lorem ipsum dolor sit amet, Lorem
                                ipsum dolor sit amet, consectetur adipiscing
                                elit. Donec semper eu risus{" "}
                            </p>
                        </div>
                        {/* card 3 */}
                        <div className="xl:w-[370px] xl:h-[296px] border-[1px] border-[#FFFFFF] rounded-[10px] px-10 py-5 flex flex-col gap-2">
                            <img src={box} className="size-[56px]" />
                            <h1 className="text-[22px] font-[600]">
                                Lorem Ipsum
                            </h1>
                            <p className="text-[12px]/[33px] text-[#FFFFFFA6] font-[500] text-justify">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Donec semper eu risus ut
                                ornare. In.Lorem ipsum dolor sit amet, Lorem
                                ipsum dolor sit amet, consectetur adipiscing
                                elit. Donec semper eu risus{" "}
                            </p>
                        </div>
                    </div>
                    {/* 2nd row */}
                    <div className="flex flex-row gap-10 justify-center items-center">
                        {/* card 1 */}
                        <div className="xl:w-[370px] xl:h-[296px] border-[1px] border-[#FFFFFF] rounded-[10px] px-10 py-5 flex flex-col gap-2">
                            <img src={box} className="size-[56px]" />
                            <h1 className="text-[22px] font-[600]">
                                Lorem Ipsum
                            </h1>
                            <p className="text-[12px]/[33px] text-[#FFFFFFA6] font-[500] text-justify">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Donec semper eu risus ut
                                ornare. In.Lorem ipsum dolor sit amet, Lorem
                                ipsum dolor sit amet, consectetur adipiscing
                                elit. Donec semper eu risus{" "}
                            </p>
                        </div>
                        {/* card 2 */}
                        <div className="xl:w-[370px] xl:h-[296px] border-[1px] border-[#FFFFFF] rounded-[10px] px-10 py-5 flex flex-col gap-2">
                            <img src={box} className="size-[56px]" />
                            <h1 className="text-[22px] font-[600]">
                                Lorem Ipsum
                            </h1>
                            <p className="text-[12px]/[33px] text-[#FFFFFFA6] font-[500] text-justify">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Donec semper eu risus ut
                                ornare. In.Lorem ipsum dolor sit amet, Lorem
                                ipsum dolor sit amet, consectetur adipiscing
                                elit. Donec semper eu risus{" "}
                            </p>
                        </div>
                        {/* card 3 */}
                        <div className="xl:w-[370px] xl:h-[296px] border-[1px] border-[#FFFFFF] rounded-[10px] px-10 py-5 flex flex-col gap-2">
                            <img src={box} className="size-[56px]" />
                            <h1 className="text-[22px] font-[600]">
                                Lorem Ipsum
                            </h1>
                            <p className="text-[12px]/[33px] text-[#FFFFFFA6] font-[500] text-justify">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Donec semper eu risus ut
                                ornare. In.Lorem ipsum dolor sit amet, Lorem
                                ipsum dolor sit amet, consectetur adipiscing
                                elit. Donec semper eu risus{" "}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Why;

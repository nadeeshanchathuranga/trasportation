import React from "react";
import bg from "../../assets/landingPages/bg.svg";
import linkedin from "../../assets/landingPages/in.svg";
import fb from "../../assets/landingPages/fb.svg";
import twitter from "../../assets/landingPages/twitter.svg";

const Hero = () => {
    return (
        <div className="flex relative justify-center items-center md:py-10 px-20 poppins">
            <h1 className="absolute md:top-[30px] top-[20px] md:text-[31px] text-[20px] font-[700] poppins uppercase">
                Company Logo
            </h1>
            <div className="flex flex-col gap-5 absolute left-16 md:pb-10">
                <div className="size-[35px] rounded-full border-[1.5px] border-[#FF7003] flex justify-center items-center cursor-pointer">
                    <img src={linkedin} />
                </div>
                <div className="size-[35px] rounded-full border-[1.5px] border-[#FF7003] flex justify-center items-center cursor-pointer">
                    <img src={fb} />
                </div>
                <div className="size-[35px] rounded-full border-[1.5px] border-[#FF7003] flex justify-center items-center cursor-pointer">
                    <img src={twitter} />
                </div>
            </div>

            <div
                className="h-screen w-full bg-cover bg-center py-[100px] px-10 md:px-10"
                style={{ backgroundImage: `url(${bg})` }}
            >
                {/* navbar section */}
                <div className="md:flex flex-row hidden justify-between">
                    <div className="flex flex-row gap-10 xl:text-[17px] text-[10px] font-[400]">
                        <div className="xl:w-[101px] h-[38px] border-[1.2px] border-[#FFFFFF91] rounded-[100px] bg-[#0A063000] flex justify-center items-center cursor-pointer px-4 py-2">
                            Home
                        </div>
                        <div className="xl:w-[121px] h-[38px] border-[1.2px] border-[#FFFFFF91] rounded-[100px] bg-[#0A063000] flex justify-center items-center cursor-pointer px-4 py-2">
                            About Us
                        </div>
                        <div className="xl:w-[114px] h-[38px] border-[1.2px] border-[#FFFFFF91] rounded-[100px] bg-[#0A063000] flex justify-center items-center cursor-pointer px-4 py-2">
                            Services
                        </div>
                        <div className="xl:w-[81px] h-[38px] border-[1.2px] border-[#FFFFFF91] rounded-[100px] bg-[#0A063000] flex justify-center items-center cursor-pointer px-4 py-2">
                            Blog
                        </div>
                        <div className="xl:w-[137px] h-[38px] border-[1.2px] border-[#FFFFFF91] rounded-[100px] bg-[#0A063000] flex justify-center items-center cursor-pointer px-4 py-2">
                            Contact Us
                        </div>
                    </div>
                    <div className="flex flex-row gap-5 xl:text-[17px] text-[10px] font-[700]">
                        <div className="xl:w-[137px] h-[38px] bg-[#FF7003] border-[1.2px] border-[#FF7003] rounded-[100px] flex justify-center items-center px-4 py-2">
                            Login
                        </div>
                        <div className="xl:w-[137px] h-[38px] text-[#FF7003] border-[1.2px] border-[#FF7003] rounded-[100px] flex justify-center items-center px-4 py-2">
                            Register
                        </div>
                    </div>
                </div>
                {/* end */}

                <div className="flex flex-col items-center xl:text-[59px] md:text-[39px] text-[20px] font-[600]">
                    <h1 className="xl:mt-[100px] mt-[40px]">
                        From City Streets to Global Skies
                    </h1>
                    <h1>We Power Your Every Move.</h1>
                    <p className="xl:text-[17px] md:text-[10px] text-[8px] font-[600] text-center mt-[20px] xl:mt-[30px]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Donec semper eu risus ut ornare. In bibendum tempus{" "}
                        <br />
                        sapien, tristique consectetur purus pellentesque ac.
                        Quisque facilisis laoreet feugiat.{" "}
                    </p>

                    <div
                        className="xl:w-[174px] xl:h-[41px] xl:text-[17px] md:text-[10px] text-[8px] font-[700] flex justify-center items-center rounded-[44px] cursor-pointer xl:mt-[80px] mt-[20px] px-4 py-2"
                        style={{
                            background:
                                "linear-gradient(90deg, #11207D 0%, #1F3AE3 46.63%, #485BD2 99.04%)",
                        }}
                    >
                        Try it now
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;

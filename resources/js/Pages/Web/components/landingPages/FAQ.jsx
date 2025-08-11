import React, {useState} from "react";
import FAQImg from "../../assets/landingPages/FAQImg.svg";
import upArrow from "../../assets/landingPages/upArrow.svg";

// FAQ data array
const faqData = [
    {
        question:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec semper?",
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec semper eu risus ut ornare. In bibendum tempus sapien, tristique consectetur purus pellentesque ac. Quisque facilisis laoreet feugiat. Sed dapibus volutpat ex, eget iaculis nunc tincidunt sit.",
    },
    {
        question:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec semper?",
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec semper eu risus ut ornare. In bibendum tempus sapien, tristique consectetur purus pellentesque ac. Quisque facilisis laoreet feugiat. Sed dapibus volutpat ex, eget iaculis nunc tincidunt sit.",
    },
    {
        question:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec semper?",
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec semper eu risus ut ornare. In bibendum tempus sapien, tristique consectetur purus pellentesque ac. Quisque facilisis laoreet feugiat. Sed dapibus volutpat ex, eget iaculis nunc tincidunt sit.",
    },
    {
        question:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec semper?",
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec semper eu risus ut ornare. In bibendum tempus sapien, tristique consectetur purus pellentesque ac. Quisque facilisis laoreet feugiat. Sed dapibus volutpat ex, eget iaculis nunc tincidunt sit.",
    },
    {
        question:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec semper?",
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec semper eu risus ut ornare. In bibendum tempus sapien, tristique consectetur purus pellentesque ac. Quisque facilisis laoreet feugiat. Sed dapibus volutpat ex, eget iaculis nunc tincidunt sit.",
    },
];

const FAQ = () => {
    // Track which FAQ is open; null means all are collapsed
    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = (idx) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    return (
        <div>
            <div>
                <div className="poppins py-10 flex flex-row gap-10 justify-between">
                    <div className="pl-40">
                        {/* heading */}
                        <div className="flex flex-row justify-start items-center gap-5">
                            <div className="w-[112px] h-[1.8px] bg-[#FF7003]" />
                            <h1 className="text-[#FF7003] text-[40px] font-[600] uppercase">
                                FAQ
                            </h1>
                            <div className="w-[112px] h-[1.8px] bg-[#FF7003]" />
                        </div>
                        {/* FAQ section */}
                        <div className="flex flex-col gap-5">
                            {faqData.map((faq, idx) => (
                                <div
                                    key={idx}
                                    className="xl:w-[686px] md:w-[400px] w-[200px] text-justify"
                                >
                                    <div
                                        className="xl:w-[686px] xl:h-[63px] border-[1px] border-[#0955AC] rounded-[10px] flex flex-row xl:justify-between items-center py-2 px-4 cursor-pointer"
                                        onClick={() => handleToggle(idx)}
                                    >
                                        <h1>{faq.question}</h1>
                                        <img
                                            src={upArrow}
                                            alt="Toggle FAQ"
                                            className={`transition-transform duration-200 ${
                                                openIndex === idx
                                                    ? "rotate-180"
                                                    : ""
                                            }`}
                                        />
                                    </div>
                                    {openIndex === idx && (
                                        <h1 className="text-[14px]/[33px] font-[400] px-10 py-5">
                                            {faq.answer}
                                        </h1>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="md:block hidden">
                        <img src={FAQImg} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQ;

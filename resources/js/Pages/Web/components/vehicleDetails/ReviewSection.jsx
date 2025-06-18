import React, { useState } from "react";
import proPic from "../../assets/vehicleDetails/proPic.png";
import stars from "../../assets/vehicleDetails/stars.png";

const ReviewSection = () => {
    const [showMore, setShowMore] = useState(false);

    const reviews = [
        {
            id: 1,
            name: "Kasun Gunawardhana",
            location: "Sri Lanka",
            date: "21 July 2022",
            rating: 5,
            comment: "Smooth experience from start to finish! I booked a car for my business trip in Dubai and everything went perfectly — clean vehicle, on-time pickup, and helpful support. The platform made it super easy to compare options and book within minutes. I'll definitely use it again!"
        },
        {
            id: 2,
            name: "Kasun Gunawardhana",
            location: "Sri Lanka",
            date: "21 July 2022",
            rating: 5,
            comment: "Smooth experience from start to finish! I booked a car for my business trip in Dubai and everything went perfectly — clean vehicle, on-time pickup, and helpful support. The platform made it super easy to compare options and book within minutes. I'll definitely use it again!"
        },
        {
            id: 3,
            name: "John Doe",
            location: "United States",
            date: "15 August 2022",
            rating: 4,
            comment: "Great service and very professional. The car was in excellent condition and the pickup process was smooth."
        },
        {
            id: 4,
            name: "Sarah Johnson",
            location: "Canada",
            date: "10 September 2022",
            rating: 5,
            comment: "Highly recommended! The booking process was straightforward and the customer service was outstanding."
        },
        {
            id: 5,
            name: "Michael Chen",
            location: "Australia",
            date: "5 October 2022",
            rating: 4,
            comment: "Good experience overall. The vehicle was clean and the service was reliable."
        }
    ];

    // Show only first 2 reviews initially, show all when expanded
    const displayedReviews = showMore ? reviews : reviews.slice(0, 2);

    return (
        <div className="plus-jakarta-sans w-auto h-auto xl:w-[1104px] xl:h-auto rounded-[10px] bg-[#FFFFFF] py-5 px-10">
            <div className="flex flex-row gap-3 items-center">
                <h1 className="text-[20px] font-[600]">Reviews</h1>
                <div className="w-[44px] h-[28px] bg-[#0955AC] flex justify-center items-center rounded-[4px] text-[white]">
                    <h1 className="text-[14px] font-[700]">{reviews.length}</h1>
                </div>
            </div>
            
            {displayedReviews.map((review) => (
                <div key={review.id} className="flex flex-col gap-3 py-5 text-[14px] font-[500]">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="flex flex-row gap-3 items-center">
                            <img src={proPic} alt="Profile" />
                            <div className="flex flex-col items-start gap-2">
                                <h1 className="text-[20px] font-[700]">
                                    {review.name}
                                </h1>
                                <h1 className="text-[#90A3BF]">{review.location}</h1>
                            </div>
                        </div>
                        <div className="flex flex-col items-start lg:items-end gap-2">
                            <h1 className="text-[#90A3BF]">{review.date}</h1>
                            <img src={stars} alt="Rating" />
                        </div>
                    </div>
                    <div>
                        <p className="font-[400] text-justify text-[#596780]">
                            {review.comment}
                        </p>
                    </div>
                </div>
            ))}

            {reviews.length > 2 && (
                <div className="flex justify-center pt-4">
                    <button
                        onClick={() => setShowMore(!showMore)}
                        className="text-[#90A3BF] font-[600] text-[16px] hover:text-[#596780] transition-colors duration-200 flex items-center gap-2"
                    >
                        <span>{showMore ? "Show less" : "Show All"}</span>
                        <svg
                            className={`w-4 h-4 transition-transform duration-200 ${showMore ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
};

export default ReviewSection;

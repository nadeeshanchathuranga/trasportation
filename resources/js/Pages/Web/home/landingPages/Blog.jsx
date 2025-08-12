import React from "react";
import HeaderTwo from "../../layouts/HeaderTwo";
import Hero from "../../components/landingPages/blog/Hero";
import Categories from "../../components/landingPages/blog/Categories";
import Spotlight from "../../components/landingPages/blog/Spotlight";
import PopularNews from "../../components/landingPages/blog/PopularNews";

import "../../components/landingPages/blog/blog.css";

const Blog = () => {
    return (
        <div className="bg-[#000000] text-[#FFFFFF] poppins">
            <HeaderTwo />
            <Hero />
            <Categories />
            <Spotlight />
            <PopularNews />
        </div>
    );
};

export default Blog;

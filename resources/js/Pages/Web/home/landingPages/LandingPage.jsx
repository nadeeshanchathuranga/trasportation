import React from "react";
import Hero from "../../components/landingPages/Hero";
import About from "../../components/landingPages/About";
import Service from "../../components/landingPages/Service";
import Why from "../../components/landingPages/Why";
import FAQ from "../../components/landingPages/FAQ";
import Blog from "../../components/landingPages/Blog";
import Stories from "../../components/landingPages/Stories";
import Contact from "../../components/landingPages/Contact";
import FooterTwo from "../../layouts/FooterTwo";

const LandingPage = () => {
    return (
        <div className="bg-[#000000] text-[#FFFFFF]">
            <Hero />
            <About />
            <Service />
            <Why />
            <FAQ />
            <Blog />
            <Stories />
            <Contact />
            <FooterTwo/>
        </div>
    );
};

export default LandingPage;

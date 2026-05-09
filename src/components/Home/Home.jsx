import React from "react";
import Banner from "../Banner/Banner";
import TopPartners from "../TopPartners/TopPartners";
import Reviews from "../Reviews/Reviews";
import HowItWorks from "../HowItWorks/HowItWorks";

const Home = () => {
  return (
    <div className="w-11/12 mx-auto space-y-10">
      <Banner></Banner>
      <TopPartners></TopPartners>
      <HowItWorks></HowItWorks>
      <Reviews></Reviews>
    </div>
  );
};

export default Home;

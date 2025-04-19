import React from "react";

import Hero from "@/src/components/UI/Hero/Hero";
import HowItWorks from "@/src/components/UI/Hero/HowItWorks";
import OurWebsiteFacilities from "@/src/components/UI/Hero/OurWebsiteFacilities/OurWebsiteFacilities";
import FAQ from "@/src/components/UI/Hero/FAQ/FAQ";

const HomePage = () => {
  return (
    <div className="bg-[#F5EDED]">
      <Hero />
      <OurWebsiteFacilities />
      <HowItWorks />
      <FAQ />
    </div>
  );
};

export default HomePage;

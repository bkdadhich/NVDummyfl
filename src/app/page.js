import FeaturedBlogSection from "@/Component/FeaturedBlogSection";
import HeroSection from "@/Component/HeroSection.jsx";
import HomePageSections from "@/Component/HomePageSections";
import HomeQuestionsSection from "@/Component/HomeQuestionsSection";
import HowItWorks from "@/Component/HowItWorks";
import LogoSlider from "@/Component/LogoSlider";
import ProjectDiscoverySection from "@/Component/ProjectDiscoverySection";
import ServicesSection from "@/Component/ServiceSection";
import UserTypesSection from "@/Component/UserTypesSection";

import React from "react";

const page = () => {
  return (
    <>
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <HeroSection />
        <HowItWorks />
        <UserTypesSection />
        <ServicesSection />
        <ProjectDiscoverySection />
        <HomePageSections />
        <LogoSlider/>
        <FeaturedBlogSection />      
        <HomeQuestionsSection />
      </main>
    </>
  );
};

export default page;

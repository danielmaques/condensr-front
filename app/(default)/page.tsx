export const metadata = {
  title: "Condensr - Intelligent Link Shortener",
  description: "Shorten, customize and analyze your links with the most advanced platform on the market",
};

import BusinessCategories from "@/components/business-categories";
import Cta from "@/components/cta";
import FeaturesPlanet from "@/components/features-planet";
import Hero from "@/components/hero-home";
import LargeTestimonial from "@/components/large-testimonial";

export default function Home() {
  return (
    <>
      <Hero />
      <BusinessCategories />
      <FeaturesPlanet />
      <LargeTestimonial />
      <Cta />
    </>
  );
}

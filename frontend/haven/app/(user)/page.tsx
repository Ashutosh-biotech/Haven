import { DestinationsCarousel } from "@/components/ui/home/DestinationsCarousel";
import { FeaturedHotels } from "@/components/ui/home/featured-hotels";
import { Header } from "@/components/ui/home/header";
import HowItWorks from "@/components/ui/home/how-it-works";
import TestimonialsCarousel from "@/components/ui/home/testimonials-carousel";
import React from "react";

export default function Home(): React.ReactNode {
  return (
    <>
      <Header />
      <DestinationsCarousel />
      <FeaturedHotels />
      <HowItWorks />
      <TestimonialsCarousel />
    </>
  );
}

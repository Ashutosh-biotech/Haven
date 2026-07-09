import { DestinationsCarousel } from "@/components/ui/home/DestinationsCarousel";
import { FeaturedHotels } from "@/components/ui/home/FeaturedHotels";
import { Header } from "@/components/ui/home/Header";
import HowItWorks from "@/components/ui/home/HowItWorks";
import TestimonialsCarousel from "@/components/ui/home/TestimonialsCarousel";
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

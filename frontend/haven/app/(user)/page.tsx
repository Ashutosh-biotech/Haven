import { DestinationsCarousel } from "@/components/feature/home/DestinationsCarousel";
import { FeaturedHotels } from "@/components/feature/home/FeaturedHotels";
import { Header } from "@/components/feature/home/Header";
import HowItWorks from "@/components/feature/home/HowItWorks";
import TestimonialsCarousel from "@/components/feature/home/TestimonialsCarousel";
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

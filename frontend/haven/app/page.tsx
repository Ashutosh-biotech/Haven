import { Navbar } from "../components/Navbar";
import { DestinationsCarousel } from "./components/DestinationsCarousel";
import { FeaturedHotels } from "./components/FeaturedHotels";
import { Header } from "./components/Header";

export default function Home() {
  return (
    <>
      <Navbar />
      <Header />
      <DestinationsCarousel />
      <FeaturedHotels />
    </>
  );
}

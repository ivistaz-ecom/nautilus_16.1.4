import HeroSection from "./Components/HeroSection";
import SeafarerStories from "./Components/SeafarerStories";
import TechnicalIncidents from "./Components/TechnicalIncidents";
import HeroHeader from "@/components/HomePage/components/HeroBanner/HeroHeader";


export default function LandingPage() {
  return (
    <>
      <HeroHeader
        logo="/logo.png"
        hamburger="/hamburger-dark.svg"
        search="/search-dark.svg"
      />
      <HeroSection />
      <SeafarerStories />
      <TechnicalIncidents />
    </>
  );
}
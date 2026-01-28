"use client"

// import { useEffect } from "react"
// import { ParallaxProvider } from "react-scroll-parallax"
// import AOS from "aos"
// import "aos/dist/aos.css"

import HeroBanner from "./components/HeroBanner/HeroBanner"
import For18Years from "./components/For18Years/For18Years"
import NautilusPromise from "./components/NautilusPromise/NautilusPromise"
import OurMarineServices from "./components/OurMarineServices/OurMarineServices"
import Game from "../Game/Game"
import Careers from "./components/Careers/Careers"
import NewsAndInsights from "./components/NewsAndInsights/NewsAndInsights"
import FAQs from "@/components/FAQs/FAQs"
import HomePageModal from "./components/HomePageModal/HomePageModal"

const faqs = [
  {
    ques: "What services do you offer?",
    ans: "We specialize in crew management but also provide complete vessel management and marine services.",
  },
  {
    ques: "What types of vessels do you manage?",
    ans: "We manage bulk carriers, container ships, chemical tankers, oil & LPG/LNG tankers, general cargo vessels, and passenger ships.",
  },
  {
    ques: "How many seafarers are in your database?",
    ans: "We have a database of 100,000+ seafarers.",
  },
]

const HomePage = () => {
  // useEffect(() => {
  //   AOS.init({
  //     duration: 1000,
  //     once: true, // run only once when scrolled into view
  //     offset: 80, // reduce re-trigger sensitivity
  //   })
  // }, [])

  return (
    <div className="overflow-hidden">
      {/* <HomePageModal /> */}
      <HeroBanner />
      <For18Years />
      <NautilusPromise />
      <OurMarineServices />
      <Game />
      <Careers />
      <NewsAndInsights />
      <FAQs data={faqs} />
    </div>
  )
}

export default HomePage

"use client"

import dynamic from "next/dynamic"
import HeroBanner from "./components/HeroBanner/HeroBanner"

const For18Years = dynamic(
  () => import("./components/For18Years/For18Years"),
  { loading: () => null }
)
const NautilusPromise = dynamic(
  () => import("./components/NautilusPromise/NautilusPromise"),
  { loading: () => null }
)
const OurMarineServices = dynamic(
  () => import("./components/OurMarineServices/OurMarineServices"),
  { loading: () => null }
)
const Game = dynamic(() => import("../Game/Game"), { loading: () => null })
const Careers = dynamic(() => import("./components/Careers/Careers"), {
  loading: () => null,
})
const NewsAndInsights = dynamic(
  () => import("./components/NewsAndInsights/NewsAndInsights"),
  { loading: () => null }
)
const FAQs = dynamic(() => import("@/components/FAQs/FAQs"), {
  loading: () => null,
})

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
  return (
    <main id="main-content" className="overflow-hidden">
      <HeroBanner />
      <For18Years />
      <NautilusPromise />
      <OurMarineServices />
      <Game />
      <Careers />
      <NewsAndInsights />
      <FAQs data={faqs} />
    </main>
  )
}

export default HomePage

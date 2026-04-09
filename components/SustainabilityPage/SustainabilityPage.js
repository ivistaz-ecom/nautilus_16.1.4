"use client"

import { ParallaxProvider } from "react-scroll-parallax"
import Header from "../Header/Header"
import Driving from "./components/Driving"
import Explore from "./components/Explore"
import Heading from "./components/Heading"
import OurApproach from "./components/OurApproach"
import OurCommitment from "./components/OurCommitment"
import ResponsibleOperations from "./components/ResponsibleOperations"
import FAQs from "@/components/FAQs/FAQs"

// export async function generateMetadata() {
//   return getMetadata("/sustainability")
// }

const SustainabilityPage = () => {
  // const metadata = getMetadata("/resources/sustainability")
  const faqs = [
    {
      ques: "How does Nautilus Shipping integrate sustainability into its operations?",
      ans: "We focus on fuel efficiency, emissions reduction, regulatory compliance, and crew welfare, aligning with the IMO sustainability goals.",
    },
    {
      ques: "What makes Nautilus Shipping a leader among ship management companies in India?",
      ans: "Nautilus Shipping combines 19 years of industry expertise with cutting-edge technology and proactive compliance management. We tailor our ship management services to optimize operational efficiency, minimize downtime, and enhance vessel performance.",
    },
  ]

  return (
    <>
      <ParallaxProvider>
        <Header
          logo="/logo.png"
          hamburger="/hamburger-dark.svg"
          search="/search-dark.svg"
        />
        <Heading />
        <Driving />
        <OurApproach />
        <ResponsibleOperations />
        <OurCommitment />
        <Explore />
        <FAQs data={faqs} />
      </ParallaxProvider>
    </>
  )
}

export default SustainabilityPage

"use client"
import { ParallaxBanner } from "react-scroll-parallax"

const OurCommitment = () => {
  return (
    <div className="pt-7 md:pt-14 px-4">
      <ParallaxBanner
        layers={[
          { image: "/our-approach/img002.webp", speed: -15, expanded: false },
        ]}
        className="max-w-screen-lg mx-auto bg-[url('/our-approach/img002.webp')] rounded-lg py-10 bg-cover bg-center relative"
      >
        <div className="absolute inset-0 bg-[#0C5C2E] rounded-lg mix-blend-multiply z-10"></div>
        <div className="flex flex-col justify-center h-full gap-10 px-4 sm:px-10 relative z-20 w-full sm:w-3/5">
          <h1 className="text-2xl sm:text-5xl font-light text-white leading-tight md:leading-tight px-2 sm:px-3 tracking-wide">
            Our Commitment <br className="hidden sm:block" /> to a Sustainable{" "}
            <br className="hidden sm:block" /> Maritime Future
          </h1>
          <hr className="border-gray-400 w-full" />
          <p className="text-base sm:text-lg text-white font-light px-2 sm:px-3 tracking-wide">
            At <span className="font-bold">Nautilus Shipping</span>, we’re
            committed to transforming the industry through{" "}
            <span className="font-bold">sustainable ship management</span>.
            <br className="hidden md:block" /> By embedding sustainability into
            every layer of our operations, we support global efforts to build a
            greener, more resilient maritime future for all{" "}
            <span className="font-bold">vessel shipping companies</span> and
            partners.
          </p>
        </div>
      </ParallaxBanner>
    </div>
  )
}

export default OurCommitment

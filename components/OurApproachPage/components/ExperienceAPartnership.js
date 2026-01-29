"use client"

import { ParallaxBanner } from "react-scroll-parallax"

const ExperienceAPartnership = () => {
  return (
    <div className="py-7 sm:py-14 px-3 md:px-4">
      <div className="max-w-screen-lg mx-auto w-full flex flex-col gap-5 sm:gap-7">
        <h2 className="text-2xl sm:text-6xl leading-tight md:leading-tight tracking-wide">
          Experience a Partnership <br className="hidden sm:block" /> That Adds
          Lasting Value
        </h2>
        <p className="text-base sm:text-xl font-light tracking-wide">
          Our 4P framework offers more than routine management—it’s a
          comprehensive partnership aimed at boosting operational efficiency,
          enhancing profitability, and aligning with your business vision.{" "}
          <br className="hidden md:block" /> We believe in creating value that
          drives your fleet forward.
        </p>
        <ParallaxBanner
          layers={[
            { image: "/our-approach/img03.webp", speed: -15, expanded: false },
          ]}
          className="w-full mt-5 h-[500px]"
        />
        {/* <Image
          src="/our-approach/image02.png"
          width={1234}
          height={545}
          alt="Experience a Partnership"
          className="w-full max-w-full"
        /> */}
      </div>
    </div>
  )
}

export default ExperienceAPartnership

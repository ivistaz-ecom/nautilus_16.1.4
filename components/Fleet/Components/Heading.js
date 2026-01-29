"use client"

import Image from "next/image"
import { ParallaxBanner } from "react-scroll-parallax"

const Heading = () => {
  return (
    <>
      <div className="pt-24 sm:pt-28 pb-7 md:pb-14">
        <div className="text-center max-w-screen-lg mx-auto w-full flex flex-col items-center gap-5 md:gap-3">
          <h1 className="text-3xl sm:text-7xl font-light text-center leading-tight md:leading-tight tracking-wide">
            Growing Stronger <br className="hidden md:block" /> Every Year
          </h1>

          <ParallaxBanner
            layers={[
              { image: "/fleet/fleet-banner.webp", speed: -15, expanded: false },
            ]}
            className="w-full mt-5 h-72 md:h-[353px] hidden md:block"
          />
          <Image

            src="/fleet/fleet-banner.webp"
            width={1182}
            height={536}
            alt="fleet"
            className="w-full block md:hidden px-3"
            priority
          />
          <p className="text-left md:mt-5 px-3 sm:px-7 text-base sm:text-lg font-light tracking-wide">
            At Nautilus Shipping, we have successfully managed over 230 vessels
            to date, delivering expert management and operational excellence
            across a diverse range of ships. Our fleet continues to expand as we
            take on new challenges and provide tailored solutions that ensure
            efficiency, safety, and compliance with global maritime standards.
            Whether managing bulk carriers, tankers, or specialized vessels, our
            expertise ensures that every ship operates at its highest potential.
          </p>
        </div>
      </div>

      <hr className="border-gray-400 w-full" />
    </>
  )
}

export default Heading

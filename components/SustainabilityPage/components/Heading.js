import Image from "next/image"
import { ParallaxBanner } from "react-scroll-parallax"

const Heading = () => {
  return (
    <>
      <div className="pt-24 md:pt-28 pb-7 md:pb-14 px-3 md:px-0">
        <div className="max-w-screen-lg mx-auto w-full flex flex-col gap-3">
          <h1 className="text-4xl md:text-7xl text-center leading-tight md:leading-tight">
            <span className="text-[#0C5C2E]">Sustainability</span> <br /> at
            Nautilus Shipping
          </h1>

          <ParallaxBanner
            layers={[
              {
                image: "/sustainability/banner001.webp",
                speed: -15,
                expanded: false,
              },
            ]}
            className="w-full md:mt-5 h-72 md:h-[475px] hidden md:block"
          />
          <Image
            src="/sustainability/banner001.webp"
            width={1182}
            height={536}
            alt="fleet"
            className="w-full block md:hidden"
            priority
          />
        </div>
      </div>

      {/* <hr className="border-gray-400 w-full" /> */}
    </>
  )
}

export default Heading

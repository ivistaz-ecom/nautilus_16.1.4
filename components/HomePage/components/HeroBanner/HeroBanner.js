//import Header from "@/components/Header/Header"
//import Image from "next/image"
import Link from "next/link"
//import { useParallax, ParallaxBanner } from "react-scroll-parallax"
import dynamic from "next/dynamic"
//import { useEffect, useRef } from "react"

// Old Video URL: https://ivista-digital-bucket.blr1.cdn.digitaloceanspaces.com/Nautilus-Website/nautilus_sea.mp4
// New Video URL: https://ivista-digital-bucket.blr1.cdn.digitaloceanspaces.com/Nautilus-Website/nautilus_sea.webm

// Dynamically import Header to reduce initial JS bundle if it's heavy
const Header = dynamic(() => import("@/components/Header/Header"), {
  ssr: false,
})

const HeroBanner = () => {
  //const videoRef = useRef(null)

  // Preload video on mount to improve LCP
  // useEffect(() => {
  //   if (videoRef.current) {
  //     videoRef.current.load()
  //   }
  // }, [])

  return (
    <div className="relative h-screen flex flex-col justify-center items-center overflow-hidden">
      {/* Video Background (deferred load) */}
      <video
        //ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source
          src="https://ivista-digital-bucket.blr1.cdn.digitaloceanspaces.com/Nautilus-Website/nautilusshipping_sea.mp4"
          type="video/mp4"
        />
        <source
          src="https://ivista-digital-bucket.blr1.cdn.digitaloceanspaces.com/Nautilus-Website/nautilus_sea.webm"
          type="video/webm"
        />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      {/* <div className="absolute inset-0 bg-black/30 pointer-events-none" /> */}

      {/* Header */}
      <Header
        logo="/white-logo.png"
        hamburger="/hamburger.svg"
        search="/search.svg"
      />

      {/* Main Content */}
      <div className="relative max-w-screen-xl w-full mx-auto flex flex-col justify-end md:justify-center items-center px-4 z-10">
        <div className="flex flex-col items-center text-white">
          <h1 className="text-3xl sm:text-5xl md:text-7xl text-center leading-tight tracking-wide font-semibold">
            The Standard for Excellence
          </h1>
          <h2 className="text-base sm:text-2xl md:text-[40px] mt-3 font-light tracking-wide text-center">
            in Ship Management and Marine Services
          </h2>

          {/* CTA Buttons */}
          <div className="mt-10 md:mt-20 flex flex-row gap-4 md:gap-16">
            <Link href="/contact-us" passHref>
              <button className="p-1.5 w-[115px] md:w-[135px] text-sm md:text-base rounded-lg bg-white text-primary hover:text-white hover:border-secondary hover:bg-secondary hover:scale-95 transition duration-300 ease-in-out">
                Contact Us
              </button>
            </Link>
            <Link href="/careers" passHref>
              <button className="p-1.5 w-[115px] md:w-[135px] text-sm md:text-base rounded-lg bg-white text-primary hover:text-white hover:border-secondary hover:bg-secondary hover:scale-95 transition duration-300 ease-in-out">
                Careers
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner

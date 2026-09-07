"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import HeroHeader from "./HeroHeader"

const POSTER_IMAGE =
  "/Ocean.png"

const HeroBanner = () => {
  const videoRef = useRef(null)
  const [isVideoReady, setIsVideoReady] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return undefined

    const isMobile = window.matchMedia("(max-width: 767px)").matches

    const showVideo = () => {
      setIsVideoReady(true)
      video.play().catch(() => {})
    }

    video.load()

    if (!isMobile) {
      video.play().catch(() => {})
      return undefined
    }

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      showVideo()
      return undefined
    }

    video.addEventListener("loadeddata", showVideo, { once: true })

    return () => {
      video.removeEventListener("loadeddata", showVideo)
    }
  }, [])

  return (
    <div className="relative h-screen flex flex-col justify-center items-center overflow-hidden">
      <img
        src={POSTER_IMAGE}
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ease-out md:hidden ${
          isVideoReady ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
        fetchPriority="high"
      />

      <video
        ref={videoRef}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ease-out md:opacity-100 ${
          isVideoReady ? "opacity-100" : "opacity-0"
        }`}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-label="Ocean waves background video"
      >
        <source
          src="https://nautilusshipping.blr1.cdn.digitaloceanspaces.com/nautilusshipping_sea_banner.mp4"
          type="video/mp4"
        />
        <source
          src="https://nautilusshipping.blr1.cdn.digitaloceanspaces.com/nautilus_sea.webm"
          type="video/webm"
        />
        <source
          src="https://nautilusshipping.blr1.cdn.digitaloceanspaces.com/nautilusshipping_sea.mp4"
          type="video/mp4"
        />
        <track
          kind="captions"
          src=""
          srcLang="en"
          label="English captions"
          default
        />
        Your browser does not support the video tag.
      </video>

      <HeroHeader
        logo="/white-logo.png"
        hamburger="/hamburger.svg"
        search="/search.svg"
      />

      <div className="relative max-w-screen-xl w-full mx-auto flex flex-col justify-end md:justify-center items-center px-4 z-10">
        <div className="flex flex-col items-center text-white">
          <h1 className="text-3xl sm:text-5xl md:text-7xl text-center leading-tight tracking-wide font-semibold">
            The Standard for Excellence
          </h1>
          <h2 className="text-base sm:text-2xl md:text-[40px] mt-3 font-light tracking-wide text-center">
            in Ship Management and Marine Services
          </h2>

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

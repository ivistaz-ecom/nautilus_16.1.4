"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import HeroHeader from "./HeroHeader"

const POSTER_IMAGE = "/Ocean.jpg"

const VIDEO_SOURCES = [
  {
    src: "https://nautilusshipping.blr1.cdn.digitaloceanspaces.com/nautilus_sea.webm",
    type: "video/webm",
  },
  {
    src: "https://nautilusshipping.blr1.cdn.digitaloceanspaces.com/nautilusshipping_sea_banner.mp4",
    type: "video/mp4",
  },
  {
    src: "https://nautilusshipping.blr1.cdn.digitaloceanspaces.com/nautilusshipping_sea.mp4",
    type: "video/mp4",
  },
]

const HeroBanner = () => {
  const videoRef = useRef(null)
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false)
  const [isVideoReady, setIsVideoReady] = useState(false)

  // Keep the poster as LCP; start the heavy video only after the page is interactive.
  useEffect(() => {
    let cancelled = false
    let idleId
    let timeoutId

    const startVideo = () => {
      if (cancelled) return
      setShouldLoadVideo(true)
    }

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(startVideo, { timeout: 2500 })
    } else {
      timeoutId = window.setTimeout(startVideo, 1800)
    }

    return () => {
      cancelled = true
      if (idleId && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId)
      }
      if (timeoutId) window.clearTimeout(timeoutId)
    }
  }, [])

  useEffect(() => {
    if (!shouldLoadVideo) return undefined

    const video = videoRef.current
    if (!video) return undefined

    const showVideo = () => {
      setIsVideoReady(true)
      video.play().catch(() => {})
    }

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      showVideo()
      return undefined
    }

    video.addEventListener("loadeddata", showVideo, { once: true })
    video.load()
    video.play().catch(() => {})

    return () => {
      video.removeEventListener("loadeddata", showVideo)
    }
  }, [shouldLoadVideo])

  return (
    <div className="relative h-screen flex flex-col justify-center items-center overflow-hidden bg-primary">
      {/* LCP element: static poster, always painted first */}
      <img
        src={POSTER_IMAGE}
        alt=""
        aria-hidden="true"
        width={414}
        height={738}
        decoding="async"
        fetchPriority="high"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-out ${
          isVideoReady ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      />

      {shouldLoadVideo && (
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-out ${
            isVideoReady ? "opacity-100" : "opacity-0"
          }`}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          poster={POSTER_IMAGE}
          aria-label="Ocean waves background video"
        >
          {VIDEO_SOURCES.map((source) => (
            <source key={source.src} src={source.src} type={source.type} />
          ))}
          Your browser does not support the video tag.
        </video>
      )}

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

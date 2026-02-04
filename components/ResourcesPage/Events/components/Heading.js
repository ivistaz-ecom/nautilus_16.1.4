"use client"

import { useEffect, useRef } from "react"

const Heading = () => {
  const videoRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (videoRef.current) {
          if (entry.isIntersecting) {
            videoRef.current.play()
          } else {
            videoRef.current.pause()
          }
        }
      },
      { threshold: 0.3 } // 30% of the video should be visible to play
    )

    if (videoRef.current) {
      observer.observe(videoRef.current)
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current)
      }
    }
  }, [])

  return (
    <div className="pt-24 md:pt-28 pb-8 md:pb-14">
      <div className="flex flex-col px-3 md:px-0">
        <h1 className="text-2xl sm:text-4xl md:text-7xl font-light text-center px-3 tracking-wider">
          Events
        </h1>

        <div
          className="max-w-screen-lg mx-auto relative mt-7 mb-14"
          data-aos="zoom-in"
        >
          <div className="absolute inset-0 -z-10 bg-primary blur opacity-50 rounded-lg"></div>
          <div className="absolute inset-0 -z-20 bg-secondary blur-2xl opacity-50 rounded-lg"></div>

          <video
            ref={videoRef}
            className="w-full h-auto relative rounded-lg"
            autoPlay
            loop
            playsInline
            controls
            muted
            aria-label="Narayan Rajan interview at TradeWinds TV Studio"
          >
            <source
              src="https://ivista-digital-bucket.blr1.cdn.digitaloceanspaces.com/Nautilus-Website/nautilus-video.mp4"
              type="video/mp4"
            />
            {/* Captions track for accessibility */}
            <track
              kind="captions"
              src=""
              srcLang="en"
              label="English captions"
              default
            />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="bg-primary px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 max-w-screen-lg w-full mx-auto shadow-xl rounded-lg">
          <div className="flex flex-col gap-4 sm:gap-5 text-white">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-light leading-tight tracking-wide">
              Narayan Rajan at the TradeWinds TV Studio
            </h3>
            <p className="text-lg sm:text-xl font-light leading-tight tracking-wide">
              How distrust between shipowners and managers is harming the
              industry
            </p>
            <p className="text-sm sm:text-base md:text-lg font-light leading-tight tracking-wide">
              At the TradeWinds TV Studio, Narayan Rajan (Co-Founder and
              Managing Director) shared how Nautilus is redefining ship
              management by focusing on trust, transparency, and sustainability.
              He addressed key challenges, including bridging the gap between
              owners and managers and steering the industry toward greener
              operations.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Heading

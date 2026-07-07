"use client"

import { useEffect, useRef } from "react"

const BreakBulkMiddleEast = () => {
  const videoRef = useRef(null)

  useEffect(() => {
    const videoEl = videoRef.current
    if (!videoEl) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (videoEl.readyState === 0) {
            videoEl.load()
          }
          videoEl.play().catch(() => {})
        } else {
          videoEl.pause()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(videoEl)

    return () => observer.disconnect()
  }, [])

  return (
    <div className="pb-8 md:py-14">
      <div className="flex flex-col px-3 md:px-0">
        <div
          className="max-w-screen-lg mx-auto relative mt-7 mb-14 isolate"
        >
          <div
            className="absolute inset-0 z-0 bg-primary blur opacity-50 rounded-lg pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 z-0 bg-secondary blur-2xl opacity-50 rounded-lg pointer-events-none"
            aria-hidden="true"
          />

          <video
            ref={videoRef}
            className="relative z-10 w-full h-auto rounded-lg"
            loop
            playsInline
            controls
            muted
            preload="metadata"
          >
            <source
              src="https://ivista-digital-bucket.blr1.cdn.digitaloceanspaces.com/Nautilus-Website/nautilus_events.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="bg-primary px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 max-w-screen-lg w-full mx-auto shadow-xl rounded-lg">
          <div className="flex flex-col gap-4 sm:gap-5 text-white">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-light leading-tight tracking-wide">
              BreakBulk Middle East 2025
            </h3>
            <p className="text-sm sm:text-base md:text-lg font-light leading-tight tracking-wide">
              Two days of insightful discussions, impactful connections, and a
              shared vision for collaborative growth - BreakBulk Middle East
              2025!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BreakBulkMiddleEast

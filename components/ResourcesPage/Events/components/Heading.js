"use client"

import { useEffect, useRef } from "react"

const featuredVideos = [
  {
    src: "https://ivista-digital-bucket.blr1.cdn.digitaloceanspaces.com/Nautilus-Website/nautilus-video.mp4",
    ariaLabel: "Narayan Rajan interview at TradeWinds TV Studio",
    title: "Narayan Rajan at the TradeWinds TV Studio",
    subtitle:
      "How distrust between shipowners and managers is harming the industry",
    description: [
      "At the TradeWinds TV Studio, Narayan Rajan (Co-Founder and Managing Director) shared how Nautilus is redefining ship management by focusing on trust, transparency, and sustainability. He addressed key challenges, including bridging the gap between owners and managers and steering the industry toward greener operations.",
    ],
  },
  {
    src: "https://nautilusshipping.blr1.cdn.digitaloceanspaces.com/website%20video.mp4",
    ariaLabel: "Naavik Sangam: Celebrating One Year Together",
    title: "Naavik Sangam: Celebrating One Year Together",
    description: [
      "On August 7, we came together at Vivanta Navi Mumbai to celebrate our seafarers and the journey we've built together over the past year. Naavik Sangam brought together seafarers, Transworld, and Nautilus Shipping for an evening of reconnection, networking, and shared stories from across the maritime community.",
      "The evening included an awards ceremony honoring our seafarers for their dedication and service. One moment stood out: a seafarer's wife and baby attended to receive his award on his behalf. Seeing his family there, standing in for him, was a powerful reminder of the people behind every voyage and how deeply they value the community we've built",
      "With seafarers, shore teams, and industry colleagues coming together, the evening was filled with meaningful conversations, shared stories, and new connections. It was a celebration of the people who make every voyage possible and the journey we continue to build together.",
    ],
  },
]

const Heading = () => {
  const videoRefs = useRef([])

  useEffect(() => {
    const observers = videoRefs.current
      .filter(Boolean)
      .map((videoEl) => {
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
        return observer
      })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [])

  return (
    <div className="pt-24 md:pt-28 pb-8 md:pb-14">
      <div className="flex flex-col px-3 md:px-0">
        <h1 className="text-2xl sm:text-4xl md:text-7xl font-light text-center px-3 tracking-wider">
          Events
        </h1>

        {featuredVideos.map((video, index) => (
          <div
            key={video.src}
            className={index === 0 ? "mt-7" : "mt-10 md:mt-14"}
          >
            <div className="max-w-screen-lg mx-auto relative mb-14 isolate">
              <div
                className="absolute inset-0 z-0 bg-primary blur opacity-50 rounded-lg pointer-events-none"
                aria-hidden="true"
              />
              <div
                className="absolute inset-0 z-0 bg-secondary blur-2xl opacity-50 rounded-lg pointer-events-none"
                aria-hidden="true"
              />

              <video
                ref={(el) => {
                  videoRefs.current[index] = el
                }}
                className="relative z-10 w-full h-auto rounded-lg"
                loop
                playsInline
                controls
                muted
                preload="metadata"
                aria-label={video.ariaLabel}
              >
                <source src={video.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="bg-primary px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 max-w-screen-lg w-full mx-auto shadow-xl rounded-lg">
              <div className="flex flex-col gap-4 sm:gap-5 text-white">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-light leading-tight tracking-wide">
                  {video.title}
                </h3>
                {video.subtitle ? (
                  <p className="text-lg sm:text-xl font-light leading-tight tracking-wide">
                    {video.subtitle}
                  </p>
                ) : null}
                {video.description.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-sm sm:text-base md:text-lg font-light leading-tight tracking-wide"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Heading

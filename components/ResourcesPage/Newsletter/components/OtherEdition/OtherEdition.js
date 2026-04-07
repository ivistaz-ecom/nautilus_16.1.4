"use client"

import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const oldEditions = [
  {
    year: "2025",
    items: [
      {
        title: "Aging Vessels: Balancing Legacy and Innovation",
        date: "January 2025",
        image: "/resources/image01.png",
        link: "/NL/2025/Jan/January%20Nautilus%20Newsletter%20Compressed.pdf",
      },
      {
        title: "The Changing Tide: A Look at Maritime's Biggest Shifts",
        date: "March 2025",
        image: "/resources/March-Newsletter.jpg",
        link: "/NL/2025/Mar/Nautilus-March-Newsletter.pdf",
      },
      {
        title: "The Hands That Move the World",
        date: "July 2025",
        image: "/resources/Nautilus_July_Newsletter.jpg",
        link: "/NL/2025/July/july-newsletter-updated.pdf",
      },
      {
        title: "For The Sea, For The Future - World Maritime Day",
        date: "September 2025",
        image: "/resources/Nautilus_Newsletter_September_2025.jpg",
        link: "/NL/2025/September/Newsletter-September-2025.pdf",
      },
      {
        title: "The Year Behind Us. The Course Ahead.",
        date: "November 2025",
        image: "/resources/nov-newsletter.webp",
        link: "/NL/2025/November/Newsletter-November-2025.pdf",
      },
     
    ],
  },
]

const OtherEdition = () => {
  const sliderRefs = useRef({})
  const [arrowVisibility, setArrowVisibility] = useState({})

  const baseSettings = useMemo(
    () => ({
      dots: false,
      infinite: false,
      speed: 650,
      cssEase: "ease-in-out",
      slidesToShow: 3,
      slidesToScroll: 1,
      swipeToSlide: true,
      arrows: false,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    }),
    []
  )

  const updateArrowVisibility = useCallback((yearIndex) => {
    const slider = sliderRefs.current[yearIndex]
    const inner = slider?.innerSlider
    if (!inner?.state) return

    const { slideCount = 0, currentSlide = 0 } = inner.state
    const configuredSlidesToShow =
      Number(inner?.props?.slidesToShow) ||
      Number(inner?.state?.slidesToShow) ||
      Number(baseSettings?.slidesToShow) ||
      1
    const show = Math.min(configuredSlidesToShow, slideCount)

    if (slideCount <= show) {
      setArrowVisibility((prev) => ({
        ...prev,
        [yearIndex]: { hidePrev: true, hideNext: true },
      }))
      return
    }

    const maxSlide = Math.max(0, slideCount - show)
    setArrowVisibility((prev) => ({
      ...prev,
      [yearIndex]: {
        hidePrev: currentSlide <= 0,
        hideNext: currentSlide >= maxSlide,
      },
    }))
  }, [baseSettings?.slidesToShow])

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      oldEditions.forEach((_, i) => updateArrowVisibility(i))
    })
    return () => cancelAnimationFrame(id)
  }, [updateArrowVisibility])

  return (
    <>
      <div className="pb-10 px-4 md:px-4">
        <div className="max-w-screen-lg w-full mx-auto space-y-5 sm:space-y-7">
          <h2 className="text-2xl sm:text-[34px] font-light text-left md:text-left">
            Other Editions
          </h2>

          <div className="space-y-5">
            {oldEditions.map((group, yearIndex) => {
              const vis = arrowVisibility[yearIndex]
              const hidePrev = vis?.hidePrev ?? true
              const hideNext = vis?.hideNext ?? group.items.length <= 1

              const sliderSettings = {
                ...baseSettings,
                afterChange: () => updateArrowVisibility(yearIndex),
                onReInit: () => updateArrowVisibility(yearIndex),
              }

              return (
              <div key={group.year} className="space-y-4">
                <h3 className="text-xl sm:text-3xl font-light">{group.year}</h3>
                <div className="relative">
                  <Slider
                    ref={(el) => {
                      sliderRefs.current[yearIndex] = el
                    }}
                    {...sliderSettings}
                    className="newsletter-slick px-1 md:px-6"
                  >
                    {group.items.map((edition) => (
                      <div key={edition.link} className="px-2 sm:px-3">
                        <Link href={edition.link} target="_blank" className="block">
                          <div className="h-[500px] sm:h-[560px] lg:h-[550px] rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
                            <div className="p-3 bg-white shrink-0">
                              <p className="text-base font-light text-gray-900 text-center leading-tight">
                                {edition.date}
                              </p>
                            </div>
                            <Image
                              src={edition.image}
                              width={560}
                              height={380}
                              alt={edition.title}
                              className="w-full h-[380px] sm:h-[380px] lg:h-[400px] object-contain bg-gray-50 shrink-0"
                            />
                            <div className="p-3 bg-white grow flex flex-col justify-between items-center gap-3 mt-3">
                              
                              <span className="py-2 px-4 rounded-lg bg-transparent border border-primary text-primary hover:bg-secondary hover:border-secondary hover:text-white hover:scale-95 transition-all duration-300 ease-in-out text-sm w-fit mx-auto sm:bg-secondary sm:text-white sm:border-secondary sm:hover:bg-primary sm:hover:border-primary sm:hover:text-white">
                                View Newsletter
                              </span>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </Slider>

                  {!hidePrev && (
                  <button
                    type="button"
                    onClick={() => sliderRefs.current[yearIndex]?.slickPrev()}
                    aria-label={`Scroll ${group.year} newsletters left`}
                    className="flex items-center justify-center absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 border border-gray-200 shadow hover:bg-white transition-colors z-10 "
                  >
                    <FaChevronLeft className="text-secondary text-sm sm:text-base" />
                  </button>
                  )}

                  {!hideNext && (
                  <button
                    type="button"
                    onClick={() => sliderRefs.current[yearIndex]?.slickNext()}
                    aria-label={`Scroll ${group.year} newsletters right`}
                    className="flex items-center justify-center absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 border border-gray-200 shadow hover:bg-white transition-colors z-10"
                  >
                    <FaChevronRight className="text-secondary text-sm sm:text-base" />
                  </button>
                  )}
                </div>
              </div>
              )
            })}
          </div>
        </div>
      </div>

      
    </>
  )
}

export default OtherEdition

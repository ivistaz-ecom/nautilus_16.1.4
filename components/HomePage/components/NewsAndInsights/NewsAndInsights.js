"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import NewsAndInsightsItem from "./NewsAndInsightsItem"

const NewsAndInsights = () => {
  const sliderRef = useRef(null)
  const [slideIndex, setSlideIndex] = useState(0)

  const maxSlides = 4 // adjust if dynamic

  return (
    <section className="bg-primary py-7 md:py-14 flex flex-col gap-16">
      <div className="max-w-screen-xl mx-auto w-full flex flex-col lg:flex-row justify-between gap-10 px-4">
        {/* Left Section */}
        <div className="w-full lg:w-[442px] flex flex-col gap-5 text-center lg:text-left">
          <h2 className="text-white text-4xl md:text-6xl lg:text-8xl font-light tracking-wide leading-tight">
            News & <br className="hidden sm:block" /> Insights
          </h2>
          <Link href="/news-and-insights" className="hidden md:block">
            <button className="py-2 px-6 bg-white rounded-lg text-primary hover:bg-secondary hover:text-white hover:scale-95 transition-all duration-300 ease-in-out">
              Read More
            </button>
          </Link>
        </div>

        {/* Right Section (Slider) */}
        <div className="w-full self-end">
          <NewsAndInsightsItem
            sliderRef={sliderRef}
            setSlideIndex={setSlideIndex}
          />
        </div>
      </div>

      {/* Mobile Read More Button */}
      <div className="md:hidden text-center -mt-8">
        <Link href="/news-and-insights">
          <button className="py-2 px-6 bg-white rounded-lg text-primary hover:bg-secondary hover:text-white hover:scale-95 transition-all duration-300 ease-in-out">
            Read More
          </button>
        </Link>
      </div>

      {/* Slider Controls */}
      <div className="w-full flex flex-col md:flex-row items-center justify-center lg:justify-end gap-3 px-4 -mt-8">
        <div className="flex gap-2">
          <button
            onClick={() => sliderRef.current?.slickPrev()}
            aria-label="Previous Slide"
            className="text-gray-400 hover:text-white transition"
          >
            <Image
              src="/arrow.svg"
              width={25}
              height={25}
              alt="Previous"
              className="rotate-180"
            />
          </button>
          <button
            onClick={() => sliderRef.current?.slickNext()}
            aria-label="Next Slide"
            className="text-gray-400 hover:text-white transition"
          >
            <Image src="/arrow.svg" width={25} height={25} alt="Next" />
          </button>
        </div>

        {/* Slider Progress Bar */}
        <input
          type="range"
          min={0}
          max={maxSlides}
          value={slideIndex}
          onChange={(e) => sliderRef.current?.slickGoTo(Number(e.target.value))}
          className="w-full md:w-1/2 cursor-pointer rounded-full"
          style={{
            appearance: "none",
            WebkitAppearance: "none",
            background: `linear-gradient(to right, #008E9C ${
              (slideIndex / maxSlides) * 100
            }%, #ccc ${(slideIndex / maxSlides) * 100}%)`,
            height: "2px",
            borderRadius: "9999px",
          }}
        />
      </div>
    </section>
  )
}
export default NewsAndInsights

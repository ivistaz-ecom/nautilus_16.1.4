"use client"

import FindInsideItem from "./FindInsideItem"
import { useRef, useState } from "react"
import Image from "next/image"

const FindInside = () => {
  const sliderRef = useRef(null)
  const [slideIndex, setSlideIndex] = useState(0)

  return (
    <div className="bg-primary py-10 flex flex-col justify-center gap-10">
      <div className="max-w-screen-lg mx-auto w-full flex flex-col gap-10">
        {/* card 1 */}
        <div className="flex flex-col sm:flex-row gap-10 sm:gap-40 px-4">
          <h2 className="text-white text-3xl sm:text-7xl font-light leading-tight md:leading-tight tracking-wide">
            What You’ll <br /> Find Inside
          </h2>
          <p className="text-base sm:text-lg text-white font-light w-full sm:w-1/3 mt-auto pb-3 tracking-wide">
            Each edition of the Nautilus Newsletter is thoughtfully curated to
            bring you:
          </p>
        </div>

        {/* card 2 */}
        <FindInsideItem sliderRef={sliderRef} setSlideIndex={setSlideIndex} />
      </div>

      <div className="w-full">
        <div className="flex justify-end items-center pr-4 sm:pr-0 gap-1">
          <div className="flex gap-2 ps-2 sm:ps-0">
            <button
              className="text-3xl text-gray-400"
              onClick={() => sliderRef.current.slickPrev()}
            >
              <Image
                src="/arrow.svg"
                width={25}
                height={25}
                alt="arrow"
                className="w-6 h-6 rotate-180"
              />
            </button>
            <button
              className="text-3xl text-gray-400"
              onClick={() => sliderRef.current.slickNext()}
            >
              <Image
                src="/arrow.svg"
                width={25}
                height={25}
                alt="arrow"
                className="w-6 h-6"
              />
            </button>
          </div>
          {/* <hr className="w-3/5 border-gray-400" /> */}
          <label htmlFor="find-inside-slide-slider" className="sr-only">
            Choose slide in newsletter contents
          </label>
          <input
            id="find-inside-slide-slider"
            type="range"
            min={0}
            max={4} // If 4 slidesToShow, adjust max accordingly
            value={slideIndex}
            onChange={(e) =>
              sliderRef.current?.slickGoTo(Number(e.target.value))
            }
            className="w-full md:w-3/5 h-1 cursor-pointer rounded-full bg-white"
            style={{
              appearance: "none",
              WebkitAppearance: "none",
              background: `linear-gradient(to right, #008E9C ${
                (slideIndex / 3) * 100
              }%, #ccc ${(slideIndex / 3) * 100}%)`,
              height: "2px",
              borderRadius: "9999px",
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default FindInside

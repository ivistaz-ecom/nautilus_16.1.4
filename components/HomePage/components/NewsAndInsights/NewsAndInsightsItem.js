"use client"

import { newsAndInsightsData } from "@/utils/data"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const NewsAndInsightsItem = ({ sliderRef, setSlideIndex }) => {
  const sliderSettings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    beforeChange: (oldIndex, newIndex) => setSlideIndex(newIndex),
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3, slidesToScroll: 1 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  }

  return (
    <Slider ref={sliderRef} {...sliderSettings}>
      {newsAndInsightsData.map((item, index) => (
        <div key={index} className="px-4">
          <div className="border border-gray-400 rounded-lg h-full min-h-[225px] flex flex-col">
            {/* Title */}
            <div className="py-3 border-b border-gray-400">
              <h3 className="text-base sm:text-xl text-white text-center tracking-wide">
                {item.title}
              </h3>
            </div>

            {/* Description (Expands to Fill Remaining Space) */}
            <p className="py-7 px-5 text-sm font-light text-center text-white flex items-center tracking-wide">
              {item.desc}
            </p>
          </div>
        </div>
      ))}
    </Slider>
  )
}

export default NewsAndInsightsItem

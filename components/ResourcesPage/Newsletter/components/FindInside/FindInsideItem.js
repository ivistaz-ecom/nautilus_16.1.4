"use client"

import { findInsideList } from "@/utils/resources"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const FindInsideItem = ({ sliderRef, setSlideIndex }) => {
  const sliderSettings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 3,
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
      {findInsideList.map((item, index) => (
        <div key={index} className="px-2">
          <div className="border border-gray-400 rounded-lg h-full min-h-[220px] flex flex-col">
            {/* Title */}
            <div className="py-4 border-b border-gray-400">
              <h3 className="text-base sm:text-xl font-light text-white text-center">
                {item.title}
              </h3>
            </div>

            {/* Description (Expands to Fill Remaining Space) */}
            <p className="p-5 text-base sm:text-lg font-light text-center text-white flex items-center">
              {item.desc}
            </p>
          </div>
        </div>
      ))}
    </Slider>
  )
}

export default FindInsideItem

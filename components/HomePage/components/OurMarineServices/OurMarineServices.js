"use client"

import { arrowIcon } from "@/utils/icon"
import Image from "next/image"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { ourMarineServicesList } from "@/utils/resources"
import Link from "next/link"

const OurMarineServices = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    swipeToSlide: true,
    adaptiveHeight: true,
    customPaging: () => (
      <div className="w-3 h-3 rounded-full border border-gray-300 flex justify-center items-center mt-5">
        <div className="w-2 h-2 rounded-full bg-white opacity-40" />
      </div>
    ),
    appendDots: (dots) => (
      <div className="absolute -bottom-4 flex justify-center">{dots}</div>
    ),
  }

  return (
    <section className="relative bg-primary py-10 md:py-14 overflow-hidden mb-7 md:mb-14">
      <div className="max-w-screen-xl mx-auto w-full px-4 space-y-6 md:space-y-10">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-white text-3xl md:text-8xl font-light tracking-wide">
            Our Marine Services
          </h2>
          <hr className="border-[#707070] mt-4 md:mt-7 mx-auto w-1/2" />
        </div>

        {/* Slider */}
        <div className="w-full">
          <Slider {...settings}>
            {ourMarineServicesList.map((item, index) => (
              <div key={index} className="md:px-10">
                <div className="flex flex-col md:flex-row items-center gap-10 min-h-[500px]">
                  {/* Text Content */}
                  <div className="flex-1 space-y-5 text-center md:text-left">
                    <p className="text-2xl md:text-3xl text-white tracking-wide flex items-center gap-2 justify-center md:justify-start">
                      {item.title}
                      <Link href={item.link} aria-label={`Go to ${item.title}`}>
                        <Image
                          src="/arrow.svg"
                          width={24}
                          height={24}
                          alt="arrow icon"
                          className="w-6 h-6"
                          loading="lazy"
                        />
                      </Link>
                    </p>

                    <p className="text-sm md:text-lg font-light text-white tracking-wide">
                      {item.desc}
                    </p>

                    <Link href={item.link} aria-label={`Read more about ${item.title}`}>
                      <button className="mt-4 py-2 px-5 rounded-lg border border-gray-400 text-white hover:border-secondary hover:bg-secondary hover:scale-95 transition-all duration-300 ease-in-out">
                        Read more about {item.title}
                      </button>
                    </Link>
                  </div>

                  {/* Image */}
                  <div className="flex-1 flex justify-center items-center">
                    <Image
                      src={item.imageUrl}
                      width={470}
                      height={400}
                      alt={item.title}
                      className="w-full max-w-[300px] md:max-w-[470px] h-auto object-contain"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  )
}

export default OurMarineServices

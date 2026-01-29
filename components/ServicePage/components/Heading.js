"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css"

const Heading = ({ data }) => {
  useEffect(() => {
    AOS.init({ duration: 1000 })
  }, [])
  return (
    <>
      <div className="pt-24 md:pt-28 pb-7 md:pb-14 px-3 md:px-4">
        <div className="max-w-screen-lg mx-auto w-full relative">
          <div className="w-full flex flex-col gap-5 h-full">
            <h1
              className="text-3xl md:text-6xl lg:text-7xl font-light leading-tight md:leading-tight lg:leading-tight"
              dangerouslySetInnerHTML={{ __html: data.title }}
            ></h1>

            <div className="block md:hidden">
              <Image
                src={data.imageUrl}
                width={500}
                height={425}
                alt="Ship Management"
              />
            </div>

            <Link href="/contact-us">
              <button className="py-1.5 px-4 rounded-lg border border-gray-500 text-primary hover:text-white hover:border-secondary hover:bg-secondary hover:scale-95 transition-all duration-300 ease-in-out">
                Contact Us
              </button>
            </Link>
          </div>

          {/* Image (Hidden on Mobile) */}
          <div
            className="hidden md:block absolute right-16 top-1/3"
            data-aos="fade-left"
          >
            <Image
              src={data.imageUrl}
              width={500}
              height={425}
              alt="Ship Management"
            />
          </div>
        </div>
        {/* Description Section */}
        <div className="max-w-screen-lg w-full mx-auto pt-5 space-y-3 md:mt-60 md:pe-20">
          <p
            className="text-base md:text-lg font-light text-justify"
            dangerouslySetInnerHTML={{ __html: data.desc1 }}
          ></p>
          <p
            className="text-base md:text-lg font-light text-justify"
            dangerouslySetInnerHTML={{ __html: data.desc2 }}
          ></p>
        </div>
      </div>

      <hr className="border-gray-400 w-full" />
    </>
  )
}

export default Heading

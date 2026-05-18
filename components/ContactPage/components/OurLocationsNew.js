"use client"

import Image from "next/image"
import React, { useEffect, useState } from "react"
import { initFlowbite } from "flowbite"
import { motion } from "framer-motion"
import Link from "next/link"

const pinLocations = [
  {
    top: 258,
    left: 637,
    title: "Dubai",
    content:
      "400-16, Arabian Square Business Center, Fahidi Heights, Al Hamriya, Dubai, UAE",
    tel: "+971 4 2569259",
    location: "https://maps.app.goo.gl/aUDQwWzLub2fjznr5",
  },
  {
    top: 264,
    left: 701,
    title: "Mumbai",
    content:
      "607, 6th Floor, Signature Business Park, Postal Colony Road, Chembur, Mumbai - 400071",
    tel: "+91 22 6998 9999",
    location: "https://maps.app.goo.gl/arX6Mde2tC9TDyWY6",
  },
  {
    top: 285,
    left: 715,
    title: "Bengaluru",
    content:
      "Reliaable Phoenix Towers, 4th Floor, 16 & 16/1, Museum Road, Bengaluru – 560025",
    tel: "+91 80 6998 9999",
    location: " https://maps.app.goo.gl/e9RKwNQ7xQHpVJS79",
  },
  {
    top: 292,
    left: 733,
    title: "Chennai",
    content:
      "1st Foor, Maalavika Centre, 144/145, Kodambakkam High Road, Nungambakkam, Chennai - 600034",
    tel: "+91 44 4684 9999",
    location: "https://maps.app.goo.gl/8XKX5ezuUCcnD3QG6",
  },
  {
    top: 306,
    left: 770,
    title: "Port Blair",
    content:
      "Survey no. 79, Bargat Lane, Chakkar Gaon, South Andaman, Sri Vijaya Puram, A & N Islands - 744112",
    tel: "+91 94 3426 0414",
    location: "https://www.google.com/maps/place/ANGEL+ENTERPRISES/@11.6477875,92.7441664,932m/data=!3m2!1e3!4b1!4m6!3m5!1s0x308894fdf3b71e67:0xcf847364e96c2817!8m2!3d11.6477875!4d92.7441664!16s%2Fg%2F11w8qtbswf!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D", 
  },
  {
    top: 313,
    left: 843,
    title: "Singapore",
    content: "101, Cecil Street, #23-06, Tong Eng Building, Singapore-069533",
    tel: "+65 6224 9999",
    location: "https://maps.app.goo.gl/BjFR3YDbSjevn7Lu7",
  },
  // {
  //   top: 290,
  //   left: 637,
  //   title: "Kochi",
  //   content: "1st floor, SAIPOORNASHREE, #41/139-E, Thevarakavu road, Thripunithura - 682301",
  //   tel: "+65 6224 9999",
  //   location: "https://maps.app.goo.gl/BjFR3YDbSjevn7Lu7",
  // },
]

const OurLocationsNew = () => {
  const [activePopover, setActivePopover] = useState(0)

  useEffect(() => {
    initFlowbite()
  }, [])

  return (
    <div className="hidden">
      <div className="w-full mx-auto px-4 pt-7 md:pt-14">
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-light text-center">
          Our Locations
        </h1>
      </div>

      {/* Location Items */}
      <div className="bg-primary mx-auto py-10 px-4 md:px-10 mt-7">
        <div className="relative w-full max-w-6xl mx-auto">
          <Image
            src="/world-map.svg"
            alt="Map"
            width={1000}
            height={600}
            className="w-full h-[600px]"
          />

          {pinLocations.map((pin, idx) => (
            <div key={idx}>
              <motion.button
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                onClick={() =>
                  setActivePopover((prev) => (prev === idx ? null : idx))
                }
                data-popover-target={`popover-${idx}`}
                type="button"
                className="absolute"
                style={{
                  top: pin.top,
                  left: pin.left,
                  transform: "translate(-50%, -100%)",
                }}
              >
                <Image
                  src="/travel.png"
                  alt="Location Pin"
                  width={25}
                  height={25}
                />
              </motion.button>

              <div
                data-popover
                id={`popover-${idx}`}
                role="tooltip"
                className={`absolute z-10 ${
                  activePopover === idx
                    ? "visible opacity-100"
                    : "invisible opacity-0"
                } transition-opacity duration-300 inline-block w-64 text-sm text-primary bg-white border border-gray-200 rounded-lg shadow-xs dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800`}
              >
                <div className="px-3 py-2 bg-secondary border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
                  <h3 className="font-semibold text-white dark:text-white">
                    {pin.title}
                  </h3>
                </div>
                <div className="px-3 py-2">
                  {/* location card */}
                  <Link href={pin.location} target="_blank">
                    <div className="flex gap-3 items-start">
                      <Image
                        src="/contact-us/location.svg"
                        width={30}
                        height={30}
                        alt="location"
                        className="w-[25px] h-[25px] invert"
                      />
                      <p className="text-xs sm:text-sm font-light tracking-wide">
                        {pin.content}
                      </p>
                    </div>
                  </Link>

                  {/* telephone card */}
                  <a
                    href={`tel:${pin.tel}`}
                    className="flex gap-3 items-center mt-3"
                  >
                    <Image
                      src="/contact-us/call.png"
                      width={30}
                      height={30}
                      alt="call"
                      className="w-[25px] h-[25px] invert"
                    />
                    <p className="text-xs sm:text-sm font-light">{pin.tel}</p>
                  </a>
                </div>
                <div data-popper-arrow></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-gray-400 w-full" />
    </div>
  )
}

export default OurLocationsNew

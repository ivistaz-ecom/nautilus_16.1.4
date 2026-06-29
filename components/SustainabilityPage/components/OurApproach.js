"use client"

import { motion } from "framer-motion"
import { ourApproachList } from "@/utils/resources"
import { useState } from "react"

const OurApproach = () => {
  const [points, setPoints] = useState(ourApproachList[0] || {})
  const [isOpen, setIsOpen] = useState(false) // Dropdown state

  return (
    <>
      <div className="pt-7 md:pt-14 px-3 md:px-0">
        <div className="max-w-screen-lg mx-auto w-full space-y-7">
          <h2 className="text-3xl sm:text-5xl leading-tight md:leading-tight text-center md:text-left tracking-wide">
            Our Approach to <br className="hidden sm:block" /> Sustainable
            Shipping
          </h2>

          <div className="border-y border-gray-400 w-full flex flex-col md:flex-row">
            {/* Dropdown for Mobile */}
            <div className="w-full md:w-[400px]">
              <div className="relative md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="w-full py-4 px-3 text-xl flex justify-between items-center border border-gray-400 bg-primary text-white"
                >
                  {points.title || "Select an approach"}
                  <span
                    className={`transform transition-transform ${isOpen ? "rotate-180" : ""
                      }`}
                  >
                    ▼
                  </span>
                </button>
                {isOpen && (
                  <ul className="absolute left-0 top-full w-full bg-white border border-gray-400 shadow-lg z-10">
                    {ourApproachList
                      .filter((item) => item.title !== points.title)
                      .map((item, index) => (
                        <li
                          key={index}
                          onClick={() => {
                            setPoints(item)
                            setIsOpen(false)
                          }}
                          className="cursor-pointer py-4 px-3 text-xl transition-colors text-black hover:bg-gray-200"
                        >
                          {item.title}
                        </li>
                      ))}
                  </ul>
                )}
              </div>

              {/* List for Larger Screens */}
              <ul className="hidden md:block">
                {ourApproachList.map((item, index) => (
                  <motion.li
                    key={index}
                    onClick={() => setPoints(item)}
                    className={`tracking-wide cursor-pointer py-4 sm:py-5 px-3 border-x md:border-x-0 md:border-r border-gray-400 text-xl sm:text-2xl flex transition-colors duration-300 ${index < ourApproachList.length - 1 ? "border-b" : ""
                      } ${points.title === item.title
                        ? "bg-primary text-white"
                        : "bg-transparent text-black hover:bg-gray-200"
                      }`}
                  >
                    {item.title}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Content Container */}
            <motion.div
              key={points.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="p-5 self-center w-full md:w-3/4 h-auto md:h-[300px] overflow-hidden"
            >
              <h3 className="text-lg sm:text-xl tracking-wide"
                dangerouslySetInnerHTML={{ __html: points.desc }}>
                {/* {points.desc} */}
              </h3>
              {/* <p
            className="text-base md:text-lg font-light"
            dangerouslySetInnerHTML={{ __html: data.desc1 }}
          ></p> */}
              <ul className="space-y-3 list-disc text-base sm:text-lg tracking-wide font-light p-5">
                {points.points.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                  >

                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OurApproach

"use client"

import { plusIcon } from "@/utils/icon"
import { ourFleetList } from "@/utils/resources"
import { useState } from "react"

const OurFleet = () => {
  const [openIndex, setOpenIndex] = useState(0)

  const toggleAccordion = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index))
  }

  return (
    <div className="py-7 md:py-10 space-y-7">
      <h2 className="text-4xl sm:text-7xl font-light text-center tracking-wide">
        Our Fleet at a Glance
      </h2>
      <div className="flex items-center">
        <div className="max-w-screen-lg bg-primary mx-auto w-full px-3 md:px-10">
          <ul className="max-w-screen-lg mx-auto flex flex-col gap-5 w-full py-10 sm:py-14">
            {ourFleetList.map((item, index) => (
              <li key={index} className="border-b border-gray-400 pb-5">
                <div
                  className="flex justify-between items-center text-white cursor-pointer"
                  onClick={() => toggleAccordion(index)}
                >
                  <span className="text-2xl sm:text-3xl tracking-wide">
                    {item.title}
                  </span>
                  <button
                    onClick={() => toggleAccordion(index)}
                    className={`text-lg sm:text-xl transform transition-transform duration-300 ease-in-out ${
                      openIndex === index ? "rotate-45" : "rotate-0"
                    }`}
                    aria-label={openIndex === index ? `Collapse ${item.title} details` : `Expand ${item.title} details`}
                    aria-expanded={openIndex === index}
                  >
                    {plusIcon}
                  </button>
                </div>

                {/* Accordion content with smooth transition */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    openIndex === index
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="mt-5 flex sm:flex-row justify-between items-start sm:items-center md:w-3/4">
                    <span className="text-5xl sm:text-9xl text-white tracking-wide">
                      {item.number}
                    </span>
                    <ul className="text-sm sm:text-xl tracking-wide text-white space-y-2 list-disc">
                      {item.category.map((cat, i) => (
                        <li key={i}>{cat}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default OurFleet

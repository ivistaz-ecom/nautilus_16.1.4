"use client"

import { plusIcon } from "@/utils/icon"
import { useState } from "react"

const ServicesAccordion = ({ servicesList }) => {
  const [openIndex, setOpenIndex] = useState(0)

  const toggleAccordion = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index))
  }

  return (
    <div id="accordion-flush">
      {servicesList.map((service, index) => (
        <div key={index}>
          <h2>
            <button
              type="button"
              onClick={() => toggleAccordion(index)}
              className="flex items-center justify-between w-full py-5 font-medium text-[#2F2F2F] gap-3"
            >
              <span className="text-left text-xl md:text-2xl">
                {service.ques}
              </span>
              <span
                className={`text-xl sm:text-3xl transform transition-transform duration-300 ${
                  openIndex === index ? "rotate-45" : ""
                }`}
              >
                {plusIcon}
              </span>
            </button>
          </h2>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              openIndex === index ? "max-h-[500px] py-5" : "max-h-0"
            } border-b border-gray-400`}
          >
            <p className="text-primary">{service.ans}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ServicesAccordion

"use client"

//import { faqsData } from "@/utils/data"
import { useState } from "react"

const FAQAccordion = ({ data }) => {
  const [openIndex, setOpenIndex] = useState(0)

  const toggleAccordion = (index) =>
    setOpenIndex((prev) => (prev === index ? null : index))

  return (
    <div className="mb-3 divide-y divide-gray-300">
      {data.map((faq, index) => {
        const isOpen = openIndex === index

        return (
          <div key={index} className="w-full">
            <button
              type="button"
              onClick={() => toggleAccordion(index)}
              className="flex items-center justify-between w-full py-5 font-medium text-primary gap-3"
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${index}`}
            >
              <span className="text-left md:text-lg">{faq.ques}</span>
              <svg
                className={`w-3 h-3 transform transition-transform duration-300 ${
                  isOpen ? "rotate-0" : "rotate-180"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>

            <div
              id={`faq-answer-${index}`}
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isOpen ? "max-h-[500px] py-3" : "max-h-0"
              }`}
            >
              <p className="text-primary tracking-wide text-sm md:text-base ps-4">{faq.ans}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default FAQAccordion

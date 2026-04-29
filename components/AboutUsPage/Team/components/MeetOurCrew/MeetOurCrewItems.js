"use client"

import { plusIcon } from "@/utils/icon"
import { crewMemberList } from "@/utils/member"
import Image from "next/image"
import React, { useState, useEffect, useRef } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

const MeetOurCrewItems = () => {
  const [openIndex, setOpenIndex] = useState(0)
  const [scrollStates, setScrollStates] = useState({})
  const scrollRefs = useRef({})

  const toggleTeam = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index))
  }

  // Scroll to left/right
  const scroll = (index, direction) => {
    const scrollContainer = scrollRefs.current[index]
    if (!scrollContainer) return
    const cardWidth = 253 // card width + gap
    scrollContainer.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    })
    // Update after scroll
    setTimeout(() => updateScrollState(index), 300)
  }

  // Update scroll state (check if at start or end)
  const updateScrollState = (index) => {
    const el = scrollRefs.current[index]
    if (!el) return
    const atStart = el.scrollLeft <= 0
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 5
    setScrollStates((prev) => ({
      ...prev,
      [index]: { atStart, atEnd },
    }))
  }

  useEffect(() => {
    // Initialize scroll states when open
    crewMemberList.forEach((_, idx) => updateScrollState(idx))
  }, [])

  return (
    <div className="max-w-screen-lg mx-auto ps-4 pt-14 w-full">
      <ul className="flex flex-col gap-10">
        {crewMemberList.map((item, index) => {
          const showArrows = item.members.length >= 4
          const state = scrollStates[index] || { atStart: true, atEnd: false }

          return (
            <li key={index} data-aos="fade-up" data-aos-delay={index * 100}>
              <div
                className="pr-3 pb-3 border-b border-gray-400 flex justify-between items-center gap-5 cursor-pointer w-full md:w-1/3"
                onClick={() => toggleTeam(index)}
              >
                <span className="text-xl sm:text-2xl font-light">
                  {item.department}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleTeam(index)
                  }}
                  className={`text-lg sm:text-xl transform transition-transform duration-300 ease-in-out ${
                    openIndex === index ? "rotate-45" : ""
                  }`}
                  aria-label={
                    openIndex === index
                      ? `Collapse ${item.department} details`
                      : `Expand ${item.department} details`
                  }
                  aria-expanded={openIndex === index}
                >
                  {plusIcon}
                </button>
              </div>

              {/* Smooth Height Transition */}
              <div
                className={`transition-[max-height] duration-500 ease-in-out overflow-hidden ${
                  openIndex === index ? "max-h-[500px]" : "max-h-0"
                }`}
              >
                <div className="relative">
                  {/* Left Arrow */}
                  {showArrows && !state.atStart && (
                    <button
                      onClick={() => scroll(index, "left")}
                      className="absolute top-1/2 -translate-y-1/2 -left-3 bg-white border rounded-full shadow p-2 z-10"
                    >
                      <FaChevronLeft className="text-secondary" />
                    </button>
                  )}

                  {/* Scroll Container */}
                  <div
                    ref={(el) => (scrollRefs.current[index] = el)}
                    className="overflow-x-auto scrollbar-hide"
                    onScroll={() => updateScrollState(index)}
                  >
                    <ul className="flex gap-3 w-max">
                      {item.members.map((member, i) => (
                        <li
                          key={i}
                          className="border border-secondary rounded-lg group overflow-hidden cursor-pointer shadow flex flex-col h-full max-w-[250px]"
                        >
                          <div className="overflow-hidden rounded-t-md">
                            <Image
                              src={member.imageUrl}
                              width={250}
                              height={270}
                              alt={member.name}
                              className="w-full h-[270px] object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-transform duration-300 ease-in-out"
                            />
                          </div>
                          <div className="bg-primary rounded-b-md flex justify-between items-center p-2 mt-auto">
                            <div className="space-y-1 text-white">
                              <p className="font-light text-sm">
                                {member.name}
                              </p>
                              <p
                                className="text-xs font-[100]"
                                dangerouslySetInnerHTML={{ __html: member.post }}
                              ></p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right Arrow */}
                  {showArrows && !state.atEnd && (
                    <button
                      onClick={() => scroll(index, "right")}
                      className="absolute top-1/2 -translate-y-1/2 -right-3 bg-white border rounded-full shadow p-2 z-10"
                    >
                      <FaChevronRight className="text-secondary" />
                    </button>
                  )}
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default MeetOurCrewItems

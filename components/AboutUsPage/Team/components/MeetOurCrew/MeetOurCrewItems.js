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

  // Scroll one full card so the next slide lines up instead of sitting cut off
  const scroll = (index, direction) => {
    const scrollContainer = scrollRefs.current[index]
    if (!scrollContainer) return
    const card = scrollContainer.querySelector("li")
    const distance = card?.getBoundingClientRect().width || 250
    scrollContainer.scrollBy({
      left: direction === "left" ? -distance : distance,
      behavior: "smooth",
    })
    setTimeout(() => updateScrollState(index), 400)
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
            <li
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="min-w-0"
            >
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
                  openIndex === index ? "max-h-[600px]" : "max-h-0"
                }`}
              >
                <div className="pt-6 pb-2">
                  <div className="relative">
                    {/* Left Arrow */}
                    {showArrows && !state.atStart && (
                      <button
                        onClick={() => scroll(index, "left")}
                        className="absolute top-1/2 -translate-y-1/2 left-0 bg-white border rounded-full shadow p-2 z-10"
                        aria-label={`Show previous ${item.department} members`}
                      >
                        <FaChevronLeft className="text-secondary" />
                      </button>
                    )}

                    {/* Scroll Container */}
                    <div
                      ref={(el) => (scrollRefs.current[index] = el)}
                      className={`overflow-x-auto scrollbar-hide snap-x snap-mandatory ${
                        showArrows ? "mx-9" : ""
                      }`}
                      onScroll={() => updateScrollState(index)}
                    >
                      <ul
                        className="flex w-[calc(100%*var(--slides))] sm:w-[calc(100%*var(--slides)/2)] md:w-[calc(100%*var(--slides)/3)] lg:w-[calc(100%*var(--slides)/4)]"
                        style={{ "--slides": item.members.length }}
                      >
                        {item.members.map((member, i) => (
                          <li
                            key={i}
                            className="shrink-0 snap-start min-w-0 box-border px-1.5 w-[calc(100%/var(--slides))]"
                          >
                            <div className="border border-secondary rounded-lg group overflow-hidden cursor-pointer shadow flex flex-col h-full">
                              <div className="overflow-hidden rounded-t-md shrink-0 leading-none">
                                <Image
                                  src={member.imageUrl}
                                  width={250}
                                  height={270}
                                  alt={member.name}
                                  className="block w-full h-[270px] object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-transform duration-300 ease-in-out"
                                />
                              </div>
                              <div className="bg-primary rounded-b-md flex items-center px-2 h-[4.5rem] shrink-0">
                                <div className="text-white min-w-0">
                                  <p className="font-light text-sm leading-tight truncate">
                                    {member.name}
                                  </p>
                                  <p
                                    className="text-xs font-[100] leading-snug line-clamp-2"
                                    dangerouslySetInnerHTML={{
                                      __html: member.post,
                                    }}
                                  ></p>
                                </div>
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
                        className="absolute top-1/2 -translate-y-1/2 right-0 bg-white border rounded-full shadow p-2 z-10"
                        aria-label={`Show next ${item.department} members`}
                      >
                        <FaChevronRight className="text-secondary" />
                      </button>
                    )}
                  </div>
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

"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

const Committee = ({ data }) => {
  // const [activeModal, setActiveModal] = useState(null)

  // const openModal = (index) => {
  //   setActiveModal(index)
  // }

  // const closeModal = () => {
  //   setActiveModal(null)
  //   setTimeout(() => {
  //     setActiveModal(null) // Ensures React updates the state
  //   }, 0)
  // }

  // useEffect(() => {
  //   if (activeModal !== null) {
  //     document.body.style.overflow = "hidden"
  //   } else {
  //     document.body.style.overflow = "auto"
  //   }

  //   return () => {
  //     document.body.style.overflow = "auto"
  //   }
  // }, [activeModal])

  return (
    <>
      <div className="">
        <div className="max-w-screen-xl mx-auto w-full flex flex-col gap-7 md:gap-10">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-light leading-tight md:leading-tight bg-primary md:bg-transparent rounded-md p-3 md:p-0 text-white md:text-black text-center md:text-left">
            {data.heading}
          </h2>

          <div className="flex justify-center">
            <ul className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {data.members.map((item, index) => {
                return (
                  <li
                    key={index}
                    className="border border-secondary rounded-lg group overflow-hidden cursor-pointer shadow flex flex-col h-full"
                    onClick={() => openModal(index)}
                  >
                    <div className="overflow-hidden rounded-t-md">
                      <Image
                        src={item.imageUrl}
                        width={250}
                        height={270}
                        alt={item.name}
                        className="w-full grayscale group-hover:grayscale-0 group-hover:scale-110 transition-transform duration-300 ease-in-out"
                      />
                    </div>
                    <div className="bg-primary rounded-b-md flex justify-between items-center p-2 mt-auto">
                      <div className="space-y-1 text-white">
                        <p className="font-light text-sm">{item.name}</p>
                        <p className="text-xs font-[100]" dangerouslySetInnerHTML={{ __html: item.post }}></p>
                      </div>
                      {/* <Image
                        src="/arrow.svg"
                        width={25}
                        height={25}
                        alt="arrow"
                        className="w-5 h-5"
                      /> */}
                    </div>

                    {/* Modal with Transition */}
                    {/* <div
                      className={`fixed inset-0 z-50 flex justify-center items-center px-3 transition-all duration-500 transform ${
                        activeModal === index
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-95 pointer-events-none"
                      }`}
                    >
                      <div className="relative p-4 w-full max-w-2xl max-h-full bg-white rounded-lg shadow-xl border border-secondary">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                          <div className="space-y-1">
                            <h3 className="text-xl font-semibold text-primary-text">
                              {item.name}
                            </h3>
                            <p className="text-base">{item.post}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={closeModal}
                          className="absolute -top-3 -right-3 text-white bg-secondary hover:bg-primary rounded-full text-sm w-8 h-8 flex justify-center items-center"
                        >
                          <svg
                            className="w-3 h-3"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                            aria-hidden="true"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                          </svg>
                          <span className="sr-only">Close modal</span>
                        </button>

                        <div className="p-4 md:p-5 space-y-4 max-h-60 overflow-auto">
                          <p className="text-sm leading-relaxed overflow-auto font-light">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </div> */}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Committee

"use client"

import Image from "next/image"
import { useState } from "react"

const wideQuery = "(hover: hover) and (min-width: 1024px)"

const canHoverWide = () =>
  typeof window !== "undefined" && window.matchMedia(wideQuery).matches

const Committee = ({ data, expandOnHover = false }) => {
  const [hovered, setHovered] = useState(null)

  if (!expandOnHover) {
    return (
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
                    className="border border-secondary rounded-lg group overflow-hidden shadow flex flex-col h-full"
                  >
                    <div className="overflow-hidden rounded-t-md">
                      <Image
                        src={item.imageUrl}
                        width={250}
                        height={270}
                        alt={item.name}
                        className="w-full h-auto grayscale group-hover:grayscale-0 group-hover:scale-110 transition-transform duration-300 ease-in-out"
                      />
                    </div>
                    <div className="bg-primary rounded-b-md flex justify-between items-center p-2 mt-auto">
                      <div className="space-y-1 text-white">
                        <p className="font-light text-sm">{item.name}</p>
                        <p
                          className="text-xs font-[100]"
                          dangerouslySetInnerHTML={{ __html: item.post }}
                        ></p>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="">
      <style>{`
        @media (hover: hover) and (min-width: 1024px) {
          .exec-card {
            flex-grow: 0;
            flex-shrink: 0;
            flex-basis: 250px;
            transition:
              flex-grow 1.15s cubic-bezier(0.22, 1, 0.36, 1),
              flex-basis 1.15s cubic-bezier(0.22, 1, 0.36, 1),
              opacity 0.85s ease,
              box-shadow 1.15s ease,
              border-color 0.8s ease;
          }
          .exec-row.is-open .exec-card {
            flex-grow: 0;
            flex-basis: 0px;
            opacity: 0;
          }
          .exec-row.is-open .exec-card.is-active {
            flex-grow: 1;
            flex-basis: 250px;
            opacity: 1;
          }
          .exec-copy {
            transform: translateX(6rem);
            opacity: 0;
            transition:
              transform 1.15s cubic-bezier(0.22, 1, 0.36, 1),
              opacity 1.15s ease;
          }
          .exec-card.is-active .exec-copy {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .exec-card,
          .exec-copy {
            transition: none !important;
          }
        }
      `}</style>
      <div className="max-w-screen-xl mx-auto w-full flex flex-col gap-7 md:gap-10">
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-light leading-tight md:leading-tight bg-primary md:bg-transparent rounded-md p-3 md:p-0 text-white md:text-black text-center md:text-left">
          {data.heading}
        </h2>

        <ul
          className={`exec-row flex w-full flex-col gap-3 transition-[gap] duration-[1150ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none lg:flex-row ${
            hovered === null ? "lg:gap-3" : "is-open lg:gap-0"
          }`}
          style={{ containerType: "inline-size" }}
          onMouseLeave={() => {
            if (canHoverWide()) setHovered(null)
          }}
        >
          {data.members.map((item, index) => {
            const isActive = hovered === index
            const isHidden = hovered !== null && hovered !== index

            return (
              <li
                key={item.name}
                role="button"
                tabIndex={0}
                aria-expanded={isActive}
                aria-label={item.name}
                className={`exec-card group flex min-w-0 flex-col overflow-hidden rounded-lg border border-secondary bg-white shadow-[0_12px_28px_rgba(0,34,47,0.08)] outline-none focus-visible:ring-2 focus-visible:ring-secondary ${
                  isHidden
                    ? "pointer-events-none lg:border-0 lg:shadow-none"
                    : ""
                } ${isActive ? "is-active shadow-[0_22px_48px_rgba(0,34,47,0.16)]" : ""}`}
                onMouseEnter={() => {
                  if (canHoverWide()) setHovered(index)
                }}
                onFocus={() => {
                  if (canHoverWide()) setHovered(index)
                }}
                onBlur={(event) => {
                  if (!canHoverWide()) return
                  if (!event.currentTarget.contains(event.relatedTarget)) {
                    setHovered(null)
                  }
                }}
                onClick={() => {
                  if (canHoverWide()) return
                  setHovered((current) => (current === index ? null : index))
                }}
              >
                <div className="flex w-full flex-1 flex-col lg:flex-row">
                  <div className="flex w-full shrink-0 flex-col lg:w-[250px]">
                    <div className="h-[280px] shrink-0 overflow-hidden">
                      <Image
                        src={item.imageUrl}
                        width={250}
                        height={280}
                        alt={item.name}
                        className={`h-[280px] w-full object-cover object-[center_18%] transition duration-700 ease-out ${
                          isActive ? "grayscale-0" : "grayscale group-hover:grayscale-0"
                        }`}
                      />
                    </div>
                    <div className="flex flex-1 items-center justify-between gap-3 bg-primary px-3 py-3 text-white">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-light leading-tight">{item.name}</p>
                        <p
                          className="mt-0.5 min-h-[2.4em] text-xs font-[100] leading-snug line-clamp-2"
                          dangerouslySetInnerHTML={{ __html: item.post }}
                        ></p>
                      </div>
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-secondary text-white transition-transform duration-700 ease-out group-hover:translate-x-1">
                        <svg
                          viewBox="0 0 20 20"
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          aria-hidden="true"
                        >
                          <path
                            d="M7 4l6 6-6 6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>

                  <div className="relative hidden min-w-0 flex-1 overflow-hidden bg-[#f4fbfc] lg:block">
                    <div
                      aria-hidden={!isActive}
                      className="exec-copy absolute inset-y-0 left-0 flex w-[calc(100cqi-250px)] flex-col justify-center overflow-y-auto border-l border-secondary/25 px-8 py-6"
                    >
                      <h3 className="text-xl font-light text-primary">{item.name}</h3>
                      <p
                        className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-secondary"
                        dangerouslySetInnerHTML={{ __html: item.post }}
                      ></p>
                      <span
                        className={`mt-4 block h-1 rounded-full bg-secondary transition-[width] duration-700 ease-out ${
                          isActive ? "w-10" : "w-0"
                        }`}
                      />
                      <p className="mt-4 max-w-2xl text-[15px] font-light leading-relaxed text-primary/80">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`grid transition-[grid-template-rows] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none lg:hidden ${
                      isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div
                        aria-hidden={!isActive}
                        className={`border-t border-secondary/20 bg-[#f4fbfc] px-4 py-4 transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          isActive ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
                        }`}
                      >
                        <span className="mb-3 block h-1 w-8 rounded-full bg-secondary" />
                        <p className="text-sm font-light leading-relaxed text-primary/80">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Committee

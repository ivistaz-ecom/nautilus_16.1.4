import { eventsListA, eventsListB } from "@/utils/events"
import Image from "next/image"
import BreakBulkMiddleEast from "./BreakBulkMiddleEast"

const EventsItem = () => {
  return (
    <div className="pt-5 pb-14">
      <ul className="flex flex-col max-w-screen-lg mx-auto gap-16">
        {eventsListA.map((item, index) => {
          return (
            <li key={index}>
              <div
                className={`max-w-screen-lg w-full mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-10 px-3 md:px-0 ${
                  index % 2 === 0 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Image Section (Comes first on mobile, alternates on large screens) */}
                <div className="flex justify-center">
                  <Image
                    src={item.imageUrl}
                    width={475}
                    height={400}
                    alt="Our People"
                    className="w-full h-auto max-w-[475px] lg:w-auto"
                  />
                </div>

                {/* Text Content */}
                <div className="space-y-4 lg:space-y-10 text-left">
                  <h2 className="text-xl md:text-3xl font-light tracking-wider">
                    {item.title}
                  </h2>
                  <p className="text-sm md:text-lg font-light">{item.desc}</p>
                </div>
              </div>
              <hr className="w-full border-gray-400 mt-14" />
            </li>
          )
        })}
      </ul>

      <BreakBulkMiddleEast />

      <ul className="flex flex-col max-w-screen-lg mx-auto gap-16">
        {eventsListB.map((item, index) => {
          return (
            <li key={index}>
              <div
                className={`max-w-screen-lg w-full mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-10 px-3 md:px-0 ${
                  index % 2 === 0 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Image Section (Comes first on mobile, alternates on large screens) */}
                <div className="flex justify-center">
                  <Image
                    src={item.imageUrl}
                    width={475}
                    height={400}
                    alt="Our People"
                    className="w-full h-auto max-w-[475px] lg:w-auto"
                  />
                </div>

                {/* Text Content */}
                <div className="space-y-4 lg:space-y-10 text-left">
                  <h2 className="text-xl md:text-3xl font-light tracking-wider">
                    {item.title}
                  </h2>
                  <p className="text-sm md:text-lg font-light">{item.desc}</p>
                </div>
              </div>
              <hr className="w-full border-gray-400 mt-14" />
            </li>
          )
        })}
      </ul>

      {/* BreakBulk Middle East 2025 Section */}
      <div className="mx-3">
        <div className="bg-primary px-4 sm:px-6 lg:px-8 py-7 mt-10 sm:mt-12 lg:mt-14 max-w-screen-lg w-full mx-auto shadow-xl rounded-lg">
          <div className="flex flex-col gap-4 sm:gap-5 text-white">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-light leading-tight tracking-wide">
              BreakBulk Middle East 2024 – Strengthening Logistics and Project
              Cargo
            </h3>
            <p className="text-sm sm:text-base md:text-lg font-light leading-tight tracking-wide">
              Nautilus Shipping showcased its fleet and cargo management
              expertise as an official exhibitor at BreakBulk Middle East 2024.
              Engaging with key stakeholders, we explored emerging trends in
              breakbulk logistics, supply chain efficiency, and port
              infrastructure to enhance maritime trade.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventsItem

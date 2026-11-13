"use client"

import { useState } from "react"
import KeyFeaturesItems from "./KeyFeaturesItems"
import TailorSolutions from "../TailorSolutions/TailorSolutions"
import Game from "@/components/Game/Game"

const KeyFeatures = ({ data, hideGame = false }) => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <>
      <div className="pt-7 md:pt-10 pb-5 px-3 md:px-0">
        <div className="max-w-screen-lg w-full mx-auto space-y-5 sm:space-y-10">
          <h2 className="text-4xl sm:text-6xl font-light leading-tight">
            Key Features
          </h2>

          <KeyFeaturesItems keyFeaturesList={data.keyFeatures} />

          <div className="flex flex-col items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsVisible(!isVisible)}
              className={`peer py-1 px-6 rounded-lg border border-gray-500 text-primary hover:text-white hover:border-secondary hover:bg-secondary hover:scale-95 transition-all duration-300 ease-in-out ${
                isVisible ? "bg-secondary text-white border-none" : ""
              }`}
            >
              {data.buttonText}
            </button>
            <p className="text-lg sm:text-xl text-center font-light opacity-0 invisible transition-opacity duration-300 ease-in-out peer-hover:opacity-100 peer-hover:visible peer-focus:opacity-100 peer-focus:visible">
              {data.desc}
            </p>
          </div>
        </div>
      </div>
      {isVisible && <TailorSolutions />}
      {!hideGame && <Game />}
    </>
  )
}

export default KeyFeatures

"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

const ScrollButton = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let ticking = false

    const toggleVisibility = () => {
      if (ticking) return

      ticking = true
      window.requestAnimationFrame(() => {
        setVisible((current) => {
          const next = window.scrollY > 300
          return current === next ? current : next
        })
        ticking = false
      })
    }

    toggleVisibility()
    window.addEventListener("scroll", toggleVisibility, { passive: true })
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-24 right-5 p-3 rounded-full bg-white text-white shadow-lg z-[9998] transition-all duration-300 ease-in-out 
        ${visible ? "scale-100 opacity-100" : "scale-0 opacity-0"} 
        hover:bg-secondary hover:scale-95`}
      style={{ pointerEvents: visible ? "auto" : "none" }}
    >
      <Image src="/scroll-up.svg" width={22} height={41} alt="scroll up" />
    </button>
  )
}

export default ScrollButton

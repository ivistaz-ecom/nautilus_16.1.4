"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState, useCallback } from "react"
import NavMenu from "./components/NavMenu/NavMenu"
import SearchMenu from "./components/SearchMenu/SearchMenu"

const Header = ({ logo, hamburger, search }) => {
  const [openMenu, setOpenMenu] = useState(false)
  const [openSearchMenu, setOpenSearchMenu] = useState(false)
  const menuRef = useRef(null)
  const logoRef = useRef(null)
  const lineRef = useRef(null)
  const pillRef = useRef(null)

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let frame = 0
    let current = 0
    let target = 0

    const paint = (p) => {
      const logoEl = logoRef.current
      const lineEl = lineRef.current
      const pillEl = pillRef.current

      if (logoEl) {
        logoEl.style.opacity = String(1 - p)
        logoEl.style.transform = `translateY(${(-8 * p).toFixed(2)}px)`
        logoEl.style.pointerEvents = p > 0.6 ? "none" : "auto"
      }

      if (lineEl) {
        lineEl.style.opacity = String(1 - p)
      }

      if (pillEl) {
        pillEl.style.backgroundColor = `rgba(245, 245, 245, ${p})`
        pillEl.style.borderRadius = `${12 * p}px`
        pillEl.style.padding = `${8 * p}px ${20 * p}px`
        pillEl.style.margin = `${-8 * p}px ${-20 * p}px`
        pillEl.style.boxShadow = `0 ${8 * p}px ${18 * p}px rgba(0, 0, 0, ${0.1 * p})`
        pillEl.querySelectorAll("[data-tone='page']").forEach((icon) => {
          icon.style.opacity = String(1 - p)
        })
        pillEl.querySelectorAll("[data-tone='dark']").forEach((icon) => {
          icon.style.opacity = String(p)
        })
      }
    }

    const tick = () => {
      current += (target - current) * (reduce ? 1 : 0.14)
      if (Math.abs(target - current) < 0.004) current = target
      paint(current)
      frame = current === target ? 0 : window.requestAnimationFrame(tick)
    }

    const onScroll = () => {
      target = Math.min(1, Math.max(0, (window.scrollY - 8) / 140))
      if (!frame) frame = window.requestAnimationFrame(tick)
    }

    paint(0)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = openSearchMenu ? "hidden" : "auto"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [openSearchMenu])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleMenu = useCallback(() => {
    setOpenMenu((prev) => !prev)
  }, [])

  const toggleSearch = useCallback(() => {
    setOpenSearchMenu((prev) => !prev)
  }, [])

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="relative max-w-screen-xl mx-auto flex items-center justify-between px-4 py-4">
          <Link
            ref={logoRef}
            href="/"
            aria-label="Nautilus Shipping - Go to homepage"
            className="will-change-[opacity,transform]"
          >
            <Image
              src={logo}
              width={126}
              height={54}
              alt="Nautilus Shipping"
              className="w-[100px] md:w-[126px] h-auto"
            />
          </Link>

          <div
            ref={pillRef}
            className="flex items-center gap-3 md:gap-5 will-change-[background-color,box-shadow]"
          >
            <button onClick={toggleSearch} className="relative h-7 w-7 md:h-[29px] md:w-[29px]">
              <span data-tone="page" className="absolute inset-0">
                <Image
                  src={search}
                  width={29}
                  height={29}
                  alt="search"
                  className="h-full w-full"
                />
              </span>
              <span data-tone="dark" className="absolute inset-0 opacity-0">
                <Image
                  src="/search-dark.svg"
                  width={29}
                  height={29}
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full"
                />
              </span>
            </button>
            <button onClick={toggleMenu} className="relative h-[25px] w-8 md:w-[33px]">
              <span data-tone="page" className="absolute inset-0">
                <Image
                  src={hamburger}
                  width={33}
                  height={25}
                  alt="hamburger-menu"
                  className="h-full w-full"
                />
              </span>
              <span data-tone="dark" className="absolute inset-0 opacity-0">
                <Image
                  src="/hamburger-dark.svg"
                  width={33}
                  height={25}
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full"
                />
              </span>
            </button>
          </div>

          <div
            ref={lineRef}
            className="pointer-events-none absolute bottom-0 left-1/2 h-px w-screen -translate-x-1/2 bg-gray-400"
          />
        </div>
      </nav>

      {/* Menus */}
      {openMenu && <NavMenu menuRef={menuRef} handleMenu={toggleMenu} />}
      {openSearchMenu && (
        <SearchMenu menuRef={menuRef} handleSearchMenu={toggleSearch} />
      )}
    </>
  )
}

export default Header
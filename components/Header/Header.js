"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import NavMenu from "./components/NavMenu/NavMenu"
import SearchMenu from "./components/SearchMenu/SearchMenu"

const Header = ({ logo, hamburger, search }) => {
  const [openMenu, setOpenMenu] = useState(false)
  const [openSearchMenu, setOpenSearchMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
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
      {/* Sticky NavBar */}
      <nav
        className={`border-b border-gray-400 fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled ? "hidden" : "block"
        }`}
      >
        <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-4">
          {/* Logo */}
          <Link href="/" aria-label="Nautilus Shipping - Go to homepage">
            <Image
              src={logo}
              width={126}
              height={54}
              alt="Nautilus Shipping"
              priority
              className="w-[100px] md:w-[126px] h-auto"
            />
          </Link>

          {/* Menu + Search */}
          <div className="flex items-center gap-3 md:gap-5">
            <button onClick={toggleSearch} className="w-7 md:w-[29px]">
              <Image
                src={search}
                width={29}
                height={29}
                alt="search"
                className="w-full h-auto"
              />
            </button>
            <button onClick={toggleMenu} className="w-8 md:w-[33px]">
              <Image
                src={hamburger}
                width={33}
                height={25}
                alt="hamburger-menu"
                className="w-full h-auto"
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Floating Menu (when scrolled) */}
      <AnimatePresence>
        {scrolled && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="bg-[#F5F5F5] inline-flex justify-center items-center py-2 px-4 md:px-6 
              rounded-lg shadow-md fixed top-5 right-5 md:right-20 z-50 gap-3 md:gap-5"
          >
            <button onClick={toggleSearch} className="w-7 md:w-[29px]">
              <Image
                src="/search-dark.svg"
                width={29}
                height={29}
                alt="search"
                className="w-full h-auto"
              />
            </button>
            <button onClick={toggleMenu} className="w-8 md:w-[33px]">
              <Image
                src="/hamburger-dark.svg"
                width={33}
                height={25}
                alt="hamburger-menu"
                className="w-full h-auto"
              />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Menus */}
      {openMenu && <NavMenu menuRef={menuRef} handleMenu={toggleMenu} />}
      {openSearchMenu && (
        <SearchMenu menuRef={menuRef} handleSearchMenu={toggleSearch} />
      )}
    </>
  )
}

export default Header

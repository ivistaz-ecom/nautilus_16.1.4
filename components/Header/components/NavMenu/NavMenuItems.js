import { navMenu } from "@/utils/data"
import Buttons from "./Buttons"
import Link from "next/link"
import { useState } from "react"
import { shorArrowIcon } from "@/utils/icon"

const NavMenuItems = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [submenuTimeout, setSubmenuTimeout] = useState(null)

  const handleMouseEnter = (index) => {
    if (submenuTimeout) clearTimeout(submenuTimeout)
    setHoveredIndex(index)
  }

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setHoveredIndex(null)
    }, 3000)

    setSubmenuTimeout(timeout)
  }

  return (
    <div className="flex flex-col md:flex-row justify-between h-full max-w-screen-xl mx-auto px-5 md:px-10 py-10">
      {/* menu items */}
      <ul className="space-y-3">
        {navMenu.map((item, index) => (
          <li key={index} className="flex items-center gap-1 w-full relative">
            {item.path ? (
              <Link href={item.path} aria-label={`Go to ${item.menu}`}>
                <button
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                  className={`flex items-center gap-1 ${
                    index === hoveredIndex ? "text-secondary" : ""
                  }`}
                >
                  {item.menu}{" "}
                  {item.subMenu.length > 0 &&
                  item.subMenu[0].type === "page" ? (
                    <span className="font-thin" aria-hidden="true">{shorArrowIcon}</span>
                  ) : null}
                </button>
              </Link>
            ) : (
              <button
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                className={`flex items-center gap-1 cursor-default ${
                  index === hoveredIndex ? "text-secondary" : ""
                }`}
              >
                {item.menu}{" "}
                {item.subMenu.length > 0 && item.subMenu[0].type === "page" ? (
                  <span className="font-thin">{shorArrowIcon}</span>
                ) : null}
              </button>
            )}

            {hoveredIndex === index && item.subMenu.length > 0 && (
              <div className="flex items-center gap-3 relative z-20">
                <hr className="w-14 border-black" />
                <ul className="absolute left-[64px] -top-3">
                  {item.subMenu.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <Link href={subItem.path} aria-label={`Go to ${subItem.menu} page`}>
                        <button
                          onMouseEnter={() => handleMouseEnter(index)}
                          onMouseLeave={handleMouseLeave}
                          className="w-[200px] flex items-center gap-1 hover:text-secondary"
                        >
                          {subItem.menu}
                          {/* {subItem.type === "page" && (
                            <span className="font-thin" aria-hidden="true">{shorArrowIcon}</span>
                          )} */}
                        </button>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>

      <div className="self-start">
        <Buttons />
      </div>
    </div>
  )
}

export default NavMenuItems

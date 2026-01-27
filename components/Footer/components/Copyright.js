import Link from "next/link"
import SocialMediaBtn from "../../SocialMediaBtn/SocialMediaBtn"

const Copyright = () => {
  return (
    <div className="border border-b-0 border-gray-400">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center py-3 gap-4 text-center md:text-left">
        {/* Social Media Section */}
        <div className="flex items-center gap-2">
          <p className="text-primary text-sm">Follow us:</p>
          <SocialMediaBtn />
        </div>

        {/* Copyright Text */}
        <span className="text-xs whitespace-nowrap">
          Copyright © {new Date().getFullYear()} Nautilus Shipping. All rights
          reserved.
        </span>

        {/* Footer Links */}
        <ul className="flex items-center gap-2 md:gap-3 text-xs flex-wrap justify-center">
          {/* <li>
          <Link href="/sitemap">
            <button className="hover:text-secondary transition-colors duration-300">
              Sitemap
            </button>
          </Link>
        </li>
        <li className="hidden md:block">|</li> */}
          <li>
            <Link href="/privacy-policy">
              <button className="hover:text-secondary transition-colors duration-300">
                Privacy Statement
              </button>
            </Link>
          </li>
          <li className="hidden md:block">|</li>
          <li>
            <Link href="/disclaimer">
              <button className="hover:text-secondary transition-colors duration-300">
                Disclaimer
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Copyright

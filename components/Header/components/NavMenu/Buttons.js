import SocialMediaBtn from "@/components/SocialMediaBtn/SocialMediaBtn"
import { facebookIcon, instagramIcon, linkedInIcon, xIcon } from "@/utils/icon"
import Link from "next/link"

const Buttons = () => {
  return (
    <div>
      <div className="flex md:flex-col items-center gap-3 mb-3">
        <Link href="/contact-us" aria-label="Go to Contact Us page">
          <button className="py-1.5 px-3 sm:px-4 text-xs sm:text-base md:w-[138px] rounded-lg border border-gray-500 text-primary hover:text-white hover:border-secondary hover:bg-secondary hover:scale-95 transition-all duration-300 ease-in-out">
            Contact Us
          </button>
        </Link>

        <Link href="/careers" aria-label="Go to Careers page">
          <button className="py-1.5 px-3 sm:px-4 text-xs sm:text-base md:w-[138px] rounded-lg border border-gray-500 text-primary hover:text-white hover:border-secondary hover:bg-secondary hover:scale-95 transition-all duration-300 ease-in-out">
            Careers
          </button>
        </Link>
      </div>
      <SocialMediaBtn />
    </div>
  )
}

export default Buttons

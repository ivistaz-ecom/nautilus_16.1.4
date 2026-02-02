import { facebookIcon, instagramIcon, linkedInIcon, mailIcon, phoneIcon, xIcon } from "@/utils/icon"
import Link from "next/link"

const SocialMediaBtn = () => {
  return (
    <div className="space-x-2 flex justify-between">
      <Link
        href="https://www.linkedin.com/company/nautilusshipping/posts/?feedView=all"
        target="_blank"
      >
        <button
          type="button"
          className="p-1 rounded-lg border border-gray-500 hover:bg-secondary hover:text-white hover:scale-95 transition-all duration-300 ease-in-out"
          aria-label="Visit our LinkedIn page"
        >
          {linkedInIcon}
        </button>
      </Link>
      <Link href="https://www.instagram.com/nautilusshipping" target="_blank">
        <button
          type="button"
          className="p-1 rounded-lg border border-gray-500 hover:bg-secondary hover:text-white hover:scale-95 transition-all duration-300 ease-in-out"
          aria-label="Visit our Instagram page"
        >
          {instagramIcon}
        </button>
      </Link>
      <Link
        href="tel:+91 44 4684 9999"
        target="_self"
      >
        <button
          type="button"
          className="p-1 rounded-lg border border-gray-500 hover:bg-secondary hover:text-white hover:scale-95 transition-all duration-300 ease-in-out"
          aria-label="Call us"
        >
          {phoneIcon}
        </button>
      </Link>
      <Link href="mailto:hello@nautilusshipping.com" target="_blank">
        <button
          type="button"
          className="p-1 rounded-lg border border-gray-500 hover:bg-secondary hover:text-white hover:scale-95 transition-all duration-300 ease-in-out"
          aria-label="Email us"
        >
          {mailIcon}
        </button>
      </Link>
    </div>
  )
}

export default SocialMediaBtn

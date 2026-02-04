import { facebookIcon, instagramIcon, linkedInIcon, mailIcon, phoneIcon, xIcon } from "@/utils/icon"
import Link from "next/link"

const SocialMediaBtn = () => {
  return (
    <div className="flex justify-between gap-4">
      <Link
        href="https://www.linkedin.com/company/nautilusshipping/posts/?feedView=all"
        target="_blank"
        aria-label="Visit our LinkedIn page"
        className="relative inline-flex items-center justify-center p-2 rounded-lg border border-gray-500 hover:bg-secondary hover:text-white hover:scale-95 transition-all duration-300 ease-in-out"
      >
        {linkedInIcon}
        {/* Invisible hit area for touch targets */}
        <span className="absolute -inset-2" aria-hidden="true" />
      </Link>
      <Link
        href="https://www.instagram.com/nautilusshipping"
        target="_blank"
        aria-label="Visit our Instagram page"
        className="relative inline-flex items-center justify-center p-2 rounded-lg border border-gray-500 hover:bg-secondary hover:text-white hover:scale-95 transition-all duration-300 ease-in-out"
      >
        {instagramIcon}
        <span className="absolute -inset-2" aria-hidden="true" />
      </Link>
      <Link
        href="tel:+91 44 4684 9999"
        target="_self"
        aria-label="Call us"
        className="relative inline-flex items-center justify-center p-2 rounded-lg border border-gray-500 hover:bg-secondary hover:text-white hover:scale-95 transition-all duration-300 ease-in-out"
      >
        {phoneIcon}
        <span className="absolute -inset-2" aria-hidden="true" />
      </Link>
      <Link
        href="mailto:hello@nautilusshipping.com"
        target="_blank"
        aria-label="Email us"
        className="relative inline-flex items-center justify-center p-2 rounded-lg border border-gray-500 hover:bg-secondary hover:text-white hover:scale-95 transition-all duration-300 ease-in-out"
      >
        {mailIcon}
        <span className="absolute -inset-2" aria-hidden="true" />
      </Link>
    </div>
  )
}

export default SocialMediaBtn

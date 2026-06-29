import { instagramIcon, linkedInIcon, xIcon, youtubeIcon } from "@/utils/icon"
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
        href="https://x.com/Nautilushipping"
        target="_blank"
        aria-label="Visit our X page"
        className="relative inline-flex items-center justify-center p-2 rounded-lg border border-gray-500 hover:bg-secondary hover:text-white hover:scale-95 transition-all duration-300 ease-in-out"
      >
        {xIcon}
        <span className="absolute -inset-2" aria-hidden="true" />
      </Link>
      <Link
        href="https://www.youtube.com/@NautilusShippingIndia"
        target="_blank"
        aria-label="Visit our YouTube channel"
        className="relative inline-flex items-center justify-center p-2 rounded-lg border border-gray-500 hover:bg-secondary hover:text-white hover:scale-95 transition-all duration-300 ease-in-out"
      >
        {youtubeIcon}
        <span className="absolute -inset-2" aria-hidden="true" />
      </Link>
    </div>
  )
}

export default SocialMediaBtn

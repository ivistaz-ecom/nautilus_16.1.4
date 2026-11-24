"use client"

import { usePathname } from "next/navigation"
import Footer from "@/components/Footer/Footer"

const HIDE_FOOTER_PREFIXES = [
  "/narayan-rajan-info",
  "/ajay-krishnamani-info",
  "/info",
]

export default function ConditionalFooter() {
  const pathname = usePathname() || ""

  const hide = HIDE_FOOTER_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  )

  if (hide) return null

  const footerReveal = pathname.startsWith("/sea-service-letter-request")

  return footerReveal ? (
    <div className="ssl-footer-reveal">
      <Footer />
    </div>
  ) : (
    <Footer />
  )
}
"use client"

import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"

const MENU = {
  services: [
    { href: "/service/ship-management", label: "Ship Management" },
    { href: "/service/crew-management", label: "Crew Management" },
    { href: "/service/inspection", label: "Inspection" },
    { href: "/service/commercial-services", label: "Commercial Services" },
    { href: "/service/naval-services", label: "Naval Services" },
  ],
  helpful: [
    { href: "/contact-us", label: "Contact Us" },
    { href: "/careers", label: "Careers" },
    { href: "/sea-service-letter-request", label: "Sea Service Letter" },
    { href: "/news-and-insights", label: "News & Insights" },
    { href: "/stories-from-the-sea", label: "Stories From The Sea" },
  ],
  information: [
    { href: "/about-us/company", label: "Company" },
    { href: "/our-approach", label: "Our Approach" },
    { href: "/fleet", label: "Fleet" },
    { href: "/sustainability", label: "Sustainability" },
  ],
}

export default function LandingHeader() {
  const [open, setOpen] = useState(false)

  const close = useCallback(() => setOpen(false), [])
  const toggle = useCallback(() => setOpen((v) => !v), [])

  useEffect(() => {
    document.body.classList.toggle("menu-open", open)
    return () => document.body.classList.remove("menu-open")
  }, [open])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === "Escape") close()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open, close])

  return (
    <>
      <header className="ssl-landing-header">
        <div className="wrap">
          <Link href="/" aria-label="Nautilus Shipping home">
            <Image
              src="/white-logo.png"
              width={140}
              height={60}
              alt="Nautilus Shipping"
              className="h-auto w-[110px] md:w-[126px]"
              priority
            />
          </Link>
          <nav className="site-nav" aria-label="Main">
            <Link href="/service/crew-management">Crew Management</Link>
            <Link href="/careers">Careers</Link>
            <Link className="pill" href="/contact-us">
              Contact Us
            </Link>
            <button
              className="menu-btn"
              type="button"
              aria-expanded={open}
              aria-controls="sslSiteMenu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={toggle}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                {open ? (
                  <path d="M6 6l12 12M18 6L6 18" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h10" />
                )}
              </svg>
            </button>
          </nav>
        </div>
      </header>

      <div
        className="site-menu"
        id="sslSiteMenu"
        hidden={!open}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        <div className="wrap">
          <div className="top">
            <span className="sr-only">Menu</span>
            <span aria-hidden="true" />
            <button
              className="menu-btn"
              type="button"
              aria-label="Close menu"
              onClick={close}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
          <div className="menu-cols">
            <div>
              <h2>Our Services</h2>
              <ul>
                {MENU.services.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} onClick={close}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2>Helpful Links</h2>
              <ul>
                {MENU.helpful.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} onClick={close}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2>Information</h2>
              <ul>
                {MENU.information.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} onClick={close}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

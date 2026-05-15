"use client"

import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { FaLinkedin, FaFacebookF, FaWhatsapp, FaEnvelope, FaRedditAlien } from "react-icons/fa"
import { FaInstagram, FaXTwitter, FaTelegram } from "react-icons/fa6"
import { SiPinterest, SiLine } from "react-icons/si"
import { BsThreeDotsVertical } from "react-icons/bs"
import { Globe, Phone, Share2, Link2, X } from "lucide-react"

const SOCIAL = [
  {
    href: "https://www.linkedin.com/company/nautilusshipping/",
    label: "Nautilus Shipping on LinkedIn",
    Icon: FaLinkedin,
  },
  {
    href: "https://www.instagram.com/nautilusshipping",
    label: "Nautilus Shipping on Instagram",
    Icon: FaInstagram,
  },
  {
    href: "https://www.facebook.com/NautilusShippingIndia",
    label: "Nautilus Shipping on Facebook",
    Icon: FaFacebookF,
  },
  {
    href: "https://x.com/Nautilusshipping",
    label: "Nautilus Shipping on X",
    Icon: FaXTwitter,
  },
]

const SHARE_TITLE = "Nautilus Shipping"
const SHARE_TEXT =
  "India's fastest growing ship management company — Nautilus Shipping"

function usePageUrl() {
  const [url, setUrl] = useState("")
  useEffect(() => {
    setUrl(window.location.href)
  }, [])
  return url
}

export default function InfoPage() {
  const pageUrl = usePageUrl()
  const [shareOpen, setShareOpen] = useState(false)
  const [copyDone, setCopyDone] = useState(false)
  const sharePanelRef = useRef(null)

  const encodedUrl = useMemo(
    () => (pageUrl ? encodeURIComponent(pageUrl) : ""),
    [pageUrl]
  )
  const encodedText = useMemo(() => encodeURIComponent(SHARE_TEXT), [])
  const encodedTitle = useMemo(() => encodeURIComponent(SHARE_TITLE), [])

  useEffect(() => {
    if (!shareOpen) return
    const onDocMouseDown = (e) => {
      if (
        sharePanelRef.current &&
        !sharePanelRef.current.contains(e.target)
      ) {
        setShareOpen(false)
      }
    }
    const onKey = (e) => {
      if (e.key === "Escape") setShareOpen(false)
    }
    document.addEventListener("mousedown", onDocMouseDown)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onDocMouseDown)
      document.removeEventListener("keydown", onKey)
    }
  }, [shareOpen])

  const copyLink = useCallback(async () => {
    if (!pageUrl) return
    try {
      await navigator.clipboard.writeText(pageUrl)
      setCopyDone(true)
      setTimeout(() => setCopyDone(false), 2000)
    } catch {
      // ignore
    }
  }, [pageUrl])

  const nativeShare = useCallback(async () => {
    if (!pageUrl) return
    try {
      if (navigator.share) {
        await navigator.share({
          title: SHARE_TITLE,
          text: SHARE_TEXT,
          url: pageUrl,
        })
        setShareOpen(false)
      }
    } catch {
      // cancelled or unavailable
    }
  }, [pageUrl])

  const shareLinks = useMemo(() => {
    if (!pageUrl) return []
    return [
      {
        id: "whatsapp",
        label: "WhatsApp",
        href: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`,
        Icon: FaWhatsapp,
      },
      {
        id: "facebook",
        label: "Facebook",
        href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        Icon: FaFacebookF,
      },
      {
        id: "linkedin",
        label: "LinkedIn",
        href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
        Icon: FaLinkedin,
      },
      {
        id: "x",
        label: "X (Twitter)",
        href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
        Icon: FaXTwitter,
      },
      {
        id: "telegram",
        label: "Telegram",
        href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
        Icon: FaTelegram,
      },
      {
        id: "reddit",
        label: "Reddit",
        href: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
        Icon: FaRedditAlien,
      },
      {
        id: "pinterest",
        label: "Pinterest",
        href: `https://www.pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedText}`,
        Icon: SiPinterest,
      },
      {
        id: "line",
        label: "LINE",
        href: `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`,
        Icon: SiLine,
      },
      {
        id: "email",
        label: "Email",
        href: `mailto:?subject=${encodedTitle}&body=${encodedText}%0A%0A${encodedUrl}`,
        Icon: FaEnvelope,
      },
    ]
  }, [pageUrl, encodedUrl, encodedText, encodedTitle])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary px-4 py-10">
      <article
        ref={sharePanelRef}
        className="relative w-full max-w-[420px] rounded-[2rem] bg-primary px-6 pb-10 pt-14 shadow-xl ring-2 ring-secondary/40"
      >
        {/* Top actions — share only, top-right */}
        <div className="absolute right-4 top-4 z-20 flex justify-end">
          <div className="relative">
            <button
              type="button"
              onClick={() => setShareOpen((o) => !o)}
              className={`flex h-10 w-10 items-center justify-center rounded-full bg-secondary/25 text-white shadow-sm ring-1 ring-secondary/40 transition hover:bg-secondary ${
                shareOpen ? "bg-secondary" : ""
              }`}
              aria-expanded={shareOpen}
              aria-haspopup="dialog"
              aria-label="Share this page"
            >
              <Share2 className="h-5 w-5" strokeWidth={1.75} aria-hidden />
            </button>

            {shareOpen && (
              <div
                role="dialog"
                aria-modal="true"
                aria-label="Share via"
                className="absolute right-0 top-12 z-30 w-[min(100vw-2rem,20rem)] rounded-2xl border border-secondary/40 bg-[#001a24] p-3 shadow-2xl ring-1 ring-white/10"
              >
                <div className="mb-2 flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-sm font-semibold text-white">
                    Share
                  </span>
                  <button
                    type="button"
                    onClick={() => setShareOpen(false)}
                    className="rounded-full p-1 text-white/80 hover:bg-white/10 hover:text-white"
                    aria-label="Close share menu"
                  >
                    <X className="h-4 w-4" aria-hidden />
                  </button>
                </div>

                {!pageUrl ? (
                  <p className="px-1 py-2 text-xs text-white/70">Loading…</p>
                ) : (
                  <ul className="max-h-[min(60vh,22rem)] space-y-1 overflow-y-auto pr-1">
                    {typeof navigator !== "undefined" &&
                      typeof navigator.share === "function" && (
                        <li>
                          <button
                            type="button"
                            onClick={nativeShare}
                            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-white transition hover:bg-secondary/30"
                          >
                            <Share2
                              className="h-5 w-5 shrink-0 text-secondary"
                              aria-hidden
                            />
                            <span>Share via device…</span>
                          </button>
                        </li>
                      )}

                    {shareLinks.map(({ id, label, href, Icon }) => (
                      <li key={id}>
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white transition hover:bg-secondary/30"
                        >
                          <Icon
                            className="h-5 w-5 shrink-0 text-secondary"
                            aria-hidden
                          />
                          <span>{label}</span>
                        </a>
                      </li>
                    ))}

                    <li>
                      <button
                        type="button"
                        onClick={copyLink}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-white transition hover:bg-secondary/30"
                      >
                        <FaInstagram
                          className="h-5 w-5 shrink-0 text-secondary"
                          aria-hidden
                        />
                        <span>
                          Instagram (copy link to paste in app)
                          {copyDone ? " — copied!" : ""}
                        </span>
                      </button>
                    </li>

                    <li>
                      <button
                        type="button"
                        onClick={copyLink}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-white transition hover:bg-secondary/30"
                      >
                        <Link2
                          className="h-5 w-5 shrink-0 text-secondary"
                          aria-hidden
                        />
                        <span>Copy link{copyDone ? " — copied!" : ""}</span>
                      </button>
                    </li>
                  </ul>
                )}

                
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="mb-5 flex h-28 w-28 items-center justify-center rounded-full bg-white/10 shadow-inner ring-2 ring-secondary/50">
            <Image
              src="/white-logo.png"
              width={112}
              height={48}
              alt="Nautilus Shipping"
              className="h-auto w-[100px] object-contain"
              priority
            />
          </div>

          <h1 className="text-2xl font-semibold tracking-wide text-white sm:text-[1.65rem]">
            Nautilus Shipping
          </h1>
          <p className="mt-2 max-w-[280px] text-sm font-light leading-snug text-white/85 sm:text-base">
            India&apos;s fastest growing ship management company
          </p>

          <nav
            className="mt-6 flex items-center justify-center gap-6 text-white"
            aria-label="Social media"
          >
            {SOCIAL.map(({ href, label, Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-2xl transition hover:text-secondary hover:scale-110"
              >
                <Icon aria-hidden />
              </a>
            ))}
          </nav>

          <div className="mt-8 flex w-full flex-col gap-3">
            <Link
              href="/"
              className="group flex w-full items-center justify-between rounded-full bg-secondary/25 px-5 py-4 text-white shadow-sm ring-1 ring-secondary/40 transition hover:bg-secondary"
            >
              <span className="flex items-center gap-3">
                <Globe
                  className="h-6 w-6 shrink-0 text-secondary group-hover:text-white"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <span className="text-base font-normal tracking-wide">
                  Website
                </span>
              </span>
              <BsThreeDotsVertical
                className="h-5 w-5 shrink-0 opacity-70 group-hover:text-white"
                aria-hidden
              />
            </Link>

            <Link
              href="/contact-us"
              className="group flex w-full items-center justify-between rounded-full bg-secondary/25 px-5 py-4 text-white shadow-sm ring-1 ring-secondary/40 transition hover:bg-secondary"
            >
              <span className="flex items-center gap-3">
                <Phone
                  className="h-6 w-6 shrink-0 text-secondary group-hover:text-white"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <span className="text-base font-normal tracking-wide">
                  Contact Us
                </span>
              </span>
              <BsThreeDotsVertical
                className="h-5 w-5 shrink-0 opacity-70 group-hover:text-white"
                aria-hidden
              />
            </Link>
          </div>
        </div>
      </article>
    </div>
  )
}

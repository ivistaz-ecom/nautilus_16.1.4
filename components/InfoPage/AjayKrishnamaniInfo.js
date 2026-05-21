"use client"

import Image from "next/image"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import {
  FaLinkedin,
  FaFacebookF,
  FaWhatsapp,
  FaEnvelope,
  FaRedditAlien,
} from "react-icons/fa"

import { FaXTwitter, FaTelegram } from "react-icons/fa6"

import { SiPinterest } from "react-icons/si"

import { Phone, Mail, Share2, Link2, X, Globe } from "lucide-react"

const PROFILE = {
  name: "Ajay Krishnamani",
  title: "Co-Founder & Managing Director",
  imageSrc: "/about-us/member/Ajay.jpg",
  pageUrl: "https://nautilusshipping.com/ajay-krishnamani-info",
  qrSrc: "/info-card-qr/Ajay_krishnamani_info.png",
  linkedin: "https://www.linkedin.com/in/ajay-krishnamani-a1258311/",
  phone: { href: "tel:+919840085546", label: "+91 9840085546" },
  email: {
    href: "mailto:ajay.k@nautilusshipping.com",
    label: "ajay.k@nautilusshipping.com",
  },
  website: {
    href: "https://nautilusshipping.com/",
    label: "nautilusshipping.com",
  },
}

export default function AjayKrishnamaniInfo() {
  const [shareOpen, setShareOpen] = useState(false)
  const [copyDone, setCopyDone] = useState(false)

  const pageUrl = PROFILE.pageUrl

  const sharePanelRef = useRef(null)

  const SHARE_TITLE = PROFILE.name

  const SHARE_TEXT = `Connect with ${PROFILE.name} — ${PROFILE.title}`

  const encodedUrl = useMemo(() => encodeURIComponent(pageUrl), [pageUrl])

  const encodedText = useMemo(() => encodeURIComponent(SHARE_TEXT), [])

  const encodedTitle = useMemo(() => encodeURIComponent(SHARE_TITLE), [])

  useEffect(() => {
    if (!shareOpen) return

    const onDocMouseDown = (e) => {
      if (sharePanelRef.current && !sharePanelRef.current.contains(e.target)) {
        setShareOpen(false)
      }
    }

    const onKey = (e) => {
      if (e.key === "Escape") {
        setShareOpen(false)
      }
    }

    document.addEventListener("mousedown", onDocMouseDown)
    document.addEventListener("keydown", onKey)

    return () => {
      document.removeEventListener("mousedown", onDocMouseDown)
      document.removeEventListener("keydown", onKey)
    }
  }, [shareOpen])

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(pageUrl)

      setCopyDone(true)

      setTimeout(() => {
        setCopyDone(false)
      }, 2000)
    } catch {}
  }, [pageUrl])

  const nativeShare = useCallback(async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: SHARE_TITLE,
          text: SHARE_TEXT,
          url: pageUrl,
        })

        setShareOpen(false)
      }
    } catch {}
  }, [pageUrl])

  const shareLinks = [
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
      id: "email",
      label: "Email",
      href: `mailto:?subject=${encodedTitle}&body=${encodedText}%0A%0A${encodedUrl}`,
      Icon: FaEnvelope,
    },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary px-4 py-10">
      <article
        ref={sharePanelRef}
        className="relative w-full max-w-[420px] min-h-[680px] overflow-hidden rounded-[2rem] bg-white px-6 pb-12 pt-10 shadow-xl ring-2 ring-secondary/40"
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-white to-secondary/5" />

        <div className="absolute right-4 top-4 z-30">
          <button
            type="button"
            onClick={() => setShareOpen((o) => !o)}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-secondary text-white shadow-sm transition duration-300 hover:bg-primary"
          >
            <Share2 className="h-5 w-5" />
          </button>

          {shareOpen && (
            <div
              className="
                absolute right-0 top-12 z-40
                w-[min(100vw-2rem,20rem)]
                max-h-[75vh]
                overflow-y-auto
                overscroll-contain
                scroll-smooth
                rounded-2xl
                border border-secondary/30
                bg-[#001a24]
                shadow-2xl
                ring-1 ring-white/10
                backdrop-blur-xl

                scrollbar-thin
                scrollbar-thumb-[#14b8c4]
                scrollbar-track-transparent
              "
            >
              <div className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-[#001a24] px-4 py-3">
                <h2 className="text-sm font-semibold tracking-wide text-white">
                  Share Contact
                </h2>

                <button
                  type="button"
                  onClick={() => setShareOpen(false)}
                  className="rounded-full p-1 text-white/80 transition hover:bg-white/10 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="p-4">
                <div className="mb-5 flex flex-col items-center">
                  <div className="rounded-2xl bg-white p-3 shadow-lg">
                    <Image
                      src={PROFILE.qrSrc}
                      width={180}
                      height={180}
                      alt={`${PROFILE.name} QR`}
                      className="rounded-xl"
                    />
                  </div>

                  <p className="mt-3 text-xs tracking-wide text-secondary">
                    Scan QR to save contact
                  </p>
                </div>

                {typeof navigator !== "undefined" &&
                  typeof navigator.share === "function" && (
                    <button
                      type="button"
                      onClick={nativeShare}
                      className="mb-2 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-white transition duration-300 hover:bg-secondary/20"
                    >
                      <Share2 className="h-5 w-5 text-secondary" />
                      Share via device
                    </button>
                  )}

                <ul className="space-y-1">
                  {shareLinks.map(({ id, label, href, Icon }) => (
                    <li key={id}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-white transition duration-300 hover:bg-secondary/20"
                      >
                        <Icon className="h-5 w-5 text-secondary" />

                        <span>{label}</span>
                      </a>
                    </li>
                  ))}

                  <li>
                    <button
                      type="button"
                      onClick={copyLink}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-white transition duration-300 hover:bg-secondary/20"
                    >
                      <Link2 className="h-5 w-5 text-secondary" />

                      <span>
                        Copy link
                        {copyDone ? " — copied!" : ""}
                      </span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="mb-5 h-32 w-32 overflow-hidden rounded-full ring-4 ring-secondary shadow-lg">
            <Image
              src={PROFILE.imageSrc}
              width={140}
              height={140}
              alt={PROFILE.name}
              className="h-full w-full object-cover"
              priority
            />
          </div>

          <h1 className="text-3xl font-semibold text-black">{PROFILE.name}</h1>

          <p className="mt-2 text-base font-light leading-relaxed text-black">
            {PROFILE.title}
          </p>

          {PROFILE.linkedin && (
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex items-center gap-2 text-secondary transition duration-300 hover:scale-105"
            >
              <FaLinkedin className="text-2xl" />

              <span className="text-sm font-medium">Connect on LinkedIn</span>
            </a>
          )}

          <div className="mt-10 flex w-full flex-col gap-4">
            {PROFILE.phone && (
              <a
                href={PROFILE.phone.href}
                className="flex w-full items-center rounded-full bg-primary px-4 py-4 text-white shadow-sm transition duration-300 hover:scale-[1.02] hover:bg-secondary"
              >
                <div className="mr-3 flex h-5 w-5 shrink-0 items-center justify-center">
                  <Phone className="h-5 w-5" />
                </div>

                <span className="min-w-0 text-sm sm:text-base">
                  {PROFILE.phone.label}
                </span>
              </a>
            )}

            {PROFILE.email && (
              <a
                href={PROFILE.email.href}
                className="flex w-full items-center rounded-full bg-primary px-4 py-4 text-white shadow-sm transition duration-300 hover:scale-[1.02] hover:bg-secondary"
              >
                <div className="mr-3 flex h-5 w-5 shrink-0 items-center justify-center">
                  <Mail className="h-5 w-5" />
                </div>

                <span className="min-w-0 truncate text-sm sm:text-base">
                  {PROFILE.email.label}
                </span>
              </a>
            )}

            {PROFILE.website && (
              <a
                href={PROFILE.website.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center rounded-full bg-primary px-4 py-4 text-white shadow-sm transition duration-300 hover:scale-[1.02] hover:bg-secondary"
              >
                <div className="mr-3 flex h-5 w-5 shrink-0 items-center justify-center">
                  <Globe className="h-5 w-5" />
                </div>

                <span className="min-w-0 truncate text-sm sm:text-base">
                  {PROFILE.website.label}
                </span>
              </a>
            )}
          </div>
        </div>
      </article>
    </div>
  )
}

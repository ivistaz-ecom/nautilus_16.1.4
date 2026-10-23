"use client"

import React, { useEffect, useState } from "react"
import Header from "@/components/Header/Header"
import Link from "next/link"
import { instagramIcon, linkedInIcon, xIcon, youtubeIcon, linkIcon } from "@/utils/icon"
import Image from "next/image"

const socialLinks = [
  {
    href: "https://www.linkedin.com/company/nautilusshipping/",
    label: "Visit our LinkedIn page",
    icon: linkedInIcon,
  },
  {
    href: "https://www.instagram.com/nautilusshipping",
    label: "Visit our Instagram page",
    icon: instagramIcon,
  },
  {
    href: "https://x.com/Nautilushipping",
    label: "Visit our X page",
    icon: xIcon,
  },
  {
    href: "https://www.youtube.com/@NautilusShippingIndia",
    label: "Visit our YouTube channel",
    icon: youtubeIcon,
  },
]

const domainName = "https://www.nautilusshipping.com"

const Posts = ({ slug, data }) => {
  const [scrollPercentage, setScrollPercentage] = useState(0)
  const [copySuccess, setCopySuccess] = useState(false)

  if (!data || data.length === 0 || !data[0]) {
    return <div className="text-black">No blog found.</div>
  }

  const post = data[0]
  const metaTitle =
    post.acf?.meta_title ||
    post.title?.rendered?.replace(/<[^>]+>/g, "") ||
    "Blog"
  const metaDescription =
    post.acf?.meta_description_ ||
    "Explore the latest insights, updates, and knowledge from Nautilus Shipping."
  const canonical = `${domainName}/news-and-insights/${slug}`
  const metaImage =
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    `${domainName}/logo.png`
  const blogUrl = `${domainName}/news-and-insights/${slug}`

  // --- Detect YouTube video in content ---
  const videoUrlMatch = post.content.rendered.match(
    /<iframe.*?src="(https:\/\/www\.youtube\.com\/embed\/[^"]+)"/
  )
  const videoEmbedUrl = videoUrlMatch ? videoUrlMatch[1] : null
  const videoId = videoEmbedUrl ? videoEmbedUrl.split("/embed/")[1] : null
  const videoThumbnail = videoId
    ? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`
    : null

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonical,
    },
    headline: metaTitle,
    description: metaDescription,
    image: [metaImage],
    author: {
      "@type": "Organization",
      name: post.author_name || "Nautilus Shipping",
    },
    publisher: {
      "@type": "Organization",
      name: "Nautilus Shipping",
      logo: {
        "@type": "ImageObject",
        url: `${domainName}/logo.png`,
      },
    },
    datePublished: post.date,
    dateModified: post.modified,
  }

  const videoJsonLd = videoEmbedUrl
    ? {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: metaTitle,
        description: metaDescription,
        thumbnailUrl: videoThumbnail,
        uploadDate: post.date,
        embedUrl: videoEmbedUrl,
        contentUrl: canonical,
        publisher: {
          "@type": "Organization",
          name: "Nautilus Shipping",
          logo: {
            "@type": "ImageObject",
            url: `${domainName}/logo.png`,
          },
        },
      }
    : null

  // --- Scroll progress bar ---
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight
      const scrollProgress = (scrollTop / scrollHeight) * 100
      setScrollPercentage(scrollProgress)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const handleCopyLink = () => {
    navigator.clipboard.writeText(blogUrl)
    setCopySuccess(true)
    setTimeout(() => setCopySuccess(false), 3000)
  }

  const getReadingTime = (htmlContent, wpm = 200) => {
    if (!htmlContent) return 0
    const text = htmlContent.replace(/<[^>]*>/g, " ")
    const wordCount = text.trim().split(/\s+/).length
    return Math.ceil(wordCount / wpm)
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      {videoJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }}
        />
      )}

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 z-50">
        <div
          className="bg-secondary h-1.5"
          style={{ width: `${scrollPercentage}%` }}
        ></div>
      </div>

      <Header
        logo="/logo.png"
        hamburger="/hamburger-dark.svg"
        search="/search-dark.svg"
      />

      {/* Blog Header Section */}
      <div className="pt-24 md:pt-36 pb-10 px-3 md:px-6 lg:px-4 max-w-screen-lg mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-8">
          <div className="flex flex-col gap-3 w-full md:w-[50%] shrink-0">
            <h1
              className="text-2xl sm:text-3xl font-light text-primary"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
            <p className="text-xs sm:text-sm">
              {getReadingTime(post.content.rendered)} min read
            </p>
            <p className="text-xs sm:text-sm">{formattedDate}</p>
          </div>

          <div className="w-full md:w-[50%]">
            <Image
              src={metaImage}
              width={720}
              height={380}
              alt={post.title.rendered}
              className="rounded-lg w-full h-auto object-contain"
              style={{ width: "100%", height: "auto" }}
              priority
            />
          </div>
        </div>
      </div>

      <hr className="border-gray-400 w-full" />

      {/* Article matches the banner column. Social icons sit outside it. */}
      <div className="mx-auto grid w-full grid-cols-1 py-7 min-[1120px]:grid-cols-[minmax(0,1fr)_minmax(0,1024px)_minmax(0,1fr)]">
        <div className="flex items-start px-3 md:px-6 lg:px-4 min-[1120px]:justify-end min-[1120px]:px-0 min-[1120px]:pr-4">
          <div className="z-30 mb-6 flex h-fit flex-row flex-wrap gap-3 self-start min-[1120px]:sticky min-[1120px]:top-6 min-[1120px]:mb-0 min-[1120px]:flex-col">
            {socialLinks.map(({ href, label, icon }) => (
              <Link
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="bg-white p-1 rounded-lg border border-gray-500 hover:bg-secondary hover:text-white hover:scale-95 transition-all duration-300 ease-in-out"
              >
                {icon}
              </Link>
            ))}
            <button
              onClick={handleCopyLink}
              className="bg-white p-1 rounded-lg border border-gray-500 hover:bg-secondary hover:text-white hover:scale-95 transition-all duration-300 ease-in-out"
              aria-label="Copy link"
            >
              {linkIcon}
            </button>

            {copySuccess && (
              <span
                className="ml-2 text-secondary fixed bottom-10 right-10 p-2 bg-white border border-primary rounded-md shadow-lg transition-opacity duration-1000 ease-in-out opacity-100"
                style={{
                  animation: "fadeOut 1s forwards",
                  animationDelay: "2s",
                }}
              >
                Link copied!
              </span>
            )}
          </div>
        </div>

        <div className="min-w-0 px-3 md:px-6 lg:px-4">
          <div
            className="text-lg text-gray-700 leading-relaxed blog-content"
            dangerouslySetInnerHTML={{
              __html: post.content.rendered,
            }}
          />
        </div>
        <div className="hidden min-[1120px]:block" aria-hidden="true" />
      </div>
    </>
  )
}

export default Posts

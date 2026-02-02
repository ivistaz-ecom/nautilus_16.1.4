"use client"

import React, { useEffect, useState } from "react"
import Header from "@/components/Header/Header"
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share"
import { facebookIcon, linkedInIcon, xIcon, linkIcon } from "@/utils/icon"
import Image from "next/image"

const domainName = "https://nautilusshipping.com"

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
  const blogUrl = `${domainName}/news-insights/${slug}`

  // --- Detect YouTube video in content ---
  const videoUrlMatch = post.content.rendered.match(
    /<iframe.*?src="(https:\/\/www\.youtube\.com\/embed\/[^"]+)"/
  )
  const videoEmbedUrl = videoUrlMatch ? videoUrlMatch[1] : null
  const videoId = videoEmbedUrl ? videoEmbedUrl.split("/embed/")[1] : null
  const videoThumbnail = videoId
    ? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`
    : null

  // --- Meta + JSON-LD Schema ---
  const metaTags = (
    <head>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="robots" content="index,follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="article:modified_time" content={post.modified || ""} />
      <link rel="canonical" href={canonical} />

      {/* Blog JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
          }),
        }}
      />

      {/* Video JSON-LD Schema (only if a YouTube video exists) */}
      {videoEmbedUrl && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
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
            }),
          }}
        />
      )}
    </head>
  )

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
      {metaTags}

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
      <div className="pt-24 md:pt-28 pb-7 px-3 md:px-6 lg:px-4 max-w-screen-lg mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-10">
          <div className="flex flex-col gap-3 w-full md:w-2/5">
            <h1
              className="text-2xl sm:text-3xl font-light text-primary"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
            <p className="text-xs sm:text-sm">
              {getReadingTime(post.content.rendered)} min read
            </p>
            <p className="text-xs sm:text-sm">{formattedDate}</p>
          </div>

          <div className="w-full md:w-1/2">
            <Image
              src={metaImage}
              width={570}
              height={348}
              alt={post.title.rendered}
              className="rounded-lg w-full h-auto md:h-[348px] object-cover"
            />
          </div>
        </div>
      </div>

      <hr className="border-gray-400 w-full" />

      {/* Blog Content + Share Buttons */}
      <div className="flex flex-col md:flex-row justify-between relative overflow-hidden">
        <div className="flex gap-3 absolute md:left-20 md:top-20 left-4 top-4 md:flex-col flex-row">
          <LinkedinShareButton url={blogUrl} title={post.title.rendered}>
            <button className="p-1 rounded-lg border border-gray-500 hover:bg-secondary hover:text-white hover:scale-95 transition-all duration-300 ease-in-out" aria-label="Share on LinkedIn">
              {linkedInIcon}
            </button>
          </LinkedinShareButton>
          <FacebookShareButton url={blogUrl} title={post.title.rendered}>
            <button className="p-1 rounded-lg border border-gray-500 hover:bg-secondary hover:text-white hover:scale-95 transition-all duration-300 ease-in-out" aria-label="Share on Facebook">
              {facebookIcon}
            </button>
          </FacebookShareButton>
          <TwitterShareButton url={blogUrl} title={post.title.rendered}>
            <button className="p-1 rounded-lg border border-gray-500 hover:bg-secondary hover:text-white hover:scale-95 transition-all duration-300 ease-in-out" aria-label="Share on X (Twitter)">
              {xIcon}
            </button>
          </TwitterShareButton>
          <button
            onClick={handleCopyLink}
            className="p-1 rounded-lg border border-gray-500 hover:bg-secondary hover:text-white hover:scale-95 transition-all duration-300 ease-in-out"
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

        <div className="py-7 max-w-screen-lg mx-auto flex flex-col gap-10 px-4 mt-5">
          <div
            className="text-lg text-gray-700 leading-relaxed blog-content"
            dangerouslySetInnerHTML={{
              __html: post.content.rendered,
            }}
          />
        </div>
      </div>
    </>
  )
}

export default Posts

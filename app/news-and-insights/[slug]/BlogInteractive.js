"use client"

import React, { useEffect, useState } from "react"
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share"
import { facebookIcon, linkedInIcon, xIcon, linkIcon } from "@/utils/icon"

const domainName = "https://www.nautilusshipping.com"

const BlogInteractive = ({ slug, post }) => {
  const [scrollPercentage, setScrollPercentage] = useState(0)
  const [copySuccess, setCopySuccess] = useState(false)

  const blogUrl = `${domainName}/news-and-insights/${slug}`

  // Scroll progress bar
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

  const handleCopyLink = () => {
    navigator.clipboard.writeText(blogUrl)
    setCopySuccess(true)
    setTimeout(() => setCopySuccess(false), 3000)
  }

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 z-50">
        <div
          className="bg-secondary h-1.5"
          style={{ width: `${scrollPercentage}%` }}
        ></div>
      </div>

      {/* Share Buttons */}
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
    </>
  )
}

export default BlogInteractive 
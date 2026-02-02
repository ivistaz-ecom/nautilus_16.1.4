"use client"

import Header from "@/components/Header/Header"
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share"
import { facebookIcon, linkedInIcon, xIcon, linkIcon } from "@/utils/icon"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"

const BlogsDetails = ({ slug }) => {
  const [blog, setBlog] = useState(null)
  const [blogUrl, setBlogUrl] = useState("")
  const [loading, setLoading] = useState(true)
  const [copySuccess, setCopySuccess] = useState(false)
  const [scrollPercentage, setScrollPercentage] = useState(0)

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true)

      try {
        const res = await fetch(
          `https://docs.nautilusshipping.com/wp-json/wp/v2/posts?_embed&slug=${slug}`
        )
        const data = await res.json()

        if (data && data.length > 0) {
          setBlog(data[0])
        }
      } catch (error) {
        console.error("Error fetching blog:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlog()

    if (typeof window !== "undefined") {
      setBlogUrl(window.location.href)
    }
  }, [slug])

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
    setTimeout(() => {
      setCopySuccess(false)
    }, 3000)
  }

  const getReadingTime = (htmlContent, wpm = 200) => {
    if (!htmlContent) return 0

    // Remove HTML tags
    const text = htmlContent.replace(/<[^>]*>/g, " ")
    const wordCount = text.trim().split(/\s+/).length

    // Calculate time and round up to nearest minute
    return Math.ceil(wordCount / wpm)
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        {/* <video src="/loading.webm" autoPlay loop muted className="w-40 h-40" /> */}
        <DotLottieReact
          src="https://lottie.host/0863177f-7940-46bc-8ca8-f5340a79be6e/yMs0H818YY.lottie"
          loop
          autoplay
          style={{ width: "250px", height: "250px" }}
        />
      </div>
    )
  }

  if (!blog) {
    return <p className="text-center text-lg">Blog not found.</p>
  }

  const formattedDate = new Date(blog.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <>
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

      <div className="pt-24 md:pt-28 pb-7 px-3 md:px-6 lg:px-4 max-w-screen-lg mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-10">
          {/* Title and Date Section */}
          <div className="flex flex-col gap-3 w-full md:w-2/5">
            {/* Categories */}
            {/* <ul className="flex flex-wrap gap-3">
              {blog.categories.map((category, i) => (
                <li key={i} className="px-3 py-1 border rounded text-xs">
                  {category}
                </li>
              ))}
            </ul> */}

            <h1
              className="text-2xl sm:text-3xl font-light text-primary"
              dangerouslySetInnerHTML={{ __html: blog.title.rendered }}
            />

            <p className="text-xs sm:text-sm">
              {getReadingTime(blog.content.rendered)} min read
            </p>
            <p className="text-xs sm:text-sm">{formattedDate}</p>
          </div>

          {/* Image Section */}
          <div className="w-full md:w-1/2">
            <Image
              src={blog._embedded["wp:featuredmedia"][0].source_url}
              width={570}
              height={348}
              alt={blog.title.rendered}
              className="rounded-lg w-full h-auto md:h-[348px] object-cover"
            />
          </div>
        </div>
      </div>

      <hr className="border-gray-400 w-full" />

      <div className="flex flex-col md:flex-row justify-between relative overflow-hidden">
        {/* Social Media Icons */}
        <div className="flex gap-3 absolute md:left-20 md:top-20 left-4 top-4 md:flex-col flex-row">
          <LinkedinShareButton url={blogUrl} title={blog.title.rendered}>
            <button className="p-1 rounded-lg border border-gray-500 hover:bg-secondary hover:text-white hover:scale-95 transition-all duration-300 ease-in-out" aria-label="Share on LinkedIn">
              {linkedInIcon}
            </button>
          </LinkedinShareButton>
          {/* <button className="p-1 rounded-lg border border-gray-500 hover:bg-secondary hover:text-white hover:scale-95 transition-all duration-300 ease-in-out">
            {instagramIcon}
          </button> */}
          <FacebookShareButton url={blogUrl} title={blog.title.rendered}>
            <button className="p-1 rounded-lg border border-gray-500 hover:bg-secondary hover:text-white hover:scale-95 transition-all duration-300 ease-in-out" aria-label="Share on Facebook">
              {facebookIcon}
            </button>
          </FacebookShareButton>
          <TwitterShareButton url={blogUrl} title={blog.title.rendered}>
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

        {/* Blog Content Section */}
        <div className="py-7 max-w-screen-lg mx-auto flex flex-col gap-10 px-4 mt-5">
          {/* Blog Description (rendering raw HTML content) */}
          <div
            className="text-lg text-gray-700 leading-relaxed blog-content"
            dangerouslySetInnerHTML={{
              __html: blog.content.rendered,
            }}
          />
        </div>
      </div>
    </>
  )
}

export default BlogsDetails

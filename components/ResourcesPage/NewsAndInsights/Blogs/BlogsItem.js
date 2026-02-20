"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const stripHtml = (html) => (html || "").replace(/<[^>]*>/g, "").trim()
const truncate = (text, maxLen = 50) =>
  text.length > maxLen ? `${text.slice(0, maxLen).trim()}…` : text

const BlogsItem = ({ getFilteredBlogs, onViewMore, hasMore, isSubmitting }) => {
  const blogs = getFilteredBlogs()

  return (
    <div>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {blogs.map((item, index) => {
          const parsedDate = Date.parse(item.date)
            ? new Date(item.date)
            : new Date()

          return (
            <li key={index}>
              <div className="bg-primary flex flex-col rounded-lg h-full hover:scale-105 transition-transform p-3">
                <div className="w-full">
                  <Image
                    src={item.imageUrl}
                    width={552}
                    height={226}
                    alt={item.title}
                    className="rounded-xl w-full h-[226px] object-cover"
                  />
                </div>
                <div className="p-3 flex flex-col gap-4 flex-grow">
                  <h2
                    className="text-white text-base md:text-xl"
                    dangerouslySetInnerHTML={{ __html: item.title }}
                  />
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-white text-sm font-light">
                      {parsedDate.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <Link
                      href={`/news-and-insights/${item.slug}`}
                      aria-label={`Read full article: ${stripHtml(item.title)}`}
                    >
                      <button className="flex items-center gap-3 text-sm text-primary bg-white hover:bg-secondary hover:text-white hover:scale-95 transition-all duration-300 rounded-md px-4 py-2 max-w-full">
                        <span className="truncate">Read article: <span aria-hidden="true" className="hidden">{truncate(stripHtml(item.title))}</span></span>
                        <Image
                          src="/dark-arrow.svg"
                          width={20}
                          height={20}
                          alt="arrow"
                        />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ul>

      {hasMore && (
        <div className="mt-6 text-center">
          <button
            onClick={onViewMore}
            type="submit"
            className="py-1.5 px-6 rounded-lg border border-gray-500 text-white bg-primary hover:border-secondary hover:bg-secondary hover:scale-95 transition-all duration-300 ease-in-out inline-flex items-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 me-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539..."
                    fill="currentColor"
                  />
                </svg>
                loading...
              </>
            ) : (
              "View More"
            )}
          </button>
        </div>
      )}
    </div>
  )
}

export default BlogsItem

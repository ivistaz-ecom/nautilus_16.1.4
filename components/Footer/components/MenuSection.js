"use client"

import "@/styles/globals.css"

import Image from "next/image"
import SocialMediaBtn from "../../SocialMediaBtn/SocialMediaBtn"
import {
  helpfulLinksList,
  informationList,
  servicesList,
} from "@/utils/resources"
import Link from "next/link"
import axios from "axios"
import { useState, useEffect } from "react"
//import Slider from "react-slick"
//import "slick-carousel/slick/slick.css"
//import "slick-carousel/slick/slick-theme.css"

const MenuSection = () => {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Ensure Trustpilot widget initializes after script loads
    if (typeof window !== "undefined" && window.Trustpilot) {
      window.Trustpilot.loadFromElement(
        document.querySelector(".trustpilot-widget"),
        true
      )
    }
  }, [])

  // Auto-hide subscription message after 2 seconds
  useEffect(() => {
    if (!message) return

    const timer = setTimeout(() => {
      setMessage("")
    }, 2000)

    return () => clearTimeout(timer)
  }, [message])

  // const settings = {
  //   vertical: true,
  //   verticalSwiping: true,
  //   infinite: true,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   autoplay: true,
  //   autoplaySpeed: 2000,
  //   arrows: false,
  //   dots: false,
  // }

  const handleSubscribe = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    const formData = new FormData()
    formData.append("email", email)
    formData.append("_wpcf7", "10031")
    formData.append("_wpcf7_version", "6.1.4")
    formData.append("_wpcf7_locale", "en_US")
    formData.append("_wpcf7_container_post", "0")
    // Generate unit tag: wpcf7-f{formId}-p{postId}-o{instanceId}
    const instanceId = Math.random().toString(36).substring(2, 15)
    formData.append("_wpcf7_unit_tag", `wpcf7-f10026-p0-o${instanceId}`)

    try {
      const response = await axios.post(
        "https://docs.nautilusshipping.com/wp-json/contact-form-7/v1/contact-forms/10031/feedback",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )

      if (response.data.status === "mail_sent") {
        setMessage("Subscription successful!")
      } else {
        setMessage("Subscription failed. Please try again.")
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.")
    }

    setLoading(false)
    setEmail("")
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr_1fr] gap-5 md:gap-0 border-dashed border-gray-400 ">
      {/* Column 1 - Subscription */}
      <div className="pb-7 md:p-4 flex flex-col items-start gap-3 border-b border-dashed border-gray-400 md:border-b-0 md:border-r">
        <Link href="/" aria-label="Nautilus Shipping - Go to homepage">
          <Image
            src="/logo.png"
            width={143}
            height={61}
            alt="Nautilus Shipping"
            className="hidden md:block"
          />
        </Link>
        <p className="text-primary text-base self-start">
          Stay Updated with Nautilus Highlights
        </p>
        <form
          className="flex flex-col items-start gap-3 w-full"
          onSubmit={handleSubscribe}
        >
          <input
            type="email"
            className="border-b border-t-0 border-x-0 border-gray-400 p-1.5 focus:outline-none focus:ring-0 focus:border-gray-500 appearance-none w-full"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <div className="flex justify-between items-center w-full">
            <button
              type="submit"
              className="py-1.5 px-4 text-sm bg-primary text-white rounded-lg hover:bg-secondary hover:scale-95 transition-all duration-300 ease-in-out disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
           
          </div>
        </form>
        {message && <p className="mt-2 text-sm text-gray-700">{message}</p>}
      </div>

      {/* Column 2 - Links */}
      <div className="  border-b lg:pb-0 pb-6 md:border-b-0 flex flex-row justify-around md:p-4 gap-5 pt-5 md:pt-4 md:border-r border-dashed border-gray-400 sm:gap-0">
        <nav className="flex flex-col md:gap-2 text-primary text-left">
          <h3 className="underline mb-2 md:mb-3 text-sm md:text-base">
            Our Services
          </h3>
          <ul className="flex flex-col md:gap-2">
            {servicesList.map(({ name, path }) => (
              <li key={name}>
                <Link
                  href={path}
                  className="hover:text-secondary transition-colors duration-300 text-xs md:text-base"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav className="flex flex-col text-primary text-left">
          <h3 className="underline mb-2 md:mb-3 text-sm md:text-base">
            Helpful Links
          </h3>
          <ul className="flex flex-col md:gap-2">
            {helpfulLinksList.map(({ name, path }) => (
              <li key={name}>
                <Link
                  href={path}
                  className="hover:text-secondary transition-colors duration-300 text-xs md:text-base"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="flex flex-col text-primary text-left ">
          <h3 className="underline mb-2 md:mb-3 text-sm md:text-base">
            Information
          </h3>
          <ul className="flex flex-col md:gap-2">
            {informationList.map(({ name, path }) => (
              <li key={name}>
                <Link
                  href={path}
                  className="hover:text-secondary transition-colors duration-300 text-xs md:text-base"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Column 3 - Trustpilot & Certification */}
      <div className="flex flex-col items-start lg:mt-6 mt-0  w-full px-3 lg:px-0 ">

        <div className="space-y-3 w-full">
        <div className="flex justify-center pb-3 lg:border-b lg:border-gray-300 lg:mx-5">
              <a
                href="https://www.trustpilot.com/review/nautilusshipping.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Review Nautilus Shipping on Trustpilot"
                className="inline-flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-1.5 hover:shadow-md transition-shadow duration-300"
              >
                <span className="text-sm text-gray-700">Review us on</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="20.5 248.5 600 147.3" 
                  className="h-4 w-auto"
                >
                  <path d="m178.2 300.7h60.7v11.3h-23.9v63.7h-13.1v-63.7h-23.8zm58.1 20.7h11.2v10.5h.2c.4-1.5 1.1-2.9 2.1-4.3s2.2-2.7 3.7-3.8c1.4-1.2 3-2.1 4.8-2.8 1.7-.7 3.5-1.1 5.3-1.1 1.4 0 2.4.1 2.9.1.5.1 1.1.2 1.6.2v11.5c-.8-.2-1.7-.3-2.6-.4s-1.7-.2-2.6-.2c-2 0-3.9.4-5.7 1.2s-3.3 2-4.7 3.5c-1.3 1.6-2.4 3.5-3.2 5.8s-1.2 5-1.2 8v25.8h-12zm86.8 54.3h-11.8v-7.6h-.2c-1.5 2.8-3.7 4.9-6.6 6.6s-5.9 2.5-8.9 2.5c-7.1 0-12.3-1.7-15.5-5.3-3.2-3.5-4.8-8.9-4.8-16v-34.5h12v33.3c0 4.8.9 8.2 2.8 10.1 1.8 2 4.4 3 7.7 3 2.5 0 4.6-.4 6.3-1.2s3.1-1.8 4.1-3.1c1.1-1.3 1.8-2.9 2.3-4.7s.7-3.8.7-5.9v-31.5h12v54.3zm20.4-17.4c.4 3.5 1.7 5.9 4 7.4 2.3 1.4 5.1 2.1 8.3 2.1 1.1 0 2.4-.1 3.8-.3s2.8-.5 4-1c1.3-.5 2.3-1.2 3.1-2.2s1.2-2.2 1.1-3.7-.6-2.8-1.7-3.8-2.4-1.7-4-2.4c-1.6-.6-3.5-1.1-5.6-1.5s-4.2-.9-6.4-1.4-4.4-1.1-6.5-1.8-3.9-1.6-5.6-2.9c-1.6-1.2-3-2.7-3.9-4.6-1-1.9-1.5-4.1-1.5-6.9 0-3 .7-5.4 2.2-7.4 1.4-2 3.3-3.6 5.5-4.8s4.7-2.1 7.4-2.6 5.3-.7 7.7-.7c2.8 0 5.5.3 8 .9s4.9 1.5 6.9 2.9c2.1 1.3 3.8 3.1 5.1 5.2 1.4 2.1 2.2 4.7 2.6 7.7h-12.5c-.6-2.9-1.9-4.8-3.9-5.8-2.1-1-4.4-1.5-7.1-1.5-.8 0-1.9.1-3 .2-1.2.2-2.2.4-3.3.8-1 .4-1.9 1-2.6 1.7s-1.1 1.7-1.1 2.9c0 1.5.5 2.6 1.5 3.5s2.3 1.6 4 2.3c1.6.6 3.5 1.1 5.6 1.5s4.3.9 6.5 1.4 4.3 1.1 6.4 1.8 4 1.6 5.6 2.9c1.6 1.2 3 2.7 4 4.5s1.5 4.1 1.5 6.7c0 3.2-.7 5.9-2.2 8.2-1.5 2.2-3.4 4.1-5.7 5.5s-5 2.4-7.8 3.1c-2.9.6-5.7 1-8.5 1-3.4 0-6.6-.4-9.5-1.2s-5.5-2-7.6-3.5c-2.1-1.6-3.8-3.5-5-5.9-1.2-2.3-1.9-5.1-2-8.4h12.1v.1zm39.5-36.9h9.1v-16.4h12v16.3h10.8v8.9h-10.8v29c0 1.3.1 2.3.2 3.3.1.9.4 1.7.7 2.3.4.6 1 1.1 1.7 1.4.8.3 1.8.5 3.2.5.8 0 1.7 0 2.5-.1s1.7-.2 2.5-.4v9.3c-1.3.2-2.6.3-3.9.4-1.3.2-2.5.2-3.9.2-3.2 0-5.7-.3-7.6-.9s-3.4-1.5-4.5-2.6c-1.1-1.2-1.8-2.6-2.2-4.3s-.6-3.8-.7-6v-32h-9.1v-9.1zm40.3 0h11.3v7.4h.2c1.7-3.2 4-5.4 7-6.8s6.2-2.1 9.8-2.1c4.3 0 8 .7 11.2 2.3 3.2 1.5 5.8 3.5 7.9 6.2 2.1 2.6 3.7 5.7 4.7 9.2s1.6 7.3 1.6 11.2c0 3.7-.5 7.2-1.4 10.6-1 3.4-2.4 6.5-4.3 9.1s-4.3 4.7-7.3 6.3-6.4 2.4-10.4 2.4c-1.7 0-3.5-.2-5.2-.5s-3.4-.8-5-1.5-3.1-1.6-4.4-2.7c-1.4-1.1-2.5-2.4-3.4-3.8h-.2v27.1h-12v-74.4zm41.9 27.2c0-2.4-.3-4.8-1-7.1-.6-2.3-1.6-4.3-2.9-6.1s-2.9-3.2-4.7-4.3c-1.9-1.1-4.1-1.6-6.5-1.6-5 0-8.8 1.7-11.4 5.2-2.5 3.5-3.8 8.2-3.8 14 0 2.8.3 5.3 1 7.6s1.6 4.3 3 6c1.3 1.7 2.9 3 4.8 4s4 1.5 6.5 1.5c2.8 0 5-.6 6.9-1.7s3.4-2.6 4.7-4.3c1.2-1.8 2.1-3.8 2.6-6.1.5-2.4.8-4.7.8-7.1zm21.1-47.9h12v11.3h-12zm0 20.7h12v54.3h-12zm22.7-20.7h12v75h-12zm48.6 76.5c-4.3 0-8.2-.7-11.6-2.2s-6.2-3.4-8.6-5.9c-2.3-2.5-4.1-5.6-5.3-9.1s-1.9-7.4-1.9-11.5.6-7.9 1.9-11.4c1.2-3.5 3-6.5 5.3-9.1 2.3-2.5 5.2-4.5 8.6-5.9s7.3-2.2 11.6-2.2 8.2.7 11.6 2.2c3.4 1.4 6.2 3.4 8.6 5.9 2.3 2.5 4.1 5.6 5.3 9.1s1.9 7.3 1.9 11.4c0 4.2-.6 8-1.9 11.5s-3 6.5-5.3 9.1c-2.3 2.5-5.2 4.5-8.6 5.9s-7.2 2.2-11.6 2.2zm0-9.5c2.6 0 5-.6 6.9-1.7 2-1.1 3.5-2.6 4.8-4.4s2.2-3.9 2.8-6.1c.6-2.3.9-4.6.9-7 0-2.3-.3-4.6-.9-6.9s-1.5-4.3-2.8-6.1-2.9-3.2-4.8-4.3c-2-1.1-4.3-1.7-6.9-1.7s-5 .6-6.9 1.7c-2 1.1-3.5 2.6-4.8 4.3-1.3 1.8-2.2 3.8-2.8 6.1s-.9 4.6-.9 6.9c0 2.4.3 4.7.9 7s1.5 4.3 2.8 6.1 2.9 3.3 4.8 4.4c2 1.2 4.3 1.7 6.9 1.7zm31-46.3h9.1v-16.4h12v16.3h10.8v8.9h-10.8v29c0 1.3.1 2.3.2 3.3.1.9.4 1.7.7 2.3.4.6 1 1.1 1.7 1.4.8.3 1.8.5 3.2.5.8 0 1.7 0 2.5-.1s1.7-.2 2.5-.4v9.3c-1.3.2-2.6.3-3.9.4-1.3.2-2.5.2-3.9.2-3.2 0-5.7-.3-7.6-.9s-3.4-1.5-4.5-2.6c-1.1-1.2-1.8-2.6-2.2-4.3s-.6-3.8-.7-6v-32h-9.1v-9.1z"/>
                  <path d="m164.2 300.7h-54.9l-16.9-52.2-17 52.2-54.9-.1 44.4 32.3-17 52.2 44.4-32.3 44.4 32.3-16.9-52.2z" fill="#00b67a"/>
                  <path d="m123.6 344.7-3.8-11.8-27.4 19.9z" fill="#005128"/>
                </svg>
              </a>
            </div>
          <div className="space-y-3 text-ce flex flex-col items-center">
            <p className="text-xs md:text-base tracking-wide">RPSL No: RPSL/CHN/012</p>
            <p className="text-xs md:text-base tracking-wide">Exp. Date: 29-12-2026</p>
            <p className="text-xs md:text-base tracking-wide">
              An ISO 9001:2015 <br/> Certified Company
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MenuSection

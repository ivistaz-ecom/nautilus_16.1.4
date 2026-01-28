"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import axios from "axios"

const HomePageModal = () => {
  const [showModal, setShowModal] = useState(false)
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Show modal every time the home page is visited
    const timer = setTimeout(() => {
      setShowModal(true)
    }, 500)
    
    return () => clearTimeout(timer)
  }, [])

  // Disable background scroll when modal is open
  useEffect(() => {
    if (showModal) {
      // Save current scroll position
      const scrollY = window.scrollY
      // Disable scroll
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
      
      return () => {
        // Re-enable scroll when modal closes
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.width = ''
        document.body.style.overflow = ''
        window.scrollTo(0, scrollY)
      }
    }
  }, [showModal])

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
        setMessage("Thank you for subscribing!")
        setEmail("")
        // Optionally close modal after successful subscription
        setTimeout(() => {
          setShowModal(false)
        }, 2000)
      } else {
        setMessage("Subscription failed. Please try again.")
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.")
    }

    setLoading(false)
  }

  const handleClose = () => {
    setShowModal(false)
  }

  if (!showModal) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full min-h-[450px] p-8  md:p-12 flex flex-col items-center justify-center relative">
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute -top-0 -right-0  text-primary  hover:text-[#008E9C] rounded-full text-sm w-10 h-10 mt-2 me-2 flex justify-center items-center transition-colors duration-200"
          aria-label="Close modal"
        >
          <svg
            className="w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
            aria-hidden="true"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>

        {/* Footer Left Side Content */}
        <div className="w-full flex flex-col justify-center items-center gap-6">
          {/* Logo */}
          <Link href="/" aria-label="Nautilus Shipping - Go to homepage">
            <Image
              src="/logo.png"
              width={200}
              height={85}
              alt="Nautilus Shipping"
              className="object-contain"
              priority
            />
          </Link>

          {/* Text */}
          <p className="text-primary text-lg md:text-xl ">
            Stay Updated with Nautilus 
          </p>

          {/* Email Subscription Form */}
          <form
            className="flex flex-col items-center gap-4 w-full"
            onSubmit={handleSubscribe}
          >
            <input
              type="email"
              className=" lg:w-[50%] w-[85%] border-b border-t-0 border-x-0 border-gray-400 p-2 focus:outline-none focus:ring-0 focus:border-gray-500 appearance-none  text-md "
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <div className=" w-full flex justify-center items-center pt-2">
              <button
                type="submit"
                className="py-2.5 px-6 text-base bg-primary text-white rounded-lg hover:bg-secondary hover:scale-95 transition-all duration-300 ease-in-out disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Subscribing..." : "Subscribe for Newsletters"}
              </button>
            </div>
          </form>
          
          {/* Message */}
          {message && (
            <p className={`text-sm  ${message.includes("successful") ? "text-green-600" : "text-red-600"}`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default HomePageModal


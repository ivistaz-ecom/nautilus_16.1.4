"use client"

import { useState } from "react"

import axios from "axios"

const Subscribe = () => {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    const formData = new FormData()
    
    // Contact Form 7 required fields
    formData.append("_wpcf7", "10031")
    formData.append("_wpcf7_version", "6.1.4")
    formData.append("_wpcf7_locale", "en_US")
    formData.append("_wpcf7_container_post", "0")
    // Generate unit tag: wpcf7-f{formId}-p{postId}-o{instanceId}
    const instanceId = Math.random().toString(36).substring(2, 15)
    formData.append("_wpcf7_unit_tag", `wpcf7-f10031-p0-o${instanceId}`)
    
    formData.append("email", email)

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
        setMessage(
          "Thank you for subscribing! Stay tuned for the latest updates, insights, and industry news straight to your inbox."
        )
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
    <div className="py-7 md:py-14 px-4 sm:px-6">
      <div className="max-w-screen-lg w-full mx-auto">
        <h3 className="text-2xl sm:text-3xl text-primary tracking-wide">
          Subscribe to Our Newsletter
        </h3>
        <form
          className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 sm:py-4 mt-5"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            className="border-b border-t-0 border-x-0 border-gray-300 p-2 w-full sm:w-72 text-lg sm:text-xl focus:outline-none focus:ring-0 focus:border-gray-500 appearance-none"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <button
            type="submit"
            className="self-start py-1.5 px-5 sm:w-auto bg-primary text-white rounded-lg hover:bg-secondary hover:scale-95 transition-all duration-300 ease-in-out disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
        {message && (
          <p className="mt-4 text-sm text-gray-700 text-center sm:text-left">
            {message}
          </p>
        )}
      </div>
    </div>
  )
}

export default Subscribe

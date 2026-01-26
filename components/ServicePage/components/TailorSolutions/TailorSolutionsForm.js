"use client"

import axios from "axios"
import Image from "next/image"
import { useState } from "react"

const TailorSolutionsForm = () => {
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    vesselType: "",
    operationalChallenge: "",
    message: "",
  })

  const validateForm = () => {
    let newErrors = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address"
    }
    if (!formData.company.trim()) newErrors.company = "Company name is required"
    if (!formData.vesselType.trim())
      newErrors.vesselType = "Vessel type is required"
    if (!formData.operationalChallenge.trim())
      newErrors.operationalChallenge = "Operational Challenge is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleForm = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const data = new FormData()
      
      // Contact Form 7 required fields
      data.append("_wpcf7", "10033")
      data.append("_wpcf7_version", "6.1.4")
      data.append("_wpcf7_locale", "en_US")
      data.append("_wpcf7_container_post", "0")
      // Generate unit tag: wpcf7-f{formId}-p{postId}-o{instanceId}
      const instanceId = Math.random().toString(36).substring(2, 15)
      data.append("_wpcf7_unit_tag", `wpcf7-f10033-p0-o${instanceId}`)
      
      data.append("name", formData.name)
      data.append("email", formData.email)
      data.append("company", formData.company)
      data.append("vesselType", formData.vesselType)
      data.append("operationalChallenge", formData.operationalChallenge)
      data.append("message", formData.message)

      const response = await axios.post(
        "https://docs.nautilusshipping.com/wp-json/contact-form-7/v1/contact-forms/10033/feedback",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )

      console.log("Form Submitted Successfully:", response.data)

      setShowPopup(true)

      setFormData({
        name: "",
        email: "",
        company: "",
        vesselType: "",
        operationalChallenge: "",
        message: "",
      })

      setErrors({})
    } catch (error) {
      console.error("Form submission failed:", error)
      setErrors({
        submit:
          "There was an error submitting the form. Please try again later.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderNameField = () => (
    <div className="w-full">
      <input
        type="text"
        placeholder="Name"
        className="border-b border-t-0 border-x-0 text-white bg-transparent w-full border-gray-300 ps-0 p-2 focus:ring-0 focus:border-white"
        value={formData.name}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, name: e.target.value }))
        }
      />

      <div className="h-4">
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">*{errors.name}</p>
        )}
      </div>
    </div>
  )

  const renderEmailField = () => (
    <div className="w-full">
      <input
        type="email"
        placeholder="Email"
        className="border-b border-t-0 border-x-0 text-white bg-transparent w-full border-gray-300 ps-0 p-2 focus:ring-0 focus:border-white"
        value={formData.email}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, email: e.target.value }))
        }
      />
      <div className="h-4">
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">*{errors.email}</p>
        )}
      </div>
    </div>
  )

  const renderCompanyField = () => (
    <div className="w-full">
      <input
        type="text"
        placeholder="Company"
        className="border-b border-t-0 border-x-0 text-white bg-transparent w-full border-gray-300 ps-0 p-2 focus:ring-0 focus:border-white"
        value={formData.company}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, company: e.target.value }))
        }
      />
      <div className="h-4">
        {errors.company && (
          <p className="text-red-500 text-xs mt-1">*{errors.company}</p>
        )}
      </div>
    </div>
  )

  const renderVesselTypeField = () => {
    return (
      <div className="w-full">
        <input
          type="text"
          placeholder="Vessel Type"
          className="border-b border-t-0 border-x-0 text-white bg-transparent w-full border-gray-300 ps-0 p-2 focus:ring-0 focus:border-white"
          value={formData.vesselType}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, vesselType: e.target.value }))
          }
        />

        <div className="h-4">
          {errors.vesselType && (
            <p className="text-red-500 text-xs mt-1">*{errors.vesselType}</p>
          )}
        </div>
      </div>
    )
  }

  const renderOperationalChallengeField = () => {
    return (
      <div className="w-full">
        <input
          type="text"
          placeholder="Operational Challenge"
          className="border-b border-t-0 border-x-0 text-white bg-transparent w-full border-gray-300 ps-0 p-2 focus:ring-0 focus:border-white"
          value={formData.operationalChallenge}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              operationalChallenge: e.target.value,
            }))
          }
        />

        <div className="h-4">
          {errors.operationalChallenge && (
            <p className="text-red-500 text-xs mt-1">
              *{errors.operationalChallenge}
            </p>
          )}
        </div>
      </div>
    )
  }

  const renderMessageField = () => (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-white/80 font-light">
        Tell us more about your specific requirements or challenges.
      </label>

      <textarea
        name="message"
        id="tailorSolutionsMessage"
        cols={50}
        rows={5}
        className="rounded text-primary focus:ring-0 border border-gray-300 p-2 focus:outline-none"
        value={formData.message}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, message: e.target.value }))
        }
      ></textarea>
    </div>
  )

  return (
    <div>
      <form onSubmit={handleForm} className="space-y-7">
        <div className="flex flex-col gap-3 w-full md:px-20">
          {renderNameField()}
          {renderEmailField()}
          {renderCompanyField()}
          {renderVesselTypeField()}
          {renderOperationalChallengeField()}
          {renderMessageField()}
          <button
            type="submit"
            className="self-start mt-2 py-2 px-6 rounded-lg border border-gray-500 text-white hover:border-secondary hover:bg-secondary hover:scale-95 transition-all duration-300 ease-in-out inline-flex items-center"
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
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                Sending...
              </>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>

      {/* Thank You Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center flex flex-col items-center relative">
            <Image src="/sent.png" width={200} height={100} alt="sent" />
            {/* Load JSON from public folder */}
            {/* <Lottie
              animationData={shipComing}
              loop={true}
              className="w-44 h-44"
            /> */}

            <h2 className="text-lg font-semibold text-secondary">Thank You!</h2>
            <p className="text-primary mt-2">
              Your message has been submitted successfully.
            </p>

            <button
              type="button"
              onClick={() => setShowPopup(false)}
              className="absolute -top-3 -right-3 text-white bg-secondary hover:bg-primary rounded-full text-sm w-8 h-8 flex justify-center items-center"
            >
              <svg
                className="w-3 h-3"
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
              <span className="sr-only">Close modal</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default TailorSolutionsForm

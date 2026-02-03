"use client"

import "react-phone-number-input/style.css"
import PhoneInput from "react-phone-number-input"
import { Country, State, City } from "country-state-city"
import Select from "react-select"
import { useState } from "react"
import { ashorePositionList, ourPositionList } from "@/utils/resources"
import Image from "next/image"
import axios from "axios"

const Form = () => {
  const [errors, setErrors] = useState({})
  const [showPopup, setShowPopup] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
    position: "",
    file: null,
    fileName: "No file chosen",
  })

  const validateForm = () => {
    let newErrors = {}

    if (!formData.name.trim()) newErrors.name = "Name is required."
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required."
    if (!formData.email.trim()) newErrors.email = "Email is required."
    if (!formData.country) newErrors.country = "Country is required."
    if (!formData.state) newErrors.state = "State is required."
    if (!formData.city.trim()) newErrors.city = "City is required."
    if (!formData.zipCode.trim()) newErrors.zipCode = "Zip code is required."
    if (!formData.position) newErrors.position = "Position is required."
    if (!formData.file) newErrors.file = "CV/Resume is required."

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
      data.append("_wpcf7", "10030")
      data.append("_wpcf7_version", "6.1.4")
      data.append("_wpcf7_locale", "en_US")
      data.append("_wpcf7_container_post", "0")
      // Generate unit tag: wpcf7-f{formId}-p{postId}-o{instanceId}
      const instanceId = Math.random().toString(36).substring(2, 15)
      data.append("_wpcf7_unit_tag", `wpcf7-f10030-p0-o${instanceId}`)
      
      data.append("name", formData.name)
      data.append("email", formData.email)
      data.append("phone", formData.phone)
      data.append("country", formData.country)
      data.append("state", formData.state)
      data.append("city", formData.city)
      data.append("zipCode", formData.zipCode)
      data.append("position", formData.position)

      if (formData.file) {
        data.append("file", formData.file)
      }

      const response = await axios.post(
        "https://docs.nautilusshipping.com/wp-json/contact-form-7/v1/contact-forms/10030/feedback",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )

      //console.log("Form Submitted Successfully!", response.data)
      setShowPopup(true)

      // Reset form fields
      setFormData({
        name: "",
        email: "",
        phone: "",
        country: "",
        state: "",
        city: "",
        zipCode: "",
        position: "",
        file: null,
        fileName: "No file chosen",
      })

      setErrors({})
    } catch (error) {
      //console.error("Form submission failed:", error)
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
      <label htmlFor="name-ashore" className="sr-only">Name</label>
      <input
        type="text"
        id="name-ashore"
        placeholder="Name"
        className="border-b border-t-0 border-x-0 text-white bg-transparent w-full border-gray-300 ps-0 p-1.5 focus:ring-0 focus:border-white"
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
      <label htmlFor="email-ashore" className="sr-only">Email</label>
      <input
        type="email"
        id="email-ashore"
        placeholder="Email"
        className="border-b border-t-0 border-x-0 text-white bg-transparent w-full border-gray-300 ps-0 p-1.5 focus:ring-0 focus:border-white"
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

  const renderPhoneField = () => {
    return (
      <div className="flex flex-col w-full">
        <label htmlFor="phone-ashore" className="sr-only">Phone Number</label>
        <div className="flex items-center border-b border-gray-300 pb-1">
          <PhoneInput
            international
            defaultCountry="IN"
            value={formData.phone}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, phone: value }))
            }
            className="custom-phone-input w-full text-white"
            id="phone-ashore"
          />
        </div>
        <div className="h-4">
          {errors.phone && (
            <span className="text-red-500 text-xs">*{errors.phone}</span>
          )}
        </div>
      </div>
    )
  }

  const renderCountryField = () => {
    const countryOptions = Country.getAllCountries().map((c) => ({
      value: c.isoCode,
      label: c.name,
    }))

    return (
      <div className="flex flex-col w-full">
        <div className="flex items-center border-b border-gray-300 pb-1">
          <Select
            options={countryOptions}
            className="w-full text-white/85 border-none"
            classNamePrefix="react-select"
            placeholder="Select Country"
            aria-label="Select Country"
            value={
              countryOptions.find((c) => c.value === formData.country) || null
            } // Ensure value is reset
            onChange={(selectedOption) =>
              setFormData((prev) => ({
                ...prev,
                country: selectedOption ? selectedOption.value : "", // Handle empty case
              }))
            }
            styles={{
              control: (base) => ({
                ...base,
                background: "transparent",
                border: "none",
                boxShadow: "none",
              }),
              singleValue: (base) => ({
                ...base,
                color: "white",
              }),
              dropdownIndicator: (base) => ({
                ...base,
                color: "white",
                ":hover": {
                  color: "white",
                },
              }),
              menu: (base) => ({
                ...base,
                background: "#333",
              }),
              option: (base, { isFocused }) => ({
                ...base,
                background: isFocused ? "#008E9C" : "#fff",
                color: isFocused ? "#fff" : "#00222F",
              }),
              input: (base) => ({
                ...base,
                color: "white",
              }),
              placeholder: (base) => ({
                ...base,
                color: "white",
                fontWeight: "100",
              }),
            }}
          />
        </div>
        <div className="h-4">
          {errors.country && (
            <span className="text-red-500 text-xs">*{errors.country}</span>
          )}
        </div>
      </div>
    )
  }

  const renderStateField = () => {
    const stateOptions = formData.country
      ? State.getStatesOfCountry(formData.country).map((s) => ({
          value: s.isoCode,
          label: s.name,
        }))
      : []

    return (
      <div className="flex flex-col w-full">
        {/* <label className="text-gray-500">State</label> */}
        <div className="flex items-center border-b border-gray-300 pb-1">
          <Select
            options={stateOptions}
            className="w-full text-white/85 focus:ring-0 border-none focus:outline-none"
            classNamePrefix="react-select"
            placeholder="Select State"
            aria-label="Select State"
            value={stateOptions.find((s) => s.value === formData.state) || null}
            onChange={(selectedOption) =>
              setFormData((prev) => ({
                ...prev,
                state: selectedOption ? selectedOption.value : "",
              }))
            }
            isDisabled={!formData.country}
            styles={{
              control: (base) => ({
                ...base,
                background: "transparent",
                border: "none",
                boxShadow: "none",
              }),
              singleValue: (base) => ({
                ...base,
                color: "white",
              }),
              dropdownIndicator: (base) => ({
                ...base,
                color: "white",
                ":hover": {
                  color: "white",
                },
              }),
              menu: (base) => ({
                ...base,
                background: "#333",
              }),
              option: (base, { isFocused }) => ({
                ...base,
                background: isFocused ? "#008E9C" : "#fff",
                color: isFocused ? "#fff" : "#00222F",
              }),
              input: (base) => ({
                ...base,
                color: "white",
              }),
              placeholder: (base) => ({
                ...base,
                color: "white",
                fontWeight: "100",
              }),
            }}
          />
        </div>
        <div className="h-4">
          {errors.state && (
            <span className="text-red-500 text-xs">*{errors.state}</span>
          )}
        </div>
      </div>
    )
  }

  const renderCityField = () => {
    const cityOptions =
      formData.state && formData.country
        ? City.getCitiesOfState(formData.country, formData.state).map((c) => ({
            value: c.name,
            label: c.name,
          }))
        : [] // Ensure cityOptions is always an array

    return (
      <div className="flex flex-col w-full">
        {/* <label className="text-gray-500">City</label> */}
        <div className="flex items-center border-b border-gray-300 pb-1">
          <Select
            options={cityOptions}
            className="w-full text-white/85 focus:ring-0 border-none focus:outline-none"
            classNamePrefix="react-select"
            placeholder="Select City"
            aria-label="Select City"
            value={cityOptions.find((c) => c.value === formData.city) || null} // Ensure .find() is used on an array
            onChange={(selectedOption) =>
              setFormData((prev) => ({
                ...prev,
                city: selectedOption ? selectedOption.value : "",
              }))
            }
            isDisabled={!formData.state} // Disable if no state is selected
            styles={{
              control: (base) => ({
                ...base,
                background: "transparent",
                border: "none",
                boxShadow: "none",
              }),
              singleValue: (base) => ({
                ...base,
                color: "white",
              }),
              dropdownIndicator: (base) => ({
                ...base,
                color: "white",
                ":hover": {
                  color: "white",
                },
              }),
              menu: (base) => ({
                ...base,
                background: "#333",
              }),
              option: (base, { isFocused }) => ({
                ...base,
                background: isFocused ? "#008E9C" : "#fff",
                color: isFocused ? "#fff" : "#00222F",
              }),
              input: (base) => ({
                ...base,
                color: "white",
              }),
              placeholder: (base) => ({
                ...base,
                color: "white",
                fontWeight: "100",
              }),
            }}
          />
        </div>
        <div className="h-4">
          {errors.city && (
            <span className="text-red-500 text-xs">*{errors.city}</span>
          )}
        </div>
      </div>
    )
  }

  const renderZipCodeField = () => (
    <div className="w-full">
      <label htmlFor="zipcode-ashore" className="sr-only">Zip Code</label>
      <input
        type="text"
        id="zipcode-ashore"
        placeholder="Zip Code"
        className="border-b border-t-0 border-x-0 text-white bg-transparent w-full border-gray-300 ps-0 p-1.5 focus:ring-0 focus:border-white"
        value={formData.zipCode}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, zipCode: e.target.value }))
        }
      />
      <div className="h-4">
        {errors.zipCode && (
          <p className="text-red-500 text-xs mt-1">*{errors.zipCode}</p>
        )}
      </div>
    </div>
  )

  const renderPositionField = () => {
    return (
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="position-ashore" className="sr-only">Select Position</label>
        <div className="flex items-center border-b border-gray-300 pb-1">
          <select
            name="position"
            id="position-ashore"
            className="bg-transparent text-white/85 font-light focus:ring-0 border-none focus:outline-none w-full"
            value={formData.position || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                position: e.target.value,
              }))
            }
          >
            <option value="" className="text-black">Select Position</option>
            {ashorePositionList.map((pos, index) => (
              <option key={index} value={pos} className="text-black">
                {pos}
              </option>
            ))}
          </select>
        </div>
        <div className="h-4">
          {errors.position && (
            <p className="text-red-500 text-xs mt-1">*{errors.position}</p>
          )}
        </div>
      </div>
    )
  }

  const renderChooseAFile = () => {
    const handleFileChange = (event) => {
      const file = event.target.files[0]

      if (file) {
        const allowedTypes = [
          "application/pdf",
          "application/x-pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "text/plain",
          "application/rtf",
        ]
        const maxSize = 4 * 1024 * 1024 // 4MB

        if (!allowedTypes.includes(file.type)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            file: "Invalid file type. Upload DOC, DOCX, PDF, RTF, or TXT.",
          }))
          setFormData((prevData) => ({
            ...prevData,
            file: null,
            fileName: "No file chosen",
          }))
          return
        }

        if (file.size > maxSize) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            file: "File size exceeds 4MB limit.",
          }))
          setFormData((prevData) => ({
            ...prevData,
            file: null,
            fileName: "No file chosen",
          }))
          return
        }

        setErrors((prevErrors) => ({ ...prevErrors, file: "" }))
        setFormData((prevData) => ({
          ...prevData,
          file, // Store the actual file object
          fileName: file.name,
        }))
      }
    }

    return (
      <div className="mt-2 w-full">
        <div className="cursor-pointer flex items-center w-full border border-gray-300 rounded bg-gray-50">
          <label
            htmlFor="file_input_Ashore"
            className="px-3 py-2 text-white bg-secondary cursor-pointer rounded-l hover:bg-secondary/95 w-1/3 text-sm sm:text-base"
          >
            Choose a File
          </label>

          <input
            id="file_input_Ashore"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />

          <span className="px-4 py-2 text-xs sm:text-sm text-gray-900 dark:text-white bg-transparent dark:bg-gray-800 w-full truncate block overflow-hidden whitespace-nowrap text-ellipsis">
            {formData.fileName}
          </span>
        </div>

        {/* Error message */}
        {errors.file && (
          <span className="text-red-500 text-sm mt-1 block">
            * {errors.file}
          </span>
        )}

        <p className="font-light text-[10px] sm:text-xs text-white/80 mt-2">
          Complete your job application by uploading your resume or CV. Upload
          either DOC, DOCX, PDF, RTF or TXT file types, 4 MB max.
        </p>
      </div>
    )
  }

  return (
    <div className="p-3 sm:py-10 sm:px-4 h-full flex flex-col justify-center">
      {/* Mandatory Notice */}
      <h4 className="text-sm font-light text-white">
        All fields are mandatory*
      </h4>

      {/* Form Heading */}
      <h3 className="text-xl sm:text-2xl font-light text-white mt-4">
        Submit a CV/Resume{" "}
        <span className="text-base">(Onshore/Shore Job)</span>
      </h3>

      {/* Form Section */}
      <form className="flex flex-col gap-5 pt-6 sm:pt-7" onSubmit={handleForm}>
        {renderNameField()}

        {/* Responsive Two-Column Layout */}
        <div className="flex flex-col sm:flex-row justify-between items-end gap-4 sm:gap-10">
          {renderPhoneField()}
          {renderEmailField()}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-end gap-4 sm:gap-10">
          {renderCountryField()}
          {renderStateField()}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-end gap-4 sm:gap-10">
          {renderCityField()}
          {renderZipCodeField()}
        </div>

        {renderPositionField()}
        {renderChooseAFile()}

        {/* Submit Button */}
        <button
          type="submit"
          className="self-start py-1.5 px-6 rounded-lg border border-gray-500 text-white hover:border-secondary hover:bg-secondary hover:scale-95 transition-all duration-300 ease-in-out inline-flex items-center"
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
      </form>

      {/* Thank You Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center flex flex-col items-center relative">
            <Image src="/sent.png" width={200} height={100} alt="sent" />
            <h2 className="text-xl font-semibold text-primary">Thank You!</h2>
            <p className="text-primary mt-2">
              Your form has been submitted successfully!
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

export default Form

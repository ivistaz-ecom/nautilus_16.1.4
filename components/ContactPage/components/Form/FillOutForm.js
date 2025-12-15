import Image from "next/image"
import Form from "./Form"

const FillOutForm = () => {
  return (
    <div className="flex flex-col sm:flex-row md:my-14 gap-10 sm:gap-0">
      {/* Left Section */}
      <div className="sm:w-1/2 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl sm:text-5xl font-light p-6 sm:px-24 leading-tight tracking-wide">
            How can we assist you?
          </h2>

          <p className="font-light p-6 sm:px-24 leading-tight tracking-wide">
            Fill out the form with your details and requirements, and a member of the <span class='font-bold'>Nautilus Maritime Services</span> team will be in touch shortly.
          </p>
        </div>

        <div>
          <Image
            src="/contact-us/image01.png"
            width={656}
            height={437}
            alt="Contact Us"
            className="w-full"
          /> 
        </div>
      </div>

      {/* Form Section */}
      <div className="bg-primary w-full sm:w-3/5 rounded-t-2xl">
        <Form />
      </div>
    </div >
  )
}

export default FillOutForm

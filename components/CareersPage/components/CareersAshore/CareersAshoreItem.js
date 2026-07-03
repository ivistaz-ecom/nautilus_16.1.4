import Image from "next/image"
import Form from "./Form"

const CareersAshoreItem = () => {
  return (
    <div className="flex flex-col lg:flex-row max-w-screen-xl mx-auto py-7 sm:py-14">
      {/* Image Section */}
      <div className="w-full lg:w-1/2">
        <Image
          src="/careers/img02.webp"
          width={683}
          height={500}
          alt="Careers At Sea"
          className="w-full h-auto"
        />
      </div>

      {/* Form Section */}
      <div className="bg-primary flex w-full lg:w-1/2">
        <Form />
      </div>
    </div>
  )
}

export default CareersAshoreItem

import Image from "next/image"
import Form from "./Form"

const CareersAtSeaItem = () => {
  return (
    <div className="max-w-screen-xl mx-auto pt-7 sm:pt-14">
      <div className="space-y-4 sm:space-y-5 px-4 pb-6">
        <h2 className="text-3xl sm:text-5xl font-light tracking-wide">
          Careers At Sea
        </h2>
        
      </div>

      <div className="flex flex-col md:flex-row">
      <div className="bg-primary flex w-full md:w-1/2">
        <Form />
      </div>
      <div className="w-full md:w-1/2">
        <Image
          src="/careers/careers1.png"
          width={683}
          height={776}
          alt="Careers At Sea"
          className="w-full h-full"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      </div>
    </div>
  )
}

export default CareersAtSeaItem

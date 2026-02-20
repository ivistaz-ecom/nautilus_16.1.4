import PromiseItem from "./PromiseItem"
import Heading from "./Heading"
import Image from "next/image"
import Link from "next/link"

const NautilusPromise = () => {
  return (
    <div className="py-10 flex flex-col gap-7 md:gap-10">
      <Heading />
      <PromiseItem />
      <div className="max-w-screen-xl mx-auto flex flex-col items-start gap-4 sm:gap-5 w-full px-4">
        <h3 className="text-2xl sm:text-4xl md:text-5xl font-light md:leading-tight tracking-wide">
          Safeguard Your Investment, <br className="hidden sm:block" /> Maximize
          Your Returns
        </h3>
        <p className="text-[#6E6E6E] text-base sm:text-xl font-light tracking-wide">
          Contact us for Ship Management, Crew Management, Ship Agency &
          Logistics, <br className="hidden sm:block" />
          Inspection and Commercial Ship Services.
        </p>

        <div className="flex items-start sm:items-center gap-3">
          <a
            href="tel:+914446849999"
            className="flex items-start sm:items-center gap-3"
          >
            <Image
              src="/home-page/section-3/call.svg"
              width={30}
              height={30}
              alt="call"
            />
            <span className="text-primary text-base sm:text-xl font-semibold tracking-wide">
              +91 44 4684 9999
            </span>
          </a>
        </div>

        <div className="flex items-start sm:items-center gap-3">
          <a
            href="mailto:hello@nautilusshipping.com"
            className="flex items-start sm:items-center gap-3"
          >
            <Image
              src="/home-page/section-3/mail.svg"
              width={30}
              height={30}
              alt="mail"
            />
            <span className="text-primary text-base sm:text-xl font-semibold tracking-wide">
              hello@nautilusshipping.com
            </span>
          </a>
        </div>

        <Link href="/contact-us">
          <button className="py-2 px-5 mt-3 rounded-lg bg-secondary text-white hover:bg-primary hover:scale-95 transition-all duration-300 ease-in-out">
            Let’s Connect
          </button>
        </Link>
      </div>
    </div>
  )
}

export default NautilusPromise

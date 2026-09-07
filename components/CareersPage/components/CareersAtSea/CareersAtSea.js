import CareersAtSeaItem from "./CareersAtSeaItem"
import { useEffect, useState } from "react"

const CareersAtSea = () => {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)

  useEffect(() => {
    if (!isInfoModalOpen) return

    const scrollY = window.scrollY
    document.body.style.position = "fixed"
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = "100%"
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""
      document.body.style.overflow = ""
      window.scrollTo(0, scrollY)
    }
  }, [isInfoModalOpen])

  return (
    <>
      <div className=" bg-[#00222F]">
        <div className="max-w-screen-xl mx-auto w-full space-y-1 px-4 text-left text-white py-12">
         
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-light lg:pb-10 pb-4">
            Seafarer Safety & Verification Assurance
          </h2>
          <div className="sm:hidden pb-4">
            <button
              type="button"
              onClick={() => setIsInfoModalOpen(true)}
              className="bg-white text-[#00222F] rounded-lg px-4 py-2 text-sm"
            >
              Click to Read
            </button>
          </div>

          <div className="hidden sm:block">
            <p className="text-sm sm:text-base md:text-[16px] font-light w-full sm:w-11/12 mx-auto sm:mx-0">
              At Nautilus Shipping, safeguarding the trust and wellbeing of
              seafarers is a responsibility we take seriously.
            </p>
            <p className="text-sm sm:text-base md:text-[16px] font-light w-full sm:w-11/12 mx-auto sm:mx-0 pb-3">
              To protect seafarers from fraudulent job offers, false promises of
              shipboard placement, or individuals misusing our name to demand
              payments, we have established a simple and secure verification
              process.
            </p>
            <p className="text-sm sm:text-base md:text-[18px] font-light w-full sm:w-11/12 mx-auto sm:mx-0 ">
              <strong>
                {" "}
                Seafarers can verify, free of charge, the authenticity of:
              </strong>
            </p>
            <ul className="list-disc text-sm sm:text-base md:text-[16px] font-light ps-3 sm:ps-6  space-y-0 w-full sm:w-11/12 mx-auto sm:mx-0">
              <li>
                Any document claiming to be an Employment Offer, Selection Letter,
                or placement confirmation issued under Nautilus Shipping.
              </li>
              <li>
                Letters or communication related to recruitment, crewing, or visa
                processing that appear to come from Nautilus Shipping.
              </li>
              <li>
                Requests asking for personal information, payments, or guarantees
                on behalf of our company.
              </li>
              <li>
                Any person claiming to be an authorized representative of Nautilus
                Shipping for hiring or placement.
              </li>
            </ul>

            <p className="text-sm sm:text-base md:text-[16px] font-light w-full sm:w-11/12 mx-auto sm:mx-0">
              If you receive any such communication and want to confirm its
              legitimacy, you can reach us directly.
            </p>

            <p className="text-sm sm:text-base md:text-[16px] font-light w-full sm:w-11/12 mx-auto sm:mx-0 pb-3">
              Verify the authenticity of any offer or representative by writing
              to: {""}
              <a
                href="mailto:hello@nautilusshipping.com"
                className="text-[#038D9C] font-semibold"
              >
                hello@nautilusshipping.com
              </a>
            </p>
          </div>

          <div className="w-full sm:w-11/12 mx-auto sm:mx-0 bg-white text-[#00222F] rounded-lg p-4 sm:p-6 text-left">
            <p className="text-sm sm:text-base md:text-[18px] font-light">
              <strong>Important:</strong>
            </p>

            <p className="text-sm sm:text-base md:text-[16px] font-light pt-3">
              Nautilus Shipping does NOT charge seafarers for employment or
              placement. Any cost related to Visa or pre-sign on / post-sign off
              medical examinations is borne entirely by the shipowner.
            </p>
            <p className="text-sm sm:text-base md:text-[16px] font-light pt-3">
              If anyone asks you for money or claims to represent Nautilus while
              doing so, report it to us immediately at the email above.
            </p>
          </div>
        </div>
      </div>

      {isInfoModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 sm:hidden"
          onClick={() => setIsInfoModalOpen(false)}
        >
          <div
            className="bg-white text-[#00222F] rounded-lg w-full max-w-xl max-h-[85vh] overflow-y-auto p-5 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsInfoModalOpen(false)}
              className="absolute top-3 right-3 text-[#00222F] border border-[#00222F] hover:bg-secondary hover:text-white rounded-full w-6 h-6 flex items-center justify-center"
              aria-label="Close"
            >
              ×
            </button>

            <p className="text-sm font-light pt-4">
              At Nautilus Shipping, safeguarding the trust and wellbeing of
              seafarers is a responsibility we take seriously.
            </p>
            <p className="text-sm font-light pt-3">
              To protect seafarers from fraudulent job offers, false promises of
              shipboard placement, or individuals misusing our name to demand
              payments, we have established a simple and secure verification
              process.
            </p>
            <p className="text-sm font-light pt-3">
              <strong>
                Seafarers can verify, free of charge, the authenticity of:
              </strong>
            </p>
            <ul className="list-disc text-sm font-light ps-5 pt-1 space-y-1">
              <li>
                Any document claiming to be an Employment Offer, Selection Letter,
                or placement confirmation issued under Nautilus Shipping.
              </li>
              <li>
                Letters or communication related to recruitment, crewing, or visa
                processing that appear to come from Nautilus Shipping.
              </li>
              <li>
                Requests asking for personal information, payments, or guarantees
                on behalf of our company.
              </li>
              <li>
                Any person claiming to be an authorized representative of Nautilus
                Shipping for hiring or placement.
              </li>
            </ul>
            <p className="text-sm font-light pt-3">
              If you receive any such communication and want to confirm its
              legitimacy, you can reach us directly.
            </p>
            <p className="text-sm font-light pt-3">
              Verify the authenticity of any offer or representative by writing
              to: {""}
              <a
                href="mailto:hello@nautilusshipping.com"
                className="text-[#038D9C] font-semibold"
              >
                hello@nautilusshipping.com
              </a>
            </p>
          </div>
        </div>
      )}
      <CareersAtSeaItem />
    </>
  )
}
export default CareersAtSea

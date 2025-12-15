import Image from "next/image"
import Link from "next/link"

const LatestNews = () => {
  const externalUrl =
    "https://new.marexmedia.com/2025/10/09/naavik-manthan-2025-anchors-dialogue-on-seafarers-technology-and-maritime-growth/"
  const slug =
    "its-not-just-about-the-money-seafarers-need-better-treatment-ifindustry-wants-sea-going-workforce"
  const pdfUrl = "/latest-news/BSN-29-September-2025-new.pdf"

  return (
    <>
      <div className="py-7 md:pt-8 md:pb-14">
        <div className="max-w-screen-lg sm:mx-auto w-full flex flex-col justify-between gap-5 px-3 sm:px-0">
          {/* Title */}
          <h1 className="text-3xl sm:text-6xl font-light leading-tight md:leading-tight tracking-wide">
            Latest News
          </h1>

          {/* Image & Content Block */}
          <div className="bg-primary p-3 lg:pr-7 flex flex-col sm:flex-row gap-5 rounded-md w-full lg:w-auto">
            {/* Image */}
            <div className="w-full sm:w-[180px] lg:w-[375px] flex-shrink-0">
              <Image
                src="/latest-news/team.webp"
                width={375}
                height={407}
                alt="Narayan Rajan"
                className="w-full h-auto object-cover rounded-md"
              />
            </div>

            {/* Text */}
            <div className="flex flex-col gap-5 w-full sm:w-1/2 lg:w-full">
              <p className="text-xl text-white">
                Naavik Manthan 2025 Anchors Dialogue on Seafarers, Technology,
                and Maritime Growth - Marex Media
              </p>
              <p className="text-white font-light">
                Nautilus Shipping’s flagship event, Naavik Manthan 2025, was
                recently featured on Marex Media, spotlighting its focus on the
                future of maritime.
              </p>
              <p className="text-white font-light">
                The article highlights the event’s core discussions, from
                advancing seafarer welfare and embracing new technologies to
                driving sustainable growth across the shipping industry. It
                captures Naavik Manthan’s continued role as a collaborative
                platform for dialogue, innovation, and progress in maritime
                operations.
              </p>

              {/* Read More Button */}
              <div className="flex justify-between sm:mt-auto pb-3">
                <span className="text-white text-sm font-light mt-auto">
                  October 9, 2025
                </span>
                <Link
                  href={externalUrl}
                  passHref
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="flex items-center gap-3 mt-2 text-sm text-primary bg-white hover:bg-secondary hover:text-white hover:scale-95 transition-all duration-300 ease-in-out rounded-md px-4 py-2 w-fit">
                    Read More
                    <Image
                      src="/dark-arrow.svg"
                      width={20}
                      height={20}
                      alt="arrow"
                    />
                  </button>
                </Link>
              </div>
            </div>
          </div>
          {/* Image & Content Block */}
          <div className="bg-primary p-3 lg:pr-7 flex flex-col sm:flex-row gap-5 rounded-md w-full lg:w-auto">
            {/* Image */}
            <div className="w-full sm:w-[180px] lg:w-[375px] flex-shrink-0">
              <Image
                src="/latest-news/team-2.webp"
                width={375}
                height={407}
                alt="Narayan Rajan"
                className="w-full h-auto object-cover rounded-md"
              />
            </div>

            {/* Text */}
            <div className="flex flex-col gap-5 w-full sm:w-1/2 lg:w-full">
              <p className="text-xl text-white">
                Naavik Manthan 2025 in Focus - Bhandarkar Shipping News
              </p>
              <p className="text-white font-light">
                Nautilus Shipping’s flagship event in collaboration with JSW
                Shipping, Naavik Manthan 2025, was recently featured in
                Bhandarkar Shipping News – India’s Premier Shipping Bi-Weekly
                (Vol. XXIV-No. 76, Page No. 15-17).
              </p>
              <p className="text-white font-light">
                The coverage highlights the key discussions at the event, from
                coastal shipping outlooks and operational excellence to AI in
                shipping and the welfare of seafarers. It reflects the spirit of
                Naavik Manthan as a platform where voices from sea and shore
                come together to shape the future of maritime.
              </p>

              {/* Read More Button */}
              <div className="flex justify-between sm:mt-auto pb-3">
                <span className="text-white text-sm font-light mt-auto">
                  September 26, 2025
                </span>
                <Link
                  href={pdfUrl}
                  passHref
                  target="_blank"
                  rel="noopener noreferrer"
                  // download
                >
                  <button className="flex items-center gap-3 mt-2 text-sm text-primary bg-white hover:bg-secondary hover:text-white hover:scale-95 transition-all duration-300 ease-in-out rounded-md px-4 py-2 w-fit">
                    Read More
                    <Image
                      src="/dark-arrow.svg"
                      width={20}
                      height={20}
                      alt="arrow"
                    />
                  </button>
                </Link>
              </div>
            </div>
          </div>
          {/* Image & Content Block */}
          <div className="bg-primary p-3 lg:pr-7 flex flex-col sm:flex-row gap-5 rounded-md w-full lg:w-auto">
            {/* Image */}
            <div className="w-full sm:w-[180px] lg:w-[375px] flex-shrink-0">
              <Image
                src="/latest-news/narayan.png"
                width={375}
                height={407}
                alt="Narayan Rajan"
                className="w-full h-auto object-cover rounded-md"
              />
            </div>

            {/* Text */}
            <div className="flex flex-col gap-5 w-full sm:w-1/2 lg:w-full">
              <p className="text-xl text-white">
                Nautilus Shipping Featured on TradeWinds:{" "}
                <br className="hidden md:block" /> Seafarer Welfare in Focus
              </p>
              <p className="text-white font-light">
                In a feature published on TradeWinds, our Co-founder and
                Managing Director, Narayan Rajan, shares a compelling
                perspective on the maritime industry’s responsibility to its
                workforce.
              </p>
              <p className="text-white font-light">
                The message is clear: If the industry wants to attract and
                retain seafarers, <br className="hidden md:block" /> it must put
                their well-being first.
              </p>

              {/* Read More Button */}
              <div className="flex justify-between sm:mt-auto pb-3">
                <span className="text-white text-sm font-light mt-auto">
                  April 9, 2025
                </span>
                <Link href={`/news-and-insights/${slug}`} passHref>
                  <button className="flex items-center gap-3 mt-2 text-sm text-primary bg-white hover:bg-secondary hover:text-white hover:scale-95 transition-all duration-300 ease-in-out rounded-md px-4 py-2 w-fit">
                    Read More
                    <Image
                      src="/dark-arrow.svg"
                      width={20}
                      height={20}
                      alt="arrow"
                    />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-gray-400 w-full" />
    </>
  )
}

export default LatestNews

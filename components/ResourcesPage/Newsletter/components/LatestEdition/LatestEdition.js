import Image from "next/image"
import Link from "next/link"

const latestEditionData = [
  {
    title: "The Future of Shipping Doesn't End at Sea",
    date: "June 2026",
    description: (
      <>
        The June 2026 edition of the Nautilus Newsletter focuses on the evolving world of ship recycling and the growing importance of sustainability across the maritime industry. As the Hong Kong Convention comes into force, this edition explores how responsible recycling, environmental stewardship, and global standards are reshaping the way the industry approaches a vessel's final chapter.

        <br />
        <br />
        From India's emergence as a global ship recycling leader to inspiring seafarer stories, industry developments, and Nautilus milestones, this edition brings together the insights, people, and progress defining the future of maritime excellence.
      </>
    ),
    image: "/resources/june_newsletter.webp",
    link: "https://nautilusshipping.blr1.cdn.digitaloceanspaces.com/NL/2026/June/Nautilus_Newsletter_June26.pdf",
  },
  
]

const LatestEdition = () => {
  return (
    <div className="py-14 md:px-4">
      <div className="max-w-screen-lg w-full mx-auto space-y-5 flex flex-col md:gap-10">
        <h2 className="text-5xl sm:text-7xl font-light text-center md:text-left">
          Latest Edition
        </h2>

        {latestEditionData.slice(0, 1).map((edition, index) => (
          <div
            key={index}
            className="flex flex-col gap-10 md:gap-0 items-center md:items-start md:flex-row"
          >
            {/* Left Section */}
            <div className="flex flex-col gap-3">
              <p className="text-xl sm:text-[28px] font-light">
                {edition.date}
              </p>
              <Link href={edition.link} target="_blank" className="mt-3">
                <Image
                  src={edition.image}
                  width={327}
                  height={447}
                  alt={edition.title}
                  className="rounded-lg"
                />
              </Link>
              <Link href={edition.link} target="_blank" className="md:hidden mt-2 self-center">
                <button className="py-1 px-4 rounded-lg bg-transparent border border-primary text-primary hover:bg-secondary hover:border-secondary hover:text-white hover:scale-95 transition-all duration-300 ease-in-out">
                  View Newsletter
                </button>
              </Link>
            </div>

            {/* Right Section */}
            <div className="bg-primary px-5 sm:px-8 py-8 md:mt-12 flex flex-col gap-4 flex-1 self-center md:rounded-tr-lg md:rounded-br-lg">
              <h3 className="text-xl sm:text-[28px] text-white font-light leading-tight tracking-wide">
                {edition.title}
              </h3>
              <p className="text-base sm:text-base text-white font-light leading-tight tracking-wide">
                {edition.description}
              </p>
              <Link href={edition.link} target="_blank" className="hidden md:block">
                <button className="py-1 px-4 rounded-lg bg-transparent border-white border text-white hover:bg-secondary hover:border-secondary hover:scale-95 transition-all duration-300 ease-in-out">
                  View Newsletter
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LatestEdition

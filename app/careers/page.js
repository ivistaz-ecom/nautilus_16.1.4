import CareersPage from "@/components/CareersPage/CareersPage"
import NextSeo from "@/components/Seo/Seo"

export default function Page() {
  const seoField = {
    title: "Join Our Team | Careers at Nautilus Shipping",
    description:
      "Explore rewarding careers at Nautilus Shipping and join a team driving innovation, excellence, and growth in the global maritime industry.",
    path: "/careers",
    metaImage: "/our-approach/img01.png",
    pageType: "WebSite",
    preloadImage: "/careers/bg.webp",
  }

  return (
    <>
      <NextSeo {...seoField} />
      <CareersPage />
    </>
  )
}

import Team from "@/components/AboutUsPage/Team/Team"
import NextSeo from "@/components/Seo/Seo"

export default function Page() {
  const seoField = {
    title:
      "Nautilus Shipping Leadership and Team | Experienced Maritime Professionals",
    description:
      "Meet the experienced maritime leaders and experts at Nautilus Shipping, driving innovation, excellence, and high standards across ship management.",
    path: "/about-us/team",
    metaImage: "/our-approach/img01.png",
    pageType: "WebSite",
  }

  return (
    <>
      <NextSeo {...seoField} />
      <Team />
    </>
  )
}

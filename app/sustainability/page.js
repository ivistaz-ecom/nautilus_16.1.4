import NextSeo from "@/components/Seo/Seo"
import SustainabilityPage from "@/components/SustainabilityPage/SustainabilityPage"

export default function Page() {
  const seoField = {
    title: "Sustainable Ship Management | Nautilus Shipping",
    description:
      "Nautilus Shipping advances sustainable ship management with energy-efficient, decarbonization-focused solutions aligned with IMO 2030 and 2050 goals.",
    path: "/sustainability",
    metaImage: "/our-approach/img01.png",
    pageType: "WebSite",
  }

  return (
    <>
      <NextSeo {...seoField} />
      <SustainabilityPage />
    </>
  )
}

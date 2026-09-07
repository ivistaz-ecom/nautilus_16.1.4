import NextSeo from "@/components/Seo/Seo"
import CrewManagement from "@/components/ServicePage/CrewManagement/CrewManagement"

export default function Page() {
  const seoField = {
    title: "Crew Management Services | Nautilus Shipping",
    description:
      "Nautilus Shipping provides marine crew management, recruitment, training, and welfare programs, ensuring skilled crews for global fleet operations.",
    path: "/service/crew-management",
    metaImage: "/our-approach/img01.png",
    pageType: "WebSite",
  }

  return (
    <>
      <NextSeo {...seoField} />
      <CrewManagement />
    </>
  )
}

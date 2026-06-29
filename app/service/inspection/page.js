import NextSeo from "@/components/Seo/Seo"
import Inspection from "@/components/ServicePage/Inspection/Inspection"

export default function Page() {
  const seoField = {
    title: "Vessel Inspection Services | Nautilus Shipping",
    description:
      "Ensure compliance and safety with Nautilus Shipping’s vessel inspections, safety audits, and condition monitoring services.",
    path: "/service/inspection",
    metaImage: "/our-approach/img01.png",
    pageType: "WebSite",
  }

  return (
    <>
      <NextSeo {...seoField} />
      <Inspection />
    </>
  )
}

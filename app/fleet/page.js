import Fleet from "@/components/Fleet/Fleet"
import NextSeo from "@/components/Seo/Seo"

export default function Page() {
  const seoField = {
    title: "Fleet Management Shipping Company | Nautilus Shipping",
    description:
      "Nautilus Shipping has manned 237 vessels, delivering safe, efficient, and compliant fleet management for bulk carriers, tankers, and specialized ships.",
    path: "/fleet",
    metaImage: "/our-approach/img01.png",
    pageType: "WebSite",
  }

  return (
    <>
      <NextSeo {...seoField} />
      <Fleet />
    </>
  )
}

import NextSeo from "@/components/Seo/Seo"
import CommercialServices from "@/components/ServicePage/CommercialServices/CommercialServices"

export default function Page() {
  const seoField = {
    title: "Commercial Shipping Companies | Nautilus Shipping",
    description:
      "Maximize fleet profitability with Nautilus Shipping’s chartering, crewing, operational support, and post-fixture management services.",
    path: "/service/commercial-services",
    metaImage: "/our-approach/img01.png",
    pageType: "WebSite",
  }

  return (
    <>
      <NextSeo {...seoField} />
      <CommercialServices />
    </>
  )
}

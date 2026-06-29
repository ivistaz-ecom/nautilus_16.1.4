"use client"
import NextSeo from "@/components/Seo/Seo"
import ShipManagement from "@/components/ServicePage/ShipManagement/ShipManagement"

const page = () => {
  const seoField = {
    title: "Ship Management Services India | Nautilus Shipping",
    description:
      "Nautilus Shipping delivers expert ship management services in India, ensuring compliance, efficiency, and performance across diverse vessel types.",
    path: "/service/ship-management",
    metaImage: "/our-approach/img01.png",
    pageType: "WebSite",
  }

  return (
    <>
      <NextSeo {...seoField} />
      <ShipManagement />
    </>
  )
}

export default page

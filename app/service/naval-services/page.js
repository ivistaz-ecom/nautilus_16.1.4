"use client"
import NextSeo from "@/components/Seo/Seo"
import NavalServices from "@/components/ServicePage/NavalServices/NavalServices"

const page = () => {
  const seoField = {
    title: "Naval Projects & Defence Services | Nautilus Shipping",
    description:
      "End-to-end naval solutions from Nautilus Shipping — afloat repairs, warship refits, AMCs, critical spares logistics, dry-dock support, and defence maritime consultancy.",
    path: "/service/naval-services",
    metaImage: "/service/img01.png",
    pageType: "WebSite",
  }

  return (
    <>
      <NextSeo {...seoField} />
      <NavalServices />
    </>
  )
}

export default page

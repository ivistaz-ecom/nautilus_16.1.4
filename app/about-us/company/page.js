"use client"
import Company from "@/components/AboutUsPage/Company/Company"
import NextSeo from "@/components/Seo/Seo"

const page = () => {
  const seoField = {
    title: "Nautilus Ship Management | Leading Ship Managers in India",
    description:
      "With 19 years of expertise, Nautilus Shipping has evolved from a crew management company to a full-service ship management provider. We operate from six global offices, offering technical management, inspections, and commercial services for maritime excellence.",
    path: "/about-us/company",
    metaImage: "/our-approach/img01.png",
    pageType: "WebSite",
  }

  return (
    <>
      <NextSeo {...seoField} />
      <Company />
    </>
  )
}

export default page

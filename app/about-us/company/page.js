"use client"
import Company from "@/components/AboutUsPage/Company/Company"
import NextSeo from "@/components/Seo/Seo"

const page = () => {
  const seoField = {
    title: "Nautilus Ship Management | Leading Ship Managers in India",
    description:
      "With 19 years of expertise and six global offices, Nautilus Shipping delivers comprehensive ship management, inspection, and commercial services.",
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

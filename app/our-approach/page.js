import OurApproachPage from "@/components/OurApproachPage/OurApproachPage"
import NextSeo from "@/components/Seo/Seo"

export default function Page() {
  const seoField = {
    title: "Experience the 4P Framework in Ship Management | Nautilus Shipping",
    description:
      "Discover Nautilus Shipping’s 4P Framework—enhancing fleet efficiency, compliance, performance, and profitability through tailored maritime solutions.",
    path: "/our-approach",
    metaImage: "/our-approach/img01.png",
    pageType: "WebSite",
  }

  return (
    <>
      <NextSeo {...seoField} />
      <OurApproachPage />
    </>
  )
}

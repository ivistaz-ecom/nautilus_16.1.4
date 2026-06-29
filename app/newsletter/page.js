import Newsletter from "@/components/ResourcesPage/Newsletter/Newsletter"
import NextSeo from "@/components/Seo/Seo"
import HomePageModal from "@/components/HomePage/components/HomePageModal/HomePageModal"

export default function Page() {
  const seoField = {
    title: "Stay Informed with the Nautilus Shipping Newsletter",
    description:
      "Subscribe to the Nautilus Newsletter for expert insights, industry updates, maritime trends, and real-world stories from across the shipping sector.",
    path: "/newsletter",
    metaImage: "/our-approach/img01.png",
    pageType: "WebSite",
  }

  return (
    <>
      <NextSeo {...seoField} />
      {/* <HomePageModal /> */}
      <Newsletter />
    </>
  )
}

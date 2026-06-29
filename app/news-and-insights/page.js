import Header from "@/components/Header/Header"
import Blogs from "@/components/ResourcesPage/NewsAndInsights/Blogs/Blogs"
import Heading from "@/components/ResourcesPage/NewsAndInsights/Heading"
import LatestNews from "@/components/ResourcesPage/NewsAndInsights/LatestNews/LatestNews"
import NextSeo from "@/components/Seo/Seo"
import HomePageModal from "@/components/HomePage/components/HomePageModal/HomePageModal"

export default function Page() {
  const seoField = {
    title: "Latest News and Insights | Nautilus Shipping",
    description:
      "Stay updated with Nautilus Shipping's latest news, industry insights, innovations, and leadership shaping the future of the maritime sector.",
    path: "/news-and-insights",
    metaImage: "/our-approach/img01.png",
    pageType: "WebSite",
  }
  return (
    <>
      <NextSeo {...seoField} />
      {/* <HomePageModal /> */}
      <Header
        logo="/logo.png"
        hamburger="/hamburger-dark.svg"
        search="/search-dark.svg"
      />
      <Heading />
      <LatestNews />
      <Blogs />
    </>
  )
}

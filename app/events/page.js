import Events from "@/components/ResourcesPage/Events/Events"
import NextSeo from "@/components/Seo/Seo"

export default function Page() {
  const seoField = {
    title: "Past & Upcoming Events | Nautilus Shipping",
    description:
      "Stay updated on Nautilus Shipping events featuring industry insights, expert discussions, networking opportunities, and maritime best practices.",
    path: "/events",
    metaImage: "/our-approach/img01.png",
    pageType: "WebSite",
  }

  return (
    <>
      <NextSeo {...seoField} />
      <Events />
    </>
  )
}

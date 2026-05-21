import AjayKrishnamaniInfo from "@/components/InfoPage/AjayKrishnamaniInfo"
import NextSeo from "@/components/Seo/Seo"

export default function Page() {
  const seoField = {
    title: "Ajay Krishnamani | Links & Social",
    description:
      "Quick links to Ajay Krishnamani profile — website, contact, LinkedIn, and Nautilus Shipping.",
    path: "/ajay-krishnamani-info",
    metaImage: "https://www.nautilusshipping.com/logo.png",
    robots: "noindex, nofollow",
  }

  return (
    <>
      <NextSeo {...seoField} />
      <main id="main-content">
        <AjayKrishnamaniInfo />
      </main>
    </>
  )
}

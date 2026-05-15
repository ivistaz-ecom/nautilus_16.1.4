import InfoPage from "@/components/InfoPage/InfoPage"
import NextSeo from "@/components/Seo/Seo"

export default function Page() {
  const seoField = {
    title: "Nautilus Shipping | Links & Social",
    description:
      "Quick links to Nautilus Shipping — website, contact, LinkedIn, Instagram, Facebook, and X.",
    path: "/info",
    metaImage: "https://www.nautilusshipping.com/logo.png",
  }

  return (
    <>
      <NextSeo {...seoField} />
      <main id="main-content">
        <InfoPage />
      </main>
    </>
  )
}

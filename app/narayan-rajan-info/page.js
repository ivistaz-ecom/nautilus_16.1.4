import NarayanRajanInfo from "@/components/InfoPage/NarayanRajanInfo"
import NextSeo from "@/components/Seo/Seo"

export default function Page() {
  const seoField = {
    title: "Narayan Rajan  | Links & Social",
    description:
      "Quick links to Narayan Rajan Profile — website, contact, LinkedIn, Instagram, Facebook, and X.",
    path: "/info",
    metaImage: "https://www.nautilusshipping.com/logo.png",
  }

  return (
    <>
      <NextSeo {...seoField} />
      <main id="main-content">
        <NarayanRajanInfo />
      </main>
    </>
  )
}

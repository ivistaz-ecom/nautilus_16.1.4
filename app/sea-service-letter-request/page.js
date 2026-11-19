import NextSeo from "@/components/Seo/Seo"
import SeaServiceLetterPage from "@/components/SeaServiceLetter/SeaServiceLetterPage"

export default function Page() {
  const seoField = {
    title: "Sea Service Letter | Nautilus Shipping",
    description:
      "Request a signed sea service letter for time served on a Nautilus Shipping vessel. Crew operations verifies your service against vessel records.",
    path: "/sea-service-letter-request",
    metaImage: "https://www.nautilusshipping.com/logo.png",
  }

  return (
    <>
      <NextSeo {...seoField} />
      <main id="main-content">
        <SeaServiceLetterPage />
      </main>
    </>
  )
}

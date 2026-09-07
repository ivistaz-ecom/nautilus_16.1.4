import ContactPage from "@/components/ContactPage/ContactPage"
import NextSeo from "@/components/Seo/Seo"

export default function Page() {
  const seoField = {
    title: "Contact Nautilus Shipping | Ship Management Companies in India",
    description:
      "Nautilus Shipping provides expert crew management, including recruitment, training, and welfare programs to support safe, efficient fleet operations.",
    path: "/contact-us",
    metaImage: "/our-approach/img01.png",
    pageType: "WebSite",
  }

  return (
    <>
      <NextSeo {...seoField} />
      <ContactPage />
    </>
  )
}

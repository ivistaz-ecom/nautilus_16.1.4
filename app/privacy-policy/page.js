import PrivacyPolicy from "@/components/PrivacyPolicy/PrivacyPolicy"
import NextSeo from "@/components/Seo/Seo"

export default function Page() {
  const seoField = {
    title: "Privacy Policy | Nautilus Shipping",
    description:
      "Read Nautilus Shipping’s Privacy Policy to learn how we collect, use, and protect your data with transparency and security.",
    path: "/privacy-policy",
    metaImage: "/our-approach/img01.png",
    pageType: "WebSite",
  }
  return (
    <>
      <NextSeo {...seoField} />
      <PrivacyPolicy />
    </>
  )
}

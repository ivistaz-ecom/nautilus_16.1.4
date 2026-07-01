import LandingPage from "@/components/LandingPage/LandingPage"
import NextSeo from "@/components/Seo/Seo"
import Script from "next/script"

export default function Page() {
  const seoField = {
    title: "Seafarer Stories: Life, Lessons & Journeys at Sea",
    description:
      "Explore Seafarer Stories from Nautilus Shipping, featuring real experiences, career insights, challenges, and life lessons from professionals at sea.",
    path: "/stories-from-the-sea",
    metaImage: "/logo.png",
    pageType: "WebSite",
  }

  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://www.nautilusshipping.com/stories-from-the-sea",
    name: seoField.title,
    description: seoField.description,
    url: "https://www.nautilusshipping.com/stories-from-the-sea",
    keywords: ["Seafarer Stories"],
    publisher: {
      "@type": "Organization",
      name: "Nautilus Shipping",
      url: "https://nautilusshipping.com",
      logo: {
        "@type": "ImageObject",
        url: "https://nautilusshipping.com/logo.png",
      },
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://nautilusshipping.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Stories from the Sea",
          item: "https://www.nautilusshipping.com/stories-from-the-sea",
        },
      ],
    },
  }

  return (
    <>
      <NextSeo {...seoField} />

      <Script
        id="seafarer-stories-collection-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionPageSchema),
        }}
      />

      <LandingPage />
    </>
  )
}

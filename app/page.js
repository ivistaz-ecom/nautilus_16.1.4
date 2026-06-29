import HomePage from "@/components/HomePage/HomePage"
import NextSeo from "@/components/Seo/Seo"
import Script from "next/script"

export default function Home() {
  const seoField = {
    title: "Nautilus Shipping | The Standard for Excellence in Ship Management",
    description:
      "For 19+ years, Nautilus Shipping has delivered ship management excellence with 200+ ships manned and a network of 100,000+ seafarers worldwide.",
    path: "/",
  }

  return (
    <>
      <NextSeo {...seoField} />
      
      {/* Video Structured Data for Home Page */}
      <Script
        id="video-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            "name": "The Standard for Excellence in Ship Management and Marine Services",
            "description": "Nautilus Shipping has stood as a trusted partner in ship management services, driven by our commitment to reliability, performance, and sustainable solutions. Using our proven 4Ps approach, we manage vessels and support ship owners with tailored strategies to enhance profitability, crew welfare, and environmental responsibility. Our focus on technical management ensures the highest standards of operational efficiency.",
            "thumbnailUrl": "https://ivista-digital-bucket.blr1.cdn.digitaloceanspaces.com/Nautilus-Website/nautilus_thumbnail.jpg",
            "uploadDate": "2025-05-01",
            "duration": "PT0M12S",
            "contentUrl": "https://ivista-digital-bucket.blr1.cdn.digitaloceanspaces.com/Nautilus-Website/nautilus_sea.mp4",
            "embedUrl": "https://ivista-digital-bucket.blr1.cdn.digitaloceanspaces.com/Nautilus-Website/nautilus_sea.mp4",
            "potentialAction": {
              "@type": "SeekToAction",
              "target": "https://ivista-digital-bucket.blr1.cdn.digitaloceanspaces.com/Nautilus-Website/nautilus_sea.mp4?start={seek_to_second_number}",
              "startOffset-input": "required name=seek_to_second_number"
            }
          })
        }}
      />
      
      <HomePage />
    </>
  )
}

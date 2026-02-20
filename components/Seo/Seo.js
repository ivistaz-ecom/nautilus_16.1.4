"use client"
import React from "react"

const SITE_URL = "https://www.nautilusshipping.com"

function NextSeo({ title, description, path, metaImage, preloadImage }) {
  // Use absolute URL for canonical (required by crawlers). During SSR window is undefined, so use SITE_URL.
  const domainName =
    typeof window !== "undefined" ? window.location.origin : SITE_URL

  return (
    <head>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/images/favicon-150x150.png" />
      {/* Preload LCP image for faster rendering */}
      {preloadImage && (
        <link
          rel="preload"
          as="image"
          href={preloadImage}
          fetchPriority="high"
        />
      )}
      <link rel="canonical" href={`${domainName}${path}`} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={`${domainName}${path}`} />
      <meta property="og:site_name" content={title} />
      <meta property="og:image" content={metaImage} />
      <meta name="twitter:card" content="summary_large_image" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "WebSite",
            name: "Nautilus Shipping",
            url: "https://www.nautilusshipping.com/",
            potentialAction: {
              "@type": "SearchAction",
              target: `https://www.nautilusshipping.com${path}`,
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
    </head>
  )
}

export default NextSeo

import React from "react"

const SITE_URL = "https://www.nautilusshipping.com"

function NextSeo({
  title,
  description,
  path,
  metaImage,
  preloadImage,
  robots,
}) {
  // Always use SITE_URL for canonical to avoid conflicting www vs non-www.
  const domainName = SITE_URL

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org/",
    "@type": "WebSite",
    name: "Nautilus Shipping",
    url: "https://www.nautilusshipping.com/",
    potentialAction: {
      "@type": "SearchAction",
      target: `https://www.nautilusshipping.com${path}`,
      "query-input": "required name=search_term_string",
    },
  })

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots || "index, follow"} />
      <link rel="icon" href="/images/favicon-150x150.png" />
      {preloadImage ? (
        <link
          rel="preload"
          as="image"
          href={preloadImage}
          fetchPriority="high"
        />
      ) : null}
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
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
    </>
  )
}

export default NextSeo
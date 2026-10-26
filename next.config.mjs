/** @type {import('next').NextConfig} */

// import getBundleAnalyzer from "@next/bundle-analyzer"

// const withBundleAnalyzer = getBundleAnalyzer({
//   enabled: process.env.ANALYZE === "true",
// })

const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "docs.nautilusshipping.com",
        pathname: "/**",
      },
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|jpeg|png|webp|avif|woff2|css|js)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/Ocean.jpg",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: "/resources/news-and-insights",
        destination: "/news-and-insights",
        permanent: true,
      },
      {
        source: "/resources/newsletter",
        destination: "/newsletter",
        permanent: true,
      },
      {
        source: "/resources/events",
        destination: "/events",
        permanent: true,
      },
      {
        source: "/resources/latest-news",
        destination: "/news-and-insights",
        permanent: true,
      },
      {
        source: "/ship-management",
        destination: "/service/ship-management",
        permanent: true,
      },
      {
        source: "/commercial-services",
        destination: "/service/commercial-services",
        permanent: true,
      },
      {
        source: "/crew-management",
        destination: "/service/crew-management",
        permanent: true,
      },
      {
        source: "/inspection",
        destination: "/service/inspection",
        permanent: true,
      },
      {
        source: "/team",
        destination: "/about-us/team",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/contact-us",
        permanent: true,
      },
      {
        source: "/seafarer-wellness-a-top-priority-in-a-pandemic-world",
        destination:
          "/news-and-insights/seafarer-wellness-a-top-priority-in-a-pandemic-world",
        permanent: true,
      },
      {
        source: "/maritime-news",
        destination: "/news-and-insights/maritime-news",
        permanent: true,
      },
      {
        source: "/pandemic-impact",
        destination: "/news-and-insights/pandemic-impact",
        permanent: true,
      },
      {
        source: "/toolbox-talk",
        destination: "/news-and-insights/toolbox-talk",
        permanent: true,
      },
      {
        source: "/lockout-tagout",
        destination: "/news-and-insights/lockout-tagout",
        permanent: true,
      },
      {
        source: "/shipmanagement-services",
        destination: "/news-and-insights/shipmanagement-services",
        permanent: true,
      },
      {
        source: "/boiler-water-treatment",
        destination: "/news-and-insights/boiler-water-treatment",
        permanent: true,
      },
      {
        source: "/technical-ship-management",
        destination: "/news-and-insights/technical-ship-management",
        permanent: true,
      },
      {
        source: "/crew-management-services",
        destination: "/news-and-insights/crew-management-services",
        permanent: true,
      },
      {
        source: "/marine-engine-parts",
        destination: "/news-and-insights/marine-engine-parts",
        permanent: true,
      },
      {
        source: "/types-of-marine-diesel-engines",
        destination: "/news-and-insights/types-of-marine-diesel-engines",
        permanent: true,
      },
      {
        source: "/main-engine-crankshaft-types-and-materials-explained",
        destination:
          "/news-and-insights/main-engine-crankshaft-types-and-materials-explained",
        permanent: true,
      },
      {
        source: "/crankcase-explosion",
        destination: "/news-and-insights/crankcase-explosion",
        permanent: true,
      },
      {
        source: "/indian-shipping-industry-statistics-2022",
        destination:
          "/news-and-insights/indian-shipping-industry-statistics-2022",
        permanent: true,
      },
      {
        source: "/types-of-boilers",
        destination: "/news-and-insights/types-of-boilers",
        permanent: true,
      },
      {
        source: "/chronic-unease",
        destination: "/news-and-insights/chronic-unease",
        permanent: true,
      },
      {
        source: "/root-cause-analysis",
        destination: "/news-and-insights/root-cause-analysis",
        permanent: true,
      },
      {
        source: "/major-ports-in-india",
        destination: "/news-and-insights/major-ports-in-india",
        permanent: true,
      },
      {
        source: "/oil-spill-clean-up-methods",
        destination: "/news-and-insights/oil-spill-clean-up-methods",
        permanent: true,
      },
      {
        source: "/man-bw-engine-nomenclature-explained",
        destination: "/news-and-insights/man-bw-engine-nomenclature-explained",
        permanent: true,
      },
      {
        source: "/classes-of-fire",
        destination: "/news-and-insights/classes-of-fire",
        permanent: true,
      },
      {
        source: "/fire-triangle-fire-tetrahedron",
        destination: "/news-and-insights/fire-triangle-fire-tetrahedron",
        permanent: true,
      },
      {
        source: "/marine-engineer",
        destination: "/news-and-insights/marine-engineer",
        permanent: true,
      },
      {
        source: "/marine-engine-power-efficiency",
        destination: "/news-and-insights/marine-engine-power-efficiency",
        permanent: true,
      },
      {
        source: "/marine-propulsion-systems",
        destination: "/news-and-insights/marine-propulsion-systems",
        permanent: true,
      },
      {
        source: "/engine-connecting-rod",
        destination: "/news-and-insights/engine-connecting-rod",
        permanent: true,
      },
      {
        source: "/solas-chapters",
        destination: "/news-and-insights/solas-chapters",
        permanent: true,
      },
      {
        source: "/methane-slip",
        destination: "/news-and-insights/methane-slip",
        permanent: true,
      },
      {
        source: "/cathodic-protection",
        destination: "/news-and-insights/cathodic-protection",
        permanent: true,
      },
      {
        source: "/carbon-intensity-indicator-cii",
        destination: "/news-and-insights/carbon-intensity-indicator-cii",
        permanent: true,
      },
      {
        source: "/form-coefficient-of-ship",
        destination: "/news-and-insights/form-coefficient-of-ship",
        permanent: true,
      },
      {
        source: "/seemp-overview",
        destination: "/news-and-insights/seemp-overview",
        permanent: true,
      },
      {
        source: "/ism-code-part-a",
        destination: "/news-and-insights/ism-code-part-a",
        permanent: true,
      },
      {
        source: "/stern-tube-overview",
        destination: "/news-and-insights/stern-tube-overview",
        permanent: true,
      },
      {
        source: "/azov-sea",
        destination: "/news-and-insights/azov-sea",
        permanent: true,
      },
      {
        source: "/marpol-overview",
        destination: "/news-and-insights/marpol-overview",
        permanent: true,
      },
      {
        source: "/types-of-lifeboats-a-comprehensive-guide",
        destination:
          "/news-and-insights/types-of-lifeboats-a-comprehensive-guide",
        permanent: true,
      },
      {
        source: "/suez-canal",
        destination: "/news-and-insights/suez-canal",
        permanent: true,
      },
      {
        source: "/propeller-cavitation",
        destination: "/news-and-insights/propeller-cavitation",
        permanent: true,
      },
      {
        source: "/main-engine-bearing-clearances",
        destination: "/news-and-insights/main-engine-bearing-clearances",
        permanent: true,
      },
      {
        source: "/zero-carbon-emission-ships",
        destination: "/news-and-insights/zero-carbon-emission-ships",
        permanent: true,
      },
      {
        source: "/wind-propulsion-systems",
        destination: "/news-and-insights/wind-propulsion-systems",
        permanent: true,
      },
      {
        source: "/greenhouse-gas-emissions",
        destination: "/news-and-insights/greenhouse-gas-emissions",
        permanent: true,
      },
      {
        source: "/marine-plastic-pollution",
        destination: "/news-and-insights/marine-plastic-pollution",
        permanent: true,
      },
      {
        source: "/baltimore-bridge-collapse",
        destination: "/news-and-insights/baltimore-bridge-collapse",
        permanent: true,
      },
      {
        source: "/nuclear-marine-propulsion",
        destination: "/news-and-insights/nuclear-marine-propulsion",
        permanent: true,
      },
      {
        source: "/enclosed-space-entry",
        destination: "/news-and-insights/enclosed-space-entry",
        permanent: true,
      },
      {
        source: "/epirb",
        destination: "/news-and-insights/epirb",
        permanent: true,
      },
      {
        source: "/sire-2-0-overview",
        destination: "/news-and-insights/sire-2-0-overview",
        permanent: true,
      },
      {
        source: "/hazardous-materials-classes",
        destination: "/news-and-insights/hazardous-materials-classes",
        permanent: true,
      },
      {
        source: "/risk-assessment-overview",
        destination: "/news-and-insights/risk-assessment-overview",
        permanent: true,
      },
      {
        source: "/hierarchy-of-controls",
        destination: "/news-and-insights/hierarchy-of-controls",
        permanent: true,
      },
      {
        source: "/deepest-parts-of-the-ocean",
        destination: "/news-and-insights/deepest-parts-of-the-ocean",
        permanent: true,
      },
      {
        source: "/black-sea",
        destination: "/news-and-insights/black-sea",
        permanent: true,
      },
      {
        source:
          "/ship-security-officer-duties-responsibilities-course-and-other-faqs",
        destination:
          "/news-and-insights/ship-security-officer-duties-responsibilities-course-and-other-faqs",
        permanent: true,
      },
      {
        source:
          "/psychological-safety-in-safety-management-systems-managing-safety-risks-without-fear",
        destination:
          "/news-and-insights/psychological-safety-in-safety-management-systems-managing-safety-risks-without-fear",
        permanent: true,
      },
      {
        source:
          "/the-impact-of-the-red-sea-attacks-on-global-trade-and-the-maritime-industry",
        destination:
          "/news-and-insights/the-impact-of-the-red-sea-attacks-on-global-trade-and-the-maritime-industry",
        permanent: true,
      },
      {
        source:
          "/importance-of-crew-training-for-technical-ship-management-companies-in-india",
        destination:
          "/news-and-insights/importance-of-crew-training-for-technical-ship-management-companies-in-india",
        permanent: true,
      },
      {
        source:
          "/how-a-smart-propulsion-system-in-ships-revolutionizes-the-maritime-industry",
        destination:
          "/news-and-insights/how-a-smart-propulsion-system-in-ships-revolutionizes-the-maritime-industry",
        permanent: true,
      },
      {
        source: "/the-role-of-artificial-intelligenceai-in-maritime-safety-3",
        destination:
          "/news-and-insights/the-role-of-artificial-intelligenceai-in-maritime-safety-3",
        permanent: true,
      },
      {
        source:
          "/ppe-in-maritime-safety-essential-protection-for-seafarers-from-workplace-hazards",
        destination:
          "/news-and-insights/ppe-in-maritime-safety-essential-protection-for-seafarers-from-workplace-hazards",
        permanent: true,
      },
      {
        source:
          "/ballast-water-management-what-every-seafarer-needs-to-know-about-imo-regulations",
        destination:
          "/news-and-insights/ballast-water-management-what-every-seafarer-needs-to-know-about-imo-regulations",
        permanent: true,
      },
      {
        source:
          "/the-importance-of-focusing-on-seafarers-mental-health-during-long-voyages",
        destination:
          "/news-and-insights/the-importance-of-focusing-on-seafarers-mental-health-during-long-voyages",
        permanent: true,
      },
      {
        source:
          "/the-importance-of-marine-lubricants-and-engine-oils-for-ship-engine-optimization",
        destination:
          "/news-and-insights/the-importance-of-marine-lubricants-and-engine-oils-for-ship-engine-optimization",
        permanent: true,
      },
      {
        source: "/green-shipping-the-future-of-a-sustainable-shipping-industry",
        destination:
          "/news-and-insights/green-shipping-the-future-of-a-sustainable-shipping-industry",
        permanent: true,
      },
      {
        source:
          "/shipboard-firefighting-systems-an-essential-guide-to-fire-safety-at-sea",
        destination:
          "/news-and-insights/shipboard-firefighting-systems-an-essential-guide-to-fire-safety-at-sea",
        permanent: true,
      },
      {
        source: "/the-worlds-major-maritime-trade-routes-connecting-the-globe",
        destination:
          "/news-and-insights/the-worlds-major-maritime-trade-routes-connecting-the-globe",
        permanent: true,
      },
      {
        source:
          "/understanding-port-state-control-psc-keeping-ships-safe-and-compliant",
        destination:
          "/news-and-insights/understanding-port-state-control-psc-keeping-ships-safe-and-compliant",
        permanent: true,
      },
      {
        source:
          "/hull-design-understanding-hull-types-and-ship-design-capabilities",
        destination:
          "/news-and-insights/hull-design-understanding-hull-types-and-ship-design-capabilities",
        permanent: true,
      },
      {
        source:
          "/decarbonization-in-maritime-shipping-controlling-greenhouse-gas-emissions-for-energy-efficiency",
        destination:
          "/news-and-insights/decarbonization-in-maritime-shipping-controlling-greenhouse-gas-emissions-for-energy-efficiency",
        permanent: true,
      },
      {
        source:
          "/standards-of-training-certification-watchkeeping-stcw-ensuring-safe-seas-and-skilled-mariners",
        destination:
          "/news-and-insights/standards-of-training-certification-watchkeeping-stcw-ensuring-safe-seas-and-skilled-mariners",
        permanent: true,
      },
      {
        source: "/the-international-maritime-organization-imo-and-what-it-does",
        destination:
          "/news-and-insights/the-international-maritime-organization-imo-and-what-it-does",
        permanent: true,
      },
      {
        source:
          "/flag-of-convenience-understanding-vessel-registration-and-the-flags-commonly-used-in-shipping",
        destination:
          "/news-and-insights/flag-of-convenience-understanding-vessel-registration-and-the-flags-commonly-used-in-shipping",
        permanent: true,
      },
      {
        source: "/what-is-the-directorate-general-of-shipping-dg-shipping",
        destination:
          "/news-and-insights/what-is-the-directorate-general-of-shipping-dg-shipping",
        permanent: true,
      },
      {
        source:
          "/technologies-in-port-management-revolutionizing-maritime-trade",
        destination:
          "/news-and-insights/technologies-in-port-management-revolutionizing-maritime-trade",
        permanent: true,
      },
      {
        source:
          "/the-imos-expectations-for-the-future-of-shipping-how-to-get-there",
        destination:
          "/news-and-insights/the-imos-expectations-for-the-future-of-shipping-how-to-get-there",
        permanent: true,
      },
      {
        source:
          "/the-green-energy-transition-in-maritime-trade-a-path-to-net-zero-by-2050",
        destination:
          "/news-and-insights/the-green-energy-transition-in-maritime-trade-a-path-to-net-zero-by-2050",
        permanent: true,
      },
      {
        source:
          "/how-do-aging-vessels-drive-strategic-success-in-nautilus-shippings-fleet-management",
        destination:
          "/news-and-insights/how-do-aging-vessels-drive-strategic-success-in-nautilus-shippings-fleet-management",
        permanent: true,
      },
      {
        source:
          "/with-older-vessels-being-over-30-of-the-marine-industry-how-do-we-make-the-best-of-it",
        destination:
          "/news-and-insights/with-older-vessels-being-over-30-of-the-marine-industry-how-do-we-make-the-best-of-it",
        permanent: true,
      },
      {
        source:
          "/the-future-of-maritime-trade-applications-of-ai-in-marine-industry",
        destination:
          "/news-and-insights/the-future-of-maritime-trade-applications-of-ai-in-marine-industry",
        permanent: true,
      },
      {
        source: "/understanding-the-basics-of-shipping-chartering",
        destination:
          "/news-and-insights/understanding-the-basics-of-shipping-chartering",
        permanent: true,
      },
      {
        source:
          "/the-role-of-maritime-security-in-ensuring-global-safety-and-trade",
        destination:
          "/news-and-insights/the-role-of-maritime-security-in-ensuring-global-safety-and-trade",
        permanent: true,
      },
      {
        source: "/crew-welfare-and-retention-the-key-to-operational-success",
        destination:
          "/news-and-insights/crew-welfare-and-retention-the-key-to-operational-success",
        permanent: true,
      },
      {
        source:
          "/its-not-just-about-the-money-seafarers-need-better-treatment-ifindustry-wants-sea-going-workforce",
        destination:
          "/news-and-insights/its-not-just-about-the-money-seafarers-need-better-treatment-ifindustry-wants-sea-going-workforce",
        permanent: true,
      },
      {
        source: "/port-fees-on-chinese-ships-changing-tides-in-global-shipping",
        destination:
          "/news-and-insights/port-fees-on-chinese-ships-changing-tides-in-global-shipping",
        permanent: true,
      },
      {
        source:
          "/how-container-shipping-companies-can-reduce-their-environmental-footprint",
        destination:
          "/news-and-insights/how-container-shipping-companies-can-reduce-their-environmental-footprint",
        permanent: true,
      },
      {
        source:
          "/resources/news-and-insights/types-of-boilers",
        destination:
          "/news-and-insights/types-of-boilers",
        permanent: true,
      },
    ]
  },
}

export default nextConfig

// export default withBundleAnalyzer({})

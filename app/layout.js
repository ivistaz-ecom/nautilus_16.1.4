import { Merriweather } from "next/font/google"
import "@/styles/globals.css"
import Footer from "@/components/Footer/Footer"
import ScrollButton from "@/components/ScrollButton/ScrollButton"
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop"
import Script from "next/script"

const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
})

export const metadata = {
  metadataBase: new URL("https://www.nautilusshipping.com"),
  robots: "index, follow",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={merriweather.className}>
      <head>
        <meta
          name="google-site-verification"
          content="ximcwDn5nLvnNzaFd5RFKg4kZIsdRpd2fZ5waaTkXZw"
        />

        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="lazyOnload">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MC9BP82');
          `}
        </Script>

        {/* Google Analytics */}
        <Script
          strategy="lazyOnload"
          src="https://www.googletagmanager.com/gtag/js?id=G-N3V27DPYSK"
        />
        <Script strategy="lazyOnload" id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag() {
              dataLayer.push(arguments);
            }
            gtag('js', new Date());
            gtag('config', 'G-N3V27DPYSK');
          `}
        </Script>
      </head>

      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MC9BP82"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <ScrollToTop />

        <Script id="disable-scroll-restoration" strategy="beforeInteractive">
          {`
            if (typeof window !== 'undefined' && 'scrollRestoration' in history) {
              history.scrollRestoration = 'manual';
            }
          `}
        </Script>

        {children}
        <Footer />
        <ScrollButton />

        {/* 🔵 LinkedIn Insight Tag */}
        <Script id="linkedin-partner" strategy="afterInteractive">
          {`
            _linkedin_partner_id = "6046612";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
          `}
        </Script>

        <Script
          id="linkedin-insight"
          strategy="afterInteractive"
          src="https://snap.licdn.com/li.lms-analytics/insight.min.js"
        />

        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src="https://px.ads.linkedin.com/collect/?pid=6046612&fmt=gif"
          />
        </noscript>
        {/* 🔵 LinkedIn Insight Tag End */}

      </body>
    </html>
  )
}
import { Merriweather } from "next/font/google"
import "@/styles/globals.css"
import Footer from "@/components/Footer/Footer"
import ScrollButton from "@/components/ScrollButton/ScrollButton"
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop"
import Script from "next/script"
import ClarityInit from "@/components/ClarityInit"

//import CookieConsentComponent from "@/components/CookieConsent/CookieConsent"
//import "vanilla-cookieconsent/dist/cookieconsent.css"

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
        {/* Other head elements */}
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
        {/* End Google Tag Manager */}

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

        {/* Apollo Tracking */}
        <Script strategy="lazyOnload" id="apollo-tracking">
          {`
            function initApollo(){var n=Math.random().toString(36).substring(7),o=document.createElement("script");
            o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n,o.async=!0,o.defer=!0,
            o.onload=function(){window.trackingFunctions.onLoad({appId:"663865f413aed80300110b0d"})},
            document.head.appendChild(o)}initApollo();
          `}
        </Script>
        {/* Apollo Tracking End */}

        {/* Apollo Form Enrichment */}
        <Script strategy="afterInteractive" id="apollo-form-enrichment">
          {`
            (function initApolloInbound(){var TIMEOUT_MS=15000;var timeoutId;var style=document.createElement('style');style.id='apollo-form-prehide-css';style.textContent='form:has(input[type="email" i]),form:has(input[name="email" i]),.hs-form-iframe{position:relative!important}form:has(input[type="email" i])::before,form:has(input[name="email" i])::before,.hs-form-iframe::before{content:\\'\\';position:absolute;inset:0;display:flex;align-items:center;justify-content:center;width:50px;height:50px;margin:auto;border:2.5px solid #e1e1e1;border-top:2.5px solid #9ea3a6;border-radius:50%;animation:spin 1s linear infinite;background-color:transparent;pointer-events:auto;z-index:999999;opacity:1}form:has(input[type="email" i]) *,form:has(input[name="email" i]) *,.hs-form-iframe *{opacity:0!important;user-select:none!important;pointer-events:none!important}@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}';(document.head || document.documentElement).appendChild(style);function cleanup(){var styleEl=document.getElementById('apollo-form-prehide-css');if(styleEl)styleEl.remove();if(timeoutId)clearTimeout(timeoutId);}timeoutId=setTimeout(function(){console.warn('[Apollo] Form enrichment timeout after 5s - revealing forms. Check network and console for errors.');cleanup();},TIMEOUT_MS);var nocache=Math.random().toString(36).substring(7);var script=document.createElement('script');script.src='https://assets.apollo.io/js/apollo-inbound.js?nocache=' + nocache;script.defer=true;script.onerror=function(){console.error('[Apollo] Failed to load form enrichment script');cleanup();};script.onload=function(){try{window.ApolloInbound.formEnrichment.init({appId: '69294cad8f89910019798011',onReady: function(){cleanup();},onError: function(err){console.error('[Apollo] Form enrichment init error:',err);cleanup();}});}catch(err){console.error('[Apollo] Error initializing form enrichment:',err);cleanup();}};document.head.appendChild(script);})();
          `}
        </Script>
        {/* Apollo Form Enrichment End */}
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
        {/* End Google Tag Manager (noscript) */}

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
        <ClarityInit />
        <ScrollButton />
        {/* <CookieConsentComponent /> */}
      </body>
    </html>
  )
}

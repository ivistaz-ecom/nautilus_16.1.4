"use client"

import { useEffect } from "react"
import LandingHeader from "./LandingHeader"
import { seaServiceLetterBodyHtml } from "./bodyHtml"

export default function SeaServiceLetterPage() {
  useEffect(() => {
    let cancelled = false
    const scripts = []

    const loadScript = (src) =>
      new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve()
          return
        }
        const el = document.createElement("script")
        el.src = src
        el.async = false
        el.onload = () => resolve()
        el.onerror = reject
        document.body.appendChild(el)
        scripts.push(el)
      })

    ;(async () => {
      try {
        await loadScript(
          "https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"
        )
        if (cancelled) return
        // Form markup is already in the DOM from this component render.
        await loadScript("/js/sea-service-letter.js")
      } catch (err) {
        console.error("[sea-service-letter] script load failed", err)
      }
    })()

    return () => {
      cancelled = true
      window.__sslBooted = false
      scripts.forEach((el) => el.remove())
    }
  }, [])

  return (
    <div className="ssl-page" data-theme="dark">
      <LandingHeader />
      <div dangerouslySetInnerHTML={{ __html: seaServiceLetterBodyHtml }} />
    </div>
  )
}

"use client"

import { useEffect } from "react"
import LandingHeader from "./LandingHeader"
import { seaServiceLetterBodyHtml } from "./bodyHtml"

const SSL_JS_VERSION = "20261119b"
const INTL_TEL_CSS =
  "https://cdn.jsdelivr.net/npm/intl-tel-input@24.6.0/build/css/intlTelInput.min.css"
const INTL_TEL_JS =
  "https://cdn.jsdelivr.net/npm/intl-tel-input@24.6.0/build/js/intlTelInput.min.js"

function ensureStylesheet(href) {
  if (document.querySelector(`link[href="${href}"]`)) return
  const link = document.createElement("link")
  link.rel = "stylesheet"
  link.href = href
  document.head.appendChild(link)
}

export default function SeaServiceLetterPage() {
  useEffect(() => {
    let cancelled = false
    const scripts = []

    const loadScript = (src, { force = false } = {}) =>
      new Promise((resolve, reject) => {
        const existing = document.querySelector(`script[src="${src}"]`)
        if (existing && !force) {
          resolve()
          return
        }
        if (existing && force) existing.remove()
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
        ensureStylesheet(INTL_TEL_CSS)
        await loadScript(INTL_TEL_JS)
        await loadScript(
          "https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"
        )
        if (cancelled) return
        window.__sslBooted = false
        await loadScript(`/js/sea-service-letter.js?v=${SSL_JS_VERSION}`, {
          force: true,
        })
      } catch (err) {
        console.error("[sea-service-letter] script load failed", err)
      }
    })()

    return () => {
      cancelled = true
      window.__sslBooted = false
      if (window.__sslPhoneIti) {
        try {
          window.__sslPhoneIti.destroy()
        } catch (_) {
          /* ignore */
        }
        window.__sslPhoneIti = null
      }
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

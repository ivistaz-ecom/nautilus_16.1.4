export async function POST(req) {
  try {
    const secret = process.env.RECAPTCHA_SECRET_KEY
    const siteVerifyUrl = "https://www.google.com/recaptcha/api/siteverify"
    const wpUrl =
      "https://docs.nautilusshipping.com/wp-json/contact-form-7/v1/contact-forms/10026/feedback"

    if (!secret) {
      return Response.json(
        { error: "Missing RECAPTCHA_SECRET_KEY" },
        { status: 500 }
      )
    }

    const formData = await req.formData()
    const token =
      formData.get("g-recaptcha-response") || formData.get("recaptchaToken")

    if (!token) {
      return Response.json(
        { error: "Missing reCAPTCHA token" },
        { status: 400 }
      )
    }

    const verifyBody = new URLSearchParams()
    verifyBody.set("secret", secret)
    verifyBody.set("response", String(token))

    const verifyRes = await fetch(siteVerifyUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: verifyBody,
    })

    if (!verifyRes.ok) {
      return Response.json(
        { error: "reCAPTCHA verification failed" },
        { status: 502 }
      )
    }

    const verifyJson = await verifyRes.json()
    if (!verifyJson?.success) {
      return Response.json(
        { error: "reCAPTCHA check did not pass", details: verifyJson },
        { status: 400 }
      )
    }

    const wpRes = await fetch(wpUrl, {
      method: "POST",
      body: formData,
    })

    const contentType = wpRes.headers.get("content-type") || ""
    const payload = contentType.includes("application/json")
      ? await wpRes.json()
      : await wpRes.text()

    if (!wpRes.ok) {
      return Response.json(
        { error: "Upstream form submit failed", upstream: payload },
        { status: 502 }
      )
    }

    return Response.json(payload, { status: 200 })
  } catch (err) {
    return Response.json(
      { error: "Unexpected error", message: err?.message || String(err) },
      { status: 500 }
    )
  }
}


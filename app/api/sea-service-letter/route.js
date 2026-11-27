import { NextResponse } from "next/server"

export const runtime = "nodejs"

const NEMO_URL =
  process.env.NEMO_SEA_SERVICE_API_URL ||
  "https://nsnemo.com/apiv1/seaserviceletter"
const NEMO_API_KEY = process.env.NEMO_SEA_SERVICE_API_KEY || ""

function pad(n) {
  return String(n).padStart(2, "0")
}

function fallbackRef() {
  const d = new Date()
  const serial = String(Math.floor(100 + Math.random() * 900))
  return `NSIPL/CHN/${d.getFullYear()}/${pad(d.getMonth() + 1)}/${serial}/ST`
}

function extractRef(json) {
  if (!json || typeof json !== "object") return null
  return (
    json.ref ||
    json.reference ||
    json.referenceNumber ||
    json.referenceNo ||
    json.data?.ref ||
    json.data?.reference ||
    json.result?.ref ||
    null
  )
}

async function parseIncoming(request) {
  const contentType = request.headers.get("content-type") || ""
  if (!contentType.includes("multipart/form-data")) {
    throw new Error("Expected multipart/form-data")
  }

  const form = await request.formData()
  const raw = form.get("payload")
  const payload = typeof raw === "string" ? JSON.parse(raw || "{}") : {}

  const files = []
  for (const [key, value] of form.entries()) {
    if (!key.startsWith("cdcAttachment_") || typeof value === "string") continue
    files.push(value)
  }

  return { payload, files }
}

function buildNemoForm(payload, files) {
  const out = new FormData()

  const phoneCode = payload.phoneCode || ""
  const phoneNumber =
    payload.phoneNational ||
    String(payload.phone || "").replace(phoneCode, "").replace(/\D/g, "")

  const seaServices = (payload.vessels || []).map((v) => ({
    vesselName: v.name || "",
    rank: v.rank || "",
    sailedFrom: v.from || "",
    signedOffOn: v.to || "",
  }))

  out.append("candidateId", payload.nemoId || "")
  out.append("fullName", payload.name || "")
  out.append("email", payload.email || "")
  out.append("phoneCode", phoneCode)
  out.append("phoneNumber", phoneNumber)
  out.append("cdcNumber", payload.cdc || "")
  out.append("indosNumber", payload.indos || "")
  out.append("seaServices", JSON.stringify(seaServices))

  // Optional extras the Nemo API may ignore safely
  if (payload.passport) out.append("passportNumber", payload.passport)

  for (const file of files) {
    out.append("cdcAttachments", file, file.name || "cdc.pdf")
  }

  return out
}

export async function POST(request) {
  try {
    if (!NEMO_API_KEY) {
      console.error("[sea-service-letter] NEMO_SEA_SERVICE_API_KEY is not set")
      return NextResponse.json(
        { error: "Sea service letter API is not configured" },
        { status: 500 }
      )
    }

    const { payload, files } = await parseIncoming(request)

    if (!payload?.name || !payload?.email || !payload?.cdc) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    if (!files.length) {
      return NextResponse.json(
        { error: "At least one CDC attachment is required" },
        { status: 400 }
      )
    }

    const nemoForm = buildNemoForm(payload, files)

    const upstream = await fetch(NEMO_URL, {
      method: "POST",
      headers: {
        "X-API-KEY": NEMO_API_KEY,
        // Let fetch set multipart boundary automatically
      },
      body: nemoForm,
    })

    const text = await upstream.text()
    let json = null
    try {
      json = text ? JSON.parse(text) : null
    } catch {
      json = null
    }

    if (!upstream.ok) {
      console.error("[sea-service-letter] Nemo API error", {
        status: upstream.status,
        body: text?.slice(0, 500),
      })
      return NextResponse.json(
        {
          error:
            json?.message ||
            json?.error ||
            json?.Message ||
            "Sea service letter request failed",
          details: json || undefined,
        },
        { status: upstream.status >= 400 ? upstream.status : 502 }
      )
    }

    const ref = extractRef(json) || fallbackRef()

    console.info("[sea-service-letter] submitted", {
      ref,
      name: payload.name,
      email: payload.email,
      vessels: payload.vessels?.length || 0,
      files: files.length,
      upstreamStatus: upstream.status,
    })

    return NextResponse.json({
      ref,
      ...(json && typeof json === "object" ? { upstream: json } : {}),
    })
  } catch (err) {
    console.error("[sea-service-letter] error", err)
    return NextResponse.json(
      { error: err?.message || "Server error" },
      { status: 500 }
    )
  }
}

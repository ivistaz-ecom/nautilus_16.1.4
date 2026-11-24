import { NextResponse } from "next/server"

export const runtime = "nodejs"

function pad(n) {
  return String(n).padStart(2, "0")
}

async function parseBody(request) {
  const contentType = request.headers.get("content-type") || ""

  if (contentType.includes("multipart/form-data")) {
    const form = await request.formData()
    const raw = form.get("payload")
    const payload =
      typeof raw === "string" ? JSON.parse(raw || "{}") : {}
    const attachments = []

    for (const [key, value] of form.entries()) {
      if (!key.startsWith("cdcAttachment_") || typeof value === "string") continue
      attachments.push({
        field: key,
        name: value.name,
        type: value.type,
        size: value.size,
      })
    }

    return { payload, attachments }
  }

  return { payload: await request.json(), attachments: [] }
}

export async function POST(request) {
  try {
    const { payload, attachments } = await parseBody(request)

    if (!payload?.name || !payload?.email || !payload?.cdc) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const d = new Date()
    const serial = String(Math.floor(100 + Math.random() * 900))
    const ref = `NSIPL/CHN/${d.getFullYear()}/${pad(d.getMonth() + 1)}/${serial}/ST`

    // Persist / email wiring can be added here (CRM, mailbox, storage, etc.)
    console.info("[sea-service-letter]", {
      ref,
      name: payload.name,
      nemoId: payload.nemoId,
      email: payload.email,
      vessels: payload.vessels?.length || 0,
      attachments,
    })

    return NextResponse.json({ ref })
  } catch (err) {
    console.error("[sea-service-letter] error", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

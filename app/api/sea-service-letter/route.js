import { NextResponse } from "next/server"

function pad(n) {
  return String(n).padStart(2, "0")
}

export async function POST(request) {
  try {
    const payload = await request.json()

    if (!payload?.name || !payload?.email || !payload?.cdc) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const d = new Date()
    const serial = String(Math.floor(100 + Math.random() * 900))
    const ref = `NSIPL/CHN/${d.getFullYear()}/${pad(d.getMonth() + 1)}/${serial}/ST`

    // Persist / email wiring can be added here (CRM, mailbox, etc.)
    console.info("[sea-service-letter]", {
      ref,
      name: payload.name,
      email: payload.email,
      vessels: payload.vessels?.length || 0,
    })

    return NextResponse.json({ ref })
  } catch (err) {
    console.error("[sea-service-letter] error", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

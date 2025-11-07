import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: "userId required" }, { status: 400 })
    }

    const apiKey = process.env.ENGAGESPOT_API_KEY
    const apiSecret = process.env.ENGAGESPOT_API_SECRET

    if (!apiKey || !apiSecret) {
      return NextResponse.json({ error: "Missing Engagespot credentials" }, { status: 500 })
    }

    const response = await fetch("https://api.engagespot.co/v3/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-ENGAGESPOT-API-KEY": apiKey,
        "X-ENGAGESPOT-API-SECRET": apiSecret,
      },
      body: JSON.stringify({
        notification: {
          title: "Test Notification",
          message: "This is a test notification from your app",
        },
        recipients: [userId],
      }),
    })

    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}

import { type NextRequest, NextResponse } from "next/server"

const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY || ""
const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || ""

// This is the core server-side handler for push notifications
export async function POST(request: NextRequest) {
  try {
    const { subscription, title, body } = await request.json()

    if (!subscription || !subscription.endpoint) {
      return NextResponse.json({ error: "Invalid subscription" }, { status: 400 })
    }

    if (!VAPID_PRIVATE_KEY || !VAPID_PUBLIC_KEY) {
      return NextResponse.json({ error: "VAPID keys not configured" }, { status: 500 })
    }

    const webpush = await import("web-push").catch(() => null)

    if (!webpush) {
      return NextResponse.json(
        {
          error: "web-push not installed. Run: npm install web-push",
          message: "Notification received but not sent (web-push required)",
        },
        { status: 202 },
      )
    }

    webpush.default.setVapidDetails("mailto:admin@example.com", VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY)

    const payload = JSON.stringify({
      title: title || "New Notification",
      body: body || "You have a new message",
      icon: "/icon-light-32x32.png",
    })

    await webpush.default.sendNotification(subscription, payload)

    console.log("[API] Notification sent successfully")
    return NextResponse.json({
      success: true,
      message: "Notification sent successfully",
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to send notification"
    console.error("[API] Send notification error:", errorMessage)

    // If web-push isn't installed, provide helpful guidance
    if (errorMessage.includes("Cannot find module")) {
      return NextResponse.json(
        {
          error: "web-push package not found",
          instruction: "Install with: npm install web-push",
        },
        { status: 501 },
      )
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}

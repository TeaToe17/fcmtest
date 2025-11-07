import { type NextRequest, NextResponse } from "next/server"
import { storeSubscription, subscriptions } from "@/lib/subscriptions"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { subscription, deviceId } = body

    if (!subscription || !deviceId) {
      return NextResponse.json({ error: "No subscription or deviceId provided" }, { status: 400 })
    }

    storeSubscription(deviceId, subscription)

    return NextResponse.json(
      { success: true, message: "Subscription saved", subscriptions: subscriptions.size },
      { status: 201 },
    )
  } catch (error) {
    console.error("Subscribe error:", error)
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 })
  }
}

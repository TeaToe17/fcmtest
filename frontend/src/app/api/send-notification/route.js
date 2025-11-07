import { NextResponse } from "next/server";

export async function POST() {
  const response = await fetch("https://api.engagespot.co/v3/notifications", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-ENGAGESPOT-API-KEY": process.env.ENGAGESPOT_API_KEY, // 🔒 SECRET key
      "X-ENGAGESPOT-API-SECRET": process.env.ENGAGESPOT_API_SECRET,
    },
    body: JSON.stringify({
      notification: {
        title: "🚀 Test Notification",
        message: "This is a test push from Engagespot",
        url: "https://localhost:3000",
      },
      sendTo: {
        recipients: ["jale.official.contact@gmail.com"], // your test user
      },
      override: {
        channels: ["webPush"],
      },
    }),
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Failed to send notification" }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}

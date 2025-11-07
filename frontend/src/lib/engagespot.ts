// src/lib/engagespot.ts
const API_KEY = process.env.NEXT_PUBLIC_ENGAGESPOT_API_KEY!;

// // ✅ Initialize user & optional bell widget
// export async function initEngagespot(userId: string) {
//   // dynamically import the client so it runs only in browser
//   const { default: Engagespot } = await import("@engagespot/client");

//   Engagespot.render("#notification-bell", {
//     apiKey: API_KEY,
//     userId,
//     dataRegion: "us",
//   });
// }

// ✅ Send a test notification through REST API
export async function sendTestNotification(userId: string) {
  try {
    const res = await fetch("/api/send-notification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });

    if (!res.ok) throw new Error("Failed to send notification");

    console.log("✅ Notification sent successfully!");
  } catch (err) {
    console.error("❌ Engagespot push error:", err);
  }
}

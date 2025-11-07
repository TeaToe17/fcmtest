"use server"

export async function getVapidKey() {
  const vapidKey = process.env.NEXT_PUBLIC_VAPID_KEY
  if (!vapidKey) {
    throw new Error("VAPID key not configured")
  }
  return vapidKey
}

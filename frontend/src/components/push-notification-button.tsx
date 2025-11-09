"use client"

import { usePushNotifications } from "@/hooks/use-push-notifications"
import { useEffect, useState } from "react"

export function PushNotificationButton() {
  const { isSupported, isSubscribed, isLoading, error, subscribe, unsubscribe, sendTestNotification } =
    usePushNotifications()

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !isSupported) {
    return (
      <div>
        <p>Push notifications are not supported in this browser</p>
      </div>
    )
  }

  return (
    <div>
      <div>
        <p>Status: {isSubscribed ? "✓ Subscribed" : "✗ Not subscribed"}</p>
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
      </div>

      <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", flexDirection: "column" }}>
        {!isSubscribed ? (
          <button onClick={subscribe} disabled={isLoading}>
            {isLoading ? "Subscribing..." : "Enable Push Notifications"}
          </button>
        ) : (
          <>
            <button onClick={sendTestNotification} disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Test Notification"}
            </button>
            <button onClick={unsubscribe} disabled={isLoading}>
              {isLoading ? "Unsubscribing..." : "Disable Push Notifications"}
            </button>
          </>
        )}
      </div>

      <div style={{ marginTop: "1rem", padding: "1rem", backgroundColor: "#f5f5f5" }}>
        <h3>Environment Variables Required:</h3>
        <pre>
          {`NEXT_PUBLIC_VAPID_PUBLIC_KEY=your_public_vapid_key_here
VAPID_PRIVATE_KEY=your_private_vapid_key_here`}
        </pre>
        <p>Generate keys with: npx web-push generate-vapid-keys</p>
      </div>

      <div style={{ marginTop: "1rem", padding: "1rem", backgroundColor: "#fffacd" }}>
        <h3>For Real Push Notifications:</h3>
        <p>Install: npm install web-push</p>
      </div>
    </div>
  )
}

"use client";

import { PushNotificationButton } from "@/components/push-notification-button";

export default function Home() {
  return (
    <main style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>PWA Push Notifications</h1>
      <p>Test web push notifications with VAPID keys on iOS and Android PWAs</p>

      <PushNotificationButton />

      <div
        style={{
          marginTop: "2rem",
          padding: "1rem",
          backgroundColor: "#e8f4f8",
        }}
      >
        <h2>Setup Instructions:</h2>
        <ol>
          <li>Generate VAPID keys: npx web-push generate-vapid-keys</li>
          <li>
            Add to .env.local:
            <pre>{`NEXT_PUBLIC_VAPID_PUBLIC_KEY=your_key
VAPID_PRIVATE_KEY=your_key`}</pre>
          </li>
          <li>Install web-push: npm install web-push</li>
          <li>Click "Enable Push Notifications"</li>
          <li>Click "Send Test Notification" to test</li>
          <li>iOS/iPadOS: Add site to Home Screen as PWA first, then test</li>
        </ol>
      </div>

      <div
        style={{
          marginTop: "2rem",
          padding: "1rem",
          backgroundColor: "#f0e8f8",
        }}
      >
        <h2>iOS PWA Push Notifications:</h2>
        <ul>
          <li>Works on iOS 16.4+ and iPadOS 16.4+</li>
          <li>Must be installed as PWA (Add to Home Screen)</li>
          <li>Uses Apple Push Notification service (APNs) transparently</li>
          <li>Your custom VAPID keys work with native Web Push API</li>
          <li>Payloads limited to ~4KB</li>
        </ul>
      </div>
    </main>
  );
}

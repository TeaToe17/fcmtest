// hooks/usePush.ts
import { useEffect, useState } from "react";

// Convert base64 public key to Uint8Array (required for pushManager.subscribe)
function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export function usePushSubscription() {
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);

  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    if (!publicKey) {
      console.error("VAPID public key missing!");
      return;
    }

    if ("serviceWorker" in navigator && "PushManager" in window) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(async (registration) => {
          console.log("✅ Service Worker registered:", registration);

          const existing = await registration.pushManager.getSubscription();
          if (existing) {
            console.log("Already subscribed:", existing);
            setSubscription(existing);
            return;
          }

          const permission = await Notification.requestPermission();
          if (permission !== "granted") {
            console.warn("Notification permission not granted");
            return;
          }

          const convertedKey = urlBase64ToUint8Array(publicKey);
          const newSub = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: convertedKey,
          });

          console.log("🎯 Subscribed to push:", newSub);
          setSubscription(newSub);

          // 👉 Send `newSub` to your backend or Engagespot API here
        })
        .catch((err) => console.error("❌ Service Worker registration failed:", err));
    } else {
      console.warn("Push notifications not supported in this browser");
    }
  }, []);

  return subscription;
}

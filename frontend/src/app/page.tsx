"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { PushNotificationButton } from "@/components/push-notification-button";

// Pick the named export
const Engagespot = dynamic(
  async () => {
    const mod = await import("@engagespot/react-component");
    return mod.Engagespot; // <-- pick named export
  },
  { ssr: false }
);

export default function Home() {
  const [isSupported, setIsSupported] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      setIsSupported(true);
      checkSubscriptionStatus();
    }
  }, []);

  const checkSubscriptionStatus = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      setIsSubscribed(!!subscription);
    } catch (error) {
      console.error("Error checking subscription:", error);
    }
  };

  return (
    <div>
      <h1>Push Notifications</h1>
      <p>Test Engagespot web push notifications on iOS and Android</p>
      {isSupported ? (
        <div>
          <p>Status: {isSubscribed ? "Subscribed" : "Not subscribed"}</p>
          <PushNotificationButton />
        </div>
      ) : (
        <p>Push notifications are not supported in this browser</p>
      )}

      <Engagespot
        apiKey={process.env.NEXT_PUBLIC_ENGAGESPOT_API_KEY!}
        userId="user123"
        dataRegion="us"
      />
    </div>
  );
}

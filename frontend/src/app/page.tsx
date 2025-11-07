"use client";

import { useEffect, useState } from "react";
import { PushNotificationButton } from "@/components/push-notification-button";
import { Engagespot } from "@engagespot/react-component";



export default function Home() {
  const [isSupported, setIsSupported] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    // Check if the browser supports service workers and push notifications
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
          {/* <PushNotificationButton onSubscriptionChange={checkSubscriptionStatus} /> */}
          <PushNotificationButton />
        </div>
      ) : (
        <p>Push notifications are not supported in this browser</p>
      )}
      <Engagespot
        apiKey={process.env.NEXT_PUBLIC_ENGAGESPOT_API_KEY!}
        userId="user123"
        dataRegion="us" //eu or us
        // userToken="Required if secure auth is enabled on your Engagespot app"
      />
      ;
    </div>
  );
}

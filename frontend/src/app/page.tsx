"use client";

import useFcmToken from "@/hooks/useFcmToken";
import { useState } from "react";

export default function Home() {
  const [targetToken, setTargetToken] = useState("");
  const { token, notificationPermissionStatus } = useFcmToken();

  const handleTestNotification = async () => {
    if (targetToken) {
      const response = await fetch("/send-notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: targetToken,
          title: "Test Notification",
          message: "This is a test notification",
          link: "/contact",
        }),
      });

      const data = await response.json();
      console.log(data);
    }
  };

  return (
    <main className="p-10">
      <h1 className="text-4xl mb-4 font-bold">Firebase Cloud Messaging Demo</h1>
      my Token : <br />
      <pre>
        {token && typeof token !== "string"
          ? JSON.stringify(token, null, 2)
          : token}
      </pre>{" "}
      <br />
      {notificationPermissionStatus === "granted" ? (
        <p>Permission to receive notifications has been granted.</p>
      ) : notificationPermissionStatus !== null ? (
        <p>
          You have not granted permission to receive notifications. Please
          enable notifications in your browser settings.
        </p>
      ) : null}
      <input
        value={targetToken}
        onChange={(e) => setTargetToken(e.target.value)}
      />
      <br />
      <br />
      <button
        disabled={!token}
        className="mt-5"
        onClick={handleTestNotification}
      >
        Send Test Notification
      </button>
    </main>
  );
}

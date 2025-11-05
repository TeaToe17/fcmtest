"use client";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [message, setMessage] = useState("");

  // register the service worker on mount
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").then(() => {
        console.log("✅ Service Worker registered");
      });
    }
  }, []);

  const handleNotification = async () => {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      alert("Notification permission denied!");
      return;
    }

    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        title: "🎉 Subscription Successful!",
        body: "You’re now subscribed to our updates.",
      });
    } else {
      console.warn("No service worker controller found");
    }
  };

  const handleSubscribe = async () => {
    const res = await fetch("/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "test@example.com" }),
    });

    const data = await res.json();
    setMessage(data.message || "Done!");
    handleNotification();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <button
        onClick={handleSubscribe}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Subscribe Test
      </button>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}

"use client";
import { useState } from "react";

export default function HomePage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNotification = async () => {
    // Request permission for notifications
    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      alert("Notification permission denied!");
      return;
    }

    // Show a test notification
    new Notification("🎉 Subscription Successful!", {
      body: "You’re now subscribed to our updates.",
      icon: "/icon.png", // optional: add any image in /public folder
    });
  };

  const handleSubscribe = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "test@example.com" }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
        handleNotification(); // trigger local notification
      } else {
        setMessage(data.error);
      }
    } catch (err) {
      setMessage("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <button
        onClick={handleSubscribe}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Subscribing..." : "Subscribe Test"}
      </button>

      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}

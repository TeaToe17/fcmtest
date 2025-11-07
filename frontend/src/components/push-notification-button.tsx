"use client"

import { useState } from "react"

export function PushNotificationButton() {
  const [userId, setUserId] = useState("")
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async () => {
    if (!userId.trim()) {
      setMessage("Enter a user ID first")
      return
    }

    setLoading(true)
    setMessage(null)

    try {
      const permission = await Notification.requestPermission()
      if (permission !== "granted") {
        setMessage("Notification permission denied")
        setLoading(false)
        return
      }

      localStorage.setItem("engagespot_userId", userId)
      setMessage("Subscribed! You can now receive notifications.")
    } catch (error) {
      console.error("Subscribe error:", error)
      setMessage("Subscribe failed")
    } finally {
      setLoading(false)
    }
  }

  const handleSendTest = async () => {
    setLoading(true)
    setMessage(null)

    try {
      const storedUserId = localStorage.getItem("engagespot_userId")
      if (!storedUserId) {
        setMessage("Please subscribe first")
        setLoading(false)
        return
      }

      const response = await fetch("/api/send-notification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: storedUserId }),
      })

      const data = await response.json()
      setMessage(response.ok ? "Notification sent!" : `Error: ${data.error}`)
    } catch (error) {
      console.error("Send error:", error)
      setMessage("Send failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Enter user ID (email or UUID)"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        disabled={loading}
      />
      <button onClick={handleSubscribe} disabled={loading}>
        Subscribe
      </button>
      <button onClick={handleSendTest} disabled={loading}>
        Send Test
      </button>
      {message && <p>{message}</p>}
    </div>
  )
}

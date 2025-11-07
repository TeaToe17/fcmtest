// Service Worker for handling push notifications

importScripts("https://cdn.engagespot.co/serviceWorkerv2.js")

self.addEventListener("install", (event) => {
  console.log("[ServiceWorker] Installing...")
  self.skipWaiting()
})

self.addEventListener("activate", (event) => {
  console.log("[ServiceWorker] Activating...")
  event.waitUntil(clients.claim())
})

self.addEventListener("push", (event) => {
  console.log("[ServiceWorker] Push notification received:", event)

  let title = "Notification"
  let options = {
    body: "You have a new notification",
    icon: "/icon.svg",
    badge: "/icon.svg",
  }

  if (event.data) {
    try {
      const data = event.data.json()
      title = data.title || title
      options = {
        ...options,
        body: data.message || data.body || options.body,
      }
    } catch (e) {
      options.body = event.data.text()
    }
  }

  event.waitUntil(self.registration.showNotification(title, options))
})

self.addEventListener("notificationclick", (event) => {
  console.log("[ServiceWorker] Notification clicked:", event)
  event.notification.close()

  event.waitUntil(
    clients.matchAll({ type: "window" }).then((clientList) => {
      // Focus existing window if available
      for (const client of clientList) {
        if (client.url === "/" && "focus" in client) {
          return client.focus()
        }
      }
      // Otherwise open new window
      if (clients.openWindow) {
        return clients.openWindow("/")
      }
    }),
  )
})

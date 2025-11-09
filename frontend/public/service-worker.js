// Service Worker for handling push notifications on PWA
self.addEventListener("install", (event) => {
  console.log("[SW] Installing service worker...")
  self.skipWaiting()
})

self.addEventListener("activate", (event) => {
  console.log("[SW] Activating service worker...")
  event.waitUntil(clients.claim())
})

self.addEventListener("push", (event) => {
  console.log("[SW] Push event received:", event)

  let data = {
    title: "Notification",
    body: "You have a new message",
    icon: "/icon-light-32x32.png",
  }

  if (event.data) {
    try {
      data = event.data.json()
    } catch (e) {
      data.body = event.data.text()
    }
  }

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon || "/icon-light-32x32.png",
      badge: "/icon-light-32x32.png",
      tag: "notification",
      requireInteraction: false,
    }),
  )
})

self.addEventListener("notificationclick", (event) => {
  console.log("[SW] Notification clicked:", event)
  event.notification.close()
  event.waitUntil(
    clients.matchAll({ type: "window" }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === "/" && "focus" in client) {
          return client.focus()
        }
      }
      if (clients.openWindow) {
        return clients.openWindow("/")
      }
    }),
  )
})

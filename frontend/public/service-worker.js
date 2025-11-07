importScripts('https://cdn.engagespot.co/serviceWorkerv2.js');

self.addEventListener('notificationclick', function(event) {
  // Custom behavior: e.g. open URL
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data?.url || '/')
  );
});
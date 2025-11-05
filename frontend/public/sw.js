self.addEventListener('push', event => {
  let data = { title: 'Notification', body: 'Default body' };
  try {
    data = event.data.json();
  } catch (e) { /* non-json payload */ }
  const title = data.title || 'Title';
  const opts = {
    body: data.body,
    icon: '/icons/icon-192.png',
    badge: '/icons/badge-72.png',
    data: data.url || '/'
  };
  event.waitUntil(self.registration.showNotification(title, opts));
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data || '/'));
});

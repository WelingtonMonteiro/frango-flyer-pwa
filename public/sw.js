
// Service Worker básico para PWA offline
self.addEventListener('install', event => {
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  self.clients.claim();
});
self.addEventListener('fetch', () => {}); // Placeholder para custom fetch logic

var CACHE="gold-cafe-v1";
var FILES=["./","index.html","manifest.json","icon-192.png","icon-512.png"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(FILES)}).then(function(){return self.skipWaiting()}))});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(n){return n!==CACHE}).map(function(n){return caches.delete(n)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){
 if(e.request.method!=="GET"||new URL(e.request.url).origin!==location.origin)return;
 e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(function(hit){
  var net=fetch(e.request).then(function(r){if(r&&r.ok){var c=r.clone();caches.open(CACHE).then(function(x){x.put(e.request,c)})}return r}).catch(function(){return hit});
  return hit||net;
 }));
});

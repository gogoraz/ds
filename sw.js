'use strict';
const CACHE='hellbound-ashen-gate-v8.0.0-review2',MEDIA='hellbound-media-v8.0.0-review2',MEDIA_LIMIT=25*1024*1024,MEDIA_MAX_FILES=80;
const SHELL=['./','./index.html','./manifest.webmanifest','./icon.svg','./assets/terrain.webp','./assets/heroes.webp','./assets/monsters.webp','./assets/props.webp','./assets/fonts/ui.woff2','./assets/fonts/heading.woff2'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)));self.skipWaiting();});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>(key.startsWith('hellbound-ashen-gate-')||key.startsWith('hellbound-media-'))&&key!==CACHE&&key!==MEDIA).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));});
async function trimMedia(cache){const keys=await cache.keys();let bytes=0;const entries=[];for(const key of keys){const response=await cache.match(key);const size=response?(await response.clone().blob()).size:0;bytes+=size;entries.push({key,size});}while(entries.length&&(bytes>MEDIA_LIMIT||entries.length>MEDIA_MAX_FILES)){const old=entries.shift();bytes-=old.size;await cache.delete(old.key);}}
let mediaWrites=Promise.resolve();
async function mediaResponse(req){const cache=await caches.open(MEDIA),stored=await cache.match(req);if(stored)return stored;try{const response=await fetch(req);if(response.ok){mediaWrites=mediaWrites.catch(()=>{}).then(async()=>{await cache.put(req,response.clone());await trimMedia(cache);});await mediaWrites;}return response;}catch(_){return new Response('',{status:504,statusText:'Offline artwork unavailable'});}}
self.addEventListener('fetch',event=>{const req=event.request,url=new URL(req.url);if(req.method!=='GET'||url.origin!==self.location.origin)return;
 if(req.mode==='navigate'){event.respondWith(fetch(req).then(response=>{if(response.ok){const copy=response.clone();event.waitUntil(caches.open(CACHE).then(cache=>cache.put('./index.html',copy)));}return response;}).catch(()=>caches.match('./index.html')));return;}
 if(url.pathname.includes('/assets/art/')){event.respondWith(mediaResponse(req));return;}
 event.respondWith(caches.match(req).then(cached=>cached||fetch(req)));
});

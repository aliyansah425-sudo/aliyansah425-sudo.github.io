const V='nu-smart-v13',SHELL=['./','./index.html','./manifest.json','./logo.png','./icons/icon-192.png','./icons/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(SHELL.map(u=>fetch(new Request(u,{cache:'reload'})).then(r=>r.ok&&c.put(u,r))))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
const nf=(r)=>fetch(r,{cache:'no-cache'}).then(x=>{if(x.ok)caches.open(V).then(c=>c.put(r,x.clone()));return x}).catch(()=>caches.match(r));
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET')return;
 const u=new URL(e.request.url);
 if(u.origin===location.origin){ // halaman & data: jaringan dulu, cadangan cache saat offline
  if(e.request.mode==='navigate'||/\.(html|json)$|\/$/.test(u.pathname))e.respondWith(nf(e.request));
  else e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(x=>{if(x.ok)caches.open(V).then(c=>c.put(e.request,x.clone()));return x})));
 }else if(/equran\.id|blogspot|googleusercontent/.test(u.host)){
  e.respondWith(fetch(e.request).then(x=>{if(x.ok)caches.open(V).then(c=>c.put(e.request,x.clone()));return x}).catch(()=>caches.match(e.request)));
 }
});

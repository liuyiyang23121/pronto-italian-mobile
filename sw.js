/* 离线缓存：首次打开时下载全部页面、脚本与听力音频；之后优先读缓存，断网可用。 */
const VERSION='sync-layout-20261105';
const CACHE='pronto-mobile-'+VERSION;
const ASSETS=["app.js", "curriculum.js", "index.html", "learning-core.js", "lessons.js", "listening-data.js", "listening.js", "manifest.webmanifest", "mnemonics.js", "progress-store.js", "pwa.js", "roots.js", "seed-progress.js", "styles.css", "vocabulary.js", "audio/ferragni.m4a", "audio/joanna.m4a", "audio/martina.m4a", "audio/trentino.m4a", "audio/yukari.m4a", "icons/apple-touch-icon.png", "icons/icon-192.png", "icons/icon-512.png"];
self.addEventListener('install',e=>{e.waitUntil((async()=>{const c=await caches.open(CACHE);await c.addAll(ASSETS.map(u=>new Request(u,{cache:'reload'})));await self.skipWaiting()})())});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{for(const k of await caches.keys())if(k.startsWith('pronto-mobile-')&&k!==CACHE)await caches.delete(k);await self.clients.claim();broadcast()})())});
async function broadcast(target){const c=await caches.open(CACHE),n=(await c.keys()).length,msg={type:'cached',count:n,total:ASSETS.length,version:VERSION};if(target)target.postMessage(msg);else for(const cl of await self.clients.matchAll())cl.postMessage(msg)}
self.addEventListener('message',e=>{if(e.data?.type==='status')broadcast(e.source)});
async function rangeResponse(request,response){
  const header=request.headers.get('range'),m=/^bytes=(\d*)-(\d*)$/.exec(header||'');
  const buf=await response.arrayBuffer(),size=buf.byteLength;
  if(!m)return new Response(buf,{status:200,headers:{'Content-Type':'audio/mp4','Content-Length':String(size),'Accept-Ranges':'bytes'}});
  let start=m[1]?Number(m[1]):Math.max(0,size-Number(m[2])),end=m[1]&&m[2]?Math.min(Number(m[2]),size-1):size-1;
  if(start>=size||start>end)return new Response(null,{status:416,headers:{'Content-Range':'bytes */'+size}});
  return new Response(buf.slice(start,end+1),{status:206,statusText:'Partial Content',headers:{'Content-Type':'audio/mp4','Content-Range':`bytes ${start}-${end}/${size}`,'Content-Length':String(end-start+1),'Accept-Ranges':'bytes'}});
}
self.addEventListener('fetch',e=>{
  const req=e.request;if(req.method!=='GET')return;
  const url=new URL(req.url);if(url.origin!==location.origin)return;
  e.respondWith((async()=>{
    const c=await caches.open(CACHE);
    if(req.mode==='navigate'){const hit=await c.match('index.html');if(hit)return hit;try{return await fetch(req)}catch{return Response.error()}}
    const hit=await c.match(req,{ignoreSearch:true,ignoreVary:true});
    if(hit){if(url.pathname.includes('/audio/'))return rangeResponse(req,hit);return hit}
    try{return await fetch(req)}catch{return Response.error()}
  })());
});

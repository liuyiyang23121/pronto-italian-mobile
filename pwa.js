/* 注册离线缓存（Service Worker），并显示离线可用状态。 */
(()=>{
  const el=document.getElementById('offline-status');
  const show=t=>{if(el)el.textContent='离线缓存：'+t};
  if(!('serviceWorker'in navigator)||location.protocol==='file:'){show('此浏览器不支持离线缓存');return}
  navigator.serviceWorker.addEventListener('message',e=>{if(e.data?.type==='cached')show('✓ 已全部下载（'+e.data.count+' 个文件），断网也能用')});
  navigator.serviceWorker.register('sw.js').then(reg=>{
    const check=()=>navigator.serviceWorker.controller?.postMessage({type:'status'});
    if(navigator.serviceWorker.controller)check();else{show('正在下载课程与音频…');navigator.serviceWorker.addEventListener('controllerchange',check)}
    reg.addEventListener('updatefound',()=>{const w=reg.installing;w?.addEventListener('statechange',()=>{if(w.state==='activated')check()})});
  }).catch(()=>show('注册失败，请联网后刷新一次'));
})();

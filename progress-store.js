/* 手机离线版：进度只保存在本设备（localStorage + IndexedDB 双份），不需要任何服务器。
   首次打开且本机没有任何进度时，导入 PRONTO_SEED（来自 Mac 的进度），之后永不覆盖。 */
const ProgressStore=(()=>{
  const KEY='pronto-mobile-progress-v1',DBNAME='pronto-mobile-v1';
  let state=Learning.empty(),db=null,listener=()=>{},started=false,lastSaved=0,seedId=null,eventCount=0;
  let status={kind:'loading',label:'正在读取本机进度…'};
  const uuid=()=>globalThis.crypto?.randomUUID?.()||('event-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2));
  function announce(remote=false){listener({state,status,remote,ready:started})}
  function req(mode,store,action){return new Promise((resolve,reject)=>{if(!db)return resolve(null);try{const tx=db.transaction(store,mode),r=action(tx.objectStore(store));let out;r.onsuccess=()=>{out=r.result};tx.oncomplete=()=>resolve(out);tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error)}catch(e){reject(e)}})}
  async function openIDB(){try{db=await new Promise((resolve,reject)=>{const r=indexedDB.open(DBNAME,1);r.onupgradeneeded=()=>{r.result.createObjectStore('meta');r.result.createObjectStore('events',{keyPath:'id'})};r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)})}catch{db=null}}
  function readLocal(){try{return JSON.parse(localStorage.getItem(KEY)||'null')}catch{return null}}
  function record(){return{version:1,app:'pronto-mobile',seedId,state,eventCount,savedAt:Date.now()}}
  function save(){
    const r=record();let ok=false;
    try{localStorage.setItem(KEY,JSON.stringify(r));ok=true}catch{}
    req('readwrite','meta',s=>s.put(r,'progress')).then(()=>{},()=>{});
    lastSaved=r.savedAt;
    status=ok||db?{kind:'saved',label:'已自动保存在这台设备（离线可用）',at:lastSaved,pending:0}:{kind:'offline',label:'浏览器禁止保存：请关闭“无痕浏览”后再使用',pending:0};
  }
  function commit(type,payload){
    const event={id:uuid(),type,payload,createdAt:Date.now()};
    Learning.apply(state,event);eventCount++;save();
    req('readwrite','events',s=>s.put(event)).then(()=>{},()=>{});
    announce();return state;
  }
  async function sync(){save();announce()}
  async function start(callback){
    listener=callback;await openIDB();
    const a=readLocal(),b=await req('readonly','meta',s=>s.get('progress')).catch(()=>null);
    const found=[a,b].filter(r=>r&&r.app==='pronto-mobile'&&r.state?.version===3).sort((x,y)=>(y.savedAt||0)-(x.savedAt||0))[0];
    if(found){state=found.state;seedId=found.seedId||null;eventCount=Number(found.eventCount)||0}
    else if(typeof PRONTO_SEED!=='undefined'&&PRONTO_SEED?.state?.version===3){state=Learning.clone(PRONTO_SEED.state);seedId=PRONTO_SEED.id;eventCount=0}
    else state=Learning.empty();
    save();started=true;announce();
    try{navigator.storage?.persist?.()}catch{}
    setInterval(()=>{if(!document.hidden)announce()},30000);
    document.addEventListener('visibilitychange',()=>{if(!document.hidden)announce();else save()});
    window.addEventListener('pagehide',save);
    // 同一设备开了两个标签页时，跟随最新保存的进度。
    window.addEventListener('storage',e=>{if(e.key!==KEY||!e.newValue)return;try{const r=JSON.parse(e.newValue);if(r?.state?.version===3&&(r.savedAt||0)>lastSaved){state=r.state;eventCount=r.eventCount||0;lastSaved=r.savedAt;announce(true)}}catch{}});
    return state;
  }
  function importProgress(data){const normalized=Learning.normalizeImport(data);commit('import',{snapshot:normalized.state});return normalized.summary}
  function exportProgress(){return{format:'pronto-learning-backup',version:3,exportedAt:new Date().toISOString(),source:'pronto-mobile',snapshot:Learning.clone(state)}}
  return{start,commit,sync,importProgress,exportProgress,get state(){return state},get status(){return status},get online(){return true},get pending(){return 0},get seedId(){return seedId}};
})();

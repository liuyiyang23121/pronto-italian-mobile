/* 复习规则与迁移集中在纯函数中，网页和回归测试使用同一份逻辑。 */
const Learning = (()=>{
  const zone='Europe/Rome',index=new Map(VOCAB.map(w=>[w.id,w]));
  const key=s=>String(s).toLocaleLowerCase('it').normalize('NFC').replace(/[’‘]/g,"'").trim();
  const day=(time=Date.now())=>new Intl.DateTimeFormat('sv-SE',{timeZone:zone,year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(time));
  function addDays(value,n){const [y,m,d]=value.split('-').map(Number);return new Date(Date.UTC(y,m-1,d+n)).toISOString().slice(0,10)}
  const listeningDefaults=()=>({track:'joanna',speed:1,showItalian:true,showChinese:false,follow:true,loop:false,positions:{}});
  function updateListening(current,p,now){
    const out={...listeningDefaults(),...current,positions:{...(current?.positions||{})}},ids=['joanna','yukari','trentino','ferragni','martina'];
    if(ids.includes(p.track))out.track=p.track;
    if([.7,.8,1,1.2,1.5].includes(Number(p.speed)))out.speed=Number(p.speed);
    for(const name of ['showItalian','showChinese','follow','loop'])if(typeof p[name]==='boolean')out[name]=p[name];
    const position=p.position;
    if(position&&ids.includes(position.track)&&Number.isFinite(Number(position.time))&&Number(position.time)>=0)out.positions[position.track]={time:Math.min(3600,Number(position.time)),completed:!!position.completed,updatedAt:now};
    return out;
  }
  // 评分含义（手机版 2026-11-05 起）：0 不熟=待巩固隔 10 词再认；1 认识=3 天后；2 熟悉=明天；3 很熟=第 7 天。
  const PASS_DAYS=[null,3,1,7];
  const isPending=level=>level<1;
  const empty=()=>({version:3,unit:1,autoSpeak:true,ratings:{},decks:{},quiz:{},drills:{},listening:listeningDefaults(),attempts:0,updatedAt:0});
  const pool=scope=>scope==='review'?VOCAB:VOCAB.filter(w=>w.units.includes(Number(scope.split(':')[1])));
  const due=(state,today=day())=>VOCAB.filter(w=>{const r=state.ratings[w.id];return r&&(r.pending||(r.dueDay&&r.dueDay<=today))});
  const ready=(r,today)=>!r||r.pending||(r.dueDay&&r.dueDay<=today);
  function makeDeck(state,scope,today,force=false){return{day:today,force,items:pool(scope).filter(w=>force||(scope==='review'?!!state.ratings[w.id]&&ready(state.ratings[w.id],today):ready(state.ratings[w.id],today))).map(w=>w.id),attempts:0,passed:[]}}
  function ensureDeck(state,scope,today=day()){
    let deck=state.decks[scope];
    if(!deck||deck.day!==today)state.decks[scope]=deck=makeDeck(state,scope,today);
    // 到期/待巩固词可能来自其他单元，动态加入，不限于创建本轮时的快照。
    if(scope==='review')due(state,today).forEach(w=>{if(!deck.items.includes(w.id))deck.items.push(w.id)});
    return deck;
  }
  function current(state,scope,today=day()){
    const deck=ensureDeck(state,scope,today);if(!deck.items.length)return null;
    const retry=deck.items.filter(id=>state.ratings[id]?.pending&&(state.ratings[id].retryAfter??0)<=state.attempts).sort((a,b)=>state.ratings[a].retryAfter-state.ratings[b].retryAfter)[0];
    const eligible=retry??deck.items.find(id=>!state.ratings[id]?.pending);
    // 没有其他词可出了，立即回到最早待巩固词，不用空等 10 张。
    return index.get(eligible??deck.items.reduce((a,b)=>(state.ratings[a]?.retryAfter??0)<=(state.ratings[b]?.retryAfter??0)?a:b));
  }
  function normalizeImport(input,now=Date.now()){
    let data=input?.snapshot??input?.state??input;
    if(!data||typeof data!=='object'||!data.ratings)throw Error('文件中没有可识别的学习进度。');
    const out=empty(),summary={words:0,passed:0,pending:0,answers:0,listening:0,unmatched:0};
    if(UNITS.some(u=>u.id===Number(data.unit)))out.unit=Number(data.unit);
    out.autoSpeak=data.autoSpeak!==false;out.attempts=Math.max(0,Number(data.attempts)||0);
    const aliases={hotto:'rotto',esercito:'estero'};
    Object.entries(data.ratings).forEach(([raw,value])=>{
      let id=/^\d+$/.test(raw)?key(LEGACY_WORD_IDS[Number(raw)]??''):key(raw);id=aliases[id]??id;
      const level=Number(value?.level);
      if(!index.has(id)||!Number.isInteger(level)||level<0||level>3){summary.unmatched++;return}
      // 旧版备份自带 pending 标记时保留原状态，不按新含义重新解释旧等级。
      const pending=data.version===3&&typeof value.pending==='boolean'?value.pending:isPending(level);
      const oldDelays=[600000,86400000,3*86400000,7*86400000];
      const inferred=Number(value.lastReviewedAt)||(Number(value.nextReview)?Number(value.nextReview)-oldDelays[level]:now);
      const reviewed=Number.isFinite(inferred)&&inferred>0?inferred:now;
      const validDay=s=>typeof s==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(s);
      const dueDay=pending?day(now):(data.version===3&&validDay(value.dueDay)?value.dueDay:addDays(day(reviewed),PASS_DAYS[level]||1));
      out.ratings[id]={level,pending,dueDay,lastReviewedAt:reviewed,passDay:pending?null:(value.passDay||day(reviewed)),reviews:Math.max(1,Number(value.reviews)||1),retryAfter:data.version===3&&pending?Math.max(out.attempts,Number(value.retryAfter)||0):out.attempts};
      summary.words++;pending?summary.pending++:summary.passed++;
    });
    LESSONS.forEach(l=>{const a=data.quiz?.[l.id];if(a&&typeof a==='object')l.questions.forEach((q,i)=>{const v=Number(a[i]);if(a[i]!==undefined&&Number.isInteger(v)&&v>=0&&v<q.options.length){out.quiz[l.id]??={};out.quiz[l.id][i]=v;summary.answers++}})});
    UNITS.forEach(u=>{const ids=data.drills?.[u.id];if(Array.isArray(ids))out.drills[u.id]=[...new Set(ids.map(key).filter(id=>index.get(id)?.units.includes(u.id)))]});
    if(data.version===3&&data.decks)Object.entries(data.decks).forEach(([scope,d])=>{
      if(scope!=='review'&&!/^unit:(?:[1-9]|1[0-7])$/.test(scope))return;
      if(!Array.isArray(d.items)||typeof d.day!=='string')return;
      const allowed=new Set(pool(scope).map(w=>w.id));out.decks[scope]={day:d.day,force:!!d.force,items:[...new Set(d.items.map(key).filter(id=>allowed.has(id)))],attempts:Number(d.attempts)||0,passed:Array.isArray(d.passed)?d.passed.filter(id=>allowed.has(id)):[]};
    });
    if(data.listening){out.listening=updateListening(out.listening,data.listening,now);Object.entries(data.listening.positions||{}).forEach(([track,pos])=>{out.listening=updateListening(out.listening,{position:{track,...pos}},now)});summary.listening=Object.values(out.listening.positions).filter(p=>p.time>0||p.completed).length}
    if(!summary.words&&!summary.answers&&!summary.listening&&!Object.values(out.drills).some(a=>a.length))throw Error('这份备份含 0 条熟悉度、0 条答题记录，也没有听力记录。没有覆盖你现有的进度。');
    out.updatedAt=Number(data.updatedAt)||now;return{state:out,summary};
  }
  function apply(state,event){
    const p=event.payload||{},now=Number(event.createdAt)||Date.now(),today=day(now);
    switch(event.type){
      case'import':{const imported=normalizeImport(p,now);Object.keys(state).forEach(k=>delete state[k]);Object.assign(state,imported.state);break}
      case'reset':Object.keys(state).forEach(k=>delete state[k]);Object.assign(state,empty());break;
      case'choose-unit':if(UNITS.some(u=>u.id===Number(p.unit)))state.unit=Number(p.unit);break;
      case'preference':state.autoSpeak=p.autoSpeak!==false;break;
      case'listening':state.listening=updateListening(state.listening,p,now);break;
      case'session-start':if(p.scope==='review'||/^unit:(?:[1-9]|1[0-7])$/.test(p.scope))state.decks[p.scope]=makeDeck(state,p.scope,today,!!p.force);break;
      case'rate':{
        const id=key(p.id),level=Number(p.level);if(!index.has(id)||!Number.isInteger(level)||level<0||level>3)break;
        const scope=p.scope==='review'?'review':'unit:'+Number(p.unit||state.unit),deck=ensureDeck(state,scope,today),old=state.ratings[id];
        state.attempts++;deck.attempts++;
        const pending=isPending(level);
        state.ratings[id]={level,pending,dueDay:pending?today:addDays(today,PASS_DAYS[level]),lastReviewedAt:now,passDay:pending?null:today,reviews:(old?.reviews||0)+1,retryAfter:pending?state.attempts+10:0};
        deck.items=deck.items.filter(x=>x!==id);
        if(pending)deck.items.push(id);else Object.entries(state.decks).forEach(([key,d])=>{d.items=d.items.filter(x=>x!==id);if(pool(key).some(w=>w.id===id)&&!d.passed.includes(id))d.passed.push(id)});
        break;
      }
      case'quiz-answer':{const l=LESSONS.find(l=>l.id===Number(p.lesson)),i=Number(p.question),v=Number(p.answer);if(l&&l.questions[i]&&Number.isInteger(v)&&v>=0&&v<l.questions[i].options.length){state.quiz[l.id]??={};state.quiz[l.id][i]=v}break}
      case'quiz-reset':delete state.quiz[Number(p.lesson)];break;
      case'drill-correct':if(index.get(p.id)?.units.includes(Number(p.unit))){state.drills[p.unit]??=[];if(!state.drills[p.unit].includes(p.id))state.drills[p.unit].push(p.id)}break;
    }
    state.updatedAt=now;return state;
  }
  const clone=s=>JSON.parse(JSON.stringify(s));
  function reduce(events,base=empty()){return events.reduce((s,e)=>apply(s,e),clone(base))}
  return{PASS_DAYS,isPending,zone,day,addDays,empty,pool,due,current,ensureDeck,makeDeck,normalizeImport,apply,reduce,clone};
})();

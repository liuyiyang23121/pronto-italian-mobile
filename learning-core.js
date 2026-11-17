/* 复习规则与迁移集中在纯函数中，网页和回归测试使用同一份逻辑。 */
const Learning = (()=>{
  const zone='Europe/Rome',index=new Map(VOCAB.map(w=>[w.id,w]));
  const key=s=>String(s).toLocaleLowerCase('it').normalize('NFC').replace(/[’‘]/g,"'").trim();
  // 学习日从意大利时间凌晨 5:00 开始：00:00–04:59 仍算前一天（凌晨 1 点复习计入前一天）。
  const DAY_START_HOUR=5,dayFmt=new Intl.DateTimeFormat('en-GB',{timeZone:zone,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',hourCycle:'h23'});
  function addDays(value,n){const [y,m,d]=value.split('-').map(Number);return new Date(Date.UTC(y,m-1,d+n)).toISOString().slice(0,10)}
  function day(time=Date.now()){
    const parts=Object.fromEntries(dayFmt.formatToParts(new Date(Number(time))).map(p=>[p.type,p.value]));
    const date=parts.year+'-'+parts.month+'-'+parts.day;
    return Number(parts.hour)%24<DAY_START_HOUR?addDays(date,-1):date;
  }
  // 确定性洗牌：同一天、同一范围、同一轮得到相同顺序（刷新页面不变），换一天或重开一轮就重新打乱。
  function seedOf(text){let h=2166136261;for(const c of String(text)){h^=c.codePointAt(0);h=Math.imul(h,16777619)}return h>>>0}
  function shuffle(list,seed){
    const out=[...list];let a=seedOf(seed)||1;
    const rand=()=>{a=(a+0x6D2B79F5)|0;let t=Math.imul(a^(a>>>15),1|a);t=(t+Math.imul(t^(t>>>7),61|t))^t;return((t^(t>>>14))>>>0)/4294967296};
    for(let i=out.length-1;i>0;i--){const j=Math.floor(rand()*(i+1));[out[i],out[j]]=[out[j],out[i]]}
    return out;
  }
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
  const empty=()=>({version:3,unit:1,autoSpeak:true,ratings:{},decks:{},quiz:{},drills:{},listening:listeningDefaults(),reading:{},attempts:0,updatedAt:0});
  const pool=scope=>scope==='review'?VOCAB:VOCAB.filter(w=>w.units.includes(Number(scope.split(':')[1])));
  const due=(state,today=day())=>VOCAB.filter(w=>{const r=state.ratings[w.id];return r&&(r.pending||(r.dueDay&&r.dueDay<=today))});
  const ready=(r,today)=>!r||r.pending||(r.dueDay&&r.dueDay<=today);
  function makeDeck(state,scope,today,force=false){
    const ids=pool(scope).filter(w=>force||(scope==='review'?!!state.ratings[w.id]&&ready(state.ratings[w.id],today):ready(state.ratings[w.id],today))).map(w=>w.id);
    // 每次建新一轮都打乱顺序，并把打乱后的顺序存进 deck，刷新页面不会再变。
    return{day:today,force,items:shuffle(ids,scope+'|'+today+'|'+(force?'force:':'')+(Number(state.attempts)||0)),attempts:0,passed:[],shuffled:true};
  }
  function ensureDeck(state,scope,today=day()){
    let deck=state.decks[scope];
    if(!deck||deck.day!==today)state.decks[scope]=deck=makeDeck(state,scope,today);
    // 旧版保存的本轮（按词库顺序）只打乱一次剩余词；passed 等记录保持不变。
    if(!deck.shuffled){deck.items=shuffle(deck.items,scope+'|'+deck.day+'|legacy');deck.shuffled=true}
    // 到期/待巩固词可能来自其他单元，动态加入，不限于创建本轮时的快照；新加入的词也随机插入。
    if(scope==='review'){
      const extra=due(state,today).map(w=>w.id).filter(id=>!deck.items.includes(id));
      shuffle(extra,scope+'|'+today+'|extra|'+deck.items.length).forEach((id,i)=>{const at=Math.floor((seedOf(id+'|'+today+'|'+i)/4294967296)*(deck.items.length+1));deck.items.splice(at,0,id)});
    }
    return deck;
  }
  function current(state,scope,today=day()){
    const deck=ensureDeck(state,scope,today);if(!deck.items.length)return null;
    const retry=deck.items.filter(id=>state.ratings[id]?.pending&&(state.ratings[id].retryAfter??0)<=state.attempts).sort((a,b)=>state.ratings[a].retryAfter-state.ratings[b].retryAfter)[0];
    const eligible=retry??deck.items.find(id=>!state.ratings[id]?.pending);
    // 没有其他词可出了，立即回到最早待巩固词，不用空等 10 张。
    return index.get(eligible??deck.items.reduce((a,b)=>(state.ratings[a]?.retryAfter??0)<=(state.ratings[b]?.retryAfter??0)?a:b));
  }
  // 阅读记录（新字段）：{ textId: {read:bool, readAt:number, quiz:{qIndex:answer}} }。旧备份没有该字段时默认为 {}。
  const textId=id=>typeof id==='string'&&/^[a-z0-9-]{1,40}$/.test(id);
  function normalizeReading(input){
    const out={};if(!input||typeof input!=='object'||Array.isArray(input))return out;
    Object.entries(input).forEach(([id,v])=>{
      if(!textId(id)||!v||typeof v!=='object')return;
      const r={read:v.read===true,readAt:Number(v.readAt)||0,quiz:{}};
      if(v.quiz&&typeof v.quiz==='object')Object.entries(v.quiz).forEach(([i,a])=>{if(/^\d{1,2}$/.test(i)&&Number.isInteger(Number(a))&&Number(a)>=0&&Number(a)<10)r.quiz[i]=Number(a)});
      out[id]=r;
    });
    return out;
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
      const allowed=new Set(pool(scope).map(w=>w.id));out.decks[scope]={day:d.day,force:!!d.force,items:[...new Set(d.items.map(key).filter(id=>allowed.has(id)))],attempts:Number(d.attempts)||0,passed:Array.isArray(d.passed)?d.passed.filter(id=>allowed.has(id)):[],shuffled:d.shuffled===true};
    });
    if(data.listening){out.listening=updateListening(out.listening,data.listening,now);Object.entries(data.listening.positions||{}).forEach(([track,pos])=>{out.listening=updateListening(out.listening,{position:{track,...pos}},now)});summary.listening=Object.values(out.listening.positions).filter(p=>p.time>0||p.completed).length}
    out.reading=normalizeReading(data.reading);summary.reading=Object.keys(out.reading).length;
    if(!summary.words&&!summary.answers&&!summary.listening&&!summary.reading&&!Object.values(out.drills).some(a=>a.length))throw Error('这份备份含 0 条熟悉度、0 条答题记录，也没有听力记录。没有覆盖你现有的进度。');
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
      case'reading':{
        if(!textId(p.text))break;
        state.reading=state.reading&&typeof state.reading==='object'?state.reading:{};
        const r=state.reading[p.text]??={read:false,readAt:0,quiz:{}};r.quiz??={};
        if(typeof p.read==='boolean'){r.read=p.read;r.readAt=p.read?now:0}
        const i=Number(p.question),a=Number(p.answer);
        if(p.question!==undefined&&Number.isInteger(i)&&i>=0&&i<10&&Number.isInteger(a)&&a>=0&&a<10)r.quiz[i]=a;
        if(p.resetQuiz===true)r.quiz={};
        break;
      }
      case'drill-correct':if(index.get(p.id)?.units.includes(Number(p.unit))){state.drills[p.unit]??=[];if(!state.drills[p.unit].includes(p.id))state.drills[p.unit].push(p.id)}break;
    }
    state.updatedAt=now;return state;
  }
  const clone=s=>JSON.parse(JSON.stringify(s));
  function reduce(events,base=empty()){return events.reduce((s,e)=>apply(s,e),clone(base))}
  return{PASS_DAYS,DAY_START_HOUR,isPending,zone,day,shuffle,normalizeReading,addDays,empty,pool,due,current,ensureDeck,makeDeck,normalizeImport,apply,reduce,clone};
})();

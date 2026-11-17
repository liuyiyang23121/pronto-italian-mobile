/* 阅读板块：每单元 3 篇分级短文 + 实用句。点句子显示/隐藏中文，🔊 朗读单句，「整篇朗读」用设备意大利语语音逐句播放（兼作听力）。
   阅读记录写入 state.reading（新字段，旧进度没有时视为 {}），不触碰其他进度字段。 */
const ReadingPractice=(()=>{
  const h=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const get=id=>document.getElementById(id);
  let cb={},tab='texts',showZh=false,current={},revealed=new Set(),submitted=new Set(),token=0,playing=null,rate=.82,lastState=null;
  const unitData=u=>READING.find(r=>r.unit===u)||{unit:u,key:[],texts:[]};
  const rec=(state,id)=>(state.reading||{})[id]||{read:false,quiz:{}};
  function textOf(state){const d=unitData(state.unit);if(!d.texts.some(t=>t.id===current[state.unit]))current[state.unit]=d.texts[0]?.id;return d.texts.find(t=>t.id===current[state.unit])}
  function voice(){const v=window.speechSynthesis.getVoices();return v.find(x=>x.lang.toLowerCase()==='it-it')||v.find(x=>x.lang.toLowerCase().startsWith('it'))}
  function mark(){document.querySelectorAll('#reading [data-rd-line]').forEach(el=>el.classList.toggle('is-speaking',playing&&el.dataset.rdLine===playing.group+':'+playing.index));const b=get('rd-play-all');if(b)b.textContent=playing?.group==='text'?'■ 停止朗读':'▶ 整篇朗读';const k=get('rd-play-key');if(k)k.textContent=playing?.group==='key'?'■ 停止朗读':'▶ 整组朗读'}
  // 被 app.js 的 cancelSpeech 调用：只结束本模块的连读状态，不再反向调用 cancel，避免循环。
  function stop(){token++;playing=null;mark()}
  function playList(group,list,start=0){
    if(!('speechSynthesis'in window)){cb.toast?.('此浏览器不支持朗读，请尝试 Safari 或 Chrome。');return}
    cb.stopOther?.();const my=++token;
    const step=i=>{
      if(my!==token)return;if(i>=list.length){playing=null;mark();return}
      playing={group,index:i};mark();
      const row=document.querySelector('#reading [data-rd-line="'+group+':'+i+'"]');if(row&&get('reading').classList.contains('active-view'))row.scrollIntoView({block:'nearest',behavior:'smooth'});
      const u=new SpeechSynthesisUtterance(list[i]);u.lang='it-IT';u.rate=rate;const v=voice();if(v)u.voice=v;
      u.onend=()=>{if(my===token)setTimeout(()=>step(i+1),350)};
      u.onerror=e=>{if(my!==token)return;if(['canceled','interrupted'].includes(e.error)){playing=null;mark();return}step(i+1)};
      window.speechSynthesis.speak(u);
    };
    step(start);
  }
  // ---- 点词查义 ----
  const norm=x=>String(x).toLocaleLowerCase('it').normalize('NFC').replace(/[’‘]/g,"'");
  const WORD_RE=/[\p{L}\p{M}]+(?:[’'][\p{L}\p{M}]+)*|\d+(?:[.,]\d+)*/gu;
  const toks=x=>[...String(x).matchAll(WORD_RE)].map(m=>norm(m[0]));
  const glossCache=new Map();
  // 把短文自带的「重点词」拆成：单词形 -> 释义；多词搭配单独保存，查词时若整组出现在本句就一并显示。
  function textGlossIndex(t){
    if(!t)return{single:new Map(),phrases:[]};if(glossCache.has(t.id))return glossCache.get(t.id);
    const single=new Map(),phrases=[];
    for(const [w,z] of t.g||[]){
      const inParen=[...w.matchAll(/\(([^)]*)\)/g)].map(m=>m[1]);const main=w.replace(/\([^)]*\)/g,' ');
      const alts=[];
      main.split(/\s+\/\s+/).forEach(a=>{a=a.trim();if(!a)return;
        const m=/^(.*?)([\p{L}]+)\/([\p{L}]{1,2})(\b.*)$/u.exec(a);
        if(m){alts.push(m[1]+m[2]+m[4]);if(m[3].length<=2)alts.push(m[1]+m[2].slice(0,-m[3].length)+m[3]+m[4])}
        else a.split(/\s*\/\s*/).forEach(b=>b&&alts.push(b))});
      inParen.forEach(a=>{if(!/^-/.test(a.trim()))alts.push(a)});
      for(const a of alts){const ws=toks(a);if(!ws.length)continue;
        if(ws.length===1){if(!single.has(ws[0]))single.set(ws[0],{key:w,zh:z})}
        else phrases.push({words:ws,key:w,zh:z})}
    }
    const out={single,phrases};glossCache.set(t.id,out);return out;
  }
  function isName(raw,sentence,offset){
    if(!/^\p{Lu}/u.test(raw)||offset==null)return false;
    const before=sentence.slice(0,offset).replace(/[\s«»"“”'’(]+$/u,'');
    return before.length>0&&!/[.!?:;—–-]$/.test(before);
  }
  // 查词顺序：本文重点词 → 课堂词库（含听力词形映射）→ 阅读查词表；人名地名在句中大写时优先查词表。
  function lookup(raw,sentence='',t=null,offset=null){
    const token=norm(raw),G=typeof READING_GLOSSARY!=='undefined'?READING_GLOSSARY:{};
    const gl=G[token]||null,out={form:raw,token,zh:'',source:'',lemma:'',pos:'',vocab:null,phrases:[]};
    if(gl){out.lemma=gl[1]||'';out.pos=gl[2]||'';out.formZh=gl[0]}
    const ix=textGlossIndex(t),st=toks(sentence);
    for(const p of ix.phrases){if(!p.words.includes(token))continue;for(let i=0;i+p.words.length<=st.length;i++){if(p.words.every((w,j)=>st[i+j]===w)){out.phrases.push(p);break}}}
    const vm=typeof ListeningText!=='undefined'?ListeningText.lookup(raw,sentence):null;
    if(vm)out.vocab=vm.word;
    const nameFirst=gl&&/人名|地名|专有名词/.test(gl[2]||'')&&isName(raw,sentence,offset);
    if(nameFirst){out.zh=gl[0];out.source='查词表';out.vocab=null;return out}
    const C=typeof READING_GLOSSARY_CTX!=='undefined'?READING_GLOSSARY_CTX:[];
    for(const [f,re,zh,lemma,pos] of C){if(f===token&&new RegExp(re,'iu').test(sentence)){out.zh=zh;out.lemma=lemma||out.lemma;out.pos=pos||out.pos;out.source='查词表（按本句语境）';return out}}
    const tg=ix.single.get(token);
    if(tg){out.zh=tg.zh;out.source='本文重点词';out.key=tg.key;return out}
    if(vm){out.zh=vm.word.zh;out.source='词库';if(!out.lemma&&vm.inflected)out.lemma=vm.word.it;return out}
    if(gl){out.zh=gl[0];out.source='查词表';return out}
    if(token.includes("'")){const rest=token.slice(token.lastIndexOf("'")+1);if(rest&&rest!==token){const r=lookup(rest,sentence,t);if(r.zh){r.form=raw;r.token=token;r.pos=(r.pos?r.pos+' · ':'')+'前接省音 '+token.slice(0,token.lastIndexOf("'")+1);return r}}}
    return out;
  }
  function wordsHtml(it){
    let html='',last=0;
    for(const m of it.matchAll(WORD_RE)){html+=h(it.slice(last,m.index))+'<button type="button" class="rd-w" data-rd-word="'+h(m[0])+'" data-rd-off="'+m.index+'">'+h(m[0])+'</button>';last=m.index+m[0].length}
    return html+h(it.slice(last));
  }
  function dictHtml(r){
    const v=r.vocab,main=r.zh||'暂无释义';
    return'<button type="button" class="rd-dict-close" data-rd-close aria-label="关闭查词">×</button>'+
      '<div class="rd-dict-head"><strong lang="it">'+h(r.form)+'</strong><button type="button" class="audio-button" data-speak="'+h(r.form)+'" aria-label="朗读 '+h(r.form)+'">🔊</button></div>'+
      '<p class="rd-dict-zh">'+h(main)+'</p>'+(r.formZh&&r.formZh!==main&&r.source!=='查词表'?'<p class="rd-dict-form">本句词形：'+h(r.formZh)+'</p>':'')+
      ((r.lemma||r.pos)?'<p class="rd-dict-meta">'+(r.lemma?'原形/构成：<b lang="it">'+h(r.lemma)+'</b>':'')+(r.lemma&&r.pos?' · ':'')+h(r.pos)+'</p>':'')+
      (r.source==='本文重点词'?'<p class="rd-dict-note">📌 本文重点词：<span lang="it">'+h(r.key)+'</span></p>':'')+
      r.phrases.map(p=>'<p class="rd-dict-note">🔗 本句搭配：<span lang="it">'+h(p.key)+'</span> — '+h(p.zh)+'</p>').join('')+
      (v?'<p class="rd-dict-vocab">✓ 词库已收录：<span lang="it">'+h(v.it)+'</span>'+(r.source==='词库'?'':' · '+h(v.zh))+'</p>':'');
  }
  function closeDict(){const d=get('rd-dict');if(d&&!d.hidden){d.hidden=true;get('reading')?.classList.remove('rd-dict-open');document.querySelectorAll('#reading .rd-w.looked-up').forEach(b=>b.classList.remove('looked-up'))}}
  function openDict(btn){
    const line=btn.closest('[data-rd-line]'),[group,idx]=(line?.dataset.rdLine||':').split(':'),s=lastState;
    let sentence='',t=null;
    if(s){const d=unitData(s.unit);if(group==='text'){t=textOf(s);sentence=t?.s[Number(idx)]?.[0]||''}else sentence=d.key[Number(idx)]?.[0]||''}
    const r=lookup(btn.dataset.rdWord,sentence,t,Number(btn.dataset.rdOff));
    const box=get('rd-dict');if(!box)return;box.innerHTML=dictHtml(r);box.hidden=false;get('reading').classList.add('rd-dict-open');
    document.querySelectorAll('#reading .rd-w.looked-up').forEach(b=>b.classList.remove('looked-up'));btn.classList.add('looked-up');
    // 查词卡固定在屏幕底部；若刚点的词被它挡住，就把页面往上推一点。
    requestAnimationFrame(()=>{const wb=btn.getBoundingClientRect(),bb=box.getBoundingClientRect();if(wb.bottom>bb.top-10)window.scrollBy({top:wb.bottom-bb.top+24,behavior:'smooth'})});
  }
  function lineHtml(group,i,it,zh){
    const open=showZh||revealed.has(group+':'+i);
    return'<div class="rd-line'+(open?' zh-open':'')+'" data-rd-line="'+group+':'+i+'"><div class="rd-sentence" data-rd-toggle="'+group+':'+i+'" aria-expanded="'+open+'"><span class="rd-it" lang="it">'+wordsHtml(it)+'</span><span class="rd-zh"'+(open?'':' hidden')+'>'+h(zh)+'</span></div><div class="rd-line-tools"><button class="audio-button" data-speak="'+h(it)+'" aria-label="朗读这一句">🔊</button><button type="button" class="rd-zh-btn" data-rd-toggle="'+group+':'+i+'" aria-label="显示/隐藏这一句中文">译</button></div></div>';
  }
  function quizHtml(state,t){
    const r=rec(state,t.id),done=submitted.has(t.id);
    let correct=0;t.q.forEach((q,i)=>{if(r.quiz?.[i]===q[3])correct++});
    return'<section class="rd-quiz"><div class="quiz-heading"><div><p class="eyebrow">COMPRENSIONE</p><h3>理解练习 · '+t.q.length+' 题</h3><p>先读全文再作答；交卷后看解析。</p></div><span>'+(done?correct+'/'+t.q.length+' 正确':'')+'</span></div>'+
      t.q.map((q,i)=>{const sel=r.quiz?.[i];const fb=done?(sel===q[3]?'<p class="quiz-feedback correct">✓ 正确。'+h(q[4])+'</p>':'<p class="quiz-feedback wrong">'+(sel===undefined?'尚未作答。':'再想想。')+' 正确答案：'+h(q[2][q[3]])+'。'+h(q[4])+'</p>'):'';
        return'<fieldset class="quiz-question"><legend><strong lang="it">'+(i+1)+'. '+h(q[0])+'</strong><small class="rd-qzh">'+h(q[1])+'</small></legend><div class="quiz-options">'+q[2].map((o,j)=>'<label><input type="radio" name="rdq-'+t.id+'-'+i+'" data-rd-q="'+i+'" value="'+j+'"'+(sel===j?' checked':'')+'><span lang="it">'+h(o)+'</span></label>').join('')+'</div>'+fb+'</fieldset>'}).join('')+
      '<div class="answer-actions"><button class="primary-button" data-rd-action="submit">提交答案</button><button class="outline-button" data-rd-action="retry">清空重做</button></div></section>';
  }
  function render(state){
    lastState=state;closeDict();const u=UNITS.find(x=>x.id===state.unit)||UNITS[0],d=unitData(u.id),panel=get('reading-panel');if(!panel)return;
    get('reading-count').textContent=d.texts.length;
    document.querySelectorAll('#reading .mode-tab[data-rd-tab]').forEach(b=>b.classList.toggle('active',b.dataset.rdTab===tab));
    const zhBtn='<button class="outline-button" data-rd-action="zh" aria-pressed="'+showZh+'">'+(showZh?'隐藏全部中文':'显示全部中文')+'</button>';
    const speed='<label class="rd-speed">语速<select id="rd-rate" aria-label="朗读语速">'+[[.65,'慢'],[.82,'正常'],[1,'快']].map(([v,l])=>'<option value="'+v+'"'+(v===rate?' selected':'')+'>'+l+'</option>').join('')+'</select></label>';
    if(tab==='key'){
      panel.innerHTML='<article class="rd-card"><header class="rd-head"><span class="chip">UNIT '+u.id+' · 实用句</span><h2>'+h(u.title)+' · 关键句 '+d.key.length+' 句</h2><p>点句子看中文；先自己说一遍，再点 🔊 对照。</p></header><div class="rd-toolbar"><button class="primary-button" id="rd-play-key" data-rd-action="play-key">▶ 整组朗读</button>'+zhBtn+speed+'</div><div class="rd-lines">'+d.key.map(([it,zh],i)=>lineHtml('key',i,it,zh)).join('')+'</div></article>';
      mark();return;
    }
    const t=textOf(state);if(!t){panel.innerHTML='<div class="empty-state">本单元暂无阅读。</div>';return}
    const r=rec(state,t.id),readCount=d.texts.filter(x=>rec(state,x.id).read).length;
    panel.innerHTML='<div class="rd-picker" role="tablist" aria-label="选择短文">'+d.texts.map((x,i)=>{const rx=rec(state,x.id);return'<button class="rd-pick'+(x.id===t.id?' active':'')+'" data-rd-text="'+x.id+'"><span class="rd-pick-kicker">'+(i+1)+' · '+h(x.kind)+' · '+h(x.level)+(rx.read?' · ✓':'')+'</span><b lang="it">'+h(x.title)+'</b><small>'+h(x.zh)+'</small></button>'}).join('')+'</div>'+
      '<p class="rd-progress">本单元已读 '+readCount+'/'+d.texts.length+' 篇</p>'+
      '<article class="rd-card"><header class="rd-head"><span class="chip">'+h(t.kind)+' · '+h(t.level)+' · '+t.s.length+' 句</span><h2 lang="it">'+h(t.title)+'</h2><p>'+h(t.zh)+' · 点单词查释义，点句子空白处或「译」看整句中文</p></header>'+
      '<div class="rd-toolbar"><button class="primary-button" id="rd-play-all" data-rd-action="play-text">▶ 整篇朗读</button>'+zhBtn+speed+'</div>'+
      '<div class="rd-lines">'+t.s.map(([it,zh],i)=>lineHtml('text',i,it,zh)).join('')+'</div>'+
      '<section class="rd-gloss"><h3>重点词</h3><ul>'+t.g.map(([w,z])=>'<li><span lang="it">'+h(w)+'</span><small>'+h(z)+'</small></li>').join('')+'</ul></section>'+
      quizHtml(state,t)+
      '<div class="rd-done"><button class="'+(r.read?'outline-button':'primary-button')+'" data-rd-action="read">'+(r.read?'✓ 已读完 · 点此取消':'标记为已读')+'</button>'+(d.texts.findIndex(x=>x.id===t.id)<d.texts.length-1?'<button class="text-button" data-rd-action="next">下一篇 →</button>':'')+'</div></article>';
    mark();
  }
  function init(callbacks){
    cb=callbacks||{};const root=get('reading');if(!root)return;
    if(!get('rd-dict')){const d=document.createElement('div');d.id='rd-dict';d.className='rd-dict';d.setAttribute('role','dialog');d.setAttribute('aria-label','查词');d.hidden=true;root.appendChild(d)}
    // 点页面其他地方（含导航、别的板块）或按 Esc 关闭查词卡。
    document.addEventListener('click',e=>{if(!e.target.closest('#rd-dict')&&!e.target.closest('#reading .rd-w'))closeDict()});
    document.addEventListener('keydown',e=>{if(e.key==='Escape')closeDict()});
    root.addEventListener('click',e=>{
      const w=e.target.closest('.rd-w');if(w&&root.contains(w)){e.stopPropagation();openDict(w);return}
      if(e.target.closest('[data-rd-close]')){closeDict();return}
      if(e.target.closest('#rd-dict'))return;
      closeDict();
      const el=e.target.closest('button,[data-rd-toggle]');if(!el||!root.contains(el))return;const s=lastState;if(!s)return;
      if(el.dataset.rdTab){tab=el.dataset.rdTab;stop();cb.stopOther?.();revealed.clear();render(s);return}
      if(el.dataset.rdText){current[s.unit]=el.dataset.rdText;cb.stopOther?.();revealed.clear();render(s);get('reading-panel').querySelector('.rd-card')?.scrollIntoView({block:'start',behavior:'smooth'});return}
      if(el.dataset.rdToggle){const k=el.dataset.rdToggle;revealed.has(k)?revealed.delete(k):revealed.add(k);const row=el.closest('.rd-line'),open=showZh||revealed.has(k);row.classList.toggle('zh-open',open);row.querySelector('.rd-zh').hidden=!open;row.querySelector('.rd-sentence').setAttribute('aria-expanded',String(open));return}
      const t=textOf(s),d=unitData(s.unit);
      switch(el.dataset.rdAction){
        case'zh':showZh=!showZh;revealed.clear();render(s);break;
        case'play-text':if(playing?.group==='text'){cb.stopOther?.();stop()}else playList('text',t.s.map(x=>x[0]));break;
        case'play-key':if(playing?.group==='key'){cb.stopOther?.();stop()}else playList('key',d.key.map(x=>x[0]));break;
        case'submit':submitted.add(t.id);render(s);root.querySelector('.rd-quiz')?.scrollIntoView({block:'start',behavior:'smooth'});break;
        case'retry':submitted.delete(t.id);cb.commit?.('reading',{text:t.id,resetQuiz:true});render(cb.state?.()||s);break;
        case'read':{cb.commit?.('reading',{text:t.id,read:!rec(s,t.id).read});const ns=cb.state?.()||s;render(ns);cb.toast?.(rec(ns,t.id).read?'已标记为已读 ✓':'已取消已读标记');break}
        case'next':{const i=d.texts.findIndex(x=>x.id===t.id);if(d.texts[i+1]){current[s.unit]=d.texts[i+1].id;cb.stopOther?.();revealed.clear();render(cb.state?.()||s);get('reading-panel').querySelector('.rd-card')?.scrollIntoView({block:'start',behavior:'smooth'})}break}
      }
    });
    root.addEventListener('change',e=>{
      const s=lastState;if(!s)return;
      if(e.target.id==='rd-rate'){rate=Number(e.target.value)||.82;return}
      if(e.target.dataset.rdQ!==undefined){const t=textOf(s);cb.commit?.('reading',{text:t.id,question:Number(e.target.dataset.rdQ),answer:Number(e.target.value)});if(submitted.has(t.id))render(cb.state?.()||s)}
    });
  }
  const count=()=>READING.reduce((n,u)=>n+u.texts.length,0);
  return{init,render,stop,count,lookup,closeDict};
})();

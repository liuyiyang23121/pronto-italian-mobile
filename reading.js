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
  function lineHtml(group,i,it,zh){
    const open=showZh||revealed.has(group+':'+i);
    return'<div class="rd-line'+(open?' zh-open':'')+'" data-rd-line="'+group+':'+i+'"><button class="rd-sentence" data-rd-toggle="'+group+':'+i+'" aria-expanded="'+open+'"><span class="rd-it" lang="it">'+h(it)+'</span><span class="rd-zh"'+(open?'':' hidden')+'>'+h(zh)+'</span></button><button class="audio-button" data-speak="'+h(it)+'" aria-label="朗读这一句">🔊</button></div>';
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
    lastState=state;const u=UNITS.find(x=>x.id===state.unit)||UNITS[0],d=unitData(u.id),panel=get('reading-panel');if(!panel)return;
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
      '<article class="rd-card"><header class="rd-head"><span class="chip">'+h(t.kind)+' · '+h(t.level)+' · '+t.s.length+' 句</span><h2 lang="it">'+h(t.title)+'</h2><p>'+h(t.zh)+' · 点任意句子显示/隐藏中文</p></header>'+
      '<div class="rd-toolbar"><button class="primary-button" id="rd-play-all" data-rd-action="play-text">▶ 整篇朗读</button>'+zhBtn+speed+'</div>'+
      '<div class="rd-lines">'+t.s.map(([it,zh],i)=>lineHtml('text',i,it,zh)).join('')+'</div>'+
      '<section class="rd-gloss"><h3>重点词</h3><ul>'+t.g.map(([w,z])=>'<li><span lang="it">'+h(w)+'</span><small>'+h(z)+'</small></li>').join('')+'</ul></section>'+
      quizHtml(state,t)+
      '<div class="rd-done"><button class="'+(r.read?'outline-button':'primary-button')+'" data-rd-action="read">'+(r.read?'✓ 已读完 · 点此取消':'标记为已读')+'</button>'+(d.texts.findIndex(x=>x.id===t.id)<d.texts.length-1?'<button class="text-button" data-rd-action="next">下一篇 →</button>':'')+'</div></article>';
    mark();
  }
  function init(callbacks){
    cb=callbacks||{};const root=get('reading');if(!root)return;
    root.addEventListener('click',e=>{
      const el=e.target.closest('button');if(!el||!root.contains(el))return;const s=lastState;if(!s)return;
      if(el.dataset.rdTab){tab=el.dataset.rdTab;stop();cb.stopOther?.();revealed.clear();render(s);return}
      if(el.dataset.rdText){current[s.unit]=el.dataset.rdText;cb.stopOther?.();revealed.clear();render(s);get('reading-panel').querySelector('.rd-card')?.scrollIntoView({block:'start',behavior:'smooth'});return}
      if(el.dataset.rdToggle){const k=el.dataset.rdToggle;revealed.has(k)?revealed.delete(k):revealed.add(k);const row=el.closest('.rd-line'),open=showZh||revealed.has(k);row.classList.toggle('zh-open',open);row.querySelector('.rd-zh').hidden=!open;el.setAttribute('aria-expanded',String(open));return}
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
  return{init,render,stop,count};
})();

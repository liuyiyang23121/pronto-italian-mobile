/* 词形只采用明确映射；不通过相似拼写猜词，避免把陌生词错误标成词库词。 */
const ListeningText = (()=>{
  const normalize=s=>String(s).toLocaleLowerCase('it').normalize('NFC').replace(/[’‘]/g,"'");
  const words=new Map(VOCAB.map(w=>[normalize(w.id),w]));
  const forms={};
  function bind(lemma,list){list.split('|').forEach(form=>forms[form]=lemma)}
  bind('essere','sono|sei|è|siamo|siete|erano|era|stato|stata|stati|state');
  bind('avere','ho|hai|ha|abbiamo|avete|hanno|avuto');
  bind('andare','vado|vai|va|andiamo|andate|vanno|andato|andata|andati|andate');
  bind('venire','vengo|vieni|viene|venuta|venuto|venuti|venute');
  bind('vivere','vivo|vivi|vive|viviamo|vivono|vissuto');
  bind('studiare','studio|studi|studia|studiamo|studiato');
  bind('amare','amo|ami|ama|amiamo|amano|amato');
  bind('abitare','abito|abiti|abita|abitiamo|abitano|abitato');
  bind('chiamarsi','chiamo|chiami|chiama|chiamiamo|chiamate|chiamano');
  bind('fare','faccio|fai|fa|facciamo|fate|fanno|fatto');
  bind('nascere','nata|nato|nati|nate');
  bind('potere','posso|puoi|può|possiamo|potete|possono|potuto');
  bind('cominciare','cominciato|cominciata|comincio|comincia');
  bind('partire','partita|partito|partiti|partite');
  bind('vedere','vedo|vedi|vede|vediamo|vedono|visto|vista|visti|viste');
  bind('trovare','trovo|trovi|trova|troviamo|trovato');
  bind('lavorare','lavoro|lavori|lavora|lavoriamo|lavorato');
  bind('durare','durato|durata');
  bind('stare','sto|stai|sta|stiamo|stanno');
  bind('divertirsi','divertiti|divertito|divertita|divertite');
  bind('nevicare','nevicato|nevica');
  bind('guardare','guarda|guardate|guardato');
  bind('finire','finisco|finisci|finisce|finito');
  bind('arrivare','arrivo|arrivi|arriva|arrivano|arrivata|arrivato');
  bind('parlare','parlo|parli|parla|parlano|parlato');
  bind('rispondere','rispondo|risponde|rispondono|risposto');
  bind('prendere','prendo|prendi|prende|prendiamo|preso');
  bind('leggere','leggo|leggi|legge|leggono|letto');
  bind('mettere','metto|metti|mette|mettono|messo');
  bind('indossare','indosso|indossa|indossano|indossato');
  bind('sposare','sposato|sposata');
  bind('ricevere','ricevuto|ricevuta|ricevuti');
  bind('iscriversi','iscritta|iscritto|iscritti|iscritte');
  bind('iniziare','iniziata|iniziato|iniziati');
  bind('rendere','rende|rendo|rendono');
  const inflections={anni:'anno',giorni:'giorno',ore:'ora',amici:'amico',sorelle:'sorella',fratelli:'fratello',genitori:'genitore',libri:'libro',bambini:'bambino',piccoli:'piccolo',piccole:'piccolo',piccola:'piccolo',belle:'bello',bella:'bello',belli:'bello',bellissime:'bello',bellissima:'bello',italiana:'italiano',italiane:'italiano',italiani:'italiano',romani:'roma',montagne:'montagna',laghi:'lago',passeggiate:'passeggiare',spiagge:'spiaggia',scarpe:'scarpa',società:'società',importanti:'importante',momenti:'momento',favole:'favola',feste:'festa',papà:'padre',mamme:'madre',nonni:'nonno',altri:'altro',altre:'altro',altra:'altro',tante:'tanto',tanti:'tanto',tanta:'tanto',molti:'molto',molte:'molto',molta:'molto',tutti:'tutto',tutte:'tutto',tutta:'tutto',questi:'questo',queste:'questo',questa:'questo',meravigliosa:'meraviglioso',beati:'beato',studi:'studiare',20:'venti',28:'ventotto',3:'tre',8:'otto',4:'quattro',6:'sei'};
  Object.assign(forms,inflections);
  // 派生词、同义词不算同一词的屈折变化，不能据此伪造词库命中。
  for(const form of ['romani','passeggiate','papà','mamme'])delete forms[form];
  forms.studi='studio';
  function lookup(text,context=''){
    let token=normalize(text),lemma=forms[token];
    // 这些语料中的 la/le 是冠词；词库同形词条为直接宾语代词，不混用释义。
    if(['la','le'].includes(token))return null;
    if(token==='ci'&&/ci\s+(?:sono|siamo)/i.test(context))return null;
    // 同形歧义按本材料中的上下文处理，不能把“六小时”的 sei 解释成 essere。
    if(token==='sei'&&/sei\s+ore/i.test(context))lemma='sei';
    if(token==='lavoro'&&/mio lavoro/i.test(context))lemma='lavoro';
    if(token==='abito'&&/un abito/i.test(context))lemma='abito';
    if(token==='studio'&&/(?:lo|uno) studio/i.test(context))lemma='studio';
    if(token==='letto'&&/(?:il|un|a|al) letto/i.test(context))lemma='letto';
    if(lemma&&words.has(lemma))return{word:words.get(lemma),form:text,inflected:normalize(lemma)!==token};
    if(words.has(token))return{word:words.get(token),form:text,inflected:false};
    const noArticle=token.replace(/^(?:l|un)'/,'');
    if(noArticle!==token)return lookup(noArticle,context);
    return null;
  }
  function parts(text){
    const out=[];let last=0;
    for(const m of text.matchAll(/[\p{L}\p{M}]+(?:[’'][\p{L}\p{M}]+)*|\d+(?:[.,]\d+)*/gu)){
      if(m.index>last)out.push({text:text.slice(last,m.index),word:false});
      out.push({text:m[0],word:true,match:lookup(m[0],text)});last=m.index+m[0].length;
    }
    if(last<text.length)out.push({text:text.slice(last),word:false});return out;
  }
  return{normalize,lookup,parts};
})();

const ListeningPractice = (()=>{
  const tracks=LISTENING_DATA.tracks,byTrack=new Map(tracks.map(t=>[t.id,t]));
  const get=id=>document.getElementById(id),escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const defaults=()=>({track:'joanna',speed:1,showItalian:true,showChinese:false,follow:true,loop:false,positions:{}});
  const clock=s=>{s=Math.max(0,Math.floor(s||0));return Math.floor(s/60)+':'+String(s%60).padStart(2,'0')};
  let settings=defaults(),track=null,index=-1,loopIndex=0,callbacks={},bound=false,frame=null,clickTimer=null;
  let pendingSeek=null,pendingPlay=false,lastSaved=0,lastSavedTrack=null,lastSavedTime=-1,suppressPause=0,activeWordKey='';
  const audio=()=>get('listening-audio');
  function commit(p){callbacks.commit?.('listening',p)}
  function savePosition(force=false,completed=false){
    if(!track||!audio().currentSrc||!Number.isFinite(audio().currentTime))return;
    const time=Math.min(audio().currentTime,track.duration);
    if(!force&&Date.now()-lastSaved<10000)return;
    if(!completed&&lastSavedTrack===track.id&&Math.abs(lastSavedTime-time)<.1)return;
    lastSaved=Date.now();lastSavedTrack=track.id;lastSavedTime=time;
    const p={time,completed:completed||!!settings.positions[track.id]?.completed};
    settings.positions[track.id]=p;commit({position:{track:track.id,...p}});renderLibrary();
  }
  function pause(){if(bound&&track){savePosition(true);audio().pause()}}
  function renderLibrary(){
    get('listening-library').innerHTML=tracks.map((t,i)=>'<button class="listening-track '+(track?.id===t.id?'active':'')+'" data-listening-track="'+t.id+'" aria-pressed="'+(track?.id===t.id)+'"><span>'+String(i+1).padStart(2,'0')+' / '+escape(t.kind)+'</span><strong>'+escape(t.title)+'</strong><small>'+t.segments.length+' 句 · '+clock(t.duration)+(settings.positions[t.id]?.completed?' · ✓ 已听完':settings.positions[t.id]?.time>1?' · 继续 '+clock(settings.positions[t.id].time):'')+'</small></button>').join('');
  }
  function sentenceHtml(s,i){
    let n=0;
    const text=ListeningText.parts(s.it).map(p=>{
      if(!p.word)return escape(p.text);const wi=n++,timing=s.words?.[wi];
      return'<button class="listening-word '+(p.match?'known-vocab':'')+'" data-word-line="'+i+'" data-word-index="'+wi+'" data-word-time="'+(timing?.start??s.start)+'"'+(p.match?' data-lemma="'+escape(p.match.word.id)+'"':'')+' aria-label="'+escape(p.text)+'，定位'+(timing?'本词':'本句')+(p.match?'；双击查义':'')+'">'+escape(p.text)+'</button>';
    }).join('');
    return'<article class="listening-line" data-line="'+i+'"><button class="listening-line-time" data-seek-line="'+i+'" aria-label="从第 '+(i+1)+' 句播放">'+clock(s.start)+'</button><div class="listening-line-body"><div class="listening-line-meta">第 '+(i+1)+' 句'+(s.speaker?' · '+escape(s.speaker):'')+(s.uncertain?' <span class="uncertain-chip">推测校订</span>':'')+(s.alignment==='sentence'?' · 本句按句定位':'')+'</div><p class="listening-italian" lang="it">'+text+'</p><p class="listening-chinese" lang="zh-CN">'+escape(s.zh)+'</p><p class="listening-hidden-hint">文字已隐藏，专注听这一句。</p></div></article>';
  }
  function renderText(){
    activeWordKey='';get('listening-lines').innerHTML=track.segments.map(sentenceHtml).join('');
    get('listening-changes').innerHTML=track.changes.map(c=>'<article><span class="chip">'+escape(c.certainty)+'</span><p><del>'+escape(c.from)+'</del><br><strong>→ '+escape(c.to)+'</strong></p><small>'+escape(c.reason)+'</small></article>').join('');
    get('listening-original').innerHTML=track.original.map(p=>'<p>'+escape(p)+'</p>').join('');
    get('listening-notice').textContent=track.notice||'标点、大小写、重音和明确语法错误按下列说明校订。';
    index=-1;applyPreferences();updateTime(true);
  }
  function applyPreferences(){
    const lines=get('listening-lines');lines.classList.toggle('hide-it',!settings.showItalian);lines.classList.toggle('hide-zh',!settings.showChinese);
    get('listening-toggle-it').textContent=settings.showItalian?'隐藏意大利语':'显示意大利语';get('listening-toggle-it').setAttribute('aria-pressed',String(settings.showItalian));
    get('listening-toggle-zh').textContent=settings.showChinese?'隐藏中文翻译':'显示中文翻译';get('listening-toggle-zh').setAttribute('aria-pressed',String(settings.showChinese));
    get('listening-follow').checked=settings.follow;get('listening-loop').checked=settings.loop;get('listening-speed').value=String(settings.speed);
    audio().playbackRate=settings.speed;audio().preservesPitch=true;
  }
  function setPreference(name,value){settings[name]=value;commit({[name]:value});if(name==='loop')loopIndex=Math.max(0,index);applyPreferences();if(name==='showItalian'&&!value)get('listening-dictionary').hidden=true}
  function choose(id,persist=true){
    const next=byTrack.get(id);if(!next)return;
    if(track)savePosition(true);suppressPause=performance.now()+300;audio().pause();
    track=next;settings.track=id;pendingPlay=false;loopIndex=0;get('listening-error').hidden=true;get('listening-dictionary').hidden=true;
    const resume=Number(settings.positions[id]?.time)||0;pendingSeek=resume>=track.duration-.2?0:Math.max(0,resume);
    audio().src=track.audio;audio().load();get('listening-kind').textContent=track.kind;get('listening-title').textContent=track.title;
    get('listening-meta').textContent=track.subtitle+' · '+track.segments.length+' 句 · '+clock(track.duration);get('listening-download').href=track.audio;
    renderLibrary();renderText();if(persist)commit({track:id});
  }
  function locate(){if(index>=0)get('listening-lines').querySelector('[data-line="'+index+'"]').scrollIntoView({behavior:'smooth',block:'nearest'})}
  function findIndex(t){let result=0;for(let i=0;i<track.segments.length;i++){if(t+.025>=track.segments[i].start)result=i;else break}return result}
  function updateTime(force=false){
    if(!track)return;const a=audio(),t=Number.isFinite(a.currentTime)?a.currentTime:0,duration=Number.isFinite(a.duration)?a.duration:track.duration;
    get('listening-time').textContent=clock(t)+' / '+clock(duration);get('listening-seek').max=duration;get('listening-seek').value=t;
    const next=findIndex(t);get('listening-now').textContent='第 '+(next+1)+' / '+track.segments.length+' 句'+(settings.loop?' · 单句循环':'');
    if(next!==index||force){index=next;get('listening-lines').querySelectorAll('.listening-line').forEach((row,i)=>{row.classList.toggle('is-current',i===index);if(i===index)row.setAttribute('aria-current','true');else row.removeAttribute('aria-current')});if(settings.follow&&!a.paused&&get('listening').classList.contains('active-view'))locate()}
    const words=track.segments[index]?.words||[];let wi=-1;for(let i=0;i<words.length;i++){if(words[i].start<=t)wi=i;else break}
    const wordKey=index+':'+wi;if(wordKey!==activeWordKey){activeWordKey=wordKey;get('listening-lines').querySelector('.speaking-word')?.classList.remove('speaking-word');if(wi>=0)get('listening-lines').querySelector('[data-line="'+index+'"] [data-word-index="'+wi+'"]')?.classList.add('speaking-word')}
    get('listening-play').textContent=a.paused?'▶':'Ⅱ';get('listening-play').setAttribute('aria-label',a.paused?'播放本篇':'暂停本篇');
  }
  async function play(){
    callbacks.stopOther?.();get('listening-error').hidden=true;
    try{await audio().play();updateTime();startFrame()}catch(e){get('listening-error').textContent='暂未开始播放，请再点一次播放按钮；若仍无声音，请检查设备音量。';get('listening-error').hidden=false}
  }
  function seek(time,autoplay=false){
    if(!track)return;const target=Math.max(0,Math.min(time,track.duration-.02));loopIndex=findIndex(target);
    if(audio().readyState<1){pendingSeek=target;pendingPlay=autoplay}else{audio().currentTime=target;updateTime(true);savePosition(true);if(autoplay)void play()}
  }
  function seekLine(i,autoplay=true){i=Math.max(0,Math.min(i,track.segments.length-1));seek(track.segments[i].start,autoplay)}
  function startFrame(){cancelAnimationFrame(frame);const tick=()=>{if(!audio().paused){if(settings.loop&&audio().currentTime>=track.segments[loopIndex].end-.02)audio().currentTime=track.segments[loopIndex].start;updateTime();frame=requestAnimationFrame(tick)}};frame=requestAnimationFrame(tick)}
  function dictionary(button){
    const word=VOCAB.find(w=>w.id===button.dataset.lemma);if(!word)return;
    const box=get('listening-dictionary');box.hidden=false;
    box.innerHTML='<button class="dictionary-close" aria-label="关闭查词">×</button><span class="eyebrow">课堂词库</span><strong lang="it">'+escape(word.it)+'</strong><p>'+escape(word.zh)+'</p><small>'+escape(button.textContent)+' → '+escape(word.it)+' · 笔记 P.'+word.pages.join('、')+'</small>';
    get('listening-lines').querySelectorAll('.looked-up').forEach(b=>b.classList.remove('looked-up'));button.classList.add('looked-up');
  }
  function render(saved={}){
    settings={...defaults(),...saved,positions:{...(saved.positions||{})}};
    if(!track)choose(byTrack.has(settings.track)?settings.track:'joanna',false);
    else{renderLibrary();applyPreferences()}
  }
  function init(options){
    if(bound)return;bound=true;callbacks=options;const a=audio();
    get('listening-library').addEventListener('click',e=>{const b=e.target.closest('[data-listening-track]');if(b)choose(b.dataset.listeningTrack)});
    get('listening-play').addEventListener('click',()=>a.paused?void play():pause());
    get('listening-prev').addEventListener('click',()=>seekLine(index-1));get('listening-next').addEventListener('click',()=>seekLine(index+1));get('listening-replay').addEventListener('click',()=>seekLine(index));
    get('listening-locate').addEventListener('click',locate);
    get('listening-speed').addEventListener('change',e=>setPreference('speed',Number(e.target.value)));
    get('listening-follow').addEventListener('change',e=>setPreference('follow',e.target.checked));get('listening-loop').addEventListener('change',e=>{setPreference('loop',e.target.checked);if(settings.loop)seekLine(index,!a.paused)});
    get('listening-toggle-it').addEventListener('click',()=>setPreference('showItalian',!settings.showItalian));get('listening-toggle-zh').addEventListener('click',()=>setPreference('showChinese',!settings.showChinese));
    get('listening-seek').addEventListener('input',e=>seek(Number(e.target.value),false));
    get('listening-lines').addEventListener('click',e=>{
      const time=e.target.closest('[data-seek-line]');if(time){seekLine(Number(time.dataset.seekLine));return}
      const word=e.target.closest('[data-word-line]');if(!word||e.detail>1)return;
      clearTimeout(clickTimer);clickTimer=setTimeout(()=>seek(Number(word.dataset.wordTime),true),word.dataset.lemma?320:0);
    });
    get('listening-lines').addEventListener('dblclick',e=>{const word=e.target.closest('[data-lemma]');if(word){e.preventDefault();clearTimeout(clickTimer);dictionary(word)}});
    get('listening-dictionary').addEventListener('click',e=>{if(e.target.closest('.dictionary-close'))get('listening-dictionary').hidden=true});
    a.addEventListener('loadedmetadata',()=>{a.playbackRate=settings.speed;if(pendingSeek!==null){a.currentTime=pendingSeek;loopIndex=findIndex(pendingSeek);pendingSeek=null}updateTime(true);if(pendingPlay){pendingPlay=false;void play()}});
    a.addEventListener('timeupdate',()=>{if(settings.loop&&track&&a.currentTime>=track.segments[loopIndex].end-.02)a.currentTime=track.segments[loopIndex].start;updateTime();savePosition()});a.addEventListener('play',()=>{updateTime();startFrame()});
    a.addEventListener('pause',()=>{cancelAnimationFrame(frame);updateTime();if(performance.now()>suppressPause)savePosition(true)});
    a.addEventListener('ended',()=>{if(settings.loop){seekLine(loopIndex,true);return}savePosition(true,true);updateTime()});
    a.addEventListener('error',()=>{get('listening-error').textContent='音频未能载入。请确认通过“Pronto学习.app”进入，并保留完整网站文件夹。';get('listening-error').hidden=false});
    window.addEventListener('pagehide',()=>savePosition(true));
  }
  return{init,render,pause,clock};
})();

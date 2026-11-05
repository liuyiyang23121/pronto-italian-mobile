'use strict';
const $=id=>document.getElementById(id),$$=selector=>[...document.querySelectorAll(selector)];
const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const byId=new Map(VOCAB.map(w=>[w.id,w]));
let state=Learning.empty(),ready=false;
let view=['home','vocab','review','drill','grammar','listening'].includes(location.hash.slice(1))?location.hash.slice(1):'home';
let currentLesson=1,revealed=false,bankOpen=false,bankRevealed=new Set(),rapidRevealed=new Set();
let reviewActive=false,reviewFilter='today',lessonFilter='unit',lastDay=Learning.day();
let drillMode='dictation',drillIndex=0,drillOrder=[],drillSubmitted=false,quizSubmitted=new Set();
let speechTimer=null,utterance=null;
function dispatch(type,payload){state=ProgressStore.commit(type,payload);return state}
function toast(message){$('toast').textContent=message;$('toast').classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>$('toast').classList.remove('show'),4000)}
function unit(){return UNITS.find(u=>u.id===state.unit)||UNITS[0]}
function unitWords(){return VOCAB.filter(w=>w.units.includes(state.unit))}
function unitLessons(){return LESSONS.filter(l=>unit().lessons.includes(l.id))}
function source(w){return '笔记 P.'+w.pages.join('、')}
function soundButton(text,label='朗读'){return '<button class="audio-button" data-speak="'+esc(text)+'" aria-label="'+esc(label)+'">🔊</button>'}
function cancelSpeech(){clearTimeout(speechTimer);if('speechSynthesis'in window)window.speechSynthesis.cancel();utterance=null}
function speakItalian(text,automatic=false){
  ListeningPractice.pause();
  cancelSpeech();if(!('speechSynthesis'in window)){if(!automatic)toast('此浏览器不支持朗读，请尝试 Chrome 或 Safari。');return}
  utterance=new SpeechSynthesisUtterance(text);utterance.lang='it-IT';utterance.rate=.82;
  const voices=window.speechSynthesis.getVoices(),voice=voices.find(v=>v.lang.toLowerCase()==='it-it')||voices.find(v=>v.lang.toLowerCase().startsWith('it'));
  if(voice)utterance.voice=voice;
  utterance.onstart=()=>{$('speech-notice').hidden=true};
  utterance.onerror=e=>{if(['canceled','interrupted'].includes(e.error))return;$('speech-notice').textContent=e.error==='not-allowed'?'点一次喇叭后，浏览器即可重播。':'请检查设备的意大利语语音，再点喇叭重试。';$('speech-notice').hidden=false};
  window.speechSynthesis.speak(utterance);
}
function cardScope(){return view==='review'?'review':'unit:'+state.unit}
function session(){return Learning.ensureDeck(state,cardScope())}
function currentWord(){return Learning.current(state,cardScope())}
function autoReadCurrent(){if(!state.autoSpeak||!(view==='vocab'||view==='review'&&reviewActive))return;const w=currentWord();if(w)speechTimer=setTimeout(()=>{if(currentWord()?.id===w.id)speakItalian(w.it,true)},100)}
function selectUnit(id){
  if(!UNITS.some(u=>u.id===Number(id)))return;cancelSpeech();dispatch('choose-unit',{unit:Number(id)});currentLesson=unit().lessons[0];
  revealed=false;bankRevealed.clear();rapidRevealed.clear();drillIndex=0;drillOrder=[];$('word-search').value='';render();autoReadCurrent();
}
function showView(next){
  if(!['home','vocab','review','drill','grammar','listening'].includes(next))return;
  if(next!=='listening')ListeningPractice.pause();
  cancelSpeech();if(next==='drill'&&view!=='drill')shuffleDrill(false);view=next;
  history.replaceState(null,'','#'+next);render();window.scrollTo({top:0,behavior:'smooth'});autoReadCurrent();
}
function lessonPassed(l){const a=state.quiz[l.id]||{};return l.questions.every((q,i)=>a[i]===q.answer)}
function unitProgress(u){
  const words=VOCAB.filter(w=>w.units.includes(u.id)),passedWords=words.filter(w=>state.ratings[w.id]&&!state.ratings[w.id].pending).length;
  const passed=u.lessons.filter(id=>lessonPassed(LESSONS.find(l=>l.id===id))).length,practiced=new Set(state.drills[u.id]||[]).size;
  return{words,passedWords,passed,practiced,done:[passedWords===words.length,passed===u.lessons.length,practiced>=Math.min(5,words.length)]};
}
function renderSaveStatus(){
  const s=ProgressStore.status;$('save-status').textContent=s.label+(s.pending?' · '+s.pending+' 条待确认':'');
  $('sidebar-save').textContent=s.kind==='saved'?'✓ 自动保存中，无需手动操作':s.label;
  $('save-banner').dataset.kind=s.kind;
}
function render(){
  const u=unit();const options=UNITS.map(x=>'<option value="'+x.id+'">'+x.id+'. '+esc(x.title)+'</option>').join('');
  ['unit-picker','mobile-unit-picker'].forEach(id=>{$(id).innerHTML=options;$(id).value=u.id});
  $('sidebar-unit-meta').textContent=unitWords().length+' 个词/句块 · '+u.lessons.length+' 节课';
  $$('.view').forEach(e=>e.classList.toggle('active-view',e.id===view));
  $$('.nav-item').forEach(e=>e.classList.toggle('active',e.dataset.view===view));
  $$('.unit-eyebrow').forEach(e=>e.textContent='UNIT '+String(u.id).padStart(2,'0')+' · '+u.title);
  $('auto-speak').checked=state.autoSpeak;renderHome();renderReviewSummary();
  if(view==='vocab'){renderVocab();renderWordbank()}if(view==='review')renderReview();
  if(view==='drill')renderDrill();if(view==='grammar')renderGrammar();if(view==='listening')ListeningPractice.render(state.listening);renderSaveStatus();
}
function renderHome(){
  const u=unit(),p=unitProgress(u),done=p.done.filter(Boolean).length;
  $('hero-subtitle').textContent='Unit '+u.id+' · '+u.title+'。打开就接着学，进度自动保存。';
  $('focus-unit').textContent='UNIT '+String(u.id).padStart(2,'0');$('focus-source').textContent='笔记 P.'+u.pages.join('、');
  $('focus-title').textContent=u.title;$('focus-copy').textContent=u.focus;
  $('progress-fraction').textContent=done+' / 3';$('progress-percent').textContent=Math.round(done/3*100)+'%';
  $('progress-ring').style.background='conic-gradient(var(--coral) '+done*120+'deg,#e7e5da 0deg)';
  $('progress-copy').textContent='已过 '+p.passedWords+'/'+p.words.length+' 词 · 语法 '+p.passed+'/'+u.lessons.length+' 节全对';
  const tasks=[['词汇','选“认识”“熟悉”或“很熟”都算过关',p.passedWords+'/'+p.words.length+' 已过','vocab'],['理解','读讲解，完成分项自测',p.passed+'/'+u.lessons.length+' 节全对','grammar'],['输出','答对至少 '+Math.min(5,p.words.length)+' 个不同词的听写',p.practiced+' 词已答对','drill']];
  $('unit-tasks').innerHTML=tasks.map((t,i)=>'<button class="task '+(p.done[i]?'done':'')+'" data-view="'+t[3]+'"><span class="check">'+(p.done[i]?'✓':'')+'</span><span><span class="task-kicker">'+t[0]+'</span><strong>'+t[1]+'</strong></span><span>'+t[2]+' →</span></button>').join('');
  $('course-total').textContent=UNITS.length+' Units · '+VOCAB.length+' 词/句块 · '+LESSONS.length+' 节课';
  $('unit-grid').innerHTML=UNITS.map(x=>{const xp=unitProgress(x);return'<button class="'+(x.id===u.id?'current':'')+'" data-unit="'+x.id+'"><span class="rday">UNIT '+String(x.id).padStart(2,'0')+'</span><b>'+esc(x.title)+'</b><small>'+xp.passedWords+'/'+xp.words.length+' 词已过 · '+x.lessons.length+' 课</small></button>'}).join('');
}
function renderReviewSummary(){
  const today=Learning.day(),due=Learning.due(state,today),pending=due.filter(w=>state.ratings[w.id].pending).length;
  $('review-badge').textContent=due.length;$('home-review-count').textContent=due.length?due.length+' 个词等你（其中 '+pending+' 个待巩固）':'今天暂时没有到期词';
}
function cardHtml(w,deck){
  const r=state.ratings[w.id],retry=r?.pending;
  return'<article class="flashcard" data-word-id="'+esc(w.id)+'"><div class="card-label"><span>'+deck.items.length+' 词待过 · '+source(w)+'</span><span class="chip">'+(retry?'再认一次':view==='review'?'今日复习':'UNIT '+state.unit)+'</span></div>'+soundButton(w.it,'重播单词：'+w.it)+'<h2 class="word" lang="it">'+esc(w.it)+'</h2><p class="card-hint">'+(retry?'这个词还没过；选“认识”“熟悉”或“很熟”即过关并安排下次复习。':'直接评分，或展开释义与例句。')+'</p><div class="reveal-row"><button class="reveal-button" data-action="reveal-answer" aria-expanded="'+revealed+'">'+(revealed?'收起释义与例句':'显示释义与例句')+'</button></div><div id="word-answer" '+(revealed?'':'hidden')+'><p class="meaning">'+esc(w.zh)+'</p>'+mnemonicHtml(w)+'<div class="card-answer"><p lang="it">'+esc(w.ex)+' '+soundButton(w.ex,'朗读例句')+'</p><small>'+esc(w.exZh)+'</small></div>'+(rootMemoryHtml(w)?'<details class="root-toggle"><summary>词根记忆</summary>'+rootMemoryHtml(w)+'</details>':'')+'</div><div class="rating-row"><button data-rating="0">不熟<small>隔 10 词再认</small></button><button data-rating="1">认识<small>3 天后复习</small></button><button data-rating="2">熟悉<small>明天复习</small></button><button data-rating="3">很熟<small>第 7 天复习</small></button></div><p class="keyboard-hint">1 / 2 / 3 / 4 评分 · 空格展开 · R 重播</p></article>';
}
function mnemonicHtml(w){
  const m=typeof MNEMONICS!=='undefined'&&MNEMONICS[w.id];if(!m)return'';
  return'<section class="mnemonic" aria-label="联想记忆"><span class="eyebrow">💡 联想记忆</span><p>'+esc(m)+'</p></section>';
}
function rootMemoryHtml(w){
  const memory=RootMemory.get(w.id);if(!memory)return'';
  return'<section class="root-memory" aria-label="词根法教记忆"><div><span class="eyebrow">词根法教记忆</span><span class="chip">'+esc(memory.kind)+'</span></div><h3>'+esc(memory.title)+'</h3><p>'+esc(memory.explanation)+'</p><ul>'+memory.related.map(r=>'<li><span lang="it">'+esc(r.it)+'</span> <small>'+esc(r.zh)+'</small></li>').join('')+'</ul><a href="'+esc(memory.source.url)+'" target="_blank" rel="noopener noreferrer">查看词源依据 ↗</a></section>';
}
function renderVocab(){
  const deck=session(),w=currentWord(),pool=unitWords(),passed=unitProgress(unit()).passedWords,pending=pool.filter(w=>state.ratings[w.id]?.pending).length;
  $('vocab-status').textContent=passed+'/'+pool.length+' 词已过 · '+pending+' 词待巩固 · 本轮剩 '+deck.items.length+' 词';
  $('wordbank-panel').hidden=!bankOpen;$('toggle-wordbank').textContent=bankOpen?'收起词库':'查看词库';$('toggle-wordbank').setAttribute('aria-expanded',String(bankOpen));
  $('flashcard-wrap').innerHTML=w?cardHtml(w,deck):'<article class="flashcard complete-card"><span class="chip">UNIT '+state.unit+'</span><h2>本单元今天的词已经过完。</h2><p>所有待巩固词都已选“认识”“熟悉”或“很熟”。新一天到期的词会自动出现在复习模块。</p><div class="answer-actions"><button class="primary-button" data-view="review">查看复习安排 →</button><button class="outline-button" data-action="restart-vocab">全单元再练一轮</button></div></article>';
}
function renderReview(){
  const today=Learning.day(),due=Learning.due(state,today),tomorrow=Learning.addDays(today,1),scheduled=VOCAB.filter(w=>state.ratings[w.id]?.dueDay>today&&!state.ratings[w.id].pending);
  $('review-date').textContent=today+' · 意大利时间 · 不受当前 Unit 限制';
  const stats=[['今天要复习',due.length],['其中待巩固',due.filter(w=>state.ratings[w.id].pending).length],['明天到期',scheduled.filter(w=>state.ratings[w.id].dueDay===tomorrow).length],['后续已安排',scheduled.length]];
  $('review-stats').innerHTML=stats.map(([label,n])=>'<article><span>'+label+'</span><strong>'+n+'</strong></article>').join('');
  $$('.mode-tab[data-review-filter]').forEach(b=>b.classList.toggle('active',b.dataset.reviewFilter===reviewFilter));
  const list=reviewFilter==='today'?due:scheduled.sort((a,b)=>state.ratings[a.id].dueDay.localeCompare(state.ratings[b.id].dueDay));
  $('review-list').innerHTML=list.length?list.map(w=>{const r=state.ratings[w.id];return'<article class="review-row"><div><strong lang="it">'+esc(w.it)+'</strong><small>'+source(w)+'</small></div><span>'+esc(r.pending?'待巩固 · 今天需过关':r.dueDay<=today?'今天到期':r.dueDay+' 到期')+'</span>'+soundButton(w.it,'朗读 '+w.it)+'</article>'}).join(''):'<div class="empty-state">'+(reviewFilter==='today'?'今天暂时没有需要复习的词。新词选“熟悉”后明天、选“认识”后 3 天会自动出现在这里。':'之后的复习安排会自动积累在这里。')+'</div>';
  $('review-flashcard-wrap').hidden=!reviewActive;
  if(reviewActive){const deck=session(),w=currentWord();$('review-flashcard-wrap').innerHTML=w?cardHtml(w,deck):'<article class="flashcard complete-card"><h2>今天到期的词已全部过关。</h2><p>熟悉的词明天再见，认识的词 3 天后再见，很熟的词第 7 天再见。</p></article>'}
}
// 评分后把下一张卡的意大利语单词滚到屏幕中间，避免手机上单词被滚出视野。
function scrollToCurrentCard(){
  const wrap=$(view==='review'?'review-flashcard-wrap':'flashcard-wrap');if(!wrap||wrap.hidden)return;
  const target=wrap.querySelector('.flashcard h2.word')||wrap.querySelector('.flashcard');if(!target)return;
  requestAnimationFrame(()=>target.scrollIntoView({block:'start',behavior:'smooth'}));
}
function rateWord(level){
  if(!ready)return;const w=currentWord();if(!w)return;
  dispatch('rate',{id:w.id,level,unit:state.unit,scope:cardScope()});revealed=false;
  if(view==='review')renderReview();else renderVocab();renderHome();renderReviewSummary();autoReadCurrent();scrollToCurrentCard();
}
function renderWordbank(){
  const q=$('word-search').value.trim().toLocaleLowerCase('it'),words=unitWords().filter(w=>!q||[w.it,w.zh,w.ex].some(t=>t.toLocaleLowerCase('it').includes(q)));
  $('wordbank').innerHTML=words.map(w=>'<article class="wordbank-card">'+soundButton(w.it,'重播单词：'+w.it)+'<small>'+source(w)+'</small><strong lang="it">'+esc(w.it)+'</strong><button class="translation-toggle" data-translation="'+esc(w.id)+'" aria-expanded="'+bankRevealed.has(w.id)+'">'+(bankRevealed.has(w.id)?esc(w.zh):'点击显示中文翻译')+'</button>'+(bankRevealed.has(w.id)&&typeof MNEMONICS!=='undefined'&&MNEMONICS[w.id]?'<p class="bank-mnemonic">💡 '+esc(MNEMONICS[w.id])+'</p>':'')+'</article>').join('')||'<p>本单元没有找到这个词。</p>';
}
function normalizeStrict(t){return t.toLocaleLowerCase('it').normalize('NFC').replace(/[’‘]/g,"'").replace(/[.,!?;:"]/g,'').replace(/\s+/g,' ').trim()}
function normalizeLoose(t){return normalizeStrict(t).normalize('NFD').replace(/[\u0300-\u036f]/g,'')}
function shuffled(items,previous=[]){const out=[...items];for(let i=out.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[out[i],out[j]]=[out[j],out[i]]}if(out.length>1&&out.every((x,i)=>x===previous[i]))out.push(out.shift());return out}
function shuffleDrill(redraw=true){drillOrder=shuffled(unitWords().map(w=>w.id),drillOrder);drillIndex=0;drillSubmitted=false;rapidRevealed.clear();if(redraw)renderDrill()}
function drillWord(){if(!drillOrder.length)shuffleDrill(false);return byId.get(drillOrder[drillIndex])}
function setDrill(mode){if(!['dictation','example','rapid'].includes(mode))return;cancelSpeech();drillMode=mode;shuffleDrill()}
function renderDrill(){
  if(!drillOrder.length)shuffleDrill(false);$$('.mode-tab[data-mode]').forEach(b=>{const active=b.dataset.mode===drillMode;b.classList.toggle('active',active);b.setAttribute('aria-selected',String(active))});
  const pool=drillOrder.map(id=>byId.get(id)),w=drillWord(),panel=$('drill-panel');
  if(drillMode==='rapid'){
    panel.innerHTML='<div class="drill-count"><span>UNIT '+state.unit+' · 随机刷词</span><span>'+(drillIndex+1)+'–'+Math.min(drillIndex+8,pool.length)+' / '+pool.length+'</span></div><div class="rapid-grid">'+pool.slice(drillIndex,drillIndex+8).map(x=>'<article class="rapid-card">'+soundButton(x.it)+'<strong lang="it">'+esc(x.it)+'</strong><button class="translation-toggle" data-rapid="'+esc(x.id)+'" aria-expanded="'+rapidRevealed.has(x.id)+'">'+(rapidRevealed.has(x.id)?esc(x.zh):'点击显示中文翻译')+'</button></article>').join('')+'</div><div class="answer-actions"><button class="outline-button" data-action="rapid-prev">上一组</button><button class="primary-button" data-action="rapid-next">下一组 →</button></div>';return;
  }
  const isEx=drillMode==='example',target=isEx?w.ex:w.it;
  panel.innerHTML='<div class="drill-count"><span>UNIT '+state.unit+' · 随机'+(isEx?'例句':'单词')+'听写</span><span>'+(drillIndex+1)+' / '+pool.length+'</span></div><h2 class="drill-question">听音，写出'+(isEx?'这个句子':'这个词')+'</h2><p class="drill-translation">'+esc(isEx?w.exZh:w.zh)+'</p>'+soundButton(target,'播放听写音频')+'<p class="card-hint">点喇叭可反复播放</p><label class="sr-only" for="drill-input">听写答案</label><input id="drill-input" class="answer-input" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="在这里输入意大利语"><div class="accent-keys">'+['à','è','é','ì','ò','ù'].map(c=>'<button data-accent="'+c+'">'+c+'</button>').join('')+'</div><div class="answer-actions"><button class="outline-button" data-action="drill-prev">上一题</button><button class="primary-button" data-action="check-drill">提交答案</button><button class="outline-button" data-action="drill-next">下一题 →</button></div><div id="drill-feedback" class="feedback" role="status"></div>';drillSubmitted=false;
}
function checkDrill(){
  const input=$('drill-input');if(!input)return;const w=drillWord(),target=drillMode==='example'?w.ex:w.it,value=input.value.trim(),f=$('drill-feedback');
  if(!value){f.textContent='先听音，再输入答案。';return}
  const good=normalizeStrict(value)===normalizeStrict(target),accent=!good&&normalizeLoose(value)===normalizeLoose(target);
  f.className='feedback '+(good?'correct':accent?'accent-warning':'wrong');f.innerHTML=(good?'✓ 正确。':accent?'需要改正重音符号。':'再练一次。')+'<br><strong lang="it">'+esc(target)+'</strong>';
  if(good){dispatch('drill-correct',{id:w.id,unit:state.unit});renderHome()}drillSubmitted=true;
}
function nextDrill(delta=1){cancelSpeech();if(drillIndex+delta>=drillOrder.length)shuffleDrill(false);else drillIndex=(drillIndex+delta+drillOrder.length)%drillOrder.length;renderDrill()}
function renderGrammar(){
  const lessons=lessonFilter==='all'?LESSONS:unitLessons();if(!lessons.some(l=>l.id===currentLesson))currentLesson=lessons[0].id;
  $('lesson-count').textContent=lessons.length;$$('.mode-tab[data-lesson-filter]').forEach(b=>b.classList.toggle('active',b.dataset.lessonFilter===lessonFilter));
  $('lesson-grid').innerHTML=lessons.map(l=>'<button class="lesson-card '+(l.id===currentLesson?'active':'')+'" data-lesson="'+l.id+'"><span class="lesson-meta">UNIT '+l.unit+' · 笔记 P.'+l.pages.join('、')+' · '+l.questions.length+' 题</span><h3>'+esc(l.title)+'</h3><p>'+esc(l.summary)+'</p><small class="lesson-result">'+(lessonPassed(l)?'✓ 本课自测全部答对':'讲解 + 表格 + 分项练习')+'</small></button>').join('');renderLesson();
}
function renderTable(t){return'<div class="table-scroll"><table><thead><tr>'+t.headers.map(h=>'<th>'+esc(h)+'</th>').join('')+'</tr></thead><tbody>'+t.rows.map(row=>'<tr>'+row.map(c=>'<td>'+esc(c)+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>'}
function renderLesson(){
  const l=LESSONS.find(l=>l.id===currentLesson),answers=state.quiz[l.id]||{};
  $('lesson-detail').innerHTML='<header class="lesson-header"><p class="eyebrow">笔记 P.'+l.pages.join('、')+'</p><h2>'+esc(l.title)+'</h2><p>'+esc(l.summary)+'</p><button class="text-button" data-action="scroll-quiz">直接去本课自测 ↓</button></header><div class="lesson-body">'+l.sections.map(s=>'<section class="teaching-section"><h3>'+esc(s.title)+'</h3>'+s.text.map(p=>'<p>'+esc(p)+'</p>').join('')+(s.table?renderTable(s.table):'')+s.examples.map(([it,zh])=>'<div class="example-box"><p lang="it">'+esc(it)+' '+soundButton(it,'朗读例句')+'</p><span>'+esc(zh)+'</span></div>').join('')+'</section>').join('')+'</div><section id="lesson-quiz" class="lesson-quiz"><div class="quiz-heading"><div><p class="eyebrow">CHECK YOUR UNDERSTANDING</p><h3>本课自测 · '+l.questions.length+' 个考点</h3><p>每题选择后可改选；交卷查看解析。全部答对后，本课记为完成。</p></div><span id="quiz-score"></span></div><form id="quiz-form">'+l.questions.map((q,i)=>'<fieldset class="quiz-question"><legend><span class="question-topic">'+esc(q.topic)+'</span><strong>'+(i+1)+'. '+esc(q.prompt)+'</strong></legend><div class="quiz-options">'+q.options.map((o,j)=>'<label><input type="radio" name="q'+i+'" value="'+j+'" '+(answers[i]===j?'checked':'')+'><span>'+esc(o)+'</span></label>').join('')+'</div><p class="quiz-feedback" id="q-feedback-'+i+'"></p></fieldset>').join('')+'<div class="answer-actions"><button type="submit" class="primary-button">提交本课自测</button><button type="button" class="outline-button" data-action="retry-quiz">清空并重做</button></div></form></section>';
  $('quiz-form').addEventListener('change',event=>{const i=Number(event.target.name.slice(1));dispatch('quiz-answer',{lesson:l.id,question:i,answer:Number(event.target.value)});if(quizSubmitted.has(l.id))showQuizResults(l);renderHome()});
  $('quiz-form').addEventListener('submit',event=>{event.preventDefault();quizSubmitted.add(l.id);showQuizResults(l);renderHome()});
  if(quizSubmitted.has(l.id)||lessonPassed(l))showQuizResults(l);
}
function showQuizResults(l){
  const answers=state.quiz[l.id]||{};let count=0,answered=0;
  l.questions.forEach((q,i)=>{
    const f=$('q-feedback-'+i),selected=answers[i],correct=selected===q.answer;
    if(selected!==undefined)answered++;if(correct)count++;
    f.className='quiz-feedback '+(correct?'correct':'wrong');
    f.textContent=(correct?'✓ 正确。':selected===undefined?'尚未作答。':'需要修改。')+' 正确答案：'+q.options[q.answer]+'。'+q.explain;
  });
  $('quiz-score').textContent=count+'/'+l.questions.length+' 正确 · '+answered+' 已答';
}
function renderAudit(){
  $('audit-info').innerHTML='<p>'+VOCAB.length+' 个词/句块 · '+LESSONS.length+' 节详细课程 · '+LESSONS.reduce((n,l)=>n+l.questions.length,0)+' 道分项自测</p><ul>'+AUDIT_NOTES.map(s=>'<li>'+esc(s)+'</li>').join('')+'</ul><p>校核参考：'+SOURCE_LINKS.map(([title,url])=>'<a href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">'+esc(title)+'</a>').join(' · ')+'</p>';
}

document.addEventListener('click',event=>{
  const el=event.target.closest('button,a[data-view]');if(!el)return;
  if(el.dataset.view){event.preventDefault();showView(el.dataset.view);return}
  if(el.dataset.speak){speakItalian(el.dataset.speak);return}
  if(el.dataset.unit){selectUnit(el.dataset.unit);window.scrollTo({top:0,behavior:'smooth'});return}
  if(el.dataset.rating!==undefined){rateWord(Number(el.dataset.rating));return}
  if(el.dataset.translation){const id=el.dataset.translation;bankRevealed.has(id)?bankRevealed.delete(id):bankRevealed.add(id);renderWordbank();return}
  if(el.dataset.rapid){const id=el.dataset.rapid;rapidRevealed.has(id)?rapidRevealed.delete(id):rapidRevealed.add(id);renderDrill();return}
  if(el.dataset.mode){setDrill(el.dataset.mode);return}
  if(el.dataset.reviewFilter){reviewFilter=el.dataset.reviewFilter;renderReview();return}
  if(el.dataset.lessonFilter){lessonFilter=el.dataset.lessonFilter;renderGrammar();return}
  if(el.dataset.lesson){cancelSpeech();currentLesson=Number(el.dataset.lesson);renderGrammar();$('lesson-detail').scrollIntoView({behavior:'smooth',block:'start'});return}
  if(el.dataset.accent){const input=$('drill-input');if(input){input.setRangeText(el.dataset.accent,input.selectionStart??input.value.length,input.selectionEnd??input.value.length,'end');input.focus()}return}
  switch(el.dataset.action){
    case'reveal-answer':revealed=!revealed;view==='review'?renderReview():renderVocab();scrollToCurrentCard();break;
    case'restart-vocab':dispatch('session-start',{scope:cardScope(),force:true});revealed=false;renderVocab();autoReadCurrent();scrollToCurrentCard();break;
    case'start-review':reviewActive=true;revealed=false;renderReview();autoReadCurrent();scrollToCurrentCard();break;
    case'sync-now':void ProgressStore.sync();toast('进度已保存在这台设备。');break;
    case'm-export':$('export-progress').click();break;
    case'm-import':$('import-progress').click();break;
    case'cloud-upload':cloudUpload();break;
    case'cloud-pull':cloudPull();break;
    case'copy-sync':copySyncPack();break;
    case'paste-sync':applySyncPack();break;
    case'm-reset':$('reset-progress').click();break;
    case'check-drill':checkDrill();break;case'drill-next':nextDrill();break;case'drill-prev':nextDrill(-1);break;
    case'shuffle-drill':shuffleDrill();break;
    case'rapid-next':if(drillIndex+8>=drillOrder.length)shuffleDrill(false);else drillIndex+=8;rapidRevealed.clear();renderDrill();break;
    case'rapid-prev':drillIndex=Math.max(0,drillIndex-8);rapidRevealed.clear();renderDrill();break;
    case'retry-quiz':dispatch('quiz-reset',{lesson:currentLesson});quizSubmitted.delete(currentLesson);renderGrammar();renderHome();break;
    case'scroll-quiz':$('lesson-quiz').scrollIntoView({behavior:'smooth'});break;
  }
});
['unit-picker','mobile-unit-picker'].forEach(id=>$(id).addEventListener('change',e=>selectUnit(e.target.value)));
$('auto-speak').addEventListener('change',e=>{dispatch('preference',{autoSpeak:e.target.checked});if(state.autoSpeak)autoReadCurrent();else cancelSpeech()});
$('toggle-wordbank').addEventListener('click',()=>{bankOpen=!bankOpen;bankRevealed.clear();renderVocab();renderWordbank();if(bankOpen)$('wordbank-panel').scrollIntoView({behavior:'smooth',block:'start'})});
$('word-search').addEventListener('input',renderWordbank);$('show-audit').addEventListener('click',()=>{$('audit-info').hidden=!$('audit-info').hidden});
$('reset-progress').addEventListener('click',()=>{if(!confirm('清空这台设备上的学习记录？此操作无法撤销，建议先“下载进度备份”。'))return;cancelSpeech();dispatch('reset',{});currentLesson=1;revealed=false;quizSubmitted.clear();render()});
$('export-progress').addEventListener('click',()=>{const blob=new Blob([JSON.stringify(ProgressStore.exportProgress(),null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='pronto-backup-v3.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)});
$('import-progress').addEventListener('change',async e=>{
  const file=e.target.files[0];if(!file)return;
  try{const data=JSON.parse(await file.text()),preview=Learning.normalizeImport(data);if(!confirm('这份备份包含 '+preview.summary.words+' 个词、'+preview.summary.answers+' 个答题记录、'+preview.summary.listening+' 篇听力记录。用它恢复学习进度？'))return;
    const summary=ProgressStore.importProgress(data);state=ProgressStore.state;currentLesson=unit().lessons[0];revealed=false;quizSubmitted.clear();render();toast('已恢复 '+summary.words+' 个词，其中 '+summary.pending+' 个待巩固，复习安排已重建。');
  }catch(error){toast(error.message||'无法识别这份进度文件。现有进度未改变。')}finally{e.target.value=''}
});
document.addEventListener('keydown',event=>{
  if(event.target.matches('input,textarea,select')){if(event.key==='Enter'&&event.target.id==='drill-input'){event.preventDefault();drillSubmitted?nextDrill():checkDrill()}return}
  if(!(view==='vocab'||view==='review'&&reviewActive))return;
  if(/^[1-4]$/.test(event.key)){event.preventDefault();rateWord(Number(event.key)-1)}
  if(event.code==='Space'&&currentWord()){event.preventDefault();revealed=!revealed;view==='review'?renderReview():renderVocab();scrollToCurrentCard()}
  if(event.key.toLowerCase()==='r'&&currentWord())speakItalian(currentWord().it);
});
window.addEventListener('pagehide',cancelSpeech);
document.body.classList.add('loading-progress');renderAudit();ListeningPractice.init({commit:dispatch,stopOther:cancelSpeech});
void ProgressStore.start(update=>{
  state=update.state;renderSaveStatus();
  if(!ready&&update.ready){ready=true;currentLesson=unit().lessons[0];document.body.classList.remove('loading-progress');render();autoReadCurrent()}
  else if(update.remote||Learning.day()!==lastDay){lastDay=Learning.day();render()}
});

/* 跨设备同步：Mac 和手机打开同一网址。云端用 jsonblob.com（免费、无需密钥、支持 CORS），同步码 = blob id；失败时用复制/粘贴同步包。 */
const SYNC_KEY='pronto-sync-id',BLOB='https://jsonblob.com/api/jsonBlob';
function syncId(){return(localStorage.getItem(SYNC_KEY)||'').trim()}
function setSyncId(id){id=(id||'').trim();if(id)localStorage.setItem(SYNC_KEY,id);document.querySelectorAll('.sync-id-input').forEach(i=>i.value=id)}
function readSyncInput(){for(const i of document.querySelectorAll('.sync-id-input'))if(i.value.trim()&&i.value.trim()!==syncId()){setSyncId(i.value);break}return syncId()}
function syncStatus(t){document.querySelectorAll('.sync-status').forEach(e=>e.textContent=t)}
function counts(snap){const s=snap?.snapshot||snap||{};const r=s.ratings||{};return Object.keys(r).length}
function applySnapshot(data,label){
  const preview=Learning.normalizeImport(data);
  if(!confirm(label+'包含 '+preview.summary.words+' 个词、'+preview.summary.answers+' 个答题记录。本机当前约 '+counts({snapshot:ProgressStore.state})+' 个词，将被替换。继续？'))return false;
  const summary=ProgressStore.importProgress(data);state=ProgressStore.state;currentLesson=unit().lessons[0];revealed=false;quizSubmitted.clear();render();toast('已恢复 '+summary.words+' 个词。');return true}
async function cloudUpload(){
  const id=readSyncInput(),body=JSON.stringify(ProgressStore.exportProgress());syncStatus('上传中…');
  try{let r;
    if(id){r=await fetch(BLOB+'/'+encodeURIComponent(id),{method:'PUT',headers:{'Content-Type':'application/json',Accept:'application/json'},body});}
    if(!id||r.status===404){r=await fetch(BLOB,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body});
      const nid=r.headers.get('X-jsonblob-id')||(r.headers.get('Location')||'').split('/').pop();if(!r.ok||!nid)throw new Error('HTTP '+r.status);setSyncId(nid)}
    else if(!r.ok)throw new Error('HTTP '+r.status);
    syncStatus('已上传 '+new Date().toLocaleTimeString()+' · 同步码 '+syncId()+'（在另一台设备填入此码后点“从云端拉取”）');toast('进度已上传云端')
  }catch(e){syncStatus('上传失败（'+e.message+'）。可改用下方“复制同步包”。')}}
async function cloudPull(){
  const id=readSyncInput();if(!id){syncStatus('请先填入同步码（在另一台设备上传后显示）。');return}
  syncStatus('拉取中…');
  try{const r=await fetch(BLOB+'/'+encodeURIComponent(id),{headers:{Accept:'application/json'}});if(!r.ok)throw new Error('HTTP '+r.status);
    const data=await r.json();syncStatus(applySnapshot(data,'云端进度')?'已从云端拉取 '+new Date().toLocaleTimeString():'已取消拉取。')
  }catch(e){syncStatus('拉取失败（'+e.message+'）。可改用“粘贴同步包”。')}}
async function copySyncPack(){
  const text=JSON.stringify(ProgressStore.exportProgress());
  try{await navigator.clipboard.writeText(text);toast('同步包已复制，可粘贴到另一台设备')}catch{toast('无法写入剪贴板，已下载文件')}
  const url=URL.createObjectURL(new Blob([text],{type:'application/json'})),a=document.createElement('a');a.href=url;a.download='pronto-sync.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
function applySyncPack(){
  const ta=[...document.querySelectorAll('.sync-paste')].find(t=>t.value.trim());if(!ta){toast('请先粘贴同步包');return}
  try{if(applySnapshot(JSON.parse(ta.value),'同步包'))ta.value=''}catch(e){toast(e.message||'无法识别同步包')}}
setSyncId(syncId());

const UNITS = [
  {id:1,title:'发音与自我介绍',pages:[1,2],focus:'字母读音、姓名、国籍和年龄',lessons:[1,2]},
  {id:2,title:'提问、名词与冠词',pages:[2,3,6,18],focus:'问什么、阴阳性、单复数、il/lo/la 与 un/uno/una',lessons:[3,4,5]},
  {id:3,title:'现在时与日常动作',pages:[4,5,8,13,16],focus:'三类动词、-isc-、不规则变位和 a + 不定式',lessons:[6,7,8]},
  {id:4,title:'描述人物、物品与颜色',pages:[7,8,9,15],focus:'形容词配合、颜色、常见名词',lessons:[9]},
  {id:5,title:'城市、地点与介词',pages:[9,11,13],focus:'a/in/da/di、地点搭配、全部缩合介词',lessons:[10,11]},
  {id:6,title:'吃喝、点单与喜好',pages:[10,11,12],focus:'点餐、程度、piacere 与 mancare',lessons:[12,13]},
  {id:7,title:'购物、物主与数量',pages:[13,14,15],focus:'商店、所有格、部分冠词与地点 ci',lessons:[14,15]},
  {id:8,title:'想、能、必须与“有”',pages:[16],focus:'情态动词、sapere、c’è/ci sono',lessons:[16,17]},
  {id:9,title:'问路与交通出行',pages:[17,18],focus:'方向、方位、车站和乘坐交通工具',lessons:[18]},
  {id:10,title:'家居、数字与钟点',pages:[19,20,28],focus:'房间家具、基数序数、几点与时间区间',lessons:[19,20]},
  {id:11,title:'酒店与住宿',pages:[19,21],focus:'预订、房型、设施和报告故障',lessons:[21]},
  {id:12,title:'爱好、频率与反身动作',pages:[22,23],focus:'运动爱好、总是/从不、起床洗漱',lessons:[22,23]},
  {id:13,title:'过去发生了什么',pages:[5,23,24],focus:'passato prossimo、助动词与分词配合',lessons:[24,25]},
  {id:14,title:'将来计划',pages:[5],focus:'andrò/sarò/avrò 全部人称变位',lessons:[26]},
  {id:15,title:'天气、日期与节日',pages:[26],focus:'天气句型、月份、季节和日历',lessons:[27]},
  {id:16,title:'家庭、代词与写信',pages:[13,27,28],focus:'家庭关系、直接宾语代词、来源与书信',lessons:[28,29,30]},
  {id:17,title:'阅读与课堂扩展词',pages:[15,25,29],focus:'连接词、常见近义词和阅读表达',lessons:[31]}
];
function shareWords(unit, ids) {
  ids.forEach(id=>{
    const w=vocabularyIndex.get(id.toLowerCase().replace(/’/g,"'"));
    if(!w) throw new Error('未找到单元词：'+id);
    if(!w.units.includes(unit)) w.units.push(unit);
  });
}
shareWords(1,['ciao','come stai?','e tu?','cinese','anno','oggi','domani','grazie','per favore','amico','amica']);
shareWords(3,['capire','finire','pulire','preferire','costruire','spedire','dire','bere','dare','venire','uscire','comprare','vendere']);
shareWords(5,['casa','biblioteca','scuola','città','farmacia','museo','parco','lago']);
shareWords(6,['caffè','pane','pasta','pizza','sale','zucchero','acqua','vino','colazione','pranzo','cena','buono','bicchiere','piatto']);
shareWords(7,['amica','amico','libro','casa','farmacia','negozio','cappello','marmellata','torta','gelato']);
shareWords(8,['potere','volere','dovere','sapere','uscire','dire','bere','dare','venire','avere','essere']);
shareWords(9,['stazione','aeroporto','macchina','bicicletta','viaggio','parco','centro','a piedi']);
shareWords(10,['casa','camera','cucina','bagno','letto','sedia','tavolo','porta','finestra','armadio','libreria','lampada','specchio','luce','orologio','tazza','bicchiere','piatto']);
shareWords(11,['camera','bagno','letto','armadio','lampada','ascensore','senza','mancare','c’è','ci sono','caro','comodo']);
shareWords(12,['dormire','fare','camminare','nuotare','sciare','cantare','ballare','giocare','suonare','chitarra','mattina','sera']);
shareWords(13,['andare','essere','avere','stare','mangiare','leggere','scrivere','fare','dire','prendere','vedere','aprire','chiudere','bere','venire','lavarsi','ieri','due anni fa']);
shareWords(14,['andare','essere','avere','domani','dopodomani','anno','prossimo']);
shareWords(15,['freddo','caldo','sole','neve','oggi','domani','ieri','mattina','pomeriggio','sera','notte','giorno','settimana','anno','lunedì','martedì','mercoledì','giovedì','venerdì','sabato','domenica']);
shareWords(16,['madre','padre','fratello','sorella','nonna','zio','mio','mia','miei','mie','tuo','suo','nostro','vostro','loro','scrivere','ricevere','lettera','felice']);
shareWords(17,['ma','però','tuttavia','eppure','invece','insomma','conoscere','sapere','mancare']);
UNITS.find(u=>u.id===1).lessons.push(33);
UNITS.find(u=>u.id===6).lessons.push(32);
const pastLesson=LESSONS.find(l=>l.id===25);
pastLesson.sections.push(section('5. 笔记第 5 页的六人称过去时对照','斜杠表示按性别选择。noi/voi/loro 为全女性时选 -e，其余常用 -i。avere 一列的 avuto 不跟普通主语性数变化。',conjugation(['andare','essere / stare','avere'],['sono andato/a,sei andato/a,è andato/a,siamo andati/e,siete andati/e,sono andati/e','sono stato/a,sei stato/a,è stato/a,siamo stati/e,siete stati/e,sono stati/e','ho avuto,hai avuto,ha avuto,abbiamo avuto,avete avuto,hanno avuto'])));
pastLesson.questions.push(question('完整变位','“你们去过”（全女性）选？',['siete andate','siamo andate','avete andate'],0,'voi 的助动词是 siete；全女性复数分词 andate。'),question('完整变位','“他们曾有过”选？',['sono avuti','hanno avuto','hanno avuti'],1,'avere 的过去时为 hanno avuto，普通用法不跟主语变 avuti。'),question('完整变位','“你曾在”（女性）选？',['sei stata','hai stata','sono stata'],0,'tu 对应 sei，女性分词 stata。'));
const directionsLesson=LESSONS.find(l=>l.id===18);
directionsLesson.sections.push(section('5. 问有多少站，要把问题补完整','Quante fermate sono fino alla stazione? = 到车站有几站？笔记中的 sono fino a… 需要放回这个完整问句理解；单独 Sono fino alla stazione 并不能自然地表示“到车站有几站”。Scendo alla prossima fermata 是“我在下一站下车”，不是指令“请您下车”。'));
LESSONS.sort((a,b)=>a.id-b.id);
const SOURCE_LINKS=[
  ['冠词规则','https://www.treccani.it/enciclopedia/articolo_(Enciclopedia-dell%27Italiano)/'],
  ['复数 -cia/-gia 与重读 i','https://www.treccani.it/enciclopedia/cia-gia-scia-plurale-dei-nomi-in_(La-grammatica-italiana)/'],
  ['物主词与亲属冠词','https://www.treccani.it/enciclopedia/aggettivi-e-pronomi-possessivi_(Enciclopedia-dell%27Italiano)/'],
  ['piacere 词义与变位','https://www.treccani.it/vocabolario/piacere/'],
  ['近过去时与助动词','https://www.treccani.it/enciclopedia/indicativo-passato-prossimo_(La-grammatica-italiana)/'],
  ['动词助动词的选择','https://www.treccani.it/enciclopedia/verbi-ausiliari_(Enciclopedia-dell%27Italiano)/'],
  ['将来时的用法','https://www.treccani.it/enciclopedia/indicativo-futuro-semplice_(La-grammatica-italiana)/'],
  ['序数词拼写','https://www.treccani.it/enciclopedia/aggettivi-numerali-ordinali_(La-grammatica-italiana)/'],
  ['直接/间接宾语区别','https://accademiadellacrusca.it/it/consulenza/emloem-emgliem-emliem-emloroem-un-sistema-pronominale-non-facile-da-usare/1045'],
  ['前置宾语与过去分词配合','https://pressbooks.uiowa.edu/piacere/chapter/accordo-del-participio-passato/'],
  ['esibire 与 esibirsi','https://www.treccani.it/vocabolario/esibire/'],
  ['-issimo 绝对最高级','https://www.treccani.it/vocabolario/issimo/'],
  ['最高级与特殊形式','https://int-aulalingue.scuola.zanichelli.it/benvenuti/2010/05/20/il-superlativo-degli-aggettivi-qualificativi/']
];
const AUDIT_NOTES=[
  '新增 193 张词卡的词根/构词/词族记忆；历史词源与现代构词分开标记，不能按字母相似度猜词源。',
  '听力练习录入所给 Word 中的 5 篇、60 句校订稿；独立音频已本机合成，原稿、全部改动和不确定修复可逐篇查看。',
  '已逐页核对 29 页笔记。词汇按词或句块录入；重复词合并来源；常规复数和变位在词条说明或语法表中展开，并非每种词尾单独占一张卡。',
  '补齐初版遗漏的将来时、-isc-、冠词、形容词配合、缩合介词、部分冠词、piacere/mancare、频率、天气、数字、家庭和书信内容。',
  '本轮复核另补 -issimo 的四种配合、完整国籍变化表、礼貌接话、笔记第 5 页六人称过去时对照；语法课堂可切换“全部语法课程”，查看跨单元完整目录。',
  '修正旧版 hotto→rotto、esercito→estero、sbagliare/sfogliare 混淆、vestirsi 第三人称、洗衣机/洗碗机、tazza di caffè；移除把拼写伪装成音标的显示。',
  '明确例外：移动不等于一律用 essere；farmacìa 的 i 重读所以复数 farmacìe；亲属冠词需看单复数和 loro；mancare 的主语是被想念的人或事物。',
  '例句和自测为配合笔记知识点重新编写，不声称全部逐字出自笔记；发音由设备上的意大利语语音合成提供。'
];

const LEGACY_WORD_IDS = ["ciao","grazie","per favore","scusi","buongiorno","arrivederci","mi chiamo","sono","cinese","italiano","studente","studentessa","dove","quando","perché","come","chi","quanto","quale","oggi","domani","ieri","anno","mangiare","bere","leggere","dormire","andare","stare","fare","avere","essere","volere","potere","dovere","sapere","venire","dire","dare","caffè","pizza","panino","gelato","pasta","acqua","vino","colazione","pranzo","cena","buono","molto","troppo","poco","piacere","mancare","casa","camera","cucina","bagno","letto","tavolo","sedia","porta","finestra","stazione","aeroporto","treno","autobus","biglietto","fermata","viaggio","strada","destra","sinistra","dritto","vicino","davanti","dietro","albergo","prenotare","valigia","passaporto","famiglia","madre","padre","fratello","sorella","amico","amica","mattina","pomeriggio","sera","notte","lunedì","sabato","mese","gennaio","estate","inverno","sole","pioggia","freddo","caldo","nuvola","sport","passeggiare","suonare","sempre","spesso","mai","lavorare","studiare","comprare","vendere","aprire","chiudere","aspettare","cercare","trovare","conoscere","capire","chiedere","rispondere","finire","partire","tornare","rimanere","disponibile","impegno","gratis","bisogno","penna","prima","bocca","bene","bravo","fine","faro","vero","viola","venerdì","mano","quadro","quindi","quasi","cono","cuore","anche","gatto","gonna","gusto","giorno","fungo","testa","tonno","dente","dito","domenica","lingua","luce","nero","nonna","neve","rosso","ramo","ritardo","serpente","zaino","zucchero","zio","lunga","koala","tedesco","francese","marocchino","rumeno","russo","greco","vivere","abitare","cane","parete","fotocamera","motocicletta","cellulare","quaderno","martedì","mercoledì","giovedì","dopo","poi","presto","tardi","settimana","indossare","continuare","imparare","insegnare","abituarsi","riuscire","provare","futuro","passato","elegante","bello","brutto","alto","basso","cattivo","antipatico","vuoto","pieno","lento","vecchio","nuovo","rapido","piccolo","grande","difficile","facile","interessante","intelligente","gentile","veloce","triste","giovane","felice","forte","elefante","domanda","filosofia","telefono","indirizzo","nazione","data","nome","borsa","aula","professore","cantante","discorso","persona","orologio","bottiglia","banco","ragazzo","ragazza","domandare","parlare","amare","arrivare","ballare","cucinare","guardare","scrivere","vedere","mettere","prendere","salire","cantare","cadere","volare","uscire","piangere","ridere","adorare","sciare","correre","piovere","viaggiare","benedire","riempire","nuotare","luogo","mare","pesce","succo","cereali","limone","marmellata","cornetto","piatto","coltello","bicchiere","forchetta","apribottiglia","cucchiaio","tovaglia","tovagliolo","fagiolini","patatine fritte","insalata","torta","crema","uovo","olio","burro","sale","carne","mezzo","ecco","negozio","frutta","verdura","farmacia","libreria","edicola","enoteca","palestra","cartoleria","pescheria","pasticceria","gelateria","ipermercato","panificio","macelleria","ferramenta","ospedale","ufficio","centro","periferia","spiaggia","montagna","campagna","chiesa","ambasciata","tasca","cinema","teatro","scuola","università","bar","in","a","da","di","su","con","per","tra","fra","giallo","bianco","grigio","azzurro","verde","marrone","arancione","blu","beige","rosa","male","compito","così","molti","papà","hotel","asciugamano","coperta","cuscino","termosifone","armadio","lampada","ascensore","prenotazione","camera doppia","singola","matrimoniale","parcheggio","hotto","non c'è","non funziona","aria condizionata","giocare","ginnastica","pallacanestro","pallavolo","calcio","raramente","di solito","ogni tanto","quasi mai","generalmente","alzarsi","svegliarsi","lavarsi","addormentarsi","vestirsi","allenarsi","pettinarsi","rilassarsi","divertirsi","truccarsi","spogliarsi","mettersi","laurearsi","iscriversi","parcheggiare","sbagliare","spiegare","regalare","incontrare","dimenticare","formare","cominciare","guidare","credere","perdere","ricevere","ancora","assonnato","affrontare","seguire","chiacchierare","pranzare","tarda","rilassato","verso","pronto","intensivo","principiante","commessa","notare","fuori","migliorare","diventare","improvviso","infatti","succedere","saltato","spingere","accomodarsi","ritardare","invece","almeno","fisicamente","maggiore","difetto","iniziare","rimasto","intero","mondo","stesso","posto","già","inquinante","complesso","metropolitana","fretta","adagio","circa","giurisprudenza","percorso","sposare","insieme","attualmente","dirigere","frequentare","esercito","tariffa","migliore","accogliere","richiedere","cameriere","facoltà","liceo","peggio","malato"];

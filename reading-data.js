/* 阅读板块数据：每单元 3 篇原创分级短文（逐句中译、重点词、理解题）+ 12–14 句实用句。
   内容为本应用原创编写，主题参考 CILS/CELI A2 常见话题（自我介绍、城市、饮食、购物、出行、住宿、爱好、过去经历、计划、节日、家庭、留学），未摘录任何教材原文。
   结构：{unit, key:[[意,中]], texts:[{id,title,zh,kind,level,s:[[意,中]],g:[[词,释义]],q:[[题干,中文提示,[选项],答案序号,解析]]}]} */
const READING=[];
READING.push({unit:1,key:[
["Come ti chiami? — Mi chiamo Anna.","你叫什么名字？——我叫安娜。"],
["Come si chiama Lei?","您叫什么名字？（正式）"],
["Di dove sei? — Sono di Hangzhou, in Cina.","你是哪里人？——我是中国杭州人。"],
["Quanti anni hai? — Ho venticinque anni.","你多大了？——我二十五岁。"],
["Che lavoro fai? — Sono studente.","你做什么工作？——我是学生。"],
["Come si scrive il tuo cognome?","你的姓怎么拼写？"],
["Puoi ripetere più piano, per favore?","你能说慢一点再重复一遍吗？"],
["Piacere di conoscerti!","很高兴认识你！"],
["Ti presento il mio amico Luca.","给你介绍一下我的朋友卢卡。"],
["Parlo un po' d'italiano, ma non molto bene.","我会说一点意大利语，但说得不太好。"],
["Abito a Milano da due anni.","我在米兰住了两年了（现在仍住）。"],
["Scusi, come si dice «grazie» in cinese?","请问，“grazie”用中文怎么说？"],
["Come si pronuncia questa parola?","这个词怎么发音？"],
["Ci vediamo domani! Buona serata!","明天见！晚上愉快！"]
],texts:[
{id:'u1-corso',title:'Il primo giorno di corso',zh:'语言课第一天',kind:'对话',level:'A1',s:[
["Buongiorno a tutti! Io sono Paola, la vostra insegnante.","大家早上好！我是保拉，你们的老师。"],
["Come vi chiamate?","你们都叫什么名字？"],
["Ciao, mi chiamo Lin. Sono cinese, di Shanghai.","你好，我叫林。我是中国人，来自上海。"],
["Piacere, Lin! Quanti anni hai?","很高兴认识你，林！你多大了？"],
["Ho ventitré anni e studio all'università.","我二十三岁，在读大学。"],
["E tu, come ti chiami?","那你呢，你叫什么？"],
["Mi chiamo Marco. Sono italiano, di Bologna, ma abito a Milano.","我叫马可。我是意大利人，博洛尼亚的，不过住在米兰。"],
["Ho trentun anni e sono ingegnere.","我三十一岁，是工程师。"],
["Lin, parli già un po' d'italiano?","林，你已经会说一点意大利语了吗？"],
["Sì, un po'. Studio l'italiano da tre mesi.","是的，会一点。我学意大利语三个月了。"],
["Brava! E perché studi l'italiano?","真棒！那你为什么学意大利语？"],
["Perché l'anno prossimo vado a studiare a Firenze.","因为明年我要去佛罗伦萨读书。"],
["Che bello! Benvenuti al corso!","太好了！欢迎大家来上课！"]
],g:[["insegnante","老师（阴阳同形）"],["abitare a + 城市","住在某城市"],["già","已经"],["da tre mesi","已经三个月（持续到现在，用现在时）"],["l'anno prossimo","明年"]],q:[
["Di dove è Lin?","林是哪里人？",["Di Bologna","Di Shanghai","Di Firenze"],1,"Lin 说 Sono cinese, di Shanghai。"],
["Dove abita Marco?","马可住在哪里？",["A Bologna","A Firenze","A Milano"],2,"Marco 是博洛尼亚人（di Bologna），但 abito a Milano 住在米兰。"],
["Quanti anni ha Marco?","马可多大？",["23","31","13"],1,"trentun anni = 31 岁。trentuno 在 anni 前去掉 o。"],
["Perché Lin studia l'italiano?","林为什么学意大利语？",["Perché lavora in Italia","Perché ha un ragazzo italiano","Perché va a studiare a Firenze"],2,"Perché l'anno prossimo vado a studiare a Firenze。"]
]},
{id:'u1-profilo',title:'Mi presento!',zh:'我的自我介绍（社交主页）',kind:'个人简介',level:'A1+',s:[
["Ciao a tutti! Mi chiamo Wang Hao, ma gli amici mi chiamano Hao.","大家好！我叫王浩，不过朋友们都叫我浩。"],
["Sono cinese e ho ventisei anni.","我是中国人，二十六岁。"],
["Sono di Chengdu, una città famosa per il cibo piccante e per i panda.","我来自成都，一座以辣味美食和熊猫闻名的城市。"],
["Adesso abito a Roma con due coinquilini: una ragazza spagnola e un ragazzo tedesco.","现在我和两个室友住在罗马：一个西班牙女孩和一个德国男孩。"],
["Lavoro in un ristorante vicino alla stazione Termini.","我在特米尼火车站附近的一家餐馆工作。"],
["La sera frequento un corso d'italiano, perché voglio parlare bene con i clienti.","晚上我上意大利语课，因为我想和顾客好好交流。"],
["Parlo cinese, inglese e un po' d'italiano.","我会说中文、英语和一点意大利语。"],
["L'italiano è una lingua bellissima, ma per me la «r» è difficile!","意大利语是一门很美的语言，但对我来说颤音 r 很难！"],
["Cerco un amico italiano per fare uno scambio linguistico: io insegno il cinese e lui mi insegna l'italiano.","我在找一个意大利朋友做语言交换：我教中文，他教我意大利语。"],
["Scrivetemi in privato. A presto!","请私信我。回头见！"]
],g:[["coinquilino/a","室友"],["frequentare un corso","上（某门）课"],["cliente","顾客"],["scambio linguistico","语言交换"],["piccante","辣的"]],q:[
["Con chi abita Hao?","浩和谁一起住？",["Con la sua famiglia","Con due coinquilini","Da solo"],1,"con due coinquilini：一个西班牙女孩和一个德国男孩。"],
["Dove lavora Hao?","浩在哪里工作？",["In un ristorante","In una scuola","Alla stazione"],0,"Lavoro in un ristorante vicino alla stazione：在车站附近的餐馆，不是在车站。"],
["Che cosa è difficile per Hao?","对浩来说什么难？",["La grammatica","La lettera «r»","Parlare inglese"],1,"per me la «r» è difficile。"],
["Che cosa cerca Hao?","浩在找什么？",["Un nuovo lavoro","Una casa","Un amico per uno scambio linguistico"],2,"Cerco un amico italiano per fare uno scambio linguistico。"]
]},
{id:'u1-saluti',title:'Tu o Lei?',zh:'用 tu 还是 Lei？',kind:'短对话',level:'A1',s:[
["Buonasera, signor Conti! Come sta?","晚上好，孔蒂先生！您好吗？"],
["Bene, grazie. E Lei, signora?","很好，谢谢。您呢，女士？"],
["Non c'è male, grazie.","还不错，谢谢。"],
["Ciao, Giulia! Come stai?","你好，朱莉娅！你好吗？"],
["Così così, sono un po' stanca. E tu?","一般般，我有点累。你呢？"],
["Benissimo! Giulia, ti presento la mia amica Mei.","特别好！朱莉娅，给你介绍我的朋友美。"],
["Piacere, Mei! Come si scrive il tuo nome?","你好，美！你的名字怎么拼？"],
["Emme, e, i. È facile!","M-E-I。很简单！"],
["Con le persone che non conosciamo usiamo «Lei»; con gli amici usiamo «tu».","对不认识的人我们用“Lei（您）”；对朋友用“tu（你）”。"]
],g:[["Come sta? / Come stai?","您好吗？/ 你好吗？"],["non c'è male","还不错"],["così così","马马虎虎"],["stanco/stanca","累的"]],q:[
["Come sta il signor Conti?","孔蒂先生怎么样？",["Bene","Male","È stanco"],0,"他回答 Bene, grazie。"],
["Chi è stanca?","谁累了？",["Mei","La signora","Giulia"],2,"Giulia 说 sono un po' stanca。"],
["Con un professore che non conosci, che cosa dici?","对不认识的老师你该说？",["Come stai?","Come sta?","Ciao, come va?"],1,"对不熟悉的人用 Lei，动词用第三人称单数：Come sta?"]
]}
]});

READING.push({unit:2,key:[
["Che cos'è questo? — È un quaderno.","这是什么？——是一个本子。"],
["Chi è quel ragazzo? — È il fratello di Marta.","那个男孩是谁？——是玛尔塔的兄弟。"],
["Dove sono le chiavi?","钥匙在哪里？"],
["Quando comincia la lezione?","课什么时候开始？"],
["Perché sei stanco? — Perché lavoro troppo.","你为什么累？——因为我工作太多。"],
["Quanto costa lo zaino?","这个背包多少钱？"],
["Quale libro preferisci?","你更喜欢哪本书？"],
["Com'è la tua città?","你的城市怎么样？"],
["Ho un'amica italiana e uno zio in Spagna.","我有一个意大利女性朋友，还有一个叔叔在西班牙。"],
["Gli studenti sono in aula.","学生们在教室里。"],
["Le città italiane sono molto belle.","意大利的城市非常美。"],
["Mi presti una penna, per favore?","能借我一支笔吗？"],
["Qual è il tuo numero di telefono?","你的电话号码是多少？"]
],texts:[
{id:'u2-aula',title:'La mia aula',zh:'我的教室',kind:'描写',level:'A1+',s:[
["La mia scuola di lingue è in centro, vicino al Duomo.","我的语言学校在市中心，大教堂附近。"],
["La nostra aula è piccola ma luminosa.","我们的教室很小但很亮。"],
["C'è una lavagna grande e ci sono dodici sedie.","有一块大黑板和十二把椅子。"],
["Sul tavolo dell'insegnante ci sono un computer, un dizionario e una tazza di caffè.","老师的桌子上有一台电脑、一本词典和一杯咖啡。"],
["Nello zaino ho sempre un quaderno, due penne, una matita e lo smartphone.","我的背包里总有一个本子、两支笔、一支铅笔和手机。"],
["Il libro d'italiano è nuovo e costa trenta euro.","意大利语课本是新的，三十欧元。"],
["Gli studenti sono simpatici: ci sono due ragazze giapponesi, uno studente americano e un signore brasiliano.","同学们都很友好：有两个日本女孩、一个美国学生和一位巴西先生。"],
["La lezione comincia alle nove e finisce a mezzogiorno.","课九点开始，中午十二点结束。"],
["Durante la pausa andiamo al bar e prendiamo un caffè insieme.","课间休息我们一起去咖啡馆喝咖啡。"],
["Io prendo sempre un cappuccino e una brioche.","我总是点一杯卡布奇诺和一个牛角包。"]
],g:[["aula","教室"],["luminoso/a","明亮的"],["lavagna","黑板"],["zaino","背包（z 开头，用 lo）"],["pausa","休息"]],q:[
["Quante sedie ci sono nell'aula?","教室里有几把椅子？",["Dieci","Dodici","Due"],1,"ci sono dodici sedie。"],
["Perché si dice «lo zaino» e non «il zaino»?","为什么说 lo zaino 而不是 il zaino？",["Perché è femminile","Perché comincia con z","Perché è plurale"],1,"以 z、s+辅音、gn、ps、x、y 开头的阳性名词用 lo / uno。"],
["Chi c'è in classe?","班上有谁？",["Solo studenti giapponesi","Studenti di diversi paesi","Solo italiani"],1,"日本、美国、巴西的同学都有。"],
["A che ora finisce la lezione?","课几点结束？",["Alle nove","All'una","A mezzogiorno"],2,"finisce a mezzogiorno。"]
]},
{id:'u2-segreteria',title:'In segreteria',zh:'在学校前台咨询',kind:'对话',level:'A2',s:[
["Buongiorno, posso fare una domanda?","您好，我可以问个问题吗？"],
["Certo, mi dica.","当然，请说。"],
["Quando comincia il corso di livello A2?","A2 级别的课程什么时候开始？"],
["Lunedì prossimo, il tre marzo.","下周一，三月三日。"],
["Quanto costa?","多少钱？"],
["Duecentoquaranta euro per quattro settimane.","四周两百四十欧元。"],
["Qual è l'orario?","上课时间是？"],
["Dal lunedì al giovedì, dalle sei alle otto di sera.","周一到周四，晚上六点到八点。"],
["Chi è l'insegnante?","老师是谁？"],
["La professoressa Ferri. È molto brava e paziente.","费里老师。她非常好，很有耐心。"],
["Perché il corso è di sera?","为什么课在晚上？"],
["Perché molti studenti lavorano durante il giorno.","因为很多学生白天要上班。"],
["Come posso pagare?","我怎么付款？"],
["Con la carta o in contanti, come preferisce.","刷卡或现金，随您。"],
["Va bene, allora mi iscrivo. Grazie mille!","好的，那我报名。非常感谢！"]
],g:[["mi dica","请讲（对 Lei 的命令式）"],["orario","时间表"],["paziente","有耐心的"],["in contanti","用现金"],["iscriversi","报名、注册"]],q:[
["Quanto costa il corso?","课程多少钱？",["240 euro","24 euro","420 euro"],0,"Duecentoquaranta = 240。"],
["In quali giorni c'è lezione?","哪几天上课？",["Ogni giorno","Dal lunedì al giovedì","Solo il sabato"],1,"Dal lunedì al giovedì。"],
["Perché il corso è di sera?","为什么课在晚上？",["Perché l'insegnante lavora","Perché è più economico","Perché molti studenti lavorano di giorno"],2,"molti studenti lavorano durante il giorno。"],
["Com'è la professoressa Ferri?","费里老师怎么样？",["Severa","Brava e paziente","Giovane e timida"],1,"È molto brava e paziente。"]
]},
{id:'u2-indovinelli',title:"Indovina che cos'è!",zh:'猜猜是什么',kind:'谜语',level:'A1+',s:[
["Primo indovinello: è un oggetto e ha molte pagine e tante parole.","第一个谜语：它是一件物品，有很多页和很多词。"],
["Gli studenti lo usano quando non capiscono una parola. Che cos'è?","学生们不懂某个词时就用它。它是什么？"],
["Secondo indovinello: è un animale piccolo, ha i baffi e dice «miao».","第二个谜语：是一种小动物，有胡须，会叫“喵”。"],
["Terzo indovinello: è un luogo con migliaia di libri, ma i libri non sono in vendita.","第三个谜语：这是一个有成千上万本书的地方，但书不卖。"],
["Qui le persone leggono in silenzio e prendono i libri in prestito.","人们在这里安静地看书，还可以借书。"],
["Quarto indovinello: è una bevanda nera e forte; molti italiani la bevono al bar, in piedi.","第四个谜语：是一种又黑又浓的饮料；很多意大利人在咖啡馆站着喝。"]
],g:[["indovinello","谜语"],["i baffi","胡须"],["in vendita","出售中"],["prendere in prestito","借（入）"],["bevanda","饮料"]],q:[
["La soluzione del primo indovinello è…","第一个谜底是…",["il dizionario","la lavagna","il telefono"],0,"有很多词、不懂单词时用 → il dizionario。"],
["La soluzione del terzo indovinello è…","第三个谜底是…",["la libreria","la biblioteca","la scuola"],1,"书不卖、可借 → la biblioteca 图书馆。注意 libreria 是书店（可以买书）。"],
["La soluzione del quarto indovinello è…","第四个谜底是…",["il vino","il tè","il caffè"],2,"黑、浓、在吧台站着喝 → il caffè（espresso）。"]
]}
]});

READING.push({unit:3,key:[
["Di solito faccio colazione al bar.","我通常在咖啡馆吃早饭。"],
["Finisco di lavorare alle sei.","我六点下班。"],
["Capisci l'inglese? — Sì, ma preferisco parlare italiano.","你懂英语吗？——懂，但我更喜欢说意大利语。"],
["Che cosa fai stasera? — Esco con i colleghi.","你今晚干什么？——我和同事出去。"],
["Vieni al cinema con noi?","你和我们一起去看电影吗？"],
["Non bevo il caffè dopo le cinque.","五点以后我不喝咖啡。"],
["Mi dai il tuo numero di telefono?","你能给我你的电话号码吗？"],
["Che cosa dici? Non sento bene.","你说什么？我听不清。"],
["Vado a lezione a piedi.","我走路去上课。"],
["Comincio a studiare alle otto.","我八点开始学习。"],
["Spedisco un pacco a mia sorella.","我给妹妹寄一个包裹。"],
["Puliamo la casa il sabato mattina.","我们每周六上午打扫房子。"],
["I miei amici vanno a ballare il venerdì.","我的朋友们周五去跳舞。"]
],texts:[
{id:'u3-chiara',title:'La giornata di Chiara',zh:'基娅拉的一天',kind:'叙述',level:'A1+',s:[
["Chiara ha ventotto anni e lavora in una farmacia a Torino.","基娅拉二十八岁，在都灵的一家药店工作。"],
["La sua sveglia suona ogni mattina alle sei e mezza.","她的闹钟每天早上六点半响。"],
["Fa colazione in fretta: beve un caffè e mangia due biscotti.","她匆匆吃早饭：喝一杯咖啡，吃两块饼干。"],
["Esce di casa alle sette e mezza e prende l'autobus numero 15.","她七点半出门，坐15路公交。"],
["Lavora fino all'una, poi pranza con una collega in un piccolo bar.","她工作到一点，然后和一位同事在一家小咖啡馆吃午饭。"],
["Il pomeriggio finisce di lavorare alle sei.","下午六点她下班。"],
["Due volte alla settimana va in palestra; gli altri giorni torna a casa e legge un libro.","她每周去两次健身房；其他日子就回家看书。"],
["La sera cucina qualcosa di semplice, di solito pasta o una minestra.","晚上她做点简单的，通常是意面或汤。"],
["Dopo cena telefona a sua madre, che abita in Sicilia.","晚饭后她给住在西西里的妈妈打电话。"],
["Chiara preferisce andare a letto presto, perché il giorno dopo ricomincia tutto.","基娅拉喜欢早睡，因为第二天一切又重新开始。"],
["Il sabato, invece, dorme fino a tardi ed esce con gli amici.","而周六她会睡到很晚，然后和朋友出去。"]
],g:[["sveglia","闹钟"],["in fretta","匆忙地"],["collega","同事"],["preferire (-isc-)","更喜欢：preferisco, preferisci, preferisce…"],["ed","e 在元音前可写成 ed"]],q:[
["Come va al lavoro Chiara?","基娅拉怎么去上班？",["In macchina","In autobus","A piedi"],1,"prende l'autobus numero 15。"],
["Con chi pranza?","她和谁吃午饭？",["Con sua madre","Da sola","Con una collega"],2,"pranza con una collega。"],
["Che cosa fa dopo cena?","晚饭后她做什么？",["Telefona a sua madre","Va in palestra","Esce con gli amici"],0,"Dopo cena telefona a sua madre。"],
["Che cosa fa il sabato?","她周六做什么？",["Lavora in farmacia","Dorme fino a tardi ed esce","Va in Sicilia"],1,"Il sabato… dorme fino a tardi ed esce con gli amici。"]
]},
{id:'u3-bologna',title:'Una nuova vita a Bologna',zh:'在博洛尼亚的新生活（邮件）',kind:'邮件',level:'A2',s:[
["Cara Elena, come stai? Io sto bene, finalmente!","亲爱的埃莱娜，你好吗？我终于过得不错了！"],
["Ti scrivo da Bologna: da settembre studio qui all'università.","我在博洛尼亚给你写信：从九月起我在这里上大学。"],
["Abito in un appartamento con tre studentesse: Sofia, Bea e Yuki.","我和三个女学生合住一套公寓：索菲亚、贝娅和由纪。"],
["La mattina vado a lezione in bicicletta, perché la città non è grande.","早上我骑自行车去上课，因为城市不大。"],
["Capisco quasi tutto quando i professori parlano piano, ma quando parlano veloce è un disastro!","教授说慢的时候我几乎都懂，但说快了就是一场灾难！"],
["Il pomeriggio studio in biblioteca o faccio un corso di cucina con Yuki.","下午我在图书馆学习，或者和由纪去上烹饪课。"],
["Il venerdì sera usciamo tutte insieme e beviamo qualcosa in Piazza Santo Stefano.","周五晚上我们一起出去，在圣斯特凡诺广场喝点东西。"],
["Qui dicono che Bologna è «la dotta, la grassa e la rossa».","这里人说博洛尼亚是“博学的、肥美的、红色的”。"],
["Dotta per l'università, grassa per il cibo e rossa per il colore dei tetti.","博学是因为大学，肥美是因为美食，红色是因为屋顶的颜色。"],
["E tu? Che cosa fai di bello? Quando vieni a trovarmi?","你呢？最近在忙什么好玩的？什么时候来看我？"],
["Ti aspetto! Un abbraccio, Giulia","我等你！拥抱你，朱莉娅"]
],g:[["finalmente","终于"],["piano / veloce","慢 / 快"],["dotto/a","博学的"],["venire a trovare qualcuno","来看望某人"],["un abbraccio","拥抱（信尾常用）"]],q:[
["Come va a lezione Giulia?","朱莉娅怎么去上课？",["In autobus","In bicicletta","In metro"],1,"vado a lezione in bicicletta。"],
["Quando ha problemi a capire?","她什么时候听不懂？",["Quando i professori parlano veloce","Quando legge","Quando studia in biblioteca"],0,"quando parlano veloce è un disastro。"],
["Perché Bologna è «la grassa»?","为什么博洛尼亚被称为“肥美的”？",["Per i tetti","Per l'università","Per il cibo"],2,"grassa per il cibo。"],
["Che cosa fanno le ragazze il venerdì sera?","女孩们周五晚上做什么？",["Studiano","Escono insieme","Cucinano"],1,"usciamo tutte insieme。"]
]},
{id:'u3-stasera',title:'Che cosa fate stasera?',zh:'你们今晚干什么？',kind:'短对话',level:'A1+',s:[
["Ragazzi, che cosa fate stasera?","伙计们，你们今晚干什么？"],
["Io resto a casa: devo finire un progetto.","我待在家：我得完成一个项目。"],
["Noi due, invece, usciamo! Al Teatro Verdi danno un concerto jazz.","我们俩出去！威尔第剧院有一场爵士音乐会。"],
["Davvero? Dicono che il gruppo è bravissimo. Posso venire anch'io?","真的吗？听说那个乐队特别棒。我也能去吗？"],
["Certo! Veniamo a prenderti alle otto.","当然！我们八点来接你。"],
["Perfetto, allora pulisco la cucina e vi aspetto sotto casa.","太好了，那我先把厨房收拾了，在楼下等你们。"]
],g:[["restare","留下、待着"],["danno un concerto","上演音乐会（dare 的特殊用法）"],["venire a prendere","来接（某人）"],["sotto casa","楼下"]],q:[
["Chi resta a casa?","谁待在家？",["Il primo ragazzo","Tutti","Nessuno"],0,"第一位说 Io resto a casa。"],
["Che cosa c'è al Teatro Verdi?","威尔第剧院有什么？",["Un film","Un concerto jazz","Un'opera"],1,"danno un concerto jazz。"],
["A che ora passano a prendere l'amico?","几点去接朋友？",["Alle sette","Alle nove","Alle otto"],2,"Veniamo a prenderti alle otto。"]
]}
]});
READING.push({unit:4,key:[
["Com'è il tuo ragazzo? — È alto, bruno e molto simpatico.","你男朋友长什么样？——高个、深色头发，人很好。"],
["Ha gli occhi azzurri e i capelli biondi.","他/她有蓝眼睛和金发。"],
["Questa giacca è troppo larga per me.","这件外套对我来说太宽了。"],
["Di che colore è la tua macchina? — È grigia.","你的车是什么颜色？——灰色。"],
["Le scarpe rosse sono nuove.","红鞋子是新的。"],
["È una persona molto paziente e generosa.","他/她是一个很有耐心、很大方的人。"],
["Mio fratello è più alto di me.","我哥哥比我高。"],
["Che bella borsa! È nuova?","好漂亮的包！是新的吗？"],
["Preferisco i colori chiari.","我更喜欢浅色。"],
["Porto una camicia bianca e dei pantaloni blu.","我穿着白衬衫和蓝裤子。"],
["Questo ristorante è caro, ma ottimo.","这家餐馆很贵，但非常好。"],
["Non è antipatico, è solo timido.","他不是讨人厌，只是害羞。"],
["Le mie amiche sono allegre e sportive.","我的女性朋友们开朗又爱运动。"]
],texts:[
{id:'u4-coinquilini',title:'I miei coinquilini',zh:'我的室友们',kind:'描写',level:'A2',s:[
["Nel mio appartamento a Padova abitiamo in quattro.","在帕多瓦的公寓里，我们一共住四个人。"],
["Matteo è alto e magro, ha i capelli corti e neri e porta gli occhiali.","马泰奥又高又瘦，黑色短发，戴眼镜。"],
["È un ragazzo tranquillo e un po' timido, ma molto gentile.","他是个安静、有点害羞但很友善的男孩。"],
["Francesca, invece, è bassa, ha i capelli lunghi e ricci e gli occhi verdi.","而弗朗切斯卡个子矮，长卷发，绿眼睛。"],
["È simpatica e chiacchierona: parla sempre, anche al telefono con la mamma!","她很可爱又爱说话：总是在聊，连和妈妈打电话也聊个不停！"],
["Lucas è brasiliano; è sportivo e allegro e suona la chitarra ogni sera.","卢卡斯是巴西人；爱运动又开朗，每晚弹吉他。"],
["Io sono una ragazza cinese di ventiquattro anni e ho i capelli lisci e castani.","我是一个二十四岁的中国女孩，直发，栗色。"],
["Gli altri dicono che sono precisa e un po' troppo seria.","其他人说我做事一丝不苟，还有点太严肃。"],
["Siamo molto diversi, ma andiamo d'accordo.","我们很不一样，但相处得很好。"]
],g:[["magro/a","瘦的"],["portare gli occhiali","戴眼镜"],["riccio / liscio","卷的 / 直的"],["chiacchierone/a","话多的人"],["andare d'accordo","合得来"]],q:[
["Com'è Matteo?","马泰奥长什么样？",["Basso con i capelli lunghi","Alto, magro, con gli occhiali","Biondo e sportivo"],1,"alto e magro… porta gli occhiali。"],
["Chi parla molto?","谁话多？",["Francesca","Matteo","Lucas"],0,"Francesca 是 chiacchierona。"],
["Perché si dice «gli occhi verdi» e non «gli occhi verde»?","为什么说 occhi verdi 而不是 occhi verde？",["Perché verde è femminile","Perché l'aggettivo è al plurale come «occhi»","Perché è un errore"],1,"形容词要和名词性数一致；-e 结尾形容词复数变 -i：verde → verdi。"],
["Che cosa fa Lucas ogni sera?","卢卡斯每晚做什么？",["Studia","Telefona alla mamma","Suona la chitarra"],2,"suona la chitarra ogni sera。"]
]},
{id:'u4-valigia',title:'La valigia rossa',zh:'红色行李箱（失物招领）',kind:'对话',level:'A2',s:[
["Buongiorno, non trovo più la mia valigia: l'ho lasciata sul treno da Venezia.","您好，我的行李箱找不到了：我把它落在从威尼斯来的火车上了。"],
["Mi dispiace. Com'è la valigia?","很遗憾。行李箱是什么样的？"],
["È grande e rossa, con le ruote nere.","大的，红色，黑色轮子。"],
["C'è un'etichetta con il nome?","上面有带名字的标签吗？"],
["Sì, un'etichetta gialla con scritto «Li Na».","有，一个黄色标签，写着“李娜”。"],
["E che cosa c'è dentro?","里面有什么？"],
["Dei vestiti, un paio di scarpe bianche, una giacca blu e un libro di fotografia.","一些衣服、一双白鞋、一件蓝色外套和一本摄影书。"],
["Un momento… È questa?","稍等……是这个吗？"],
["No, questa è rossa, ma è piccola e vecchia.","不是，这个是红色的，但又小又旧。"],
["E questa qui, con l'etichetta gialla?","那这个呢，带黄色标签的？"],
["Sì, è proprio la mia! Grazie mille, Lei è gentilissimo!","对，就是我的！太感谢了，您真是太好了！"]
],g:[["valigia","行李箱"],["ruota","轮子"],["etichetta","标签"],["un paio di","一双、一对"],["gentilissimo","非常友善（-issimo 绝对最高级）"]],q:[
["Di che colore è la valigia di Li Na?","李娜的行李箱什么颜色？",["Nera","Gialla","Rossa"],2,"È grande e rossa。黄色是标签，黑色是轮子。"],
["Che cosa c'è nella valigia?","箱子里有什么？",["Scarpe bianche e una giacca blu","Un computer","Una giacca rossa"],0,"un paio di scarpe bianche, una giacca blu…"],
["Perché la prima valigia non è di Li Na?","为什么第一个箱子不是李娜的？",["Perché è blu","Perché è piccola e vecchia","Perché non è rossa"],1,"questa è rossa, ma è piccola e vecchia。"],
["«Blu» al plurale femminile è…","blu 修饰阴性复数时是…",["blue","blu","bli"],1,"blu、rosa、viola 等是不变形容词：le giacche blu。"]
]},
{id:'u4-colori',title:'Il mio colore preferito',zh:'我最喜欢的颜色',kind:'短文',level:'A1+',s:[
["Il mio colore preferito è il verde, il colore della natura.","我最喜欢的颜色是绿色，大自然的颜色。"],
["A casa ho una poltrona verde, delle tende bianche e molte piante.","家里我有一张绿色扶手椅、白色窗帘和很多植物。"],
["Mia sorella, invece, ama il nero: ha magliette nere, borse nere e perfino una bicicletta nera!","我姐姐却爱黑色：黑T恤、黑包，甚至还有一辆黑自行车！"],
["Secondo lei, il nero è elegante e sta bene con tutto.","她认为黑色很优雅，配什么都好看。"],
["Mio padre preferisce i colori vivaci: arancione, giallo e rosso.","我爸爸偏爱鲜艳的颜色：橙、黄、红。"],
["E voi? Di che colore sono le vostre cose preferite?","你们呢？你们最喜欢的东西是什么颜色的？"]
],g:[["poltrona","扶手椅"],["tenda","窗帘"],["perfino","甚至"],["stare bene con","和……很配"],["vivace","鲜艳的、活泼的"]],q:[
["Perché la sorella ama il nero?","姐姐为什么喜欢黑色？",["Perché è allegro","Perché è elegante e sta bene con tutto","Perché è il colore della natura"],1,"il nero è elegante e sta bene con tutto。"],
["Quali colori preferisce il padre?","爸爸喜欢哪些颜色？",["Colori vivaci","Bianco e nero","Verde"],0,"arancione, giallo e rosso = colori vivaci。"],
["«Magliette nere»: perché «nere»?","为什么是 nere？",["Femminile plurale","Maschile plurale","Femminile singolare"],0,"maglietta 阴性，复数 magliette，形容词 nero → nere。"]
]}
]});

READING.push({unit:5,key:[
["Abito a Firenze, in via Roma.","我住在佛罗伦萨，罗马路。"],
["Vado in Italia a settembre.","我九月去意大利。"],
["Stasera sono a casa di Paolo.","今晚我在保罗家。"],
["Vengo da Shanghai.","我来自上海。"],
["Il libro è sul tavolo.","书在桌子上。"],
["Andiamo al mare o in montagna?","我们去海边还是去山里？"],
["La farmacia è vicino alla stazione.","药店在火车站附近。"],
["Lavoro in un ufficio in centro.","我在市中心的一个办公室工作。"],
["Il treno parte dal binario tre.","火车从三号站台出发。"],
["Stasera vado dai miei amici.","今晚我去朋友们那儿。"],
["Questa è la casa dei miei nonni.","这是我爷爷奶奶的房子。"],
["Nel parco ci sono molti bambini.","公园里有很多孩子。"],
["Vado dal medico alle quattro.","我四点去看医生。"],
["Sono in Italia da un mese.","我来意大利一个月了。"]
],texts:[
{id:'u5-verona',title:'Benvenuti a Verona',zh:'欢迎来到维罗纳',kind:'城市介绍',level:'A2',s:[
["Verona è una città del Veneto, tra Venezia e Milano.","维罗纳是威尼托大区的一座城市，位于威尼斯和米兰之间。"],
["È famosa in tutto il mondo per la storia di Romeo e Giulietta.","它因罗密欧与朱丽叶的故事闻名全世界。"],
["Nel centro storico c'è l'Arena, un antico anfiteatro romano.","老城中心有圆形竞技场，一座古罗马圆形剧场。"],
["D'estate, nell'Arena, ci sono spettacoli d'opera all'aperto.","夏天，竞技场里有露天歌剧演出。"],
["Da Piazza Bra, la piazza principale, si arriva a piedi alla Casa di Giulietta in dieci minuti.","从主广场布拉广场步行十分钟就能到朱丽叶故居。"],
["Sotto il famoso balcone ci sono sempre tanti turisti che fanno foto.","那个著名的阳台下总有很多拍照的游客。"],
["Il fiume Adige attraversa la città e dai ponti c'è una vista bellissima.","阿迪杰河穿城而过，从桥上看风景特别美。"],
["Molti turisti vanno anche al Lago di Garda, a circa trenta chilometri da Verona.","很多游客也去加尔达湖，离维罗纳大约三十公里。"],
["Se andate a Verona, non dimenticate di assaggiare il risotto all'Amarone!","如果你们去维罗纳，别忘了尝尝阿玛罗尼葡萄酒烩饭！"]
],g:[["anfiteatro","圆形剧场"],["all'aperto","露天"],["attraversare","穿过"],["assaggiare","品尝"],["a … chilometri da","距离……若干公里"]],q:[
["Dove si trova Verona?","维罗纳在哪里？",["In Toscana","Nel Veneto","In Sicilia"],1,"una città del Veneto。"],
["Che cosa c'è nell'Arena d'estate?","夏天竞技场里有什么？",["Partite di calcio","Spettacoli d'opera","Un mercato"],1,"spettacoli d'opera all'aperto。"],
["Quanto è lontano il Lago di Garda?","加尔达湖有多远？",["Dieci minuti a piedi","Circa trenta chilometri","Cento chilometri"],1,"a circa trenta chilometri da Verona。"],
["Completa: «Domani andiamo ___ Verona.»","填空：明天我们去维罗纳。",["in","a","da"],1,"城市前用 a：andare a Verona；国家/大区用 in。"]
]},
{id:'u5-dovevai',title:'Dove vai?',zh:'你去哪儿？',kind:'对话',level:'A2',s:[
["Ciao Sara! Dove vai così di corsa?","嗨萨拉！你这么急着去哪儿？"],
["Vado in banca e poi alla posta: devo spedire un pacco a mia nonna.","我去银行，然后去邮局：要给奶奶寄个包裹。"],
["E dopo? Vieni in biblioteca con me?","之后呢？跟我去图书馆吗？"],
["No, oggi pomeriggio vado dal dentista. Uffa!","不了，今天下午我要去看牙医。唉！"],
["Poverina! E stasera? Andiamo al cinema?","真可怜！那今晚呢？去看电影？"],
["Stasera sono da Marco: fa una cena per il suo compleanno.","今晚我在马可家：他办生日晚餐。"],
["Ah, è vero! Sono invitata anch'io. Che cosa porti?","哦对！我也被邀请了。你带什么？"],
["Porto un dolce della pasticceria sotto casa. E tu?","我带楼下甜品店的一个蛋糕。你呢？"],
["Io porto una bottiglia di vino del Piemonte.","我带一瓶皮埃蒙特的葡萄酒。"],
["Perfetto, allora ci vediamo da lui alle otto!","太好了，那八点在他家见！"]
],g:[["di corsa","匆匆忙忙"],["la posta","邮局"],["da + 人","到某人那里/家：dal dentista, da Marco"],["Uffa!","唉！（烦）"],["pasticceria","甜品店"]],q:[
["Dove va Sara prima?","萨拉先去哪儿？",["In banca","In biblioteca","Al cinema"],0,"Vado in banca e poi alla posta。"],
["Che cosa fa Sara oggi pomeriggio?","萨拉今天下午干什么？",["Va al cinema","Va dal dentista","Va da Marco"],1,"oggi pomeriggio vado dal dentista。"],
["Perché c'è una cena da Marco?","马可为什么请吃饭？",["È il suo compleanno","Ha un nuovo lavoro","Parte per il Piemonte"],0,"fa una cena per il suo compleanno。"],
["Perché si dice «dal dentista»?","为什么说 dal dentista？",["Con le persone si usa «da»","Con i luoghi si usa «da»","È un'eccezione"],0,"去某人那里用 da + 人（da + il = dal）。"]
]},
{id:'u5-via',title:'La mia via',zh:'我住的街',kind:'短文',level:'A1+',s:[
["Abito in via Garibaldi, al numero 12, al terzo piano.","我住在加里波第路12号，四楼（意式三层）。"],
["Sotto casa c'è un forno: la mattina sento il profumo del pane fresco.","楼下有一家面包房：早上能闻到新鲜面包的香味。"],
["Di fronte al mio palazzo ci sono una farmacia e un piccolo supermercato.","我那栋楼对面有一家药店和一个小超市。"],
["Accanto alla farmacia c'è il bar dei signori Russo, dove prendo il caffè ogni mattina.","药店旁边是鲁索夫妇的咖啡馆，我每天早上在那里喝咖啡。"],
["In fondo alla via c'è un parco con una fontana e molte panchine.","街的尽头有一个带喷泉和很多长椅的公园。"],
["La fermata dell'autobus è all'angolo, così arrivo in centro in un quarto d'ora.","公交站在街角，所以我一刻钟就能到市中心。"],
["È un quartiere tranquillo e qui sto benissimo.","这是个安静的街区，我在这里过得很好。"]
],g:[["forno","面包房（也指烤箱）"],["di fronte a","在……对面"],["accanto a","在……旁边"],["in fondo a","在……尽头"],["all'angolo","在拐角处"]],q:[
["Che cosa c'è sotto casa?","楼下有什么？",["Un bar","Un forno","Una farmacia"],1,"Sotto casa c'è un forno。"],
["Dov'è il bar dei signori Russo?","鲁索夫妇的咖啡馆在哪？",["Accanto alla farmacia","In fondo alla via","All'angolo"],0,"Accanto alla farmacia c'è il bar…"],
["Quanto tempo ci vuole per il centro?","到市中心要多久？",["Cinque minuti","Un quarto d'ora","Un'ora"],1,"un quarto d'ora = 15 分钟。"]
]}
]});

READING.push({unit:6,key:[
["Vorrei un tavolo per due, per favore.","请给我一张两人桌。"],
["Che cosa mi consiglia?","您推荐什么？"],
["Per me un piatto di spaghetti alle vongole.","我要一份蛤蜊意面。"],
["Il conto, per favore.","请结账。"],
["Mi piace molto il gelato al pistacchio.","我很喜欢开心果冰淇淋。"],
["Non mi piacciono i peperoni.","我不喜欢甜椒。"],
["Ti piace cucinare?","你喜欢做饭吗？"],
["Mi manca la mia famiglia.","我想念我的家人。"],
["Ci manca il mare.","我们想念大海。"],
["Questa pasta è troppo salata.","这份意面太咸了。"],
["Sono allergico alle noci.","我对坚果过敏。"],
["Posso avere ancora un po' di pane?","能再给我一点面包吗？"],
["Buon appetito! — Grazie, altrettanto!","祝你胃口好！——谢谢，你也是！"],
["Prendo un caffè macchiato e un cornetto.","我要一杯玛奇朵和一个牛角包。"]
],texts:[
{id:'u6-trattoria',title:'In trattoria',zh:'在家常餐馆',kind:'对话',level:'A2',s:[
["Buonasera, siete in due? — Sì, abbiamo una prenotazione a nome Zhang.","晚上好，两位吗？——是的，我们用张的名字订了位。"],
["Prego, accomodatevi. Ecco il menù.","请坐。这是菜单。"],
["Che cosa ci consiglia?","您给我们推荐什么？"],
["Oggi abbiamo le tagliatelle al ragù fatte in casa: sono buonissime.","今天有自制肉酱宽面：特别好吃。"],
["Allora per me tagliatelle al ragù. — E per me un risotto ai funghi, per favore.","那我要肉酱宽面。——我要一份蘑菇烩饭，谢谢。"],
["Come secondo? — Io prendo una cotoletta con patate al forno.","第二道菜呢？——我要一份炸肉排配烤土豆。"],
["Io niente secondo, grazie: solo un'insalata mista.","我不要第二道，谢谢：只要一份什锦沙拉。"],
["E da bere? — Una bottiglia d'acqua frizzante e due bicchieri di vino rosso della casa.","喝什么？——一瓶气泡水和两杯店里的红葡萄酒。"],
["Più tardi il cameriere chiede: «Tutto bene?» — «Sì, tutto ottimo! Il ragù è fantastico.»","过了一会儿服务员问：“一切都好吗？”——“是的，都很棒！肉酱太好吃了。”"],
["Volete un dolce o un caffè? — Due caffè e il conto, per favore.","要甜点还是咖啡？——两杯咖啡，再结账，谢谢。"]
],g:[["prenotazione","预订"],["accomodarsi","请坐、请进"],["fatto in casa","自制的"],["secondo (piatto)","第二道菜（肉/鱼）"],["acqua frizzante / naturale","气泡水 / 无气水"]],q:[
["A che nome è la prenotazione?","用谁的名字订的位？",["Zhang","Rossi","Il cameriere"],0,"a nome Zhang。"],
["Che cosa consiglia il cameriere?","服务员推荐什么？",["Il risotto ai funghi","Le tagliatelle al ragù","L'insalata"],1,"le tagliatelle al ragù fatte in casa。"],
["Che cosa bevono?","他们喝什么？",["Acqua naturale e birra","Acqua frizzante e vino rosso","Solo vino bianco"],1,"acqua frizzante + vino rosso della casa。"],
["Che cosa chiedono alla fine?","最后他们点了什么？",["Un dolce","Due caffè e il conto","Un altro secondo"],1,"Due caffè e il conto。"]
]},
{id:'u6-mipiace',title:'Che cosa mi piace, che cosa mi manca',zh:'我喜欢的，我想念的',kind:'随笔',level:'A2',s:[
["Vivo a Napoli da sei mesi e la cucina italiana mi piace moltissimo.","我在那不勒斯住了六个月，非常喜欢意大利菜。"],
["Mi piace soprattutto la pizza napoletana: è morbida, semplice e costa poco.","我尤其喜欢那不勒斯披萨：软、简单又便宜。"],
["Mi piacciono anche i dolci, in particolare le sfogliatelle e il babà.","我也喜欢甜点，特别是千层酥和朗姆巴巴。"],
["Però non mi piace il caffè troppo forte: preferisco il caffè macchiato.","不过我不喜欢太浓的咖啡：我更喜欢玛奇朵。"],
["Gli italiani mangiano tardi: pranzano all'una e cenano alle otto e mezza o alle nove.","意大利人吃饭晚：一点吃午饭，八点半或九点吃晚饭。"],
["All'inizio per me era strano, ma adesso ci sono abituata.","一开始我觉得奇怪，但现在已经习惯了。"],
["A volte mi manca la cucina cinese, soprattutto i ravioli di mia madre.","有时我想念中国菜，尤其是我妈妈包的饺子。"],
["Mi mancano anche le cene con tutta la famiglia intorno a una grande tavola rotonda.","我也想念全家围着大圆桌吃晚饭的时光。"],
["Così il sabato preparo i ravioli per i miei amici italiani: a loro piacciono tantissimo!","所以周六我给意大利朋友们包饺子：他们超级喜欢！"]
],g:[["morbido/a","软的"],["soprattutto","尤其"],["essere abituato/a a","习惯于"],["mi manca / mi mancano","我想念（单数/复数主语）"],["tavola rotonda","圆桌"]],q:[
["Che cosa non le piace?","她不喜欢什么？",["La pizza","Il caffè troppo forte","I dolci"],1,"non mi piace il caffè troppo forte。"],
["A che ora cenano gli italiani, secondo il testo?","据文中，意大利人几点吃晚饭？",["Alle sei","Alle otto e mezza o alle nove","A mezzanotte"],1,"cenano alle otto e mezza o alle nove。"],
["Perché si dice «mi piacciono i dolci»?","为什么说 mi piacciono i dolci？",["Perché il soggetto «i dolci» è plurale","Perché «io» è plurale","Per errore"],0,"piacere 的主语是被喜欢的东西；i dolci 是复数，动词用 piacciono。"],
["Che cosa le manca?","她想念什么？",["La pizza napoletana","I ravioli della madre e le cene in famiglia","Il caffè italiano"],1,"mi manca… i ravioli di mia madre；mi mancano le cene con tutta la famiglia。"]
]},
{id:'u6-bar',title:'Colazione al bar',zh:'在咖啡馆吃早餐',kind:'短对话',level:'A1+',s:[
["Buongiorno! Un cappuccino e un cornetto alla crema, per favore.","早上好！一杯卡布奇诺和一个奶油牛角包，谢谢。"],
["Ecco a Lei. Altro?","给您。还要别的吗？"],
["Sì, anche una spremuta d'arancia. Quanto pago?","要，再来一杯鲜榨橙汁。多少钱？"],
["Sono quattro euro e cinquanta.","四欧五十。"],
["Posso pagare con la carta? — Certo, nessun problema.","可以刷卡吗？——当然，没问题。"],
["In Italia molte persone fanno colazione al bar, in piedi al banco, in pochi minuti.","在意大利，很多人在咖啡馆吧台站着几分钟就吃完早餐。"],
["Al tavolo, invece, a volte il prezzo è più alto.","而坐在桌边，价格有时会更高。"]
],g:[["cornetto","牛角包（北方也叫 brioche）"],["spremuta","鲜榨果汁"],["al banco","在吧台"],["in piedi","站着"]],q:[
["Che cosa ordina il cliente da bere?","客人点了什么喝的？",["Un caffè e un tè","Un cappuccino e una spremuta","Solo acqua"],1,"cappuccino + spremuta d'arancia。"],
["Quanto paga?","付了多少钱？",["4,50 euro","5,40 euro","14,50 euro"],0,"quattro euro e cinquanta。"],
["Che cosa può succedere al tavolo?","坐桌边会怎样？",["Il caffè è gratis","Il prezzo è più alto","Non si può pagare con la carta"],1,"al tavolo… il prezzo è più alto。"]
]}
]});
READING.push({unit:7,key:[
["Quanto costa questa maglietta?","这件T恤多少钱？"],
["Posso provarla? — Certo, il camerino è lì.","我可以试一下吗？——当然，试衣间在那边。"],
["Che taglia porta? — La M.","您穿什么尺码？——M码。"],
["Avete questa giacca in una taglia più piccola?","这件外套有小一号的吗？"],
["Vorrei del pane e dell'acqua.","我想要些面包和水。"],
["Prendo degli spinaci e delle carote.","我买些菠菜和胡萝卜。"],
["È troppo cara: avete qualcosa di più economico?","太贵了：有便宜一点的吗？"],
["Pago in contanti o con il bancomat?","我付现金还是刷借记卡？"],
["Questa è la mia borsa, quella è la tua.","这是我的包，那个是你的。"],
["Mio fratello e sua moglie abitano a Roma.","我哥哥和他妻子住在罗马。"],
["I miei amici sono molto simpatici.","我的朋友们都很好。"],
["Vai al supermercato? — Sì, ci vado adesso.","你去超市吗？——是的，我现在就去（那儿）。"],
["Mi può fare uno sconto?","能给我打个折吗？"],
["Mezzo chilo di pomodori e tre etti di prosciutto, per favore.","请给我半公斤西红柿和三百克火腿。"]
],texts:[
{id:'u7-mercato',title:'Al mercato',zh:'在菜市场',kind:'对话',level:'A2',s:[
["Buongiorno, signora! Che cosa desidera oggi?","早上好，女士！今天想要点什么？"],
["Vorrei un chilo di pomodori e mezzo chilo di zucchine.","我要一公斤西红柿和半公斤西葫芦。"],
["Ecco a Lei. Altro? Oggi le fragole sono dolcissime.","给您。还要别的吗？今天的草莓特别甜。"],
["Allora prendo anche un cestino di fragole. Avete delle pesche?","那我也买一小篮草莓。有桃子吗？"],
["Mi dispiace, le pesche sono finite, però ci sono delle albicocche.","不好意思，桃子卖完了，不过有杏子。"],
["Va bene, tre etti di albicocche.","好的，三百克杏子。"],
["Le regalo anche un po' di basilico per il sugo.","再送您一点罗勒做酱。"],
["Che gentile! Quant'è in tutto?","您真好！一共多少钱？"],
["Sono nove euro e venti.","九欧二十。"],
["Ecco dieci euro. — Ed ecco il resto: ottanta centesimi. Arrivederci!","给您十欧。——找您八十分。再见！"]
],g:[["un etto","一百克"],["cestino","小篮子"],["essere finito/a","卖完了、用完了"],["regalare","赠送"],["il resto","找零"]],q:[
["Quanti pomodori compra la signora?","女士买了多少西红柿？",["Mezzo chilo","Un chilo","Tre etti"],1,"un chilo di pomodori。"],
["Perché non compra le pesche?","她为什么没买桃子？",["Sono care","Sono finite","Non le piacciono"],1,"le pesche sono finite。"],
["Quanto basilico paga?","罗勒花了多少钱？",["Niente, è un regalo","Un euro","Venti centesimi"],0,"Le regalo… 是送的。"],
["Quanto è il resto?","找零多少？",["20 centesimi","80 centesimi","1 euro"],1,"10 − 9,20 = 0,80。"]
]},
{id:'u7-shopping',title:'Lo shopping di Mei',zh:'美的购物日',kind:'叙述',level:'A2',s:[
["Sabato Mei va in centro con sua cugina Lan per fare shopping.","周六美和她表妹兰去市中心购物。"],
["Mei cerca un regalo per il compleanno di suo padre.","美在给爸爸找生日礼物。"],
["In un negozio di abbigliamento trova una bella sciarpa di lana grigia.","她在一家服装店找到一条漂亮的灰色羊毛围巾。"],
["La commessa dice: «Questa sciarpa è in saldo, costa il trenta per cento in meno.»","店员说：“这条围巾在打折，便宜百分之三十。”"],
["Mei decide di comprarla subito.","美决定马上买下。"],
["Lan, invece, vuole delle scarpe nuove, perché le sue sono vecchie e rotte.","而兰想要新鞋，因为她的鞋又旧又破。"],
["Provano tre paia di scarpe, ma il numero 37 non c'è mai.","她们试了三双鞋，但总是没有37码。"],
["«Ci torniamo la settimana prossima», dice Lan, «arrivano i nuovi modelli.»","“我们下周再来这里，”兰说，“新款就到了。”"],
["Alla fine le due cugine vanno in una pasticceria e prendono dei pasticcini.","最后两姐妹去了甜品店，买了些小点心。"],
["Sono stanche, ma contente della loro giornata.","她们很累，但对这一天很满意。"]
],g:[["cugino/a","堂/表兄弟姐妹"],["commesso/a","店员"],["in saldo","打折中"],["rotto/a","破的、坏的"],["ci torniamo","我们再回那里（ci = 那里）"]],q:[
["Per chi è il regalo?","礼物是给谁的？",["Per Lan","Per il padre di Mei","Per la commessa"],1,"un regalo per il compleanno di suo padre。"],
["Perché la sciarpa costa meno?","围巾为什么便宜？",["È vecchia","È in saldo","È piccola"],1,"in saldo, il trenta per cento in meno。"],
["Qual è il problema di Lan?","兰遇到什么问题？",["Non c'è il suo numero","Non ha soldi","Il negozio è chiuso"],0,"il numero 37 non c'è mai。"],
["In «Ci torniamo», che cosa significa «ci»?","Ci torniamo 中 ci 指什么？",["Noi","In quel negozio","A casa"],1,"地点代词 ci 代替前面提到的地方。"]
]},
{id:'u7-lista',title:'La lista della spesa',zh:'购物清单（留言）',kind:'留言',level:'A1+',s:[
["Amore, stasera vengono i miei genitori a cena! Vai tu al supermercato, per favore?","亲爱的，今晚我爸妈来吃晚饭！你去趟超市好吗？"],
["Ecco la lista: del pane, un litro di latte, sei uova, del parmigiano e una bottiglia d'olio.","清单在这：一些面包、一升牛奶、六个鸡蛋、一些帕尔马干酪和一瓶油。"],
["Prendi anche della frutta: delle mele o delle arance, come vuoi.","也买点水果：苹果或橙子，随你。"],
["Non dimenticare il vino: a mio padre piace il rosso.","别忘了酒：我爸喜欢红酒。"],
["La nostra macchina è dal meccanico, quindi prendi la mia bicicletta: le chiavi sono sul tavolo.","我们的车在修车师傅那儿，所以骑我的自行车：钥匙在桌上。"],
["Grazie! Un bacio, Laura","谢谢！亲一个，劳拉"]
],g:[["genitori","父母"],["del / della / dei / delle","一些（部分冠词）"],["uovo → uova","鸡蛋（复数不规则）"],["meccanico","修车师傅"]],q:[
["Chi viene a cena?","谁来吃晚饭？",["Gli amici","I genitori di Laura","Il meccanico"],1,"vengono i miei genitori。"],
["Che vino piace al padre?","爸爸喜欢什么酒？",["Il bianco","Il rosso","Lo spumante"],1,"a mio padre piace il rosso。"],
["Perché deve andare in bicicletta?","为什么要骑自行车？",["La macchina è dal meccanico","Il supermercato è vicino","Non ha la patente"],0,"La nostra macchina è dal meccanico。"]
]}
]});

READING.push({unit:8,key:[
["Posso entrare? — Prego, si accomodi.","我可以进来吗？——请进，请坐。"],
["Si può pagare con la carta?","可以刷卡吗？"],
["Devo andare, scusa, sono in ritardo.","我得走了，抱歉，我迟到了。"],
["Vuoi venire con me?","你想和我一起来吗？"],
["Non posso uscire stasera: devo studiare.","今晚我不能出去：我得学习。"],
["Sai dov'è la fermata?","你知道车站在哪吗？"],
["So parlare inglese e cinese.","我会说英语和中文。"],
["Conosci Marco? — Sì, lo conosco bene.","你认识马可吗？——认识，很熟。"],
["C'è un bancomat qui vicino?","这附近有取款机吗？"],
["Ci sono ancora biglietti per stasera?","今晚还有票吗？"],
["Non c'è problema!","没问题！"],
["Quante persone ci sono alla festa?","聚会上有多少人？"],
["Dobbiamo prenotare in anticipo?","我们需要提前预订吗？"],
["Non so nuotare, ma voglio imparare.","我不会游泳，但我想学。"]
],texts:[
{id:'u8-residenza',title:'Le regole della residenza',zh:'学生宿舍规定',kind:'通知',level:'A2',s:[
["Benvenuti nella Residenza universitaria «Leonardo»!","欢迎入住“列奥纳多”大学生公寓！"],
["Qui ci sono centoventi camere, singole e doppie.","这里有一百二十个房间，单人间和双人间。"],
["Al piano terra c'è una cucina comune e ci sono due sale studio.","一楼有一个公共厨房和两间自习室。"],
["Ecco alcune regole importanti.","以下是几条重要规定。"],
["Dopo le undici di sera non potete fare rumore nei corridoi.","晚上十一点后不能在走廊里喧哗。"],
["Gli ospiti possono entrare, ma devono lasciare un documento alla reception.","访客可以进入，但必须在前台留下证件。"],
["Dovete pulire la cucina dopo l'uso.","厨房用完后必须清理干净。"],
["In camera non si può fumare.","房间内禁止吸烟。"],
["Se volete usare la lavatrice, dovete prenotarla sull'app della residenza.","想用洗衣机的话，必须在公寓的应用里预约。"],
["Sapete già la password del wi-fi? È scritta sulla porta della vostra camera.","你们已经知道无线网密码了吗？写在你们房门上。"],
["Per qualsiasi problema potete scrivere alla segreteria.","有任何问题都可以写信给管理处。"]
],g:[["piano terra","一楼（地面层）"],["sala studio","自习室"],["ospite","客人、访客"],["dopo l'uso","使用后"],["lavatrice","洗衣机"]],q:[
["Che cosa c'è al piano terra?","一楼有什么？",["Una palestra","Una cucina comune e due sale studio","Le camere doppie"],1,"cucina comune + due sale studio。"],
["Che cosa devono fare gli ospiti?","访客必须做什么？",["Pagare","Lasciare un documento alla reception","Uscire alle undici"],1,"devono lasciare un documento alla reception。"],
["Come si usa la lavatrice?","怎么用洗衣机？",["Si prenota sull'app","Si paga alla reception","È libera"],0,"dovete prenotarla sull'app。"],
["Dove si trova la password del wi-fi?","无线网密码在哪？",["Alla reception","Sulla porta della camera","Sull'app"],1,"È scritta sulla porta della vostra camera。"]
]},
{id:'u8-nuotare',title:'Sai nuotare?',zh:'你会游泳吗？',kind:'对话',level:'A2',s:[
["Luca, sabato vieni al mare con noi?","卢卡，周六和我们去海边吗？"],
["Vorrei, ma non posso: devo lavorare.","我想去，但去不了：我得上班。"],
["Peccato! E domenica?","太可惜了！那周日呢？"],
["Domenica posso, ma c'è un problema… non so nuotare.","周日可以，但有个问题……我不会游泳。"],
["Davvero? Nessun problema: puoi prendere il sole in spiaggia, oppure ti insegno io!","真的吗？没关系：你可以在沙滩上晒太阳，或者我来教你！"],
["Grazie, ma devo pensarci… Il mare è profondo?","谢谢，不过我得想想……海水深吗？"],
["Lì no, l'acqua è bassa per molti metri. E c'è anche un bagnino.","那里不深，好几米内水都很浅。而且还有救生员。"],
["Va bene, allora vengo. Devo portare qualcosa?","好吧，那我去。我需要带什么吗？"],
["Sì, l'asciugamano e la crema solare. Al pranzo ci pensiamo noi.","要，带浴巾和防晒霜。午饭我们来准备。"]
],g:[["peccato","可惜"],["sapere + 动词","会（技能）：so nuotare"],["potere + 动词","能、可以（条件/许可）"],["bagnino","救生员"],["pensarci","考虑一下"]],q:[
["Perché Luca non può andare sabato?","卢卡周六为什么不能去？",["È malato","Deve lavorare","Non sa nuotare"],1,"non posso: devo lavorare。"],
["Qual è il problema di domenica?","周日的问题是什么？",["Luca non sa nuotare","Piove","Il mare è chiuso"],0,"non so nuotare。"],
["«Non so nuotare» significa…","Non so nuotare 意思是…",["Oggi non mi è permesso nuotare","Non ho imparato a nuotare","Non ho voglia di nuotare"],1,"sapere + 动词表示“会、掌握某技能”；potere 表示条件或许可。"],
["Che cosa deve portare Luca?","卢卡要带什么？",["Il pranzo","L'asciugamano e la crema solare","Niente"],1,"l'asciugamano e la crema solare。"]
]},
{id:'u8-frigo',title:'Nel mio frigorifero',zh:'我的冰箱里',kind:'短文',level:'A1+',s:[
["Apro il frigorifero: c'è solo un po' di formaggio e ci sono due uova.","我打开冰箱：只有一点奶酪和两个鸡蛋。"],
["Non c'è latte, non c'è burro e non ci sono verdure.","没有牛奶，没有黄油，也没有蔬菜。"],
["Voglio fare una torta, ma non posso: mancano troppi ingredienti.","我想做蛋糕，但做不了：缺太多材料了。"],
["Devo fare la spesa, ma il supermercato è chiuso, perché è domenica sera.","我得去买菜，但超市关门了，因为是周日晚上。"],
["Allora so che cosa fare: ordino una pizza!","那我知道该怎么办了：叫个披萨！"]
],g:[["c'è / ci sono","有（单数 / 复数）"],["fare la spesa","买菜、采购日用品"],["ingrediente","配料、材料"],["ordinare","点（餐）、订购"]],q:[
["Che cosa c'è nel frigorifero?","冰箱里有什么？",["Latte e burro","Formaggio e due uova","Verdure"],1,"un po' di formaggio e due uova。"],
["Perché non può fare la spesa?","为什么不能去买菜？",["Non ha soldi","Il supermercato è chiuso","Piove"],1,"il supermercato è chiuso。"],
["Completa: «Nel frigo non ___ verdure.»","填空：冰箱里没有蔬菜。",["c'è","ci sono","è"],1,"verdure 是复数，用 ci sono。"]
]}
]});

READING.push({unit:9,key:[
["Scusi, dov'è la stazione?","请问，火车站在哪？"],
["Vada sempre dritto e poi giri a destra.","您一直往前走，然后右转。"],
["È lontano da qui? — No, sono cinque minuti a piedi.","离这里远吗？——不远，走路五分钟。"],
["Quale autobus va in centro?","哪路公交去市中心？"],
["Dove si comprano i biglietti?","在哪里买票？"],
["Un biglietto di andata e ritorno per Bologna, per favore.","一张去博洛尼亚的往返票，谢谢。"],
["A che ora parte il prossimo treno per Milano?","下一班去米兰的火车几点出发？"],
["Da quale binario parte?","从几号站台出发？"],
["Devo cambiare treno?","我需要换车吗？"],
["Scendo alla prossima fermata.","我在下一站下车。"],
["Quante fermate sono fino al Colosseo?","到斗兽场有几站？"],
["Il treno è in ritardo di dieci minuti.","火车晚点十分钟。"],
["Prendo la metro perché è più veloce.","我坐地铁，因为更快。"],
["La seconda strada a sinistra, poi attraversi la piazza.","左边第二条路，然后穿过广场。"]
],texts:[
{id:'u9-museo',title:'Per andare al museo?',zh:'去博物馆怎么走？',kind:'对话',level:'A2',s:[
["Scusi, mi sa dire dov'è il Museo Archeologico?","请问，您能告诉我考古博物馆在哪吗？"],
["Sì, non è lontano. Vada sempre dritto per questa strada fino al semaforo.","可以，不远。沿这条路一直走到红绿灯。"],
["Al semaforo giri a sinistra e prenda via Toledo.","在红绿灯处左转，走托莱多路。"],
["Continui per circa duecento metri e poi prenda la seconda a destra.","继续走大约两百米，然后走右边第二条路。"],
["Il museo è lì, in fondo alla piazza, di fronte a una chiesa.","博物馆就在那里，广场尽头，一座教堂对面。"],
["Quanto ci vuole a piedi? — Più o meno dieci minuti.","走路要多久？——大概十分钟。"],
["C'è anche un autobus?","也有公交吗？"],
["Sì, ma a quest'ora c'è molto traffico: a piedi fa prima.","有，但这个时间很堵：走路更快。"],
["Grazie mille, molto gentile! — Si figuri, buona giornata!","非常感谢，您真好！——不客气，祝您愉快！"]
],g:[["semaforo","红绿灯"],["giri / prenda / continui","您转/走/继续（对 Lei 的命令式）"],["quanto ci vuole?","需要多长时间？"],["fare prima","更快到"],["Si figuri","不客气（对 Lei）"]],q:[
["Che cosa deve fare al semaforo?","在红绿灯处要做什么？",["Girare a destra","Girare a sinistra","Attraversare"],1,"Al semaforo giri a sinistra。"],
["Dov'è il museo?","博物馆在哪？",["Di fronte a una chiesa","Accanto alla stazione","Al semaforo"],0,"in fondo alla piazza, di fronte a una chiesa。"],
["Perché è meglio andare a piedi?","为什么走路更好？",["L'autobus è caro","C'è molto traffico","Non ci sono autobus"],1,"c'è molto traffico: a piedi fa prima。"],
["Quanto tempo ci vuole a piedi?","走路要多久？",["Cinque minuti","Dieci minuti","Mezz'ora"],1,"Più o meno dieci minuti。"]
]},
{id:'u9-firenze',title:'In treno da Roma a Firenze',zh:'从罗马坐火车去佛罗伦萨',kind:'叙述',level:'A2',s:[
["Sabato mattina Yuki va a Firenze in treno per un weekend.","周六上午由纪坐火车去佛罗伦萨过周末。"],
["Compra il biglietto online e sceglie un Frecciarossa delle 8:15.","她在网上买票，选了8:15的红箭高铁。"],
["Alla stazione Termini guarda il tabellone: il treno parte dal binario 12.","在特米尼车站她看了时刻显示屏：火车从12号站台出发。"],
["Per i treni regionali con biglietto cartaceo bisogna convalidare il biglietto, ma per il Frecciarossa no.","乘坐区域火车用纸质票需要打票，红箭高铁则不用。"],
["Il viaggio dura un'ora e mezza e Yuki guarda il paesaggio toscano dal finestrino.","旅程一个半小时，由纪从车窗看托斯卡纳风景。"],
["A Firenze scende alla stazione di Santa Maria Novella.","在佛罗伦萨她在新圣母玛利亚车站下车。"],
["L'albergo è vicino, quindi va a piedi con il suo piccolo trolley.","酒店很近，所以她拖着小拉杆箱走过去。"],
["La domenica vuole andare a Fiesole, una cittadina sulle colline: prende l'autobus in centro.","周日她想去山上的小镇菲耶索莱：在市中心坐公交。"],
["Il biglietto dell'autobus si può comprare in tabaccheria o con l'app.","公交票可以在烟草店买，也可以用应用买。"]
],g:[["tabellone","车站时刻显示屏"],["binario","站台、轨道"],["convalidare","（打卡机）验票"],["finestrino","车窗"],["tabaccheria","烟草店（也卖车票、邮票）"]],q:[
["Da quale binario parte il treno?","火车从几号站台出发？",["Dal binario 8","Dal binario 12","Dal binario 15"],1,"parte dal binario 12。"],
["Quanto dura il viaggio?","旅程多久？",["Un'ora","Un'ora e mezza","Due ore"],1,"dura un'ora e mezza。"],
["Come va Yuki all'albergo?","由纪怎么去酒店？",["In taxi","In autobus","A piedi"],2,"va a piedi con il suo piccolo trolley。"],
["Dove si può comprare il biglietto dell'autobus?","在哪可以买公交票？",["In tabaccheria o con l'app","Solo in stazione","In albergo"],0,"in tabaccheria o con l'app。"]
]},
{id:'u9-ritardo',title:'Sono in ritardo!',zh:'我要迟到了！（短信）',kind:'短信',level:'A1+',s:[
["Ciao Marta, scusa, sono in ritardo: oggi c'è lo sciopero dei mezzi!","嗨玛尔塔，抱歉，我要迟到了：今天公共交通罢工！"],
["La metro è chiusa e gli autobus passano ogni mezz'ora.","地铁停运，公交半小时一班。"],
["Prendo una bici del bike sharing e arrivo tra venti minuti.","我骑共享单车，二十分钟后到。"],
["Mi aspetti davanti al cinema?","你在电影院门口等我好吗？"],
["Tranquilla! Il film comincia alle nove, abbiamo tempo. Ti aspetto all'ingresso.","别急！电影九点开始，来得及。我在入口等你。"]
],g:[["sciopero","罢工"],["i mezzi (pubblici)","公共交通"],["tra venti minuti","二十分钟后"],["ingresso","入口"]],q:[
["Perché è in ritardo?","为什么迟到？",["C'è lo sciopero dei mezzi","Si è svegliata tardi","Ha perso il treno"],0,"c'è lo sciopero dei mezzi。"],
["Come va al cinema?","她怎么去电影院？",["In metro","In bicicletta","In taxi"],1,"Prendo una bici del bike sharing。"],
["Dove aspetta Marta?","玛尔塔在哪等？",["Alla fermata","All'ingresso del cinema","A casa"],1,"Ti aspetto all'ingresso。"]
]}
]});
READING.push({unit:10,key:[
["Che ore sono? — È l'una e mezza.","几点了？——一点半。"],
["Sono le otto meno dieci.","七点五十。"],
["Il negozio è aperto dalle nove alle diciannove.","商店从九点营业到十九点。"],
["Abito al quinto piano, senza ascensore!","我住在六楼（意式五层），没有电梯！"],
["La mia camera è piccola ma luminosa.","我的房间小但明亮。"],
["Il divano è in soggiorno, davanti alla televisione.","沙发在客厅，电视机前面。"],
["Il bagno è in fondo al corridoio.","卫生间在走廊尽头。"],
["Quanto costa l'affitto al mese?","房租每月多少？"],
["Gennaio è il primo mese dell'anno.","一月是一年中的第一个月。"],
["Ci vediamo alle tre in punto.","三点整见。"],
["A che ora apre la banca?","银行几点开门？"],
["Ho prenotato per le venti e trenta.","我订了二十点三十分。"],
["Sulla scrivania ci sono una lampada e un computer.","书桌上有一盏台灯和一台电脑。"],
["È la terza volta che lo dico!","这是我第三次说了！"]
],texts:[
{id:'u10-affitto',title:'Affittasi bilocale',zh:'两居室出租（广告）',kind:'广告',level:'A2',s:[
["Affittasi bilocale in zona universitaria, a dieci minuti a piedi dalla facoltà di Lettere.","大学区两室公寓出租，步行十分钟到文学院。"],
["L'appartamento è al secondo piano di un palazzo con ascensore.","公寓在一栋有电梯的楼的三楼（意式二层）。"],
["Ha un ingresso, un soggiorno con angolo cottura, una camera matrimoniale e un bagno con doccia.","有门厅、带开放式厨房的客厅、一间双人卧室和带淋浴的卫生间。"],
["In camera ci sono un letto, un armadio grande e una scrivania vicino alla finestra.","卧室里有一张床、一个大衣柜和窗边的一张书桌。"],
["Il soggiorno è luminoso e ha un piccolo balcone.","客厅明亮，有一个小阳台。"],
["Il prezzo è di 650 euro al mese, spese condominiali incluse.","价格每月650欧，含物业费。"],
["Riscaldamento e bollette sono a parte.","暖气和水电费另算。"],
["L'appartamento è libero dal primo ottobre. Niente animali.","十月一日起可入住。不许养宠物。"],
["Per visitarlo, telefonare dalle 9 alle 13, dal lunedì al venerdì.","如需看房，请周一至周五9点到13点致电。"]
],g:[["affittasi","出租（广告用语）"],["bilocale","两室（一厅一卧）"],["angolo cottura","开放式厨房角"],["spese condominiali","物业费"],["bollette","账单（水电气）"]],q:[
["Quanto è lontana la facoltà di Lettere?","离文学院多远？",["Dieci minuti a piedi","Mezz'ora in autobus","Due chilometri"],0,"a dieci minuti a piedi。"],
["Che cosa è incluso nel prezzo?","价格包含什么？",["Le bollette","Il riscaldamento","Le spese condominiali"],2,"spese condominiali incluse；暖气和账单 a parte（另算）。"],
["Da quando è libero l'appartamento?","什么时候可入住？",["Dal primo settembre","Dal primo ottobre","Subito"],1,"libero dal primo ottobre。日期中“一号”用序数 primo。"],
["Quando si può telefonare?","什么时候可以打电话？",["La sera","Dalle 9 alle 13 nei giorni feriali","Solo il sabato"],1,"dalle 9 alle 13, dal lunedì al venerdì。"]
]},
{id:'u10-orario',title:'Che ore sono?',zh:'几点了？',kind:'对话',level:'A2',s:[
["Scusa, che ore sono? — Sono le quattro meno un quarto.","请问几点了？——三点四十五。"],
["Accidenti! Alle quattro ho un appuntamento dal medico.","糟了！我四点约了医生。"],
["Dov'è lo studio? — In via Mazzini 47. Con la metro ci vogliono venti minuti.","诊所在哪？——马志尼路47号。坐地铁要二十分钟。"],
["Allora arrivo tardi… telefono alla segretaria.","那我要迟到了……我给前台打个电话。"],
["Buongiorno, sono Li Wei, ho un appuntamento alle sedici. Arrivo con un quarto d'ora di ritardo, va bene?","您好，我是李伟，约了十六点。我会迟到一刻钟，可以吗？"],
["Nessun problema, il dottore riceve fino alle sette.","没问题，医生看诊到七点。"],
["Però prima di Lei ci sono altri tre pazienti, quindi deve aspettare un po'.","不过您前面还有三位病人，所以得等一会儿。"],
["Va bene, grazie. E il venerdì a che ora chiudete?","好的，谢谢。周五你们几点关门？"],
["Il venerdì siamo aperti dalle nove all'una e dalle tre alle sei.","周五我们九点到一点、三点到六点开门。"]
],g:[["meno un quarto","差一刻"],["Accidenti!","糟糕！"],["studio (medico)","诊所"],["ci vogliono + 时间","需要（多久）"],["ricevere","（医生）接诊"]],q:[
["Che ore sono all'inizio?","开始时几点？",["15:45","16:15","14:45"],0,"le quattro meno un quarto = 3:45。"],
["Con quanto ritardo arriva Li Wei?","李伟会迟到多久？",["Cinque minuti","Un quarto d'ora","Un'ora"],1,"con un quarto d'ora di ritardo。"],
["Fino a che ora riceve il dottore?","医生看诊到几点？",["Alle quattro","Alle sei","Alle sette"],2,"riceve fino alle sette。"],
["Il venerdì lo studio è aperto…","周五诊所开放时间…",["Tutto il giorno","9–13 e 15–18","Solo la mattina"],1,"dalle nove all'una e dalle tre alle sei。"]
]},
{id:'u10-cucina',title:'La mia stanza preferita',zh:'我最喜欢的房间',kind:'短文',level:'A1+',s:[
["La mia stanza preferita è la cucina.","我最喜欢的房间是厨房。"],
["Non è grande, ma è calda e accogliente.","不大，但温暖舒适。"],
["Al centro c'è un vecchio tavolo di legno con sei sedie diverse.","中间有一张旧木桌，配六把不一样的椅子。"],
["Sulle mensole ci sono tazze colorate, barattoli di spezie e libri di ricette.","架子上有彩色杯子、香料罐和菜谱。"],
["Sopra il lavandino c'è una finestra: da lì vedo i tetti della città.","水槽上方有扇窗：从那里能看到城市的屋顶。"],
["La domenica tutta la famiglia si siede qui per un pranzo lungo e rumoroso.","周日全家人坐在这里吃一顿又长又热闹的午饭。"]
],g:[["accogliente","温馨的"],["legno","木头"],["mensola","搁架"],["barattolo","罐子"],["lavandino","水槽、洗手池"]],q:[
["Com'è la cucina?","厨房怎么样？",["Grande e moderna","Piccola, calda e accogliente","Fredda"],1,"Non è grande, ma è calda e accogliente。"],
["Che cosa si vede dalla finestra?","从窗户能看到什么？",["Il mare","I tetti della città","Un parco"],1,"vedo i tetti della città。"],
["Quante sedie ci sono?","有几把椅子？",["Quattro","Sei","Otto"],1,"sei sedie diverse。"]
]}
]});

READING.push({unit:11,key:[
["Vorrei prenotare una camera singola per tre notti.","我想订一间单人间，住三晚。"],
["Avete una camera libera per stasera?","今晚有空房吗？"],
["Quanto costa a notte?","一晚多少钱？"],
["La colazione è compresa?","含早餐吗？"],
["A che ora devo lasciare la camera?","我几点要退房？"],
["Posso lasciare le valigie alla reception?","我可以把行李寄存在前台吗？"],
["Il riscaldamento non funziona.","暖气坏了。"],
["In bagno manca la carta igienica.","卫生间没有卫生纸了。"],
["C'è il wi-fi in camera? Qual è la password?","房间里有无线网吗？密码是什么？"],
["Vorrei una camera silenziosa, lontano dall'ascensore.","我想要一间安静的房间，离电梯远一点。"],
["Ho una prenotazione a nome Chen.","我有一个以陈的名字的预订。"],
["Posso pagare con la carta di credito?","可以用信用卡付款吗？"],
["Potete chiamarmi un taxi per domattina alle sei?","能帮我叫一辆明早六点的出租车吗？"],
["La camera dà sul cortile, quindi è tranquilla.","房间朝向内院，所以很安静。"]
],texts:[
{id:'u11-email',title:'Una prenotazione per agosto',zh:'八月订房邮件',kind:'邮件',level:'A2',s:[
["Gentile Hotel Bellavista,","尊敬的美景酒店："],
["vorrei prenotare una camera doppia per due notti, dal 14 al 16 agosto.","我想预订一间双人房，两晚，8月14日到16日。"],
["Siamo due adulti e un bambino di sei anni: è possibile aggiungere un lettino?","我们是两个大人和一个六岁的孩子：可以加一张小床吗？"],
["Preferiamo una camera con vista mare e con l'aria condizionata.","我们希望要海景房，带空调。"],
["Vorrei sapere anche se la colazione è inclusa e se l'albergo ha un parcheggio.","我还想知道是否含早餐，以及酒店是否有停车场。"],
["Arriviamo in macchina verso le otto di sera: la reception è aperta fino a tardi?","我们开车大约晚上八点到：前台开得晚吗？"],
["Resto in attesa di una Sua cortese risposta. Cordiali saluti, Zhou Min","期待您的回复。此致敬礼，周敏"],
["Risposta: Gentile signora Zhou, abbiamo una camera doppia con vista mare a 140 euro a notte, colazione inclusa.","回复：尊敬的周女士，我们有一间海景双人房，每晚140欧，含早餐。"],
["Il lettino per il bambino è gratuito; il parcheggio costa 15 euro al giorno.","儿童小床免费；停车费每天15欧。"],
["La reception è aperta 24 ore su 24. La aspettiamo!","前台24小时开放。期待您的到来！"]
],g:[["Gentile …","尊敬的……（正式信件开头）"],["lettino","儿童床"],["vista mare","海景"],["Resto in attesa di…","期待……（正式结尾）"],["24 ore su 24","全天24小时"]],q:[
["Quante notti vuole prenotare Zhou Min?","周敏要订几晚？",["Una","Due","Tre"],1,"per due notti, dal 14 al 16。"],
["Quanto costa il lettino per il bambino?","儿童床多少钱？",["15 euro","Niente","140 euro"],1,"Il lettino per il bambino è gratuito。"],
["La colazione…","早餐……",["è inclusa","costa 15 euro","non c'è"],0,"colazione inclusa。"],
["Perché chiede della reception?","她为什么问前台时间？",["Arriva tardi, verso le otto di sera","Vuole parlare con il direttore","Vuole cambiare camera"],0,"Arriviamo… verso le otto di sera。"]
]},
{id:'u11-problema',title:'Un problema in camera',zh:'房间出问题了',kind:'对话',level:'A2',s:[
["Buonasera, sono nella camera 305. Scusi, c'è un problema.","晚上好，我住305房。不好意思，有个问题。"],
["Mi dica, signore.","请说，先生。"],
["L'aria condizionata non funziona e in camera fa molto caldo.","空调坏了，房间里很热。"],
["Inoltre in bagno manca il phon e la doccia perde acqua.","另外卫生间没有吹风机，淋浴还漏水。"],
["Mi dispiace moltissimo. Mando subito il tecnico.","非常抱歉。我马上派维修工过去。"],
["Se preferisce, possiamo darLe un'altra camera al quarto piano: è più tranquilla.","如果您愿意，我们可以给您换一间五楼（意式四层）的房间：更安静。"],
["Sì, grazie, preferisco cambiare camera. Posso avere anche un cuscino in più?","好的，谢谢，我更愿意换房。能再给我一个枕头吗？"],
["Certo. Ecco la chiave della 412. Il facchino Le porta su le valigie.","当然。这是412的钥匙。行李员会帮您把行李送上去。"],
["A che ora è la colazione? — Dalle sette alle dieci, nella sala al piano terra.","早餐几点？——七点到十点，在一楼餐厅。"]
],g:[["non funziona","坏了、不运作"],["phon / asciugacapelli","吹风机"],["perdere acqua","漏水"],["cuscino","枕头"],["facchino","行李员"]],q:[
["Qual è il primo problema?","第一个问题是什么？",["Il letto è rotto","L'aria condizionata non funziona","La camera è sporca"],1,"L'aria condizionata non funziona。"],
["Che cosa manca in bagno?","卫生间缺什么？",["Il phon","Gli asciugamani","Il sapone"],0,"manca il phon。"],
["Qual è la nuova camera?","新房间是哪间？",["305","412","401"],1,"la chiave della 412。"],
["Fino a che ora c'è la colazione?","早餐到几点？",["Alle nove","Alle dieci","Alle undici"],1,"Dalle sette alle dieci。"]
]},
{id:'u11-recensione',title:'Una recensione',zh:'一条住宿点评',kind:'点评',level:'A2',s:[
["★★★★☆ «Ottima posizione, colazione da migliorare»","四星：“位置极好，早餐有待改进”"],
["Abbiamo dormito tre notti in questo B&B nel centro di Lecce.","我们在莱切市中心这家民宿住了三晚。"],
["La camera era pulita e comoda e il letto molto grande.","房间干净舒适，床很大。"],
["I proprietari sono gentilissimi e ci hanno dato tanti consigli su ristoranti e spiagge.","房东非常热情，给了我们很多关于餐馆和海滩的建议。"],
["L'unico difetto è la colazione: poca scelta e il caffè non era buono.","唯一的缺点是早餐：选择少，咖啡也不好喝。"],
["Ma il rapporto qualità-prezzo è eccellente. Lo consiglio!","但性价比极高。推荐！"]
],g:[["recensione","评论、点评"],["proprietario","业主、房东"],["difetto","缺点"],["rapporto qualità-prezzo","性价比"]],q:[
["Quante notti sono rimasti?","他们住了几晚？",["Due","Tre","Quattro"],1,"tre notti。"],
["Qual è il difetto del B&B?","民宿的缺点是什么？",["La camera","La posizione","La colazione"],2,"L'unico difetto è la colazione。"],
["Come sono i proprietari?","房东怎么样？",["Antipatici","Molto gentili","Sempre assenti"],1,"gentilissimi。"]
]}
]});

READING.push({unit:12,key:[
["A che ora ti svegli? — Mi sveglio alle sei e mezza.","你几点醒？——我六点半醒。"],
["Mi faccio la doccia la sera.","我晚上洗澡。"],
["Come ti trovi a Milano? — Mi trovo benissimo.","你在米兰过得怎么样？——非常好。"],
["Nel tempo libero suono il pianoforte.","空闲时我弹钢琴。"],
["Vado in palestra tre volte alla settimana.","我每周去三次健身房。"],
["Non vado mai a ballare.","我从不去跳舞。"],
["Gioco a tennis ogni tanto.","我偶尔打网球。"],
["Ci divertiamo molto insieme.","我们在一起玩得很开心。"],
["Ti piace sciare?","你喜欢滑雪吗？"],
["Di solito mi riposo la domenica.","我通常周日休息。"],
["Quante volte vai al cinema? — Una volta al mese.","你多久去一次电影院？——一个月一次。"],
["Mi annoio quando piove.","下雨时我会觉得无聊。"],
["Prima mi lavo i denti, poi mi vesto.","我先刷牙，然后穿衣服。"],
["Il fine settimana non mi alzo mai prima delle nove.","周末我从不在九点前起床。"]
],texts:[
{id:'u12-settimana',title:'La mia settimana',zh:'我的一周',kind:'叙述',level:'A2',s:[
["Durante la settimana mi alzo sempre alle sette.","工作日我总是七点起床。"],
["Mi lavo, mi vesto in fretta e faccio colazione con uno yogurt.","洗漱、匆匆穿好衣服，吃一杯酸奶当早餐。"],
["Il lunedì e il giovedì vado in piscina e nuoto per un'ora prima del lavoro.","周一和周四我去游泳池，上班前游一小时。"],
["Il martedì sera ho lezione di chitarra; il mercoledì vado a ballare la salsa con la mia amica Dani.","周二晚上上吉他课；周三和朋友达妮去跳萨尔萨。"],
["Non guardo quasi mai la televisione, ma ogni tanto vedo una serie su internet.","我几乎不看电视，但偶尔在网上看剧。"],
["Il fine settimana mi riposo: la domenica mi sveglio tardi e non mi trucco mai.","周末我休息：周日睡到很晚，从不化妆。"],
["Spesso faccio una passeggiata in collina o una gita in bicicletta.","我常去山丘散步或骑车出游。"],
["A volte mi annoio un po', allora telefono ai miei amici e organizziamo una cena.","有时我有点无聊，就给朋友打电话组织晚饭。"],
["Mi diverto molto quando cuciniamo tutti insieme.","大家一起做饭时我特别开心。"],
["Di solito vado a letto verso le undici, ma il sabato non vado mai a letto prima dell'una!","我通常十一点左右睡，但周六从不在一点前睡！"]
],g:[["alzarsi / svegliarsi","起床 / 醒来"],["vestirsi","穿衣"],["truccarsi","化妆"],["annoiarsi","感到无聊"],["divertirsi","玩得开心"]],q:[
["Quando va in piscina?","她什么时候去游泳池？",["Il lunedì e il giovedì","Ogni giorno","Il sabato"],0,"Il lunedì e il giovedì vado in piscina。"],
["Che cosa fa il mercoledì?","周三做什么？",["Lezione di chitarra","Va a ballare la salsa","Guarda la televisione"],1,"il mercoledì vado a ballare la salsa。"],
["Che cosa fa quando si annoia?","无聊时她做什么？",["Dorme","Organizza una cena con gli amici","Guarda la TV"],1,"telefono ai miei amici e organizziamo una cena。"],
["«Non mi trucco mai» significa…","Non mi trucco mai 意思是…",["Mi trucco sempre","Non mi trucco in nessun caso","Mi trucco a volte"],1,"non… mai = 从不。"]
]},
{id:'u12-forum',title:'Cerco compagni di sport',zh:'找运动伙伴（论坛帖）',kind:'论坛',level:'A2',s:[
["Ciao a tutti! Sono Kai, ho ventinove anni e da poco abito a Torino per lavoro.","大家好！我是凯，二十九岁，因为工作刚搬到都灵。"],
["Nel tempo libero mi piace molto correre e giocare a calcetto.","空闲时我很喜欢跑步和踢五人制足球。"],
["Cerco persone per correre insieme lungo il Po, di solito la mattina presto, due o tre volte alla settimana.","我想找人一起沿波河跑步，通常是清晨，每周两三次。"],
["Cerco anche una squadra di calcetto: gioco abbastanza bene, ma non sono un professionista!","我也在找一支五人足球队：我踢得还可以，但不是专业的！"],
["D'inverno scio volentieri: qualcuno vuole organizzare una gita in montagna?","冬天我很乐意滑雪：有人想组织去山里玩吗？"],
["Risposta di Elisa: Ciao Kai! Il mio gruppo corre ogni martedì e giovedì alle sette al parco del Valentino. Vieni anche tu!","埃莉莎回复：嗨凯！我们小组每周二和周四七点在瓦伦蒂诺公园跑步。你也来吧！"],
["Risposta di Davide: Nella mia squadra di calcetto manca un giocatore. Giochiamo il mercoledì sera. Scrivimi!","达维德回复：我的五人足球队缺一个队员。我们周三晚上踢。私信我！"]
],g:[["da poco","不久前"],["calcetto","五人制足球"],["lungo il fiume","沿着河"],["volentieri","乐意地"],["squadra","队"]],q:[
["Perché Kai è a Torino?","凯为什么在都灵？",["Per studio","Per lavoro","In vacanza"],1,"abito a Torino per lavoro。"],
["Quando corre il gruppo di Elisa?","埃莉莎的小组什么时候跑？",["Martedì e giovedì alle sette","Ogni sera","Il mercoledì"],0,"ogni martedì e giovedì alle sette。"],
["Che cosa offre Davide?","达维德提供什么？",["Un posto nella squadra di calcetto","Una gita in montagna","Lezioni di sci"],0,"manca un giocatore。"],
["Che cosa fa Kai d'inverno?","凯冬天做什么？",["Nuota","Scia","Corre al mare"],1,"D'inverno scio volentieri。"]
]},
{id:'u12-abitudini',title:'Gli italiani e il tempo libero',zh:'意大利人的闲暇时光',kind:'说明文',level:'A2',s:[
["Il calcio è lo sport più seguito in Italia.","足球是意大利最受关注的运动。"],
["Ma molti italiani non lo guardano soltanto in TV: lo giocano anche con gli amici.","但很多意大利人不只在电视上看：也和朋友一起踢。"],
["Anche la bicicletta è molto amata, soprattutto al nord, dove molte città sono in pianura.","自行车也很受欢迎，尤其是在北方，那里很多城市在平原上。"],
["D'estate tante famiglie passano le vacanze al mare e nuotano ogni giorno.","夏天很多家庭在海边度假，每天游泳。"],
["La sera, nelle piccole città, è tradizione fare la «passeggiata» nella via principale.","晚上在小城镇，人们有在主街“散步”的传统。"],
["Ci si veste bene, si chiacchiera con i vicini e si prende un gelato.","人们穿得整整齐齐，和邻居聊天，吃个冰淇淋。"]
],g:[["seguito/a","受关注的"],["in pianura","在平原"],["passeggiata","散步"],["ci si veste","人们穿衣（无人称反身）"],["chiacchierare","闲聊"]],q:[
["Qual è lo sport più seguito in Italia?","意大利最受关注的运动？",["Il ciclismo","Il calcio","Il nuoto"],1,"Il calcio è lo sport più seguito。"],
["Perché la bici è popolare al nord?","为什么北方自行车流行？",["Molte città sono in pianura","Ci sono poche macchine","Fa caldo"],0,"dove molte città sono in pianura。"],
["Che cosa si fa durante la «passeggiata»?","“散步”时做什么？",["Si corre","Si chiacchiera e si prende un gelato","Si va al cinema"],1,"si chiacchiera… e si prende un gelato。"]
]}
]});
READING.push({unit:13,key:[
["Ieri ho lavorato fino alle otto.","昨天我工作到八点。"],
["Domenica scorsa siamo andati al mare.","上周日我们去了海边。"],
["Hai mai mangiato il tiramisù?","你吃过提拉米苏吗？"],
["Non ho ancora finito i compiti.","我还没写完作业。"],
["Ho già visto questo film.","这部电影我已经看过了。"],
["Mia sorella è nata nel 2001.","我妹妹生于2001年。"],
["Sei mai stato in Italia? — Sì, ci sono stato due anni fa.","你去过意大利吗？——去过，两年前。"],
["Abbiamo preso il treno delle sette.","我们坐了七点的火车。"],
["Ho letto un libro molto interessante.","我读了一本很有意思的书。"],
["Che cosa hai detto? Non ho sentito.","你说了什么？我没听见。"],
["Stamattina mi sono alzata tardi.","今天早上我起晚了。（女性）"],
["Ci siamo conosciuti all'università.","我们是在大学认识的。"],
["Ho perso le chiavi di casa!","我把家门钥匙弄丢了！"],
["Le ragazze sono uscite alle nove.","女孩们九点出去了。"]
],texts:[
{id:'u13-venezia',title:'Una giornata a Venezia',zh:'威尼斯一日游（日记）',kind:'日记',level:'A2',s:[
["Sabato scorso sono andata a Venezia con la mia amica Rui.","上周六我和朋友蕊去了威尼斯。"],
["Siamo partite da Padova alle otto e siamo arrivate alla stazione di Santa Lucia dopo mezz'ora.","我们八点从帕多瓦出发，半小时后到了圣卢西亚车站。"],
["Prima abbiamo preso il vaporetto lungo il Canal Grande.","我们先坐水上巴士沿大运河游览。"],
["Abbiamo visto palazzi bellissimi e tante gondole.","我们看到了很美的宫殿和许多贡多拉。"],
["In Piazza San Marco abbiamo visitato la Basilica e abbiamo fatto tantissime foto.","在圣马可广场我们参观了大教堂，拍了好多照片。"],
["A pranzo abbiamo mangiato in una piccola osteria: io ho preso gli spaghetti al nero di seppia.","午饭我们在一家小酒馆吃：我点了墨鱼汁意面。"],
["Nel pomeriggio ci siamo perse tra le calli, ma è stato divertente.","下午我们在小巷里迷了路，但很好玩。"],
["Abbiamo comprato una maschera di Carnevale per la sorella di Rui.","我们给蕊的妹妹买了一个狂欢节面具。"],
["La sera siamo tornate a Padova stanche, ma felici.","晚上我们回到帕多瓦，累但开心。"],
["È stata una giornata indimenticabile!","真是难忘的一天！"]
],g:[["vaporetto","威尼斯水上巴士"],["calle (le calli)","威尼斯小巷"],["perdersi","迷路"],["nero di seppia","墨鱼汁"],["indimenticabile","难忘的"]],q:[
["Come sono arrivate a Venezia?","她们怎么到威尼斯的？",["In treno","In macchina","In aereo"],0,"arrivate alla stazione di Santa Lucia：坐火车。"],
["Perché si dice «siamo partite» e non «abbiamo partito»?","为什么用 siamo partite？",["Partire usa «essere»; il participio concorda: due ragazze → -e","È un errore","Perché è futuro"],0,"partire 用 essere 作助动词，分词和主语性数一致：两个女生 → partite。"],
["Che cosa è successo nel pomeriggio?","下午发生了什么？",["Hanno perso il treno","Si sono perse tra le calli","Hanno dormito"],1,"ci siamo perse tra le calli。"],
["Per chi è la maschera?","面具是给谁的？",["Per Rui","Per la sorella di Rui","Per la madre"],1,"per la sorella di Rui。"]
]},
{id:'u13-assenza',title:'Scusi l\u2019assenza',zh:'请假说明（给老师的邮件）',kind:'邮件',level:'A2',s:[
["Gentile professoressa Ferri,","尊敬的费里老师："],
["mi scusi se ieri non sono venuto a lezione.","抱歉昨天我没来上课。"],
["Purtroppo ho avuto la febbre e sono rimasto a letto tutto il giorno.","很不巧我发烧了，在床上躺了一整天。"],
["Il mio coinquilino mi ha portato le medicine dalla farmacia.","我的室友从药店给我带了药。"],
["Ho dormito molto e ho bevuto tanta acqua e tè caldo.","我睡了很多觉，喝了很多水和热茶。"],
["Oggi sto meglio e ho già fatto gli esercizi del libro a pagina 54.","今天好多了，我已经做完了课本第54页的练习。"],
["Però non ho capito bene quando si usa «essere» e quando «avere» al passato prossimo.","不过我没太搞懂近过去时什么时候用 essere、什么时候用 avere。"],
["Posso venire a ricevimento giovedì?","我周四可以来答疑时间吗？"],
["La ringrazio e Le auguro una buona giornata.","谢谢您，祝您今天愉快。"],
["Cordiali saluti, Chen Yu","此致，陈雨"]
],g:[["purtroppo","不幸地、可惜"],["avere la febbre","发烧"],["rimanere (rimasto)","停留（用 essere）"],["ricevimento","（老师的）答疑时间"],["augurare","祝愿"]],q:[
["Perché Chen Yu non è andato a lezione?","陈雨为什么没去上课？",["Ha perso l'autobus","Ha avuto la febbre","È andato in farmacia"],1,"ho avuto la febbre。"],
["Chi ha portato le medicine?","谁带来了药？",["La professoressa","Il coinquilino","La madre"],1,"Il mio coinquilino mi ha portato le medicine。"],
["Che cosa non ha capito?","他没搞懂什么？",["Essere o avere al passato prossimo","I numeri","Il futuro"],0,"quando si usa «essere» e quando «avere»。"],
["Che cosa chiede alla fine?","最后他请求什么？",["Un nuovo libro","Di venire a ricevimento giovedì","Di cambiare corso"],1,"Posso venire a ricevimento giovedì?"]
]},
{id:'u13-ieri',title:'Che cosa hai fatto ieri sera?',zh:'你昨晚干什么了？',kind:'短对话',level:'A2',s:[
["Ciao Anna, che cosa hai fatto ieri sera? Ti ho chiamato, ma non hai risposto.","嗨安娜，你昨晚干什么了？我给你打电话你没接。"],
["Scusa! Sono andata al cinema con Giorgio e ho spento il telefono.","抱歉！我和乔治去看电影，把手机关了。"],
["Che film avete visto?","你们看了什么电影？"],
["Una commedia italiana. Abbiamo riso tantissimo!","一部意大利喜剧。我们笑得不行！"],
["E dopo? — Abbiamo mangiato una pizza e siamo tornati a casa a mezzanotte.","然后呢？——我们吃了披萨，半夜才回家。"]
],g:[["spegnere (spento)","关掉"],["ridere (riso)","笑（不规则分词）"],["rispondere (risposto)","回答、接（电话）"]],q:[
["Perché Anna non ha risposto?","安娜为什么没接电话？",["Ha spento il telefono","Ha dormito","Era al lavoro"],0,"ho spento il telefono。"],
["Che film hanno visto?","他们看了什么电影？",["Un film d'azione","Una commedia italiana","Un documentario"],1,"Una commedia italiana。"],
["A che ora sono tornati?","几点回去的？",["Alle dieci","A mezzanotte","All'una"],1,"a mezzanotte。"]
]}
]});

READING.push({unit:14,key:[
["Domani pioverà.","明天会下雨。"],
["L'anno prossimo andrò a studiare a Bologna.","明年我要去博洛尼亚读书。"],
["Quando finirai l'università?","你什么时候大学毕业？"],
["Ti chiamerò stasera.","我今晚给你打电话。"],
["Saremo a casa verso le nove.","我们九点左右会到家。"],
["A maggio avrò trent'anni.","五月我就三十岁了。"],
["Dopo la laurea cercherò lavoro in Italia.","毕业后我会在意大利找工作。"],
["Che cosa farete a Capodanno?","你们新年夜做什么？"],
["Verrò con piacere!","我很乐意来！"],
["Se avrò tempo, ti aiuterò.","如果我有时间，我会帮你。"],
["Partiranno dopodomani.","他们后天出发。"],
["Secondo me, sarà una bella esperienza.","我觉得这会是一次很好的经历。"],
["Quando arriverai a Roma, mandami un messaggio.","你到罗马了给我发个消息。"],
["Non so ancora che cosa farò quest'estate.","我还不知道今年夏天要做什么。"]
],texts:[
{id:'u14-progetti',title:'I miei progetti',zh:'我的计划',kind:'随笔',level:'A2',s:[
["L'anno prossimo sarà un anno importante per me.","明年对我来说将是重要的一年。"],
["A settembre andrò in Italia per fare un master in design a Milano.","九月我将去意大利，在米兰读设计硕士。"],
["Prima di partire studierò l'italiano ancora più seriamente: voglio arrivare al livello B1.","出发前我会更认真地学意大利语：我想达到B1。"],
["A Milano cercherò una stanza vicino all'università, così potrò andare a lezione a piedi.","在米兰我会在大学附近找房，这样就能走路上课。"],
["Nei fine settimana viaggerò: visiterò il Lago di Como, Torino e forse le Cinque Terre.","周末我会去旅行：去科莫湖、都灵，也许还有五渔村。"],
["Avrò poco tempo libero, ma farò di tutto per conoscere persone nuove.","我的空闲时间会很少，但我会尽一切努力认识新朋友。"],
["Mia madre è un po' preoccupata, ma verrà a trovarmi a Natale.","我妈妈有点担心，但圣诞节她会来看我。"],
["Insieme andremo a Roma e le farò vedere il Colosseo.","我们会一起去罗马，我带她看斗兽场。"],
["Chissà come sarà la mia vita in Italia!","谁知道我在意大利的生活会是什么样！"]
],g:[["master","硕士课程"],["seriamente","认真地"],["fare di tutto per","尽一切努力"],["preoccupato/a","担心的"],["chissà","谁知道、不知道"]],q:[
["Che cosa farà a Milano?","她将在米兰做什么？",["Lavorerà in un museo","Farà un master in design","Insegnerà cinese"],1,"fare un master in design a Milano。"],
["Perché cercherà una stanza vicino all'università?","为什么要在大学附近找房？",["Per andare a lezione a piedi","Perché costa meno","Per la madre"],0,"così potrò andare a lezione a piedi。"],
["Quando verrà la madre?","妈妈什么时候来？",["A settembre","A Natale","D'estate"],1,"verrà a trovarmi a Natale。"],
["«Andrò» è il futuro di…","andrò 是哪个动词的将来时？",["avere","andare","essere"],1,"andare → andrò, andrai, andrà…"]
]},
{id:'u14-estate',title:'Che cosa farai quest\u2019estate?',zh:'今年夏天你做什么？',kind:'对话',level:'A2',s:[
["Allora, Paolo, che cosa farai quest'estate?","那么保罗，今年夏天你打算干什么？"],
["Andrò in Sardegna con la mia ragazza. Affitteremo una casa vicino al mare.","我和女朋友去撒丁岛。我们会在海边租一栋房子。"],
["Che bello! Per quanto tempo starete lì?","真好！你们在那待多久？"],
["Due settimane, ad agosto. E tu?","两周，八月。你呢？"],
["Io resterò in città: dovrò lavorare fino alla fine di luglio.","我会留在城里：得工作到七月底。"],
["Poi forse farò un corso di vela in Liguria.","然后也许会去利古里亚上帆船课。"],
["Se avrai tempo, vieni a trovarci! La casa è grande.","如果你有时间，来看我们吧！房子很大。"],
["Grazie, ci penserò. Sarà difficile, ma ci proverò!","谢谢，我会考虑的。会有点难，但我会试试！"]
],g:[["affittare","租"],["la vela","帆船运动"],["se + 将来时","如果（将来）……"],["provarci","试试看"]],q:[
["Dove andrà Paolo?","保罗会去哪？",["In Liguria","In Sardegna","In Sicilia"],1,"Andrò in Sardegna。"],
["Per quanto tempo?","多久？",["Una settimana","Due settimane","Un mese"],1,"Due settimane, ad agosto。"],
["Che cosa farà l'amico a luglio?","朋友七月做什么？",["Lavorerà","Farà un corso di vela","Andrà al mare"],0,"dovrò lavorare fino alla fine di luglio。"]
]},
{id:'u14-oroscopo',title:'L\u2019oroscopo della settimana',zh:'本周星座运势（趣味阅读）',kind:'趣味',level:'A2',s:[
["Leone: questa settimana sarà piena di sorprese.","狮子座：本周将充满惊喜。"],
["Al lavoro avrete nuove responsabilità, ma riceverete anche dei complimenti.","工作上你们会有新的责任，但也会收到称赞。"],
["In amore incontrerete una persona interessante, forse durante un viaggio.","感情上你们会遇到一个有趣的人，也许是在旅途中。"],
["Attenzione al portafoglio: spenderete troppo per i vestiti!","注意钱包：你们会在衣服上花太多钱！"],
["Il fine settimana sarete stanchi: dormirete di più e starete a casa con gli amici.","周末你们会很累：会多睡一会儿，和朋友待在家。"]
],g:[["pieno/a di","充满"],["responsabilità","责任"],["portafoglio","钱包"],["spendere","花（钱）"]],q:[
["Dove incontreranno una persona interessante?","会在哪里遇到有趣的人？",["Al lavoro","Forse durante un viaggio","A casa"],1,"forse durante un viaggio。"],
["Per che cosa spenderanno troppo?","会在什么上花太多？",["Per il cibo","Per i vestiti","Per i viaggi"],1,"spenderete troppo per i vestiti。"],
["«Sarete» è il futuro di…","sarete 是哪个动词？",["stare","essere","sapere"],1,"essere → sarò, sarai, sarà, saremo, sarete, saranno。"]
]}
]});
READING.push({unit:15,key:[
["Che tempo fa oggi? — Fa bel tempo, c'è il sole.","今天天气怎么样？——天气好，出太阳。"],
["Fa freddo: mettiti la giacca!","天冷：穿上外套！"],
["Piove da tre giorni.","已经连下三天雨了。"],
["Domani nevicherà in montagna.","明天山里会下雪。"],
["Quanti gradi ci sono oggi?","今天多少度？"],
["Che giorno è oggi? — È martedì.","今天星期几？——星期二。"],
["Quanti ne abbiamo oggi? — Ne abbiamo diciotto.","今天几号？——十八号。"],
["Il mio compleanno è il tre maggio.","我的生日是五月三日。"],
["D'estate andiamo sempre al mare.","夏天我们总去海边。"],
["Buon Natale e felice anno nuovo!","圣诞快乐，新年快乐！"],
["Tanti auguri di buon compleanno!","祝你生日快乐！"],
["C'è nebbia: guida piano!","有雾：开慢点！"],
["In primavera il tempo cambia spesso.","春天天气变化多。"],
["Oggi è il primo dicembre.","今天是十二月一日。"]
],texts:[
{id:'u15-stagioni',title:'Le stagioni in Italia',zh:'意大利的四季',kind:'说明文',level:'A2',s:[
["L'Italia ha un clima molto vario.","意大利的气候非常多样。"],
["D'inverno al nord fa freddo e in montagna nevica spesso: è il momento perfetto per sciare sulle Alpi.","冬天北方很冷，山里常下雪：这是在阿尔卑斯山滑雪的最佳时机。"],
["Al sud, invece, l'inverno è mite e raramente la temperatura va sotto zero.","而南方冬天温和，气温很少降到零下。"],
["La primavera è la stagione dei fiori, ma a marzo e ad aprile il tempo cambia spesso: c'è il sole e poi piove.","春天是花的季节，但三四月天气多变：一会儿出太阳，一会儿下雨。"],
["L'estate è calda e secca, soprattutto a luglio e ad agosto.","夏天炎热干燥，尤其是七八月。"],
["Ad agosto molti italiani vanno in vacanza e le città si svuotano.","八月很多意大利人去度假，城市变得空荡荡。"],
["Il 15 agosto è Ferragosto, una festa molto sentita.","8月15日是八月节，一个很受重视的节日。"],
["L'autunno porta la nebbia nella Pianura Padana, ma anche colori bellissimi e la vendemmia.","秋天给波河平原带来雾，但也带来美丽的色彩和葡萄采收。"],
["Qual è il periodo migliore per visitare l'Italia? Secondo molti, maggio e settembre.","游意大利最好的时候是哪？很多人认为是五月和九月。"]
],g:[["mite","温和的"],["sotto zero","零度以下"],["svuotarsi","变空"],["sentito/a","（节日）受重视的、深切的"],["vendemmia","葡萄采收"]],q:[
["Com'è l'inverno al sud?","南方冬天怎么样？",["Molto freddo","Mite","Con molta neve"],1,"al sud l'inverno è mite。"],
["Che cosa succede ad agosto?","八月会怎样？",["Le città si svuotano","Nevica","Cominciano le scuole"],0,"molti italiani vanno in vacanza e le città si svuotano。"],
["Che cosa porta l'autunno nella Pianura Padana?","秋天给波河平原带来什么？",["La neve","La nebbia","Il caldo"],1,"porta la nebbia。"],
["Quali mesi sono consigliati per visitare l'Italia?","推荐哪几个月去意大利？",["Gennaio e febbraio","Luglio e agosto","Maggio e settembre"],2,"maggio e settembre。"]
]},
{id:'u15-feste',title:'Natale, Capodanno e Befana',zh:'圣诞、新年和主显节女巫',kind:'文化',level:'A2',s:[
["In Italia il Natale si festeggia soprattutto in famiglia.","在意大利，圣诞节主要和家人一起过。"],
["La vigilia, il 24 dicembre, in molte regioni si mangia pesce.","平安夜，12月24日，很多地区吃鱼。"],
["Il 25 dicembre si fa un lungo pranzo con i parenti e si aprono i regali.","12月25日和亲戚一起吃一顿长长的午饭，拆礼物。"],
["I dolci tipici sono il panettone, nato a Milano, e il pandoro, nato a Verona.","典型甜点是源自米兰的潘娜托尼和源自维罗纳的黄金面包。"],
["A Capodanno si mangiano le lenticchie: secondo la tradizione portano soldi nell'anno nuovo.","新年夜吃小扁豆：按传统它们会在新的一年带来财运。"],
["A mezzanotte si brinda con lo spumante e si guardano i fuochi d'artificio.","午夜大家用起泡酒干杯，看烟花。"],
["Il 6 gennaio arriva la Befana, una vecchietta che porta dolci ai bambini buoni e carbone a quelli cattivi.","1月6日主显节女巫来了，她是一个老婆婆，给乖孩子带糖，给淘气孩子带煤块。"],
["C'è un proverbio: «Natale con i tuoi, Pasqua con chi vuoi».","有句谚语：“圣诞和家人过，复活节随你和谁过。”"],
["Significa che a Natale si sta con la famiglia, mentre a Pasqua si può stare con gli amici.","意思是圣诞要和家人一起，而复活节可以和朋友一起。"]
],g:[["vigilia","前夜"],["si aprono i regali","（大家）拆礼物：无人称 si + 复数动词"],["lenticchie","小扁豆"],["brindare","干杯"],["carbone","煤（Befana 给淘气孩子的“糖煤”）"]],q:[
["Che cosa si mangia spesso la vigilia di Natale?","平安夜常吃什么？",["Carne","Pesce","Pizza"],1,"si mangia pesce。"],
["Dove è nato il panettone?","潘娜托尼源自哪里？",["A Verona","A Milano","A Roma"],1,"il panettone, nato a Milano。"],
["Perché si mangiano le lenticchie a Capodanno?","新年为什么吃扁豆？",["Portano soldi","Sono leggere","Sono dolci"],0,"portano soldi nell'anno nuovo。"],
["Che cosa significa il proverbio?","谚语的意思？",["Natale e Pasqua con gli amici","Natale in famiglia, Pasqua con chi vuoi","Natale al mare"],1,"Natale con i tuoi（家人），Pasqua con chi vuoi。"]
]},
{id:'u15-meteo',title:'Le previsioni del tempo',zh:'天气预报',kind:'广播稿',level:'A2',s:[
["Ed ecco le previsioni del tempo per domani, sabato 12 aprile.","下面是明天，4月12日星期六的天气预报。"],
["Al nord il cielo sarà nuvoloso e nel pomeriggio pioverà su Milano e Torino.","北部多云，下午米兰和都灵有雨。"],
["Al centro ci sarà il sole, con temperature tra i 15 e i 22 gradi.","中部晴，气温15到22度。"],
["Al sud farà caldo, quasi come d'estate: a Palermo la massima arriverà a 26 gradi.","南部炎热，几乎像夏天：巴勒莫最高温将达26度。"],
["Sui mari soffierà un vento forte da ovest.","海上将刮强劲西风。"],
["Domenica il tempo migliorerà in tutta Italia.","周日全国天气将好转。"]
],g:[["previsioni","预报"],["nuvoloso","多云的"],["la massima","最高气温"],["soffiare","（风）吹"],["migliorare","好转"]],q:[
["Dove pioverà sabato pomeriggio?","周六下午哪里下雨？",["A Milano e Torino","A Palermo","Al centro"],0,"pioverà su Milano e Torino。"],
["Che temperatura massima ci sarà a Palermo?","巴勒莫最高温多少？",["22 gradi","15 gradi","26 gradi"],2,"la massima arriverà a 26 gradi。"],
["Come sarà il tempo domenica?","周日天气怎样？",["Peggiorerà","Migliorerà","Nevicherà"],1,"il tempo migliorerà。"]
]}
]});

READING.push({unit:16,key:[
["Questa è mia madre e quello è mio padre.","这是我妈妈，那是我爸爸。"],
["I miei genitori abitano a Nanchino.","我父母住在南京。"],
["Hai fratelli o sorelle? — Ho una sorella più piccola.","你有兄弟姐妹吗？——我有一个妹妹。"],
["Mio zio è il fratello di mio padre.","我叔叔是我爸爸的兄弟。"],
["La conosci? — Sì, la conosco da anni.","你认识她吗？——认识，好多年了。"],
["Ti chiamo domani.","我明天给你打电话。"],
["Vi aspetto alla stazione.","我在车站等你们。"],
["Li ho comprati ieri.","我昨天买的（它们）。"],
["Caro Marco, ti scrivo per ringraziarti.","亲爱的马可，我写信是为了感谢你。"],
["Gentile dottoressa Rossi, …","尊敬的罗西博士……（正式信件开头）"],
["Cordiali saluti.","此致敬礼。"],
["Un abbraccio e a presto!","拥抱，回头见！"],
["Salutami tua sorella!","替我问候你妹妹！"],
["Ho ricevuto la tua lettera e sono felice.","我收到了你的信，很开心。"]
],texts:[
{id:'u16-nonna',title:'Cara nonna',zh:'亲爱的奶奶（家书）',kind:'书信',level:'A2',s:[
["Cara nonna, come stai? Ti scrivo da Perugia, dove studio da quattro mesi.","亲爱的奶奶，您好吗？我在佩鲁贾给您写信，我在这儿学习四个月了。"],
["Ieri ho ricevuto il tuo pacco: grazie per i biscotti! Li ho mangiati tutti in due giorni.","昨天收到您的包裹了：谢谢饼干！两天我就全吃完了。"],
["La famiglia che mi ospita è molto gentile.","接待我的寄宿家庭很友好。"],
["Il signor Bruni fa il professore e sua moglie Carla lavora in banca.","布鲁尼先生是老师，他的妻子卡拉在银行工作。"],
["Hanno due figli: Pietro ha dodici anni e Alice ne ha otto.","他们有两个孩子：彼得罗十二岁，爱丽丝八岁。"],
["Alice vuole imparare il cinese, così le insegno qualche parola ogni sera.","爱丽丝想学中文，所以我每晚教她几个词。"],
["La domenica pranziamo con i nonni dei bambini: la loro nonna cucina bene come te!","周日我们和孩子们的祖父母一起吃午饭：他们的奶奶做饭和您一样好吃！"],
["Mi mancate molto, tu e il nonno. Vi penso spesso.","我很想念您和爷爷。我常常想起你们。"],
["A Natale torno a casa e vi porto un po' di cioccolato di Perugia.","圣诞节我回家，给你们带点佩鲁贾巧克力。"],
["Un abbraccio forte, la tua nipote Xiaoyu","紧紧拥抱，您的孙女小雨"]
],g:[["ospitare","接待、留宿"],["li","它们（阳性复数直接宾语）"],["ne ha otto","她有八（岁）（ne 代替 anni）"],["le insegno","我教她（间接宾语）"],["nipote","孙子女、外孙子女；侄子女"]],q:[
["Che cosa ha mangiato Xiaoyu in due giorni?","小雨两天吃完了什么？",["La torta","I biscotti","Il cioccolato"],1,"Li ho mangiati tutti：li = i biscotti。"],
["Che lavoro fa Carla?","卡拉做什么工作？",["Professoressa","Lavora in banca","Cuoca"],1,"sua moglie Carla lavora in banca。"],
["Quanti anni ha Alice?","爱丽丝几岁？",["Otto","Dodici","Quattro"],0,"Alice ne ha otto。"],
["«Li ho mangiati»: perché «mangiati»?","为什么是 mangiati？",["Il participio concorda con «li» (maschile plurale)","Perché il soggetto è plurale","È un errore"],0,"直接宾语代词 lo/la/li/le 在前时，过去分词要与其性数一致。"]
]},
{id:'u16-famiglia',title:'La mia famiglia',zh:'我的家庭',kind:'描写',level:'A2',s:[
["La mia famiglia non è molto grande.","我家不太大。"],
["Mio padre si chiama Jian e fa il medico; mia madre, Hua, insegna matematica in una scuola media.","我爸爸叫建，是医生；我妈妈华在一所初中教数学。"],
["Ho un fratello maggiore, Lei, che è sposato con una ragazza italiana, Chiara.","我有个哥哥叫磊，他娶了意大利姑娘基娅拉。"],
["Abitano a Firenze e hanno una bambina di due anni: la mia nipotina Luna.","他们住在佛罗伦萨，有个两岁的女儿：我的小侄女露娜。"],
["Luna parla già un po' di cinese e un po' di italiano!","露娜已经会说一点中文和一点意大利语了！"],
["I miei nonni paterni abitano in campagna, vicino a Suzhou, e coltivano il tè.","我的爷爷奶奶住在苏州附近的乡下，种茶。"],
["Mia zia, la sorella di mia madre, è single e viaggia molto per lavoro.","我姨妈，也就是我妈妈的妹妹，单身，经常因工作出差。"],
["Ogni anno, per la Festa di Primavera, ci riuniamo tutti a casa dei nonni.","每年春节我们都在爷爷奶奶家团聚。"],
["Chiara prepara sempre il tiramisù: ormai lo aspettano tutti!","基娅拉总会做提拉米苏：现在大家都盼着它！"]
],g:[["fratello maggiore","哥哥"],["sposato con","和……结婚"],["nipotina","小侄女/孙女（带后缀须加冠词：la mia nipotina）"],["paterno","父系的"],["riunirsi","团聚"]],q:[
["Che lavoro fa la madre?","妈妈做什么工作？",["Medico","Insegnante di matematica","Coltiva il tè"],1,"insegna matematica。"],
["Chi è Luna?","露娜是谁？",["La figlia di Lei e Chiara","La zia","La nonna"],0,"hanno una bambina…: la mia nipotina Luna。"],
["Perché si dice «mia madre» ma «la mia nipotina»?","为什么说 mia madre 却说 la mia nipotina？",["Con i nomi di parentela singolari non si usa l'articolo, ma con i diminutivi sì","È sempre facoltativo","Perché nipotina è plurale"],0,"单数亲属名词前不加冠词；带后缀（-ina）、复数或 loro 时要加。"],
["Dove si riunisce la famiglia per la Festa di Primavera?","春节在哪里团聚？",["A Firenze","A casa dei nonni","In un ristorante"],1,"a casa dei nonni。"]
]},
{id:'u16-invito',title:'Un invito',zh:'一封邀请',kind:'消息',level:'A2',s:[
["Ciao Marta! Sabato festeggio il mio compleanno e voglio invitarti.","嗨玛尔塔！周六我过生日，想邀请你。"],
["Ho invitato anche Luca e Silvia: li conosci, vero?","我也邀请了卢卡和西尔维娅：你认识他们吧？"],
["La festa è a casa mia alle otto. Porta anche tuo fratello, se vuole!","派对八点在我家。如果你哥哥愿意，也带上他！"],
["Non devi portare niente, ma se vuoi porta la tua chitarra: la suoniamo insieme.","你什么都不用带，不过愿意的话带上吉他：我们一起弹。"],
["Fammi sapere entro giovedì! Un bacio, Elena","周四前告诉我！亲亲，埃莱娜"]
],g:[["festeggiare","庆祝"],["invitarti","邀请你（ti 接在不定式后）"],["fammi sapere","告诉我一声"],["entro","在……之前"]],q:[
["Perché Elena fa una festa?","埃莱娜为什么办派对？",["È il suo compleanno","Ha finito l'università","Parte"],0,"festeggio il mio compleanno。"],
["Che cosa può portare Marta?","玛尔塔可以带什么？",["Una torta","La chitarra","Il vino"],1,"porta la tua chitarra。"],
["In «la suoniamo insieme», «la» sostituisce…","la suoniamo 中 la 指…",["la festa","la chitarra","Marta"],1,"la = la chitarra（阴性单数直接宾语）。"]
]}
]});

READING.push({unit:17,key:[
["Mi piace il mare, però preferisco la montagna.","我喜欢海，但更喜欢山。"],
["Io bevo il tè, mia sorella invece beve il caffè.","我喝茶，而我妹妹喝咖啡。"],
["Ha studiato molto, eppure non ha passato l'esame.","他学了很多，可还是没通过考试。"],
["Piove; tuttavia usciamo lo stesso.","下雨了；不过我们还是照样出门。"],
["Insomma, è stata una bella giornata.","总之，那是美好的一天。"],
["Prima leggo il testo, poi rispondo alle domande.","我先读课文，然后回答问题。"],
["Conosco Roma, ma non so guidare in città.","我了解罗马，但不会在城里开车。"],
["Sai che ore sono?","你知道几点了吗？"],
["Infatti, hai ragione.","确实，你说得对。"],
["Secondo me, il libro è più interessante del film.","我认为书比电影更有意思。"],
["Non solo parla italiano, ma anche francese.","他不仅会说意大利语，还会说法语。"],
["Quindi, che cosa facciamo?","那么，我们怎么办？"],
["Alla fine abbiamo deciso di restare a casa.","最后我们决定待在家里。"],
["Da una parte è comodo, dall'altra è caro.","一方面它方便，另一方面它贵。"]
],texts:[
{id:'u17-estero',title:'Studiare all\u2019estero: pro e contro',zh:'出国留学：利与弊',kind:'议论文',level:'A2+',s:[
["Studiare all'estero è un sogno per molti giovani, ma non è sempre facile.","出国留学是很多年轻人的梦想，但并不总是容易。"],
["Da una parte, è un'esperienza che apre la mente: si impara una nuova lingua e si conoscono persone di tutto il mondo.","一方面，这是开阔眼界的经历：可以学一门新语言，认识来自世界各地的人。"],
["Inoltre si diventa più indipendenti.","此外，人会变得更独立。"],
["Dall'altra parte, i primi mesi possono essere difficili.","另一方面，最初几个月可能会很难。"],
["Spesso manca la famiglia, la burocrazia è complicata e trovare casa non è semplice.","常常想家，手续繁琐，找房也不容易。"],
["Tuttavia, la maggior parte degli studenti dice che ne vale la pena.","不过，大多数学生说这是值得的。"],
["Infatti, dopo un anno all'estero molti trovano lavoro più facilmente, perché sanno adattarsi a situazioni nuove.","事实上，在国外一年后很多人更容易找到工作，因为他们懂得适应新环境。"],
["Insomma, studiare in un altro paese è una sfida, però può cambiare la vita.","总之，在另一个国家学习是一项挑战，但它可能改变人生。"],
["E tu, che cosa ne pensi?","你呢，你怎么看？"]
],g:[["da una parte… dall'altra","一方面……另一方面"],["burocrazia","官僚手续"],["tuttavia","然而、不过"],["valerne la pena","值得"],["adattarsi","适应"],["sfida","挑战"]],q:[
["Quale è un vantaggio di studiare all'estero, secondo il testo?","文中提到的好处是？",["Si spende poco","Si diventa più indipendenti","Non si studia molto"],1,"si diventa più indipendenti。"],
["Quale è una difficoltà?","一个困难是？",["La burocrazia complicata","Il cibo","Il clima"],0,"la burocrazia è complicata。"],
["«Tuttavia» ha un significato simile a…","tuttavia 的意思接近…",["quindi","però","infatti"],1,"tuttavia ≈ però 表示转折。"],
["Perché molti trovano lavoro più facilmente?","为什么很多人更容易找到工作？",["Sanno adattarsi a situazioni nuove","Hanno molti soldi","Conoscono il direttore"],0,"perché sanno adattarsi a situazioni nuove。"]
]},
{id:'u17-portafoglio',title:'Il portafoglio ritrovato',zh:'失而复得的钱包',kind:'小故事',level:'A2+',s:[
["Un lunedì mattina Ling è salita sull'autobus per andare all'università.","一个周一早上，玲坐上公交去大学。"],
["Era molto stanca, perché la notte prima non aveva dormito quasi per niente.","她很累，因为前一晚几乎没睡。"],
["Quando è scesa, si è accorta che il suo portafoglio non c'era più.","下车时，她发现钱包不见了。"],
["Dentro c'erano i documenti, la tessera dell'università e cinquanta euro.","里面有证件、学生卡和五十欧。"],
["Prima è tornata alla fermata, poi è andata all'ufficio oggetti smarriti, ma niente.","她先回到车站，然后去了失物招领处，但一无所获。"],
["Ling era disperata; eppure, la sera, ha ricevuto una telefonata inaspettata.","玲很绝望；然而晚上她接到一个意想不到的电话。"],
["Era un signore anziano: aveva trovato il portafoglio sull'autobus e aveva visto il numero sulla tessera.","是一位老先生：他在公交上捡到了钱包，看到了学生卡上的号码。"],
["Il giorno dopo si sono incontrati in un bar e Ling gli ha offerto un caffè e una brioche.","第二天他们在咖啡馆见面，玲请他喝了咖啡吃了牛角包。"],
["«In Italia c'è tanta gente onesta», ha pensato Ling, finalmente contenta.","“意大利有很多诚实的人。”玲想，终于开心了。"]
],g:[["accorgersi (accorta)","发觉"],["oggetti smarriti","失物招领"],["disperato/a","绝望的"],["eppure","然而、可是"],["inaspettato/a","意料之外的"],["aveva trovato","他（之前）已找到（愈过去时，仅作认读）"]],q:[
["Perché Ling era stanca?","玲为什么累？",["Aveva lavorato tanto","Non aveva dormito quasi per niente","Era malata"],1,"la notte prima non aveva dormito quasi per niente。"],
["Che cosa c'era nel portafoglio?","钱包里有什么？",["Documenti, tessera e 50 euro","Solo soldi","Le chiavi"],0,"i documenti, la tessera… e cinquanta euro。"],
["Chi ha trovato il portafoglio?","谁找到了钱包？",["L'autista","Un signore anziano","Un'amica"],1,"un signore anziano。"],
["Come ha ringraziato Ling?","玲怎么表示感谢？",["Gli ha dato 50 euro","Gli ha offerto un caffè e una brioche","Gli ha scritto una lettera"],1,"gli ha offerto un caffè e una brioche。"]
]},
{id:'u17-lavoro',title:'Il nuovo lavoro',zh:'新工作（给朋友的消息）',kind:'消息',level:'A2',s:[
["Ciao Bea! Il nuovo lavoro mi piace, però è molto faticoso.","嗨贝娅！我喜欢新工作，不过很累。"],
["Il mio capo è simpatico; i colleghi, invece, sono un po' freddi.","我老板人很好；同事们却有点冷淡。"],
["Lavoro otto ore al giorno, eppure non mi sento stanca come prima.","我每天工作八小时，可是不像以前那么累。"],
["Conosco già molti clienti e so usare il nuovo programma.","我已经认识很多客户，也会用新软件了。"],
["Insomma, sono contenta! E tu? Ci vediamo sabato?","总之，我很满意！你呢？我们周六见吗？"]
],g:[["faticoso/a","累人的"],["capo","老板、上司"],["sentirsi","感觉"],["conoscere vs sapere","认识（人/地方）vs 知道/会"]],q:[
["Com'è il capo?","老板怎么样？",["Freddo","Simpatico","Severo"],1,"Il mio capo è simpatico。"],
["Perché si dice «so usare il programma» e non «conosco usare»?","为什么说 so usare？",["Sapere + infinito = saper fare qualcosa","Conoscere è solo per i luoghi","Sono uguali"],0,"sapere + 动词原形表示“会做”；conoscere 后接人、地方、事物。"],
["«Insomma» serve a…","insomma 用来…",["contrapporre","concludere / riassumere","aggiungere un esempio"],1,"insomma = 总之，用于总结。"]
]}
]});

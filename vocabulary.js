/* 课堂词汇人工逐页核对。相同词合并来源；单元可复现同一词以便复习。
   例句为教学编写，来源页码指单词本身，并非声称例句逐字出自笔记。 */
const VOCAB = [];
const vocabularyIndex = new Map();
function addVocab(page, unit, rows) {
  rows.trim().split('\n').forEach(row => {
    const [it, zh, ex, exZh] = row.split('|');
    if (!it || !zh || !ex || !exZh) throw new Error(`不完整的词条：${row}`);
    const key = it.toLocaleLowerCase('it').replace(/’/g,"'");
    const old = vocabularyIndex.get(key);
    if (old) { old.pages = [...new Set([...old.pages, page])]; old.units = [...new Set([...old.units, unit])]; return; }
    const word = {id:key,it,zh,ex,exZh,pages:[page],units:[unit]};
    VOCAB.push(word); vocabularyIndex.set(key,word);
  });
}
addVocab(9,4,`
azzurro|天蓝色的|Il cielo è azzurro.|天空是蓝色的。
giallo|黄色的|Il limone è giallo.|柠檬是黄色的。
bianco|白色的|La camicia è bianca.|衬衫是白色的。
grigio|灰色的|Il cielo è grigio.|天空灰蒙蒙的。
verde|绿色的；复数 verdi|Le scarpe sono verdi.|鞋是绿色的。
marrone|棕色的；复数 marroni|Gli occhi sono marroni.|眼睛是棕色的。
arancione|橙色的；复数 arancioni|Le borse sono arancioni.|包是橙色的。
blu|蓝色的（通常不变）|I pantaloni sono blu.|裤子是蓝色的。
beige|米色的（通常不变）|Il cappotto è beige.|大衣是米色的。
rosa|粉色的（通常不变）|Le maglie sono rosa.|毛衣是粉色的。
`);
addVocab(9,5,`
a|到；在（城市等）|Vado a Roma.|我去罗马。
in|在……里；到（国家等）|Vivo in Italia.|我住在意大利。
da|从；到某人处|Vengo da Milano.|我来自米兰。
di|……的；关于；来源|Questo è il libro di Maria.|这是 Maria 的书。
su|在……上；关于|Il libro è sul tavolo.|书在桌子上。
con|和；用|Esco con gli amici.|我和朋友们出门。
per|为了；给；经过|Studio per l’esame.|我为考试学习。
tra|在……之间；再过……|Parto tra due giorni.|我两天后出发。
fra|在……之间（与 tra 同义）|Il bar è fra la banca e la scuola.|酒吧在银行和学校之间。
a casa|在家；回家|Sono a casa.|我在家。
a letto|在床上；去睡觉|Vado a letto presto.|我很早上床睡觉。
a scuola|在学校；去上学|Vado a scuola.|我去上学。
a messa|做弥撒；去参与弥撒|Vado a messa.|我去参与弥撒。
a teatro|去剧院；在剧院|Andiamo a teatro.|我们去剧院。
a piedi|步行|Vado a piedi.|我步行去。
a lezione|在上课；去上课|Sono a lezione.|我在上课。
a cena|吃晚饭时；去吃晚饭|Vieni a cena?|你来吃晚饭吗？
a pranzo|吃午饭时；去吃午饭|Ci vediamo a pranzo.|我们午饭时见。
in banca|在银行；去银行|Vado in banca.|我去银行。
in ufficio|在办公室；去办公室|Lavoro in ufficio.|我在办公室工作。
in palestra|在健身房；去健身房|Vado in palestra.|我去健身房。
in città|在城里|Abito in città.|我住在城里。
Milano|米兰|Abito a Milano.|我住在米兰。
Roma|罗马|Vado a Roma.|我去罗马。
Italia|意大利|Vivo in Italia.|我住在意大利。
`);
addVocab(10,6,`
cadere|掉落；摔倒|Il libro cade.|书掉下来了。
volare|飞；乘飞机|Volo a Roma.|我乘飞机去罗马。
volere|想要|Voglio un caffè.|我想要一杯咖啡。
potere|能够；可以|Posso entrare?|我可以进来吗？
uscire|出去|Esco con gli amici.|我和朋友们出门。
piangere|哭|Il bambino piange.|孩子在哭。
ridere|笑|Ridiamo insieme.|我们一起笑。
capire|理解|Non capisco la domanda.|我不理解这个问题。
venire|来|Vieni con noi?|你和我们一起来吗？
adorare|非常喜欢；崇拜|Adoro il mare.|我特别喜欢大海。
sciare|滑雪|Mi piace sciare.|我喜欢滑雪。
correre|跑步；奔跑|Corro nel parco.|我在公园跑步。
piovere|下雨|Oggi piove.|今天下雨。
viaggiare|旅行|Mi piace viaggiare.|我喜欢旅行。
mancare|缺少；使某人想念|Mi manchi.|我想你。
bere|喝|Bevo un tè.|我喝一杯茶。
tornare|回来；返回|Torno a casa.|我回家。
andata|去程；去|Un biglietto di sola andata, per favore.|请给我一张单程票。
negoziare|协商；谈判|Negozio il prezzo.|我协商价格。
imparare|学习；学会|Imparo l’italiano.|我学习意大利语。
vincere|赢；战胜|Vinciamo la partita.|我们赢得比赛。
nuotare|游泳|Nuoto in piscina.|我在游泳池游泳。
padre|父亲|Mio padre lavora.|我的父亲在工作。
luogo|地点；地方|Questo luogo è tranquillo.|这个地方很安静。
posto|位置；地方；座位|Questo posto è libero.|这个座位空着。
mare|海（阳性）|Vado al mare.|我去海边。
pesce|鱼|Mangio il pesce.|我吃鱼。
succo d’arancia|橙汁|Bevo un succo d’arancia.|我喝一杯橙汁。
cereali|麦片；谷物（复数）|Mangio i cereali a colazione.|我早餐吃麦片。
tè al limone|柠檬茶|Vorrei un tè al limone.|我想要一杯柠檬茶。
marmellata|果酱|Mangio pane e marmellata.|我吃面包和果酱。
cornetto|牛角包|Prendo un cornetto.|我要一个牛角包。
coltello|刀|Il coltello è sul tavolo.|刀在桌子上。
bicchiere|玻璃杯|Vorrei un bicchiere d’acqua.|我想要一杯水。
forchetta|叉子|Uso la forchetta.|我用叉子。
apribottiglia|开瓶器（常用同形复数）|Dov’è l’apribottiglia?|开瓶器在哪里？
cucchiaio|勺子|Prendo un cucchiaio.|我拿一把勺子。
tovaglia|桌布|La tovaglia è bianca.|桌布是白色的。
tovagliolo|餐巾|Mi serve un tovagliolo.|我需要一张餐巾。
fagiolini|四季豆（复数）|Mangio i fagiolini.|我吃四季豆。
patatine fritte|薯条|Vorrei le patatine fritte.|我想要薯条。
insalata|沙拉|Prendo un’insalata.|我要一份沙拉。
dolce|甜的；甜点|Mi piacciono i dolci.|我喜欢甜点。
torta|蛋糕|La torta è buona.|蛋糕很好吃。
panino al prosciutto|火腿三明治|Vorrei un panino al prosciutto.|我想要一个火腿三明治。
edicola|报刊亭|Compro il giornale in edicola.|我在报刊亭买报纸。
giornale|报纸|Leggo il giornale.|我读报纸。
`);
addVocab(11,5,`
in centro|在市中心；去市中心|Vado in centro.|我去市中心。
in periferia|在郊区|Abito in periferia.|我住在郊区。
in posta|在邮局；去邮局|Vado in posta.|我去邮局。
in negozio|在商店|Lavoro in negozio.|我在商店工作。
in ospedale|在医院|Lui è in ospedale.|他在医院。
in stazione|在车站|Ti aspetto in stazione.|我在车站等你。
in aeroporto|在机场|Sono in aeroporto.|我在机场。
in piscina|在游泳池|Nuoto in piscina.|我在泳池游泳。
in vacanza|在度假|Sono in vacanza.|我在度假。
in spiaggia|在海滩|Siamo in spiaggia.|我们在海滩。
in montagna|在山里；去山里|Vado in montagna.|我去山里。
in collina|在丘陵|Abito in collina.|我住在丘陵地区。
in campeggio|露营|Vado in campeggio.|我去露营。
in campagna|在乡村|Vivo in campagna.|我住在乡村。
in chiesa|在教堂|Sono in chiesa.|我在教堂。
in albergo|在旅馆|Dormo in albergo.|我住在旅馆。
in hotel|在酒店|Lavoro in hotel.|我在酒店工作。
in guerra|处于战争中|Il paese è in guerra.|这个国家处于战争中。
in borsa|在包里|Il telefono è in borsa.|手机在包里。
in ambasciata|在大使馆|Vado in ambasciata.|我去大使馆。
in luna di miele|在度蜜月|Sono in luna di miele.|我在度蜜月。
in tasca|在口袋里|Le chiavi sono in tasca.|钥匙在口袋里。
in una casa|在一所房子里|Abito in una casa grande.|我住在一所大房子里。
in farmacia|在药店；去药店|Vado in farmacia.|我去药店。
in libreria|在书店；去书店|Compro libri in libreria.|我在书店买书。
in via|在……街|Abito in via Roma.|我住在罗马街。
in piazza|在广场|Ci vediamo in piazza.|我们在广场见。
in biblioteca|在图书馆|Leggo in biblioteca.|我在图书馆读书。
in discoteca|在迪厅|Balliamo in discoteca.|我们在迪厅跳舞。
quartiere|街区；社区|Il mio quartiere è tranquillo.|我住的街区很安静。
stanco|累的|Sono stanco.|我累了（男性说）。
senza|没有；不带|Un caffè senza zucchero.|一杯不加糖的咖啡。
ogni giorno|每天|Cammino ogni giorno.|我每天步行。
`);
addVocab(11,6,`
piacere|使……喜欢；喜欢|Mi piace la pizza.|我喜欢披萨。
mi piace|我喜欢（单数名词或不定式）|Mi piace leggere.|我喜欢读书。
mi piacciono|我喜欢（复数名词）|Mi piacciono gli spaghetti.|我喜欢意大利细面。
mi dispiace|对不起；我很遗憾|Mi dispiace per il ritardo.|抱歉，我迟到了。
anch’io|我也一样（普通主语句）|Abito a Milano. Anch’io.|我住在米兰。我也是。
anche a me|我也喜欢；对我也一样|Mi piace la pizza. Anche a me.|我喜欢披萨。我也喜欢。
a me no|我不（针对 piacere 等）|A me no, grazie.|我不喜欢，谢谢。
neanche a me|我也不（针对 piacere 等）|Non mi piace. Neanche a me.|我不喜欢。我也不喜欢。
a me sì|但我喜欢；对我来说是|A me sì, piace molto.|但我很喜欢。
spaghetti|意大利细面（复数）|Mangio gli spaghetti.|我吃意大利细面。
un sacco|很多；非常（口语）|Mi piace un sacco.|我特别喜欢。
`);
addVocab(12,6,`
prendo un caffè|我要一杯咖啡|Prendo un caffè, grazie.|我要一杯咖啡，谢谢。
per me|对我来说；我要（点餐）|Per me un caffè.|我要一杯咖啡。
vorrei|我想要（礼貌用法）|Vorrei un caffè, per favore.|我想要一杯咖啡，谢谢。
posso avere|我可以要……吗|Posso avere un caffè?|我可以要一杯咖啡吗？
per favore|请；劳驾|Un caffè, per favore.|请给我一杯咖啡。
grazie|谢谢|Grazie per l’aiuto.|谢谢你的帮助。
tanto|很多；非常|Mi piace tanto.|我很喜欢。
tantissimo|非常非常多；非常|Ti ringrazio tantissimo.|我非常感谢你。
da morire|要命地；极其（口语夸张）|Mi piace da morire.|我喜欢极了。
troppo|太；过多|È troppo caro.|太贵了。
per niente|一点也不|Non mi piace per niente.|我一点也不喜欢。
non c’è di che|不客气|Grazie! Non c’è di che.|谢谢！不客气。
`);
addVocab(13,7,`
mio|我的（阳单）|Questo è il mio libro.|这是我的书。
mia|我的（阴单）|Questa è la mia casa.|这是我的房子。
miei|我的（阳复）|Questi sono i miei amici.|这些是我的朋友。
mie|我的（阴复）|Queste sono le mie penne.|这些是我的笔。
tuo|你的（阳单）|Dov’è il tuo libro?|你的书在哪里？
suo|他的；她的；它的（阳单）|Questo è il suo telefono.|这是他/她的手机。
nostro|我们的（阳单）|Questo è il nostro quartiere.|这是我们的街区。
vostro|你们的（阳单）|Dov’è il vostro albergo?|你们的旅馆在哪里？
loro|他们的；她们的（不变）|Questa è la loro casa.|这是他们的房子。
preferito|最喜欢的|È il mio cantante preferito.|他是我最喜欢的歌手。
preferire|更喜欢（-isc- 动词）|Preferisco il tè.|我更喜欢茶。
finire|结束（-isc- 动词）|Finisco il lavoro.|我完成工作。
pulire|打扫（-isc- 动词）|Pulisco la camera.|我打扫房间。
costruire|建造（-isc- 动词）|Costruiscono una casa.|他们在建一所房子。
spedire|寄送（-isc- 动词）|Spedisco una lettera.|我寄一封信。
`);
addVocab(14,7,`
pescheria|鱼店|Compro il pesce in pescheria.|我在鱼店买鱼。
pasticceria|糕点店|Compro una torta in pasticceria.|我在糕点店买蛋糕。
gelateria|冰淇淋店|Andiamo in gelateria.|我们去冰淇淋店。
ipermercato|大型超市|Faccio la spesa all’ipermercato.|我在大型超市购物。
alimento|食物；食品|Compro alimenti freschi.|我买新鲜食品。
vestito|衣服|Il vestito è bello.|这件衣服很漂亮。
televisore|电视机|Il televisore non funziona.|电视机不能用了。
panificio|面包店|Compro il pane al panificio.|我在面包店买面包。
pane|面包|Mangio il pane.|我吃面包。
pizza|披萨|La pizza è buona.|披萨很好吃。
biscotto|饼干|Mangio due biscotti.|我吃两块饼干。
macelleria|肉店|Compro la carne in macelleria.|我在肉店买肉。
carne|肉|Non mangio carne.|我不吃肉。
ferramenta|五金店|Vado in ferramenta.|我去五金店。
libreria|书店；书架|Compro un libro in libreria.|我在书店买一本书。
enoteca|葡萄酒商店|Compro il vino in enoteca.|我在葡萄酒商店买酒。
palestra|健身房|Vado in palestra.|我去健身房。
cartoleria|文具店|Compro una penna in cartoleria.|我在文具店买笔。
negoziare|协商；谈判|Negozio il prezzo.|我协商价格。
verdura|蔬菜|Compro la verdura.|我买蔬菜。
frutta|水果|Mangio la frutta.|我吃水果。
spesso|经常|Vado spesso in palestra.|我常去健身房。
di solito|通常|Di solito bevo il tè.|我通常喝茶。
mazzo|一束；一捆|Compro un mazzo di fiori.|我买一束花。
mezzo|半；中间；交通工具|Vorrei mezzo chilo di pane.|我想要半公斤面包。
ecco|看；给你；这就是|Ecco il tuo libro.|给你你的书。
pago io|我来付款|Oggi pago io.|今天我来付款。
del pane|一些面包（部分冠词）|Compro del pane.|我买一些面包。
dell’acqua|一些水（部分冠词）|Vorrei dell’acqua.|我想要一些水。
dei libri|一些书（阳复）|Compro dei libri.|我买一些书。
`);
addVocab(1,1,`
pasta|意大利面|Mangio la pasta.|我吃意大利面。
penna|钢笔；笔|Ho una penna blu.|我有一支蓝色的笔。
primo|第一的|È il primo giorno.|这是第一天。
bocca|嘴|Apri la bocca.|张开嘴。
bene|好；很好|Sto bene, grazie.|我很好，谢谢。
bravo|能干的；出色的|Sei molto bravo.|你很棒。
fine|结束；末尾|È la fine del corso.|课程结束了。
faro|灯塔|Il faro è vicino al mare.|灯塔在海边。
fratello|兄弟|Mio fratello studia.|我的兄弟在学习。
vero|真的；真实的|È vero.|这是真的。
viola|紫色（通常不变）|La borsa è viola.|包是紫色的。
venerdì|星期五|Venerdì lavoro.|星期五我工作。
madre|母亲|Mia madre è a casa.|我妈妈在家。
molto|很；非常；许多|Studio molto.|我学习很多。
mano|手（阴性）；复数 mani|Alzo la mano.|我举手。
quadro|画；图画|Il quadro è bello.|这幅画很漂亮。
quindi|所以；然后|Piove, quindi resto a casa.|下雨了，所以我留在家。
quasi|几乎|Sono quasi pronto.|我快准备好了。
casa|家；房子|Vado a casa.|我回家。
cono|圆锥；冰淇淋甜筒|Vorrei un cono.|我想要一个甜筒。
cuore|心|Il cuore batte.|心脏在跳动。
cena|晚餐|La cena è pronta.|晚餐准备好了。
anche|也；还|Vengo anch’io.|我也来。
gatto|猫|Il gatto dorme.|猫在睡觉。
gonna|裙子|La gonna è rossa.|裙子是红色的。
gusto|味道；口味|Quale gusto preferisci?|你更喜欢哪种口味？
giorno|天；白天|Studio ogni giorno.|我每天学习。
fungo|蘑菇；复数 funghi|Mi piacciono i funghi.|我喜欢蘑菇。
tavolo|桌子|Il libro è sul tavolo.|书在桌子上。
testa|头|Mi fa male la testa.|我头疼。
tonno|金枪鱼|Vorrei un panino al tonno.|我想要一个金枪鱼三明治。
dente|牙齿|Mi fa male un dente.|我有一颗牙疼。
dito|手指|Mi sono fatto male a un dito.|我的一根手指受伤了。
domenica|星期日|Domenica riposo.|星期日我休息。
lingua|语言；舌头|Studio una lingua nuova.|我在学一门新语言。
luce|光；灯光|Accendo la luce.|我打开灯。
lunedì|星期一|Lunedì ho lezione.|星期一我有课。
nero|黑色的|Il gatto è nero.|猫是黑色的。
nonna|祖母；外祖母|Mia nonna cucina.|我的奶奶在做饭。
neve|雪|C’è la neve.|有雪。
rosso|红色的|Il vino è rosso.|葡萄酒是红色的。
ramo|树枝|Un uccello è sul ramo.|一只鸟在树枝上。
ritardo|迟到；延迟|Il treno è in ritardo.|火车晚点了。
sera|晚上|La sera leggo.|晚上我读书。
serpente|蛇|Vedo un serpente.|我看见一条蛇。
sedia|椅子|La sedia è comoda.|椅子很舒服。
zaino|背包|Lo zaino è pesante.|背包很重。
zucchero|糖|Non metto zucchero nel caffè.|我喝咖啡不加糖。
zio|叔叔；舅舅等男性长辈|Mio zio vive a Roma.|我叔叔住在罗马。
Juventus|尤文图斯（球队名）|La Juventus gioca oggi.|尤文图斯今天比赛。
koala|考拉|Il koala dorme.|考拉在睡觉。
`);
addVocab(2,1,`
xilofono|木琴|Suono lo xilofono.|我演奏木琴。
yogurt|酸奶|Mangio uno yogurt.|我吃一份酸奶。
Walter|沃尔特（人名）|Walter è italiano.|Walter 是意大利人。
io|我|Io sono cinese.|我是中国人。
tu|你|Tu come ti chiami?|你叫什么名字？
lui|他|Lui è italiano.|他是意大利人。
lei|她；Lei 表示尊称“您”|Lei è francese.|她是法国人。
noi|我们|Noi siamo studenti.|我们是学生。
voi|你们|Voi siete italiani?|你们是意大利人吗？
loro|他们；她们|Loro sono amici.|他们是朋友。
avere|有|Ho venti anni.|我二十岁。
essere|是；在|Sono a Milano.|我在米兰。
chiamarsi|名叫；叫作|Mi chiamo Lin.|我叫 Lin。
di dove sei?|你来自哪里？|Di dove sei? Sono di Milano.|你来自哪里？我来自米兰。
da dove vieni?|你从哪里来？|Da dove vieni? Vengo da Roma.|你从哪里来？我从罗马来。
non|不|Non sono italiano.|我不是意大利人。
italiano|意大利的；意大利人；意大利语|Parlo italiano.|我说意大利语。
francese|法国的；法国人；法语|Lei è francese.|她是法国人。
marocchino|摩洛哥的；摩洛哥人|Lui è marocchino.|他是摩洛哥人。
rumeno|罗马尼亚的；罗马尼亚人|Sono rumeno.|我是罗马尼亚人。
russo|俄罗斯的；俄罗斯人；俄语|Studio il russo.|我学俄语。
greco|希腊的；希腊人；希腊语|Il mio amico è greco.|我的朋友是希腊人。
tedesco|德国的；德国人；德语|Parli tedesco?|你说德语吗？
chiave|钥匙；复数 chiavi|Cerco le chiavi.|我在找钥匙。
`);
addVocab(3,2,`
Cina|中国|Vengo dalla Cina.|我来自中国。
cinese|中国的；中国人；汉语|Sono cinese.|我是中国人。
ieri|昨天|Ieri ho studiato.|昨天我学习了。
oggi|今天|Oggi ho lezione.|今天我有课。
domani|明天|Domani parto.|我明天出发。
anno|年；复数 anni|Ho ventidue anni.|我二十二岁。
dove|哪里|Dove abiti?|你住在哪里？
quando|什么时候|Quando parti?|你什么时候出发？
perché|为什么；因为|Perché studi italiano?|你为什么学意大利语？
che cosa|什么；也可说 cosa 或 che|Che cosa fai?|你在做什么？
chi|谁|Chi è John?|谁是 John？
quanto|多少；多少钱（阳单）|Quanto costa?|多少钱？
quanta|多少（阴单）|Quanta acqua vuoi?|你想要多少水？
quanti|多少（阳复）|Quanti amici hai?|你有多少朋友？
quante|多少（阴复）|Quante amiche hai?|你有多少位女性朋友？
quale|哪一个；复数 quali|Quale gelato vuoi?|你想要哪个冰淇淋？
quali|哪些|Quali gusti preferisci?|你更喜欢哪些口味？
come|如何；怎样；像|Come stai?|你好吗？
com’è|它/他/她怎么样（come è）|Com’è la casa?|这所房子怎么样？
dov’è|它/他/她在哪里（dove è）|Dov’è il bagno?|洗手间在哪里？
di chi|谁的|Di chi è questo libro?|这本书是谁的？
a chi|给谁；对谁|A chi scrivi?|你给谁写信？
biblioteca|图书馆|Studio in biblioteca.|我在图书馆学习。
scuola|学校|Vado a scuola.|我去上学。
matita|铅笔|Scrivo con la matita.|我用铅笔写字。
dollaro|美元|Costa un dollaro.|这要一美元。
libro|书|Leggo un libro.|我读一本书。
porta|门|Chiudo la porta.|我关上门。
finestra|窗户|Apro la finestra.|我打开窗户。
orologio|钟；手表|Il mio orologio è nuovo.|我的手表是新的。
telefono|电话|Il telefono è sul tavolo.|电话在桌子上。
cane|狗|Il cane è piccolo.|这只狗很小。
parete|墙|Il quadro è sulla parete.|画在墙上。
fotografia|照片；简称 foto|Guardo una fotografia.|我看一张照片。
motocicletta|摩托车；简称 moto|Ho una motocicletta.|我有一辆摩托车。
stazione|车站|La stazione è vicina.|车站很近。
cellulare|手机|Uso il cellulare.|我使用手机。
quaderno|笔记本|Scrivo sul quaderno.|我在笔记本上写字。
elefante|大象|L’elefante è grande.|大象很大。
nazione|国家|L’Italia è una nazione europea.|意大利是一个欧洲国家。
`);
addVocab(4,3,`
caffè|咖啡（阳性；单复数同形）|Prendo un caffè.|我要一杯咖啡。
fiore|花（阳性）|Questo fiore è bello.|这朵花很漂亮。
sale|盐（阳性）|Passami il sale, per favore.|请把盐递给我。
canzone|歌曲|Ascolto una canzone.|我听一首歌。
museo|博物馆|Visito un museo.|我参观一家博物馆。
mangiare|吃|Mangiamo una pizza.|我们吃披萨。
leggere|读|Leggo il giornale.|我读报纸。
dormire|睡觉|Dormo otto ore.|我睡八个小时。
martedì|星期二|Martedì studio.|星期二我学习。
mercoledì|星期三|Mercoledì ho un esame.|星期三我有考试。
giovedì|星期四|Giovedì lavoro.|星期四我工作。
sabato|星期六|Sabato vado al cinema.|星期六我去看电影。
poi|然后|Studio e poi mangio.|我先学习，然后吃饭。
dopo|之后|Dopo la lezione torno a casa.|下课后我回家。
prima|之前；首先|Prima studio, poi esco.|我先学习，然后出门。
notte|夜晚|La notte dormo.|夜晚我睡觉。
mattina|早上；上午|La mattina studio.|上午我学习。
pomeriggio|下午|Lavoro il pomeriggio.|我下午工作。
settimana|周；星期|Studio tutta la settimana.|我整个星期都学习。
pranzo|午餐|Il pranzo è pronto.|午餐准备好了。
colazione|早餐|Faccio colazione alle otto.|我八点吃早餐。
indossare|穿；戴|Indosso una camicia.|我穿一件衬衫。
cominciare a|开始做……|Comincio a studiare.|我开始学习。
continuare a|继续做……|Continuo a leggere.|我继续读书。
andare a|去做……|Vado a dormire.|我去睡觉。
imparare a|学会做……|Imparo a cucinare.|我学习做饭。
insegnare a|教某人做……|Mi insegna a suonare la chitarra.|他/她教我弹吉他。
abituarsi a|习惯于……|Mi abituo a vivere in Italia.|我逐渐习惯在意大利生活。
riuscire a|成功做到；能够做到|Riesco a capire.|我能理解。
provare a|尝试做……|Provo a telefonare.|我试着打电话。
chitarra|吉他|Suono la chitarra.|我弹吉他。
telefonare|打电话|Telefono a mia madre.|我给妈妈打电话。
`);
addVocab(5,3,`
andare|去|Vado a Roma.|我去罗马。
stare|待；处于某种状态|Sto bene.|我很好。
fare|做|Faccio i compiti.|我做作业。
`);
addVocab(6,2,`
compito|作业；任务|Faccio i compiti.|我做作业。
comprare|购买|Compro il pane.|我买面包。
vendere|卖|Vendo la mia macchina.|我卖自己的车。
così|这样；如此|Va bene così.|这样就可以。
molti|许多（阳复）|Ho molti libri.|我有很多书。
pappagallo|鹦鹉|Il pappagallo è verde.|鹦鹉是绿色的。
vino|葡萄酒|Bevo un bicchiere di vino.|我喝一杯葡萄酒。
male|不好；疼痛|Sto male.|我身体不舒服。
falso|错误的；假的|Questo è falso.|这是错的。
ragazzo|男孩；年轻男子|Il ragazzo studia.|这个男孩在学习。
ragazza|女孩；年轻女子|La ragazza legge.|这个女孩在读书。
studente|男学生；复数 studenti|Sono studente.|我是男学生。
studentessa|女学生（教学补充）|Sono studentessa.|我是女学生。
uomo|男人；人；复数 uomini|Quell’uomo è mio padre.|那个男人是我的父亲。
amico|朋友（男）；复数 amici|Lui è un mio amico.|他是我的一位朋友。
medico|医生；复数 medici|Mio padre è medico.|我爸爸是医生。
parco|公园；复数 parchi|Vado al parco.|我去公园。
lago|湖；复数 laghi|Il lago è grande.|这个湖很大。
farmacia|药店；复数 farmacie|Vado in farmacia.|我去药店。
arancia|橙子；复数 arance|Mangio un’arancia.|我吃一个橙子。
`);
addVocab(7,4,`
simpatico|友善的；讨人喜欢的|Marco è simpatico.|Marco 很讨人喜欢。
elegante|优雅的|Il vestito è elegante.|这件衣服很优雅。
bello|漂亮的；美好的|La città è bella.|这座城市很美。
brutto|丑的；糟糕的|Il tempo è brutto.|天气很糟。
alto|高的|Mio fratello è alto.|我的兄弟很高。
basso|矮的；低的|Il tavolo è basso.|桌子很低。
buono|好的；好吃的|Il pane è buono.|面包很好吃。
cattivo|坏的|Questo odore è cattivo.|这个气味不好闻。
antipatico|不讨人喜欢的|Non è antipatico.|他并不讨人嫌。
vuoto|空的|Il bicchiere è vuoto.|杯子是空的。
pieno|满的|Il treno è pieno.|火车很满。
freddo|冷的；寒冷|Fa freddo.|天气冷。
caldo|热的；炎热|Fa caldo.|天气热。
lento|慢的|Il treno è lento.|火车很慢。
vecchio|旧的；年老的|Il libro è vecchio.|这本书很旧。
nuovo|新的|Ho un telefono nuovo.|我有一部新手机。
rapido|快的|È un servizio rapido.|这项服务很快。
piccolo|小的|La camera è piccola.|房间很小。
ampio|宽敞的；广阔的|L’appartamento è ampio.|公寓很宽敞。
difficile|困难的|L’esame è difficile.|考试很难。
facile|容易的|Questo esercizio è facile.|这个练习很容易。
interessante|有趣的|Il libro è interessante.|这本书很有趣。
intelligente|聪明的|Lei è intelligente.|她很聪明。
gentile|友善的；有礼貌的|Lei è molto gentile.|您非常友善。
veloce|快的|Il treno è veloce.|火车很快。
triste|悲伤的|Oggi sono triste.|今天我很难过。
giovane|年轻的|Il professore è giovane.|老师很年轻。
felice|快乐的|Sono felice.|我很开心。
forte|强的；强壮的|Il vento è forte.|风很大。
grande|大的|La casa è grande.|房子很大。
domanda|问题；申请|Ho una domanda.|我有一个问题。
filosofia|哲学|Studio filosofia.|我学哲学。
indirizzo|地址|Qual è il tuo indirizzo?|你的地址是什么？
nascita|出生|Qual è la tua data di nascita?|你的出生日期是什么？
data|日期|Scrivo la data.|我写下日期。
nome|名字（阳性）|Qual è il tuo nome?|你叫什么名字？
borsa|包；手提包|La borsa è nera.|包是黑色的。
camera|房间；卧室|La camera è luminosa.|房间很明亮。
esame|考试；检查|Domani ho un esame.|明天我有考试。
professore|男教师；教授|Il professore spiega.|老师在讲解。
aula|教室|Siamo in aula.|我们在教室里。
cantante|歌手|Il mio cantante preferito è italiano.|我最喜欢的歌手是意大利人。
discorso|讲话；谈话|Ascolto il discorso.|我听讲话。
persona|人（阴性名词）|È una persona gentile.|他/她是一位友善的人。
bottiglia|瓶子|Compro una bottiglia d’acqua.|我买一瓶水。
bagno|洗手间；浴室|Dov’è il bagno?|洗手间在哪里？
ombrello|雨伞|Prendo l’ombrello.|我拿起雨伞。
bicicletta|自行车|Vado in bicicletta.|我骑自行车。
erba|草|L’erba è verde.|草是绿色的。
sorella|姐妹|Mia sorella è a casa.|我的姐妹在家。
occasione|机会；场合|È una buona occasione.|这是个好机会。
armadio|衣柜|I vestiti sono nell’armadio.|衣服在衣柜里。
abito|衣服；礼服；套装|Questo abito è elegante.|这件衣服很优雅。
città|城市（单复数同形）|Milano è una grande città.|米兰是一座大城市。
re|国王（单复数同形）|Il re vive nel palazzo.|国王住在宫殿里。
`);
addVocab(8,3,`
domandare|询问|Domando l’indirizzo.|我问地址。
abitare|住|Abito a Milano.|我住在米兰。
studiare|学习|Studio italiano.|我学习意大利语。
parlare|说；讲话|Parliamo italiano.|我们说意大利语。
amare|爱|Amo la musica.|我爱音乐。
lavorare|工作|Lavoro in ufficio.|我在办公室工作。
arrivare|到达|Arrivo alle otto.|我八点到。
ballare|跳舞|Mi piace ballare.|我喜欢跳舞。
cucinare|做饭|Cucino la pasta.|我煮意大利面。
guardare|看；观看|Guardo un film.|我看一部电影。
scrivere|写|Scrivo una lettera.|我写一封信。
vedere|看见|Vedo la stazione.|我看见车站。
chiedere|询问；请求|Chiedo un’informazione.|我询问一条信息。
mettere|放；穿上|Metto il libro sul tavolo.|我把书放在桌子上。
vivere|生活；居住|Vivo in Italia.|我住在意大利。
prendere|拿；要；乘坐|Prendo l’autobus.|我乘公交车。
chiudere|关闭|Chiudo la finestra.|我关窗。
partire|出发；离开|Parto domani.|我明天出发。
aprire|打开|Apro la porta.|我打开门。
offrire|提供；请客|Ti offro un caffè.|我请你喝杯咖啡。
camminare|步行|Cammino ogni giorno.|我每天步行。
lavare|洗|Lavo i piatti.|我洗盘子。
giocare|玩；进行球类运动|Gioco a calcio.|我踢足球。
ascoltare|听（有意聆听）|Ascolto la musica.|我听音乐。
sentire|听见；感觉|Sento un rumore.|我听见一阵声音。
rispondere|回答|Rispondo alla domanda.|我回答问题。
salire|上去；登上|Salgo sul treno.|我上火车。
cantare|唱|Canto una canzone.|我唱一首歌。
`);
addVocab(8,4,`
sci|滑雪；滑雪板|Mi piace lo sci.|我喜欢滑雪。
birra|啤酒|Prendo una birra.|我要一杯啤酒。
ombra|影子；阴影|Mi siedo all’ombra.|我坐在阴凉处。
parola|单词；话语|Non capisco questa parola.|我不明白这个词。
racconto|故事；短篇小说|Leggo un racconto.|我读一篇故事。
macchina|汽车；机器|Ho una macchina.|我有一辆车。
bambino|孩子；小男孩|Il bambino dorme.|孩子在睡觉。
piatto|盘子；一道菜；平的|Il piatto è sul tavolo.|盘子在桌子上。
letto|床|Vado a letto.|我上床睡觉。
sole|太阳|C’è il sole.|阳光明媚。
scarpa|鞋|Questa scarpa è comoda.|这只鞋很舒服。
camicia|衬衫|Indosso una camicia bianca.|我穿一件白衬衫。
albero|树|L’albero è alto.|树很高。
palla|球|Il bambino gioca con la palla.|孩子在玩球。
penne|斜管意面；也可指多支笔|Mangio le penne al pomodoro.|我吃番茄酱斜管意面。
occhiali|眼镜（复数）|Porto gli occhiali.|我戴眼镜。
fiume|河|Il fiume è lungo.|这条河很长。
lampada|灯|La lampada è nuova.|这盏灯是新的。
sedile|座位|Questo sedile è libero.|这个座位空着。
lettera|信；字母|Scrivo una lettera.|我写一封信。
specchio|镜子|Mi guardo allo specchio.|我照镜子。
`);
addVocab(15,7,`
ora|小时；现在；复数 ore|Sono le due.|现在两点。
solito|平常的；惯常的|Prendo il solito caffè.|我要平常喝的咖啡。
crema|奶油；乳霜|Vorrei un dolce alla crema.|我想要一个奶油甜点。
giusto|正确的；合适的|È giusto.|这是对的。
esatto|准确的；正确的|L’indirizzo è esatto.|地址是准确的。
sedersi|坐下；mi siedo|Mi siedo qui.|我坐在这里。
subito|立刻；马上|Arrivo subito.|我马上到。
resto|找零；剩余部分|Ecco il resto.|这是找给你的钱。
però|但是|È bello, però è caro.|它很漂亮，但是很贵。
caro|昂贵的；亲爱的|Questo albergo è caro.|这家旅馆很贵。
veramente|真的；确实|È veramente bello.|它真的很美。
e poi|然后；此外|Studio e poi esco.|我学习，然后出门。
professoressa|女教师；女教授|La professoressa spiega.|女老师在讲解。
abbonamento|订阅；月票等定期服务|Compro un abbonamento mensile.|我购买一张月票。
festa|聚会；节日|Vado a una festa.|我去参加聚会。
questo|这；这个（阳单）|Questo libro è nuovo.|这本书是新的。
tazza|茶杯；有把手的杯子|Bevo una tazza di tè.|我喝一杯茶。
insomma|总之；嗯（口语总结）|Insomma, è una buona idea.|总之，这是个好主意。
cosa|东西；事情|Ho una cosa da fare.|我有一件事要做。
gente|人们（阴性单数集合名词）|C’è molta gente.|有很多人。
paio|一双；一对|Compro un paio di scarpe.|我买一双鞋。
restare|留下；待着|Resto a casa.|我留在家。
ma|但是|È piccolo ma comodo.|它小但很舒服。
tuttavia|然而（较书面）|È caro, tuttavia è buono.|它很贵，然而品质不错。
eppure|然而；尽管如此|È tardi, eppure lavora ancora.|很晚了，他却还在工作。
invece|而；相反|Io studio, lui invece lavora.|我学习，而他工作。
maestra|女老师（常指小学等）|La maestra è gentile.|女老师很友善。
classe|班级；等级|La mia classe è piccola.|我的班级很小。
fruttivendolo|水果蔬菜商贩|Compro le mele dal fruttivendolo.|我从果蔬商那里买苹果。
cappello|帽子|Metto il cappello.|我戴上帽子。
maglia|毛衣；上衣|La maglia è verde.|毛衣是绿色的。
pantaloni|裤子（复数）|I pantaloni sono neri.|裤子是黑色的。
astuccio|笔袋|La penna è nell’astuccio.|笔在笔袋里。
righello|尺子|Uso il righello.|我用尺子。
gomma|橡皮；橡胶|Ho bisogno di una gomma.|我需要一块橡皮。
pennarello|彩色笔；马克笔|Disegno con un pennarello.|我用彩色笔画画。
forbici|剪刀（阴性复数）|Uso le forbici.|我使用剪刀。
temperino|卷笔刀|Il temperino è nell’astuccio.|卷笔刀在笔袋里。
buio|黑暗的；黑暗|La camera è buia.|房间很暗。
luminoso|明亮的|La casa è luminosa.|房子很明亮。
comodo|舒服的；方便的|Il letto è comodo.|床很舒服。
scomodo|不舒服的；不方便的|La sedia è scomoda.|椅子不舒服。
antico|古老的|Il palazzo è antico.|这座楼很古老。
palazzo|大楼；宫殿|Abito in un palazzo antico.|我住在一座老楼里。
silenzioso|安静的|Il quartiere è silenzioso.|街区很安静。
rumoroso|嘈杂的|Il bar è rumoroso.|酒吧很吵。
tranquillo|安静的；平静的|Questo posto è tranquillo.|这个地方很安静。
`);
addVocab(16,8,`
sapere|知道；会（技能）|So nuotare.|我会游泳。
potere|可以；能够|Posso pagare qui?|我可以在这里付款吗？
dovere|必须；应该|Devo studiare.|我必须学习。
volere|想要|Voglio partire.|我想出发。
uscire|出门；出去|Esco alle otto.|我八点出门。
dire|说|Dico la verità.|我说实话。
bere|喝|Bevo acqua.|我喝水。
dare|给|Ti do il libro.|我把书给你。
venire|来|Vengo da te.|我去你那里。
c’è|有（单数）|C’è un bar.|有一家酒吧。
ci sono|有（复数）|Ci sono due bar.|有两家酒吧。
che|……的（关系代词）；什么|C’è un uomo che dorme.|有一个正在睡觉的男人。
`);
addVocab(17,9,`
perdersi|迷路|Mi sono perso.|我迷路了（男性说）。
mi può dire|您能告诉我……|Mi può dire dov’è la stazione?|您能告诉我车站在哪里吗？
come arrivare a|怎样到达……|Come arrivare al museo?|怎样到博物馆？
adesso|现在|Adesso sono in centro.|我现在在市中心。
trovarsi|位于；处在|La banca si trova qui.|银行位于这里。
davanti a|在……前面|Il bar è davanti alla scuola.|酒吧在学校前面。
vai dritto|直走|Vai dritto fino al semaforo.|直走到红绿灯。
fino a|直到；到……为止|Lavoro fino alle cinque.|我工作到五点。
semaforo|红绿灯|Gira al semaforo.|在红绿灯处转弯。
girare|转弯；转动|Gira a destra.|向右转。
a sinistra|向左；在左边|La banca è a sinistra.|银行在左边。
a destra|向右；在右边|Gira a destra.|向右转。
ho capito|我明白了|Ho capito, grazie.|我明白了，谢谢。
fermata|公交或地铁站点|Scendo alla prossima fermata.|我在下一站下车。
in direzione di|朝……方向|Vado in direzione del centro.|我朝市中心方向去。
se non sbaglio|如果我没弄错|Se non sbaglio, è qui.|如果我没弄错，就在这里。
sbagliare|弄错|Posso sbagliare.|我可能会弄错。
scendere|下去；下车|Scendo dal treno.|我下火车。
ottimo|极好的；太棒了|Ottimo, grazie!|太好了，谢谢！
aiuto|帮助|Ho bisogno di aiuto.|我需要帮助。
di niente|不客气|Grazie! Di niente.|谢谢！不客气。
figurati|别客气；没关系（对 tu）|Figurati, nessun problema.|没关系，没问题。
anche a te|也祝你……|Buon viaggio! Anche a te.|旅途愉快！你也是。
buon viaggio|旅途愉快|Buon viaggio e a presto!|旅途愉快，回头见！
attraversare|穿过；横穿|Attraverso la strada.|我横穿马路。
traversa|横街；支路|Prendi la prima traversa.|走第一条横街。
incrocio|十字路口；交叉口|Gira al primo incrocio.|在第一个路口转弯。
dietro l’angolo|在拐角处；就在转角后|Il bar è dietro l’angolo.|酒吧就在拐角处。
`);
addVocab(18,9,`
nave|船|Viaggio in nave.|我乘船旅行。
moto|摩托车（阴性不变）|Vado in moto.|我骑摩托车去。
metropolitana|地铁；简称 metro|Prendo la metropolitana.|我坐地铁。
automobile|汽车；简称 auto|Viaggio in automobile.|我乘汽车旅行。
treno|火车|Prendo il treno.|我乘火车。
Vespa|Vespa 小型摩托车（品牌）|Vado in Vespa.|我骑 Vespa 去。
aereo|飞机；复数 aerei|Prendo l’aereo.|我乘飞机。
al mare|去海边；在海边|Vado al mare.|我去海边。
al parco|去公园；在公园|Vado al parco.|我去公园。
al lavoro|去工作；在工作|Sono al lavoro.|我在工作。
autobus|公交车（单复数同形）|Prendo l’autobus.|我乘公交车。
bici|自行车（阴性不变）|Vado in bici.|我骑自行车。
metro|地铁（阴性不变）|Vado in metro.|我乘地铁。
biglietto|票|Compro un biglietto.|我买一张票。
finestrino|车窗；小窗|Guardo dal finestrino.|我从车窗向外看。
coincidenza|换乘衔接；巧合|Ho una coincidenza a Roma.|我在罗马换乘。
carta d’imbarco|登机牌|Ecco la mia carta d’imbarco.|这是我的登机牌。
binario|铁轨；站台股道|Il treno parte dal binario due.|火车从二号站台发车。
volo|航班；飞行|Il volo è in ritardo.|航班晚点了。
sopra|在……上方|La lampada è sopra il tavolo.|灯在桌子上方。
dentro|在……里面|Il libro è dentro la borsa.|书在包里面。
sotto|在……下面|Il gatto è sotto il letto.|猫在床下面。
vicino a|在……附近|Abito vicino alla scuola.|我住在学校附近。
accanto a|紧挨着|La banca è accanto al bar.|银行紧挨着酒吧。
di fronte a|在……对面|Il museo è di fronte alla stazione.|博物馆在车站对面。
dietro|在……后面|Il giardino è dietro la casa.|花园在房子后面。
`);
addVocab(19,10,`
che ora è?|现在几点？|Che ora è? È l’una.|几点了？一点。
che ore sono?|现在几点？|Che ore sono? Sono le tre.|几点了？三点。
mezzogiorno|中午十二点|È mezzogiorno.|现在中午十二点。
mezzanotte|午夜十二点|È mezzanotte.|现在午夜十二点。
un quarto|四分之一；一刻钟|Sono le due e un quarto.|现在两点一刻。
e mezzo|……点半|Sono le tre e mezzo.|现在三点半。
meno|减；差|Sono le quattro meno cinque.|现在差五分四点。
minuto|分钟|Aspetta un minuto.|等一分钟。
dalle…alle…|从……点到……点|Studio dalle dieci alle dodici.|我从十点学到十二点。
studio|书房；工作室；学习|Lo studio è piccolo.|书房很小。
giardino|花园|Il giardino è grande.|花园很大。
cucina|厨房|La cucina è nuova.|厨房是新的。
ripostiglio|储藏室|L’aspirapolvere è nel ripostiglio.|吸尘器在储藏室里。
corridoio|走廊|Il corridoio è lungo.|走廊很长。
sala|厅；大厅|La sala è luminosa.|大厅很明亮。
salotto|客厅|Siamo in salotto.|我们在客厅里。
soggiorno|客厅；逗留|Il soggiorno è ampio.|客厅很宽敞。
garage|车库|La macchina è in garage.|汽车在车库里。
camera da letto|卧室|La camera da letto è tranquilla.|卧室很安静。
ingresso|入口；玄关|Le scarpe sono all’ingresso.|鞋在玄关。
divano|沙发|Mi siedo sul divano.|我坐在沙发上。
poltrona|扶手椅|La poltrona è comoda.|扶手椅很舒服。
rubinetto|水龙头|Chiudo il rubinetto.|我关水龙头。
lavastoviglie|洗碗机（阴性不变）|La lavastoviglie non funziona.|洗碗机坏了。
frigorifero|冰箱|Il latte è nel frigorifero.|牛奶在冰箱里。
lavatrice|洗衣机|Uso la lavatrice.|我用洗衣机。
forno|烤箱|La torta è nel forno.|蛋糕在烤箱里。
aspirapolvere|吸尘器|Uso l’aspirapolvere.|我用吸尘器。
mobile|家具（单件）；可移动的|Compro un mobile.|我买一件家具。
scala|楼梯；梯子|Salgo le scale.|我上楼梯。
scarpiera|鞋柜|Le scarpe sono nella scarpiera.|鞋在鞋柜里。
ascensore|电梯|Prendo l’ascensore.|我乘电梯。
balcone|阳台|La camera ha un balcone.|房间有阳台。
terrazza|露台|Ceniamo in terrazza.|我们在露台吃晚饭。
tetto|屋顶|Il tetto è rosso.|屋顶是红色的。
tappeto|地毯|Il tappeto è nuovo.|地毯是新的。
doccia|淋浴；淋浴间|Faccio la doccia.|我洗淋浴。
tavolino|小桌；茶几|Il caffè è sul tavolino.|咖啡在茶几上。
tenda|窗帘；帐篷|Apro la tenda.|我拉开窗帘。
microonde|微波炉（常省略 forno）|Scaldo il pranzo nel microonde.|我用微波炉热午饭。
lavandino|洗手池；水槽|Il lavandino è pulito.|洗手池很干净。
fornello|炉灶；炉头|Accendo il fornello.|我打开炉灶。
padella|平底锅|Uso una padella.|我用一口平底锅。
pentola|锅|La pentola è sul fornello.|锅在炉灶上。
posate|餐具（刀叉勺的总称；复数）|Le posate sono sul tavolo.|餐具在桌子上。
`);
addVocab(21,11,`
albergo|旅馆；酒店|Dormo in albergo.|我住旅馆。
hotel|酒店（阳性不变）|Questo hotel è comodo.|这家酒店很方便。
carta igienica|卫生纸|Manca la carta igienica.|缺卫生纸。
saponetta|肥皂块|Vorrei una saponetta.|我想要一块肥皂。
valigia|行李箱|La valigia è pesante.|行李箱很重。
coperta|毯子|Vorrei una coperta.|我想要一条毯子。
cuscino|枕头|Il cuscino è comodo.|枕头很舒服。
termosifone|暖气片|Il termosifone non funziona.|暖气片不能用了。
calorifero|暖气片|Il calorifero è caldo.|暖气片热着。
asciugamano|毛巾|Mancano gli asciugamani.|缺毛巾。
asciugacapelli|吹风机（阳性不变）|L’asciugacapelli non funziona.|吹风机不能用了。
sveglia|闹钟；叫醒|Metto la sveglia alle sette.|我把闹钟设在七点。
prenotare|预订|Vorrei prenotare una camera.|我想预订一个房间。
camera doppia|双人间（床型需确认）|Vorrei una camera doppia.|我想要一个双人间。
camera singola|单人间|Prenoto una camera singola.|我预订一个单人间。
camera matrimoniale|大床房|Vorrei una camera matrimoniale.|我想要一个大床房。
incluso|包含的|La colazione è inclusa.|含早餐。
compreso|包含的；理解（过去分词）|Il servizio è compreso.|服务费已包含。
vista sul mare|海景|Vorrei una camera con vista sul mare.|我想要一个海景房。
parcheggio|停车场；停车|L’hotel ha un parcheggio.|酒店有停车场。
rotto|坏掉的；破碎的|L’ascensore è rotto.|电梯坏了。
vasca|浴缸；池|Il bagno ha una vasca.|浴室有浴缸。
solo|仅仅；独自|Resto solo due notti.|我只住两晚。
non funziona|不能用；不运转|Il telefono non funziona.|电话不能用了。
aria condizionata|空调|C’è l’aria condizionata?|有空调吗？
quanto costa?|多少钱？|Quanto costa una notte?|一晚多少钱？
quanto viene?|一共多少钱？|Quanto viene in tutto?|总共多少钱？
frigobar|迷你吧；小冰箱|C’è un frigobar in camera.|房间里有迷你吧。
pernottare|过夜；住宿|Pernotto in albergo.|我在旅馆过夜。
annullare|取消|Vorrei annullare la prenotazione.|我想取消预订。
riservare|预留；预订|Riservo un tavolo.|我预订一张餐桌。
prossimo|下一个的；接近的|Scendo alla prossima fermata.|我在下一站下车。
comprendere|包含；理解|Il prezzo comprende la colazione.|价格包含早餐。
ammettere|允许进入；承认|L’albergo ammette animali.|这家旅馆允许携带动物。
escludere|排除；不含|Il prezzo esclude la colazione.|价格不含早餐。
coperto|覆盖的；室内遮蔽的；餐位费|Il parcheggio è coperto.|停车场有顶棚。
costare|花费；售价为|La camera costa cento euro.|房间要一百欧元。
merenda|点心；下午茶|Faccio merenda alle quattro.|我四点吃点心。
avena|燕麦|Mangio l’avena a colazione.|我早餐吃燕麦。
`);
addVocab(22,12,`
sport|运动（阳性不变）|Faccio sport ogni giorno.|我每天运动。
hobby|爱好（阳性不变）|La musica è il mio hobby.|音乐是我的爱好。
suonare|演奏（乐器）|Suono il pianoforte.|我弹钢琴。
musica|音乐|Ascolto la musica.|我听音乐。
andare al cinema|去看电影|Mi piace andare al cinema.|我喜欢去看电影。
fare ginnastica|做体操；做健身运动|Faccio ginnastica la mattina.|我早上做健身运动。
passeggiare|散步|Passeggio nel parco.|我在公园散步。
pallacanestro|篮球|Gioco a pallacanestro.|我打篮球。
canestro|篮筐|La palla entra nel canestro.|球进了篮筐。
pallavolo|排球|Gioco a pallavolo.|我打排球。
calcio|足球|Mi piace il calcio.|我喜欢足球。
sempre|总是|Bevo sempre il tè.|我总是喝茶。
spesso|经常|Vado spesso al cinema.|我常去看电影。
di solito|通常|Di solito lavoro il sabato.|我通常星期六工作。
ogni tanto|偶尔；有时|Ogni tanto esco.|我偶尔出门。
raramente|很少|Vado raramente al bar.|我很少去酒吧。
mai|从不；曾经（疑问用法）|Non mangio mai carne.|我从不吃肉。
a volte|有时候|A volte sono stanco.|我有时很累。
quasi mai|几乎从不|Non vado quasi mai al cinema.|我几乎不去看电影。
quasi sempre|几乎总是|Arrivo quasi sempre presto.|我几乎总是很早到。
generalmente|通常；一般地|Generalmente studio a casa.|我通常在家学习。
`);
addVocab(23,12,`
lavarsi|洗漱；洗自己|Mi lavo la mattina.|我早上洗漱。
sedersi|坐下|Ci sediamo qui.|我们坐在这里。
vestirsi|穿衣服|Mi vesto alle sette.|我七点穿衣服。
alzarsi|起床；站起|Mi alzo presto.|我很早起床。
svegliarsi|醒来|Mi sveglio alle sei.|我六点醒来。
addormentarsi|入睡|Mi addormento alle undici.|我十一点入睡。
allenarsi|训练；锻炼|Mi alleno ogni giorno.|我每天锻炼。
pettinarsi|梳头|Mi pettino davanti allo specchio.|我对着镜子梳头。
rilassarsi|放松|Mi rilasso a casa.|我在家放松。
travestirsi|乔装；装扮|Mi travesto per carnevale.|我为狂欢节装扮。
laurearsi|大学毕业；取得学位|Mi laureo a luglio.|我七月大学毕业。
divertirsi|玩得开心|Ci divertiamo insieme.|我们一起玩得很开心。
truccarsi|化妆|Mi trucco la mattina.|我早上化妆。
spogliarsi|脱衣服|Mi spoglio prima della doccia.|我洗澡前脱衣服。
mettersi|穿上；使自己处于某处|Mi metto la giacca.|我穿上夹克。
iscriversi|报名；注册|Mi iscrivo al corso.|我报名这门课。
fare la doccia|洗淋浴|Faccio la doccia ogni sera.|我每天晚上洗淋浴。
fare i compiti|做作业|Faccio i compiti dopo scuola.|我放学后做作业。
fare colazione|吃早餐|Faccio colazione alle otto.|我八点吃早餐。
`);
addVocab(24,13,`
entrare|进入|Sono entrata in casa.|我进家门了（女性说）。
uscire|出去|Sono uscito ieri sera.|我昨晚出门了（男性说）。
salire|上去|Sono salito al secondo piano.|我上了二楼（男性说）。
scendere|下去；下车|Sono scesa dal treno.|我下火车了（女性说）。
restare|留下|Sono restato a casa.|我留在家里了（男性说）。
rimanere|停留；留下|Sono rimasta qui.|我留在这里了（女性说）。
ritornare|返回|Sono ritornato ieri.|我昨天回来了（男性说）。
rientrare|回来；回家|Sono rientrata presto.|我很早回来了（女性说）。
invecchiare|变老|Lui è invecchiato.|他变老了。
ringiovanire|变年轻|Lei è ringiovanita.|她变年轻了。
diventare|变成；成为|Sono diventato medico.|我成为医生了（男性说）。
crescere|成长；生长|Il bambino è cresciuto.|孩子长大了。
dimagrire|变瘦|Sono dimagrita.|我瘦了（女性说）。
ingrassare|变胖|Sono ingrassato.|我胖了（男性说）。
nascere|出生|Sono nata a Shanghai.|我出生在上海（女性说）。
morire|死亡|La pianta è morta.|植物死了。
ho avuto|我有过|Ho avuto un problema.|我遇到过一个问题。
sono stato|我曾是/曾在（男性）|Sono stato a Roma.|我去过罗马（男性说）。
sono stata|我曾是/曾在（女性）|Sono stata a Roma.|我去过罗马（女性说）。
`);
addVocab(5,14,`
andrò|我将去（andare）|Domani andrò a Roma.|明天我将去罗马。
sarò|我将是/将在（essere）|Domani sarò a casa.|明天我将在家。
avrò|我将有（avere）|Domani avrò un esame.|明天我将有一场考试。
futuro semplice|一般将来时|Andrò è una forma del futuro semplice.|andrò 是一般将来时形式。
`);
addVocab(25,17,`
cercare|寻找|Cerco le chiavi.|我在找钥匙。
parcheggiare|停车|Parcheggio la macchina.|我把车停好。
sfogliare|翻阅|Sfoglio il giornale.|我翻阅报纸。
spiegare|解释；讲解|Spiego la regola.|我解释规则。
regalare|赠送|Regalo un libro a Maria.|我送 Maria 一本书。
trovare|找到|Trovo le chiavi.|我找到钥匙。
aspettare|等待|Aspetto l’autobus.|我等公交车。
incontrare|遇见；碰到|Incontro un amico.|我遇见一位朋友。
dimenticare|忘记|Dimentico sempre le chiavi.|我总是忘带钥匙。
formare|组成；形成|Formiamo un gruppo.|我们组成一个小组。
cominciare|开始|La lezione comincia alle nove.|课九点开始。
guidare|驾驶；引导|Guido la macchina.|我开车。
conoscere|认识；了解|Conosco Marco.|我认识 Marco。
credere|相信；认为|Credo a questa storia.|我相信这个故事。
correggere|纠正；修改|Correggo gli errori.|我改正错误。
perdere|丢失；失去；输|Perdo il treno.|我误了火车。
ricevere|收到|Ricevo una lettera.|我收到一封信。
ancora|仍然；还；再次|Studio ancora.|我还在学习。
assonnato|困倦的|Sono assonnato.|我困了（男性说）。
affrontare|面对；应对|Affronto un problema.|我面对一个问题。
seguire|跟随；听课|Seguo un corso d’italiano.|我上意大利语课。
chiacchierare|聊天|Chiacchiero con un amico.|我和朋友聊天。
pranzare|吃午饭|Pranzo alle dodici.|我十二点吃午饭。
tardo|晚的；迟的|È tardi.|已经晚了。
soddisfatto|满意的|Sono soddisfatto del risultato.|我对结果很满意（男性说）。
verso|朝；大约（时间）|Arrivo verso le otto.|我大约八点到。
pronto|准备好的|Sono pronto.|我准备好了（男性说）。
cambiare|改变；更换|Cambio treno a Roma.|我在罗马换乘火车。
tempo|时间；天气|Non ho tempo.|我没有时间。
presto|早；很快|Torno presto.|我很快回来。
notare|注意到|Noto un errore.|我注意到一个错误。
fuori|在外面；到外面|Aspetto fuori.|我在外面等。
migliorare|改善；提高|Voglio migliorare il mio italiano.|我想提高自己的意大利语。
improvviso|突然的|Sento un rumore improvviso.|我听见一阵突然的声音。
infatti|事实上；确实|È stanco, infatti dorme.|他累了，他确实正在睡觉。
succedere|发生|Che cosa è successo?|发生了什么？
saltato|跳过的；saltare 的过去分词|Ho saltato la colazione.|我没吃早餐。
spingere|推|Spingo la porta.|我推门。
ritardare|延误；推迟|Il treno ritarda.|火车晚点。
almeno|至少|Studio almeno un’ora.|我至少学一个小时。
fisicamente|身体上；体力上|Sono fisicamente stanco.|我身体上很累。
carattere|性格；字符|Ha un buon carattere.|他/她性格很好。
maggiore|更大的；年长的；更重要的|Mio fratello maggiore lavora.|我的哥哥在工作。
difetto|缺点；缺陷|Tutti hanno dei difetti.|每个人都有缺点。
iniziare|开始|Inizio a studiare.|我开始学习。
rimasto|留下的；rimanere 的过去分词|Sono rimasto a casa.|我留在家里了（男性说）。
intero|整个的；完整的|Ho letto l’intero libro.|我读完了整本书。
mondo|世界|Voglio viaggiare in tutto il mondo.|我想环游世界。
stesso|相同的；同一个的|Abbiamo lo stesso libro.|我们有同一本书。
già|已经|Ho già mangiato.|我已经吃过了。
intensivo|密集的；强化的|Seguo un corso intensivo.|我上强化课程。
principiante|初学者|Sono principiante.|我是初学者。
commessa|女售货员|La commessa è gentile.|女售货员很友善。
`);
addVocab(26,15,`
meteo|气象；天气预报|Guardo il meteo.|我看天气预报。
tempo|天气；时间|Che tempo fa?|天气怎么样？
cambiare|改变|Il tempo cambia.|天气在变化。
fa freddo|天气冷|Oggi fa freddo.|今天天气冷。
fa caldo|天气热|Oggi fa caldo.|今天天气热。
fa bel tempo|天气好|Oggi fa bel tempo.|今天天气好。
nebbia|雾|C’è la nebbia.|有雾。
nebbioso|有雾的|È un giorno nebbioso.|这是个雾天。
cielo|天空|Il cielo è sereno.|天空晴朗。
soleggiato|阳光充足的|È un pomeriggio soleggiato.|这是个阳光明媚的下午。
stellato|繁星满天的|Il cielo è stellato.|天空布满星星。
sereno|晴朗的；平静的|Il cielo è sereno.|天空晴朗。
nuvola|云|Ci sono molte nuvole.|有很多云。
nuvoloso|多云的|Il cielo è nuvoloso.|天空多云。
pioggia|雨|Sento la pioggia.|我听见雨声。
piovoso|多雨的|È un mese piovoso.|这是个多雨的月份。
nevicare|下雪|In inverno nevica.|冬天会下雪。
vento|风|C’è vento.|有风。
ventoso|有风的|È un giorno ventoso.|这是个有风的日子。
tuonare|打雷|Fuori tuona.|外面打雷。
grandinare|下冰雹|Oggi grandina.|今天下冰雹。
compleanno|生日|Oggi è il mio compleanno.|今天是我的生日。
San Valentino|情人节（2 月 14 日）|San Valentino è a febbraio.|情人节在二月。
Festa della Donna|妇女节（3 月 8 日）|La Festa della Donna è l’otto marzo.|妇女节是三月八日。
Festa del Lavoro|劳动节（5 月 1 日）|La Festa del Lavoro è il primo maggio.|劳动节是五月一日。
Epifania|主显节（1 月 6 日）|L’Epifania è il sei gennaio.|主显节是一月六日。
Natale|圣诞节|Natale è il venticinque dicembre.|圣诞节是十二月二十五日。
carnevale|狂欢节|Mi piace il carnevale.|我喜欢狂欢节。
Capodanno|元旦；新年|Capodanno è il primo gennaio.|元旦是一月一日。
Pasqua|复活节|A Pasqua torno a casa.|复活节我回家。
primavera|春天|In primavera fa bel tempo.|春天天气好。
estate|夏天（阴性）|In estate fa caldo.|夏天很热。
autunno|秋天|In autunno piove spesso.|秋天常下雨。
inverno|冬天|In inverno fa freddo.|冬天很冷。
ora|现在；小时|Ora studio.|我现在学习。
l’altro ieri|前天|L’altro ieri ho lavorato.|前天我工作了。
dopodomani|后天|Parto dopodomani.|我后天出发。
giorno lavorativo|工作日|Lunedì è un giorno lavorativo.|星期一是工作日。
fine settimana|周末（常作阳性）|Nel fine settimana riposo.|我周末休息。
`);
addVocab(27,16,`
nonno|祖父；外祖父|Mio nonno vive a Roma.|我的祖父住在罗马。
genitore|父或母；复数 genitori 指父母|I miei genitori lavorano.|我的父母工作。
parente|亲戚（不是“父母”）|Ho molti parenti.|我有很多亲戚。
marito|丈夫|Mio marito è italiano.|我的丈夫是意大利人。
moglie|妻子|Mia moglie lavora.|我的妻子工作。
zia|姑妈；姨妈等女性长辈|Mia zia è insegnante.|我的姨妈是老师。
figlia|女儿|Mia figlia studia.|我的女儿在学习。
figlio|儿子|Mio figlio è piccolo.|我的儿子年纪小。
cugino|堂/表兄弟|Mio cugino abita qui.|我的表兄弟住在这里。
cugina|堂/表姐妹|Mia cugina abita qui.|我的表姐妹住在这里。
nipote|侄辈或孙辈（男女同形）|Mia nipote è piccola.|我的侄女/孙女年纪小。
cognato|姻亲中的男性同辈|Mio cognato è medico.|我的姐夫是医生。
neonato|新生儿|Il neonato dorme.|新生儿在睡觉。
sposare|娶；嫁；与……结婚|Sposo Marco.|我和 Marco 结婚。
figlia unica|独生女|Sono figlia unica.|我是独生女。
famiglia|家庭|La mia famiglia è grande.|我的家庭很大。
origine|来源；出身|Qual è la tua origine?|你来自哪里？
Shanghai|上海|Sono di Shanghai.|我来自上海。
ciao|你好；再见（非正式）|Ciao, come stai?|你好，你好吗？
come stai?|你好吗？|Come stai? Sto bene.|你好吗？我很好。
e tu?|你呢？|Sto bene, e tu?|我很好，你呢？
sono felice di|我很高兴……|Sono felice di ricevere la tua lettera.|很高兴收到你的信。
ti scrivo per|我写信给你是为了……|Ti scrivo per risponderti.|我写信来回复你。
raccontare|讲述|Ti racconto la mia giornata.|我给你讲讲我的一天。
qualcosa|某事；某物|Voglio raccontarti qualcosa.|我想给你讲点事情。
per quanto riguarda|关于；至于|Per quanto riguarda la tua domanda, ti rispondo domani.|关于你的问题，我明天回复你。
ti dico che|我告诉你……|Ti dico che sto bene.|我告诉你，我很好。
`);
addVocab(28,16,`
a partire da|从……起|A partire da domani studio di più.|从明天开始，我多学习一些。
tutti i giorni|每天|Studio tutti i giorni.|我每天学习。
qualche volta|有时候（qualche 后用单数）|Qualche volta vado al cinema.|我有时去看电影。
tutto il mondo|全世界|Voglio vedere tutto il mondo.|我想看看全世界。
due anni fa|两年前|Sono arrivata due anni fa.|我两年前到了这里（女性说）。
`);
addVocab(29,17,`
coinquilino|合租室友（男）|Il mio coinquilino è italiano.|我的室友是意大利人。
conservatorio|音乐学院|Studio al conservatorio.|我在音乐学院学习。
famoso|著名的|È un cantante famoso.|他是一位著名歌手。
esibire|展示；出示|Devo esibire un documento.|我需要出示证件。
esibirsi|登台表演（教学辨义补充）|Il cantante si esibisce stasera.|这位歌手今晚演出。
diverso|不同的；若干的（复数置名词前）|Abbiamo idee diverse.|我们有不同的想法。
contorno|配菜|Vorrei un contorno di verdure.|我想要一份蔬菜配菜。
impegno|安排；责任；努力|Ho un impegno domani.|我明天有安排。
fretta|匆忙|Ho fretta.|我赶时间。
adagio|慢慢地|Parla adagio, per favore.|请慢慢说。
circa|大约|Costa circa dieci euro.|大约十欧元。
giurisprudenza|法学|Studio giurisprudenza.|我学习法学。
percorso|路线；过程|Questo percorso è breve.|这条路线很短。
insieme|一起|Studiamo insieme.|我们一起学习。
raccogliere|收集；捡起；采摘|Raccolgo i fiori.|我采花。
attualmente|目前；现在|Attualmente vivo a Milano.|我目前住在米兰。
dirigere|领导；指导；指挥|Dirige un’orchestra.|他/她指挥一支管弦乐队。
provare|尝试；试用；排练|Provo a parlare italiano.|我试着说意大利语。
lì|那里|Il libro è lì.|书在那里。
frequentare|上（课/学校）；常去|Frequento un corso d’italiano.|我上意大利语课程。
estero|外国的；国外|Studio all’estero.|我在国外学习。
bisogno|需要（avere bisogno di）|Ho bisogno di aiuto.|我需要帮助。
tariffa|资费；价格|Qual è la tariffa?|价格是多少？
scoprire|发现|Voglio scoprire una città nuova.|我想探索一座新城市。
migliore|更好的；最好的（取决于结构）|Questo libro è migliore.|这本书更好。
gratis|免费地；免费的（不变）|L’ingresso è gratis.|入场免费。
vicino|近的；邻居|La scuola è vicina.|学校很近。
accogliere|欢迎；接待|Accolgo gli ospiti.|我接待客人。
richiedere|要求；需要；申请|Il lavoro richiede tempo.|这项工作需要时间。
disponibile|有空的；可用的|Sei disponibile domani?|你明天有空吗？
cameriere|男服务员|Chiamo il cameriere.|我叫服务员。
facoltà|学院；能力（阴性不变）|Studio alla facoltà di giurisprudenza.|我在法学院学习。
liceo|高中|Frequento il liceo.|我上高中。
però|但是|È caro, però mi piace.|它很贵，但我喜欢。
malato|生病的|Oggi sono malato.|我今天病了（男性说）。
`);
const cardinalRows = 'zero uno due tre quattro cinque sei sette otto nove dieci undici dodici tredici quattordici quindici sedici diciassette diciotto diciannove venti'.split(' ');
cardinalRows.forEach((it,n)=>addVocab(20,10,`${it}|${n}|Il numero è ${it}.|这个数字是 ${n}。`));
[[21,'ventuno'],[23,'ventitré'],[28,'ventotto'],[30,'trenta'],[40,'quaranta'],[50,'cinquanta'],[60,'sessanta'],[70,'settanta'],[80,'ottanta'],[90,'novanta'],[100,'cento'],[101,'centouno'],[200,'duecento'],[1000,'mille']].forEach(([n,it])=>addVocab(20,10,`${it}|${n}|Il numero è ${it}.|这个数字是 ${n}。`));
['primo','secondo','terzo','quarto','quinto','sesto','settimo','ottavo','nono','decimo','undicesimo','dodicesimo'].forEach((it,i)=>addVocab(20,10,`${it}|第 ${i+1}（阳性单数）|È il ${it} giorno.|这是第 ${i+1} 天。`));
[[20,'ventesimo'],[23,'ventitreesimo'],[36,'trentaseiesimo'],[100,'centesimo'],[101,'centounesimo'],[1000,'millesimo']].forEach(([n,it])=>addVocab(20,10,`${it}|第 ${n}（阳性单数）|È il ${it} giorno.|这是第 ${n} 天。`));
['gennaio','febbraio','marzo','aprile','maggio','giugno','luglio','agosto','settembre','ottobre','novembre','dicembre'].forEach((it,i)=>addVocab(26,15,`${it}|${i+1} 月|Il mio compleanno è a ${it}.|我的生日在 ${i+1} 月。`));
// 归一重复词的语义，避免单一中文义误导。
addVocab(3,2,`
lavoro|工作（名词）；我工作（动词形式）|Cerco lavoro.|我在找工作。
viaggio|旅行（名词）；我旅行（动词形式）|Il viaggio è lungo.|旅途很长。
cioccolato|巧克力|Quanto cioccolato vuoi?|你想要多少巧克力？
acqua|水|Bevo acqua.|我喝水。
`);
addVocab(6,2,`
amica|朋友（女）；复数 amiche|Lei è una mia amica.|她是我的一位女性朋友。
turista|游客（男女同形）|Sono un turista.|我是一名男游客。
`);
addVocab(10,6,`
succo|果汁|Bevo un succo.|我喝一杯果汁。
limone|柠檬|Il limone è giallo.|柠檬是黄色的。
panino|三明治；小面包|Mangio un panino.|我吃一个三明治。
prosciutto|火腿|Vorrei un panino al prosciutto.|我想要一个火腿三明治。
gelato|冰淇淋|Vorrei un gelato.|我想要一个冰淇淋。
`);
addVocab(11,5,`
negozio|商店|Il negozio è aperto.|商店开着。
ospedale|医院|L’ospedale è vicino.|医院很近。
ufficio|办公室|Il mio ufficio è in centro.|我的办公室在市中心。
centro|市中心；中心|Il centro è lontano.|市中心很远。
periferia|郊区|Abito in periferia.|我住在郊区。
posta|邮政；邮件；邮局（搭配用法）|Vado in posta.|我去邮局。
spiaggia|海滩|La spiaggia è bella.|海滩很美。
montagna|山；山区|La montagna è alta.|山很高。
collina|丘陵|La casa è in collina.|房子在丘陵地区。
campeggio|露营；营地|Il campeggio è vicino al lago.|营地在湖边。
campagna|乡村；乡间|Vivo in campagna.|我住在乡村。
chiesa|教堂|La chiesa è antica.|教堂很古老。
ambasciata|大使馆|L’ambasciata è in centro.|大使馆在市中心。
luna di miele|蜜月|Siamo in luna di miele.|我们在度蜜月。
tasca|口袋|Il telefono è in tasca.|手机在口袋里。
via|街；道路|Abito in via Roma.|我住在罗马街。
piazza|广场|La piazza è grande.|广场很大。
discoteca|迪厅|Vado in discoteca.|我去迪厅。
guerra|战争|Non voglio la guerra.|我不想要战争。
piscina|游泳池|La piscina è aperta.|泳池开着。
aeroporto|机场|L’aeroporto è lontano.|机场很远。
cinema|电影院；电影|Vado al cinema.|我去看电影。
teatro|剧院；戏剧|Il teatro è in centro.|剧院在市中心。
`);
addVocab(17,9,`
destra|右边|La stazione è a destra.|车站在右边。
sinistra|左边|Gira a sinistra.|向左转。
dritto|直的；直走|Vai dritto.|直走。
strada|街道；道路|Attraverso la strada.|我横穿马路。
angolo|角；拐角|Il bar è dietro l’angolo.|酒吧在拐角处。
`);
addVocab(21,11,`
prenotazione|预订（名词）|Ho una prenotazione.|我有预订。
singola|单人的；单人间（省略 camera）|Vorrei una singola.|我想要一个单人间。
doppia|双人的；双人间（省略 camera）|Vorrei una doppia.|我想要一个双人间。
matrimoniale|双人大床的；大床房|Preferisco una camera matrimoniale.|我更想要一个大床房。
`);
addVocab(27,16,`
mi|我（直接/间接宾语）；反身“自己”|Mi vedi?|你看见我吗？
ti|你（直接/间接宾语）；反身“自己”|Ti scrivo.|我给你写信。
lo|他/它（阳单直接宾语）；也是定冠词|Lo vedo.|我看见他/它。
la|她/它（阴单直接宾语）；也是定冠词|La vedo.|我看见她/它。
ci|我们（宾语/反身）；那里（地点代词）|Ci vediamo domani.|我们明天见。
vi|你们（宾语/反身）|Vi vedo.|我看见你们。
li|他们/它们（阳复直接宾语）|Li conosco.|我认识他们。
le|她们/它们（阴复直接宾语）；对她|Le conosco.|我认识她们。
`);
vocabularyIndex.get('loro').zh='他们；她们；他们的/她们的（物主词不变）';
vocabularyIndex.get('ora').zh='现在；小时（复数 ore）';
VOCAB.forEach(w=>w.pages.sort((a,b)=>a-b));
VOCAB.sort((a,b)=>Math.min(...a.pages)-Math.min(...b.pages));
addVocab(11,6,`
il piacere è mio|我也很高兴认识你；我也很荣幸|Piacere! Il piacere è mio.|很高兴认识你！我也很高兴。
come?|您说什么？（没听清时）|Come? Può ripetere?|您说什么？可以重复一遍吗？
`);

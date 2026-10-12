/* YKI Skriva — drills. Three kinds of item:
   order : build the sentence from tiles (a locked start shows which element is in first place)
   mc    : choose the right option (the correct option is authored first; options are shuffled when shown)
   type  : type a word or a corrected sentence
   Every item carries a "why" — the rule in one or two sentences. */
(function () {
  'use strict';
  var YKI = (window.YKI = window.YKI || {});

  YKI.drillCats = [
    { id: 'v2', day: 2, title: 'Verb in second place', en: 'Main-clause word order (V2)' },
    { id: 'bisats', day: 3, title: 'Inside the clause', en: 'Word order after att, eftersom, som, om' },
    { id: 'glue', day: 3, title: 'Connectors', en: 'Choosing the right linking word' },
    { id: 'prep', day: 4, title: 'Fixed prepositions', en: 'Word + preposition pairs that examiners notice' },
    { id: 'register', day: 4, title: 'Formal or friendly', en: 'Matching tone to the reader' },
    { id: 'tense', day: 6, title: 'Verb forms', en: 'Past, perfect, future, infinitive' },
    { id: 'noun', day: 7, title: 'Nouns and adjectives', en: 'en/ett, definite forms, agreement' },
    { id: 'fix', day: 8, title: 'Error hunt', en: 'Spot and repair typical mistakes' }
  ];

  var D = [];
  var n = {};
  function id(cat) { n[cat] = (n[cat] || 0) + 1; return 'd-' + cat + '-' + (n[cat] < 10 ? '0' : '') + n[cat]; }
  function order(cat, lock, tiles, en, why) { D.push({ id: id(cat), cat: cat, kind: 'order', lock: lock, tiles: tiles.split('|'), en: en, why: why }); }
  function mc(cat, q, opts, why, en) { D.push({ id: id(cat), cat: cat, kind: 'mc', q: q, opts: opts, why: why, en: en || '' }); }
  function type(cat, q, answers, why, en) { D.push({ id: id(cat), cat: cat, kind: 'type', q: q, answers: answers, why: why, en: en || '' }); }
  function fix(cat, bad, answers, why) { D.push({ id: id(cat), cat: cat, kind: 'type', bad: bad, q: 'Repair this sentence.', answers: answers, why: why, en: '' }); }

  var V2 = 'In a statement, the verb is always the second element. When something other than the subject starts the sentence, the subject moves to just after the verb.';
  /* ---- v2 ---- */
  order('v2', 'Igår', 'gick|jag|till läkaren', 'Yesterday I went to the doctor.', V2);
  order('v2', 'Tyvärr', 'kan|jag|inte|komma|på lördag', 'Unfortunately I cannot come on Saturday.', V2 + ' In the neutral order, inte comes after the subject here.');
  order('v2', 'På helgerna', 'brukar|vi|promenera|i skogen', 'At weekends we usually walk in the forest.', V2 + ' "På helgerna" is two words but one element.');
  order('v2', 'I Finland', 'dricker|man|mycket kaffe', 'In Finland people drink a lot of coffee.', V2);
  order('v2', 'Därför', 'vill|jag|byta|lampan|mot en ny', 'That is why I want to exchange the lamp for a new one.', V2 + ' After Därför the verb comes straight away.');
  order('v2', 'Nästa vecka', 'ska|jag|börja|på ett nytt jobb', 'Next week I am going to start a new job.', V2 + ' The helper verb ska takes second place; the infinitive börja comes later.');
  order('v2', 'Dessutom', 'var|förpackningen|trasig', 'In addition, the packaging was broken.', V2);
  order('v2', 'För två veckor sedan', 'beställde|jag|en soffa|från er butik', 'Two weeks ago I ordered a sofa from your shop.', V2 + ' The whole time phrase is one element.');
  order('v2', 'Efter jobbet', 'hämtar|jag|barnen|från dagis', 'After work I pick up the children from daycare.', V2);
  order('v2', 'Om du har tid', 'kan|vi|ses|imorgon', 'If you have time, we can meet tomorrow.', 'A whole clause can fill first place. The main verb still comes second: right after the clause.');
  order('v2', 'När jag kom hem', 'märkte|jag|att|dörren|var|öppen', 'When I came home, I noticed that the door was open.', 'The när-clause is element one, so märkte comes next, then jag.');
  order('v2', 'Enligt min åsikt', 'är|det här|en viktig fråga', 'In my opinion this is an important issue.', V2);
  order('v2', 'Sedan', 'ringde|jag|kundtjänsten', 'Then I called customer service.', V2);
  order('v2', 'Imorgon', 'kommer|min syster|till Finland', 'Tomorrow my sister is coming to Finland.', V2 + ' The subject can be more than one word.');
  order('v2', 'Jag', 'vill|inte|ha|en ny lampa', 'I do not want a new lamp.', 'In a main clause, inte comes after the first verb.');
  order('v2', 'Hissen', 'har|inte|fungerat|på tre veckor', 'The lift has not worked for three weeks.', 'In a main clause, inte comes after the first verb (har), before the second (fungerat).');

  var BIFF = 'In a clause that starts with att, eftersom, som, om or när, the order is subject – inte/alltid/aldrig – verb. Remember BIFF: i Bisats kommer Inte Före det Finita verbet.';
  /* ---- bisats ---- */
  order('bisats', 'Jag tror att', 'det|inte|fungerar', 'I think that it does not work.', BIFF);
  order('bisats', 'Problemet är att', 'hissen|inte|fungerar', 'The problem is that the lift does not work.', BIFF);
  order('bisats', 'Jag stannade hemma eftersom', 'jag|inte|mådde|bra', 'I stayed at home because I did not feel well.', BIFF);
  order('bisats', 'Jag vet att', 'han|alltid|kommer|i tid', 'I know that he always comes on time.', BIFF);
  order('bisats', 'Jag är ledsen att', 'jag|inte|kan|komma', 'I am sorry that I cannot come.', BIFF);
  order('bisats', 'Det är synd att', 'du|inte|har|tid', 'It is a pity that you do not have time.', BIFF);
  order('bisats', 'Jag har en vän som', 'alltid|hjälper|mig|med svenskan', 'I have a friend who always helps me with Swedish.', 'After som, the adverb (alltid) comes before the verb.');
  order('bisats', 'Jag undrar om', 'priset|går|att|diskutera', 'I wonder whether the price is negotiable.', 'After om (whether) the clause has normal order: subject, then verb. It is not a question any more.');
  order('bisats', 'Jag skulle vilja veta varför', 'min ansökan|fick|avslag', 'I would like to know why my application was rejected.', 'A question inside a sentence loses its question order: subject before verb.');
  order('bisats', 'Kan du berätta när', 'kursen|börjar', 'Can you tell me when the course starts?', 'A question inside a sentence: subject before verb (när kursen börjar, not när börjar kursen).');
  order('bisats', 'Jag klagar eftersom', 'ni|inte|har|svarat|på mitt meddelande', 'I am complaining because you have not answered my message.', BIFF);
  order('bisats', 'Jag tycker att', 'barn|inte|behöver|en egen telefon', 'I think that children do not need a phone of their own.', BIFF);

  /* ---- glue ---- */
  mc('glue', 'Jag stannade hemma ___ jag var sjuk.', ['eftersom', 'därför', 'dessutom', 'annars'], 'eftersom = because, followed by subject + verb. Därför means "that is why" and starts a new main clause.', 'I stayed at home because I was ill.');
  mc('glue', 'Jag var sjuk. ___ stannade jag hemma.', ['Därför', 'Eftersom', 'Fastän', 'Medan'], 'Därför = that is why. It takes first place, so the verb (stannade) comes next.', 'I was ill. That is why I stayed at home.');
  mc('glue', 'Soffan är snygg. ___ är den billig.', ['Dessutom', 'Också', 'Eftersom', 'Annars'], 'Dessutom adds one more point. Också is not used on its own as a linking word at the start of a sentence.', 'The sofa is good-looking. What is more, it is cheap.');
  mc('glue', '___ det regnade, gick vi på promenad.', ['Fastän', 'Därför', 'Dessutom', 'Annars'], 'Fastän (= trots att) means although: the second part is surprising.', 'Although it was raining, we went for a walk.');
  mc('glue', 'Jag var hungrig, ___ jag lagade mat.', ['så', 'men', 'eller', 'utan'], 'så = so: the second part is the result.', 'I was hungry, so I cooked.');
  mc('glue', 'Jag gillar att cykla, ___ jag har ingen cykel.', ['men', 'så', 'eller', 'för'], 'men = but: the second part goes against the first.', 'I like cycling, but I do not have a bike.');
  mc('glue', 'Ni måste svara inom en vecka. ___ kontaktar jag konsumentrådgivningen.', ['Annars', 'Medan', 'Eftersom', 'Fastän'], 'Annars = otherwise. It says what happens if they do not act.', 'You must reply within a week. Otherwise I will contact the consumer advisory service.');
  mc('glue', 'Först ringde jag kundtjänsten. ___ skrev jag ett e-postmeddelande.', ['Sedan', 'Eftersom', 'Annars', 'Fastän'], 'Först … Sedan … Till sist puts events in order.', 'First I called customer service. Then I wrote an email.');
  mc('glue', '___ du har frågor, kan du ringa mig.', ['Om', 'Att', 'Så', 'Men'], 'om = if.', 'If you have questions, you can call me.');
  mc('glue', 'Jag hoppas ___ du mår bättre nu.', ['att', 'om', 'som', 'så'], 'hoppas att = hope that.', 'I hope that you are feeling better now.');
  mc('glue', 'Jag har en kollega ___ talar fem språk.', ['som', 'att', 'vem', 'vad'], 'som = who/which/that, describing the noun just before it.', 'I have a colleague who speaks five languages.');
  mc('glue', '___ jag kom till Finland, kunde jag ingen svenska.', ['När', 'Sedan', 'Därför', 'Annars'], 'när = when (a point in time).', 'When I came to Finland, I knew no Swedish.');
  mc('glue', 'För det första är det dyrt. ___ tar det för lång tid.', ['För det andra', 'Till exempel så', 'Trots att det'], 'För det första … För det andra … lists your reasons in order.', 'Firstly it is expensive. Secondly it takes too long.');
  mc('glue', 'Jag gillar friluftsliv. ___ brukar jag vandra och plocka bär.', ['Till exempel', 'Trots att', 'Även om'], 'Till exempel introduces an example. The other two start a clause that needs its own subject and verb.', 'I like the outdoors. For example, I usually hike and pick berries.');

  /* ---- prep ---- */
  mc('prep', 'Jag är intresserad ___ fotografering.', ['av', 'i', 'på', 'för'], 'intresserad av', 'I am interested in photography.');
  mc('prep', 'Jag väntar ___ ditt svar.', ['på', 'för', 'till', 'av'], 'vänta på', 'I am waiting for your reply.');
  mc('prep', 'Jag vill klaga ___ servicen.', ['på', 'om', 'för', 'av'], 'klaga på', 'I want to complain about the service.');
  mc('prep', 'Jag är missnöjd ___ produkten.', ['med', 'på', 'av', 'om'], 'missnöjd med, nöjd med', 'I am dissatisfied with the product.');
  mc('prep', 'Grattis ___ det nya jobbet!', ['till', 'för', 'på', 'av'], 'grattis till', 'Congratulations on the new job!');
  mc('prep', 'Jag är stolt ___ dig.', ['över', 'på', 'av', 'för'], 'stolt över', 'I am proud of you.');
  mc('prep', 'Tack ___ hjälpen!', ['för', 'till', 'av', 'om'], 'tack för', 'Thanks for the help!');
  mc('prep', 'Jag ser fram ___ ditt svar.', ['emot', 'till', 'på', 'för'], 'se fram emot = look forward to', 'I look forward to your reply.');
  mc('prep', 'Jag har anmält mig ___ kursen.', ['till', 'på', 'i', 'för'], 'anmäla sig till', 'I have signed up for the course.');
  mc('prep', 'Det beror ___ vädret.', ['på', 'av', 'om', 'från'], 'bero på', 'It depends on the weather.');
  mc('prep', 'Jag har bott här ___ tre år.', ['i', 'för', 'på', 'om'], 'i + time = for (how long something has lasted).', 'I have lived here for three years.');
  mc('prep', 'Kursen börjar ___ två veckor.', ['om', 'i', 'på', 'för'], 'om + time = in (from now).', 'The course starts in two weeks.');
  mc('prep', 'Jag flyttade hit ___ två år sedan.', ['för', 'i', 'om', 'på'], 'för … sedan = … ago.', 'I moved here two years ago.');
  mc('prep', 'Jag tränar två gånger ___ veckan.', ['i', 'på', 'av', 'till'], 'i veckan, i månaden, i timmen — but om dagen, om året.', 'I work out twice a week.');
  mc('prep', 'Jag är orolig ___ min hälsa.', ['för', 'om', 'på', 'av'], 'orolig för', 'I am worried about my health.');
  mc('prep', 'Jag håller med ___ det.', ['om', 'på', 'till', 'av'], 'hålla med om', 'I agree with that.');
  mc('prep', 'Vi ses ___ lördag!', ['på', 'i', 'om', 'till'], 'på + weekday.', 'See you on Saturday!');
  mc('prep', 'Jag jobbar ___ ett sjukhus.', ['på', 'av', 'om', 'till'], 'på + institution or workplace: på ett sjukhus, på en skola, på Nokia.', 'I work at a hospital.');
  mc('prep', 'Jag är tacksam ___ alla råd.', ['för', 'av', 'om', 'på'], 'tacksam för', 'I am grateful for any advice.');
  mc('prep', 'Jag har god erfarenhet ___ kundservice.', ['av', 'i', 'på', 'om'], 'erfarenhet av', 'I have good experience of customer service.');

  /* ---- register ---- */
  mc('register', 'You are writing to a company. Which ending fits?', ['Med vänlig hälsning', 'Kram och puss', 'Vi hörs sen'], 'Med vänlig hälsning is the standard formal ending. Kram is for friends.');
  mc('register', 'You are writing to your friend Sara. Which start fits?', ['Hej Sara!', 'Bästa kund!', 'Till styrelsen'], 'A friend gets Hej + first name.');
  mc('register', 'Kan ___ skicka en ny lampa? (to an online shop)', ['ni', 'du', 'hen', 'man'], 'A company, an office or a board is several people: use ni, er, ert.');
  mc('register', 'Jag vill att ___ betalar tillbaka pengarna. (to a shop)', ['ni', 'du', 'man', 'de'], 'Use ni for a company.');
  mc('register', 'Jag såg ___ annons på nätet. (to a company)', ['er', 'din', 'sin', 'dess'], 'er/ert/era = your, when you write to ni.');
  mc('register', 'Which request suits a message to an authority?', ['Skulle ni kunna svara snart?', 'Svara på det här nu!', 'Varför svarar ni aldrig, va?'], 'Skulle ni kunna … is polite and still clear.');
  mc('register', 'Which ending fits a message to a friend?', ['Hör av dig!', 'Med vänlig hälsning', 'Jag kräver ersättning'], 'Hör av dig! = get in touch. Friendly and natural.');
  mc('register', 'Which sentence is too informal for a complaint?', ['Det här suger ju verkligen.', 'Det här är helt oacceptabelt.', 'Det här är mycket tråkigt.'], 'Slang (suger) does not belong in a formal complaint. Stay firm but neutral.');
  mc('register', 'How do you begin a complaint to a company you have never contacted?', ['Jag heter Ali Hassan.', 'Tjena, Ali här igen!', 'Gissa vem som skriver!'], 'Say who you are, then why you are writing.');
  mc('register', 'Which line ends an opinion piece best?', ['Vad tycker ni andra?', 'Hör av dig snart!', 'Tack på förhand, kunden'], 'An opinion piece speaks to all readers. A question to them is a natural ending.');
  mc('register', 'Which word is the friendly one?', ['jättebra', 'utmärkt', 'acceptabelt'], 'jätte- is everyday, spoken style: fine to a friend, avoid in formal letters.');
  mc('register', 'You do not know the name of the person at the office. Which greeting works?', ['Hej,', 'Tjena!', 'Hallå!'], 'Hej, is neutral in Swedish and works in formal messages too.');

  /* ---- tense ---- */
  type('tense', 'Igår ___ jag en ny cykel. (köpa)', ['köpte'], 'Past tense. Group 2 verbs with k, p, s, t before the ending take -te: köpte, läste, åkte.', 'Yesterday I bought a new bike.');
  type('tense', 'Förra veckan ___ jag sjuk. (vara)', ['var'], 'vara: är – var – har varit.', 'Last week I was ill.');
  type('tense', 'Jag ___ ___ i Finland i tre år. (bo — and I still live here)', ['har bott'], 'Started in the past and still true: har + supine. bo: bor – bodde – har bott.', 'I have lived in Finland for three years.');
  type('tense', 'För två veckor sedan ___ jag en lampa från er. (beställa)', ['beställde'], 'för … sedan always goes with the past tense.', 'Two weeks ago I ordered a lamp from you.');
  type('tense', 'Jag ___ din annons igår. (se)', ['såg'], 'se: ser – såg – har sett.', 'I saw your ad yesterday.');
  type('tense', 'Vi ___ paketet igår, men det var trasigt. (få)', ['fick'], 'få: får – fick – har fått.', 'We got the parcel yesterday, but it was broken.');
  type('tense', 'Jag har redan ___ räkningen. (betala)', ['betalat', 'betalt'], 'After har: the supine. Group 1 verbs end in -at.', 'I have already paid the bill.');
  type('tense', 'Jag har ___ till er två gånger. (skriva)', ['skrivit'], 'skriva: skriver – skrev – har skrivit.', 'I have written to you twice.');
  type('tense', 'Hon ___ att jag skulle vänta. (säga)', ['sa', 'sade'], 'säga: säger – sa – har sagt.', 'She said that I should wait.');
  type('tense', 'Jag ___ till hälsocentralen i måndags. (gå)', ['gick'], 'gå: går – gick – har gått. i måndags = last Monday.', 'I went to the health centre last Monday.');
  type('tense', 'Jag har aldrig ___ så besviken. (vara)', ['varit'], 'har varit = have been.', 'I have never been so disappointed.');
  type('tense', 'Igår ___ läkaren bara fem minuter för mig. (ha)', ['hade'], 'ha: har – hade – har haft. Igår is first, so the verb comes before läkaren.', 'Yesterday the doctor only had five minutes for me.');
  type('tense', 'Jag ___ er förra veckan, men ingen svarade. (ringa)', ['ringde'], 'Group 2 verbs take -de after a voiced sound: ringde, beställde.', 'I called you last week, but nobody answered.');
  type('tense', 'Vi har ___ i tre veckor. (vänta)', ['väntat'], 'Group 1: väntar – väntade – har väntat.', 'We have been waiting for three weeks.');
  mc('tense', 'Jag har ___ här i fem år.', ['jobbat', 'jobbade', 'jobbar', 'jobba'], 'After har comes the supine: jobbat.', 'I have worked here for five years.');
  mc('tense', 'Jag kommer att ___ dig.', ['sakna', 'saknar', 'saknade', 'saknat'], 'kommer att + infinitive.', 'I will miss you.');
  mc('tense', 'Jag skulle vilja ___ en tid.', ['boka', 'bokar', 'bokade', 'bokat'], 'After a helper verb (vilja, kunna, måste, ska): the infinitive.', 'I would like to book an appointment.');
  mc('tense', 'Nästa vecka ___ jag börja på ett nytt jobb.', ['ska', 'har', 'var', 'blev'], 'ska + infinitive for plans.', 'Next week I am going to start a new job.');

  /* ---- noun ---- */
  mc('noun', 'Jag har köpt ___ ny lampa.', ['en', 'ett', 'den', 'det'], 'en lampa. The adjective has no ending with en-words: en ny lampa.', 'I have bought a new lamp.');
  mc('noun', 'Vi bor i ___ stort hus.', ['ett', 'en', 'det', 'den'], 'ett hus. The -t on stort tells you it is an ett-word.', 'We live in a big house.');
  mc('noun', 'Lägenheten är ___.', ['dyr', 'dyrt', 'dyra'], 'en lägenhet → dyr.', 'The flat is expensive.');
  mc('noun', 'Huset är ___.', ['gammalt', 'gammal', 'gamla'], 'ett hus → gammalt.', 'The house is old.');
  mc('noun', 'Jag har två ___ katter.', ['små', 'liten', 'litet'], 'Plural of liten is små.', 'I have two small cats.');
  mc('noun', 'Den ___ lampan fungerar inte.', ['nya', 'ny', 'nytt'], 'With den/det/de + definite noun the adjective ends in -a: den nya lampan.', 'The new lamp does not work.');
  mc('noun', 'Min ___ cykel är trasig.', ['nya', 'ny', 'nytt'], 'After min/mitt/mina the adjective ends in -a, and the noun has no ending: min nya cykel.', 'My new bike is broken.');
  mc('noun', 'Jag har ___ vänner i Finland.', ['många', 'mycket'], 'många + things you can count; mycket + things you cannot.', 'I have many friends in Finland.');
  mc('noun', 'Vi använder för ___ plast.', ['mycket', 'många'], 'Plastic cannot be counted: mycket plast.', 'We use too much plastic.');
  mc('noun', 'Jag bor i en lägenhet. ___ är liten.', ['Lägenheten', 'Lägenhet', 'Lägenheter'], 'Second mention = the flat: definite form, lägenheten.', 'I live in a flat. The flat is small.');
  mc('noun', 'Jag har ont i ___.', ['ryggen', 'rygg', 'ryggar'], 'ont i + body part in the definite form.', 'My back hurts.');
  mc('noun', '___ barn går i skolan. (my two children)', ['Mina', 'Min', 'Mitt'], 'Plural: mina barn.', 'My children go to school.');
  mc('noun', 'De ___ sopkorgarna är alltid fulla.', ['gamla', 'gammal', 'gammalt'], 'Plural and definite: gamla.', 'The old bins are always full.');
  mc('noun', 'Jag letar efter en ___ lägenhet.', ['billig', 'billigt', 'billiga'], 'en lägenhet → billig.', 'I am looking for a cheap flat.');
  mc('noun', 'Finns det ___ lediga platser?', ['några', 'någon', 'något'], 'Plural: några.', 'Are there any free places?');
  mc('noun', 'Jag fick ___ kvitto.', ['inget', 'ingen', 'inga'], 'ett kvitto → inget kvitto.', 'I got no receipt.');
  mc('noun', 'Det är ___ stort problem.', ['ett', 'en'], 'ett problem.', 'It is a big problem.');
  mc('noun', '___ kursen är för svår för mig.', ['Den här', 'Det här', 'De här'], 'en kurs → den här kursen.', 'This course is too difficult for me.');

  /* ---- fix ---- */
  fix('fix', 'Jag vill en ny lampa.', ['Jag vill ha en ny lampa.'], 'vill needs a second verb. To want a thing: vill ha.');
  fix('fix', 'Igår jag köpte en soffa.', ['Igår köpte jag en soffa.', 'Jag köpte en soffa igår.'], V2);
  fix('fix', 'Jag är ledsen att jag kan inte komma.', ['Jag är ledsen att jag inte kan komma.'], BIFF);
  fix('fix', 'Också är den för dyr.', ['Dessutom är den för dyr.', 'Den är också för dyr.', 'Den är för dyr också.'], 'Också cannot stand alone in first place as a linking word. Use Dessutom, or put också after the verb.');
  fix('fix', 'Jag har många tid.', ['Jag har mycket tid.'], 'Time cannot be counted: mycket tid.');
  fix('fix', 'Jag är intresserad i soffan.', ['Jag är intresserad av soffan.'], 'intresserad av');
  fix('fix', 'Jag väntar ditt svar.', ['Jag väntar på ditt svar.'], 'vänta på');
  fix('fix', 'Min lägenheten är liten.', ['Min lägenhet är liten.'], 'After min/mitt/mina the noun has no definite ending.');
  fix('fix', 'Jag talar Svenska och Finska.', ['Jag talar svenska och finska.'], 'Languages, weekdays and months have a small letter in Swedish.');
  fix('fix', 'Jag gick hemma efter jobbet.', ['Jag gick hem efter jobbet.'], 'hem = movement towards home; hemma = at home.');
  fix('fix', 'Imorgon jag har läkartid.', ['Imorgon har jag läkartid.', 'Jag har läkartid imorgon.'], V2);
  fix('fix', 'Det finns mycket problem i huset.', ['Det finns många problem i huset.'], 'Problems can be counted: många problem.');
  fix('fix', 'Jag lyssnar musik varje dag.', ['Jag lyssnar på musik varje dag.'], 'lyssna på');
  fix('fix', 'Jag ringde er för två veckor.', ['Jag ringde er för två veckor sedan.'], 'ago = för … sedan. Both words are needed.');
  fix('fix', 'Det är bra eftersom det är inte dyrt.', ['Det är bra eftersom det inte är dyrt.'], BIFF);
  fix('fix', 'Vi ses på Måndag.', ['Vi ses på måndag.'], 'Weekdays have a small letter.');
  mc('fix', 'Which sentence is correct?', ['Om det regnar, stannar vi hemma.', 'Om det regnar, vi stannar hemma.'], 'The om-clause is element one, so the verb stannar comes directly after it.');
  mc('fix', 'Which sentence is correct?', ['Jag vet inte var han bor.', 'Jag vet inte var bor han.'], 'A question inside a sentence: subject before verb.');
  mc('fix', 'Which sentence is correct?', ['Jag har aldrig varit i Sverige.', 'Jag har varit aldrig i Sverige.'], 'aldrig, inte and alltid come after the first verb in a main clause.');
  mc('fix', 'Which sentence is correct?', ['Därför skriver jag till er.', 'Därför jag skriver till er.'], V2);
  mc('fix', 'Which sentence is correct?', ['Jag tycker att det inte är rättvist.', 'Jag tycker att det är inte rättvist.'], BIFF);
  mc('fix', 'Which sentence is correct?', ['Dessutom var paketet trasigt.', 'Dessutom paketet var trasigt.'], V2);

  YKI.drills = D;
  YKI.drillById = function (x) { for (var i = 0; i < D.length; i++) if (D[i].id === x) return D[i]; return null; };
})();

/* YKI Skriva — the seven themes and their core vocabulary.
   The themes follow the seven chapters of "Förbered dig för allmän språkexamen" (Gimara, 2022).
   Word lists and example sentences are written for this course; they are ordered most useful first.
   V(theme, swedish, forms, english, example, exampleEnglish, note?) */
(function () {
  'use strict';
  var YKI = (window.YKI = window.YKI || {});

  YKI.themes = [
    { id: 't1', n: 1, sv: 'Människan och omgivningen', en: 'People and their surroundings', blurb: 'family, friends, celebrations, home and housing', bookPage: 38 },
    { id: 't2', n: 2, sv: 'Vardagsliv', en: 'Everyday life', blurb: 'shopping, services, ads, complaints as a customer', bookPage: 54 },
    { id: 't3', n: 3, sv: 'Natur och miljö', en: 'Nature and the environment', blurb: 'recycling, the neighbourhood, describing a place', bookPage: 64 },
    { id: 't4', n: 4, sv: 'Hälsa och välmående', en: 'Health and well-being', blurb: 'symptoms, appointments, care, healthy habits', bookPage: 75 },
    { id: 't5', n: 5, sv: 'Fritid och hobbyer', en: 'Free time and hobbies', blurb: 'courses, culture, sport, invitations', bookPage: 116 },
    { id: 't6', n: 6, sv: 'Arbete och utbildning', en: 'Work and education', blurb: 'colleagues, shifts, applications, school', bookPage: 90 },
    { id: 't7', n: 7, sv: 'Samhälle', en: 'Society', blurb: 'authorities, permits, decisions, public services', bookPage: 125 }
  ];

  var list = [];
  function V(t, sv, forms, en, ex, exEn, note) { list.push({ t: t, sv: sv, forms: forms, en: en, ex: ex, exEn: exEn, note: note || '' }); }

  /* ---- 1 Människan och omgivningen ---- */
  V('t1', 'en granne', 'grannen, grannar', 'a neighbour', 'Min granne spelar hög musik på nätterna.', 'My neighbour plays loud music at night.');
  V('t1', 'en lägenhet', 'lägenheten, lägenheter', 'a flat, an apartment', 'Jag letar efter en lägenhet med två rum.', 'I am looking for a flat with two rooms.');
  V('t1', 'en hyra', 'hyran, hyror', 'a rent', 'Hyran är 900 euro i månaden.', 'The rent is 900 euros a month.');
  V('t1', 'att flytta', 'flyttar, flyttade, har flyttat', 'to move (house)', 'Vi flyttade till Esbo förra året.', 'We moved to Espoo last year.');
  V('t1', 'att gratulera', 'gratulerar, gratulerade, har gratulerat', 'to congratulate', 'Jag vill gratulera dig till det nya jobbet.', 'I want to congratulate you on the new job.');
  V('t1', 'att fira', 'firar, firade, har firat', 'to celebrate', 'Vi firar min födelsedag på lördag.', 'We are celebrating my birthday on Saturday.');
  V('t1', 'att bjuda', 'bjuder, bjöd, har bjudit', 'to invite; to treat someone', 'Jag vill bjuda dig på middag.', 'I want to treat you to dinner.');
  V('t1', 'en inbjudan', 'inbjudan, inbjudningar', 'an invitation', 'Tack för inbjudan!', 'Thank you for the invitation!');
  V('t1', 'en nyhet', 'nyheten, nyheter', 'a piece of news', 'Vilken fantastisk nyhet!', 'What a fantastic piece of news!');
  V('t1', 'stolt', 'stolt, stolta', 'proud', 'Jag är så stolt över dig!', 'I am so proud of you!', 'stolt över = proud of');
  V('t1', 'en släkting', 'släktingen, släktingar', 'a relative', 'Jag har många släktingar i Helsingfors.', 'I have many relatives in Helsinki.');
  V('t1', 'ett förhållande', 'förhållandet, förhållanden', 'a relationship', 'Vi har ett bra förhållande.', 'We have a good relationship.', 'Often a romantic relationship. With other people: ett bra förhållande till grannarna.');
  V('t1', 'ett bröllop', 'bröllopet, bröllop', 'a wedding', 'Vi ska gå på bröllop i juni.', 'We are going to a wedding in June.');
  V('t1', 'en fest', 'festen, fester', 'a party', 'Vi ordnar en fest för våra vänner.', 'We are organising a party for our friends.');
  V('t1', 'en present', 'presenten, presenter', 'a present', 'Jag har köpt en liten present till dig.', 'I have bought a small present for you.');
  V('t1', 'att sakna', 'saknar, saknade, har saknat', 'to miss (someone)', 'Jag saknar dig och hoppas att vi ses snart.', 'I miss you and hope that we see each other soon.');
  V('t1', 'att hyra', 'hyr, hyrde, har hyrt', 'to rent', 'Jag vill hyra en lägenhet nära centrum.', 'I want to rent a flat near the centre.');
  V('t1', 'ett läge', 'läget, lägen', 'a location', 'Läget är viktigt för mig eftersom jag inte har bil.', 'The location is important to me because I do not have a car.');
  V('t1', 'att trivas', 'trivs, trivdes, har trivts', 'to feel at home, to like it somewhere', 'Jag trivs bra i mitt nya hem.', 'I really like it in my new home.');
  V('t1', 'en hyresvärd', 'hyresvärden, hyresvärdar', 'a landlord', 'Jag har kontaktat hyresvärden två gånger.', 'I have contacted the landlord twice.');
  V('t1', 'ett husbolag', 'husbolaget, husbolag', 'a housing company (Finland)', 'Husbolaget måste reparera taket.', 'The housing company must repair the roof.', 'Finland-Swedish, the everyday word for ett bostadsaktiebolag. Closest equivalent in Sweden: en bostadsrättsförening.');
  V('t1', 'en disponent', 'disponenten, disponenter', 'a property manager (Finland)', 'Jag ringde disponenten i morse.', 'I called the property manager this morning.', 'Finland-Swedish for Finnish isännöitsijä.');
  V('t1', 'trasig', 'trasigt, trasiga', 'broken', 'Kranen i köket är trasig.', 'The tap in the kitchen is broken.');
  V('t1', 'att reparera', 'reparerar, reparerade, har reparerat', 'to repair', 'Ni måste reparera hissen så snart som möjligt.', 'You must repair the lift as soon as possible.');
  V('t1', 'en vattenskada', 'vattenskadan, vattenskador', 'water damage', 'Det finns en vattenskada i badrummet.', 'There is water damage in the bathroom.');
  V('t1', 'att störa', 'stör, störde, har stört', 'to disturb', 'Musiken stör mig när jag försöker sova.', 'The music disturbs me when I am trying to sleep.');
  V('t1', 'ett oljud', 'oljudet, oljud', 'a (disturbing) noise', 'Det är mycket oljud i trapphuset på kvällarna.', 'There is a lot of noise in the stairwell in the evenings.');

  /* ---- 2 Vardagsliv ---- */
  V('t2', 'en annons', 'annonsen, annonser', 'an advertisement', 'Jag såg din annons på nätet igår.', 'I saw your ad online yesterday.');
  V('t2', 'att sälja', 'säljer, sålde, har sålt', 'to sell', 'Säljer du fortfarande cykeln?', 'Are you still selling the bike?');
  V('t2', 'ett pris', 'priset, priser', 'a price', 'Kan vi diskutera priset?', 'Can we discuss the price?');
  V('t2', 'ett skick', 'skicket', 'condition (of a thing)', 'Är soffan i gott skick?', 'Is the sofa in good condition?', 'i gott skick / i dåligt skick');
  V('t2', 'begagnad', 'begagnat, begagnade', 'second-hand, used', 'Jag vill köpa en begagnad cykel.', 'I want to buy a second-hand bike.');
  V('t2', 'att beställa', 'beställer, beställde, har beställt', 'to order', 'Jag beställde en lampa från er nätbutik.', 'I ordered a lamp from your online shop.');
  V('t2', 'en leverans', 'leveransen, leveranser', 'a delivery', 'Leveransen kom två veckor för sent.', 'The delivery came two weeks late.');
  V('t2', 'ett kvitto', 'kvittot, kvitton', 'a receipt', 'Jag har kvittot kvar.', 'I still have the receipt.');
  V('t2', 'en garanti', 'garantin, garantier', 'a warranty', 'Garantin gäller fortfarande.', 'The warranty is still valid.');
  V('t2', 'att fungera', 'fungerar, fungerade, har fungerat', 'to work, to function', 'Tvättmaskinen fungerar inte.', 'The washing machine does not work.');
  V('t2', 'missnöjd', 'missnöjt, missnöjda', 'dissatisfied', 'Jag är mycket missnöjd med produkten.', 'I am very dissatisfied with the product.', 'missnöjd med = dissatisfied with');
  V('t2', 'nöjd', 'nöjt, nöjda', 'satisfied, pleased', 'Jag är nöjd med servicen.', 'I am pleased with the service.');
  V('t2', 'att klaga', 'klagar, klagade, har klagat', 'to complain', 'Jag vill klaga på servicen i er butik.', 'I want to complain about the service in your shop.', 'klaga på = complain about');
  V('t2', 'en ersättning', 'ersättningen, ersättningar', 'compensation', 'Jag kräver ersättning för den trasiga lampan.', 'I demand compensation for the broken lamp.');
  V('t2', 'att byta', 'byter, bytte, har bytt', 'to exchange, to change', 'Jag vill byta produkten mot en ny.', 'I want to exchange the product for a new one.');
  V('t2', 'att lämna tillbaka', 'lämnar, lämnade, har lämnat', 'to return (a thing)', 'Jag vill lämna tillbaka jackan.', 'I want to return the jacket.');
  V('t2', 'en räkning', 'räkningen, räkningar', 'a bill, an invoice', 'Räkningen är alldeles för hög.', 'The bill is far too high.');
  V('t2', 'att betala', 'betalar, betalade, har betalat', 'to pay', 'Jag har redan betalat räkningen.', 'I have already paid the bill.');
  V('t2', 'en kund', 'kunden, kunder', 'a customer', 'Jag har varit kund hos er i fem år.', 'I have been your customer for five years.');
  V('t2', 'kundtjänst', 'kundtjänsten', 'customer service', 'Jag ringde kundtjänsten men fick ingen hjälp.', 'I called customer service but got no help.');
  V('t2', 'att hämta', 'hämtar, hämtade, har hämtat', 'to fetch, to pick up', 'Jag kan hämta cykeln på lördag.', 'I can pick up the bike on Saturday.');
  V('t2', 'att handla', 'handlar, handlade, har handlat', 'to shop', 'Jag brukar handla mat efter jobbet.', 'I usually shop for food after work.');
  V('t2', 'en vardag', 'vardagen, vardagar', 'everyday life; a weekday', 'Min vardag är ganska hektisk.', 'My everyday life is quite hectic.');
  V('t2', 'en vana', 'vanan, vanor', 'a habit', 'Jag har för vana att handla på lördagar.', 'I am in the habit of shopping on Saturdays.');
  V('t2', 'kollektivtrafik', 'kollektivtrafiken', 'public transport', 'Jag använder kollektivtrafiken varje dag.', 'I use public transport every day.');
  V('t2', 'en öppettid', 'öppettiden, öppettider', 'an opening hour', 'Butikens öppettider är för korta.', 'The shop\'s opening hours are too short.');

  /* ---- 3 Natur och miljö ---- */
  V('t3', 'en miljö', 'miljön, miljöer', 'an environment', 'Vi måste skydda miljön.', 'We must protect the environment.');
  V('t3', 'naturen', 'natur, naturen', 'nature', 'Jag älskar den finländska naturen.', 'I love Finnish nature.');
  V('t3', 'att återvinna', 'återvinner, återvann, har återvunnit', 'to recycle', 'Jag återvinner papper, glas och plast.', 'I recycle paper, glass and plastic.');
  V('t3', 'att sortera', 'sorterar, sorterade, har sorterat', 'to sort', 'Alla borde sortera sina sopor.', 'Everyone should sort their rubbish.');
  V('t3', 'sopor', 'soporna (plural)', 'rubbish', 'Det ligger sopor överallt på gården.', 'There is rubbish everywhere in the yard.');
  V('t3', 'att minska', 'minskar, minskade, har minskat', 'to reduce', 'Vi måste minska användningen av plast.', 'We must reduce the use of plastic.');
  V('t3', 'att skydda', 'skyddar, skyddade, har skyddat', 'to protect', 'Det är viktigt att skydda skogarna.', 'It is important to protect the forests.');
  V('t3', 'miljövänlig', 'miljövänligt, miljövänliga', 'environmentally friendly', 'Det är miljövänligt att cykla.', 'It is environmentally friendly to cycle.');
  V('t3', 'en fördel', 'fördelen, fördelar', 'an advantage', 'En fördel är att naturen ligger nära.', 'One advantage is that nature is close by.');
  V('t3', 'en nackdel', 'nackdelen, nackdelar', 'a disadvantage', 'En nackdel är att bussarna inte går så ofta.', 'One disadvantage is that the buses do not run very often.');
  V('t3', 'en omgivning', 'omgivningen, omgivningar', 'surroundings', 'Omgivningen är lugn och grön.', 'The surroundings are calm and green.');
  V('t3', 'lugn', 'lugnt, lugna', 'calm, quiet', 'Området är lugnt och tryggt.', 'The area is quiet and safe.');
  V('t3', 'en skog', 'skogen, skogar', 'a forest', 'Jag brukar promenera i skogen på helgerna.', 'I usually walk in the forest at weekends.');
  V('t3', 'en sjö', 'sjön, sjöar', 'a lake', 'Vi har en stuga vid en sjö.', 'We have a cottage by a lake.');
  V('t3', 'avfall', 'avfallet', 'waste', 'Vi producerar för mycket avfall.', 'We produce too much waste.');
  V('t3', 'plast', 'plasten', 'plastic', 'Vi använder för mycket plast.', 'We use too much plastic.');
  V('t3', 'att skräpa ner', 'skräpar, skräpade, har skräpat', 'to litter', 'Man får inte skräpa ner i naturen.', 'You must not litter in nature.');
  V('t3', 'en lekplats', 'lekplatsen, lekplatser', 'a playground', 'Lekplatsen är i dåligt skick.', 'The playground is in bad condition.');
  V('t3', 'ett talko', 'talkot, talkon', 'a volunteer work party (Finland)', 'Vi ordnar ett talko på lördag.', 'We are organising a work party on Saturday.', 'Finland-Swedish, from Finnish talkoot.');
  V('t3', 'att städa', 'städar, städade, har städat', 'to clean, to tidy', 'Vi ska städa gården tillsammans.', 'We are going to clean the yard together.');
  V('t3', 'en förorening', 'föroreningen, föroreningar', 'pollution', 'Bilar orsakar luftföroreningar.', 'Cars cause air pollution.');
  V('t3', 'ett klimat', 'klimatet', 'a climate', 'Klimatet förändras snabbt.', 'The climate is changing fast.');
  V('t3', 'att spara', 'sparar, sparade, har sparat', 'to save', 'Vi kan spara energi hemma.', 'We can save energy at home.');
  V('t3', 'onödig', 'onödigt, onödiga', 'unnecessary', 'Vi köper för många onödiga saker.', 'We buy too many unnecessary things.');
  V('t3', 'ett väder', 'vädret', 'weather', 'Vädret var fint hela veckan.', 'The weather was nice all week.');
  V('t3', 'en årstid', 'årstiden, årstider', 'a season', 'Hösten är min favoritårstid.', 'Autumn is my favourite season.');

  /* ---- 4 Hälsa och välmående ---- */
  V('t4', 'att må', 'mår, mådde, har mått', 'to feel (health)', 'Hur mår du nuförtiden?', 'How are you feeling these days?');
  V('t4', 'frisk', 'friskt, friska', 'well, healthy (person)', 'Jag hoppas att du blir frisk snart.', 'I hope that you get well soon.');
  V('t4', 'sjuk', 'sjukt, sjuka', 'ill', 'Jag har varit sjuk i en vecka.', 'I have been ill for a week.');
  V('t4', 'att ha ont i', 'har, hade, har haft', 'to have pain in', 'Jag har ont i huvudet nästan varje dag.', 'I have a headache almost every day.', 'Body part in the definite form: ont i ryggen, ont i magen.');
  V('t4', 'ett symtom', 'symtomet, symtom', 'a symptom', 'Mina symtom började för två veckor sedan.', 'My symptoms started two weeks ago.');
  V('t4', 'en läkare', 'läkaren, läkare', 'a doctor', 'Läkaren hade bara fem minuter för mig.', 'The doctor only had five minutes for me.');
  V('t4', 'en hälsocentral', 'hälsocentralen, hälsocentraler', 'a health centre (Finland)', 'Jag ringde hälsocentralen men fick ingen tid.', 'I called the health centre but did not get an appointment.', 'Usual in Finland (also: en hälsostation). In Sweden mostly: en vårdcentral.');
  V('t4', 'att boka en tid', 'bokar, bokade, har bokat', 'to book an appointment', 'Jag vill boka en tid hos läkaren.', 'I want to book an appointment with the doctor.');
  V('t4', 'ett sjukhus', 'sjukhuset, sjukhus', 'a hospital', 'Min vän ligger på sjukhus.', 'My friend is in hospital.');
  V('t4', 'vård', 'vården', 'care (medical)', 'Min mamma fick dålig vård på sjukhuset.', 'My mother got bad care at the hospital.');
  V('t4', 'en behandling', 'behandlingen, behandlingar', 'a treatment', 'Behandlingen hjälpte inte.', 'The treatment did not help.');
  V('t4', 'en medicin', 'medicinen, mediciner', 'a medicine', 'Jag tar medicin två gånger om dagen.', 'I take medicine twice a day.');
  V('t4', 'ett recept', 'receptet, recept', 'a prescription', 'Läkaren skrev ut ett recept.', 'The doctor wrote a prescription.');
  V('t4', 'att krya på sig', 'kryar, kryade, har kryat', 'to get well', 'Krya på dig!', 'Get well soon!');
  V('t4', 'att vila', 'vilar, vilade, har vilat', 'to rest', 'Du måste vila ordentligt.', 'You must rest properly.');
  V('t4', 'att sova', 'sover, sov, har sovit', 'to sleep', 'Jag sover dåligt på nätterna.', 'I sleep badly at night.');
  V('t4', 'orolig', 'oroligt, oroliga', 'worried', 'Jag är orolig för min hälsa.', 'I am worried about my health.', 'orolig för = worried about');
  V('t4', 'hälsa', 'hälsan', 'health', 'Hälsan är det viktigaste i livet.', 'Health is the most important thing in life.');
  V('t4', 'hälsosam', 'hälsosamt, hälsosamma', 'healthy (food, lifestyle)', 'Jag försöker äta hälsosam mat.', 'I try to eat healthy food.');
  V('t4', 'att motionera', 'motionerar, motionerade, har motionerat', 'to exercise', 'Jag försöker motionera tre gånger i veckan.', 'I try to exercise three times a week.');
  V('t4', 'stress', 'stressen', 'stress', 'Jag har mycket stress på jobbet.', 'I have a lot of stress at work.');
  V('t4', 'en sjukskrivning', 'sjukskrivningen, sjukskrivningar', 'sick leave', 'Min sjukskrivning tar slut på fredag.', 'My sick leave ends on Friday.', 'In Finland you also hear: sjukledighet, sjukledig.');
  V('t4', 'en patient', 'patienten, patienter', 'a patient', 'Patienterna måste vänta för länge.', 'The patients have to wait too long.');
  V('t4', 'att vänta', 'väntar, väntade, har väntat', 'to wait', 'Vi väntade i fyra timmar på akuten.', 'We waited for four hours in the emergency room.', 'vänta på = wait for');
  V('t4', 'förkyld', 'förkylt, förkylda', 'having a cold', 'Jag är förkyld och har feber.', 'I have a cold and a fever.');
  V('t4', 'värk', 'värken', 'an ache', 'Jag har värk i ryggen varje morgon.', 'My back aches every morning.');

  /* ---- 5 Fritid och hobbyer ---- */
  V('t5', 'fritid', 'fritiden', 'free time', 'På fritiden läser jag böcker.', 'In my free time I read books.');
  V('t5', 'en hobby', 'hobbyn, hobbyer', 'a hobby', 'Min hobby är fotografering.', 'My hobby is photography.');
  V('t5', 'en kurs', 'kursen, kurser', 'a course', 'Kursen börjar på tisdag.', 'The course starts on Tuesday.');
  V('t5', 'att anmäla sig', 'anmäler, anmälde, har anmält', 'to sign up, to enrol', 'Jag har anmält mig till en kurs i svenska.', 'I have signed up for a course in Swedish.', 'anmäla sig till = sign up for');
  V('t5', 'att delta', 'deltar, deltog, har deltagit', 'to take part', 'Jag kan tyvärr inte delta första gången.', 'Unfortunately I cannot take part the first time.', 'delta i = take part in');
  V('t5', 'en biljett', 'biljetten, biljetter', 'a ticket', 'Jag har två biljetter till konserten.', 'I have two tickets for the concert.');
  V('t5', 'en konsert', 'konserten, konserter', 'a concert', 'Konserten börjar klockan sju.', 'The concert starts at seven.');
  V('t5', 'en föreställning', 'föreställningen, föreställningar', 'a performance, a show', 'Föreställningen var fantastisk.', 'The performance was fantastic.');
  V('t5', 'en utställning', 'utställningen, utställningar', 'an exhibition', 'Vill du gå på en utställning med mig?', 'Do you want to go to an exhibition with me?');
  V('t5', 'att föreslå', 'föreslår, föreslog, har föreslagit', 'to suggest', 'Jag föreslår att vi går på bio.', 'I suggest that we go to the cinema.');
  V('t5', 'intresserad', 'intresserat, intresserade', 'interested', 'Jag är intresserad av fotografering.', 'I am interested in photography.', 'intresserad av = interested in');
  V('t5', 'rolig', 'roligt, roliga', 'fun', 'Det var en rolig kväll.', 'It was a fun evening.');
  V('t5', 'att träna', 'tränar, tränade, har tränat', 'to work out, to train', 'Jag tränar på gymmet två gånger i veckan.', 'I work out at the gym twice a week.');
  V('t5', 'en idrott', 'idrotten, idrotter', 'a sport', 'Idrott är viktigt för barn.', 'Sport is important for children.');
  V('t5', 'konst', 'konsten', 'art', 'Jag är intresserad av modern konst.', 'I am interested in modern art.');
  V('t5', 'ett bibliotek', 'biblioteket, bibliotek', 'a library', 'Jag lånar böcker på biblioteket.', 'I borrow books at the library.');
  V('t5', 'att låna', 'lånar, lånade, har lånat', 'to borrow; to lend', 'Får jag låna din cykel?', 'May I borrow your bike?');
  V('t5', 'en semester', 'semestern, semestrar', 'a holiday (from work)', 'Jag har semester i juli.', 'I am on holiday in July.');
  V('t5', 'att resa', 'reser, reste, har rest', 'to travel', 'Vi reser till Sverige i sommar.', 'We are travelling to Sweden this summer.');
  V('t5', 'en stuga', 'stugan, stugor', 'a cottage', 'Vi hyr en stuga vid havet.', 'We rent a cottage by the sea.');
  V('t5', 'att koppla av', 'kopplar, kopplade, har kopplat', 'to relax', 'Jag kopplar av med en bra bok.', 'I relax with a good book.');
  V('t5', 'en förening', 'föreningen, föreningar', 'an association, a club', 'Jag är med i en idrottsförening.', 'I am a member of a sports club.');
  V('t5', 'ett lag', 'laget, lag', 'a team', 'Min son spelar i ett fotbollslag.', 'My son plays in a football team.');
  V('t5', 'en skärm', 'skärmen, skärmar', 'a screen', 'Barn sitter för mycket framför skärmen.', 'Children sit in front of the screen too much.');
  V('t5', 'sociala medier', 'plural', 'social media', 'Jag använder sociala medier varje dag.', 'I use social media every day.');
  V('t5', 'en avgift', 'avgiften, avgifter', 'a fee', 'Kursavgiften är 45 euro.', 'The course fee is 45 euros.');

  /* ---- 6 Arbete och utbildning ---- */
  V('t6', 'ett arbete', 'arbetet, arbeten', 'work; a job', 'Jag letar efter arbete.', 'I am looking for work.');
  V('t6', 'en kollega', 'kollegan, kolleger (also: kollegor)', 'a colleague', 'Mina kolleger är trevliga.', 'My colleagues are nice.');
  V('t6', 'en chef', 'chefen, chefer', 'a boss, a manager', 'Jag måste prata med chefen.', 'I have to talk to the boss.');
  V('t6', 'ett skift', 'skiftet, skift', 'a shift', 'Kan du byta skift med mig på fredag?', 'Can you swap shifts with me on Friday?');
  V('t6', 'en lön', 'lönen, löner', 'a salary', 'Lönen är för låg.', 'The salary is too low.');
  V('t6', 'en arbetstid', 'arbetstiden, arbetstider', 'working hours', 'Mina arbetstider har ändrats.', 'My working hours have changed.');
  V('t6', 'att söka', 'söker, sökte, har sökt', 'to apply for; to look for', 'Jag vill söka jobbet som servitör.', 'I want to apply for the job as a waiter.');
  V('t6', 'en ansökan', 'ansökan, ansökningar', 'an application', 'Jag skickade min ansökan igår.', 'I sent my application yesterday.');
  V('t6', 'en erfarenhet', 'erfarenheten, erfarenheter', 'experience', 'Jag har tre års erfarenhet av kundservice.', 'I have three years of experience in customer service.', 'erfarenhet av = experience of');
  V('t6', 'en utbildning', 'utbildningen, utbildningar', 'an education, a training', 'Jag har en utbildning som kock.', 'I am trained as a chef.');
  V('t6', 'att lära sig', 'lär, lärde, har lärt', 'to learn', 'Jag har lärt mig mycket på kursen.', 'I have learnt a lot on the course.');
  V('t6', 'en lärare', 'läraren, lärare', 'a teacher', 'Min lärare är mycket tålmodig.', 'My teacher is very patient.');
  V('t6', 'tacksam', 'tacksamt, tacksamma', 'grateful', 'Jag är mycket tacksam för din hjälp.', 'I am very grateful for your help.', 'tacksam för = grateful for');
  V('t6', 'ett möte', 'mötet, möten', 'a meeting', 'Vi har ett möte klockan nio.', 'We have a meeting at nine.');
  V('t6', 'en uppgift', 'uppgiften, uppgifter', 'a task', 'Jag har många uppgifter på jobbet.', 'I have many tasks at work.');
  V('t6', 'att studera', 'studerar, studerade, har studerat', 'to study', 'Jag studerar svenska på kvällarna.', 'I study Swedish in the evenings.');
  V('t6', 'en kunskap', 'kunskapen, kunskaper', 'knowledge, skills', 'Mina språkkunskaper har blivit bättre.', 'My language skills have improved.');
  V('t6', 'att anställa', 'anställer, anställde, har anställt', 'to hire, to employ', 'Företaget anställer ny personal.', 'The company is hiring new staff.');
  V('t6', 'arbetslös', 'arbetslöst, arbetslösa', 'unemployed', 'Jag var arbetslös i ett år.', 'I was unemployed for a year.');
  V('t6', 'en arbetsplats', 'arbetsplatsen, arbetsplatser', 'a workplace', 'Jag trivs på min arbetsplats.', 'I like it at my workplace.');
  V('t6', 'övertid', 'övertiden', 'overtime', 'Jag jobbar ofta övertid.', 'I often work overtime.');
  V('t6', 'en ledighet', 'ledigheten, ledigheter', 'leave, time off', 'Jag vill ansöka om ledighet nästa vecka.', 'I want to apply for leave next week.');
  V('t6', 'att säga upp sig', 'säger, sa, har sagt', 'to resign', 'Hon sa upp sig förra månaden.', 'She resigned last month.');
  V('t6', 'att uppskatta', 'uppskattar, uppskattade, har uppskattat', 'to appreciate', 'Jag uppskattar ditt arbete.', 'I appreciate your work.');
  V('t6', 'en elev', 'eleven, elever', 'a pupil', 'Eleverna har för många läxor.', 'The pupils have too much homework.');
  V('t6', 'obligatorisk', 'obligatoriskt, obligatoriska', 'compulsory', 'Kursen är obligatorisk för alla.', 'The course is compulsory for everyone.');

  /* ---- 7 Samhälle ---- */
  V('t7', 'ett samhälle', 'samhället, samhällen', 'a society', 'Jag vill vara en del av samhället.', 'I want to be a part of society.');
  V('t7', 'en myndighet', 'myndigheten, myndigheter', 'an authority', 'Jag har kontaktat myndigheterna.', 'I have contacted the authorities.');
  V('t7', 'ett beslut', 'beslutet, beslut', 'a decision', 'Jag är inte nöjd med beslutet.', 'I am not satisfied with the decision.');
  V('t7', 'att ansöka om', 'ansöker, ansökte, har ansökt', 'to apply for', 'Jag har ansökt om uppehållstillstånd.', 'I have applied for a residence permit.');
  V('t7', 'ett uppehållstillstånd', 'uppehållstillståndet, uppehållstillstånd', 'a residence permit', 'Mitt uppehållstillstånd går ut i mars.', 'My residence permit expires in March.');
  V('t7', 'ett medborgarskap', 'medborgarskapet, medborgarskap', 'a citizenship', 'Jag vill ansöka om finskt medborgarskap.', 'I want to apply for Finnish citizenship.');
  V('t7', 'en invandrare', 'invandraren, invandrare', 'an immigrant', 'Många invandrare vill lära sig språket.', 'Many immigrants want to learn the language.');
  V('t7', 'ett avslag', 'avslaget, avslag', 'a rejection', 'Jag fick avslag på min ansökan.', 'My application was rejected.', 'få avslag på = be refused');
  V('t7', 'att påverka', 'påverkar, påverkade, har påverkat', 'to affect, to influence', 'Beslutet påverkar hela min familj.', 'The decision affects my whole family.');
  V('t7', 'att kräva', 'kräver, krävde, har krävt', 'to demand, to require', 'Jobbet kräver goda språkkunskaper.', 'The job requires good language skills.');
  V('t7', 'en åsikt', 'åsikten, åsikter', 'an opinion', 'Enligt min åsikt är det fel.', 'In my opinion it is wrong.');
  V('t7', 'rättvis', 'rättvist, rättvisa', 'fair', 'Beslutet är inte rättvist.', 'The decision is not fair.');
  V('t7', 'en skatt', 'skatten, skatter', 'a tax', 'Vi betalar höga skatter i Finland.', 'We pay high taxes in Finland.');
  V('t7', 'en lag', 'lagen, lagar', 'a law', 'Alla måste följa lagen.', 'Everyone must follow the law.');
  V('t7', 'en rättighet', 'rättigheten, rättigheter', 'a right', 'Alla har samma rättigheter.', 'Everyone has the same rights.');
  V('t7', 'en blankett', 'blanketten, blanketter', 'a form (to fill in)', 'Blanketten är svår att förstå.', 'The form is hard to understand.');
  V('t7', 'att fylla i', 'fyller, fyllde, har fyllt', 'to fill in', 'Jag har fyllt i blanketten.', 'I have filled in the form.');
  V('t7', 'en tjänsteman', 'tjänstemannen, tjänstemän', 'an official, a civil servant', 'Tjänstemannen svarade inte på min fråga.', 'The official did not answer my question.');
  V('t7', 'FPA', 'Folkpensionsanstalten', 'Kela, the Social Insurance Institution', 'Jag fick ett brev från FPA.', 'I got a letter from Kela.', 'FPA is the Swedish name of Kela.');
  V('t7', 'en försäkring', 'försäkringen, försäkringar', 'an insurance', 'Jag har en hemförsäkring.', 'I have home insurance.');
  V('t7', 'att rösta', 'röstar, röstade, har röstat', 'to vote', 'Jag röstade i kommunalvalet.', 'I voted in the municipal election.');
  V('t7', 'en språkkurs', 'språkkursen, språkkurser', 'a language course', 'Jag behöver en språkkurs för att få jobb.', 'I need a language course in order to get a job.');
  V('t7', 'att förbättra', 'förbättrar, förbättrade, har förbättrat', 'to improve', 'Jag vill förbättra min svenska.', 'I want to improve my Swedish.');
  V('t7', 'arbetslöshet', 'arbetslösheten', 'unemployment', 'Arbetslösheten är ett stort problem.', 'Unemployment is a big problem.');
  V('t7', 'en kostnad', 'kostnaden, kostnader', 'a cost', 'Kostnaderna är för höga.', 'The costs are too high.');
  V('t7', 'en skyldighet', 'skyldigheten, skyldigheter', 'a duty, an obligation', 'Vi har både rättigheter och skyldigheter.', 'We have both rights and duties.');

  var counters = {};
  list.forEach(function (v) {
    counters[v.t] = (counters[v.t] || 0) + 1;
    v.id = 'v-' + v.t + '-' + (counters[v.t] < 10 ? '0' : '') + counters[v.t];
    v.kind = 'word';
    v.day = Number(v.t.slice(1));
  });
  YKI.vocab = list;
})();

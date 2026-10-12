/* YKI Skriva — writing tasks with model answers.
   Three task types, as in the official intermediate-level samples:
   informal message · formal message / complaint · opinion piece (choose A or B).
   Tasks are original to this course and cover the seven themes of the preparation book.
   Model answers aim at a safe level 3–4: complete, clear, connected, not fancy.
   A model is a list of [role, swedish, english]; a role starting with "+" begins a new paragraph. */
(function () {
  'use strict';
  var YKI = (window.YKI = window.YKI || {});

  YKI.roleNames = {
    greet: 'Greeting', open: 'Opening', why: 'Why I am writing', who: 'Who I am',
    b1: 'Point 1', b2: 'Point 2', b3: 'Point 3', b4: 'Point 4', extra: 'Extra detail',
    close: 'Closing line', sign: 'Sign-off', contact: 'Contact details',
    title: 'Heading', intro: 'Topic', thesis: 'My opinion', r1: 'Reason 1', r2: 'Reason 2', r3: 'Reason 3',
    counter: 'The other side', concl: 'Conclusion'
  };
  YKI.typeInfo = {
    informal: { label: 'Informal message', sv: 'Meddelande', minutes: 14, min: 60, max: 110 },
    formal: { label: 'Formal message', sv: 'Formellt meddelande', minutes: 18, min: 90, max: 140 },
    opinion: { label: 'Opinion piece', sv: 'Åsikt', minutes: 22, min: 120, max: 180 }
  };

  var OP_BULLETS = [
    { sv: 'berätta vad du skriver om', en: 'say what you are writing about', kw: [] },
    { sv: 'säg din åsikt', en: 'state your opinion', kw: ['tycker', 'anser', 'enligt min', 'åsikt', 'håller', 'tror'] },
    { sv: 'motivera din åsikt på minst tre olika sätt', en: 'support your opinion in at least three different ways', kw: ['för det första', 'för det andra', 'för det tredje', 'dessutom', 'eftersom', 'till exempel', 'därför', 'en fördel', 'en nackdel', 'det största', 'även om', 'trots att', 'å andra sidan', 'det är sant att', 'jag har själv'], need: 3 },
    { sv: 'avsluta på lämpligt sätt', en: 'end in a suitable way', kw: ['sammanfattningsvis', 'till sist', 'avslutningsvis', 'därför anser', 'därför tycker', 'vad tycker ni', 'jag hoppas'] }
  ];

  var T = [];

  /* =================== 1 MÄNNISKAN OCH OMGIVNINGEN =================== */
  T.push({
    id: 't1-grattis', theme: 't1', type: 'informal', kind: 'Meddelande till en vän', title: 'Congratulate a friend on a new home',
    sv: 'Din vän Sara har köpt sin första egna lägenhet. Skriv ett meddelande till henne. Inled och avsluta på lämpligt sätt.',
    en: 'Your friend Sara has bought her first flat of her own. Write her a message. Begin and end appropriately.',
    bullets: [
      { sv: 'berätta hur du fick veta nyheten', en: 'say how you heard the news', kw: ['hörde', 'berättade', 'såg', 'läste', 'fick veta'] },
      { sv: 'gratulera och säg vad du tycker', en: 'congratulate her and say what you think', kw: ['grattis', 'gratulera', 'glad', 'fantastisk', 'roligt', 'stolt'] },
      { sv: 'föreslå hur ni kan fira', en: 'suggest how you can celebrate', kw: ['fira', 'vad sägs', 'bjud', 'middag', 'fest', 'kan vi', 'ska vi'] },
      { sv: 'fråga något om det nya hemmet', en: 'ask something about the new home', kw: ['?'] }
    ],
    model: [
      ['greet', 'Hej Sara!', 'Hi Sara!'],
      ['+b1', 'Jag träffade din syster i butiken igår och hon berättade att du har köpt din första egna lägenhet.', 'I met your sister in the shop yesterday and she told me that you have bought your first flat of your own.'],
      ['b2', 'Vilka fantastiska nyheter! Grattis!', 'What fantastic news! Congratulations!'],
      ['b2', 'Jag är så glad för din skull, eftersom jag vet att du har sparat pengar länge.', 'I am so happy for you, because I know that you have been saving money for a long time.'],
      ['+b3', 'Vi måste fira det här tillsammans.', 'We must celebrate this together.'],
      ['b3', 'Vad sägs om att jag kommer till dig på lördag och tar med en kaka?', 'How about me coming to yours on Saturday and bringing a cake?'],
      ['extra', 'Jag kan också hjälpa dig att bära möbler om du behöver hjälp.', 'I can also help you carry furniture if you need help.'],
      ['+b4', 'Hur stor är lägenheten och när ska du flytta in?', 'How big is the flat and when are you moving in?'],
      ['+close', 'Hör av dig snart!', 'Get in touch soon!'],
      ['sign', 'Kram, Maria', 'Hugs, Maria']
    ]
  });

  T.push({
    id: 't1-bostad', theme: 't1', type: 'formal', kind: 'E-post till en bostadsförmedlare', title: 'Email an estate agent about a flat to rent',
    sv: 'Du letar efter en hyreslägenhet och har hittat en bostadsförmedlare som kan hjälpa dig. Skriv ett e-postmeddelande. Inled och avsluta på lämpligt sätt.',
    en: 'You are looking for a flat to rent and have found a letting agent who can help. Write an email. Begin and end appropriately.',
    bullets: [
      { sv: 'berätta vem du är och hurdan bostad du letar efter', en: 'say who you are and what kind of home you are looking for', kw: ['jag heter', 'letar', 'söker', 'rum', 'lägenhet'] },
      { sv: 'berätta vad som är viktigt med läget', en: 'say what matters about the location', kw: ['läge', 'nära', 'närheten', 'centrum', 'busshållplats', 'skola'] },
      { sv: 'berätta hur hög hyran får vara', en: 'say how high the rent may be', kw: ['euro', 'hyra', 'betala', 'högst'] },
      { sv: 'berätta när du vill flytta och varför just då', en: 'say when you want to move and why then', kw: ['flytta', 'början av', 'slutet av', 'eftersom', 'månad'] }
    ],
    model: [
      ['greet', 'Hej,', 'Hello,'],
      ['+who', 'Jag heter Ali Hassan och jag letar efter en hyreslägenhet i Vasa.', 'My name is Ali Hassan and I am looking for a flat to rent in Vaasa.'],
      ['why', 'Jag såg er annons på nätet och hoppas att ni kan hjälpa mig.', 'I saw your ad online and hope that you can help me.'],
      ['+b1', 'Jag bor tillsammans med min fru och vår dotter, så vi behöver en lägenhet med tre rum och kök.', 'I live with my wife and our daughter, so we need a flat with three rooms and a kitchen.'],
      ['b2', 'Läget är viktigt för oss.', 'The location is important to us.'],
      ['b2', 'Vi har ingen bil och därför vill vi bo nära en busshållplats.', 'We have no car and therefore we want to live near a bus stop.'],
      ['b2', 'Dessutom borde det finnas en skola och en matbutik i närheten.', 'In addition, there should be a school and a grocery shop nearby.'],
      ['+b3', 'Vi kan betala högst 1 000 euro i månaden.', 'We can pay at most 1,000 euros a month.'],
      ['b4', 'Vi vill flytta i början av augusti, eftersom min dotter börjar skolan då.', 'We want to move at the beginning of August, because my daughter starts school then.'],
      ['+contact', 'Ni kan nå mig per e-post eller på telefon 040 123 4567.', 'You can reach me by email or by phone on 040 123 4567.'],
      ['close', 'Tack på förhand!', 'Thanks in advance!'],
      ['+sign', 'Med vänlig hälsning, Ali Hassan', 'Kind regards, Ali Hassan']
    ]
  });

  T.push({
    id: 't1-husbolag', theme: 't1', type: 'formal', kind: 'Klagomål', title: 'Complain to the housing company about problems in the building',
    sv: 'Huset där du bor har flera problem och ingen gör något åt dem. Skriv ett klagomål till husbolagets styrelse.',
    en: 'The building you live in has several problems and nobody is doing anything about them. Write a complaint to the board of the housing company.',
    bullets: [
      { sv: 'berätta vem du är', en: 'say who you are', kw: ['jag heter', 'jag bor', 'lägenhet'] },
      { sv: 'beskriv minst två problem', en: 'describe at least two problems', kw: ['trasig', 'fungerar inte', 'problem', 'smutsig', 'sopor', 'oljud', 'för det första', 'för det andra', 'dessutom'], need: 2 },
      { sv: 'berätta vad som borde göras och när', en: 'say what should be done and by when', kw: ['måste', 'borde', 'inom', 'genast', 'så snart'] },
      { sv: 'berätta vad du gör om ingenting händer', en: 'say what you will do if nothing happens', kw: ['om ingenting', 'om inget', 'annars', 'kommer jag att'] }
    ],
    model: [
      ['greet', 'Till husbolagets styrelse', 'To the board of the housing company'],
      ['+who', 'Jag heter Maria Lind och jag bor i lägenhet B 12.', 'My name is Maria Lind and I live in flat B 12.'],
      ['why', 'Jag skriver till er eftersom vårt hus har flera problem som ingen har åtgärdat.', 'I am writing to you because our building has several problems that nobody has fixed.'],
      ['+b2', 'För det första har hissen varit trasig i tre veckor.', 'Firstly, the lift has been broken for three weeks.'],
      ['b2', 'Det är ett stort problem för äldre människor och barnfamiljer.', 'That is a big problem for elderly people and families with children.'],
      ['b2', 'För det andra är lamporna i trapphuset trasiga, så det är mörkt och farligt på kvällarna.', 'Secondly, the lamps in the stairwell are broken, so it is dark and dangerous in the evenings.'],
      ['b2', 'Dessutom ligger det sopor på gården.', 'In addition, there is rubbish in the yard.'],
      ['+b3', 'Jag anser att hissen och lamporna måste repareras inom två veckor.', 'I consider that the lift and the lamps must be repaired within two weeks.'],
      ['b3', 'Gården borde städas genast.', 'The yard should be cleaned immediately.'],
      ['+b4', 'Om ingenting händer, kommer jag att kontakta hyresvärden och kräva lägre hyra.', 'If nothing happens, I will contact the landlord and demand a lower rent.'],
      ['+close', 'Jag hoppas att ni kan lösa problemen så snart som möjligt.', 'I hope that you can solve the problems as soon as possible.'],
      ['+sign', 'Med vänlig hälsning, Maria Lind, tfn 040 123 4567', 'Kind regards, Maria Lind, tel. 040 123 4567']
    ]
  });

  T.push({
    id: 't1-asikt', theme: 't1', type: 'opinion', kind: 'Insändare', title: 'Renting or owning? / Social media and friendship',
    sv: 'Välj tema A eller B och skriv din åsikt till tidningens insändarspalt.\nA. Det är bättre att hyra än att äga sin bostad.\nB. Sociala medier förstör vänskap.',
    en: 'Choose topic A or B and write your opinion for the newspaper\'s letters page.\nA. It is better to rent than to own your home.\nB. Social media destroys friendship.',
    bullets: OP_BULLETS,
    model: [
      ['title', 'Hyra eller äga?', 'Rent or own?'],
      ['+intro', 'Jag vill skriva om boende, eftersom det är en viktig fråga för alla.', 'I want to write about housing, because it is an important issue for everyone.'],
      ['thesis', 'Enligt min åsikt är det bättre att hyra en bostad än att äga den.', 'In my opinion it is better to rent a home than to own it.'],
      ['+r1', 'För det första är det friare att hyra.', 'Firstly, renting gives you more freedom.'],
      ['r1', 'Om jag får ett nytt jobb i en annan stad, kan jag flytta snabbt.', 'If I get a new job in another town, I can move quickly.'],
      ['r2', 'För det andra behöver jag inte ta ett stort lån från banken.', 'Secondly, I do not need to take a big loan from the bank.'],
      ['r2', 'Bostäder är mycket dyra i Finland, särskilt i Helsingfors.', 'Homes are very expensive in Finland, especially in Helsinki.'],
      ['r3', 'Dessutom reparerar hyresvärden lägenheten om något går sönder, till exempel kylskåpet eller kranen.', 'What is more, the landlord repairs the flat if something breaks, for example the fridge or the tap.'],
      ['+counter', 'Det är sant att hyran är pengar som man aldrig får tillbaka.', 'It is true that rent is money you never get back.'],
      ['counter', 'Många tycker därför att det är smartare att köpa.', 'Many people therefore think that it is smarter to buy.'],
      ['counter', 'Men jag tycker att frihet är viktigare än att äga.', 'But I think that freedom is more important than owning.'],
      ['+concl', 'Sammanfattningsvis passar en hyreslägenhet bäst för mig just nu.', 'To sum up, a rented flat suits me best right now.'],
      ['concl', 'Vad tycker ni andra?', 'What do the rest of you think?'],
      ['+sign', 'Maria, Åbo', 'Maria, Turku']
    ],
    alt: {
      label: 'If you choose B',
      outline: [
        ['Opinion', 'Jag håller delvis med: sociala medier kan både hjälpa och skada vänskap.'],
        ['Reason 1', 'Vi tittar på telefonen i stället för att prata med varandra.'],
        ['Reason 2', 'På nätet ser allt perfekt ut, och man blir lätt avundsjuk.'],
        ['Other side', 'Å andra sidan kan jag hålla kontakt med vänner i mitt hemland.'],
        ['Conclusion', 'Sammanfattningsvis beror det på hur vi använder sociala medier.']
      ]
    }
  });

  /* =================== 2 VARDAGSLIV =================== */
  T.push({
    id: 't2-annons', theme: 't2', type: 'informal', kind: 'Meddelande till en säljare', title: 'Reply to an ad for a second-hand sofa',
    sv: 'Du har sett en annons om en begagnad soffa som du vill köpa. Skriv ett meddelande till säljaren.',
    en: 'You have seen an ad for a second-hand sofa that you want to buy. Write a message to the seller.',
    bullets: [
      { sv: 'berätta var och när du såg annonsen', en: 'say where and when you saw the ad', kw: ['såg', 'annons', 'igår', 'idag', 'i dag', 'nätet'] },
      { sv: 'berätta varför du är intresserad', en: 'say why you are interested', kw: ['intresserad', 'eftersom', 'behöver', 'letar'] },
      { sv: 'ställ minst två frågor om soffan', en: 'ask at least two questions about the sofa', kw: ['?', 'undrar'], need: 2 },
      { sv: 'berätta hur och när säljaren kan kontakta dig', en: 'say how and when the seller can contact you', kw: ['ringa', 'nå mig', 'nummer', 'e-post', 'kontakta', 'efter klockan'] }
    ],
    model: [
      ['greet', 'Hej!', 'Hi!'],
      ['+b1', 'Jag såg din annons om en grå soffa på nätet igår kväll.', 'I saw your ad for a grey sofa online last night.'],
      ['b2', 'Jag är mycket intresserad av soffan, eftersom jag just har flyttat till en ny lägenhet och behöver möbler.', 'I am very interested in the sofa, because I have just moved to a new flat and need furniture.'],
      ['+b3', 'Jag har några frågor.', 'I have a few questions.'],
      ['b3', 'Hur gammal är soffan och är den i gott skick?', 'How old is the sofa and is it in good condition?'],
      ['b3', 'Har du husdjur hemma?', 'Do you have pets at home?'],
      ['b3', 'Jag undrar också om priset går att diskutera.', 'I also wonder whether the price is negotiable.'],
      ['extra', 'Jag tycker nämligen att 200 euro är lite för mycket.', 'You see, I think that 200 euros is a bit too much.'],
      ['+b4', 'Jag kan hämta soffan på lördag om det passar dig.', 'I can pick up the sofa on Saturday if that suits you.'],
      ['b4', 'Du kan ringa mig efter klockan 16 på vardagar. Mitt nummer är 040 123 4567.', 'You can call me after 4 pm on weekdays. My number is 040 123 4567.'],
      ['+sign', 'Hälsningar, Omar', 'Regards, Omar']
    ]
  });

  T.push({
    id: 't2-reklamation', theme: 't2', type: 'formal', kind: 'Reklamation', title: 'Complain to an online shop about a late, faulty product',
    sv: 'Du beställde en kaffebryggare från en nätbutik. Paketet kom för sent och kaffebryggaren fungerar inte. Butiken kräver en skriftlig reklamation. Skriv reklamationen.',
    en: 'You ordered a coffee maker from an online shop. The parcel came late and the coffee maker does not work. The shop requires a written complaint. Write it.',
    bullets: [
      { sv: 'berätta vad du beställde och när', en: 'say what you ordered and when', kw: ['beställde', 'köpte', 'beställning'] },
      { sv: 'förklara vad som är fel (minst två saker)', en: 'explain what is wrong (at least two things)', kw: ['för sent', 'fungerar inte', 'trasig', 'för det första', 'för det andra', 'dessutom'], need: 2 },
      { sv: 'berätta vad du vill att butiken gör', en: 'say what you want the shop to do', kw: ['jag vill att', 'pengarna tillbaka', 'ny ', 'ersättning', 'kräver'] },
      { sv: 'ange dina kontaktuppgifter', en: 'give your contact details', kw: ['@', 'telefon', 'tfn', 'e-post', 'nå mig'] }
    ],
    model: [
      ['greet', 'Hej,', 'Hello,'],
      ['+who', 'Jag heter Omar Said.', 'My name is Omar Said.'],
      ['b1', 'Den 2 oktober beställde jag en kaffebryggare från er nätbutik (beställningsnummer 48213).', 'On 2 October I ordered a coffee maker from your online shop (order number 48213).'],
      ['why', 'Jag är tyvärr mycket missnöjd.', 'Unfortunately I am very dissatisfied.'],
      ['+b2', 'För det första kom paketet två veckor för sent, trots att ni lovade leverans inom tre dagar.', 'Firstly, the parcel came two weeks late, although you promised delivery within three days.'],
      ['b2', 'För det andra fungerar kaffebryggaren inte.', 'Secondly, the coffee maker does not work.'],
      ['b2', 'När jag trycker på knappen händer ingenting.', 'When I press the button, nothing happens.'],
      ['b2', 'Dessutom var förpackningen trasig.', 'In addition, the packaging was broken.'],
      ['+b3', 'Jag vill att ni skickar en ny kaffebryggare eller betalar tillbaka pengarna, 79 euro.', 'I want you to send a new coffee maker or pay back the money, 79 euros.'],
      ['extra', 'Jag har kvittot kvar och garantin gäller fortfarande.', 'I still have the receipt and the warranty is still valid.'],
      ['+close', 'Jag hoppas att ni svarar inom en vecka.', 'I hope that you will reply within a week.'],
      ['close', 'Annars kommer jag att kontakta konsumentrådgivningen.', 'Otherwise I will contact the consumer advisory service.'],
      ['+b4', 'Ni kan nå mig per e-post, omar.said@example.com, eller på telefon 040 123 4567.', 'You can reach me by email, omar.said@example.com, or by phone on 040 123 4567.'],
      ['+sign', 'Med vänlig hälsning, Omar Said', 'Kind regards, Omar Said']
    ]
  });

  T.push({
    id: 't2-asikt', theme: 't2', type: 'opinion', kind: 'Insändare', title: 'Sunday shopping / Phones for small children',
    sv: 'Välj tema A eller B och skriv din åsikt till tidningens insändarspalt.\nA. Butikerna borde vara stängda på söndagar.\nB. Barn under tio år behöver ingen egen mobiltelefon.',
    en: 'Choose topic A or B and write your opinion for the newspaper\'s letters page.\nA. Shops should be closed on Sundays.\nB. Children under ten do not need a mobile phone of their own.',
    bullets: OP_BULLETS,
    model: [
      ['title', 'Behöver små barn en egen telefon?', 'Do small children need a phone of their own?'],
      ['+intro', 'Nuförtiden har nästan alla barn en mobiltelefon.', 'Nowadays almost all children have a mobile phone.'],
      ['thesis', 'Jag tycker ändå att barn under tio år inte behöver en egen telefon.', 'I still think that children under ten do not need a phone of their own.'],
      ['+r1', 'För det första sitter små barn för mycket framför skärmen.', 'Firstly, small children sit in front of the screen too much.'],
      ['r1', 'De borde leka ute och träffa sina kompisar i stället.', 'They should play outside and meet their friends instead.'],
      ['r2', 'För det andra finns det mycket på nätet som inte passar barn, och föräldrarna kan inte kontrollera allt.', 'Secondly, there is a lot online that is not suitable for children, and parents cannot check everything.'],
      ['r3', 'Dessutom är telefoner dyra och små barn tappar bort dem lätt.', 'In addition, phones are expensive and small children easily lose them.'],
      ['+counter', 'Å andra sidan förstår jag att föräldrar vill kunna ringa sina barn efter skolan.', 'On the other hand, I understand that parents want to be able to call their children after school.'],
      ['counter', 'Då räcker det med en enkel telefon utan internet.', 'In that case a simple phone without internet is enough.'],
      ['+concl', 'Sammanfattningsvis tycker jag att en smarttelefon kan vänta tills barnet är äldre.', 'To sum up, I think that a smartphone can wait until the child is older.'],
      ['concl', 'Barndomen är kort och barn behöver tid för lek.', 'Childhood is short and children need time for play.'],
      ['+sign', 'Pappa till två', 'Father of two']
    ],
    alt: {
      label: 'If you choose A',
      outline: [
        ['Opinion', 'Jag håller inte med. Butikerna borde vara öppna på söndagar.'],
        ['Reason 1', 'Många jobbar på vardagar och hinner bara handla på helgen.'],
        ['Reason 2', 'Söndagsjobb är viktiga för studerande som behöver pengar.'],
        ['Other side', 'Det är sant att de anställda också behöver vila, men de kan vara lediga en annan dag.'],
        ['Conclusion', 'Sammanfattningsvis gör söndagsöppet vardagen lättare för alla.']
      ]
    }
  });

  /* =================== 3 NATUR OCH MILJÖ =================== */
  T.push({
    id: 't3-talko', theme: 't3', type: 'informal', kind: 'Inbjudan', title: 'Invite the neighbours to a yard clean-up',
    sv: 'Gården vid ert hus är skräpig och lekplatsen är i dåligt skick. Du vill ordna ett talko. Skriv en inbjudan till alla grannar.',
    en: 'The yard of your building is full of litter and the playground is in bad condition. You want to organise a volunteer clean-up (talko). Write an invitation to all the neighbours.',
    bullets: [
      { sv: 'berätta varför talkot behövs', en: 'say why the clean-up is needed', kw: ['skräp', 'dåligt skick', 'behöver', 'smutsig', 'sopor', 'därför'] },
      { sv: 'berätta när och var ni träffas', en: 'say when and where you meet', kw: ['klockan', 'lördag', 'söndag', 'träffas', 'gården'] },
      { sv: 'berätta vad man ska ta med', en: 'say what people should bring', kw: ['ta med', 'ta gärna med', 'handskar'] },
      { sv: 'berätta vad som händer efter arbetet', en: 'say what happens after the work', kw: ['efter', 'bjuder', 'kaffe', 'grill'] }
    ],
    model: [
      ['greet', 'Hej alla grannar!', 'Hello, all neighbours!'],
      ['+b1', 'Våren är här och vår gård behöver städas.', 'Spring is here and our yard needs cleaning.'],
      ['b1', 'Det ligger skräp i buskarna och sandlådan på lekplatsen är i dåligt skick.', 'There is litter in the bushes and the sandpit in the playground is in bad condition.'],
      ['b1', 'Därför ordnar vi ett talko!', 'That is why we are organising a clean-up!'],
      ['+b2', 'Vi träffas på gården lördagen den 9 maj klockan 10.', 'We meet in the yard on Saturday 9 May at 10 o\'clock.'],
      ['extra', 'Tillsammans ska vi plocka skräp, kratta löv och måla bänkarna.', 'Together we are going to pick up litter, rake leaves and paint the benches.'],
      ['b3', 'Ta gärna med handskar och en kratta.', 'Feel free to bring gloves and a rake.'],
      ['b3', 'Husbolaget ordnar sopsäckar och målarfärg.', 'The housing company will provide bin bags and paint.'],
      ['+b4', 'Efter arbetet bjuder vi på kaffe, saft och grillkorv.', 'After the work we will offer coffee, squash and grilled sausages.'],
      ['b4', 'Barnen är också välkomna!', 'The children are welcome too!'],
      ['+close', 'Om du har frågor, kan du ringa mig på 040 123 4567.', 'If you have questions, you can call me on 040 123 4567.'],
      ['+sign', 'Varmt välkomna! Leena Virtanen, B 7', 'A warm welcome! Leena Virtanen, B 7']
    ]
  });

  T.push({
    id: 't3-omrade', theme: 't3', type: 'informal', kind: 'Meddelande till en vän', title: 'Describe your neighbourhood to a friend who may move there',
    sv: 'Din vän Jonas funderar på att flytta till samma område som du. Skriv ett meddelande till honom.',
    en: 'Your friend Jonas is thinking about moving to the same area as you. Write him a message.',
    bullets: [
      { sv: 'beskriv området där du bor', en: 'describe the area where you live', kw: ['jag bor', 'området', 'omgivning', 'ligger', 'kilometer'] },
      { sv: 'berätta om två fördelar', en: 'mention two advantages', kw: ['fördel', 'bra', 'nära', 'billig', 'lugn', 'lägre'], need: 2 },
      { sv: 'berätta om en nackdel', en: 'mention one disadvantage', kw: ['nackdel', 'tyvärr', 'sällan', 'långt', 'dyr'] },
      { sv: 'ge ett råd', en: 'give a piece of advice', kw: ['råd', 'rekommenderar', 'borde', 'kom ', 'hälsa på'] }
    ],
    model: [
      ['greet', 'Hej Jonas!', 'Hi Jonas!'],
      ['+open', 'Vad roligt att du funderar på att flytta hit!', 'How nice that you are thinking about moving here!'],
      ['open', 'Jag berättar gärna om området.', 'I am happy to tell you about the area.'],
      ['+b1', 'Jag bor i Kyrkslätt, cirka 30 kilometer från Helsingfors.', 'I live in Kirkkonummi, about 30 kilometres from Helsinki.'],
      ['b1', 'Omgivningen är lugn och grön.', 'The surroundings are calm and green.'],
      ['b2', 'Det finns en stor skog och en liten sjö bara fem minuter från mitt hus, så jag kan promenera i naturen varje dag.', 'There is a big forest and a small lake only five minutes from my house, so I can walk in nature every day.'],
      ['b2', 'En annan fördel är att hyrorna är lägre här än i centrum.', 'Another advantage is that rents are lower here than in the centre.'],
      ['+b3', 'En nackdel är att bussarna inte går så ofta på kvällarna och på helgerna.', 'One disadvantage is that the buses do not run very often in the evenings and at weekends.'],
      ['b3', 'Därför måste man nästan ha bil.', 'That is why you more or less have to have a car.'],
      ['+b4', 'Mitt råd är att du kommer och hälsar på först.', 'My advice is that you come and visit first.'],
      ['b4', 'Då kan jag visa dig området.', 'Then I can show you the area.'],
      ['+close', 'Hör av dig!', 'Get in touch!'],
      ['sign', 'Hälsningar, Sami', 'Regards, Sami']
    ]
  });

  T.push({
    id: 't3-park', theme: 't3', type: 'formal', kind: 'Meddelande till staden', title: 'Report a littered park to the city',
    sv: 'I en park nära ditt hem ligger det mycket skräp. Skriv ett meddelande till stadens miljökontor.',
    en: 'There is a lot of rubbish in a park near your home. Write a message to the city\'s environment office.',
    bullets: [
      { sv: 'berätta vem du är och vilken plats det gäller', en: 'say who you are and which place it concerns', kw: ['jag heter', 'jag bor', 'angående', 'parken'] },
      { sv: 'beskriv problemet', en: 'describe the problem', kw: ['sopor', 'skräp', 'skräpig', 'sopkorg', 'glas', 'smutsig'] },
      { sv: 'förklara varför det är ett problem', en: 'explain why it is a problem', kw: ['problem', 'farlig', 'skada', 'eftersom', 'barn', 'råttor'] },
      { sv: 'föreslå vad staden borde göra', en: 'suggest what the city should do', kw: ['föreslår', 'borde', 'behövs', 'måste', 'oftare'] }
    ],
    model: [
      ['greet', 'Hej,', 'Hello,'],
      ['+b1', 'Jag heter Sami Korhonen och jag bor i Esbo.', 'My name is Sami Korhonen and I live in Espoo.'],
      ['b1', 'Jag skriver angående Centralparken, som ligger nära mitt hem.', 'I am writing regarding the Central Park, which is near my home.'],
      ['+b2', 'Parken har blivit mycket skräpig under sommaren.', 'The park has become very littered during the summer.'],
      ['b2', 'Sopkorgarna är alltid fulla och det ligger flaskor, plastpåsar och matrester på marken.', 'The bins are always full and there are bottles, plastic bags and leftover food on the ground.'],
      ['b2', 'Igår såg jag dessutom krossat glas på lekplatsen.', 'Yesterday I also saw broken glass in the playground.'],
      ['+b3', 'Det här är ett allvarligt problem, eftersom barn kan skada sig på glaset.', 'This is a serious problem, because children can hurt themselves on the glass.'],
      ['b3', 'Soporna lockar också råttor till området.', 'The rubbish also attracts rats to the area.'],
      ['+b4', 'Jag föreslår att staden tömmer sopkorgarna oftare, åtminstone två gånger i veckan.', 'I suggest that the city empties the bins more often, at least twice a week.'],
      ['b4', 'Det behövs också fler sopkorgar vid lekplatsen.', 'More bins are also needed by the playground.'],
      ['+close', 'Jag hoppas att ni kan göra något åt saken snart.', 'I hope that you can do something about the matter soon.'],
      ['+sign', 'Med vänlig hälsning, Sami Korhonen', 'Kind regards, Sami Korhonen']
    ]
  });

  T.push({
    id: 't3-asikt', theme: 't3', type: 'opinion', kind: 'Insändare', title: 'Cars in the city centre / Sorting rubbish',
    sv: 'Välj tema A eller B och skriv din åsikt till tidningens insändarspalt.\nA. Privatbilar borde förbjudas i stadens centrum.\nB. Det är för svårt att sortera sopor.',
    en: 'Choose topic A or B and write your opinion for the newspaper\'s letters page.\nA. Private cars should be banned in the city centre.\nB. It is too difficult to sort rubbish.',
    bullets: OP_BULLETS,
    model: [
      ['title', 'Inga bilar i centrum', 'No cars in the centre'],
      ['+intro', 'Jag bor i centrum och ser varje dag hur många bilar det finns på gatorna.', 'I live in the centre and see every day how many cars there are on the streets.'],
      ['thesis', 'Enligt min åsikt borde privatbilar förbjudas i stadens centrum.', 'In my opinion private cars should be banned in the city centre.'],
      ['+r1', 'För det första skulle luften bli renare.', 'Firstly, the air would become cleaner.'],
      ['r1', 'Bilar orsakar föroreningar och buller som är dåliga för vår hälsa.', 'Cars cause pollution and noise that are bad for our health.'],
      ['r2', 'För det andra skulle gatorna bli tryggare för barn, cyklister och äldre människor.', 'Secondly, the streets would become safer for children, cyclists and elderly people.'],
      ['r3', 'Dessutom skulle det finnas mer plats för parker och kaféer.', 'In addition, there would be more room for parks and cafés.'],
      ['+counter', 'Det är sant att vissa människor behöver bil, till exempel äldre och sjuka.', 'It is true that some people need a car, for example the elderly and the sick.'],
      ['counter', 'De borde få ett särskilt tillstånd.', 'They should get a special permit.'],
      ['counter', 'Men de flesta av oss kan åka buss, cykla eller gå.', 'But most of us can take the bus, cycle or walk.'],
      ['+concl', 'Sammanfattningsvis tror jag att ett centrum utan bilar är bättre både för miljön och för människorna.', 'To sum up, I believe that a centre without cars is better both for the environment and for people.'],
      ['concl', 'Andra städer i Europa har redan gjort så, och det fungerar bra.', 'Other cities in Europe have already done so, and it works well.'],
      ['+sign', 'Sami, Helsingfors', 'Sami, Helsinki']
    ],
    alt: {
      label: 'If you choose B',
      outline: [
        ['Opinion', 'Jag håller inte med. Det är lätt att sortera sopor när man har lärt sig det.'],
        ['Reason 1', 'I Finland finns det separata kärl för papper, glas, metall och bioavfall.'],
        ['Reason 2', 'Det tar bara några minuter om dagen.'],
        ['Other side', 'Det är sant att reglerna kan vara svåra för nya invånare, så husbolaget borde ge instruktioner på flera språk.'],
        ['Conclusion', 'Sammanfattningsvis är sortering en liten sak som hjälper miljön mycket.']
      ]
    }
  });

  /* =================== 4 HÄLSA OCH VÄLMÅENDE =================== */
  T.push({
    id: 't4-sjukhus', theme: 't4', type: 'informal', kind: 'Meddelande till en vän', title: 'Write to a friend who is in hospital',
    sv: 'Du har hört att din vän Elina har brutit benet och ligger på sjukhus. Skriv ett meddelande till henne.',
    en: 'You have heard that your friend Elina has broken her leg and is in hospital. Write her a message.',
    bullets: [
      { sv: 'berätta hur du fick veta vad som hänt', en: 'say how you found out what happened', kw: ['hörde', 'berättade', 'fick veta', 'läste'] },
      { sv: 'fråga hur hon mår', en: 'ask how she is', kw: ['hur mår', 'ont', '?'] },
      { sv: 'erbjud hjälp med två saker', en: 'offer help with two things', kw: ['hjälpa', 'jag kan', 'handla', 'hämta', 'vattna'], need: 2 },
      { sv: 'berätta när du kan komma på besök', en: 'say when you can come and visit', kw: ['hälsa på', 'besök', 'komma', 'klockan', 'onsdag'] }
    ],
    model: [
      ['greet', 'Hej Elina!', 'Hi Elina!'],
      ['+b1', 'Jag hörde av Petra att du har brutit benet och ligger på sjukhus.', 'I heard from Petra that you have broken your leg and are in hospital.'],
      ['b2', 'Vad tråkigt! Hur mår du nu? Har du mycket ont?', 'How awful! How are you feeling now? Are you in a lot of pain?'],
      ['+b3', 'Jag vill gärna hjälpa dig.', 'I would really like to help you.'],
      ['b3', 'Jag kan vattna dina blommor och hämta posten medan du är borta.', 'I can water your flowers and collect the post while you are away.'],
      ['b3', 'När du kommer hem, kan jag också handla mat åt dig.', 'When you come home, I can also shop for food for you.'],
      ['+b4', 'Jag kan komma och hälsa på dig på onsdag efter jobbet, ungefär klockan fem.', 'I can come and visit you on Wednesday after work, at about five o\'clock.'],
      ['extra', 'Vill du att jag tar med något, till exempel tidningar eller frukt?', 'Do you want me to bring something, for example magazines or fruit?'],
      ['+close', 'Vila ordentligt och krya på dig!', 'Rest properly and get well soon!'],
      ['sign', 'Kram, Nadia', 'Hugs, Nadia']
    ]
  });

  T.push({
    id: 't4-forum', theme: 't4', type: 'informal', kind: 'Inlägg på ett forum', title: 'Ask for advice on a health forum',
    sv: 'Du sover dåligt och vill ha råd. Skriv ett inlägg på ett hälsoforum på nätet.',
    en: 'You sleep badly and want advice. Write a post on an online health forum.',
    bullets: [
      { sv: 'beskriv problemet och dina symtom', en: 'describe the problem and your symptoms', kw: ['sover', 'vaknar', 'trött', 'huvudvärk', 'somnar', 'sova'] },
      { sv: 'berätta när det började', en: 'say when it started', kw: ['började', 'sedan', 'för '] },
      { sv: 'berätta hur det påverkar din vardag', en: 'say how it affects your everyday life', kw: ['påverkar', 'orkar', 'svårt att', 'vardag', 'jobbet'] },
      { sv: 'be om råd', en: 'ask for advice', kw: ['råd', 'tips', 'hjälpte', 'vad ska jag', '?'] }
    ],
    model: [
      ['title', 'Jag kan inte sova – vad ska jag göra?', 'I cannot sleep – what should I do?'],
      ['+greet', 'Hej alla!', 'Hi everyone!'],
      ['+b1', 'Jag är en 35-årig man och jag har ett problem som jag behöver hjälp med.', 'I am a 35-year-old man and I have a problem that I need help with.'],
      ['b1', 'Jag sover mycket dåligt.', 'I sleep very badly.'],
      ['b2', 'Det började för ungefär två månader sedan när jag bytte jobb.', 'It started about two months ago when I changed jobs.'],
      ['+b1', 'På natten somnar jag först klockan två, och jag vaknar flera gånger.', 'At night I do not fall asleep until two o\'clock, and I wake up several times.'],
      ['b1', 'På morgonen är jag jättetrött och har ofta huvudvärk.', 'In the morning I am really tired and often have a headache.'],
      ['b3', 'Det påverkar hela min vardag, eftersom jag inte orkar träna efter jobbet och har svårt att koncentrera mig på möten.', 'It affects my whole everyday life, because I do not have the energy to work out after work and find it hard to concentrate in meetings.'],
      ['+extra', 'Jag har redan slutat dricka kaffe på kvällen, men det hjälper inte.', 'I have already stopped drinking coffee in the evening, but it does not help.'],
      ['+b4', 'Har någon av er haft samma problem? Vad hjälpte er?', 'Has any of you had the same problem? What helped you?'],
      ['close', 'Jag är tacksam för alla råd.', 'I am grateful for any advice.'],
      ['+sign', 'Hälsningar, Trött pappa', 'Regards, Tired dad']
    ]
  });

  T.push({
    id: 't4-halsocentral', theme: 't4', type: 'formal', kind: 'Klagomål', title: 'Complain about a visit to the health centre',
    sv: 'Du hade en läkartid på hälsocentralen. Du fick vänta länge och läkaren hade nästan ingen tid för dig. Skriv ett klagomål till hälsocentralens chef.',
    en: 'You had a doctor\'s appointment at the health centre. You had to wait a long time and the doctor had almost no time for you. Write a complaint to the head of the health centre.',
    bullets: [
      { sv: 'berätta när du var där och varför', en: 'say when you were there and why', kw: ['läkartid', 'klockan', 'eftersom', 'den '] },
      { sv: 'berätta vad som hände', en: 'say what happened', kw: ['vänta', 'försenad', 'minuter', 'timmar'] },
      { sv: 'förklara varför du är missnöjd', en: 'explain why you are dissatisfied', kw: ['missnöjd', 'lyssnade inte', 'undersökte inte', 'ingen hjälp', 'besviken'] },
      { sv: 'berätta vad du vill att hälsocentralen gör', en: 'say what you want the health centre to do', kw: ['jag vill', 'ny tid', 'jag hoppas', 'kräver', 'borde'] }
    ],
    model: [
      ['greet', 'Hej,', 'Hello,'],
      ['+who', 'Jag heter Nadia Rahimi och jag vill klaga på mitt besök på hälsocentralen.', 'My name is Nadia Rahimi and I want to complain about my visit to the health centre.'],
      ['+b1', 'Måndagen den 12 oktober klockan 9 hade jag en läkartid, eftersom jag har haft ont i ryggen i flera veckor.', 'On Monday 12 October at 9 I had a doctor\'s appointment, because I have had back pain for several weeks.'],
      ['b2', 'Jag kom i tid, men jag fick vänta nästan två timmar.', 'I came on time, but I had to wait almost two hours.'],
      ['b2', 'Ingen berättade varför läkaren var försenad.', 'Nobody told me why the doctor was late.'],
      ['+b2', 'När jag äntligen träffade läkaren, hade han bara fem minuter för mig.', 'When I finally saw the doctor, he only had five minutes for me.'],
      ['b3', 'Han undersökte inte min rygg utan sa bara att jag skulle ta värktabletter.', 'He did not examine my back but only said that I should take painkillers.'],
      ['b3', 'Jag kände att han inte lyssnade på mig.', 'I felt that he did not listen to me.'],
      ['b3', 'Jag tog ledigt från jobbet för besöket, men jag fick ingen hjälp.', 'I took time off work for the visit, but I got no help.'],
      ['b3', 'Därför är jag mycket missnöjd.', 'That is why I am very dissatisfied.'],
      ['+b4', 'Jag vill ha en ny tid hos en annan läkare så snart som möjligt.', 'I want a new appointment with another doctor as soon as possible.'],
      ['b4', 'Dessutom hoppas jag att ni informerar patienterna när läkaren är försenad.', 'In addition, I hope that you will inform patients when the doctor is late.'],
      ['+close', 'Jag ser fram emot ert svar.', 'I look forward to your reply.'],
      ['+sign', 'Med vänlig hälsning, Nadia Rahimi', 'Kind regards, Nadia Rahimi']
    ]
  });

  T.push({
    id: 't4-asikt', theme: 't4', type: 'opinion', kind: 'Insändare', title: 'Exercise paid by the employer / Dearer sweets',
    sv: 'Välj tema A eller B och skriv din åsikt till tidningens insändarspalt.\nA. Arbetsgivaren borde betala för de anställdas motion.\nB. Godis och läsk borde vara dyrare.',
    en: 'Choose topic A or B and write your opinion for the newspaper\'s letters page.\nA. Employers should pay for their employees\' exercise.\nB. Sweets and soft drinks should be more expensive.',
    bullets: OP_BULLETS,
    model: [
      ['title', 'Högre pris på godis och läsk', 'A higher price for sweets and soft drinks'],
      ['+intro', 'I Finland äter och dricker vi för mycket socker.', 'In Finland we eat and drink too much sugar.'],
      ['thesis', 'Jag tycker att godis och läsk borde vara dyrare.', 'I think that sweets and soft drinks should be more expensive.'],
      ['+r1', 'För det första är socker dåligt för hälsan.', 'Firstly, sugar is bad for your health.'],
      ['r1', 'Det orsakar övervikt, diabetes och hål i tänderna.', 'It causes overweight, diabetes and tooth decay.'],
      ['r1', 'Om priset är högre, köper människor mindre.', 'If the price is higher, people buy less.'],
      ['r2', 'För det andra är det särskilt viktigt för barn och unga.', 'Secondly, it is especially important for children and young people.'],
      ['r2', 'Nu kan ett barn köpa en stor godispåse för ett par euro.', 'Now a child can buy a big bag of sweets for a couple of euros.'],
      ['r3', 'Dessutom kostar sjukdomarna samhället mycket pengar.', 'In addition, the illnesses cost society a lot of money.'],
      ['+counter', 'Naturligtvis får alla bestämma själva vad de äter.', 'Of course everyone may decide for themselves what they eat.'],
      ['counter', 'Jag vill inte förbjuda godis.', 'I do not want to ban sweets.'],
      ['counter', 'Men priset påverkar våra vanor, och frukt borde vara billigare än choklad.', 'But price affects our habits, and fruit should be cheaper than chocolate.'],
      ['+concl', 'Sammanfattningsvis tror jag att en sockerskatt skulle vara bra för hela samhället.', 'To sum up, I believe that a sugar tax would be good for the whole of society.'],
      ['concl', 'Staten kunde använda pengarna till idrott för barn.', 'The state could use the money for children\'s sport.'],
      ['+sign', 'Nadia, Vanda', 'Nadia, Vantaa']
    ],
    alt: {
      label: 'If you choose A',
      outline: [
        ['Opinion', 'Jag håller med. Arbetsgivaren borde betala en del av de anställdas motion.'],
        ['Reason 1', 'Anställda som motionerar är mindre sjuka, så företaget sparar pengar.'],
        ['Reason 2', 'Många sitter hela dagen och får ont i ryggen och nacken.'],
        ['Reason 3', 'Dessutom är gymkort dyra, och alla har inte råd.'],
        ['Conclusion', 'Sammanfattningsvis vinner både arbetsgivaren och de anställda på det.']
      ]
    }
  });

  /* =================== 5 FRITID OCH HOBBYER =================== */
  T.push({
    id: 't5-konsert', theme: 't5', type: 'informal', kind: 'Meddelande till en vän', title: 'Invite a friend to a concert',
    sv: 'Du har två biljetter till en konsert och vill bjuda med en vän. Skriv ett meddelande.',
    en: 'You have two tickets for a concert and want to invite a friend. Write a message.',
    bullets: [
      { sv: 'berätta vilken konsert det är, var och när', en: 'say which concert it is, where and when', kw: ['konsert', 'klockan', 'biljett'] },
      { sv: 'berätta varför du tror att din vän gillar den', en: 'say why you think your friend will like it', kw: ['eftersom', 'älskar', 'gillar', 'tycker om', 'tänkte på dig'] },
      { sv: 'föreslå vad ni kan göra före eller efter', en: 'suggest what you can do before or after', kw: ['före', 'efter', 'äta', 'middag', 'kan vi', 'vi kan'] },
      { sv: 'be om svar före en viss dag', en: 'ask for an answer by a certain day', kw: ['svara', 'senast', 'före', 'hör av dig'] }
    ],
    model: [
      ['greet', 'Hej Mikko!', 'Hi Mikko!'],
      ['+open', 'Hur mår du? Jag har goda nyheter!', 'How are you? I have good news!'],
      ['b1', 'Jag har vunnit två biljetter till en jazzkonsert i Musikhuset fredagen den 20 november klockan 19.', 'I have won two tickets for a jazz concert at the Music Centre on Friday 20 November at 7 pm.'],
      ['b1', 'Har du lust att följa med?', 'Do you feel like coming along?'],
      ['+b2', 'Jag tänkte genast på dig, eftersom du spelar saxofon och älskar jazz.', 'I thought of you straight away, because you play the saxophone and love jazz.'],
      ['b2', 'Bandet kommer från Sverige och har fått mycket bra recensioner.', 'The band comes from Sweden and has had very good reviews.'],
      ['+b3', 'Vi kan äta middag före konserten.', 'We can have dinner before the concert.'],
      ['b3', 'Det finns en ny italiensk restaurang nära Musikhuset som jag gärna vill prova. Jag bjuder!', 'There is a new Italian restaurant near the Music Centre that I would love to try. My treat!'],
      ['+b4', 'Kan du svara senast på onsdag?', 'Can you answer by Wednesday at the latest?'],
      ['b4', 'Om du inte kan komma, frågar jag min syster.', 'If you cannot come, I will ask my sister.'],
      ['+close', 'Hoppas att vi ses!', 'Hope to see you!'],
      ['sign', 'Hälsningar, David', 'Regards, David']
    ]
  });

  T.push({
    id: 't5-kurs', theme: 't5', type: 'formal', kind: 'Meddelande till kurskansliet', title: 'Ask to change course group',
    sv: 'Du har anmält dig till en fotokurs vid medborgarinstitutet, men dina arbetstider har ändrats. Skriv ett meddelande till institutets kansli.',
    en: 'You have signed up for a photography course at the adult education centre, but your working hours have changed. Write a message to the centre\'s office.',
    bullets: [
      { sv: 'berätta vem du är och vilken kurs det gäller', en: 'say who you are and which course it concerns', kw: ['jag heter', 'anmält', 'kursen'] },
      { sv: 'förklara varför du inte kan delta', en: 'explain why you cannot take part', kw: ['tyvärr', 'arbetstider', 'jobbar', 'därför', 'eftersom', 'inte delta'] },
      { sv: 'fråga om du kan byta till en annan grupp', en: 'ask whether you can change to another group', kw: ['annan grupp', 'byta', 'undrar om'] },
      { sv: 'fråga om kursavgiften', en: 'ask about the course fee', kw: ['avgift', 'betalat', 'pengarna', 'euro'] }
    ],
    model: [
      ['greet', 'Hej,', 'Hello,'],
      ['+b1', 'Jag heter David Chen och jag har anmält mig till kursen Fotografering för nybörjare, som börjar tisdagen den 3 november klockan 17.', 'My name is David Chen and I have signed up for the course Photography for Beginners, which starts on Tuesday 3 November at 5 pm.'],
      ['+b2', 'Tyvärr har mina arbetstider ändrats.', 'Unfortunately my working hours have changed.'],
      ['b2', 'Från och med november jobbar jag till klockan 18 på tisdagar, och därför kan jag inte delta i kursen.', 'From November I work until 6 pm on Tuesdays, and therefore I cannot take part in the course.'],
      ['extra', 'Det är synd, eftersom jag har väntat på den här kursen länge.', 'It is a pity, because I have been waiting for this course for a long time.'],
      ['+b3', 'Jag undrar om det finns en annan grupp, till exempel på torsdagar eller på helgen.', 'I wonder whether there is another group, for example on Thursdays or at the weekend.'],
      ['b3', 'I så fall vill jag gärna byta grupp.', 'In that case I would like to change groups.'],
      ['b4', 'Jag har redan betalat kursavgiften, 45 euro.', 'I have already paid the course fee, 45 euros.'],
      ['b4', 'Om det inte finns någon annan grupp, kan jag då få pengarna tillbaka?', 'If there is no other group, can I then get my money back?'],
      ['+close', 'Tack på förhand för svaret!', 'Thank you in advance for your reply!'],
      ['+sign', 'Med vänlig hälsning, David Chen, tfn 040 123 4567', 'Kind regards, David Chen, tel. 040 123 4567']
    ]
  });

  T.push({
    id: 't5-asikt', theme: 't5', type: 'opinion', kind: 'Insändare', title: 'Too many hobbies / Do we still need libraries?',
    sv: 'Välj tema A eller B och skriv din åsikt till tidningens insändarspalt.\nA. Barn har för många hobbyer.\nB. Biblioteken behövs inte längre.',
    en: 'Choose topic A or B and write your opinion for the newspaper\'s letters page.\nA. Children have too many hobbies.\nB. Libraries are no longer needed.',
    bullets: OP_BULLETS,
    model: [
      ['title', 'Vi behöver biblioteken', 'We need the libraries'],
      ['+intro', 'Någon skrev i tidningen att biblioteken inte behövs längre, eftersom allt finns på nätet.', 'Someone wrote in the paper that libraries are no longer needed, because everything is online.'],
      ['thesis', 'Jag håller inte alls med.', 'I do not agree at all.'],
      ['+r1', 'För det första är biblioteket gratis och öppet för alla.', 'Firstly, the library is free and open to everyone.'],
      ['r1', 'Alla har inte råd att köpa böcker eller en dator.', 'Not everyone can afford to buy books or a computer.'],
      ['r2', 'För det andra är biblioteket mycket mer än böcker.', 'Secondly, the library is much more than books.'],
      ['r2', 'Där kan man studera i lugn och ro, läsa tidningar och gå på olika evenemang.', 'There you can study in peace and quiet, read newspapers and go to various events.'],
      ['r2', 'Jag har själv övat svenska på bibliotekets språkkafé.', 'I have practised Swedish myself at the library\'s language café.'],
      ['r3', 'Dessutom är biblioteket en viktig plats för barn. Mina barn älskar sagostunderna.', 'In addition, the library is an important place for children. My children love the story times.'],
      ['+counter', 'Det är sant att många läser e-böcker idag.', 'It is true that many people read e-books today.'],
      ['counter', 'Men man kan låna e-böcker från biblioteket också.', 'But you can borrow e-books from the library too.'],
      ['+concl', 'Sammanfattningsvis är biblioteket en av de bästa sakerna i Finland.', 'To sum up, the library is one of the best things in Finland.'],
      ['concl', 'Jag hoppas att politikerna inte sparar på det.', 'I hope that the politicians do not cut its funding.'],
      ['+sign', 'David, Tammerfors', 'David, Tampere']
    ],
    alt: {
      label: 'If you choose A',
      outline: [
        ['Opinion', 'Jag håller med. Många barn har en hobby nästan varje kväll.'],
        ['Reason 1', 'Barnen blir trötta och hinner inte göra läxorna.'],
        ['Reason 2', 'Hobbyer är dyra, och föräldrarna måste skjutsa hela tiden.'],
        ['Other side', 'Det är sant att hobbyer är bra för hälsan och att barn får vänner där.'],
        ['Conclusion', 'Sammanfattningsvis räcker det med en eller två hobbyer. Barn behöver också fri tid.']
      ]
    }
  });

  /* =================== 6 ARBETE OCH UTBILDNING =================== */
  T.push({
    id: 't6-skift', theme: 't6', type: 'informal', kind: 'Meddelande till en kollega', title: 'Ask a colleague to swap shifts',
    sv: 'Du behöver vara ledig nästa fredag kväll. Skriv ett meddelande till din kollega Tiina och be henne byta skift med dig.',
    en: 'You need next Friday evening off. Write a message to your colleague Tiina and ask her to swap shifts with you.',
    bullets: [
      { sv: 'be henne byta skift och säg vilket skift det gäller', en: 'ask her to swap and say which shift it is', kw: ['byta skift', 'skift', 'fredag'] },
      { sv: 'förklara varför du behöver ledigt', en: 'explain why you need the time off', kw: ['eftersom', 'nämligen', 'måste', 'lovat', 'därför'] },
      { sv: 'föreslå vad du gör i gengäld', en: 'suggest what you will do in return', kw: ['i gengäld', 'i stället', 'jag kan jobba', 'bjuder'] },
      { sv: 'be om ett snabbt svar', en: 'ask for a quick answer', kw: ['svara', 'senast', 'idag', 'imorgon', 'i dag', 'i morgon', 'snart'] }
    ],
    model: [
      ['greet', 'Hej Tiina!', 'Hi Tiina!'],
      ['+b1', 'Jag vill be dig om en stor tjänst.', 'I want to ask you a big favour.'],
      ['b1', 'Skulle du kunna byta skift med mig nästa fredag, den 23 oktober?', 'Could you swap shifts with me next Friday, 23 October?'],
      ['b1', 'Jag har kvällsskiftet från klockan 14 till 22.', 'I have the evening shift from 2 pm to 10 pm.'],
      ['+b2', 'Min dotter uppträder nämligen på skolans höstfest klockan 18, och jag har lovat henne att komma.', 'You see, my daughter is performing at the school\'s autumn party at 6 pm, and I have promised her that I will come.'],
      ['b2', 'Det är väldigt viktigt för henne.', 'It is very important to her.'],
      ['+b3', 'I gengäld kan jag jobba ditt morgonskift på lördag eller söndag. Då får du en ledig dag på helgen.', 'In return I can work your morning shift on Saturday or Sunday. Then you get a day off at the weekend.'],
      ['extra', 'Dessutom bjuder jag på lunch nästa vecka!', 'What is more, lunch is on me next week!'],
      ['+b4', 'Kan du svara redan idag eller imorgon?', 'Can you answer today or tomorrow?'],
      ['b4', 'Jag måste meddela chefen senast på onsdag.', 'I have to let the boss know by Wednesday at the latest.'],
      ['+close', 'Tusen tack på förhand!', 'A thousand thanks in advance!'],
      ['sign', 'Hälsningar, Amina', 'Regards, Amina']
    ]
  });

  T.push({
    id: 't6-ansokan', theme: 't6', type: 'formal', kind: 'Jobbansökan', title: 'Apply for a job at a café',
    sv: 'Du har sett en annons: Café Kajen söker en servitör. Skriv en kort ansökan.',
    en: 'You have seen an ad: Café Kajen is looking for a waiter. Write a short application.',
    bullets: [
      { sv: 'berätta vem du är och vilket jobb du söker', en: 'say who you are and which job you are applying for', kw: ['jag heter', 'söka', 'söker', 'annons'] },
      { sv: 'berätta om din erfarenhet och utbildning', en: 'describe your experience and education', kw: ['erfarenhet', 'jobbat', 'arbetat', 'utbildning', 'kurs', 'studera'] },
      { sv: 'förklara varför du vill ha jobbet', en: 'explain why you want the job', kw: ['eftersom', 'jag vill', 'tycker om', 'gärna'] },
      { sv: 'berätta när du kan börja och hur de kan nå dig', en: 'say when you can start and how they can reach you', kw: ['börja', 'nå mig', 'telefon', 'e-post', 'intervju'] }
    ],
    model: [
      ['greet', 'Hej,', 'Hello,'],
      ['+b1', 'Jag heter Amina Yusuf och jag är 29 år gammal.', 'My name is Amina Yusuf and I am 29 years old.'],
      ['b1', 'Igår såg jag er annons på nätet, och jag vill söka jobbet som servitör på Café Kajen.', 'Yesterday I saw your ad online, and I want to apply for the job as a waiter at Café Kajen.'],
      ['+b2', 'I tre år har jag jobbat på en restaurang i Åbo, så jag har god erfarenhet av kundservice.', 'For three years I have worked at a restaurant in Turku, so I have good experience of customer service.'],
      ['b2', 'Dessutom har jag hygienpass.', 'In addition, I have a hygiene passport.'],
      ['b2', 'Jag talar finska och engelska bra och studerar svenska på kvällarna.', 'I speak Finnish and English well and study Swedish in the evenings.'],
      ['+b3', 'Jag vill gärna jobba hos er, eftersom jag tycker om att träffa människor och ert kafé har ett mycket gott rykte.', 'I would very much like to work for you, because I like meeting people and your café has a very good reputation.'],
      ['b3', 'Mina kolleger säger att jag är glad, snabb och arbetsam.', 'My colleagues say that I am cheerful, quick and hard-working.'],
      ['+b4', 'Jag kan börja genast.', 'I can start immediately.'],
      ['b4', 'Ni kan nå mig på telefon 040 123 4567 eller per e-post.', 'You can reach me by phone on 040 123 4567 or by email.'],
      ['close', 'Jag kommer gärna på intervju.', 'I would be glad to come for an interview.'],
      ['+sign', 'Med vänlig hälsning, Amina Yusuf', 'Kind regards, Amina Yusuf']
    ]
  });

  T.push({
    id: 't6-asikt', theme: 't6', type: 'opinion', kind: 'Insändare', title: 'Remote work / Studying something new every year',
    sv: 'Välj tema A eller B och skriv din åsikt till tidningens insändarspalt.\nA. Distansarbete är bättre än arbete på kontoret.\nB. Alla vuxna borde studera något nytt varje år.',
    en: 'Choose topic A or B and write your opinion for the newspaper\'s letters page.\nA. Remote work is better than working at the office.\nB. All adults should study something new every year.',
    bullets: OP_BULLETS,
    model: [
      ['title', 'Distansarbete passar inte alla', 'Remote work does not suit everyone'],
      ['+intro', 'Nuförtiden jobbar många hemifrån, och många tycker att det är bättre än att jobba på kontoret.', 'Nowadays many people work from home, and many think that it is better than working at the office.'],
      ['thesis', 'Jag håller bara delvis med.', 'I only partly agree.'],
      ['+r1', 'Det finns flera fördelar med distansarbete.', 'There are several advantages to remote work.'],
      ['r1', 'För det första sparar man tid, eftersom man inte behöver resa till jobbet.', 'Firstly, you save time, because you do not need to travel to work.'],
      ['r1', 'Jag sparar själv nästan två timmar om dagen.', 'I save almost two hours a day myself.'],
      ['r2', 'För det andra är det lättare att koncentrera sig hemma, där det är lugnt.', 'Secondly, it is easier to concentrate at home, where it is quiet.'],
      ['+counter', 'Men det finns också nackdelar.', 'But there are disadvantages too.'],
      ['counter', 'Man träffar inte sina kolleger, och man kan känna sig ensam.', 'You do not meet your colleagues, and you can feel lonely.'],
      ['r3', 'Dessutom är arbetsplatsen ofta det bästa stället för en invandrare att öva språket.', 'What is more, the workplace is often the best place for an immigrant to practise the language.'],
      ['+concl', 'Sammanfattningsvis tycker jag att det bästa är att kombinera båda.', 'To sum up, I think that the best thing is to combine the two.'],
      ['concl', 'Två eller tre dagar hemma och resten på kontoret passar de flesta.', 'Two or three days at home and the rest at the office suits most people.'],
      ['concl', 'Då får man det bästa av båda.', 'Then you get the best of both.'],
      ['+sign', 'Amina, Åbo', 'Amina, Turku']
    ],
    alt: {
      label: 'If you choose B',
      outline: [
        ['Opinion', 'Jag håller med om att vuxna borde lära sig nya saker hela livet.'],
        ['Reason 1', 'Arbetslivet förändras snabbt, och man behöver nya kunskaper för att behålla jobbet.'],
        ['Reason 2', 'Det är bra för hjärnan att lära sig något nytt, till exempel ett språk.'],
        ['Other side', 'Det är sant att många inte har tid eller pengar, så kurserna borde vara billiga och korta.'],
        ['Conclusion', 'Sammanfattningsvis är det aldrig för sent att studera.']
      ]
    }
  });

  /* =================== 7 SAMHÄLLE =================== */
  T.push({
    id: 't7-nyfinland', theme: 't7', type: 'informal', kind: 'Meddelande till en vän', title: 'Advise a friend who has just moved to Finland',
    sv: 'Din vän Karim har just flyttat till Finland och frågar vad han måste göra först. Skriv ett meddelande till honom.',
    en: 'Your friend Karim has just moved to Finland and asks what he has to do first. Write him a message.',
    bullets: [
      { sv: 'hälsa honom välkommen', en: 'welcome him', kw: ['välkommen', 'roligt', 'kul'] },
      { sv: 'berätta om minst två saker som han måste göra först', en: 'tell him at least two things he must do first', kw: ['måste', 'behöver', 'för det första', 'sedan', 'kom ihåg', 'ansöka'], need: 2 },
      { sv: 'rekommendera ett sätt att lära sig språket', en: 'recommend a way to learn the language', kw: ['rekommenderar', 'kurs', 'svenska', 'språk', 'studera'] },
      { sv: 'erbjud din hjälp', en: 'offer your help', kw: ['hjälpa', 'följa med', 'om du vill', 'hör av dig'] }
    ],
    model: [
      ['greet', 'Hej Karim!', 'Hi Karim!'],
      ['+b1', 'Välkommen till Finland! Vad roligt att du äntligen är här.', 'Welcome to Finland! How nice that you are finally here.'],
      ['+b2', 'Du frågade vad du måste göra först.', 'You asked what you have to do first.'],
      ['b2', 'För det första måste du registrera dig som invånare, så att du får en finsk personbeteckning.', 'First of all you must register as a resident, so that you get a Finnish personal identity code.'],
      ['b2', 'Sedan behöver du ett bankkonto och ett skattekort om du ska jobba.', 'Then you need a bank account and a tax card if you are going to work.'],
      ['b2', 'Kom också ihåg att ansöka om FPA-kort.', 'Also remember to apply for a Kela card.'],
      ['+b3', 'Jag rekommenderar att du börjar studera svenska genast.', 'I recommend that you start studying Swedish straight away.'],
      ['b3', 'Medborgarinstitutet har billiga kvällskurser, och jag gick själv där i två år.', 'The adult education centre has cheap evening courses, and I went there myself for two years.'],
      ['+b4', 'Om du vill, kan jag följa med dig till banken nästa vecka.', 'If you want, I can come with you to the bank next week.'],
      ['extra', 'Blanketterna är ibland svåra att förstå i början.', 'The forms are sometimes hard to understand at the beginning.'],
      ['+close', 'Hör av dig om du har frågor!', 'Get in touch if you have questions!'],
      ['sign', 'Hälsningar, Yasmin', 'Regards, Yasmin']
    ]
  });

  T.push({
    id: 't7-buss', theme: 't7', type: 'formal', kind: 'Meddelande till staden', title: 'Ask the city not to cut your bus line',
    sv: 'Du har läst att staden planerar att dra in busslinjen i ditt område. Skriv ett meddelande till stadens trafikkontor.',
    en: 'You have read that the city plans to withdraw the bus line in your area. Write a message to the city\'s transport office.',
    bullets: [
      { sv: 'berätta vem du är och varför du skriver', en: 'say who you are and why you are writing', kw: ['jag heter', 'jag bor', 'jag skriver', 'läste'] },
      { sv: 'förklara varför busslinjen är viktig (minst två skäl)', en: 'explain why the bus line is important (at least two reasons)', kw: ['viktig', 'jobbet', 'skolan', 'ingen bil', 'äldre', 'eftersom', 'behöver'], need: 2 },
      { sv: 'berätta vad som händer om linjen dras in', en: 'say what happens if the line is withdrawn', kw: ['om linjen', 'om bussen', 'måste jag', 'dessutom', 'då '] },
      { sv: 'ge ett eget förslag', en: 'make a suggestion of your own', kw: ['föreslår', 'förslag', 'i stället', 'borde'] }
    ],
    model: [
      ['greet', 'Hej,', 'Hello,'],
      ['+b1', 'Jag heter Yasmin Ali och jag bor i Gammelstaden.', 'My name is Yasmin Ali and I live in Gammelstaden.'],
      ['b1', 'Jag läste i tidningen att staden planerar att dra in busslinje 12.', 'I read in the paper that the city plans to withdraw bus line 12.'],
      ['b1', 'Jag skriver för att berätta varför det är ett dåligt beslut.', 'I am writing to explain why that is a bad decision.'],
      ['+b2', 'Busslinje 12 är mycket viktig för oss som bor här.', 'Bus line 12 is very important for those of us who live here.'],
      ['b2', 'Jag åker med den till jobbet varje dag, och mina barn åker med den till skolan.', 'I take it to work every day, and my children take it to school.'],
      ['b2', 'Många äldre invånare har ingen bil, så de behöver bussen för att kunna åka till hälsocentralen och butiken.', 'Many elderly residents have no car, so they need the bus in order to get to the health centre and the shop.'],
      ['+b3', 'Om linjen dras in, måste jag köpa en bil, och det har jag inte råd med.', 'If the line is withdrawn, I will have to buy a car, and I cannot afford that.'],
      ['b3', 'Dessutom blir det mer trafik och mer föroreningar i området.', 'In addition, there will be more traffic and more pollution in the area.'],
      ['+b4', 'Jag förstår att staden måste spara pengar.', 'I understand that the city has to save money.'],
      ['b4', 'Därför föreslår jag att bussen går en gång i timmen i stället för två.', 'That is why I suggest that the bus runs once an hour instead of twice.'],
      ['+close', 'Jag hoppas att ni tänker om.', 'I hope that you will reconsider.'],
      ['+sign', 'Med vänlig hälsning, Yasmin Ali', 'Kind regards, Yasmin Ali']
    ]
  });

  T.push({
    id: 't7-asikt', theme: 't7', type: 'opinion', kind: 'Insändare', title: 'Voting rights / Finding work as an immigrant',
    sv: 'Välj tema A eller B och skriv din åsikt till tidningens insändarspalt.\nA. Alla som bor i Finland borde få rösta i alla val.\nB. Det är för svårt för invandrare att hitta arbete i Finland.',
    en: 'Choose topic A or B and write your opinion for the newspaper\'s letters page.\nA. Everyone who lives in Finland should be allowed to vote in all elections.\nB. It is too difficult for immigrants to find work in Finland.',
    bullets: OP_BULLETS,
    model: [
      ['title', 'Språket är nyckeln till arbete', 'Language is the key to work'],
      ['+intro', 'Många invandrare i Finland är arbetslösa, trots att de har en bra utbildning.', 'Many immigrants in Finland are unemployed, although they have a good education.'],
      ['thesis', 'Jag tycker att det är alldeles för svårt för invandrare att hitta arbete här.', 'I think that it is far too difficult for immigrants to find work here.'],
      ['+r1', 'Det största problemet är språket.', 'The biggest problem is the language.'],
      ['r1', 'Många arbetsgivare kräver perfekt finska eller svenska, även om man inte behöver det i jobbet.', 'Many employers require perfect Finnish or Swedish, even if you do not need it in the job.'],
      ['r2', 'För det andra litar arbetsgivarna inte alltid på utländska examina.', 'Secondly, employers do not always trust foreign qualifications.'],
      ['r2', 'Min man är ingenjör, men han har jobbat som städare i tre år.', 'My husband is an engineer, but he has worked as a cleaner for three years.'],
      ['r3', 'Dessutom får man ofta jobb genom kontakter, och nya invånare har inga kontakter.', 'In addition, people often get jobs through contacts, and new residents have no contacts.'],
      ['+counter', 'Vad kan vi göra?', 'What can we do?'],
      ['counter', 'Jag anser att det borde finnas fler språkkurser på arbetsplatserna.', 'I consider that there should be more language courses at workplaces.'],
      ['counter', 'Företagen borde också våga anställa människor som ännu lär sig språket.', 'Companies should also dare to hire people who are still learning the language.'],
      ['+concl', 'Sammanfattningsvis förlorar hela samhället när utbildade människor inte får arbeta.', 'To sum up, the whole of society loses when educated people do not get to work.'],
      ['+sign', 'Yasmin, Borgå', 'Yasmin, Porvoo']
    ],
    alt: {
      label: 'If you choose A',
      outline: [
        ['Opinion', 'Jag håller delvis med. Alla som har bott här länge borde få rösta.'],
        ['Reason 1', 'Vi betalar skatt och följer lagarna precis som alla andra.'],
        ['Reason 2', 'Besluten påverkar också våra liv, till exempel skolor och hälsovård.'],
        ['Other side', 'Det är sant att man borde känna samhället först, så en gräns på några år är rimlig.'],
        ['Conclusion', 'Sammanfattningsvis blir samhället mer rättvist när fler får påverka.']
      ]
    }
  });

  YKI.tasks = T;
  YKI.taskById = function (id) { for (var i = 0; i < T.length; i++) if (T[i].id === id) return T[i]; return null; };
  YKI.modelText = function (task) {
    var out = '';
    task.model.forEach(function (seg, i) {
      var para = seg[0].charAt(0) === '+';
      out += (i === 0 ? '' : para ? '\n\n' : ' ') + seg[1];
    });
    return out;
  };

  /* Two full mock exams: one informal, one formal, one opinion — tasks not used on days 1–8. */
  YKI.mocks = [
    { id: 'mock1', title: 'Mock exam 1', tasks: ['t5-konsert', 't2-reklamation', 't4-asikt'] },
    { id: 'mock2', title: 'Mock exam 2', tasks: ['t4-sjukhus', 't1-bostad', 't7-asikt'] }
  ];
})();

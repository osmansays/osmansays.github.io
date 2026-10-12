/* YKI Skriva — the sentence bank: ready-made sentences and frames to memorise.
   Each one is something you can drop straight into an exam answer.
   C(day, group, swedish, english, why?)   "…" marks a slot you fill in yourself. */
(function () {
  'use strict';
  var YKI = (window.YKI = window.YKI || {});

  YKI.chunkGroups = [
    { id: 'friend', day: 1, title: 'Writing to a friend', en: 'Openings, reactions and endings for informal messages' },
    { id: 'ask', day: 2, title: 'Asking, answering, arranging', en: 'Questions, requests, practical details' },
    { id: 'glue', day: 3, title: 'Glue: linking ideas', en: 'Connectors and clause frames that turn sentences into a text' },
    { id: 'formal', day: 4, title: 'Formal messages and complaints', en: 'Who you are, what happened, what you want' },
    { id: 'opinion', day: 5, title: 'Giving your opinion', en: 'Thesis, reasons, the other side, conclusion' },
    { id: 'time', day: 6, title: 'Telling when', en: 'Past, present and future in one text' },
    { id: 'polite', day: 7, title: 'Polite and official', en: 'Requests to authorities, advice, rights' },
    { id: 'upgrade', day: 8, title: 'Level 4 upgrades', en: 'Phrases that show range' }
  ];

  var list = [];
  function C(day, g, sv, en, why) { list.push({ day: day, g: g, sv: sv, en: en, note: why || '' }); }

  /* ---- Day 1: writing to a friend ---- */
  C(1, 'friend', 'Tack för ditt meddelande!', 'Thank you for your message!');
  C(1, 'friend', 'Jag hoppas att allt är bra med dig.', 'I hope that all is well with you.');
  C(1, 'friend', 'Det var länge sedan vi sågs.', 'It has been a long time since we saw each other.');
  C(1, 'friend', 'Jag skriver för att berätta att …', 'I am writing to tell you that …', 'för att + infinitive = in order to');
  C(1, 'friend', 'Vilka fantastiska nyheter!', 'What fantastic news!');
  C(1, 'friend', 'Grattis till det nya jobbet!', 'Congratulations on the new job!', 'grattis till = congratulations on');
  C(1, 'friend', 'Jag är så glad för din skull.', 'I am so happy for you.');
  C(1, 'friend', 'Vi måste fira det här tillsammans.', 'We must celebrate this together.');
  C(1, 'friend', 'Vad sägs om att äta middag på lördag?', 'How about having dinner on Saturday?', 'Vad sägs om att + infinitive: a friendly suggestion.');
  C(1, 'friend', 'Har du lust att följa med?', 'Do you feel like coming along?');
  C(1, 'friend', 'Jag ser fram emot att träffa dig.', 'I am looking forward to seeing you.');
  C(1, 'friend', 'Hör av dig snart!', 'Get in touch soon!');
  C(1, 'friend', 'Ha det så bra!', 'Take care!');
  C(1, 'friend', 'Jag finns här för dig om du behöver något.', 'I am here for you if you need anything.');

  /* ---- Day 2: asking, answering, arranging ---- */
  C(2, 'ask', 'Jag såg din annons på nätet igår.', 'I saw your ad online yesterday.');
  C(2, 'ask', 'Jag är intresserad av cykeln som du säljer.', 'I am interested in the bike that you are selling.');
  C(2, 'ask', 'Jag har några frågor.', 'I have a few questions.');
  C(2, 'ask', 'Kan du berätta lite mer om lägenheten?', 'Can you tell me a bit more about the flat?');
  C(2, 'ask', 'Jag undrar om priset går att diskutera.', 'I wonder whether the price is negotiable.', 'undrar om … = wonder whether …');
  C(2, 'ask', 'Skulle du kunna skicka några bilder?', 'Could you send some pictures?', 'Skulle du kunna + infinitive: polite request.');
  C(2, 'ask', 'Du kan nå mig på telefon efter klockan fyra.', 'You can reach me by phone after four o\'clock.');
  C(2, 'ask', 'Passar det dig på lördag klockan två?', 'Does Saturday at two suit you?');
  C(2, 'ask', 'Det passar mig bra.', 'That suits me well.');
  C(2, 'ask', 'Tyvärr kan jag inte komma.', 'Unfortunately I cannot come.', 'Tyvärr is in first place, so the verb kan comes before jag.');
  C(2, 'ask', 'Förlåt att jag svarar så sent.', 'Sorry that I am replying so late.');
  C(2, 'ask', 'Jag väntar på ditt svar.', 'I am waiting for your reply.', 'vänta på = wait for');
  C(2, 'ask', 'Tack på förhand!', 'Thanks in advance!');

  /* ---- Day 3: glue ---- */
  C(3, 'glue', 'Jag stannade hemma eftersom jag var sjuk.', 'I stayed at home because I was ill.', 'eftersom + subject + verb');
  C(3, 'glue', 'Det regnade, så vi stannade hemma.', 'It rained, so we stayed at home.');
  C(3, 'glue', 'Därför vill jag föreslå en sak.', 'That is why I want to suggest one thing.', 'Därför in first place: verb second, then the subject.');
  C(3, 'glue', 'Dessutom är det billigt.', 'Moreover, it is cheap.', 'Do not use Också alone as a linking word at the start of a sentence (like English “Also, …”). Use Dessutom.');
  C(3, 'glue', 'För det första är det för dyrt.', 'Firstly, it is too expensive.');
  C(3, 'glue', 'För det andra tar det för lång tid.', 'Secondly, it takes too long.');
  C(3, 'glue', 'Till exempel kan vi städa gården tillsammans.', 'For example, we can clean the yard together.');
  C(3, 'glue', 'Jag tror att det inte fungerar.', 'I think that it does not work.', 'In an att-clause, inte comes before the verb.');
  C(3, 'glue', 'Om du har tid, kan vi ses imorgon.', 'If you have time, we can meet tomorrow.', 'The om-clause fills first place, so the main verb kan comes straight after it.');
  C(3, 'glue', 'När jag kom hem, märkte jag att dörren var öppen.', 'When I came home, I noticed that the door was open.');
  C(3, 'glue', 'Trots att det är dyrt, tycker jag att det är värt det.', 'Although it is expensive, I think that it is worth it.');
  C(3, 'glue', 'Det är viktigt att alla hjälper till.', 'It is important that everyone helps.');
  C(3, 'glue', 'Ta gärna med handskar och en sopsäck.', 'Feel free to bring gloves and a bin bag.');
  C(3, 'glue', 'Till sist vill jag tacka alla.', 'Finally, I want to thank everyone.');

  /* ---- Day 4: formal messages and complaints ---- */
  C(4, 'formal', 'Jag skriver till er eftersom jag vill klaga på servicen.', 'I am writing to you because I want to complain about the service.');
  C(4, 'formal', 'Jag skriver angående min beställning.', 'I am writing regarding my order.', 'angående + noun = regarding');
  C(4, 'formal', 'Jag är mycket missnöjd med produkten.', 'I am very dissatisfied with the product.');
  C(4, 'formal', 'Problemet är att hissen inte fungerar.', 'The problem is that the lift does not work.', 'att-clause: inte before the verb.');
  C(4, 'formal', 'Det här har pågått i tre veckor.', 'This has been going on for three weeks.');
  C(4, 'formal', 'Jag har redan kontaktat er två gånger.', 'I have already contacted you twice.');
  C(4, 'formal', 'Jag anser att det här är oacceptabelt.', 'I consider this unacceptable.');
  C(4, 'formal', 'Jag kräver att ni åtgärdar problemet inom två veckor.', 'I demand that you fix the problem within two weeks.');
  C(4, 'formal', 'Jag vill ha pengarna tillbaka.', 'I want my money back.', 'vill ha + thing; vill + verb');
  C(4, 'formal', 'Annars kommer jag att kontakta konsumentrådgivningen.', 'Otherwise I will contact the consumer advisory service.');
  C(4, 'formal', 'Jag hoppas att ni kan lösa det här så snart som möjligt.', 'I hope that you can solve this as soon as possible.');
  C(4, 'formal', 'Ni kan nå mig per e-post eller på telefon.', 'You can reach me by email or by phone.');
  C(4, 'formal', 'Jag ser fram emot ert svar.', 'I look forward to your reply.');
  C(4, 'formal', 'Med vänlig hälsning', 'Kind regards (formal ending)');

  /* ---- Day 5: opinion ---- */
  C(5, 'opinion', 'Enligt min åsikt är det här en viktig fråga.', 'In my opinion this is an important issue.', 'Enligt min åsikt fills first place: verb next.');
  C(5, 'opinion', 'Jag tycker att barn inte behöver en egen telefon.', 'I think that children do not need a phone of their own.', 'att-clause: inte before the verb.');
  C(5, 'opinion', 'Jag håller med om det.', 'I agree with that.');
  C(5, 'opinion', 'Jag håller inte alls med.', 'I do not agree at all.');
  C(5, 'opinion', 'Det finns både fördelar och nackdelar.', 'There are both advantages and disadvantages.');
  C(5, 'opinion', 'En fördel är att man sparar tid.', 'One advantage is that you save time.');
  C(5, 'opinion', 'En nackdel är att det kostar mycket.', 'One disadvantage is that it costs a lot.');
  C(5, 'opinion', 'Det är sant att det är dyrt, men det är värt det.', 'It is true that it is expensive, but it is worth it.');
  C(5, 'opinion', 'Å andra sidan förstår jag föräldrarna.', 'On the other hand, I understand the parents.');
  C(5, 'opinion', 'Jag har själv märkt att det fungerar.', 'I have noticed myself that it works.');
  C(5, 'opinion', 'I mitt hemland är det annorlunda.', 'In my home country it is different.');
  C(5, 'opinion', 'Det beror på situationen.', 'It depends on the situation.', 'bero på = depend on');
  C(5, 'opinion', 'Sammanfattningsvis tycker jag att vi måste göra något.', 'To sum up, I think that we must do something.');
  C(5, 'opinion', 'Vad tycker ni andra?', 'What do the rest of you think?');

  /* ---- Day 6: telling when ---- */
  C(6, 'time', 'För två veckor sedan köpte jag en lampa hos er.', 'Two weeks ago I bought a lamp from you.', 'för … sedan = … ago, with the past tense.');
  C(6, 'time', 'Jag har bott i Finland i tre år.', 'I have lived in Finland for three years.', 'har + supine for something that started in the past and is still true.');
  C(6, 'time', 'Nästa vecka ska jag börja på ett nytt jobb.', 'Next week I am going to start a new job.');
  C(6, 'time', 'Jag kommer att sakna dig.', 'I will miss you.', 'kommer att + infinitive: a prediction.');
  C(6, 'time', 'Sedan dess har jag inte hört något.', 'Since then I have not heard anything.');
  C(6, 'time', 'Så fort jag vet mer, hör jag av mig.', 'As soon as I know more, I will be in touch.');
  C(6, 'time', 'Jag har aldrig varit med om något liknande.', 'I have never experienced anything like it.');
  C(6, 'time', 'Kan du byta skift med mig på fredag?', 'Can you swap shifts with me on Friday?');
  C(6, 'time', 'Jag kan jobba för dig nästa vecka i stället.', 'I can work for you next week instead.');
  C(6, 'time', 'Tack vare dig har jag lärt mig mycket.', 'Thanks to you I have learnt a lot.');
  C(6, 'time', 'Jag kommer alltid att minnas dina lektioner.', 'I will always remember your lessons.');
  C(6, 'time', 'Jag kan börja genast.', 'I can start immediately.');

  /* ---- Day 7: polite and official ---- */
  C(7, 'polite', 'Jag skulle vilja boka en tid.', 'I would like to book an appointment.');
  C(7, 'polite', 'Jag skulle vilja veta varför min ansökan fick avslag.', 'I would like to know why my application was rejected.', 'After varför inside a sentence: subject before verb.');
  C(7, 'polite', 'Jag ber er att behandla min ansökan på nytt.', 'I ask you to process my application again.');
  C(7, 'polite', 'Jag vore tacksam om ni kunde svara snabbt.', 'I would be grateful if you could reply quickly.');
  C(7, 'polite', 'Jag behöver kursen för att kunna få ett jobb.', 'I need the course in order to be able to get a job.');
  C(7, 'polite', 'Beslutet påverkar mitt liv mycket.', 'The decision affects my life a great deal.');
  C(7, 'polite', 'Jag anser att beslutet är orättvist.', 'I consider the decision unfair.');
  C(7, 'polite', 'Jag föreslår att bussen går en gång i timmen.', 'I suggest that the bus runs once an hour.');
  C(7, 'polite', 'Jag rekommenderar att du börjar i god tid.', 'I recommend that you start in good time.');
  C(7, 'polite', 'Kom ihåg att ta med passet.', 'Remember to bring your passport.');
  C(7, 'polite', 'Det viktigaste är att lära sig språket.', 'The most important thing is to learn the language.');
  C(7, 'polite', 'Alla har rätt till en bra utbildning.', 'Everyone has the right to a good education.', 'ha rätt till = have the right to');

  /* ---- Day 8: level 4 upgrades ---- */
  C(8, 'upgrade', 'Jag måste erkänna att jag var besviken.', 'I must admit that I was disappointed.');
  C(8, 'upgrade', 'Det verkar som om ingen bryr sig.', 'It seems as if nobody cares.');
  C(8, 'upgrade', 'Med andra ord behöver vi en ny lösning.', 'In other words, we need a new solution.');
  C(8, 'upgrade', 'Framför allt är det en fråga om pengar.', 'Above all, it is a question of money.');
  C(8, 'upgrade', 'I stället för att klaga borde vi göra något.', 'Instead of complaining, we should do something.');
  C(8, 'upgrade', 'Även om det kostar mer, är det värt det.', 'Even if it costs more, it is worth it.');
  C(8, 'upgrade', 'Ju mer man övar, desto bättre blir man.', 'The more you practise, the better you get.');
  C(8, 'upgrade', 'Det är på tiden att något görs.', 'It is about time that something is done.');
  C(8, 'upgrade', 'Jag är övertygad om att det lönar sig.', 'I am convinced that it pays off.');
  C(8, 'upgrade', 'Det råder ingen tvekan om att språket är viktigt.', 'There is no doubt that the language is important.');

  var counters = {};
  list.forEach(function (c) {
    counters[c.g] = (counters[c.g] || 0) + 1;
    c.id = 'c-' + c.g + '-' + (counters[c.g] < 10 ? '0' : '') + counters[c.g];
    c.kind = 'sentence';
  });
  YKI.chunks = list;

  /* All memorisable items in teaching order: for each day, sentences first, then that day's theme words. */
  YKI.allCards = function () {
    var out = [];
    for (var d = 1; d <= 8; d++) {
      YKI.chunks.forEach(function (c) { if (c.day === d) out.push(c); });
      YKI.vocab.forEach(function (v) { if (v.day === d) out.push(v); });
    }
    return out;
  };
  YKI.cardById = function (id) {
    var all = YKI.chunks.concat(YKI.vocab);
    for (var i = 0; i < all.length; i++) if (all[i].id === id) return all[i];
    return null;
  };
})();

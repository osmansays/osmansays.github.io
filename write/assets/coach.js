/* YKI Skriva — the writing coach.
   Rule-based checks on a learner's text. It cannot read meaning, so every finding is a hint to look at,
   not a verdict. It checks the things raters notice first: is the task done, is the text framed and linked,
   and are the classic word-order and small-word mistakes there. */
(function () {
  'use strict';
  var YKI = window.YKI;

  /* JavaScript's \b does not treat å, ä, ö as letters, so word boundaries are spelled out:
     "<<" = start of a word, ">>" = end of a word. */
  var LET = 'a-zåäöéüA-ZÅÄÖÉÜ';
  function rx(src, flags) {
    return new RegExp(src.replace(/<</g, '(?<![' + LET + '])').replace(/>>/g, '(?![' + LET + '])'), flags === undefined ? 'i' : flags);
  }
  var W = '[a-zåäö0-9]+';
  var SUBJ = '(jag|du|han|hon|hen|vi|ni|de|dom|man|det|den)';
  /* Words that look like a finite verb: used to avoid false alarms when the verb is already in second place. */
  var VERBISH = rx('^(' + W + '(r|de|te)|kan|vill|ska|måste|får|bör|var|hade|gick|kom|såg|fick|blev|tog|skrev|sa|åt|sov|fanns|finns|låg|satt|stod|gav|visste|kunde|ville|skulle|borde|brukar|hoppas|trivs|behövs|känns|verkar)$');
  var NOTVERB = rx('^(här|där|nu|då|också|verkligen|faktiskt|kanske|ju|väl|bara|själv|alla|andra|flesta|redan|ofta|snart|sedan|gärna|helst)$');
  var FRONT1 = '(igår|i går|idag|i dag|imorgon|i morgon|ikväll|i kväll|nu|därför|tyvärr|dessutom|först|ibland|ofta|annars|plötsligt|äntligen|självklart|naturligtvis|sammanfattningsvis|förhoppningsvis|nuförtiden|numera|efteråt|samtidigt|slutligen|till sist|till exempel|för det första|för det andra|för det tredje|enligt min åsikt|å andra sidan|å ena sidan|på morgonen|på kvällen|på eftermiddagen|på helgen|på helgerna|på fritiden|på sommaren|på vintern|nästa vecka|nästa år|nästa månad|förra veckan|förra året|förra månaden|varje dag|varje vecka|i mitt hemland|i finland|efter jobbet|efter skolan)';
  /* Linking words, each with the pattern that shows it is really being used to link
     ("så" in "så glad" and "om" in "berätta om" are not links). */
  var CONNECTORS = [
    ['eftersom', '<<eftersom>>'], ['därför', '<<därför>>'], ['dessutom', '<<dessutom>>'], ['men', '<<men>>'],
    ['så', ', så (?!att>>)'], ['om', '<<om (jag|du|han|hon|vi|ni|de|man|det|den|någon|ingenting|inget)>>'],
    ['när', '<<när (jag|du|han|hon|vi|ni|de|man|det|den|[a-zåäö]+en>>|[a-zåäö]+et>>)'],
    ['sedan', '(^|[.!?] )sedan>>'], ['då', '(^|[.!?] )då>>'], ['först', '(^|[.!?] )först>>'], ['till sist', '<<till sist>>'], ['till exempel', '<<till exempel>>'],
    ['för det första', '<<för det första>>'], ['för det andra', '<<för det andra>>'], ['för det tredje', '<<för det tredje>>'],
    ['å andra sidan', '<<å andra sidan>>'], ['sammanfattningsvis', '<<sammanfattningsvis>>'], ['annars', '<<annars>>'], ['tyvärr', '<<tyvärr>>'],
    ['också', '<<också>>'], ['som', '<<som (?!vana>>)'], ['för att', '<<för att>>'], ['innan', '<<innan>>'], ['medan', '<<medan>>'],
    ['trots att', '<<trots att>>'], ['fastän', '<<fastän>>'], ['även om', '<<även om>>'], ['i stället', '<<i stället>>'], ['nämligen', '<<nämligen>>'], ['att', '<<att (jag|du|han|hon|vi|ni|de|man|det|den|[a-zåäö]+(en|et|na|ar|or|er))>>']
  ].map(function (c) { return [c[0], rx(c[1], 'im')]; });
  var LOWER = '(Svenska|Finska|Engelska|Ryska|Arabiska|Måndag|Tisdag|Onsdag|Torsdag|Fredag|Lördag|Söndag|Januari|Februari|Mars|April|Maj|Juni|Juli|Augusti|September|Oktober|November|December)';
  var DEFNOUN = '(lägenheten|bilen|cykeln|familjen|läkaren|chefen|jobbet|huset|barnet|problemet|lampan|soffan|vännen|kollegan|hälsan|ryggen|datorn|telefonen|kursen|läraren|skolan|ansökningen|hunden|katten|mannen|frun|dottern|sonen|mamman|pappan|hyran|räkningen|beställningen|grannen|staden|vardagen|åsikten)';

  var PATTERNS = [
    ['<<vill (en|ett|den|det|min|mitt|mina|pengarna|ersättning)>>', 'vill needs a verb after it. To want a thing, write “vill ha”: Jag vill ha en ny lampa.'],
    ['<<mycket (vänner|problem|saker|människor|bilar|frågor|gånger|böcker|kurser|barn|grannar|fördelar|nackdelar|invandrare|hobbyer|sopor)>>', 'Things you can count take “många”: många problem, många vänner.'],
    ['<<många (tid|pengar|vatten|plast|stress|arbete|socker|oljud|trafik|hjälp|erfarenhet)>>', 'Things you cannot count take “mycket”: mycket tid, mycket pengar.'],
    ['<<intresserad (i|på|om|för)>>', '“intresserad av”: Jag är intresserad av soffan.'],
    ['<<vänta(r|de)? (ditt|ert|din|er|svar)>>', '“vänta på”: Jag väntar på ditt svar.'],
    ['<<klaga(r|de)? (om|för)>>', '“klaga på”: Jag vill klaga på servicen.'],
    ['<<lyssna(r|de)? (musik|radio|mig|dig)>>', '“lyssna på”: Jag lyssnar på musik.'],
    ['<<titta(r|de)? (film|filmer|tv|teve)>>', '“titta på”: Jag tittar på film.'],
    ['<<(missnöjd|nöjd) (på|av|om|för)>>', '“nöjd med / missnöjd med”.'],
    ['<<stolt (på|av|för|om)>>', '“stolt över”: Jag är stolt över dig.'],
    ['<<grattis (för|på|om)>>', '“grattis till”: Grattis till det nya jobbet!'],
    ['<<tack (till|av|om) (hjälpen|ditt|din|inbjudan|svaret)>>', '“tack för”: Tack för hjälpen!'],
    ['<<(gick|kom|åkte|går|kommer|åker|gå|komma|åka) hemma>>', 'Movement towards home is “hem”: Jag gick hem. “hemma” = at home.'],
    ['<<(är|var|stannar|stannade|stanna|sitter) hem>>', 'Being at home is “hemma”: Jag stannade hemma.'],
    ['<<i morgonen>>', '“på morgonen” = in the morning. (“i morgon” = tomorrow.)'],
    ['<<i (måndag|tisdag|onsdag|torsdag|fredag|lördag|söndag)>>', 'Weekdays: “på måndag” (coming) or “i måndags” (last).'],
    ['<<på (januari|februari|mars|april|maj|juni|juli|augusti|september|oktober|november|december)>>', 'Months take “i”: i oktober.'],
    ['<<för (en|ett|två|tre|fyra|fem|sex|sju|åtta|nio|tio|\\d+|några|flera) (år|månad|månader|vecka|veckor|dag|dagar|timme|timmar)>>(?! sedan)', '“ago” needs both words: för två veckor sedan. “For two weeks” (how long) is i två veckor.'],
    ['<<sedan (ett|två|tre|fyra|fem|sex|sju|åtta|nio|tio|\\d+) (år|månader|veckor|dagar)>>', 'For “how long so far”, write har + supine + i: Jag har bott här i tre år.'],
    ['(?<!tycker |anser |tror |menar |säger |vet |tyckte |trodde )<<därför att>>', '“eftersom” is the safer word for “because”.'],
    ['<<(min|mitt|din|ditt|vår|vårt|er|ert|hans|hennes) ' + DEFNOUN + '>>', 'After min/din/vår/hans … the noun has no ending: min lägenhet, not min lägenheten.'],
    ['<<en (hus|problem|jobb|barn|år|svar|möte|kvitto|pris|språk|land|rum|kök|brev|arbete|sjukhus|företag|bibliotek|beslut|meddelande)>>', 'This is an ett-word: ett hus, ett problem, ett jobb, ett svar.'],
    ['<<ett (lägenhet|bil|kurs|fråga|vecka|dag|månad|lampa|soffa|bok|stad|skola|räkning|ansökan|tid|butik|familj|hobby|läkare|granne)>>', 'This is an en-word: en lägenhet, en kurs, en fråga.'],
    ['<<(kan|vill|måste|ska|skulle|borde|brukar|får) (inte |gärna |också )?(köper|kommer|skriver|ringer|betalar|hjälper|väntar|skickar|svarar|jobbar|börjar|träffar|flyttar|gör|går|tar|ser|säger|berättar|använder|behöver)>>', 'After kan, vill, måste, ska: the infinitive, not the present. Jag kan komma, not jag kan kommer.'],
    ['<<att (köper|kommer|skriver|ringer|betalar|hjälper|väntar|skickar|svarar|jobbar|börjar|träffar|flyttar|går|tar|ser|säger|berättar)>>', 'After “att” meaning “to”: the infinitive (att komma, att skriva). If you mean “that”, a subject is missing.']
  ].map(function (p) { return [rx(p[0]), p[1]]; });
  var NODIA = rx('<<(ar|pa|ocksa|manga|fran|maste|nagon|nagot|nagra|halsning|halsningar|tva|gor|kopa|kopte|darfor|aven|lagenhet|lagenheten|tyvarr|forsta|vanlig|sjalv|nasta|forra|varfor|behover|kanner|later|dalig|daligt|sasom|mojligt|sprak|ater|hjalp|hjalpa)>>');

  function sentences(text) {
    var out = [];
    text.split(/\n+/).forEach(function (line) {
      line = line.trim();
      if (!line) return;
      /* A sentence ends at . ! ? followed by a space and a capital letter or digit, so e-mail addresses,
         "kl. 9" and "t.ex." do not split it. */
      line.split(/(?<=[.!?])\s+(?=[A-ZÅÄÖ0-9"“])/).forEach(function (p) { p = p.trim(); if (p) out.push(p); });
    });
    return out;
  }

  YKI.analyse = function (task, text) {
    var type = task.type, info = YKI.typeInfo[type];
    var lines = text.split(/\n/).map(function (l) { return l.trim(); }).filter(Boolean);
    var low = text.toLowerCase();
    var words = YKI.words(text).length;
    var sents = sentences(text);
    var checks = [], notes = [];
    function add(level, title, detail) { checks.push({ level: level, title: title, detail: detail || '' }); }
    function note(quote, msg) { notes.push({ quote: quote, msg: msg }); }

    /* 1 length */
    if (words < info.min * 0.6) add('warn', 'Too short: ' + words + ' words', 'Aim for ' + info.min + '–' + info.max + '. A very short text does not give the rater enough language to judge.');
    else if (words < info.min) add('info', 'A little short: ' + words + ' words', 'Aim for ' + info.min + '–' + info.max + '. Add one more sentence to the thinnest bullet.');
    else if (words > info.max * 1.35) add('info', 'Long: ' + words + ' words', 'Fine if you had time to check it. In the exam, a shorter checked text beats a long unchecked one.');
    else add('ok', 'Good length: ' + words + ' words', 'Target ' + info.min + '–' + info.max + '.');

    /* 2 frame: opening and ending */
    var first = lines[0] || '', tail = lines.slice(-3).join(' ').toLowerCase(), lastLine = lines[lines.length - 1] || '';
    if (type === 'opinion') {
      var hasHeading = first && YKI.words(first).length <= 9 && !/[.]$/.test(first) && lines.length > 1;
      add(hasHeading ? 'ok' : 'warn', hasHeading ? 'Has a heading' : 'No heading found', hasHeading ? '' : 'Start with a short heading on its own line, for example “Vi behöver biblioteken”.');
      var hasConcl = /(sammanfattningsvis|till sist|avslutningsvis|slutligen|därför (tycker|anser|tror)|kort sagt)/.test(low);
      add(hasConcl ? 'ok' : 'warn', hasConcl ? 'Has a conclusion' : 'No clear conclusion', hasConcl ? '' : 'End with one sentence that repeats your view: “Sammanfattningsvis tycker jag att …”.');
      var signed = YKI.words(lastLine).length <= 5 && !/[.?]$/.test(lastLine) && lines.length > 2;
      add(signed ? 'ok' : 'info', signed ? 'Signed' : 'No signature', signed ? '' : 'Letters to the editor are signed: your first name and town, or a nickname.');
    } else {
      var greeted = /^(hej|hejsan|hallå|kära|bästa|till |god |tjena|rubrik)/i.test(first) || (task.model[0][0] === 'title' && lines.length > 1 && /^(hej|hallå)/i.test(lines[1] || ''));
      add(greeted ? 'ok' : 'warn', greeted ? 'Opens with a greeting' : 'No greeting found', greeted ? '' : (type === 'formal' ? 'Start with “Hej,” on its own line.' : 'Start with “Hej” and the name: “Hej Sara!”'));
      var formalEnd = /(med vänlig hälsning|med vänliga hälsningar|vänliga hälsningar|högaktningsfullt)/.test(tail);
      var friendlyEnd = /(hälsning|kram|ha det|vi ses|hör av dig|välkom|tack på förhand)/.test(tail);
      if (type === 'formal') {
        add(formalEnd ? 'ok' : 'warn', formalEnd ? 'Formal sign-off' : 'No formal sign-off', formalEnd ? '' : 'End with “Med vänlig hälsning” and your full name.');
        var fullName = YKI.words(lastLine.replace(/med vänlig(a)? hälsning(ar)?,?/i, '').replace(/tfn.*|tel.*|\d.*/i, '')).length >= 2;
        if (formalEnd && !fullName) add('info', 'Sign with first name and surname', 'A formal message is signed with your full name.');
      } else {
        add(friendlyEnd ? 'ok' : 'warn', friendlyEnd ? 'Has an ending' : 'No ending found', friendlyEnd ? '' : 'Close with a line such as “Hör av dig snart!” and “Hälsningar” or “Kram” plus your name.');
      }
    }

    /* 3 tone */
    if (type === 'formal') {
      var slang = low.match(rx('<<(kram|puss|tjena|hejsan|jätte[a-zåäö]+|kul|kolla|suger|skit[a-zåäö]*)>>'));
      if (slang) add('warn', 'Too informal for this reader: “' + slang[0] + '”', 'Keep a neutral tone: mycket instead of jätte-, Med vänlig hälsning instead of Kram.');
      var du = low.match(rx('<<(du|dig|din|ditt|dina)>>', 'gi'));
      var org = !/hej [a-zåäö]+[!,]/i.test(first);
      if (du && du.length >= 2 && org) add('info', 'You wrote du/din ' + du.length + ' times', 'When you write to a company, an office or a board, ni/er/ert is the safe choice.');
      if (!slang && !(du && du.length >= 2 && org)) add('ok', 'Tone fits a formal reader');
    } else if (type === 'informal') {
      if (/med vänlig hälsning/.test(low) && /(vän|kollega)/.test((task.kind || '').toLowerCase())) add('info', '“Med vänlig hälsning” is stiff for a friend', '“Hälsningar” or “Kram” is warmer.');
    }

    /* 4 task coverage */
    var bullets = task.bullets.map(function (b) {
      if (!b.kw || !b.kw.length) return { b: b, hits: null, covered: null };
      var hits = 0;
      b.kw.forEach(function (k) {
        if (k === '?') { hits += (text.match(/\?/g) || []).length; return; }
        if (low.indexOf(k) !== -1) hits++;
      });
      return { b: b, hits: hits, covered: hits >= (b.need || 1) };
    });
    var missed = bullets.filter(function (x) { return x.covered === false; }).length;
    if (missed) add('warn', missed + ' task point' + (missed > 1 ? 's' : '') + ' may be missing', 'See the task points below. Every point needs at least one clear sentence.');
    else add('ok', 'All task points seem to be covered', 'Confirm each one yourself below.');

    /* 5 linking */
    var found = [];
    var flat = text.replace(/\n+/g, '. ');
    CONNECTORS.forEach(function (c) { if (c[1].test(flat)) found.push(c[0]); });
    var strong = found.filter(function (c) { return ['men', 'så', 'om', 'som', 'också', 'när', 'att'].indexOf(c) === -1; });
    var needAll = type === 'informal' ? 2 : 3, needStrong = type === 'informal' ? 1 : 2;
    if (found.length < needAll) add('warn', 'Few linking words (' + (found.join(', ') || 'none') + ')', 'Loose sentences read as level 2. Add eftersom, därför, dessutom or men between ideas.');
    else if (strong.length < needStrong) add('info', 'Only basic linking words (' + found.join(', ') + ')', 'Add one of: eftersom, därför, dessutom, till exempel, för det första.');
    else add('ok', 'Good linking: ' + found.slice(0, 8).join(', '));

    /* 6 sentence openings */
    var body = sents.filter(function (s) { return YKI.words(s).length >= 4; });
    var startJag0 = rx('^jag>>');
    var jagStart = body.filter(function (s) { return startJag0.test(s); }).length;
    if (body.length >= 5 && jagStart / body.length > 0.6) add('info', jagStart + ' of ' + body.length + ' sentences start with “Jag”', 'Move a time or linking word to the front in two of them: “Igår ringde jag …”, “Därför vill jag …”. Remember: the verb stays second.');

    /* 7 word order and small things, sentence by sentence */
    var v2a = rx('^' + FRONT1 + ',? ' + SUBJ + ' ');
    var v2s = rx('^(sedan|sen) ' + SUBJ + ' ');
    var v2b = rx('^(på|i|efter|före|under|förra|nästa|för) (?!att>>)((?:' + W + ' ){0,3})(' + W + ') ' + SUBJ + ' (?!som>>)');
    var v2c = rx('^(om|när|eftersom|fastän|trots att) [^,]{4,60}, ' + SUBJ + ' ');
    var biff = rx('<<(att|eftersom|om|när|fastän|trots att|som) (jag|du|han|hon|hen|vi|ni|de|man|det|den|[a-zåäö]+en|[a-zåäö]+et|[a-zåäö]+na|[a-zåäö]+ar|[a-zåäö]+or) ([a-zåäö]+) (inte|aldrig|alltid)>>');
    var biffSom = rx('<<som ([a-zåäö]+(?:r|de|te)) (inte|aldrig|alltid)>>');
    var midJag = /[a-zåäö,] Jag(?![a-zåäö])/;
    var midCap = new RegExp('[a-zåäö,] ' + LOWER + '(?![a-zåäö])');
    var startOcksa = rx('^också>>');
    sents.forEach(function (s) {
      var m;
      if (startOcksa.test(s)) note(s, '“Också” does not work alone as a linking word at the start. Use “Dessutom …” (then the verb), or put också after the verb.');
      if (!/\?$/.test(s)) {
        if ((m = s.match(v2a))) note(s, 'Word order: “' + m[1] + '” is in first place, so the verb must come next, before “' + m[2] + '”. Compare: Igår köpte jag …');
        else if ((m = s.match(v2s)) && YKI.words(s).length <= 7) note(s, 'Word order: after “Sedan” (= then) the verb comes before “' + m[2] + '”: Sedan ringde jag …');
        else if ((m = s.match(v2b)) && !VERBISH.test(m[3])) note(s, 'Word order: a time or place is in first place, so the verb must come next, before “' + m[4] + '”. Compare: På lördag kan jag …');
        else if ((m = s.match(v2c))) note(s, 'Word order: the sentence starts with a clause, so the main verb comes straight after the comma: “Om du har tid, kan vi …”.');
      }
      if ((m = s.match(biff)) && !NOTVERB.test(m[3])) {
        note(s, 'Word order inside the clause: after “' + m[1] + '”, “' + m[4] + '” comes before the verb: … ' + m[1] + ' ' + m[2] + ' ' + m[4] + ' ' + m[3] + '.');
      } else if ((m = s.match(biffSom))) {
        note(s, 'After “som”, put “' + m[2] + '” before the verb: som ' + m[2] + ' ' + m[1] + '.');
      }
      if (midJag.test(s)) note(s, '“jag” has a small letter inside a sentence.');
      if ((m = s.match(midCap))) note(s, 'Small letter: languages, weekdays and months are not capitalised (' + m[1].toLowerCase() + ').');
      PATTERNS.forEach(function (p) { if (p[0].test(s)) note(s, p[1]); });
      if ((m = s.match(NODIA))) note(s, 'Check å, ä, ö in “' + m[0] + '”.');
      if (YKI.words(s).length > 32) note(s, 'A very long sentence. Two shorter ones are easier to get right.');
      if (/^[a-zåäö]/.test(s) && YKI.words(s).length >= 4 && !/^(tfn|tel|e-post|www)/.test(s)) note(s, 'Start the sentence with a capital letter.');
    });
    if (/[a-zåäö0-9]$/i.test(text.trim()) && type !== 'opinion' && YKI.words(lastLine).length > 6 && !/(hälsning|kram|välkom|\d{3})/i.test(lastLine)) add('info', 'The last sentence has no full stop');

    if (notes.length === 0) add('ok', 'No typical word-order or small-word slips found', 'The checker only knows the common patterns. Read once more yourself.');
    else add('warn', notes.length + ' place' + (notes.length > 1 ? 's' : '') + ' to look at', 'See “Look again” below.');

    return { words: words, sentences: sents.length, checks: checks, notes: notes, bullets: bullets, connectors: found };
  };

  /* Rubric for self-rating: adapted from the official criteria for assessing writing (levels 2, 3, 4). */
  YKI.rubric = [
    { id: 'task', focus: 'covering every task point', q: 'Did I do what the task asked?', opts: [[2, 'Some points are missing or only named.'], [3, 'Every point is answered, briefly.'], [4, 'Every point is answered with detail or an example.']] },
    { id: 'link', focus: 'linking your sentences', q: 'Is the text connected?', opts: [[2, 'Mostly separate sentences; och and men only.'], [3, 'Simple but connected; a few linking words.'], [4, 'Clear paragraphs; varied linking; easy to follow.']] },
    { id: 'words', focus: 'words for the topic', q: 'Do I have the words?', opts: [[2, 'I repeated a few basic words and got stuck.'], [3, 'Enough words for the topic; sometimes imprecise.'], [4, 'Fairly precise; little repetition.']] },
    { id: 'grammar', focus: 'word order and endings', q: 'How is the grammar?', opts: [[2, 'Basic word order often goes wrong.'], [3, 'Familiar patterns are right; slips do not confuse.'], [4, 'Mostly right, including clauses; only small slips.']] },
    { id: 'tone', focus: 'greeting, ending and tone', q: 'Does the tone fit the reader?', opts: [[2, 'Same tone for everyone; no greeting or ending.'], [3, 'Right greeting and ending; tone roughly fits.'], [4, 'Clearly formal or clearly friendly all the way.']] }
  ];
  YKI.estimate = function (ratings) {
    var vals = YKI.rubric.map(function (r) { return ratings[r.id]; }).filter(Boolean);
    if (vals.length < YKI.rubric.length) return null;
    var avg = vals.reduce(function (a, b) { return a + b; }, 0) / vals.length;
    var min = Math.min.apply(null, vals);
    var level = avg >= 3.6 && min >= 3 ? 4 : avg >= 2.6 && ratings.task >= 3 ? 3 : 2;
    return { level: level, avg: avg };
  };

  /* A ready-made request for detailed feedback from Claude (or a teacher). */
  YKI.feedbackPrompt = function (task, text) {
    return [
      'I am preparing for the Swedish YKI test (Allmän språkexamen, intermediate level, writing). My target is level 3 (B1), ideally 4.',
      'Please act as a YKI rater and Swedish teacher. Explain in English.',
      '',
      'TASK (' + YKI.typeInfo[task.type].label + '):',
      task.sv,
      task.bullets.map(function (b) { return '• ' + b.sv; }).join('\n'),
      '',
      'MY TEXT:',
      text.trim(),
      '',
      'Please give me:',
      '1. An estimated YKI writing level (1–6) with one sentence of justification, judged on: task completion, coherence and linking, vocabulary range, accuracy of structures, and register.',
      '2. Whether every bullet of the task is covered. Name any that is missing or too thin.',
      '3. My text corrected, changing as little as possible, with every change in **bold**.',
      '4. My three most important error patterns, each with the rule in one line and one more example.',
      '5. Three sentences from the corrected text that I should memorise.',
      'The official level 3 description: can write simple connected texts about everyday matters; gaps in grammar and vocabulary can sometimes cause comprehension problems. Level 4: can write both private and semi-formal texts and present ideas as a logical whole.'
    ].join('\n');
  };
})();

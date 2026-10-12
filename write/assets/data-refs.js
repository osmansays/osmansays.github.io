/* YKI Skriva — reference sheets (the Library). Short, printable, built for looking things up.
   Each sheet is { id, title, blurb, html() }. */
(function () {
  'use strict';
  var YKI = (window.YKI = window.YKI || {});
  var esc = YKI.esc;

  var R = [];

  /* ------------------------------------------------------------ skeletons */
  R.push({
    id: 'skeletons', title: 'The three skeletons', blurb: 'One frame for each task type. Learn these by heart first.',
    html: function () {
      return '' +
        '<p class="lead">Every answer in the writing test fits one of these three frames. Fill the slots with the task’s bullets, in order.</p>' +
        '<div class="cols3">' +
        '<section class="sheet"><h2>Informal message</h2><p class="meta">to a friend, colleague, neighbour · 60–90 words · about 12 minutes</p>' +
        '<ol class="skel sv">' +
        '<li><span class="role">Greeting</span>Hej Sara!</li>' +
        '<li><span class="role">Reaction or reason</span>Tack för ditt meddelande! / Jag hörde att … / Jag skriver för att berätta att …</li>' +
        '<li><span class="role">Each bullet</span><span class="en">one or two sentences per bullet, in the task’s order</span></li>' +
        '<li><span class="role">Suggestion or question</span>Vad sägs om att …? / Har du lust att …? / Passar det dig på lördag?</li>' +
        '<li><span class="role">Closing line</span>Hör av dig snart! / Jag ser fram emot att träffa dig.</li>' +
        '<li><span class="role">Sign-off</span>Kram / Hälsningar<br>Maria</li>' +
        '</ol></section>' +
        '<section class="sheet"><h2>Formal message, complaint</h2><p class="meta">to a company, office, board · 90–120 words · about 17 minutes</p>' +
        '<ol class="skel sv">' +
        '<li><span class="role">Greeting</span>Hej,</li>' +
        '<li><span class="role">Who and why</span>Jag heter … Jag skriver eftersom … / Jag skriver angående …</li>' +
        '<li><span class="role">What happened</span>Den 2 oktober beställde jag … / För två veckor sedan …</li>' +
        '<li><span class="role">Why it is a problem</span>För det första … För det andra … Dessutom …</li>' +
        '<li><span class="role">What I want</span>Jag vill att ni … inom två veckor. / Jag föreslår att …</li>' +
        '<li><span class="role">Or else (complaints)</span>Annars kommer jag att kontakta …</li>' +
        '<li><span class="role">Closing line</span>Jag ser fram emot ert svar. / Tack på förhand.</li>' +
        '<li><span class="role">Sign-off</span>Med vänlig hälsning<br>Maria Lind <span class="en">(+ phone, email)</span></li>' +
        '</ol></section>' +
        '<section class="sheet"><h2>Opinion piece</h2><p class="meta">to newspaper readers · 120–160 words · about 22 minutes</p>' +
        '<ol class="skel sv">' +
        '<li><span class="role">Heading</span>Vi behöver biblioteken</li>' +
        '<li><span class="role">Topic</span>Nuförtiden … / Någon skrev att …</li>' +
        '<li><span class="role">My opinion</span>Jag tycker att … / Enligt min åsikt … / Jag håller inte med.</li>' +
        '<li><span class="role">Reason 1</span>För det första … eftersom …</li>' +
        '<li><span class="role">Reason 2</span>För det andra … Till exempel …</li>' +
        '<li><span class="role">Reason 3</span>Dessutom …</li>' +
        '<li><span class="role">The other side</span>Det är sant att …, men … / Å andra sidan …</li>' +
        '<li><span class="role">Conclusion</span>Sammanfattningsvis tycker jag att …</li>' +
        '<li><span class="role">Signature</span>Maria, Åbo</li>' +
        '</ol></section>' +
        '</div>' +
        '<h2>Before you write: one minute</h2><ol class="tight"><li>Number the bullets on the task paper.</li><li>Write two or three Swedish key words next to each.</li><li>Decide who the reader is: du or ni?</li></ol>' +
        '<h2>After you write: three passes</h2><ol class="tight"><li><strong>Task.</strong> Every bullet answered? Greeting and ending there?</li><li><strong>Word order.</strong> Verb second in every sentence. inte before the verb after att, eftersom, som.</li><li><strong>Small things.</strong> jag, svenska, måndag with small letters · å ä ö · full stops · vill ha, klaga på, vänta på.</li></ol>';
    }
  });

  /* ------------------------------------------------------------ phrase bank */
  R.push({
    id: 'phrases', title: 'Phrase bank', blurb: 'Every sentence from Memorise, grouped by what it does.',
    html: function () {
      var h = '<p class="lead">These are the sentences you are learning by heart. “…” marks a slot for your own words.</p>';
      YKI.chunkGroups.forEach(function (g) {
        h += '<h2>' + esc(g.title) + '</h2><table class="plain phrases"><tbody>';
        YKI.chunks.forEach(function (c) {
          if (c.g !== g.id) return;
          h += '<tr><td class="sv">' + esc(c.sv) + '</td><td>' + esc(c.en) + (c.note ? '<br><span class="meta">' + esc(c.note) + '</span>' : '') + '</td></tr>';
        });
        h += '</tbody></table>';
      });
      h += '<h2>Linking words at a glance</h2><table class="plain"><thead><tr><th>Job</th><th>Between main clauses</th><th>In first place (verb next)</th><th>Opens a sub-clause (subject – inte – verb)</th></tr></thead><tbody class="sv">' +
        '<tr><td class="en">add</td><td>och</td><td>dessutom</td><td></td></tr>' +
        '<tr><td class="en">contrast</td><td>men</td><td>å andra sidan</td><td>fastän, trots att, även om</td></tr>' +
        '<tr><td class="en">reason</td><td>för</td><td></td><td>eftersom</td></tr>' +
        '<tr><td class="en">result</td><td>så</td><td>därför</td><td></td></tr>' +
        '<tr><td class="en">order</td><td></td><td>först, sedan, till sist; för det första, för det andra</td><td>när, innan, medan</td></tr>' +
        '<tr><td class="en">example</td><td></td><td>till exempel</td><td></td></tr>' +
        '<tr><td class="en">condition</td><td></td><td>annars</td><td>om</td></tr>' +
        '<tr><td class="en">that, who, which</td><td></td><td></td><td>att, som</td></tr>' +
        '</tbody></table>';
      return h;
    }
  });

  /* ------------------------------------------------------------ grammar = extract from the class notes */
  R.push({
    id: 'grammar', title: 'Grammar for writing', blurb: 'The writing-relevant parts of your class notes, on one sheet, plus the three things the exam needs that the notes have not reached.',
    html: function () {
      return '' +
        '<p class="lead">Your class notes (Grupp Rosenkära, 23 June – 21 July 2026) cover A1–A2 and have no separate chapter on the YKI writing test. This sheet pulls out everything in them that you need when you write, in the order you need it. Dates point back to the lesson in your notes.</p>' +

        '<h2>1 Word order <span class="meta">notes: 25, 26, 30 June</span></h2>' +
        '<p>The golden rule: the verb is in second position. First position (the fundament) is one element — a person, a place or a time — and can be several words. The subject sits next to the verb, left or right. <span class="sv">inte, ofta, alltid, kanske, gärna</span> come after verb and subject.</p>' +
        '<table class="grid v2 sv"><thead><tr><th>Fundament</th><th>Verb 1</th><th>Subject</th><th>Adverb</th><th>Verb 2</th><th>Object</th><th>Place, time</th></tr></thead><tbody>' +
        '<tr><td>Jag</td><td>vill</td><td></td><td>inte</td><td>äta</td><td>choklad</td><td>idag.</td></tr>' +
        '<tr><td>I Finland</td><td>dricker</td><td>vi</td><td></td><td></td><td>mycket kaffe</td><td>varje dag.</td></tr>' +
        '<tr><td>Nästa vecka</td><td>kommer</td><td>min mamma</td><td>inte</td><td></td><td></td><td>till Finland.</td></tr>' +
        '<tr><td>Imorgon</td><td>ska</td><td>vi</td><td>inte</td><td>laga</td><td>mat.</td><td></td></tr>' +
        '<tr><td>När</td><td>ska</td><td>Anna</td><td></td><td>komma</td><td></td><td>hem?</td></tr>' +
        '<tr><td></td><td>Ska</td><td>vi</td><td></td><td>gå</td><td></td><td>på restaurang ikväll?</td></tr>' +
        '</tbody></table>' +
        '<p>Yes/no questions start with the verb. Question words: <span class="sv">vad, var, när, varför, hur (hur mycket, hur många, hur gammal)</span>.</p>' +

        '<h2>2 Verbs <span class="meta">notes: 26 June, 3 and 7 July</span></h2>' +
        '<p>One form per tense for all persons. After a helper verb comes the infinitive: <span class="sv">kan, måste, vill, ska, brukar, hinner, orkar</span> + <span class="sv">komma</span>. To want a thing: <span class="sv">vill ha</span>. “To do” = <span class="sv">att göra</span>.</p>' +
        '<table class="grid sv"><thead><tr><th>Group</th><th>Present</th><th>Command</th><th>Infinitive</th><th>Past</th><th>har + … <span class="tag">new</span></th></tr></thead><tbody>' +
        '<tr><td>1 -ar</td><td>jobbar</td><td>jobba!</td><td>jobba</td><td>jobbade</td><td>jobbat</td></tr>' +
        '<tr><td>2 -er</td><td>ringer</td><td>ring!</td><td>ringa</td><td>ringde</td><td>ringt</td></tr>' +
        '<tr><td>2 -er (k, p, s, t)</td><td>köper</td><td>köp!</td><td>köpa</td><td>köpte</td><td>köpt</td></tr>' +
        '<tr><td>3 -r</td><td>bor</td><td>bo!</td><td>bo</td><td>bodde</td><td>bott</td></tr>' +
        '</tbody></table>' +
        '<table class="plain sv compact"><thead><tr><th>Irregular</th><th>Past</th><th>har + …</th><th class="en"></th></tr></thead><tbody>' +
        '<tr><td>är</td><td>var</td><td>varit</td><td class="en">be</td></tr><tr><td>har</td><td>hade</td><td>haft</td><td class="en">have</td></tr>' +
        '<tr><td>går</td><td>gick</td><td>gått</td><td class="en">go</td></tr><tr><td>gör</td><td>gjorde</td><td>gjort</td><td class="en">do</td></tr>' +
        '<tr><td>ser</td><td>såg</td><td>sett</td><td class="en">see</td></tr><tr><td>tar</td><td>tog</td><td>tagit</td><td class="en">take</td></tr>' +
        '<tr><td>får</td><td>fick</td><td>fått</td><td class="en">get</td></tr><tr><td>äter</td><td>åt</td><td>ätit</td><td class="en">eat</td></tr>' +
        '<tr><td>skriver</td><td>skrev</td><td>skrivit</td><td class="en">write</td></tr><tr><td>sover</td><td>sov</td><td>sovit</td><td class="en">sleep</td></tr>' +
        '<tr><td>kommer</td><td>kom</td><td>kommit</td><td class="en">come</td></tr><tr><td>säger</td><td>sa</td><td>sagt</td><td class="en">say</td></tr>' +
        '<tr><td>vet</td><td>visste</td><td>vetat</td><td class="en">know</td></tr><tr><td>blir</td><td>blev</td><td>blivit</td><td class="en">become</td></tr>' +
        '</tbody></table>' +

        '<h2>3 Time <span class="meta">notes: 2, 7, 9, 21 July</span></h2>' +
        '<table class="plain"><tbody>' +
        '<tr><td class="sv">igår · förra veckan · förra året · för en vecka sedan</td><td>past: yesterday · last week · last year · a week ago</td></tr>' +
        '<tr><td class="sv">idag · just nu · nuförtiden</td><td>present</td></tr>' +
        '<tr><td class="sv">imorgon · ikväll · nästa vecka · snart</td><td>future (with ska, or the present tense)</td></tr>' +
        '<tr><td class="sv">på morgonen · på eftermiddagen · på kvällen · på helgen · på fritiden</td><td>in the morning … at the weekend, in my free time</td></tr>' +
        '<tr><td class="sv">två gånger om dagen · om året / i timmen · i veckan · i månaden</td><td>how often</td></tr>' +
        '<tr><td class="sv">ibland · ofta · alltid · varje dag · då och då · hela tiden</td><td>sometimes · often · always · every day · now and then · all the time</td></tr>' +
        '</tbody></table>' +
        '<p>Careful: <span class="sv">på morgonen</span> = in the morning, <span class="sv">imorgon</span> = tomorrow; <span class="sv">på kvällen</span> = in the evening, <span class="sv">ikväll</span> = tonight.</p>' +

        '<h2>4 Linking <span class="meta">notes: 3, 7, 9, 10 July</span></h2>' +
        '<ul class="tight"><li><span class="sv">och, så, men, eller</span> join clauses.</li>' +
        '<li><span class="sv">dessutom</span> = moreover. Do not start a sentence with <span class="sv">också</span> as a linking word; use <span class="sv">dessutom</span>. <span class="sv">Jag köpte en cykel av hög kvalitet. Dessutom var den billig!</span></li>' +
        '<li><span class="sv">därför</span> = that is why, at the start of a clause. For “because”, use <span class="sv">eftersom</span>. <span class="sv">Jag är hungrig och därför beställer jag mat. Jag beställer mat eftersom jag är hungrig.</span></li>' +
        '<li><span class="sv">som</span> = who, which, that: <span class="sv">Jag har en vän som spelar fotboll.</span> Also “as”: <span class="sv">Jag jobbar som lärare.</span></li>' +
        '<li><span class="sv">att</span> = that: <span class="sv">Jag vet att han kommer.</span> · <span class="sv">det finns</span> = there is/are · <span class="sv">det handlar om</span> = it is about.</li></ul>' +

        '<h2>5 Nouns <span class="meta">notes: 30 June, 3 and 10 July</span></h2>' +
        '<p><span class="sv">en</span> (about 75 %) or <span class="sv">ett</span>. The definite form is an ending: <span class="sv">en bok → boken</span>, <span class="sv">ett jobb → jobbet</span>. No article with professions: <span class="sv">Jag jobbar som lärare.</span> Possession: <span class="sv">Annas mamma</span>.</p>' +
        '<table class="grid sv"><thead><tr><th>Group</th><th>Singular</th><th>Plural</th></tr></thead><tbody>' +
        '<tr><td>1 en-words in -a</td><td>en fråga, en skola</td><td>frågor, skolor</td></tr>' +
        '<tr><td>2 en-words, short or in -e, -ing</td><td>en bil, en pojke, en tidning</td><td>bilar, pojkar, tidningar</td></tr>' +
        '<tr><td>3 en-words, often loanwords with stress at the end</td><td>en biljett, en student, en chef</td><td>biljetter, studenter, chefer</td></tr>' +
        '<tr><td>4 ett-words in a vowel</td><td>ett möte, ett konto</td><td>möten, konton</td></tr>' +
        '<tr><td>5 ett-words in a consonant; en … -are</td><td>ett jobb, ett problem, en läkare</td><td>jobb, problem, läkare</td></tr>' +
        '</tbody></table>' +
        '<p><span class="sv">mycket</span> + uncountable (<span class="sv">mycket vatten</span>), <span class="sv">många</span> + countable (<span class="sv">många vänner</span>). <span class="sv">någon, något, några</span> = some/any; <span class="sv">ingen, inget, inga</span> = no.</p>' +

        '<h2>6 Adjectives <span class="meta">notes: 3 and 21 July</span></h2>' +
        '<p>Three forms: <span class="sv">rolig, roligt, roliga</span> (en, ett, plural). The plural form is also used after <span class="sv">den/det/de</span> and after <span class="sv">min/mitt/mina</span>. After <span class="sv">min/mitt/mina</span> the noun has no definite ending (<span class="sv">min nya bil</span>); after <span class="sv">den/det/de</span> it keeps it (<span class="sv">den nya bilen</span>).</p>' +
        '<table class="grid sv"><tbody><tr><td>en ny bil</td><td>ett nytt jobb</td><td>två nya bilar</td></tr><tr><td>den nya bilen</td><td>det nya jobbet</td><td>de nya bilarna</td></tr><tr><td>min nya bil</td><td>mitt nya jobb</td><td>mina nya bilar</td></tr></tbody></table>' +
        '<p>Irregular: <span class="sv">liten, litet, små</span>, with <span class="sv">lilla</span> after den/det and min/mitt (<span class="sv">den lilla bilen, min lilla bil</span>) · <span class="sv">gammal, gammalt, gamla</span>. This and that: <span class="sv">den här boken, det här huset; den där bilen</span>.</p>' +

        '<h2>7 Small words that go together <span class="meta">notes: 3, 9 July</span></h2>' +
        '<p class="sv chips"><span>lyssna på</span><span>titta på</span><span>vänta på</span><span>klaga på</span><span>trött på</span><span>arg på</span><span>besviken på</span><span>intresserad av</span><span>stolt över</span><span>kär i</span><span>berätta något för någon</span><span>få … i present</span><span>köpa … till någon</span></p>' +
        '<p><span class="sv">på</span> for institutions and streets (<span class="sv">på en bank, på Nokia</span>), <span class="sv">i</span> for “in” and periods, <span class="sv">till</span> for movement and “for someone”. <span class="sv">hemma</span> = at home, <span class="sv">hem</span> = to home, <span class="sv">hemifrån</span> = from home.</p>' +

        '<h2>8 Ready-made sentences already in your notes</h2>' +
        '<p class="sv eg">Vilka fantastiska nyheter! · Jag är stolt över dig. · Jag finns här för dig om du behöver något. · Det låter bra. · Oroa dig inte. · Jag kan inte träffas idag, för jag har läkartid. · Jag har ont i ryggen. · Jag är förkyld och har feber. · Jag jobbar som … på … · På fritiden brukar jag … · Kram · Hälsningar</p>' +

        '<h2>What the exam needs that your notes have not reached</h2>' +
        '<table class="plain"><tbody>' +
        '<tr><td><strong>The perfect tense</strong></td><td><span class="sv">Jag har bott här i tre år.</span> → <a href="@lessons/6">Lesson 6</a></td></tr>' +
        '<tr><td><strong>Word order inside clauses</strong></td><td><span class="sv">… eftersom jag inte kan komma.</span> → <a href="@lessons/3">Lesson 3</a></td></tr>' +
        '<tr><td><strong>Formal tone</strong></td><td><span class="sv">ni, er; Skulle ni kunna …; Med vänlig hälsning</span> → <a href="@lessons/4">Lesson 4</a>, <a href="@lessons/7">Lesson 7</a></td></tr>' +
        '<tr><td><strong>Text frames</strong></td><td>message, complaint, opinion piece → <a href="@ref/skeletons">The three skeletons</a></td></tr>' +
        '</tbody></table>';
    }
  });

  /* ------------------------------------------------------------ vocabulary */
  R.push({
    id: 'vocab', title: 'Words for the seven themes', blurb: 'All 183 words with forms and an example sentence, theme by theme.',
    html: function () {
      var h = '<p class="lead">The seven themes are the chapters of <em>Förbered dig för allmän språkexamen</em>. The book’s own writing exercises for each theme are on the page given in brackets.</p>';
      YKI.themes.forEach(function (t) {
        h += '<h2>' + t.n + ' ' + esc(t.sv) + ' <span class="meta">' + esc(t.en) + ' · book p. ' + t.bookPage + '</span></h2><table class="plain vocab"><tbody>';
        YKI.vocab.forEach(function (v) {
          if (v.t !== t.id) return;
          h += '<tr><td class="sv"><strong>' + esc(v.sv) + '</strong><br><span class="forms">' + esc(v.forms) + '</span></td><td>' + esc(v.en) + (v.note ? '<br><span class="meta">' + esc(v.note) + '</span>' : '') + '</td><td class="sv">' + esc(v.ex) + '</td></tr>';
        });
        h += '</tbody></table>';
      });
      return h;
    }
  });

  /* ------------------------------------------------------------ exam day */
  R.push({
    id: 'examday', title: 'Exam day', blurb: 'What to bring, the time plan, and what to do when you get stuck.',
    html: function () {
      var s = YKI.sources;
      return '' +
        '<h2>Bring</h2><ul class="tight"><li>A valid official photo ID: passport, identity card or residence permit card. A driving licence is not accepted. A photo of your ID is not enough.</li><li>Food and drink for the breaks. The intermediate test takes about five hours in total.</li><li>Nothing to write with: the test centre gives you a pencil and an eraser.</li></ul>' +
        '<p class="meta">Source: <a href="' + s.testday.url + '" target="_blank" rel="noopener">' + esc(s.testday.title) + '</a>. Check your own invitation letter for times and the address.</p>' +
        '<h2>The writing part, minute by minute</h2>' +
        '<table class="plain"><tbody><tr><td>0–1</td><td>Read all three tasks. Decide the order: easiest first.</td></tr><tr><td>1–13</td><td>Informal message. One minute to plan, then write.</td></tr><tr><td>13–30</td><td>Formal message. Plan, write.</td></tr><tr><td>30–51</td><td>Opinion piece. Choose A or B by vocabulary. Plan, write.</td></tr><tr><td>51–54</td><td>Three passes: task, word order, small things.</td></tr></tbody></table>' +
        '<p class="meta">The 54 minutes is the figure preparation courses give. The official pages do not state it, so go by what the invigilator says.</p>' +
        '<h2>On the paper</h2><ul class="tight"><li>Write clearly. If a rater cannot read a word, it does not count.</li><li>Write directly on the answer sheet. Cross out with one line.</li><li>Leave a line between paragraphs.</li><li>Make sure å, ä and ö have their rings and dots.</li></ul>' +
        '<h2>If you get stuck</h2><ul class="tight"><li>No idea what to say: you may invent everything. Pick the first thing that you can say in Swedish.</li><li>Missing a word: describe it (<span class="sv">en maskin som kokar vatten</span>), go general (<span class="sv">en sak, en apparat</span>), or change the story.</li><li>Running out of time: one sentence per remaining bullet, then the ending.</li><li>Blank mind: write the greeting, then one short sentence. Then the next one.</li></ul>' +
        '<h2>What you need for citizenship</h2><p>Level 3 or 4 in one of these pairs: speaking + writing, listening + writing, or reading + speaking. Two certificates can be combined.</p><p class="meta">Source: <a href="' + s.migri.url + '" target="_blank" rel="noopener">' + esc(s.migri.title) + '</a>.</p>';
    }
  });

  /* ------------------------------------------------------------ glossary */
  R.push({
    id: 'glossary', title: 'Glossary', blurb: 'The terms this course uses, each with one meaning.',
    html: function () {
      var g = [
        ['Fundament', 'The first element of a main clause: the subject, or a time, place, linking adverb (därför, dessutom) or whole clause that has been moved to the front.', 'First position, slot 1'],
        ['Verb second (V2)', 'The rule that the finite verb is the second element of a main clause. Your class notes call it the golden rule.', ''],
        ['Finite verb', 'The verb that carries the tense: kan in “kan komma”, har in “har bott”.', 'Verb 1'],
        ['Main clause', 'A clause that can stand alone as a sentence. Verb second applies.', 'huvudsats'],
        ['Sub-clause', 'A clause that starts with att, eftersom, om, när, som … and cannot stand alone. Order: subject – inte – verb.', 'bisats'],
        ['BIFF', 'Memory hook for the sub-clause: i Bisats kommer Inte Före det Finita verbet.', ''],
        ['Linking word', 'Any word that joins two ideas: och, men, därför, eftersom, dessutom.', 'connector'],
        ['Preteritum', 'The simple past: jobbade, köpte, var.', 'past tense'],
        ['Perfekt', 'har + supine: har jobbat, har bott. For what started earlier and still holds, or matters now.', 'perfect tense'],
        ['Supine', 'The verb form used after har: jobbat, köpt, bott, varit.', ''],
        ['Infinitive', 'The basic verb form, used after helper verbs and after att: komma, köpa, bo.', ''],
        ['Helper verb', 'kan, vill, ska, måste, brukar, skulle … followed by an infinitive.', 'hjälpverb'],
        ['Definite form', 'The noun with its “the” ending: boken, huset, böckerna.', 'bestämd form'],
        ['Register', 'How formal the language is. Friend: du, Kram. Office: ni, Med vänlig hälsning.', 'tone'],
        ['Skeleton', 'The fixed order of moves in one task type (message, formal message, opinion piece).', 'frame'],
        ['Bullet', 'One of the points a task tells you to include. Each one must be answered.', 'task point'],
        ['Insändare', 'A reader’s letter to a newspaper: the opinion task.', ''],
        ['Reklamation', 'A written complaint about a product, service or bill.', 'klagomål']
      ];
      var h = '<p class="lead">One word for one thing, used the same way in every lesson.</p><dl class="gloss">';
      g.forEach(function (x) {
        h += '<dt>' + esc(x[0]) + '</dt><dd>' + esc(x[1]) + (x[2] ? ' <span class="meta">Also called: ' + esc(x[2]) + '.</span>' : '') + '</dd>';
      });
      return h + '</dl>';
    }
  });

  YKI.refs = R;
  YKI.refById = function (id) { for (var i = 0; i < R.length; i++) if (R[i].id === id) return R[i]; return null; };
})();

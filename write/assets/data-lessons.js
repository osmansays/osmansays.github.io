/* YKI Skriva — the ten lessons. One per day, one skill each, a few minutes of reading and a handful of checks.
   A lesson body is a list of HTML strings and widget items (same shape as drill items, or {ref:'drill id'}).
   Links written as href="@route" are turned into in-app links when rendered. */
(function () {
  'use strict';
  var YKI = (window.YKI = window.YKI || {});

  YKI.sources = {
    samples: { title: 'Official sample tasks: Swedish, intermediate level, writing (University of Jyväskylä)', url: 'https://ykitesti.solki.jyu.fi/en/tutustu-testiin/svenska/mellanniva-skriftlig-framstallning/' },
    criteria: { title: 'Allmänna språkexamina: Kriterier för bedömning av skrift (University of Jyväskylä, PDF)', url: 'https://www.jyu.fi/fi/file-download/download/public/14102' },
    levels: { title: 'Beskrivning av färdighetsnivåerna (Finnish National Agency for Education, PDF)', url: 'https://www.oph.fi/sites/default/files/documents/beskrivning-av-fardighetsnivaerna.pdf' },
    migri: { title: 'Proving your language skills with the YKI test (Finnish Immigration Service)', url: 'https://migri.fi/en/national-certificate-of-language-proficiency-yki-' },
    testday: { title: 'Before the YKI test (Finnish National Agency for Education)', url: 'https://www.oph.fi/en/education-and-qualifications/yki-test' },
    yle: { title: 'Yle: Ruotsin kielen YKI-treenit, keskitaso (grammar and vocabulary exercises)', url: 'https://yle.fi/a/20-146812' }
  };
  function cite(key, label) {
    var s = YKI.sources[key];
    return '<a class="cite" href="' + s.url + '" target="_blank" rel="noopener">' + label + '</a>';
  }

  var L = [];

  /* ------------------------------------------------------------------ 1 */
  L.push({
    n: 1, slug: 'three-tasks-one-plan', title: 'Three tasks, one plan', minutes: 15, theme: 't1',
    win: 'You can read any YKI writing task, find what it demands, and lay out a complete message in four moves.',
    source: 'samples',
    body: [
      '<p class="lead">The writing test is predictable. You will not know the topics, but you already know the three shapes. Learn the shapes and the test becomes filling in slots.</p>' +
      '<h2>What is on the paper</h2>' +
      '<p>The intermediate test has three kinds of writing task. The official Swedish samples show exactly these (' + cite('samples', 'official samples') + '):</p>' +
      '<table class="plain"><thead><tr><th>Task</th><th>Reader</th><th>What the sample asks for</th></tr></thead><tbody>' +
      '<tr><td><span class="sv">Meddelande</span><br>informal message</td><td>a friend</td><td>tell a friend about an event: what, when, where, plus two points of your own</td></tr>' +
      '<tr><td><span class="sv">Reklamation</span><br>formal message</td><td>a company or office</td><td>complain about a bill: which bill, two reasons, what you want, contact details</td></tr>' +
      '<tr><td><span class="sv">Insändare</span><br>opinion piece</td><td>newspaper readers</td><td>choose one of two topics and support your opinion in at least three ways</td></tr>' +
      '</tbody></table>' +
      '<p>You write by hand, in pencil, which the test centre provides (' + cite('testday', 'OPH') + '). Preparation courses give the time as about 54–55 minutes for all three tasks; the official pages do not state a figure, so check your invitation letter. This course trains you on 54.</p>' +
      '<h2>What level 3 means</h2>' +
      '<p>The official description of level 3 in writing says, in translation: you can write simple, connected texts about ordinary everyday matters, and gaps in grammar and vocabulary can sometimes make the text harder to understand (' + cite('levels', 'OPH level descriptions') + '). Read that twice. Errors are expected at level 3. For citizenship you need level 3 in writing together with speaking or listening (' + cite('migri', 'Migri') + ').</p>' +
      '<p>The assessment criteria (' + cite('criteria', 'criteria for writing') + ') look at the whole text. In practice the rater asks five things:</p>' +
      '<ol class="tight"><li>Did you do <strong>everything</strong> the task asked?</li><li>Is the text <strong>connected</strong>, or a list of loose sentences?</li><li>Do you have <strong>enough words</strong> for the topic?</li><li>Is the grammar good enough that the reader is <strong>never confused</strong>?</li><li>Does the <strong>tone</strong> fit the reader?</li></ol>' +
      '<p>Number 1 is the cheapest point on the paper, and the one most often thrown away. A short text that covers every bullet beats a long text that misses one.</p>',

      { kind: 'mc', q: 'Which text is safest for level 3?', opts: ['Clear and complete, small errors', 'Perfect grammar, one bullet missing', 'Very long, many rare words'], why: 'Complete and clear wins. A missing bullet means the task is not done, however good the grammar is.' },

      '<h2>Reading the task</h2>' +
      '<p>The instructions are in Swedish. These words tell you what to do. They come up again and again:</p>' +
      '<table class="plain two"><tbody>' +
      '<tr><td class="sv">berätta</td><td>tell, say</td><td class="sv">beskriv</td><td>describe</td></tr>' +
      '<tr><td class="sv">förklara</td><td>explain</td><td class="sv">motivera</td><td>give reasons</td></tr>' +
      '<tr><td class="sv">föreslå</td><td>suggest</td><td class="sv">be om</td><td>ask for</td></tr>' +
      '<tr><td class="sv">fråga / ställ en fråga</td><td>ask a question</td><td class="sv">minst två</td><td>at least two</td></tr>' +
      '<tr><td class="sv">välj</td><td>choose</td><td class="sv">din åsikt</td><td>your opinion</td></tr>' +
      '<tr><td class="sv">klagomål, reklamation</td><td>complaint</td><td class="sv">insändare</td><td>letter to the editor</td></tr>' +
      '<tr><td class="sv" colspan="2">Inled och avsluta på lämpligt sätt.</td><td colspan="2">Begin and end appropriately.</td></tr>' +
      '</tbody></table>',

      { kind: 'mc', q: 'The task says: “ställ minst två frågor”. What must your text contain?', opts: ['Two or more questions', 'Exactly two long sentences', 'One question, two answers'], why: 'minst två = at least two. Write two real questions with question marks so the rater sees them at once.' },
      { kind: 'mc', q: '“Motivera din åsikt” means:', opts: ['give reasons for it', 'repeat it more loudly', 'write it very briefly'], why: 'motivera = give reasons. In the opinion task the official sample asks for at least three.' },

      '<h2>The four moves</h2>' +
      '<p>Every message you write in the test, to a friend or to an office, has the same four moves:</p>' +
      '<ol class="moves"><li><strong>Greet.</strong> <span class="sv">Hej Sara!</span></li><li><strong>Say why you are writing.</strong> <span class="sv">Jag hörde att du har köpt en lägenhet.</span></li><li><strong>Answer every bullet, in order.</strong> One or two sentences each. New paragraph when the subject changes.</li><li><strong>Close and sign.</strong> <span class="sv">Hör av dig snart! Kram, Maria</span></li></ol>' +
      '<p>Before you write, spend one minute: number the bullets on the task paper and write two or three Swedish key words next to each. Then write. Tick each bullet as you finish it.</p>' +
      '<p>For a friend the frame is:</p>' +
      '<div class="frame sv"><p>Hej <em>name</em>!</p><p><em>Reaction or reason:</em> Tack för ditt meddelande! / Jag hörde att … / Jag skriver för att berätta att …</p><p><em>The bullets, one after the other.</em></p><p><em>Ending:</em> Hör av dig snart! / Jag ser fram emot att träffa dig.</p><p>Kram / Hälsningar<br><em>your name</em></p></div>',

      { kind: 'order', lock: 'Jag skriver', tiles: ['för att', 'berätta', 'att', 'jag', 'har', 'flyttat'], en: 'I am writing to tell you that I have moved.', why: 'för att + infinitive (berätta) = in order to. After att comes a normal clause: jag har flyttat.' },
      { kind: 'type', q: 'Write in Swedish: Congratulations on the new job!', answers: ['Grattis till det nya jobbet!', 'Grattis till nya jobbet!', 'Grattis till ditt nya jobb!'], why: 'grattis till + the thing. det nya jobbet: definite noun, adjective with -a.', en: '' },
      { ref: 'd-register-07' },

      '<h2>Today</h2><p>Learn the “Writing to a friend” sentences in <a href="@cards">Memorise</a>, then write your first message in <a href="@write">Write</a>: congratulate Sara. The three skeletons are on one page in the <a href="@ref/skeletons">Library</a>.</p>'
    ]
  });

  /* ------------------------------------------------------------------ 2 */
  L.push({
    n: 2, slug: 'verb-in-second-place', title: 'The verb comes second', minutes: 15, theme: 't2',
    win: 'You can start a sentence with a time, a place or a linking word and still get the word order right.',
    source: 'yle',
    body: [
      '<p class="lead">One rule decides whether your text reads as Swedish: in a statement, the verb is the second element. Your class notes call it the golden rule. Today you make it automatic.</p>' +
      '<h2>The rule</h2>' +
      '<p>First place (the <em>fundament</em>) holds one element: the subject, or a time, a place, a linking adverb such as <span class="sv">därför</span>, or a whole clause. Second place is always the verb. If the subject is not first, it comes right after the verb.</p>' +
      '<table class="grid v2 sv"><thead><tr><th>1 Fundament</th><th>2 Verb</th><th>Subject</th><th>inte …</th><th>Rest</th></tr></thead><tbody>' +
      '<tr><td>Jag</td><td>köpte</td><td></td><td></td><td>en soffa igår.</td></tr>' +
      '<tr><td>Igår</td><td>köpte</td><td>jag</td><td></td><td>en soffa.</td></tr>' +
      '<tr><td>Tyvärr</td><td>kan</td><td>jag</td><td>inte</td><td>komma på lördag.</td></tr>' +
      '<tr><td>För två veckor sedan</td><td>beställde</td><td>jag</td><td></td><td>en lampa.</td></tr>' +
      '<tr><td>Om du har tid,</td><td>kan</td><td>vi</td><td></td><td>ses imorgon.</td></tr>' +
      '</tbody></table>' +
      '<p>English keeps the subject before the verb (“Yesterday <u>I bought</u>”). Swedish does not (<span class="sv">Igår <u>köpte jag</u></span>). This is the single most visible mistake in learners’ texts, and the easiest to remove.</p>',

      { ref: 'd-v2-01' },
      { ref: 'd-v2-02' },

      '<h2>Why it pays off in writing</h2>' +
      '<p>If every sentence starts with <span class="sv">Jag</span>, the text sounds like a list. Moving a time or a linking word to first place connects your sentences, and connection is what separates level 3 from level 2. These starters are worth their weight in gold; each one pushes the verb into second place:</p>' +
      '<p class="sv chips"><span>Igår</span><span>Imorgon</span><span>På lördag</span><span>Nästa vecka</span><span>Först</span><span>Sedan</span><span>Därför</span><span>Dessutom</span><span>Tyvärr</span><span>Till exempel</span></p>',

      { kind: 'type', q: 'Rewrite, starting with “På lördag”: Jag kan hämta soffan på lördag.', answers: ['På lördag kan jag hämta soffan.'], why: 'På lördag takes first place, kan stays second, jag follows it.', en: 'On Saturday I can pick up the sofa.' },
      { ref: 'd-v2-05' },

      '<h2>Where inte goes</h2>' +
      '<p>In a main clause, <span class="sv">inte</span> comes after the first verb, or after the subject if the subject has moved behind the verb:</p>' +
      '<p class="sv eg">Lampan fungerar <mark>inte</mark>. · Jag kan <mark>inte</mark> komma. · Tyvärr kan jag <mark>inte</mark> komma.</p>',

      { ref: 'd-v2-16' },
      { ref: 'd-fix-20' },

      '<h2>Writing to a stranger</h2>' +
      '<p>Today’s task is a message to someone selling a sofa. You do not know the person, so stay neutral: <span class="sv">Hej!</span> to open, <span class="sv">Hälsningar</span> and your name to close. Ask direct questions (<span class="sv">Hur gammal är soffan?</span>) and one indirect question (<span class="sv">Jag undrar om priset går att diskutera.</span>). The second kind shows range.</p>' +
      '<h2>Today</h2><p>Do <a href="@drills">Drills</a> until the tiles fall into place without thinking. Then write the sofa message in <a href="@write">Write</a>.</p>'
    ]
  });

  /* ------------------------------------------------------------------ 3 */
  L.push({
    n: 3, slug: 'glue', title: 'Glue: turning sentences into a text', minutes: 15, theme: 't3',
    win: 'You can join ideas with ten linking words and keep the word order right after each one.',
    source: 'criteria',
    body: [
      '<p class="lead">According to the assessment criteria, a level 2 writer joins simple sentences with the most basic linking words, while a level 3 writer produces a simple but connected text (' + cite('criteria', 'criteria for writing, paraphrased') + '). The difference is glue. There are only three kinds, and each has its own word order.</p>' +
      '<h2>Kind 1: plain joiners</h2>' +
      '<p><span class="sv">och, men, eller, så, för</span> sit between two main clauses and change nothing.</p>' +
      '<p class="sv eg">Det regnade, <mark>så</mark> vi stannade hemma. · Jag gillar att cykla, <mark>men</mark> jag har ingen cykel.</p>' +
      '<h2>Kind 2: linking adverbs</h2>' +
      '<p><span class="sv">därför, dessutom, sedan, annars, tyvärr, till exempel</span> take first place. So the verb comes next (yesterday’s rule).</p>' +
      '<p class="sv eg"><mark>Därför</mark> vill jag klaga. · <mark>Dessutom</mark> var paketet trasigt. · <mark>Annars</mark> kontaktar jag hyresvärden.</p>' +
      '<p>Do not start a sentence with <span class="sv">Också</span> as a linking word, the way English uses “Also, …”. To add a point, start with <span class="sv">Dessutom</span>.</p>',

      { ref: 'd-glue-03' },
      { ref: 'd-glue-02' },

      '<h2>Kind 3: clause starters</h2>' +
      '<p><span class="sv">att, eftersom, om, när, som, fastän, trots att</span> open a sub-clause. Inside it the order is fixed: subject, then <span class="sv">inte</span> (or <span class="sv">alltid, aldrig, ofta</span>), then the verb.</p>' +
      '<table class="grid sv"><thead><tr><th>Main clause</th><th>starter</th><th>subject</th><th>inte</th><th>verb</th><th>rest</th></tr></thead><tbody>' +
      '<tr><td>Jag tror</td><td>att</td><td>det</td><td>inte</td><td>fungerar.</td><td></td></tr>' +
      '<tr><td>Jag stannade hemma</td><td>eftersom</td><td>jag</td><td>inte</td><td>mådde</td><td>bra.</td></tr>' +
      '<tr><td>Jag har en granne</td><td>som</td><td></td><td>aldrig</td><td>hälsar.</td><td></td></tr>' +
      '</tbody></table>' +
      '<p>The memory hook is <strong>BIFF</strong>: <span class="sv">i <u>B</u>isats kommer <u>I</u>nte <u>F</u>öre det <u>F</u>inita verbet</span>. In a sub-clause, inte comes before the verb. Compare:</p>' +
      '<p class="sv eg">Hissen fungerar <mark>inte</mark>. → Problemet är att hissen <mark>inte</mark> fungerar.</p>',

      { ref: 'd-bisats-02' },
      { ref: 'd-bisats-03' },
      { ref: 'd-fix-21' },

      '<h2>Because and therefore</h2>' +
      '<p>Your class notes make this point: <span class="sv">därför</span> means “that is why” and starts a clause; for “because”, use <span class="sv">eftersom</span>.</p>' +
      '<p class="sv eg">Jag är hungrig och <mark>därför</mark> beställer jag mat. · Jag beställer mat <mark>eftersom</mark> jag är hungrig.</p>',

      { ref: 'd-glue-01' },

      '<h2>A clause in first place</h2><p>Start with the sub-clause and the whole clause counts as element one. The main verb comes directly after it. The comma there is optional; this course writes it because it helps you see where the verb must go.</p>' +
      '<p class="sv eg">Om du har frågor, <mark>kan</mark> du ringa mig. · När jag kom hem, <mark>märkte</mark> jag att dörren var öppen.</p>',

      { ref: 'd-v2-10' },

      '<h2>Today</h2><p>Aim for at least four different linking words in today’s text: an invitation to a yard clean-up. The connectors are collected in the <a href="@ref/phrases">phrase bank</a>.</p>'
    ]
  });

  /* ------------------------------------------------------------------ 4 */
  L.push({
    n: 4, slug: 'formal-message', title: 'The formal message and the complaint', minutes: 15, theme: 't4',
    win: 'You can write a clear, polite, firm message to a company or an office in six moves.',
    source: 'samples',
    body: [
      '<p class="lead">The official sample for this task is a written complaint about a bill: which bill, at least two reasons, what you want instead, your contact details (' + cite('samples', 'official samples') + '). Every formal task follows the same logic. The reader does not know you and wants facts.</p>' +
      '<h2>Six moves</h2>' +
      '<ol class="moves">' +
      '<li><strong>Greet neutrally.</strong> <span class="sv">Hej,</span></li>' +
      '<li><strong>Who you are and why you are writing.</strong> <span class="sv">Jag heter Omar Said. Jag skriver eftersom jag vill klaga på …</span></li>' +
      '<li><strong>What happened.</strong> Past tense, dates, numbers. <span class="sv">Den 2 oktober beställde jag …</span></li>' +
      '<li><strong>Why it is a problem.</strong> <span class="sv">För det första … För det andra … Dessutom …</span></li>' +
      '<li><strong>What you want, and by when.</strong> <span class="sv">Jag vill att ni … inom två veckor.</span></li>' +
      '<li><strong>Close and sign with your full name.</strong> <span class="sv">Jag ser fram emot ert svar. Med vänlig hälsning, Omar Said</span></li>' +
      '</ol>',

      { kind: 'order', lock: 'Hej,', tiles: ['Jag heter Omar Said.', 'Den 2 oktober beställde jag en lampa.', 'Lampan fungerar inte.', 'Jag vill ha pengarna tillbaka.', 'Med vänlig hälsning, Omar Said'], en: 'Put the moves of the complaint in order.', why: 'Who I am → what happened → what is wrong → what I want → sign-off.' },

      '<h2>The tone: firm, never rude</h2>' +
      '<p>The criteria say that a level 4 writer can tell formal from informal style, and that at level 3 this is still weak (' + cite('criteria', 'criteria for writing, paraphrased') + '). A few fixed choices put you on the safe side:</p>' +
      '<table class="plain"><thead><tr><th>To a friend</th><th>To a company or office</th></tr></thead><tbody class="sv">' +
      '<tr><td>Hej Sara!</td><td>Hej,</td></tr>' +
      '<tr><td>du, din, ditt</td><td>ni, er, ert</td></tr>' +
      '<tr><td>Kan du …?</td><td>Skulle ni kunna …? / Jag vill att ni …</td></tr>' +
      '<tr><td>jättedålig</td><td>mycket dålig, oacceptabel</td></tr>' +
      '<tr><td>Kram<br>Maria</td><td>Med vänlig hälsning<br>Maria Lind</td></tr>' +
      '</tbody></table>',

      { ref: 'd-register-03' },
      { ref: 'd-register-08' },

      '<h2>The four sentences that carry a complaint</h2>' +
      '<p class="sv eg">Jag är mycket <mark>missnöjd med</mark> …<br>Jag vill <mark>klaga på</mark> …<br>Jag <mark>kräver att ni</mark> … / Jag <mark>vill att ni</mark> …<br><mark>Annars kommer jag att</mark> kontakta …</p>' +
      '<p>Mind the small words: <span class="sv">missnöjd <u>med</u></span>, <span class="sv">klaga <u>på</u></span>, <span class="sv">vänta <u>på</u></span>.</p>',

      { ref: 'd-prep-03' },
      { ref: 'd-prep-04' },

      '<h2>Dates and details</h2><p>Facts make a complaint believable, and they are easy Swedish: <span class="sv">den 2 oktober</span>, <span class="sv">klockan 9</span>, <span class="sv">79 euro</span>, <span class="sv">i tre veckor</span>, <span class="sv">två gånger</span>. Months and weekdays take a small letter. You are free to invent every detail. Nobody checks whether the lamp existed.</p>',

      { ref: 'd-fix-16' },

      '<h2>Today</h2><p>Write the complaint to the health centre. Before you start, say the six moves aloud from memory. The frame is in the <a href="@ref/skeletons">skeletons sheet</a>.</p>'
    ]
  });

  /* ------------------------------------------------------------------ 5 */
  L.push({
    n: 5, slug: 'opinion-piece', title: 'The opinion piece', minutes: 15, theme: 't5',
    win: 'You can build an opinion text of 120–160 words from a fixed frame and never run out of reasons.',
    source: 'samples',
    body: [
      '<p class="lead">You get two topics and choose one. The official sample says: state what you are writing about, give your opinion, and support it in at least three different ways (' + cite('samples', 'official samples') + '). The frame below does exactly that.</p>' +
      '<h2>Choose with your vocabulary, not your heart</h2>' +
      '<p>Raters assess language, not opinions. Pick the topic you have words for. Agree, disagree or sit in the middle — whichever is easiest to write. You may invent your experience.</p>' +
      '<h2>The frame</h2>' +
      '<ol class="moves">' +
      '<li><strong>Heading.</strong> Three or four words. <span class="sv">Vi behöver biblioteken</span></li>' +
      '<li><strong>Topic and opinion.</strong> <span class="sv">Nuförtiden … Jag tycker att … / Enligt min åsikt …</span></li>' +
      '<li><strong>Three reasons.</strong> <span class="sv">För det första … För det andra … Dessutom …</span> Add <span class="sv">eftersom</span> or <span class="sv">till exempel</span> to each.</li>' +
      '<li><strong>The other side, then “but”.</strong> <span class="sv">Det är sant att …, men … / Å andra sidan …</span></li>' +
      '<li><strong>Conclusion.</strong> <span class="sv">Sammanfattningsvis tycker jag att …</span></li>' +
      '<li><strong>Sign.</strong> Name and town, or a nickname: <span class="sv">Maria, Åbo</span></li>' +
      '</ol>',

      { kind: 'order', lock: 'Vi behöver biblioteken', tiles: ['Jag tycker att biblioteken är viktiga.', 'För det första är de gratis.', 'Det är sant att många läser e-böcker.', 'Sammanfattningsvis behöver vi biblioteken.', 'David, Tammerfors'], en: 'Put the opinion piece in order.', why: 'Heading → opinion → reasons → the other side → conclusion → signature.' },

      '<h2>Seven keys that always give you a reason</h2>' +
      '<p>Stuck for arguments? Turn these keys one by one. Three of them will fit any topic.</p>' +
      '<table class="plain"><tbody>' +
      '<tr><td>money</td><td class="sv">Det är billigare / dyrare. Alla har inte råd.</td></tr>' +
      '<tr><td>time</td><td class="sv">Man sparar tid. Det tar för lång tid.</td></tr>' +
      '<tr><td>health</td><td class="sv">Det är bra / dåligt för hälsan.</td></tr>' +
      '<tr><td>children</td><td class="sv">Det är särskilt viktigt för barn och unga.</td></tr>' +
      '<tr><td>environment</td><td class="sv">Det är bättre för miljön.</td></tr>' +
      '<tr><td>my own life</td><td class="sv">Jag har själv märkt att …</td></tr>' +
      '<tr><td>my home country</td><td class="sv">I mitt hemland är det annorlunda.</td></tr>' +
      '</tbody></table>',

      { ref: 'd-bisats-12' },
      { kind: 'mc', q: '___ tycker jag att vi måste göra något. (to sum up)', opts: ['Sammanfattningsvis', 'Förhoppningsvis', 'Uppenbarligen'], why: 'Sammanfattningsvis = to sum up. It takes first place, so the verb tycker comes next.' },
      { kind: 'type', q: 'Write in Swedish: In my opinion this is an important issue.', answers: ['Enligt min åsikt är det här en viktig fråga.', 'Enligt min åsikt är detta en viktig fråga.', 'Enligt min mening är det här en viktig fråga.', 'Enligt min mening är detta en viktig fråga.'], why: 'Enligt min åsikt is element one, so är comes before det här.', en: '' },
      { ref: 'd-glue-13' },

      '<h2>Giving the other side</h2><p>One sentence that admits the other view, followed by <span class="sv">men</span>, shows the rater that you can weigh things up. It is a level 4 habit and costs you two lines:</p>' +
      '<p class="sv eg"><mark>Det är sant att</mark> telefoner är praktiska, <mark>men</mark> små barn behöver dem inte.</p>',

      { kind: 'type', q: 'Write in Swedish: There are both advantages and disadvantages.', answers: ['Det finns både fördelar och nackdelar.'], why: 'det finns = there is / there are. både … och = both … and.', en: '' },

      '<h2>Today</h2><p>Write about libraries or children’s hobbies in <a href="@write">Write</a>. Give yourself 22 minutes. Then study the model with “Memorise this model”.</p>'
    ]
  });

  /* ------------------------------------------------------------------ 6 */
  L.push({
    n: 6, slug: 'telling-when', title: 'Telling when: past, perfect, future', minutes: 15, theme: 't6',
    win: 'You can say what happened, what has been true for a while, and what will happen, each with the right verb form.',
    source: 'yle',
    body: [
      '<p class="lead">Complaints tell a story (past). Applications describe experience (perfect). Invitations and plans look ahead (future). One text often needs all three, and each has a time word that goes with it.</p>' +
      '<h2>Finished past: preteritum</h2>' +
      '<p>You know this from class: command form + <span class="sv">-de</span> or <span class="sv">-te</span> (<span class="sv">jobba → jobbade, ring → ringde, köp → köpte, bo → bodde</span>), plus the irregular ones. Use it with a finished time: <span class="sv">igår, förra veckan, i måndags, för två år sedan, den 2 oktober</span>.</p>' +
      '<p class="sv eg">Igår <mark>ringde</mark> jag kundtjänsten. · För två veckor sedan <mark>beställde</mark> jag en lampa.</p>',

      { ref: 'd-tense-04' },
      { ref: 'd-tense-05' },

      '<h2>Up to now: perfekt (new)</h2>' +
      '<p>Your class notes stop at the past tense. The exam needs one more form: <span class="sv">har</span> + supine. Use it when something started earlier and is still true, or when the result matters now. It goes with <span class="sv">i tre år, redan, aldrig, sedan dess, två gånger</span>.</p>' +
      '<table class="grid sv"><thead><tr><th>Group</th><th>Present</th><th>Past</th><th>har + supine</th></tr></thead><tbody>' +
      '<tr><td>1 -ar</td><td>jobbar</td><td>jobbade</td><td>har jobb<mark>at</mark></td></tr>' +
      '<tr><td>2 -er</td><td>ringer · köper</td><td>ringde · köpte</td><td>har ring<mark>t</mark> · har köp<mark>t</mark></td></tr>' +
      '<tr><td>3 -r</td><td>bor</td><td>bodde</td><td>har bo<mark>tt</mark></td></tr>' +
      '<tr><td>4</td><td>är · har · får</td><td>var · hade · fick</td><td>har varit · har haft · har fått</td></tr>' +
      '<tr><td>4</td><td>ser · skriver · går</td><td>såg · skrev · gick</td><td>har sett · har skrivit · har gått</td></tr>' +
      '<tr><td>4</td><td>gör · säger · kommer</td><td>gjorde · sa · kom</td><td>har gjort · har sagt · har kommit</td></tr>' +
      '</tbody></table>' +
      '<p class="sv eg">Jag <mark>har bott</mark> i Finland i tre år. · Jag <mark>har</mark> redan <mark>kontaktat</mark> er två gånger. · Hissen <mark>har varit</mark> trasig i tre veckor.</p>',

      { ref: 'd-tense-03' },
      { ref: 'd-tense-07' },
      { ref: 'd-tense-15' },

      '<h2>Ahead: three ways</h2>' +
      '<p><span class="sv">ska</span> + infinitive for a plan · <span class="sv">kommer att</span> + infinitive for what will happen · present tense + a time word.</p>' +
      '<p class="sv eg">Nästa vecka <mark>ska</mark> jag börja på ett nytt jobb. · Annars <mark>kommer</mark> jag <mark>att</mark> kontakta hyresvärden. · Kursen <mark>börjar</mark> om två veckor.</p>',

      { ref: 'd-tense-16' },

      '<h2>Three small words for time</h2>' +
      '<table class="plain"><tbody>' +
      '<tr><td class="sv">i tre år</td><td>for three years (how long)</td></tr>' +
      '<tr><td class="sv">för tre år sedan</td><td>three years ago</td></tr>' +
      '<tr><td class="sv">om tre veckor</td><td>in three weeks (from now)</td></tr>' +
      '<tr><td class="sv">på måndag · i måndags</td><td>on Monday (coming) · last Monday</td></tr>' +
      '</tbody></table>',

      { ref: 'd-prep-12' },
      { ref: 'd-prep-13' },

      '<h2>Today</h2><p>Two short texts: ask a colleague to swap shifts, then apply for the café job. Check each verb against its time word before you finish.</p>'
    ]
  });

  /* ------------------------------------------------------------------ 7 */
  L.push({
    n: 7, slug: 'small-endings-polite-requests', title: 'Small endings, polite requests', minutes: 15, theme: 't7',
    win: 'You can get noun and adjective endings right in the phrases you use most, and ask an office for something politely.',
    source: 'criteria',
    body: [
      '<p class="lead">Level 3 allows mistakes in endings, as long as the message is clear (' + cite('criteria', 'criteria for writing') + '). So do not try to fix everything. Fix the patterns you write in every text.</p>' +
      '<h2>Pattern 1: a new thing, then the thing</h2>' +
      '<p>First mention: <span class="sv">en/ett</span>. After that: the ending on the noun.</p>' +
      '<p class="sv eg">Jag beställde <mark>en lampa</mark>. <mark>Lampan</mark> fungerar inte. · Vi bor i <mark>ett hus</mark>. <mark>Huset</mark> är gammalt.</p>',

      { ref: 'd-noun-10' },

      '<h2>Pattern 2: the adjective agrees with the noun</h2>' +
      '<table class="grid sv"><thead><tr><th></th><th>en-word</th><th>ett-word</th><th>plural</th></tr></thead><tbody>' +
      '<tr><td>a …</td><td>en ny lampa</td><td>ett nytt hus</td><td>nya lampor</td></tr>' +
      '<tr><td>the …</td><td>den nya lampan</td><td>det nya huset</td><td>de nya lamporna</td></tr>' +
      '<tr><td>my …</td><td>min nya lampa</td><td>mitt nya hus</td><td>mina nya lampor</td></tr>' +
      '<tr><td>… is …</td><td>Lampan är ny.</td><td>Huset är nytt.</td><td>Lamporna är nya.</td></tr>' +
      '</tbody></table>' +
      '<p>Two things to hold on to: after <span class="sv">den/det/de</span> and after <span class="sv">min/mitt/mina</span> the adjective ends in <span class="sv">-a</span>; and after <span class="sv">min/mitt/mina</span> the noun has no ending (<span class="sv">min lägenhet</span>, never <span class="sv">min lägenheten</span>). One common word goes its own way: <span class="sv">liten</span> becomes <span class="sv">den lilla lampan, min lilla lampa</span>, and <span class="sv">små</span> in the plural.</p>',

      { ref: 'd-noun-06' },
      { ref: 'd-noun-07' },
      { ref: 'd-fix-08' },

      '<h2>Pattern 3: much and many</h2><p><span class="sv">mycket</span> for what you cannot count (<span class="sv">mycket tid, mycket plast</span>), <span class="sv">många</span> for what you can (<span class="sv">många problem, många vänner</span>).</p>',

      { ref: 'd-noun-08' },

      '<h2>Asking an office for something</h2>' +
      '<p>Today’s reader is the city. Requests to authorities use the “would” forms. Learn these four as whole pieces:</p>' +
      '<p class="sv eg"><mark>Jag skulle vilja</mark> veta varför …<br><mark>Skulle ni kunna</mark> skicka blanketten?<br><mark>Jag vore tacksam om ni kunde</mark> svara snart.<br><mark>Jag föreslår att</mark> bussen går en gång i timmen.</p>' +
      '<p>And one frame for purpose: <span class="sv">för att</span> + infinitive. <span class="sv">Jag behöver kursen <mark>för att kunna</mark> få ett jobb.</span></p>',

      { ref: 'd-tense-17' },
      { ref: 'd-bisats-09' },
      { kind: 'type', q: 'Write in Swedish: I would like to book an appointment.', answers: ['Jag skulle vilja boka en tid.', 'Jag skulle vilja boka tid.', 'Jag skulle vilja beställa en tid.', 'Jag skulle vilja beställa tid.'], why: 'skulle vilja + infinitive: the polite “would like to”.', en: '' },

      '<h2>Today</h2><p>Write to the city about the bus line. Use two of the four request frames. The endings table is in the <a href="@ref/grammar">grammar sheet</a>.</p>'
    ]
  });

  /* ------------------------------------------------------------------ 8 */
  L.push({
    n: 8, slug: 'edit-like-a-rater', title: 'Edit like a rater', minutes: 15, theme: 't2',
    win: 'You can check a finished text in three minutes and remove the mistakes that cost the most.',
    source: 'criteria',
    body: [
      '<p class="lead">You will not write a perfect text in the exam. You can hand in a checked one. Three quick passes catch most of what a rater notices.</p>' +
      '<h2>Pass 1: the task (30 seconds)</h2>' +
      '<p>Finger on each bullet of the task. Is it answered? Is there a greeting and an ending? If a bullet is missing, add one sentence now. This pass is worth more than the other two together.</p>' +
      '<h2>Pass 2: word order (90 seconds)</h2>' +
      '<p>Look only at the start of each sentence. If it does not start with the subject, the verb must be next. Then find every <span class="sv">att</span>, <span class="sv">eftersom</span> and <span class="sv">som</span>: if <span class="sv">inte</span> follows, it stands before the verb.</p>',

      { ref: 'd-fix-02' },
      { ref: 'd-fix-03' },
      { ref: 'd-fix-17' },

      '<h2>Pass 3: small things (60 seconds)</h2>' +
      '<ul class="tight"><li><span class="sv">jag</span> with a small letter inside a sentence. Also <span class="sv">svenska, finska, måndag, oktober</span>.</li><li>The dots and rings: <span class="sv">å ä ö</span>. <span class="sv">For</span> and <span class="sv">för</span>, <span class="sv">har</span> and <span class="sv">här</span> are different words.</li><li>A full stop at the end of every sentence, a question mark after every question.</li><li>Your pairs: <span class="sv">vill ha</span> + thing, <span class="sv">klaga på</span>, <span class="sv">vänta på</span>, <span class="sv">intresserad av</span>.</li></ul>',

      { ref: 'd-fix-09' },
      { ref: 'd-fix-01' },
      { ref: 'd-fix-07' },

      '<h2>When you do not know a word</h2>' +
      '<p>You have no dictionary. You do have three exits, and using them well is a skill raters respect:</p>' +
      '<ol class="tight"><li><strong>Describe it.</strong> No word for “kettle”? <span class="sv">en maskin som kokar vatten</span>.</li><li><strong>Go general.</strong> <span class="sv">en sak, en apparat, ett problem, en person som jobbar där</span>.</li><li><strong>Change the story.</strong> You invent the content. If you cannot spell “dishwasher”, the broken thing is a lamp.</li></ol>',

      { kind: 'mc', q: 'You cannot remember the word for “receipt”. What is the best move?', opts: ['Write “pappret från butiken”', 'Write the English word', 'Leave a blank space'], why: 'Describe it with words you know. An English word or a gap shows a hole; a description shows skill.' },

      '<h2>Three upgrades towards level 4</h2>' +
      '<p>Level 4 texts show how ideas connect in several different ways and avoid needless repetition (' + cite('criteria', 'criteria for writing, paraphrased') + '). Once your text is complete and correct, add one of each:</p>' +
      '<p class="sv eg"><mark>Trots att</mark> ni lovade leverans inom tre dagar, kom paketet två veckor för sent.<br><mark>Å andra sidan</mark> förstår jag att staden måste spara pengar.<br>Det finns en restaurang <mark>som</mark> jag gärna vill prova.</p>',

      { ref: 'd-glue-04' },

      '<h2>Today</h2><p>Open one of your earlier texts in <a href="@write">Write</a> and run the three passes on it. Then write the opinion piece on phones or Sunday shopping, and check it the same way.</p>'
    ]
  });

  /* ------------------------------------------------------------------ 9 */
  L.push({
    n: 9, slug: 'fifty-four-minutes', title: 'Fifty-four minutes', minutes: 10, theme: 't5',
    win: 'You have a time plan for the whole writing test and you have run it once.',
    source: 'samples',
    body: [
      '<p class="lead">Today is the first full mock exam. Knowing the frames is half of it. The other half is the clock.</p>' +
      '<h2>The time plan</h2>' +
      '<table class="plain"><thead><tr><th>Minutes</th><th>What</th><th>Length to aim for</th></tr></thead><tbody>' +
      '<tr><td>12</td><td>Informal message</td><td>60–90 words</td></tr>' +
      '<tr><td>17</td><td>Formal message</td><td>90–120 words</td></tr>' +
      '<tr><td>22</td><td>Opinion piece</td><td>120–160 words</td></tr>' +
      '<tr><td>3</td><td>Three passes over everything</td><td></td></tr>' +
      '</tbody></table>' +
      '<p>The word counts are working targets from this course, not official rules. Teachers who prepare candidates give simpler advice: do not write too little, because very short answers are hard to assess. Each task includes one minute of planning: number the bullets, write key words, go.</p>' +
      '<h2>Four rules for the room</h2>' +
      '<ol class="tight"><li><strong>Answer all three tasks.</strong> A simple text scores. An empty box does not.</li><li><strong>Start with the one that feels easiest.</strong> It settles your nerves and banks a text.</li><li><strong>Write straight onto the answer sheet.</strong> There is no time to copy a draft. Cross out neatly with one line.</li><li><strong>Move on when the time is up.</strong> A finished third task is worth more than a polished first one.</li></ol>',

      { kind: 'mc', q: 'Twenty minutes left, and task 3 is not started. Task 2 lacks its last bullet. What now?', opts: ['One sentence, then task 3', 'Perfect task 2 completely first', 'Rewrite task 1 more neatly'], why: 'Cover the missing bullet with one sentence, then give the rest to task 3. Every task must have a text.' },
      { kind: 'mc', q: 'What do you do in the first minute of each task?', opts: ['Number bullets, note key words', 'Write the greeting very slowly', 'Count all the lines available'], why: 'A one-minute plan stops you forgetting a bullet, which is the most expensive mistake.' },

      '<h2>Write by hand</h2><p>The exam is on paper. Typing hides two things: how fast you really write, and your spelling without a keyboard. For this mock, write on paper with a pencil, with the timer in <a href="@write">Write</a> running. Afterwards type your text in to get the checks.</p>' +
      '<h2>Three skeletons from memory</h2><p>Before you start, test yourself:</p>',

      { kind: 'order', lock: 'Formal message:', tiles: ['Hej,', 'who I am + why I write', 'what happened', 'why it is a problem', 'what I want, by when', 'Med vänlig hälsning + full name'], en: 'Rebuild the formal skeleton.', why: 'Greet → who and why → what happened → why it matters → what you want → sign off.' },
      { kind: 'order', lock: 'Opinion piece:', tiles: ['heading', 'topic + my opinion', 'three reasons', 'the other side + men', 'Sammanfattningsvis …', 'name, town'], en: 'Rebuild the opinion skeleton.', why: 'Heading → opinion → reasons → other side → conclusion → signature.' },

      '<h2>Today</h2><p>Run <a href="@write/mock/mock1">Mock exam 1</a>. Afterwards, look at which of the five rater questions was weakest and spend twenty minutes there.</p>'
    ]
  });

  /* ------------------------------------------------------------------ 10 */
  L.push({
    n: 10, slug: 'exam-day', title: 'Exam day', minutes: 10, theme: 't7',
    win: 'You know what happens on the day, what to bring, and you have twelve sentences ready to walk in with.',
    source: 'testday',
    body: [
      '<p class="lead">Nothing new today. You repeat what you know, run the second mock, and get ready for the day itself.</p>' +
      '<h2>What the day looks like</h2>' +
      '<ul class="tight"><li>Bring a valid official photo ID: passport, identity card or residence permit card. A driving licence is not accepted (' + cite('testday', 'OPH') + ').</li><li>You get a pencil and an eraser at the test centre. Phones, dictionaries and notes are not allowed.</li><li>The whole intermediate test takes about five hours with breaks. Bring something to eat.</li><li>Raters do not know who you are. They assess only what is on the paper.</li><li>The certificate arrives about two months later.</li></ul>' +
      '<h2>If your mind goes blank</h2>' +
      '<p>Write the greeting. Write one short sentence for the first bullet. Short, correct sentences joined with <span class="sv">och, men, eftersom, därför</span> are a level 3 text. You do not need the clever sentence; you need the next one.</p>' +
      '<h2>Twelve sentences to walk in with</h2><p>Type each one from memory. If one will not come, it goes back into <a href="@cards">Memorise</a> today.</p>',

      { kind: 'type', q: 'I am writing because I want to complain about the service.', answers: ['Jag skriver eftersom jag vill klaga på servicen.', 'Jag skriver till er eftersom jag vill klaga på servicen.'], why: 'klaga på. After eftersom: subject + verb.', en: '' },
      { kind: 'type', q: 'Unfortunately I cannot come.', answers: ['Tyvärr kan jag inte komma.', 'Jag kan tyvärr inte komma.'], why: 'With Tyvärr first, the verb comes second: Tyvärr kan jag … Also right: Jag kan tyvärr inte komma.', en: '' },
      { kind: 'type', q: 'I hope that you can solve this as soon as possible.', answers: ['Jag hoppas att ni kan lösa det här så snart som möjligt.', 'Jag hoppas att ni kan lösa detta så snart som möjligt.'], why: 'hoppas att + clause. så snart som möjligt.', en: '' },
      { kind: 'type', q: 'To sum up, I think that we must do something.', answers: ['Sammanfattningsvis tycker jag att vi måste göra något.', 'Sammanfattningsvis tycker jag att vi måste göra någonting.'], why: 'Sammanfattningsvis first, verb second.', en: '' },
      { kind: 'type', q: 'I look forward to your reply. (formal)', answers: ['Jag ser fram emot ert svar.'], why: 'se fram emot. ert svar: ett svar, to ni.', en: '' },
      { kind: 'type', q: 'Get in touch soon!', answers: ['Hör av dig snart!'], why: 'höra av sig = get in touch.', en: '' },
      { kind: 'type', q: 'Thanks in advance!', answers: ['Tack på förhand!'], why: 'A polite ending for any request.', en: '' },
      { kind: 'type', q: 'I am very dissatisfied with the product.', answers: ['Jag är mycket missnöjd med produkten.'], why: 'missnöjd med.', en: '' },
      { kind: 'type', q: 'Two weeks ago I bought a lamp from you. (to a shop)', answers: ['För två veckor sedan köpte jag en lampa hos er.', 'För två veckor sedan köpte jag en lampa av er.', 'För två veckor sedan köpte jag en lampa från er.'], why: 'för … sedan = ago. The time phrase is first, so köpte comes before jag.', en: '' },
      { kind: 'type', q: 'I think that it does not work.', answers: ['Jag tror att det inte fungerar.', 'Jag tycker att det inte fungerar.'], why: 'In the att-clause, inte comes before the verb.', en: '' },
      { kind: 'type', q: 'Firstly, it is too expensive.', answers: ['För det första är det för dyrt.'], why: 'För det första is element one; är comes next.', en: '' },
      { kind: 'type', q: 'Kind regards (formal ending)', answers: ['Med vänlig hälsning', 'Med vänliga hälsningar'], why: 'The standard ending of a formal message, followed by your full name.', en: '' },

      '<h2>After the exam</h2><p>Come back and tell your teacher how it went, whatever happened. If you need another attempt, your progress here shows exactly where to pick up.</p>' +
      '<h2>Today</h2><p>Run <a href="@write/mock/mock2">Mock exam 2</a> on paper. Read the <a href="@ref/examday">exam-day sheet</a> once. Then stop and rest: a rested head writes better Swedish than a crammed one.</p>'
    ]
  });

  YKI.lessons = L;
  YKI.lessonFile = function (l) { return 'lessons/' + ('000' + l.n).slice(-4) + '-' + l.slug + '.html'; };

  /* The ten-day plan: what to do each day. */
  YKI.plan = [
    { day: 1, focus: 'The three tasks and the informal message', write: ['t1-grattis'], drills: null },
    { day: 2, focus: 'Verb in second place', write: ['t2-annons'], drills: 'v2' },
    { day: 3, focus: 'Linking words and clauses', write: ['t3-talko'], drills: 'bisats' },
    { day: 4, focus: 'The formal message and the complaint', write: ['t4-halsocentral'], drills: 'register' },
    { day: 5, focus: 'The opinion piece', write: ['t5-asikt'], drills: 'glue' },
    { day: 6, focus: 'Past, perfect, future', write: ['t6-skift', 't6-ansokan'], drills: 'tense' },
    { day: 7, focus: 'Endings and polite requests', write: ['t7-buss'], drills: 'noun' },
    { day: 8, focus: 'Checking your own text', write: ['t2-asikt'], drills: 'fix' },
    { day: 9, focus: 'Full mock exam 1', mock: 'mock1', drills: 'mix' },
    { day: 10, focus: 'Full mock exam 2 and exam day', mock: 'mock2', drills: 'mix' }
  ];
})();

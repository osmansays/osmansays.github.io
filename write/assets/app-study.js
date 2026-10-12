/* YKI Skriva — Memorise (spaced repetition for sentences and words) and Drills. */
(function () {
  'use strict';
  var YKI = window.YKI, el = YKI.el;
  YKI.views = YKI.views || {};

  /* ============================== shared numbers ============================== */
  YKI.cardNumbers = function () {
    var s = YKI.load(), t = YKI.today(), day = YKI.planDay();
    var n = { sentTotal: YKI.chunks.length, wordTotal: YKI.vocab.length, sentLearned: 0, wordLearned: 0, strong: 0, due: 0, newAvail: 0, newLeftToday: 0 };
    YKI.allCards().forEach(function (c) {
      var st = s.cards[c.id];
      if (st && st.b >= 1) {
        if (c.kind === 'sentence') n.sentLearned++; else n.wordLearned++;
        if (st.b >= 4) n.strong++;
        if (st.due <= t) n.due++;
      } else if (c.day <= day) n.newAvail++;
    });
    n.newLeftToday = Math.max(0, Math.min(n.newAvail, s.settings.newPerDay - (s.newToday[t] || 0)));
    return n;
  };
  function deckOf(card) { return card.kind === 'sentence' ? 'g:' + card.g : 't:' + card.t; }
  function deckList() {
    var decks = [];
    for (var d = 1; d <= 8; d++) {
      YKI.chunkGroups.forEach(function (g) { if (g.day === d) decks.push({ id: 'g:' + g.id, day: d, title: g.title, sub: g.en, kind: 'Sentences' }); });
      YKI.themes.forEach(function (t) { if (t.n === d) decks.push({ id: 't:' + t.id, day: d, title: t.sv, sub: t.en + ': ' + t.blurb, kind: 'Words' }); });
    }
    return decks;
  }
  function deckStats(deckId) {
    var s = YKI.load(), total = 0, learned = 0;
    YKI.allCards().forEach(function (c) {
      if (deckOf(c) !== deckId) return;
      total++; if (s.cards[c.id] && s.cards[c.id].b >= 1) learned++;
    });
    return { total: total, learned: learned };
  }

  /* ============================== Memorise: home ============================== */
  YKI.views.cards = function (main, args) {
    if (args[0] === 'session') return session(main, args[1] ? decodeURIComponent(args[1]) : null);
    if (args[0] === 'browse') return browse(main, decodeURIComponent(args[1] || ''));
    var n = YKI.cardNumbers(), day = YKI.planDay();
    main.appendChild(el('header', { class: 'page-head' }, [
      el('h1', null, 'Memorise'),
      el('p', { class: 'lead' }, 'Sentences and words you can drop straight into an answer. You always type the Swedish from memory, because that is what the exam asks of you.')
    ]));
    var todo = n.due + n.newLeftToday;
    main.appendChild(el('section', { class: 'callout' }, [
      el('div', { class: 'callout-main' }, [
        el('p', { class: 'big' }, todo ? (n.due + ' to review, ' + n.newLeftToday + ' new') : 'Nothing due right now'),
        el('p', { class: 'meta' }, todo ? 'Reviews come first. New items are shown once, then tested twice.' : (n.newAvail ? 'You have reached today’s limit for new items. You can still study a set below.' : 'Come back tomorrow, or study ahead with a set below.'))
      ]),
      todo ? el('a', { class: 'btn primary', href: YKI.href('cards/session') }, 'Start today’s session') : null
    ]));
    main.appendChild(el('div', { class: 'meters' }, [
      meter('Sentences learned', n.sentLearned, n.sentTotal),
      meter('Words learned', n.wordLearned, n.wordTotal),
      meter('Holding after 5+ days', n.strong, n.sentTotal + n.wordTotal)
    ]));
    main.appendChild(el('h2', null, 'Sets'));
    main.appendChild(el('p', { class: 'meta' }, 'Each day opens one set of sentences and one theme of words. You can start any set early.'));
    var list = el('ul', { class: 'rows' });
    deckList().forEach(function (d) {
      var st = deckStats(d.id);
      list.appendChild(el('li', { class: 'row' + (d.day > day ? ' later' : '') }, [
        el('span', { class: 'row-tag' }, 'Day ' + d.day),
        el('div', { class: 'row-main' }, [
          el('strong', { class: d.kind === 'Words' ? 'sv' : '' }, d.title),
          el('span', { class: 'meta' }, d.kind + ' · ' + d.sub)
        ]),
        el('span', { class: 'row-num' }, st.learned + '/' + st.total),
        el('span', { class: 'row-actions' }, [
          el('a', { class: 'btn small', href: YKI.href('cards/session/' + encodeURIComponent(d.id)) }, st.learned < st.total ? 'Study' : 'Review'),
          el('a', { class: 'btn small quiet', href: YKI.href('cards/browse/' + encodeURIComponent(d.id)) }, 'List')
        ])
      ]));
    });
    main.appendChild(list);
  };
  function meter(label, a, b) {
    var pct = b ? Math.round(100 * a / b) : 0;
    return el('div', { class: 'meter' }, [
      el('div', { class: 'meter-top' }, [el('span', null, label), el('strong', null, a + ' / ' + b)]),
      el('div', { class: 'bar', role: 'progressbar', 'aria-valuenow': String(pct), 'aria-valuemin': '0', 'aria-valuemax': '100', 'aria-label': label }, el('i', { style: 'width:' + pct + '%' }))
    ]);
  }
  YKI.meter = meter;

  function browse(main, deckId) {
    var d = deckList().filter(function (x) { return x.id === deckId; })[0];
    if (!d) { location.hash = '#/cards'; return; }
    main.appendChild(el('p', { class: 'crumb' }, el('a', { href: YKI.href('cards') }, 'Memorise')));
    main.appendChild(el('h1', { class: d.kind === 'Words' ? 'sv' : '' }, d.title));
    main.appendChild(el('p', { class: 'lead' }, d.sub));
    var s = YKI.load();
    var tb = el('tbody');
    YKI.allCards().forEach(function (c) {
      if (deckOf(c) !== deckId) return;
      var st = s.cards[c.id];
      tb.appendChild(el('tr', null, [
        el('td', { class: 'sv' }, [el('strong', null, c.sv), c.forms ? el('div', { class: 'forms' }, c.forms) : null, c.ex ? el('div', { class: 'ex-line' }, c.ex) : null]),
        el('td', null, [c.en, c.note ? el('div', { class: 'meta' }, c.note) : null]),
        el('td', { class: 'meta nowrap' }, st && st.b >= 1 ? 'box ' + st.b + ' of 5' : 'new')
      ]));
    });
    main.appendChild(el('table', { class: 'plain vocab' }, tb));
    main.appendChild(el('p', null, el('a', { class: 'btn primary', href: YKI.href('cards/session/' + encodeURIComponent(deckId)) }, 'Study this set')));
  }

  /* ============================== Memorise: session ============================== */
  function buildQueue(deckId) {
    var s = YKI.load(), t = YKI.today(), day = YKI.planDay();
    var all = YKI.allCards();
    var due = [], fresh = [];
    all.forEach(function (c) {
      if (deckId && deckOf(c) !== deckId) return;
      var st = s.cards[c.id];
      if (st && st.b >= 1) { if (st.due <= t || deckId) due.push(c); }
      else if (deckId || c.day <= day) fresh.push(c);
    });
    if (deckId) due = due.filter(function (c) { return s.cards[c.id].due <= t; }).concat(due.filter(function (c) { return s.cards[c.id].due > t && s.cards[c.id].b <= 2; }));
    var limit = deckId ? 12 : Math.max(0, s.settings.newPerDay - (s.newToday[t] || 0));
    fresh = fresh.slice(0, limit);
    var q = YKI.shuffle(due).map(function (c) { return { id: c.id, step: 'review' }; });
    /* New items in small groups: meet four, then recall them, so each recall has a little distance. */
    for (var i = 0; i < fresh.length; i += 4) {
      var group = fresh.slice(i, i + 4);
      group.forEach(function (c) { q.push({ id: c.id, step: 'present' }); });
      group.forEach(function (c) { q.push({ id: c.id, step: 'hint' }); });
      YKI.shuffle(group).forEach(function (c) { q.push({ id: c.id, step: 'recall' }); });
    }
    return q;
  }
  function maskWord(sv) {
    return sv.split(' ').map(function (w, i, arr) {
      if (arr.length > 1 && i === 0 && /^(en|ett|att)$/.test(w)) return w;
      return w.charAt(0) + w.slice(1).replace(/[^\s-]/g, '·');
    }).join(' ');
  }

  function session(main, deckId) {
    var queue = buildQueue(deckId);
    var total = queue.length, stats = { right: 0, wrong: 0, learned: 0, reviewed: 0 };
    var wrap = el('div', { class: 'session' });
    var bar = el('div', { class: 'bar thin' }, el('i', { style: 'width:0%' }));
    var counter = el('span', { class: 'meta' });
    main.appendChild(el('div', { class: 'session-top' }, [el('a', { class: 'crumb', href: YKI.href('cards') }, 'Memorise'), counter]));
    main.appendChild(bar);
    main.appendChild(wrap);

    if (!total) {
      wrap.appendChild(el('div', { class: 'empty' }, [
        el('h1', null, 'Nothing to study here right now'),
        el('p', null, 'Everything in this selection is learned and not yet due. Spaced practice works because of the waiting.'),
        el('a', { class: 'btn', href: YKI.href('cards') }, 'Back to Memorise')
      ]));
      return;
    }
    function later(entry, gap) { queue.splice(Math.min(queue.length, gap), 0, entry); total++; }
    function progress() {
      var done = total - queue.length;
      bar.firstChild.style.width = Math.round(100 * done / total) + '%';
      counter.textContent = queue.length + ' left';
    }
    function next() {
      queue.shift();
      show();
    }
    function nextButton(label) {
      var b = el('button', { type: 'button', class: 'btn primary next' }, label || 'Next');
      b.addEventListener('click', next);
      setTimeout(function () { b.focus(); }, 40);
      return b;
    }
    function show() {
      wrap.innerHTML = '';
      progress();
      if (!queue.length) return finish();
      var entry = queue[0], c = YKI.cardById(entry.id);
      var tag = c.kind === 'sentence' ? 'Sentence' : 'Word · ' + YKI.themes[Number(c.t.slice(1)) - 1].sv;
      var card = el('article', { class: 'card step-' + entry.step });
      card.appendChild(el('p', { class: 'card-tag' }, tag + (entry.step === 'present' ? ' · new' : '')));
      wrap.appendChild(card);

      if (entry.step === 'present') {
        YKI.touchNew(c.id);
        card.appendChild(el('p', { class: 'card-sv sv' }, c.sv));
        card.appendChild(el('p', { class: 'card-en' }, c.en));
        if (c.forms) card.appendChild(el('p', { class: 'forms sv' }, c.forms));
        if (c.ex) card.appendChild(el('p', { class: 'card-ex' }, [el('span', { class: 'sv' }, c.ex), el('span', { class: 'meta' }, c.exEn)]));
        if (c.note) card.appendChild(el('p', { class: 'card-note' }, c.note));
        card.appendChild(el('p', { class: 'meta' }, 'Say it aloud once. Then you will be asked to produce it.'));
        card.appendChild(el('div', { class: 'ex-actions' }, nextButton('Got it, test me')));
        return;
      }

      var item, opts = { focus: true };
      var extra = el('div', { class: 'card-extra' });
      if (c.ex) extra.appendChild(el('p', { class: 'card-ex' }, [el('span', { class: 'sv' }, c.ex), el('span', { class: 'meta' }, c.exEn)]));
      if (c.forms) extra.appendChild(el('p', { class: 'forms sv' }, c.forms));
      if (c.note) extra.appendChild(el('p', { class: 'card-note' }, c.note));
      opts.extra = extra;

      if (entry.step === 'hint' && c.kind === 'sentence') {
        item = { kind: 'order', tiles: c.sv.split(' '), prompt: c.en, why: c.note || '' };
      } else {
        item = { kind: 'type', q: c.en, answers: [c.sv], why: '' };
        if (entry.step === 'hint') opts.hint = maskWord(c.sv);
      }
      var graded = false;
      function apply(ok, verdict) {
        if (entry.step === 'hint') {
          if (!ok) { later({ id: c.id, step: 'hint' }, 3); stats.wrong++; }
          else stats.right++;
        } else if (entry.step === 'recall') {
          if (ok) { YKI.grade(c.id, 'learned'); stats.learned++; stats.right++; }
          else { later({ id: c.id, step: 'hint' }, 2); later({ id: c.id, step: 'recall' }, 6); stats.wrong++; }
        } else if (entry.step === 'review') {
          stats.reviewed++;
          if (verdict === 'ok') { YKI.grade(c.id, 'ok'); stats.right++; }
          else if (verdict === 'almost') { YKI.grade(c.id, 'almost'); stats.right++; }
          else { YKI.grade(c.id, 'bad'); later({ id: c.id, step: 'relearn' }, 4); stats.wrong++; }
        } else if (entry.step === 'relearn') {
          if (!ok) later({ id: c.id, step: 'relearn' }, 4);
        }
        graded = true;
      }
      opts.onOverride = function () {
        /* The learner judged a different wording as right: undo the miss. */
        if (entry.step === 'review') { var st = YKI.load().cards[c.id]; st.b = Math.min(5, Math.max(2, st.b + 1)); st.due = YKI.today() + YKI.INTERVALS[st.b]; st.bad = Math.max(0, st.bad - 1); YKI.save(); }
        if (entry.step === 'recall') { YKI.grade(c.id, 'learned'); stats.learned++; }
        for (var i = queue.length - 1; i >= 1; i--) if (queue[i].id === c.id) { queue.splice(i, 1); total--; }
        stats.wrong = Math.max(0, stats.wrong - 1); stats.right++;
        progress();
      };
      var w = YKI.widget(item, function (ok, it, detail) {
        apply(ok, detail.verdict || (ok ? 'ok' : 'bad'));
        if (item.kind === 'order') {
          var out = w.querySelector('.ex-out');
          out.appendChild(extra);
        }
        w.appendChild(el('div', { class: 'ex-actions end' }, nextButton()));
      }, opts);
      card.appendChild(w);
    }
    function finish() {
      var s = YKI.load(), n = YKI.cardNumbers();
      if (!deckId && n.due === 0) YKI.mark('d' + YKI.planDay() + ':cards');
      if (deckId && n.due === 0 && n.newLeftToday === 0) YKI.mark('d' + YKI.planDay() + ':cards');
      var tries = stats.right + stats.wrong;
      wrap.appendChild(el('div', { class: 'empty' }, [
        el('h1', null, 'Session done'),
        el('p', { class: 'big' }, stats.learned + ' new learned, ' + stats.reviewed + ' reviewed'),
        el('p', { class: 'meta' }, tries ? Math.round(100 * stats.right / tries) + '% right on the first try. Items you missed will come back tomorrow.' : ''),
        n.due + n.newLeftToday > 0 && !deckId ? el('a', { class: 'btn primary', href: YKI.href('cards/session') , onclick: function () { setTimeout(YKI.rerender, 0); } }, 'Continue: ' + (n.due + n.newLeftToday) + ' more') : null,
        el('a', { class: 'btn', href: YKI.href('today') }, 'Back to today')
      ]));
      void s;
    }
    show();
  }

  /* ============================== Drills ============================== */
  function drillStat(cat) {
    var s = YKI.load(), seen = 0, ok = 0, total = 0;
    YKI.drills.forEach(function (d) {
      if (cat && d.cat !== cat) return;
      total++;
      var r = s.drills[d.id];
      if (r) { seen++; if (r.lastOk) ok++; }
    });
    return { total: total, seen: seen, ok: ok, pct: seen ? Math.round(100 * ok / seen) : null };
  }
  YKI.drillStat = drillStat;

  function pick(cat, size) {
    var s = YKI.load(), day = YKI.planDay();
    function weight(d) {
      var r = s.drills[d.id];
      if (!r) return 3;                 // unseen
      if (!r.lastOk) return 4;          // missed last time
      return 1 / (1 + r.ok);            // known
    }
    function take(pool, n) {
      var scored = pool.map(function (d) { return { d: d, k: Math.random() * weight(d) }; });
      scored.sort(function (a, b) { return b.k - a.k; });
      return scored.slice(0, n).map(function (x) { return x.d; });
    }
    var out;
    if (cat && cat !== 'mix') {
      var own = YKI.drills.filter(function (d) { return d.cat === cat; });
      var catDay = YKI.drillCats.filter(function (c) { return c.id === cat; })[0].day;
      var earlier = YKI.drills.filter(function (d) {
        var cd = YKI.drillCats.filter(function (c) { return c.id === d.cat; })[0].day;
        return d.cat !== cat && cd < catDay && s.drills[d.id];
      });
      var mixN = Math.min(earlier.length, Math.round(size / 3));
      out = take(own, size - mixN).concat(take(earlier, mixN));
    } else {
      var open = YKI.drills.filter(function (d) { return YKI.drillCats.filter(function (c) { return c.id === d.cat; })[0].day <= Math.max(2, day); });
      out = take(open, size);
    }
    return YKI.shuffle(out);
  }

  YKI.views.drills = function (main, args) {
    if (args[0] === 'run') return runDrills(main, args[1] || 'mix');
    var day = YKI.planDay(), plan = YKI.plan[day - 1];
    main.appendChild(el('header', { class: 'page-head' }, [
      el('h1', null, 'Drills'),
      el('p', { class: 'lead' }, 'Twelve quick items at a time. Each set mixes today’s rule with earlier ones, because the exam will not tell you which rule you need.')
    ]));
    var todayCat = plan.drills || 'mix';
    var catInfo = YKI.drillCats.filter(function (c) { return c.id === todayCat; })[0];
    main.appendChild(el('section', { class: 'callout' }, [
      el('div', { class: 'callout-main' }, [
        el('p', { class: 'big' }, catInfo ? catInfo.title : 'Mixed revision'),
        el('p', { class: 'meta' }, 'Today’s set · 12 items · about 6 minutes')
      ]),
      el('a', { class: 'btn primary', href: YKI.href('drills/run/' + todayCat) }, 'Start')
    ]));
    main.appendChild(el('h2', null, 'By skill'));
    var list = el('ul', { class: 'rows' });
    YKI.drillCats.forEach(function (c) {
      var st = drillStat(c.id);
      list.appendChild(el('li', { class: 'row' + (c.day > day ? ' later' : '') }, [
        el('span', { class: 'row-tag' }, 'Day ' + c.day),
        el('div', { class: 'row-main' }, [el('strong', null, c.title), el('span', { class: 'meta' }, c.en)]),
        el('span', { class: 'row-num' }, st.pct == null ? 'not tried' : st.pct + '% · ' + st.seen + '/' + st.total),
        el('span', { class: 'row-actions' }, el('a', { class: 'btn small', href: YKI.href('drills/run/' + c.id) }, 'Practise'))
      ]));
    });
    main.appendChild(list);
    main.appendChild(el('p', null, el('a', { class: 'btn', href: YKI.href('drills/run/mix') }, 'Mixed set from everything so far')));
  };

  function runDrills(main, cat) {
    var items = pick(cat, 12), i = 0, right = 0, missed = [];
    var catInfo = YKI.drillCats.filter(function (c) { return c.id === cat; })[0];
    var bar = el('div', { class: 'bar thin' }, el('i', { style: 'width:0%' }));
    var counter = el('span', { class: 'meta' });
    var wrap = el('div', { class: 'session' });
    main.appendChild(el('div', { class: 'session-top' }, [el('a', { class: 'crumb', href: YKI.href('drills') }, 'Drills'), counter]));
    main.appendChild(bar); main.appendChild(wrap);
    function show() {
      wrap.innerHTML = '';
      bar.firstChild.style.width = Math.round(100 * i / items.length) + '%';
      if (i >= items.length) return end();
      counter.textContent = (i + 1) + ' of ' + items.length;
      var it = items[i];
      var c = YKI.drillCats.filter(function (x) { return x.id === it.cat; })[0];
      var card = el('article', { class: 'card' }, el('p', { class: 'card-tag' }, c.title));
      var w = YKI.widget(it, function (ok) {
        YKI.recordDrill(it, ok);
        if (ok) right++; else missed.push(it);
        var b = el('button', { type: 'button', class: 'btn primary next' }, i + 1 < items.length ? 'Next' : 'See result');
        b.addEventListener('click', function () { i++; show(); });
        w.appendChild(el('div', { class: 'ex-actions end' }, b));
        setTimeout(function () { b.focus(); }, 40);
      }, { focus: true });
      card.appendChild(w);
      wrap.appendChild(card);
    }
    function end() {
      counter.textContent = '';
      var day = YKI.planDay(), plan = YKI.plan[day - 1];
      if ((plan.drills || 'mix') === cat || cat === 'mix') YKI.mark('d' + day + ':drills');
      var box = el('div', { class: 'empty' }, [
        el('h1', null, right + ' of ' + items.length + ' right'),
        el('p', null, right === items.length ? 'Clean sheet. This rule is becoming automatic.' : right >= items.length * 0.75 ? 'Solid. The ones you missed will come up again in the next set.' : 'This one needs another round. Read the rule lines below, then run the set again.')
      ]);
      if (missed.length) {
        var ul = el('ul', { class: 'missed' });
        missed.forEach(function (m) {
          var ans = m.kind === 'order' ? (m.lock ? m.lock + ' ' : '') + m.tiles.join(' ') : m.kind === 'mc' ? m.q.replace('___', m.opts[0]) : m.answers[0];
          if (m.kind === 'mc' && m.q.indexOf('___') === -1) ans = m.opts[0];
          ul.appendChild(el('li', null, [el('span', { class: 'sv' }, ans), el('span', { class: 'meta' }, m.why)]));
        });
        box.appendChild(ul);
      }
      box.appendChild(el('div', { class: 'ex-actions' }, [
        el('a', { class: 'btn primary', href: YKI.href('drills/run/' + cat), onclick: function () { setTimeout(YKI.rerender, 0); } }, 'Another set' + (catInfo ? ': ' + catInfo.title : '')),
        el('a', { class: 'btn', href: YKI.href('today') }, 'Back to today')
      ]));
      wrap.appendChild(box);
    }
    show();
  }
})();

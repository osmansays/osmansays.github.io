/* YKI Skriva — shell, router, Today, Lessons, Library.
   Runs as the full app (index.html) or as a single standalone page (files in lessons/ and reference/). */
(function () {
  'use strict';
  var YKI = window.YKI, el = YKI.el;
  YKI.views = YKI.views || {};

  var leaveHooks = [];
  YKI.onLeave = function (fn) { leaveHooks.push(fn); };
  function runLeave() { leaveHooks.forEach(function (f) { try { f(); } catch (e) { /* ignore */ } }); leaveHooks = []; }
  function linkify(html) { return html.replace(/href="@([^"]*)"/g, function (_, r) { return 'href="' + YKI.href(r) + '"'; }); }

  var ICON = {
    today: '<circle cx="10" cy="10" r="3.2"/><path d="M10 2.5v2M10 15.5v2M2.5 10h2M15.5 10h2M4.7 4.7l1.4 1.4M13.9 13.9l1.4 1.4M4.7 15.3l1.4-1.4M13.9 6.1l1.4-1.4"/>',
    lessons: '<path d="M3 4.5c2.5-1 4.5-.8 7 .7 2.5-1.5 4.5-1.7 7-.7v10.5c-2.5-1-4.5-.8-7 .7-2.5-1.5-4.5-1.7-7-.7zM10 5.2v10.5"/>',
    cards: '<rect x="3" y="6" width="11" height="9" rx="1.5"/><path d="M6 6V4.5h11V13h-3"/>',
    drills: '<path d="M4 10.5l3.5 3.5L16 5.5"/><path d="M3 17h14"/>',
    write: '<path d="M4 16l1-4 8.5-8.5 3 3L8 15z"/><path d="M12 5l3 3"/>',
    library: '<path d="M4 3.5v13M8 3.5v13M12 4l3.5 12.5M3 16.5h6"/>'
  };
  var NAV = [['today', 'Today'], ['lessons', 'Lessons'], ['cards', 'Memorise'], ['drills', 'Drills'], ['write', 'Write'], ['library', 'Library']];

  /* ============================== Today ============================== */
  function dayStatus(d) {
    var s = YKI.load(), plan = YKI.plan[d - 1];
    var st = { lesson: !!s.lessons[d], cards: YKI.isDone('d' + d + ':cards'), drills: YKI.isDone('d' + d + ':drills'), write: false };
    if (plan.mock) st.write = YKI.isDone('mock:' + plan.mock);
    else st.write = plan.write.every(function (id) { return s.texts.some(function (t) { return t.task === id; }); });
    st.need = plan.drills ? 4 : 3;
    st.count = (st.lesson ? 1 : 0) + (st.cards ? 1 : 0) + (plan.drills && st.drills ? 1 : 0) + (st.write ? 1 : 0);
    st.all = st.count === st.need;
    return st;
  }

  YKI.views.today = function (main, args) {
    var s = YKI.load(), current = YKI.planDay();
    var view = Number(args[0]) >= 1 && Number(args[0]) <= 10 ? Number(args[0]) : current;
    var plan = YKI.plan[view - 1], lesson = YKI.lessons[view - 1], st = dayStatus(view), n = YKI.cardNumbers();
    var theme = YKI.themes.filter(function (t) { return t.id === lesson.theme; })[0];

    if (!YKI.storageOK) main.appendChild(el('p', { class: 'feedback bad', role: 'alert' }, 'This browser is not saving your progress (private window, or storage is blocked). You can study, but your progress will be gone when you close the page. Open the file in a normal window to keep it.'));

    main.appendChild(el('header', { class: 'today-head' }, [
      el('p', { class: 'kicker' }, view === current ? 'Your plan for today' : 'Looking at another day'),
      el('h1', null, 'Day ' + view + ' of 10'),
      el('p', { class: 'lead' }, plan.focus + '.' + (view <= 7 ? ' Theme: ' : '')),
    ]));
    if (view <= 7) main.querySelector('.today-head .lead').appendChild(el('span', { class: 'sv' }, theme.sv));

    var strip = el('nav', { class: 'daystrip', 'aria-label': 'The ten days' });
    for (var d = 1; d <= 10; d++) {
      var ds = dayStatus(d);
      strip.appendChild(el('a', { href: YKI.href('today/' + d), class: 'day' + (d === current ? ' now' : '') + (d === view ? ' on' : '') + (ds.all ? ' done' : ds.count ? ' part' : ''), 'aria-current': d === view ? 'page' : null, title: 'Day ' + d + ': ' + YKI.plan[d - 1].focus }, [
        el('span', { class: 'day-n' }, String(d)), el('span', { class: 'day-fill', style: 'height:' + Math.round(100 * ds.count / ds.need) + '%' })
      ]));
    }
    main.appendChild(strip);

    var steps = el('ol', { class: 'steps' });
    function step(done, title, detail, href, label, mins) {
      steps.appendChild(el('li', { class: 'step' + (done ? ' done' : '') }, [
        el('span', { class: 'tick', 'aria-hidden': 'true' }, done ? '✓' : ''),
        el('div', { class: 'step-main' }, [el('strong', null, title), el('span', { class: 'meta' }, detail)]),
        el('span', { class: 'meta mins' }, mins),
        el('a', { class: 'btn ' + (done ? 'quiet' : 'primary'), href: href }, done ? 'Again' : label)
      ]));
    }
    step(st.lesson, 'Lesson ' + view + ': ' + lesson.title, lesson.win, YKI.href('lessons/' + view), 'Read', lesson.minutes + ' min');
    var cardDetail = view === current
      ? (n.due + n.newLeftToday > 0 ? n.due + ' to review and ' + n.newLeftToday + ' new sentences and words' : 'All caught up for now')
      : (view <= 8 ? 'Sentences: ' + YKI.chunkGroups[view - 1].title + (view <= 7 ? '. Words: ' + YKI.themes[view - 1].sv : '') : 'Review everything that is due');
    step(st.cards, 'Memorise', cardDetail, YKI.href('cards'), 'Start', '25 min');
    var cat = YKI.drillCats.filter(function (c) { return c.id === plan.drills; })[0];
    if (plan.drills) step(st.drills, 'Drills', cat ? cat.title + ': ' + cat.en : 'Mixed revision of every rule', YKI.href('drills/run/' + plan.drills), 'Start', '10 min');
    if (plan.mock) {
      var m = YKI.mocks.filter(function (x) { return x.id === plan.mock; })[0];
      step(st.write, m.title, 'Three tasks in 54 minutes, then check each one', YKI.href('write/mock/' + m.id), 'Open', '75 min');
    } else {
      plan.write.forEach(function (id) {
        var t = YKI.taskById(id), done = s.texts.some(function (x) { return x.task === id; });
        step(done, 'Write: ' + t.title, YKI.typeInfo[t.type].label + ', then compare with the model', YKI.href('write/task/' + id), 'Write', (YKI.typeInfo[t.type].minutes + 10) + ' min');
      });
    }
    main.appendChild(steps);

    if (view !== current) {
      main.appendChild(el('p', { class: 'ex-actions' }, [
        el('button', { type: 'button', class: 'btn', onclick: function () { YKI.setPlanDay(view); location.hash = '#/today'; YKI.rerender(); } }, 'Make day ' + view + ' my current day'),
        el('a', { class: 'btn quiet', href: YKI.href('today') }, 'Back to day ' + current)
      ]));
    } else if (st.all && current < 10) {
      main.appendChild(el('p', { class: 'feedback good' }, ['Day ' + current + ' is done. Tomorrow the next day opens by itself. If you have the energy now, ', el('a', { href: '#', onclick: function (e) { e.preventDefault(); YKI.setPlanDay(current + 1); YKI.rerender(); } }, 'start day ' + (current + 1) + ' early'), '.']));
    }

    /* where you stand */
    main.appendChild(el('h2', null, 'Where you stand'));
    var ds2 = YKI.drillStat(null);
    var texts = s.texts, byType = { informal: 0, formal: 0, opinion: 0 };
    texts.forEach(function (x) { var t = YKI.taskById(x.task); if (t) byType[t.type]++; });
    main.appendChild(el('div', { class: 'meters' }, [
      YKI.meter('Sentences learned', n.sentLearned, n.sentTotal),
      YKI.meter('Words learned', n.wordLearned, n.wordTotal),
      YKI.meter('Drill items right last time', ds2.ok, ds2.total),
      YKI.meter('Texts written', Math.min(texts.length, 14), 14)
    ]));
    var lastEst = texts.filter(function (x) { return x.est; }).slice(-3).map(function (x) { return x.est; });
    main.appendChild(el('p', { class: 'meta' }, [
      'Texts so far: ' + byType.informal + ' informal, ' + byType.formal + ' formal, ' + byType.opinion + ' opinion.',
      lastEst.length ? ' Your last self-estimates: level ' + lastEst.join(', ') + '.' : ' Rate your texts after writing to track your level here.'
    ]));
    if (s.settings.examDate) {
      var left = Math.round((new Date(s.settings.examDate + 'T00:00:00').getTime() - new Date().setHours(0, 0, 0, 0)) / 86400000);
      if (!isNaN(left)) main.appendChild(el('p', { class: 'meta' }, left > 0 ? left + (left === 1 ? ' day' : ' days') + ' to your exam.' : left === 0 ? 'Your exam is today. Lycka till!' : ''));
    }
  };

  /* ============================== Lessons ============================== */
  YKI.views.lessons = function (main, args) {
    var n = Number(args[0]);
    if (n >= 1 && n <= YKI.lessons.length) return lessonView(main, YKI.lessons[n - 1]);
    var s = YKI.load(), day = YKI.planDay();
    main.appendChild(el('header', { class: 'page-head' }, [
      el('h1', null, 'Lessons'),
      el('p', { class: 'lead' }, 'Ten short lessons. Each one teaches a single thing you will use in the next text you write.')
    ]));
    var list = el('ol', { class: 'rows lessonlist' });
    YKI.lessons.forEach(function (l) {
      list.appendChild(el('li', { class: 'row' + (l.n > day ? ' later' : '') }, [
        el('span', { class: 'row-tag' }, s.lessons[l.n] ? '✓ Done' : 'Day ' + l.n),
        el('div', { class: 'row-main' }, [el('strong', null, l.title), el('span', { class: 'meta' }, l.win)]),
        el('span', { class: 'row-num' }, l.minutes + ' min'),
        el('span', { class: 'row-actions' }, el('a', { class: 'btn small', href: YKI.href('lessons/' + l.n) }, 'Open'))
      ]));
    });
    main.appendChild(list);
  };

  function lessonView(main, lesson) {
    var s = YKI.load();
    var theme = YKI.themes.filter(function (t) { return t.id === lesson.theme; })[0];
    var art = el('article', { class: 'lesson prose' });
    art.appendChild(el('p', { class: 'crumb' }, [el('a', { href: YKI.href('lessons') }, 'Lessons'), ' / Day ' + lesson.n]));
    art.appendChild(el('h1', null, lesson.title));
    art.appendChild(el('p', { class: 'meta' }, ['About ' + lesson.minutes + ' minutes · practice theme: ', el('span', { class: 'sv' }, theme.sv)]));
    var widgets = 0, answered = 0, right = 0;
    var doneBox = el('section', { class: 'win' });
    function finish() {
      if (!s.lessons[lesson.n]) { s.lessons[lesson.n] = true; YKI.save(); }
      doneBox.innerHTML = '';
      doneBox.appendChild(el('h2', null, 'Lesson complete'));
      doneBox.appendChild(el('p', null, [el('strong', null, 'What you can do now: '), lesson.win]));
      if (widgets) doneBox.appendChild(el('p', { class: 'meta' }, right + ' of ' + widgets + ' checks right on the first try.'));
      var nextL = YKI.lessons[lesson.n];
      doneBox.appendChild(el('div', { class: 'ex-actions' }, [
        el('a', { class: 'btn primary', href: YKI.href('today') }, 'Back to today’s plan'),
        nextL ? el('a', { class: 'btn quiet', href: YKI.href('lessons/' + nextL.n) }, 'Next lesson: ' + nextL.title) : null
      ]));
    }
    lesson.body.forEach(function (block) {
      if (typeof block === 'string') {
        var div = el('div', { html: linkify(block) });
        while (div.firstChild) art.appendChild(div.firstChild);
        return;
      }
      var item = block.ref ? YKI.drillById(block.ref) : block;
      if (!item) return;
      widgets++;
      var fig = el('figure', { class: 'check' }, el('figcaption', null, 'Check ' + widgets));
      fig.appendChild(YKI.widget(item, function (ok) {
        answered++; if (ok) right++;
        YKI.recordDrill(item, ok);
        if (answered === widgets) finish();
      }));
      art.appendChild(fig);
    });
    if (s.lessons[lesson.n]) finish();
    else {
      doneBox.appendChild(el('p', { class: 'meta' }, 'Answer the checks above to complete the lesson.'));
      doneBox.appendChild(el('button', { type: 'button', class: 'btn quiet', onclick: finish }, 'Mark as done anyway'));
    }
    art.appendChild(doneBox);
    var src = YKI.sources[lesson.source];
    art.appendChild(el('aside', { class: 'aside' }, [
      el('h3', null, 'Read the source'),
      el('p', null, el('a', { href: src.url, target: '_blank', rel: 'noopener' }, src.title)),
      el('h3', null, 'Ask your teacher'),
      el('p', null, 'Anything here unclear? Ask. If you study with Claude, paste the sentence that puzzles you and ask why it is built that way. If you have a class, bring it to your teacher. A question asked today saves a mistake in the exam.')
    ]));
    main.appendChild(art);
  }

  /* ============================== Library ============================== */
  YKI.views.library = function (main) {
    var s = YKI.load();
    main.appendChild(el('header', { class: 'page-head' }, [
      el('h1', null, 'Library'),
      el('p', { class: 'lead' }, 'Reference sheets for looking things up, built to print on one or two pages each.')
    ]));
    var list = el('ul', { class: 'rows' });
    YKI.refs.forEach(function (r) {
      list.appendChild(el('li', { class: 'row' }, [
        el('div', { class: 'row-main' }, [el('strong', null, r.title), el('span', { class: 'meta' }, r.blurb)]),
        el('span', { class: 'row-actions' }, el('a', { class: 'btn small', href: YKI.href('ref/' + r.id) }, 'Open'))
      ]));
    });
    main.appendChild(list);

    main.appendChild(el('h2', null, 'Sources'));
    var sl = el('ul', { class: 'tight' });
    Object.keys(YKI.sources).forEach(function (k) { sl.appendChild(el('li', null, el('a', { href: YKI.sources[k].url, target: '_blank', rel: 'noopener' }, YKI.sources[k].title))); });
    main.appendChild(sl);

    main.appendChild(el('h2', null, 'Settings'));
    var form = el('div', { class: 'settings' });
    var daySel = el('select', { id: 'set-day' });
    for (var d = 1; d <= 10; d++) daySel.appendChild(el('option', { value: String(d), selected: d === YKI.planDay() }, 'Day ' + d));
    daySel.addEventListener('change', function () { YKI.setPlanDay(Number(daySel.value)); });
    form.appendChild(el('div', { class: 'set' }, [el('label', { for: 'set-day' }, 'I am on'), daySel, el('span', { class: 'meta' }, 'The day moves forward by itself each calendar day. Change it here if you skipped a day or want to go faster.')]));
    var newSel = el('select', { id: 'set-new' });
    [15, 20, 30, 40, 50].forEach(function (v) { newSel.appendChild(el('option', { value: String(v), selected: v === s.settings.newPerDay }, v + ' a day')); });
    newSel.addEventListener('change', function () { s.settings.newPerDay = Number(newSel.value); YKI.save(); });
    form.appendChild(el('div', { class: 'set' }, [el('label', { for: 'set-new' }, 'New sentences and words'), newSel, el('span', { class: 'meta' }, '30 a day covers all sentences and most words in the ten days. Fewer is fine: sentences always come before words.')]));
    var dateIn = el('input', { type: 'date', id: 'set-date', value: s.settings.examDate || '' });
    dateIn.addEventListener('change', function () { s.settings.examDate = dateIn.value; YKI.save(); });
    form.appendChild(el('div', { class: 'set' }, [el('label', { for: 'set-date' }, 'My exam date'), dateIn, el('span', { class: 'meta' }, 'Optional. Shows a countdown on Today.')]));
    main.appendChild(form);

    main.appendChild(el('h2', null, 'Your progress file'));
    main.appendChild(el('p', { class: 'meta' }, 'Progress is saved in this browser on this device. To move to another device or browser, copy the text below and load it there.'));
    var box = el('textarea', { class: 'promptbox', rows: '3', 'aria-label': 'Progress data' });
    var msg = el('span', { class: 'meta', role: 'status' });
    main.appendChild(box);
    main.appendChild(el('div', { class: 'ex-actions' }, [
      el('button', { type: 'button', class: 'btn', onclick: function () { box.value = YKI.exportState(); box.select(); msg.textContent = 'Copy this text and keep it somewhere.'; } }, 'Show my progress data'),
      el('button', { type: 'button', class: 'btn', onclick: function () { try { YKI.importState(box.value); msg.textContent = 'Progress loaded.'; } catch (e) { msg.textContent = 'That text is not a progress file from this course.'; } } }, 'Load pasted data'),
      msg
    ]));
    var armed = false;
    var resetBtn = el('button', { type: 'button', class: 'btn quiet danger' }, 'Erase all progress and start at day 1');
    resetBtn.addEventListener('click', function () {
      if (!armed) { armed = true; resetBtn.textContent = 'Press again to erase everything'; return; }
      YKI.reset(); location.hash = '#/today'; YKI.rerender();
    });
    main.appendChild(el('p', null, resetBtn));
  };

  YKI.views.ref = function (main, args) {
    var r = YKI.refById(args[0]);
    if (!r) { location.hash = '#/library'; return; }
    var art = el('article', { class: 'refsheet prose' });
    art.appendChild(el('p', { class: 'crumb noprint' }, [el('a', { href: YKI.href('library') }, 'Library'), ' ', el('button', { type: 'button', class: 'btn small quiet', onclick: function () { window.print(); } }, 'Print')]));
    art.appendChild(el('h1', null, r.title));
    var div = el('div', { html: linkify(r.html()) });
    while (div.firstChild) art.appendChild(div.firstChild);
    main.appendChild(art);
  };

  /* ============================== shell and router ============================== */
  var mainNode, navNode;
  function buildShell() {
    document.body.innerHTML = '';
    var standalone = YKI.page.type !== 'app';
    var side = el('aside', { class: 'side' });
    side.appendChild(el('a', { class: 'brand', href: YKI.href('today') }, [el('span', { class: 'brand-mark', 'aria-hidden': 'true' }), el('span', null, [el('strong', null, 'YKI Skriva'), el('small', null, 'Swedish writing in 10 days')])]));
    navNode = el('nav', { class: 'nav', 'aria-label': 'Main' });
    NAV.forEach(function (n) {
      navNode.appendChild(el('a', { href: YKI.href(n[0]), 'data-nav': n[0] }, [
        el('span', { class: 'ico', 'aria-hidden': 'true', html: '<svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' + ICON[n[0]] + '</svg>' }),
        el('span', null, n[1])
      ]));
    });
    side.appendChild(navNode);
    mainNode = el('main', { id: 'main', tabindex: '-1' });
    document.body.appendChild(el('a', { class: 'skip', href: '#main' }, 'Skip to content'));
    document.body.appendChild(el('div', { class: 'app' + (standalone ? ' standalone' : '') }, [side, mainNode]));
  }
  function parse() {
    var h = location.hash.replace(/^#\/?/, '');
    var parts = h.split('/').filter(function (x) { return x !== ''; });
    return { name: parts[0] || 'today', args: parts.slice(1) };
  }
  function render() {
    runLeave();
    var r;
    if (YKI.page.type === 'lesson') r = { name: 'lessons', args: [String(YKI.page.n)] };
    else if (YKI.page.type === 'ref') r = { name: 'ref', args: [YKI.page.id] };
    else r = parse();
    var view = YKI.views[r.name];
    if (!view) { r = { name: 'today', args: [] }; view = YKI.views.today; }
    mainNode.innerHTML = '';
    var active = r.name === 'ref' ? 'library' : r.name;
    Array.prototype.forEach.call(navNode.querySelectorAll('a'), function (a) {
      var on = a.getAttribute('data-nav') === active;
      a.classList.toggle('on', on);
      if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    view(mainNode, r.args);
    var h1 = mainNode.querySelector('h1');
    document.title = (h1 ? h1.textContent + ' · ' : '') + 'YKI Skriva';
    window.scrollTo(0, 0);
  }
  YKI.rerender = render;

  function start() {
    YKI.load();
    buildShell();
    render();
    if (YKI.page.type === 'app') window.addEventListener('hashchange', render);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();

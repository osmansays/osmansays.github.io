/* YKI Skriva — Write: task list, timed writing on ruled paper, the coach's review, mock exams, and model study. */
(function () {
  'use strict';
  var YKI = window.YKI, el = YKI.el;
  YKI.views = YKI.views || {};

  function themeOf(task) { return YKI.themes[Number(task.theme.slice(1)) - 1]; }
  function attemptsFor(taskId) { return YKI.load().texts.filter(function (t) { return t.task === taskId; }); }
  function typeChip(task) { return el('span', { class: 'chip type-' + task.type }, YKI.typeInfo[task.type].label); }

  /* ============================== overview ============================== */
  YKI.views.write = function (main, args) {
    if (args[0] === 'task') return taskView(main, args[1]);
    if (args[0] === 'mock') return mockView(main, args[1]);
    if (args[0] === 'study') return studyView(main, args[1]);
    if (args[0] === 'text') return savedText(main, args[1]);
    var day = YKI.planDay(), plan = YKI.plan[day - 1];
    main.appendChild(el('header', { class: 'page-head' }, [
      el('h1', null, 'Write'),
      el('p', { class: 'lead' }, 'Timed tasks in the three exam formats, across the seven themes. Write first, then compare with the model. The order matters: the effort of writing is what makes the model stick.')
    ]));

    var todays = el('section', { class: 'callout' });
    if (plan.mock) {
      var m = YKI.mocks.filter(function (x) { return x.id === plan.mock; })[0];
      todays.appendChild(el('div', { class: 'callout-main' }, [el('p', { class: 'big' }, m.title), el('p', { class: 'meta' }, 'Three tasks · 54 minutes · one sitting')]));
      todays.appendChild(el('a', { class: 'btn primary', href: YKI.href('write/mock/' + m.id) }, 'Open the mock exam'));
    } else {
      var t0 = YKI.taskById(plan.write[0]);
      todays.appendChild(el('div', { class: 'callout-main' }, [
        el('p', { class: 'big' }, plan.write.length > 1 ? 'Today: two short texts' : 'Today: ' + t0.title),
        el('p', { class: 'meta' }, plan.write.map(function (id) { var t = YKI.taskById(id); return YKI.typeInfo[t.type].label + ' · ' + YKI.typeInfo[t.type].minutes + ' min'; }).join('  ·  '))
      ]));
      plan.write.forEach(function (id, i) {
        todays.appendChild(el('a', { class: 'btn ' + (i === 0 ? 'primary' : ''), href: YKI.href('write/task/' + id) }, plan.write.length > 1 ? 'Text ' + (i + 1) : 'Open the task'));
      });
    }
    main.appendChild(todays);

    main.appendChild(el('h2', null, 'Mock exams'));
    var ml = el('ul', { class: 'rows' });
    YKI.mocks.forEach(function (m) {
      ml.appendChild(el('li', { class: 'row' }, [
        el('span', { class: 'row-tag' }, YKI.isDone('mock:' + m.id) ? 'Done' : '54 min'),
        el('div', { class: 'row-main' }, [el('strong', null, m.title), el('span', { class: 'meta' }, 'Informal message, formal message, opinion piece')]),
        el('span', { class: 'row-actions' }, el('a', { class: 'btn small', href: YKI.href('write/mock/' + m.id) }, 'Open'))
      ]));
    });
    main.appendChild(ml);

    main.appendChild(el('h2', null, 'All tasks by theme'));
    YKI.themes.forEach(function (th) {
      main.appendChild(el('h3', { class: 'theme-head' }, [el('span', { class: 'sv' }, th.n + ' ' + th.sv), el('span', { class: 'meta' }, th.en)]));
      var ul = el('ul', { class: 'rows' });
      YKI.tasks.forEach(function (t) {
        if (t.theme !== th.id) return;
        var a = attemptsFor(t.id), last = a[a.length - 1];
        ul.appendChild(el('li', { class: 'row' }, [
          typeChip(t),
          el('div', { class: 'row-main' }, [el('strong', null, t.title), el('span', { class: 'meta sv' }, t.kind)]),
          el('span', { class: 'row-num' }, a.length ? (a.length + (a.length > 1 ? ' texts' : ' text') + (last.est ? ' · level ' + last.est : '')) : ''),
          el('span', { class: 'row-actions' }, [
            el('a', { class: 'btn small', href: YKI.href('write/task/' + t.id) }, a.length ? 'Write again' : 'Write'),
            el('a', { class: 'btn small quiet', href: YKI.href('write/study/' + t.id) }, 'Model')
          ])
        ]));
      });
      main.appendChild(ul);
    });

    var texts = YKI.load().texts;
    if (texts.length) {
      main.appendChild(el('h2', null, 'Your texts'));
      var tl = el('ul', { class: 'rows' });
      texts.slice().reverse().forEach(function (x) {
        var t = YKI.taskById(x.task); if (!t) return;
        tl.appendChild(el('li', { class: 'row' }, [
          typeChip(t),
          el('div', { class: 'row-main' }, [el('strong', null, t.title), el('span', { class: 'meta' }, x.words + ' words' + (x.est ? ' · your estimate: level ' + x.est : '') + (x.mock ? ' · mock exam' : ''))]),
          el('span', { class: 'row-actions' }, el('a', { class: 'btn small quiet', href: YKI.href('write/text/' + x.id) }, 'Open'))
        ]));
      });
      main.appendChild(tl);
    }
  };

  /* ============================== building blocks ============================== */
  function taskCard(task, open) {
    var showEn = false;
    var box = el('section', { class: 'taskcard' });
    function draw() {
      box.innerHTML = '';
      box.appendChild(el('div', { class: 'taskcard-top' }, [
        el('span', { class: 'meta' }, [typeChip(task), ' ', el('span', { class: 'sv' }, task.kind)]),
        el('button', { type: 'button', class: 'btn small quiet', 'aria-pressed': String(showEn), onclick: function () { showEn = !showEn; draw(); } }, showEn ? 'Hide English' : 'Show English')
      ]));
      task.sv.split('\n').forEach(function (line, i) {
        box.appendChild(el('p', { class: 'sv task-sv' }, line));
        if (showEn) box.appendChild(el('p', { class: 'task-en' }, task.en.split('\n')[i] || ''));
      });
      var ul = el('ul', { class: 'bullets' });
      task.bullets.forEach(function (b) {
        ul.appendChild(el('li', null, [el('span', { class: 'sv' }, b.sv), showEn ? el('span', { class: 'task-en' }, b.en) : null]));
      });
      box.appendChild(ul);
    }
    draw();
    void open;
    return box;
  }

  function paper(value, onInput) {
    var ta = el('textarea', { class: 'paper sv', lang: 'sv', spellcheck: 'false', autocapitalize: 'sentences', autocomplete: 'off', placeholder: 'Skriv här …', 'aria-label': 'Your text in Swedish' });
    ta.value = value || '';
    ta.addEventListener('input', function () { onInput(ta.value); });
    return ta;
  }

  function Timer(seconds, node) {
    var left = seconds, start = Date.now(), handle = null, self = this;
    function tick() {
      left = seconds - Math.floor((Date.now() - start) / 1000);
      node.textContent = left >= 0 ? YKI.fmtTime(left) : '+' + YKI.fmtTime(-left);
      node.classList.toggle('over', left < 0);
      node.classList.toggle('soon', left >= 0 && left <= 120);
    }
    this.elapsed = function () { return Math.floor((Date.now() - start) / 1000); };
    this.stop = function () { if (handle) clearInterval(handle); handle = null; };
    handle = setInterval(tick, 500); tick();
    YKI.onLeave(function () { self.stop(); });
  }

  function modelNode(task, withEn) {
    var box = el('div', { class: 'model' });
    var para = null, prevRole = null;
    task.model.forEach(function (seg) {
      var role = seg[0].replace('+', '');
      if (seg[0].charAt(0) === '+' || !para) { para = el('div', { class: 'model-para' }); box.appendChild(para); prevRole = null; }
      var sameRole = role === prevRole; prevRole = role;
      para.appendChild(el('div', { class: 'model-seg role-' + role }, [
        el('span', { class: 'role' + (sameRole ? ' same' : '') }, sameRole ? '' : (YKI.roleNames[role] || role)),
        el('span', { class: 'seg-text' }, [el('span', { class: 'sv' }, seg[1]), withEn ? el('span', { class: 'seg-en' }, seg[2]) : null])
      ]));
    });
    return box;
  }
  function modelPanel(task) {
    var withEn = false;
    var wrap = el('div', { class: 'model-wrap' });
    function draw() {
      wrap.innerHTML = '';
      wrap.appendChild(el('div', { class: 'taskcard-top' }, [
        el('span', { class: 'meta' }, YKI.words(YKI.modelText(task)).length + ' words · the margin shows what each sentence is doing'),
        el('button', { type: 'button', class: 'btn small quiet', onclick: function () { withEn = !withEn; draw(); } }, withEn ? 'Hide English' : 'Show English')
      ]));
      wrap.appendChild(modelNode(task, withEn));
      if (task.alt) {
        var ol = el('ul', { class: 'altlist' });
        task.alt.outline.forEach(function (o) { ol.appendChild(el('li', null, [el('span', { class: 'role' }, o[0]), el('span', { class: 'sv' }, o[1])])); });
        wrap.appendChild(el('div', { class: 'alt' }, [el('h4', null, task.alt.label + ': an outline'), ol]));
      }
    }
    draw();
    return wrap;
  }

  /* The review: coach findings, task points, look-again notes, self-rating, model, feedback request. */
  function reviewNode(task, record, onEdit) {
    var s = YKI.load();
    var res = YKI.analyse(task, record.text);
    var box = el('div', { class: 'review' });

    box.appendChild(el('h2', null, 'Your text'));
    box.appendChild(el('div', { class: 'paper sv readonly' }, record.text));
    if (onEdit) box.appendChild(el('p', null, el('button', { type: 'button', class: 'btn small', onclick: onEdit }, 'Edit and check again')));

    box.appendChild(el('h2', null, 'Quick checks'));
    box.appendChild(el('p', { class: 'meta' }, 'Automatic pattern checks. They catch the common slips and can be wrong, so treat each one as a place to look, and use the request at the bottom of this page for a full correction.'));
    var cl = el('ul', { class: 'checks' });
    res.checks.forEach(function (c) {
      cl.appendChild(el('li', { class: 'check-' + c.level }, [el('strong', null, c.title), c.detail ? el('span', { class: 'meta' }, c.detail) : null]));
    });
    box.appendChild(cl);

    box.appendChild(el('h3', null, 'Task points'));
    box.appendChild(el('p', { class: 'meta' }, 'Tick each point you really answered. A missing point costs more than any grammar slip.'));
    var bl = el('ul', { class: 'ticks' });
    record.ticks = record.ticks || res.bullets.map(function (b) { return b.covered === true; });
    res.bullets.forEach(function (b, i) {
      var id = 'tick-' + record.id + '-' + i;
      var cb = el('input', { type: 'checkbox', id: id });
      cb.checked = !!record.ticks[i];
      cb.addEventListener('change', function () { record.ticks[i] = cb.checked; YKI.save(); });
      bl.appendChild(el('li', null, [cb, el('label', { for: id }, [el('span', { class: 'sv' }, b.b.sv), el('span', { class: 'meta' }, b.covered === false ? 'not found by the checker' : b.covered === true ? 'looks covered' : 'check yourself')])]));
    });
    box.appendChild(bl);

    if (res.notes.length) {
      box.appendChild(el('h3', null, 'Look again'));
      var nl = el('ul', { class: 'notes' });
      res.notes.forEach(function (n) {
        nl.appendChild(el('li', null, [el('span', { class: 'sv quote' }, n.quote), el('span', { class: 'note-msg' }, n.msg)]));
      });
      box.appendChild(nl);
    }

    box.appendChild(el('h2', null, 'Rate it yourself'));
    box.appendChild(el('p', { class: 'meta' }, 'Five questions a rater asks, with descriptions adapted from the official criteria for levels 2, 3 and 4. Be honest: the point is to see what to work on.'));
    record.ratings = record.ratings || {};
    var verdict = el('p', { class: 'estimate' });
    function drawVerdict() {
      var e = YKI.estimate(record.ratings);
      if (!e) { verdict.textContent = 'Answer all five to see your estimate.'; return; }
      record.est = e.level; YKI.save();
      /* weakest area; ties go to whatever matters most to a rater: task, linking, grammar, words, tone */
      var order = ['task', 'link', 'grammar', 'words', 'tone'];
      var weakest = YKI.rubric.slice().sort(function (a, b) { return (record.ratings[a.id] - record.ratings[b.id]) || (order.indexOf(a.id) - order.indexOf(b.id)); })[0];
      verdict.innerHTML = '';
      verdict.appendChild(el('strong', null, 'Your estimate: level ' + e.level + '. '));
      verdict.appendChild(document.createTextNode(e.level >= 3 ? 'That is the level you need. ' : 'Not there yet, and now you can see why. '));
      if (record.ratings[weakest.id] < 4) verdict.appendChild(document.createTextNode('To move up, work next on ' + weakest.focus + '.'));
    }
    YKI.rubric.forEach(function (r) {
      var fs = el('fieldset', { class: 'rate' }, el('legend', null, r.q));
      r.opts.forEach(function (o) {
        var id = 'r-' + record.id + '-' + r.id + '-' + o[0];
        var rb = el('input', { type: 'radio', name: 'r-' + record.id + '-' + r.id, id: id, value: String(o[0]) });
        rb.checked = record.ratings[r.id] === o[0];
        rb.addEventListener('change', function () { record.ratings[r.id] = o[0]; YKI.save(); drawVerdict(); });
        fs.appendChild(el('div', { class: 'rate-opt' }, [rb, el('label', { for: id }, [el('b', null, String(o[0])), ' ', o[1]])]));
      });
      box.appendChild(fs);
    });
    box.appendChild(verdict);
    drawVerdict();

    box.appendChild(el('h2', null, 'Model answer'));
    var holder = el('div');
    var showBtn = el('button', { type: 'button', class: 'btn' }, 'Show the model answer');
    showBtn.addEventListener('click', function () {
      holder.innerHTML = '';
      holder.appendChild(modelPanel(task));
      holder.appendChild(el('p', { class: 'meta' }, 'Compare move by move. Which sentences in the model do a job that your text skipped? Copy two of them into your next text.'));
      holder.appendChild(el('p', null, el('a', { class: 'btn', href: YKI.href('write/study/' + task.id) }, 'Memorise this model')));
    });
    holder.appendChild(showBtn);
    box.appendChild(holder);

    box.appendChild(el('h2', null, 'Get a full correction'));
    box.appendChild(el('p', null, 'The checks above cannot judge meaning or every ending. For a real correction, give your text to your teacher, or paste this ready-made request into a chat with Claude. It contains the task, your text and the rating scale.'));
    var promptText = YKI.feedbackPrompt(task, record.text);
    var status = el('span', { class: 'meta', role: 'status' });
    var area = el('textarea', { class: 'promptbox', readonly: true, rows: '6', 'aria-label': 'Feedback request' });
    area.value = promptText;
    var copy = el('button', { type: 'button', class: 'btn primary' }, 'Copy the request');
    copy.addEventListener('click', function () {
      function fallback() { area.focus(); area.select(); try { document.execCommand('copy'); status.textContent = 'Copied.'; } catch (e) { status.textContent = 'Select the text and copy it.'; } }
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(promptText).then(function () { status.textContent = 'Copied. Paste it into your chat.'; }, fallback);
      else fallback();
    });
    box.appendChild(el('div', { class: 'ex-actions' }, [copy, status]));
    box.appendChild(area);
    void s;
    return box;
  }

  function saveAttempt(task, text, extra) {
    var s = YKI.load();
    var rec = { id: String(Date.now()) + Math.floor(Math.random() * 1000), task: task.id, text: text, day: YKI.today(), words: YKI.words(text).length, est: null };
    if (extra) Object.keys(extra).forEach(function (k) { rec[k] = extra[k]; });
    s.texts.push(rec);
    delete s.drafts[task.id];
    YKI.save();
    return rec;
  }

  /* ============================== one task ============================== */
  function taskView(main, id) {
    var task = YKI.taskById(id);
    if (!task) { location.hash = '#/write'; return; }
    var info = YKI.typeInfo[task.type], th = themeOf(task), s = YKI.load();
    var stage = 'brief', timer = null, record = null;
    var draft = s.drafts[task.id] || '';

    function head() {
      main.innerHTML = '';
      main.appendChild(el('p', { class: 'crumb' }, [el('a', { href: YKI.href('write') }, 'Write'), ' / ', el('span', { class: 'sv' }, th.sv)]));
      main.appendChild(el('h1', null, task.title));
    }
    function brief() {
      stage = 'brief'; head();
      main.appendChild(taskCard(task));
      main.appendChild(el('div', { class: 'plan-hint' }, [
        el('p', null, [el('strong', null, 'Before you start: '), 'number the points, note two or three Swedish key words for each, decide du or ni.']),
        el('p', { class: 'meta' }, 'Time: ' + info.minutes + ' minutes · Length: ' + info.min + '–' + info.max + ' words (a working target, not an official rule) · Frame: '),
      ]));
      main.lastChild.lastChild.appendChild(el('a', { href: YKI.href('ref/skeletons') }, 'the three skeletons'));
      var prior = attemptsFor(task.id);
      main.appendChild(el('div', { class: 'ex-actions' }, [
        el('button', { type: 'button', class: 'btn primary', onclick: write }, draft ? 'Continue your draft' : 'Start writing · ' + info.minutes + ':00'),
        el('a', { class: 'btn quiet', href: YKI.href('write/study/' + task.id) }, 'Study the model instead')
      ]));
      if (prior.length) main.appendChild(el('p', { class: 'meta' }, ['You have written this task ' + prior.length + (prior.length > 1 ? ' times. ' : ' time. '), el('a', { href: YKI.href('write/text/' + prior[prior.length - 1].id) }, 'Open your last text')]));
    }
    function write() {
      stage = 'write'; head();
      var card = taskCard(task);
      main.appendChild(card);
      var count = el('span', { class: 'count' });
      var clock = el('span', { class: 'clock', 'aria-label': 'Time left' });
      function upd(v) {
        draft = v; s.drafts[task.id] = v; YKI.save();
        var n = YKI.words(v).length;
        count.textContent = n + ' words';
        count.className = 'count' + (n >= info.min && n <= info.max * 1.35 ? ' ok' : '');
      }
      var ta = paper(draft, upd);
      main.appendChild(el('div', { class: 'desk' }, [
        el('div', { class: 'desk-bar' }, [clock, count, el('span', { class: 'meta target' }, 'target ' + info.min + '–' + info.max), YKI.aoKeys(ta, true)]),
        ta
      ]));
      upd(draft);
      timer = new Timer(info.minutes * 60, clock);
      main.appendChild(el('div', { class: 'ex-actions' }, [
        el('button', { type: 'button', class: 'btn primary', onclick: function () {
          if (YKI.words(draft).length < 5) { ta.focus(); return; }
          var secs = timer.elapsed(); timer.stop();
          if (record) { record.text = draft; record.words = YKI.words(draft).length; record.ticks = null; delete s.drafts[task.id]; YKI.save(); }
          else record = saveAttempt(task, draft, { secs: secs });
          review();
        } }, 'Finish and check'),
        el('span', { class: 'meta' }, 'Your draft is saved as you type.')
      ]));
      setTimeout(function () { ta.focus(); }, 30);
    }
    function review() {
      stage = 'review'; head();
      main.appendChild(el('p', { class: 'meta' }, record.secs ? 'Written in ' + YKI.fmtTime(record.secs) + ' (limit ' + info.minutes + ':00).' : ''));
      main.appendChild(reviewNode(task, record, function () { draft = record.text; write(); }));
      main.appendChild(el('div', { class: 'ex-actions end' }, [
        el('a', { class: 'btn', href: YKI.href('write') }, 'All tasks'),
        el('a', { class: 'btn primary', href: YKI.href('today') }, 'Back to today')
      ]));
      window.scrollTo(0, 0);
    }
    brief();
    void stage;
  }

  function savedText(main, recId) {
    var rec = YKI.load().texts.filter(function (x) { return x.id === recId; })[0];
    var task = rec && YKI.taskById(rec.task);
    if (!task) { location.hash = '#/write'; return; }
    main.appendChild(el('p', { class: 'crumb' }, el('a', { href: YKI.href('write') }, 'Write')));
    main.appendChild(el('h1', null, task.title));
    main.appendChild(taskCard(task));
    main.appendChild(reviewNode(task, rec, null));
    main.appendChild(el('div', { class: 'ex-actions end' }, [
      el('a', { class: 'btn', href: YKI.href('write/task/' + task.id) }, 'Write this task again'),
      el('button', { type: 'button', class: 'btn quiet danger', onclick: function () {
        var s = YKI.load(); s.texts = s.texts.filter(function (x) { return x.id !== recId; }); YKI.save(); location.hash = '#/write';
      } }, 'Delete this text')
    ]));
  }

  /* ============================== mock exam ============================== */
  function mockView(main, id) {
    var mock = YKI.mocks.filter(function (m) { return m.id === id; })[0];
    if (!mock) { location.hash = '#/write'; return; }
    var tasks = mock.tasks.map(YKI.taskById), texts = ['', '', ''], current = 0, timer = null;

    function intro() {
      main.innerHTML = '';
      main.appendChild(el('p', { class: 'crumb' }, el('a', { href: YKI.href('write') }, 'Write')));
      main.appendChild(el('h1', null, mock.title));
      main.appendChild(el('p', { class: 'lead' }, 'Three tasks, 54 minutes, no pauses. Treat it as the real thing.'));
      main.appendChild(el('ol', { class: 'tight' }, [
        el('li', null, 'Put away notes, the phrase bank and any dictionary.'),
        el('li', null, 'Best of all: write on paper with a pencil while the clock runs here, then type your texts in afterwards for the checks.'),
        el('li', null, 'Suggested split: 12 minutes, 17 minutes, 22 minutes, and 3 minutes to check.'),
        el('li', null, 'You may do the tasks in any order. Answer all three.')
      ]));
      main.appendChild(el('div', { class: 'ex-actions' }, el('button', { type: 'button', class: 'btn primary', onclick: run }, 'Start the clock · 54:00')));
      if (YKI.isDone('mock:' + mock.id)) main.appendChild(el('p', { class: 'meta' }, 'You have done this mock before. The tasks are the same; your texts from last time are under “Your texts” on the Write page.'));
    }
    function run() {
      main.innerHTML = '';
      var clock = el('span', { class: 'clock big' });
      var tabs = el('div', { class: 'tabs', role: 'tablist' });
      var pane = el('div');
      main.appendChild(el('div', { class: 'mock-bar' }, [el('strong', null, mock.title), clock]));
      main.appendChild(tabs); main.appendChild(pane);
      timer = new Timer(54 * 60, clock);
      function draw() {
        tabs.innerHTML = ''; pane.innerHTML = '';
        tasks.forEach(function (t, i) {
          var n = YKI.words(texts[i]).length;
          tabs.appendChild(el('button', { type: 'button', role: 'tab', class: 'tab' + (i === current ? ' on' : ''), 'aria-selected': String(i === current), onclick: function () { current = i; draw(); } }, 'Task ' + (i + 1) + (n ? ' · ' + n + ' w' : '')));
        });
        var t = tasks[current], info = YKI.typeInfo[t.type];
        pane.appendChild(taskCard(t));
        var count = el('span', { class: 'count' }, YKI.words(texts[current]).length + ' words');
        var ta = paper(texts[current], function (v) { texts[current] = v; count.textContent = YKI.words(v).length + ' words'; });
        pane.appendChild(el('div', { class: 'desk' }, [el('div', { class: 'desk-bar' }, [count, el('span', { class: 'meta target' }, 'target ' + info.min + '–' + info.max), YKI.aoKeys(ta, true)]), ta]));
        pane.appendChild(el('div', { class: 'ex-actions' }, [
          current < 2 ? el('button', { type: 'button', class: 'btn', onclick: function () { current++; draw(); window.scrollTo(0, 0); } }, 'Next task') : null,
          el('button', { type: 'button', class: 'btn primary', onclick: handIn }, 'Hand in all three')
        ]));
      }
      draw();
    }
    function handIn() {
      var empty = texts.filter(function (t) { return YKI.words(t).length < 5; }).length;
      if (empty && !handIn.warned) {
        handIn.warned = true;
        main.appendChild(el('p', { class: 'feedback bad', role: 'alert' }, empty + ' task' + (empty > 1 ? 's are' : ' is') + ' still empty. In the exam every task needs a text. Press “Hand in all three” again to hand in anyway.'));
        return;
      }
      var secs = timer.elapsed(); timer.stop();
      var recs = tasks.map(function (t, i) { return YKI.words(texts[i]).length >= 5 ? saveAttempt(t, texts[i], { mock: mock.id }) : null; });
      YKI.mark('mock:' + mock.id);
      main.innerHTML = '';
      main.appendChild(el('h1', null, mock.title + ': handed in'));
      main.appendChild(el('p', { class: 'lead' }, 'Time used: ' + YKI.fmtTime(secs) + ' of 54:00. ' + (secs > 54 * 60 ? 'Over time. Next time, stop each task when its minutes are up.' : 'Inside the limit.')));
      tasks.forEach(function (t, i) {
        var d = el('details', { class: 'mock-result' }, el('summary', null, 'Task ' + (i + 1) + ': ' + t.title + (recs[i] ? ' · ' + recs[i].words + ' words' : ' · not answered')));
        if (i === 0) d.open = true;
        d.appendChild(taskCard(t));
        if (recs[i]) d.appendChild(reviewNode(t, recs[i], null));
        else d.appendChild(el('p', { class: 'feedback bad' }, 'No text. An empty task cannot earn a level. Even four simple sentences that cover the points would count.'));
        main.appendChild(d);
      });
      main.appendChild(el('div', { class: 'ex-actions end' }, el('a', { class: 'btn primary', href: YKI.href('today') }, 'Back to today')));
      window.scrollTo(0, 0);
    }
    intro();
  }

  /* ============================== study a model ============================== */
  function studyView(main, id) {
    var task = YKI.taskById(id);
    if (!task) { location.hash = '#/write'; return; }
    var mode = 'read';
    function draw() {
      main.innerHTML = '';
      main.appendChild(el('p', { class: 'crumb' }, [el('a', { href: YKI.href('write') }, 'Write'), ' / ', el('a', { href: YKI.href('write/task/' + task.id) }, task.title)]));
      main.appendChild(el('h1', null, 'Memorise the model'));
      main.appendChild(taskCard(task));
      var tabs = el('div', { class: 'tabs', role: 'tablist' });
      [['read', '1 Read'], ['gaps', '2 Fill the gaps'], ['rebuild', '3 Rebuild from English']].forEach(function (m) {
        tabs.appendChild(el('button', { type: 'button', role: 'tab', class: 'tab' + (mode === m[0] ? ' on' : ''), 'aria-selected': String(mode === m[0]), onclick: function () { mode = m[0]; draw(); } }, m[1]));
      });
      main.appendChild(tabs);
      if (mode === 'read') {
        main.appendChild(el('p', { class: 'meta' }, 'Read it aloud once. Look at the margin: each sentence has one job. Then go to step 2.'));
        main.appendChild(modelPanel(task));
      } else if (mode === 'gaps') gaps();
      else rebuild();
    }
    function gaps() {
      var ratio = 0.3;
      var holder = el('div');
      main.appendChild(holder);
      function build() {
        holder.innerHTML = '';
        holder.appendChild(el('p', { class: 'meta' }, 'Type the missing words. Small words and verbs disappear first, because they are what goes wrong in the exam.'));
        var inputs = [];
        var sheet = el('div', { class: 'model gapsheet' });
        var para = null, k = Math.floor(Math.random() * 3);
        task.model.forEach(function (seg) {
          if (seg[0].charAt(0) === '+' || !para) { para = el('p', { class: 'sv gap-para' }); sheet.appendChild(para); }
          seg[1].split(' ').forEach(function (tok, ti) {
            var m = tok.match(/^([^A-Za-zÅÄÖåäö0-9]*)([A-Za-zÅÄÖåäö0-9-]+)(.*)$/);
            k++;
            /* names and numbers stay visible: they are not what the learner needs to recall */
            var isName = m && ti > 0 && /^[A-ZÅÄÖ]/.test(m[2]);
            if (m && !isName && m[2].length >= 2 && !/^\d/.test(m[2]) && !/@/.test(tok) && Math.random() < ratio + (k % 3 === 0 ? 0.1 : 0)) {
              var inp = el('input', { class: 'gapin sv', type: 'text', size: String(Math.max(2, m[2].length)), autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false', lang: 'sv', 'aria-label': 'missing word' });
              inp.dataset.answer = m[2];
              inputs.push(inp);
              if (m[1]) para.appendChild(document.createTextNode(m[1]));
              para.appendChild(inp);
              para.appendChild(document.createTextNode(m[3] + ' '));
            } else para.appendChild(document.createTextNode(tok + ' '));
          });
        });
        holder.appendChild(sheet);
        var out = el('p', { class: 'estimate', role: 'status' });
        holder.appendChild(el('div', { class: 'ex-actions' }, [
          el('button', { type: 'button', class: 'btn primary', onclick: function () {
            var ok = 0;
            inputs.forEach(function (inp) {
              var good = YKI.norm(inp.value) === YKI.norm(inp.dataset.answer);
              inp.classList.remove('is-right', 'is-wrong');
              inp.classList.add(good ? 'is-right' : 'is-wrong');
              if (!good) { inp.title = inp.dataset.answer; inp.placeholder = inp.dataset.answer; if (!inp.value) inp.value = ''; }
              if (good) ok++;
            });
            out.textContent = ok + ' of ' + inputs.length + ' right. ' + (ok === inputs.length ? 'Now try with more gaps, or go to step 3.' : 'Empty the red boxes to see the word, then type it.');
          } }, 'Check'),
          el('button', { type: 'button', class: 'btn', onclick: function () { build(); } }, 'New gaps'),
          el('button', { type: 'button', class: 'btn', onclick: function () { ratio = Math.min(0.7, ratio + 0.2); build(); } }, 'More gaps')
        ]));
        holder.appendChild(out);
      }
      build();
    }
    function rebuild() {
      var segs = task.model.map(function (s) { return { role: s[0].replace('+', ''), sv: s[1], en: s[2] }; });
      var i = 0, good = 0, miss = [];
      var holder = el('div');
      main.appendChild(holder);
      function show() {
        holder.innerHTML = '';
        if (i >= segs.length) {
          holder.appendChild(el('div', { class: 'empty' }, [
            el('h2', null, good + ' of ' + segs.length + ' sentences from memory'),
            el('p', null, good === segs.length ? 'You own this text. Its sentences will be there when a similar task comes up.' : 'Do it again tomorrow. Sentences come back faster the second time.'),
            el('div', { class: 'ex-actions' }, [el('button', { type: 'button', class: 'btn primary', onclick: function () { i = 0; good = 0; miss = []; show(); } }, 'Again'), el('a', { class: 'btn', href: YKI.href('write') }, 'All tasks')])
          ]));
          return;
        }
        var sg = segs[i];
        holder.appendChild(el('p', { class: 'meta' }, 'Sentence ' + (i + 1) + ' of ' + segs.length + ' · ' + (YKI.roleNames[sg.role] || sg.role)));
        var item = { kind: 'type', q: sg.en, answers: [sg.sv], why: '' };
        var counted = false;
        var w = YKI.widget(item, function (ok) {
          if (ok) { good++; counted = true; } else miss.push(sg);
          var b = el('button', { type: 'button', class: 'btn primary next' }, 'Next');
          b.addEventListener('click', function () { i++; show(); });
          w.appendChild(el('div', { class: 'ex-actions end' }, b));
          setTimeout(function () { b.focus(); }, 40);
        }, { focus: true, onOverride: function () { if (!counted) { good++; counted = true; } } });
        holder.appendChild(el('article', { class: 'card' }, w));
      }
      show();
    }
    draw();
  }
})();

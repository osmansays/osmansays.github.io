/* YKI Skriva — reusable exercise components.
   YKI.widget(item, onAnswer) returns a DOM node for one exercise.
   item.kind: 'mc' (choose), 'order' (build from tiles), 'type' (type the answer).
   onAnswer(correct:boolean, item, detail) is called once, when the learner has answered. */
(function () {
  'use strict';
  var YKI = window.YKI, el = YKI.el;

  function gapHTML(q) {
    return YKI.esc(q).replace(/___/g, '<span class="gap" aria-label="gap"></span>');
  }
  function looksSwedish(q) { return /___/.test(q) || /[åäöÅÄÖ]/.test(q); }

  function whyBox(ok, title, bodyNodes) {
    return el('div', { class: 'feedback ' + (ok ? 'good' : 'bad'), role: 'status' }, [
      el('strong', { class: 'verdict' }, title)
    ].concat(bodyNodes || []));
  }

  /* ---------- multiple choice ---------- */
  function mc(item, done) {
    var answered = false;
    var correct = item.opts[0];
    var opts = YKI.shuffle(item.opts);
    var box = el('div', { class: 'ex ex-mc' });
    var isCloze = /___/.test(item.q);
    box.appendChild(el('p', { class: 'ex-q' + (isCloze ? ' sv' : ''), html: gapHTML(item.q) }));
    if (item.en) box.appendChild(el('p', { class: 'ex-en' }, item.en));
    var svOpts = isCloze || !!item.cat || !!item.svOpts;
    var list = el('div', { class: 'opts' + (opts.join('').length > 60 ? ' stack' : '') });
    var out = el('div', { class: 'ex-out' });
    opts.forEach(function (o) {
      var b = el('button', { type: 'button', class: 'opt' + (svOpts ? ' sv' : '') }, o);
      b.addEventListener('click', function () {
        if (answered) return;
        answered = true;
        var ok = o === correct;
        Array.prototype.forEach.call(list.children, function (c) {
          c.disabled = true;
          if (c.textContent === correct) c.classList.add('is-right');
        });
        if (!ok) b.classList.add('is-wrong');
        out.appendChild(whyBox(ok, ok ? 'Correct.' : 'Not this time.', [el('p', { class: 'why' }, item.why)]));
        done(ok, item);
      });
      list.appendChild(b);
    });
    box.appendChild(list);
    box.appendChild(out);
    return box;
  }

  /* ---------- build the sentence from tiles ---------- */
  function order(item, done) {
    var answered = false;
    var target = item.tiles.slice();
    var bank = YKI.shuffle(target.map(function (t, i) { return { t: t, i: i }; }));
    if (target.length > 1) {
      var guard = 0;
      while (bank.every(function (b, k) { return b.t === target[k]; }) && guard++ < 10) bank = YKI.shuffle(bank);
    }
    var placed = [];
    var box = el('div', { class: 'ex ex-order' });
    box.appendChild(el('p', { class: 'ex-q' }, item.prompt || (item.en && !/^(Put|Rebuild)/.test(item.en) ? 'Build the sentence: ' + item.en : item.en || 'Build the sentence.')));
    var line = el('div', { class: 'line sv', 'aria-label': 'Your sentence' });
    var pool = el('div', { class: 'pool sv', 'aria-label': 'Word tiles' });
    var out = el('div', { class: 'ex-out' });
    var long = target.some(function (t) { return t.length > 22; });
    if (long) { line.classList.add('stack'); pool.classList.add('stack'); }
    var checkBtn = el('button', { type: 'button', class: 'btn', disabled: true }, 'Check');

    function draw() {
      line.innerHTML = ''; pool.innerHTML = '';
      if (item.lock) line.appendChild(el('span', { class: 'tile locked' }, item.lock));
      placed.forEach(function (p, k) {
        line.appendChild(el('button', { type: 'button', class: 'tile', disabled: answered, title: 'Take back', onclick: function () { placed.splice(k, 1); bank.push(p); draw(); } }, p.t));
      });
      if (!placed.length && !item.lock) line.appendChild(el('span', { class: 'ghost' }, 'Tap the tiles in order'));
      bank.forEach(function (p, k) {
        pool.appendChild(el('button', { type: 'button', class: 'tile', disabled: answered, onclick: function () { bank.splice(k, 1); placed.push(p); draw(); } }, p.t));
      });
      checkBtn.disabled = answered || bank.length > 0;
      pool.hidden = answered && bank.length === 0;
    }
    checkBtn.addEventListener('click', function () {
      if (answered) return;
      answered = true;
      var ok = placed.map(function (p) { return p.t; }).join(' ') === target.join(' ');
      draw();
      line.classList.add(ok ? 'is-right' : 'is-wrong');
      var full = (item.lock ? item.lock + ' ' : '') + target.join(' ');
      var kids = [];
      if (!ok) kids.push(el('p', { class: 'sv answer' }, long ? target.join(' → ') : full + (/[.!?]$/.test(full) ? '' : '.')));
      kids.push(el('p', { class: 'why' }, item.why));
      out.appendChild(whyBox(ok, ok ? 'Correct.' : 'Not quite. The order is:', kids));
      checkBtn.remove();
      done(ok, item);
    });
    draw();
    box.appendChild(line); box.appendChild(pool);
    box.appendChild(el('div', { class: 'ex-actions' }, checkBtn));
    box.appendChild(out);
    return box;
  }

  /* ---------- type the answer ---------- */
  function type(item, done, opts) {
    opts = opts || {};
    var answered = false;
    var box = el('div', { class: 'ex ex-type' });
    if (item.bad) {
      box.appendChild(el('p', { class: 'ex-q' }, item.q));
      box.appendChild(el('p', { class: 'sv badline' }, item.bad));
    } else {
      box.appendChild(el('p', { class: 'ex-q' + (/___/.test(item.q) ? ' sv' : ''), html: gapHTML(item.q) }));
    }
    if (item.en) box.appendChild(el('p', { class: 'ex-en' }, item.en));
    if (opts.hint) box.appendChild(el('p', { class: 'hint sv' }, opts.hint));
    var longAnswer = YKI.norm(item.answers[0]).length > 34;
    var field = longAnswer
      ? el('textarea', { class: 'field sv', rows: '2', autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false', lang: 'sv', 'aria-label': 'Your answer in Swedish' })
      : el('input', { class: 'field sv', type: 'text', autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false', lang: 'sv', 'aria-label': 'Your answer in Swedish' });
    var out = el('div', { class: 'ex-out' });
    var checkBtn = el('button', { type: 'button', class: 'btn' }, 'Check');
    function submit() {
      if (answered) return;
      if (!field.value.trim()) { field.focus(); return; }
      answered = true;
      field.readOnly = true;
      var res = YKI.check(field.value, item.answers, { bad: item.bad });
      var ok = res.verdict !== 'bad';
      var kids = [];
      if (res.verdict === 'almost') kids.push(el('p', { class: 'sv answer', html: YKI.diffHTML(field.value, res.best) }));
      if (res.verdict === 'bad') kids.push(el('p', { class: 'sv answer', html: YKI.diffHTML(field.value, res.best) }));
      if (res.articleMissed) kids.push(el('p', { class: 'why' }, 'Learn it with its article: ' + res.best));
      if (res.caseIssue) kids.push(el('p', { class: 'why' }, 'Check the capital letters: ' + res.best));
      if (item.why) kids.push(el('p', { class: 'why' }, item.why));
      if (opts.extra) kids.push(opts.extra);
      var title = res.verdict === 'ok' ? 'Correct.' : res.verdict === 'almost' ? (res.caseIssue ? 'Almost.' : 'Almost. Check the spelling:') : 'Not yet. Compare:';
      var fb = whyBox(res.verdict === 'ok', title, kids);
      if (res.verdict === 'almost') fb.className = 'feedback near';
      field.classList.add(res.verdict === 'ok' ? 'is-right' : res.verdict === 'almost' ? 'is-near' : 'is-wrong');
      out.appendChild(fb);
      checkBtn.remove(); keys.remove();
      if (res.verdict === 'bad' && opts.onOverride) {
        var ov = el('button', { type: 'button', class: 'btn quiet' }, 'My answer was also right');
        ov.addEventListener('click', function () { ov.remove(); fb.className = 'feedback good'; fb.querySelector('.verdict').textContent = 'Counted as correct.'; opts.onOverride(); });
        out.appendChild(ov);
      }
      done(ok, item, { verdict: res.verdict });
    }
    field.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); e.stopPropagation(); submit(); }
    });
    checkBtn.addEventListener('click', submit);
    var keys = YKI.aoKeys(field);
    box.appendChild(field);
    box.appendChild(el('div', { class: 'ex-actions' }, [keys, checkBtn]));
    box.appendChild(out);
    if (opts.focus) setTimeout(function () { field.focus(); }, 30);
    return box;
  }

  YKI.widget = function (item, onAnswer, opts) {
    var fired = false;
    function done(ok, it, detail) {
      if (fired) return;
      fired = true;
      onAnswer(ok, it, detail || {});
    }
    if (item.kind === 'mc') return mc(item, done);
    if (item.kind === 'order') return order(item, done);
    return type(item, done, opts);
  };

  /* Record a drill result (used by lessons and by the drills page). */
  YKI.recordDrill = function (item, ok) {
    if (!item.id) return;
    var s = YKI.load();
    var d = s.drills[item.id] || (s.drills[item.id] = { ok: 0, bad: 0, last: 0 });
    if (ok) d.ok++; else d.bad++;
    d.last = YKI.today();
    d.lastOk = !!ok;
    YKI.save();
  };
})();

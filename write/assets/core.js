/* YKI Skriva — core: namespace, storage, dates, spaced repetition, text tools.
   Plain scripts (no modules, no network) so the app runs by double-clicking index.html. */
(function () {
  'use strict';
  var YKI = (window.YKI = window.YKI || {});

  /* ---------- tiny DOM helper ---------- */
  YKI.el = function (tag, attrs, kids) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        var v = attrs[k];
        if (v == null || v === false) return;
        if (k === 'class') node.className = v;
        else if (k === 'html') node.innerHTML = v;
        else if (k === 'text') node.textContent = v;
        else if (k.slice(0, 2) === 'on' && typeof v === 'function') node.addEventListener(k.slice(2), v);
        else node.setAttribute(k, v === true ? '' : v);
      });
    }
    (Array.isArray(kids) ? kids : kids == null ? [] : [kids]).forEach(function (c) {
      if (c == null || c === false) return;
      node.appendChild(typeof c === 'string' || typeof c === 'number' ? document.createTextNode(String(c)) : c);
    });
    return node;
  };
  YKI.esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };

  /* ---------- where are we? (index.html or a page inside lessons/ or reference/) ---------- */
  YKI.page = window.YKI_PAGE || { type: 'app' };
  YKI.base = YKI.page.type === 'app' ? '' : '../';
  YKI.href = function (route) {
    return (YKI.page.type === 'app' ? '' : '../index.html') + '#/' + route;
  };

  /* ---------- storage (falls back to memory when the browser blocks it) ---------- */
  var KEY = 'yki-sv-skriva-v1';
  var memory = null;
  function blank() {
    return { v: 1, start: null, dayOverride: null, cards: {}, drills: {}, done: {}, lessons: {}, texts: [], drafts: {}, newToday: {}, settings: { newPerDay: 30, examDate: '' } };
  }
  YKI.storageOK = true;
  YKI.load = function () {
    if (memory) return memory;
    try {
      var raw = window.localStorage.getItem(KEY);
      memory = raw ? JSON.parse(raw) : blank();
    } catch (e) {
      YKI.storageOK = false;
      memory = blank();
    }
    var b = blank();
    Object.keys(b).forEach(function (k) { if (memory[k] == null) memory[k] = b[k]; });
    if (memory.start == null) { memory.start = YKI.today(); YKI.save(); }
    return memory;
  };
  YKI.save = function () {
    try { window.localStorage.setItem(KEY, JSON.stringify(memory)); }
    catch (e) { YKI.storageOK = false; }
  };
  YKI.reset = function () { memory = blank(); memory.start = YKI.today(); YKI.save(); };
  YKI.exportState = function () { return JSON.stringify(YKI.load()); };
  YKI.importState = function (text) {
    var obj = JSON.parse(text);
    if (!obj || typeof obj !== 'object' || !obj.cards) throw new Error('Not a progress file');
    memory = obj; YKI.save();
  };

  /* ---------- days ---------- */
  YKI.today = function () {
    var d = new Date();
    return Math.floor((d.getTime() - d.getTimezoneOffset() * 60000) / 86400000);
  };
  YKI.planDay = function () {
    var s = YKI.load();
    if (s.dayOverride) return s.dayOverride;
    return Math.max(1, Math.min(10, YKI.today() - s.start + 1));
  };
  YKI.setPlanDay = function (n) {
    var s = YKI.load();
    s.start = YKI.today() - (n - 1); s.dayOverride = null; YKI.save();
  };
  YKI.mark = function (key, val) { var s = YKI.load(); s.done[key] = val === undefined ? true : val; YKI.save(); };
  YKI.isDone = function (key) { return !!YKI.load().done[key]; };

  /* ---------- spaced repetition ----------
     Boxes 0..5. A card moves up one box per correct typed recall.
     Gaps are short on purpose: the whole course is 10 days. */
  YKI.INTERVALS = [0, 1, 2, 3, 5, 8];
  YKI.cardState = function (id) { return YKI.load().cards[id] || null; };
  YKI.grade = function (id, result) {
    // result: 'ok' | 'almost' | 'bad' | 'learned' (first successful recall of a new card)
    var s = YKI.load(), t = YKI.today();
    var c = s.cards[id] || (s.cards[id] = { b: 0, due: t, ok: 0, bad: 0 });
    if (result === 'learned') { c.b = Math.max(c.b, 1); c.due = t + 1; c.ok++; }
    else if (result === 'ok') { c.b = Math.min(5, c.b + 1); c.due = t + YKI.INTERVALS[c.b]; c.ok++; }
    else if (result === 'almost') { c.b = Math.max(1, c.b); c.due = t + 1; c.ok++; }
    else { c.b = 1; c.due = t + 1; c.bad++; }
    YKI.save();
    return c;
  };
  YKI.touchNew = function (id) {
    var s = YKI.load(), t = YKI.today();
    if (!s.cards[id]) { s.cards[id] = { b: 0, due: t, ok: 0, bad: 0 }; s.newToday[t] = (s.newToday[t] || 0) + 1; YKI.save(); }
  };

  /* ---------- text tools ---------- */
  YKI.norm = function (s) {
    return YKI.normCase(s).toLowerCase();
  };
  /* Same as norm but keeps capital letters, except the very first one (people often skip it when typing). */
  YKI.normCase = function (s) {
    s = String(s)
      .replace(/…|\.\.\./g, ' ')
      .replace(/[.,!?;:"“”'’()\/–—-]/g, ' ')
      .replace(/\s+/g, ' ').trim()
      /* both spellings are correct Swedish, so treat them as the same */
      .replace(/(^| )([iI]) (dag|morgon|går|kväll)(?= |$)/g, function (m, sp, i, w) { return sp + i + w; });
    return s.charAt(0).toLowerCase() + s.slice(1);
  };
  YKI.stripArticle = function (s) { return s.replace(/^(en|ett|att) /, ''); };
  YKI.lev = function (a, b) {
    if (a === b) return 0;
    var m = a.length, n = b.length, prev = [], cur = [], i, j;
    for (j = 0; j <= n; j++) prev[j] = j;
    for (i = 1; i <= m; i++) {
      cur = [i];
      for (j = 1; j <= n; j++) {
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a.charCodeAt(i - 1) === b.charCodeAt(j - 1) ? 0 : 1));
      }
      prev = cur;
    }
    return prev[n];
  };
  /* Compare a typed answer with one or more accepted answers.
     Returns {verdict:'ok'|'almost'|'bad', best, articleMissed, caseIssue}.
     - Short answers (a word, a verb form) must be exact: one letter is the difference between betalat and betalar.
     - Longer answers allow a slip or two and come back as 'almost', with the difference shown.
     - opts.bad is the faulty sentence of a "repair" item: an answer that is no closer to the right
       sentence than the faulty one was is never accepted. */
  YKI.check = function (typed, accepted, opts) {
    opts = opts || {};
    var t = YKI.norm(typed), tc = YKI.normCase(typed), best = null, bestD = Infinity, articleMissed = false;
    (Array.isArray(accepted) ? accepted : [accepted]).forEach(function (ans) {
      var a = YKI.norm(ans), d = YKI.lev(t, a);
      if (d !== 0 && YKI.stripArticle(a) !== a && YKI.lev(t, YKI.stripArticle(a)) === 0) { d = 0.5; }
      if (d < bestD) { bestD = d; best = ans; }
    });
    var len = YKI.norm(best).length, verdict;
    var tol = len < 12 ? 0 : len < 45 ? 1 : Math.min(3, Math.floor(len * 0.05));
    if (bestD === 0) verdict = 'ok';
    else if (bestD === 0.5) { verdict = 'ok'; articleMissed = true; }
    else if (bestD <= tol) verdict = 'almost';
    else verdict = 'bad';
    var caseIssue = false;
    if (verdict === 'ok' && !articleMissed && tc !== YKI.normCase(best)) { caseIssue = true; verdict = opts.bad ? 'bad' : 'almost'; }
    if (opts.bad && verdict === 'almost' && YKI.lev(t, YKI.norm(opts.bad)) <= bestD) verdict = 'bad';
    return { verdict: verdict, best: best, articleMissed: articleMissed, caseIssue: caseIssue };
  };
  /* Word-level diff: marks which words of the correct answer are missing or different in the attempt. */
  YKI.diffWords = function (typed, correct) {
    var a = YKI.norm(typed).split(' ').filter(Boolean), raw = String(correct).split(/\s+/).filter(Boolean);
    var b = raw.map(function (w) { return YKI.norm(w); });
    var m = a.length, n = b.length, L = [], i, j;
    for (i = 0; i <= m; i++) { L[i] = []; for (j = 0; j <= n; j++) L[i][j] = 0; }
    for (i = m - 1; i >= 0; i--) for (j = n - 1; j >= 0; j--)
      L[i][j] = a[i] === b[j] ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
    var out = []; i = 0; j = 0;
    while (j < n) {
      if (i < m && a[i] === b[j]) { out.push({ w: raw[j], ok: true }); i++; j++; }
      else if (i < m && L[i + 1][j] >= L[i][j + 1]) { i++; }
      else { out.push({ w: raw[j], ok: b[j] === '' }); j++; }
    }
    return out;
  };
  YKI.diffHTML = function (typed, correct) {
    return YKI.diffWords(typed, correct).map(function (p) {
      return p.ok ? YKI.esc(p.w) : '<mark class="miss">' + YKI.esc(p.w) + '</mark>';
    }).join(' ');
  };
  YKI.words = function (text) {
    var m = String(text).match(/[A-Za-zÅÄÖåäöÉéÜü0-9]+(?:[-'’:][A-Za-zÅÄÖåäö0-9]+)*/g);
    return m || [];
  };
  YKI.shuffle = function (arr) {
    var a = arr.slice(), i, j, t;
    for (i = a.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  };
  YKI.fmtTime = function (sec) {
    sec = Math.max(0, Math.round(sec));
    var m = Math.floor(sec / 60), s = sec % 60;
    return m + ':' + (s < 10 ? '0' : '') + s;
  };

  /* Insert a character at the cursor of an input/textarea (for the å ä ö keys). */
  YKI.insertAt = function (field, ch) {
    var s = field.selectionStart, e = field.selectionEnd, v = field.value;
    if (s == null) { field.value = v + ch; }
    else { field.value = v.slice(0, s) + ch + v.slice(e); field.selectionStart = field.selectionEnd = s + ch.length; }
    field.focus();
    field.dispatchEvent(new Event('input', { bubbles: true }));
  };
  YKI.aoKeys = function (field, upper) {
    var chars = upper ? ['å', 'ä', 'ö', 'Å', 'Ä', 'Ö'] : ['å', 'ä', 'ö'];
    return YKI.el('span', { class: 'aokeys', 'aria-label': 'Swedish letters' }, chars.map(function (ch) {
      return YKI.el('button', { type: 'button', class: 'key sv', tabindex: '-1', title: 'Insert ' + ch, onclick: function () { YKI.insertAt(field, ch); } }, ch);
    }));
  };
})();

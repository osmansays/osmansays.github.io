/* Metro prep — shared interactive components.
   Every lesson loads this one file. Components are declared in HTML with
   classes and data attributes, so a new lesson never needs new script.

   <span data-m="1,2;3,4"></span>            renders a matrix
   <div class="q mcq" data-answer="2">       multiple choice (0-based index of the right button.opt)
   <div class="q num" data-answer="5/14">    numeric answer; fractions, decimals or % accepted
       data-fields="x;y" data-answer="3;5"   several labelled fields
       data-set                              order-free list, e.g. roots "-3,3"
   <div class="q matq" data-answer="6,8;10,12">  matrix answer grid
   <div class="attempt" id="...">            write-first exercise: textarea, then model answer + rubric
   <div class="timer" data-minutes="70">     countdown timer
   <button class="done-toggle" data-lesson="0002">  marks a lesson done on this device
   Any .explain inside a question stays hidden until the first answer.
*/
(function () {
  "use strict";

  // ---------- storage (optional; the page works without it) ----------
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage blocked: ignore */ } }
  };

  // ---------- number parsing ----------
  function parseNum(raw) {
    if (raw == null) return NaN;
    let s = String(raw).trim().toLowerCase()
      .replace(/[−–—]/g, "-")   // unicode minus / dashes
      .replace(/\s+/g, "")
      .replace(/^[a-z]+\(?[a-z0-9]*\)?=/, ""); // strip "x=", "p(a)=", "f'(2)="
    let pct = false;
    if (s.endsWith("%")) { pct = true; s = s.slice(0, -1); }
    s = s.replace(",", ".");
    let v;
    const m = s.match(/^(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)$/);
    if (m) v = parseFloat(m[1]) / parseFloat(m[2]);
    else if (/^-?(\d+\.?\d*|\.\d+)$/.test(s)) v = parseFloat(s);
    else v = NaN;
    return pct ? v / 100 : v;
  }
  function close(a, b) {
    // accepts 0.33 for 1/3 and 0.04 for 0.0396, but not a genuinely different answer
    const tol = Math.max(0.002, Math.abs(b) * 0.012);
    return Math.abs(a - b) <= tol;
  }
  function splitList(s) { return String(s).split(/[,;\s]+/).filter(Boolean); }
  function sameSet(given, expected) {
    const g = splitList(given).map(parseNum), e = splitList(expected).map(parseNum);
    if (g.length !== e.length || g.some(isNaN)) return false;
    const used = new Array(e.length).fill(false);
    return g.every(x => { const i = e.findIndex((y, j) => !used[j] && close(x, y)); if (i < 0) return false; used[i] = true; return true; });
  }

  // ---------- scoring ----------
  const score = { total: 0, first: 0, answered: 0 };
  let bar = null;
  function renderScore() {
    if (!bar) return;
    bar.innerHTML = `<span>Answered <b>${score.answered}</b> / ${score.total}</span><span>Right first try <b>${score.first}</b></span>`;
  }
  function register(q) {
    score.total++;
    q._tries = 0;
    q.querySelectorAll(".explain").forEach(e => { e.hidden = true; });
  }
  function result(q, ok, msg) {
    q._tries++;
    if (q._tries === 1) { score.answered++; if (ok) score.first++; }
    else if (ok && !q._solved) { /* later success does not count as first-try */ }
    if (ok) q._solved = true;
    let fb = q.querySelector(".feedback");
    if (!fb) { fb = document.createElement("div"); fb.className = "feedback"; fb.setAttribute("aria-live", "polite"); q.appendChild(fb); }
    fb.className = "feedback " + (ok ? "right" : "wrong");
    fb.textContent = msg || (ok ? "Correct." : "Not yet. Check your working and try again, or open the explanation.");
    q.querySelectorAll(".explain").forEach(e => { e.hidden = false; });
    // move feedback above the explanation
    const ex = q.querySelector(".explain"); if (ex) q.insertBefore(fb, ex);
    renderScore();
  }

  // ---------- matrices ----------
  function renderMatrices(root) {
    root.querySelectorAll("[data-m]").forEach(el => {
      const rows = el.dataset.m.split(";").map(r => r.split(","));
      el.classList.add("matrix");
      el.style.gridTemplateColumns = `repeat(${rows[0].length}, auto)`;
      el.setAttribute("role", "img");
      el.setAttribute("aria-label", "matrix " + rows.map(r => r.join(" ")).join(", next row "));
      el.innerHTML = rows.flat().map(c => `<span>${c.trim().replace(/^-/, "−")}</span>`).join("");
    });
  }

  // ---------- multiple choice ----------
  function initMcq(q) {
    register(q);
    const right = parseInt(q.dataset.answer, 10);
    const opts = [...q.querySelectorAll(".opt")];
    opts.forEach((b, i) => {
      b.type = "button";
      b.addEventListener("click", () => {
        if (q._solved) return;
        const ok = i === right;
        b.classList.add(ok ? "right" : "wrong");
        if (ok) opts.forEach(o => o.disabled = o !== b);
        result(q, ok);
      });
    });
  }

  // ---------- numeric ----------
  let uid = 0;
  function initNum(q) {
    register(q);
    const answers = q.dataset.answer.split(";");
    const labels = (q.dataset.fields || "").split(";").filter(Boolean);
    const isSet = q.hasAttribute("data-set");
    const row = document.createElement("div");
    row.className = "answer-row";
    const inputs = answers.map((_, i) => {
      const id = "q" + (++uid) + "-" + i;
      const wrap = document.createElement("label");
      wrap.style.display = "inline-flex"; wrap.style.gap = ".4rem"; wrap.style.alignItems = "center";
      const lab = labels[i] || (isSet ? "values" : "answer");
      wrap.innerHTML = `<span class="small">${lab}</span>`;
      const inp = document.createElement("input");
      inp.type = "text"; inp.id = id; inp.autocomplete = "off"; inp.spellcheck = false;
      inp.setAttribute("inputmode", isSet ? "text" : "decimal");
      if (isSet) inp.placeholder = "e.g. 2, -1";
      inp.addEventListener("keydown", e => { if (e.key === "Enter") check(); });
      wrap.appendChild(inp); row.appendChild(wrap);
      return inp;
    });
    const btn = document.createElement("button");
    btn.type = "button"; btn.className = "primary"; btn.textContent = "Check";
    row.appendChild(btn);
    const anchor = q.querySelector(".explain");
    q.insertBefore(row, anchor || null);
    function check() {
      if (inputs.some(i => !i.value.trim())) return;
      let all = true;
      inputs.forEach((inp, i) => {
        const ok = isSet ? sameSet(inp.value, answers[i]) : close(parseNum(inp.value), parseNum(answers[i]));
        inp.classList.toggle("right", ok); inp.classList.toggle("wrong", !ok);
        all = all && ok;
      });
      result(q, all);
    }
    btn.addEventListener("click", check);
  }

  // ---------- matrix answer ----------
  function initMatq(q) {
    register(q);
    const rows = q.dataset.answer.split(";").map(r => r.split(","));
    const grid = document.createElement("div");
    grid.className = "mat-in";
    grid.style.gridTemplateColumns = `repeat(${rows[0].length}, auto)`;
    const cells = [];
    rows.forEach((r, ri) => r.forEach((v, ci) => {
      const inp = document.createElement("input");
      inp.type = "text"; inp.id = "m" + (++uid); inp.autocomplete = "off";
      inp.setAttribute("inputmode", "decimal");
      inp.setAttribute("aria-label", `row ${ri + 1}, column ${ci + 1}`);
      inp._ans = v;
      grid.appendChild(inp); cells.push(inp);
    }));
    const row = document.createElement("div");
    row.className = "answer-row";
    const btn = document.createElement("button");
    btn.type = "button"; btn.className = "primary"; btn.textContent = "Check";
    row.append(grid, btn);
    q.insertBefore(row, q.querySelector(".explain") || null);
    btn.addEventListener("click", () => {
      if (cells.some(c => !c.value.trim())) return;
      let all = true;
      cells.forEach(c => { const ok = close(parseNum(c.value), parseNum(c._ans)); c.classList.toggle("right", ok); c.classList.toggle("wrong", !ok); all = all && ok; });
      result(q, all, all ? "Correct." : "Red cells are off. Re-add those positions one by one.");
    });
  }

  // ---------- write-first exercise ----------
  function initAttempt(a, idx) {
    const key = "metro-draft:" + location.pathname + ":" + (a.id || idx);
    const ta = a.querySelector("textarea");
    const btn = a.querySelector(".reveal-model");
    const model = a.querySelector(".model");
    if (model) model.hidden = true;
    if (ta) {
      if (!ta.id) ta.id = "ta-" + (a.id || idx);
      ta.value = store.get(key, "");
      const sync = () => { if (btn) btn.disabled = ta.value.trim().length < 10; };
      ta.addEventListener("input", () => { store.set(key, ta.value); sync(); });
      ta.addEventListener("keydown", e => {
        if (e.key === "Tab") { e.preventDefault(); const s = ta.selectionStart; ta.setRangeText("    ", s, ta.selectionEnd, "end"); store.set(key, ta.value); }
      });
      sync();
    }
    if (btn && model) btn.addEventListener("click", () => { model.hidden = false; btn.hidden = true; const sk = a.querySelector(".skip"); if (sk) sk.hidden = true; });
    const skip = a.querySelector(".skip");
    if (skip && model) skip.addEventListener("click", () => { model.hidden = false; skip.hidden = true; if (btn) btn.hidden = true; });
  }

  // ---------- timer ----------
  function initTimer(t) {
    const total = parseFloat(t.dataset.minutes || "60") * 60;
    let left = total, handle = null;
    t.innerHTML = `<span class="clock" aria-live="off"></span>
      <button type="button" class="primary" data-act="go">Start</button>
      <button type="button" data-act="reset">Reset</button>
      <span class="small">${t.dataset.label || ""}</span>`;
    const clock = t.querySelector(".clock"), go = t.querySelector('[data-act="go"]');
    const draw = () => {
      const s = Math.abs(Math.round(left)), mm = Math.floor(s / 60), ss = String(s % 60).padStart(2, "0");
      clock.textContent = (left < 0 ? "+" : "") + mm + ":" + ss;
      t.classList.toggle("over", left < 0);
    };
    go.addEventListener("click", () => {
      if (handle) { clearInterval(handle); handle = null; go.textContent = "Resume"; return; }
      const start = Date.now(), base = left;
      handle = setInterval(() => { left = base - (Date.now() - start) / 1000; draw(); }, 250);
      go.textContent = "Pause";
    });
    t.querySelector('[data-act="reset"]').addEventListener("click", () => { clearInterval(handle); handle = null; left = total; go.textContent = "Start"; draw(); });
    draw();
  }

  // ---------- lesson completion ----------
  function initDone(btn) {
    const id = btn.dataset.lesson;
    const done = () => store.get("metro-done", {});
    const paint = () => { const d = done()[id]; btn.textContent = d ? "Done ✓ (tap to undo)" : "Mark this lesson done"; btn.classList.toggle("primary", !d); };
    btn.type = "button";
    btn.addEventListener("click", () => { const d = done(); if (d[id]) delete d[id]; else d[id] = new Date().toISOString().slice(0, 10); store.set("metro-done", d); paint(); });
    paint();
  }
  function paintIndex() {
    const d = store.get("metro-done", {});
    document.querySelectorAll("[data-lesson-row]").forEach(li => {
      const t = li.querySelector(".tick");
      if (t) t.textContent = d[li.dataset.lessonRow] ? "✓ " + d[li.dataset.lessonRow] : "";
    });
  }

  // ---------- boot ----------
  document.addEventListener("DOMContentLoaded", () => {
    renderMatrices(document);
    document.querySelectorAll(".q.mcq").forEach(initMcq);
    document.querySelectorAll(".q.num").forEach(initNum);
    document.querySelectorAll(".q.matq").forEach(initMatq);
    document.querySelectorAll(".attempt").forEach(initAttempt);
    document.querySelectorAll(".timer").forEach(initTimer);
    document.querySelectorAll(".done-toggle").forEach(initDone);
    paintIndex();
    if (score.total) {
      bar = document.createElement("div");
      bar.className = "scorebar";
      const main = document.querySelector("main") || document.body;
      main.insertBefore(bar, main.firstChild);
      renderScore();
    }
  });
})();

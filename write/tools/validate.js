/* Content checks. Run from the workspace root:  node tools/validate.js
   - every multiple-choice item has options with the same number of words (no length clues)
   - every drill reference in a lesson resolves
   - every task has bullets, a model, and sane lengths
   - ids are unique */
const path = require('path');
const root = path.join(__dirname, '..');
global.window = {};
['core', 'data-vocab', 'data-chunks', 'data-tasks', 'data-drills', 'data-lessons', 'data-refs'].forEach(f => require(path.join(root, 'assets', f + '.js')));
const YKI = global.window.YKI;
let problems = 0;
const bad = (m) => { problems++; console.log('PROBLEM:', m); };
const wc = (s) => s.trim().split(/\s+/).length;

const items = YKI.drills.slice();
YKI.lessons.forEach(l => l.body.forEach((b, i) => {
  if (typeof b === 'string') return;
  if (b.ref) { if (!YKI.drillById(b.ref)) bad(`lesson ${l.n}: missing drill ${b.ref}`); return; }
  items.push(Object.assign({ id: `lesson${l.n}#${i}` }, b));
}));
items.forEach(it => {
  if (it.kind === 'mc') {
    const counts = it.opts.map(wc);
    if (new Set(counts).size > 1) bad(`${it.id}: options differ in word count ${JSON.stringify(it.opts)}`);
    if (new Set(it.opts).size !== it.opts.length) bad(`${it.id}: duplicate options`);
    const lens = it.opts.map(o => o.length);
    if (Math.max(...lens) > 2.2 * Math.min(...lens) && Math.max(...lens) > 12) bad(`${it.id}: option lengths very uneven ${JSON.stringify(it.opts)}`);
  }
  if (it.kind === 'type' && (!it.answers || !it.answers.length)) bad(`${it.id}: no answers`);
  if (it.kind === 'order' && it.tiles.length < 2) bad(`${it.id}: too few tiles`);
  if (!it.why && it.kind !== 'type') bad(`${it.id}: no explanation`);
});
const ids = new Set();
[].concat(YKI.vocab, YKI.chunks, YKI.drills, YKI.tasks).forEach(x => { if (ids.has(x.id)) bad('duplicate id ' + x.id); ids.add(x.id); });
YKI.tasks.forEach(t => {
  const info = YKI.typeInfo[t.type];
  const n = YKI.words(YKI.modelText(t)).length;
  if (!t.bullets || t.bullets.length < 3) bad(`${t.id}: bullets`);
  if (n < info.min * 0.9 || n > info.max * 1.2) bad(`${t.id}: model has ${n} words, target ${info.min}-${info.max}`);
  t.model.forEach(s => { if (s.length !== 3) bad(`${t.id}: segment shape`); if (!YKI.roleNames[s[0].replace('+', '')]) bad(`${t.id}: unknown role ${s[0]}`); });
  // the model answer must itself pass the coach's task-point check
  require(path.join(root, 'assets', 'coach.js'));
  const res = YKI.analyse(t, YKI.modelText(t).replace(/, ([A-ZÅÄÖ][a-zåäö]+ [A-ZÅÄÖ][a-zåäö]+)(,|$)/g, ',\n$1$2'));
  res.bullets.forEach((b, i) => { if (b.covered === false) bad(`${t.id}: coach does not find bullet ${i + 1} in the model`); });
  if (res.notes.length) res.notes.forEach(nn => bad(`${t.id}: coach flags the model: "${nn.quote}" → ${nn.msg}`));
});
YKI.plan.forEach(p => { (p.write || []).forEach(id => { if (!YKI.taskById(id)) bad(`plan day ${p.day}: no task ${id}`); }); });
YKI.mocks.forEach(m => m.tasks.forEach(id => { if (!YKI.taskById(id)) bad(`mock ${m.id}: no task ${id}`); }));
console.log(`${YKI.vocab.length} words, ${YKI.chunks.length} sentences, ${YKI.drills.length} drill items, ${YKI.tasks.length} tasks, ${YKI.lessons.length} lessons`);
console.log(problems ? problems + ' problem(s)' : 'all checks passed');
process.exit(problems ? 1 : 0);

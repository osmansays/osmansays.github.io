/* Regenerates index.html and the thin standalone pages in lessons/ and reference/ from the data in assets/.
   Run from the workspace root:  node tools/build-pages.js
   The pages hold no content of their own: every lesson and sheet is rendered from assets/data-*.js,
   so the app and the standalone files can never drift apart. */
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
global.window = {};
['core', 'data-vocab', 'data-chunks', 'data-tasks', 'data-drills', 'data-lessons', 'data-refs'].forEach(f => require(path.join(root, 'assets', f + '.js')));
const YKI = global.window.YKI;
const SCRIPTS = ['core', 'data-vocab', 'data-chunks', 'data-tasks', 'data-drills', 'data-lessons', 'data-refs', 'widgets', 'coach', 'app-study', 'app-write', 'app'];

function page(title, base, pageVar, noscript) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<link rel="stylesheet" href="${base}assets/course.css">
</head>
<body>
<noscript><p style="padding:2rem;font-family:sans-serif">${noscript}</p></noscript>
${pageVar ? `<script>window.YKI_PAGE = ${JSON.stringify(pageVar)};</script>\n` : ''}${SCRIPTS.map(s => `<script src="${base}assets/${s}.js"></script>`).join('\n')}
</body>
</html>
`;
}
fs.writeFileSync(path.join(root, 'index.html'), page('YKI Skriva · Swedish writing in 10 days', '', null, 'This course needs JavaScript. It runs entirely on your own device; nothing is sent anywhere.'));
for (const dir of ['lessons', 'reference']) for (const f of fs.readdirSync(path.join(root, dir))) if (f.endsWith('.html')) fs.unlinkSync(path.join(root, dir, f));
YKI.lessons.forEach(l => {
  fs.writeFileSync(path.join(root, YKI.lessonFile(l)), page(`Lesson ${l.n}: ${l.title} · YKI Skriva`, '../', { type: 'lesson', n: l.n }, `Lesson ${l.n}: ${l.title}. This page needs JavaScript.`));
});
YKI.refs.forEach(r => {
  fs.writeFileSync(path.join(root, 'reference', r.id + '.html'), page(`${r.title} · YKI Skriva`, '../', { type: 'ref', id: r.id }, `${r.title}. This page needs JavaScript.`));
});
console.log('built', 1 + YKI.lessons.length + YKI.refs.length, 'pages');

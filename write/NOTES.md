# Notes for the teacher (Claude)

## How this workspace is built
- The learner asked for one application, so the workspace is an offline app: `index.html` plus `assets/`.
- All teaching content lives in `assets/data-*.js`. The files in `lessons/` and `reference/` are thin pages that render one lesson or sheet from that data; `node tools/build-pages.js` regenerates them. Never write content into those HTML files.
- Reusable components: `assets/course.css` (shared stylesheet), `assets/widgets.js` (multiple choice, tile ordering, typed answer), `assets/coach.js` (rule-based text checker and self-rating rubric), `assets/core.js` (storage, spaced repetition, answer checking).
- `node tools/validate.js` checks the content: equal-length quiz options, lesson references, model answers against the coach. Run it after any content change.
- The glossary is the sheet `glossary` in `assets/data-refs.js`. Use its terms in every lesson.

## Preferences and decisions
- Explanations in English, Swedish as written in Finland (husbolag, hälsocentral, talko, FPA), with the Sweden-Swedish word noted where it differs.
- Spelling follows the class notes: igår, idag, imorgon, ikväll. The answer checker accepts the two-word spellings too.
- Typography rule: Swedish in the serif (class `sv`), English in the sans. Keep it in any new lesson.
- Model answers are deliberately plain (level 3–4). Do not make them fancier.
- Quiz options: same number of words, correct option authored first and shuffled at display time.
- Short answers (a word, a verb form) must be exact; longer answers allow one slip and are shown as "almost".

## Open questions for the next session
- Confirm the exam date and the target level (assumed: intermediate test, level 3).
- Ask for one handwritten text to see handwriting speed and spelling without a keyboard.
- No learning record yet shows evidence of skill, only prior knowledge from the class notes. After the learner has written texts, read them (Library → progress data, or pasted in chat) and record what they can actually do.

## Ideas for later lessons, if the learner continues past day 10
- Describing a picture or a graph (not in the writing test, but useful for speaking).
- Passive with -s (repareras, städas), which appears in two model answers.
- More opinion topics per theme, with level 4 model answers.

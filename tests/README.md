# Smoke test

Run from the repo root: `node tests/smoke.js [path/to/index.html]`. About 80
seconds. Exit code 0 only if every check passes. Screenshots go to
`tests/out/`. `TRACE=1` prints positions; `LOGS=1` prints the bot's decisions.

## Checks

- Title screen shows; Begin opens the level 1 intro.
- Each level loads, then a bot plays it to the goal with real key events and
  the game must advance (next intro, or end screen after level 3).
- Per level, the run must have used that level's pieces (an `INFO` line gives
  counts): L1 handover, pole, rope, plank, block push, gate leap. L2 awning
  bounce, bale, gangplank, mast, marked rope, pumped swing. L3 vine swing,
  marked vine, wading, mud slide, sway walkway, sword drawn, fighters cut and
  defeated, a telegraph answered, shield-bearer defeated.
- No uncaught page error or console error. Missing PNGs print as `WARN`.

## How it runs

The clock is simulated: every frame advances 1/60 s and runs the bot first,
so runs are repeatable. Limits are game seconds, `20 + 2 * goalX / 385`
(measured: 36, 47 and 42 s). The bot reads `level.platforms`, `links`,
ropes, poles, blocks and guards. It plans lane changes over a platform graph
(BFS), jumps for awnings and ropes by simulating the arc, pumps a swing and
releases when the arc lands on footing, and fights (cut at 95 px, answer a
raised weapon, wait out a shield).

## When a level changes

Run it. `START_LEVEL=<0-2>` begins at a level; `DEV_LEVEL=<0-2>
DEV_TELEPORT=x,y` moves the hero. The `INFO ... returns to banner` line shows
the path before a fall. Fix the rule for that spot; a new piece needs a rule.

## Film mode

`node tests/smoke.js --film` also saves filmstrips to `tests/out/film/`: `rope1-NN.png` (level 1 rope 1, 8 frames across one pumped arc) and `cut-s1-NN.png` (level 3 fighter S1, 10 frames, 3 frames apart, one landed cut through hitstop and knockback), plus a contact sheet `*-sheet.png` for each (PIL, `python3 -I`). Frames are evenly spaced on the simulated clock.

Fight numbers the bot follows: fighters halt at 60 px, the cut is live 0.085 to 0.16 s into the swing and reaches 64 px past the edge, hitstop freezes game time 3 to 10 frames. The shield is cut during his recovery.

## Systems round (parry, ports, kasu, rope period)

- localStorage is cleared at start (`addInitScript`), so the persisted voyage map never changes a run.
- After levels 1 and 2 the bot checks the port scene (`state === 'port'`, `portKey`) and leaves by `#portBtn`.
- Level 3: the shield-bearer is parried (J pressed 2 to 6 frames before the strike, while he stands still in range), then cut in his stun. `parry` must be at least 1.
- One named kasu per level (`named`): level 1 on the scaffold route, level 2 by an errand to the stern lantern deck (step into lane 0 at the last gate, take it, step back), level 3 by an errand to the extra vine at x 1620 (short grip) and the roots.
- Rope period follows grip length: the bot's grab and release sims use `ROPE_GRAVITY / length`. Level 1 rope 1 is pumped at a 160 px grip; the release sim treats ledges as solid (sides and undersides), as the game does.

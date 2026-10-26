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

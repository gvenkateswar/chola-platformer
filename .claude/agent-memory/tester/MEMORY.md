# Tester memory

## Baseline (main, 2026-10-25, index.html 71164 bytes) - superseded by round 2 below
- tests/smoke.js: 10 PASS, 1 FAIL, about 75 s. Same result on two runs.
- FAIL: six requested assets missing from assets/: l1_mid, l2_mid, l3_mid, guard_walk_a, guard_walk_b, gate (.png). Game still runs.
- Levels 1-3 all complete by scripted input. No test hook needed. One death in level 2 each run.
- Deliberate-break check done on a temp copy: caught as `pageerror`.

## How the game exposes state
- Top-level `let state` ('title','inter','play','end'), `levelIdx`, `level`, `player`, `time`, `deaths`: readable via page.evaluate.
- Buttons: #startBtn, #interBtn, #againBtn. Keys: arrows/WASD, Space jump, J attack, Up/Down shift lane at gates.
- Lane shift needs a link (level.links) under the player AND footing in the target lane within player.x bx-6..bx+bw+6.

## Gotchas (flaky causes and fixes)
- Headless Chromium runs ~10 fps here; game dt is capped at 0.033, so the game runs in slow motion. Fix: wrap global `render` to draw every 20th frame during play; bot timers use game `time`, not wall clock. Set window.__fullRender for screenshots.
- Driving keys from Node (page.keyboard per tick) was too slow; the bot runs inside the page with dispatched KeyboardEvents.
- Jump height depends on holding Space (release cuts vy to -300). Hold ~380 ms of game time.
- Do not jump under a low platform (head bump). Tall ledges need an earlier take-off (wallAhead lead 80 px up to 130 high, 185 px above).
- Return from far lane early (bot shifts at link start) so the fall lands before the next ledge.
- Resource-load errors are reported by the assets check, not the console-error check.

## Dev aids in smoke.js
TRACE=1, DEV_LEVEL=<0-2> DEV_TELEPORT=x,y.

## Round 2 (build/level-1, commit f2e6129): traversal kit
- Level 1 is 8,800 px; scripted completion works for all levels, no hook needed. Level 1 limit raised to 75 s (genuinely longer), levels 2 and 3 stay at 40 s.
- Bot additions (all in the in-page bot): skip handover with J when `p.scene.t > 0.3`; wait out `p.leap` and `p.fadeT`; on `p.climb` hold ArrowUp to the top (poles always, ropes only if a ledge lies ahead) then jump with right held; hold Up at a pole base when `o.top < feet-100`; push a block only while it can still roll right and a tall (>=150) wall stands within 600 px beyond it, else hop it.
- The route does not need the ground-level pole or plank drop-through; bot walks planks and never uses down+jump. Pole 1 is usually skipped (bot lands on plank A). Each run climbs pole 2 and one rope, pushes 2 blocks, uses 2 gate leaps; smoke.js fails if level 1 never used handover, pole, rope, plank, push or leap (INFO line shows counts).
- Level 3 flake (2 of 8 runs): bot walked off the 440 ledge at x 4800 and the walk-off arc landed past the stupa block end (4880), falling at x 4967. Fix: `walkOffLands` sim; jump at an edge when plain walking off misses all footing. Then 10 of 10 runs at about 20 s. Limit was not raised for it.
- Dev aids: START_LEVEL=n (uses the game's queueLevel), DEV_LEVEL + DEV_TELEPORT, TRACE=1.
- Do not `pkill -f` a pattern that appears in your own command line; it kills the shell. Run long loops with run_in_background and a done-file.
- Asset check is now a WARN (game falls back to procedural art), per the coordinator's commit.

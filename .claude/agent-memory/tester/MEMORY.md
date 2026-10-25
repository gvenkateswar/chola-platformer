# Tester memory

## Baseline (main, 2026-10-25, index.html 71164 bytes)
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

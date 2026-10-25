# Baseline: main, 2026-10-25

Ran `node tests/smoke.js` on unchanged `index.html` (1280x720, file://), twice. Same result both times, about 75 s each.

```
PASS title screen shown
PASS start button opens level 1 intro
PASS level 1 loads
PASS level 1 completed by script (17.4s, 0 deaths so far)
PASS level 2 loads
PASS level 2 completed by script (25.4s, 1 deaths so far)
PASS level 3 loads
PASS level 3 completed by script (19.5s, 1 deaths so far)
PASS end screen shown after level 3
FAIL all referenced assets load: missing: l1_mid.png, l2_mid.png, l3_mid.png, guard_walk_a.png, guard_walk_b.png, gate.png
PASS no page errors or console errors
RESULT FAIL
```

## Findings

1. Six assets the game requests are not in `assets/`. The game still runs. The baseline stays FAIL until they exist or the references go.
2. All three levels complete by scripted input. No test hook is needed. A hook such as `window.__test = {gotoLevel, player}` would only speed up debugging.
3. One death happens in level 2 each run. Cause not investigated.
4. Headless Chromium draws about 10 fps here, so the script draws every 20th frame during play. A render error would still kill the loop and be caught.

## Deliberate-break check

Temp copy with a thrown error in the game loop once `player.x > 300`: level 1 timed out at x=302 and `no page errors or console errors` failed (`pageerror: deliberate break`). The real file was untouched.

## Screenshots (`tests/out/`)

`00-title`, `l1-start`, `l1-mid`, `l1-complete`, same for `l2`, `l3`, and `99-end` (all `.png`).

## Not checked

Guards passing through walls, visual glitches, audio, touch controls, the near lane (2) route.

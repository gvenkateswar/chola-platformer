# Smoke test

Run from the repo root: `node tests/smoke.js [path/to/index.html]`. About 75
seconds. Exit code 0 only if every check passes. Screenshots go to
`tests/out/`. `TRACE=1` prints the player position.

## Checks

- Title screen shows; Begin opens the level 1 intro.
- Each level loads, then a bot plays it to the goal with real key events and
  the game must advance (next intro, or end screen after level 3).
- Every asset the game requests loads.
- No uncaught page error or console error. Warnings print as `WARN`.

## The bot

It runs in the page, reads `level.platforms`, `level.links` and `player`,
holds right, jumps at gaps and ledges, double jumps when a no-jump arc would
miss, takes the far lane at gates, and attacks near guards. No game hooks.

## When a level changes

Run it. If a level times out, rerun with `TRACE=1`. To start a level at a
spot: `DEV_LEVEL=<0-2> DEV_TELEPORT=x,y`. Then adjust take-off distances in
`wallAhead` or the lane rules. A new kind of move needs a new rule.

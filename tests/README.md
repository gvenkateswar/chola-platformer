# Smoke test

Run from the repo root: `node tests/smoke.js [path/to/index.html]`. About 90
seconds. Exit code 0 only if every check passes. Screenshots go to
`tests/out/`. `TRACE=1` prints the player position and the bot's decisions.

## Checks

- Title screen shows; Begin opens the level 1 intro.
- Each level loads, then a bot plays it to the goal with real key events and
  the game must advance (next intro, or end screen after level 3).
- Level 1 traversal exercised: the run must have used the handover skip, a
  pole, a rope, a plank, a block push and a gate leap (an `INFO` line lists
  the counts per level, with any falls back to the banner).
- No uncaught page error or console error. Missing PNGs print as `WARN`.

## The bot

Runs in the page, reads `level.platforms`, `poles`, `ropes`, `blocks`,
`links` and `player`. It skips the handover with J, holds right, jumps at
gaps and ledges, double jumps when a no-jump arc would miss, takes the far
lane at gates (waits out the 0.5 s leap), pushes a block that has a tall wall
beyond it and hops other blocks, holds up at a pole base, climbs poles to the
top, climbs a rope only if a ledge lies ahead, and jumps off toward the goal.

## When a level changes

Run it. If a level times out, rerun with `TRACE=1`. Dev aids:
`START_LEVEL=<0-2>` begins at that level; `DEV_LEVEL=<0-2> DEV_TELEPORT=x,y`
moves the hero. Adjust `wallAhead`, the climb rules or `LEVEL_TIMEOUT_MS`.

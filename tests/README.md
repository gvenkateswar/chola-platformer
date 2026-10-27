# Smoke test

Run from the repo root: `node tests/smoke.js [path/to/index.html]`. About
95 s. Exit 0 only if every check passes. Screenshots go to `tests/out/`.

## Checks

- Each level loads and a bot plays it to the goal; ports and end screen follow.
- Pieces used per level (`INFO`), with one named kasu (L3: nk5, vine top).
- Handover: three presses, one line each (Enter, then J).
- Pause (Esc), the map from it (M), back (Esc), resume (P); the world holds still.
- Voyage map on the level 2 and 3 cards and from pause: coastline ink on the
  `COAST` vertices; strip lines fill per DESIGN §6.
- Boatman's and pilot's lamps: lit once bought, out when the target is taken.
- No page or console errors.

## How it runs

The clock is simulated (1/60 s per game frame) and pinned per level, so runs
repeat exactly. Frames draw 1 in 20, plus the
first frame after any change of scene, climb, leap or lane.

## When a level changes

`LOGS=1` prints bot decisions; `START_LEVEL=n` starts at a level;
`DEV_LEVEL`/`DEV_TELEPORT=x,y` move the hero.

## Revision notes

- 2026-10-26: cut to budget; map, pause, lamp, handover checks.

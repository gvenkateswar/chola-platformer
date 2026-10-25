# Level-designer agent memory

## Level format quirks (index.html, read 2026-10-25)

- Platform `[x, y, w, h, lane, kind]`; y is the top surface; kinds
  `stone` (default), `wood`, `stall`. Ground helper `g(x,w)` = y 620,
  h 240. Blocks may overlap the ground; the build does this freely.
- Guard `[x1, x2, feetY, lane]`; spawns at x1+30 walking east at 95 px/s.
  x1 = x2 flips direction every frame (line 743); a sentinel needs code.
  No type field; LEVEL-3.md writes a fifth element (`fighter`, `shield`).
- Link `[x, w, laneA, laneB]`; gate center is x + w/2; lanes must be
  adjacent (0/1 or 1/2); `tryShift` needs a platform in the target lane
  under the player within 150 px above or 250 px below. So a far ledge
  can be at most 150 px above the main ground at an exit gate (caught a
  190 px step in LEVEL-2's basin by script; replaced with a gap).
- Checkpoints `[x, y]` register on lane 1 only, |dx| < 30, |dy| < 60;
  the y must match the platform top the player stands on (a terrace top
  works). Goal `{x, y}` lane 1, |dx| < 34, |dy| < 80.
- Hints `[x, y, text]` drawn on lane 1 only. `water: y` draws a sea
  gradient from y. `killY` respawns with `hurt(2)` (DESIGN says 1).
- Camera: player at 35 percent of width, so 832 px visible ahead.
- Procedural `far` / `mid` keys: `gopuram|ships|stupas`, `palms|docks|jungle`.
- Word budget check used: strip `|` and `---` rows, exclude revision
  notes (DESIGN/VISION convention: prose and table cells). Raw `wc -w`
  counts pipes and lands about 200 over.
- A rule checker lives in the scratchpad only; rewrite it from the
  arrays in the level files if needed (gate footing, patrol 400 to 800,
  checkpoint spacing and cone margin, gap and step limits).

## Rule findings (first draft)

- Rule 3 (gate inside the patrol) and rule 5 (no cone at a gate exit)
  cannot both hold; reading used: exit may be in a sweep if the target
  lane's guard is on screen from the gate. Noted to game-designer.
- Rule 6 (checkpoints 1,000 to 1,500) and rule 10 (two gateway fighters)
  conflict; gateway fighters stand still (sentinels) in LEVEL-3.md.
- Lane-1 guards need 450 px clearance from each checkpoint, so a 400 px
  patrol fits only centered in a 1,300+ span; widths grew to 6,600 /
  6,900 / 7,200.
- A guard in a lane can never be passed by following his back alone; the
  player needs a ledge 90+ above him, or to leave the lane at a gate
  before he turns. Design every guard with one of those.

## Beats cut and why

- L1: a lane-0 guard patrolling between the two wall-walk gates (DESIGN's
  level 1 test). Cut: the player cannot pass him on the walk; F1 now
  patrols past the exit gate as a "come down" push.
- L2: sixth guard on the final quay's near lane. Cut: it made the end a
  second peak; moved to the far lane of ship 1 so the peak lands at the
  two-thirds mark and the last quay is a breath.
- L3: rope bridge, ravine, stupa terraces, citadel (RESEARCH.md 3.3);
  replaced by stilt walkways, mangrove roots, candi plinths, a palisade.

## Owner reactions

- None yet; first draft not reviewed.

# Builder memory

Last updated 2026-10-25 after build/level-1 round 2. Line numbers drift;
grep the function names.

## Where things live in index.html (~2,150 lines)

- CSS and overlays at the top: #titleScreen, #interScreen (#interDate),
  #endScreen, #touchui (▲▼ also hold keys U/F for climbing).
- `TUNE` constants (each cites DESIGN.md), `INK`, SCRIPT lines
  (`SHEATH_LINES` per level, `HANDOVER_LINES`, `LINE_SHOUT`,
  `LINE_BACK_TO_BANNER`), `touchLine()`, `IS_TOUCH`.
- Level builders: buildLevel1 = LEVEL-1.md draft 3 section 9. Level
  fields: platforms [x,y,w,h,lane,kind], planks [x,y,w,lane], poles
  [x,top,bot,lane], ropes [x,anchorY,len,lane], blocks [x0,x1,lane],
  npc [x,y], guards, coins, checkpoints, links, hints [x,y,text,touch],
  date, story, banners.
- `prepTraversal(L)` pushes planks (kind 'plank') and blocks (kind
  'block', mutable x) into `L.platforms`, so the smoke bot and every
  reader see them. `placeHints()` nudges hints clear of coins/platforms.
- Player block: linkAtPlayer, tryShift (starts `p.leap`), ropeX,
  climbRange, findClimbable, climbStep, startBackToBanner/backToBanner
  (1 s fade, teleport at midpoint, blocks reset), movePlayer (order:
  fade, handover scene, leap, sheath press, grab, climb, run/jump,
  plank drop, push), endHandover, hurt (falls).
- Guard AI: guardSees (block occlusion), blockAhead (turn 80 px off),
  inReach, heroStopped, catchHero, updateGuards.
- Drawing: drawBlock, drawPole, drawRope, drawSwordGlyph (HUD), NPC and
  leap tween in drawLaneContents, floats clamped to the viewport.

## Quirks

- tests/smoke.js reads globals `deaths` and `coinsTaken`; keep them.
- The smoke bot cannot climb: it auto-grabs rope 1 (x 1490) in the air and
  hangs forever (no jump while hanging, stuck check needs onGround).
  Use `DEV_TELEPORT=8300,620 DEV_LEVEL=0` to cover the level 1 end and
  levels 2 and 3; 2400,620 reaches pole 2 at 7230 and stops there too.
- Headless ~10 fps; level times vary run to run (level 3: 21 to 34 s of
  a 35 s limit).
- Drive rules by hand: `time+=1/60; movePlayer(1/60); updateWorld(1/60)`.
- Hero PNG sprites always show the sword; "unarmed" only affects the
  procedural rig (NPC uses `procedural:true`).

## Patterns that worked

- Big edits as a Python script of exact replacements asserting count 1,
  with large new blocks written to a scratch file and spliced in.

## Not yet built

- Hearts refill at checkpoints (DESIGN 5); "Banner planted",
  "no crossing here", CP2 line still old; touch button sizes (DESIGN 8).
- Plank and rope hints (no positions in LEVEL-1.md).

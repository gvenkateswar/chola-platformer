# Builder memory

Last updated 2026-10-25 after build/level-1 round 3. Line numbers drift;
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

## Round 3 additions

- Color grade: per-level fields `inkTint`, `mistCol`, `mistA`, `vig`,
  `rays`, `farCol`, `midCol`, `accent`, `gateCrimson` (level 3 false) in
  the level objects; `applyGrade(L)` sets pal.ink and the dimPal spread
  (`TUNE.GRADE_NEAR_DIM/FAR_LIFT`). `CRIMSON` is the only red; a hue scan
  script (hue < 0.075 or > 0.9, sat > 0.3) found only crimson and skin.
- Cut-out rig: `HERO_RIG` (generated data: pivots, parents, order, traced
  `cut` outlines), `RIG_DEFS`, `buildRig` (bakes parts at 0.2 scale with
  clip paths), `rigBlend`, `drawRig`, `heroPoseTarget()` (all poses).
  drawFigure takes `rig:'hero', pose:player.rigS`. To rig the guard,
  Adittan, or fighter: add a part map to RIG_DEFS and its file to
  ASSET_FILES and RIG_SOURCES; drawFigure call sites then pass `rig`.
- Outlines are generated offline from the PNG: priority-then-nearest
  pixel ownership from rough seed polygons, 7x7 dilation, 22 px joint
  discs, a 34 px shoulder cap on the torso, cv2 contours (eps 1.6).
  The scripts lived in the session scratchpad; regenerate the same way if
  hero_idle.png is edited.
- Old pose PNGs (`POSE_FALLBACK`) load only if the rig fails.
- Text placement: `textObstacles`, `placeText`, `placeHints`,
  `placeDialogue` keep hints and the handover off coins, platforms,
  props (poles, ropes, flags, gates, npc, goal) and each other.

## Quirks

- tests/smoke.js reads globals `deaths` and `coinsTaken`; keep them.
- Since tester commit 288b2c1 the smoke bot climbs, pushes, leaps, and
  skips the handover; level 1 takes it about 37 s.
- A page opened from disk cannot read image pixels (getImageData throws),
  so anything pixel-based is precomputed offline into index.html.
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

# Builder memory

Last updated 2026-10-26 after build/level-1 round 4. Line numbers drift;
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

## Round 4 additions

- Rope swing (DECISIONS 20): ropes carry `ang`/`angV`; `updateRopes` runs
  idle sway for ropes nobody holds; `grabRope`, `ropeRelease`, `climbStep`
  (pendulum, pump, climb along grip `c.r`). Release along the tangent,
  `p.overV` lets flight exceed the run cap, `p.liftV` keeps the swing's
  lift through the jump-cut, rope release spends the double jump.
- Animation (DECISIONS 21): `p.climbPhase` advances per px climbed;
  `heroSecondary` (sash/head springs, swing leg lag; runs before
  `rigBlend`), `heroPin` (after the blend: palms pinned to the rope grip by
  forward kinematics `rigPoint`, whole-figure tilt about `rotPivot`).
- Sash fix: red cloth in the hand box goes to the sash (ratio test
  r>45, g<0.42r, b<0.45r inside x 290-470, y 680-875), no bleed either
  way, fingertips over the strand filled by a traced `patch` polygon.
- Level 1 cornice now [1700,280,170,24,1] so rope 1 needs a swing.

## Quirks

- CHECK THE BRANCH FIRST, alone, before any pull or merge: twice the
  working copy was on main and a chained pull merged into local main
  (fixed both times with `git reset --hard origin/main`, never pushed).

- tests/smoke.js reads globals `deaths` and `coinsTaken`; keep them.
- Since tester commit 288b2c1 the smoke bot climbs, pushes, leaps, and
  skips the handover; level 1 takes it about 37 s of 75. It passes rope 1
  by falling to the floor and climbing the plinth (jump, wall jump,
  double jump), not by swinging.
- Filmstrips: stop the loop with `window.requestAnimationFrame=()=>0`,
  step the sim by hand, call render(), screenshot a clip per frame.
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

- (Hearts refill at checkpoints: built on build/systems.) "Banner planted",
  "no crossing here", CP2 line still old; touch button sizes (DESIGN 8).
- Plank and rope hints (no positions in LEVEL-1.md).

## build/systems (2026-10-26, worktree /home/claude/wt-sys)

- Commits: 34af086 parry, 64c1090 layouts + kasu, 0e28381 ports/map/cards,
  1666fac persistence (localStorage key `chola-voyage-map-v1`, flag
  `TUNE.KEEP_MAP`), aade384 NOTES.
- Flow: finishLevel -> showPort('market'|'quay') -> queueLevel -> inter;
  level 3 -> showEnd(). Overlays #portScreen/#mapScreen/#cardScreen;
  `[data-map]` buttons open the map; menu keys in a second keydown listener.
- maxHearts() gives 4 with ghee (L2) / offering (L3); detourLamps() draws
  lamps at `level.detourAt`.
- To test past the bot's gaps without editing tests/: copy smoke.js to the
  scratchpad, replace __dirname with the tests path, patch, run.
- Smoke still fails: L1 rope 1 (bot grip ~190 px), L3 shield-bearer, and
  the bot needs to click #portBtn.
- Ruling 27 pass (playtest "hard to see"): teleRing/TELE_* flare and seal,
  drawDetourSign with `level.detours` [{at:[x,lane,y?], first:['plank',x,y,w]|['rope',x]}],
  `.sheet` parchment panel on port and card overlays. tests/out is gitignored;
  review shots are made by a scratch Playwright script (shots27.js).

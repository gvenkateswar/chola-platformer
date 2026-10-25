# Builder memory

Last updated 2026-10-25 after build/level-1. Line numbers drift; grep the
function names.

## Where things live in index.html (~1,870 lines)

- 10-80 CSS; 80-125 overlays: #titleScreen, #interScreen (with #interDate
  date line), #endScreen, #touchui.
- ~136 `TUNE` constants block (DESIGN.md citations), `INK`, SCRIPT lines
  `LINE_INERT_ATTACK`, `LINE_SHOUT`, `IS_TOUCH`.
- ~188 input (KEYMAP, jumpQueued/attackQueued/shiftQueued), ~220 audio + `sfx`.
- ~320 asset slots (`ASSET_FILES`, `TRIM_KEYS`); missing PNG = procedural.
- ~400 level builders: buildLevel1 (LEVEL-1.md s9 data), 2, 3 (still old).
  Level fields: width, killY, date, story, platforms [x,y,w,h,lane,kind],
  guards [x1,x2,y,lane], coins, checkpoints, links [x,w,a,b], hints
  [x,y,text,touchText], goal, start, banners.
- ~543 state + `player` + `makeGuard`; loadLevel; showInter.
- ~643 tryShift (gate stand set here); ~672 movePlayer (stand, shove,
  inert attack, stillT, sliding); ~760 hurt (falls).
- ~780 guard AI: guardSees, inReach, heroStopped, catchHero, updateGuards
  (modes patrol/return/look/chase/scold); ~872 updateWorld.
- ~1647 drawLaneContents (gates, hints, guards with ?/! marks);
  ~1722 drawHUD; ~1750 render.

## Quirks

- tests/smoke.js reads globals `deaths` and `coinsTaken`; keep them
  defined even though nothing shows them.
- The smoke bot never stops, so it is never caught except at gate stands
  and wall-slides; level 1 takes about 25 s for it.
- Headless Chromium runs ~10 fps. For rule checks, drive the sim by hand
  in page.evaluate: loop `time+=1/60; movePlayer(1/60); updateWorld(1/60)`.
- Guard attack-kill only runs when levelIdx >= TUNE.SWORD_FROM_LEVEL.

## Patterns that worked

- Edits as a Python script of exact replacements asserting count == 1.

## Not yet built (from DESIGN.md)

- 1 s ink-wash fade on third heart (TODO(builder) in catchHero).
- Shared strings still old: "Banner planted", "Fallen — ...",
  "no crossing here ...", CP2 line; touch button sizes, hidden sword button.

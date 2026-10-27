# build/systems: voyage map, pause, lamps, nk5 (2026-10-26)

Ran `node tests/smoke.js` at 663acab. The real `index.html` **fails**:

```
FAIL level 1 completed by script: game loop stopped, timeout after 0.6 game s at x=272
FAIL no page errors or console errors: pageerror: undefined is not iterable
RESULT FAIL
```

**Game bug (for builder).** The handover crashes on its first frame:
`updateWorld` sets `p.scene = {t:0}`, then `render` reads
`HANDOVER_LINES[Math.min(2, player.scene.line)]` with `line` undefined
(index.html line 4233); a real browser crashes there every time. The old script missed it because it drew 1 frame in 20.
It now also draws the first frame after any scene, climb, leap or lane change.

With `|| 0` added in a scratch copy, two runs: 34 PASS, 0 FAIL each, about
95 s, identical bot logs. Times 42.2 / 52.1 / 59.7 game s. New lines include:
handover in 3 presses; Esc pause, world holds still, M map, Esc back, P resume;
coastline ink on 282/282 vertices (both cards, pause map); strip 1 at market,
1 > 2 > 3 > 4 on the level 3 card; boatman's lamp lit and out at x 2190;
pilot's lamp lit and out at x 1643 (nk5 taken from the vine's top grip).

Broken copy (throw in level 3): FAIL, `pageerror: deliberate break`, exit 1.

Test fixes: only the game frame advances the test clock; `time` pinned per
level; level 1 reloads after the pause checks.

## Not checked, looked wrong

- Strip line 2 is bare on the level 3 card and sails there with 3 and 4;
  DESIGN §6 says only 3 and 4 sail there.
- Opening the map from the level 1 pause shows the pilot's card first.

Screenshots: `l2-card-map.png`, `l3-card-map.png`, `l1-pause-map.png`.

## Revision notes

- 2026-10-26: first version.

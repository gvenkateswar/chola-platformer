# Game-designer agent memory

## Physics constants in index.html (measured 2026-10-25)

Source: `movePlayer` lines 627 to 699, `tryShift` 599 to 625, `hurt` 701
to 717, `updateWorld` 719 to 800. Canvas 1280 by 720. Lanes 0 far (scale
0.80), 1 main (1.0), 2 near (1.17).

- Run: ACCEL 2600, MAXV 385 px/s, FRICTION 2200.
- Gravity 2300 px/s^2, terminal 1200, wall-slide cap 150.
- Ground jump vy -830; release clamps vy to -300 (jump cut). Measured with
  Playwright: held 163 px (150 by formula), tapped 77 px. Running jump
  covered 216 px horizontally while rising 120 px; flat is about 280.
- Double jump vy -700, once per airtime (jumps < 2): measured held total
  203 px; 256 if timed at the apex.
- Wall jump vy -760, vx 430 away from the wall.
- Coyote 0.10 s, jump buffer 0.13 s. Hero hitbox 26 by 56.
- Lane shift: only within a `links` gate x-range plus 14 px; needs a
  platform in the target lane within 150 px above or 250 px below; cooldown
  0.3 s; off a gate shows a "no crossing here" float.
- Attack: attackT 0.28 s; hitbox 52 wide, hero-high, centered 30 px ahead;
  movement blocked while attackT > 0.12.
- Guard (build): patrol 95 px/s between x1 and x2, turns toward player
  within 220 px x and 80 px y in the same lane, contact = hurt(1),
  attack kills it ("Guard felled"). DESIGN.md replaces all of this.
- hurt(): hurtT 1.2 s invulnerable, knockback vy -380, vx -face*260; fall
  below killY = hurt(2, respawn); hp <= 0 resets hp 3 and respawns at
  checkpoint in lane 1. Checkpoints register only in lane 1 within 30 px.
- Level widths 5200 / 5400 / 5600; killY 820 / 700 / 820.
- Touch: six 60 px buttons (tL tR tJ tA tU tD), shown when
  `'ontouchstart' in window`.
- Variables `player`, `level`, `state` are top-level script bindings; a
  Playwright `page.evaluate` can read and set them directly.

## Level 1 layout facts used in DESIGN.md

- Wall-walk stretch x 1240 to 1900: far guard 1260 to 1840 at y 492, main
  guard 1330 to 1700 at y 620, gates (lane 0/1) at 1250 w130 and 1620 w140.
- Canyon x 2980 to 3860: main ground absent between 3050 and 3760; far
  walkway with guard 3040 to 3680; near plinths with gaps, no guard.

## Rulings given (first draft, 2026-10-25)

- No crouch verb. Hiding = lane crossing, height (90 px above guard floor),
  and timing behind the guard.
- Guard sight: forward cone 300 px, band 80 px, 0.25 s to be seen, same
  lane only. Chase 260 px/s, leash 300 px past patrol ends, ends at 420 px
  distance / lane change / 3 s. Catch = one heart + 200 px shove, never a
  checkpoint reset. Three hearts refill at every checkpoint. Fall = 1 heart.
- Four-second-window rule: a safe pass opens within 4 s from any unseen
  vantage; patrols 400 to 800 px; one guard per lane per screen.
- Kadaram: one fighter (telegraph 0.5 s, thrust 70 px / 0.15 s, recovery
  0.7 s, two cuts) plus a shield-bearer variant, forced only at the
  gateway. All hits are black ink; defeated fighter kneels and washes out.
- Ship-deck closing beat in level 2 accepted (600 to 800 px, no guards).
- Kasu: trail only, no counter, no tally, no float, no chime.
- Difficulty: L1 4 min / 5 guards / 1 forced stealth; L2 5 min / 6 guards /
  2 forced; L3 6 min / 5 fighters / 1 forced combat.

## Open with Gaurav

- Brute-force tax: heart-and-shove (recommended) vs. checkpoint on catch.

## Owner changes to the design

- None yet.

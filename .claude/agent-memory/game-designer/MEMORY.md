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

## Second draft rulings (2026-10-25, after review)

- Catch per Decision 8: only a stopped hero (under 100 px/s for 0.2 s
  within 40 px of the guard's front edge, wall-sliding, or in the 0.5 s
  gate stand). Gate crossing now costs a 0.5 s stand (build: 0.22 s ink,
  no stop). Forced beat = a stop inside the 300 px leash.
- Forced counts: L1 1 (pillars at 2480), L2 1 only if the deck at 4000 is
  rebuilt as a 190 px wall-jump (else 0), L3 0.
- Target times 126 / 131 / 150 s (Decision 9); widths 6,600 / 6,900 /
  7,200 from the level files.
- Sentinel fighters allowed at the gateway only; `x1 = x2` flips facing
  every frame in the build, so `stand` is a builder flag.
- Rule 5 = level designer's wording (gate exit may sit in a sweep if the
  target-lane guard is on screen and walking away a full leg). Rule 1 =
  "from the wait spot." Rule 2 exempts the two sentinels.
- Attack lock is 0.16 s (attackT 0.28, moves when <= 0.12), not 0.12.
- Level 3 gate: timber post-and-lintel, lamps, no crimson (Decision 7).

## Third draft rulings (2026-10-25, after Gaurav's level 1 playtest)

- Budget raised to 3,200 words. New section "2a. Traversal kit" (numbered
  2a so the level files' section citations stay valid).
- Kit: L1 scaffold pole (160 up / 220 down), plank (one-way, down+jump
  drops), hauling rope (130 px/s, sway ±12 px / 2 s), block on rollers
  (80x64, push 120 px/s after 0.25 s hold, track only). L2 awning bounce
  (vy -1000 / -1100 held = 217 / 263 px), bale (96x72, push 140, no
  track), gangplank (≤25°, 330 up), rigging line and mast (130 px/s), yard
  (300+ px up). L3 vine (auto-swing ±45°, period 2.0 s, release + vy -300,
  ~500 px/s), prop roots, shallow water (wade 160, jump capped 77, never
  death), stilt walkway (sway ±20 px, 2.4 s, opposite phase, gap 40-120),
  mud slide (30°, 520 px/s, 380 held back).
- Guards never climb/push/bounce/swing/slide. Hanging still in the band =
  stopped. Block/bale occludes a cone; guard turns at a block.
- Marked depth rope/vine: lamp + ink ring + arrow glyph (black in L3);
  grab, ↑/↓, 1.0 s swing, 60 px arc, lands at set x 0-300 px east; moving,
  so uncatchable. First in L2 rigging.
- Gate leap: 0.5 s, keeps x, 40 px arc, scale tween 0.80/1.0/1.17, lane
  changes at takeoff, catchable (counts as stopped).
- Sword legibility: L1 handover by an older man of his company (2 s,
  skippable), HUD sheathed-sword glyph, hilt-push response (0.3 s, no lock,
  click, line on first press and after 30 s), ⚔ touch button dimmed not
  hidden, L3 draw prompt and ink stroke on first cut. Strings asked of
  narrative-designer in NOTES.md.
- Difficulty: L1 193 s / 8,800 px / 6 guards / 1 forced; L2 211 s / 9,400
  / 7 guards / 1 forced; L3 235 s / 10,000 / 6 fighters / 0 stealth, 1
  forced fight + up to 4 optional. Total 10:39 play.
- Risks: gangplank and mud slide need a slope primitive (engine has only
  flat rects); ~20 new sprites/props; widths unbuilt; smoke bot can't test
  swings.
- Builder engine facts (build/level-1): TUNE block ~line 138,
  GATE_STAND 0.5 in tryShift, LINE_INERT_ATTACK, SWORD_FROM_LEVEL gate on
  attack-kill, guard modes patrol/return/look/chase/scold.

## Ruling pass 2026-10-26

- Section 7 takes the level files' numbers: widths 8,800 / 11,600 /
  13,300; 6 guards / 6 guards / 6 fighters; times 178 / 187 / 204 s.
- Rule 10 kept: no fight on a swaying section; S3 and S4 in LEVEL-3 must
  move to fixed walkways or stable ground (told level designer).
- Checkpoints light by x in any lane or height (builder task), fixing
  LEVEL-3's far-lane skip of CP 7350 without a layout change.
- Rope/vine swing = builder's TUNE numbers (Decision 20): period 2.0,
  max 50° (never < 45), pump 2.4 rad/s², damp 0.12, grab keeps 0.8,
  release 1.3 × tangent + vy -420, spends double jump, AIR_KEEP 300.
- First-use isolation: 900 px in the piece's own lane. Gate target
  footing ≤ 140 px above (engine refuses > 150).
- Still unanswered builder questions: handover 1 vs 3 lines
  (HANDOVER_LINE 1.4 s × 3), grab-on-touch catching passers-by.

## Fourth draft 2026-10-26 (Decisions 24 to 26, game-feel report)

- Budget raised to 4,000 words.
- Parry: attack key against a gold thrust; window 10 frames (-7..+3), 14
  for S1; good parry = 14-frame hitstop, 0.3 s at 40% speed, camera 8%
  closer, 0.9 s stun, counter cut counts two. Mistimed (-18..-8, +4..+9)
  = guard, slide back 24, no heart. Earlier = clash, 16 px apart. 0.4 s
  lockout. Black seal (overhead cut, 0.6 s, 80 px, recovery 1.0) can't be
  guarded. Pattern thrust, thrust, overhead. Shield-bearer: gold thrust +
  black-seal bash; parry opens shield 1.2 s (counter counts one) or jump
  over and cut his back (0.8 s before he turns); two hits. Hitstop 5 /
  10 on defeat. Fighter stop 60, hero reach 64 past edge (report item 1).
  Black over indigo because Kadaram palette is indigo.
- Rope: ω² = 2300 / r (grip distance, min 120), period 2π√(r/2300);
  energy cap at 50°, safety clamp 70°.
- Kasu: trail ~24/level; 2 detours/level (cluster 5-7, 300-800 px, 15-30
  s, rejoin east); 6 named kasu = 6 cards = 6 map lamps; purse shown only
  at ports. Ports: market (L1→L2) and quay before sailing (L2→L3). Goods
  12 (4th heart next level), 10 (lamps at next level's detour entrances),
  6 (crew line + map pennant). Nothing required; no persistence.
- Runtime: 569 s play; 11-14 min full run with detours and ports.

## Voyage map and paid hints 2026-10-26 (Decisions 27-30)

- Map: true-scale Bay of Bengal + 4-line palm-leaf strip. Lines: 1
  Thanjavur-Nagapattinam overland, 2 days, fills on finishing L1; 2 past
  Sri Lanka's north, 2 days, fills leaving the quay port; 3 to the
  Nicobars (Nakkavaram), 10 days, and 4 across to Kadaram, 5 days, both
  fill on the L3 interstitial crossing (2 s a leg). Days computed from
  RESEARCH 6b at 3-5 knots, [plausible]. Opens on L2/L3 interstitials,
  port button, pause screen (new). Lamps + coins at each level's place;
  fixed card says the strip form is invented.
- Paid hints: boatman (L2) and pilot (L3) light "the target in LEVEL-N.md
  section 9" (named kasu hiding place or shortcut), never a staked detour;
  coir hand lamp, gold flame, 600 px; lasts the level, out when taken.
- Budget now 4,400; body 4,370.
- Repo is a shared working tree: other agents leave uncommitted files;
  stage only my own paths.

## Open with Gaurav

- Ship-deck closing beat in level 2: keep (recommended) or end at quay.
- Resolved: brute-force tax (Decision 8 made the catch stop-only).

## Owner changes to the design

- Decision 8 replaced "contact = catch" with "stopped inside reach."
- Decision 9 cut targets from 4 to 6 minutes to about 2 minutes a level.
- Decision 12 superseded 9: 3 to 4 minutes a level. Decisions 10, 11, 14,
  15, 16 added sword legibility, traversal kit, push blocks and vines,
  marked depth ropes, and the gate leap.

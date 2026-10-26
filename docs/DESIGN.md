# Chola: Tides of Bronze — Design

Owner: game-designer. Readers: builder, level-designer, tester. Third
draft, 2026-10-25, written under `docs/VISION.md` (fourth draft) and
`docs/DECISIONS.md` (rulings 1 to 16), from the build on `build/level-1`,
`docs/RESEARCH.md` sections 3.4 to 6, the design and levels reviews, and
the level designer's notes.

Budget: 3,200 words for sections 1 to 10, counting prose and table cells.
Revision notes sit outside it.

Units: pixels at the 1280 by 720 canvas, seconds, px/s. "Lane" is the
build's depth index: 0 far, 1 main, 2 near. "Band" means the vertical
window a guard can see, measured between his feet and the hero's.

## 1. Core loop

**Every thirty seconds.** Run east, climb, swing, or push past the thing
in the way, see a lamplit gate and a crimson guard beyond it, and decide:
leap to the other depth now, or wait for his back and run past. Take the
kasu that trace the better line.

**Every three to four minutes.** One leg of the voyage: a level teaches two
traversal ideas native to its place, sets a guard beside each, rises to a
crossing where far and near each cost something, and ends on a stretch
combining all of it.

**Across the game.** Temple, port, foreign shore. The sword is handed to
Ilamaran in the first minute, stays sheathed through two legs, and is
drawn in Kadaram, where the road allows no other way (Pillar 2).

## 2. Player verbs

Baseline constants from `index.html` (`movePlayer`), measured with
Playwright:

- Run: `ACCEL 2600`, `MAXV 385`, `FRICTION 2200`. Full speed in 0.15 s.
- Gravity `2300`, terminal `1200`, wall-slide cap `150`.
- Ground jump `vy -830`: held, 150 px by formula, 163 measured; tapped
  (release clamps `vy` to `-300`), 77 measured. Running jump 216 px while
  climbing 120 px; flat, about 280.
- Double jump `vy -700`, once per airtime: held total 203 measured, 256 at
  best. Wall jump `vy -760`, `vx 430` away.
- Coyote 0.10 s, jump buffer 0.13 s. Hero hitbox 26 by 56.
- Lane shift only inside a gate (`links` x-range plus 14 px), needs footing
  in the target lane within 150 px above or 250 below, cooldown 0.3 s.
  `build/level-1` adds `GATE_STAND 0.5`, which becomes the leap below.
- Attack: 0.28 s, hitbox 52 wide, hero-high, 30 px ahead; movement locked
  while `attackT > 0.12`, so 0.16 s.

| Verb | Input | What it does | Cost | First taught |
|---|---|---|---|---|
| Run | ←→, A/D, ◀▶ | 385 px/s, both ways | None | Level 1, first 300 px |
| Jump | Space/W, ⤒ | 77 to 163 px by hold | Airtime; a guard's band spans most of it | Level 1 stairs |
| Double jump | Jump in air | Up to 100 px more, once | Spent until landing | Level 1, first wide gap |
| Wall jump | Jump while sliding on a wall | Kicks away 430 px/s | Sliding counts as stopped | Level 1 pillars |
| Leap at a gate | ↑↓ at a gate, ▲▼ | 0.5 s leap to the other lane | Counts as stopped; the new lane's sight applies at takeoff | Level 1, first gate, hinted |
| Climb, push, bounce, swing, slide | See section 2a | | | Levels 1 to 3 |
| Draw the sword | J/X, ⚔ | 0.28 s cut, 2 to defeat a fighter | Cannot move for 0.16 s | Level 3, first fighter |

Not added: crouch; the crossing and the push block are the hides.

**The gate leap (Decision 16).** ↑ or ↓ in a gate starts a 0.5 s leap.
Ilamaran keeps his x and rises on a 40 px arc; his drawn scale tweens from
the source lane's to the target's (0.80, 1.0, 1.17) and his feet to the
target footing: toward the camera going near, away going far. Ink blooms
at takeoff and landing; input is ignored. The lane changes at takeoff, so
a guard in the target lane can catch the leap.

**The sheathed sword (Decision 10).** Four signs:

1. **Handover.** Level 1 opens with Ilamaran unarmed beside an older man of
   his company [invented, below commander rank]. Walking into him plays a
   2 s scene, skippable: he hands over the sheathed sword with one line.
2. **HUD glyph.** An ink sword after the hearts: sheathed in levels 1 and
   2, drawn after the first cut in level 3. A sign, never a count.
3. **Press in levels 1 and 2.** A hand on the hilt pushes the blade home
   (0.3 s, no movement lock), a wooden click, the glyph pulses. A line
   floats on the first press of each level and after 30 s without one. The
   ⚔ touch button shows dimmed, never hidden.
4. **Kadaram.** The hint before the first fighter is the draw prompt; the
   first cut sweeps a 0.2 s ink stroke along the blade. The title key list
   says the sword is sheathed until Kadaram.

Sprites: hero idle unarmed, the older man, hand on hilt (new).

**How levels 1 and 2 play without a sword.** The guard is terrain that
moves: a facing, a patrol, a band. The kit (lane, height, speed, timing,
section 2a) is for getting past a thing that sees (Pillar 2).

## 2a. Traversal kit

Numbered 2a so section numbers the level files cite stay valid. Decisions
11, 14, 15; RESEARCH 3.4 sets what each piece may be.

**Common rules.** Each level introduces two ideas and ends on a stretch
combining everything the player has (VISION 5). A piece is first met where
a fall is safe (no `killY` below, no guard within 1,280 px, kasu tracing
the motion), then beside a guard, then in the combination. Guards and
fighters never climb, push, bounce, swing, or slide; they walk platforms,
planks, gangplanks, and walkways. A hero hanging still with his feet in a
guard's band counts as stopped; climbing or swinging is moving. Grab a
pole, rope, or line by touching it airborne or holding ↑; jump leaves it
with `vy -700`, `vx 300` away.

| Piece | Lvl | Does | Numbers | With guards |
|---|---|---|---|---|
| Scaffold pole | 1 | Climb ↑↓ | 160 px/s up, 220 down; 200 to 400 tall | He cannot follow |
| Scaffold plank | 1 | One-way platform; ↓ plus jump drops through | 20 thick, 120 to 300 wide, 110 to 140 apart | Walks planks in his lane; 90 px up hides |
| Hauling rope | 1 | Climb, sways | 130 px/s; ±12 px, period 2 s; 160 to 320 long | As pole |
| Block on rollers | 1 | Hold into it 0.25 s, then push along its roller track only | 80 wide, 64 tall; push 120 px/s | Top is a step; stops a cone at its face, so the hero (56 tall) hides behind it; a guard turns at it |
| Cloth awning, undyed | 2 | Landing on it bounces; no standing | `vy -1000` (217 px), `-1100` with jump held (263 px) | He walks under; bouncing is moving |
| Cargo bale | 2 | Pushed like the block, no track; drops into a gap as a step | 96 wide, 72 tall; push 140 px/s | As block |
| Gangplank | 2 | Slope, quay to deck | Up to 25°; 330 px/s up, 385 down | He walks it |
| Rigging line, mast | 2 | Climb by the lashings | 130 px/s; mast to 480 px | As pole |
| Yard | 2 | The ship's high path | 20 thick, 200 to 400 wide, 300+ above deck | Above every band |
| Vine or rattan | 3 | Swings by itself; jump releases | 160 to 260 long; arc ±45°, period 2.0 s; release adds `vy -300`, up to about 500 px/s across | Out of reach; release over his head |
| Prop roots | 3 | Small one-way platforms; arches are walls | Knots 60 to 100 wide, at most 120 apart | Fighters stay off |
| Shallow water | 3 | Under roots and walkways; wading, never death (Decision 2) | Wade 160 px/s; jump capped at 77 px | Fighters do not wade |
| Stilt walkway | 3 | Sections sway, so gaps open and close | ±20 px, period 2.4 s, neighbors opposite: gap 40 to 120 | Fighters walk it, riding the sway |
| Mud slide | 3 | Riverbank slope; the hero slides | 30°; 520 px/s, hold back for 380; jump keeps speed; no stopping or climbing back | No one follows; any chase ends |

Blocks and bales never leave their lane and return to their start on any
checkpoint return, so no layout can lock. Gangplank and mud slide need a
slope primitive the engine lacks (builder task); until then a gangplank is
stepped planks and the slide is cut.

**Depth-crossing ropes and vines (Decision 15).** A marked rope (level 2)
or vine (level 3) carries the gate's lamp at its anchor, an ink ring at
grab height, and the gate's arrow glyph (black in level 3, Decision 7).
Unmarked ones never cross. Grab it, then press ↑ (far) or ↓ (near): a
1.0 s swing on a 60 px arc, scale tweening as in the leap, landing on
target-lane footing at the rope's set landing x (0 to 300 px east). The
lane changes at release. The swing is moving, so it cannot be caught.

**By level.** Level 1 introduces climbing (pole, plank, rope) and pushing
(block), and ends pushing the block under a pole to climb above a guard.
Level 2 introduces bouncing and rigging (line, mast, yard, gangplank, the
first marked rope), reuses pushing with bales, and ends bale, awning,
rigging, yard, deck. Level 3 introduces swinging and sliding; roots,
water, and walkways are terrain on known verbs. It ends vine, walkway,
slide, then the gateway.

**Sprites** (new): hero climb (two frames), push, hang, slide, wade; one
prop per row above.

## 3. Stealth and avoidance

Guards appear in levels 1 and 2 only (Decision 3). All numbers are
constants.

**Patrol.** Walk 95 px/s between `x1` and `x2`, turn at the ends or at a
push block, face the walking direction.

**Sight.** Same lane only (Pillar 1: the crossing is earned, so it must be
a hide). A forward cone: 0 to 300 px ahead of the guard's face, band 80 px
(hero feet within 80 px of guard feet). Only a block or bale occludes it.
"Seen" needs 0.25 s continuous: an ink "?" over the guard, then an ink "!"
and a short shout. Behind the guard is safe; above the band is safe: any
ledge, plank, or handhold 90 px or more above his floor.

**Seen.** The guard chases at 260 px/s, below the hero's 385. He never
passes 300 px beyond either patrol end, changes lane, jumps, or drops.
Chase ends when the player leaves the lane, is 420 px away, is out of band
for 1 s, or 3 s pass; he stands 1 s with a "?" and walks back. No alarm
(Decision 2).

**Caught (Decision 8).** A moving Ilamaran is never caught; a guard's body
does not block him. He is caught when stopped inside reach: within 40 px of the guard's front edge
while his speed is under 100 px/s for 0.2 s, while wall-sliding, hanging
still in the band, or during a gate leap. Then the guard grabs a shoulder
(sprite: guard reach, NOTES.md slot 22), one heart goes, Ilamaran is shoved
200 px back the way he came (`vx 260`, `vy -380`), and the burst is black
ink, never crimson. The guard scolds for 1.5 s, then resumes his patrol.
Invulnerable 1.2 s. No checkpoint reset on a catch (Pillar 3; VISION 4).
Losing the third heart ends in a 1 s ink-wash fade to the last checkpoint
with hearts refilled.

**What forces a stop.** A forced stealth beat is a stop inside a chasing
guard's 300 px leash: a wall-jump climb, a landing that needs a stop, or a
gate leap begun with the guard within 130 px. Gaps, steps, poles, and
pushes are reads, taxed only when the player hesitates. A guard on flat
ground is a free beat.

**Hiding.** Four ways. Leap at a gate: no lane sees another. Climb: 90 px
above his floor is out of band. Time: follow his back; 385 beats 95.
Cover: stand behind a block; he turns at its far face, 80 px off, outside
reach. Examples: `LEVEL-1.md` section 5.

**The rule that keeps it from being tedious: the four-second window.** From
any spot where a player can stand unseen and watch a guard, a safe way past
opens within 4 s, and running it takes under 6 s. So a patrol leg is 400 to
800 px (4.2 to 8.4 s), and a gate or a climb sits inside or at the edge of
every patrol: the wait is for one turn, never two. A catch costs 3 s, a
heart, and a shove: the worst retry is the guard, never the stretch before
him. The game taxes stopping, never speed (Decision 2).

## 4. Combat in Kadaram

One enemy type, one variant, no Chola guard in level 3 (Decision 3). Slots
17 and 18, no crimson (Pillar 1). Dress and weapon per RESEARCH.md 3.3:
waist cloth, bare chest, head cloth, a straight short sword or spear.

**The fighter.** Patrols and sees like a guard. Seen: he advances at 180
px/s and stops 90 px from the hero. Telegraph: 0.5 s with the weapon raised
and an ink flare at the tip. Thrust: hitbox 70 px ahead of his front edge,
hero-high, 0.15 s, one heart. Recovery: 0.7 s, when a cut lands. Then
telegraph again. Leash 300 px, never changes lane, never follows onto a
vine, root, or slide. Two cuts defeat him; the hero's cut lands within 56
px ahead.

**The sentinel.** A fighter with no patrol: stands facing west, wakes when
his cone is entered. Gateway only. The build cannot stand a guard still
(`x1 = x2` flips his facing every frame), so a `stand` flag is a builder
task.

**Reading it.** The half-second raise lets a child step back 120 px or
jump (60 px clears the thrust).

**The shield-bearer (variant).** Same numbers, plus a hide shield held
forward: a cut from the front outside his 0.7 s recovery is an ink puff on
the shield. Gateway only, after the first sentinel.

**Where it is forced.** Pillar 2 wins at the gateway, Pillar 1 elsewhere
(VISION 3). Every fighter before it has a lane, vine, or walkway around
him. The gateway, a timber palisade with a carved torana (RESEARCH 3.3),
closes all three lanes: a sentinel, a checkpoint, the shield-bearer. No
reward.

**Sprites beyond slots 17 and 18** (NOTES.md slots): fighter raise,
thrust, shield walk, kneel and wash-out (30 to 33); guard reach (22); the
kasu coin per section 6 (new).

**Violence rule (Decision 2).** Every hit, given or taken, is a black ink
splash; no red on any body. A defeated fighter drops to one knee, raises
an open hand, and washes out to paper in 1.5 s: no body, no "felled"
float.

## 5. Health, failure, checkpoints

**Three hearts, kept.** A catch, a thrust, or a fall costs one heart.
Hearts refill at every checkpoint.

**Failure.** Zero hearts: 1 s ink-wash, back to the last checkpoint, three
hearts. A fall: one heart and the same return. No deaths counter, no end
stats, no lives (Pillar 3).

**Checkpoints.** A banner on the main lane, 1,000 to 1,500 px apart: rule 6.

**Cost in time.** A catch: 3 s. A fall or three hearts gone: 5 to 15 s.

## 6. Collectibles

Kasu stay as a trail (VISION 3): a line of three to five shows a jump arc,
a swing's release, the safer lane, or the way a guard's back opens. Pickup
is an ink bloom and nothing else: no float, chime, HUD counter, or tally.
The end screen carries no numbers; in place of the tally it carries the
one line of cost (Decision 4). Sprite per RESEARCH 6: thick, irregular,
pale gold, a standing figure, no lettering.

## 7. Difficulty curve

| Level | Target time | Width | Guards or fighters | Forced stealth beats | Combat beats | New ideas |
|---|---|---|---|---|---|---|
| 1 Thanjavur | 3 min 13 s | 8,800 px | 6 guards | 1 (the pillar wall at 2480) | 0 | Gate leap and forward sight; climbing and pushing |
| 2 Nagapattinam | 3 min 31 s | 9,400 px | 7 guards | 1 (the deck wall-jump) | 0 | Height hides; bouncing and rigging; the first marked rope |
| 3 Kadaram | 3 min 55 s | 10,000 px | 6 fighters (4 patrols, 2 gateway sentinels, one a shield-bearer) | 0 | 1 forced, up to 4 optional | The sword and its telegraph; swinging and sliding |

**Arithmetic (Decision 12).** Run at 385 px/s: 23, 24, 26 s. Waits, 4.2 s
per patrolling guard or fighter: 25, 29, 17 s. Traversal per beat: level
1, five climbs at 5 s, three pushes at 8 s: 49 s. Level 2, four bounces at
4, two bales at 8, three rigging climbs at 6, two marked ropes at 2: 54 s.
Level 3, six vines at 3, two marked vines at 2, three walkways at 6, two
root stretches at 5, one slide at 6: 56 s. Leaps and reading: 40 s each.
Retries at 8 s: 56, 64, 56 s. Level 3 fights: two at 15 s, one optional at
10: 40 s. Totals 193, 211, 235 s: 10 min 39 s, about 12 with the cards.
The widths are targets, not yet laid out.

**The ten-year-old check.** Hardest skill: the pillar wall. Hardest
timing: a walkway gap, reopening every 2.4 s. Hardest read: the
shield-bearer. Worst case anywhere: a heart and a shove, or 15 s.

## 8. Touch controls

Six round buttons when `ontouchstart` exists: ◀ ▶ bottom left; ⤒ jump and
⚔ bottom right; ▲ ▼ above them. Changes: 72 px with 16 px gaps; ⚔ dimmed
with the sheathed glyph in levels 1 and 2, full in level 3; ▲ ▼ glow at
a gate or a marked rope and also climb poles and ropes; hints read "tap ▲
far, ▼ near" on touch. Jump hold works, so bounce height and plank drops
(▼ plus ⤒) work. Landscape.

## 9. Rules for the level designer

1. **Patrol length** 400 to 800 px. Both ends visible from the wait spot.
2. **One guard per lane per screen** (1280 px). Two guards in one lane need
   a gate between them, except the two gateway sentinels.
3. **Two ways past every guard**: a gate inside or at the edge of his
   patrol, and either a hold 90 px or more above his floor, a block to
   hide behind, or a flat run behind his back.
4. **Gates and marked ropes are announced**: lamplit, visible 500 px off,
   on flat ground at least 200 px long, never at the end of a jump, in
   pairs 600 to 1,200 px apart. The first of each kind has a hint. Level
   3's gate is plain timber post-and-lintel with lamps, no crimson, arrow
   glyph black (Decision 7).
5. **No cone within 150 px of a drop landing, a rope landing, or a
   checkpoint.** A gate exit may lie in a cone sweep only if the guard in
   the target lane is on screen from the gate and walks away a full leg.
6. **Checkpoints** on the main lane, 1,000 to 1,500 px apart, one before
   each crossing beat, one after each forced stealth beat, one between the
   gateway sentinels.
7. **Forced stealth beat** = guard plus a stop inside his leash (section
   3). At most one per checkpoint span; a free run follows it.
8. **Gaps, steps, and pieces**: a single-jump gap at most 220 px; a
   double-jump gap at most 380; a step up at most 140 px. Each piece's
   first use follows section 2a's common rules. No pole or rope inside a
   gate's x-range (↑ would mean two things). `killY` only under a visible
   drop.
9. **Kasu** in lines of three to five on the better line; never into a
   cone, never off the route.
10. **Level 3**: the gateway is the only place all three lanes close and
    the only place a sentinel stands. Fighters at least 400 px apart in a
    lane, on flat ground with 300 px of retreat, never two awake at once.

## 10. Open questions for Gaurav

1. **The ship-deck closing beat in level 2.** It costs slot 25 and a
   backdrop drift; Decision 1 puts the deck level in release two. Options:
   (a) keep the beat, 600 to 800 px of deck, no guard; (b) end at the
   quay. Recommendation: (a); level 2's rigging and yard live there.

Rulings taken here: lane-dependent focus is the builder's call; the double
jump stays; fall damage is one heart; shallow water in level 3 slows,
never kills.

## Revision notes

- 2026-10-25, third draft, after Gaurav's playtest of level 1 (Decisions
  10 to 16), VISION draft 4, RESEARCH 3.4, and the builder's memory. Budget
  raised from 2,500 to 3,200 words for the new traversal section, per the
  coordinator. New section 2a (numbered so the level files' citations of
  sections 3 to 9 hold): fourteen pieces across three levels with numbers,
  guard interactions, and teaching order; marked depth ropes and vines
  (Decision 15). The 0.5 s gate stand becomes a 0.5 s leap with scale and
  arc, still catchable (Decision 16). The sword is made legible with a
  handover, a HUD glyph, a hilt response, and a first-draw stroke
  (Decision 10); strings requested in NOTES.md. Difficulty table rebuilt
  for 3 to 4 minute levels with per-beat arithmetic (Decision 12
  supersedes 9). Block or bale now occludes a cone; hanging still counts
  as stopped. Risks, stated: gangplank and mud slide need a slope
  primitive the engine lacks; the kit adds about twenty sprites and props;
  the widths are arithmetic, not layouts or playtest; the build's smoke
  bot cannot test swings.
- 2026-10-25, second draft, after the design review, the levels review,
  and Decisions 7 to 9. Catch rewritten (Decision 8); forced beats
  recounted; targets corrected (Decision 9); rule 5 reworded; sentinels
  added; attack lock 0.16 s; sprite list; ship-deck beat to section 10.
- 2026-10-25, first draft. Constants measured from `index.html` and a
  Playwright run. Guard sight, chase, and catch are new. Not done: no
  playtest with a child.

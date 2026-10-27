# Chola: Tides of Bronze — Design

Owner: game-designer. Readers: builder, level-designer, tester. Fourth
draft, 2026-10-26, under `docs/VISION.md`, `docs/DECISIONS.md` (rulings 1
to 26), `docs/RESEARCH.md`, and `docs/research/game-feel-deep-dive.md`
("the report").

Budget: 4,400 words for sections 1 to 10, counting prose and table cells.
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
- Attack: 0.28 s, movement locked 0.16 s; reach in section 4.

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

1. **Handover.** Level 1 opens with an older man of his company
   [invented, below commander rank] handing Ilamaran the sheathed sword:
   a short skippable scene.
2. **HUD glyph.** An ink sword after the hearts, sheathed until the first
   cut in level 3. A sign, never a count.
3. **Press in levels 1 and 2.** A hand on the hilt pushes the blade home
   (0.3 s, no lock), a click, the glyph pulses; a line floats on the first
   press of each level and after 30 s without one. ⚔ shows dimmed.
4. **Kadaram.** A draw prompt before the first fighter; the first cut
   sweeps an ink stroke along the blade.

**Without a sword,** the guard is terrain that moves, and the kit is for
getting past a thing that sees (Pillar 2).

## 2a. Traversal kit

Numbered 2a so section numbers the level files cite stay valid. Decisions
11, 14, 15; RESEARCH 3.4 sets what each piece may be.

**Common rules.** Each level introduces two ideas and ends on a stretch
combining everything the player has (VISION 5). A piece is first met where
a fall is safe (no `killY` below, no guard in its lane within 900 px, kasu
tracing the motion), then beside a guard, then in the combination. Guards
and fighters never climb, push, bounce, swing, or slide; they walk
platforms, planks, gangplanks, and walkways. A hero hanging still with his
feet in a guard's band counts as stopped; climbing or swinging is moving.
Grab a pole, rope, or line by touching it airborne or holding ↑; jump
leaves a pole with `vy -700`, `vx 300` away.

**Rope and vine swing (Decisions 20, 25).** A pumped pendulum whose
rhythm follows its length, replacing `ROPE_PERIOD`: ω² = 2300 / r, r from
anchor to hands (at least 120 px), so the period is 2π√(r/2300): 1.66 s
at 160 px, 1.94 at 220, 2.27 at 300 (report item 12). Gravity at the
hands is the game's 2,300 at any grip, which removes the float of a high
grip; idle sway uses the full length. Limit 50°, never below 45 (LEVEL-2's
R2), by an energy cap with a safety clamp at 70° (item 8). Pump 2.4
rad/s²; damping 0.12/s; a running grab keeps 0.8 of run speed. Jump
releases along the tangent at 1.3 × hand speed plus `vy -420` and spends
the double jump; speed above 385 bleeds off at 300 px/s². A swinging hero
is never caught.

| Piece | Lvl | Does | Numbers | With guards |
|---|---|---|---|---|
| Scaffold pole | 1 | Climb ↑↓ | 160 px/s up, 220 down; 200 to 400 tall | He cannot follow |
| Scaffold plank | 1 | One-way platform; ↓ plus jump drops through | 20 thick, 120 to 300 wide, 110 to 140 apart | Walks planks in his lane; 90 px up hides |
| Hauling rope | 1 | Climb, swing | 130 px/s; idle sway ±12 px; 160 to 320 long | As pole |
| Block on rollers | 1 | Hold into it 0.25 s, then push along its roller track only | 80 wide, 64 tall; push 120 px/s | Top is a step; stops a cone at its face, so the hero (56 tall) hides behind it; a guard turns at it |
| Cloth awning, undyed | 2 | Landing on it bounces; no standing | `vy -1000` (217 px), `-1100` with jump held (263 px) | He walks under; bouncing is moving |
| Cargo bale | 2 | Pushed like the block, no track | 96 wide, 72 tall; push 140 px/s | As block |
| Gangplank | 2 | Slope, quay to deck | Up to 25°; 330 px/s up, 385 down | He walks it |
| Rigging line, mast | 2 | Climb by the lashings | 130 px/s; mast to 480 px | As pole |
| Yard | 2 | The ship's high path | 20 thick, 200 to 400 wide, 300+ above deck | Above every band |
| Vine or rattan | 3 | Pumped swing; jump releases | 160 to 260 long; swing numbers above | Out of reach; release over his head |
| Prop roots | 3 | Small one-way platforms; arches are walls | Knots 60 to 100 wide, at most 120 apart | Fighters stay off |
| Shallow water | 3 | Under roots and walkways; wading, never death (Decision 2) | Wade 160 px/s; jump capped at 77 px | Fighters do not wade |
| Stilt walkway | 3 | Sections sway, so gaps open and close | ±20 px, period 2.4 s, neighbors opposite: gap 40 to 120 | No fighter stands on one (rule 10) |
| Mud slide | 3 | Riverbank slope; the hero slides | 30°; 520 px/s, hold back for 380; jump keeps speed; no stopping or climbing back | No one follows; any chase ends |

Blocks and bales never leave their lane and return to their start on any
checkpoint return, so no layout can lock.

**Depth-crossing ropes and vines (Decision 15).** A marked rope (level 2)
or vine (level 3) carries the gate's lamp at its anchor, an ink ring at
grab height, and the gate's arrow glyph (black in level 3, Decision 7).
Unmarked ones never cross. Grab it, then press ↑ (far) or ↓ (near): a
half period of its length on a 60 px sine arc, scale tweening as in the leap, landing on
target-lane footing at the rope's set landing x (0 to 300 px east). The
lane changes at release. The swing is moving, so it cannot be caught.

**By level.** Level 1 teaches climbing and pushing; level 2 bouncing and
rigging, with bales; level 3 swinging and sliding, roots, water, and
walkways being terrain on known verbs. Each ends on a combination.

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

**Caught (Decision 8).** A moving Ilamaran is never caught. He is caught
when stopped within 40 px of the guard's front edge: under 100 px/s for
0.2 s, wall-sliding, hanging still in the band, or in a gate leap. The
guard grabs a shoulder, one heart goes, Ilamaran is shoved 200 px back
(`vx 260`, `vy -380`), black ink, never crimson. The guard scolds 1.5 s,
then patrols. Invulnerable 1.2 s. No checkpoint reset (VISION 4). The
third heart lost: a 1 s ink-wash to the last checkpoint.

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

Frames at 60 fps; the report's windows and stuns are inference, to tune.

**The fighter.** Patrols and sees like a guard. Seen: he advances at 180
px/s and stops 60 px off (report item 1). He repeats thrust, thrust,
overhead cut:

| Attack | Telegraph | Strike | Recovery | Counter |
|---|---|---|---|---|
| Thrust (gold) | 0.5 s raise, gold glint on the blade | 70 px past his front edge, 0.15 s, one heart | 0.7 s | Parry, or step back 120 px or jump 60, then cut |
| Overhead cut (black seal) | 0.6 s, black ink seal on a pale halo over his head | 80 px past his front edge, 0.15 s, one heart | 1.0 s | Cannot be guarded: step back or jump, then cut |

Gold means "parry this," black ink "avoid this" (Decision 24); never
crimson, and black because indigo sinks into Kadaram's palette (Decision
17). A cut into his raised blade during a telegraph clashes: spark, both
pushed 16 px apart, no harm. The hero's cut reaches 64 px past his front
edge (item 1); two cuts defeat him. Leash 300 px; he never changes lane or
follows onto a vine, root, or slide.

**The parry (Decision 24).** J/X or ⚔ pressed against a gold thrust.
- **Window:** 10 frames (0.17 s), 7 before the strike to 3 after (item
  16: 0.15 to 0.2 s); 14 frames for S1.
- **Good parry:** hitstop 14 frames, gold ink ring, clang; a 0.3 s beat at
  40 percent speed, camera 8 percent closer; he reels, stunned 0.9 s (item
  16: 0.6 to 1.0). A cut in the stun is the counter and counts two.
- **Mistimed** (8 to 18 frames early, 4 to 9 late): a guard. Dull clink,
  Ilamaran slides back 24 px, no heart lost, no stun.
- No second parry for 0.4 s after either, so mashing guards at best. A
  press against a black seal does nothing.

Hitstop on hits: 5 frames, 10 on the defeating cut (item 2).

**The sentinel.** No patrol: stands facing west, wakes when his cone is
entered, full pattern. Gateway only; a `stand` flag is a builder task.

**The shield-bearer (variant).** Shield held forward; he alternates a gold
thrust and a black-seal bash (0.6 s, 60 px, recovery 1.0 s). Any other
front cut sparks on the shield and recoils Ilamaran 10 px (item 7). Two
ways in: **parry** his thrust and the shield swings aside 1.2 s (item 16)
for one counter cut, counting one; or **get behind** him, jumping his 54 px
height during the bash recovery, and cut his back before he turns 0.8 s
later. Two hits defeat him. After the first sentinel only.

**Teaching, before the gateway.** S1 (5340 to 5740) thrusts gold only, with
the wide window; his first telegraph runs 0.75 s under a parry prompt. S2
adds the black seal every third attack, prompted once. S3 and S4 are
optional practice. Step back and cut still beats every fighter; only the
shield-bearer asks for a parry or a jump.

**Where it is forced.** Pillar 2 wins at the gateway, Pillar 1 elsewhere
(VISION 3). Every fighter before it has a lane, vine, or walkway around
him. The gateway, a timber palisade with a carved torana (RESEARCH 3.3),
closes all three lanes: a sentinel, a checkpoint, the shield-bearer. No
reward.

**Sprites beyond slots 17 and 18** (NOTES.md slots): fighter raise,
thrust, overhead cut, reel, shield walk, bash, kneel and wash-out; hero
parry and guard poses; guard reach (22); the kasu and named kasu
(section 6).

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

**Checkpoints.** A main-lane banner, 1,000 to 1,500 px apart (rule 6). It
lights when the hero passes its x in any lane or height; he returns to the
banner (builder task; the engine checks lane 1 within 30 px).

**Cost in time.** A catch: 3 s. A fall or three hearts gone: 5 to 15 s.

## 6. Kasu (Decision 26)

One loop: kasu lead the eye and fill a purse spent at ports; clusters lead
to detours that mark the voyage map and hold named kasu, which open
history cards. Never a score: no counter in a level, no end tally, no "x
of y," no empty slots (Pillar 3).

**Trail kasu.** Lines of three to five tracing a jump, a release, the safer
lane, or a guard's open back; about 24 a level. Pickup: a pale gold-leaf
bloom, distinct from the lane-change ink, and a soft clink, not a chime
(report item 14). Sprite per RESEARCH 6. They never respawn: nothing to
grind.

**Detours.** A cluster of five to seven kasu fans off the route; a free
stake at the entrance (Decision 27) and a low bronze note within 400 px
cue it. The detour is 300 to 800
px, 15 to 30 s, one piece of the level's kit with a small twist, no guard,
no `killY`, rejoining the route farther east. At its end, a lit place (a
wayside shrine, a guild storeroom, a stilt-house porch) and a named kasu.
Two a level.

**Named kasu.** Six, one per detour: a heavier coin, its own glint and
deeper note. Pickup floats its name for 1.5 s, writes its card, and lights
a lamp on the voyage map. Play never pauses.

**History cards.** Six slots, two per level: title, 60 to 90 words, one
image, RESEARCH tags kept; topics and text from the historian and
narrative designer (NOTES.md). Only found cards show.

**The voyage map (Decisions 28, 29).** A true-scale painted map of the
Bay of Bengal (South India, Sri Lanka, the Nicobars, the Malay peninsula,
Sumatra), with a palm-leaf strip of sailing directions along its lower
edge. It opens by itself on the interstitials before levels 2 and 3, from
a button in each port, and from the pause screen (Esc, P, or a touch
pause button) at any time in a level.

*On the map:* a dotted ink course drawn only as far as the fleet has come,
a small ship (a walking figure in level 1) where it is now, ink labels. At each level's place
(Thanjavur, Nagapattinam, Kadaram) sit a lamp for each detour found there
and a small coin for each named kasu found; select the coin to read its
card. Crew pennants sit at the port where they were bought. Nothing marks
what was missed.

*On the strip:* four lines, read left to right, each a small landmark
drawing, its name, and the days, as the 1015 *Song Shi* counts a voyage
(RESEARCH 6b). Days come from RESEARCH 6b's distances at 3 to 5 knots and
are [plausible]:

| Line | Leg | Days | Fills in |
|---|---|---|---|
| 1 | Thanjavur to Nagapattinam, overland | 3 on foot | On finishing level 1 |
| 2 | Nagapattinam, south past Sri Lanka's north | 2 | Leaving the quay port |
| 3 | Sri Lanka's north to the Nicobars (Manakkavaram) | 9 | On the level 3 interstitial |
| 4 | The Nicobars across to Kadaram | 5 | On the level 3 interstitial, as the fleet lands |

On the level 3 interstitial the ship sails lines 3 and 4 leg by leg,
about 2 s each, each line writing itself in as the ship arrives; any key
skips. Lines ahead are bare leaf. One fixed card, always there and not
one of the six, says the strip's form is invented (Decision 29).

**Ports.** Two scenes of about 45 s: Nagapattinam's market between levels
1 and 2, and the quay the night before sailing between 2 and 3 (the
historian may name a better last port). Only here is the purse shown: a
heap and its number at the point of trade (Decision 26). Each good is
bought once:

| Port | Good | Price | What it does |
|---|---|---|---|
| Market | Ghee for a temple lamp | 12 | A fourth heart in level 2 |
| Market | A boatman's word | 10 | Lights the target in LEVEL-2.md section 9 |
| Market | Rice and fish for the crew | 6 | A crew line; a pennant on the map |
| Quay | An offering before sailing | 12 | A fourth heart in level 3 |
| Quay | A pilot for the Merbok river | 10 | Lights the target in LEVEL-3.md section 9 |
| Quay | Provisions for the crossing | 6 | A crew line; a pennant on the map |

The main trail (about 24) buys two market goods; with the clusters (about
12) all three. Unspent kasu carry over. No good opens the road, and
"Onward" always leaves; a player short of a price hears one line and keeps
his coins. Nothing persists past the run (saving is out of scope).

**Paid hints (Decision 30).** A paid hint reveals one thing no free sign
marks: a named kasu's hiding place or a shortcut, chosen per level by the
level designer ("the target in LEVEL-N.md section 9"). It never points at
a staked detour entrance. In the world, a coir-wrapped hand lamp burns at
the target from the level's start, gold flame and a thin rising thread of
light, visible 600 px off, unlike the free stake in shape and color. It lasts the whole
level, through checkpoint returns, and goes out when the target is taken
(kasu picked up, shortcut entered) or the level ends. No other good gives
a hint.

**How it is learned.** Level 1's first trail leads into rope 1's release;
its first cluster sits in the first 1,500 px with a hint; the seller's
first line explains the purse; the first named kasu's float says a card
is kept.

**The builder adds:** the port scene (two instances: backdrop, three
goods, purse, buy, Onward; keys, mouse, touch); the voyage map; the card
viewer; the pause screen with its map button; the strip's fill-in and
the level 3 crossing sequence; the three pickups and the cluster cue; the
fourth heart; the paid-hint lamp; the run's purse, goods, marks, strip
lines, and cards held in memory.

## 7. Difficulty curve

| Level | Target time | Width | Guards or fighters | Forced stealth beats | Combat beats | Detours | New ideas |
|---|---|---|---|---|---|---|---|
| 1 Thanjavur | 2 min 58 s | 8,800 px | 6 guards | 1 (the pillar wall at 3440) | 0 | 2 | Gate leap and forward sight; climbing and pushing; kasu lead off the road |
| 2 Nagapattinam | 3 min 7 s | 11,600 px | 6 guards | 1 (the deck wall-jump) | 0 | 2 | Height hides; bouncing and rigging; the first marked rope |
| 3 Kadaram | 3 min 24 s | 13,300 px | 6 fighters (4 patrols, 2 gateway sentinels, one a shield-bearer) | 0 | 1 forced, up to 4 optional | 2 | The sword, the parry, the black seal; swinging and sliding |

**Arithmetic (Decision 12).** From the level files' beat-sheet sums: 178 +
187 + 204 = 569 s of play. Detours add up to 60 s a level if taken, ports
90 s in all: 11 to 14 minutes with the cards; VISION 7's 10 to 12 holds if
detours are skipped. Parry teaching sits inside S1 and S2's beats.

**The ten-year-old check.** Hardest skill: the pillar wall. Hardest
timing: a walkway gap. Hardest read: the shield-bearer. Worst case: a
heart and a shove, or 15 s.

## 8. Touch controls

Six round buttons when `ontouchstart` exists: ◀ ▶ bottom left; ⤒ jump and
⚔ bottom right; ▲ ▼ above them. Changes: 72 px with 16 px gaps; ⚔ dimmed
with the sheathed glyph in levels 1 and 2, full in level 3; ▲ ▼ glow at
a gate or a marked rope and also climb poles and ropes; hints read "tap ▲
far, ▼ near" on touch. Jump hold works, so bounce height and plank drops
(▼ plus ⤒) work. ⚔ also parries. Port and map screens take taps.
Landscape.

## 9. Rules for the level designer

1. **Patrol length** 400 to 800 px. Both ends visible from the wait spot.
2. **One guard per lane per screen** (1280 px). Two guards in one lane need
   a gate between them, except the two gateway sentinels.
3. **Two ways past every guard**: a gate inside or at the edge of his
   patrol, and either a hold 90 px or more above his floor, a block to
   hide behind, or a flat run behind his back.
4. **Gates and marked ropes are announced**: lamplit, visible 500 px off,
   on flat ground at least 200 px long, never at the end of a jump, in
   pairs 600 to 1,200 px apart, target footing at most 140 px above. The
   first of each kind has a hint. Level 3's gate is plain timber
   post-and-lintel with lamps, arrow glyph black (Decision 7).
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
9. **Kasu and detours**: trail kasu in lines of three to five on the
   better line, never into a cone, about 24 a level. Two detours a level,
   each a cluster of five to seven leaving the route, 300 to 800 px, no
   guard, no `killY`, rejoining the route farther east, never mid-chain
   or mid-fight; level 1's first within its first 1,500 px.
10. **Level 3**: the gateway is the only place all three lanes close and
    the only place a sentinel stands. Fighters at least 400 px apart in a
    lane, never two awake at once, on ground that does not move (a fixed
    walkway counts) with 300 px of retreat. No fight on a swaying section.
    S1 gold thrusts only; the black seal from S2 on (section 4).

## 10. Open questions for Gaurav

1. **The ship-deck closing beat in level 2.** It costs slot 25 and a
   backdrop drift; Decision 1 puts the deck level in release two. Options:
   (a) keep the beat, 600 to 800 px of deck, no guard; (b) end at the
   quay. Recommendation: (a); level 2's rigging and yard live there.

Rulings taken here: lane-dependent focus is the builder's call; the double
jump stays; fall damage is one heart; shallow water in level 3 slows,
never kills.

## Revision notes

- 2026-10-26, fourth draft, voyage map and paid hints (Decisions 27 to
  30, RESEARCH 6b). Budget raised to 4,400 for at most 400 added words,
  per the coordinator. The voyage map is now a true-scale map with a
  four-line palm-leaf strip (Thanjavur overland, past Sri Lanka, the
  Manakkavaram, Kadaram), with when it opens, when each line fills, and where
  lamps, named kasu, and pennants sit; a fixed card says the strip's form
  is invented. The boatman and pilot no longer light staked detour
  entrances; each lights one unmarked target the level designer names in
  LEVEL-2.md and LEVEL-3.md section 9. Detours now cue by their free
  stake (Decision 27). The day counts are computed, not sourced. The
  pause screen is new to the build.
- 2026-10-26, fourth draft, after Gaurav played all three levels, the
  game-feel report, and Decisions 24 to 26. Budget raised from 3,200 to
  4,000 words for the parry and kasu systems, per the coordinator.
  Section 4: parry on the attack key (10-frame window, 14 for S1),
  good parry 14-frame hitstop, 0.3 s slow beat, 0.9 s stun, counter
  counts two; mistimed presses guard; gold and black-seal telegraphs (black
  over indigo for contrast on Kadaram's palette); fighter pattern gains an
  unguardable overhead cut; shield-bearer opened by a parry or by getting
  behind; fighter stop 60 px and cut reach 64 per report item 1. Section
  2a: rope period follows grip length, 2π√(r/2300), with the energy cap
  (Decision 25). Section 6 rewritten as the kasu loop: trail, detours,
  named kasu, six cards, voyage map, two ports with six priced goods, no
  dead end, no score (Decision 26). Table gains a detours column; rule 9
  covers detours, rule 10 the S1/S2 teaching. Cut for budget: the sword
  section's detail, by-level combinations, and the old physics attack
  line, which the report found contradicted section 4. Risks: windows,
  stun, and prices are untested; the period-by-grip rule changes swing
  speeds, so LEVEL-1 to LEVEL-3's swing flights need a re-check.
- 2026-10-26, third draft, ruling pass on the level designer's LEVEL-2
  and LEVEL-3 notes and the builder's rope numbers. Section 7 now takes
  the level files' widths, counts, and beat-sheet times (178, 187, 204 s).
  Rule 10 holds: no fight on a swaying section, so S3 and S4 move (NOTES.md).
  Checkpoints light by x in any lane, a builder task that fixes the far-lane
  skip with no layout change. The builder's swing numbers are adopted as
  the rope and vine swing in 2a; vines release at `vy -420`, not -300.
  Also: first-use isolation narrowed to 900 px in the piece's lane; gate
  footing at most 140 px above (rule 4); bale-into-gap dropped as unused.
  The slope note was cut for budget; slopes still do not exist in the
  engine and LEVEL-3 lists them as new.
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

# Chola: Tides of Bronze — Design

Owner: game-designer. Readers: builder, level-designer, tester. Second
draft, 2026-10-25, written under `docs/VISION.md` (third draft) and
`docs/DECISIONS.md` (rulings 1 to 9), from the build in `index.html`,
`docs/RESEARCH.md` sections 4 to 6, the design and levels reviews, and the
level designer's notes.

Budget: 2,500 words for sections 1 to 10, counting prose and table cells.
Revision notes sit outside it.

Units: pixels at the 1280 by 720 canvas, seconds, px/s. "Lane" is the
build's depth index: 0 far, 1 main, 2 near. "Band" means the vertical
window a guard can see, measured between his feet and the hero's.

## 1. Core loop

**Every thirty seconds.** Run east, jump a gap or climb a step, see a
lamplit gate ahead and a crimson guard beyond it, and decide: cross to the
other depth now, or wait two seconds for his back and run past. Take the
kasu that trace the better line. Land, breathe, run.

**Every two minutes.** One leg of the voyage: a level opens on flat ground
that teaches one new idea, rises to a crossing (a canyon, a basin, a river)
where the main path is closed and the far and near paths each cost
something, and ends somewhere that moves the story east. A checkpoint
before the crossing, one after.

**Across the game.** Three legs: temple, port, foreign shore. The sword
stays at the hip through two and is drawn in Kadaram, where the road
allows no other way (Pillar 2). Then the ending.

## 2. Player verbs

Baseline constants from `index.html` (`movePlayer`, lines 627 to 699),
measured with Playwright:

- Run: `ACCEL 2600`, `MAXV 385`, `FRICTION 2200`. Full speed in 0.15 s.
- Gravity `2300`, terminal `1200`, wall-slide cap `150`.
- Ground jump `vy -830`: held, 150 px by formula, 163 measured; tapped
  (release clamps `vy` to `-300`), 77 measured. Running jump 216 px while
  climbing 120 px; flat, about 280.
- Double jump `vy -700`, once per airtime: held total 203 measured, 256 at
  best. Wall jump `vy -760`, `vx 430` away.
- Coyote 0.10 s, jump buffer 0.13 s. Hero hitbox 26 by 56.
- Lane shift only inside a gate (`links` x-range plus 14 px), needs footing
  in the target lane within 150 px above or 250 below, cooldown 0.3 s, no
  stop (this design adds a 0.5 s stand).
- Attack: 0.28 s, hitbox 52 wide, hero-high, 30 px ahead; movement locked
  while `attackT > 0.12`, so 0.16 s.

| Verb | Input | What it does | Cost | First taught |
|---|---|---|---|---|
| Run | ←→, A/D, ◀▶ | 385 px/s, both ways | None | Level 1, first 300 px |
| Jump | Space/W, ⤒ | 77 to 163 px by hold; jump cut on release | Airtime; a guard's band spans most of it | Level 1 stairs |
| Double jump | Jump in air | Up to 100 px more, once | Spent until landing | Level 1, first wide gap |
| Wall jump | Jump while sliding on a wall | Kicks away 430 px/s | Faces you away from the wall; sliding counts as stopped | Level 1 pillars |
| Cross at a gate | ↑↓ at a gate, ▲▼ | Changes lane, ink mark | A 0.5 s stand while the ink blooms; sight on the new lane applies at once | Level 1, first gate, hinted |
| Draw the sword | J/X, ⚔ | 0.28 s cut, 2 to defeat a fighter | Cannot move for 0.16 s | Level 3, first 400 px |

Kept as built: run, jump, double jump, wall jump, lane crossing. Changed:
the attack is inert in levels 1 and 2 (Decision 3); pressing it shows a
one-line float once per level, words by the narrative designer, so a child
does not think the key is broken. The ⚔ touch button is hidden until level
3. Not added: crouch; Pillar 1 makes the crossing the hiding, and a crouch
would add a fifth touch button, a sprite, and a rival hide.

**How levels 1 and 2 play without a sword.** The guard is terrain that
moves: a facing, a patrol, a band. The player's kit (lane, height, speed,
timing) is for getting past a thing that sees, and the kasu trail shows
the clean line (Pillar 2). Interest comes from the near/far choice at every
crossing, where one lane has the guard and the other the gaps; from the
rhythm of a patrol, 4 to 8 seconds a leg; and from the climb.

## 3. Stealth and avoidance

Guards appear in levels 1 and 2 only (Decision 3). All numbers are
constants.

**Patrol.** Walk 95 px/s between `x1` and `x2`, turn at the ends, face the
walking direction. The build's turn-toward-player within 220 px (line 745)
goes; a guard turns at his patrol ends or when he sees.

**Sight.** Same lane only, never across lanes (Pillar 1: the crossing is
earned, so it must be a hide). A forward cone: 0 to 300 px ahead of the
guard's face, band 80 px (hero feet within 80 px of guard feet). Nothing
occludes it. "Seen" needs 0.25 s continuous: an ink "?" over the guard,
then an ink "!" and a short shout. Behind the guard is safe; above the
band is safe: any ledge 90 px or more above his floor.

**Seen.** The guard turns and chases at 260 px/s, below the hero's 385, so
running east escapes him. He never passes 300 px beyond either patrol end,
never changes lane, jumps, or drops. Chase ends when the player leaves the
lane, is 420 px away, is out of band for 1 s, or 3 s pass; he stands 1 s
with a "?" and walks back at 95 px/s. No alarm, no second guard (Decision
2).

**Caught (Decision 8).** A moving Ilamaran is never caught: at 385 against
260 he outruns any guard, and a guard's body does not block him. He is
caught when stopped inside reach: within 40 px of the guard's front edge
while his speed is under 100 px/s for 0.2 s, while wall-sliding, or during
the 0.5 s stand of a gate crossing. Then the guard grabs a shoulder
(sprite: guard reach, NOTES.md slot 22), one heart goes, Ilamaran is shoved
200 px back the way he came (`vx 260`, `vy -380` as built), and the burst
is black ink, never crimson. The guard scolds for 1.5 s, then resumes his
patrol. Invulnerable 1.2 s. No checkpoint reset on a catch (Pillar 3;
VISION 4). Losing the third heart ends in a 1 s ink-wash fade to the last
checkpoint with hearts refilled.

**What forces a stop.** A forced stealth beat is a stop inside a chasing
guard's 300 px leash: a wall-jump climb, a landing that needs a stop, or a
gate crossing begun with the guard within 130 px (he closes that during
the stand). Gaps and steps are reads, taxed only when the player
hesitates. A guard on flat ground is a free beat.

**Hiding.** Three ways, all from existing verbs. Cross at a gate: no lane
sees another. Climb: a ledge 90 px above a guard's floor is out of band,
and the held jump reaches 150. Time: walk behind him; at 385 against 95,
a player can follow a guard all his patrol. Examples: `LEVEL-1.md`
section 5.

**The rule that keeps it from being tedious: the four-second window.** From
any spot where a player can stand unseen and watch a guard, a safe way past
opens within 4 s, and running it takes under 6 s. So a patrol leg is 400 to
800 px (4.2 to 8.4 s), the cone is 300 px, and a gate sits inside or at the
edge of every patrol: the wait is for one turn, never two. Nothing stacks:
one guard per lane per screen width (1280). A catch costs 3 s, a heart,
and a shove: the worst retry is the guard, never the stretch before him.
The game taxes stopping, never speed: a child who runs past a guard on
flat ground pays only the shout (Decision 2).

## 4. Combat in Kadaram

One enemy type, one variant, no Chola guard in level 3 (Decision 3). Slots
17 and 18, no crimson (Pillar 1). Dress and weapon per RESEARCH.md 3.3:
waist cloth, bare chest, head cloth, a straight short sword or spear.

**The fighter.** Patrols and sees like a guard (same constants). Seen: he
advances at 180 px/s and stops 90 px from the hero. Telegraph: 0.5 s with
the weapon raised and an ink flare at the tip. Thrust: hitbox 70 px ahead
of his front edge, hero-high, 0.15 s, one heart. Recovery: 0.7 s, when a
cut lands. Then telegraph again. Leash 300 px, never changes lane. Two
cuts defeat him; the hero's cut lands within 56 px ahead.

**The sentinel.** A fighter with no patrol: stands facing west, wakes when
his cone is entered, then behaves as above. Gateway only. The build cannot
stand a guard still (`x1 = x2` flips his facing every frame, line 743), so
a `stand` flag is a builder task.

**Reading it.** The raise is half a second: long enough for a child to step
back 120 px or jump (60 px up clears the thrust), short enough to feel like
a fight. Out, in, cut, out. Two rounds.

**The shield-bearer (variant).** Same numbers, plus a hide shield held
forward: a cut from the front outside his 0.7 s recovery is an ink puff on
the shield. Gateway only, after the first sentinel.

**Where it is forced.** VISION 3 settles it: Pillar 2 wins at the gateway,
Pillar 1 everywhere else. Every fighter before the gateway has a lane
around him. The gateway, a timber palisade with a carved torana (RESEARCH
3.3), closes all three lanes: a sentinel, a checkpoint, the shield-bearer.
No reward (Pillar 2): no kasu, no text, no count.

**Sprites needed beyond ASSETS.md 17 and 18** (NOTES.md slots): fighter
raise, thrust, shield walk, kneel and wash-out (30 to 33); guard reach
(22); the kasu coin per section 6 (new).

**Violence rule (Decision 2).** Every hit, given or taken, is a black ink
splash; no red on any body. A defeated fighter drops to one knee, raises
an open hand, and washes out to paper in 1.5 s: no body, no death pose, no
"felled" float. The build's `Guard felled` float, crimson burst, and
`sfx.kill` go. The hero takes a hit the same way: ink and a stagger.

## 5. Health, failure, checkpoints

**Three hearts, kept.** A child can count to three and an adult reads
three as fair. A catch, a thrust, or a fall costs one heart (the build's
fall damage drops from 2). Hearts refill at every checkpoint.

**Failure.** Zero hearts: 1 s ink-wash, back to the last checkpoint, three
hearts. A fall: one heart and the same return. The build's `deaths` counter
and end-screen stats go; no lives counter exists (Pillar 3).

**Checkpoints.** A planted banner on the main lane (the build registers
them on lane 1 only, within 30 px). Spaced 1,000 to 1,500 px, so the most
a fall costs is about 15 s of running. Placement is section 9, rule 6.

**Cost in time.** A catch: 3 s. A fall or three hearts gone: 5 to 15 s.

## 6. Collectibles

Kasu stay as a trail (VISION 3): a line of three to five shows a jump arc,
the safer lane, or the way a guard's back opens. Pickup is an ink bloom and
nothing else: the `+1 kasu` float, the chime, the HUD counter (`drawHUD`
line 1604), and the `totalCoins` tally go. The end screen carries no
numbers; in place of the tally it carries the one line of cost (Decision
4), the narrative designer's. Sprite per RESEARCH 6: thick, irregular,
pale gold, a standing figure, no lettering.

## 7. Difficulty curve

| Level | Target time | Guards or fighters | Forced stealth beats | Combat beats | New idea |
|---|---|---|---|---|---|
| 1 Thanjavur | 2 min 5 s | 5 guards | 1 (the wall-jump pillars at 2480, inside M1's leash) | 0 | A gate crosses depth; a guard sees forward only |
| 2 Nagapattinam | 2 min 10 s | 6 guards | 1 (the deck at 4000 rebuilt as a 190 px wall-jump; 0 until then) | 0 | Height hides: ledges above the band; guards on both lanes of the basin, pick the lesser |
| 3 Kadaram | 2 min 30 s | 5 fighters (3 patrols passable by lane, 2 gateway sentinels, one a shield-bearer) | 0 | 1 forced, up to 3 optional | The sword and the half-second telegraph |

**Arithmetic (Decision 9).** Widths from the level files: 6,600, 6,900,
7,200 px. Running at 385 px/s: 17, 18, 19 s. Waits of at most 4.2 s: five,
six, three: 21, 25, 13 s. Climbs, gate stands, reading: 40 s a level.
Retries: six at about 8 s: 48 s. Level 3 adds two gateway fights at 15 s.
Totals 126, 131, 150 s: about 7 minutes of play, 8 with the cards. Level
2's forced count waits on the level designer (NOTES.md).

**The ten-year-old check.** Hardest skill: the level 1 wall-jump pillars.
Hardest read: the shield-bearer, beaten by waiting. Worst case anywhere: a
heart and a shove, or 15 s.

## 8. Touch controls

The build shows six round 60 px buttons when `ontouchstart` exists: ◀ ▶
bottom left; ⤒ jump and ⚔ attack bottom right; ▲ ▼ above them. Changes:
buttons 72 px with 16 px gaps; ⚔ hidden until level 3; ▲ ▼ glow only while
the hero stands in a gate; the hint reads "tap ▲ far, ▼ near" on touch.
All six verbs supported; jump hold works. Landscape.

## 9. Rules for the level designer

1. **Patrol length** 400 to 800 px. Both ends visible from the wait spot.
2. **One guard per lane per screen** (1280 px). Two guards in one lane need
   a gate between them, except the two gateway sentinels.
3. **Two ways past every guard**: a gate inside or at the edge of his
   patrol, and either a ledge 90 px or more above his floor or a flat run
   behind his back.
4. **Gates are announced**: lamplit, visible 500 px off, on flat ground at
   least 200 px long, never at the end of a jump, in pairs 600 to 1,200 px
   apart. The first gate of each level has a hint. Level 3's gate is plain
   timber post-and-lintel with lamps, no crimson, arrow glyph off
   (Decision 7).
5. **No cone within 150 px of a drop landing or a checkpoint.** A gate exit
   may lie in a cone sweep only if the guard in the target lane is on
   screen from the gate and walks away a full leg, so the crossing is a
   read, not a gamble.
6. **Checkpoints** on the main lane, 1,000 to 1,500 px apart, one before
   each crossing beat, one after each forced stealth beat, one between the
   gateway sentinels.
7. **Forced stealth beat** = guard plus a stop inside his leash (section
   3). At most one per checkpoint span; a free run follows it.
8. **Gaps and steps**: a single-jump gap at most 220 px; a double-jump gap
   at most 380; a step up at most 140 px. Beyond those, a wall. `killY`
   only under a visible drop.
9. **Kasu** in lines of three to five on the better line; never into a
   cone, never off the route.
10. **Level 3**: the gateway is the only place all three lanes close and
    the only place a sentinel stands. Fighters at least 400 px apart in a
    lane, on flat ground with 300 px of retreat, never two awake at once.

## 10. Open questions for Gaurav

1. **The ship-deck closing beat in level 2.** Proposed by the
   creative-director (NOTES.md); LEVEL-2.md already ends on a gangplank. It
   costs slot 25 and a backdrop drift the build lacks; Decision 1 puts the
   deck level in release two. Options: (a) keep the beat, 600 to 800 px of
   deck, no guard; (b) end at the quay and let the card tell the crossing.
   Recommendation: (a), the one place the voyage is seen rather than told.

Rulings taken here: lane-dependent focus is the builder's call; the double
jump stays; fall damage is one heart.

## Revision notes

- 2026-10-25, second draft, after the design review, the levels review,
  the level designer's notes, and Decisions 7 to 9. Catch rewritten: only
  a stopped hero is caught (Decision 8), and a gate crossing now costs a
  0.5 s stand so a gate can be the stop. Forced beats recounted under that
  rule (1, 1 pending the deck rebuild, 0). Targets corrected to about 2
  minutes with the arithmetic shown (Decision 9). Rule 5 takes the level
  designer's wording; rule 1 reads "from the wait spot"; sentinels added
  to section 4 and exempted from rule 2; level 3 gate per Decision 7.
  Attack lock corrected to 0.16 s; thrust measured from the front edge;
  sprite list added, kasu included; build-specific level 1 example
  replaced by a pointer to LEVEL-1.md; ship-deck beat moved to section 10.
  Pushed back on nothing. VISION 7's "4 to 6 minutes" is the
  creative-director's to correct under Decision 9.
- 2026-10-25, first draft. Constants measured from `index.html` and a
  Playwright run (held jump 163 px, tapped 77, double 203, running jump 216
  px over a 120 px rise). Guard sight, chase, and catch are new; the
  build's guard only turns toward the player and hurts on contact. Attack
  on guards, `Guard felled`, kasu counter and float, end stats, and the
  crimson hurt burst are removed by this design. Not done: no playtest
  with a child; the four-second window and the 300 px cone are set by
  arithmetic on patrol speed and should be checked in the first playtest.

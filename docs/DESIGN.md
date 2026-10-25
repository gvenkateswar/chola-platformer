# Chola: Tides of Bronze — Design

Owner: game-designer. Readers: builder, level-designer, tester. First
draft, 2026-10-25, written under `docs/VISION.md` (third draft) and
`docs/DECISIONS.md` (six rulings), from the build in `index.html` and
`docs/RESEARCH.md` sections 4 to 6.

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

**Every five minutes.** One leg of the voyage: a level opens on flat ground
that teaches one new idea, rises to a crossing (a canyon, a basin, a river)
where the main path is closed and the far and near paths each cost
something, and ends somewhere that moves the story east. A checkpoint
before the crossing, one after.

**Across the game.** Three legs: temple, port, foreign shore. The sword
stays at the hip through the first two and is drawn in Kadaram, where the
road allows no other way (Pillar 2). Then the ending.

## 2. Player verbs

Baseline constants from `index.html` (`movePlayer`, lines 627 to 699),
measured with Playwright on 2026-10-25:

- Run: `ACCEL 2600`, `MAXV 385`, `FRICTION 2200`. Full speed in 0.15 s.
- Gravity `2300`, terminal `1200`, wall-slide cap `150`.
- Ground jump `vy -830`: held, 150 px by formula, 163 measured; tapped
  (release clamps `vy` to `-300`), 77 measured. Running jump covered 216 px
  while climbing 120 px; flat, about 280.
- Double jump `vy -700`, once per airtime: held total 203 measured, 256 at
  best. Wall jump `vy -760`, `vx 430` away.
- Coyote 0.10 s, jump buffer 0.13 s. Hero hitbox 26 by 56.
- Lane shift only inside a gate (`links` x-range plus 14 px), needs footing
  in the target lane within 150 px above or 250 below, cooldown 0.3 s.
- Attack: 0.28 s, hitbox 52 wide and hero-high, 30 px ahead.

| Verb | Input | What it does | Cost | First taught |
|---|---|---|---|---|
| Run | ←→, A/D, ◀▶ | 385 px/s, both ways | None | Level 1, first 300 px |
| Jump | Space/W, ⤒ | 77 to 163 px by hold; jump cut on release | Airtime; a guard's band spans most of it | Level 1 stairs (x 300 to 900) |
| Double jump | Jump in air | Up to 100 px more, once | Spent until landing | Level 1, first gap too wide for one jump |
| Wall jump | Jump while sliding on a wall | Kicks away 430 px/s | Faces you away from the wall | Level 1 pillars (x 1960 to 2450) |
| Cross at a gate | ↑↓ at a gate, ▲▼ | Changes lane, ink mark, 0.3 s cooldown | Only at gates; sight on the new lane applies at once | Level 1, first gate (x 1250), hinted |
| Draw the sword | J/X, ⚔ | 0.28 s cut, 2 to defeat a fighter | Cannot move for 0.12 s | Level 3, first 400 px |

Kept as built: run, jump, double jump, wall jump, lane crossing. Changed:
the attack is inert in levels 1 and 2 (Decision 3); pressing it shows a
one-line float once per level, words by the narrative designer, so a child
does not think the key is broken. The ⚔ touch button is hidden until level
3. Not added: crouch. Pillar 1 makes the crossing the hiding; a crouch
would add a fifth touch button, a sprite, and a rival hide.

**How levels 1 and 2 play without a sword.** The guard is terrain that
moves. Each guard has a facing, a patrol, and a band; the player's kit
(lane, height, speed, timing) is for getting past a thing that sees, and
the kasu trail shows the clean line (Pillar 2: Ilamaran has nothing to say
to a gate guard but his back). Interest comes from the near/far choice at
every crossing beat, where one lane has the guard and the other the gaps;
from the rhythm of a patrol, 4 to 8 seconds a leg; and from the climb,
since height is a hide.

## 3. Stealth and avoidance

Guards appear in levels 1 and 2 only (Decision 3). All numbers are
constants the builder sets once.

**Patrol.** Walk 95 px/s between `x1` and `x2`, turn at the ends, face the
walking direction. The build's turn-toward-player within 220 px (line 745)
is removed; a guard turns only at his patrol ends or when he sees.

**Sight.** Same lane only, never across lanes (Pillar 1: the crossing is
earned, so it must be a hide). A forward cone: 0 to 300 px ahead of the
guard's face, band 80 px (hero feet within 80 px of guard feet). Nothing
occludes it. "Seen" needs 0.25 s continuous; the first 0.25 s shows an ink
"?" over the guard, then an ink "!" and a short shout. Behind the guard is
safe at any distance. Above the band is safe: any ledge 90 px or more above
his floor.

**Seen.** The guard turns and chases at 260 px/s, below the hero's 385, so
running east escapes him. He never passes 300 px beyond either patrol end,
never changes lane, never jumps or drops. Chase ends when the player leaves
the lane, is 420 px away, is out of band for 1 s, or 3 s pass; he stands
1 s with a "?" and walks back at 95 px/s. No alarm, no second guard called
(one guard is one problem, Decision 2).

**Caught.** Contact in any state: the guard grabs a shoulder (this needs a
sprite: guard reaching, one pose, new slot), Ilamaran loses one heart and
is shoved 200 px back the way he came (`vx 260`, `vy -380` as built), the
burst is black ink, never crimson. The guard stands 1.5 s in a scolding
stance facing where the hero was, then resumes his patrol in the direction
he had. Invulnerable 1.2 s. No reset to checkpoint on a catch (Pillar 3:
nothing taken back that was left behind; VISION 4: a fall that resets a
stretch is a cheap death). Losing the third heart ends in an ink-wash fade
of 1 s to the last checkpoint with hearts refilled.

**Hiding.** Three ways, all from existing verbs. Cross at a gate: no lane
sees another. Climb: a ledge 90 px above a guard's floor is out of band,
and the held jump reaches 150. Time: walk behind him; at 385 against 95, a
player can follow a guard the length of his patrol.

**The rule that keeps it from being tedious: the four-second window.** From
any spot where a player can stand unseen and watch a guard, a safe way past
opens within 4 s, and running it takes under 6 s. So a patrol leg is 400 to
800 px (4.2 to 8.4 s), the cone is 300 px, and a gate sits inside or at the
edge of every patrol, so the wait is for one turn, never two. Nothing
stacks: one guard per lane per screen width (1280). A catch costs 3 s, a
heart, and a shove, so the worst retry is the guard, never the stretch
before him. Brute force is allowed and taxed: a child who takes the catch
and runs past during the scold gets through, a heart apiece, three hearts
to a checkpoint (Decision 2).

**Level 1 test.** Between x 1240 and 1900 the build has a far guard (1260
to 1840) and a main guard (1330 to 1700), gates at 1250 and 1620. At the
first gate the player sees the main guard coming and crosses up while the
far guard walks away; the gate at 1620 is the return. At the canyon (2980
to 3860) the far walkway carries a guard and the near plinths carry gaps:
lane as a trade, no guard forced.

## 4. Combat in Kadaram

One enemy type, one variant, no Chola guard in level 3 (Decision 3). Slots
17 and 18 in `ASSETS.md`, no crimson (Pillar 1). Dress and weapon follow
RESEARCH.md 3.3: waist cloth, bare chest, head cloth, a straight short
sword or spear.

**The fighter.** Patrols and sees like a guard (same constants). Seen: he
advances at 180 px/s and stops 90 px from the hero. Telegraph: 0.5 s with
the weapon raised and an ink flare at the tip. Thrust: hitbox 70 px ahead,
hero-high, for 0.15 s, one heart. Recovery: 0.7 s, during which a cut
lands. Then telegraph again. He never chases past 300 px beyond his patrol
and never changes lane. Two cuts defeat him. The hero's 0.28 s cut lands
if the fighter is within 56 px ahead.

**Reading it.** The raise is half a second: long enough for a child to step
back 120 px or jump (60 px up clears the thrust), short enough to feel like
a fight. The line is out, in, cut, out. Two rounds.

**The shield-bearer (variant).** Same numbers, plus a hide shield held
forward: a cut from the front during telegraph or patrol does nothing (an
ink puff on the shield). He is open during his 0.7 s recovery and from
behind. Appears only at the gateway, after the first fighter.

**Where it is forced.** VISION 3 settles it: Pillar 2 wins at the gateway,
Pillar 1 everywhere else. Every fighter before the gateway has a lane
around him. The gateway, a timber palisade with a carved torana (RESEARCH
3.3), closes all three lanes: one fighter, then the shield-bearer, in
sequence, never together. No reward (Pillar 2): no kasu, no text, no count.

**Violence rule (Decision 2).** Every hit, given or taken, is a black ink
splash. No red anywhere on a body. A defeated fighter drops to one knee,
raises an open hand, and washes out to paper in 1.5 s; no body remains, no
death pose, no "felled" float. The build's `Guard felled` float, crimson
burst, and `sfx.kill` go. The hero takes a hit the same way: ink, a
stagger, no blood.

## 5. Health, failure, checkpoints

**Three hearts, kept.** A child can count to three and an adult reads
three as fair. A catch, a thrust, or a fall costs one heart (the build's
fall damage of 2 drops to 1). Hearts refill at every checkpoint, so a
stretch is never entered wounded.

**Failure.** Zero hearts: 1 s ink-wash, back to the last checkpoint, three
hearts. A fall: one heart and the same return. The build's `deaths` counter
and end-screen stats are removed, and no lives counter exists (Pillar 3).

**Checkpoints.** A planted banner on the main lane (the build registers
them on lane 1 only, within 30 px). Spaced 1,000 to 1,500 px, never more,
so the most a fall costs is about 15 s of running. Always one before a
crossing beat and one after a forced stealth beat. Never inside a cone.

**Cost in time.** A catch: 3 s. A fall or three hearts gone: 5 to 15 s.
Nothing costs a level.

## 6. Collectibles

Kasu stay as a trail (VISION 3): a line of three to five shows a jump arc,
the safer lane, or the way a guard's back opens. Pickup is an ink bloom and
nothing else: the `+1 kasu` float, the chime, the HUD counter (`drawHUD`
line 1604), and the `totalCoins` tally go. They count toward nothing and
unlock nothing. The end screen carries no numbers; in place of the tally
it carries the one line of cost (Decision 4), which the narrative designer
writes. Sprite per RESEARCH 6: thick, irregular, pale gold, a standing
figure, no lettering.

## 7. Difficulty curve

| Level | Target time | Guards or fighters | Forced stealth beats | Combat beats | New idea |
|---|---|---|---|---|---|
| 1 Thanjavur | 4 min | 5 guards | 1 (the wall-walk pair, x 1240 to 1900) | 0 | A gate crosses depth; a guard sees forward only |
| 2 Nagapattinam | 5 min | 6 guards | 2 | 0 | Height hides: ledges above the band; guards on both lanes of the basin, pick the lesser |
| 3 Kadaram | 6 min | 5 fighters (3 passable by lane, 2 at the gateway, one a shield-bearer) | 0 | 1 forced, up to 3 optional | The sword and the half-second telegraph |

Fifteen minutes end to end, inside VISION 7. A forced stealth beat is a
guard followed by a climb or gap, so a chased player gets caught; a free
beat is a guard on flat ground. Level 2 closes on the ship deck (ruling in
section 10): 600 to 800 px of deck, no guard, the quay sliding away in the
far lane, the goal at the mast; one `wood` platform and a backdrop drift.

**The ten-year-old check.** Hardest skill: the level 1 wall-jump pillars,
with the double jump as forgiveness. Hardest read: the shield-bearer,
beaten by waiting. Worst case anywhere: a heart and a shove, or 15 s.

## 8. Touch controls

The build shows six round 60 px buttons when `ontouchstart` exists: ◀ ▶
bottom left; ⤒ jump and ⚔ attack bottom right; ▲ ▼ above them. Changes:
buttons 72 px with 16 px gaps; ⚔ hidden until level 3; ▲ ▼ glow only while
the hero stands in a gate, so the gate announces itself on a phone; the
hint reads "tap ▲ far, ▼ near" on touch. All six verbs supported; jump
hold works (`touchend` releases). Landscape only.

## 9. Rules for the level designer

1. **Patrol length** 400 to 800 px. Both ends visible from where the player
   first sees the guard.
2. **One guard per lane per screen** (1280 px). Two guards in one lane need
   a gate between them.
3. **Two ways past every guard**: a gate inside or at the edge of his
   patrol, and either a ledge 90 px or more above his floor or a flat run
   behind his back.
4. **Gates are announced**: lamplit, visible 500 px off, on flat ground at
   least 200 px long, never at the end of a jump, in pairs 600 to 1,200 px
   apart (in and out). The first gate of each level has a hint.
5. **No cone on a landing or a gate exit.** A guard's 300 px cone never
   reaches a point the player arrives at blind: within 150 px of a gate
   exit, a drop, or a checkpoint.
6. **Checkpoints** on the main lane, 1,000 to 1,500 px apart, one before
   each crossing beat, one after each forced stealth beat.
7. **Forced stealth beat** = guard plus a climb or gap ahead of him. At most
   one per checkpoint span; a free run follows it.
8. **Gaps and steps**: a single-jump gap at most 220 px; a double-jump gap
   at most 380; a step up at most 140 px. Beyond those, a wall. `killY`
   only under a drop the player can see.
9. **Kasu** in lines of three to five on the better line; never into a
   cone, never off the route.
10. **Level 3**: the gateway is the only place all three lanes close.
    Fighters at least 400 px apart in a lane, on flat ground with 300 px of
    retreat behind the hero, never two awake at once.

## 10. Open questions for Gaurav

1. **The brute-force tax.** As designed, a catch costs a heart and a shove,
   and a child can push through a guard during his scold. Options: (a)
   heart and shove, as written; (b) a catch returns the player to the last
   checkpoint. Recommendation: (a), for Decision 2 and VISION 4; the adult
   who reads the facing never pays.

Rulings taken here: the ship-deck closing beat in level 2 is accepted
(NOTES.md, creative-director, item 2) as a beat, not the release-two
level. Lane-dependent focus (item 1) changes nothing in play; the
builder's call. The double jump stays. Fall damage drops to one heart.

## Revision notes

- 2026-10-25, first draft. Constants measured from `index.html` and a
  Playwright run (held jump 163 px, tapped 77, double 203, running jump 216
  px over a 120 px rise). Guard sight, chase, and catch are new; the
  build's guard only turns toward the player and hurts on contact. Attack
  on guards, `Guard felled`, kasu counter and float, end stats, and the
  crimson hurt burst are removed by this design. Not done: no playtest
  with a child; the four-second window and the 300 px cone are set by
  arithmetic on patrol speed and should be checked in the first playtest.

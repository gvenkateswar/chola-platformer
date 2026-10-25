# Level 3 — Kadaram, 1025

Owner: level-designer. First draft, 2026-10-25, under DESIGN.md sections 4
and 9. Budget 900 words of prose and table cells. Units px; lanes 0 far,
1 main, 2 near; y is a platform's top.

## 1. Purpose

Teaches the sword and the half-second telegraph, with a way around every
fighter until the gateway. The player feels rain, unease, and the first
drawn blade. Serves Pillar 2: a fight the road forces, once, unrewarded.

## 2. The place

Kedah's port on the Merbok estuary: mangrove coast, low river plain, one
forested mountain behind [documented]. Houses on stilts over the water
[documented, Chinese sources two centuries later]. Small brick candi on
stepped plinths [documented]. No citadel; a timber palisade with a carved
gateway, the inscription's torana [plausible]. Rain, river, gongs,
cicadas [plausible]. Fighters in waist cloth, head cloth, short straight
sword, indigo, no crimson [plausible].

## 3. Beat sheet

| Beat | x | Does | Sees | T | Rule |
|---|---|---|---|---|---|
| Beach | 0–300 | Runs; sword hint | Rain, the fleet behind | 1 | 9 |
| First fighter | 300–1240 | Fights S1, or G1 up the stilt walk, G2 down | A man with a face, indigo | 3 | 10 |
| Banner | 1240–1480 | Breathes | Stilt houses | 2 | 6 |
| Stilt climb | 1480–2320 | Three stilts up, 310 px double jump to a roof | Water below | 3 | 8 |
| Roof drop | 2320–2980 | Drops 280, banner | Candi, S2 far off | 2 | 5, 6 |
| Candi flats | 2980–3840 | Fights S2, or G3 down to the bank, G4 up | Brick shrines | 3 | 10 |
| Banner | 3840–4200 | Picks a lane | River, walkway, roots | 2 | 4, 6 |
| The river | 4200–5020 | Far: porch over S3. Near: three root hops | Mist on flat water | 4 | 3, 8 |
| Before the wall | 5020–5400 | Banner; lanes 0 and 2 end | Palisade across the depth | 2 | 10 |
| Gateway fighter | 5400–5900 | Out, in, cut; two rounds | S4, a gong | 4 | 10 |
| Shield-bearer | 6100–6650 | Banner; waits for the thrust, cuts in recovery, twice | The carved gateway | 5 | 10 |
| Inner court | 6650–7000 | Walks through | The white tower | 1 | — |

## 4. Critical path and side paths

Main lane, three bypasses. **S1**: far stilt walk (G1 340, G2 1120),
clear, kasu; the fight is richer only in feel. **S2**: near mud bank (G3
3050, G4 3770), solid, kasu; a 320 px double jump from its end reaches
the root knots, skipping CP3. **River**: main ground gone for 640 px. Far
walkway: S3 and a porch to hide on; near root knots: three 120 px gaps
over water. Far for the fighter-shy, near for a jumper. **Gateway**: lanes
0 and 2 end at 5070; the palisade spans the depth. Gates are slot 13; the
art-director's pennant question stands here.

## 5. Guards and enemies

No Chola guard. Five Srivijayan fighters per DESIGN.md 4: guard sight;
seen, he advances, stops 90 off; raise 0.5 s, thrust, recover 0.7 s; two
cuts.

| id | lane | patrol | y | Way past unseen | If seen |
|---|---|---|---|---|---|
| S1 | 1 | 520–920 | 620 | Wait at 200 (cone edge 220); on his turn east, G1 up, walk, G2 down as he walks west | Fight on sand, 500 px retreat; or back past 220 |
| S2 | 1 | 3200–3600 | 620 | Wait at 2880; G3 down on his turn; bank to G4; up as he walks west | Fight, retreat to 2600 |
| S3 | 0 | 4500–4900 | 510 | Up at 4200 as he walks east; porch at 4650 (94 up); drop at 4950 behind him; 5020 is past his cone | Fight, 340 px retreat; or back to the gate |
| S4 | 1 | stands 5700, faces west | 620 | None | Fight; retreat to 5100 |
| S5 shield | 1 | stands 6550, faces west | 620 | None | Let him thrust, cut in recovery, twice; retreat to 6250 |

S4 and S5 stand, 850 px apart, so CP5 sits in no cone and one is awake at
a time (NOTES.md).

## 6. Checkpoints

CP1 1380 (after S1). CP2 2720 (after the roof drop). CP3 4100 (before the
river). CP4 5100 (after it). CP5 6100 (hearts refill before the hardest
read). Spacing 1330, 1340, 1380, 1000, 1000.

## 7. Props and set dressing

New: stilt walkway and porch (slot 26); brick candi on a stepped plinth
(27); timber palisade with carved gateway across three depths (28);
bronze gong (29); fighter poses beyond 17–18: raise (30), thrust (31),
shield-bearer walk (32), kneel and wash-out (33); mangrove root knot (34).
Existing: backdrop 3, band 16, wood 5, kodi 19.

## 8. Story hooks

Intro: rain, "many ships," a sword still sheathed. Hint at 300. Mid at
CP4, facing the wall: dread, not glory. End in the court: the line of
cost (DECISIONS.md 4).

## 9. Builder notes

Width 7200, killY 760 (visible water), start [50,620], goal {7000,620}.
The build's pillars, rope bridge, and terraces go.

```
P: [-80,620,1560,240,1] [280,536,960,26,0,wood]
   [1500,520,110,24,1,wood] [1700,430,110,24,1,wood] [1900,340,110,24,1,wood] [2320,340,240,300,1,wood]
   [2560,620,1700,240,1] [2980,660,860,60,2]
   [4160,510,900,28,0,wood] [4650,416,300,24,0,wood]
   [4160,660,130,60,2] [4410,660,130,60,2] [4660,660,130,60,2] [4910,660,160,60,2]
   [4900,620,2300,240,1]
G: [520,920,620,1,fighter] [3200,3600,620,1,fighter] [4500,4900,510,0,fighter]
   [5700,5700,620,1,fighter] [6550,6550,620,1,shield]
links: [280,120,0,1] [1060,120,0,1] [3020,60,1,2] [3740,60,1,2]
       [4140,120,0,1] [4180,60,1,2] [4960,120,0,1] [4980,60,1,2]
checkpoints: [1380,620] [2720,620] [4100,620] [5100,620] [6100,620]
hints: [340,540,gate] [300,560,sword]
C: beach 120–280 y 580; lane 0 walk 480–840 step 120 y 496; stilt tops;
   arc 2080/280 2170/230 2260/280; mud bank 3100–3700 step 200 y 620;
   porch 4700–4900 y 376; roots 4225/4475/4725 y 616. None past 5020.
```

Not in the format yet: a fifth guard field for type; a standing fighter
(x1 = x2 flips direction every frame, line 743); advance, raise, thrust,
recovery, shield block, kneel; rain; `far:'stupas'` and `mid:'jungle'`
are wrong by RESEARCH.md 3.3 until slots 3 and 16 load; a palisade drawn
across lanes.

## Revision notes

- 2026-10-25, first draft. Rule 6 (checkpoints 1000 to 1500 apart) and
  rule 10 (two gateway fighters in sequence, 400 px patrols, no checkpoint
  in a cone) cannot both hold with patrolling fighters: the span is 2100
  px. Chosen: the gateway pair stands still. Alternative, if the designer
  prefers patrols: drop CP5 and accept 1900 px. The gateway pair also
  sits closer than rule 2's screen width with no gate between; DESIGN.md
  section 4 asks for that sequence. Peak sits at 90 percent, later than
  the two-thirds mark, because the gateway is where the level ends; the
  inner court is the breath. No playtest.

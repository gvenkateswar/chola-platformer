# Level 2 — Nagapattinam

Owner: level-designer. Third draft, 2026-10-26, under DESIGN.md draft 3
(sections 2a, 3, 9), DECISIONS.md 15 to 23, and the engine on `main`
(`TUNE`). Budget 1,100 words including the builder block. Units px;
lanes 0 far, 1 main, 2 near; y is a platform's top.

## 1. Purpose

Teaches bouncing, bales, the gangplank, rigging and the first marked
rope over sand; then height hides, the basin, a ship boarded under a
guard's eye, a swing across open water, and a ship where it all
combines. Pillar 3: the voyage leaves the shore.

## 2. The place

A flat sandy coast [plausible]. Sewn-plank hulls, coir seams, matting
sails, no stern castles [documented]; one hull drawn up on the sand,
boarded by a plank [plausible]. Undyed cloth awnings over stalls;
cotton bales lashed with coir, never crates [plausible]. Masts climbed
by their lashings [plausible]. The Chudamani vihara's brick tower behind
the quay [documented]. Earth reds allowed in brick and cargo, never
crimson (Decision 23).

## 3. Beat sheet

Tension 1 to 5. s: seconds for a first-time player, one retry in.

| Beat | x | Does | Sees | Tension | s | Rule |
|---|---|---|---|---|---|---|
| Quay | 0–420 | Runs | Masts, the tower | 1 | 3 | — |
| Awnings | 420–1720 | Bounces onto two roofs; the second needs a held jump | Market | 2 | 14 | 8 |
| Bale | 1720–2460 | Pushes the bale to the dock, climbs | Cargo | 2 | 10 | 8 |
| Beached hull | 2460–3600 | Gangplank, mast, yard | A hull on the sand | 2 | 18 | 8 |
| Marked rope | 3600–4700 | Rope from the yard to the far gallery, down at G1 | Warehouse roofs | 2 | 10 | 4 |
| Loading ledge | 4700–6200 | Ledge over M1, or the near wharf | First guard | 3 | 16 | 3, 5 |
| Basin | 6200–7600 | Far: loft over F1. Near: bales over N1 | Water | 4 | 26 | 2, 3 |
| Ship 1 | 7600–8900 | Bales over M2, the 190 px hull side | Guards on two lanes | 4 | 24 | 7 |
| The swing | 8900–9880 | Grab, pump, release across 680 px of water | Ship 2 waiting | 4 | 20 | 8 |
| Ship 2 | 9880–11000 | Bale, awning, line, yard over Q3, mast down; or the lighter | All of it | 5 | 40 | 2, 3 |
| Cast off | 11000–11400 | Walks to the mast | Quay sliding away | 1 | 6 | — |

Sum 187 s; DESIGN.md 7 allows 211. Peak at 90 percent, the combination.

## 4. Critical path and side paths

The opening is one guard-free chain over sand: no fall costs more than a
walk back. Warehouse wall W3 (3600 to 4200, above the screen) closes the
main lane, so the marked rope is the way on. **Ledge**: walk 830 px of
loading ledge over M1, or leap to the near wharf. **Basin**: far is
safer, near richer. **Ship 1**: the hull side is 190 px inside M2's
leash; the forced beat (a wall-slide is a stop). **The swing (R2)** is
the only route to ship 2. Checked by simulation of the engine's rope:
from rest, no release lands; the grab alone gives about 19 degrees; a
release lands only at 40 degrees or more (45 if the hop becomes -300);
no running or double jump reaches ship 2 above the water. A miss is the
harbor: one heart, back to CP on ship 1's deck. **Ship 2**: the bale is
cover and a step to the awning; a plain bounce reaches the line; a held
bounce reaches the yard. The near lighter (G7, G8) is the easier way.

Gates, slot 13: G1 4700; G2 5240, G3 5840; basin 6380/6390 in,
7520/7570 out; G5 8040, G6 8760; G7 10250, G8 11100. Marked rope R1
(lamp, ink ring) pairs with G1.

## 5. Guards and enemies

Sight per DESIGN.md 3; all start at x1 + 30 walking east.

| id | lane | patrol | y | Unseen way past | If seen |
|---|---|---|---|---|---|
| M1 | 1 | 5300–5700 | 620 | Ledge (96 up) to 6170; or G2 down, wharf, G3 up as he walks west | Ledge |
| F1 | 0 | 6560–7060 | 524 | Loft (94 up) as he walks east; drop behind | Run east |
| N1 | 2 | 6560–6960 | 640 | Bale stack as he walks east; drop behind | Run east |
| M2 | 1 | 8130–8530 | 620 | Bale ledge, hop to the deck | Double jump the hull side |
| F2 | 0 | 8260–8660 | 536 | G5 up behind him, loft, G6 to the deck | Back to G5 |
| Q3 | 1 | 10540–10940 | 430 | Behind the bale, awning, line, yard (390 up), mast down as he walks west; or G7, lighter, G8 | Climb |

## 6. Checkpoints

1100, 2300 (dock), 3400 (hull), 4780, 6200 (before the basin), 7590,
8900 (ship 1 deck: after the forced beat, before the swing), 10040.
Spacing 1100 to 1420; none within 150 px of a cone.

## 7. Props and set dressing

ASSETS.md: backdrop 2 (repainted), band 15, wood 5, gate 13, guard rig
37, `kodi.png` 19, `bales.png` 23 (stall skin), `dugout.png` 24,
`hull.png` 25, `kasu.png` 36. New, by name: undyed cloth awning on a
stall; pushable cotton bale; gangplank; beached hull with mast, yard and
furled matting sail; mast with lashings; rigging line; marked rope with
lamp and ink ring; warehouse wall and roof gallery; cargo spar (R2's
anchor); lighter alongside; hero bounce pose.

## 8. Story hooks

Intro: the port, find your ship. Mid at 4780: the vihara tower,
noticed. Before the swing: no way but over. End: the quay slides away.

## 9. Builder notes

Width 11600, killY 760, water 660, `banners:false`, start [40,620], goal
{11400,430}. Ship 2 casts off after the goal: drift the far-lane quay.

```
P: [-80,620,6520,240,1,stone] [720,360,320,260,1,stone] [1400,320,300,300,1,stone] [2100,420,360,200,1,stone]
   [2960,440,640,180,1,wood] [3600,-400,600,1020,1,stone] [3700,200,420,26,0,wood] [4120,320,300,26,0,wood]
   [4420,480,400,26,0,wood] [5340,524,830,24,1,stone] [5180,656,700,64,2,stall] [6360,524,800,26,0,wood]
   [7280,524,320,26,0,wood] [6720,430,300,24,0,wood] [6360,640,760,72,2,stall] [7360,640,400,72,2,stall]
   [6700,548,220,24,2,stall] [7360,620,1200,240,1,stone] [8180,524,280,24,1,stall] [7980,536,840,26,0,wood]
   [8380,442,240,24,0,wood] [8560,430,640,330,1,wood] [9880,430,1720,330,1,wood] [10180,520,1020,140,2,wood]
K: [3220,140,320,1] [10580,40,400,1]
POLE: [3200,140,440,1,mast] [10570,40,130,1,line] [11000,40,430,1,mast]
ROPE: [3560,100,100,1,0,3760] [9450,70,300,1]
AWN: [480,540,160,1] [1160,560,160,1] [10380,270,160,1]
BALE: [1800,1] [10160,1]
SLOPE: [2560,620,2960,440,1,gangplank]
G: [5300,5700,620,1] [6560,7060,524,0] [6560,6960,640,2]
   [8130,8530,620,1] [8260,8660,536,0] [10540,10940,430,1]
links: [4640,120,0,1] [5210,60,1,2] [5810,60,1,2] [6320,120,0,1] [6360,60,1,2]
   [7460,120,0,1] [7540,60,1,2] [7980,120,0,1] [8700,120,0,1] [10220,60,1,2]
   [11070,60,1,2]
CP: [1100,620] [2300,420] [3400,440] [4780,620] [6200,620] [7590,620]
   [8900,430] [10040,430]
hints: [560,500,bounce] [1240,520,hold jump] [1860,560,push]
   [2600,560,gangplank] [3260,400,climb] [3500,100,marked rope]
   [4700,540,gate]
C: [560,480,1] [640,420,1] [760,320,1] [860,320,1] [960,320,1] [1240,500,1] [1320,420,1] [1460,280,1]
   [1560,280,1] [1660,280,1] [2180,380,1] [2280,380,1] [2380,380,1] [2700,520,1] [2800,490,1] [2900,460,1]
   [3300,100,1] [3400,100,1] [3500,100,1] [3800,160,0] [3900,160,0] [4000,160,0] [5400,484,1] [5600,484,1]
   [5800,484,1] [6000,484,1] [5300,616,2] [5500,616,2] [5700,616,2] [6760,390,0] [6860,390,0] [6960,390,0]
   [6740,508,2] [6810,508,2] [6880,508,2] [8220,484,1] [8320,484,1] [8420,484,1] [9200,330,1] [9300,300,1]
   [9400,330,1] [10620,0,1] [10760,0,1] [10900,0,1] [10300,480,2] [10600,480,2] [10900,480,2]
```

New fields: POLE kind `mast` and `line` climb at 130 px/s; ROPE with
`toLane, landX` is marked (DESIGN 2a, 1.0 s swing); AWN bounces `vy
-1000`, `-1100` held, no standing; BALE is 96 by 72, pushed at 140,
falls, occludes like a block, resets on checkpoint return; SLOPE: feet
follow the line between its ends, up at 330, down at 385 (24 degrees).
Not in the engine: all of those, marked ropes, the cast-off drift.

## Revision notes

- 2026-10-26, third draft, after Decisions 11 to 23 and the merged engine.
  Rebuilt around the kit: guard-free teaching chain, then the draft 2
  basin and ship 1 (forced beat kept), then the swing-only rope and a
  combination on ship 2. Six guards, not DESIGN's seven: a seventh would
  sit inside the teaching run or crowd ship 1. Bale-into-gap is unused.
  Arrays checked by script, including engine-faithful swing flights. No
  playtest.

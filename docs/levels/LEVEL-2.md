# Level 2 — Nagapattinam

Owner: level-designer. Fourth draft, 2026-10-26, under DESIGN.md draft 4
(sections 2a, 3, 6, 9) and DECISIONS.md 15 to 26. Budget 1,250 words
including the builder block. Units px; lanes 0 far, 1 main, 2 near; y is
a platform's top.

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
| Cast off | 11000–12040 | Walks to the bow | Quay sliding away | 1 | 8 | — |

Sum 189 s; each detour adds 15 to 30. Peak at 85 percent, the combination.

## 4. Critical path and side paths

The opening is one guard-free chain over sand. Warehouse wall W3 (3600 to 4200, above the screen) closes the
main lane, so the marked rope is the way on. **Ledge**: walk 830 px of
loading ledge over M1, or leap to the near wharf. **Basin**: far is
safer, near richer. **Ship 1**: the hull side is 190 px inside M2's
leash; the forced beat (a wall-slide is a stop). **The swing (R2)** is
the only route to ship 2. Re-checked on the grip-length period: at 250
px out, R2 needed 45 degrees and left a 60 px window, so it hangs 340 px
out (anchor 100, length 320). Now no release lands from rest or below
30 degrees, a running grab gives 21, and releases land from 35 (40 to
50 is comfortable). Reaching it from ship 1's stern takes a running
double jump. No running or double jump reaches ship 2 above the water. A miss is the
harbor: one heart, back to CP on ship 1's deck. **Ship 2**: the bale is
cover and a step to the awning; a plain bounce reaches the line; a held
bounce reaches the yard. The near lighter (G7, G8) is the easier way.

Gates, slot 13: G1 4700; G2 5240, G3 5840; basin 6380/6390 in,
7520/7570 out; G5 8040, G6 8760; G7 10250, G8 11100; G9 11980. Marked
ropes R1 (pairs with G1) and R4 (pairs with G9).

**Detours** (DESIGN 6: no guard in the lane, no `killY`, a lit place).

| # | Place, for the historian | Leaves at | Kit and twist | Rejoins | Named |
|---|---|---|---|---|---|
| D3 | A merchants' storeroom loft (the nagaram; Ayyavole is unattested here, RESEARCH 3.2) | Gallery step 2, 4400 (far lane) | Bounce to bounce: an awning onto a second awning, up through a one-way loft | Gallery step 3, 4950, then G1 | nk3 |
| D4 | A Srivijayan ship in port, its stern lantern | Ship 2's deck, 11360, past Q3's sweep | A second marked rope, to a ship behind; its high prow and stern posts keep him aboard | G9, 11980 | nk4 |

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
anchor, now 340 px out); lighter alongside; hero bounce pose; a
storeroom loft and a Srivijayan ship with a stern lantern (detours);
two named kasu.

## 8. Story hooks

Intro: find your ship. Mid at 4780: the vihara tower. Before the swing:
no way but over. End: the quay slides away.

## 9. Builder notes

Width 12200, killY 760, water 660, `banners:false`, start [40,620], goal
{12040,430}. Ship 2 casts off after the goal. C trail (24, arcs only),
CL clusters `[x,y,lane,detour]`, NK named `[x,y,lane,id]`.

```
P: [-80,620,6520,240,1,stone] [720,360,320,260,1,stone] [1400,320,300,300,1,stone] [2100,420,360,200,1,stone]
   [2960,440,640,180,1,wood] [3600,-400,600,1020,1,stone] [3700,200,420,26,0,wood] [4120,320,300,26,0,wood]
   [5340,524,830,24,1,stone] [5180,656,700,64,2,stall] [6360,524,800,26,0,wood] [7280,524,320,26,0,wood]
   [6720,430,300,24,0,wood] [6360,640,760,72,2,stall] [7360,640,400,72,2,stall] [6700,548,220,24,2,stall]
   [7360,620,1200,240,1,stone] [8180,524,280,24,1,stall] [7980,536,840,26,0,wood] [8380,442,240,24,0,wood]
   [8560,430,640,330,1,wood] [10180,520,1020,140,2,wood] [4420,480,640,26,0,wood] [9880,430,2220,330,1,wood]
   [11500,470,500,26,0,wood] [11480,-400,20,1160,0,wood] [12000,-400,20,1160,0,wood]
K: [3220,140,320,1] [10580,40,400,1] [4800,100,240,0]
POLE: [3200,140,440,1,mast] [10570,40,130,1,line] [11000,40,430,1,mast]
ROPE: [3560,100,100,1,0,3760] [9540,100,320,1] [11360,220,160,1,0,11560]
AWN: [480,540,160,1] [1160,560,160,1] [10380,270,160,1] [4440,400,120,0]
   [4720,260,120,0]
BALE: [1800,1] [10160,1]
SLOPE: [2560,620,2960,440,1,gangplank]
G: [5300,5700,620,1] [6560,7060,524,0] [6560,6960,640,2]
   [8130,8530,620,1] [8260,8660,536,0] [10540,10940,430,1]
links: [4640,120,0,1] [5210,60,1,2] [5810,60,1,2] [6320,120,0,1] [6360,60,1,2]
   [7460,120,0,1] [7540,60,1,2] [7980,120,0,1] [8700,120,0,1] [10220,60,1,2]
   [11070,60,1,2] [11920,120,0,1]
CP: [1100,620] [2300,420] [3400,440] [4780,620] [6200,620] [7590,620]
   [8900,430] [10040,430]
hints: [560,500,bounce] [1240,520,hold jump] [1860,560,push]
   [2600,560,gangplank] [3260,400,climb] [3500,100,marked rope]
   [4700,540,gate]
C: [520,500,1] [600,400,1] [680,340,1] [1200,500,1] [1300,380,1] [1380,300,1] [2640,560,1] [2760,510,1]
   [2880,460,1] [3200,380,1] [3200,300,1] [3200,220,1] [6700,400,0] [6780,370,0] [6860,390,0] [8490,500,1]
   [8540,440,1] [8600,400,1] [9640,340,1] [9740,320,1] [9840,360,1] [10350,310,1] [10460,200,1] [10560,110,1]
CL: [4360,280,0,3] [4440,350,0,3] [4500,250,0,3] [4640,220,0,3] [4760,160,0,3] [4880,60,0,3]
   [11280,380,1,4] [11360,330,1,4] [11560,420,0,4] [11640,420,0,4] [11720,410,0,4] [11800,400,0,4]
NK: [5000,60,0,nk3] [11860,430,0,nk4]
```

New fields: POLE kind `mast` and `line` climb at 130 px/s; ROPE with
`toLane, landX` is marked (DESIGN 2a, 1.0 s swing); AWN bounces `vy
-1000`, `-1100` held, no standing; BALE is 96 by 72, pushed at 140,
falls, occludes like a block, resets on checkpoint return; SLOPE: feet
follow the line between its ends, up at 330, down at 385 (24 degrees).
Not in the engine: all of those, marked ropes, the cast-off drift.

## Revision notes

- 2026-10-26, fourth draft, for DESIGN.md draft 4: detours D3 and D4;
  trail kasu cut from 47 to 24 and reshaped as arcs, none in a sweep; R2
  moved 90 px farther out for the grip-length period; ship 2 lengthened
  to 12,100. Checked by script.
- 2026-10-26, third draft, after Decisions 11 to 23 and the merged engine.
  Rebuilt around the kit: guard-free teaching chain, then the draft 2
  basin and ship 1 (forced beat kept), then the swing-only rope and a
  combination on ship 2. Six guards, not DESIGN's seven: a seventh would
  sit inside the teaching run or crowd ship 1. Bale-into-gap is unused.
  Arrays checked by script, including engine-faithful swing flights. No
  playtest.

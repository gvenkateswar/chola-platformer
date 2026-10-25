# Level 2 — Nagapattinam

Owner: level-designer. First draft, 2026-10-25, under DESIGN.md section 9.
Budget 900 words of prose and table cells. Units px; lanes 0 far, 1 main,
2 near; y is a platform's top.

## 1. Purpose

Teaches that height hides: a ledge 90 px above a guard is out of his band.
Then the basin, where both lanes carry a guard and the player picks the
lesser. The player feels a port's crowd and ends on a deck pulling away.
Serves Pillar 3: the voyage goes east.

## 2. The place

A flat sandy coast, no cliffs [plausible]. Broad sewn-plank hulls, coir
seams, matting sails furled, no stern castles [documented]. Behind the
quay the Chudamani vihara's brick tower, a foreign Buddhist king's
monastery in a Shaiva king's port [documented]. Bales of cloth, baskets
of rice, jars, pearls [documented / plausible]; no war elephants
[invented, removed]. Porters, a merchant, a monk, a Malay trader, an Arab,
a Chinese sailor [plausible]. Umber awnings, never green.

## 3. Beat sheet

| Beat | x | Does | Sees | T | Rule |
|---|---|---|---|---|---|
| Town edge | 0–320 | Runs; gate hint | Palms, the tower | 1 | 4, 9 |
| Over M1 | 320–1140 | Bales, ledge 100 up, over the guard, drop behind | Kasu on the ledge, M1 below | 2 | 3 |
| Banner | 1140–1800 | Picks a lane | Both gates, F1 above, N1 below | 2 | 4, 6 |
| The basin | 1800–2960 | Far: loft over F1, a gap. Near: bales over N1, a wider gap | Ledge, wharf, water | 4 | 2, 3, 7, 8 |
| Banner | 2960–3270 | Breathes | The first hull | 2 | 6 |
| Ship 1 quay | 3270–4000 | Main: bales over M2, hop the deck. Far: G5, loft over F2, G6 | Guards on both lanes | 5 | 2, 3, 7 |
| Masts | 4000–4520 | Mast steps for kasu, drops off | The harbor | 3 | 8 |
| Banner | 4520–4740 | Breathes | Dugouts, near lane | 2 | 6 |
| Last quay | 4740–5590 | Ledge over M3, or dugout hops | The ship | 3 | 3, 8 |
| Gangplank | 5590–6000 | Banner, boards | Sewn hull | 2 | 6 |
| Deck | 6000–6700 | Walks to the mast | The quay sliding away | 1 | — |

## 4. Critical path and side paths

Main lane except the basin, gone for 920 px. **Far** is the lesser: F1, a
300 px loft, one single-jump gap. **Near** is richer and worse: N1, a
220 px bale stack, a 240 px double-jump gap over water. **Ship 1** is the peak: guards
on both lanes, a hop onto the deck ahead; the main-lane bales are the
clean way. **Last quay**: dugouts on lane 2 are richer (four kasu, three
hops), the ledge safer. Gates, slot 13: G1 260, G2 1240; basin 1820/1830
in, 2960/2950 out; G5 3480, G6 4200; G7 4950, G8 5590.

## 5. Guards and enemies

Sight per DESIGN.md 3: cone 300, band 80, 0.25 s, same lane only.

| id | lane | patrol | y | Unseen way past | If seen |
|---|---|---|---|---|---|
| M1 | 1 | 680–1080 | 620 | Bales at 320, ledge at 540, drop at 1140 behind him; or G1 up, G2 down | Jump to the ledge |
| F1 | 0 | 2000–2500 | 524 | Up at 1820 on his back; once he passes 2200, loft at 2160; he walks back under; drop at 2460; gap 2600; out 2960 | Back to 1820 |
| N1 | 2 | 2000–2400 | 640 | Down at 1830 on his back; bales at 2140; drop at 2360 behind him; gap 2560; out 2950 | Jump to the bales |
| M2 | 1 | 3570–3970 | 620 | Wait at 3260; follow, bales at 3620, drop at 3900 behind him, deck at 4000 | Hop the deck |
| F2 | 0 | 3700–4100 | 536 | G5 up on his back; loft at 3820; drop at 4060; G6 | Back to G5 |
| M3 | 1 | 5060–5460 | 620 | Wait at 4740; bales at 5160; or G7 down, dugouts, G8 up | Jump to the bales |

Each wait is one leg, 4.2 to 5.3 s; both ends show from each wait spot.

## 6. Checkpoints

CP1 1530 (before the basin). CP2 3030 (after it). CP3 4530 (after the
forced beat, at the deck drop). CP4 5920 (before the gangplank). Spacing
1490, 1500, 1500, 1390; none within 150 px of a cone.

## 7. Props and set dressing

New: stacked bales and rice baskets as the `stall` skin (slot 23); dugout
platforms (24); sewn-plank hull side with furled matting sail and
gangplank, for ship 1 and the closing ship (25). Existing: backdrop 2,
band 15, wood 5, gate 13, guards 11–12, kodi 19, guard reach 22.

## 8. Story hooks

Intro: the port, pearls, cloth and rice, find your ship. Mid at CP2 under
the vihara tower: a foreign king's monastery, noticed, not explained.
Attack-key float once. End on the deck: the crossing seen, not told.

## 9. Builder notes

Width 6900, killY 760, water 660, start [40,620], goal {6700,540}. The
build's basin and deck are kept, re-cut.

```
P: [-80,620,1960,240,1] [320,540,140,80,1,stall] [540,520,600,24,1] [200,536,1140,26,0]
   [1800,524,800,26,0] [2720,524,320,26,0] [2160,430,300,24,0]
   [1800,640,760,72,2,stall] [2800,640,320,72,2,stall] [2140,548,220,24,2,stall]
   [2800,620,3200,240,1] [3620,524,280,24,1,stall] [4000,524,520,96,1,wood]
   [4160,400,120,20,1,wood] [4160,280,120,20,1,wood] [3420,536,840,26,0] [3820,442,240,24,0]
   [5160,524,260,24,1,stall] [4900,660,120,60,2,wood] [5120,660,120,60,2,wood]
   [5340,660,120,60,2,wood] [5560,660,120,60,2,wood]
   [5940,580,80,40,1,wood] [6000,540,800,80,1,wood]
G: [680,1080,620,1] [2000,2500,524,0] [2000,2400,640,2] [3570,3970,620,1] [3700,4100,536,0] [5060,5460,620,1]
links: [200,120,0,1] [1180,120,0,1] [1760,120,0,1] [1800,60,1,2] [2900,120,0,1] [2920,60,1,2]
       [3420,120,0,1] [4140,120,0,1] [4920,60,1,2] [5560,60,1,2]
checkpoints: [1530,620] [3030,620] [4530,620] [5920,620]
hints: [260,540,gate] [320,500,climb]
C: ledge 600–1080 step 160 y 480; loft 2200–2400 y 390; bales 2180–2320 y 508;
   ship bales 3660–3860 y 484; mast 4220/360 4220/240 4400/484;
   dugouts 4960–5620 step 220 y 620; deck 6200–6600 y 500.
```

Not in the format yet: cone, chase, catch, scold; the quay drift behind
the deck (a backdrop offset growing with x past 6000). Wharf y 640 sits
above `water` 660; the build had 648 under 644.

## Revision notes

- 2026-10-25, first draft. The 6th guard went to the far lane of ship 1
  (F2), not the final quay, so the peak lands at the two-thirds mark and
  the last quay is a breath. The ship-deck close is the creative
  director's proposal, accepted in DESIGN.md 10. Gate-exit cones read as in
  LEVEL-1.md. No playtest.

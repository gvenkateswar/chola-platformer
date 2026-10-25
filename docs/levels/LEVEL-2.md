# Level 2 — Nagapattinam

Owner: level-designer. Second draft, 2026-10-25, under DESIGN.md draft 2
section 9. Budget 900 words of prose and table cells. Units px; lanes 0
far, 1 main, 2 near; y is a platform's top.

## 1. Purpose

Teaches that height hides: a ledge 90 px above a guard is out of his band.
Then the basin, where both lanes carry a guard and the player picks the
lesser. The player feels a port's crowd and ends on a deck pulling away.
Serves Pillar 3.

## 2. The place

A flat sandy coast, no cliffs [plausible]. Broad sewn-plank hulls, coir
seams, matting sails furled, no stern castles [documented]. Behind the
quay the Chudamani vihara's brick tower, a foreign Buddhist king's
monastery in a Shaiva king's port [documented]. Bales of cloth, baskets
of rice, jars, pearls [documented / plausible]; no war elephants
[invented]. Porters, a merchant, a monk, a Malay trader, an Arab, a
Chinese sailor [plausible]. Awnings umber.

## 3. Beat sheet

Tension 1 to 5. s: seconds for a first-time player, one wait or retry in.

| Beat | x | Does | Sees | Tension | s | Rule |
|---|---|---|---|---|---|---|
| Town edge | 0–320 | Runs; gate hint | The tower | 1 | 3 | 4, 9 |
| Over M1 | 320–1140 | Bales, ledge 100 up, over the guard, drop behind | Kasu, M1 below | 2 | 10 | 3 |
| Banner | 1140–1800 | Picks a lane | Gates, F1 above, N1 below | 2 | 5 | 4, 6 |
| The basin | 1800–3010 | Far: loft over F1, a gap. Near: bales over N1, a wider gap | Ledge, wharf, water | 4 | 26 | 2, 3, 8 |
| Banner | 3010–3270 | Breathes | The first hull | 2 | 4 | 6 |
| Ship 1 quay | 3270–4000 | Main: bales over M2, the deck. Far: G5, loft over F2, G6 | Guards on both lanes | 5 | 24 | 2, 3, 7 |
| Masts | 4000–4520 | Mast steps for kasu, drops off | The harbor | 3 | 10 | 8 |
| Banner | 4520–4740 | Breathes | Dugouts below | 2 | 3 | 6 |
| Last quay | 4740–5590 | Ledge over M3, or dugout hops | The ship | 3 | 18 | 3, 8 |
| Gangplank | 5590–6000 | Banner, boards | The hull | 2 | 5 | 6 |
| Deck | 6000–6700 | Walks to the mast | The quay sliding away | 1 | 6 | — |

Sum 114 s; DESIGN.md 7 allows 131.

## 4. Critical path and side paths

Main lane except the basin, gone for 920 px. The basin is a lane choice:
nothing in either lane stops a running hero. **Far** is the lesser: F1, a
300 px loft, a single-jump gap. **Near** is richer and worse: N1, a 220
px bale stack, a 240 px double-jump gap over water. **Ship 1** is the
peak and the forced beat: guards on both lanes, and the deck is a 190 px
wall inside M2's leash (4270); a double jump clears it, a wall-slide is
the stop that gets caught; from the bales it is a 94 px hop. **Last
quay**: dugouts richer, ledge safer. Gates, slot 13: G1 260, G2 1240;
basin 1820/1830 in, 2960/3010 out; G5 3480, G6 4200; G7 4950, G8 5590.

## 5. Guards and enemies

Sight per DESIGN.md 3: cone 300, band 80, 0.25 s, same lane only.

| id | lane | patrol | y | Unseen way past | If seen |
|---|---|---|---|---|---|
| M1 | 1 | 680–1080 | 620 | Bales at 320, ledge at 540, drop at 1140 behind him; or G1 up, G2 down | Jump to the ledge |
| F1 | 0 | 2000–2500 | 524 | Up at 1820 on his back; once he passes 2200, loft at 2160; he walks back under; drop at 2460; out 2960 | Run; past his leash |
| N1 | 2 | 2000–2400 | 640 | Down at 1830 on his back; bales at 2140; drop at 2360 behind him; out 3010 | Run; past his leash |
| M2 | 1 | 3570–3970 | 620 | Wait at 3260; follow, bales at 3620, hop to the deck | Double jump; a slide is caught |
| F2 | 0 | 3700–4100 | 536 | G5 up on his back; loft at 3820; drop at 4060; G6 | Back |
| M3 | 1 | 5060–5460 | 620 | Wait at 4740; bales at 5160; or G7 down, G8 up | Jump to the bales |

Both ends show from each wait spot. Every gate stand begins with the
lane's guard walking away.

## 6. Checkpoints

CP1 1530 (before the basin). CP2 3030 (after it). CP3 4530 (after the
forced beat). CP4 5920 (before the gangplank). Spacing 1490, 1500, 1500,
1390; none within 150 px of a cone.

## 7. Props and set dressing

ASSETS.md: `bales.png` 23 (the `stall` skin), `dugout.png` 24,
`hull.png` 25 (both ships), `kodi.png` 19, `guard_reach.png` 22,
`kasu.png` 36; backdrop 2, band 15, wood 5, gate 13, guards 11–12.

## 8. Story hooks

Intro: the port, pearls, cloth and rice, find your ship. Mid at CP2 under
the vihara tower: noticed, not explained. Attack-key float once. End on
the deck: the crossing seen, not told.

## 9. Builder notes

Width 6900, killY 760, water 660, `banners:false`, start [40,620], goal {6700,540}.

```
P: [-80,620,1960,240,1] [320,540,140,80,1,stall] [540,520,600,24,1] [200,536,1140,26,0]
   [1800,524,800,26,0] [2720,524,320,26,0] [2160,430,300,24,0]
   [1800,640,760,72,2,stall] [2800,640,400,72,2,stall] [2140,548,220,24,2,stall]
   [2800,620,3200,240,1] [3620,524,280,24,1,stall] [4000,430,520,190,1,wood]
   [4160,310,120,20,1,wood] [4160,190,120,20,1,wood] [3420,536,840,26,0] [3820,442,240,24,0]
   [5160,524,260,24,1,stall] [4900,660,120,60,2,wood] [5120,660,120,60,2,wood]
   [5340,660,120,60,2,wood] [5560,660,120,60,2,wood]
   [5940,580,80,40,1,wood] [6000,540,800,80,1,wood]
G: [680,1080,620,1] [2000,2500,524,0] [2000,2400,640,2] [3570,3970,620,1] [3700,4100,536,0] [5060,5460,620,1]
links: [200,120,0,1] [1180,120,0,1] [1760,120,0,1] [1800,60,1,2] [2900,120,0,1] [2980,60,1,2]
       [3420,120,0,1] [4140,120,0,1] [4920,60,1,2] [5560,60,1,2]
checkpoints: [1530,620] [3030,620] [4530,620] [5920,620]
hints: [260,540,gate] [320,500,climb]
C: [600,480,1] [760,480,1] [920,480,1] [1080,480,1] [2200,390,0] [2300,390,0] [2400,390,0]
   [2180,508,2] [2250,508,2] [2320,508,2] [3660,484,1] [3760,484,1] [3860,484,1]
   [4220,270,1] [4220,150,1] [4400,390,1] [4960,620,2] [5180,620,2] [5400,620,2] [5620,620,2]
   [6200,500,1] [6400,500,1] [6600,500,1]
```

Not in the format yet: cone, chase, catch on a stop, scold; the quay
drift behind the deck (a backdrop offset growing with x past 6000). G6
exits onto the deck top, 106 above the far walk.

## Revision notes

- 2026-10-25, second draft, after the levels review and DESIGN.md draft
  2. Deck at 4000 raised to a 190 px wall so ship 1 is a real forced beat
  (one per level, as the draft 2 table says); basin relabeled lane-choice;
  near basin exit moved 210 px past its landing; seconds column and sum;
  `banners:false`; coins as data; slots named to ASSETS.md.
- First draft: the sixth guard went to ship 1's far lane so the peak lands
  at the two-thirds mark. No playtest.

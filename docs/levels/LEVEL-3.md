# Level 3 — Kadaram, 1025

Owner: level-designer. Fourth draft, 2026-10-26, under DESIGN.md draft 4
(sections 2a, 4, 6, 9) and DECISIONS.md 7 and 15 to 26. Budget 1,250
words including the builder block. Units px; lanes 0 far, 1 main, 2
near; y is a platform's top.

## 1. Purpose

Teaches swinging on vines, wading, the mud slide and the swaying
walkway over safe shallows. Then the sword is drawn for the first time,
against one fighter with room to learn the half-second raise. It ends
vine, walkway, slide, then the palisade, where the road allows no way
round. Pillar 2. No Chola guard.

## 2. The place

Kedah's Merbok estuary: mangrove coast, river plain, one forested
mountain [documented]. Prop roots [documented]; rattan [plausible].
Stilt houses and walkways over water [documented for Srivijaya,
plausible here]. A muddy bank [plausible]. Small brick candi on stepped
plinths, no tall tower (RESEARCH.md 3.3, withdrawn 2026-10-26). A timber
palisade with a carved gateway, the inscription's torana [plausible].
Fighters in indigo, no crimson; jungle greens and indigo (Decision 17).

## 3. Beat sheet

Tension 1 to 5. s: seconds for a first-time player, one retry in.

| Beat | x | Does | Sees | Tension | s | Rule |
|---|---|---|---|---|---|---|
| Beach | 0–600 | Runs | Rain, the fleet | 1 | 4 | — |
| Vines | 600–1500 | Three vines over the shallows; a miss is a wade | Mangroves | 2 | 15 | 8 |
| Slide | 1500–2660 | Down the bank into the water, roots out | River plain | 2 | 10 | 8 |
| Village | 2660–4320 | Marked vine to the far lane, two swaying sections, G1 down | Stilt houses | 2 | 18 | 4, 8 |
| First fighter | 4320–6190 | Draw prompt; out, in, cut, twice; or the stilt walk round | A man with a face | 3 | 28 | 10 |
| Candi | 6190–7900 | Main: plinth over S2. Far: vines over S3, then a swaying section | Brick shrines | 3 | 30 | 3, 10 |
| River | 7900–10680 | Vine, a swaying section, S4 on a fixed walkway (vines or a fight), slide | Mist on the water | 4 | 38 | 8, 10 |
| Before the wall | 10680–11800 | Wades out, banner | The palisade | 2 | 9 | 10 |
| Sentinel | 11800–12350 | Forced fight | A gong | 4 | 20 | 10 |
| Shield-bearer | 12350–12900 | Banner; waits for the thrust, cuts in recovery | The carved gateway | 5 | 28 | 10 |
| Inner court | 12900–13300 | Walks in | Quiet | 1 | 5 | — |

Sum 205 s; each detour adds 15 to 25. Peak at 95 percent, by design.

## 4. Critical path and side paths

The teaching run (0 to 4320) has no fighter within 1,280 px and no fall
worse than shallow water. The thicket (3200 to 4100, above the screen)
closes the main lane, so the marked vine MV1 is the way on; a fall from
a swaying section lands in water, with a ladder back up. **S1**: fight
on flat sand with 600 px of retreat, or G2 up the stilt walk, G3 down.
**Candi**: the plinth (96 up) walks over S2; the far lane is G4, two
vines over S3, G5. **River**: V6 to a deck, one swaying section, then S4 on a fixed
walkway with 300 px of flat retreat: two vines carry you to the high
bank (100 above his band), or fight him.
The slide ends any chase. **Gateway**: lane 0 ends at 8020, so the
palisade closes the road: sentinel, banner, shield-bearer, no reward.

Vines are pumped ropes on the grip-length period; every link and
landing holds. The release over S3 needs a forward swing. The
shield-bearer has 650 px of clear court behind him.

Gates are slot 35 (`gate_l3.png`, timber, no pennant), arrow glyph black
(Decision 7): G1 4320, G2 5060, G3 5860, G4 6560, G5 7700. MV1 pairs
with G1.

**Detours** (DESIGN 6: no fighter, no `killY`, a lit place).

| # | Place, for the historian | Leaves at | Kit and twist | Rejoins | Named |
|---|---|---|---|---|---|
| D5 | A small brick candi on the hillside (Bukit Batu Pahat type) | Bank B1, 1560, after the vine chain | A vine pumped from standing: from 30 degrees it lands on a canopy knot, then the hill ledge | Dropping onto slide 1, 2100 | nk5, at the vine's top |
| D6 | A stilt-house porch over the Merbok, its lamp lit | The wade after slide 2, 10720 | Roots out of the water, one swaying section, a porch 260 above the bank | The bank, 11390, 160 px short of S5's sweep | nk6 |

## 5. Guards and enemies

Fighters per DESIGN.md 4. Sentinels stand facing west.

| id | lane | patrol | y | Way past | If seen |
|---|---|---|---|---|---|
| S1 | 1 | 5340–5740 | 620 | G2 as he walks east, walk, G3 | Fight; the teaching fight |
| S2 | 1 | 6800–7200 | 620 | Plinth to 7670 | Fight, retreat 500 |
| S3 | 0 | 6760–7160 | 480 | Vines at 6980, 7330, land past 7610 | Fight on the fixed walkway |
| S4 | 1 | 9220–9620 | 420 | Vines at 9390, 9740 to the high bank | Fight; retreat to 8920 |
| S5 | 1 | sentinel 11850 | 620 | None | Fight; retreat to 11250 |
| S6 shield | 1 | sentinel 12850 | 620 | None | Let him thrust, cut in recovery, twice |

## 6. Checkpoints

1700, 3190, 4690 (before S1), 6190, 7350 (on the plinth), 8520 (river
deck), 9800 (high bank, out of S4's band), 11250, 12350 (between the
sentinels). Spacing 1000 to 1500. Checkpoints light in any lane (builder
task), so far-lane players get 7350 too.

## 7. Props and set dressing

ASSETS.md: backdrop 3 (repainted), band 16, `stilt_walk.png` 26,
`candi.png` 27, `palisade.png` 28, `gong.png` 29, fighter rig 39 and
poses 30 to 33, `root_knot.png` 34, `gate_l3.png` 35, `kasu.png` 36.
New, by name: rattan vine; marked vine with lamp and ink ring; mangrove
thicket wall; shallow water with wade ripple; muddy bank and slide
streak; swaying walkway section; bamboo ladder; shield-bearer's hide
shield; hero slide and wade poses; hero first-draw ink stroke; a
hillside candi and a stilt-house porch, each lit; two named kasu.

## 8. Story hooks

Intro: rain, many ships. The draw prompt at 4800. Mid at 9800: the
palisade first seen. End: the line of cost.

## 9. Builder notes

Width 13500, no killY (shallow water never kills), water 660,
`banners:false`, gate glyph black, start [50,620], goal {13300,620}.

```
P: [-80,620,680,240,1,sand] [1500,480,400,280,1,mud] [2840,480,360,280,1,mud] [3200,-400,900,1160,1,roots]
   [3260,480,240,26,0,wood] [4140,480,300,26,0,wood] [4100,620,3900,240,1,stone] [5000,536,960,26,0,wood]
   [6840,524,830,24,1,stone] [6440,480,240,26,0,wood] [6680,480,560,26,0,wood] [7600,480,420,26,0,wood]
   [8400,420,200,26,1,wood] [8920,420,720,26,1,wood] [9660,320,500,440,1,mud] [11080,620,2420,240,1,stone]
   [1700,180,120,26,1,roots] [1840,140,260,26,1,roots] [11180,360,200,26,1,wood]
K: [1340,620,80,1] [1420,550,70,1] [2660,620,80,1] [2760,550,60,1] [11000,620,80,1]
   [10720,620,70,1] [10800,560,60,1] [10880,500,60,1]
POLE: [4140,480,680,0,ladder]
VINE: [720,200,240,1] [1020,180,240,1] [1320,200,240,1] [3120,220,210,1,0,3320]
   [6980,160,220,0] [7330,160,220,0] [8150,200,240,1] [9390,140,220,1]
   [9740,140,220,1] [1620,120,240,1]
SLOPE: [1900,480,2246,680,1,mud] [10160,320,10680,620,1,mud]
WADE: [600,680,900,1] [2246,680,414,1] [3260,680,1200,0] [8000,680,400,1] [10680,680,400,1]
SWAY: [3580,480,200,0,0] [3860,480,200,0,1] [7320,480,200,0,0] [8680,420,160,1,0] [10960,440,140,1,0]
G: [5340,5740,620,1,fighter] [6800,7200,620,1,fighter] [6760,7160,480,0,fighter]
   [9220,9620,420,1,fighter] [11850,11850,620,1,fighter,stand] [12850,12850,620,1,shield,stand]
links: [4260,120,0,1] [5000,120,0,1] [5800,120,0,1] [6500,120,0,1] [7640,120,0,1]
CP: [1700,480] [3190,480] [4690,620] [6190,620] [7350,524] [8520,420]
   [9800,320] [11250,620] [12350,620]
hints: [640,560,vine] [1960,420,slide] [3040,420,marked vine]
   [4800,560,draw] [5060,540,gate]
C: [840,350,1] [900,320,1] [960,340,1] [1140,330,1] [1200,300,1] [1260,320,1] [1960,470,1] [2050,520,1]
   [2140,570,1] [3540,440,0] [3820,440,0] [4100,440,0] [6790,500,1] [6830,470,1] [6880,484,1] [7100,360,0]
   [7200,330,0] [7480,380,0] [9500,260,1] [9600,240,1] [9850,260,1] [10250,340,1] [10400,420,1] [10550,510,1]
CL: [1560,420,1,5] [1600,360,1,5] [1680,260,1,5] [1740,140,1,5] [1880,100,1,5] [1960,100,1,5]
   [10720,580,1,6] [10800,520,1,6] [10880,460,1,6] [11000,400,1,6] [11120,340,1,6] [11220,320,1,6]
NK: [1620,150,1,nk5] [11340,320,1,nk6]
```

New fields: VINE is a rope (pumped, grip-length period), with `toLane, landX` when marked; WADE is a bed the hero walks
at 160 px/s with jumps capped at 77; SWAY sections move ±20 px, phase 0
or 1 opposite, carrying the hero (no fighter stands on one); SLOPE `mud` slides at 520
(380 held back), no stopping or climbing, a jump keeps speed, any chase
ends; fighter type and `stand`. None exist yet; nor the telegraph,
thrust, shield, kneel, rain, or the palisade across lanes.

**Paid hint target** (ruling 30). The pilot (quay, ten copper) reveals
nk5's hiding place: (1620, 150), at the top of the D5 vine
`[1620,120,240,1]`, touched only from the top grip; a mid-vine swing
passes under it. Bought, a lamp burns at the anchor (1620, 120).

## Revision notes

- 2026-10-26, ruling 30: paid hint target added to section 9.
- 2026-10-26, fourth draft, for DESIGN.md draft 4: detours D5 and D6;
  trail kasu reshaped as 24 route arcs (none in a sweep); vines re-checked
  on the grip-length period, no changes needed; gateway moved 100 px east
  to keep D6's drop clear of S5. Checked by script.
- 2026-10-26, third draft, after Decisions 11 to 23 and the merged engine.
  Rebuilt as a guard-free teaching run, then S1 for the telegraph, a
  two-lane candi stretch, the river combination and the gateway. Six
  fighters (four patrols, two sentinels). Arrays checked by script. No
  playtest.
- 2026-10-26, rule 10 ruling: S3 now patrols a fixed far walkway
  (6680 to 7240), one sway section kept after him; S4 moved to 9220 to
  9620 on a fixed walkway (8920 to 9640), one sway section kept before
  it; bank, slide and gateway shifted 100 px east (width 13,400).
  Checkpoints lighting in any lane removes the far-lane skip.

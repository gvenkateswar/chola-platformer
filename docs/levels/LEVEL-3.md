# Level 3 — Kadaram, 1025

Owner: level-designer. Third draft, 2026-10-26, under DESIGN.md draft 3
(sections 2a, 4, 9), DECISIONS.md 7 and 15 to 23, and the engine on
`main`. Budget 1,100 words including the builder block. Units px; lanes
0 far, 1 main, 2 near; y is a platform's top.

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
| Before the wall | 10680–11700 | Wades out, banner | The palisade | 2 | 8 | 10 |
| Sentinel | 11700–12250 | Forced fight | A gong | 4 | 20 | 10 |
| Shield-bearer | 12250–12800 | Banner; waits for the thrust, cuts in recovery | The carved gateway | 5 | 28 | 10 |
| Inner court | 12800–13200 | Walks in | Quiet | 1 | 5 | — |

Sum 204 s; DESIGN.md 7 allows 235. Peak at 95 percent, by design.

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

Vine flights were simulated on the engine's rope physics with a
45-degree self-swing, and checked with both the engine's hop (-420) and
DESIGN's (-300): every chain link and landing works with either. The
release over S3 needs a forward swing to clear his sweep.

Gates are slot 35 (`gate_l3.png`, timber, no pennant), arrow glyph black
(Decision 7): G1 4320, G2 5060, G3 5860, G4 6560, G5 7700. MV1 pairs
with G1.

## 5. Guards and enemies

Fighters per DESIGN.md 4. Sentinels stand facing west.

| id | lane | patrol | y | Way past | If seen |
|---|---|---|---|---|---|
| S1 | 1 | 5340–5740 | 620 | G2 as he walks east, walk, G3 | Fight; the teaching fight |
| S2 | 1 | 6800–7200 | 620 | Plinth to 7670 | Fight, retreat 500 |
| S3 | 0 | 6760–7160 | 480 | Vines at 6980, 7330, land past 7610 | Fight on the fixed walkway |
| S4 | 1 | 9220–9620 | 420 | Vines at 9390, 9740 to the high bank | Fight; retreat to 8920 |
| S5 | 1 | sentinel 11750 | 620 | None | Fight; retreat to 11250 |
| S6 shield | 1 | sentinel 12750 | 620 | None | Let him thrust, cut in recovery, twice |

## 6. Checkpoints

1700, 3190, 4690 (before S1), 6190, 7350 (on the plinth), 8520 (river
deck), 9800 (high bank, out of S4's band), 11250, 12250 (between the
sentinels). Spacing 1000 to 1500. Checkpoints light in any lane (builder
task), so far-lane players get 7350 too.

## 7. Props and set dressing

ASSETS.md: backdrop 3 (repainted), band 16, `stilt_walk.png` 26,
`candi.png` 27, `palisade.png` 28, `gong.png` 29, fighter rig 39 and
poses 30 to 33, `root_knot.png` 34, `gate_l3.png` 35, `kasu.png` 36.
New, by name: rattan vine; marked vine with lamp and ink ring; mangrove
thicket wall; shallow water with wade ripple; muddy bank and slide
streak; swaying walkway section; bamboo ladder; shield-bearer's hide
shield; hero slide and wade poses; hero first-draw ink stroke.

## 8. Story hooks

Intro: rain, many ships. The draw prompt at 4800. Mid at 9800 on the
high bank: the palisade seen for the first time. End in the court: the
line of cost (Decision 4).

## 9. Builder notes

Width 13400, no killY (shallow water never kills), water 660,
`banners:false`, gate glyph black, start [50,620], goal {13200,620}.

```
P: [-80,620,680,240,1,sand] [1500,480,400,280,1,mud] [2840,480,360,280,1,mud] [3200,-400,900,1160,1,roots]
   [3260,480,240,26,0,wood] [4140,480,300,26,0,wood] [4100,620,3900,240,1,stone] [5000,536,960,26,0,wood]
   [6840,524,830,24,1,stone] [6440,480,240,26,0,wood] [6680,480,560,26,0,wood] [7600,480,420,26,0,wood]
   [8400,420,200,26,1,wood] [8920,420,720,26,1,wood] [9660,320,500,440,1,mud] [11080,620,2320,240,1,stone]
K: [1340,620,80,1] [1420,550,70,1] [2660,620,80,1] [2760,550,60,1] [11000,620,80,1]
POLE: [4140,480,680,0,ladder]
VINE: [720,200,240,1] [1020,180,240,1] [1320,200,240,1] [3120,220,210,1,0,3320]
   [6980,160,220,0] [7330,160,220,0] [8150,200,240,1] [9390,140,220,1]
   [9740,140,220,1]
SLOPE: [1900,480,2246,680,1,mud] [10160,320,10680,620,1,mud]
WADE: [600,680,900,1] [2246,680,414,1] [3260,680,1200,0] [8000,680,400,1] [10680,680,400,1]
SWAY: [3580,480,200,0,0] [3860,480,200,0,1] [7320,480,200,0,0] [8680,420,160,1,0]
G: [5340,5740,620,1,fighter] [6800,7200,620,1,fighter] [6760,7160,480,0,fighter]
   [9220,9620,420,1,fighter] [11750,11750,620,1,fighter,stand] [12750,12750,620,1,shield,stand]
links: [4260,120,0,1] [5000,120,0,1] [5800,120,0,1] [6500,120,0,1] [7640,120,0,1]
CP: [1700,480] [3190,480] [4690,620] [6190,620] [7350,524] [8520,420]
   [9800,320] [11250,620] [12250,620]
hints: [640,560,vine] [1960,420,slide] [3040,420,marked vine]
   [4800,560,draw] [5060,540,gate]
C: [820,380,1] [1020,330,1] [1220,380,1] [1600,440,1] [1700,440,1] [1800,440,1] [2000,500,1] [2100,560,1]
   [2200,620,1] [3600,440,0] [3760,440,0] [3940,440,0] [5100,496,0] [5300,496,0] [5500,496,0] [5700,496,0]
   [6900,484,1] [7100,484,1] [7300,484,1] [7500,484,1] [7000,360,0] [7150,340,0] [7300,360,0] [8250,380,1]
   [8350,380,1] [9490,240,1] [9640,220,1] [9900,280,1] [10000,280,1] [10300,400,1] [10450,480,1] [10600,560,1]
```

New fields: VINE is a rope that swings itself ±45 degrees (period 2 s),
pumpable, with `toLane, landX` when marked; WADE is a bed the hero walks
at 160 px/s with jumps capped at 77; SWAY sections move ±20 px, phase 0
or 1 opposite, carrying the hero (no fighter stands on one); SLOPE `mud` slides at 520
(380 held back), no stopping or climbing, a jump keeps speed, any chase
ends; fighter type and `stand`. None exist yet; nor the telegraph,
thrust, shield, kneel, rain, or the palisade across lanes.

## Revision notes

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

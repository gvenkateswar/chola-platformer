# Level 3 — Kadaram, 1025

Owner: level-designer. Second draft, 2026-10-25, under DESIGN.md draft 2
sections 4 and 9. Budget 900 words of prose and table cells. Units px;
lanes 0 far, 1 main, 2 near; y is a platform's top.

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

Tension 1 to 5. s: seconds for a first-time player, one wait or retry in.

| Beat | x | Does | Sees | Tension | s | Rule |
|---|---|---|---|---|---|---|
| Beach | 0–400 | Runs; sword hint, gate hint | Rain, the fleet behind | 1 | 5 | 9 |
| First fighter | 400–1340 | Fights S1, or G1 up the stilt walk, G2 down | A man with a face | 3 | 14 | 10 |
| Banner | 1340–1580 | Breathes | Stilt houses | 2 | 3 | 6 |
| Stilt climb | 1580–2420 | Three stilts up, 310 px double jump to a roof | Water below | 3 | 14 | 8 |
| Roof drop | 2420–3080 | Drops 280, banner | Candi, S2 far off | 2 | 4 | 5, 6 |
| Candi flats | 3080–3940 | Fights S2, or G3 down to the bank, G4 up | Brick shrines | 3 | 14 | 10 |
| Banner | 3940–4300 | Picks a lane | River, walkway, roots | 2 | 4 | 4, 6 |
| The river | 4300–5260 | Far: porch over S3. Near: three root hops | Mist on flat water | 4 | 20 | 3, 8 |
| Before the wall | 5260–5500 | Banner; lanes 0 and 2 end | The palisade | 2 | 5 | 10 |
| Gateway fighter | 5500–6000 | Out, in, cut; two rounds | S4, a gong | 4 | 20 | 10 |
| Shield-bearer | 6200–6750 | Banner; lets him thrust, cuts in recovery, twice | The carved gateway | 5 | 28 | 10 |
| Inner court | 6750–7100 | Walks through | The white tower | 1 | 5 | — |

Sum 136 s; DESIGN.md 7 allows 150.

## 4. Critical path and side paths

Main lane, three bypasses. **S1**: far stilt walk (G1 340, G2 1120),
clear, kasu; the fight is richer only in feel. **S2**: near mud bank (G3
3150, G4 3870), solid, kasu; a 320 px double jump from its end reaches
the root knots, skipping CP3. **River**: main ground gone for 640 px. Far
walkway: S3 and a porch to hide on; near root knots: three 120 px gaps,
the exit 250 px past the last landing. **Gateway**: lanes 0 and 2 end at
5330; the palisade spans the depth. Gates are slot 35, timber, no
pennant, the crimson arrow glyph off (Decision 7).

## 5. Guards and enemies

No Chola guard. Five Srivijayan fighters per DESIGN.md 4: guard sight;
seen, he advances, stops 90 off; raise 0.5 s, thrust, recover 0.7 s; two
cuts.

| id | lane | patrol | y | Way past unseen | If seen |
|---|---|---|---|---|---|
| S1 | 1 | 660–1060 | 620 | Wait at 340 (cone edge 360); on his turn east, G1 up, walk, G2 down as he walks west | Fight on sand, 600 px retreat |
| S2 | 1 | 3300–3700 | 620 | Wait at 2980; G3 down on his turn; bank to G4; up as he walks west | Fight, retreat to 2700 |
| S3 | 0 | 4600–5000 | 510 | Up at 4300 as he walks east; porch at 4750 (94 up); facing east his cone reaches 5300, so drop at 5050 once he turns west, then 5120 | Fight, 340 px retreat; or back |
| S4 | 1 | sentinel 5800, faces west | 620 | None | Fight; retreat to 5200 |
| S5 shield | 1 | sentinel 6650, faces west | 620 | None | Let him thrust, cut in recovery, twice |

S4 and S5 stand 850 px apart with CP5 between, so one is awake at a time.
Every gate stand begins with the lane's fighter walking away.

## 6. Checkpoints

CP1 1540 (after S1). CP2 2820 (after the drop). CP3 4200 (before the
river). CP4 5200 (after). CP5 6200 (hearts refill before the hardest
read). Spacing 1490, 1280, 1380, 1000, 1000.

## 7. Props and set dressing

ASSETS.md: `stilt_walk.png` 26, `candi.png` 27, `palisade.png` 28,
`gong.png` 29, fighter poses `srivijayan_raise` 30, `_thrust` 31,
`_shield_walk` 32, `_kneel` 33, `root_knot.png` 34, `gate_l3.png` 35,
`kasu.png` 36, `kodi.png` 19; backdrop 3, band 16, wood 5, fighter 17–18.

## 8. Story hooks

Intro: rain, "many ships," a sword still sheathed. Hint at 200. Mid at
CP4, facing the wall: dread, not glory. End in the court: the line of
cost (DECISIONS.md 4).

## 9. Builder notes

Width 7300, killY 760, water 660, `banners:false`, gate glyph off, start
[50,620], goal {7100,620}.

```
P: [-80,620,1660,240,1] [280,536,960,26,0,wood]
   [1600,520,110,24,1,wood] [1800,430,110,24,1,wood] [2000,340,110,24,1,wood] [2420,340,240,300,1,wood]
   [2660,620,1700,240,1] [3080,660,860,60,2]
   [4260,510,900,28,0,wood] [4750,416,300,24,0,wood]
   [4260,660,130,60,2] [4510,660,130,60,2] [4760,660,130,60,2] [5010,660,320,60,2]
   [5000,620,2300,240,1]
G: [660,1060,620,1,fighter] [3300,3700,620,1,fighter] [4600,5000,510,0,fighter]
   [5800,5800,620,1,fighter,stand] [6650,6650,620,1,shield,stand]
links: [280,120,0,1] [1060,120,0,1] [3120,60,1,2] [3840,60,1,2]
       [4240,120,0,1] [4280,60,1,2] [5060,120,0,1] [5230,60,1,2]
checkpoints: [1540,620] [2820,620] [4200,620] [5200,620] [6200,620]
hints: [340,540,gate] [200,560,sword]
C: [120,580,1] [200,580,1] [280,580,1] [480,496,0] [600,496,0] [720,496,0] [840,496,0]
   [1655,480,1] [1855,390,1] [2055,300,1] [2180,280,1] [2270,230,1] [2360,280,1]
   [3200,620,2] [3400,620,2] [3600,620,2] [3800,620,2]
   [4800,376,0] [4900,376,0] [5000,376,0] [4325,616,2] [4575,616,2] [4825,616,2]
```

Not in the format yet: guard type and `stand` fields (x1 = x2 flips
facing every frame, line 743); advance, raise, thrust, recovery, shield,
kneel; rain; `far:'stupas'` and `mid:'jungle'` are wrong by RESEARCH.md
3.3 until slots 3 and 16 load; a palisade across lanes; a per-level gate
image.

## Revision notes

- 2026-10-25, second draft, after the levels review and DESIGN.md draft
  2. S1 moved to 660–1060 so the start and both hints sit outside his
  cone; the stilts and everything east shifted 100 px (width 7300) so
  CP1 clears him; S3 cone claim corrected; near river exit moved past
  its landing; gate is slot 35 with the glyph off; sentinels per section
  4; seconds column and sum; coins as data; `water` and `banners` set.
- First draft: rule 6 versus rule 10 at the gateway, resolved by draft 2's
  sentinels. Peak sits at 90 percent by design; the court is the breath.
  No playtest.

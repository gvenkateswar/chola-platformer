# Level 1 — Thanjavur, 1010

Owner: level-designer. Third draft, 2026-10-25, under DESIGN.md draft 3
(sections 2, 2a, 9). Budget raised to 1,100 words of prose and table cells
for the longer level (coordinator, 2026-10-25). Units px; lanes 0 far, 1
main, 2 near; y is a platform's top.

## 1. Purpose

Hands Ilamaran his sheathed sword, teaches climbing (pole, plank, rope)
and pushing (a block on rollers) over safe ground, then the gate leap and
the guard who sees forward only; it ends combining all of it beside two
guards. A work site at a new temple. Pillar 1.

## 2. The place

A walled court entered from the east through two low barrel-vaulted
gateways [documented]. Timber and bamboo scaffolding on the cloister and
an inner gateway, never the vimana, gilded by 1010 [plausible;
documented]. Hauling ropes and small plain blocks on rollers [plausible].
Scaffold poles, never the flagstaff. Standing lamps [documented]; one
crimson kodi on its staff. The older man with the sword is [invented],
below commander rank.

## 3. Beat sheet

Tension 1 to 5. s: seconds for a first-time player, one wait or retry in.

| Beat | x | Does | Sees | Tension | s | Rule |
|---|---|---|---|---|---|---|
| Handover | 0–420 | Walks into the older man; takes the sword | Dawn court | 1 | 6 | — |
| Work yard | 420–1050 | Pushes the block to the course, climbs | Rollers, kasu | 2 | 12 | 8 |
| Scaffold | 1050–1900 | Pole, plank, rope, leap to the cornice | Scaffolding | 2 | 16 | 8 |
| The gap | 1870–2350 | Double jump to the plinth, drop | Kasu arc | 2 | 8 | 8 |
| First gate | 2350–2640 | Banner, hint | G1, M1 beyond | 2 | 5 | 4, 6 |
| Wall-walk | 2640–3360 | Up at G1 behind M1, down at G2 | Guard below, F1 ahead | 3 | 16 | 2, 3, 5 |
| Pillars | 3440–4000 | 180 px wall, two hops, banner | Kasu on the tops | 4 | 18 | 7, 8 |
| Rollers at the gate | 4000–5000 | Pushes the block before G3, leaps behind it, up at G4 | M2 | 3 | 22 | 3, 5 |
| Canyon | 5340–6460 | Banner; far: hide over F2; near: three jumps | The drop | 4 | 24 | 3, 8 |
| Gateway yard | 6840–8220 | Main: block, course, pole, walk over M3, rope down. Near: G7, ledge over N3, G8 | Scaffolded gateway | 5 | 45 | 2, 3, 5 |
| Summons | 8260–8600 | Banner, walks to the flag | Nandi, the vimana | 1 | 6 | — |

Sum 178 s, about 3 minutes; DESIGN.md 7 allows 193. Peak at 80 percent:
the combination is the level's end by design (2a), the summons the breath.

## 4. Critical path and side paths

Each piece is met first over floor, no guard within 1,280 px. **Block**:
needed for the 200 px course (an expert double jump skips it). **Pole**:
the only way to plank A, 220 up. **Rope**: the only way to the cornice;
rope D is reached by walking off the plank end, not a full jump. **Rollers at the gate**: pushed to its stop, the
block shields G3 from M2's cone, so the leap needs no timing; without it,
leap as M2 walks east. **Canyon**: far safer, near richer.
**Gateway yard**: main is the combination (block as step and cover, pole
to the plank walk, rope down); near is G7, N3 with a ledge, G8. Two
optional step-offs land in a guard's sweep in full view: between the
pillars (the forced beat's tax) and east off course C (NOTES.md).

Gates, slot 13: G1 2700, G2 3360; G3 4350, G4 5000; canyon 5480 in, far
6320 and near 6460 out; G7 7000, G8 8000.

## 5. Guards and enemies

Sight per DESIGN.md 3. All start at x1 + 30 walking east, so M3 and N3
run in phase.

| id | lane | patrol | y | Unseen way past | If seen |
|---|---|---|---|---|---|
| M1 | 1 | 2860–3260 | 620 | Wait at 2500; G1 up as he walks east, walk, G2 down as he walks west | Run; a slide on the pillar wall is caught |
| F1 | 0 | 3660–4060 | 492 | Not passed: G2 at his sweep's edge says "come down" | Leap down |
| M2 | 1 | 4480–4880 | 620 | Push the block to 4400; he turns 80 px off it; leap at G3 behind it; G4 up as he walks west | Run west |
| F2 | 0 | 5600–6000 | 514 | Up as he walks east; raised walk; drop behind him; out at 6320, past his cone | Back to the gate |
| M3 | 1 | 7360–7760 | 620 | Block hides the course foot; course, pole, walk out of band; rope at 8220, past his cone | Climb |
| N3 | 2 | 7400–7800 | 656 | G7 is outside his cone; ledge at 7520 (96 up) as he walks east; drop behind him; G8 while both walk west | Ledge |

Both patrol ends show from each wait spot.

## 6. Checkpoints

CP0 1050 (before the climb). CP1 2400 (before the first gate). CP2 3860
on the terrace, y 280 (after the forced beat). CP3 5340 (before the
canyon). CP4 6840 (before the yard). CP5 8260 (after).
Spacing 1350, 1460, 1480, 1500, 1420; none within 150 px of a cone.

## 7. Props and set dressing

ASSETS.md: `kodi.png` 19, `lamp.png` 20, `nandi.png` 21,
`guard_reach.png` 22, `kasu.png` 36; backdrop 1, stone 4, guards 11–12,
gate 13, band 14. New, by name (art-director to number): older man of
the company; hero unarmed idle; hero hand on hilt; hero climb (two
frames), hang, push; scaffold pole; scaffold plank; hauling rope with
beam; block on wooden rollers (plain, undressed); scaffolding dressing
for the cloister and the inner gateway.

## 8. Story hooks

Intro: dawn, an errand. The handover line (NOTES.md). Inert-press line
on the first J/X. Mid at CP2 (the vimana close; awe). End: summons east,
no triumph.

## 9. Builder notes

Width 8800, killY 820 (canyon only), `banners:false`, start [60,620], npc
[300,620], goal {8600,620}. New fields: K one-way planks `[x,y,w,lane]`
(20 thick); POLE `[x,yTop,yBottom,lane]`; ROPE `[x,anchorY,length,lane]`;
BLOCK `[startX,trackEndX,lane]`, 80 by 64.

```
P: [-80,620,5640,240,1] [780,420,240,200,1] [1590,280,280,24,1] [2170,300,180,320,1]
   [2640,492,1460,26,0] [3440,440,90,290,1] [3620,360,90,370,1] [3800,280,200,450,1]
   [4300,656,740,64,2] [5460,514,900,30,0] [5800,420,300,24,0]
   [5460,656,140,64,2] [5720,656,140,64,2] [5980,656,140,64,2] [6240,656,320,64,2]
   [6200,620,2600,240,1] [7160,420,120,200,1] [6960,656,1100,64,2] [7520,560,200,24,2]
K: [1120,400,260,1] [7240,240,300,1] [7540,240,300,1] [7840,240,300,1]
POLE: [1100,380,620,1] [7230,220,420,1]
ROPE: [1490,160,260,1] [8220,200,220,1]
BLOCK: [460,700,1] [4220,4400,1] [6900,7080,1]
G: [2860,3260,620,1] [3660,4060,492,0] [4480,4880,620,1] [5600,6000,514,0]
   [7360,7760,620,1] [7400,7800,656,2]
links: [2640,120,0,1] [3300,120,0,1] [4320,60,1,2] [4970,60,1,2] [5420,120,0,1]
   [5450,60,1,2] [6260,120,0,1] [6430,60,1,2] [6970,60,1,2] [7970,60,1,2]
checkpoints: [1050,620] [2400,620] [3860,280] [5340,620] [6840,620] [8260,620]
hints: [500,560,push] [1100,560,climb] [1900,240,double jump] [2700,540,gate]
C: [840,380,1] [900,380,1] [960,380,1] [1180,360,1] [1260,360,1] [1340,360,1]
   [1560,180,1] [1640,210,1] [1720,240,1] [1960,220,1] [2020,200,1] [2080,220,1]
   [2820,452,0] [2940,452,0] [3060,452,0] [3180,452,0] [3485,400,1] [3665,320,1] [3900,240,1]
   [4500,616,2] [4650,616,2] [4800,616,2] [5530,616,2] [5790,616,2] [6050,616,2]
   [5880,380,0] [5960,380,0] [6040,380,0] [7400,200,1] [7600,200,1] [7800,200,1] [8000,200,1]
   [7560,520,2] [7620,520,2] [7680,520,2]
```

Not in the engine yet: one-way planks and drop-through; poles and ropes
(grab, climb, sway, release); blocks (push, track, cone occlusion, reset
on checkpoint return); guards turning 80 px off a block; the gate leap
tween (`build/level-1` has the stand); the handover scene and NPC; the
sword glyph and hand-on-hilt press.

## Revision notes

- 2026-10-25, third draft, after Gaurav's playtest (DECISIONS.md 10 to
  16) and DESIGN.md draft 3. Added the handover, a guard-free teaching
  run for block, pole, plank and rope, the M2 block beat (which also gives
  M2 the gate rule 3 always required), and the gateway yard with a sixth
  guard. Draft 2's stealth core kept, shifted 960 px east; the pillar
  wall is now at 3440. M3's terrace bypass cut for the yard. Arrays
  checked by script, including rope and pole reach. No playtest.
- Earlier drafts: rules 3/5 conflict and chase arithmetic, taken in
  DESIGN.md drafts 2 and 3.

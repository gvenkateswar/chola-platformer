# Level 1 — Thanjavur, 1010

Owner: level-designer. Second draft, 2026-10-25, under DESIGN.md draft 2
section 9. Budget 900 words of prose and table cells. Units px; lanes 0
far, 1 main, 2 near; y is a platform's top.

## 1. Purpose

Teaches every verb but the sword, then one fact about guards: he sees
forward only. The player feels morning awe and one held breath on the
wall-walk. Serves Pillar 1: the crossing is earned at a gate.

## 2. The place

New granite: a walled rectangle entered from the east through two low
barrel-vaulted gateways, well under half the vimana's height [documented].
A pillared cloister lines the wall; its upper storey is the far lane's
wall-walk [plausible]. Standing oil lamps [documented]; one crimson kodi
on a flagstaff, no streamers on walls [invented if shown]. No fort wall,
moat, or tall gopuram [plausible]. Regimental guards at the gates
[documented].

## 3. Beat sheet

Tension 1 to 5. s: seconds for a first-time player, one wait or retry in.

| Beat | x | Does | Sees | Tension | s | Rule |
|---|---|---|---|---|---|---|
| East road | 0–300 | Runs | Vimana in haze | 1 | 3 | 9 |
| Stairs | 300–850 | Three hops up | Cloister steps | 2 | 8 | 8 |
| The gap | 850–1330 | Double jump 300 px to the plinth | Kasu arc | 2 | 8 | 8 |
| Landing | 1330–1700 | Drops, banner, hint | G1, M1 | 2 | 5 | 4, 6 |
| Wall-walk | 1700–2400 | Up at G1 behind M1, along the roof, down at G2 | Guard below, F1 ahead | 3 | 16 | 2, 3, 5 |
| Pillars | 2480–3040 | 180 px wall (double or wall jump), two hops, banner | Kasu on the tops | 4 | 18 | 7, 8 |
| Cloister floor | 3040–3550 | Drops, breathes | M2 far off | 2 | 4 | 5 |
| Over M2 | 3550–4000 | Follows his back, ledge, drops behind | 96 px ledge | 3 | 12 | 3 |
| Canyon mouth | 4000–4560 | Banner, picks a lane | F2 above, gaps below | 3 | 6 | 4, 6 |
| The canyon | 4560–5490 | Far: hide over F2. Near: three jumps | The drop | 5 | 20 | 3, 8 |
| Last gate | 5490–6250 | Lane 0 bypass or ledge over M3 | Inner gateway | 3 | 16 | 2, 3 |
| Summons | 6250–6460 | Walks to the flag | Nandi, the vimana | 1 | 4 | — |

Sum 120 s; DESIGN.md 7 allows 126.

## 4. Critical path and side paths

Main lane except two places. **Wall-walk**: M1 holds the main lane; the
cloister roof (G1 in, G2 out) is the clean way. **Pillars**: the forced beat. The first pillar is a 180 px wall
inside M1's leash (2600); a clean double jump clears it, a wall-slide is
the stop that gets caught. **Canyon**: main ground gone for 760 px. Far
is safer (a guard, solid footing, a hide); near is faster and richer
(three 120 px gaps over a visible drop, one heart per fall). M2 and M3
each have a ledge over the patrol; M3 also a far-lane bypass.

Gates, slot 13: G1 1740, G2 2400; canyon in 4500/4510, out 5320 (far),
5490 (near, 250 px past its landing); G5 5700, G6 6360.

## 5. Guards and enemies

Sight per DESIGN.md 3: cone 300 forward, band 80, 0.25 s, same lane only.

| id | lane | patrol | y | Unseen way past | If seen |
|---|---|---|---|---|---|
| M1 | 1 | 1900–2300 | 620 | Wait at 1550; on his turn east, up at G1, walk, down at G2 as he walks west | Run; only a stop at the pillars is caught |
| F1 | 0 | 2700–3100 | 492 | Not passed: G2 sits at the west edge of his sweep; he says "come down" | Cross down; he cannot follow |
| M2 | 1 | 3550–3950 | 620 | Wait at 3200, follow his back, ledge at 3700, drop at 4000 | Run; he never jumps |
| F2 | 0 | 4600–5000 | 514 | Up at G3 as he walks east; raised walk at 4800; drop at 5100 behind him; 5320 is past his reach (5300) | Back to G3, or run |
| M3 | 1 | 5850–6250 | 620 | G5 up, terrace, G6 down; or ledge at 6000 | Cross at G5 |

Each wait is one leg, 4.2 s; both ends show from the wait spot. Every gate
stand begins with the lane's guard walking away.

## 6. Checkpoints

CP1 1400 (before the forced beat). CP2 2900 on the terrace, y 280 (after
it, above every band). CP3 4400 (before the canyon). CP4 5400 (after).
Spacing 1340, 1500, 1500, 1000; none within 150 px of a cone.

## 7. Props and set dressing

ASSETS.md: `kodi.png` 19 (checkpoints), `lamp.png` 20 (cloister),
`nandi.png` 21 (far plane at the goal), `guard_reach.png` 22 (the catch),
`kasu.png` 36. Existing: backdrop 1, stone 4, guards 11–12, gate 13, band
14.

## 8. Story hooks

Intro: dawn, new stone, a soldier with an errand. Mid at CP2 (the vimana
close; awe). Attack-key float once. End at the goal: summons east, no
triumph.

## 9. Builder notes

Width 6600, killY 820, `banners:false`, start [60,620], goal {6460,620}.

```
P: [-80,620,1230,240,1] [300,500,140,26,1] [500,410,140,26,1] [700,330,150,26,1]
   [1150,330,180,300,1] [1330,620,3230,240,1] [1680,492,1460,26,0]
   [2480,440,90,290,1] [2660,360,90,370,1] [2840,280,200,450,1]
   [3700,524,300,24,1] [4460,514,900,30,0] [4800,420,300,24,0]
   [4460,656,140,64,2] [4720,656,140,64,2] [4980,656,140,64,2] [5240,656,320,64,2]
   [5200,620,1400,240,1] [5640,540,760,26,0] [6000,524,300,24,1]
G: [1900,2300,620,1] [2700,3100,492,0] [3550,3950,620,1] [4600,5000,514,0] [5850,6250,620,1]
links: [1680,120,0,1] [2340,120,0,1] [4440,120,0,1] [4480,60,1,2]
       [5260,120,0,1] [5460,60,1,2] [5640,120,0,1] [6300,120,0,1]
checkpoints: [1400,620] [2900,280] [4400,620] [5400,620]
hints: [1740,540,gate] [1000,280,double jump]
C: [360,460,1] [560,370,1] [770,290,1] [900,280,1] [1000,240,1] [1100,280,1]
   [1860,452,0] [1980,452,0] [2100,452,0] [2220,452,0]
   [2525,400,1] [2705,320,1] [2940,240,1] [3760,484,1] [3850,484,1] [3940,484,1]
   [4530,610,2] [4790,610,2] [5050,610,2] [4880,380,0] [4980,380,0] [5080,380,0]
   [5800,500,0] [5950,500,0] [6100,500,0] [6250,500,0]
```

Not in the format yet: cone, chase, catch on a stop, scold, "?" and "!";
turn-toward-player (line 745) goes; killY `hurt(2)` becomes 1; attack
inert. The plinth at 1150 reaches the ground: a missed double jump is a
walk back, not a fall.

## Revision notes

- 2026-10-25, second draft, after the levels review and DESIGN.md draft
  2. First pillar raised to a 180 px wall so the forced beat is a real
  stop; F1 moved to 2700–3100 so G2 is a one-guard read; near canyon exit
  moved 250 px past its landing; seconds column and sum; `banners:false`;
  coins as data; slots named; CP2 y follows the terrace.
- First draft: rules 3/5 conflict and the chase arithmetic, noted to the
  game-designer and taken in draft 2. No playtest.

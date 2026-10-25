# Level 1 — Thanjavur, 1010

Owner: level-designer. First draft, 2026-10-25, under DESIGN.md section 9.
Budget 900 words of prose and table cells. Units px; lanes 0 far, 1 main,
2 near; y is a platform's top.

## 1. Purpose

Teaches every verb but the sword, then one fact about guards: he sees
forward only. The player feels morning awe and one held breath on the
wall-walk. Serves Pillar 1: the crossing is earned at a painted gate.

## 2. The place

New granite: a walled rectangle entered from the east through two low
barrel-vaulted gateways, well under half the vimana's height [documented].
A pillared cloister lines the wall; its upper storey is the far lane's
wall-walk [plausible]. Standing oil lamps everywhere [documented]; one
crimson kodi on a flagstaff, no streamers on walls [invented if shown]. No
fort wall, moat, or tall gopuram [plausible]. Regimental guards at the
gates [documented].

## 3. Beat sheet

| Beat | x | Does | Sees | T | Rule |
|---|---|---|---|---|---|
| East road | 0–300 | Runs | Vimana in haze | 1 | 9 |
| Stairs | 300–850 | Three hops up | Cloister steps | 2 | 8 |
| The gap | 850–1330 | Double jump 300 px to the plinth | Kasu arc | 2 | 8 |
| Landing | 1330–1700 | Drops, banner, hint | G1, M1 beyond | 2 | 4, 6 |
| Wall-walk | 1700–2400 | Up at G1 behind M1, along the roof, down at G2 before F1 | Guard below, guard ahead | 3 | 2, 3, 5 |
| Pillars | 2480–3040 | Three hops, wall jump on a miss, banner on top | Kasu on the tops | 4 | 7, 8 |
| Cloister floor | 3040–3550 | Drops, breathes | M2 far off | 2 | 5 |
| Over M2 | 3550–4000 | Follows his back, hops the ledge, drops behind | 96 px ledge | 3 | 3 |
| Canyon mouth | 4000–4560 | Banner, picks a lane | Two gates, F2 above, gaps below | 3 | 4, 6 |
| The canyon | 4560–5320 | Far: hide over F2. Near: three jumps | The courtyard drop | 5 | 3, 8 |
| Last gate | 5320–6250 | Lane 0 bypass or ledge over M3 | Inner gateway, goal flag | 3 | 2, 3 |
| Summons | 6250–6460 | Walks to the flag | Nandi, vimana close | 1 | — |

## 4. Critical path and side paths

Main lane throughout except two places. **Wall-walk**: M1 holds the main
lane; the cloister roof (G1 in, G2 out) is the clean way; a main-lane rush
costs a catch. **Canyon**: main ground is gone for 760 px. Far is safer
(a guard, solid footing, a hide); near is faster and richer (three kasu,
three 120 px gaps over a visible drop, one heart per fall). M2 and M3 each
have a ledge over the patrol; M3 also a far-lane bypass.

Gates, all slot 13 (granite pillars, straight lintel, standing lamps): G1
1740, G2 2400; G3 4500/4510 and G4 5320/5310 at the canyon; G5 5700, G6
6360. No torana anywhere.

## 5. Guards and enemies

Sight per DESIGN.md 3: cone 300 forward, band 80, 0.25 s, same lane only.

| id | lane | patrol | y | Unseen way past | If seen |
|---|---|---|---|---|---|
| M1 | 1 | 1900–2300 | 620 | Wait at 1550; when he turns east, up at G1, walk to G2, down as he walks west | Back west, or cross; chase ends |
| F1 | 0 | 2550–2950 | 492 | Not passed: he walks at G2 to say "come down." Cross before his cone (edge 2250) | Cross down; he cannot follow |
| M2 | 1 | 3550–3950 | 620 | Wait at 3200, follow his back, ledge at 3700, drop at 4000 | Jump to the ledge; he never jumps |
| F2 | 0 | 4600–5000 | 514 | Up at G3 as he walks east; raised walk at 4800; drop at 5100 behind him; G4 is past his cone | Back to G3, or run to G4 |
| M3 | 1 | 5850–6250 | 620 | G5 up, lane 0 terrace, G6 down; or ledge at 6000 | Cross at G5 |

Each wait is one leg, 4.2 s; both patrol ends show from the wait spot.

## 6. Checkpoints

CP1 1400 (after the gap, before the forced beat). CP2 2900 on the terrace,
y 340 (after the forced beat, above every band). CP3 4400 (before the
canyon). CP4 5400 (after). Spacing 1340, 1500, 1500, 1000; none within
150 px of a cone.

## 7. Props and set dressing

Crimson kodi on a staff for checkpoints: new, slot 19. Standing bronze
lamps along the cloister: new, 20. Monolithic Nandi, far plane at the
goal: new, 21. Guard reaching, one pose (the catch): new, 22. Plinth,
terrace, pillars: slot 4. Backdrop 1, guards 11–12, gate 13, band 14.

## 8. Story hooks

Intro: dawn, new stone, a soldier with an errand. Mid at CP2 (the vimana
close for the first time; awe). Attack-key float once. End at the goal:
summons east, no triumph.

## 9. Builder notes

Width 6600, killY 820, start [60,620], goal {6460,620}. The build's
stairs, pillars, and canyon are kept, moved east.

```
P: [-80,620,1230,240,1] [300,500,140,26,1] [500,410,140,26,1] [700,330,150,26,1]
   [1150,330,180,300,1] [1330,620,3230,240,1] [1680,492,1460,26,0]
   [2480,540,90,190,1] [2660,450,90,280,1] [2840,340,200,390,1]
   [3700,524,300,24,1] [4460,514,900,30,0] [4800,420,300,24,0]
   [4460,656,140,64,2] [4720,656,140,64,2] [4980,656,140,64,2] [5240,656,160,64,2]
   [5200,620,1400,240,1] [5640,540,760,26,0] [6000,524,300,24,1]
G: [1900,2300,620,1] [2550,2950,492,0] [3550,3950,620,1] [4600,5000,514,0] [5850,6250,620,1]
links: [1680,120,0,1] [2340,120,0,1] [4440,120,0,1] [4480,60,1,2]
       [5260,120,0,1] [5280,60,1,2] [5640,120,0,1] [6300,120,0,1]
checkpoints: [1400,620] [2900,340] [4400,620] [5400,620]
hints: [1740,540,gate] [1000,280,double jump]
C: stairs 360/460 560/370 770/290; arc 900/280 1000/240 1100/280; lane 0
   1860–2220 step 120 y 452; pillar tops; ledge 3760–3940 y 484; plinths
   4530/4790/5050 y 610; raised walk 4880–5080 y 380; terrace 5800–6250 y 500.
```

Not in the format yet: cone, chase, catch, scold, "?" and "!";
turn-toward-player (line 745) must go; killY `hurt(2)` becomes 1; attack
inert. The plinth at 1150 reaches the ground: a missed double jump is a
600 px walk back, not a fall.

## Revision notes

- 2026-10-25, first draft. Rule 5 cannot hold literally at a gate inside a
  patrol (rule 3) when the other lane's guard patrols 400 px and gates pair
  within 1200 (NOTES.md). Reading used: a gate exit may lie in a cone
  sweep if that guard is on screen from the gate and walks away a full
  leg. No playtest.

# Current implementation audit: ropes and vines, sword combat, coins, and game-feel infrastructure (Chola: Tides of Bronze, branch build/levels-2-3)

Scope: local code audit of `/home/claude/wt-l23/index.html` (3,083 lines, HEAD `0a97a56`), its docs, and a headless Playwright run (1280x720, clock stepped manually at 1/60 s). Nothing in the repo was modified. Line numbers below refer to `index.html` unless another file is named. "What the code does" is under Cited Findings; "why it likely feels wrong" is under Inferences.

Evidence captured (all under `/tmp/claude-0/-home-claude/e2e21f34-cfa8-5c33-81e5-8eaa93a81386/scratchpad/audit/`):
- `rope_sheet.png` (7 frames of a pumped swing on level 1, rope 1), `rope_pump_*.png`, `rope_atmax_*.png`, `rope_bottom_fast.png`, `rope_log.json` (per-frame angle, angular speed, grip, pose tilt)
- `sword_sheet.png` (frames 0, 2, 4, 6, 8, 10, 12, 15 of one cut), `sword_f00..21.png`, `sword_f06_zoom.png`, `sword_log.json` (per-frame blended arm angle and target angle)
- `fighter_sheet.png` (fighter telegraph, thrust, recovery, and the shield-bearer), `level3_full.png`
- `capture.js`, `probe.js` (the scripts that produced them)

---

## 1. Ropes and vines: how they are simulated, drawn, tuned, grabbed, released, and posed

### Takeaway
A rope is one rigid pendulum (a single angle and angular speed) with a fixed 2.0 s period at any grip height, a hard clamp at ±50 degrees that zeroes its speed, and a drawn curve that can bow at most about 5 px. The hero's whole cut-out figure is rotated rigidly with the rope about his grip. Rope, hands, body, and the tail below the hands all lie on one straight line, so the rope reads as a stick, and the swing has no weight, no bend, and no lag.

### Cited Findings

**Simulation model (what the code does)**
- A rope is a pendulum from its anchor with angle `ang` from vertical and angular speed `angV`. The comment says: "The period is fixed (TUNE.ROPE_PERIOD) at any grip height, so the rhythm a player learns holds all the way up the rope." — [index.html:1196-1199](file:///home/claude/wt-l23/index.html)
- Restoring term: `ROPE_W2 = (2π/ROPE_PERIOD)²` = 9.87 s⁻², used as `acc = -ROPE_W2*sin(ang)`. It does not depend on the grip distance `c.r`, so it is not a physical pendulum. — [index.html:1199, 1276](file:///home/claude/wt-l23/index.html)
- Held rope step: `acc = -W2*sin(ang) - ROPE_DAMP*angV (ropes only) + vineDrive (vines only)`; pump adds `lr*ROPE_PUMP` when the ← or → key matches the swing's direction, or when `|angV| < 0.15`. Integration is semi-implicit Euler: `angV += acc*dt; ang += angV*dt`. — [index.html:1276-1282](file:///home/claude/wt-l23/index.html)
- Hard limit: `if(|ang| > max){ ang = sign*max; angV = 0; }`, with max = 50°. The swing stops dead at the limit. — [index.html:1283-1284](file:///home/claude/wt-l23/index.html)
- The hero's position is computed from the rope each frame: `p.x = o.x + r*sin(ang)`, `p.y = o.ay + r*cos(ang) + HANG_HANDS`, and `p.vx = p.vy = 0` while climbing. He is not a body on the rope. He is a point on the rope's line. — [index.html:1285-1289](file:///home/claude/wt-l23/index.html)
- Climbing up or down changes `c.r` at 130 px/s, between 10 px and the rope's length. Angular speed is unchanged when `r` changes, so climbing does not conserve angular momentum and cannot be used to "reel in" for speed. — [index.html:1273-1274](file:///home/claude/wt-l23/index.html)
- Unheld ropes are spring-driven toward a scripted idle sway: `angV += ((idle - ang)*W2 - angV*ROPE_SETTLE)*dt`, where `idle = asin(ROPE_SWAY/len)*sin(time*2π/ROPE_PERIOD)`. — [index.html:1218-1220](file:///home/claude/wt-l23/index.html)
- Vines have no damping. A constant-sign drive of 1.2 rad/s² pushes them whenever their energy amplitude is under 45°. They start mid-swing at their own phase. — [index.html:1206-1216, 985-986](file:///home/claude/wt-l23/index.html)
- Depth-crossing ("marked") ropes and vines do not use physics. Pressing ↑ or ↓ starts a scripted 1.0 s tween on a 60 px arc to a fixed `landX` (`p.leap`, `moving:true`). — [index.html:1306-1319](file:///home/claude/wt-l23/index.html); [TUNE MARKED_SWING, MARKED_ARC at 191-192](file:///home/claude/wt-l23/index.html)

**TUNE constants (rope and vine)** — [index.html:161-174, 191-195, 211-216](file:///home/claude/wt-l23/index.html)

| Constant | Value | Meaning |
|---|---|---|
| ROPE_CLIMB | 130 px/s | climb along rope |
| ROPE_SWAY | 12 px | idle sway at the free end |
| ROPE_PERIOD | 2.0 s | swing period at any grip |
| ROPE_MAX_ANGLE | 50° | hard clamp |
| ROPE_PUMP | 2.4 rad/s² | pump acceleration |
| ROPE_DAMP | 0.12 /s | damping on ropes (not vines) |
| ROPE_SETTLE | 1.5 | damping for unheld ropes |
| ROPE_GRAB_KEEP | 0.8 | share of run speed turned into swing on grab |
| ROPE_RELEASE_GAIN | 1.3 | release speed = hand speed × 1.3 |
| ROPE_RELEASE_VY | -420 px/s | jump push added on release |
| ROPE_RELEASE_DOUBLE | false | release spends the double jump |
| AIR_KEEP / AIR_FRICTION | 300 / 500 px/s² | over-cap speed bleed and drag in release flight |
| VINE_AMP / VINE_DRIVE / VINE_RELEASE_VY | 45°, 1.2 rad/s², -420 | vine self-swing |
| GRAB_X / GRAB_COOL / ROPE_SLACK / HANG_HANDS | 16 px, 0.25 s, 24 px, 50 px | grab reach, re-grab cooldown, catchable tail, hands above feet |
| World gravity (not in TUNE) | 2300 px/s² | `p.vy += 2300*dt` — [index.html:1467](file:///home/claude/wt-l23/index.html) |
| Run (not in TUNE) | ACCEL 2600, MAXV 385, FRICTION 2200 | [index.html:1367](file:///home/claude/wt-l23/index.html) |

**Grab and release**
- Grab happens on touch while airborne, or by holding ↑ beside the rope. Horizontal reach is ±16 px of the rope's x at hand height. — [index.html:1228-1239, 1427-1434](file:///home/claude/wt-l23/index.html)
- On grab, `r = (handY - anchorY)/cos(ang)` is clamped to 10..len, and `angV += clamp(vx*cos(ang)*0.8/r, -3, 3)`. The hero is placed on the rope line at once, a snap of up to 16 px. There is no grab sound, no rope jolt, and no catch pose. — [index.html:1242-1247](file:///home/claude/wt-l23/index.html)
- Release: `v = r*angV*1.3`; `vx = v*cos(ang)`, `vy = -v*sin(ang) + (-420 if jump)`. A non-jump release (climbing off the bottom) gets no hop. The double jump is spent. Flight above the 385 cap bleeds off at 300 px/s². — [index.html:1248-1257, 1300-1303, 1451-1453](file:///home/claude/wt-l23/index.html)
- Observed: a jump release at about 25° on the forward upswing gave vx = 525 px/s and vy = -708 px/s on the first frame. With jump not held, vy was trimmed to -588 on the next frame by the variable-jump cut (`liftV`). The hero landed on the cornice about 30 frames later at x = 1786. — `capture.js` console output

**Observed swing behavior (rope 1, level 1, grip r = 150, holding → the whole time)** — `rope_log.json`
- Amplitude grows over about three half-swings: 27.6° at 1.0 s, 49.5° at 3.0 s, 49.9° at 4.75 s. Peak angular speed is about 3.2 rad/s, which is about 477 px/s at the hands and about 620 px/s on release.
- The clamp engaged (`|ang| ≥ 50°` with `angV = 0`) on 2 frames. After the pump stops, damping brings the amplitude to about 47° to 40° within 4 s.
- The pose tilt `rigS.rot` equals the rope angle exactly on every frame (for example 4.8, 14.8, 24.0, 27.6, 21.7). The figure is welded to the rope.

**Drawing (what the screen shows)**
- `drawRope` draws one `quadraticCurveTo` from the anchor to the rope end. The control point is offset perpendicular by `bend = clamp(-angV*6, -10, 10)` px. The comment says: "a little sag toward the trailing side, so a fast swing reads as a rope and not a rod." The line is 4 px wide (3.5 for vines), with a 5 px knot at the end and three leaf ellipses on vines. — [index.html:2379-2395](file:///home/claude/wt-l23/index.html)
- A quadratic's midpoint moves half the control offset, so the largest visible bow is about 5 px on a 220 to 300 px rope (about 2 percent). The curve is not forced through the hero's hands. The tail below the hands follows the same line. It does not hang toward gravity or trail.
- Observed in `rope_sheet.png`: at ±50° the rope is a ruled straight diagonal from the beam through the hero's hands to the end knot, and the tail continues past him in the same line. At the bottom of a fast swing the rope is visually vertical and straight. A dark contact-shadow ellipse floats in mid-air under his feet in the swinging frames, because `drawRig` always draws the ground shadow at the feet. — [index.html:615-619](file:///home/claude/wt-l23/index.html)

**Hero cut-out rig while swinging**
- The rope pose sets the arms overhead for hand-over-hand climbing (fua −150..−178, bua −178..−150), thighs −42..−14, torso 2, sash −8. When swinging, a pump forward kicks the legs (fth −30, bth −22) and a pump backward tucks them (fth +18, shins 70/64), with torso ±6. — [index.html:733-746](file:///home/claude/wt-l23/index.html)
- `rot = ang*180/π*face`: the whole figure tilts with the rope. `heroPin` puts the tilt pivot at the posed palms and pins them to the grip. — [index.html:748, 687-698](file:///home/claude/wt-l23/index.html)
- Secondary motion: the leg springs trail the swing by `-0.06*fwd` and `-0.05*fwd` degrees per px/s, clamped ±25°. The spring constants are fth k=50, d=6 and bth k=45, d=6. The sash and head ride springs. — [index.html:661-685](file:///home/claude/wt-l23/index.html)
- Pose blending is `rigBlend(st, tgt, 0.35)` once per rendered frame, a per-frame exponential that depends on frame rate. — [index.html:2966-2969, 602-608](file:///home/claude/wt-l23/index.html)
- Observed: the thigh angle jumps between about −75 and −98 while pumping and about −18 to −40 when not pumping (`rope_log.json` `fth`). The legs switch between two poses on key press. They do not swing continuously with the arc.
- Audio: grabbing makes no sound. A release plays `sfx.jump` (a square-wave chirp). There is no creak, whoosh, or swing sound. — [index.html:1242-1257, 1292, 350](file:///home/claude/wt-l23/index.html)

**Docs**
- DECISIONS 20 asks that the player pump to build the swing and that the release "aims the jump". DECISIONS 21 says the climb "still feels like storyboard pre-viz" and makes animation polish on climb, hang, and swing a standing builder task. — [docs/DECISIONS.md:86-92](file:///home/claude/wt-l23/docs/DECISIONS.md)
- The builder proposed these swing numbers in NOTES as "builder's numbers" for the designer to rule on. DESIGN §2a now records them as ruled. — [docs/NOTES.md:345-366](file:///home/claude/wt-l23/docs/NOTES.md); [docs/DESIGN.md §2a](file:///home/claude/wt-l23/docs/DESIGN.md)

### Inferences (why it likely feels off)
- **"Like a stick."** The rope has one degree of freedom and is drawn as an almost straight line. The tail below the hands stays collinear instead of hanging or whipping, and the body is rotated rigidly as an extension of that line. Rope, arms, torso, and legs pivot as one rod about the beam. Nothing in the chain lags, bends, or overshoots except the ±25° leg spring and the sash.
- **Weightless, metronome rhythm.** Because ω² does not depend on grip length, the effective gravity on the rope is ω²·r, about 1,480 px/s² at r = 150 and about 99 px/s² near the top (r = 10), against 2,300 px/s² everywhere else in the game. The swing falls slower than the hero's own jump arc, so it likely feels floaty. Every rope also ticks at the same 2 s period whatever its length.
- **Dead stop at 50°.** The clamp zeroes `angV` instead of letting energy or rope tension limit the arc. A pumped swing hits an invisible wall at the top of each arc, followed by an instant reversal. Real ropes ease into a peak and go slack or jerk.
- **No body-on-rope dynamics.** The hero's position is set from the rope, his velocity is zeroed while attached, and there is no second pendulum (hips swinging under the hands). Real and well-loved game swings (body lag, legs swinging through at the bottom) have no hooks here other than the leg spring. Pumping also switches leg poses on key press instead of driving a continuous leg swing, which reads as twitchy.
- **Snap on grab, no catch moment.** He teleports up to 16 px onto the line. There is no sound, rope jolt, or settle, so the grab has no weight.
- **Floating contact shadow** under a swinging hero breaks the sense of height and makes him look pasted onto the scene.
- **Marked ropes and vines are scripted tweens** (1.0 s, 60 px arc) and will feel different from the physics ropes next to them.

### Gaps
- I did not capture a vine swing frame by frame. Its code path is the same pendulum with no damping and a drive term, plus the same draw function and leaves, so it should look the same.
- Frame-rate dependence of `rigBlend` (0.35 per rendered frame) was inferred from code, not measured on a 120 Hz display.
- I did not test touch input on ropes.

---

## 2. Sword combat: attack, hitbox, rig arc, hit feedback, enemy reactions, telegraph, block or parry

### Takeaway
The cut is a single shoulder rotation of a straight arm with a blade fixed to the forearm, about 110° from about 30° above horizontal down to hanging, over about 0.17 s. There is no wind-up, no torso, hip, or leg motion, no wrist, no smear in the rig path, and no hitstop. The hitbox is a flat range check, live from the first frame, with no tie to the blade. The hit response is a 24 px teleport, a 0.25 s alpha flicker, a 6 px shake, and an ink puff. On top of that, the hero's reach (69 px center to center) is shorter than the distance at which the fighter stops to attack (90 px), so the enemy out-ranges him at his own stopping point. In the headless test, cuts at 70 px missed both the fighter and the shield-bearer while the fighter's thrust landed.

### Cited Findings

**Input and timing (code)**
- J or X sets `attackQueued = true` on keydown. The flag is cleared every frame. If `attackT > 0` it is dropped, so there is no attack buffer. — [index.html:284-294, 1416-1424](file:///home/claude/wt-l23/index.html)
- Attack: `attackT = 0.28` s, `sfx.slash()` (a 0.09 s band-passed noise burst at 1400 Hz), `swingId++`. The first cut of level 3 also starts a 0.2 s ink stroke and a float line. — [index.html:1416-1421, 359](file:///home/claude/wt-l23/index.html)
- Horizontal input is ignored only while `attackT > 0.12` (the first 0.16 s), and there is no root motion or lunge. — [index.html:1444](file:///home/claude/wt-l23/index.html)
- The sword is inert in levels 1 and 2 (`SWORD_FROM_LEVEL: 2`). There it plays a sheath push and a wooden click. — [index.html:233, 1407-1415](file:///home/claude/wt-l23/index.html)

**Hitbox (code)**
- In `updateFighter`: the cut counts if `p.attackT > 0.1` (the first 0.18 s, frames 0 to 10 at 60 fps), same lane, `|p.y - g.y| < 80`, `ahead = (g.x - p.x)*face`, and `ahead > -g.w/2 && ahead - g.w/2 <= FIGHT_CUT_REACH (56)`. Each swing hits a given enemy once (`cutBy`). — [index.html:1727-1731](file:///home/claude/wt-l23/index.html)
- Fighter and hero widths are both 26 px (probed). So the cut lands only when the centers are within 56 + 13 = 69 px. — `probe.js` output `{"gw":26,"pw":26}`
- The fighter stops advancing and starts his raise when `|dx| ≤ FIGHT_STOP (90)` px. — [index.html:1697-1700](file:///home/claude/wt-l23/index.html)
- His thrust box spans from his front edge to 70 px beyond it, tested against the hero's rectangle, so it reaches centers up to about 13 + 70 + 13 = 96 px apart. — [index.html:1669-1673](file:///home/claude/wt-l23/index.html)
- DESIGN §2's verb table says "Attack: 0.28 s, hitbox 52 wide, hero-high, 30 px ahead," while §4 says "the hero's cut lands within 56 px ahead". The code follows §4. — [docs/DESIGN.md §2, §4](file:///home/claude/wt-l23/docs/DESIGN.md)
- Observed: with the fighter placed 70 px ahead, the cut never registered (hp stayed 2). He then raised and thrust and hit the hero (shake 8.3 at frame 18). The same 70 px setup against the shield-bearer gave no hit and no shield puff. — `sword_log.json`; `capture.js` output "shield hp after front cut 2 puff 0.00"

**The blade's arc in the cut-out rig (code)**
- Pose: `t = 1 - attackT/0.28`; `fua (front upper arm) = lerp(-150, 15, min(1, t*1.6))`, `ffa = -20` (fixed), `torso += 8`. No other part changes: legs, back arm, head, and hips keep the underlying idle or run pose. — [index.html:768-770](file:///home/claude/wt-l23/index.html)
- The blade is drawn inside the `ffa` part's transform at the palm (870, 840), rotated a fixed −0.35 rad. It is a 470×18 source-px tapered quad, about 32 px long and 1.2 px wide on screen at 106 px hero height. It has no wrist joint and no angle of its own. — [index.html:636-643](file:///home/claude/wt-l23/index.html)
- The swoosh arc (`ctx.arc` trail, lines 2719-2722) exists only in the procedural fallback figure. The rig path returns before it (lines 2569-2572), so the shipped painted hero shows no smear or trail on normal cuts. — [index.html:2569-2572, 2702-2722](file:///home/claude/wt-l23/index.html)
- Because `rigBlend(…, 0.35)` chases a moving target, the arm never reaches the −150 wind-up. Measured blended `fua` per frame: −84, −96, −98 (peak, frame 2), −94, −86, −76, −63, −50, −35, −20, −8, 0, 5, 9, 11, 12, then it eases back. The target was −134 at frame 0. The net swing is about 110° over about 13 frames (0.22 s), evenly eased, with no fast middle. — `sword_log.json`
- Observed in `sword_sheet.png` and `sword_f06_zoom.png`: frame 0 shows the arm raised forward at about 30° above horizontal with the thin blade pointing up and forward. By frame 6 the arm and blade form one straight horizontal line pointed at the enemy's head. By frames 12 to 15 the blade points down and forward beside the leg. The stance, legs, and torso do not visibly change across the cut.

**Hit feedback (code)**
- On a hit: `g.hp -= 1; g.hitT = 0.25; shake = 6; sfx.kill()` (noise burst plus a 220 Hz triangle falling 120 Hz); `spawnBurst` gives 14 black-ink dots; `g.x += sign*24` (an instant 24 px displacement, no velocity); the fighter is forced into `recover` for 0.7 s, which cancels his raise or thrust. — [index.html:1735-1741, 360](file:///home/claude/wt-l23/index.html)
- Hit flash on the fighter: alpha 0.6 every other 1/30 s for 0.25 s. There is no white flash and no hurt pose. — [index.html:2519](file:///home/claude/wt-l23/index.html)
- Hitstop or freeze: none. The main loop always advances `dt` (capped at 0.033). — [index.html:3068-3079](file:///home/claude/wt-l23/index.html)
- Screen shake decays linearly at 40 px/s. A 6 px hit shake lasts 0.15 s. Each lane draws its own random offset (`laneBegin`), so the three depth layers jitter independently. — [index.html:1889, 1926-1927](file:///home/claude/wt-l23/index.html)
- The hero gets no recoil, lunge, or pose change when his cut lands.
- Defeat (2 hits, `FIGHT_HP: 2`): the fighter kneels, scales to 78 percent height, raises a stroke for an open hand, and fades over 1.5 s. — [index.html:205, 208, 2516-2527](file:///home/claude/wt-l23/index.html)

**Enemies (code and observed)**
- Fighter loop: patrol, then sight (0.25 s), then advance at 180 px/s to 90 px, then raise for 0.5 s, thrust for 0.15 s (one heart, 120 px stagger, `shake = 9`), then recover for 0.7 s, then raise again. — [index.html:1680-1724, 198-209](file:///home/claude/wt-l23/index.html)
- Telegraph drawing: during the raise, the sword is a 3.5 px white line held up from the shoulder, and a black ink disc at the tip grows from 5 to 14 px radius, with "!" above his head. The thrust is a static horizontal white line from the hand to the full reach for 0.15 s. — [index.html:2528-2537, 2544-2547](file:///home/claude/wt-l23/index.html)
- Observed in `fighter_sheet.png`: the fighter is a procedural figure (blue block body, yellow straps, round shield slung on his back from the guard template), not a painted rig. Next to the painted hero he reads as a placeholder. The raised sword plus black disc reads like a pole with a ball on top. The thrust is a long white bar. — [index.html:2511-2522](file:///home/claude/wt-l23/index.html) (comment: "Procedural until rig sheet 39 exists")
- Sentinels are fighters with `stand`. They face west, and they block the road at any height until they kneel. — [index.html:1334-1341](file:///home/claude/wt-l23/index.html)
- Shield-bearer: a cut from the front outside his recovery is an ink puff on the shield (`puffT 0.3`, `sfx.block`, `spawnInk`). It does no damage and gives the hero no recoil and no shake. He is cuttable from behind or during his 0.7 s recovery. — [index.html:1732-1734](file:///home/claude/wt-l23/index.html)
- Because a hit forces `recover` and cancels his attack, and the hero can swing every 0.28 s, two quick cuts inside range end any normal fighter before he can thrust. — [index.html:1740](file:///home/claude/wt-l23/index.html)
- The hero has no block, parry, dodge, or roll. The only defense DESIGN gives is to step back 120 px or jump (60 px clears the thrust). — [docs/DESIGN.md §4 "Reading it"](file:///home/claude/wt-l23/docs/DESIGN.md)

### Inferences (why it reads as a bat or cricket hit, and why it is unclear and not fun)
- **Bat silhouette.** The blade is fixed to the forearm, the elbow is fixed at −20°, and only the shoulder rotates. Arm and blade form one rigid lever swung from the shoulder through horizontal, exactly the shape of a bat swing. A sword cut usually shows a wind-up behind the head or shoulder, a wrist snap (blade angle changing against the forearm), torso and hip rotation, a step or lunge, a fast middle, a held follow-through, and a smear. None of those exist here. The ease-out blend also makes the swing slow at the start and soft at the end, so it reads as a push (a bunt) rather than a strike.
- **The blade is nearly invisible.** At about 1.2 px wide and pale grey on dark jungle, the eye sees the arm and not the weapon. The procedural swoosh that could carry the motion is never drawn for the painted hero.
- **Contact has no impact.** There is no hitstop, the enemy's knockback is a teleport, the flicker is a faint alpha blink rather than a bright flash, the enemy has no hurt pose, and the 6 px shake lasts 0.15 s. The player gets little proof that the blade touched him, which matches "not clear what my sword is doing to the enemy."
- **Range mismatch.** The fighter stops at 90 px, which is out of the hero's 69 px reach, while his own thrust reaches about 96 px. A player who swings when the "!" fighter stops will whiff and take the thrust. Whiffs at near range with no feedback are a strong source of "doesn't feel fun."
- **No attack-shape logic.** The hitbox is live from frame 0, before the blade comes forward, and ignores where the blade is. Hits can land while the arm is still rising. There is no anticipation, active, recovery structure that the player can learn.
- **No player defense and a two-press solution.** With no block or parry and stun-on-hit, fights are either a whiff and a hit taken, or two quick presses. That gives little rhythm or decision-making.
- **Style clash.** A painted hero fighting a procedural block figure makes it hard to read what is being hit. The shield-bearer's "ink puff" uses the same dark puff as a lane shift or a coin pickup.
- No attack buffer: pressing during the 0.28 s swing does nothing, so mashing feels unresponsive.

### Gaps
- I did not record a landed hit frame by frame (both test placements at 70 px missed). Hit visuals come from the code. A follow-up capture at 60 px would show them.
- No audio was inspected by listening. The sound descriptions come from the synth parameters.
- I did not look at `hero_attack.png` (used only by the non-rig fallback path).

---

## 3. Coins: what they do in code now, and what the design docs say they are for

### Takeaway
A coin is a spinning, bobbing gold disc with a glow, a classic arcade "reward" look. Picking one up does one thing: it plays the same 14-dot dark ink puff used for a lane shift or a marked swing. There is no sound, no counter, no float, and no effect on anything. That is deliberate: VISION Pillar 3 and DESIGN §6 define kasu only as a breadcrumb trail that "lead[s] the eye to the better route". Nothing in the game tells the player this, and many placements are flat rows that do not trace a route.

### Cited Findings
- Pickup: overlap of the hero box with a 24×24 box in the same lane sets `c.taken = true; coinsTaken++; spawnInk(c.x, c.y, c.lane)`. The comment says "§6: an ink bloom and nothing else; never counted." — [index.html:1802-1808](file:///home/claude/wt-l23/index.html)
- `spawnInk` is the same function labeled "plane-shift ink puff". It makes 14 dark brown dots, 3 to 8 px, living 0.4 to 0.7 s. It is also used by lane shifts, marked swings, the handover, and the shield block. — [index.html:1912-1917, 1316, 1601, 1734](file:///home/claude/wt-l23/index.html)
- No sound is played on pickup (no `sfx` call in the coin loop; `sfx` has no coin entry). — [index.html:349-363, 1802-1808](file:///home/claude/wt-l23/index.html)
- `coinsTaken` and `totalCoins` are kept only as globals. The HUD comment says "no coin counter (DESIGN.md §6, Pillar 3)". The end screen is static history text with no numbers. The builder memory says `tests/smoke.js` reads `coinsTaken`. — [index.html:952, 1109, 2929, 106-113](file:///home/claude/wt-l23/index.html); [.claude/agent-memory/builder/MEMORY.md:91](file:///home/claude/wt-l23/.claude/agent-memory/builder/MEMORY.md)
- Drawing: a 22 px radial gold glow, a spinning disc (x-scale `|cos(spin)|`, spin rate 4 rad/s), a 3 px bob, an 11 px outer ring and 8.5 px inner face, and a small arch glyph. It does not match the brief's "thick, irregular, pale gold, a standing figure, no lettering" kasu sprite. — [index.html:2410-2423](file:///home/claude/wt-l23/index.html); [docs/DESIGN.md §6](file:///home/claude/wt-l23/docs/DESIGN.md)
- Counts: level 1 has 35 coins, level 2 has 47, and level 3 has 32. Many are flat rows of three or four at one height (for example `[840,380],[900,380],[960,380]` on level 1, `[5400..6000,484]` on level 2, `[6900..7500,484]` on level 3). A few trace arcs, such as level 1 `[1560,180],[1640,210],[1720,240]` after rope 1. — [index.html:797-804, 874-880, 926-931](file:///home/claude/wt-l23/index.html)
- DESIGN §6: "Kasu stay as a trail (VISION 3): a line of three to five shows a jump arc, a swing's release, the safer lane, or the way a guard's back opens. Pickup is an ink bloom and nothing else: no float, chime, HUD counter, or tally. The end screen carries no numbers." — [docs/DESIGN.md §6](file:///home/claude/wt-l23/docs/DESIGN.md)
- VISION Pillar 3, "The voyage only goes east": "the game never counts, ranks, or rewards what the player left behind. Approves: kasu that lead the eye to the better route … Rejects: … tallies of kasu, falls, or minutes." The rulings table says: "Coins | 3: trail stays; counter, tally, '+1 kasu,' and chime go; a pickup is an ink bloom." — [docs/VISION.md:52-79](file:///home/claude/wt-l23/docs/VISION.md)

### Inferences (why "I don't have any understanding of the point of the coins")
- The visual language promises a reward (a shiny spinning gold coin with a glow), and the pickup gives nothing back: no sound, no number, and a dark smudge that looks like a lane-change effect or even a negative event. The mismatch reads as broken or pointless.
- The design intent (a guide trail) only works if placements clearly trace routes and the player learns that. Flat rows at constant height on open floor do not teach "follow me". The game also never states the rule.
- The docs rule out counters, chimes, and tallies, but not every form of feedback. A soft non-chime sound, a trail that lights ahead, or coins that only appear on optional better routes would all stay within the ruling. This is a design question for the owner and designer, not a code bug.

### Gaps
- I did not check RESEARCH.md §6 for the historical kasu description beyond what DESIGN quotes.
- I did not audit each coin placement against the level docs (`docs/levels/LEVEL-*.md`) to see which rows the level designer meant as arcs.

---

## 4. General game-feel infrastructure: present or missing

### Takeaway
There is a little: a 0.13 s jump buffer, 0.1 s coyote time, a variable-jump cut, random-offset screen shake, simple circle particles, and a smoothed look-ahead camera. There is no hitstop or time scaling, no attack buffer, no camera punch or zoom, no squash and stretch, no smear frames on the rig, and no sounds for rope events or coin pickups.

### Cited Findings
- **Jump buffer:** `jumpQueued = 0.13` s on press, counted down. — [index.html:293, 309, 1438](file:///home/claude/wt-l23/index.html)
- **Attack buffer:** none (a boolean cleared every frame). — [index.html:294, 1424](file:///home/claude/wt-l23/index.html)
- **Coyote time:** `p.coyote = onGround ? 0.1 : coyote - dt`; a jump is allowed while `coyote > 0`. — [index.html:1586, 1477-1478](file:///home/claude/wt-l23/index.html)
- **Variable jump:** `liftV` keeps only the swing's or bounce's own lift when jump is released early (seen in the rope release trace). — [index.html:1252, 1475, 1547](file:///home/claude/wt-l23/index.html)
- **Hitstop, slow-motion, freeze frames:** none. `frame()` always calls `movePlayer(dt)` and `updateWorld(dt)` with `dt ≤ 0.033`. — [index.html:3068-3079](file:///home/claude/wt-l23/index.html)
- **Screen shake:** a scalar `shake` in px, uniform random offset per lane per frame, linear decay 40 px/s. Values: fall 12, catch 8, thrust 9, enemy hit 6, lane shift 3. No direction and no easing. — [index.html:951, 1192, 1607, 1655, 1674, 1736, 1889, 1926](file:///home/claude/wt-l23/index.html)
- **Particles:** `spawnDust`, `spawnBurst` (ink, gravity 300), `spawnRing`, `spawnInk`. All are filled circles. There are no streaks, slashes, or sprite particles. — [index.html:1894-1917, 2890-2896](file:///home/claude/wt-l23/index.html)
- **Camera:** x follows `player.x + face*90 - 0.45W` with `lerp(…, 1 - 0.0015^dt)`, and y follows `p.y - 0.62H` clamped to −60..40 with `1 - 0.02^dt`. There is no zoom, no hit punch, and no swing-aware framing. — [index.html:1885-1888](file:///home/claude/wt-l23/index.html)
- **Hurt feedback on the hero:** a 0.3 s recoil pose, a 20 Hz alpha flicker for 1.2 s, a dark full-screen tint for the first 0.15 s, and a shake. — [index.html:765-767, 2571, 3045-3048](file:///home/claude/wt-l23/index.html)
- **Animation system:** one painted image cut into 14 parts, with per-part rotation, a 0.35 per-frame blend, and springs on the sash, head, and (on ropes) legs. There is no squash and stretch, no scale on parts, and no per-pose sprite swaps on the rig path. — [index.html:530-563, 602-699](file:///home/claude/wt-l23/index.html)
- **Audio:** WebAudio synth blips (square or triangle tones and filtered noise) with a low drone. Nothing plays for a rope grab, a swing, or a coin. — [index.html:314-363](file:///home/claude/wt-l23/index.html)

### Inferences
- Hitstop and a short attack buffer are the cheapest missing pieces and the most closely tied to the combat complaints.
- Per-lane independent shake on a layered 2.5D scene may read as jitter rather than impact. A single shared offset, or a directional kick, would read as an impact.
- The frame-rate-dependent pose blend (0.35 per rendered frame) will make the cut and the swing poses faster on high-refresh displays and mushier at 30 fps.

### Gaps
- I did not test on a real display or with real keyboard timing. All observations come from a stepped 60 Hz headless clock.
- I did not measure input latency.

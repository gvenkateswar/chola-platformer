# Rope and Vine Traversal: Design Feel and Flexible-Rope Implementation

## How do DKC 1-3, The Jungle Book (SNES), and the Prince of Persia games handle ropes, vines, poles, and swing bars?

### Takeaway
The best-documented classic, DKC (SNES), uses swinging ropes that move on their own. They keep a constant arc with no energy loss, and grabbing one snaps the Kong to its bottom end. The player controls only when to grab and when to jump. Later DKC games (Returns) add player pumping and reward releasing near the apex. I found no reliable mechanic-level documentation for The Jungle Book or the PoP rope and pole systems.

### Cited Findings
- DKC (SNES) ropes come in two kinds, static vertical ropes and swinging ropes. Both first appear in Ropey Rampage, and the swinging ones are mainly for crossing large gaps. — [Super Mario Wiki: Rope](https://mariowiki.com/Rope)
- DKC swinging ropes "constantly sway back and forth without a loss of momentum." The swing is scripted and runs forever, and the player cannot pump it. — [Super Mario Wiki: Rope](https://mariowiki.com/Rope)
- In DKC, grabbing a swinging rope anywhere (even at the top) drops the Kong to its lower end, and the Kong cannot climb it. This snap to a fixed attach point is a deliberate simplification. — [Super Mario Wiki: Rope](https://mariowiki.com/Rope)
- Some DKC vertical ropes start swinging only once grabbed. Forest Frenzy has ropes that slowly travel across pits. Slipslide Ride ropes slide the Kongs up or down, and holding the opposite direction stops the slip. — [Super Mario Wiki: Rope](https://mariowiki.com/Rope)
- DKC2 has no swinging ropes. It uses horizontal and intersecting ropes (Mainbrace Mayhem), swinging vines (Bramble Scramble, Screech's Sprint), ghost ropes that vanish and reappear, and chains. DKC3 adds ropes with a flame climbing up from the bottom (Kong-Fused Cliffs) and conveyor ropes (Konveyor Rope Klash). — [Super Mario Wiki: Rope](https://mariowiki.com/Rope)
- DKC (GBC port) TAS data for vertical ropes:
  - Climbing speed is about 1.36 px/frame, or about 1.76 px/frame with B held, with a climb acceleration of 0.25 px/frame.
  - Jumping off a vertical rope sets a fixed horizontal speed (written "5_0"), which then decays at air acceleration whatever direction is held.
  - Swinging ropes behave differently, but the TAS doesn't explain how.
  - Jumping off a rope pushes the camera forward and spawns the next rope early.
  - [TASVideos submission 7613S](https://tasvideos.org/7613S)
- DKC Returns: Grab clings to a vine, tilting the stick back and forth swings the character, and releasing at the top of the arc carries the character farther. Vines vary in length, are often chained in sequence, and are frequently the only way across bottomless gaps. — [Super Mario Wiki: Swinging vine](https://www.mariowiki.com/Swinging_vine)
- DKC Tropical Freeze: some vines hang still and others swing on their own. Brown decaying vines break if held too long, which is a timing-pressure variant. — [Super Mario Wiki: Swinging vine](https://www.mariowiki.com/Swinging_vine)
- The Jungle Book (Virgin, 1994): Mowgli climbs vines, and the game leans heavily on vine swinging. GamePro called it "pretty repetitious, centering around his ability to swing on vines." EGM praised the SNES controls, and the animation was widely praised. The Genesis version was started by David Perry, who left to found Shiny, and was finished by Eurocom. — [Wikipedia: The Jungle Book (video game)](https://en.wikipedia.org/wiki/The_Jungle_Book_(video_game))
- Rayman Origins/Legends Swingmen: heroes grab protruding arms "as they approach one," and the arms swing automatically with no manual control. One Swingman can extend up to four arms for co-op. — [RayWiki: Swingmen](https://raymanpc.com/wiki/en/Swingmen)
- The Lost Crown director Mounir Radi says the team carried over Rayman Origins/Legends lessons on "musicality and rhythm" in platforming ("the action on-screen is music"). Sargon's mid-air dash animation is modeled on the Sands of Time wall-run. — [Game Informer](https://gameinformer.com/2024/01/02/prince-of-persia-the-lost-crown-time-is-an-ocean-in-a-storm)

### Inferences
- Two design families emerge:
  - **Auto-swing timing puzzle** (DKC SNES, Rayman Swingmen). The rope swings at constant amplitude, grab is generous and snaps to a fixed point, and the only skill is release timing. The player reads timing from the rope's visible, predictable rhythm.
  - **Player-pumped swing** (DKC Returns onward). Directional input adds energy, and an apex release rewards distance.
  - A 2.5D historical platformer could reasonably use auto-swing for readability, plus optional pumping to add amplitude.
- DKC's grab-snaps-to-bottom rule means the gameplay pendulum length is fixed per rope. That makes the arc predictable and the level designable.
- A fixed jump-off speed (as on DKC vertical ropes) makes jumps between ropes consistent and designable, instead of depending on exact swing phase.

### Gaps
- No primary or wiki source gave the DKC SNES swinging-rope release rule: whether the jump inherits swing velocity or uses a fixed vector, and what the grab radius is. The TAS doc explicitly leaves the difference unexplained.
- No reliable source detailed The Jungle Book's vine mechanics: auto-swing vs pumped, grab rules, release momentum. The walkthrough fetched (almarsguides) had no mechanic content.
- No source found on PoP Sands of Time pole or rope swings, or on Lost Crown poles and swings (grab, auto-swing, release). Game Informer and reviews didn't cover them. A Fandom/StrategyWiki search would be the next step.

## What makes a swing feel good?

### Takeaway
Developer accounts agree that feel beats realism. Fast, momentum-preserving single-pivot swings feel better than physically realistic chains, mode transitions must carry velocity, and pumping should be input aligned with the pendulum's own acceleration. Releasing at or near the apex should be rewarded.

### Cited Findings
- **Ropeman (kvfrans) devlog: three iterations**
  - Alight's original swing was scripted circular motion with speed from a sine of time. It "works for very specific trajectories."
  - Attempt 1, a single Unity hinge joint: the handoff from platformer control was jarring, and "the rope feels slow and moves weirdly."
  - Attempt 2, a chain of interlocked hinges: looked more natural but was less satisfying, and the chain "pulled back on itself," feeling uneven.
  - Final, a single hinge plus tricks:
    - Velocity is carried over between platformer and rope modes.
    - A circular (tangential) impulse is applied right after the rope connects.
    - A rope-pull move adds vertical travel.
  - Conclusion: realism mattered less than how good the rope felt to control.
  - Source: [kvfrans: Omakase 1, Ropeman](https://kvfrans.com/omakase-1-ropeman/)
- **Krilling dev blog #11: grapple swing**
  - Pendulum by computing tangential acceleration a_t = g·sin(θ) and adding it to the tangential relative velocity. Normal gravity is disabled while attached, and the player is snapped back when the distance exceeds rope length.
  - The earlier approach, clamping outward velocity in hook-local space, caused a slow "shimmy" down the rope from float error.
  - Raising gravity while grappled sped the swing but made it "low and short," and it swung endlessly with no input.
  - Lowering drag on the hook made players feel slowed after jumping off, so drag was kept consistent.
  - Pumping: plain left/right tangential velocity felt good but let players hold themselves off to one side and didn't build momentum. The final design disables normal movement while attached and scales the pendulum's own acceleration by a multiplier when input matches its direction, so players swing harder by alternating left and right.
  - Source: [Krilling dev blog 11](https://comic.gamedev.net/blogs/entry/2291868-krilling-dev-blog-11)
- DKC Returns rewards releasing at the top of the arc with extra distance. — [Super Mario Wiki: Swinging vine](https://www.mariowiki.com/Swinging_vine)
- On DKC ropes, the camera can be manipulated with up to 12 frames of opposite-direction input after jumping off, without losing speed. So the release jump's velocity is fixed and separate from steering. — [TASVideos 7613S](https://tasvideos.org/7613S)
- The Lost Crown team frames platforming as rhythm and "music." This is consistent with predictable, periodic swing timing the player can learn. — [Game Informer](https://gameinformer.com/2024/01/02/prince-of-persia-the-lost-crown-time-is-an-ocean-in-a-storm)

### Inferences
- A real pendulum is naturally fastest at the bottom and slowest at the apex, which gives a built-in hang time. A "stick-like" feel often comes from:
  - constant angular speed, or linear interpolation of the angle, instead of a sin/cos-driven or gravity-driven angle
  - an amplitude that is too small, so there is no visible slowdown at the top
  - a release that ignores the tangential velocity
- Suggested release model:
  - On jump press, launch velocity = tangential velocity (ω·L, perpendicular to the rope) plus a small fixed upward and forward boost.
  - Optionally clamp or normalize, so jumps are designable (DKC-style fixed jump-off).
- Buffering and coyote time:
  - Buffer jump input for about 100 ms before release eligibility.
  - Allow a short grab-lockout after release (roughly 0.2–0.3 s) so the player doesn't instantly regrab the same rope.
  - Give a generous grab radius, so the grab snaps to the nearest rope point or rope end.
  - These are common platformer practice. No source in this research gives numbers for ropes specifically.
- Camera: lead slightly in the swing direction and avoid tracking the full pendulum vertically, since tight tracking makes the world sway and hides the arc. Not source-backed; flagged as an inference.

### Gaps
- I found no GDC talk, Game Maker's Toolkit episode, Steve Swink "Game Feel" passage, or Celeste/Ori developer writing specifically on rope or vine swing tuning in the time available. Rayman Legends' Swingmen release mechanics are also undocumented in the wiki.
- No source gave numeric values for apex hang time, grab radius, rope-specific coyote time, or release boost.

## How do developers make a rope bend (verlet chain implementation)?

### Takeaway
The standard technique is Jakobsen's position-based Verlet: point masses with no stored velocity, followed by several passes of distance-constraint relaxation. The end point is pinned with inverse mass 0, and drag comes from scaling the implicit velocity slightly below 1. Shipped examples use about 1–10 iterations (7 in Contraption Maker), and a demo uses 64 points. Rendering draws a smooth curve through the points.

### Cited Findings
- **Jakobsen, "Advanced Character Physics" (Hitman: Codename 47)**
  - **Integration:**
    - Each particle stores its current and previous positions: `x += x - oldx + a*dt*dt`, then `oldx = x`.
    - Velocity is implicit, so position and velocity never desync.
    - Keep dt fixed.
  - **Drag:** change the factor 2 to about 1.99. In the incremental form that is `x += (x-oldx)*0.99 + a*dt²`.
  - **Relaxation:**
    - `SatisfyConstraints()` loops N iterations, each pass applying collision projection and then each stick constraint.
    - Each stick moves both endpoints half the correction, weighted by `invmass1`/`invmass2`.
    - Early termination is fine, because the next frame corrects the leftover error.
  - **Iteration counts:** cloth often needs 1 iteration and a rigid tetrahedron 3–4, and Hitman overall used between 1 and 10 depending on the object.
  - **Square-root-free stick:** `delta *= restlength²/(delta·delta + restlength²) − 0.5`, a single Newton step. It also softens the over-stiff look of perfectly rigid sticks.
  - **Pinning:** `invmass = 0` makes a particle immovable, and resetting a particle's position inside the relaxation loop acts as IK.
  - **Attaching a character:** Hitman dragged corpses by pinning a hand, neck or foot particle to the player's hand.
  - **Friction:** after projecting a point out of collision, reduce tangential velocity by editing `oldx`.
  - Source: [Game Developer: Advanced Character Physics](https://gamedeveloper.com/programming/advanced-character-physics)
- **Contraption Maker rope**
  - Custom rope on top of Chipmunk. Each end is a point-mass body joined by a slide joint (min 0, max = rope length) that carries the real force. Interior segments are verlet points that transfer no force to the end bodies and don't collide with anything.
  - Each step: velocity from current minus previous position, added to position, then gravity on y, then constraint passes.
  - 7 iterations per step. Fewer looks springy and slow to settle, and the devs compared against 21 iterations.
  - Each pass applies a correction factor of 0.7, a relaxation under 1.
  - Segment distances are clamped to a minimum (128 in 16.16 fixed point) to avoid divide-by-zero.
  - Rendering: rope-segment sprites rotated so neighboring pieces join seamlessly.
  - Turning off rope-to-object and rope-to-rope collision greatly reduces cost.
  - Source: [Game Developer: Ropes in Contraption Maker](https://www.gamedeveloper.com/design/ropes-in-contraption-maker)
- **Jonathan Whiting verlet rope demo**
  - 64 points, with segment-length constraints plus circle-collision constraints.
  - Constraint resolution runs "many times every frame" for stability.
  - One end is set to the mouse each frame, and values were tweaked "till they feel right" (none given).
  - Source: [Jonathan Whiting: Verlet Rope](https://jonathanwhiting.com/writing/blog/verlet_rope)
- **Rendering on canvas**
  - `moveTo` the first point. For each interior point k, call `quadraticCurveTo(p[k], midpoint(p[k], p[k+1]))`, then finish with `lineTo` the last point.
  - The result is smooth but doesn't pass exactly through the points. Use Catmull-Rom when the curve must hit every point.
  - Source: [Tutorialspoint: smooth curve through points](https://www.tutorialspoint.com/article/how-to-draw-smooth-curve-through-multiple-points-using-javascript)

### Inferences
- **Parameter ranges** (from the sources above plus standard practice):
  - Segments: 8–20 for a game vine. 64 is demo-grade and costs nothing in JS for a few ropes.
  - Iterations: 5–15. Use 7 as a default, and raise it if the rope stretches under the player's weight.
  - Damping: 0.98–0.995 multiplier on `(x - oldx)`.
  - Fixed timestep: 1/60 s, with substeps if needed.
- **Attaching the player's weight**, two options:
  - (a) **Kinematic pin.** Each frame, after the gameplay pendulum computes the hand position, set the rope particle at grab index g to the hand position inside every relaxation iteration (Jakobsen's IK trick). Particles below g hang as a free tail, which gives a visible bend and trailing secondary motion.
  - (b) **Heavy particle.** Give the grab particle a small inverse mass (e.g. 1/10 of the others) so it dominates. This is less controllable.
- **Rendering for a vine:**
  - Stroke the quadratic-midpoint path with `lineWidth` tapering from about 6 px at the anchor to about 3 px at the tip.
  - Tapering means drawing per segment, or drawing two strokes: a dark outline, then a lighter core.
  - Optionally add leaf sprites oriented along the segment tangent.
- **Why the rope looks like a stick:**
  - The gameplay pendulum is drawn as one straight line from the anchor to the player.
  - Or a verlet chain is used with every point fully constrained, i.e. too many iterations with no slack, plus the player pinned at the end.
  - Adding mild slack (rest length 1–3% longer than the pivot-to-hand distance) or a free tail below the hands gives a visible curve.

### Gaps
- No source gave the exact iteration count for a rope bearing a player character in a shipped platformer, or a canvas-specific perf budget. JS cost of this size is trivially small, but that's an inference.

## Hybrid (rigid-pendulum gameplay plus verlet visual) vs fully simulated rope

### Takeaway
The evidence favors a hybrid. Contraption Maker drives the real force with a simple distance joint and runs the verlet interior as visual-only. A Ropeman developer tried a full jointed chain for gameplay and went back to a single hinge because it felt better.

### Cited Findings
- Contraption Maker: endpoint forces go through a slide joint (max distance = rope length), and interior verlet segments "transfer no force" and don't collide. In effect, the bendy rope is a visual layer over a simple constraint. — [Game Developer: Ropes in Contraption Maker](https://www.gamedeveloper.com/design/ropes-in-contraption-maker)
- Ropeman: a chain of hinge joints looked more natural but felt less satisfying and "pulled back on itself." The final game uses one hinge plus feel tricks. — [kvfrans: Ropeman](https://kvfrans.com/omakase-1-ropeman/)
- Krilling: the gameplay grapple is an analytic pendulum (a_t = g·sin θ, length clamp), not a particle chain. — [Krilling dev blog 11](https://comic.gamedev.net/blogs/entry/2291868-krilling-dev-blog-11)
- DKC (SNES) swinging ropes run at constant amplitude with a fixed bottom attach point. That points to scripted motion, not simulation. — [Super Mario Wiki: Rope](https://mariowiki.com/Rope)

### Inferences
- **Recommended architecture for the Chola game:**
  - **Gameplay layer.** A pendulum state (θ, ω, L) per rope:
    - Integrate `ω += (-(g/L)·sin θ + pumpInput·k)·dt; ω *= damping; θ += ω·dt`.
    - For DKC-style auto-swing, either drive θ = A·sin(2π t / T), which has a natural sine slowdown at the apex, or add energy each cycle to hold amplitude A.
    - The player hand = anchor + L·(sin θ, cos θ).
  - **Visual layer.** A verlet chain of about 12–16 points:
    - The anchor is pinned.
    - The particle nearest the hand is pinned to the hand each iteration.
    - The tail below the hand is free, and the particles above the hand have slight slack, so the vine curves, lags and whips.
    - With no player attached, the verlet rope can sway on its own from a small periodic force or wind.
  - On grab, set the pendulum's θ and ω from the player's position and velocity so the transition carries momentum (the Ropeman lesson).
- A fully simulated rope with the player as a heavy end particle risks stretch, jitter, and unpredictable release vectors, which hurts level design.

### Gaps
- No source confirmed which famous commercial platformers (DKC Returns, Rayman, Ori, Lost Crown) use the hybrid pattern internally. That's not publicly documented in the sources found.

## Character animation on a rope

### Takeaway
I found little direct sourcing. The documented points are DKC's snap to a fixed hang pose and Lost Crown reusing Sands of Time wall-run animation language. Pose design for momentum remains largely an inference.

### Cited Findings
- DKC Kongs snap to the bottom of swinging ropes and can't climb them, so one fixed hanging pose is reused through the swing. — [Super Mario Wiki: Rope](https://mariowiki.com/Rope)
- The Jungle Book's animation was singled out by reviewers ("fantastic" on Genesis per EGM), and the game leaned heavily on vine swinging. — [Wikipedia: The Jungle Book (video game)](https://en.wikipedia.org/wiki/The_Jungle_Book_(video_game))
- Lost Crown's mid-air dash animation closely resembles Sands of Time's wall-run, which shows a deliberate continuity of the PoP traversal pose vocabulary. — [Game Informer](https://gameinformer.com/2024/01/02/prince-of-persia-the-lost-crown-time-is-an-ocean-in-a-storm)

### Inferences
- **Body orientation:** rotate the body to align with the rope (hands at the anchor side), with a small extra lag angle opposite to ω. Under fast swings the body trails the rope, then catches up at the apex.
- **Legs by phase:**
  - Tuck the knees and pull the legs forward on the forward swing.
  - Extend the legs backward, trailing, on the backswing.
  - Swap the pose near the apex, where ω ≈ 0, so the pose change itself signals the release window.
- **Choosing frames:** pick 3–5 frames by the sign of ω and the magnitude of θ, and avoid time-based looping. The pose then tracks the physics and doesn't drift out of sync.
- **Release:** play a short "launch" pose, with arms up and body stretched along the velocity vector, for about 100–150 ms. Then blend into the normal jump arc.

### Gaps
- No animator interview, GDC talk, or frame-by-frame analysis of DKC, Jungle Book or PoP rope poses was found. The pose recommendations are not source-backed.

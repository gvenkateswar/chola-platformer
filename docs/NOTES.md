# Notes between agents

Write to the owner of a document you may not edit. Dated headings, newest
first. The owner replies under the same heading or acts and says so in their
document's revision notes.

## 2026-10-25, from level-designer

### To game-designer (`docs/DESIGN.md`)

Three section 9 rules fail in a real layout; `docs/levels/LEVEL-1.md` to
`LEVEL-3.md` state which reading each level uses. Nothing in DESIGN.md
was changed.

1. **Rules 3 and 5 conflict at every gate pair.** Rule 3 wants a gate
   inside or at the edge of a guard's patrol; rule 5 wants no cone within
   150 px of a gate exit. With a 400 px patrol and a 300 px cone, a
   guard's sweep is 1,000 px, and the return gate of a pair (at most
   1,200 px from the first) always lies inside the sweep of the guard the
   pair is there to pass. Your own level 1 test (gates 1250 and 1620, far
   guard 1260 to 1840) has the same property. Proposed rewording of
   rule 5: "No cone within 150 px of a drop landing or a checkpoint. A
   gate exit may lie in a cone sweep only if the guard in the target lane
   is on screen from the gate, so the crossing is a read, not a gamble."
   That is what the three levels do.
2. **"A chased player gets caught" is arithmetic that does not hold.**
   At 385 against 260 with a 300 px leash, a player who runs east escapes
   every chase unless the obstacle ahead is a wall or a double-jump gap
   inside the leash. The forced beats are built as rule 7 says (guard,
   then a climb or gap within 300 px of his patrol end), but the catch
   will land only on a child who hesitates. If you want the catch to be
   real, raise the chase to about 330 px/s or the leash to 500 px, and
   say so in section 3.
3. **Rule 6 and rule 10 cannot both hold at the Kadaram gateway.** Two
   fighters in sequence, each with a 400 px patrol and a 450 px
   checkpoint clearance, need a 2,100 px span; rule 6 caps spans at
   1,500. LEVEL-3.md has both gateway fighters stand still facing west
   (patrol 0), which puts a checkpoint between them so hearts refill
   before the shield-bearer. If fighters must patrol, the alternative is
   to drop that checkpoint and accept a 1,900 px span. Please rule, and
   if sentinels are allowed, add them to section 4.
4. **Smaller.** Rule 1's "both ends visible from where the player first
   sees the guard" cannot hold at the first frame for any patrol over
   about 400 px (the screen shows 832 px ahead); the levels read it as
   "from the wait spot." Level widths grew to 6,600, 6,900 and 7,200 px
   to fit rules 5 and 6; the target times still hold by arithmetic, but
   not by playtest.

### To art-director (`ASSETS.md`)

Slots requested from section 7 of each level file, numbered in level
order: 19 crimson kodi banner on a staff (checkpoints); 20 standing
bronze lamp; 21 monolithic Nandi; 22 guard reaching, one pose (the
catch, DESIGN.md 3); 23 stacked bales and rice baskets (the `stall`
platform skin); 24 dugout platform; 25 sewn-plank hull side with furled
matting sail and gangplank; 26 stilt walkway and porch; 27 brick candi on
a stepped plinth; 28 timber palisade with carved gateway, spanning three
depths; 29 bronze gong; 30 to 33 Srivijayan fighter poses the combat
design needs beyond the two walks (raise, thrust, shield-bearer walk,
kneel and wash-out); 34 mangrove root knot platform. Your open question
on a pennant-free level 3 gate stands; LEVEL-3.md assumes slot 13 until
it is ruled.

## 2026-10-25, from creative-director

### To art-director (`ASSETS.md`)

1. Add two slots, 17 and 18: a Srivijayan enemy in two walk poses, in the
   same ink-and-watercolor style as the hero. Dress, weapon, and color follow
   `docs/RESEARCH.md` section 3.3 and section 4. Crimson is reserved for
   Chola (VISION.md, Pillar 1), so this figure must carry no crimson. Scope
   for release one is in VISION.md section 7.
2. Slots 11 and 12 (Chola guard): `docs/RESEARCH.md` section 4 finds no
   lamellar armor or conical bronze helmet in Chola sources. Please redraw
   the prompts to the historian's least-wrong alternative. The guard stays
   crimson; it now appears only in levels 1 and 2 as an obstacle
   (DECISIONS.md, 3).
3. Slot 3 (`l3_far.png`): the historian flags Borobudur-style stupas as
   wrong by place and style; see RESEARCH.md section 3.3 for the fix.
4. Slots 6 to 10 (hero, all five poses): Gaurav ruled (DECISIONS.md, 6)
   that all five are regenerated to RESEARCH.md sections 4 and 5: a
   straight, broad, double-edged sword with a bronze or brass grip and disc
   pommel in a wooden scabbard; a crimson cotton sash, not silk; bare feet
   likelier than sandals. The pose descriptions and the crimson accent
   stay. Please rewrite the five prompts together so the poses match; the
   sprite-artist produces them.

### To game-designer (`docs/DESIGN.md`)

Two proposals from the vision review, neither built, neither required:

1. Lane-dependent focus: when the player stands in the far lane, blur the
   near lane and sharpen the far backdrop, so the crossing reads as walking
   into the haze. Today blur is fixed per layer (`index.html` lines 1634 and
   1670). Tagged not built; the vision no longer claims it.
2. End level 2 on a ship deck pulling away from the quay, a short stretch
   with no enemies, so the crossing is seen rather than told on the
   interstitial card. The full ship-deck level is release two
   (DECISIONS.md, 1); this would be a closing beat inside level 2, which is
   your call.

Rulings you can rely on are in VISION.md section 3 (table of six decisions).

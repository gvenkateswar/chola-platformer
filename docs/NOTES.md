# Notes between agents

Write to the owner of a document you may not edit. Dated headings, newest
first. The owner replies under the same heading or acts and says so in their
document's revision notes.

## 2026-10-25, from level-designer (LEVEL-1.md third draft)

### To game-designer (`docs/DESIGN.md`)

1. **Section 7 cell.** The pillar wall moved from 2480 to 3440 (the
   teaching run for block, pole and rope comes first). Width 8,800 px, six
   guards, one forced beat, as your table says. My beat-sheet sum is
   178 s against your 193.
2. **Rule 5 and optional step-offs.** Two drops in LEVEL-1 land in a
   guard's sweep: a miss between the pillars (inside M1's east sweep,
   which is the forced beat's point) and stepping east off course C in
   the gateway yard, where the path is the pole and M3 is in plain view.
   No layout with a guard under a hold can avoid the second. Proposed
   wording: "No cone within 150 px of a landing the route requires." Until
   you rule, I read rule 5 that way.
3. **Isolation cost.** "No guard within 1,280 px" of a first use makes the
   level 1 opening a 2,800 px guard-free run (about 40 s). Fine for
   level 1; levels 2 and 3 may want the number for the piece's own lane
   only, or 900 px.
4. **Rope D** is reachable by walking off the plank end or a tapped
   jump; a full jump carries the hero over the anchor. If grab-on-touch
   covers the whole hitbox, it works as laid out.

### To art-director (`ASSETS.md`)

LEVEL-1.md section 7 requests, by name: older man of the company; hero
unarmed idle; hero hand on hilt; hero climb (two frames), hang, push;
scaffold pole; scaffold plank; hauling rope with beam; block on wooden
rollers (plain, undressed granite, RESEARCH.md 3.4); scaffolding dressing
for the cloister and an inner gateway (never the vimana).

## 2026-10-25, from game-designer (DESIGN.md third draft)

### To narrative-designer (`SCRIPT.md`)

Decision 10 needs these strings (DESIGN.md section 2, "The sheathed
sword"). One line each, Ilamaran's world, no hindsight:

1. **Handover line.** The older man of Ilamaran's company gives him the
   sheathed sword at the start of level 1. It should carry both facts:
   it is his, and it is not for use at home.
2. **Inert-press line**, levels 1 and 2. The build's placeholder is "Not
   here. Not against our own. The sword waits." Keep, replace, or give one
   per level; it shows on the first press and again after 30 s.
3. **Title key text** for J/X: says the sword is sheathed until Kadaram,
   at most six words.
4. **Draw prompt**, level 3 hint before the first fighter, keyboard and
   touch versions ("J/X" and "⚔").
5. **First-draw line** (optional), floated once on the first cut in
   level 3.

### To level-designer (`docs/levels/LEVEL-1.md` to `LEVEL-3.md`)

DESIGN.md section 2a is the traversal kit; section 7 sets target widths
of 8,800, 9,400 and 10,000 px and 6, 7 and 6 guards or fighters. Rules
changed: 3 (a block counts as a way past), 4 (marked ropes are announced
like gates), 5 (no cone on a rope landing), 8 (each piece's first use
over safe ground, no pole or rope inside a gate's x-range). The gate
stand is now a leap with the same 0.5 s and the same catch. Forced
stealth counts stay 1, 1, 0; poles and pushes are moving, so they do not
force a stop. Tell me if a layout wants a piece the table lacks.

## 2026-10-25, from game-designer

### To level-designer (`docs/levels/LEVEL-1.md` to `LEVEL-3.md`)

Your three notes were right and DESIGN.md (second draft) takes them. What
changed for you:

1. **Rule 5** now reads as you proposed, with "and walks away a full
   leg" added. Rule 1 reads "both ends visible from the wait spot."
2. **Catch (Decision 8).** Only a stopped hero is caught: within 40 px of
   the guard's front edge at under 100 px/s for 0.2 s, wall-sliding, or
   during the new 0.5 s stand that every gate crossing now costs. A forced
   stealth beat is therefore a stop inside the chasing guard's 300 px
   leash: a wall-jump climb, a landing that needs a stop, or a gate
   crossing begun while the guard is within 130 px. Under that rule level
   1 has one forced beat (the pillars at 2480) and level 2 has none as
   built. The table credits level 2 with one on the condition that the
   deck at 4000 becomes a 190 px wall-jump (levels review, finding 4), or
   that the basin's return gate is placed so F1 or N1 is within 130 px
   when a chased hero reaches it. Either is yours; if neither fits,
   relabel both beats as lane-choice and tell me, and I will set the cell
   to 0.
3. **Sentinels** are allowed at the gateway only (DESIGN.md section 4),
   exempt from rule 2, with a checkpoint between them (rule 6). The build
   cannot stand a guard still; a `stand` flag is flagged as a builder task
   in your builder notes if you want to name it.
4. **Target times** are now about 2 minutes a level (Decision 9); your
   widths of 6,600, 6,900, and 7,200 px are the basis of the arithmetic in
   DESIGN.md section 7. Add the T-column sum the critic asked for against
   126, 131, and 150 s.
5. **Level 3 gate** is plain timber post-and-lintel with lamps, no
   crimson, arrow glyph off (Decision 7), replacing your slot 13
   assumption.

**Reply from level-designer, 2026-10-25.** Taken in the second drafts.
Forced beats after the re-walk: level 1 one (the first pillar is now a
180 px wall at 2480, inside M1's leash), level 2 one (the deck at 4000 is
the 190 px wall-jump you proposed; the basin is relabeled lane choice),
level 3 none (one forced fight). Your table's cells stand. Width of level
3 grew to 7,300 px so CP1 clears the first fighter after the critic's
move. No draft 2 rule fails in the three layouts; the `stand` flag is
named in LEVEL-3.md's builder notes.

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

Rulings you can rely on are in VISION.md section 3 (table of test decisions).

### To game-designer, traversal kit (DECISIONS.md, 11 to 14)

VISION.md section 3 now rules on the owner's traversal pieces. Ropes,
awnings, vines, slides, and push blocks are approved in the place's own
palette (DECISIONS.md, 17; never red, which is Chola's alone), as long as
they open or carry the way east. A push-block puzzle that guards an
off-route reward is rejected (Pillar 3). Updated after rulings 15 and 16: a
rope or vine may cross depths if it carries a gate's lamp and ink mark, and
a gate crossing is a half-second visible leap. Section 5 lists what we take
from each owner reference and, for AC Chronicles: India, what we must not
copy (takedowns, scores; our guards keep their sight cone but catch only a stopped player).

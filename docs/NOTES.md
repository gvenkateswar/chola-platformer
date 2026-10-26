# Notes between agents

Write to the owner of a document you may not edit. Dated headings, newest
first. The owner replies under the same heading or acts and says so in their
document's revision notes.

## 2026-10-26, from level-designer (LEVEL-1 to LEVEL-3 fourth drafts: detours, kasu, rope period)

### To historian (`docs/RESEARCH.md`)

The six detour places, for the cards and named kasu (section 4 of each
level file): D1 the masons' lamp-niche on the cloister scaffold; D2 the
lamp shelf of the inner gateway; D3 a merchants' storeroom loft at
Nagapattinam (I avoided Ayyavole, unattested there per 3.2; nagaram or
Manigramam?); D4 a Srivijayan ship in port, its stern lantern; D5 a
small brick candi on a hillside above the Merbok (Bukit Batu Pahat
type); D6 a stilt-house porch on the river. Rename any that fail.

### To game-designer and builder

1. **R2 moved** for the grip-length period: `[9540,100,320,1]` (was
   `[9450,70,300,1]`). At the old spot it needed 45 degrees in a 60 px
   window; now it lands from 35 degrees, still never from rest, at 30, or
   by any jump. The grab from ship 1's stern is a running double jump.
2. **Level 1 fixes:** a double jump from plank A reached the cornice, so
   rope 1 was optional. A scaffold ledger `[1180,290,260,34]` now stops
   that jump, and rope 1 is 280 long so a walk-off still catches it. The
   plinth is raised to `[2170,200,180,420]` (the builder's floor climb).
3. All other ropes and vines hold on the new period. Trail kasu are 26,
   24, 24, arcs only, none in a guard's sweep; clusters 12 a level.

## 2026-10-26, from game-designer (DESIGN.md fourth draft: parry, rope period, kasu)

### To level-designer (`docs/levels/LEVEL-1.md` to `LEVEL-3.md`)

1. **Detours** (DESIGN 6, rule 9): two per level, six in all. Each is a
   cluster of five to seven kasu fanning off the route, then 300 to 800 px
   of side space (15 to 30 s), one kit piece with a twist, no guard, no
   `killY`, rejoining the route farther east, never mid-chain or mid-fight.
   A lit place and a named kasu at the end. Level 1's first sits in its
   first 1,500 px with a hint. Name each detour's place for the historian.
2. **Trail kasu**: about 24 a level, lines of three to five that trace
   something; delete flat rows on open floor (report item 14).
3. **Rope period now follows grip length**, 2π√(r/2300) (DESIGN 2a).
   Swing speed rises below a 233 px grip and falls above it. Please
   re-check R2 and every swing flight you verified by script.
4. **Level 3 fighters**: S1 gold thrusts only, with a 0.75 s first
   telegraph and a parry prompt; S2 adds the black seal every third
   attack. The shield-bearer needs clear ground behind him for a player
   who jumps over (at least 200 px).

### To narrative-designer (`SCRIPT.md`)

1. Ports: each seller's opening line (the market one explains the purse),
   a line for each of the six goods, and a "not enough" line per port.
   Three crew lines for the crew goods, shown on the next card.
2. Prompts: S1's parry prompt (gold), S2's seal prompt (black), keyboard
   and touch versions; the first detour's hint in level 1; the first named
   kasu's float ("a card is kept," in your words).
3. History cards: six, 60 to 90 words each, from the historian's topics.

### To art-director (`ASSETS.md`)

1. Port scenes: the Nagapattinam market and the quay at night, each with
   three sellers or stalls (lamp ghee, boatman or pilot, rice and fish).
2. Voyage map: one painted map, Thanjavur to Nagapattinam to Kadaram; a
   lamp mark and a pennant mark to place on it.
3. Kasu: the trail kasu to RESEARCH 6 (thick, irregular, pale gold, a
   standing figure, no lettering); six named kasu, each its own coin type
   from the historian; a pale gold-leaf pickup bloom.
4. Combat: fighter overhead cut, reel, shield bash; hero parry and guard
   poses; the gold glint and the black ink seal on a pale halo. No crimson.
5. Card frame: one frame for six history cards with an image slot.

### To historian (`docs/RESEARCH.md`)

1. **Six card topics**, two per level, each tied to one named kasu and a
   detour place the level designer names. Suggestions only: Rajaraja's
   gold kasu (lamp-stand type) and gold gifts to the temple (level 1); the
   Chudamani vihara at Nagapattinam and the Ayyavole guild (level 2); the
   Bujang Valley candi and the 1028 Srivijayan embassy to China (level 3).
2. **The six named kasu:** which coin types a soldier might carry or find
   in 1010 to 1025, so each can be drawn.
3. **What a sailor could buy:** check lamp ghee as a temple offering, a
   boatman or pilot, rice and fish, provisions; replace any that fail.
4. **The second port:** is Nagapattinam's quay before sailing the least
   wrong last call, or is there a defensible stop on the way?

### To builder (`index.html`)

Spec is DESIGN.md 2a (rope period by grip length, energy cap), 4 (parry,
guard, clash, seal, shield-bearer, hitstop), and 6 (screens and state).
Port scenes slot after the interstitial before levels 2 and 3.

## 2026-10-26, from game-designer (rulings on the LEVEL-2 and LEVEL-3 notes)

### To level-designer (`docs/levels/LEVEL-3.md`)

1. **Widths and counts:** your numbers stand. DESIGN.md 7 now reads
   8,800 / 11,600 / 13,300 px, 6 / 6 / 6, and your sums 178 / 187 / 204 s.
   First-use isolation narrowed to 900 px in the piece's own lane.
2. **Rule 10 stands; S3 and S4 must move before the builder lays out
   level 3.** Both patrol across sway gaps (S3 over the sections at 6760
   and 7040; S4 over 8720 to 9480), so a child fights while the floor
   opens. Either give each a fixed walkway as long as his patrol plus
   300 px of retreat, with the swaying sections before or after the
   fight, or put him on stable ground and keep the sway for the crossing.
   DESIGN 2a's walkway row now says no fighter stands on a swaying section.
3. **Checkpoint skip:** no layout change. Checkpoints now light when the
   hero passes their x in any lane or height, and return him to the banner
   (DESIGN.md 5; builder task). CP 7350 can stay on the plinth.
4. Vines use the engine's `-420` release; `ROPE_MAX_ANGLE` stays 50 (never
   below 45) and `ROPE_RELEASE_DOUBLE` false, so R2 holds. Rule 4 adds gate
   footing at most 140 px above. Bale-into-gap is dropped.

### To builder (`index.html`)

1. Checkpoint registration by x in any lane or height, return to the
   banner's own footing (DESIGN.md 5).
2. Your rope numbers are adopted as written (DESIGN.md 2a).

## 2026-10-26, from level-designer (LEVEL-2.md and LEVEL-3.md third drafts)

### To game-designer (`docs/DESIGN.md`)

1. **Widths and counts.** Level 2 is 11,600 px with six guards (your
   table: 9,400 and seven); level 3 is 13,300 px with six fighters (your
   10,000). The 1,280 px first-use isolation rule plus 1,000 to 1,500 px
   checkpoint spacing forces long guard-free openings. Beat-sheet sums:
   187 s and 204 s, inside your 211 and 235.
2. **Rope numbers are now load-bearing.** Level 2's swing-only rope (R2)
   lands on ship 2 only at 40 degrees or more with the engine's hop
   (-420), 45 with -300. Keep `ROPE_MAX_ANGLE` at 45 or above and
   `ROPE_RELEASE_DOUBLE` false, or R2 changes. DESIGN 2a gives vines a
   -300 release; the engine's ropes use -420. Every level 3 vine link
   works with either; please rule which vines use.
3. **Rule 10 versus the walkway.** 2a says fighters ride swaying
   walkways; rule 10 says fighters stand on flat ground. S3 and S4 stand
   on walkways (retreat exists, but it sways). Rule one of them.
4. **Leaps upward.** The engine refuses a lane change to footing more
   than 150 px above, so every far-lane deck sits within 140 px of the
   ground below it. Worth a line in rule 4.
5. **Bale into a gap** (2a) is unused; no layout needed it.

### To art-director (`ASSETS.md`)

Requested by name in LEVEL-2.md and LEVEL-3.md section 7. Level 2: undyed
stall awning; pushable cotton bale; gangplank; beached hull with mast,
yard and furled matting sail; mast lashings; rigging line; marked rope
(lamp, ink ring); warehouse wall and roof gallery; cargo spar; lighter;
hero bounce pose. Level 3: rattan vine; marked vine; mangrove thicket
wall; shallow water ripple; muddy bank and slide streak; swaying walkway
section; bamboo ladder; hide shield; hero slide and wade poses; hero
first-draw ink stroke.

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
4. [Withdrawn 2026-10-26: DECISIONS.md 19 retires decision 6; the hero is
   cut-out rigged from hero_idle.png, fixes made by editing that one image.]
   Original request: slots 6 to 10 (hero, all five poses): Gaurav ruled (DECISIONS.md, 6)
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

## 2026-10-25, from builder (branch build/level-1)

### To level-designer (`docs/levels/LEVEL-1.md`)

1. The first-gate hint at [1740, 540] draws its text at y 494, on the
   edge of the far-lane wall-walk (y 492). It reads, but it sits on the
   stone. A y of 600 or so would put it in clear air under the walk.

## 2026-10-25, from builder, round 2 (branch build/level-1)

### To game-designer (`docs/DESIGN.md`)

1. Section 2 says the handover is a 2 s scene with one line; the
   coordinator's brief asked for Adittan's lines from SCRIPT.md, so the
   build plays all three at `TUNE.HANDOVER_LINE` 1.4 s each (4.2 s,
   skippable by jump or J/X). Set that constant, or rule one line.
2. Section 2a says a pole or rope is grabbed by touching it airborne. In
   level 1 that grabs any hero who jumps past one: jumping from the course
   (780 to 1020) to plank A crosses pole 1 at 1100, and jumping onto the
   yard course crosses pole 2 at 7230. It plays as intended for a player
   who wants the pole, and catches one who does not. A rule such as "grab
   only while holding ↑, or while falling" would leave a choice.
3. Builder tuning not in the doc: `ROPE_SLACK` 24 px. Walking off plank A
   reached rope 1 only at some sway phases; the tail of the rope now
   catches 24 px below its end.

### To narrative-designer (`docs/SCRIPT.md`)

1. The touch rule ("↑" becomes "tap ▲") turns "A scaffold pole. Hold ↑
   to climb." into "Hold tap ▲ to climb." The build shows that verbatim;
   a touch line of your own would read better.

### To level-designer (`docs/levels/LEVEL-1.md`)

1. Section 9 places no hint for the first plank or the first rope, so the
   SCRIPT lines for them are not in the build. Give them positions.
2. The pole hint at [1100, 560] would cross the course block's face; the
   engine nudges any hint clear of coins and platforms, and this one draws
   120 px east, at x 1220.

## 2026-10-25, from builder, round 3 (branch build/level-1)

### To art-director (`ASSETS.md`)

1. The grade is in, field for field. Each painted backdrop (`l1_far.png`
   to `l3_far.png`) covers the whole sky, so the new sky stops show only
   where the procedural fallback draws. Level 2 still reads sepia, not
   blue-green, until its backdrop is repainted to the new palette.
2. The part map's rectangles overlap (the torso box holds both upper
   arms), so cutting by rectangle would leave a second copy of a limb
   behind when it moves. The build traces one outline per part from
   `hero_idle.png` instead, using your pivots, parents, and draw order.
   The file already had a transparent background and no red glow.
3. The back hand grips the sash in the painting, so a scrap of sash moves
   with that hand when the arm rises (climb, hang, fall). In the planned
   single-image edit, a hand held clear of the sash would remove it.
4. Two colors I chose that the table does not give: the railing band on
   wooden walks is crimson in levels 1 and 2 and the level accent in
   level 3; the weathered paint patch on tall stone faces, which was red,
   is the level accent at 16 percent. Birds are umber, not red.

## 2026-10-26, from builder, round 4 (branch build/level-1)

### To game-designer (`docs/DESIGN.md`), rope swing numbers to rule (DECISIONS 20)

All in `TUNE` in `index.html`. A rope is a pendulum from its anchor.

| Constant | Value | What it does |
|---|---|---|
| `ROPE_PERIOD` | 2.0 s | Swing period at any grip height (kept from §2a's sway) |
| `ROPE_MAX_ANGLE` | 50° | Swing limit from vertical |
| `ROPE_PUMP` | 2.4 rad/s² | ← or → in the swing's direction adds energy; also starts a swing from rest |
| `ROPE_DAMP` | 0.12 /s | Swing loses speed slowly when not pumped |
| `ROPE_GRAB_KEEP` | 0.8 | Share of his run speed a grab turns into swing |
| `ROPE_RELEASE_GAIN` | 1.3 | Release speed = swing speed at his hands × this, along the tangent |
| `ROPE_RELEASE_VY` | -420 px/s | The jump's own push off the rope (poles keep -700 and vx 300) |
| `ROPE_RELEASE_DOUBLE` | false | A rope release spends the double jump; the release is the jump |
| `AIR_KEEP` | 300 px/s² | Release speed above the 385 run cap bleeds off at this rate |
| `AIR_FRICTION` | 500 px/s² | Drag in a release flight with no key held (2,200 otherwise) |
| `CLIMB_STRIDE` | 34 px | Animation only: px climbed per hand-over-hand reach |

Catch rule: hanging still on a rope builds stopped time as before;
while his hands move faster than `STOP_SPEED` (100 px/s) he is moving.
Even at the turn of a full swing he is slow for under 0.1 s, so a
swinging player is never caught. Climbing up and down works at any swing.
Without the double-jump rule, any release plus a double jump reached
every ledge, and no rope needed a swing.

### To level-designer (`docs/levels/LEVEL-1.md`)

1. Changed: the cornice `[1590,280,280,24,1]` is now `[1700,280,170,24,1]`
   (east end unchanged at 1870). With its west edge at 1590, a jump from
   the top of rope 1 reached it with no swing. Now the only way from rope 1
   to the cornice is a swing release on the forward upswing, about 26 to
   36 degrees east, from any grip. The kasu arc at 1560 to 1720 sits on
   that flight. A miss drops him to the floor, and he can walk back to
   pole 1 to try again.
2. Found, not changed: the plinth `[2170,300,180,320,1]` can be climbed
   from the floor with a jump, a wall jump off its face, then a double
   jump. The smoke bot does exactly that. So the whole scaffold (pole,
   plank, rope) is optional, and the swing is the best route, not the only
   one. If the scaffold should be required, the plinth needs about 80 px
   more height, or a face that does not take a wall jump.

## 2026-10-26, from builder (branch build/levels-2-3)

### To game-designer (`docs/DESIGN.md`)

Numbers the engine needed that DESIGN.md does not give, all in `TUNE`:
`AWN_THICK` 14 px (awning hit band); `STEP_UP` 16 px (a ledge that low
is stepped onto, which lets slopes meet decks); `VINE_DRIVE` 1.2 rad/s²
(how a vine keeps its 45-degree swing); `FIGHT_KNOCK` 120 px (the
thrust's stagger); `CAST_OFF_TIME` 3 s and `CAST_OFF_SPEED` 140 px/s
(level 2's ending); `BACKDROP_ZOOM` 1.08 and `BACKDROP_Y` 0.55 (see
below). Rules I chose, to rule on:
1. A bounce spends the double jump, so the second awning needs the
   held bounce as LEVEL-2 intends.
2. One wall jump per wall side until he lands. Before this, repeated
   wall jumps climbed any single wall: the smoke bot went over LEVEL-3's
   thicket (top at -400). Alternating walls still climb.
3. A normal fighter takes a cut at any time; only the shield-bearer
   limits cuts to his recovery (or his back). A sentinel blocks the road
   at any height until he kneels; a patrolling fighter blocks only within
   his band, so a vine or high walk passes him. Chola guards never block.

### To level-designer (`docs/levels/LEVEL-3.md`)

1. Nothing lies under the river walkways (8400 to 10680), so with "no
   killY" a fall there dropped forever. The build sets killY 1000, below
   every wading bed: a fall there costs a heart and the banner. A wading
   bed under the river would keep "water never kills" true.

### To narrative-designer (`docs/SCRIPT.md`)

1. Hint positions with no SCRIPT line, so not in the build: level 2
   bounce (560), hold jump (1240), push (1860), gangplank (2600), mast
   climb (3260), gate down at G1 (4700); level 3 vine (640), slide
   (1960), marked vine (3040).
2. Placed: "Lamplit again. ↑ the warehouse ledge." at level 2's marked
   rope (3500), the first lamplit crossing, which goes up to the
   warehouse gallery; G1 at 4700 is where he comes down. "A lamp in the
   rain. ↑ the stilt walk." at level 3's first gate (5060).
3. Checkpoint lines go at the docs' mid-level hooks: level 2 at 4780,
   level 3 at 9800.

### To art-director (`ASSETS.md`)

1. Far backdrops are now drawn once, never tiled, at 108 percent of the
   screen width, with the top 55 percent of the overflow cropped, so no
   landmark repeats on screen. The doubled vihara tower is gone. A
   painting 1.33 times as wide as tall (or wider) would need less zoom.

## 2026-10-26, from builder, game-feel pass (branch build/levels-2-3)

### To tester (`tests/smoke.js`)

1. The bot keeps 104 to 132 px from the shield-bearer until his
   recovery. Fighters now halt at 60 px (report #1, was 90), so he walks
   in, the bot backs off, he reaches his leash and never raises: level 3
   stalls at x 12322. A strategy that works: let him close to 60 and
   start his raise, step back past ~100 px center to center during the
   0.5 s raise (his thrust reaches 96), then step in and cut during his
   0.7 s recovery (the cut now reaches 77 px center to center).
2. The cut's hitbox is live only 0.085 to 0.16 s into a swing; hitstop
   freezes the world 3 to 10 frames on contact (game time does not
   advance while frozen). A press during a swing is buffered 0.13 s.

### To game-designer (`docs/DESIGN.md`)

Numbers to rule, all in `TUNE` with the report's row: `FIGHT_STOP` 60,
`FIGHT_CUT_REACH` 64, hitstop 5 / 10 / 3 frames (hit, defeat, shield),
`ATTACK_BUFFER` 0.13 s, live window 0.085 to 0.16 s, `CUT_KEYS` (the
slash), `ROPE_GRAVITY` 2300, `ROPE_MIN_LEN` 120 (the period uses grip
length but never shorter than this, 1.45 s), `ROPE_MAX_ANGLE` 50 as an
energy cap with a 70° safety clamp, body lag 4°/(rad/s) up to 12°.
§2 and §4 still disagree on the cut's reach (52 wide 30 ahead vs 56
ahead); the build now uses 64.

### To narrative-designer and Gaurav (`docs/SCRIPT.md`, Pillar 3)

1. A coin pickup is silent: a soft sound was left out until it is ruled
   not to be a "chime".

## For builder and game-designer (orchestrator, 2026-10-26)

The quay scene (night before sailing) plays before the Chapter III card, not after it, so it is set in Nagapattinam before the card moves the story to the Kadaram shore.

## From builder, build/systems (2026-10-26)

### To tester (`tests/smoke.js`; not edited)

1. A port screen now sits between levels: after level 1 and after level
   2's cast-off, `state === 'port'` and the bot must click `#portBtn`
   (Onward) before `#interBtn`. With that one click added (tried in a
   scratch copy), level 2 passes from the teleport run.
2. The shield-bearer blocks every front cut. Parry: press the cut while
   he is in `raise` with `atkKind === 'thrust'` and `atkT*60 <= 7`
   (window 10 frames, 14 in S1); he is stunned 0.9 s and a cut lands.
   Or jump over him during the bash's 1.0 s recovery and cut from
   behind; he turns after 0.8 s. Level 3 stalls at x 12502 otherwise.
3. Level 1 rope 1 (length 280) reaches the cornice only from a grip of
   160 px or less, released on the forward upswing near 20 to 26
   degrees at the energy cap. The bot grabs near 190 and falls short;
   the full run times out at x 2157.

### To level-designer

Level 1 rope 1: no release from a grip lower than 200 px lands. If the
bot's grab height is what players will do, shorten the gap or the rope.

### To game-designer

New `TUNE` numbers to rule: `PARRY_WIN` [7,3] and `PARRY_WIN_WIDE`
[10,4] frames before/after the strike, `HITSTOP_PARRY` 14 frames,
`PARRY_SLOWMO` 0.3 s at 0.4 speed, `PARRY_ZOOM` 0.08, `PARRY_STUN` 0.9 s,
`SHIELD_OPEN` 1.2 s, `SHIELD_TURN` 0.8 s, `LAMP_POST` 70. Both crew
pennants stand at Nagapattinam on the map. Found named kasu stay taken
in later runs while `KEEP_MAP` is on; the "No cards yet" line shows on
the map when nothing is found.

### To Gaurav

Persistence is option (b), on by default: the map and cards are kept on
this device in localStorage. Set `TUNE.KEEP_MAP` to false to turn it off.

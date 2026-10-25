# Design review, 2026-10-25

Reviewer: design-critic. Document: `docs/DESIGN.md`, first draft. Judged
against VISION.md, DECISIONS.md, RESEARCH.md, NOTES.md, the level
documents, and `index.html` lines 627 to 759.

## Verdict

**Ready with fixes.** The constants are the build's and the stealth model
is playable, but two section 9 rules contradict each other, one section
7 claim is false by its own numbers, and the level designer's three notes
are all correct.

## Findings

### 1. Rule 5 contradicts rule 3 and the document's own example

Rule 5: "A guard's 300 px cone never reaches a point the player arrives
at blind: within 150 px of a gate exit." Rule 3: "a gate inside or at the
edge of his patrol." A guard faces his walking direction, so every point
inside his patrol is inside his sweep; any gate rule 3 places, rule 5
forbids. Section 3's own example (gates "1250 and 1620", main guard "1330
to 1700") breaks it. Replace rule 5 with the level designer's text: "No
cone within 150 px of a drop landing or a checkpoint. A gate exit may lie
in a cone sweep only if the guard in the target lane is on screen from
the gate and walks away a full leg, so the crossing is a read, not a
gamble."

### 2. "so a chased player gets caught" is false at these numbers

Section 7: "A forced stealth beat is a guard followed by a climb or gap,
so a chased player gets caught." Hero 385, chase 260, chase ends at 420
px: from the cone edge the hero clears 420 px in one second running east,
and a 140 px step or a 380 px gap is taken at full speed. Only an
obstacle that stops horizontal motion inside the 300 px leash catches
anyone: level 1's wall-jump pillars (2480, inside M1's leash to 2600) do;
level 2's deck hop and basin gap do not. Ruling: keep 260 (VISION 4) and
rewrite: "A forced stealth beat is a guard followed, inside his 300 px
leash, by an obstacle that stops the hero (a wall-jump climb or a landing
that needs a stop); gaps and steps are reads, taxed only when the player
hesitates." Correct the level 2 cell (levels review, finding 4).

### 3. The gateway needs a sentinel, and rule 2 an exemption

Section 4: "Patrols and sees like a guard (same constants)"; rule 1:
"Patrol length 400 to 800 px." LEVEL-3 stands both gateway fighters
still, which section 4 does not allow and the build cannot do (`x1 = x2`
flips direction every frame, line 743). The arithmetic is not forced: a
checkpoint between two patrolling fighters fits in 1,300 + 1,300. But a
standing gate guard is the truer picture and the cleaner read for a
child. Ruling: add to section 4, "Sentinel: a fighter with no patrol,
facing west, awake when the cone is entered; gateway only," and to rule
2, "except the two gateway fighters."

### 4. Section 3 and section 7 describe the build, not LEVEL-1.md

"Between x 1240 and 1900 the build has a far guard (1260 to 1840)" and
the cell "1 (the wall-walk pair, x 1240 to 1900)". LEVEL-1.md moves the
wall-walk to 1700 to 2400 and the canyon to 4560 to 5320. Replace the
paragraph with "See LEVEL-1.md section 5" and the cell with "1 (the
wall-walk, x 1700 to 2400)."

### 5. The target times have no arithmetic

"| 1 Thanjavur | 4 min |". Level 1 is 6,600 px: 17 s of running, five
waits of at most 4.2 s, perhaps six retries at 3 to 15 s: about two
minutes. "Fifteen minutes end to end" is asserted, not computed. Add one
line per level: run + waits + retries = target, or lower the targets and
tell the creative-director VISION 7's "4 to 6 minutes" needs a playtest.

### 6. Two constants are wrong or unanchored

"Cannot move for 0.12 s": the build is `if(dir !== 0 && p.attackT <=
0.12)` with `attackT` starting at 0.28, so movement locks for 0.16 s.
"Thrust: hitbox 70 px ahead" after "stops 90 px from the hero": 70 from
his center never reaches a hero whose near edge is 77 px away. Write "70
px ahead of his front edge."

### 7. The design orders sprites the asset kit does not have

"this needs a sprite: guard reaching, one pose, new slot"; section 4's
raised weapon, thrust, shield-bearer, and "drops to one knee, raises an
open hand" are four more fighter poses. ASSETS.md has none. Add to
section 4: "Sprites this needs beyond ASSETS.md 17 and 18: fighter
raise, thrust, shield walk, kneel; guard reach (NOTES.md slots 22, 30 to
33)."

### 8. The ship-deck beat is accepted below the owner

"Rulings taken here: the ship-deck closing beat in level 2 is accepted."
VISION's revision notes call it "not scope"; Decision 1 puts the deck
level in release two. Not a breach, but it adds slot 25 and a backdrop
drift the build lacks. Put it in section 10 so Gaurav sees it.

## What works

Every constant in section 2 is the build's, measured. The four-second
window is a checkable bound on tedium. The catch (heart, shove, scold, no
reset) answers VISION 4, and section 10 puts the one real alternative
before the owner. The violence rule is concrete enough to build unaided.
